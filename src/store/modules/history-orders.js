import cloneDeep from 'lodash/cloneDeep'
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'

import api from '@/graphql'

export default {
  namespaced: true,
  state: {
    oriOrders: [],
    orderMeta: {},
  },
  getters: {
    // 所有历史订单
    allOrders: ({ oriOrders }, getters, rootState, rootGetters) => {
      // , { formatFixed }, rootState, rootGetters
      // const currentTicker = rootGetters['tickers/currentTicker']
      // const askFixed = currentTicker.ask_fixed
      // const bidFixed = currentTicker.bid_fixed
      let orders = cloneDeep(oriOrders)
      orders.map(item => {
        item.kind = item.kind || item.side
        item.market = item.market || item.currency
        item.marketName = rootGetters['markets/formatMarketName'](item.market).name
        item.date = dayjs(item.at || item.created_at).format('MM-DD HH:mm:ss')
        item.type = item.market // todo 格式化市场
        // item.price = formatFixed(item.price, bidFixed)
        // item.volume = formatFixed(item.volume, askFixed)
        // item.origin_volume = formatFixed(item.origin_volume, askFixed)
        item.total = BigNumber(item.price || 0)
          .multipliedBy(item.executed_volume || 0)
          .toString()
        // .toFixed(8, 1)
      })
      return orders
    },
    // 当前市场订单
    currentOrders: (state, { allOrders }, rootState) => {
      // const currentTicker = rootGetters['tickers/currentTicker']
      // const curId = currentTicker.code
      const curId = rootState.tickers.currentMarketId
      if (!curId) return []
      return allOrders.filter(item => item.market === curId)
    },
    formatFixed: () => (value, fixed) => {
      return BigNumber(value || 0).toFixed(fixed, 1)
    },
  },
  mutations: {
    // 初始化orders
    setOrders(state, data) {
      state.oriOrders = data
    },
    // 更新order
    updateOrder(state, data) {
      const newData = cloneDeep(data)

      // 数据兼容处理
      newData.at = data.at * 1000
      newData.remaining_volume = data.volume
      newData.volume = data.origin_volume
      newData.executed_volume = BigNumber(data.origin_volume || 0)
        .minus(data.volume || 0)
        .toString()

      state.oriOrders.unshift(newData)
    },
    // 添加分页meta
    setOrderMeta: (state, orderMeta) => (state.orderMeta = orderMeta),
  },
  actions: {
    async getHistoryOrders({ commit }, { page, page_size, from, to, market, side, no_canceled }) {
      const resp = await api.query(
        'ORDERS',
        {
          no_wait: 'yes',
          page: page || 1,
          page_size: page_size || 100,
          from,
          to,
          market,
          side,
          no_canceled,
        },
        'no-cache',
      )
      const result = resp && resp.data && resp.data.order
      // console.log('<----history orders---->', result)
      if (!result && !result.orders) return false
      commit('setOrders', cloneDeep(result.orders))
      commit('setOrderMeta', result.meta)
    },
  },
}
