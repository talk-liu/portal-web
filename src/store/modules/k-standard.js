// 用于存储trades转k线数据，还未被绘制到图上部分
// k线存储
import api from '@/graphql'
import { BigNumber } from 'bignumber.js'
import throttle from 'lodash/throttle'

const limit = 1000
export default {
  namespaced: true,
  state: {
    cachedTrades: [],
    last_ts: 0,
    next_ts: 0,
    lastBar: [],
    originData: [],
    period: 60, // 选择周期
    responseError: false,
    requesting: true,
    responseErrorMsg: '',
    kCommands: {
      APPEND: 0, // 从后面插入 // TODO:
      PREPEND: 1, // 从前面插入
      REFRESH: 2, // 刷新,
      UPDATE: 3, // 更新某个节点 // TODO:
    },
    kCurrentCommand: 2,
    kDataLeftIsEnd: false,
    currentEmptyCount: 0,
  },
  getters: {
    kCurrentEmptyPointCount: state => 25 + state.currentEmptyCount,
  },
  mutations: {
    // 更新逻辑
    updateTs: function(state, { last_ts, next_ts, lastBar }) {
      last_ts && (state.last_ts = last_ts)
      next_ts && (state.next_ts = next_ts)
      lastBar && (state.originData[state.originData.length - 1] = lastBar)
    },
    updateCachedTrades: function(state, trades) {
      state.cachedTrades = state.cachedTrades.concat(trades)
    },
    clearCachedTrades: function(state) {
      state.cachedTrades = []
    },
    resetCachedTrades: function(state) {
      state.cachedTrades = []
      state.last_ts = 0
      state.next_ts = 0
      state.lastBar = []
    },
    // 设置周期
    setPeriod(state, period) {
      state.period = period
      state.kDataLeftIsEnd = false
      state.requesting = true
      state.responseError = false
      state.responseErrorMsg = ''
    },
    // 失败的通用函数
    setDataFail(state, resp) {
      state.requesting = false
      state.responseError = true
      state.responseErrorMsg = resp.errors[0].message
    },
    setDataSuccess(state, data) {
      state.currentEmptyCount = 0
      state.kCurrentCommand = state.kCommands.REFRESH
      state.requesting = false
      // 源数组只读无法进行splice操作
      state.originData = data.k.concat([])
    },
    setBeforeDataSuccess(state, data) {
      state.kCurrentCommand = state.kCommands.PREPEND
      state.requesting = false
      state.originData = data.k.concat(state.originData)
    },
    setLeftIsEnd(state, data) {
      if (data.k.length < limit) {
        state.kDataLeftIsEnd = true
      }
    },
    setCurrentEmptyCount(state, data) {
      state.currentEmptyCount += data
    },
    removeEmptyData(state) {
      // 如果通过left载入数据后 逐渐满足了一些最小数据量 则要将同等数量right空数据删除
      const count = state.originData.length - 50
      if (count > 0) {
        state.currentEmptyCount -= count
        if (state.currentEmptyCount < 0) {
          state.currentEmptyCount = 0
        }
      }
    },
    // 推送的trades，属于UPDATE
    updateLastOriginData(state, data) {
      state.kCurrentCommand = state.kCommands.UPDATE
      state.originData.splice(state.originData.length - 1, 1, data)
    },
    addLastOriginData(state, data) {
      state.kCurrentCommand = state.kCommands.APPEND
      state.originData = state.originData.concat([data])
    },
    // 初始化同步trades到k中去
    synLastOriginData(state, data) {
      state.originData.splice(state.originData.length - 1, 1, data)
    },
  },
  actions: {
    async loadData({ state, rootGetters, commit, rootState }) {
      const market = rootGetters['tickers/currentMarketId']
      const oriTrades = rootState.trades.oriTrades
      const param = {
        limit,
        market,
        period: state.period,
        trade_id: oriTrades.length > 0 ? oriTrades[0].tid : 0,
        _t: Date.now(),
      }
      const resp = await api.query('PENDINGKLINE', param, 'no-cache')
      if (!resp.data.pendingKLine || !resp.data.pendingKLine || resp.errors) {
        commit('setDataFail', resp)
      } else {
        const data = resp.data.pendingKLine
        commit('setDataSuccess', data)
        commit('setLeftIsEnd', data)
        // 更新最新时间
        const last = data.k[data.k.length - 1]
        if (!last) {
          return
        }
        let last_ts = last[0]
        let next_ts = last_ts + 60 * state.period
        // 更新当前k的开始结束时间
        commit('updateTs', { last_ts, next_ts })
        // 如果存在trades，去更新对应的
        if (data.trades && data.trades.length > 0) {
          data.trades.every(trade => {
            // 更新指定bar数据
            if (last_ts <= trade.date && trade.date < next_ts) {
              // 为不修改后面的迁移代码做的适配
              const bar = {
                close: last[4],
                high: last[2],
                low: last[3],
                volume: last[5],
              }
              const { price, amount } = trade
              // 更新收盘价
              bar.close = Number(price)
              // 更新最高价
              price > bar.high && (bar.high = Number(price))
              // 更新最低价
              price < bar.low && (bar.low = Number(price))
              // 更新数量
              bar.volume = BigNumber(bar.volume)
                .plus(amount)
                .toNumber()
              // 初始化k中有trades去同步k的数据
              commit('synLastOriginData', [last[0], last[1], bar.high, bar.low, bar.close, bar.volume])
            }
          })
        }
      }
    },
    async loadBeforeData({ state, rootGetters, commit }) {
      // 历史数据拉完不需要再请求
      if (state.kDataLeftIsEnd) return

      const firstTS = state.originData[0][0]
      const to = parseInt(firstTS - 60 * state.period)
      const from = to - 1000 * (60 * state.period)
      const market = rootGetters['tickers/currentMarketId']
      const param = {
        limit,
        market,
        period: state.period,
        _t: Date.now(),
        timestamp: from,
        to,
      }
      const resp = await api.query('SINGLEKLINE', param, 'no-cache')
      if (!resp.data.singleKLine || !resp.data.singleKLine || resp.errors) {
        commit('setDataFail', resp)
      } else {
        commit('setBeforeDataSuccess', resp.data.singleKLine)
        commit('setLeftIsEnd', resp.data.singleKLine)
        commit('removeEmptyData', resp.data.singleKLine)
      }
    },
    updateTrades: throttle(function({ state, commit, dispatch }, trades) {
      // 大于等与日更线，不更新
      if (state.period >= 1440) {
        return
      }

      const last = state.originData[state.originData.length - 1]
      // 在其他页面，不执行
      if (!last) {
        return
      }
      let last_ts = last[0]
      let next_ts = last_ts + 60 * state.period
      if (trades && trades.length > 0) {
        trades.every(trade => {
          // 更新指定bar数据
          if (last_ts <= trade.date && trade.date < next_ts) {
            // 为不修改后面的迁移代码做的适配
            const bar = {
              close: last[4],
              high: last[2],
              low: last[3],
              volume: last[5],
            }
            const { price, amount } = trade
            // 更新收盘价
            bar.close = Number(price)
            // 更新最高价
            price > bar.high && (bar.high = Number(price))
            // 更新最低价
            price < bar.low && (bar.low = Number(price))
            // 更新数量
            bar.volume = BigNumber(bar.volume)
              .plus(amount)
              .toNumber()
            commit('updateLastOriginData', [last[0], last[1], bar.high, bar.low, bar.close, bar.volume])
          } else if (trade.date >= next_ts) {
            // 添加新的bar到bars
            // 如果新的订单时间戳大于等于下一条数据的指定时间戳
            const n = Math.ceil((trade.date - last_ts) / (state.period * 60))
            if (n > 100 && this.enablieRefresh) {
              // 如果新获取的trade里最新的bar太远，重新更新数据
              dispatch('loadData')
            }
            next_ts = last_ts + state.period * 60 * n
            last_ts = next_ts - state.period * 60
            // 依旧在当前区间内更新最后一个数据
            const { price, amount } = trade
            const lastBar = [last_ts, Number(price), Number(price), Number(price), Number(price), Number(amount)]
            if (state.next_ts === next_ts) {
              commit('updateLastOriginData', lastBar)
            } else {
              commit('updateTs', { last_ts, next_ts })
              commit('addLastOriginData', lastBar)
            }
          }
        })
      }
    }, 1500),
  },
}
