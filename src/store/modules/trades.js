import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'

import api from '@/graphql'

export default {
  namespaced: true,
  state: {
    oriTrades: [],
    isSetTradesDone: false,
  },
  getters: {
    // 格式化数据
    trades: ({ oriTrades }, { addZero, priceSplit }, rootState, rootGetters) => {
      const currentTicker = rootGetters['tickers/currentTicker']
      const askFixed = currentTicker.ask_fixed
      const bidFixed = currentTicker.bid_fixed
      let trades = cloneDeep(oriTrades)
      trades.map(item => {
        let [before, after] = priceSplit(item.price, bidFixed)
        item['priceBefore'] = before
        item['priceAfter'] = after
        item['amountZero'] = addZero(item.amount, askFixed)
        item['date'] = dayjs(item.date * 1000).format('HH:mm:ss')
      })
      return trades
    },
    addZero: () => (value, fixed) => {
      if (!fixed) return ''
      const zero = ['', '0', '00', '000', '0000', '00000', '000000', '0000000', '00000000']
      const d = value.toString().split('.')[1]
      if (!d) return ''
      const z = zero[fixed - d.length]
      if (!z) return ''
      return z
    },
    priceSplit: () => (value, fixed) => {
      const price = Number(value)
        .toFixed(fixed)
        .toString()
      const split = price.split('.')
      return [split[0], split[1]]
    },
  },
  mutations: {
    setTrades(state, data) {
      state.oriTrades = data || []
    },
    updateTrades(state, data) {
      const newTrades = data.trades || []
      newTrades.map(trade => {
        state.oriTrades.unshift(trade)
      })
      // 超过100条删除最后一条
      if (state.oriTrades.length > 100) {
        state.oriTrades.splice(99, 100)
      }
    },
    setTradesDone(state, data) {
      state.isSetTradesDone = data
    },
  },
  actions: {
    async getTrades({ state, commit }, id) {
      // 依赖 setTradesDone 更新 pendingkline
      commit('setTradesDone', false)
      const resp = await api.query('TRADES', { market: id, limit: 50 })
      // 超时2s设为true，不影响k调用
      setTimeout(() => {
        if (!state.isSetTradesDone) {
          commit('setTradesDone', true)
        }
      }, 2000)
      const result = resp && resp.data && resp.data.trade && resp.data.trade.record
      // console.log('<----trades---->', result)
      if (!result) return false
      commit('setTrades', cloneDeep(result))
      commit('setTradesDone', true)
    },
  },
}
