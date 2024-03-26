import {
  mapGetters
} from 'vuex'
import totalMoney from '@/mixins/total-money'
import {
  BigNumber as bn
} from 'bignumber.js'

export default {
  mixins: [totalMoney],
  computed: {
    ...mapGetters({
      currentProfit: 'currentProfit',
      atProfitRate: 'atProfitRate',
      profitDelivered: 'profitDelivered',
      yesterdayProfit: 'yesterdayProfit',
      totalProfit: 'totalProfit',
      unitATProfit: 'unitATProfit',
      otc: 'otc'
    }),
    hundredProfit() {
      const price = this.addUnit(this.unitATProfit, 8, false)
      return bn(price).multipliedBy(1000).toFixed(4)
    },
    // hundredProfit () {
    //   const profit = bn(this.unitATProfit).multipliedBy(1000)
    //   return this.$fifth.isCn ? bn(profit).multipliedBy(otc.usdtRate)
    //     .toFixed(2) :
    // },
    // 今日平台待分配收益分割
    currentProfitSplice() {
      return [this.calculateArr(this.currentProfit)[0], this.calculateArr(this.currentProfit)[1]]
    },
    // 平台流通的at
    profitDeliveredShow() {
      return Number(Math.round(this.profitDelivered)).toLocaleString('en-US')
    },
    // 100AT收益分割
    hundredProfitSplice() {
      return [this.splitDot(this.hundredProfit)[0], this.splitDot(this.hundredProfit)[1]]
    },
    // AT收益率分割
    atProfitRateSplice() {
      return [this.splitDot(this.atProfitRate)[0], this.splitDot(this.atProfitRate)[1]]
    },
    // 昨日平台分配收益
    yesterdayProfitSplice() {
      return [this.calculateArr(this.yesterdayProfit)[0], this.calculateArr(this.yesterdayProfit)[1]]
    },
    // 平台累计分配收益分割
    totalProfitSplice() {
      return [this.calculateArr(this.totalProfit)[0], this.calculateArr(this.totalProfit)[1]]
    }
  },
  methods: {
    // 分隔.
    splitDot(str) {
      return String.prototype.split.call(str, '.')
    },
    calculateArr(btc, type) {
      if (Number(btc) === 0 && type === 'current') {
        return ''
      }
      let price = this.changeUsdt('btc', btc, true, 2)
      price = price.replace(this.reg, '')
      return price.split('.')
    }
  }
}