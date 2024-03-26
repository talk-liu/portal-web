import cloneDeep from 'lodash/cloneDeep'
import api from '@/graphql'

export default {
  namespaced: true,
  state: {
    currencies: {},
  },
  getters: {
    curCoin: ({ currencies }) => code => {
      return currencies[code] || {}
    },
    quoteCurrencies: ({ currencies }, getters, rootState, rootGetters) => {
      const quoteUnit = rootGetters['tickers/quoteUnit']
      return currencies[quoteUnit] || { minimum_order_amount: 0 }
    },
  },
  mutations: {
    updateCurrencies(state, data) {
      state.currencies = data
    },
  },
  actions: {
    async getCurrencies({ commit }) {
      if (process.env.NODE_ENV === 'production') {
        if (window.gon.frontedCurrency) {
          commit('updateCurrencies', window.gon.frontedCurrency)
        }
      } else {
        const resp = await api.query('CURRENCIES')
        const result = resp && resp.data && resp.data.frontedCurrency && resp.data.frontedCurrency.currencies
        // console.log('<----currencies---->', result)
        if (!result) return false
        commit('updateCurrencies', cloneDeep(result))
      }
    },
  },
}
