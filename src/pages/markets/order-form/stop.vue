<template>
  <div class="stop-wrap">
    <input-item
      v-model="triggerPrice"
      type="base"
      :after="quoteUnit | upperCase"
      :name="$t('m.exchange.stopPrice')"
      :placeholder="$t('m.exchange.stopPrice')"
      :error="triggerPriceError"
      @focus="updateFocus('trigger')"
    ></input-item>
    <input-item
      v-model="price"
      type="base"
      :after="quoteUnit | upperCase"
      :name="$t('m.exchange.limitPrice')"
      :placeholder="$t('m.exchange.limitPrice')"
      @focus="updateFocus('price')"
    ></input-item>
    <input-item
      v-model="volume"
      type="quote"
      :after="baseUnit | upperCase"
      :name="$t('m.exchange.amount')"
      :placeholder="maxCount"
    ></input-item>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import BigNumber from 'bignumber.js'

import InputItem from './input-item'
import orderVerify from './order-verify.js'

export default {
  mixins: [orderVerify],
  components: {
    InputItem,
  },
  computed: {
    ...mapGetters('tickers', ['lastPrice', 'baseUnit', 'quoteUnit']),
    ...mapGetters('orderForm', ['max']),
    ...mapState('orderForm', ['type']),
    triggerPriceError() {
      if (BigNumber(this.triggerPrice).eq(this.lastPrice)) {
        return this.$t('m.exchange.stopPriceError')
      }
    },
    maxCount() {
      if (!this.max) return this.$t('m.exchange.amount')
      return this.type === 'buy'
        ? this.$t('m.exchange.bidMax', { count: this.max })
        : this.$t('m.exchange.askMax', { count: this.max })
    },
  },
  methods: {
    ...mapMutations('orderForm', ['updateFocus']),
  },
}
</script>

<style lang="scss" scoped>
.stop-wrap {
  padding-top: 24px;
}
</style>

