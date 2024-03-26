import api from '@/graphql'
export default {
  namespaced: true,
  state: {
    count:'',
    contentData:[],
    groupName:'',
    vipGrade:'',
    totalPoint:'',
    groupNameCn:'',
  },
  mutations: {
    setGame: (state, data) => {
      state.count = data.count
      state.contentData = data.content
      state.groupName = data.groupName
      state.vipGrade = data.vipGrade
      state.totalPoint = data.totalPoint
      state.groupNameCn = data.groupNameCn
    },
  },
  actions: {
    async getGame({ commit }, params) {
      const resp = await api.query('ATGAME', params, 'no-cache')
      if (resp && resp.data && resp.data.atGameTaskList) {
        commit('setGame', resp.data.atGameTaskList)
      }
    }
  }
}
