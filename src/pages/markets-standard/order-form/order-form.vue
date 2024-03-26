<template>
  <div class="order-submit" ref="orderForm">
    <div class="column">
      <label class="title fb clearfix">
        <div class="fl">
          {{$t('m.exchange.buy')}}
          <span class="semi-bold">{{baseUnit | upperCase}}</span>
        </div>
      </label>
      <input-label
        :decimal-count="currentTicker.bid_fixed"
        :value="limitBidPrice"
        @keyup="onLimitBidPriceKeyup"
        class="input-item input-price"
        :after-label="quoteUnit | upperCase"
        :before-label="$t('m.exchange.price')"
        @focus="clearAsk"
        :secAfterShow="true"
      ></input-label>
      <p class="btc-money">{{buyMoney}}</p>
      <input-label
        :decimal-count="currentTicker.ask_fixed"
        :value="limitBidCount"
        @keyup="onLimitBidCountKeyup"
        class="input-item input-amout"
        :after-label="baseUnit | upperCase"
        :before-label="mostBidCountMsg || $t('m.exchange.amount')"
        :err-msg="errBidCountMsg"
        @focus="clearAsk"
      ></input-label>
      <percent-selector @input="onLimitBidPercent"></percent-selector>
      <input-label
        :decimal-count="totalDecimal"
        class="input-item input-total"
        :value="limitBidTotal"
        @keyup="onLimitBidTotalKeyup"
        :after-label="quoteUnit | upperCase"
        :before-label="$t('m.exchange.total')"
        @focus="clearAsk"
      ></input-label>
      <div
        class="balance semi-bold"
        v-if="isLogin"
      >{{quoteUnit | upperCase}} {{$t('m.exchange.balance')}}：{{quoteBalance}}</div>
      <button class="btn buy fm" v-if="isLogin" @click="canBidSubmit && orderConfirm('buy')">
        <btn-loading v-if="isBidSubmiting"></btn-loading>
        <span>{{buySubmiting}}</span>
      </button>
      <button class="not-login fm" v-else>
        <router-link :to="$i18nRoute({ name: 'signin' })">{{$t('m.exchange.login')}}</router-link>or
        <router-link :to="$i18nRoute({ name: 'signup' })">{{$t('m.exchange.join')}}</router-link>
        {{$t('m.exchange.trading')}}
      </button>
    </div>
    <div class="column">
      <label class="title fb clearfix">
        <div class="fl">
          {{$t('m.exchange.sell')}}
          <span class="semi-bold">{{baseUnit | upperCase}}</span>
        </div>
      </label>
      <input-label
        :decimal-count="currentTicker.bid_fixed"
        :value="limitAskPrice"
        @keyup="onLimitAskPriceKeyup"
        class="input-item input-price"
        :after-label="quoteUnit | upperCase"
        :before-label="$t('m.exchange.price')"
        @focus="clearBid"
      ></input-label>
      <p class="btc-money">{{sellMoney}}</p>
      <input-label
        :decimal-count="currentTicker.ask_fixed"
        :value="limitAskCount"
        @keyup="onLimitAskCountKeyup"
        class="input-item input-amout"
        :after-label="baseUnit | upperCase"
        :before-label="mostAskCountMsg || $t('m.exchange.amount')"
        :err-msg="errAskCountMsg"
        @focus="clearBid"
      ></input-label>
      <percent-selector @input="onLimitAskPercent"></percent-selector>
      <input-label
        :decimal-count="totalDecimal"
        :value="limitAskTotal"
        @keyup="onLimitAskTotalKeyup"
        class="input-item input-total"
        :after-label="quoteUnit | upperCase"
        :before-label="$t('m.exchange.total')"
        @focus="clearBid"
      ></input-label>
      <div
        class="balance semi-bold"
        v-if="isLogin"
      >{{baseUnit | upperCase}} {{$t('m.exchange.balance')}}：{{baseBalance}}</div>
      <button class="btn sell fm" v-if="isLogin" @click="canAskSubmit && orderConfirm('sell')">
        <btn-loading v-if="isAskSubmiting"></btn-loading>
        <span>{{askSubmiting}}</span>
      </button>
      <button class="not-login fm" v-else>
        <router-link :to="$i18nRoute({ name: 'signin' })">{{$t('m.exchange.login')}}</router-link> or
        <router-link :to="$i18nRoute({ name: 'signup' })">{{$t('m.exchange.join')}}</router-link>
        {{$t('m.exchange.trading')}}
      </button>
      <OrderConfirm
        :type="type"
        :orderType="orderType"
        :info="info"
        :visible="visible"
        @confirm="confirm"
        @close="visible = false"
      ></OrderConfirm>
    </div>
  </div>
