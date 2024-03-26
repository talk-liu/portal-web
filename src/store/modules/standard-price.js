export default {
  namespaced: true,
  state: {
    orderSellPrice: null,
    orderBuyPrice: null,
  },
  // getters: {},
  mutations: {
    setOrderPrice(state, price) {
      if (price === '-') {
        price = ''
      }
      state.orderSellPrice = price
      state.orderBuyPrice = price
    },
    setOrderSellPrice(state, price) {
      state.orderSellPrice = price
    },
    setOrderBuyPrice(state, price) {
      state.orderBuyPrice = price
    },
    clearOrderPrice(state, val = '') {
      state.orderBuyPrice = val
      state.orderSellPrice = val
    },
  },
  // actions: {},
}
