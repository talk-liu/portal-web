import api from '@/graphql'
export default {
  namespaced: true,
  state: {
    fundsInterlocution: {},
  },
  mutations: {
    setFundsInterlocution(state, data) {
      state.fundsInterlocution = data
    }
  },
  actions: {
    async getFundsInterlocution({ commit }) {
      const resp = await api.query('FUNDSINTERLOCUTION')
      const result = resp && resp.data && resp.data.icoAndOp && resp.data.icoAndOp.fundsInterlocution
      if (result) {
        commit('setFundsInterlocution', result)
      }
    },
  },
}