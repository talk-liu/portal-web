<template>
  <div class="echarts" />
</template>
<script>
export default {
  props: {
    options: Object,
  },
  data() {
    return {
      chrat: null,
    }
  },
  mounted() {
    // auto init if `options` is already provided
    this.init()
  },
  methods: {
    init() {
      if (this.chart) {
        return
      }
      /* global echarts */
      let chart = echarts.init(this.$el, null, { animationLoopDelta: 1000 })

      chart.setOption(this.options)

      this.chart = chart
    },
  },
}
</script>
