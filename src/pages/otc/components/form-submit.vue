<template>
  <form ref='payment_form' :action='submitUrl' method='post'>
    <input type='hidden' name='version' value='1'>
    <input type='hidden' name='partner' :value='quoteData.wallet_id'>
    <input type='hidden' name='payment_flow_type' value='wallet'>
    <input type='hidden' name='return_url' :value='`${hostUrl}/otc/progress?lang=en&payment_id=${paymentData.payment_id}`'>
    <input type="hidden" name="email" :value="email">
    <input type='hidden' name='payment_id' :value='paymentData.payment_id'>
    <input type='hidden' name='quote_id' :value='quoteData.quote_id'>
    <input type='hidden' name='user_id' :value='quoteData.user_id'>
    <input type='hidden' name='destination_wallet[address]' :value='paymentData.wallet_address'>
    <input type='hidden' name='destination_wallet[currency]' :value='paymentData.wallet_currency'>
    <input type='hidden' name='fiat_total_amount[amount]' :value='quoteData.fiat_money.total_amount'>
    <input type='hidden' name='fiat_total_amount[currency]' :value='quoteData.fiat_money.currency'>
    <input type='hidden' name='digital_total_amount[amount]' :value='quoteData.digital_money.amount'>
    <input type='hidden' name='digital_total_amount[currency]' :value='quoteData.digital_money.currency'>
  </form>
</template>
<script>
const host = window.location.origin
export default {
  data() {
    return {
      hostUrl: host
    }
  },
  props: ['quoteData', 'paymentData', 'email'],
  computed: {
    submitUrl() {
      if (this.hostUrl === 'https://pre.riostox.com' || this.hostUrl === 'https://riostox.com' || this.hostUrl === 'https://riostox.com') {
        return 'https://checkout.simplexcc.com/payments/new'
      } else {
        return 'https://sandbox.test-simplexcc.com/payments/new'
      }
    }
  },
  watch: {
    paymentData(val) {
      if (val && val.payment_id) {
        setTimeout(() => {
          this.$refs.payment_form.submit()
        })
      }
    }
  }
}
</script>
