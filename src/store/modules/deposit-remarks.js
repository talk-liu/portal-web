import api from '@/graphql'
export default {
  namespaced: true,
  state: {
    depositRemarks: {},
  },
  mutations: {
    setDepositRemarks(state, data) {
      state.depositRemarks = data
    }
  },
  actions: {
    async getDepositRemarks({ commit }) {
      const resp = await api.query('DEPOSITREMARKSNEW')
      const result = resp && resp.data && resp.data.icoAndOp && resp.data.icoAndOp.depositRemarksNew
      if (result) {
        commit('setDepositRemarks', result)
      }
    },
  },
}