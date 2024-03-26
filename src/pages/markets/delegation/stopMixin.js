import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    checked: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters('conditionCurrent', { myAllOrders: 'allOrders', myCurrentOrders: 'currentOrders' }),
    ...mapGetters('conditionHistory', { historyAllOrders: 'allOrders', historyCurrentOrders: 'currentOrders' }),
    myList() {
      return this.checked ? this.myAllOrders : this.myCurrentOrders
    },
    historyList() {
      return this.checked ? this.historyAllOrders : this.historyCurrentOrders
    },
    msgOptions() {
      return {
        style: {
          position: 'absolute',
          width: '280px',
          top: '-35px',
        },
        targetElement: this.$refs.currentBox,
      }
    },
  },
  methods: {
    ...mapActions('conditionCurrent', ['conditionCancel', 'clearCondition']),
    async cancelAll() {
      if (this.myList.length === 0) return false
      const resp = await this.clearCondition()
      const result = resp && resp.data && resp.data.conditionClear && resp.data.conditionClear.result
      if (result === 'success') {
        this.$notify.success({
          message: this.$t('m.successMessage.cancelSuccess'),
          ...this.msgOptions,
        })
      } else {
        this.$notify.error({
          message: this.$t('m.exchange.cancelFailed'),
          ...this.msgOptions,
        })
      }
    },
    async cancel(id) {
      const resp = await this.conditionCancel(id)
      const result = resp && resp.data && resp.data.conditionCancel && resp.data.conditionCancel.result
      if (result === 'success') {
        this.$notify.success({
          message: this.$t('m.successMessage.cancelSuccess'),
          ...this.msgOptions,
        })
      } else {
        this.$notify.error({
          message: this.$t('m.exchange.cancelFailed'),
          ...this.msgOptions,
        })
      }
    },
    formatReason(code) {
      return (
        {
          '0': this.$t('m.exchange.succeeded'),
          '5001': this.$t('m.exchange.failed'),
          '5002': this.$t('m.exchange.failedSpread'),
          '5003': this.$t('m.exchange.failedHold'),
        }[code] || this.$t('m.exchange.failed')
      )
    },
  },
}
