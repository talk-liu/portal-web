import find from 'lodash/find'
import dayjs from 'dayjs'
import BigNumber from 'bignumber.js'

import api from '@/graphql'

export default {
  namespaced: true,
  state: {
    oriVouchers: {
      vouchers: [],
      market_voucher: {},
    },
  },
  getters: {
    allVouchers: ({ oriVouchers }) => {
      const result = {}
      oriVouchers.vouchers.map(item => {
        item.markets &&
          item.markets.map(m => {
            let market = item.currency + m
            result[market] = {
              rate: BigNumber(item.rate)
                .times(100)
                .toString(),
            }
          })
      })
      return result
    },
    currentVouchers: ({ oriVouchers }, getters, rootState, rootGetters) => {
      let result = {}
      const currentTicker = rootGetters['tickers/currentTicker']
      const activeVouchers = oriVouchers.vouchers
      const cur = find(activeVouchers, { currency: currentTicker.base_unit })
      if (!cur) return {}
      if (cur.markets.includes(currentTicker.quote_unit)) {
        result = {
          currency: cur.currency,
          amount: BigNumber(cur.origin_amount)
            .minus(cur.amount)
            .toString(),
          origin_amount: cur.origin_amount,
          date: dayjs(cur.date).format('YYYY.MM.DD'),
          rate: BigNumber(cur.rate).times(100) + '%',
          quote: currentTicker.quote_unit,
        }
      }
      return result
    },
  },
  mutations: {
    setVouchers(state, data) {
      state.oriVouchers = data
    },
  },
  actions: {
    async getVouchers({ commit }) {
      const resp = await api.query('VOUCHERS')
      const result = resp && resp.data && resp.data.voucher
      // console.log('<----vouchers---->', result)
      if (!result || !result.vouchers) return false
      commit('setVouchers', result)
    },
  },
}
