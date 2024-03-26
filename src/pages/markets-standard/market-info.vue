<template>
  <div class='banner'>
    <div class='item'>
      <span class='current-currency regular'>{{currentTicker.base_unit | upperCase}}</span>
      <span class='echange-currency regular'>/{{currentTicker.quote_unit | upperCase}}</span>
    </div>
    <div class='item label-value-item'>
      <div class='top fm'>{{lang.lastPrice}}</div>
      <div class=' value '>
        <span class='num semi-bold' :class="[last.type ? 'green':'red']">{{last.price}}</span>
        <span class='label-mini fb'>{{lastLegal(currentTicker,4)}}</span>
      </div>
    </div>
    <div class='item label-value-item'>
      <div class='top fm'>{{time}} {{lang.change}}</div>
      <div class=' value '>
        <span class='num semi-bold' :class="[currentTicker.is_up ? 'green':'red']">{{currentTicker.changeNum}}</span>
        <span class='label-mini fb' :class="[currentTicker.is_up ? 'green':'red']">{{currentTicker.percent}}</span>
      </div>
    </div>
    <div class='item label-value-item'>
      <div class='top fm'>{{time}} {{lang.high}}</div>
      <div class=' value'>
        <span class='num semi-bold'>{{priceFixed(currentTicker.high,currentTicker.bid_fixed)}}</span>
      </div>
    </div>
    <div class='item label-value-item'>
      <div class='top fm'>{{time}} {{lang.low}}</div>
      <div class=' value '>
        <span class='num semi-bold'>{{priceFixed(currentTicker.low,currentTicker.bid_fixed)}}</span>
      </div>
    </div>
    <div class='item label-value-item'>
      <div class='top fm'>{{time}} {{lang.volume}}</div>
      <div class=' value'>
        <span class='num semi-bold'>{{currentTicker.funds | thousands}}</span>
        <span class='label-mini fb'>{{currentTicker.quote_unit | upperCase}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BigNumber from 'bignumber.js'
import totalMoeny from '@/mixins/total-money'

export default {
  mixins: [totalMoeny],
  data() {
    return {
      prevPrice: 0,
      prevType: false,
    }
  },
  computed: {
    ...mapGetters('tickers', ['currentTicker']),
    last() {
      let fixed = this.currentTicker.bid_fixed
      let currentPrice = this.currentTicker.last
      if (this.prevPrice === currentPrice) {
        let price = BigNumber(currentPrice).toFixed(fixed, 1)
        return { type: this.prevType, price: price }
      }
      let type = currentPrice > this.prevPrice
      this.prevPrice = currentPrice
      this.prevType = type
      let price = BigNumber(currentPrice).toFixed(fixed, 1)
      return { type, price }
    },
    lang() {
      return {
        volume: this.$t('m.exchange.volume'),
        low: this.$t('m.exchange.low'),
        high: this.$t('m.exchange.high'),
        change: this.$t('m.exchange.change'),
        lastPrice: this.$t('m.exchange.lastPrice'),
      }
    },
    time() {
      return this.$fifth.isTr ? '24s' : '24h'
    }
  },
  methods:{
    priceFixed(price = 0, fixed = 0) {
      return BigNumber(price).toFixed(fixed)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/variable.scss';

.banner {
  border: 1px solid $color-line;
  width: 1200px;
  height: 60px;
  color: $color-assist1;
  background-color: #ffffff;
  margin: 15px auto;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 0 50px 0 125px;
  .label-value-item {
    .value {
      font-size: 0;
      .num {
        font-size: 15px;
      }
      .label-mini {
        margin-left: 6px;
        font-size: 12px;
        color: $color-assist3;
      }
      .red {
        color: $color-assist6;
      }
      .green {
        color: $color-assist5;
      }
    }
    .top {
      color: $color-assist3;
      font-size: 12px;
    }
  }

  .item {
    flex: 1;
    text-align: left;
    .current-currency {
      font-size: 30px;
    }
    .echange-currency {
      font-size: 20px;
    }
  }
  .green {
    color: $color-assist5;
  }
  .red {
    color: $color-assist6;
  }
  .gray {
    color: $color-assist3;
  }
}
</style>
