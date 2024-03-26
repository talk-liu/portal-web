import api from '@/graphql'
export default {
  namespaced: true,
  actions: {
    async documentSms(store, params) {
      return await api.mutate('DOCUMENTSMS', params)
    },
  },
}
