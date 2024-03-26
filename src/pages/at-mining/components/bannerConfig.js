import { mapGetters } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import totalMoney from '@/mixins/total-money'
import { BigNumber as bn } from 'bignumber.js'

export default {
  mixins: [totalMoney],
  data() {
    return {
      equityCfg: {
        title: this.$t('m.atMing.atEquity'),
        linkText: { name: this.$t('m.atMing.getAT'), href: '/pro/markets/btcusdt' },
      },
      miningCfg: {
        title: this.$t('m.atMing.miningMachine'),
        linkText: { name: this.$t('m.atMing.exchangeMining'), href: '/pro/markets/btcusdt' },
      },
      atMiningList: [
        {
          icon: 'https://i.riostox.com/i/aa/aa05f2d68e7fa0fc1d102b816e0b3aed.png',
          title: this.$t('m.atMing.miningOne.name'),
          desc: this.$t('m.atMing.miningOne.sub'),
          profit: this.$t('m.atMing.miningOne.explain'),
          notice: { name: this.$t('m.atMing.miningOne.href'), href: '/funds/profit' },
        },
        {
          icon: 'https://i.riostox.com/i/4b/4b1fbfe8ec53db4dd1d65b69b43185bb.png',
          title: this.$t('m.atMing.miningTwo.name'),
          desc: this.$t('m.atMing.miningTwo.sub'),
          profit: this.$t('m.atMing.miningTwo.explain'),
          notice: { name: this.$t('m.atMing.miningTwo.href'), href: '/at_invitation/event' },
        },
        {
          icon: 'https://i.riostox.com/i/57/579cd00729dc5723a263658017ff63d0.png',
          title: this.$t('m.atMing.miningThree.name'),
          desc: this.$t('m.atMing.miningThree.sub'),
          profit: this.$t('m.atMing.miningThree.explain'),
          notice: { name: this.$t('m.atMing.miningThree.href'), href: '' },
          disabled: true,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['lastSevenAtAwards', 'candyAmount', 'unitATProfit', 'otc']),
    hundredProfit() {
      const price = this.addUnit(this.unitATProfit, 8, false)
      return bn(price)
        .multipliedBy(1000)
        .toFixed(2)
    },
    thousandAtAwardArray() {
      return cloneDeep(this.lastSevenAtAwards.map(v => v.thousandAtAward)).reverse()
    },
    atEquityList() {
      return [
        {
          icon: 'https://i.riostox.com/i/f5/f50c9948d92d11020d610141536ef2c6.png',
          title: this.$t('m.atMing.equityOne.name'),
          desc: this.$t('m.atMing.equityOne.sub') + this.$t('m.atMing.equityOne.sup'),
          profit: this.$t('m.atMing.equityOne.explain') + ': ' + this.unit + this.hundredProfit
        },
        {
          icon: 'https://i.riostox.com/i/9d/9df7fc445bccd2912ef710b71813c738.png',
          title: this.$t('m.atMing.equityTwo.name'),
          desc: this.$t('m.atMing.equityTwo.sub'),
          profit: this.$t('m.atMing.equityTwo.explain') + this.addUnit(this.candyAmount),
        },
        {
          icon: 'https://i.riostox.com/i/e6/e69152e76e1f4631683d619a8e8feda5.png',
          title: this.$t('m.atMing.equityFour.name'),
          desc: this.$t('m.atMing.equityFour.sub'),
          profit: this.$t('m.atMing.equityFour.explain'),
          disabled: true,
        },
      ]
    },
  },
}
