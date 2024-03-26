import api from '@/graphql'
import cloneDeep from 'lodash/cloneDeep'

// initial state
const state = {
  atTotalInfos:[],
  lastSevenAtAwards:[],
  lastSevenAtMiningAwards:[],
  candyAmount:0
}

// getters
const getters = {
  atTotalInfos: state => state.atTotalInfos,
  lastSevenAtAwards: state => state.lastSevenAtAwards,
  lastSevenAtMiningAwards: state => state.lastSevenAtMiningAwards,
  candyAmount: state => state.candyAmount
}

const actions = {
  async getAtMiningData(store) {
    try {
      const resp = await api.query('ATMINING')
      store.commit('getAtMiningData', resp)
      store.commit('getPlatform', resp)
    } catch (error) {
      console.error(error)
    }
  },
}

// mutations
const mutations = {
  getAtMiningData(state, data) {
    const { atTotalInfos, lastSevenAtAwards, lastSevenAtMiningAwards, platformProfit, ticker } = data.data
    const candyAmount = data && data.data && data.data.icoAndOp && data.data.icoAndOp.candy && data.data.icoAndOp.candy.amount
    state.atTotalInfos = cloneDeep(atTotalInfos)
    state.lastSevenAtAwards = cloneDeep(lastSevenAtAwards)
    state.lastSevenAtMiningAwards = cloneDeep(lastSevenAtMiningAwards)
    state.candyAmount = candyAmount
    this.state.platformProfit.tickers = cloneDeep(ticker.markets)
    this.state.platformProfit.platformProfit = platformProfit
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
