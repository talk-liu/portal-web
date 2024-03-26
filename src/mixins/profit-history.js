import BigNumber from 'bignumber.js'
import totalMoney from '@/mixins/total-money'
export default {
  mixins: [totalMoney],
  data() {
    return {
      state: {
        power_coupon: this.$t('m.funds.historyRecords.powerCoupon'),
        my_tom: this.$t('m.funds.historyRecords.myToM'),
        level1_tom: this.$t('m.funds.historyRecords.level1ToM'),
        level2_tom: this.$t('m.funds.historyRecords.level2ToM'),
        invited_tom: this.$t('m.funds.historyRecords.invitedToM')
      }
    }
  },
  methods: {
    totalDailyRewards(item) {
      if (item) {
        const btc = item.btc || 0
        const usdtToBtc = this.changeBtc('usdt', item.usdt) || 0
        const ethToBtc = this.changeBtc('eth', item.eth) || 0
        const atToBtc = this.changeBtc('at', item.at) || 0
        const trxToBtc = this.changeBtc('trx', item.trx) || 0
        const totalBtc = BigNumber(btc).plus(usdtToBtc).plus(ethToBtc).plus(atToBtc).plus(trxToBtc)
        return this.changeUsdt('btc', totalBtc)
      }
    },
  }
}