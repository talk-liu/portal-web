<template>
  <div class="pic_wrap europaBold">
    <div id="canvas_box">
      <div class="canvas" v-for="(item,index) in minedBlock" :key="index">
        <block-info :data="item" :index="index"></block-info>
        <canvas class="mining"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import totalMoney from '@/mixins/total-money'
import BlockInfo from './block-info'
import miningMixin from '../mixins/mining-mixin'

export default {
  components: {
    BlockInfo,
  },
  mixins: [totalMoney, miningMixin],
  data() {
    return {
      ratio: 0,
      width: 260,
      height: 131,
      devicePixelRatio: window.devicePixelRatio || 1,
      blankColor: '#9090A8',
      blackColor: '#474759',
      frameId: '',
      speed: 10,
      startTime: '',
      number: 10,
      colorArray: [
        '#EE4343',
        '#F05149',
        '#F15F50',
        '#F26754',
        '#F36F57',
        '#F57D5E',
        '#F68863',
        '#F68863',
        '#F89A6B',
        '#FBB677',
        '#FBB677',
        '#FDCA81',
        '#FFDA88',
      ],
      miniedColor: [
        '#545468',
        '#57576B',
        '#5A5A6E',
        '#5E5E73',
        '#64647A',
        '#68687E',
        '#6C6C81',
        '#727288',
        '#76768C',
        '#7B7B92',
        '#87879E',
        '#8C8CA3',
        '#9191A9',
      ],
    }
  },
  watch: {
    downTime(val) {
      if (Math.floor(val / 1000) < 1) {
        this.init()
      }
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      for (let i = 0; i < this.computingPower.length; i++) {
        this.createCavans(i, this.computingPower[i])
      }
      this.$nextTick(() => {
        this.frameId = window.requestAnimationFrame(this.drawLastBlock)
      })
    },
    drawLastBlock(timestamp) {
      if (!this.startTime) {
        this.startTime = timestamp
      }
      let speed = this.speed
      const aprtTime = timestamp - this.startTime

      const canvas = document.querySelectorAll('.mining')[3]

      if (canvas) {
        const ctx = canvas.getContext('2d')

        if (this.number > 220) {
          this.number = 10
          this.startTime = timestamp
          this.drawCanvas(canvas, ctx, this.lastComputingPower, 3)
        }

        if (aprtTime > this.number * speed) {
          this.drawCanvas(canvas, ctx, this.lastComputingPower, 3)
          this.number = this.number + 10
        }
        this.frameId = window.requestAnimationFrame(this.drawLastBlock)
      } else {
        window.cancelAnimationFrame(this.frameId)
      }
    },
    createCavans(i, item) {
      const canvas = document.querySelectorAll('.mining')[i]
      const ctx = canvas.getContext('2d')
      if (!this.ratio) {
        this.ratio = this.getRatio(ctx)
      }
      this.drawCanvas(canvas, ctx, item, i)
    },
    getRatio(context) {
      const backingStoreRatio =
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1
      return this.devicePixelRatio / backingStoreRatio
    },
    drawCanvas(canvas, ctx, item, index) {
      const data = this.calculat(item)
      canvas.width = this.width * this.ratio
      canvas.height = (data.colLength * 12 + 10) * this.ratio
      canvas.style.width = this.width + 'px'
      canvas.style.height = this.calculat(item).colLength * 12 + 10 + 'px'
      const max = Math.ceil(item.number * 4.4)
      const min = max % 22 < 10 ? max + (10 - max % 22) : max
      const len = this.computingPower.length - 1
      for (let j = 1; j <= data.colLength; j++) {
        for (let i = 1; i < 22; i++) {
          const fillColor = this.arcColor(j, i, data.colLength, index, item, max, min, len)
          this.drawArc(ctx, i * 12 * this.ratio, (data.colLength - j + 1) * 12.2 * this.ratio, fillColor)
        }
      }
    },
    drawArc(ctx, x, y, color) {
      const r = 5
      ctx.fillStyle = color
      ctx.strokeStyle = color
      ctx.beginPath()
      ctx.arc(x, y, r * this.ratio, 0, 2 * Math.PI)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    },
    calculat(item) {
      const number = item.number > 100 ? 100 : item.number
      const arcNumber = Math.floor(number * 4.4)
      const colLength = Math.ceil(arcNumber / 22)
      return {
        arcNumber,
        colLength,
      }
    },
    arcColor(col, i, colLength, index, item, max, min, len) {
      const isTrue = (col - 1) * 22 + i > min
      if (index === len && col === colLength && !isTrue) {
        return this.dynamicColor(i, max)
      }
      if ((col - 1) * 22 + i > max) {
        return index < len ? this.blackColor : 'rgba(255,218,136,0.2)'
      }
      if (index < len) {
        return this.miniedColor[col]
      }
      return this.colorArray[col] || '#FFDA88'
    },
    dynamicColor(i) {
      const number = this.number / 10
      if (number === i) {
        return this.colorArray[0]
      }
      if (i < number) {
        return this.colorArray[number - i] || '#FFDA88'
      }
      return this.colorArray[22 - (i - number)] || '#FFDA88'
    },
  },
}
</script>

<style lang="scss" scoped>
.pic_wrap {
  position: relative;

  .title {
    padding: 0 60px;
    font-size: 30px;
    color: #ffffff;
    opacity: 0.7;
  }

  #canvas_box {
    position: relative;
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    //flex-direction: column-reverse;

    .canvas {
      width: 260px;
    }
  }
}
</style>
