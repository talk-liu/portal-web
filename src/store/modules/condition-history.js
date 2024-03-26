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
    // 所有订单
    allOrders: ({ oriOrders }, getters, rootState, rootGetters) => {
      let orders = cloneDeep(oriOrders)
      orders.map(item => {
        item.marketName = rootGetters['markets/formatMarketName'](item.market_code).name
        item.date = dayjs(item.created_time * 1000).format('MM-DD HH:mm:ss')
        item.total = BigNumber(item.price || 0)
          .multipliedBy(item.volume || 0)
          .toString()
      })
      return orders
    },
    // 当前市场订单
    currentOrders: (state, { allOrders }, rootState) => {
      const curId = rootState.tickers.currentMarketId
      if (!curId) return []
      return allOrders.filter(item => item.market_code === curId)
    },
  },
  mutations: {
    // 初始化orders
    setConditionOrders(state, data) {
      state.oriOrders = data
    },
    // 更新order
    updateOrder(state, data) {
      state.oriOrders.unshift(data)
    },
    // 添加分页meta
    setOrderMeta: (state, orderMeta) => (state.orderMeta = orderMeta),
  },
  actions: {
    async getConditionHistory({ commit }, { page, page_size, begin_time, end_time }) {
      const resp = await api.query('CONDITIONHISTORY', {
        begin_time: begin_time,
        end_time: end_time,
        condition_type: 1,
        page: page || 1,
        page_size: page_size || 20,
      })
      const result = resp && resp.data && resp.data.conditionHistory && resp.data.conditionHistory
      if (!result && !result.conditions) return false
      commit('setConditionOrders', cloneDeep(result.conditions))
      commit('setOrderMeta', result.meta)
    },
  },
}
