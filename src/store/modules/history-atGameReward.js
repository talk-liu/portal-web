import api from '@/graphql'
export default {
  namespaced: true,
  state: {
    content:[]
  },
  mutations: {
    setGameRewardHistory: (state, data) => {
      state.content = data.content
    },
  },
  actions: {
    async getGameRewardHistory({ commit }, params) {
      const resp = await api.query('ATGAMEREWARDHISTORY', params, 'no-cache')
      const result = resp && resp.data && resp.data.atGameRewardHis
      console.log(result)
      if (result) {
        commit('setGameRewardHistory', resp.data.atGameRewardHis)
      }
    }
  }
}
