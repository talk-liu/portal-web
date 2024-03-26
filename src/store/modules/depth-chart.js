import max from 'lodash/max'
import min from 'lodash/min'
import cloneDeep from 'lodash/cloneDeep'
import { scalePoint, scaleLinear } from 'd3-scale'
import { line, area } from 'd3-shape'
import { BigNumber } from 'bignumber.js'

export default {
  namespaced: true,
  state: {
    rect: {
      // svg宽高,相对于视口的位置
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    },
    margin: {
      // 图标距离svg四侧距离
      left: 0,
      right: 0,
      top: 10,
      bottom: 35,
    },
    pointer: {
      // 鼠标在svg的位置
      x: 0,
      y: 0,
      over: false,
    },
    scaleXRange: [5, 4, 3, 2, 1], // 缩放系数范围
    scaleX: 5,
  },
  getters: {
    chartData: (state, getters, rootState, rootGetters) => {
      return rootGetters['orderBook/sortedOrderBook']
    },
    // 坐标系宽高（不包含坐标轴）
    width: state => {
      const v = state.rect.width - state.margin.left - state.margin.right
      return v < 0 ? 0 : v
    },
    height: state => {
      const v = state.rect.height - state.margin.top - state.margin.bottom
      return v < 0 ? 0 : v
    },
    grid: (state, { width, height }) => {
      return { ...state.margin, width, height }
    },
    minDataLength: (state, { chartData }) => {
      return min([chartData.bids.length, chartData.asks.length])
    },
    defaultMaxScaleX: (state, { minDataLength }) => {
      // 计算单边不小于3的默认最大值
      let defaultScaleX = state.scaleXRange[0]
      state.scaleXRange.some(scale => {
        if (Math.floor(minDataLength / scale) < 3) {
          defaultScaleX = 1
          return true
        }
        defaultScaleX = scale
        return true
      })
      return defaultScaleX
    },
    realScaleX: ({ scaleX }, { defaultMaxScaleX }) => {
      const minScaleX = min([scaleX, defaultMaxScaleX])
      return minScaleX < 1 ? 1 : minScaleX
    },
    disableZoomOut: (state, { realScaleX }) => {
      // 禁止缩小
      return realScaleX === 1
    },
    disableZoomIn: (state, { defaultMaxScaleX, realScaleX }) => {
      // 放大
      return realScaleX >= defaultMaxScaleX
    },
    maxChartLength: (state, { minDataLength, realScaleX }) => {
      // 获取买方，卖方输入数据最小长度，作为数据最大长度
      return Math.floor(minDataLength / realScaleX)
    },
    // 最新价数据
    midPrice: (state, { chartData }) => {
      if (chartData.bids && chartData.asks && chartData.bids.length !== 0 && chartData.asks.length !== 0) {
        const bidsVal = chartData.bids[0][0]
        const asksVal = chartData.asks[chartData.asks.length - 1][0]
        return BigNumber(asksVal)
          .minus(bidsVal)
          .div(2)
          .plus(bidsVal)
          .toString()
      } else {
        return 0
      }
    },
    // 买方数据, 并格式化成从小到大排列, 将订单量做累加
    bidsData: (state, { chartData, maxChartLength, midPrice }) => {
      // 原始数据，从大到小排列
      const arr = []
      chartData.bids.reduce((acc, curValue) => {
        const val = BigNumber(curValue[1])
          .plus(acc)
          .toFixed(2)
        arr.push({ price: curValue[0], volume: val, tag: 'bids' })
        return val
      }, 0)
      if (arr.length > maxChartLength) {
        arr.splice(maxChartLength)
      }
      if (arr[0] && Number(arr[0].price) !== Number(midPrice)) {
        arr.unshift({ price: midPrice, volume: 0, tag: 'bids' })
      }
      arr.reverse()
      return arr
    },
    // 卖方数据, 将订单量做累加
    asksData: (state, { chartData, maxChartLength, midPrice }) => {
      // 原始数据，从大到小排列,需要转成从小到大
      const arr = []
      const asksData = cloneDeep(chartData.asks)
      asksData.reverse()
      asksData.reduce((acc, curValue) => {
        const val = BigNumber(curValue[1])
          .plus(acc)
          .toFixed(2)
        arr.push({ price: curValue[0], volume: val, tag: 'asks' })
        return val
      }, 0)
      if (arr.length > maxChartLength) {
        arr.splice(maxChartLength)
      }
      if (arr[0] && Number(arr[0].price) !== Number(midPrice)) {
        arr.unshift({
          price: midPrice,
          volume: 0,
          tag: 'asks',
        })
      }
      return arr
    },
    // 将买卖双方数据混合
    sortedChartData: (state, { bidsData, asksData }) => {
      const cloneBidsData = [...bidsData]
      const cloneAsksData = [...asksData]
      if (cloneBidsData.length > 0 && cloneAsksData.length > 0) {
        // 数据存在时，需要移除补充的midPirce数据，只保留一个
        // 通过判断volume 来保证，不会移除真正有midPrice挂单的数据
        if (cloneBidsData[cloneBidsData.length - 1].volume === 0) {
          cloneBidsData.pop()
        } else {
          cloneAsksData.shift()
        }
        return [...cloneBidsData, ...cloneAsksData]
      }
      return []
    },
    // x轴（价格）数据
    priceData: (state, { sortedChartData }) => sortedChartData.map(d => d.price) || [],
    maxVolume: (state, { sortedChartData }) => max(sortedChartData.map(d => Number(d.volume))) || 0,
    xG: (state, { priceData, width }) => {
      return scalePoint()
        .domain(priceData)
        .range([0, width])
    },
    yG: (state, { maxVolume, height }) => {
      return scaleLinear()
        .domain([0, maxVolume])
        .range([height, 0])
    },
    // 生成买方数据path
    bidsLine: (state, { bidsData, xG, yG }) => {
      const l = line()
        .x(d => xG(d.price) + xG.bandwidth() / 2)
        .y(d => yG(d.volume))
      return l(bidsData)
    },
    // 生成卖方数据path
    asksLine: (state, { asksData, xG, yG }) => {
      const l = line()
        .x(d => xG(d.price) + xG.bandwidth() / 2)
        .y(d => yG(d.volume))
      return l(asksData)
    },
    bidsArea: (state, { height, xG, yG, bidsData }) => {
      const a = area()
        .x(d => xG(d.price) + xG.bandwidth() / 2)
        .y(d => yG(d.volume))
        .y1(() => height)
      // 需要补一份盘口数据，让深度图画到中间，不留白
      return a(bidsData)
    },
    asksArea: (state, { height, xG, yG, asksData }) => {
      const a = area()
        .x(d => xG(d.price) + xG.bandwidth() / 2)
        .y(d => yG(d.volume))
        .y1(() => height)
      // 需要补一份盘口数据，让深度图画到中间，不留白
      return a(asksData)
    },
    axisPointer: ({ pointer }, { xG, yG, sortedChartData }) => {
      // 鼠标相关数据
      const EmptyAxisPointer = { show: false, x: 0, y: 0, xIndex: -1, xValue: { price: 0, volume: 0, tag: '' } }
      if (!pointer.over) return EmptyAxisPointer
      let xIndex = Math.round(pointer.x / xG.step())
      if (xIndex < 0) return EmptyAxisPointer
      if (xIndex > sortedChartData.length - 1) xIndex = sortedChartData.length - 1
      const xValue = sortedChartData[xIndex]
      if (!xValue || xValue.volume === 0) return EmptyAxisPointer
      return {
        show: true,
        xValue,
        xIndex,
        x: xG(xValue.price) + xG.bandwidth() / 2,
        y: yG(xValue.volume),
      }
    },
    ylabel: (state, { maxVolume, yG }) => {
      if (!maxVolume) return []
      const base = BigNumber(maxVolume).dividedBy(3)
      const arr = [0, base.toNumber(), base.multipliedBy(2).toNumber(), maxVolume]
      return arr.map(item => {
        return { val: item, y: yG(item) }
      })
    },
    xlabel: (state, { maxChartLength, bidsData, asksData, width, xG, midPrice }) => {
      if (bidsData.length < 4 || asksData.length < 4 || !width) return []
      const step = Math.round(maxChartLength / 3)
      let arr = [
        bidsData[step].price,
        bidsData[step * 2].price,
        midPrice,
        asksData[step].price,
        asksData[step * 2].price,
      ]
      return arr.map(price => {
        return { val: price, x: xG(price) }
      })
    },
  },
  mutations: {
    resizeDepthChart(state, { left, top, width, height }) {
      state.rect = { left, top, width, height }
    },
    handleMouseEnter(state) {
      state.pointer = { ...state.pointer, over: true }
    },
    handleMouseMove(state, pos) {
      state.pointer = {
        x: pos.x - state.rect.left - state.margin.left,
        y: pos.y - state.rect.top - state.margin.top,
        over: true,
      }
    },
    handleMouseLeave(state) {
      state.pointer = { ...state.pointer, over: false }
    },
    handleZoom(state, scaleX) {
      state.scaleX = scaleX
    },
    resetDepthChart(state) {
      state.scaleX = 5
    },
  },
  actions: {
    handleZoom({ commit, getters }, dir) {
      let scaleX = getters.realScaleX
      scaleX = dir === 'zoomIn' ? scaleX + 1 : scaleX - 1
      commit('handleZoom', scaleX)
    },
  },
}
