import api from '@/graphql'
export default {
  namespaced: true,
  actions: {
    async faceppVerify() {
      return await api.mutate('FACEPPVERIFY', {})
    },
  },
}
