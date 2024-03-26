<template>
  <div class='chart-ct'
       ref='ct'
       v-click-outside='outsideclick'>
    <div class='loading'
         v-show='requesting || responseError'>
      <span v-if='!responseError'>{{lang.loadingText}}</span>
      <span v-if='responseError'
            class='load-err-retry'
            @click='loadData'>
        {{lang.loadingErr.failed}}
        <div class='err-reason'>{{responseErrorMsg}}</div>
      </span>
    </div>
    <chart id="k-echart"
           ref="kChart"
           :options='opt'
           :class="chartClass"></chart>
  </div>
</template>

<script>
// k线图
import { addListener, removeListener } from 'resize-detector'
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import chart from './echart'
import vClickOutside from 'v-click-outside'
import dayjs from 'dayjs'
const gridSplitColor = 'rgb(241,241,241)' // 图表网格分割线颜色
const gridLineColor = gridSplitColor //
const blueColor = '#369ee0'
const greenBarColor = '#14b143' // 绿色柱子颜色
const redBarColor = '#ef232a' // 红色柱子颜色
const axisLabelTickTextColor = 'rgb(153,153,153)'
const ma99LineColor = redBarColor
const ma7LineColor = 'rgb(254,184,17)'
const ma25LineColor = 'rgb(88,0,195)'
const closeLineColor = 'rgb(32,102,197)'
let ma25Style = `color:${ma25LineColor}`
let ma7Style = `color:${ma7LineColor}`
let ma99Style = `color:${ma99LineColor}`
let extendOpt = ['xAxis', 'series', 'dataZoom', 'grid']
let valueDimHigh = 'highest'
let arrowUp = '↑'
let arrowDown = '↓'
let fontFamily = 'regular,PingFang SC,Microsoft YaHei'

import MA from '@/utils/MA'
const ma25Cache = new MA(25, [], 1)
const ma99Cache = new MA(99, [], 1)
const ma7Cache = new MA(7, [], 1)
function calculateMA(fixed, datas) {
  let ma25, ma99, ma7
  ma99Cache.data = ma7Cache.data = ma25Cache.data = datas
  ma25Cache.fixed = ma7Cache.fixed = ma99Cache.fixed = fixed
  ma25 = ma25Cache.compute()
  ma7 = ma7Cache.compute()
  ma99 = ma99Cache.compute()
  return { ma99, ma25, ma7 }
}

