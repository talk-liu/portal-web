<template>
  <div class="order-book-table">
    <div class="agr-wrap" v-if="type==='h5'">
      <div class="mobile-agr">
        <span>{{$t('m.exchange.aggregation')}}</span>
        <span>
          <v-drop-down class="agr-drop-down">
            <span slot="content">
              {{depthFixed[index]}}
              <i class="iconfont icon-xiala1"></i>
            </span>
            <template slot="list">
              <li v-for="(v,i) in depthFixed" :key="i" @click="mobileChangeFixed(v)">{{v}}</li>
            </template>
          </v-drop-down>
        </span>
      </div>
    </div>
    <div class="thead">
      <ul class="th">
        <li>{{$t('m.exchange.amount')}}</li>
        <li>{{$t('m.exchange.price')}}</li>
        <li>{{$t('m.exchange.my')}}</li>
      </ul>
    </div>
    <div class="body scrollStyle" ref="orderBody">
      <div :class="['tbody-asks-wrap',type==='h5'?'mobile-tbody':'']" :style="transformStyle">
        <div class="tbody-asks">
          <item v-for="item in orderAsks.orders" :key="item.id" :item="item" type="ask"/>
        </div>
      </div>
      <div class="spread">
        <span>{{quoteUnit | upperCase}} {{$t('m.exchange.spread')}}</span>
        <span>{{type !== 'h5' ? spread:null}}</span>
        <span>{{type === 'h5' ? spread:null}}</span>
      </div>
      <div :class="['tbody-bids-wrap',type==='h5'?'mobile-tbody':'']">
        <div class="tbody-bids">
          <item v-for="item in orderBids.orders" :key="item.id" :item="item" type="bid"/>
        </div>
      </div>
    </div>
    <div class="agr" v-if="type!=='h5'">
      <span>{{$t('m.exchange.aggregation')}}</span>
      <span>{{depthFixed[index]}}</span>
      <span>
        <i class="iconfont icon-suoxiao" @click="changeFixed()"></i>
        <i class="iconfont icon-fangda" @click="changeFixed('add')"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import BigNumber from 'bignumber.js'

import VDropDown from '@/components/dropdown'
import Item from './item-list'

export default {
  components: {
    Item,
    VDropDown,
  },
  data() {
    return {
      index: 0,
      depthFixed: [],
      init: true,
    }
  },
  computed: {
    ...mapGetters('orderBook', ['orderAsks', 'orderBids', 'orderMarketId']),
    ...mapGetters('tickers', ['quoteUnit']),
    ...mapGetters('markets', ['currentMarket']),
    ...mapGetters('viewport', ['type']),
    ...mapState('viewport', ['headerHeight']),
    ...mapState('tickers', ['currentMarketId']),
    spread() {
      const asks = this.orderAsks.priceOne
      const bids = this.orderBids.priceOne
      if (BigNumber(asks).isZero()) return 0
      return BigNumber(asks)
        .minus(bids)
        .toString(10)
    },
    transformStyle() {
      const orderLen = this.orderAsks.orders.length
      const height = this.type === 'h5' ? 330 - orderLen * 22 : 1100 - orderLen * 22
      return { transform: `translateY(${height}px)` }
    },
  },
  methods: {
    ...mapMutations('orderBook', ['depthMerge']),
    formatDepthFixed(depthMerge) {
      let depthFixedArr = [
        '1',
        '0.1',
        '0.01',
        '0.001',
        '0.0001',
        '0.00001',
        '0.000001',
        '0.0000001',
        '0.00000001',
        '0.000000001',
        '0.0000000001',
      ]
      let fixedArrary = []
      for (let i = depthMerge.min; i <= depthMerge.max; i++) {
        fixedArrary.push(depthFixedArr[i])
      }
      this.depthFixed = fixedArrary
      this.index = fixedArrary.length - 1
    },
    changeFixed(type) {
      if (type === 'add') {
        if (this.index >= this.depthFixed.length - 1) {
          this.depthMerge(-1)
          return false
        }
        this.index += 1
      } else {
        if (this.index < 1) return false
        this.index -= 1
      }
      let fixed = this.depthFixed[this.index].length - 2
      if (fixed < 0) {
        fixed = 0
      }
      this.depthMerge(fixed)
    },
    orderCenter() {
      const box = this.$refs.orderBody
      let top = (box.scrollHeight - box.clientHeight) / 2
      box.scrollTop = top
    },
    // 移动端深度合并操作
    mobileChangeFixed(val) {
      let fixed = val.length - 2
      if (fixed < 0) {
        fixed = 0
      }
      const index = this.depthFixed.indexOf(val)
      this.index = index
      this.depthMerge(fixed)
    },
  },
  watch: {
    currentMarket: {
      handler(val) {
        if (!val || !val.depth_merge) return false
        const depthFixed = val.depth_merge
        this.formatDepthFixed(depthFixed)
        this.init = true
      },
      deep: true,
    },
    orderMarketId(val) {
      if (this.currentMarketId !== val) return false
      if (this.init) {
        // 切换交易对orderbook居中
        this.orderCenter()
        this.init = false
      }
    },
    headerHeight() {
      this.orderCenter()
    },
  },
  mounted() {
    this.formatDepthFixed({ max: 4, min: 2 })
    this.orderCenter()
  },
}
</script>

