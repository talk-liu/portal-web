<template>
  <div class='current-exchange-wrap'>
    <div class='main-info-wrap'>
      <!-- <div class='block-image' :style="{background: isMiningNow? '#FFC700':'#656068'}">
      </div> -->
      <div class='price-wrap'>
        <div class='price th-num fb'>
          <span class='unit'>{{unit}}</span>
          <span class='integer'>{{allPrice && allPrice.integer}}</span>
          <span class='decimal'>.{{allPrice && allPrice.decimal}}</span>
          <!-- <span class='decimal'>&nbsp;USDT</span> -->
        </div>
        <div class='at-block-wrap'>
          <span class='at-text'>{{$t('m.home.loadat',{mining:'43,750'})}}</span>
        </div>
        <!-- 最后一个区块才需要显示 -->
        <!-- <div v-if='isMiningNow' class="rest-time">{{$t('m.home.remainTime')}} {{restTimes}}</div>
        <div v-else class='average-AT-price fb th-num'>
          <span class='unit'>{{unit}}</span>
          <span class='value'>{{averagePriceOfAT}}</span>
        </div> -->
      </div>
    </div>
    <div class='time-wrap'>
      <div v-if='isMiningNow' class="rest-time"><i class="iconfont icon-shizhong"></i> {{restTimes}}</div>
      <div v-else class='average-at-price fb th-num'>
        <span class='unit'>{{unit}}</span>
        <span class='value'>{{averagePriceOfAT}}</span>
      </div>
      <div class="time">
        {{formatCavasTime}}
      </div>
    </div>
  </div>
</template>

<script>
import totalMoney from '@/mixins/total-money'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      restTimes: 0,
    }
  },
  props: ['currentExchangeData', 'isMiningNow'],
  mixins: [totalMoney],
  watch: {
    downTime(val) {
      if (Math.floor(val / 1000) < 1) {
        clearInterval(this.t)
      } else {
        this.restTime(Math.floor(val / 1000))
      }
    },
    isMiningNow() {
      if (!this.isMiningNow) {
        clearInterval(this.t)
      } else {
        this.restTime(Math.floor(this.downTime / 1000))
      }
    },
  },
  computed: {
    ...mapGetters(['downTime']),
    allPrice() {
      if (this.currentExchangeData) {
        const last = this.currentExchangeData
        const allPrice = this.changeUsdt('btc', last.trueBtc, true)
        const price = allPrice.replace(this.reg, '')
        const arr = price.split('.')
        return {
          integer: arr[0],
          decimal: arr[1],
        }
      } else {
        return null
      }
    },
    averagePriceOfAT() {
      if (this.currentExchangeData) {
        const last = this.currentExchangeData
        const allPrice = this.changeUsdt('btc', last.trueBtc, true)
        const price = allPrice.replace(this.reg, '')
        const truePrice = price.split(',').join('')
        const avgPrice = (Number(truePrice) / 43750).toFixed(4)
        return `${avgPrice}/AT`
      } else {
        return null
      }
    },
    // 格式化时间 todo
    formatCavasTime() {
      if (this.currentExchangeData) {
        const i = this.currentExchangeData
        const startDate = new Date(i.start_date)
        const endDate = new Date(i.end_date)
        const month = startDate.getMonth() + 1
        const day = startDate.getDate()
        const startHours = startDate.getHours()
        const startMinute = startDate.getMinutes()
        const endHours = endDate.getHours()
        const endMinute = endDate.getMinutes()
        return `${this.addZero(month)}/${this.addZero(day)} ${this.addZero(startHours)}:${this.addZero(
          startMinute,
        )}-${this.addZero(endHours)}:${this.addZero(endMinute)}`
      } else {
        return null
      }
    },
  },
  methods: {
    // 倒计时
    restTime(time) {
      this.t = setInterval(() => {
        if (time < 1) {
          clearInterval(this.t)
          return
        }
        this.timeDown(--time)
      }, 1000)
    },
    timeDown(time) {
      const hours = this.addZero(time / 3600)
      const seconds = this.addZero(time % 3600)
      const minute = this.addZero(seconds / 60)
      const second = this.addZero(seconds % 60)
      this.restTimes = `${hours}:${minute}:${second}`
    },
    addZero(val) {
      val = parseInt(val)
      return val < 10 ? `0${val}` : val
    },
  },
  mounted() {
    if (this.downTime) {
      clearInterval(this.t)
      this.restTime(Math.floor(this.downTime / 1000))
    }
  },
}
</script>

<style lang='scss' scoped>
$color-main: #ffffff;
$color-sub: rgba(#ffffff, 0.7);

.current-exchange-wrap {
  // height: 60px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 10px;
  .main-info-wrap {
    // .block-image {
    //   width: 12px;
    //   height: 17px;
    //   display: inline-block;
    //   margin-right: 15px;
    // }
    .price-wrap {
      display: inline-block;
      .price {
        font-family: dinBold;
        .unit {
          color: $color-main;
          font-size: 20px;
        }
        .integer {
          color: $color-main;
          font-size: 30px;
        }
        .decimal {
          color: $color-sub;
          font-size: 22px;
          margin-left: -5px;
        }
      }
      .at-block-wrap {
        color: rgba(255, 255, 255, 0.8);
        font-size: 13px;
        line-height: 17px;
        margin: 11px 0;
      }
    }
  }
  .time-wrap {
    font-family: dinBold;
    .time {
      color: rgba(185, 180, 190, 0.5);
      font-size: 13px;
      line-height: 17px;
      margin: 11px 0;
      text-align: right;
    }
    .rest-time {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.8);
      i {
        font-size: 20px;
      }
    }
    .average-at-price {
      color: rgba(255, 255, 255, 0.7);
      font-size: 20px;
    }
  }
}
</style>
