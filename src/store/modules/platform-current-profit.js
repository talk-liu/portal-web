import api from '@/graphql'
import BigNumber from 'bignumber.js'
export default {
  namespaced: true,
  state: {
    platformCurrentProfit: {},
    atProfitRate: 0,
    platformProfit: {}
  },
  getters: {
    platformCurrentProfit: state => state.platformProfit.current_profit && state.platformProfit.current_profit.beu,
    atProfitRate: state => BigNumber(state.platformProfit.at_profit_rate).multipliedBy(100).toFixed(4),
    calculated: state => state.platformProfit.distributed
  },
  mutations: {
    setPlatform: (state, data) => {
      state.platformProfit = data
    },
  },
  actions: {
    async getPlatformData({ commit }) {
      const resp = await api.query('PLATFORMPROFIT')
      const result = resp && resp.data && resp.data.platformProfit
      commit('setPlatform', result)
    },
  },
}