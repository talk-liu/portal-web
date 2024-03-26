import api from '@/graphql'
// import cloneDeep from 'lodash/cloneDeep'
export default {
  namespaced: true,
  state: {
    fund_sources: [],
    withdrawMe: null,
  },
  getters: {
    fund_sources: state => state.fund_sources,
    withdrawMe: state => state.withdrawMe,
  },
  mutations: {
    setWithdrawAddress(state, data) {
      state.fund_sources = data && data.data.withdrawAddress
    },
    setWithdrawMe(state, data) {
      state.withdrawMe = data && data.data.me.result
    },
  },
  actions: {
    async getWithdrawAddress({ commit }) {
      try {
        commit('setWithdrawAddress', await api.query('WITHDRAWADDRESS', {}, 'no-cache'))
      } catch (error) {
        console.error(error)
      }
    },
    async delWithdrawAddress(store, params) {
      return await api.mutate('DELWITHDRAWADDRESS', params)
    },
    async addWithdrawAddress(store, params) {
      return await api.mutate('ADDWITHDRAWADDRESS', params)
    },
    async getWithdrawMe({ commit }) {
      try {
        commit('setWithdrawMe', await api.query('WITHDRAWME'))
      } catch (error) {
        console.error(error)
      }
    },
    async withdrawCreate(store, params) {
      return await api.mutate('WITHDRAWCREATE', params)
    },
    async withdrawResend(store, params) {
      return await api.mutate('WITHDRAWRESEND', params)
    },
    async withdrawVerify(store, params) {
      return await api.mutate('WITHDRAWVERIFY', params)
    }
  },
}