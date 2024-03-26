import api from '@/graphql'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import BigNumber from 'bignumber.js'
export default {
  namespaced: true,
  state: {
    oriWithdraws: [],
    withdrawsMeta: {},
  },
  getters: {
    withdrawsHistory: ({ oriWithdraws }) => {
      let withdraws = cloneDeep(oriWithdraws)
      withdraws.map(item => {
        item.date = item.created_at && dayjs(item.created_at).format('MM-DD HH:mm:ss')
        item.currency = item.currency.toUpperCase()
        item.amount = BigNumber(item.amount).toFixed(8, 1)
      })
      return withdraws
    },
  },
  mutations: {
    setWithdraws: (state, data) => {
      if (data.isLoadMore) {
        state.oriWithdraws = state.oriWithdraws.concat(data.withdraws)
      } else {
        state.oriWithdraws = data.withdraws
      }
    },
    setWithdrawsMeta: (state, data) => (state.withdrawsMeta = data),
  },
  actions: {
    async getWithdrawsHistory({ commit }, params) {
      const resp = await api.query('WITHDRAWSHISTORY', params, 'no-cache')
      const result = resp && resp.data && resp.data.withdrawsHistory
      if (result && result.withdraws) {
        let res = cloneDeep(result)
        res.isLoadMore = params.isLoadMore
        commit('setWithdraws', res)
        commit('setWithdrawsMeta', res.meta)
      }
    },
  },
}