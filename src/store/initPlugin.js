import pusher from '@/pusher'

const plugin = async store => {
  // 初始化tickers
  store.dispatch('tickers/getTickers')
  // 获取用户信息
  store.dispatch('currentUser/getCurrentUser')
  // 获取币种信息
  store.dispatch('currencies/getCurrencies')
  // 获取otc
  store.dispatch('otc/getOptionOtc')
  // 订阅全局tickers
  pusher.subscribe('market-global')
}

export default function() {
  return plugin
}
