import api from '@/graphql'
export default {
  namespaced: true,
  state: {
    ieoRspVo: {},
    ieoRateList: [],
    currentRate: 0
  },
  getters: {
    ieoCode: (state) => {
      return state.ieoRspVo.ieoCode
    },
    exchangeRate: (state) => (currencyCode) => {
      for (let i = 0; i < state.ieoRateList.length; i++) {
        if (state.ieoRateList[i].currencyCode.toUpperCase() === currencyCode.toUpperCase()) {
          return state.ieoRateList[i].rate
        }
      }
    },
    paymentCurrency: (state) => (currencyCode) => {
      for (let i = 0; i < state.ieoRateList.length; i++) {
        if (state.ieoRateList[i].currencyCode.toUpperCase() === currencyCode.toUpperCase()) {
          return state.ieoRateList[i].currency
        }
      }
    }
  },
  mutations: {
    setIeoInfo: (state, data) => {
      state.ieoRspVo = data.ieoRspVo
      state.currentRate = data.currentRate
      state.ieoRateList = data.ieoRateList
    },
  },
  actions: {
    async getIeoInfo({ commit }, params) {
      const resp = await api.query('IEOINFO', params, 'no-cache')
      if (resp && resp.data) {
        commit('setIeoInfo', resp.data.ieoInfo)
      }
    }
  }
}
