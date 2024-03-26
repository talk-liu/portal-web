export default {
  namespaced: true,
  state: {
    ico: { title:'', list:[] },
    operationActivity: {},
  },
  getters: {
    ico: state => state.ico,
    operationActivity: state => state.operationActivity,
    getAppConfig: state => state.appConfig,
  },
  mutations: {
    getHomeData(state, data) {
      if (data.data.icoAndOp) {
        state.ico = data.data.icoAndOp.ico
        state.operationActivity = data.data.icoAndOp.operationActivity
      }
    },
  },
}
