<template>
  <div ref="chart">
    <svg class="container" v-if="width && height">
      <g>
        <defs name="up">
          <linearGradient
            x1="100%"
            y1="50%"
            x2="0%"
            y2="50%"
            id="chart-line-up"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#3BB46E" offset="0%"></stop>
            <stop stop-color="#76D79F" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="22.7092851%"
            y1="34.3377976%"
            x2="93.3226713%"
            y2="0%"
            id="chart-area-up"
          >
            <stop stop-color="#80CA73" offset="0%"></stop>
            <stop stop-color="#53D036" offset="100%"></stop>
          </linearGradient>
          <filter
            x="-4.1%"
            y="-21.0%"
            width="108.1%"
            height="141.9%"
            filterUnits="objectBoundingBox"
            id="chart-area-up-shadow"
          >
            <feMorphology radius="2" operator="erode" in="SourceAlpha" result="shadowSpreadInner1"></feMorphology>
            <feGaussianBlur stdDeviation="4" in="shadowSpreadInner1" result="shadowBlurInner1"></feGaussianBlur>
            <feOffset dx="0" dy="3" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
            <feComposite
              in="shadowOffsetInner1"
              in2="SourceAlpha"
              operator="arithmetic"
              k2="-1"
              k3="1"
              result="shadowInnerInner1"
            ></feComposite>
            <feColorMatrix
              values="0 0 0 0 0.329411765   0 0 0 0 0.68627451   0 0 0 0 0.235294118  0 0 0 0.5 0"
              type="matrix"
              in="shadowInnerInner1"
            ></feColorMatrix>
          </filter>
        </defs>
        <defs name="down">
          <linearGradient
            x1="26.5013217%"
            y1="82.2167635%"
            x2="93.3226713%"
            y2="0%"
            id="chart-line-down"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FFBCBC" offset="0%"></stop>
            <stop stop-color="#FF5151" offset="100%"></stop>
          </linearGradient>
          <filter
            x="-4.1%"
            y="-21.0%"
            width="108.1%"
            height="141.9%"
            filterUnits="objectBoundingBox"
            id="chart-area-down-shadow"
          >
            <feMorphology radius="2" operator="erode" in="SourceAlpha" result="shadowSpreadInner1"></feMorphology>
            <feGaussianBlur stdDeviation="4" in="shadowSpreadInner1" result="shadowBlurInner1"></feGaussianBlur>
            <feOffset dx="0" dy="3" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
            <feComposite
              in="shadowOffsetInner1"
              in2="SourceAlpha"
              operator="arithmetic"
              k2="-1"
              k3="1"
              result="shadowInnerInner1"
            ></feComposite>
            <feColorMatrix
              values="0 0 0 0 1   0 0 0 0 0.176470588   0 0 0 0 0.176470588  0 0 0 0.5 0"
              type="matrix"
              in="shadowInnerInner1"
            ></feColorMatrix>
          </filter>
          <linearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="chart-area-down">
            <stop stop-color="#EE4343" offset="0%"></stop>
            <stop stop-color="#FF8D8D" offset="100%"></stop>
          </linearGradient>
        </defs>
        <defs>
          <path :id="`dataLinePath-${marketId}`" :d="dataLine"></path>
          <path :id="`dataAreaPath-${marketId}`" :d="dataArea"></path>
        </defs>
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g opacity="0.200000003">
            <use
              :fill="`url(#chart-area-${side})`"
              fill-rule="evenodd"
              v-bind="{'xlink:href':`#dataAreaPath-${marketId}`}"
            ></use>
            <use
              fill="black"
              fill-opacity="1"
              :filter="`url(#chart-area-${side}-shadow)`"
              v-bind="{'xlink:href':`#dataAreaPath-${marketId}`}"
            ></use>
          </g>
          <use
            :stroke="`url(#chart-line-${side})`"
            stroke-width="1.5"
            v-bind="{'xlink:href':`#dataLinePath-${marketId}`}"
          ></use>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import { scalePoint, scaleLinear } from 'd3-scale'
import { line, area } from 'd3-shape'
import max from 'lodash/max'
import min from 'lodash/min'

export default {
  props: ['market', 'marketId', 'side', 'bidFixed'],
  data() {
    return {
      width: 0,
      height: 0,
    }
  },
  computed: {
    chartData() {
      return (
        this.market.map(x => {
          return {
            time: x[0],
            price: x[4],
          }
        }) || []
      )
    },
    formatedData() {
      const obj = {
        timeData: [],
        priceData: [],
      }
      this.market.forEach(x => {
        obj.timeData.push(x[0])
        obj.priceData.push(x[4])
      })
      return obj
    },
    tick() {
      return Math.pow(0.1, this.bidFixed)
    },
    maxPrice() {
      return max(this.formatedData.priceData) + this.tick
    },
    minPrice() {
      return min(this.formatedData.priceData)
    },
    xG() {
      return scalePoint()
        .domain(this.formatedData.timeData)
        .range([0, this.width])
    },
    yG() {
      return scaleLinear()
        .domain([this.minPrice, this.maxPrice])
        .range([this.height, 0])
    },
    dataLine() {
      const l = line()
        .x(d => this.xG(d.time) + this.xG.bandwidth() / 2)
        .y(d => this.yG(d.price))
      return l(this.chartData)
    },
    dataArea() {
      const a = area()
        .x(d => this.xG(d.time) + this.xG.bandwidth() / 2)
        .y(d => this.yG(d.price))
        .y1(() => this.height)
      return a(this.chartData)
    },
  },
  mounted() {
    this.width = this.$refs.chart.offsetWidth
    this.height = this.$refs.chart.offsetHeight
  },
}
</script>


<style lang='scss' scoped>
.container {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
