import {
  mapGetters
} from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import virtualData from '../components/virtualData'
import totalMoney from '@/mixins/total-money'

export default {
  mixins: [totalMoney],
  computed: {
    ...mapGetters(['atTotalInfos']),
    timeArray() {
      if (this.atTotalInfos.length > 0) {
        const arr = cloneDeep(this.atTotalInfos.map(v => this.timeFormat(v.interval * 1000))).reverse()
        arr.push(arr.length - 1)
        arr.unshift(arr[0])
        return arr
      } else {
        return []
      }
    },
    atPriceArray() {
      const arr = cloneDeep(this.atTotalInfos.map(v => v.atPrice)).reverse()
      const atPriceArray = virtualData(arr)
      return atPriceArray
    },
    atMiningCostArray() {
      const arr = cloneDeep(this.atTotalInfos.map(v => v.atMiningCost)).reverse()
      const atMiningCostArray = virtualData(arr)
      return atMiningCostArray
    },
    totalCPArray() {
      return cloneDeep(this.atTotalInfos.map(v => v.totalCP)).reverse()
    },
    totalCPWithOtherCP() {
      const arr = cloneDeep(this.atTotalInfos.map(v => {
        return {
          cal: v.friendCP, // 好友算力
          base_cal: v.basicCP, // 基础算力
          ticket: v.ticketCP, // 券算力
          value: v.totalCP // atMiningCost
        }
      })).reverse()
      const totalCPWithOtherCP = virtualData(arr)
      return totalCPWithOtherCP
    },
    recentData() {
      const {
        atPrice,
        atMiningCost
      } = this.atTotalInfos.length > 0 && this.atTotalInfos[0]
      return {
        ...this.atTotalInfos[0],
        atPrice: atPrice ? this.addUnit(atPrice) : '',
        atMiningCost: atMiningCost ? this.addUnit(atMiningCost) : '',
        interval: this.atTotalInfos[0] ? this.timeFormat(this.atTotalInfos[0] && this.atTotalInfos[0].interval * 1000) : ''
      }
    }
  },
  methods: {
    timeFormat(t) {
      const time = new Date(t)
      const month = time.getMonth() + 1
      const day = time.getDate()
      const hour = time.getHours()
      const hourFormat = hour < 10 ? ('0' + hour) : hour
      const timeFormat = `${month}/${day} ${hourFormat}:00-${hour + 6}:00 UTC+8`
      return timeFormat
    }
  }
}