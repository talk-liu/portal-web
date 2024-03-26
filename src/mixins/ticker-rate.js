import find from 'lodash/find'
const gon = window.gon
const market = gon.market
const vouchers = gon.vouchers
const activatedTickers = vouchers && vouchers.active || []
const unactivatedTickers = vouchers && vouchers.inactive || []
const market_voucher = vouchers && vouchers.market_voucher || {}
export default {
  data() {
    return {
      activatedTickers,
      unactivatedTickers,
    }
  },
  computed: {
    market() {
      return this.current_market || market
    }
  },
  methods: {
    getCurrentTicker() {
      const base_unit = this.market.base_unit
      const quote_unit = this.market.quote_unit
      const id = market_voucher[base_unit + quote_unit]
      const item = id && find(this.activatedTickers, { id })
      if (item && item.amount > 0) {
        return item
      }
    },
  },
}
