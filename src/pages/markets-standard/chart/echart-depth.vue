<template>
  <div ref='ct'>
    <chart
      id="depth-chart"
      ref="depthChart"
      :options="depthOption"
      :class="chartClass"
    ></chart>
  </div>
</template>
<script>
// 深度图
import { mapGetters } from 'vuex'
import { addListener, removeListener } from 'resize-detector'
import debounce from 'lodash/debounce'
import chart from './echart'

const gridSplitColor = 'rgb(241,241,241)' // 图表网格分割线颜色
const axisLabelTickTextColor = 'rgb(153,153,153)'
const blueColor = '#369ee0'

export default {
  name: 'depth-chart',
  props: ['isFullScreen'],
  components: {
    chart,
  },
  data() {
    return {
      width: 560,
      height: 348,
      isBindResize: false,
      debounceFn: null,
      depthOption: {
        animation: false,
        xAxis: {
          type: 'category',
          animation: false,
          boundaryGap: false,
          // boundaryGap: [0, '10%'],
          data: [],
          axisLine: { lineStyle: { color: gridSplitColor } },
          axisLabel: {
            color: axisLabelTickTextColor,
          },
          axisPointer: {
            label: {
              backgroundColor: 'white',
              borderColor: blueColor,
              color: blueColor,
              shadowColor: blueColor,
            },
            lineStyle: {
              color: blueColor,
              type: 'solid',
            },
          },
        },
        yAxis: {
          type: 'value',
          animation: false,
          axisLabel: {
            color: axisLabelTickTextColor,
            inside: true,
          },
          // boundaryGap: ['10%'],
          axisTick: { inside: true },
          axisLine: { lineStyle: { color: gridSplitColor } },
          // splitLine: { lineStyle: { color: ['#97A5B3'] } },
          splitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: [gridSplitColor],
            },
          },
          axisPointer: {
            animation: false,
            label: {
              backgroundColor: 'white',
              borderColor: blueColor,
              color: blueColor,
              shadowColor: blueColor,
            },
            lineStyle: {
              color: blueColor,
              type: 'solid',
            },
          },
        },
        grid: {
          top: 10,
          bottom: '10%',
          left: 35,
          right: 35,
        },
        tooltip: {
          animation: false,
          trigger: 'none',
          axisPointer: {
            type: 'cross',
          },
          // formatter: function(params) {
          //   return (
          //     '委托价：' +
          //     params[0].axisValueLabel +
          //     '<br/>累计：' +
          //     params[0].data
          //   )
          // }
        },
        series: [
          {
            data: [],
            type: 'line',
            animation: false,
            lineStyle: {
              normal: {
                width: 1,
                color: '#72c89380',
              },
            },
            areaStyle: {
              normal: {
                color: '#72c89380',
              },
            },
            // symbol: 'none'
            showSymbol: false,
          },
          {
            data: [],
            type: 'line',
            animation: false,
            lineStyle: {
              normal: {
                width: 1,
                color: '#f6767480',
              },
            },
            areaStyle: {
              normal: {
                color: '#f6767480',
              },
            },
            // symbol: 'none'
            showSymbol: false,
          },
        ],
      },
    }
  },
  computed: {
    ...mapGetters('depthChart', ['bidsData', 'asksData', 'priceData', 'chartData']),
    bids() {
      return this.bidsData.map(v => {
        return v.volume
      })
    },
    asks() {
      const arr = []
      this.bids.forEach(() => {
        arr.push(null)
      })
      return arr.concat(this.asksData.map(v => {
        return v.volume
      }))
    },
    resizeChart() {
      return this.debounceFn ? this.debounceFn : (this.debounceFn = debounce(this.debounceResize, 999))
    },
    chartClass() {
      return this.isFullScreen ? 'full-screen-chart' : 'limitSize'
    },
  },
  watch: {
    chartData: 'updateData',
    isFullScreen() {
      let is = this.isFullScreen
      if (is) {
        this.$nextTick(() => {
          this.resizeChart()
          this.bindResize()
        })
      } else {
        this.debounceResize({
          width: this.width,
          height: this.height,
        })
        this.unbindReisze()
      }
    },
  },
  destroy() {
    this.unbindReisze()
  },
  methods: {
    unbindReisze() {
      if (this.isBindResize) {
        let el = this.$refs.ct
        removeListener(el, this.resizeChart)
        this.isBindResize = false
      }
    },
    bindResize() {
      if (this.isBindResize == false) {
        let el = this.$refs.ct
        addListener(el, this.resizeChart)
        this.isBindResize = true
      }
    },
    debounceResize(opt) {
      let height, width
      let el = this.$refs.ct
      if (opt && opt.height && opt.width) {
        // 还原正常大小
        height = opt.height
        width = opt.width
      } else {
        // 监听最大化改变
        height = el.offsetHeight
        width = el.offsetWidth
      }
      this.$refs.depthChart.chart.resize({ height, width })
    },
    updateData() {
      let opt = {
        animation: false,
        xAxis: {
          data: this.priceData,
          animation: false,
        },
        series: [
          {
            data: this.bids,
            animation: false,
          },
          {
            data: this.asks,
            animation: false,
          },
        ],
      }
      this.updateChart(opt)
    },
    updateChart(opt) {
      this.$nextTick(() => {
        this.$refs.depthChart.chart.setOption(opt)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.ct {
  height: 100%;
  width: 100%;
}

.limitSize {
  width: 560px;
  height: 348px;
}

.includeRateSize {
  height: 280px;
  width: 564px;
}

#depth-chart {
  &.full-screen-chart {
    height: 100vh;
  }
}
</style>
