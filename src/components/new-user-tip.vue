<template>
  <div class="new-user-tip">
    <div class="content"  v-if="nextStep">
      <h5>{{title}}</h5>
      <p>{{subTitle}}
      </p>
      <p v-if="thirdTitle">{{thirdTitle}}</p>
    </div>
    <div class="content success" v-else>
      <div class="icon"></div>
      <div class="text">
        <p>{{title}}
        </p>
        <p>{{subTitle}}</p>
      </div>
    </div>
    <div class="step">
      <span class="prev" v-if='prevStep' @click.stop="step('prev')">{{$t('m.userGuide.back')}}</span>
      <span class="next" v-if="nextStep" @click.stop="step('next')">{{$t('m.userGuide.next')}}</span>
      <span class="next success" v-else @click="finish">{{$t('m.userGuide.finish')}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title', 'subTitle', 'thirdTitle', 'type', 'nextStep', 'prevStep'],
  data() {
    return {
      link: {
        mining: '/',
        otc: '/',
        funds: '/',
        recharge: '/funds/recharge',
        exchange: '/',
        orderForm: '/markets/ateth',
        historyOrder: '/markets/ateth',
        finish: '/markets/ateth'
      }
    }
  },
  methods: {
    step(type) {
      const link = type === 'prev' ? this.link[this.prevStep] : this.link[this.nextStep]
      const step = type === 'prev' ? this.prevStep : this.nextStep
      const pathname = location.pathname
      if (pathname !== link) {
        location.href = location.origin + link
        localStorage.setItem('user-guide-step', step)
      } else {
        localStorage.setItem('user-guide-step', step)
        this.$emit('setStep', step)
      }
    },
    finish() {
      this.$emit('finish')
    }
  }
}
</script>

<style scoped lang='scss'>
.new-user-tip {
  width: 550px;
}

.content {
  background: url(../assets/images/guide-tip.png) no-repeat;
  padding: 16px 40px;
  background-size: 100% 100%;
  width: 100%;
  &.success {
    display: flex;
    height: 143px;
    align-items: center;
  }
  h5 {
    color: #ffcb06;
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 4px;
  }
  p {
    font-size: 12px;
    color: #ffffff;
    margin-bottom: 5px;
    line-height: 18px;
  }
  .icon {
    background: url(../assets/images/success-icon.png) no-repeat;
    width: 50px;
    height: 50px;
    display: inline-block;
    background-size: 100% 100%;
    margin-right: 23px;
  }
  .text {
    flex: 1;
  }
}

.step {
  text-align: right;
  margin-top: 32px;
  padding-right: 4px;

  span {
    display: inline-block;
    width: 97px;
    height: 39px;
    line-height: 39px;
    text-align: center;
    color: #ffffff;
    font-size: 12px;
    cursor: pointer;
    &.prev {
      border-radius: 24px;
      border: 1px solid #ffffff;
    }
    &.next {
      background: url(../assets/images/next-step.png);
      background-size: 100% 100%;
      margin-left: 44px;
    }
    &.success {
      background: url(../assets/images/success-btn.png) no-repeat;
      background-size: 100% 100%;
      color: #ffcb06;
    }
  }
}
</style>

