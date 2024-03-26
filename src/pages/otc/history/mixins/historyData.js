
import dayjs from 'dayjs'
import { mapState, mapActions } from 'vuex'

export default {
  mounted() {
    this.getPaymentOrders({
      page: 1
    })
  },
  computed: {
    ...mapState('otc', ['transactionHistory']),
    historyList() {
      let arr = []
      if (this.transactionHistory.payment_orders) {
        this.transactionHistory.payment_orders.forEach(e => {
          let obj = {}
          obj.paymentId = e.payment_id
          obj.date = dayjs(e.created_at).format('YYYY.MM.DD HH:mm:ss')
          // 支付订单状态，created: 0, submitted: 1, approved: 2, declined: 3, expired: 4
          switch (e.state) {
            case 'submitted':
              obj.status = 'Under Processing'
              break
            case 'approved':
              obj.status = 'Completed'
              break
            case 'declined':
              obj.status = 'Failed'
              break
            default:
              obj.status = e.state
              break
          }
          obj.cryptocurrencies = e.digital_currency
          obj.purchaseAmount = e.digital_currency_amount
          obj.paymentCurrencies = e.fiat_currency
          obj.paymentAmount = e.fiat_total_amount
          obj.fee = e.simplex_fee
          arr.push(obj)
        })
      }
      return arr
    },
    pageMeta() {
      if (this.transactionHistory.meta) {
        return this.transactionHistory.meta
      } else {
        return {
          total_count: 0,
          page_size: 0,
          total_pages: 0,
        }
      }
    }
  },
  methods: {
    ...mapActions('otc', ['getPaymentOrders']),
    pagechange(currentPage) {
      this.getPaymentOrders({
        page: currentPage
      })
    },
  },
}
