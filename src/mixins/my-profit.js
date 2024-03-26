import BigNumber from 'bignumber.js'
import { mapGetters, mapState, mapActions } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import findLastIndex from 'lodash/findLastIndex'
import totalMoney from '@/mixins/total-money'

export default {
  mixins: [totalMoney],
  computed: {
    ...mapGetters('platformCurrentProfit', ['atProfitRate', 'calculated', 'platformCurrentProfit']),
    ...mapGetters('accounts', ['accounts']),
    ...mapState('myIncome', ['seven_days_at', 'finished_cache', 'total_at_amount', 'locked_at_amount', 'last_at_income', 'locked_at_list', 'yesterday_profit', 'total_profit', 'at_ratio']),
    ...mapState('atVipGrade', ['at_vip_grade']),

    minIndex() {
      return findLastIndex(this.sevenDaysAt, this.minProfitItem)
    },
    totalDelivered() {
      let totalDelivered = 0
      if (this.accounts['at']) {
        totalDelivered = BigNumber(this.accounts['at'].balance)
          .plus(this.accounts['at'].locked)
          .toFixed(4)
      }
      return totalDelivered
    },
    sevenDaysAt() {
      let arr = []
      let day = 0
      for (let key in this.seven_days_at) {
        day++
        arr.push({
          date: key,
          profit: Number(this.seven_days_at[key]),
          day,
        })
      }
      return arr
    },
    sevenDaysAtSort() {
      const item = cloneDeep(this.sevenDaysAt)
      return item.sort((a, b) => {
        return a.profit < b.profit ? -1 : 1
      })
    },
    sevenDaysAtZero() {
      const item = cloneDeep(this.sevenDaysAt)
      return item.filter(val => {
        return val.profit === 0
      })
    },
    sevenDaysAtFilter() {
      const item = cloneDeep(this.sevenDaysAt)
      return item.filter(val => {
        return val.profit > 0
      })
    },
    minProfitItem() {
      return this.sevenDaysAtSort[0]
    },
    maxProfit() {
      return this.sevenDaysAtSort[6] && this.sevenDaysAtSort[6].profit
    }
  },
  created() {
    this.getMyIncome()
    this.getPlatformData()
    this.getVipGrade()
  },
  methods: {
    ...mapActions('platformCurrentProfit', ['getPlatformData']),
    ...mapActions('myIncome', ['getMyIncome']),
    ...mapActions('atVipGrade', ['getVipGrade']),
    formatYmd(time) {
      const date = new Date(time)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${year}.${month}.${day}`
    },
    formatYm(value) {
      if (value) {
        const date = value.split('-')
        return this.$fifth.lang === 'zh-CN' ? date[2] + '/' + date[1] : date[1] + '/' + date[2]
      }
    },
    getlangMessage(at_vip_grade) {
      let message = ''
      if (this.$fifth.lang === 'zh-CN' || this.$fifth.lang === 'zh-TW') {
        if (at_vip_grade == 'Regular') {
          message = '白银'
        } else if (at_vip_grade == 'Classic') {
          message = '黄金'
        } else if (at_vip_grade == 'Prestige') {
          message = '铂金'
        } else if (at_vip_grade == 'Elite') {
          message = '钻石'
        } else {
          message = at_vip_grade
        }
      } else {
        message = at_vip_grade
      }
      return message
    },
    getEstimateProfit() {
      const num = this.atProfitRate ? BigNumber(this.sevenDaysAtFilter[0].profit.toString())
        .multipliedBy(this.atProfitRate) : 0
        .dividedBy(100)
        .toFixed(4)
      return {
        day: this.sevenDaysAtZero[this.sevenDaysAtZero.length - 1].day,
        profit: this.changeUsdt('at', num, true),
      }
    },
    // 将价格按小数点分割
    formatPriceFloat(price) {
      price += ''
      const arr = price.split('.')
      const first = arr[0]
      const last = arr[1]
      return { first, last }
    },
    getAllValue(data) {
      let total = 0
      for (let key in data) {
        if (key === 'btc') {
          const btc = data[key] ? BigNumber(data[key].toString()).toFixed(8, 1) : 0
          total = BigNumber(total).plus(btc)
        } else {
          total = BigNumber(total).plus(this.changeBtc(key, data[key], true))
        }
      }
      return BigNumber(total).toFixed(8, 1)
    },
    yesterdayProfit() {
      const data = this.yesterdayProfitBtc()
      return this.changeUsdt('btc', data, true)
    },
    yesterdayProfitBtc() {
      return this.getAllValue(this.yesterday_profit.beu)
    },
    totalProfit() {
      const data = this.totalProfitBtc()
      return this.changeUsdt('btc', data, true)
    },
    totalProfitBtc() {
      return this.getAllValue(this.total_profit.beu)
    },
    currentProfit() {
      if (this.currentProfitBtc()) {
        const data = BigNumber(this.currentProfitBtc().toString()).toFixed(8, 1)
        return this.changeUsdt('btc', data, true, 4)
      } else {
        return 0
      }
    },
    currentProfitBtc() {
      let currentProfitBtc = 0
      if (this.platformCurrentProfit) {
        const platformCurrentProfit = this.getAllValue(this.platformCurrentProfit)
        currentProfitBtc = this.at_ratio ? BigNumber(platformCurrentProfit).multipliedBy(this.at_ratio.toString()).toFixed(8, 1) : 0
      }
      return currentProfitBtc
    },
    getCurrencyData() {
      const total_profit = this.total_profit.beu
      let totalPercent = 0
      let percent = 0
      let data = []
      for (let key in total_profit) {
        const amount = total_profit[key]
        if (key === 'at' && Number(amount === 0)) {
          continue
        }
        const money = this.changeUsdt(key, amount, true)
        percent = (Number(amount) === 0 || totalPercent === 100) ? 0 : (this.changeBtc(key, amount, true) / this.getAllValue(total_profit)).toFixed(2) * 100
        if (totalPercent + percent > 100) {
          percent = 100 - totalPercent
          totalPercent = 100
        } else {
          totalPercent += percent
        }
        data.push({
          amount,
          money,
          percent,
          currency: key,
        })
      }
      return data
    },
  },
}
