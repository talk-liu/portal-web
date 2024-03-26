import {
  mapGetters
} from 'vuex'
export default {
  data() {
    return {
      otcQQ: '2852810357',
    }
  },
  computed: {
    ...mapGetters('otc', ['otc', 'option_otc']),
    otcExchange() {
      return this.otc.otc_opened
    },
    usdtRate() {
      return this.otc.usdt_cny_exchange_rate || 6.87
    }
  },
  methods: {
    exchangeTalk() {
      if (this.otc.otc_opened) {
        window.open('https://q.url.cn/CDSAPo?_type=wpa&qidian=true')
      }
    }
  },
}