export default {
  props: ['period', 'isShowCloseLine', 'isFullScreen'],
  name: 'k-echart',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    chart,
  },
  data() {
    let self = this
    let initOpt = {
      backgroundColor: '#fff',
      animation: false,
      animationDuration: 0,
      textStyle: {
        fontFamily: fontFamily,
      },
      title: {
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        animation: false,
        axisPointer: {
          type: 'cross',
        },
        position: [10, 0],
        backgroundColor: 'rgba(0,0,0,0)',
        textStyle: {
          fontSize: 8,
          color: '#777',
        },
        formatter: this.tooltipFormatter,
      },
      axisPointer: {
        animation: false,
        link: { xAxisIndex: 'all' },
        label: {
          backgroundColor: '#777',
          fontFamily: fontFamily,
        },
      },

      grid: [
        {
          top: 25,
          left: '20',
          right: '55',
          height: '64%',
        },
        {
          left: '20',
          right: '55',
          top: '75%',
          height: '16%',
        },
      ],
      xAxis: [
        {
          type: 'category',
          data: [],
          scale: true,
          boundaryGap: true,
          animation: false,
          axisLine: { onZero: false, lineStyle: { color: gridLineColor } },
          splitLine: { show: false },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax',
          axisLabel: {
            show: false,
          },
          axisPointer: {
            label: {
              show: false,
            },
            lineStyle: {
              color: blueColor,
              type: 'solid',
            },
          },
        },
        {
          type: 'category', // 底部volume x轴
          gridIndex: 1,
          data: [],
          animation: false,
          boundaryGap: true,
          axisLabel: {
            color: axisLabelTickTextColor,
            formatter: value => {
              let isWeekOrDay = this.isWeekOrDay
              let result = ''
              if (!value) {
                return result
              }
              if (isWeekOrDay) {
                // 将 2018-02-30 01:02 如果是天和周返回02-30
                let ymd = value.split(' ')[0]
                let ymdArr = ymd.split('-')
                result = ymdArr[1] + '/' + ymdArr[2]
              } else {
                // 如果是分钟和小时 将 2018-02-30 01:02 分割成为 01:02 只需要返回 01:02
                result = value.split(' ')[1]
              }
              return result
            },
          },
          axisLine: { lineStyle: { color: gridLineColor } },
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
      ],
      yAxis: [
        // 蜡烛图y轴
        {
          // min: 'dataMin',
          // max: 'dataMax',
          scale: true,
          silent: true,
          boundaryGap: ['0', '5%'],
          animation: false,
          splitArea: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: [gridSplitColor],
            },
          },
          axisLabel: {
            color: axisLabelTickTextColor,
            formatter: this.formatterYxisLabel,
          },
          position: 'right',
          axisPointer: {
            label: {
              formatter: p => {
                let r = ''
                if (p && p.value) {
                  r = p.value.toFixed(this.bidFixed)
                }
                return r
              },
              backgroundColor: 'white', // y轴hover label style
              borderColor: blueColor,
              color: blueColor,
              shadowColor: blueColor,
            },
            lineStyle: {
              color: blueColor, // 横向线颜色
              type: 'solid',
            },
          },

          axisLine: { lineStyle: { color: gridLineColor }, color: 'green' }, // y刻度线样式定义
        },
        {
          gridIndex: 1,
          splitNumber: 3,
          animation: false,
          axisTick: { show: false },
          splitLine: { show: false },
          position: 'right',
          axisLabel: {
            show: false,
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
          axisLine: { lineStyle: { color: gridLineColor } },
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          animation: false,
          minValueSpan: 10,
          maxValueSpan: 150,
        },
        {
          xAxisIndex: [0, 1],
          type: 'inside',
          animation: false,
          minValueSpan: 10,
          maxValueSpan: 150,
        },
      ],
      legend: {
        show: false,
        animation: false,
        data: ['candlestick', 'MA5', 'MA25', 'MA99', 'close'],
        selected: {
          candlestick: true,
          MA5: true,
          MA25: true,
          MA99: true,
          close: false,
        },
      },
      series: [
        {
          name: 'candlestick',
          type: 'candlestick',
          animation: false,
          // barWidth: '75%',
          data: [],
          hoverAnimation: false,
          legendHoverLink: false,
          emphasis: {
            itemStyle: {
              borderWidth: 1, // hover高亮样式默认是2
            },
          },
          itemStyle: {
            normal: {
              color: greenBarColor,
              color0: redBarColor,
              borderColor: null, // 'rgba(0,0,0,0)',
              borderColor0: null, // 'rgba(0,0,0,0)',
              // borderWidth:0,
            },
          },
          markPoint: {
            silent: true,
            animation: false,
            label: {
              normal: {
                formatter: function(param) {
                  let r = param != null ? param.data.value : ''
                  let isHight = param.data.valueDim == valueDimHigh
                  let bidFixed = self.currentTicker.bid_fixed
                  r = r.toFixed(bidFixed)
                  return isHight ? r + '\n' + arrowDown : arrowUp + '\n' + r
                },
                color: '#000',
                backgroundColor: 'rgba(0,0,0,0)',
                fontSize: 10,
                width: 100,
                height: 30,
              },
            },
            itemStyle: {
              color: 'rgba(0,0,0,0)',
            },
            data: [
              {
                name: 'highest value',
                type: 'max',
                valueDim: 'highest',
                symbolOffset: ['0', '14'],
              },
              {
                name: 'lowest value',
                type: 'min',
                valueDim: 'lowest',
                symbolRotate: 180,
                symbolOffset: ['0', '-6'],
              },
            ],
          },
        },
        {
          name: 'MA99',
          type: 'line',
          data: [],
          animation: false,
          // sampling:'average',
          smooth: 0.1,
          showSymbol: false,
          hoverAnimation: false,
          symbolSize: 0,
          lineStyle: {
            normal: { opacity: 0.5, width: 1, color: ma99LineColor },
          },
        },
        {
          name: 'MA25',
          type: 'line',
          animation: false,
          // sampling:'average',
          data: [],
          smooth: 0.1,
          showSymbol: false,
          hoverAnimation: false,
          symbolSize: 0,
          lineStyle: {
            normal: { opacity: 0.5, width: 1, color: ma25LineColor },
          },
        },
        {
          name: 'MA7',
          type: 'line',
          animation: false,
          data: [],
          // sampling:'average',
          smooth: 0.1,
          showSymbol: false,
          hoverAnimation: false,
          symbolSize: 0,
          lineStyle: {
            normal: { opacity: 0.5, width: 1, color: ma7LineColor },
          },
        },
        {
          name: 'close',
          type: 'line',
          // sampling:'average',
          animation: false,
          data: [],
          smooth: true,
          showSymbol: false,
          hoverAnimation: false,
          symbolSize: 0,
          lineStyle: {
            normal: { opacity: 0.5, width: 1, color: closeLineColor },
          },
        },
        {
          name: 'Volumn',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          animation: false,
          data: [],
          itemStyle: {
            normal: {
              color: params => {
                // 涨：绿色 跌：红色
                const [open, close] = this.kData.datas[params.dataIndex] // [ open, close, low, high, vol]
                if (open == close) {
                  // 如果这个节点的开收盘价格是一样的话 需要与上一个节点进行比较来判断是否涨跌
                  const before = this.kData.datas[params.dataIndex - 1]
                  if (before) {
                    const beforeClose = before[1]
                    if (beforeClose > close) {
                      return redBarColor
                    }
                  }
                }
                return open <= close ? greenBarColor : redBarColor
              },
            },
          },
        },
      ],
    }
    let nextOpt = {}
    for (let p in initOpt) {
      if (extendOpt.indexOf(p) != -1) {
        nextOpt[p] = cloneDeep(initOpt[p])
      }
    }

    return {
      isUserInteractive: false,
      userInteractiveTimer: null,
      isBindResize: false,
      height: 348,
      width: 564,
      opt: initOpt,
      nextOpt: nextOpt,
      watchShallow: true,
      rangeBeforeEnd: null,
      rangeBeforeStart: null,
      oldTotal: 0,
      debounceFn: null,
      needInitShowTimeline: this.isShowCloseLine,
      kData: {},
    }
  },

  computed: {
    chartClass() {
      return this.isFullScreen ? 'full-screen-chart' : 'limitSize'
    },
    ...mapGetters('markets', ['currentMarket']),
    ...mapGetters('tickers', ['currentTicker', 'currentMarketId']),
    ...mapState('trades', ['isSetTradesDone']),
    ...mapState('kStandard', [
      'cachedTrades',
      'last_ts',
      'next_ts',
      'lastBar',
      'responseError',
      'responseErrorMsg',
      'requesting',
      'originData',
      'kCommands',
      'kCurrentCommand',
    ]),
    ...mapGetters('kStandard', ['kCurrentEmptyPointCount']),
    isWeek() {
      return this.period == '10080'
    },
    isDay() {
      return this.period == '1440'
    },
    isWeekOrDay() {
      return this.isDay || this.isWeek
    },
    resizeChart() {
      return this.debounceFn ? this.debounceFn : (this.debounceFn = debounce(this.debounceResize, 999))
    },
    bidFixed() {
      return this.currentTicker.bid_fixed
    },
    maxFixed() {
      return this.currentTicker.bid_fixed > this.currentTicker.ask_fixed
        ? this.currentTicker.bid_fixed
        : this.currentTicker.ask_fixed
    },
    rightMargin() {
      // 使用最新一条数据 计算y轴label宽度
      let lastIndex = this.kData.timestamp.length - 1
      if (lastIndex >= 0) {
        let fixed = this.bidFixed
        let item = this.kData.datas[lastIndex][1]
        let n = parseFloat(item).toFixed(fixed) // 卖价位数
        let len = n.length // 字符串长度
        let fontWidth = 6 // 单个字体的大概宽度
        let width = len * fontWidth
        let gap = 20 // 空白
        return width + gap
      } else {
        return 75
      }
    },
    isUpdate() {
      return this.kCommands.UPDATE == this.kCurrentCommand
    },
    isAppend() {
      return this.kCommands.APPEND == this.kCurrentCommand
    },
    isPrepend() {
      return this.kCommands.PREPEND == this.kCurrentCommand
    },
    isRefresh() {
      return this.kCommands.REFRESH == this.kCurrentCommand
    },
    rangeStart() {
      let result = 0,
        kCurrentEmptyPointCount = this.kCurrentEmptyPointCount
      let total = this.kData.datas.length - kCurrentEmptyPointCount
      let endIndex = total
      let isNoShowEmptyPoint = total > 50 // 如果总数大于最小节点数 首次载入的时候 不在显示前面的空白
      if (total > 50) {
        // 如果实际真实的节点数大于 定义的最小数据量
        if (this.isRefresh) {
          result = endIndex - kCurrentEmptyPointCount // 如果是刷新
          if (isNoShowEmptyPoint) {
            // 开始的位置定位到前面minKDataCount个
            result = endIndex - 50
          }
          this.rangeBeforeStart = result
        } else if (this.isPrepend) {
          let oldCount = total - (this.oldTotal - kCurrentEmptyPointCount)
          let rangeBeforeStart = this.rangeBeforeStart
          result = rangeBeforeStart + oldCount // 如果是懒载入之前的 保持不动
        } else if (this.isAppend) {
          // 计算出增加了多少个节点
          let increment = this.oldTotal <= this.kData.datas.length ? this.kData.datas.length - this.oldTotal : 1
          result = this.rangeBeforeStart + increment // 如果是push了新的trade 向后移一位
        }
      }
      if (this.isUpdate) {
        return this.rangeBeforeStart
      }

      return result
    },
    rangeEnd() {
      let result = 100
      let kCurrentEmptyPointCount = this.kCurrentEmptyPointCount
      let total = this.kData.datas.length - kCurrentEmptyPointCount
      let endIndex = total
      let isNoShowEmptyPoint = total > 50 // 如果总数大于最小节点数 首次载入的时候 不在显示前面的空白
      if (this.isUpdate) {
        return this.rangeBeforeEnd
      }
      if (this.isRefresh) {
        result = this.kData.datas.length - 1 // 如果是刷新 结束位 为最后位空节点
        if (isNoShowEmptyPoint) {
          // 结尾定位到最后一个节点
          result = endIndex - 1
        }
        this.rangeBeforeEnd = result
      } else if (this.isPrepend) {
        let oldCount = total - (this.oldTotal - kCurrentEmptyPointCount)
        result = this.rangeBeforeEnd + oldCount // 如果是懒载入 保持原有结束位不动
      } else if (this.isAppend) {
        let increment = this.oldTotal <= this.kData.datas.length ? this.kData.datas.length - this.oldTotal : 1
        result = this.rangeBeforeEnd + increment
      }
      return result
    },
    lang() {
      let open = this.$t('m.exchange.chart.open')
      let close = this.$t('m.exchange.chart.close')
      let low = this.$t('m.exchange.chart.low')
      let high = this.$t('m.exchange.chart.high')
      let volume = this.$t('m.exchange.chart.volume')
      let failed = this.$t('m.exchange.chart.loadingErr.failed')
      let loadingText = this.$t('m.exchange.chart.loadingText')
      return {
        volume,
        high,
        low,
        open,
        close,
        loadingText,
        loadingErr: { failed },
      }
    },
    closeData() {
      if (!this.isShowCloseLine) {
        return []
      }
      // 获取分时线数据
      let datas = this.kData.datas
      let result = []
      for (let i = 0; i < datas.length; i++) {
        const item = datas[i]
        result.push(item[1])
      }
      return result
    },
    isDisableDataZoom() {
      // 如果是周或者天 数据量太少不禁用datazoom
      return (
        ((this.period == 1440 || this.period == 10080) && this.kData.timestamp.length <= 50) ||
        this.kData.timestamp.length <= 50
      )
    },
  },
  watch: {
    originData: 'transDataToEchart',
    // 切换市场对会重新调trades接口，首次k依赖trades数据
    isSetTradesDone() {
      if (this.isSetTradesDone) {
        this.loadData()
      }
    },
    // 切换周期
    period() {
      this.setPeriod(this.period)
      this.loadData()
    },
    'kData.datas': 'toRefresh',
    isShowCloseLine: 'toggleCloseLine',
    // 不立马更新
    isUserInteractive() {
      if (!this.isUserInteractive) {
        this.$emit('noUserInteractive')
      }
    },
    isFullScreen() {
      let is = this.isFullScreen
      if (is) {
        this.$nextTick(() => {
          this.resizeChart()
          this.bindResize()
        })
      } else {
        this.$nextTick(() => {
          this.debounceResize({
            width: this.width,
            height: this.height,
          })
          this.unbindReisze()
        })
      }
    },
  },
  mounted() {
    this.setPeriod(this.period)
    this.$refs.kChart.chart.on('dataZoom', this.dataZoom)
  },
  beforeDestroy() {
    this.unbindReisze()
  },
  methods: {
    ...mapMutations('kStandard', ['clearCachedTrades', 'resetCachedTrades', 'setPeriod', 'setCurrentEmptyCount']),
    ...mapActions('kStandard', ['loadData', 'loadBeforeData']),
    outsideclick() {
      this.$refs.kChart.chart.dispatchAction({
        type: 'hideTip',
      })
      this.$refs.kChart.chart.dispatchAction({
        type: 'downplay',
      })
    },
    formatterYxisLabel(data) {
      return data.toFixed(this.bidFixed)
    },
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
      this.$refs.kChart.chart.resize({ height, width })
    },
    toggleCloseLine() {
      // 切换分时线 使用echart的legend 的选中模式来 确定分时线的显示
      let isShowCloneLine = this.isShowCloseLine
      let items1 = {
        candlestick: true,
        MA7: true,
        MA25: true,
        MA99: true,
        close: false,
      }
      let items2 = {
        candlestick: false,
        MA7: false,
        MA25: false,
        MA99: false,
        close: true,
      }

      let chart = this.$refs.kChart.chart
      let result = isShowCloneLine ? items2 : items1
      for (let name in result) {
        let type = result[name] === false ? 'legendUnSelect' : 'legendSelect'
        chart.dispatchAction({
          name: name,
          type,
        })
      }
      this.$nextTick(() => {
        this.setLineData()
      })
    },
    LeftFetch: debounce(function() {
      this.loadBeforeData()
    }, 1000),
    dataZoom() {
      clearTimeout(this.userInteractiveTimer)
      this.isUserInteractive = true
      this.userInteractiveTimer = setTimeout(() => {
        this.isUserInteractive = false
      }, 1000)
      let { endValue, startValue } = this.$refs.kChart.chart.getOption().dataZoom[0]
      this.rangeBeforeEnd = endValue
      this.rangeBeforeStart = startValue
      if (startValue < 10) {
        // 拖到左侧
        this.LeftFetch()
      }
    },
    toRefresh() {
      this.setAxisMargin()
      this.setLineData()
    },
    setAxisMargin() {
      let offset = this.rightMargin
      this.nextOpt.grid[0].right = offset
      this.nextOpt.grid[1].right = offset
    },
    tooltipFormatter(params) {
      let data = this.kData
      let kData = this.kData.datas // [ open, close, low, high, vol]
      let i = params[0].dataIndex
      let item = kData[i]
      if (!item || !item[0]) {
        return ''
      }
      let _ = '-'
      let z = 0
      let ma99 = data.ma99[i]
      let ma7 = data.ma7[i]
      let ma25 = data.ma25[i]
      ma99 = !ma99 || ma99 == _ ? z : ma99
      ma25 = !ma25 || ma25 == _ ? z : ma25
      ma7 = !ma7 || ma7 == _ ? z : ma7
      let fixed = this.bidFixed
      let maxFixed = this.maxFixed
      let { close, open, high, volume, low } = this.lang
      let result = null
      let vol = item[4] == 0 ? item[4] : item[4].toFixed(maxFixed)
      let openValue = item[0].toFixed(fixed)
      let closeValue = item[1].toFixed(fixed)
      let lowValue = item[2].toFixed(fixed)
      let highValue = item[3].toFixed(fixed)
      if (item[0]) {
        result = `${open}:${openValue} ${close}:${closeValue} ${low}:${lowValue} ${high}:${highValue} ${volume}:${vol}<br/>
        <div style='margin-top:3px'>
        <span style='${ma7Style}'>MA(7):${ma7}</span>
        <span style='${ma25Style}'>MA(25):${ma25}</span>
        <span style='${ma99Style}'>MA(99):${ma99}</span>
        </div>
        `
      }
      return result
    },
    setLineData() {
      let data = this.kData
      let option = this.nextOpt
      option.xAxis[0].data = data.times
      option.xAxis[1].data = data.times
      option.series[0].data = data.datas
      option.series[1].data = data.ma99
      option.series[2].data = data.ma25
      option.series[3].data = data.ma7
      option.series[4].data = this.closeData
      option.series[5].data = data.vols
      this.nextOpt = option
      if (this.isUserInteractive) {
        // 如果用户鼠标按下，或者用户data zoom事件触发后不立即更新视图
        this.$once('noUserInteractive', () => {
          this.setOption(this.nextOpt)
        })
      } else {
        this.setOption(this.nextOpt)
      }
    },
    setOption(option) {
      let start = this.rangeStart
      let end = this.rangeEnd
      let isDisableDataZoom = this.isDisableDataZoom
      option.dataZoom[0].startValue = start
      option.dataZoom[0].endValue = end
      option.dataZoom[1].startValue = start
      option.dataZoom[1].endValue = end
      option.dataZoom[0].disabled = isDisableDataZoom
      option.dataZoom[1].disabled = isDisableDataZoom
      this.rangeBeforeEnd = end
      this.rangeBeforeStart = start
      this.oldTotal = option.series[0].data.length
      this.$refs.kChart.chart.setOption(option, {
        lazyUpdate: true, // 尝试防止在更新point的时候tooltip消失
      })
      if (this.needInitShowTimeline) {
        this.toggleCloseLine()
        this.needInitShowTimeline = false
      }
    },
    transDataToEchart(data) {
      if (data.length === 0) {
        return
      }
      // 获取最新一屏数据
      const datas = [],
        times = [],
        timestamp = [],
        vols = []
      data.forEach(item => {
        // [ open, close, low, high, vol]
        datas.push([item[1], item[4], item[3], item[2], item[5]])
        times.push(dayjs(item[0] * 1000).format('YYYY-MM-DD HH:mm'))
        timestamp.push(item[0])
        vols.push(item[5])
      })
      // 为移到最后预留空白
      const emptyData = Array(5)
      const emptyTime = []
      const emptyVols = []
      // 先填充前面空白数据
      for (let i = 0; i < 25; i++) {
        datas.push(emptyData)
        times.push(emptyTime)
        vols.push(emptyVols)
      }
      // 如果还是不满足最小的数据量
      if (datas.length < 50) {
        for (let i = datas.length; i < 50; i++) {
          datas.push(emptyData)
          times.push(emptyTime)
          vols.push(emptyVols)
          this.setCurrentEmptyCount(1)
        }
      }
      const { ma7, ma25, ma99 } = calculateMA(this.currentTicker.bid_fixed, datas)
      this.kData = {
        datas,
        times,
        timestamp,
        vols,
        ma25,
        ma7,
        ma99,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.chart-ct {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}

.loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  user-select: none;
  .load-err-retry {
    cursor: pointer;
    padding: 40px;
    text-align: center;
    .err-reason {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: rgba(0, 0, 0, 0.2);
      max-width: 440px;
    }
  }
}

.includeRateSize {
  height: 280px;
  width: 564px;
}

.limitSize {
  height: 348px;
  width: 564px;
}
</style>
