// OFFLINE
import api from '@/graphql'

export default {
  namespaced: true,
  state: {
    optionCurrencies: [],
  },
  mutations: {
    updateOptionCurrencies(state, data) {
      state.optionCurrencies = data.data.optionCurrencies
    },
  },
  actions: {
    async getOptionCurrencies({ commit }) {
      commit('updateOptionCurrencies', await api.query('OPTIONCURRENCIES'))
    }
  },
}
