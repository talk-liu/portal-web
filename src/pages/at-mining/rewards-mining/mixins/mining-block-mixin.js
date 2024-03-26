import totalMoney from '@/mixins/total-money'
import {
  mapGetters
} from 'vuex'
import CountUp from 'countup.js'
export default {
  data() {
    return {
      restTimes: 0,
      animateHeight: 0
    }
  },
  props: ['height', 'v', 'i'],
  mixins: [totalMoney],
  watch: {
    downTime(val) {
      if (Math.floor(val / 1000) < 1) {
        clearInterval(this.t)
      }
    }
  },
  computed: {
    ...mapGetters(['downTime']),
    allPrice() {
      if (this.v) {
        const last = this.v
        const allPrice = this.changeUsdt('btc', last.trueBtc, true, 2, true, true)
        // const price = allPrice.replace(this.reg, '')
        const arr = allPrice.split('.')
        return {
          integer: arr[0],
          decimal: arr[1],
          all:allPrice
        }
      } else {
        return null
      }
    },
    averagePriceOfAT() {
      if (this.v) {
        const last = this.v
        const allPrice = this.changeUsdt('btc', last.trueBtc, true, 2, true, true)
        // const price = allPrice.replace(this.reg, '')
        // const truePrice = price.split(',').join('')
        const ATnumber = this.tom(last)
        const avgPrice = (Number(allPrice) / ATnumber).toFixed(2)
        return `${avgPrice} USDT/AT`
      } else {
        return null
      }
    },

    // 格式化时间 todo
    formatCavasTime() {
      if (this.v) {
        const i = this.v
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
    allPriceTrue() {
      return this.delcommafy(this.allPrice.integer + '.' + this.allPrice.decimal)
    }
  },
  methods: {
    // 倒计时
    tom(i) {
      const startDate = new Date(i.start_date).getTime()
      const date = '1541476800000'
      if (startDate >= date) {
        return 43750
      } else {
        return 87500
      }

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
    delcommafy(num) {
      if ((num + '').trim() == '') {
        return ''
      }
      num = num.replace(/,/gi, '')
      return num
    },
    getId(i) {
      return 'animate-num' + i
    }
  },
  mounted() {
    if (this.downTime) {
      clearInterval(this.t)
      this.restTime(Math.floor(this.downTime / 1000))
    }
    // 动画效果
    const options = {
      useEasing: false,
      useGrouping: true,
      separator: ',',
      decimal: '.'
    }

    this.countUpInteger = new CountUp(
      'animate-num' + 1,
      0,
      this.allPrice.integer,
      0,
      0.6,
      options
    )
    this.countUpDecimal = new CountUp(
      'animate-num' + 2,
      0,
      this.allPrice.decimal,
      0,
      0.6,
      options
    )

    if (!this.countUpInteger.error) {
      setTimeout(() => {
        this.countUpInteger.start()
        this.countUpDecimal.start()
      }, 0)
    } else {
      console.error(this.countUp.error)
    }

    setTimeout(() => {
      this.animateHeight = this.height
    }, 0)

  }
}