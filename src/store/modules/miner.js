import api from '@/graphql'

const state = {
  isMiner: false,
}

const getters = {
  isMiner: state => state.isMiner,
}

const actions = {
  async getIsMiner(store) {
    try {
      const key = 'isMiner' + store.rootState.currentUser.id
      const miner = sessionStorage.getItem(key)
      if (miner === 'yes') {
        state.isMiner = true
      } else {
        store.commit('getIsMiner', await api.query('ISMINER'))
      }
    } catch (error) {
      console.log(error)
    }
  },
}

const mutations = {
  getIsMiner(state, data) {
    const d = data.data.isMiner.ret
    if (!d.data) {
      return
    }
    const key = 'isMiner' + d.data[0]
    if (d.success && d.data) {
      state.isMiner = true
      sessionStorage.setItem(key, 'yes')
    } else {
      state.isMiner = false
      sessionStorage.setItem(key, 'no')
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
