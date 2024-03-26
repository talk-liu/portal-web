import api from '@/graphql'
import cloneDeep from 'lodash/cloneDeep'
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
export default {
  namespaced: true,
  state: {
    oriIeoOrderList: [],
    ieoHistoryMeta: {},
  },
  getters: {
    ieoOrderList: ({ oriIeoOrderList }) => {
      let ieoOrderList = cloneDeep(oriIeoOrderList)
      ieoOrderList.map(item => {
        item.date = item.created_at && dayjs(item.created_at).format('MM-DD HH:mm:ss')
        item.ieoCode = item.ieoCode.toUpperCase()
        item.currencyAmount = BigNumber(item.currencyAmount).toFixed(4, 1)
        item.amount = BigNumber(item.amount).toFixed(4, 1)
        item.buyAmount = BigNumber(item.buyAmount).toFixed(4, 1)
        item.rewardAmount = BigNumber(item.rewardAmount).toFixed(4, 1)
      })
      return ieoOrderList
    },
  },
  mutations: {
    setIeoOrders: (state, data) => {
      if (data.isLoadMore) {
        state.oriIeoOrderList = state.oriIeoOrderList.concat(data.ieoOrderList)
      } else {
        state.oriIeoOrderList = data.ieoOrderList
      }
    },
    setIeoOrderMeta: (state, data) => (state.ieoHistoryMeta = data),
  },
  actions: {
    async getIeoHistory({ commit }, params) {
      const resp = await api.query('IEOHISTORY', params, 'no-cache')
      const result = resp && resp.data && resp.data.ieoHistoryOrderList
      if (result && result.ieoOrderList) {
        let res = cloneDeep(result)
        res.isLoadMore = params.isLoadMore
        commit('setIeoOrders', res)
        commit('setIeoOrderMeta', res.meta)
      }
    },
  },
}
