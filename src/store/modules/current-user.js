import api from '@/graphql'
import pusher from '@/pusher'

export default {
  namespaced: true,
  state: {
    currentUser: null,
    isAuthed: false, // 是否已经拉取过登录信息
  },
  getters: {
    isLogin: state => !!state.currentUser,
    isKYC: state => {
      return state.currentUser.id_document_state === 'third_verified'
    },
    limitWithdraw: state => {
      return state.currentUser && state.currentUser.id_document_state === 'third_verified' ? '20,000' : '10,000'
    },
    isMiner: ({ currentUser }) => {
      return currentUser && currentUser.member_tags && currentUser.member_tags.includes('miner')
    },
  },
  mutations: {
    setCurrentUser(state, member) {
      state.currentUser = member
      if (member && member.sn) {
        // 订阅私有推送
        pusher.subscribe(`private-${member.sn}`)
        // 自选交易对信息
        this.dispatch('loveTickers/getAllLoveTickers')
        // 是否是创世矿工
        this.dispatch('getIsMiner')
        // 获取资产信息
        this.dispatch('accounts/getAccounts')
      }
    },
    setAuthed(state) {
      state.isAuthed = true
    },
  },
  actions: {
    async getCurrentUser(store) {
      if (process.env.NODE_ENV === 'production') {
        store.commit('setCurrentUser', window.gon.member)
        store.commit('setAuthed')
      } else {
        const resp = await api.query('MEMBER')
        const result = resp && resp.data && resp.data.member
        store.commit('setAuthed')
        if (!result) return false
        store.commit('setCurrentUser', result)
      }
    },
  },
}
