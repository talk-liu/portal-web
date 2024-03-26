import api from '@/graphql'
// initial state
const state = {
  voteInfo: {},
  voteHistoryInfo: [],
  voteRewardHistory: [],
  voteCountInfo: []
}

// getters
const getters = {
  voteInfo: state => state.voteInfo,
  voteHistoryInfo: state => state.voteHistoryInfo,
  voteRewardHistory: state => state.voteRewardHistory,
  voteCountInfo: state => state.voteCountInfo
}

const actions = {
  async getVoteInfo(store) {
    try {
      store.commit('getVoteInfo', await api.query('VOTECOIN'))
    } catch (error) {
      console.error(error)
    }
  },
  async getVoteHistory(store) {
    try {
      store.commit('getVoteHistory', await api.query('VOTEHISTORY'))
    } catch (error) {
      console.error(error)
    }
  },
  async getVoteCountInfo(store, params) {
    try {
      store.commit('getVoteCountInfo', await api.query('VOTECOUNT', params))
    } catch (error) {
      console.error(error)
    }
  },
}

// mutations
const mutations = {
  getVoteInfo(state, data) {
    state.voteInfo = data.data.voteCoin.voteInfo
  },
  getVoteHistory(state, data) {
    state.voteHistoryInfo = data.data.voteCoinHistory.voteHistoryInfo
    state.voteRewardHistory = data.data.voteCoinHistory.voteRewardHistory
  },
  getVoteCountInfo(state, data) {
    state.voteCountInfo = data.data.voteCount.voteCountInfo
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
