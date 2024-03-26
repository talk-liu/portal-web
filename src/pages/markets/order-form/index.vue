<template>
  <div class="order-form-wrap">
    <div class="title">
      {{$t('m.exchange.orderForm')}}
      <span class="fee">{{$t('m.exchange.fee2')}}: {{`${fee*100}%`}}</span>
    </div>
    <tabs class="order-form-tabs" :idx.sync="tabIndex" :count="tabConfig.length">
      <tab-item class="tab-item" v-for="(v,i) in tabConfig" :key="i" :index="i">
        <span slot="label">{{v.label}}</span>
      </tab-item>
    </tabs>
    <order-form></order-form>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import BigNumber from 'bignumber.js'

import Tabs from '@/components/tabs/tabs'
import TabItem from '@/components/tabs/tab-item'

import OrderForm from './order-form'

export default {
  components: {
    Tabs,
    TabItem,
    OrderForm,
  },
  data() {
    return {
      tabConfig: [
        {
          label: this.$t('m.exchange.buy'),
          name: 'buy',
        },
        {
          label: this.$t('m.exchange.sell'),
          name: 'sell',
        },
      ],
      tabIndex: 0,
      init: true,
    }
  },
  methods: {
    ...mapMutations('orderForm', ['resetType', 'updatePrice', 'updateFocus']),
  },
  computed: {
    ...mapState('orderForm', ['orderType']),
    ...mapGetters('orderForm', ['fee']),
    ...mapGetters('tickers', ['lastPrice']),
    ...mapGetters('markets', ['currentMarket']),
    ...mapGetters('orderBook', ['orderAsks', 'orderBids']),
    type() {
      return this.tabConfig[this.tabIndex].name
    },
  },
  watch: {
    $route() {
      this.init = true
    },
    tabIndex() {
      this.$emit('tabIndex', this.tabIndex)
      // 切换买卖类型
      this.resetType(this.type)
      // 点击输入位置改变
      if (this.orderType === 'stop') {
        this.updateFocus('trigger')
      } else {
        this.updateFocus('price')
      }
      // 止盈止损不做以下操作
      if (this.orderType === 'stop') return false
      // 切换设置价格默认值
      if (this.orderType === 'market') {
        this.updatePrice(this.lastPrice)
      } else {
        if (this.type === 'buy') {
          this.updatePrice(this.orderAsks.priceOne || '')
        } else {
          this.updatePrice(this.orderBids.priceOne || '')
        }
      }
    },
    orderAsks: {
      handler(val, oldVal) {
        // 止盈止损不做以下操作
        if (this.orderType === 'stop') return false
        if (!val.priceOne) return false
        if (BigNumber(val.priceOne).eq(oldVal.priceOne)) return false
        if (!this.init) return false
        this.updatePrice(val.priceOne.toString())
        this.init = false
      },
      deep: true,
    },
  },
  mounted() {
    this.resetType(this.type)
  },
}
</script>

<style lang="scss" scoped>
.order-form-wrap {
  display: flex;
  flex: 1;
  min-height: 380px;
  flex-direction: column;
  padding: 0 20px;
  .title {
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    font-weight: 500;
    font-family: euBold;

    @include themify($themes) {
      color: themed('textColor3');
    }
    .fee {
      float: right;
      font-size: 12px;
      font-weight: 400;
      font-family: dinMedium euRegular;

      @include themify($themes) {
        color: themed('textColor3');
      }
    }
  }
  .order-form-tabs {
    height: 30px;
    line-height: 30px;
    display: flex;
    padding: 0;
    .current {
      &:after {
        content: none;
      }
    }
    .tab-item {
      flex: 1;
      margin: 0;
      text-align: center;
      font-size: 14px;
      border-width: 1px;
      border-style: solid;
      font-weight: 500;
      font-family: euBold;

      @include themify($themes) {
        color: themed('textColor3');
        border-color: themed('lineBorderColorF5');
      }
      &:nth-child(1) {
        border-radius: 3px 0 0 3px;
      }
      &:nth-child(2) {
        border-radius: 0 3px 3px 0;
      }
      &:first-child.current {
        @include themify($themes) {
          color: themed('buyColor');
          border-color: themed('buyColor');
        }
      }
      &:last-child.current {
        @include themify($themes) {
          color: themed('sellColor');
          border-color: themed('sellColor');
        }
      }
    }
  }
}

.theme-dark {
  .order-form-wrap {
    .title .fee {
      color: rgba(255, 255, 255, 0.45);
    }
    .order-form-tabs .tab-item {
      color: rgba(255, 255, 255, 0.7);
      border-color: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
