// import find from 'lodash/find'
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
    // 删除order
    delOrder(state, data) {
      const order = state.oriOrders.filter(item => item.id == data.id)[0]
      const index = state.oriOrders.indexOf(order)
      state.oriOrders.splice(index, 1)
    },
    // 清空数据
    clearOrder(state) {
      state.oriOrders = []
    },
  },
  actions: {
    async getConditionCurrent({ commit }) {
      const begin_time = dayjs()
        .add(-1, 'day')
        .unix()
      const resp = await api.query(
        'CONDITIONCURRENT',
        {
          begin_time: begin_time,
          condition_type: 1,
          page: 1,
          page_size: 100,
        },
        'no-cache',
      )
      const result = resp && resp.data && resp.data.conditionCurrent && resp.data.conditionCurrent.conditions
      if (!result) return false
      commit('setConditionOrders', cloneDeep(result))
    },
    async conditionCancel(store, id) {
      return await api.mutate('CONDITIONCANCEL', { id: id })
    },
    async clearCondition({ commit }) {
      commit('clearOrder')
      return await api.mutate('CONDITIONCLEAR')
    },
  },
}
