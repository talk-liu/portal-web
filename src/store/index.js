import Vue from 'vue'
import Vuex from 'vuex'

import initPlugin from './initPlugin'

import tickers from './modules/tickers'
import currentUser from './modules/current-user'
import platformProfit from './modules/platform-profit'
import loveTickers from './modules/love-tickers'
import otc from './modules/otc'
import icoAndOp from './modules/ico-and-op'
import miner from './modules/miner'
import vote from './modules/vote'
import atMining from './modules/at-mining'
import depthChart from './modules/depth-chart'
import viewport from './modules/viewport'
import accounts from './modules/accounts'
import currencies from './modules/currencies'
import trades from './modules/trades'
import openOrders from './modules/open-orders'
import historyOrders from './modules/history-orders'
import orderBook from './modules/order-book'
import orderForm from './modules/order-form'
import cachedTrade from './modules/cached-trade'
import vouchers from './modules/vouchers'
import markets from './modules/markets'
import conditionCurrent from './modules/condition-current'
import conditionHistory from './modules/condition-history'
import withdraw from './modules/withdraw'
import deposit from './modules/deposit'
import historyTrades from './modules/history-trades'
import twoFactor from './modules/twoFactor'
import fundsInterlocution from './modules/funds-interlocution'
import depositRemarks from './modules/deposit-remarks.js'
import depositsHistory from './modules/deposits-history'
import withdrawsHistory from './modules/withdraws-history'
import othersHistory from './modules/others-history.js'
import transfersHistory from './modules/transfers-history.js'
import historyMinings from './modules/history-mining.js'
import historyProfits from './modules/history-profits.js'
import myIncome from './modules/my-income.js'
import platformCurrentProfit from './modules/platform-current-profit.js'
import documentSms from './modules/documentSms.js'
import settings from './modules/settings'
import loginRegister from './modules/login-register'
import apiManagement from './modules/apiManagement'
import kStandard from './modules/k-standard'
import standardPrice from './modules/standard-price'
import path from './modules/path'
import atVipGrade from './modules/at-vipGrade'
import historyAtGameReward from './modules/history-atGameReward'
import atGame from './modules/at-game'
import ieoPurchase from './modules/ieo-purchase'
import ieoInfo from './modules/ieo-info'
import ieoHistoryOrder from './modules/ieo-history'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    currentUser,
    platformProfit,
    tickers,
    loveTickers,
    otc,
    icoAndOp,
    miner,
    vote,
    atMining,
    depthChart,
    viewport,
    accounts,
    currencies,
    trades,
    openOrders,
    historyOrders,
    orderBook,
    orderForm,
    cachedTrade,
    vouchers,
    markets,
    conditionCurrent,
    conditionHistory,
    withdraw,
    historyTrades,
    twoFactor,
    deposit,
    fundsInterlocution,
    depositsHistory,
    withdrawsHistory,
    othersHistory,
    transfersHistory,
    depositRemarks,
    myIncome,
    historyMinings,
    historyProfits,
    platformCurrentProfit,
    documentSms,
    settings,
    loginRegister,
    apiManagement,
    kStandard,
    standardPrice,
    path,
    atVipGrade,
    atGame,
    historyAtGameReward,
    ieoPurchase,
    ieoInfo,
    ieoHistoryOrder,
  },
  strict: debug,
  plugins: [initPlugin()],
})
