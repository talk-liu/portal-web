import api from '@/graphql'
export default {
  namespaced: true,
  state: {
    tokenList: [],
  },
  mutations: {
    setTokens(state, data) {
      state.tokenList = data
    }
  },
  actions: {
    async getTokens({ commit }) {
      const resp = await api.query('APITOKENS', {}, 'no-cache')
      const result = resp && resp.data && resp.data.getApiToken && resp.data.getApiToken.result
      if (result) {
        commit('setTokens', result)
      }
    },
    async updateApi(store, params) {
      return await api.mutate('UPDATEAPI', params)
    },
    async deleteApi(store, params) {
      return await api.mutate('DELETEAPI', params)
    },
    async createApi(store, params) {
      return await api.mutate('CREATEAPI', params)
    }
  }
}
