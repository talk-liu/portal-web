import { mapMutations, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapMutations('orderForm', ['updatePrice', 'updateVolume', 'updateTriggerPrice']),
  },
  computed: {
    ...mapGetters('orderForm', ['total']),
    price: {
      get() {
        return this.$store.state.orderForm.price
      },
      set(value) {
        this.updatePrice(value)
      },
    },
    volume: {
      get() {
        return this.$store.state.orderForm.volume
      },
      set(value) {
        this.updateVolume(value)
      },
    },
    triggerPrice: {
      get() {
        return this.$store.state.orderForm.triggerPrice
      },
      set(value) {
        this.updateTriggerPrice(value)
      },
    },
  },
}
