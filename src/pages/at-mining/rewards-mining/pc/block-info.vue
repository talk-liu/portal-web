<template>
  <div class="block-info_wrap dinBold">
    <div class="clearfix price">
      <div class="mining-total_price pull-left">
        <span>{{splitDot(miningPrice)[0]}}.</span>
        <span>{{splitDot(miningPrice)[1]}}</span>
      </div>
      <div class="date pull-right">{{formatCavasTime(data)}}</div>
    </div>
    <div class="clearfix">
      <div class="unit_at pull-left" v-if="index!==3">
        {{unitAtPrice(data)}}
      </div>
      <div class="unit_at pull-left" v-else>
        {{restTimes}}
      </div>
      <div class="deliver_at pull-right">AT via ToM:{{tom(data)}}</div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import totalMoney from '@/mixins/total-money'
import { BigNumber as bn } from 'bignumber.js'

export default {
  props: ['data', 'index'],
  mixins: [totalMoney],
  computed: {
    ...mapGetters({
      currentProfit: 'currentProfit',
      downTime: 'downTime',
      lastComputingPower: 'lastComputingPower',
    }),
    miningPrice() {
      const price = this.changeUsdt('btc', this.data.trueBtc, true)
      return price
    },
  },
  data() {
    return {
      t: null,
      restTimes: 0,
    }
  },
  watch: {
    downTime(val) {
      if (Math.floor(val / 1000) < 1) {
        clearInterval(this.t)
        this.restTime(21600)
      }
    },
  },
  mounted() {
    this.restTime(Math.floor(this.downTime / 1000))
  },
  methods: {
    unitAtPrice(i) {
      const price = this.changeUsdt('btc', this.data.trueBtc, false, 2, false)
      const ATnumber = this.tom(i).replace(',', '')
      let unitPrice = bn(price)
        .dividedBy(ATnumber)
        .toNumber()
        .toFixed(4)
      // unitPrice = this.addUnit(unitPrice)
      return `${this.unit}${unitPrice}/AT`
    },
    splitDot(str) {
      return String.prototype.split.call(str, '.')
    },
    calculateArr(btc, type, fixed = 2) {
      let price = this.changeUsdt('btc', btc, true, fixed)
      return price.split('.')
    },
    tom(i) {
      const startDate = new Date(i.start_date).getTime()
      const date = '1541476800000'
      if (startDate >= date) {
        return '43,750'
      } else {
        return '87,500'
      }

    },
    formatCavasTime(i) {
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
    },
    addZero(val) {
      val = parseInt(val)
      return val < 10 ? `0${val}` : val
    },
    timeDown(time) {
      const hours = this.addZero(time / 3600)
      const seconds = this.addZero(time % 3600)
      const minute = this.addZero(seconds / 60)
      const second = this.addZero(seconds % 60)
      this.restTimes = `${hours}:${minute}:${second}`
    },
    restTime(time) {
      this.t = setInterval(() => {
        if (time < 1) {
          clearInterval(this.t)
          return
        }
        this.timeDown(--time)
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
.block-info_wrap {
  padding: 0 5px;
  .mining-total_price {
    color: #ee4343;
    font-size: 0;

    span:nth-of-type(2) {
      font-size: 12px;
      opacity: 0.7;
    }
    span:nth-of-type(1) {
      font-size: 15px;
    }
  }
  .unit_at {
    color: #ffffff;
    font-size: 14px;
  }
  .deliver_at {
    font-size: 12px;
    color: #ffffff;
    opacity: 0.7;
  }
  .date {
    font-size: 12px;
    color: #ffffff;
    opacity: 0.5;
  }
  .price {
    margin-bottom: 5px;
  }
}
</style>
