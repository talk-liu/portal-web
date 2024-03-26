// OFFLINE
// import mockAccounts from '@/mock/accounts'
import api from '@/graphql'
import { BigNumber } from 'bignumber.js'
import cloneDeep from 'lodash/cloneDeep'

export default {
  namespaced: true,
  state: {
    oriAccounts: {},
  },
  getters: {
    formatedOriAccount(state, getters, rootState, rootGetters) {
      const list = cloneDeep(state.oriAccounts)
      Object.keys(list).forEach(key => {
        const item = list[key]
        const val = BigNumber(item.balance)
          .plus(item.locked)
          .toString()
        const code = item.code || item.currency || item.option_currency.code
        const btc = rootGetters['tickers/changeCurrency'](code.toLowerCase(), 'btc', val)
        const usdt = rootGetters['tickers/changeCurrency'](code.toLowerCase(), 'usdt', val)
        item.usd = rootGetters['tickers/changeCurrency'](item.currency, 'usd', val)
        if(item.usdt === 0){
          item.usdt = item.usd
        }
        item.btc = btc && Number(btc).toFixed(8, 1)
        item.usdt = usdt && Number(usdt).toFixed(4, 1)
        item.total = Number(val).toFixed(8, 1)
      })
      return list
    },
    optionAccounts: (state, { formatedOriAccount }, rootState) => {
      const list = cloneDeep(formatedOriAccount)
      rootState.optionCurrencies.optionCurrencies.forEach(el => {
        const code = el.code.toLowerCase()
        if (!list[code]) {
          list[code] = {
            balance: 0,
            locked: 0,
            amount: 0,
            code: code,
            readable_name: el.readable_name,
            btc: Number(0).toFixed(8, 1),
            usdt: Number(0).toFixed(4, 1),
            total: 0,
          }
        }
        list[code] = { ...el, ...list[code] }
      })

      return Object.values(list).map(v => {
        v.total = BigNumber(v.total).toFixed(v.fixed, 1)
        v.balance = BigNumber(v.balance).toFixed(v.fixed, 1)
        v.locked = BigNumber(v.locked).toFixed(v.fixed, 1)
        return v
      })
    },
    totalOptionAccount: (state, { formatedOriAccount }) => {
      const totalOptionAccount = {
        btc: 0,
        usdt: 0,
      }
      Object.keys(formatedOriAccount).forEach(key => {
        if (Number(formatedOriAccount[key].balance) + Number(formatedOriAccount[key].locked) > 0) {
          totalOptionAccount.btc = BigNumber(totalOptionAccount.btc)
            .plus(formatedOriAccount[key].btc)
            .toFixed(8, 1)
          totalOptionAccount.usdt = BigNumber(totalOptionAccount.usdt)
            .plus(formatedOriAccount[key].usdt)
            .toFixed(4, 1)
        }
      })
      return totalOptionAccount
    },
  },
  mutations: {
    updateOptionAccounts(state, data) {
      // 动态更新accounts
      state.oriAccounts = { ...state.oriAccounts, [data.currency]: data }
    },
    setOptionAccounts(state, data) {
      // 初始获取optionAccounts数据
      const optionAccounts = data
      let formateAccount = {}
      optionAccounts.forEach(item => {
        if (item.option_currency) {
          const code = item.option_currency.code.toLowerCase()
          item.code = code
          formateAccount[code] = item
        }
      })
      state.oriAccounts = { ...state.oriAccounts, ...formateAccount }
    },
  },
  actions: {
    async getOptionAccounts({ commit }) {
      const data = await api.query('OPTIONACCOUNTS', {}, 'no-cache')
      if (data && data.data && data.data.optionAccount) {
        commit('setOptionAccounts', cloneDeep(data.data.optionAccount))
      }
    },
  },
}
