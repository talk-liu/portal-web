import api from '@/graphql'
export default {
  namespaced: true,
  actions: {
    async twoFactor(store, params) {
      return await api.mutate('TWOFACTOR', params)
    },
  },
}