</template>
<script>
import BigNumber from 'bignumber.js'
import { mapGetters, mapMutations, mapState } from 'vuex'

import api from '@/graphql'
import BtnLoading from '@/components/btn-loading'
import totalMoeny from '@/mixins/total-money'

import PercentSelector from './percent-selector'
import InputLabel from './input-label'
import OrderConfirm from './order-confirm'

function isFloat(n) {
  let arr = n.split('.')
  if (arr && arr.length == 2) {
    return { is: true, count: arr[1].length }
  }
  return { is: false }
}
function toFixed(v, fixed) {
  if (v < 0) return ''
  let { is, count } = isFloat(v)
  let result = v
  if (count > fixed && is) {
    let x = BigNumber(v).toFixed(fixed, 1)
    result = x
  }
  return result
}
function isNumber(v) {
  if (!v.trim()) {
    return false
  }
  return BigNumber(v).isInteger() || isFloat(v).is
}
export default {
  mixins: [totalMoeny],
  components: {
    InputLabel,
    PercentSelector,
    BtnLoading,
    OrderConfirm,
  },
  data() {
    return {
      totalDecimal: 8,
      beforeFocus: '',
      limitBidPrice: '',
      limitBidCount: '',
      limitBidTotal: '',
      limitAskPrice: '',
      limitAskCount: '',
      limitAskTotal: '',
      mostCount: 0,
      mostBidCountMsg: '',
      mostAskCountMsg: '',
      errBidCountMsg: '',
      errAskCountMsg: '',
      isBidSubmiting: false,
      isAskSubmiting: false,
      visible: false,
      type: '',
      info: {},
      orderType: '',
    }
  },
  computed: {
    ...mapState('tickers', ['currentMarketId']),
    ...mapState('standardPrice', ['orderSellPrice', 'orderBuyPrice']),
    ...mapGetters('tickers', ['currentTicker', 'baseUnit', 'quoteUnit']),
    ...mapGetters('currentUser', ['isLogin', 'isMiner']),
    ...mapGetters('accounts', ['accounts']),
    ...mapGetters('markets', ['currentMarket']),
    ...mapGetters('currencies', ['quoteCurrencies']),
    baseBalance() {
      const balance = this.accounts[this.baseUnit] && this.accounts[this.baseUnit].balance
      return BigNumber(balance || 0).toFixed(8)
    },
    quoteBalance() {
      const balance = this.accounts[this.quoteUnit] && this.accounts[this.quoteUnit].balance
      return BigNumber(balance || 0).toFixed(8)
    },
    fee() {
      return this.isMiner ? 0.001 : Number(this.currentTicker.fee)
    },
    buySubmiting() {
      return this.isBidSubmiting ? this.$t('m.exchange.submiting') : this.$t('m.exchange.buy')
    },
    askSubmiting() {
      return this.isAskSubmiting ? this.$t('m.exchange.submiting') : this.$t('m.exchange.sell')
    },
    canBidSubmit() {
      let p = this.limitBidPrice
      let c = this.limitBidCount
      let t = this.limitBidTotal
      return isNumber(p) && isNumber(c) && isNumber(t)
    },
    canAskSubmit() {
      let p = this.limitAskPrice
      let c = this.limitAskCount
      let t = this.limitAskTotal
      return isNumber(p) && isNumber(c) && isNumber(t)
    },
    buyMoney() {
      if (this.limitBidPrice.length > 0 && this.limitBidPrice !== '-') {
        return this.changeUsdt(this.quoteUnit, this.limitBidPrice, false, 4)
      }
    },
    sellMoney() {
      if (this.limitAskPrice.length > 0 && this.limitAskPrice !== '-') {
        return this.changeUsdt(this.quoteUnit, this.limitAskPrice, false, 4)
      }
    },
    msgOptions() {
      return {
        style: {
          position: 'absolute',
          width: '280px',
          bottom: 'inherit',
          top: '-40px',
        },
        targetElement: this.$refs.orderForm,
      }
    },
  },
  watch: {
    beforeFocus() {
      console.log('beforeFocus', this.beforeFocus)
    },
    orderSellPrice(val) {
      this.limitAskPrice = toFixed(val, this.currentTicker.bid_fixed)
      this.mostAskCountCompute(val)
    },
    orderBuyPrice(val) {
      this.limitBidPrice = toFixed(val, this.currentTicker.bid_fixed)
      this.mostBidCountCompute(val)
    },
  },
  methods: {
    ...mapMutations(['clearOrderPrice']),
    clearAsk() {
      this.limitAskCount = this.limitAskTotal = this.errAskCountMsg = ''
    },
    clearBid() {
      this.limitBidCount = this.limitBidTotal = this.errBidCountMsg = ''
    },
    mostBidCountCompute(value) {
      if (!this.isLogin) return false
      this.limitBidCount = this.limitBidTotal = this.errBidCountMsg = ''
      if (value > 0) {
        let quoteUnit = this.quoteUnit
        let balance = this.accounts[quoteUnit].balance
        let count = BigNumber(balance)
          .multipliedBy(1 - this.fee)
          .dividedBy(value)
          .toString()
        count = toFixed(count, this.currentTicker.ask_fixed)
        this.mostCount = count
        this.mostBidCountMsg = this.$t('m.exchange.bidMax', { count: count })
      } else {
        this.mostBidCountMsg = ''
      }
    },
    onLimitBidPriceKeyup(v) {
      this.limitBidPrice = v
      this.mostBidCountCompute(v)
      this.beforeFocus = 'bid-price'
      this.$nextTick(() => {
        this.clearOrderPrice(v)
        this.useLimitBidPriceCountComputeTotal()
      })
    },
    onLimitBidCountKeyup(v) {
      this.limitBidCount = v
      let err = BigNumber(v || 0).gt(this.mostCount)
      if (err && this.limitBidPrice) {
        this.errBidCountMsg = this.$t('m.exchange.balanceMsg')
      } else {
        this.errBidCountMsg = ''
      }
      this.beforeFocus = 'bid-count'
      this.$nextTick(() => {
        this.useLimitBidPriceCountComputeTotal()
      })
    },
    onLimitBidTotalKeyup(v) {
      this.limitBidTotal = v
      this.beforeFocus = 'bid-total'
      this.$nextTick(() => {
        this.useLimitBidTotalPriceComputeCount()
      })
    },
    mostAskCountCompute(value) {
      if (!this.isLogin) return false
      this.limitAskCount = this.limitAskTotal = this.errAskCountMsg = ''
      if (value > 0) {
        let baseUnit = this.baseUnit
        let balance = this.accounts[baseUnit].balance
        let count = toFixed(balance, this.currentTicker.ask_fixed)
        this.mostAskCountMsg = this.$t('m.exchange.askMax', { count: count })
      } else {
        this.mostAskCountMsg = ''
      }
    },
    onLimitAskPriceKeyup(v) {
      this.limitAskPrice = v
      this.mostAskCountCompute(v)
      this.beforeFocus = 'ask-price'
      this.$nextTick(() => {
        this.clearOrderPrice(v)
        this.useLimitAskPriceCountComputeTotal()
      })
    },
    onLimitAskCountKeyup(v) {
      this.limitAskCount = v
      let baseUnit = this.baseUnit
      let balance = 0
      if (this.isLogin) {
        balance = this.accounts[baseUnit].balance
      }
      let err = BigNumber(balance).gte(v || 0)
      if (!err) {
        this.errAskCountMsg = this.$t('m.exchange.balanceMsg')
      } else {
        this.errAskCountMsg = ''
      }
      this.beforeFocus = 'ask-count'
      this.$nextTick(() => {
        this.useLimitAskPriceCountComputeTotal()
      })
    },
    onLimitAskTotalKeyup(v) {
      this.limitAskTotal = v
      this.beforeFocus = 'ask-total'
      this.$nextTick(() => {
        this.useLimitAskTotalPriceComputeCount()
      })
    },
    onLimitBidPercent(n) {
      if (!this.isLogin || !this.limitBidPrice) return false
      let price = this.limitBidPrice
      let balance = this.accounts[this.quoteUnit].balance
      let buyPrice = BigNumber(balance)
        .multipliedBy(n)
        .toString()
      let buyCount = BigNumber(buyPrice)
        .multipliedBy(1 - this.fee)
        .dividedBy(BigNumber(price))
        .toFixed(this.currentTicker.ask_fixed, 1)
      let total = BigNumber(price)
        .multipliedBy(buyCount)
        .toString()
      this.limitBidPrice = toFixed(price, this.currentTicker.bid_fixed)
      this.limitBidCount = toFixed(buyCount, this.currentTicker.ask_fixed)
      this.limitBidTotal = toFixed(total, this.totalDecimal)
    },
    onLimitAskPercent(n) {
      if (!this.isLogin || !this.limitAskPrice) return false
      let price = this.limitAskPrice
      let balance = this.accounts[this.baseUnit].balance
      let sellCount = BigNumber(balance)
        .multipliedBy(n)
        .toString()
      let total = BigNumber(price)
        .multipliedBy(BigNumber(sellCount))
        .multipliedBy(1 - this.fee)
        .toString()
      this.limitAskPrice = toFixed(price, this.currentTicker.bid_fixed)
      this.limitAskCount = toFixed(sellCount, this.currentTicker.ask_fixed)
      this.limitAskTotal = toFixed(total, this.totalDecimal)
    },

    // 使用ask的总价和价格计算出个数
    useLimitAskTotalPriceComputeCount() {
      this.limitAskTotal = toFixed(this.limitAskTotal, this.totalDecimal)
      if (this.beforeFocus == 'ask-total' || this.beforeFocus == 'ask-price') {
        let total = this.limitAskTotal
        let price = this.limitAskPrice
        let fixed = this.currentTicker.ask_fixed
        if (total != 0 && price != 0) {
          let limitAskCount = BigNumber(total)
            .multipliedBy(1 + this.fee)
            .dividedBy(price)
            .toString()
          this.limitAskCount = toFixed(limitAskCount, fixed)
          this.limitAskTotal = toFixed(total, this.totalDecimal)
        }
      }
    },
    // 使用ask 的价格和数量计算总价
    useLimitAskPriceCountComputeTotal() {
      // 修正表单数据
      this.limitAskPrice = toFixed(this.limitAskPrice, this.currentTicker.bid_fixed)
      this.limitAskCount = toFixed(this.limitAskCount, this.currentTicker.ask_fixed)
      // 不能由修改总价 而计算总价
      if (this.beforeFocus == 'ask-price' || this.beforeFocus == 'ask-count') {
        let limitAskPrice = this.limitAskPrice
        let limitAskCount = this.limitAskCount
        if (limitAskCount != 0 && limitAskPrice != 0) {
          let total = BigNumber(limitAskCount).multipliedBy(limitAskPrice)
          total = BigNumber(total)
            .multipliedBy(1 - this.fee)
            .toFixed(this.totalDecimal, 1)
          this.limitAskTotal = total
        }
      }
    },

    // 使用bid的总价和价格计算出个数
    useLimitBidTotalPriceComputeCount() {
      this.limitBidTotal = toFixed(this.limitBidTotal, this.totalDecimal)
      if (this.beforeFocus == 'bid-total' || this.beforeFocus == 'bid-price') {
        let total = this.limitBidTotal
        let price = this.limitBidPrice
        let fixed = this.currentTicker.ask_fixed
        if (total != 0 && price != 0) {
          let limitBidCount = BigNumber(total)
            .multipliedBy(1 - this.fee)
            .dividedBy(price)
            .toString()
          this.limitBidCount = toFixed(limitBidCount, fixed)
          this.limitBidTotal = toFixed(total, this.totalDecimal)
        }
      }
    },
    // 使用bid 的价格和数量计算总价
    useLimitBidPriceCountComputeTotal() {
      // 修正表单数据
      this.limitBidPrice = toFixed(this.limitBidPrice, this.currentTicker.bid_fixed)
      this.limitBidCount = toFixed(this.limitBidCount, this.currentTicker.ask_fixed)
      // 不能由修改总价 而计算总价
      if (this.beforeFocus == 'bid-price' || this.beforeFocus == 'bid-count') {
        let limitBidPrice = this.limitBidPrice
        let limitBidCount = this.limitBidCount
        if (limitBidCount != 0 && limitBidPrice != 0) {
          let total = BigNumber(limitBidCount).multipliedBy(limitBidPrice)

          total = BigNumber(total)
            .multipliedBy(1 + this.fee)
            .toFixed(this.totalDecimal, 0)
          this.limitBidTotal = toFixed(total, this.totalDecimal)
        }
      }
    },
    addLimitBid() {
      // 添加本地市场限价交易 买入
      let lastPrice = this.currentTicker.last
      let total = this.limitBidTotal
      let quoteUnit = this.quoteUnit
      let balance = this.accounts[quoteUnit].balance
      let { minimum_order_amount } = this.quoteCurrencies
      let isEq = BigNumber(balance).gte(BigNumber(total))
      if (!isEq) {
        this.$notify.error({
          message: this.$t('m.exchange.balanceMsg'),
          ...this.msgOptions,
        })
        return false
      }
      let min = BigNumber(minimum_order_amount).gt(total)
      if (min) {
        this.$notify.error({
          message: `${this.$t('m.exchange.minTotal')} ${minimum_order_amount} ${quoteUnit.toUpperCase()}`,
          ...this.msgOptions,
        })
        return false
      }

      // 防止恶意挂单
      let dangerPrice = BigNumber(lastPrice * 0.25).gt(this.limitBidPrice)
      if (dangerPrice) {
        this.$notify.error({
          message: this.$t('m.exchange.orderLowPrice'),
          ...this.msgOptions,
        })
        return false
      }

      let opt = {
        ord_type: 'limit',
        market: this.currentMarketId,
        price: this.limitBidPrice,
        volume: this.limitBidCount,
      }
      this.addOrder(true, opt)
      this.limitBidPrice = this.limitBidTotal = this.limitBidCount = this.mostBidCountMsg = ''
    },
    addLimitAsk() {
      // 添加本地市场限价交易 卖出
      let lastPrice = this.currentTicker.last
      let count = this.limitAskCount
      let baseUnit = this.baseUnit
      let quoteUnit = this.quoteUnit
      let balance = this.accounts[baseUnit].balance
      let { minimum_order_amount } = this.quoteCurrencies
      let isEq = BigNumber(balance).gte(BigNumber(count))
      if (!isEq) {
        this.$notify.error({
          message: this.$t('m.exchange.balanceMsg'),
          ...this.msgOptions,
        })
        return false
      }
      let min = BigNumber(minimum_order_amount).gt(this.limitAskTotal)
      if (min) {
        this.$notify.error({
          message: `${this.$t('m.exchange.minTotal')} ${minimum_order_amount} ${quoteUnit.toUpperCase()}`,
          ...this.msgOptions,
        })
        return false
      }

      // 防止恶意挂单
      let dangerPrice = !BigNumber(lastPrice).isZero() && BigNumber(this.limitAskPrice).gt(lastPrice * 4)
      if (dangerPrice) {
        this.$notify.error({
          message: this.$t('m.exchange.orderHighPrice'),
          ...this.msgOptions,
        })
        return false
      }
      let opt = {
        ord_type: 'limit',
        market: this.currentMarketId,
        price: this.limitAskPrice,
        volume: this.limitAskCount,
      }
      this.addOrder(false, opt)
      this.limitAskPrice = this.limitAskTotal = this.limitAskCount = this.mostAskCountMsg = ''
    },
    addOrder: async function(isBid, params) {
      isBid ? (this.isBidSubmiting = true) : (this.isAskSubmiting = true)
      const url = isBid ? 'CREATEBIDORDER' : 'CREATEASKORDER'
      api.mutate(url, params).then(resp => {
        let result = null
        if (isBid) {
          result = resp && resp.data && resp.data.bid && resp.data.bid.id
        } else {
          result = resp && resp.data && resp.data.ask && resp.data.ask.id
        }
        if (result) {
          this.$notify.success({
            message: this.$t('m.successMessage.dealSuccess'),
            ...this.msgOptions,
          })
        } else {
          this.$notify.error({
            message: this.$t('m.exchange.failed'),
            ...this.msgOptions,
          })
        }
        isBid ? (this.isBidSubmiting = false) : (this.isAskSubmiting = false)
      })
    },
    orderConfirm(type) {
      let lastPrice = this.currentTicker.last
      let price = 0
      let count = 0
      let total = 0
      let { quote_unit } = this.currentTicker
      let { name } = this.currentMarket
      quote_unit = quote_unit.toUpperCase()
      if (type === 'buy') {
        price = this.limitBidPrice
        count = this.limitBidCount
        total = this.limitBidTotal
        this.orderType = 'buy'
        if (price > lastPrice * 1.1) {
          this.info = { name, quote_unit, price, count, total, lastPrice }
          this.type = 'high'
          this.visible = true
          return false
        }
      } else {
        price = this.limitAskPrice
        count = this.limitAskCount
        total = this.limitAskTotal
        this.orderType = 'sell'
        if (price < lastPrice * 0.9) {
          this.info = { name, quote_unit, price, count, total, lastPrice }
          this.type = 'low'
          this.visible = true
          return false
        }
      }
      if (type === 'buy') {
        this.addLimitBid()
      } else {
        this.addLimitAsk()
      }
    },
    confirm() {
      let orderType = this.orderType
      this.visible = false
      if (orderType === 'buy') {
        this.addLimitBid()
      } else {
        this.addLimitAsk()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.order-submit {
  padding: 16px 41px 27px;
  background-color: $color-assist4;
  height: 262px;
  display: flex;
  justify-content: space-between;
  .column {
    position: relative;
    .input-item {
      margin-bottom: 10px;
    }
    .input-price {
      margin-bottom: 20px;
    }
    .input-amout {
      margin-bottom: 5px;
    }
    .input-total {
      margin-bottom: 30px;
    }
    .balance {
      font-size: 12px;
      color: $color-font-text-gray;
      position: absolute;
      bottom: 36px;
    }
    .btc-money {
      font-size: 12px;
      transform: scale(0.83);
      color: #97a5b3;
      position: absolute;
      top: 57px;
    }
    > .label {
      font-size: 12px;
      color: $color-font-text-gray;
      padding-left: 8px;
      margin-bottom: 13px;
    }
    > .title {
      color: $color-assist1;
      font-size: 13px;
      margin-bottom: 10px;
      display: block;
      > span {
        //transform: scale(0.83);
        display: inline-block;
        font-weight: 500;
        //vertical-align: middle;
      }
    }

    .btn {
      border-radius: 3px;
      width: 100%;
      height: 28px;
      border: none;
      cursor: pointer;
      color: #ffffff;
      font-size: 13px;
      position: relative;
      outline: none;
      &:active:after {
        content: '';
        border-radius: 3px;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        background-color: rgba($color: #000000, $alpha: 0.1);
      }
      &:disabled {
        background-color: #f4f4f4;
        color: #cccccc;
      }
    }
    .buy {
      background-color: $color-assist5;

      span {
        margin-left: 5px;
      }
    }
    .sell {
      background-color: $color-assist6;

      span {
        margin-left: 5px;
      }
    }
    .not-login {
      border-radius: 2px;
      width: 100%;
      height: 29px;
      cursor: pointer;
      color: #cccccc;
      font-weight: 600;
      font-size: 13px;
      position: relative;
      border: 1px solid #bdc7d1;
      background-color: #ffffff;
      a {
        color: $color-text;
        margin: 0 2px;
      }
    }
  }
}
</style>
