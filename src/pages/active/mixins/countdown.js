export default {
  data() {
    return {
      day: '--',
      hour: '--',
      min: '--',
      sec: '--',
      countdownTimer: null
    }
  },
  methods: {
    countdown(endTime, startDate) {
      const isStart = new Date().getTime() >= new Date(startDate).getTime()
      if (!isStart) {
        this.countdownTimer = setTimeout(() => {
          this.countdown(endTime, startDate)
        }, 1000)
        return
      }
      const end = Date.parse(new Date(endTime))
      const now = Date.parse(new Date())
      const msec = end - now
      if (msec > 0) {
        let day = parseInt(msec / 1000 / 60 / 60 / 24)
        let hour = parseInt(msec / 1000 / 60 / 60 % 24)
        let min = parseInt(msec / 1000 / 60 % 60)
        let sec = parseInt(msec / 1000 % 60)
        this.day = this.formatNumber(day)
        this.hour = this.formatNumber(hour)
        this.min = this.formatNumber(min)
        this.sec = this.formatNumber(sec)
        this.countdownTimer = setTimeout(() => {
          this.countdown(endTime, startDate)
        }, 1000)
      } else {
        this.day = '00'
        this.hour = '00'
        this.min = '00'
        this.sec = '00'
        clearTimeout(this.countdownTimer)
      }
    },
    formatNumber(n) {
      return n > 9 ? n : '0' + n
    },
    clearCountdownTimer() {
      clearTimeout(this.countdownTimer)
    }
  },
}
