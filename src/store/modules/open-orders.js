import find from 'lodash/find'
import cloneDeep from 'lodash/cloneDeep'
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'

import api from '@/graphql'

export default {
  namespaced: true,
  state: {
    oriOrders: [],
  },
  getters: {
    // 所有订单
    allOrders: ({ oriOrders }, getters, rootState, rootGetters) => {
      // , { formatFixed }, rootState, rootGetters
      // {"id":12773610,"at":1538190298.292972,"market":"atusdt","kind":"ask","price":"30.0","state":"wait","state_text":"等待成交","volume":"1.0","origin_volume":"1.0","ord_type":"limit","amount":"0.0"}

      // avg_price: "0.0"
      // created_at: 1540452203715
      // executed_volume: "0.0"
      // id: "13045019"
      // market: "atusdt"
      // ord_type: "limit"
      // price: "0.8"
      // remaining_volume: "15.0"
      // side: "bid"
      // state: "wait"
      // total_fee: "0"
      // trades_count: "0"
      // volume: "15.0"

      // const currentTicker = rootGetters['tickers/currentTicker']
      // const askFixed = currentTicker.ask_fixed
      // const bidFixed = currentTicker.bid_fixed
      let orders = cloneDeep(oriOrders)
      orders.map(item => {
        item.kind = item.kind || item.side // 字段兼容
        item.market = item.market || item.currency
        item.marketName = rootGetters['markets/formatMarketName'](item.market).name
        item.isHover = item.isHover || false
        item.date = dayjs(item.at || item.created_at).format('MM-DD HH:mm:ss')
        item.oriPrice = item.price // 提供给深度图查找坐标用
        // item.price = formatFixed(item.price, bidFixed)
        // item.volume = formatFixed(item.volume, askFixed)
        // item.origin_volume = formatFixed(item.origin_volume, askFixed)
        // item.remaining_volume = formatFixed(item.remaining_volume, askFixed)
        // item.executed_volume = BigNumber(item.origin_volume || 0)
        //   .minus(item.volume || 0)
        //   .toFixed(askFixed, 1)
        item.total = BigNumber(item.price || 0)
          .multipliedBy(item.volume || 0)
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
      let newData = cloneDeep(data)
      // 防止市价进入当前委托
      if (newData.ord_type === 'market') return false
      // 数据兼容处理
      newData.at = data.at * 1000
      newData['remaining_volume'] = data.volume
      newData.volume = data.origin_volume
      newData.executed_volume = BigNumber(data.origin_volume || 0)
        .minus(data.volume || 0)
        .toString()

      const old = find(state.oriOrders, { id: data.id })
      if (old) {
        let index = state.oriOrders.indexOf(old)
        state.oriOrders.splice(index, 1, newData)
      } else {
        state.oriOrders.unshift(newData)
      }
    },
    // 删除order
    delOrder(state, data) {
      const order = find(state.oriOrders, o => {
        return o.id == data.id
      })
      const index = state.oriOrders.indexOf(order)
      state.oriOrders.splice(index, 1)
    },
    // 移除已成交order
    doneOrder(state, data) {
      const oldOrder = find(state.oriOrders, { id: data.id })
      if (!oldOrder) return false
      // 推送volume为order未成交数量
      const isDone = BigNumber(data.volume).isZero()
      if (!isDone) return false
      const index = state.oriOrders.indexOf(oldOrder)
      state.oriOrders.splice(index, 1)
    },
    // 选中订单
    hoverCurrentOrder(state, data) {
      if (!data) return false
      const orders = cloneDeep(state.oriOrders)
      const order = find(orders, { id: data.id })
      const index = orders.indexOf(order)
      orders[index].isHover = data.isHover || false
      state.oriOrders = orders
    },
    // 清空数据
    clearOrder(state) {
      state.oriOrders = []
    },
  },
  actions: {
    async getOrders({ commit }) {
      const resp = await api.query('ORDERS', { state: 'wait', page: 1, page_size: 100 }, 'no-cache')
      const result = resp && resp.data && resp.data.order && resp.data.order.orders
      // console.log('<----open orders---->', result)
      if (!result) return false
      commit('setOrders', cloneDeep(result))
    },
    async cancelOrder(store, id) {
      return await api.mutate('CANCELORDER', { id: id })
    },
    async clearOrder({ commit }) {
      commit('clearOrder')
      return await api.mutate('CLEARORDER')
    },
  },
}
