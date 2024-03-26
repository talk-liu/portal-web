import { BigNumber as bn } from 'bignumber.js'

export default {
  methods: {
    priceFixed(price = 0, fixed = 0) {
      return bn(price).toFixed(fixed)
    }
  }
}
