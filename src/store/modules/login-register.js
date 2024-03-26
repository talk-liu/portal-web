import api from '@/graphql'

export default {
  namespaced: true,
  state: {
    captcha: {
      key: 'b588e40502bc4856bde2ea7ed8278fa0',
      provider: 'geetest',
    },
    registerActiveTasks: [],
  },
  getters: {},
  actions: {
    async getCaptcha({ commit }) {
      commit('setCaptcha', await api.query('CAPTCHA'))
    },
    async forgetPassword(store, params) {
      return await api.mutate('FORGETPASSWORD', params)
    },
    async forgetPasswordCode(store, params) {
      return await api.mutate('FORGETPASSWORDCODE', params)
    },
    async forgetPsw(store, params) {
      return await api.mutate('FORGETPSW', params)
    },
    async resetForgetPassword(store, params) {
      return await api.mutate('RESETFORGETPASSWORD', params)
    },
    async redirect(store, params) {
      return await api.mutate('REDIRECT', params)
    },
    async signin(store, params) {
      return await api.mutate('SIGNIN', params)
    },
    async signup(store, params) {
      return await api.mutate('SIGNUP', params)
    },
    async signout(state, params) {
      const data = await api.mutate('SIGNOUT', params)
      if (
        data &&
        data.data &&
        data.data.signout &&
        data.data.signout.result &&
        data.data.signout.result.result === 'success'
      ) {
        window.location.href = '/'
      }
    },
    async authTwoFactor(store, params) {
      return await api.mutate('AUTHTWOFACTOR', params)
    },
    async twoFrontendFactor(store, params) {
      return await api.mutate('TWOFRONTENDFACTOR', params)
    },
    async activationEmail(store, params) {
      return await api.mutate('ACTIVATIONEMAIL', params)
    },
    async activate(store, params) {
      return await api.mutate('ACTIVATE', params)
    },
    async getRegisterActive({ commit }) {
      if (window.gon && window.gon.registerActive) {
        return commit('setRegisterActive', window.gon.registerActive.tasks)
      } else {
        const resp = await api.query('REGISTERACTIVE')
        if (resp && resp.data && resp.data.icoAndOp && resp.data.icoAndOp.registerActive) {
          return commit('setRegisterActive', resp.data.icoAndOp.registerActive.tasks)
        }
      }
    },
  },
  mutations: {
    setCaptcha(state, data) {
      state.captcha = data && data.data && data.data.captcha
    },
    setRegisterActive(state, data) {
      state.registerActiveTasks = data
    }
  },
}
