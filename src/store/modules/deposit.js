import api from '@/graphql'
export default {
  namespaced: true,
  actions: {
    async getDepositAddress(store, params) {
      return await api.query('DEPOSITADDRESS', params, 'no-cache')
    },
  },
}
