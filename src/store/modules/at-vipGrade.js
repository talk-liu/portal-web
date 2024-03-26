import api from '@/graphql'
export default {
  namespaced: true,
  state: {
    at_vip_grade:''
  },
  mutations: {
    setVipGrade: (state, data) => {
      state.at_vip_grade = data.result.at_vip_grade
    },
  },
  actions: {
    async getVipGrade({ commit }) {
      const resp = await api.query('ATVIPGRADE')
      if (resp && resp.data && resp.data.atVipGrade) {
        commit('setVipGrade', resp.data.atVipGrade)
      }
    }
  }
}
