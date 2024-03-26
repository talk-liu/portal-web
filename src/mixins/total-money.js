import { BigNumber as bn } from 'bignumber.js'
import { mapGetters, mapState } from 'vuex'
import otcConfig from '@/mixins/otc-config'

export default {
  data() {
    return {
      currentOtc: localStorage.getItem('currentOtc'),
      reg: /\$|￥|₩|₽|€|£/
    }
  },
  computed: {
    ...mapGetters(['otc']),
    ...mapState('tickers', ['originalTickers', 'fixedTickers']),
    unit() {
      return this.currentOtc ? this.currencySymbol[this.currentOtc]['symbol'] : this.langSymbol[this.$fifth.lang] ? this.langSymbol[this.$fifth.lang]['symbol'] : '$'
    },
    currencySymbol() {
      return {
        usd: { symbol:'$', local:'en' },
        cny: { symbol: '￥', local: 'zh-CN' },
        krw: { symbol:'₩', local: 'ko' },
        rub: { symbol: '₽', local: 'ru' },
        eur: { symbol: '€', local: 'it' },
        gbp: { symbol: '£', local: '' },
      }
    },
    langSymbol() {
      return {
        it: { symbol:'€', local:'eur' },
        en: { symbol:'$', local:'usd' },
        ko: { symbol:'₩', local: 'krw' },
        ru: { symbol:'₽', local:'rub' },
        'zh-CN': { symbol: '￥', local: 'cny' },
      }
    },
    otcObj() {
      return this.option_otc
    },
    symbol() {
      if (!this.otcObj['usd_cny']) {
        return '$'
      }
      const currentOtc = this.currentOtc
      if (currentOtc) {
        return this.currencySymbol[currentOtc]['symbol']
      } else {
        return this.langSymbol[this.$fifth.lang] ? this.langSymbol[this.$fifth.lang]['symbol'] : this.langSymbol['en']['symbol']
      }
    },
    otcRate() {
      const currentOtc = this.currentOtc
      if (currentOtc) {
        // console.log(this.otcObj[`usd_${currentOtc}`])
        return this.otcObj[`usd_${currentOtc}`]
      } else {
        const otc = this.langSymbol[this.$fifth.lang] && this.langSymbol[this.$fifth.lang]['local']
        return this.otcObj[`usd_${otc}`] || 1
      }
    }
  },
  watch: {
    otcObj: {
      handler(val) {
        sessionStorage.setItem('otc_rate', JSON.stringify(val))
      },
      deep: true
    }
  },
  mixins: [otcConfig],
  methods: {
    // 资产换成法币
    totalLegal(totalUsdt = 0, fixed) {
      return this.addUnit(totalUsdt, fixed)
    },

    // tickers的last换成法币
    lastLegal(item, fixed = 2) {
      return typeof item === 'object' ? this.addUnit(item.usdt, fixed) : this.addUnit(item, fixed)
    },
    changeBtc(quote, val = 0, firstPrice) {
      this.tickers = firstPrice ? this.fixedTickers : this.originalTickers
      if (quote === 'btc') {
        return val
      }
      if (quote === 'usdt') {
        const last = (this.tickers['btcusdt'] && this.tickers['btcusdt'].last) || '0'
        val = Number(last) === 0 ? 0 : bn(val.toString()).dividedBy(last).toFixed(8, 1)
        return val
      }
      if (this.tickers[`${quote}btc`]) {
        const last = this.tickers[`${quote}btc`].last
        val = bn(val.toString()).multipliedBy(last).toFixed(8, 1)
      }
      return val
    },
    // 用户输入的btc转为usdt
    changeUsdt(quote, val = 0, firstPrice = false, fixed = 2, isChange = true, isUsdt = false) {
      quote = quote.toLowerCase()
      this.tickers = firstPrice ? this.fixedTickers : this.originalTickers

      if (quote === 'usdt' && !isChange) {
        return val * this.otc.usdt_cny_exchange_rate
      }
      if (quote === 'usdt') {
        return this.addUnit(val)
      }
      if(quote === 'usd'){
        return this.addUnit(val)
      }

      if (quote !== 'btc') { // 转为btc
        if (this.tickers[`${quote}usdt`]) {
          const last = this.tickers[`${quote}usdt`].last
          const usdt = bn(val.toString()).multipliedBy(last).toNumber()
          // if (isChange) {
          //   return this.addUnit(usdt)
          // } else {
          //   return val * this.otc.usdt_cny_exchange_rate
          // }
          return this.addUnit(usdt, fixed, isChange)

        }
        if (this.tickers[`${quote}btc`]) {
          const last = this.tickers[`${quote}btc`].last
          val = bn(val.toString()).multipliedBy(last)
        }
      }

      const btcusdtRate = (this.tickers['btcusdt'] && this.tickers['btcusdt'].last) || '0'
      const usdt = bn(val.toString()).multipliedBy(btcusdtRate).toNumber()
      return this.addUnit(usdt, fixed, isChange, isUsdt)
    },
    currencyChangeUsdt(quote, val = 0) {
      quote = quote.toLowerCase()
      this.tickers = this.originalTickers
      if (quote === 'usdt') {
        return val
      }
      if (quote !== 'btc') { // 转为btc
        if (this.tickers[`${quote}usdt`]) {
          const last = this.tickers[`${quote}usdt`].last
          return bn(val.toString())
            .multipliedBy(last)
            .toNumber()
        }
        if (this.tickers[`${quote}btc`]) {
          const last = this.tickers[`${quote}btc`].last
          const curBtc = bn(val.toString()).multipliedBy(last)
          const btcusdtRate = this.tickers['btcusdt'].last
          return bn(curBtc.toString())
            .multipliedBy(btcusdtRate)
            .toNumber()
        } else if (this.tickers[`${quote}eth`]) {
          const last = this.tickers[`${quote}eth`].last
          const curEth = bn(val.toString()).multipliedBy(last)
          const ethusdtRate = this.tickers['ethusdt'].last
          return bn(curEth.toString())
            .multipliedBy(ethusdtRate)
            .toNumber()
        } else if (this.tickers[`${quote}trx`]) {
          const last = this.tickers[`${quote}trx`].last
          const curTrx = bn(val.toString()).multipliedBy(last)
          const trxBtcLast = this.tickers['trxbtc'].last
          const btcUsdtLast = this.tickers['btcusdt'].last
          const trxUsdtRate = bn(trxBtcLast.toString()).multipliedBy(btcUsdtLast.toString())
          return bn(curTrx.toString())
            .multipliedBy(trxUsdtRate)
            .toNumber()
        }
      } else {
        const btcusdtRate = this.tickers['btcusdt'].last
        return bn(val.toString())
          .multipliedBy(btcusdtRate)
          .toNumber()
      }
      return 0
    },
    // add Unit
    addUnit(total, fixed = 2, isChange = true, isUsdt = false) {
      total = Number(total)
      if (isUsdt) {
        return total.toFixed(fixed)
      }
      const symbol = this.symbol
      const rate = this.otcRate
      if (rate) {
        total = bn(total.toString()).multipliedBy(rate).toFixed(fixed)
      }
      if (!isChange) {
        return Number(total).toFixed(fixed).toString()
      }
      return `${symbol}${Number(total).toLocaleString('en-US', { minimumFractionDigits: fixed })}`
    },
  }
}
