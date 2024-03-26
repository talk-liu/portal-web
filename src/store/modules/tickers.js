import cloneDeep from 'lodash/cloneDeep'
import find from 'lodash/find'
import groupBy from 'lodash/groupBy'
import min from 'lodash/min'
import max from 'lodash/max'
import { BigNumber } from 'bignumber.js'

import api from '@/graphql'

export default {
  namespaced: true,
  state: {
    originalTickers: {},
    fixedTickers: {},
    currentMarketId: '',
    quoteUnitList: ['btc', 'eth', 'usdt', 'trx'],
  },
  getters: {
    currentMarketId: state => state.currentMarketId,
    // 格式化tickers
    allTickers: ({ originalTickers }, { percent, addUsdt }, rootState) => {
      const all = []
      const tickers = cloneDeep(originalTickers)
      const markets = rootState.markets.oriMarkets || []
      Object.keys(tickers).map(key => {
        const data = tickers[key]
        const marketInfo = find(markets, { id: key })
        data.marketId = data.base_unit + data.quote_unit
        data.label = data.quote_unit.toUpperCase()
        data.changePercent = percent(data.open, data.last).toFixed(2)
        data.isUp = data.changePercent >= 0 ? true : false
        data.usdt = addUsdt(data.quote_unit, data.last)
        marketInfo && marketInfo.fee && (data.fee = marketInfo.fee)
        marketInfo && marketInfo.market_partition && (data.market_partition = marketInfo.market_partition)
        all.push(data)
      })
      return all
    },
    // 涨跌排序
    sortTickers: (state, { allTickers }) => {
      return allTickers.sort((a, b) => {
        return a.changePercent - b.changePercent > 0 ? -1 : 1
      })
    },
    // 当前ticker信息
    currentTicker: ({ originalTickers, currentMarketId }, { percent, addUsdt }, rootState, rootGetters) => {
      const cur = cloneDeep(originalTickers[currentMarketId])
      if (!cur) {
        return { last: '0', coin_info: {} }
      }
      const coin = rootGetters['currencies/curCoin'](cur.base_unit)
      // 当前币种信息
      cur['coin_info'] = coin
      cur.oriLast = cur.last // 提供给深度图查找坐标用
      cur.usdt = addUsdt(cur.quote_unit, cur.last)
      // 格式化最新价位数
      cur['last'] = BigNumber(cur.last).toFixed(cur.bid_fixed)
      cur['funds'] = BigNumber(cur.funds).toFixed(2)
      // 涨跌计算
      const p = percent(cur.open, cur.last).toFixed(2)
      cur['percent'] = p + '%'
      cur['is_up'] = p >= 0 ? true : false
      return cur
    },
    // 百分比格式化
    percent: () => (p1, p2) => {
      if (BigNumber(p1).isZero()) return 0
      return (100 * (p2 - p1)) / p1
    },
    // 增加usdt估值
    addUsdt: (state, { btcUsdtRate, ethUsdtRate, trxUsdtRate }) => (currency, value) => {
      let val = 0
      if (currency === 'usdt') {
        val = value
      }
      if (currency === 'usd') {
        val = value
      }
      if (currency === 'btc') {
        val = BigNumber(value)
          .multipliedBy(btcUsdtRate)
          .toNumber()
      }
      if (currency === 'eth') {
        val = BigNumber(value)
          .multipliedBy(ethUsdtRate)
          .toNumber()
      }
      if (currency === 'trx') {
        val = BigNumber(value)
          .multipliedBy(trxUsdtRate)
          .toNumber()
      }
      return val
    },
    // 返回当前基本币
    baseUnit: (state, { currentTicker }) => {
      return currentTicker.base_unit || ''
    },
    quoteUnit: (state, { currentTicker }) => {
      return currentTicker.quote_unit || ''
    },
    // 最新价格
    lastPrice: (state, { currentTicker }) => {
      return currentTicker.last || ''
    },
    // btc/usdt汇率
    btcUsdtRate: ({ originalTickers }) => {
      return (originalTickers['btcusdt'] && originalTickers['btcusdt'].last) || '0'
    },
    // eth/usdt汇率
    ethUsdtRate: ({ originalTickers }) => {
      return (originalTickers['ethusdt'] && originalTickers['ethusdt'].last) || '0'
    },
    // at/usdt汇率
    atUsdtRate: ({ originalTickers }) => {
      return (originalTickers['atusdt'] && originalTickers['atusdt'].last) || '0'
    },
    // trx/usdt汇率
    trxUsdtRate: ({ originalTickers }) => { // todo
      const trxBtcRate = originalTickers['trxbtc'] && originalTickers['trxbtc'].last || '0'
      const btcUsdtLast = originalTickers['btcusdt'] && originalTickers['btcusdt'].last || '0'
      return BigNumber(trxBtcRate).times(btcUsdtLast)
    },
    // 找出当前币种与btc的最新价
    findLast: ({ originalTickers }) => currency => {
      // usdt特殊处理
      if (currency === 'usdt') {
        return originalTickers['btcusdt'] ? originalTickers['btcusdt'].last : '0'
      }
      if (originalTickers[`${currency}btc`]) {
        return originalTickers[`${currency}btc`].last
      }
      if (originalTickers[`${currency}eth`]) {
        const ethLast = originalTickers[`${currency}eth`].last
        const ethBtcLast = originalTickers['ethbtc'].last
        return BigNumber(ethLast).times(ethBtcLast)
      }
      return '0'
    },
    // 当前币种是否有usdt交易对
    isUsdtTickers: ({ originalTickers }) => currency => {
      return originalTickers[`${currency}usdt`] ? true : false
    },
    // 币币转换
    changeCurrency: ({ originalTickers }, { btcUsdtRate, ethUsdtRate, trxUsdtRate }) => (cur, target, value) => {
      const whiteList = ['eth', 'btc', 'usdt', 'trx', 'usd']
      // usdt价格处理
      if (cur === target) return value
      if (!whiteList.includes(target)) return 0
      // usdt需要特殊处理
      if (cur === 'usdt' && target === 'btc') {
        if (!originalTickers['btcusdt']) return 0
        const last = originalTickers['btcusdt'].last
        return Number(last) === 0
          ? Number(0).toString()
          : BigNumber(value)
            .dividedBy(last)
            .toString()
      }
      // usd需要特殊处理
      if (cur === 'usd' && target === 'btc') {
        // usdt需要特殊处理
        if (!originalTickers['btcusd']) return 0
        const last = originalTickers['btcusd'].last
        return Number(last) === 0
          ? Number(0).toString()
          : BigNumber(value)
            .dividedBy(last)
            .toString()
      }
      const market = cur + target
      const curTicker = originalTickers[market]
      // 币币价格处理
      if (curTicker) {
        return BigNumber(curTicker.last || 0)
          .times(value)
          .toString()
      }
      const btcTicker = originalTickers[`${cur}btc`]
      if (btcTicker) {
        let curBtc = BigNumber(btcTicker.last || 0)
          .times(value)
          .toString()
        if (target === 'usdt') {
          return BigNumber(curBtc)
            .multipliedBy(btcUsdtRate)
            .toNumber()
        }
        if (target === 'btc') return curBtc
      }
      const usdtTicker = originalTickers[`${cur}usdt`]
      if (usdtTicker) {
        let curUsdt = BigNumber(usdtTicker.last || 0)
          .times(value)
          .toString()
        if (target === 'btc') {
          return BigNumber(curUsdt)
            .dividedBy(btcUsdtRate)
            .toNumber()
        }
        if (target === 'usdt') return curUsdt
      }
      const usdTicker = originalTickers[`${cur}usd`]
      if (usdTicker) {
        let curUsdt = BigNumber(usdTicker.last || 0)
          .times(value)
          .toString()
        if (target === 'btc') {
          return BigNumber(curUsdt)
            .dividedBy(btcUsdtRate)
            .toNumber()
        }
        if (target === 'usd') return curUsdt
      }
      const ethTicker = originalTickers[`${cur}eth`]
      if (ethTicker) {
        let curEth = BigNumber(ethTicker.last || 0)
          .times(value)
          .toString()
        if (target === 'usdt') {
          return BigNumber(curEth)
            .multipliedBy(ethUsdtRate)
            .toNumber()
        }
        if (target === 'btc') {
          // usdt
          let curEthUsdt = BigNumber(curEth)
            .multipliedBy(ethUsdtRate)
            .toNumber()
          // usdt需要特殊处理
          if (!originalTickers['btcusdt']) return 0
          const last = originalTickers['btcusdt'].last
          return Number(last) === 0
            ? Number(0).toString()
            : BigNumber(curEthUsdt)
              .dividedBy(last)
              .toString()
        }
      }
      const trxTicker = originalTickers[`${cur}trx`]
      if (trxTicker) {
        let curTrx = BigNumber(trxTicker.last || 0)
          .times(value)
          .toString()
        if (target === 'usdt') {
          return BigNumber(curTrx)
            .multipliedBy(trxUsdtRate)
            .toNumber()
        }
        if (target === 'btc') {
          return BigNumber(curTrx)
            .multipliedBy(originalTickers.trxbtc.last || 0)
            .toNumber()
        }
      }
      return 0
    },
    // 在线币种及交易对信息
    tickerInfo: ({ originalTickers }) => {
      const list = new Set()
      const keys = Object.keys(originalTickers)
      keys.map(key => {
        list.add(originalTickers[key].base_unit)
      })
      // usdt不在base_unit需要额外加入
      const coins = list.size + 1
      const tickerLen = keys.length
      return { coins, tickerLen, baseUnitList: [...list] }
    },
    // 涨幅榜
    upList: (state, { sortTickers }) => {
      return sortTickers.slice(0, 8)
    },
    // 跌幅榜
    downList: (state, { sortTickers }) => {
      return sortTickers.slice(-8, sortTickers.length).reverse()
    },
    // 成交榜
    volumeList: (state, { allTickers }) => {
      const tickers = allTickers.sort((aItem, bItem) => {
        return aItem.funds - bItem.funds > 0 ? -1 : 1
      })
      return tickers.slice(0, 8)
    },
    // 交易对筛选
    filterList: (state, { allTickers, sortAT, group }, rootState) => (type = 'btc', search) => {
      let list = []
      if (search) {
        search = search.toLowerCase()
        list = allTickers.filter(item => item.marketId.indexOf(search) > -1)

        return group(sortAT(list))
      }
      // 自选
      if (type === 'favorite') {
        const loveTickers = rootState.loveTickers.allLoveTickers || []
        allTickers.map(item => loveTickers.includes(item.marketId) && list.push(item))
      } else {
        list = allTickers.filter(item => item.quote_unit.toLowerCase() === type.toLowerCase())
      }
      return group(sortAT(list))
    },
    // AT交易对置顶
    sortAT: () => list => {
      const at = find(list, { base_unit: 'at' })
      const index = list.indexOf(at)
      index > -1 && list.splice(0, 0, list.splice(index, 1)[0])
      return list
    },
    /**
     * 按照用户类型及登录状态对ticker进行分组
     * 未登录及普通用户：按照费率分组
     * 矿工用户：按照挖矿交易对分组
     */
    group: (state, getters, rootState, rootGetters) => list => {
      const isMiner = rootGetters['currentUser/isMiner']
      const isLogin = rootGetters['currentUser/isLogin']
      let type = ''
      if (!isLogin || !isMiner) {
        type = 'fee'
      } else {
        type = 'market_partition'
      }
      return groupBy(list, type)
    },
    feeList: (state, { allTickers }) => {
      return groupBy(allTickers, 'fee')
    },
    minFee: (state, { feeList, maxFee }) => {
      let minF = min(Object.keys(feeList))
      if (maxFee === minF) {
        minF = 0
      }
      return minF
    },
    maxFee: (state, { feeList }) => {
      return max(Object.keys(feeList))
    },
  },
  mutations: {
    setTickers(state, data) {
      state.originalTickers = data
      // fixedTickers只获取初始值不进行更新操作
      state.fixedTickers = cloneDeep(data)
    },
    setCurrentMarketId(state, id) {
      state.currentMarketId = id
    },
    updateTickers(state, data) {
      state.originalTickers = data
    },
  },
  actions: {
    async getTickers(store) {
      const resp = await api.query('TICKERS')
      let result = resp && resp.data && resp.data && resp.data.ticker && resp.data.ticker.markets
      if (!result) return false
      store.commit('setTickers', cloneDeep(result))
    },
  },
}
