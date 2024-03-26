<template>
  <div ref="orderForm">
    <tabs class="form-tabs" :idx.sync="tabIndex" :count="tabConfig.length">
      <tab-item class="tab-item" v-for="(v,i) in tabConfig" :key="i" :index="i">
        <span slot="label">{{v.label}}</span>
      </tab-item>
    </tabs>
    <limit v-if="tabIndex === 0" :error="errMsg"></limit>
    <market v-if="tabIndex === 1" :error="errMsg"></market>
    <stop v-if="tabIndex === 2"></stop>
    <percent v-if="orderType!=='stop'"/>
    <div class="submit" v-if="isLogin">
      <div class="total" v-if="tabIndex !== 1">
        <span>{{$t('m.exchange.total')}}（{{currentTicker.quote_unit | upperCase}}）{{total}}</span>
        <span class="legal">≈{{totalFormat}}</span>
      </div>
      <button
        :class="['order', type, !canSubmit ? 'disabled' : '']"
        @click="orderConfirm"
        :disabled="!canSubmit"
      >{{btnText | upperCase}} {{currentTicker.base_unit | upperCase}}
      </button>
    </div>
    <div class="logout" v-else>
      <router-link :to="$i18nRoute({ name: 'signin' })">{{$t('m.exchange.login')}}</router-link>
      or
      <router-link :to="$i18nRoute({ name: 'signup' })">{{$t('m.exchange.join')}}</router-link>
      {{$t('m.exchange.trading')}}
    </div>
    <order-confirm
      :confirmType="confirmType"
      :visible="visible"
      @confirm="confirm"
      @close="visible = false"
    />
    <stop-confirm :visible="stopVisible" @confirm="stopConfirm" @close="stopVisible = false"/>
    <v-dialog v-if="!isKYC&&clickBuy" @close="clickBuy = false" class="dialog">
    </v-dialog>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js'
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex'

import Tabs from '@/components/tabs/tabs'
import TabItem from '@/components/tabs/tab-item'

import orderVerify from './order-verify.js'
import totalMoeny from '@/mixins/total-money'

import Limit from './limit'
import Market from './market'
import Stop from './stop'
import Percent from './percent'
import OrderConfirm from './order-confirm'
import StopConfirm from './stop-confirm'
import VDialog from '@/components/kyc-dialog'

