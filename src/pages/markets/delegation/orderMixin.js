import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  props: {
    checked: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters('openOrders', { myAllOrders: 'allOrders', myCurrentOrders: 'currentOrders' }),
    ...mapGetters('historyOrders', { historyAllOrders: 'allOrders', historyCurrentOrders: 'currentOrders' }),
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
    ...mapMutations('openOrders', ['hoverCurrentOrder']),
    ...mapActions('openOrders', ['cancelOrder', 'clearOrder']),
    async cancelAll() {
      if (this.myList.length === 0) return false
      const resp = await this.clearOrder()
      const result = resp && resp.data && resp.data.clearOrder
      if (result && result[0].id) {
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
      const resp = await this.cancelOrder(id)
      const result = resp && resp.data && resp.data.cancelOrder && resp.data.cancelOrder.id
      if (result) {
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
  },
}
