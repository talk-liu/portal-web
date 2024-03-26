import cloneDeep from 'lodash/cloneDeep'
import {
  BigNumber as bn
} from 'bignumber.js'

// import fetch from '@/graphql'
// mock value
// import platformProfit from '@/mock/platform-profit'
// import tickers from '@/mock/tickers'
let max = 0
let ESTIMATED = 0
// fixed表示是否固定汇率
function calculateBtc(beu, fixed) {
  const tickers = state.tickers
  if (tickers) {
    const price = fixed ? 'open' : 'last'
    const ethBtc = bn(beu.eth.toString()).multipliedBy(tickers['ethbtc'][price]).toNumber()
    const trxBtc = beu.trx && bn(beu.trx.toString()).multipliedBy(tickers['trxbtc'][price]).toNumber() || 0
    const btcusdtRate = Number(tickers['btcusdt'][price]) ? tickers['btcusdt'][price] : 1
    const usdtBtc = bn(beu.usdt.toString()).dividedBy(btcusdtRate).toFixed(8)
    return bn(beu.btc.toString()).plus(ethBtc.toString()).plus(usdtBtc.toString()).plus(trxBtc.toString()).toFixed(8)
  }
}

function calculatePower(computingPower) {
  if (computingPower.length === 0) {
    return []
  }
  computingPower.map((item) => {
    item.trueBtc = Number(calculateBtc(item.beu))
    item.totalBtc = Number(calculateBtc(item.beu))
  })

  const power1 = computingPower[0] ? computingPower[0].totalBtc : 0
  const power2 = computingPower[1] ? computingPower[1].totalBtc : 0
  const power3 = computingPower[2] ? computingPower[2].totalBtc : 0
  if (computingPower.length === 1) {
    max = ESTIMATED
  } else if (computingPower.length === 2) {
    max = power1
  } else if (computingPower.length === 3) {
    max = Math.max(power1, power2)
  } else {
    max = Math.max(power1, power2, power3)
  }
  return resetPower(computingPower, max)
}

function resetPower(computingPower, max) {
  computingPower.forEach((item, index) => {
    if (item.totalBtc === max && index !== computingPower.length - 1) {
      item.totalBtc = 100
    } else {
      let max1 = max || 1
      item.totalBtc = bn(100).dividedBy(max1).multipliedBy(item.totalBtc).toFixed(8)
    }
    item.number = parseInt(item.totalBtc)
  })
  return computingPower
}
// 更新最后一块数据
function updateLast(item) {
  if (!item.beu) {
    return
  }
  let max1 = max || 1
  const beu = item.beu
  item.trueBtc = calculateBtc(beu)
  item.totalBtc = bn(100).dividedBy(max1).multipliedBy(item.trueBtc).toFixed(8)
  item.number = parseInt(item.totalBtc)
  return item
}

// AJAX更新四个时间段的算力
// function updatePower(state, d) {
//   const data = cloneDeep(d.data.computingPower)
//   const blocks = data.blocks
//   state.blockCount = data.count // 区块的个数
//   blocks.splice(0, 4 - data.count)
//   state.computingPower = blocks
//   state.lastComputingPower = blocks[blocks.length - 1]
//   ESTIMATED = data.estimated
//   state.downTime = new Date(blocks[blocks.length - 1].end_date).getTime() - new Date().getTime()
// }

const state = {
  tickers:null,
  platformProfit:{
    // 昨日收益
    yesterday_profit:{
      beu:{
        btc:'0.0',
        eth:'0.0',
        usdt: '0.0',
        trx:'0.0'
      }
    },
    // 总收益
    total_profit:{
      beu:{
        btc:'0.0',
        eth:'0.0',
        usdt: '0.0',
        trx:'0.0'
      }
    },
    // 平台总发放的AT
    total_at:0,
    total_at_delivered:0,
    // AT收益率
    at_profit_rate:0,
    platform_seven_days_at:0,
    members_seven_days_at:0,
    // 单AT收益
    unit_at_profit:0
  },
  // 当日收益
  currentProfit: {// mock
    'beu': {
      'btc': '0',
      'eth': '0',
      'usdt': '0',
      'trx': '0'
    }
  },
  // 四个算力
  computingPower: [],
  // 记录本次成交交易费额度
  lastFee: {},
  lastDate: '',
  // 倒计时
  downTime: 0,
  // 区块数
  blockCount: 4,
  // 最后一个区块数据
  lastComputingPower: {}
}

const getters = {
  tickers: state => state.tickers,
  currentProfit: state => calculateBtc(state.currentProfit.beu),
  yesterdayProfit: state => calculateBtc(state.platformProfit.yesterday_profit.beu),
  totalProfit: state => calculateBtc(state.platformProfit.total_profit.beu),
  totalAt: state => state.platformProfit.total_at,
  totalAtDelivered: state => state.platformProfit.total_at_delivered,
  computingPower: state => calculatePower(state.computingPower),
  lastFee: state => {
    return {
      fee: state.lastFee,
      date: state.lastDate
    }
  },
  blockCount: state => state.blockCount,
  lastComputingPower: state => updateLast(state.lastComputingPower),
  downTime: state => state.downTime,
  atProfitRate: state => bn(state.platformProfit.at_profit_rate).multipliedBy(100).toFixed(4),
  profitDelivered: state => bn(state.platformProfit.platform_seven_days_at).plus(state.platformProfit.members_seven_days_at).toNumber(),
  unitATProfit: state => state.platformProfit.unit_at_profit,
  calculated: state => state.platformProfit.distributed
}

const mutations = {
  getPlatform(state, data) {
    const result = data && data.data
    if (!result) return false
    state.platformProfit = result.platformProfit
    const tickers = result.ticker.markets && cloneDeep(result.ticker.markets)
    state.tickers = tickers
    // updatePower(state, data)
  },
  // 当日收益和最后区块算力推送
  updateCurrentPower(state, data) {
    if (Number(calculateBtc(state.currentProfit.beu)) === 0) {
      state.currentProfit = data.current_profit
      // 更新最后一个算力块
      // state.blockCount = data.computing_power.count
      // state.lastComputingPower = data.computing_power.blocks[3]
      // state.downTime = new Date(data.computing_power.blocks[3].end_date).getTime() - new Date().getTime()
      return
    }
    // 如果数据一样不更新
    if (calculateBtc(state.currentProfit.beu) !== calculateBtc(data.current_profit.beu)) {
      state.lastFee = calculateBtc(data.current_profit.beu) - calculateBtc(state.currentProfit.beu)
      state.lastDate = data.current_profit.current_date || new Date()

      // state.downTime = new Date(data.computing_power.blocks[3].end_date).getTime() - new Date().getTime()

      state.currentProfit = data.current_profit
      // 更新最后一个算力块
      // state.blockCount = data.computing_power.count
      // state.lastComputingPower = data.computing_power.blocks[3]
    }
  }
}


const actions = {
}


export default {
  state,
  getters,
  mutations,
  actions,
}
