<template>
  <div class="scroll-wrap">
    <div class='scroll-template'>

    </div>
    <transition-group
      class='scroll-exchange-fee'
      name="list-complete"
      tag="ul"
    >
      <li
        v-for="(item) in exchangeFeeList"
        :key="item.date || item.index"
        class="list-complete-item flex jcsb"
      >
        <div
          class="exchange_fee th-num-bold"
          v-show='item.fee'
        >
          <span class='f10'>{{item.fee && unit}}</span>
          <span class='f14'>{{item.fee && calculateArr(item.fee)[0]}}</span>
          <span class='f12'>.{{item.fee && calculateArr(item.fee)[1]}}</span>
          <!-- <span> &nbsp;USDT</span> -->
        </div>
        <div class="exchange_time f14">{{item.date && formatDate(item.date)}}</div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import totalMoney from '@/mixins/total-money'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      exchangeFeeList: [],
      zeroClock: new Date(new Date().setHours(24, 0, 0, 0)).getTime(),
      // mock
      // lastFee: {
      //   fee: 0,
      //   date: new Date()
      // }
      time: null,
    }
  },
  mixins: [totalMoney],
  computed: {
    ...mapGetters({
      lastFee: 'lastFee',
    }),
  },
  watch: {
    lastFee: {
      handler(val) {
        this.addData(val)
      },
      deep: true,
    },
  },
  methods: {
    addData(data) {
      // 如果是负数 过滤掉
      if (data && Number(data.fee) < 0) {
        return
      }
      // 重启机制
      if (new Date(data.date).getTime() > this.zeroClock) {
        window.location.reload()
      }
      if (this.time) {
        clearTimeout(this.time)
      }
      this.time = setTimeout(() => {
        this.exchangeFeeList = []
      }, 18000)

      this.exchangeFeeList.push(data)
      if (this.exchangeFeeList.length < 10) {
        let index = 0
        while (this.exchangeFeeList.length < 10) {
          this.exchangeFeeList.unshift({
            date: '',
            fee: '',
            index: index++,
          })
        }
      } else {
        this.exchangeFeeList.shift()
      }
    },
    // 分隔.
    splitDot(str) {
      return String.prototype.split.call(str, '.')
    },
    calculateArr(btc, type) {
      if (Number(btc) === 0 && type === 'current') {
        return ''
      }
      let price = this.changeUsdt('btc', btc, true, 4)
      price = price.replace(this.reg, '')
      return price.split('.')
    },
    formatDate(date) {
      const nowDate = new Date(date)
      const hours = nowDate.getHours()
      const minute = nowDate.getMinutes()
      const second = nowDate.getSeconds()

      return `${this.addZero(hours)}:${this.addZero(minute)}:${this.addZero(second)}`
    },
    addZero(val) {
      val = parseInt(val)
      return val < 10 ? `0${val}` : val
    },
  },
  mounted() {
    window.onblur = function() {
      this.exchangeFeeList = []
    }
    window.onfocus = function() {
      this.exchangeFeeList = []
    }
  },
}
</script>

<style lang='scss' scoped>
$color-unit: #d2ccd4;

.scroll-wrap {
  height: 243px;
  width: 182px;
  display: flex;
  overflow: hidden;
  align-items: flex-end;
  .scroll-template {
    height: inherit;
    width: 100%;
  }
  .scroll-exchange-fee {
    width: 164px;
    display: inline-block;
    vertical-align: baseline;
    .exchange_fee {
      text-align: left;
      width: 130px;
      font-size: 0;
      // span:nth-of-type(1) {
      //   color: $color-unit;
      //   font-size: 10px;
      //   margin-right: 5px;
      // }
      span:nth-of-type(1) {
        margin-right: 4px;
        color: #d2ccd4;
        font-size: 10px;
      }
      span:nth-of-type(2) {
        font-size: 14px;
        color: #ffffff;
      }
      span:nth-of-type(3) {
        font-size: 12px;
        color: #6c666e;
      }
    }
    .exchange_time {
      color: rgba(255, 255, 255, 0.7);
      font-size: 13px;
    }
    .list-complete-item {
      transition: all 0.1s;
      margin-top: 11px;
    }
    .list-complete-enter {
      opacity: 0;
      transform: translateY(25px);
    }
    .list-complete-leave-to {
      // opacity: 0;
    }
    li {
      opacity: 1;
      transition: transform 1s;
      &:nth-last-of-type(10) {
        opacity: 0;
      }
      &:nth-last-of-type(9) {
        opacity: 0;
      }
      &:nth-last-of-type(8) {
        opacity: 0.1;
        // animation: fadeInOut 10s cubic-bezier(0.15, 0.54, 0.6, 0.98);
      }
      &:nth-last-of-type(7) {
        opacity: 0.3;
        // animation: fadeInOut 10s cubic-bezier(0.15, 0.54, 0.6, 0.98);
      }
      &:nth-last-of-type(6) {
        opacity: 0.6;
        // animation: fadeInOut 10s cubic-bezier(0.15, 0.54, 0.6, 0.98);
      }
      &:nth-last-of-type(5) {
        opacity: 0.9;
        // animation: fadeInOut 10s cubic-bezier(0.15, 0.54, 0.6, 0.98);
      }
    }
  }
}

@keyframes fadeInOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.fadeInOut {
  animation: fadeInOut 10s cubic-bezier(0.15, 0.54, 0.6, 0.98);
}
</style>