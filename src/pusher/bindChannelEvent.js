import store from '@/store'

export default (channel, marketId) => {
  // 初始化全量推送
  channel.bind('update', data => {
    store.dispatch('orderBook/setOrderBook', { data, marketId })
  })

  // 增量推送
  channel.bind('depth-update', data => {
    store.commit('orderBook/updateOrderBook', { ...data, marketId })
  })

  // 更新最新成交
  channel.bind('trades', data => {
    /**
     * {"event":"trades","data":"{\"trades\":[{\"tid\":39,\"type\":\"buy\",\"date\":1521171642,\"price\":\"2000.0\",\"amount\":\"1.0\"}]}","channel":"market-btccny-global"}
     */
    store.commit('trades/updateTrades', data)
    store.commit('cachedTrade/updateCachedTrades', data.trades)
    // 为标准版k定制
    store.dispatch('kStandard/updateTrades', data.trades)
  })
}
