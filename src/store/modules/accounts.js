import { BigNumber } from 'bignumber.js'
import cloneDeep from 'lodash/cloneDeep'

import api from '@/graphql'

export default {
  namespaced: true,
  state: {
    oriAccounts: [],
  },
  getters: {
    formatedOriAccount: (state, getters, rootState, rootGetters) => {
      const accounts = cloneDeep(state.oriAccounts)
      const list = {}
      accounts.map(item => {
        const val = BigNumber(item.balance)
          .plus(item.locked)
          .toString()
        item.btc = rootGetters['tickers/changeCurrency'](item.currency, 'btc', val)
        item.usdt = rootGetters['tickers/changeCurrency'](item.currency, 'usdt', val)
        item.usd = rootGetters['tickers/changeCurrency'](item.currency, 'usd', val)
        if(item.usdt === 0){
          item.usdt = item.usd
        }
        item.total = Number(val).toFixed(8)
        list[item.currency] = item
      })
      return list
    },
    totalAccount: (state, { formatedOriAccount }) => {
      const totalAccount = {
        btc: 0,
        usdt: 0,
      }
      Object.keys(formatedOriAccount).forEach(key => {
        if (Number(formatedOriAccount[key].balance) + Number(formatedOriAccount[key].locked) > 0) {
          totalAccount.btc = BigNumber(totalAccount.btc)
            .plus(formatedOriAccount[key].btc)
            .toFixed(8)
          totalAccount.usdt = BigNumber(totalAccount.usdt)
            .plus(formatedOriAccount[key].usdt)
            .toFixed(4)
        }
      })
      return totalAccount
    },
    accounts: (state, { formatedOriAccount }, rootState) => {
      const list = cloneDeep(formatedOriAccount)
      const currencies = rootState.currencies.currencies || {}
      Object.keys(currencies).forEach(key => {
        const el = currencies[key]
        if (!list[el.code]) {
          list[el.code] = {
            balance: 0,
            locked: 0,
            total: 0,
            currency: el.code,
            btc: Number(0).toFixed(8),
            usdt: Number(0).toFixed(4),
          }
        }
        list[el.code] = { ...el, ...list[el.code] }
      })
      return list
    },
    accountsList: (state, { accounts }) => {
      return Object.values(accounts).filter(item => {
        return item.currency !== 'bch'
      })
    },
  },
  mutations: {
    updateAccounts(state, data) {
      // 动态更新accounts
      state.oriAccounts = state.oriAccounts.map(account => {
        if (account.currency === data.currency) {
          account = { ...account, ...data }
        }
        return account
      })
    },
    setAccounts(state, data) {
      // 初始获取accounts数据
      state.oriAccounts = [...state.oriAccounts, ...data]
    },
  },
  actions: {
    async getAccounts({ commit }) {
      const resp = await api.query('ACCOUNTS', {}, 'no-cache')
      const result = resp && resp.data && resp.data.optionBalance
      if (!result) return false
      commit('setAccounts', cloneDeep(result))
      // const result =[{"currency":"btc","balance":"0.000761348267082","locked":"0.0","deposit_address":"3Qw7nfMRXVHvAppBx3qC3eyoZgNLTD8R3g","memo":null,"default_withdraw_fund_source_id":null,"minimum_withdraw_amount":0.002,"withdraw_fee":0.0005,"require_memo":false,"readable_name":"Bitcoin","withdraw_amount_h24":0,"withdraw_amount_max_h24":10000,"min_confirmations":1,"max_confirmations":2,"can_deposit":true,"can_withdraw":true,"vote_currency":false,"withdraw_fixed":8,"fee":"0.001","__typename":"OptionBalance"},{"currency":"ltc","balance":"0.0007","locked":"0.0","deposit_address":"LM7L8namX5cVi2cJTecMqze58DtAshnEP1","memo":null,"default_withdraw_fund_source_id":null,"minimum_withdraw_amount":0.002,"withdraw_fee":0.001,"require_memo":false,"readable_name":"Litecoin","withdraw_amount_h24":0,"withdraw_amount_max_h24":10000,"min_confirmations":1,"max_confirmations":4,"can_deposit":true,"can_withdraw":true,"vote_currency":false,"withdraw_fixed":8,"fee":"0.001","__typename":"OptionBalance"},{"currency":"eth","balance":"0.12389030748","locked":"0.0","deposit_address":"0xEe4494f2965dCFCe63A40c62B95a96FACEaC828C","memo":null,"default_withdraw_fund_source_id":null,"minimum_withdraw_amount":0.02,"withdraw_fee":0.01,"require_memo":false,"readable_name":"Ethereum","withdraw_amount_h24":0,"withdraw_amount_max_h24":10000,"min_confirmations":2,"max_confirmations":30,"can_deposit":true,"can_withdraw":true,"vote_currency":false,"withdraw_fixed":8,"fee":"0.001","__typename":"OptionBalance"},{"currency":"usdt","balance":"59.3204466366","locked":"0.0","deposit_address":"1Bmdr1qqL7f8sBWKGFDEc9Bx6qpwMjne25","memo":null,"default_withdraw_fund_source_id":null,"minimum_withdraw_amount":10,"withdraw_fee":5,"require_memo":false,"readable_name":"Tether","withdraw_amount_h24":0,"withdraw_amount_max_h24":10000,"min_confirmations":1,"max_confirmations":2,"can_deposit":true,"can_withdraw":true,"vote_currency":false,"withdraw_fixed":8,"fee":"0.001","__typename":"OptionBalance"},{"currency":"eos","balance":"22.0","locked":"0.0","deposit_address":"riostoxexchange","memo":"1111870528","default_withdraw_fund_source_id":null,"minimum_withdraw_amount":20,"withdraw_fee":0.1,"require_memo":true,"readable_name":"EOS","withdraw_amount_h24":0,"withdraw_amount_max_h24":10000,"min_confirmations":0,"max_confirmations":1,"can_deposit":true,"can_withdraw":true,"vote_currency":false,"withdraw_fixed":8,"fee":"0.001","__typename":"OptionBalance"},{"currency":"xrp","balance":"0.0","locked":"0.0","deposit_address":"rPR82pZSV8xKWukAkvaoKKVn2W9eNBN97s","memo":"1111870528","default_withdraw_fund_source_id":null,"minimum_withdraw_amount":22,"withdraw_fee":0.25,"require_memo":true,"readable_name":"Ripple","withdraw_amount_h24":0,"withdraw_amount_max_h24":10000,"min_confirmations":1,"max_confirmations":1,"can_deposit":true,"can_withdraw":true,"vote_currency":false,"withdraw_fixed":6,"fee":"0.001","__typename":"OptionBalance"},{"currency":"dash","balance":"0.08799808","locked":"0.0","deposit_address":"XktTA5NYcQXTJh4skS3s7cWKHWp2yeVCUM","memo":null,"default_withdraw_fund_source_id":null,"minimum_withdraw_amount":0.004,"withdraw_fee":0.002,"require_memo":false,"readable_name":"Dash","withdraw_amount_h24":0,"withdraw_amount_max_h24":10000,"min_confirmations":1,"max_confirmations":6,"can_deposit":true,"can_withdraw":true,"vote_currency":false,"withdraw_fixed":8,"fee":"0.001","__typename":"OptionBalance"}]
      // commit('setAccounts', cloneDeep(result))
    }
  },
}
