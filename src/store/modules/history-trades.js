import cloneDeep from 'lodash/cloneDeep'
// import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'

import api from '@/graphql'

export default {
  namespaced: true,
  state: {
    oriTrades: [],
    tradeMeta: {},
  },
  getters: {
    // 所有历史成交订单
    allTrades: ({ oriTrades }, getters, rootState, rootGetters) => {
      let trades = cloneDeep(oriTrades)
      trades.map(item => {
        const name = rootGetters['markets/formatMarketName'](item.market).name
        const quote = name.split('/')[1]
        item.marketName = name
        item.fFunds = `${item.funds} ${quote}`
        item.fFee = `${item.fee} ${quote}`
        item.date = dayjs(item.date).format('MM-DD HH:mm:ss')
      })
      return trades
    },
  },
  mutations: {
    // 初始化orders
    setTrades(state, data) {
      state.oriTrades = data
    },
    // 添加分页meta
    setTradeMeta: (state, tradeMeta) => (state.tradeMeta = tradeMeta),
  },
  actions: {
    async getHistoryTrades({ commit }, { page, page_size, order_id, from, to, market }) {
      const resp = await api.query(
        'HISTORYTRADES',
        {
          page: page || 1,
          page_size: page_size || 20,
          order_id,
          from,
          to,
          market,
        },
        'no-cache',
      )
      const result = resp && resp.data && resp.data.historyTrade
      if (!result && !result.trades) return false
      commit('setTrades', cloneDeep(result.trades))
      commit('setTradeMeta', result.meta)
    },
  },
}
