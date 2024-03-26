import {
  mapGetters
} from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import virtualData from '../components/virtualData'
import totalMoney from '@/mixins/total-money'

export default {
  mixins: [totalMoney],
  computed: {
    ...mapGetters(['lastSevenAtMiningAwards', 'totalAt']),
    dateList() {
      return cloneDeep(this.lastSevenAtMiningAwards.map(v => this.timeFormat(v.timestamp * 1000))).reverse()
    },
    releaseAtArray() {
      return cloneDeep(this.lastSevenAtMiningAwards.map(v => v.releaseAt)).reverse()
    },
    tradeFeeArray() {
      return cloneDeep(this.lastSevenAtMiningAwards.map(v => v.tradeFee)).reverse()
    },
    unitAtMiningCostArray() {
      return cloneDeep(this.lastSevenAtMiningAwards.map(v => v.unitAtMiningCost)).reverse()
    },
    miningAwardPercentPerDay() {
      return cloneDeep(this.lastSevenAtMiningAwards.map(v => v.miningAwardPercentPerDay)).reverse()
    },
    dataSource() {
      return [{
        name: this.$t('m.atMing.releaseAT'),
        itemSource: this.releaseAtArray
      },
      {
        // name: this.$t('m.atMing.fee') + '（USDT）',
        name: this.$t('m.atMing.fee') + ` (${this.unit})`,
        itemSource: this.tradeFeeArray,
        unit: 'USDT'
      },
      {
        // name: this.$t('m.atMing.atAverageCost') + '（USDT) ',
        name: this.$t('m.atMing.atAverageCost') + ` (${this.unit})`,
        itemSource: this.unitAtMiningCostArray,
        unit: 'USDT'
      },
      {
        name: this.$t('m.atMing.dayRewards'),
        itemSource: this.miningAwardPercentPerDay,
        unit: '%'
      }
      ]
    },
    ptSource() {
      // todo interface
      return [{
        integer: this.totalAt,
        decimal: '',
        unit: '',
        name: this.$t('m.atMing.releaseTotalAT')
      },
      // {
      //   integer: '175000',
      //   decimal: '',
      //   unit: '',
      //   name: this.$t('m.atMing.dayMining')
      // },
      {
        integer: '43750',
        decimal: '',
        unit: '',
        name: this.$t('m.atMing.dayMiningBlock')
      },
      {
        integer: this.transFormLegal(this.unitAtMiningCostArray)[0],
        decimal: this.transFormLegal(this.unitAtMiningCostArray)[1],
        unit: 'USDT',
        name: this.$t('m.atMing.average')
      },
      {
        integer: this.transFormInterDecimal(this.miningAwardPercentPerDay)[0],
        decimal: this.transFormInterDecimal(this.miningAwardPercentPerDay)[1],
        unit: '%',
        name: this.$t('m.atMing.dayRewards')
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
    virtualUnitAtMiningCostArray() {
      return virtualData(cloneDeep(this.unitAtMiningCostArray))
    },
    virtualMiningAwardPercentPerDay() {
      return virtualData(cloneDeep(this.miningAwardPercentPerDay))
    }
  },
  methods: {
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