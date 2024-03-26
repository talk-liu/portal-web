import api from '@/graphql'
import cloneDeep from 'lodash/cloneDeep'
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
export default {
  namespaced: true,
  state: {
    oriDeposits: [],
    depositsMeta: {},
  },
  getters: {
    depositsHistory: ({ oriDeposits }) => {
      let deposits = cloneDeep(oriDeposits)
      deposits.map(item => {
        item.date = item.created_at && dayjs(item.created_at).format('MM-DD HH:mm:ss')
        item.currency = item.currency.toUpperCase()
        item.amount = BigNumber(item.amount).toFixed(8, 1)
      })
      return deposits
    },
  },
  mutations: {
    setDeposits: (state, data) => {
      if (data.isLoadMore) {
        state.oriDeposits = state.oriDeposits.concat(data.deposits)
      } else {
        state.oriDeposits = data.deposits
      }
    },
    setDepositsMeta: (state, data) => (state.depositsMeta = data),
  },
  actions: {
    async getDepositHistory({ commit }, params) {
      const resp = await api.query('DEPOSITHISTORY', params, 'no-cache')
      const result = resp && resp.data && resp.data.depositHistory
      if (result && result.deposits) {
        let res = cloneDeep(result)
        res.isLoadMore = params.isLoadMore
        commit('setDeposits', res)
        commit('setDepositsMeta', res.meta)
      }
    },
  },
}