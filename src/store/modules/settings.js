import api from '@/graphql'

/*
VERIFY
APPFACTOR
APPFACTOROTP
CONFIRMFACTOR
RESETPASSWORD
PROXYAUTH
*/
export default {
  namespaced: true,
  state: {
    googleKey: {},
  },
  getters: {},
  actions: {
    async getGoogleKey({ commit }) {
      commit('setGoogleKey', await api.mutate('APPFACTOROTP'))
    },
    async appFactor(store, params) {
      return await api.mutate('APPFACTOR', params)
    },
    // 二次验证
    async verify(store, params) {
      return await api.mutate('VERIFY', params)
    },
    // 二次验证确认
    async confirmFactor(store, params) {
      return await api.mutate('CONFIRMFACTOR', params)
    },
    // telegram
    async proxyAuth(store, params) {
      return await api.mutate('PROXYAUTH', params)
    },
    // 重置密码
    async resetPassword(store, params) {
      return await api.mutate('RESETPASSWORD', params)
    },
  },
  mutations: {
    setGoogleKey(state, data) {
      state.googleKey = data && data.data && data.data.appFactorOtp && data.data.appFactorOtp.result
    },
  },
}
