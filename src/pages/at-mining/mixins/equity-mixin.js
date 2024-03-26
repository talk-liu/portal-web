import {
  mapGetters
} from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import virtualData from '../components/virtualData'
import totalMoney from '@/mixins/total-money'
import {
  BigNumber as bn
} from 'bignumber.js'

export default {
  mixins: [totalMoney],
  computed: {
    ...mapGetters(['lastSevenAtAwards', 'totalProfit', 'atProfitRate', 'unitATProfit', 'currentProfit', 'otc']),
    hundredProfit() {
      const price = this.addUnit(this.unitATProfit, 8, false)
      return bn(price).multipliedBy(1000).toFixed(2)
      // if (this.$fifth.isCn && this.otc) {
      //   return bn(this.otc.usdt_cny_exchange_rate)
      //     .multipliedBy(this.unitATProfit)
      //     .multipliedBy(1000)
      //     .toFixed(2)
      // } else {
      //   return bn(this.unitATProfit)
      //     .multipliedBy(1000)
      //     .toFixed(2)
      // }
    },
    dateList() {
      return cloneDeep(this.lastSevenAtAwards.map(v => this.timeFormat(v.timestamp * 1000))).reverse()
    },
    platformToBeAwardArray() {
      return cloneDeep(this.lastSevenAtAwards.map(v => v.platformToBeAward)).reverse()
    },
    unitAtAwardArray() {
      return cloneDeep(this.lastSevenAtAwards.map(v => v.unitAtAward)).reverse()
    },
    thousandAtAwardArray() {
      return cloneDeep(this.lastSevenAtAwards.map(v => v.thousandAtAward)).reverse()
    },
    atAwardPerDayArray() {
      return cloneDeep(this.lastSevenAtAwards.map(v => v.atAwardPerDay)).reverse()
    },
    atAwardPerWeekArray() {
      return cloneDeep(this.lastSevenAtAwards.map(v => v.atAwardPerWeek)).reverse()
    },
    dataSource() {
      return [{
        name: this.$t('m.atMing.rewardsFromPlatform') + ` (${this.unit})`,
        itemSource: this.platformToBeAwardArray,
        unit: 'USDT'
      },
      {
        name: this.$t('m.atMing.unitATReward') + ` (${this.unit})`,
        itemSource: this.unitAtAwardArray,
        unit: 'USDT'
      },
      {
        name: this.$t('m.atMing.equityOne.explain') + ` (${this.unit})`,
        itemSource: this.thousandAtAwardArray,
        unit: 'USDT'
      },
      {
        name: this.$t('m.atMing.dailyRate'),
        itemSource: this.atAwardPerDayArray,
        unit: '%'
      },
      {
        name: this.$t('m.atMing.weekRate'),
        itemSource: this.atAwardPerWeekArray,
        unit: '%'
      }
      ]
    },
    ptSource() {
      return [{
        integer: this.totalProfitIntegerToFixed(this.totalProfit).split('.')[0],
        decimal: this.totalProfitIntegerToFixed(this.totalProfit).split('.')[1],
        unit: 'USDT',
        name: this.$t('m.atMing.totalProfit')
      },
      {
        integer: this.totalProfitIntegerToFixed(this.currentProfit).split('.')[0],
        decimal: this.totalProfitIntegerToFixed(this.currentProfit).split('.')[1],
        unit: 'USDT',
        name: this.$t('m.atMing.currentProfit')
      },
      {
        integer: this.hundredProfit.split('.')[0],
        decimal: this.hundredProfit.split('.')[1],
        unit: 'USDT',
        name: this.$t('m.atMing.equityOne.explain')
      }, {
        integer: this.atProfitRate.split('.')[0],
        decimal: this.atProfitRate.split('.')[1],
        unit: '%',
        name: this.$t('m.atMing.dailyRate')
      }, {
        integer: this.transFormInterDecimal(this.atAwardPerWeekArray)[0],
        decimal: this.transFormInterDecimal(this.atAwardPerWeekArray)[1],
        unit: '%',
        name: this.$t('m.atMing.weekRate')
      }
      ]
    },
    virtualDateList() {
      if (this.dateList.length > 0) {
        const d = cloneDeep(this.dateList)
        d.push(d[d.length - 1])
        d.unshift(d[0])
        return d
      } else {
        return []
      }
    },
    virtualThousandAtAwardArray() {
      return virtualData(cloneDeep(this.thousandAtAwardArray))
    },
    virtualAtAwardPerDayArray() {
      return virtualData(cloneDeep(this.atAwardPerDayArray))
    },
    virtualAtAwardPerWeekArray() {
      return virtualData(cloneDeep(this.atAwardPerWeekArray))
    }
  },
  methods: {
    totalProfitIntegerToFixed(profit) {
      if (profit) {
        return this.changeUsdt('btc', profit, true, 2, false)
        // eturn price.replace(/\$|￥|₩|₽/, '')
        // return Number(this.totalProfit).toFixed(2).toString()
      } else {
        return ''
      }
    },
    timeFormat(t) {
      const time = new Date(t)
      const month = time.getMonth() + 1
      const day = time.getDate()
      return `${month}/${day}`
    },
    transFormInterDecimal(d) {
      if (d && d.length > 0) {
        const l = d.length - 1
        return [
          d[l].toString().split('.')[0],
          d[l].toString().split('.')[1]
        ]
      } else {
        return []
      }
    },
    transFormLegal(d) {
      if (d && d.length > 0) {
        const l = d.length - 1
        let legal = this.addUnit(d[l]).replace(this.reg, '')
        return [
          legal.split('.')[0],
          legal.split('.')[1]
        ]
      } else {
        return []
      }
    }
  }
}