<template>
  <div class="market-wrap">
    <input-item :name="$t('m.exchange.price')" :placeholder="$t('m.exchange.market')" :disabled="true" :after="quoteUnit | upperCase"></input-item>
    <input-item v-model="volume" type="quote" :name="$t('m.exchange.amount')" :placeholder="maxCount" :after="baseUnit | upperCase" :error="error"></input-item>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import InputItem from './input-item'
import orderVerify from './order-verify.js'

export default {
  mixins: [orderVerify],
  props: ['error'],
  components: {
    InputItem,
  },
  computed: {
    ...mapGetters('orderForm', ['max']),
    ...mapGetters('tickers', ['baseUnit', 'quoteUnit']),
    ...mapState('orderForm', ['type']),
    maxCount() {
      if (!this.max) return this.$t('m.exchange.amount')
      return this.type === 'buy'
        ? this.$t('m.exchange.bidMax', { count: this.max })
        : this.$t('m.exchange.askMax', { count: this.max })
    },
  },
}
</script>

<style lang="scss" scoped>
.market-wrap {
  padding-top: 24px;
}
</style>

