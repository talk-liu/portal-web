import api from '@/graphql'
import { BigNumber } from 'bignumber.js'
import serviceError from '@/utils/service-error'

export default {
  namespaced: true,
  state: {
    otc: {
      otc_opened: 1,
      usdt_cny_exchange_rate: 0
    },
    option_otc: {
      usd_cny: 0,
      usd_rub: 0,
      usd_krw: 0,
      usd_eur: 0,
      usd_gbp: 0
    },
    digital_money: {
      amount: 0,
      currency: 'BTC'
    },
    fiat_money: {
      base_amount: 0,
      currency: 'USD',
      total_amount: 0
    },
    quote_id: null,
    errors: '',
    moreThanLimit: '',
    simplexProgress: '',
    transactionHistory: []
  },
  mutations: {
    getHomeData(state, data) {
      state.otc = data.data.otc
      state.option_otc = data.data.optionOtc
    },
    setOptionOtc(state, data) {
      state.option_otc = data.data.optionOtc
    },
    setOtc(state, data) {
      state.otc = data.data.otc
    },
    setDigitalMoney: (state, digital_money) => state.digital_money = digital_money,
    setFiatMoney: (state, fiat_money) => state.fiat_money = fiat_money,
    setQuoteIid: (state, quote_id) => state.quote_id = quote_id,
    setErrorTips: (state, errors) => state.errors = errors,
    setMoreThanLimit: (state, moreThanLimit) => state.moreThanLimit = moreThanLimit,
    simplexProgress: (state, simplexProgress) => state.simplexProgress = simplexProgress,
    transactionHistory: (state, transactionHistory) => state.transactionHistory = transactionHistory,
  },
  getters: {
    otc: state => state.otc,
    option_otc: state => state.option_otc,
    fiat_total_money: state => state.fiat_money.total_amount,
    fee_money: state => BigNumber(state.fiat_money.total_amount || 0).minus(state.fiat_money.base_amount || 0).toNumber(),
  },
  actions: {
    async getOptionOtc(store) {
      try {
        store.commit('setOptionOtc', await api.query('OPTIONOTC'))
      } catch (error) {
        console.log(error)
      }
    },
    async getOtc(store) {
      try {
        store.commit('setOtc', await api.query('OTC'))
      } catch (error) {
        console.log(error)
      }
    },
    async getCurrency({ commit }, payload) {
      /**
       * @params
       * digital_currency: 'BTC',
       * fiat_currency: 'USD',
       * requested_currency: 'BTC',
       * requested_amount: 1
      **/
      commit('setFiatMoney', {
        base_amount: 0,
        currency: payload.fiat_currency,
        total_amount: 0
      })
      commit('setDigitalMoney', {
        amount: 0,
        currency: payload.digital_currency
      })
      try {
        let data = await api.query('OTCQUOTE', payload, 'no-cache')
        let result = data && data.data && data.data.quote && data.data.quote.result
        if (!result) {
          commit('setErrorTips', serviceError(data))
          return
        }
        if (result.digital_money) {
          commit('setDigitalMoney', result.digital_money)
        }
        if (result.fiat_money) {
          commit('setFiatMoney', result.fiat_money)
        }
        if (result.quote_id) {
          commit('setQuoteIid', result.quote_id)
        }
        return result
      } catch (errors) {
        commit('setErrorTips', errors.message)
      }
    },
    async paymentOrders({ commit }, quote_id) {
      try {
        let data = await api.mutate('OTCCREATEPAYMENTORDER', { quote_id: quote_id })
        let result = data && data.data && data.data.createPaymentOrder && data.data.createPaymentOrder.result
        if (result) {
          return result
        } else {
          let err = data && data.errors && data.errors[0]
          if (err.errorCode === 2050) {
            commit('setErrorTips', 'The exchange rate has changed. Please refresh and try again.')
          } else if (err.errorCode === 2051) {
            commit('setErrorTips', 'Network error! Please try again later.')
          } else if (err.errorCode === 2052) { //  判断单日限额
            commit('setMoreThanLimit', 'day')
          } else if (err.errorCode === 2053) { // 判断单月限额
            commit('setMoreThanLimit', 'month')
          } else { // SimplexAPIError OR CreatePaymentOrderError
            commit('setErrorTips', serviceError(data))
          }
          return 'error'
        }
      } catch (errors) {
        commit('setErrorTips', errors.message)
      }
    },
    async getPaymentOrders({ commit }, payload) {
      try {
        payload.state = 'NORMAL'
        payload.page_size = 10
        // let listStatus = await httpGet('/api/mobile/v1/otc/payment_orders', { quote_id: quote_id })
        let data = await api.query('OTCPAYMENTORDERLIST', payload)
        let result = data && data.data && data.data.paymentOrderList && data.data.paymentOrderList.result
        if (result) {
          commit('transactionHistory', result)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getPaymentStatus({ commit }, payment_id) {
      try {
        let data = await api.query('OTCPAYMENTORDER', { payment_id: payment_id })
        let state = data && data.data && data.data.paymentOrder && data.data.paymentOrder.result && data.data.paymentOrder.result.state
        if (state) {
          commit('simplexProgress', state)
        } else {
          commit('simplexProgress', 'invalid')
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
