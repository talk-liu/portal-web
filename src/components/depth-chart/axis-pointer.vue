<template>
  <g name="axispointer" v-if="axisPointer.show" :class="wrapClass">
    <circle :cx="axisPointer.x" :cy="axisPointer.y" r="8" class="loop"/>
    <circle :cx="axisPointer.x" :cy="axisPointer.y" r="4" class="circle"/>
    <line
      :x1="axisPointer.x" :y1="height" :x2="axisPointer.x" :y2="axisPointer.y+8"
      class="dashline" stroke-dasharray="2, 2"
    />
  </g>
</template>

<script>
export default {
  name: 'AxisPointer',
  props: {
    axisPointer: Object,
    height: Number
  },
  computed: {
    wrapClass: function() {
      const { tag } = this.axisPointer.xValue
      return {
        bids: tag === 'bids',
        asks: tag === 'asks',
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';

.bids {
  .circle {
    fill: $buy-color;
  }
  .loop {
    stroke: $buy-color;
    stroke-width: 1px;

    @include themify($themes) {
      fill: themed('wrapBgColor');
    }
  }
  .dashline {
    stroke: $buy-color;
  }
}

.asks {
  .circle {
    fill: $sell-color;
  }
  .loop {
    stroke: $sell-color;
    stroke-width: 1px;

    @include themify($themes) {
      fill: themed('wrapBgColor');
    }
  }
  .dashline {
    stroke: $sell-color;
  }
}
</style>
