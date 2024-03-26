<template>
  <div class="verify-box">
    <div class="box-wrap" :class="type === 'app' ? 'google-box-wrap' : ''">
      <div class="title primary-bg">
        <span>{{labels[type]}}</span>
        <span class="close" @click="closeModal" v-if='!hideClose'>
          <i class="iconfont icon-guanbi"></i>
        </span>
      </div>
      <div class="sub-title">{{$t('m.login.twoFactorInfo', {type: labels[type]})}}</div>
      <div class="verify-content" @keyup.enter="bindOrFactor()">
        <div class="verify-number title-color" v-if="type !== 'app'">
          <v-input v-if="!disabled" v-model="number" :placeholder="placeholder" require=true :errMessage="errMsg">
          </v-input>
          <div v-else class="title-color semi-bold">{{number}}</div>
        </div>
        <div :class="type === 'app' ? 'google-input' : ''">
          <v-input v-model="code" :placeholder="$t('m.placeholders.verifyCode')" require=true type="number" :showErrMsg="codeWarn" @input="changeCode" autoFocus=true></v-input>
          <div class="label">
            <p v-if="codeWarn" class="warn">{{codeWarn}}</p>
          </div>
        </div>
        <div class="send-code" v-if='type !== "app"'>
          <v-btn type="info" :disabled="cantClick" @click="sendCode('send_code')"  height="40">{{sendBtnText}}</v-btn>
        </div>
        <v-btn :type="btnType" @click="bindOrFactor()">{{btnText}}</v-btn>
        <div class="check-box" >
          <span v-if='verifyItems[1]' @click='checkType(1)'>{{labels[verifyItems[1].type]}}</span>
          <span v-if='verifyItems[2]' @click='checkType(2)'>{{labels[verifyItems[2].type]}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VInput from '@/components/input'
import VBtn from '@/components/btn'
import verify from '@/mixins/verify.js'

export default {
  props: ['verifyList', 'noFactors', 'acceptWarn', 'hideClose', 'interfaceType'],

  components: {
    VInput,
    VBtn,
  },
  mixins: [verify],
  data() {
    return {
      code: '',
      sendBtnText: this.$t('m.btnText.sendCodeBtn'),
      codeWarn: '',
      errMsg: '',
      btnDisabled: true,
      verifyItems: this.verifyList,
      cantClick: false,
      cantSubmit: true,
      labels: {
        sms: this.$t('m.verifyTitle.smsTitle'),
        email: this.$t('m.verifyTitle.emailTitle'),
        app: this.$t('m.verifyTitle.googleTitle'),
      },
    }
  },
  watch: {
    hideClose(val) {
      this.hideClose = val
    },
    code(val) {
      if (val.length === 6) {
        this.bindOrFactor()
      }
    },
    acceptWarn(val) {
      this.codeWarn = val
    },
    codeWarn(val) {
      if (val) {
        this.cantSubmit = true
      }
    },
  },
  mounted() {
    if (this.disabled) {
      this.sendCode('send_code')
    }
  },

  computed: {
    disabled() {
      return !!this.verifyItems[0]['number']
    },
    number() {
      return this.verifyItems[0]['number']
    },
    type() {
      return this.verifyItems[0]['type']
    },
    placeholder() {
      return this.type === 'sms' ? this.$t('m.placeholders.phoneNumber') : this.$t('m.placeholders.emailNumber')
    },
    methods() {
      return this.code ? 'patch' : 'create'
    },
    btnType() {
      return this.code.length === 6 ? 'primary' : 'default'
    },
    btnText() {
      return this.code.length === 6 && !this.acceptWarn && !this.codeWarn
        ? this.$t('m.btnText.submitting')
        : this.$t('m.btnText.confirmBtn')
    },
  },
  methods: {
    // 倒计时
    countDown() {
      this.cantClick = true
      let second = 60
      this.sendBtnText = second + 's'

      this.t = setInterval(() => {
        if (--second < 0) {
          this.stopCountDown()
          return
        }
        this.sendBtnText = second + 's'
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
.verify-box {
  z-index: $zindex-modal-mask;

  .box-wrap {
    margin: 108px auto;
    width: 500px;
    height: 490px;
    border-radius: 10px;
    text-align: center;
    background-color: #ffffff;
    box-shadow: none;

    .title {
      position: relative;
      height: 70px;
      line-height: 70px;
      color: #333333;
      font-size: 22px;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;

      .close {
        position: absolute;
        right: 20px;
        top: 30px;
        line-height: 0;
        cursor: pointer;
      }
    }
    .sub-title {
      width: 400px;
      margin: 30px auto 0;
      color: #777777;
      font-size: 14px;
    }
    .label {
      position: relative;
      padding-bottom: 20px;
    }
    .warn {
      margin-top: 10px;
      color: $color-error;
      font-size: 12px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
    }
    .verify-content {
      padding: 37px 100px 0;

      .verify-number {
        margin-bottom: 30px;
        font-size: 18px;
      }
      .google-input {
        margin: 5px 0 60px;
      }
      .send-code {
        margin: 40px 0 36px;
      }
    }
    .check-box {
      display: flex;
      justify-content: space-between;
      flex-direction: row-reverse;
      margin-top: 10px;
      span {
        color: #777777;
        font-size: 14px;
        display: inline-block;
        cursor: pointer;
      }
    }
  }
  .google-box-wrap {
    height: 380px;
  }
}
</style>
