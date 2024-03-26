<template>
  <g name="tooltip" v-if="axisPointer.show" :class="wrapClass">
    <rect :width="width" :height="height" :x="rectX" :y="y1" class="rect" rx="2" ry="2"></rect>
    <text-top :x="textMarginLeft" :y="y1 + 8" class="big th-num-bold">{{Number(axisPointer.xValue.price).toFixed(xFixed)}}</text-top>
    <g :class="dir">
      <text-top :x="textMarginLeft" :y="y1 + 8 + 14 + 6" class="normal label">{{$t('m.marketChart.totalVolume')}}</text-top>
      <text-top :x="rectX + 56" :y="y1 + 8 + 14 + 6" class="normal">
        {{Number(axisPointer.xValue.volume).toFixed(yFixed)}}
      </text-top>
    </g>
    <g>
      <text-top :x="textMarginLeft" :y="y1 + 8 + 26 + 12" class="normal label">{{$t('m.marketChart.totalCost')}}</text-top>
      <text-top :x="rectX + 56" :y="y1 + 8 + 26 + 12" class="normal">
        {{totalPrice}}
      </text-top>
    </g>
  </g>
</template>

<script>
import { BigNumber } from 'bignumber.js'
import TextTop from './text-top.vue'
export default {
  name: 'ToolTip',
  props: {
    axisPointer: Object,
    chartHeight: Number,
    xData: Array,
    maxYData: Number,
    xFixed: Number,
    yFixed: Number
  },
  data() {
    return {
      width: 128,
      height: 68,
      distance: 10 // axisPointer和tooltip的垂直间距
    }
  },
  computed: {
    wrapClass: function() {
      const { tag } = this.axisPointer.xValue
      return {
        bids: tag === 'bids',
        asks: tag === 'asks',
      }
    },
    lineX: function() {
      return this.axisPointer.x
    },
    dir: function() {
      const totalIndex = this.xData.length - 1
      const part = this.axisPointer.xIndex / totalIndex
      if (part <= 1 / 4 || part > 1 / 2 && part <= 3 / 4) { // 1/4以内，以及大于1/2小于3/4以内 tooltip向右
        return 'right'
      } else { // 否则, 向左
        return 'left'
      }
    },
    rectX: function() {
      return this.dir === 'right' ? this.lineX + 2 : this.lineX - this.width - 2
    },
    y1: function() { // 直线上端点
      const { xValue, y } = this.axisPointer
      if (xValue.volume >= this.maxYData / 2) { // 大于1/2的总量，tooltip展示在图表下半部
        return y + this.distance
      } else { // 小于1/2的总量，tooltip展示在图表上半部
        return this.y2 - this.height
      }
    },
    y2: function() { // 直线下端点
      const { xValue, y } = this.axisPointer
      if (xValue.volume >= this.maxYData / 2) {
        return this.y1 + this.height
      } else {
        return y - this.distance
      }
    },
    totalPrice: function() {
      const { price, volume } = this.axisPointer.xValue
      return BigNumber(price).times(volume).toFixed(this.xFixed)
    },
    textMarginLeft: function() {
      return this.rectX + 12
    },
    tipText: function() {
      const { tag } = this.axisPointer.xValue
      return tag === 'bids' ? 'Sell' : 'Buy'
    }
  },
  components: {
    TextTop
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';

.bids {
  .line {
    stroke-width: 2px;

    @include themify($themes) {
      stroke: themed('buyToolTipColor');
    }
  }
  .label {
    @include themify($themes) {
      fill: themed('sellToolTipColor');
    }
  }
  .rect {
    stroke-width: 1px;

    @include themify($themes) {
      stroke: themed('sellBorderColor');
      fill: themed('toolTipBgColor');
    }
  }
}

.asks {
  .line {
    stroke-width: 2px;

    @include themify($themes) {
      stroke: themed('sellToolTipColor');
    }
  }
  .label {
    @include themify($themes) {
      fill: themed('buyToolTipColor');
    }
  }
  .rect {
    stroke-width: 1px;

    @include themify($themes) {
      stroke: themed('buyBorderColor');
      fill: themed('toolTipBgColor');
    }
  }
}

.big {
  font-size: 14px;

  @include themify($themes) {
    fill: themed('textColor3');
  }
}

.normal {
  font-size: 12px;

  @include themify($themes) {
    fill: themed('textColor6');
  }
}

.theme-dark {
  .bids {
    .rect {
      stroke-width: 0;
    }
  }
  .asks {
    .rect {
      stroke-width: 0;
    }
  }
}

</style>
