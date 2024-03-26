<template>
  <div class="mobile-chart-wrap">
    <div :class="['chart', curTab === 'depth' ? 'depth' : '']">
      <div class="chart-tab" v-if="currentTicker.last !== '0'">
        <span
          @touchstart="changeTab('tvchart')"
          @click="changeTab('tvchart')"
          :class="['tab', curTab === 'tvchart' ? 'active' : '']"
        >{{$t('m.marketChart.ktitle')}}</span>
        <span
          @touchstart="changeTab('depth')"
          @click="changeTab('depth')"
          :class="['tab', curTab === 'depth' ? 'active' : '']"
        >{{$t('m.marketChart.dtitle')}}</span>
      </div>
      <tv-chart
        class="k-wrap"
        v-if="currentTicker.last !== '0'"
        v-show="curTab === 'tvchart'"
        :theme="theme"
      />
      <div class="depth-tooltip" v-if="curTab === 'depth'">
        <span
          class="price"
        >{{axisPointer.show ? Number(axisPointer.xValue.price).toFixed(bidFixed) : '--'}}</span>
        <span class="label">{{$t('m.marketChart.totalVolume')}}</span>
        <span
          class="val"
        >{{axisPointer.show ? Number(axisPointer.xValue.volume).toFixed(askFixed) : '--'}}</span>
        <span class="label">{{$t('m.marketChart.totalCost')}}</span>
        <span class="val">{{axisPointer.show ? totalPrice : '--'}}</span>
      </div>
      <depth-chart class="depthchart full" v-show="curTab === 'depth'" :theme="theme"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { BigNumber } from 'bignumber.js'
import DepthChart from '@/components/depth-chart'
import TvChart from '@/components/tv-chart'
export default {
  data() {
    return {
      curTab: 'tvchart',
    }
  },
  computed: {
    ...mapGetters('tickers', ['currentTicker']),
    ...mapGetters('depthChart', ['axisPointer']),
    ...mapGetters('markets', ['currentMarket']),
    ...mapState('viewport', ['height', 'theme']),
    totalPrice: function() {
      const { price, volume } = this.axisPointer.xValue
      return BigNumber(price)
        .times(volume)
        .toFixed(this.bidFixed)
    },
    bidFixed: function() {
      // 买入价保留位数(可作为pric轴保留位数)
      return this.currentMarket.bid_fixed || 0
    },
    askFixed: function() {
      // 卖出价保留位数（可作为volume轴保留位数）
      return this.currentMarket.count_fixed || 0
    },
  },
  methods: {
    changeTab(tab) {
      this.curTab = tab
    },
  },
  components: {
    DepthChart,
    TvChart,
  },
}
</script>

<style lang='scss' scoped>
.mobile-chart-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
  .price-info {
    color: $color-3;
    margin: 16px 20px 10px;
    font-size: 12px;
    .price {
      font-size: 20px;
    }
    .price-center {
      margin-top: 7px;
      margin-bottom: 4px;
    }
    .flex {
      div {
        width: 33.3%;
        &:nth-of-type(3) {
          text-align: right;
        }
        .label {
          color: $color-7;
          margin-right: 10px;
        }
      }
    }
  }
  .pick-item {
    height: 33px;
    border-top: 1px solid;
    border-bottom: 1px solid;

    @include themify($themes) {
      border-color: themed('lineBorderColorF5');
    }
  }
  .chart {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    .chart-tab {
      display: flex;
      justify-content: center;
      height: 33px;
      line-height: 33px;
      font-size: 14px;
      border: 1px solid;

      @include themify($themes) {
        color: themed('textColor7');
        border-color: themed('lineBorderColorF5');
      }
      .tab {
        position: relative;
        height: 30px;
        display: inline-block;
        &:first-child {
          margin-right: 60px;
        }
        &.active {
          @include themify($themes) {
            color: themed('tabColor');
          }
          &:after {
            position: absolute;
            content: ' ';
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            height: 1px;
            border-bottom: 2px solid;
            border-radius: 1px;

            @include themify($themes) {
              border-color: themed('tabActiveColor');
            }
          }
        }
      }
    }
  }
  .depthchart {
    flex: 1;
  }
  .depth-tooltip {
    height: 57px;
    line-height: 24px;
    font-size: 13px;
    padding: 6px 15px 0;

    @include themify($themes) {
      background-color: themed('wrapBgColor');
      color: themed('textColor3');
    }
    .price {
      margin-right: 20px;
      font-weight: 400;
      font-family: 'dinBold';
    }
    .label {
      font-size: 11px;
      margin-right: 4px;

      @include themify($themes) {
        color: themed('sellColor');
      }
    }
    .val {
      font-size: 12px;
      margin-right: 14px;
    }
  }
}
</style>
