<template>
  <div v-if="isShow">
    <div class="mask"></div>
    <div class="main">
      <div class="order-form" v-if="step === 'orderForm'">
        <div class="content">
          <div class="section">
            <order-form-toggle :tabIndex="tabIndex" :tabConfig="tabConfig"></order-form-toggle>
          </div>
          <div class="layer"></div>
        </div>
        <div class="arrow"></div>
        <new-user-tip :prevStep="prevStep" :nextStep="nextStep" class="tip" :title="$t('m.userGuide.orderTitle')" :subTitle="$t('m.userGuide.orderSubTitle')" :thirdTitle="$t('m.userGuide.orderThirdTitle')" @setStep="setStep"></new-user-tip>
        <span class="iconfont icon-guanbi close" @click='close'></span>
      </div>
      <div class="history-order" v-if="step === 'historyOrder'">
        <div class="content">
          <div class="section">
            <bottom></bottom>
          </div>
          <div class="layer"></div>
        </div>
        <div class="arrow"></div>
        <new-user-tip class="tip" :prevStep="prevStep" :nextStep="nextStep" :title="$t('m.userGuide.historyTitle')" :subTitle="$t('m.userGuide.historySubTitle')" :thirdTitle="$t('m.userGuide.historyThirdTitle')" @setStep="setStep"></new-user-tip>
        <span class="iconfont icon-guanbi close" @click='close'></span>
      </div>
      <div class="finish" v-if="step === 'finish'">
        <new-user-tip class="tip" :prevStep="prevStep" :nextStep="nextStep" :title="$t('m.userGuide.finishTitle')" :subTitle="$t('m.userGuide.finishSubTitle')" @setStep="setStep" @finish='setFinish'></new-user-tip>
        <span class="iconfont icon-guanbi close" @click='close'></span>
      </div>
    </div>
  </div>
</template>

<script>
import NewUserTip from '@/components/new-user-tip'
import OrderFormToggle from './order-form-toggle'
import bottom from './bottom'
import guideStep from '@/mixins/guide-step'
export default {
  props: ['tabIndex', 'tabConfig'],
  mixins: [guideStep],
  computed: {
    isShow() {
      return this.step === 'orderForm' || this.step === 'historyOrder' || this.step === 'finish'
    }
  },
  components: {
    NewUserTip,
    OrderFormToggle,
    bottom
  },
  methods: {
    setStep(step) {
      this.setAllStep(step)
    },
    setFinish() {
      this.close()
    }
  }
}
</script>

<style scoped lang="scss">
.mask {
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  min-height: 100vh;
  z-index: 9000;
}

.main {
  position: absolute;
  width: 1200px;
  z-index: 9001;
  top: 0;
  left: 50%;
  margin-left: -600px;
}

.order-form {
  .arrow {
    background: url(../../assets/images/arrow-order.png) no-repeat;
    background-size: 100% 100%;
    width: 131px;
    height: 137px;
    position: absolute;
    left: 491px;
    top: 464px;
  }
  .tip {
    position: absolute;
    top: 370px;
    left: 622px;
    z-index: 10;
  }
  .section {
    width: 577px;
    padding: 5px;
    background: #ffffff;
    border-radius: 5px;
  }
  .content {
    border: 1px solid #ffffff;
    padding: 7px;
    position: absolute;
    top: 609px;
    left: 305px;
    border-radius: 5px;
  }
  .layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 566px;
    height: 314px;
  }
  .close {
    color: #ffffff;
    position: absolute;
    top: 357px;
    right: 2px;
  }
}

.history-order {
  .arrow {
    background: url(../../assets/images/arrow-history.png) no-repeat;
    background-size: 100% 100%;
    width: 94px;
    height: 144px;
    position: absolute;
    left: 373px;
    top: 798px;
  }
  .tip {
    position: absolute;
    top: 740px;
    left: 473px;
    z-index: 10;
  }
  .content {
    border: 1px solid #ffffff;
    padding: 7px;
    position: absolute;
    top: 948px;
    left: -12px;
    border-radius: 5px;
  }

  .layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 1210px;
    height: 525px;
  }

  .section {
    width: 1210px;
    padding: 5px;
    background: #ffffff;
    border-radius: 5px;
  }
  .close {
    color: #ffffff;
    position: absolute;
    top: 733px;
    right: 2px;
  }
}

.finish {
  .tip {
    position: absolute;
    top: 390px;
    left: 362px;
    z-index: 10;
  }
  .close {
    color: #ffffff;
    position: absolute;
    top: 253px;
    right: 2px;
  }
}
</style>
