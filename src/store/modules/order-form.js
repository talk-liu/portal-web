import BigNumber from 'bignumber.js'

import api from '@/graphql'

export default {
  namespaced: true,
  state: {
    type: '',
    orderType: '',
    price: '',
    triggerPrice: '',
    direction: '',
    volume: '',
    max: '',
    percent: '0',
    focus: '',
  },
  getters: {
    fee: (state, getters, rootState, rootGetters) => {
      const currentMarket = rootGetters['markets/currentMarket']
      const isMiner = rootGetters['currentUser/isMiner']
      return isMiner ? 0.001 : Number(currentMarket.fee || 0.001)
    },
    total: ({ price, volume, type }, { fee }) => {
      let total = BigNumber(price || 0).times(volume || 0)
      if (type === 'sell') {
        total = BigNumber(total).times(1 - fee)
      } else {
        total = BigNumber(total).times(1 + fee)
      }
      return total.toFixed(8, 0)
    },
    account: (state, getters, rootState, rootGetters) => {
      const accounts = rootGetters['accounts/accounts']
      const { base_unit, quote_unit } = rootGetters['tickers/currentTicker']
      const quoteBalance = (accounts[quote_unit] && accounts[quote_unit].balance) || 0
      const baseBalance = (accounts[base_unit] && accounts[base_unit].balance) || 0
      return { quoteBalance, baseBalance }
    },
    max: ({ price, type }, { account, fee }, rootState, rootGetters) => {
      if (!price) return false
      const { ask_fixed } = rootGetters['tickers/currentTicker']
      const { quoteBalance, baseBalance } = account
      if (type === 'buy') {
        if (BigNumber(price).isZero()) return 0
        return BigNumber(BigNumber(quoteBalance).times(1 - fee))
          .div(price)
          .toFixed(ask_fixed, 1)
      } else {
        return BigNumber(baseBalance).toFixed(ask_fixed, 1)
      }
    },
    disableTrade: () => {
      // const market = rootState.tickers.currentMarketId
      // return market.indexOf('bch') !== -1 ? true : false
      return false
    },
    canSubmit: ({ orderType, price, volume, triggerPrice }, getters, rootState, rootGetters) => {
      if (orderType === 'stop') {
        // 触发价必填且不为零
        if (!triggerPrice || BigNumber(triggerPrice).isZero()) return false
        // 触发价和最新价相同不能提交
        const lastPrice = rootGetters['tickers/lastPrice']
        if (BigNumber(triggerPrice).eq(lastPrice)) return false
      }
      // 价格和数量为必填
      if (!price || !volume) return false
      return true
    },
  },
  mutations: {
    // 更新价格
    updatePrice(state, data) {
      state.price = data
    },
    // 点击设置价格
    setPrice(state, data) {
      if (state.orderType === 'stop' && state.focus === 'trigger') {
        state.triggerPrice = data
      } else {
        state.price = data
      }
    },
    // 触发价更新
    updateTriggerPrice(state, data) {
      state.triggerPrice = data
    },
    // 触发方向更新
    updateDirection(state, data) {
      state.direction = data
    },
    // 更新数量
    updateVolume(state, data) {
      state.volume = data
    },
    // 更新百分比
    updatePercent(state, data) {
      state.percent = data
    },
    updateFocus(state, data) {
      state.focus = data
    },
    // 切换买卖类型
    resetType(state, data) {
      state.type = data
      state.price = ''
      state.triggerPrice = ''
      state.direction = ''
      state.volume = ''
      state.total = ''
      state.percent = '0'
    },
    // 切换订单类型
    resetOrderType(state, data) {
      state.orderType = data
      state.price = ''
      state.triggerPrice = ''
      state.direction = ''
      state.volume = ''
      state.total = ''
      state.percent = '0'
    },
    // 重新初始化数据
    resetState(state) {
      state.price = ''
      state.triggerPrice = ''
      state.direction = ''
      state.volume = ''
      state.total = ''
      state.percent = '0'
    },
  },
  actions: {
    async submitOrder(store) {
      const { orderType, price, volume, type, triggerPrice, direction, percent } = store.state
      const { disableTrade, canSubmit } = store.getters
      if (!canSubmit && disableTrade) return false

      // 获取当前market
      const market = store.rootState.tickers.currentMarketId
      const params = {
        ord_type: orderType,
        market,
        volume,
      }

      // 市价不需要价格
      if (orderType !== 'market') {
        params.price = price
      }

      // 下单清理状态
      store.commit('resetState')
      // 止盈止损下单
      if (orderType === 'stop') {
        params.ord_type = 'limit'
        params.trigger_price = triggerPrice
        params.condition_type = 1
        params.direction = direction
        params.side = type === 'buy' ? 'bid' : 'ask'
        return await api.mutate('CONDITIONCREATE', params)
      }

      // 市价下单增加百分比
      if (orderType === 'market') {
        params.percent = percent
      }

      // 判断买卖类型调用接口下单
      if (type === 'buy') {
        return await api.mutate('CREATEBIDORDER', params)
      } else {
        return await api.mutate('CREATEASKORDER', params)
      }
    },
  },
}
