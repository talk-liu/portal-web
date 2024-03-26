<template>
  <g name="myorderlist">
    <circle
      v-for="order in myorders" :key="order.id"
      v-if="xG(order.oriPrice)"
      :cx="xG(order.oriPrice)" :cy="grid.height" r="3"
      :class="[order.isHover ? 'hover' : '', order.kind === 'ask' ? 'ask' : '', 'circle']"
    ></circle>
  </g>
</template>

<script>
export default {
  name: 'ChartLabel',
  props: {
    grid: Object,
    myorders: {
      type: Array,
      default: () => []
    },
    xG: Function
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';

.circle {
  stroke: $buy-color;
  stroke-width: 1px;
  fill: none;
  &.hover {
    fill: $buy-color;
  }
  &.ask {
    stroke: $sell-color;

    &.hover {
      fill: $sell-color;
    }
  }
}
</style>


