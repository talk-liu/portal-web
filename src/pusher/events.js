import store from '@/store'
import pusher from './index'

// todo 后续抽离
// 全局tickers
pusher.bind('tickers', data => {
  store.commit('tickers/updateTickers', data)
})

// 当前算力
pusher.bind('at-mining', data => {
  store.commit('updateCurrentPower', data)
})

// 更新当前委托g'p
pusher.bind('order', data => {
  if (!data) return false
  // 不显示期权交易对
  if (/_\d+/.test(data.market)) return false

  // 当前委托
  const openActions = {
    wait: 'openOrders/updateOrder',
    cancel: 'openOrders/delOrder',
    done: 'openOrders/doneOrder',
  }
  const openAction = openActions[data.state]
  store.commit(openAction, data)
  // 历史委托
  const historyActions = {
    cancel: 'historyOrders/updateOrder',
    done: 'historyOrders/updateOrder',
  }
  const historyAction = historyActions[data.state]
  if (!historyAction) return false
  store.commit(historyAction, data)
})

// 计划委托推送
pusher.bind('condition', data => {
  if (!data && !data.state) return false
  if (data.state == 0) {
    store.commit('conditionCurrent/updateOrder', data)
  } else {
    store.commit('conditionCurrent/delOrder', data)
    store.commit('conditionHistory/updateOrder', data)
  }
})

// 个人信息
pusher.bind('account', data => {
  // {\"balance\":\"13.5998\",locked\":\"0.0\",\"currency\":\"btc\"}"
  store.commit('accounts/updateAccounts', data)
})
