<template>
  <div ref="depthchart" class="container">
    <svg class="container" @mouseenter="handleMouseEnter" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
      <g transform="translate(0, 0)">
        <defs-clip-path id="priceview" :grid="grid"></defs-clip-path>
        <defs>
          <path id="bidsLinePath" :d="bidsLine"></path>
          <path id="bidsAreaPath" :d="bidsArea"></path>
          <path id="asksLinePath" :d="asksLine"></path>
          <path id="asksAreaPath" :d="asksArea"></path>
        </defs>
        <grid :grid="grid" v-show="grid.width">
          <g
            clip-path="url(#priceview)"
            stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
          >
            <use :stroke="curThemeCfg['buyColor']" xlink:href="#bidsLinePath"></use>
            <use :fill="curThemeCfg['buyArea']" fill-opacity="0.2" fill-rule="evenodd" xlink:href="#bidsAreaPath"></use>

            <use :stroke="curThemeCfg['sellColor']" xlink:href="#asksLinePath"></use>
            <use :fill="curThemeCfg['sellArea']" fill-opacity="0.2" fill-rule="evenodd" xlink:href="#asksAreaPath"></use>
          </g>
          <chart-label
            dir="left" :grid="grid" :labels="ylabel" :fixed="askFixed"
          ></chart-label>
          <chart-label
            dir="right" :grid="grid" :labels="ylabel" :fixed="askFixed"
          ></chart-label>
          <chart-label
            dir="bottom" :grid="grid" :labels="xlabel" :fixed="bidFixed"
          ></chart-label>
          <myorder-list :myorders="currentOrders" :xG="xG" :grid="grid"></myorder-list>
          <g>
            <axis-pointer :axisPointer="axisPointer" :height="grid.height"></axis-pointer>
            <tool-tip
              :axisPointer="axisPointer" :chartHeight="grid.height" :xData="priceData" :maxYData="maxVolume"
              :xFixed="bidFixed" :yFixed="askFixed"
            ></tool-tip>
          </g>
        </grid>
      </g>
    </svg>
    <div class="min" v-show="grid.width">
      <div class="mintip">{{$t('m.marketChart.marketPrice')}}</div>
      <div class="wrap">
        <i
          :class="['icon', 'zoomOut', 'iconfont', 'icon-suoxiao', theme, disableZoomOut ? 'disabled' : '']"
          @click="handleZoom('zoomOut')"
        ></i>
        <span class="lastPrice">{{currentTicker.last}}</span>
        <i
          :class="['icon', 'zoomIn', 'iconfont', 'icon-fangda', theme, disableZoomIn ? 'disabled' : '']"
          @click="handleZoom('zoomIn')"
        ></i>
      </div>
      <div class="mintip">≈ {{lastLegal(currentTicker)}}</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import ResizeObserver from 'resize-observer-polyfill'
import totalMoeny from '@/mixins/total-money'
import Grid from './grid.vue'
import DefsClipPath from './defs-clip-path.vue'
import AxisPointer from './axis-pointer.vue'
import ToolTip from './tool-tip.vue'
import ChartLabel from './chart-label.vue'
import MyorderList from './myorder-list.vue'
import themeCfg from './theme'

export default {
  mixins: [totalMoeny],
  props: ['theme'],
  computed: {
    ...mapGetters('depthChart', [
      'grid',
      'bidsLine',
      'asksLine',
      'bidsArea',
      'asksArea',
      'axisPointer',
      'priceData',
      'maxVolume',
      'ylabel',
      'xlabel',
      'xG',
      'bidsData',
      'disableZoomOut',
      'disableZoomIn',
      'defaultMaxScaleX'
    ]),
    ...mapGetters('tickers', ['currentTicker', 'changeCurrency', 'baseUnit']),
    ...mapGetters('openOrders', ['currentOrders']),
    curThemeCfg: function() {
      return themeCfg[this.theme]
    },
    midX: function() {
      return this.grid.width / 2
    },
    bidFixed: function() {
      // 买入价保留位数(可作为pric轴保留位数)
      return this.currentTicker.bid_fixed || 0
    },
    askFixed: function() {
      // 卖出价保留位数（可作为volume轴保留位数）
      return this.currentTicker.ask_fixed || 0
    }
  },
  methods: {
    ...mapMutations('depthChart', ['resizeDepthChart', 'handleMouseEnter', 'handleMouseLeave']),
    ...mapMutations('depthChart', {
      handleMouseMoveToVuex: 'handleMouseMove'
    }),
    ...mapActions('depthChart', {
      handleZoomToVuex: 'handleZoom',
    }),
    handleMouseMove: function(e) {
      this.handleMouseMoveToVuex({
        x: e.clientX,
        y: e.clientY,
      })
    },
    handleZoom: function(dir) {
      if (dir === 'zoomIn' && this.disableZoomIn) return
      if (dir === 'zoomOut' && this.disableZoomOut) return
      this.handleZoomToVuex(dir)
    },
  },
  components: {
    Grid,
    DefsClipPath,
    AxisPointer,
    ToolTip,
    ChartLabel,
    MyorderList,
  },
  mounted: function() {
    this.ro = new ResizeObserver(() => {
      const rect = this.$refs.depthchart.getBoundingClientRect()
      this.resizeDepthChart(rect)
    })
    this.ro.observe(this.$refs.depthchart)
  },
  beforeDestroy: function() {
    this.ro.unobserve(this.$refs.depthchart)
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';

.container {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
}

.midline {
  fill: none;
  stroke: #d8d8d8;
  stroke-width: 1px;
}

.min {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 153px;
  line-height: 20px;
  text-align: center;
  .wrap {
    display: flex;
  }
  .icon {
    font-size: 18px;
    cursor: pointer;
  }
  .lastPrice {
    font-size: 20px;
    flex: 1;
    font-family: 'dinMedium';

    @include themify($themes) {
      color: themed('textColor3');
    }
  }
  .mintip {
    font-size: 12px;

    @include themify($themes) {
      color: themed('textColor9');
    }
  }
  .dark {
    color: #787878;
  }
  .disabled {
    @include themify($themes) {
      color: themed('disabledZoomColor');
    }
  }
}
</style>

