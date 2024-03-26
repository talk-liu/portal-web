import api from '@/graphql'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import BigNumber from 'bignumber.js'
export default {
  namespaced: true,
  state: {
    oriOthers: [],
    othersMeta: {},
  },
  getters: {
    othersHistory: ({ oriOthers }) => {
      let others = cloneDeep(oriOthers)
      others.map(item => {
        item.date = item.created_at && dayjs(item.created_at).format('MM-DD HH:mm:ss')
        item.currency = item.currency.toUpperCase()
        item.amount = BigNumber(item.amount).toFixed(8, 1)
      })
      return others
    },
  },
  mutations: {
    setOthers: (state, data) => {
      if (data.isLoadMore) {
        state.oriOthers = state.oriOthers.concat(data.deposits)
      } else {
        state.oriOthers = data.deposits
      }
    },
    setOthersMeta: (state, data) => (state.othersMeta = data),
  },
  actions: {
    async getOthersHistory({ commit }, params) {
      const resp = await api.query('ACCOUNTTRANSFERHISTORY', params, 'no-cache')
      const result = resp && resp.data && resp.data.accountTransferHistory
      if (result && result.deposits) {
        let res = cloneDeep(result)
        res.isLoadMore = params.isLoadMore
        commit('setOthers', res)
        commit('setOthersMeta', res.meta)
      }
    },
  },
}