<style lang="scss">
.agr-drop-down.v-drop-down {
  .drop-list {
    min-width: 90px;
    right: 25px;
    padding: 15px;
    box-shadow: rgba($color: #c1c1c1, $alpha: 0.5) 0 0 6px;
    position: relative;
    overflow-x: visible;

    @include themify($themes) {
      background-color: themed('wrapBgColor');
      color: themed('textColor3');
    }
    li {
      margin: 0;
      text-align: left;
      font-family: 'dinMedium';
      border-bottom: 1px solid;
      line-height: 30px;

      @include themify($themes) {
        color: themed('textColor3');
        border-color: themed('lineBorderColorF5');
      }
      &:last-child {
        border: none;
      }
    }
    &:after {
      position: absolute;
      right: 10px;
      top: -5px;
      height: 10px;
      width: 10px;
      display: block;
      content: '';
      background-color: #ffffff;
      border-top: 1px solid;
      border-right: 1px solid;
      transform: rotate(-45deg);

      @include themify($themes) {
        border-color: themed('lineBorderColorF5');
        background-color: themed('wrapBgColor');
      }
    }
  }
}

.theme-dark {
  .agr-drop-down.v-drop-down {
    .drop-list {
      box-shadow: none;
      background-color: #2a2a2a;
      li {
        border-color: rgba($color: #ffffff, $alpha: 0.2);
      }
      &:after {
        background-color: #2a2a2a;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.order-book-table {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; // firefox hack
  .body {
    flex: 1;
    overflow-y: scroll;
    z-index: $zindex-newspace;
  }
  .tr,
  .th {
    display: flex;
    position: relative;

    @include themify($themes) {
      color: themed('textColor3');
    }
    .zero {
      @include themify($themes) {
        color: themed('zeroColor');
      }
    }
    li {
      flex: 1;
      text-align: right;
    }
  }
  .thead {
    height: 30px;
    padding: 0 20px;
    .th {
      font-size: 13px;
      line-height: 30px;
      border-bottom-width: 1px;
      border-bottom-style: solid;

      @include themify($themes) {
        border-color: themed('lineBorderColorF5');
      }
      li {
        @include themify($themes) {
          color: themed('textColor7');
        }
      }
    }
  }
  .spread {
    position: sticky;
    top: 0;
    bottom: 0;
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    display: flex;
    padding: 0 20px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-top-width: 1px;
    border-top-style: solid;
    z-index: $zindex-sticky;

    @include themify($themes) {
      background-color: themed('wrapBgColor');
      border-color: themed('lineBorderColorF5');
      color: themed('textColor7');
    }
    span {
      flex: 1;
      text-align: right;
    }
  }
  .tbody-asks-wrap,
  .tbody-bids-wrap {
    height: 1100px;
    overflow: hidden;
  }
  .mobile-tbody {
    &.tbody-asks-wrap,
    &.tbody-bids-wrap {
      height: 330px;
      overflow: hidden;
    }
  }
  // .tbody-asks-wrap {
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: flex-end;
  // }
  .agr {
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    display: flex;
    padding: 0 20px;
    border-top-width: 1px;
    border-top-style: solid;

    @include themify($themes) {
      border-color: themed('lineBorderColorF5');
      color: themed('textColor7');
    }
    span {
      flex: 1;
      text-align: right;
    }
    .iconfont {
      cursor: pointer;
    }
  }
  .mobile-agr {
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    padding: 0 20px;
    border-top-width: 1px;
    border-top-style: solid;
    display: flex;

    @include themify($themes) {
      border-color: themed('lineBorderColorF5');
      color: themed('textColor7');
    }
    span {
      margin-right: 12px;

      @include themify($themes) {
        color: themed('textColor3');
      }
    }
    .iconfont {
      font-size: 12px;
    }
  }
}
</style>

