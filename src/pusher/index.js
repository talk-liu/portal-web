import Pusher from 'pusher-js'
import Vue from 'vue'
import store from '@/store'
import config from './config'
let init = true

// 创建pusher实例
let pusher = new Pusher(config.pusher.key, {
  cluster: config.pusher.cluster,
  wsHost: config.pusher.wsHost,
  wsPort: config.pusher.wsPort,
  disableStats: true,
  encrypted: false,
})

// 断线重连相关逻辑
pusher.connection.bind('state_change', ({ current }) => {
  Vue.$log.error('change state: ', current)
  if (current === 'connected') {
    // 初始化不做数据拉取操作
    if (init) {
      init = false
      return false
    }
    // // 重连重新拉取orderbook数据
    const id = store.getters['tickers/currentMarketId']
    store.commit('orderBook/reconnection', id)

    // 重新获取otc数据
    store.dispatch('otc/getOptionOtc')
    Vue.$log.error('reset fetch: ', id)
  }
  if (current == 'disconnected') {
    pusher.connection.retryIn(500)
  }
})

pusher.connection.bind('error', function(err) {
  console.log(err)
})

// 用来注册自己定义的channel
pusher.myChannelList = {}
export default pusher
