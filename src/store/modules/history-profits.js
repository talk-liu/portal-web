import api from '@/graphql'
import cloneDeep from 'lodash/cloneDeep'
import BigNumber from 'bignumber.js'
export default {
  namespaced: true,
  state: {
    oriProfits: [],
    profitsMeta: {},
  },
  getters: {
    profitsHistory: ({ oriProfits }) => {
      let profits = cloneDeep(oriProfits)
      let profitData = {}
      profits.map((val) => {
        try {
          const extraObj = JSON.parse(val.extra_info)
          const date = extraObj.created_at
          if (profitData[date]) {
            if (profitData[date][val.currency]) {
              profitData[date][val.currency] = BigNumber(
                profitData[date][val.currency]
              )
                .plus(val.amount)
                .toFixed(8)
            } else {
              profitData[date][val.currency] = BigNumber(val.amount).toFixed(8)
            }
          } else {
            profitData[date] = {}
            profitData[date][val.currency] = val.amount
            profitData[date]['update_time'] = date
          }
        } catch (e) {
          console.log(e)
        }
      })
      return Object.values(profitData).reverse()
    },
  },
  mutations: {
    setProfits: (state, data) => {
      if (data.isLoadMore) {
        state.oriProfits = state.oriProfits.concat(data.deposits)
      } else {
        state.oriProfits = data.deposits
      }
    },
    setProfitsMeta: (state, data) => (state.profitsMeta = data),
  },
  actions: {
    async getProfitsHistory({ commit }, params) {
      const resp = await api.query('HISTORYPROFITS', params, 'no-cache')
      const result = resp && resp.data && resp.data.historyProfits
      if (result && result.deposits) {
        let res = cloneDeep(result)
        res.isLoadMore = params.isLoadMore
        commit('setProfits', res)
        commit('setProfitsMeta', res.meta)
      }
    },
  },
}