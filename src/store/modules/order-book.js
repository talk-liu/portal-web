import cloneDeep from 'lodash/cloneDeep'
import BigNumber from 'bignumber.js'
import Vue from 'vue'

import api from '@/graphql'
import pusher from '@/pusher'
import bindChannelEvent from '@/pusher/bindChannelEvent'

const utils = {
  // 增量合并
  mergeData: (target, sources) => {
    sources.asks &&
      sources.asks.map(item => {
        let [price, count] = item
        if (BigNumber(count).isZero()) {
          target.asks.delete(price)
        } else {
          target.asks.set(price, count)
        }
      })
    sources.bids &&
      sources.bids.map(item => {
        let [price, count] = item
        if (BigNumber(count).isZero()) {
          target.bids.delete(price)
        } else {
          target.bids.set(price, count)
        }
      })
  },
}

export default {
  namespaced: true,
  state: {
    cacheOrderBook: {
      asks: new Map(),
      bids: new Map(),
      timestamp: null,
    },
    cacheCount: 0,
    oriOrderbook: {
      bids: [],
      asks: [],
    },
    marketId: '',
    fixed: -1,
    increment: true, // 是否为增量推送
    isInited: false,
    blockList: {
      asks: [],
      bids: [],
    },
  },
  getters: {
    sortedOrderBook: ({ oriOrderbook, cacheOrderBook, cacheCount, increment }, { sortOrder }) => {
      let bids = []
      let asks = []
      if (!increment) {
        const orders = cloneDeep(oriOrderbook)
        bids = orders.bids
        asks = orders.asks
      } else {
        bids = Array.from(cacheOrderBook.bids)
        asks = Array.from(cacheOrderBook.asks)
      }
      // 从大到小排序
      return { bids: bids.sort(sortOrder), asks: asks.sort(sortOrder), cacheCount: cacheCount }
    },
    orderAsks: (state, { sortedOrderBook, formatData }) => {
      const asks = cloneDeep(sortedOrderBook.asks)
      return formatData(asks, 'ask')
    },
    orderBids: (state, { sortedOrderBook, formatData }) => {
      const bids = cloneDeep(sortedOrderBook.bids)
      return formatData(bids, 'bid')
    },
    orderIndex: (state, { orderAsks, orderBids }) => {
      const asks = cloneDeep(orderAsks.orders)
      const bids = cloneDeep(orderBids.orders)
      let indexAsks = asks.slice(-10, asks.length)
      let indexBids = bids.slice(0, 10)
      let count = 10
      let bidLen = count - indexBids.length
      let askLen = count - indexAsks.length
      if (bidLen > 0) {
        for (let i = 0; i < bidLen; i++) {
          indexBids.push({
            amount: '-',
            amountZero: null,
            id: `bid-${i}-item`,
            mySize: '-',
            price: '-',
            priceAfter: '-',
            priceBefore: null,
            total: '-',
          })
        }
      }
      if (askLen > 0) {
        for (let i = 0; i < askLen; i++) {
          indexAsks.unshift({
            amount: '-',
            amountZero: null,
            id: `ask-${i}-item`,
            mySize: '-',
            price: '-',
            priceAfter: '-',
            priceBefore: null,
            total: '-',
          })
        }
      }
      return {
        asks: { orders: indexAsks, max: orderAsks.max, priceOne: orderAsks.priceOne },
        bids: { orders: indexBids, max: orderBids.max, priceOne: orderBids.priceOne },
      }
    },
    orderMarketId: ({ marketId }) => marketId,
    // orders数据处理
    formatData: ({ fixed }, { addZero, priceSplit, depthDataMerge }, rootState, rootGetters) => (data, type) => {
      if (!data) return []
      const currentTicker = rootGetters['tickers/currentTicker']
      const currentOrders = rootGetters['openOrders/currentOrders']
      const viewportType = rootGetters['viewport/type']
      const askFixed = currentTicker.ask_fixed
      const bidFixed = currentTicker.bid_fixed
      let len = 50
      // h5最多展示15条数据
      if (viewportType === 'h5') {
        len = 15
      }
      if (fixed !== -1) {
        data = depthDataMerge(data, fixed, type)
      }
      // 切割展示数据条数
      let list = []
      const orders = []
      let priceOne = 0
      if (type === 'bid') {
        list = data.slice(0, len)
        if (list[0]) {
          priceOne = list[0][0]
        }
      } else {
        list = data.slice(-len, data.length)
        if (list[list.length - 1]) {
          priceOne = list[list.length - 1][0]
        }
      }
      let max = 0
      list.map(item => {
        max = item[1] - max > 0 ? item[1] : max
        let [before, after] = priceSplit(item[0], bidFixed)
        // 实时计算 深度合并计算未加入
        let count = 0
        currentOrders.map(o => {
          // 买卖方向及价格相同才展示
          if (o.kind === type) {
            if (BigNumber(o.price).eq(item[0])) {
              count = BigNumber(count).plus(o.remaining_volume)
            }
          }
        })
        // 兼容处理 当myorder大于总order的时候展示总order
        count = BigNumber(count).gt(item[1]) ? item[1] : count.toString()
        orders.push({
          amount: item[1],
          amountZero: addZero(item[1], askFixed),
          formatAmount: BigNumber(item[1]).toFixed(askFixed),
          price: item[0],
          formatPrice: BigNumber(item[0]).toFixed(bidFixed),
          priceBefore: before,
          priceAfter: after,
          mySize: count,
          total: BigNumber(item[0])
            .times(item[1])
            .toFixed(8, 1),
          id: `${item[0]}-${item[1]}`,
        })
      })
      return { orders, max, priceOne }
    },
    // 排序
    sortOrder: () => (a, b) => {
      a = parseFloat(a[0])
      b = parseFloat(b[0])
      return a > b ? -1 : b > a ? 1 : 0
    },
    // 补零
    addZero: () => (value, fixed) => {
      if (!fixed) return ''
      const zero = ['', '0', '00', '000', '0000', '00000', '000000', '0000000', '00000000']
      const d = value.toString().split('.')[1]
      if (!d) return ''
      const z = zero[fixed - d.length]
      if (!z) return ''
      return z
    },
    // 价格分割
    priceSplit: () => (value, fixed) => {
      const price = Number(value)
        .toFixed(fixed)
        .toString()
      const split = price.split('.')
      return [split[0], split[1]]
    },
    // 深度合并
    depthDataMerge: () => (data = [], fixed = 0, type = 'ask') => {
      const result = new Map()
      data.map(item => {
        let [price, count] = item
        let fixPrice
        if (type === 'ask') {
          // 卖单合并时向上取整
          fixPrice = BigNumber(price).toFixed(fixed, 0)
        } else {
          // 买单合并时向下取整
          fixPrice = BigNumber(price).toFixed(fixed, 1)
        }
        if (result.has(fixPrice)) {
          result.set(
            fixPrice,
            BigNumber(result.get(fixPrice))
              .plus(count)
              .toString(),
          )
        } else {
          result.set(fixPrice, count)
        }
      })
      return Array.from(result)
    },
  },
  mutations: {
    // 初始化orderbook
    setOrderBook(state, data) {
      if (state.marketId && state.marketId != data.marketId) return false
      state.oriOrderbook = {
        bids: [],
        asks: [],
      }
      state.cacheOrderBook.bids.clear()
      state.cacheOrderBook.asks.clear()
      state.cacheCount = 0

      if (!state.increment) {
        state.oriOrderbook = data
      } else {
        state.isInited = true
        pusher.myChannelList[`full-${data.marketId}`].unbind()
        pusher.unsubscribe(`full-${data.marketId}`)

        state.cacheOrderBook.timestamp = data.timestamp
        utils.mergeData(state.cacheOrderBook, data)
        state.cacheCount = state.cacheCount + 1
      }
    },
    // 更新orderbook
    updateOrderBook(state, data) {
      if (state.marketId && state.marketId != data.marketId) return false
      if (!state.increment) {
        state.oriOrderbook = data
      } else {
        // 请求返回之前阻塞更新
        state.blockList.asks.push(...data.asks)
        state.blockList.bids.push(...data.bids)
        if (state.isInited) {
          utils.mergeData(state.cacheOrderBook, state.blockList)
          state.cacheCount = state.cacheCount + 1
          state.blockList = {
            asks: [],
            bids: [],
          }
        }
      }
    },
    clearOrderBook(state) {
      state.oriOrderbook = {
        bids: [],
        asks: [],
      }
      state.cacheOrderBook.bids.clear()
      state.cacheOrderBook.asks.clear()
      state.cacheCount = 0
      state.isInited = false
      state.blockList = {
        asks: [],
        bids: [],
      }
    },
    depthMerge(state, data) {
      state.fixed = data
    },
    reconnection(state, id) {
      state.isInited = false
      // 重连后0.5之后再订阅全量数据防止后端数据丢失
      setTimeout(() => {
        pusher.myChannelList[`full-${id}`] = pusher.subscribe(`full-${id}`)
        bindChannelEvent(pusher.myChannelList[`full-${id}`], id)
      }, 500)
    },
    setMarketId(state, id) {
      state.marketId = id
    },
  },
  actions: {
    async getOrderBook({ commit }, id) {
      // 请求数据数据后先清除旧数据
      commit('clearOrderBook')
      const resp = await api.query('DEPTH', { market: id })
      Vue.$log.info(resp)
      const result = resp && resp.data && resp.data.depth
      // console.log('<----depth---->', result)
      if (!result) return false
      const newResult = cloneDeep(result)
      newResult.marketId = id
      commit('setOrderBook', newResult)
    },
    setOrderBook({ commit }, params) {
      commit('setOrderBook', { ...params.data, marketId: params.marketId })
      commit('updateOrderBook', { ...{ asks: [], bids: [] }, marketId: params.marketId })
    },
  },
}