export default {
  mixins: [orderVerify, totalMoeny],
  components: {
    Tabs,
    TabItem,
    Limit,
    Market,
    Stop,
    Percent,
    OrderConfirm,
    StopConfirm,
    VDialog,
  },
  data() {
    return {
      tabConfig: [
        {
          label: this.$t('m.exchange.limit'),
          name: 'limit',
        },
        {
          label: this.$t('m.exchange.market'),
          name: 'market',
        },
        {
          label: this.$t('m.exchange.lossAndLimit'),
          name: 'stop',
        },
      ],
      tabIndex: 0,
      visible: false,
      confirmType: '',
      errMsg: '',
      stopVisible: false,
      clickBuy: false,
    }
  },
  computed: {
    ...mapGetters('tickers', ['currentTicker', 'quoteUnit', 'baseUnit', 'lastPrice']),
    ...mapGetters('orderForm', ['total', 'account', 'disableTrade', 'canSubmit']),
    ...mapGetters('currentUser', ['isLogin', 'isKYC']),
    ...mapGetters('currencies', ['quoteCurrencies']),
    ...mapGetters('orderBook', ['orderAsks', 'orderBids']),
    ...mapState('orderForm', ['price', 'volume', 'type', 'triggerPrice']),
    orderType() {
      return this.tabConfig[this.tabIndex].name
    },
    btnText() {
      return this.type === 'buy' ? this.$t('m.exchange.buy') : this.$t('m.exchange.sell')
    },
    totalFormat() {
      return this.changeUsdt(this.quoteUnit, this.total)
    },
    msgOptions() {
      return {
        style: {
          position: 'absolute',
          width: '280px',
          bottom: '50px',
          top: 'inherit',
        },
        targetElement: this.$refs.orderForm,
      }
    },
  },
  methods: {
    ...mapMutations('orderForm', ['resetOrderType', 'updatePrice', 'updateDirection', 'updateFocus']),
    ...mapActions('orderForm', ['submitOrder']),
    async addOrder() {
      // 委托结果返回
      const resp = await this.submitOrder()
      if (this.orderType === 'stop') {
        let result = resp && resp.data && resp.data.conditionCreate && resp.data.conditionCreate.result
        if (result === 'success') {
          this.$notify.success({
            message: this.$t('m.successMessage.dealSuccess'),
            ...this.msgOptions,
          })
        } else {
          let msg = this.$t('m.exchange.failed')
          if (resp.errors[0].message === 'out_of_max_num') {
            msg = this.$t('m.exchange.maxStopError')
          }
          this.$notify.error({
            message: msg,
            ...this.msgOptions,
          })
        }
        return false
      }

      let result = null
      if (this.type === 'buy') {
        result = resp && resp.data && resp.data.bid && resp.data.bid.id
      } else {
        result = resp && resp.data && resp.data.ask && resp.data.ask.id
      }
      // 限价提交后重置价格为最新价
      if (this.orderType === 'market') {
        this.updatePrice(this.lastPrice)
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
    },
    orderConfirm() {
      if (!this.isKYC) {
        this.clickBuy = true
        return false
      }
      if (!this.price || !this.volume) return false
      // 判断最小交易额
      const { minimum_order_amount } = this.quoteCurrencies
      if (BigNumber(minimum_order_amount).gt(this.total)) {
        this.$notify.error({
          message: `${this.$t('m.exchange.minTotal')} ${minimum_order_amount} ${this.quoteUnit.toUpperCase()}`,
          ...this.msgOptions,
        })
        return false
      }
      // 限价恶意挂单
      if (this.orderType === 'limit') {
        if (this.dangerOrder(this.lastPrice, this.price)) return false
      }
      // 止盈止损恶意挂单
      if (this.orderType === 'stop') {
        if (this.dangerOrder(this.triggerPrice, this.price)) return false
      }

      // 止盈止损不判断持仓情况
      if (this.orderType !== 'stop') {
        if (!this.checkBalance()) {
          this.$notify.error({
            message: this.$t('m.exchange.balanceMsg'),
            ...this.msgOptions,
          })
          return false
        }
      }
      // 防呆机制
      if (this.orderType === 'stop') {
        if (this.sillyOrder(this.price, this.triggerPrice)) return false
      } else {
        if (this.sillyOrder(this.price, this.lastPrice)) return false
      }
      // 止盈止损二次确认
      if (this.orderType === 'stop') {
        this.stopVisible = true
        return false
      }
      this.addOrder()
    },
    // 防呆机制确认
    confirm() {
      this.visible = false
      // 止盈止损二次确认
      if (this.orderType === 'stop') {
        this.stopVisible = true
        return false
      }
      this.addOrder()
    },
    // 止盈止损二次确认
    stopConfirm() {
      this.stopVisible = false
      // 触发方向
      let direction = ''
      if (BigNumber(this.lastPrice).gt(this.triggerPrice)) {
        direction = 'below'
      } else {
        direction = 'above'
      }
      this.updateDirection(direction)
      this.addOrder()
    },
    // 判断资产是否充足
    checkBalance() {
      const { quoteBalance, baseBalance } = this.account
      if (this.type === 'buy') {
        if (BigNumber(this.total).gt(quoteBalance)) {
          return false
        }
      } else {
        if (BigNumber(this.volume).gt(baseBalance)) {
          return false
        }
      }
      return true
    },
    // 恶意挂单检测
    dangerOrder(a, b) {
      // 恶意挂单限制
      if (this.type === 'buy') {
        if (BigNumber(BigNumber(a).times(0.25)).gt(b)) {
          let msg = ''
          if (this.orderType === 'stop') {
            msg = this.$t('m.exchange.stopOrderLowPrice')
          } else {
            msg = this.$t('m.exchange.orderLowPrice')
          }
          this.$notify.error({
            message: msg,
            ...this.msgOptions,
          })
          return true
        }
      } else {
        if (!BigNumber(a).isZero() && BigNumber(b).gt(BigNumber(a).times(4))) {
          let msg = ''
          if (this.orderType === 'stop') {
            msg = this.$t('m.exchange.stopOrderHighPrice')
          } else {
            msg = this.$t('m.exchange.orderHighPrice')
          }
          this.$notify.error({
            message: msg,
            ...this.msgOptions,
          })
          return true
        }
      }
      return false
    },
    // 防呆机制
    sillyOrder(a, b) {
      if (this.type === 'buy') {
        if (BigNumber(a).gte(BigNumber(b).times(1.1))) {
          this.confirmType = 'higt'
          this.visible = true
          return true
        }
      } else {
        if (BigNumber(BigNumber(b).times(0.9)).gte(a)) {
          this.confirmType = 'low'
          this.visible = true
          return true
        }
      }
      return false
    },
  },
  watch: {
    tabIndex(val) {
      this.$emit('tabIndex', this.tabIndex)
      // 切换tab重置数据层
      this.resetOrderType(this.orderType)
      // 点击输入位置改变
      if (this.orderType === 'stop') {
        this.updateFocus('trigger')
      } else {
        this.updateFocus('price')
      }
      // 止盈止损不做以下操作
      if (this.orderType === 'stop') return false
      // 市价时使用盘口价计算最大数量和百分比计算
      let price = ''
      if (val === 1) {
        price = this.lastPrice
      } else {
        if (this.type === 'buy') {
          price = this.orderAsks.priceOne
        } else {
          price = this.orderBids.priceOne
        }
      }
      this.updatePrice(price)
    },
    total() {
      if (this.checkBalance()) {
        this.errMsg = ''
      } else {
        this.errMsg = this.$t('m.exchange.balanceMsg')
      }
    },
  },
  mounted() {
    this.resetOrderType(this.orderType)
  },
}
</script>

<style lang="scss" scoped>
  .form-tabs {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    padding: 0;
    font-weight: 500;
    font-family: euBold;

  @include themify($themes) {
    border-color: themed('lineBorderColorF5');
  }
  .th5-tab-item {
    font-size: 14px;
    margin-right: 25px;

  @include themify($themes) {
    color: themed('textColor7');
  }
  &
  :last-child {
    margin-right: 0;
  }

  }
  .current {

  @include themify($themes) {
    color: themed('textColor3');
  }
  &
  :after {
    bottom: -1px;

  @include themify($themes) {
    color: themed('textColor3');
  }
  }
  }
  }

  .logout {
    font-size: 14px;
    text-align: center;

  @include themify($themes) {
    color: themed('textColor3');
  }
  a {
    color: #4c84ff;
  }

  }

  .submit {
    padding-top: 20px;
    border-top-width: 1px;
    border-top-style: solid;

  @include themify($themes) {
    border-color: themed('lineBorderColorF5');
  }
  .total {
    font-size: 13px;
    font-weight: 500;
    font-family: euBold;

  @include themify($themes) {
    color: themed('textColor3');
  }
  .legal {
    float: right;
  }

  }
  .order {
    border: none;
    outline: none;
    border-radius: 3px;
    height: 40px;
    line-height: 40px;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #ffffff;
    margin-top: 16px;
    cursor: pointer;
    font-weight: 500;
    font-family: euBold;
  }

  .order.buy {

  @include themify($themes) {
    background-color: themed('buyColor');
  }
  &
  :disabled {

  @include themify($themes) {
    background-color: themed('disableBuyBgColor');
    color: themed('disableBuyColor');
  }
  }
  }
  .order.sell {

  @include themify($themes) {
    background-color: themed('sellColor');
  }
  &
  :disabled {

  @include themify($themes) {
    background-color: themed('disableSellBgColor');
    color: themed('disableSellColor');
  }
  }
  }
  }
</style>

