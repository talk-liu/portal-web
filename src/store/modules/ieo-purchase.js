import api from '@/graphql'
import Message from '@/utils/message'
export default {
  namespaced: true,
  state: {
    data: -1
  },
  mutations: {
    setBuyIeoResult: (state, data) => {
      state.data = data.data
    },
  },
  actions: {
    async submitIeoOrder({ commit }, params) {
      const resp = await api.query('IEOPURCHASE', params, 'no-cache')
      if (resp && resp.data) {
        if (resp.data.submitOrder.data === 1) {
          Message.success('Successfully Ordered')
          setTimeout(function() {
            window.location.reload()
          }, 2000)
        } else {
          Message.error('Order Failed')
        }
        commit('setBuyIeoResult', resp.data.submitOrder)
      }
    }
  }
}
