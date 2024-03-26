<template>
  <g :name="`label-${dir}`" :transform="`translate(${posX}, ${posY})`" ref="ylabel">
    <template v-for="(label, index) in labels" >
      <template v-if="dir === 'left'">
        <line
          x1="0" :y1="label.y" x2="4" :y2="label.y" :key="`line-${dir}-${index}`"
          :class="{line : index !== 0}"
        ></line>
        <text
          x="13" :y="label.y" :key="`text-${dir}-${index}`"
          alignment-baseline="middle"
          class="text"
        >{{label.val === 0 ? 0 : Number(label.val).toFixed(fixed)}}</text>
      </template>
      <template v-if="dir === 'right'">
        <line
          :x1="-4" :y1="label.y" :x2="0" :y2="label.y" :key="`line-${dir}-${index}`"
          :class="{line : index !== 0}"
        ></line>
        <text
          x="-13" :y="label.y" :key="`text-${dir}-${index}`"
          alignment-baseline="middle"
          text-anchor="end"
          class="text"
        >{{label.val === 0 ? 0 :Number(label.val).toFixed(fixed)}}</text>
      </template>
      <template v-if="dir === 'bottom'">
        <text
          :x="label.x" y="0" :key="`text-${dir}-${index}`"
          alignment-baseline="hanging"
          text-anchor="middle"
          class="text"
        >{{label.val === 0 ? 0 :Number(label.val).toFixed(fixed)}}</text>
      </template>
    </template>
  </g>
</template>

<script>
export default {
  name: 'ChartLabel',
  props: {
    grid: Object,
    labels: {
      type: Array,
      default: () => []
    },
    fixed: Number,
    dir: String
  },
  computed: {
    posX: function() {
      return this.dir === 'right' ? this.grid.width : 0
    },
    posY: function() {
      return this.dir === 'bottom' ? this.grid.height + 10 : 0
    }
  }
}
</script>

<style lang="scss" scoped>
.line {
  stroke-width: 1px;

  @include themify($themes) {
    stroke: themed('textColor7');
  }
}

.text {
  font-size: 12px;

  @include themify($themes) {
    fill: themed('textColor32');
  }
}
</style>


