<template>
  <div class="progress-wrap">
    <ul class="progress">
      <li v-for="(item, index) in progressList" :class="step > index ? 'success' : step < index ? 'unprogress' : 'progressing'" :key="index">
        <p class="progress-icon">
          <img :src="iconList[index]" alt="">
        </p>
        <div class="progress-content">
          <p class="progress-text">{{item.progressText}}</p>
          <p class="progress-desc">{{item.progressDesc}}</p>
        </div>
      </li>
    </ul>
    <router-link class="finish" to="/en/otc/home">Finished</router-link>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      failed: false,
      step: 1,
      iconSuccess: require('@/assets/images/otc/icon-success.png'),
      iconFailed: require('@/assets/images/otc/icon-failed.png'),
      iconProgressing: require('@/assets/images/otc/icon-clocking.png'),
      iconAsset: require('@/assets/images/otc/icon-account.png'),
      iconAsseting: require('@/assets/images/otc/icon-accounting.png'),
      timer: null
    }
  },
  created() {
    const payment_id = this.getQueryString('payment_id')
    if (payment_id) {
      this.getPaymentStatus(payment_id)
      this.timer = setInterval(() => { // 5min 轮询一次
        this.getPaymentStatus(payment_id)
      }, 300000)
    }
  },
  computed: {
    ...mapState('otc', ['simplexProgress']),
    iconList() {
      let list = []
      for (let i = 0; i < 3; i++) {
        if (this.step > i) {
          if (i === 2 && this.failed) {
            list.push(this.iconFailed)
          } else {
            list.push(this.iconSuccess)
          }
          continue
        }
        if (this.step === 1) {
          list.push(this.iconProgressing)
          list.push(this.iconAsset)
          continue
        }
        if (this.step === 2) {
          list.push(this.iconAsseting)
          continue
        }
      }
      return list
    },
    progressList() {
      return [
        {
          progressText: 'Submission Successful!',
          progressDesc: 'Congratulations!',
        },
        {
          progressText: 'Transaction In Progress',
          progressDesc: 'Your purchase will be credited within 10-30 mins. Please be patient.',
        },
        {
          progressText: this.failed ? 'Purchase failed! ' : 'Your purchase has been credited.',
          progressDesc: this.failed ? 'Pease check email sent by Simplex for details.' : 'Check your account balance. ',
        }
      ]
    }
  },
  methods: {
    ...mapActions('otc', ['getPaymentStatus']),
    getQueryString(name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      let r = window.location.search.substr(1).match(reg)
      if (r != null) return decodeURIComponent(r[2])
      return null
    }
  },
  watch: {
    simplexProgress(val) {
      switch (val) {
        case 'created':
          this.step = 1
          break
        case 'submitted':
          this.step = 2
          break
        case 'approved':
          this.step = 3
          break
        case 'invalid': // 无效情况(eg: 随便输入payment_id访问的)
          this.$router.push({ path:'/en/otc/home' })
          break
        default: // declined 失败, expired 过期
          this.step = 3
          this.failed = true
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer)
    next()
  }
}
</script>
<style lang="scss" scoped>
.progress-wrap {
  min-width: 1200px;
  overflow: hidden;
  .progress {
    display: flex;
    justify-content: center;
    margin-top: 140px;
    li {
      width: 290px;
      margin: 0 72px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      .progress-icon {
        width: 40px;
        height: 40px;
        img {
          max-width: 100%;
        }
      }
      .progress-text {
        line-height: 28px;
        margin: 16px 0;
        font-size: 20px;
        font-weight: bold;
      }
      .progress-desc {
        line-height: 21px;
        font-size: 16px;
      }
      &:not(:first-child):after {
        content: '';
        width: 154px;
        height: 0;
        position: absolute;
        top: 67px;
        left: -154px;
        border-bottom: 1px dashed #999999;
      }
      &.success {
        .progress-text {
          color: #333333;
        }
        .progress-desc {
          color: #999999;
        }
      }
      &.progressing {
        .progress-text {
          color: #4c84ff;
        }
        .progress-desc {
          color: #4c84ff;
        }
        &:not(:first-child):after {
          content: '';
          width: 174px;
          height: 12px;
          position: absolute;
          top: 67px;
          left: -174px;
          background: url('~@/assets/images/otc/arrow2.png') center right no-repeat;
          background-size: cover;
          border-bottom: none;
        }
      }
      &.unprogress {
        .progress-text {
          color: #999999;
        }
        .progress-desc {
          color: #999999;
        }
      }
    }
  }
  .finish {
    width: 130px;
    height: 40px;
    display: block;
    margin: 140px auto 60px;
    line-height: 40px;
    text-align: center;
    background: #ffd200;
    border-radius: 2px;
    color: #333333;
    font-size: 18px;
  }
}

@include screen-h5-new() {
  .progress-wrap {
    min-width: 320px;
    .progress {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 140px;
      li {
        width: unset;
        margin: 0;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: left;
        .progress-icon {
          width: 28px;
          height: 28px;
          margin-right: 20px;
        }
        .progress-text {
          line-height: 24px;
          margin: 0 0 6px 0;
          font-size: 18px;
          font-weight: bold;
        }
        .progress-desc {
          width: 240px;
          line-height: 20px;
          font-size: 14px;
        }
        &:not(:last-child) {
          margin-bottom: 76px;
        }
        &:not(:first-child):after {
          content: '';
          width: 60px;
          height: 0;
          transform: rotate(90deg);
          position: absolute;
          top: -42px;
          left: -16px;
          border-bottom: 1px dashed #999999;
        }
        &.progressing {
          &:not(:first-child):after {
            content: '';
            width: 60px;
            height: 12px;
            position: absolute;
            transform: rotate(90deg);
            top: -42px;
            left: -16px;
            border-bottom: none;
          }
        }
      }
    }
    .finish {
      width: 110px;
      height: 40px;
      margin: 50px auto 60px;
      font-size: 16px;
    }
  }
}
</style>

