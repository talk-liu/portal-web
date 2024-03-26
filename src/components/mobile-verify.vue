<template>
  <div
    class="verify-box"
    v-if='visible'
  >
    <div
      class="close"
      @click="closeModal"
    >{{$t('m.login.cancel')}}</div>
    <div class="box-wrap">
      <div class="title">{{$t('m.login.twoFactor')}}</div>
      <div class="sub-title">{{$t('m.login.twoFactorInfo', {
        type: labels[type]
      })}}</div>
      <div class="verify-content">
        <div
          class="verify-number title-color"
          v-if='type === "app"'
        >
          <v-input
            v-model="code"
            type="number"
            :placeholder="placeholder"
            require=true
            :showErrMsg="acceptWarn"
            @input="changeCode"
            autoFocus=true
          >
          </v-input>
          <p
            v-if="codeWarn || acceptWarn"
            class="warn"
          >{{codeWarn || acceptWarn}}</p>
        </div>
        <div
          class="verify-number title-color"
          v-else
        >
          <v-input
            type="text"
            :disabled="disabled"
            v-model="number"
            :placeholder="placeholder"
            :require="true"
            :errMessage="errMsg"
          >
          </v-input>
        </div>
        <div
          class="verify-code"
          v-if="type !== 'app'"
        >
          <v-input
            v-model="code"
            :placeholder="$t('m.placeholders.verifyCode')"
            require=true
            type="number"
            :showErrMsg="acceptWarn"
            @input="changeCode"
            autoFocus=true
          ></v-input>
          <p
            v-if="codeWarn"
            class="warn"
          >{{codeWarn}}</p>
          <div
            class="send-code"
            @click="sendCode('send_code')"
          >
            {{sendBtnText}}
          </div>
        </div>
        <v-btn
          :type="btnType"
          class="btns"
          @click="bindOrFactor()"
        >{{btnText}}</v-btn>
        <div class="check-box">
          <span
            v-if='verifyItems[1]'
            @click='checkType(1)'
          >{{labels[verifyItems[1].type]}}</span>
          <span
            v-if='verifyItems[2]'
            @click='checkType(2)'
          >{{labels[verifyItems[2].type]}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VInput from '@/components/input-mobile'
import VBtn from '@/components/btn'
import verify from '@/mixins/verify.js'
export default {
  props: ['verifyList', 'noFactors', 'acceptWarn', 'visible', 'interfaceType'],

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
      isSend: false,
      btnDisabled: true,
      cantClick: false,
      cantSubmit: true,
      verifyItems: this.verifyList,
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
        this.code = ''
      }
    },
  },
  mounted() {
    if (this.disabled) {
      this.sendCode('send_code')
    }
  },

  computed: {
    number() {
      return this.verifyItems[0]['number']
    },
    disabled() {
      return !!this.verifyItems[0]['number']
    },
    type() {
      return this.verifyItems[0]['type']
    },
    placeholder() {
      return this.type === 'sms'
        ? this.$t('m.placeholders.phoneNumber')
        : this.type === 'email'
          ? this.$t('m.placeholders.emailNumber')
          : this.$t('m.placeholders.googleNumber')
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
      this.sendBtnText = this.isSend ? this.$t('m.btnText.sent') + '(' + second + ')s' : second + 's'

      this.t = setInterval(() => {
        if (--second < 0) {
          this.stopCountDown()
          this.isSend = true
          return
        }
        this.sendBtnText = this.isSend ? this.$t('m.btnText.sent') + '(' + second + ')s' : second + 's'
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.verify-box {
  z-index: $zindex-popover;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: #ffffff;
  .close {
    color: #111111;
    font-size: 15px;
    margin-top: 30px;
    padding: 0 30px;
  }
  .box-wrap {
    // margin: 108px auto;
    // width: 500px;
    // height: 450px;
    margin-top: 9px;
    border-radius: 10px;
    text-align: center;
    background-color: #ffffff;
    box-shadow: none;

    .title {
      color: #333333;
      font-size: 24px;
      text-align: center;
    }
    .sub-title {
      width: 315px;
      margin: 5px auto 0;
      font-size: 12px;
      color: #777777;
      text-align: center;
    }

    .warn {
      margin-top: 10px;
      color: $color-error;
      font-size: 12px;
      text-align: left;
    }

    .verify-content {
      padding: 0 30px;
      font-size: 16px;
      .verify-number {
        margin-top: 50px;
      }
      .verify-code {
        margin-top: 50px;
        position: relative;
      }
      .send-code {
        position: absolute;
        right: 0;
        top: 10px;
        color: #97a5b3;
      }
    }
    .btns {
      margin-top: 50px;
    }
    .check-box {
      display: flex;
      justify-content: space-between;
      flex-direction: row-reverse;
      span {
        color: #97a5b3;
        font-size: 15px;
        display: inline-block;
        margin-top: 10px;
      }
    }
  }
}
</style>
