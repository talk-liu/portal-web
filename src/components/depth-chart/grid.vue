<template>
  <g name="grid">
    <line :x1="x1" :y1="y1" :x2="x2" :y2="y1" name="top" class="border" v-if="dir.indexOf('top') !== -1"></line>
    <line :x1="x2" :y1="y1" :x2="x2" :y2="y2" name="right" class="border" v-if="dir.indexOf('right') !== -1"></line>
    <line :x1="x1" :y1="y2" :x2="x2" :y2="y2" name="bottom" class="border" v-if="dir.indexOf('bottom') !== -1"></line>
    <line :x1="x1" :y1="y2" :x2="x1" :y2="y1" name="left" class="border" v-if="dir.indexOf('left') !== -1"></line>
    <g :transform="`translate(${grid.left}, ${grid.top})`">
      <slot></slot>
    </g>
  </g>
</template>

<script>
export default {
  name: 'Grid',
  props: {
    grid: Object,
    dir: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    x1: function() {
      return this.grid.left
    },
    x2: function() {
      return this.grid.left + this.grid.width
    },
    y1: function() {
      return this.grid.top
    },
    y2: function() {
      return this.grid.top + this.grid.height
    },
  },
}
</script>

<style lang="scss" scoped>
.border {
  stroke: #394457;
  stroke-width: 1;
  fill: transparent;
}
</style>


