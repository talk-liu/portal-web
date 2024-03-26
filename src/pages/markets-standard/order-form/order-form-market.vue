<template>
  <div class="order-submit"
       ref="orderForm">
    <div class="column">
      <label class="title fb">
        {{$t('m.exchange.buy')}}
        <span class="semi-bold">{{baseUnit | upperCase}}</span>
      </label>
      <input-label input-type="text"
                   :disabled="true"
                   :value="$t('m.exchange.market')"
                   class="input-item"
                   :after-label="currentTicker.quote_unit | upperCase"
                   :before-label="$t('m.exchange.price')"></input-label>
      <input-label v-model="marketBidCount"
                   class="input-item input-total"
                   :after-label="baseUnit | upperCase"
                   :before-label="mostBidCountMsg || $t('m.exchange.amount')"
                   @keyup="onBidCountKeyup"
                   :err-msg="errBidCountMsg"
                   @focus="clearAsk"></input-label>
      <percent-selector @input="onLimitBidPercent"></percent-selector>
      <div class="label semi-bold"
           v-if="isLogin">{{currentTicker.quote_unit | upperCase}} {{$t('m.exchange.balance')}}：{{quoteBalance}}</div>
      <button class="btn buy fm"
              v-if="isLogin"
              @click="addMarketBid">
        <btn-loading v-if="isBidSubmiting"></btn-loading>
        <span>{{buySubmiting}}</span>
      </button>
      <button class="not-login fm"
              v-else>
        <router-link :to="$i18nRoute({ name: 'signin' })">{{$t('m.exchange.login')}}</router-link>or
        <router-link :to="$i18nRoute({ name: 'signup' })">{{$t('m.exchange.join')}}</router-link>
        {{$t('m.exchange.trading')}}
      </button>
    </div>
    <div class="column">
      <label class="title fb">
        {{$t('m.exchange.sell')}}
        <span class="semi-bold">{{baseUnit | upperCase}}</span>
      </label>
      <input-label input-type="text"
                   :disabled="true"
                   :value="$t('m.exchange.market')"
                   class="input-item"
                   :after-label="currentTicker.quote_unit | upperCase"
                   :before-label="$t('m.exchange.price')"></input-label>
      <input-label v-model="marketAskCount"
                   class="input-item input-total"
                   :after-label="baseUnit | upperCase"
                   :before-label="mostAskCountMsg || $t('m.exchange.amount')"
                   @keyup="onAskCountKeyup"
                   :err-msg="errAskCountMsg"
                   @focus="clearBid"></input-label>
      <percent-selector @input="onLimitAskPercent"></percent-selector>
      <div class="label semi-bold"
           v-if="isLogin">{{baseUnit | upperCase}} {{$t('m.exchange.balance')}}：{{baseBalance}}</div>
      <button class="btn sell fm"
              v-if="isLogin"
              @click="addMarketAsk">
        <btn-loading v-if="isAskSubmiting"></btn-loading>
        <span>{{askSubmiting}}</span>
      </button>
      <button class="not-login fm"
              v-else>
        <router-link :to="$i18nRoute({ name: 'signin' })">{{$t('m.exchange.login')}}</router-link> or
        <router-link :to="$i18nRoute({ name: 'signup' })">{{$t('m.exchange.join')}}</router-link>
        {{$t('m.exchange.trading')}}
      </button>
    </div>
  </div>
</template>
<script>
import BigNumber from 'bignumber.js'
import { mapGetters, mapState } from 'vuex'

import api from '@/graphql'
import BtnLoading from '@/components/btn-loading'

