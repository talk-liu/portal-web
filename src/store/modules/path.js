export default {
  state: {
    beforeSigninPath: ''
  },
  namespaced: true,
  mutations: {
    setBeforeSigninPath(state, path) {
      state.beforeSigninPath = path
    },
    clearBeforeSigninPath(state) {
      state.beforeSigninPath = ''
    }
  }
}