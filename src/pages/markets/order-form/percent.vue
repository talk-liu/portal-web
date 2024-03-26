<template>
  <div class="percent-wrap">
    <div class="space"></div>
    <div class="percent">
      <span v-for="item in config" :key="item.key" @click="changePercent(item.key)">{{item.value}}%</span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import BigNumber from 'bignumber.js'
export default {
  data() {
    return {
      config: [
        { value: '25', key: '0.25' },
        { value: '50', key: '0.5' },
        { value: '75', key: '0.75' },
        { value: '100', key: '1' },
      ],
    }
  },
  computed: {
    ...mapState('orderForm', ['price', 'type']),
    ...mapGetters('orderForm', ['account', 'fee']),
    ...mapGetters('tickers', ['currentTicker']),
  },
  methods: {
    ...mapMutations('orderForm', ['updatePercent', 'updateVolume']),
    changePercent(percent) {
      if (!this.price) return false
      const { quoteBalance, baseBalance } = this.account
      const { ask_fixed } = this.currentTicker
      let volume = ''
      if (this.type === 'buy') {
        volume = BigNumber(BigNumber(BigNumber(quoteBalance).times(1 - this.fee)).times(percent))
          .div(this.price)
          .toFixed(ask_fixed, 1)
      } else {
        volume = BigNumber(baseBalance)
          .times(percent)
          .toFixed(ask_fixed, 1)
      }
      this.updatePercent(percent)
      this.updateVolume(volume)
    },
  },
}
</script>

<style lang="scss" scoped>
.percent-wrap {
  display: flex;
  margin: -8px 0 20px;
  font-size: 12px;

  @include themify($themes) {
    color: themed('textColor7');
  }
  .space {
    width: 60px;
  }
  .percent {
    flex: 1;
    display: flex;
    span {
      flex: 1;
      cursor: pointer;
      text-align: center;
      position: relative;
      &:hover {
        @include themify($themes) {
          color: themed('textColor3');
        }
        &:before {
          content: '';
          display: block;
          height: 1px;
          width: 50%;
          position: absolute;
          bottom: -2px;
          left: 25%;

          @include themify($themes) {
            background-color: themed('textColor3');
          }
        }
      }
    }
  }
}
</style>