import PercentSelector from './percent-selector'
import InputLabel from './input-label'

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
export default {
  components: {
    InputLabel,
    PercentSelector,
    BtnLoading,
  },
  data() {
    return {
      mostCount: 0,
      marketBidCount: '',
      mostBidCountMsg: '',
      marketAskCount: '',
      mostAskCountMsg: '',
      errBidCountMsg: '',
      errAskCountMsg: '',
      bidPercent: '0',
      askPercent: '0',
      isBidSubmiting: false,
      isAskSubmiting: false,
    }
  },
  computed: {
    ...mapState('tickers', ['currentMarketId']),
    ...mapGetters('tickers', ['currentTicker', 'baseUnit', 'quoteUnit']),
    ...mapGetters('accounts', ['accounts']),
    ...mapGetters('currentUser', ['isLogin', 'isMiner']),
    baseBalance() {
      const balance = this.accounts[this.baseUnit] && this.accounts[this.baseUnit].balance
      return BigNumber(balance || 0).toFixed(8)
    },
    quoteBalance() {
      const balance = this.accounts[this.quoteUnit] && this.accounts[this.quoteUnit].balance
      return BigNumber(balance || 0).toFixed(8)
    },
    buySubmiting() {
      return this.isBidSubmiting ? this.$t('m.exchange.submiting') : this.$t('m.exchange.buy')
    },
    askSubmiting() {
      return this.isAskSubmiting ? this.$t('m.exchange.submiting') : this.$t('m.exchange.sell')
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
    fee() {
      return this.isMiner ? 0.001 : Number(this.currentTicker.fee)
    },
  },
  watch: {
    currentTicker: 'formatMostCount',
  },
  mounted() {
    this.$nextTick(() => {
      this.formatMostCount()
    })
  },
  methods: {
    formatMostCount() {
      if (this.isLogin) {
        let last = this.currentTicker.last
        let quoteUnit = this.currentTicker.quote_unit
        let baseUnit = this.baseUnit
        let bidBalance = this.accounts[quoteUnit].balance
        let askBalance = this.accounts[baseUnit].balance
        if (!BigNumber(last).isZero()) {
          let bidCount = BigNumber(bidBalance)
            .multipliedBy(1 - this.fee)
            .dividedBy(last)
            .toString()
          this.mostCount = bidCount
          bidCount = toFixed(bidCount, this.currentTicker.ask_fixed)
          this.mostBidCountMsg = this.$t('m.exchange.bidMax', { count: bidCount })
          this.mostAskCountMsg = this.$t('m.exchange.askMax', {
            count: askBalance,
          })
        }
      }
    },
    clearAsk() {
      this.marketAskCount = this.errAskCountMsg = ''
    },
    clearBid() {
      this.marketBidCount = this.errBidCountMsg = ''
    },
    onBidCountKeyup(v) {
      let count = toFixed(v, this.currentTicker.ask_fixed)
      this.marketBidCount = count
      let err = BigNumber(count || 0).gte(this.mostCount)
      if (err) {
        this.errBidCountMsg = this.$t('m.exchange.balanceMsg')
      } else {
        this.errBidCountMsg = ''
      }
    },
    onAskCountKeyup(v) {
      let count = toFixed(v, this.currentTicker.ask_fixed)
      this.marketAskCount = count
      let baseUnit = this.baseUnit
      let balance = this.accounts[baseUnit].balance
      let err = BigNumber(balance).gte(count || 0)
      if (!err) {
        this.errAskCountMsg = this.$t('m.exchange.balanceMsg')
      } else {
        this.errAskCountMsg = ''
      }
    },
    onLimitBidPercent(n) {
      if (!this.isLogin) return false
      let last = this.currentTicker.last
      let balance = this.accounts[this.currentTicker.quote_unit].balance
      let buyPrice = BigNumber(balance)
        .multipliedBy(n)
        .toString()
      let buyCount = BigNumber(buyPrice)
        .dividedBy(BigNumber(last))
        .toString()
      this.bidPercent = n
      this.marketBidCount = toFixed(buyCount, this.currentTicker.ask_fixed)
    },
    onLimitAskPercent(n) {
      if (!this.isLogin) return false
      let balance = this.accounts[this.baseUnit].balance
      let sellCount = BigNumber(balance)
        .multipliedBy(n)
        .toString()
      this.askPercent = n
      this.marketAskCount = toFixed(sellCount, this.currentTicker.ask_fixed)
    },
    addMarketBid() {
      // 添加本地市场限价交易 买入
      let opt = {
        ord_type: 'market',
        market: this.currentMarketId,
        volume: this.marketBidCount,
        percent: this.bidPercent
      }
      let isEq = BigNumber(this.marketBidCount).gte(BigNumber(this.mostCount))
      if (isEq) {
        this.$notify.error(this.$t('m.exchange.balanceMsg'))
        return
      }
      this.addOrder(true, opt)
      this.clearBid()
    },
    addMarketAsk() {
      // 添加本地市场限价交易 卖出
      let opt = {
        ord_type: 'market',
        market: this.currentMarketId,
        volume: this.marketAskCount,
        percent: this.askPercent
      }
      let baseUnit = this.baseUnit
      let balance = this.accounts[baseUnit].balance
      let isEq = BigNumber(balance).gte(BigNumber(this.marketAskCount))
      if (!isEq) {
        this.$notify.error(this.$t('m.exchange.balanceMsg'))
        return
      }
      this.addOrder(false, opt)
      this.clearAsk()
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
    .input-item {
      margin-bottom: 10px;
    }
    .input-total {
      margin-bottom: 5px;
    }
    > .label {
      font-size: 12px;
      color: $color-assist3;
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
    }
    .sell {
      background-color: $color-assist6;
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
      }
    }
  }
}
</style>
