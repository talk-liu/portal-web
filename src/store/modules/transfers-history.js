import api from '@/graphql'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import BigNumber from 'bignumber.js'
export default {
  namespaced: true,
  state: {
    oriTransfers: [],
    transfersMeta: {},
  },
  getters: {
    transfersHistory: ({ oriTransfers }) => {
      let transfers = cloneDeep(oriTransfers)
      transfers.map(item => {
        item.currency = item.code.toUpperCase()
        item.date = item.created_at && dayjs(item.created_at).format('MM-DD HH:mm:ss')
        item.mark = item.mark || '- -'
        item.amount = BigNumber(item.amount).toFixed(4, 1)
      })
      return transfers
    },
  },
  mutations: {
    setTransfers: (state, data) => (state.oriTransfers = data),
    setTransfersMeta: (state, data) => (state.transfersMeta = data),
  },
  actions: {
    async getTransfersHistory({ commit }, params) {
      const resp = await api.query('TRANSFERSHISTORY', params, 'no-cache')
      const result = resp && resp.data && resp.data.optionTransfersHistory
      if (result && result.transfers) {
        commit('setTransfers', cloneDeep(result.transfers))
        commit('setTransfersMeta', result.meta)
      }
    },
  },
}