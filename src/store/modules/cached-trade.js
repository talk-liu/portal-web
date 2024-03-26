// 用于存储trades转k线数据，还未被绘制到图上部分
export default {
  namespaced: true,
  state: {
    cachedTrades: [],
    last_ts: 0,
    next_ts: 0,
    lastBar: {},
  },
  mutations: {
    updateTs: function(state, { last_ts, next_ts, lastBar }) {
      last_ts && (state.last_ts = last_ts)
      next_ts && (state.next_ts = next_ts)
      lastBar && (state.lastBar = { ...lastBar })
    },
    updateCachedTrades: function(state, trades) {
      state.cachedTrades = state.cachedTrades.concat(trades)
    },
    clearCachedTrades: function(state) {
      state.cachedTrades = []
    },
    resetCachedTrades: function(state) {
      state.cachedTrades = []
      state.last_ts = 0
      state.next_ts = 0
      state.lastBar = {}
    },
  },
}
