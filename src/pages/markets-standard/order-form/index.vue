<template>
  <div class="center-bottom">
    <div class="tab-title">
      <tabs class="tab" :idx.sync="tabIndex">
        <tab-item v-for="(value,key) in tabConfig" :key="key" :index="key">
          <span slot="label">{{value.label}}</span>
        </tab-item>
      </tabs>
      <a :href="$t('m.footerMenu.feeHref')" target="_blank" class="fee">
        {{$t('m.exchange.fee2')}}: {{`${fee*100}%`}}
        <i class="iconfont icon-wenhao"></i>
      </a>
      <div class="tip">{{$t('m.exchange.feeTip2',{fee:`${fee*100}%`})}}</div>
    </div>
    <order-form class="order-form" v-if="tabIndex == 0"></order-form>
    <order-form-market class="order-form-market" v-if="tabIndex == 1"></order-form-market>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import BigNumber from 'bignumber.js'

import orderForm from './order-form'
import orderFormMarket from './order-form-market'

import tabs from '@/components/tabs/tabs'
import tabItem from '@/components/tabs/tab-item'

export default {
  components: {
    orderForm,
    orderFormMarket,
    tabs,
    tabItem,
  },
  data() {
    return {
      tabIndex: 0,
      tabConfig: [
        { label: this.$t('m.exchange.limit'), name: 'now-price' },
        { label: this.$t('m.exchange.market'), name: 'market-price' },
      ],
      init: true,
    }
  },
  computed: {
    ...mapGetters('orderForm', ['fee']),
    ...mapGetters('orderBook', ['orderIndex']),
  },
  watch: {
    $route() {
      this.init = true
      this.clearOrderPrice()
    },
    orderIndex(val, oldVal) {
      if (this.init) {
        let { asks, bids } = val
        let askPrice = asks.priceOne || ''
        let bidPrice = bids.priceOne || ''
        if (!askPrice && !bidPrice) return false
        if (BigNumber(val.asks.priceOne).eq(oldVal.asks.priceOne)) return false
        if (BigNumber(val.bids.priceOne).eq(oldVal.bids.priceOne)) return false
        if (!this.init) return false
        this.setOrderBuyPrice(askPrice)
        this.setOrderSellPrice(bidPrice)
        this.init = false
      }
    },
  },
  methods: {
    ...mapMutations('standardPrice', ['setOrderSellPrice', 'setOrderBuyPrice', 'clearOrderPrice']),
  },
}
</script>

<style scoped lang="scss">
$gap: 1rem;

.center-bottom {
  border: 1px solid $color-line;
  // margin-top: 16px;
  // height: 300px;
  border-radius: 4px;
  background-color: #ffffff;
  // overflow: hidden;
  .tab-title {
    height: 40px;
    padding-left: 41px;
    position: relative;
    .fee {
      position: absolute;
      top: 10px;
      right: 40px;
      font-size: 13px;
      color: #97a5b3;
      i {
        font-size: 13px;
      }
      &:hover + .tip {
        display: block;
      }
    }
    .tip {
      display: none;
      position: absolute;
      top: -30px;
      right: 0;
      z-index: 100;
      border-radius: 4px;
      padding: 10px 13px;
      font-size: 12px;
      color: $color-assist1;
      box-shadow: rgba(0, 0, 0, 0.08) 0 4px 7px 0;
      background: #fffdf4;
      border: 1px solid #ffd200;
      &:before {
        content: '';
        width: 8px;
        height: 8px;
        border-bottom: 1px solid #ffd200;
        border-left: 1px solid #ffd200;
        transform: rotate(-45deg);
        top: 29px;
        right: 75px;
        margin-left: 50%;
        position: absolute;
        background: #fffdf4;
        z-index: 101;
      }
    }
    // .tab {
    //   width: 80px;
    // }
  }
}
</style>
