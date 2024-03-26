import find from 'lodash/find'
import api from '@/graphql'

export default {
  namespaced: true,
  state: {
    oriMarkets: [],
  },
  getters: {
    currentMarket: ({ oriMarkets }, getters, rootState) => {
      const curId = rootState.tickers.currentMarketId
      const curMarket = find(oriMarkets, { id: curId })
      return curMarket ? curMarket : { fee: 0.001 }
    },
    formatMarketName: ({ oriMarkets }) => id => {
      const market = find(oriMarkets, { id: id })
      if (!market) return { name: id.toUpperCase() }
      return market
    },
  },
  mutations: {
    setMarkets(state, data) {
      state.oriMarkets = data
    },
  },
  actions: {
    async getMarkets({ commit }) {
      if (process.env.NODE_ENV === 'production') {
        commit('setMarkets', window.gon.markets)
      } else {
        const resp = await api.query('MARKETS')
        const result = resp && resp.data && resp.data.market && resp.data.market.list
        // console.log('<----markets---->', result)
        if (!result) return false
        commit('setMarkets', result)
      }
    },
  },
}
