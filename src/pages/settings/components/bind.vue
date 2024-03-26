<template>
  <bind-telegram v-if="type === 'telegram'" />
  <div
    v-else
    class="remove-bind_component"
  >
    <div class="history-wrap">
      <v-history-header
        :level1="[{name:$t('m.bindPhone.title')}]"
        :level2="level2"
        href="/settings"
      ></v-history-header>
    </div>
    <div class="remove-bind_form">
      <div class="input-wrap">
        <v-pre-phone
          v-if="type==='phone'"
          v-model="number"
          :showErr="numberMsg"
          @changeCountry="countryCode=>{this.countryCode = countryCode}"
          @input="numberInput"
        ></v-pre-phone>
        <v-input
          type="text"
          v-else
          width="300"
          v-model="number"
          @blur="emailBlur"
          :showErr="numberMsg"
          @input="()=>{this.numberMsg = ''}"
        ></v-input>
        <div class="clearfix label">
          <label>{{label}}</label>
          <p
            v-if="numberMsg"
            class="warning"
          >{{numberMsg}}</p>
        </div>
      </div>
      <div class="input-wrap flex jcsb message-wrap ">
        <div class='left-content'>
          <v-input
            type="number"
            v-model="code"
            center=true
            :showErr="codeWarn"
            @change="()=>{this.codeWarn = ''}"
          ></v-input>
          <div class="label">
            <label>{{codeText}}</label>
            <p
              v-if="codeWarn"
              class="warning"
            >{{codeWarn}}</p>
          </div>
        </div>
        <v-btn
          class='send-code'
          type="info"
          height="34"
          padding='0 10px'
          :disabled="!number || cantClick"
          @click="sendCode"
        >{{sendBtnText}}</v-btn>
      </div>
      <div class="change-btn">
        <v-btn
          :type="btnType"
          width="300"
          @click="bindVerify()"
        >{{btnText}}</v-btn>
      </div>
      <div
        class="remind"
        v-if="type === 'email'"
      >
        <span class="err-color">{{$t('m.bindPhone.warn')}}：</span>
        <span>{{$t('m.bindPhone.tip')}}</span>
      </div>
    </div>
  </div>
</template>


<script>
import VBtn from '@/components/btn'
import VHistoryHeader from '@/components/history-header-plus'
import VInput from '@/components/input-normal'
import VPrePhone from '@/components/pre-phone'
import { isEmail, isPhone } from '@/utils/verify'
import isbind from '@/mixins/isbind'
import { mapActions, mapState } from 'vuex'
import BindTelegram from './bind-telegram'
import serviceError from '@/utils/service-error'

export default {
  components: {
    VBtn,
    VHistoryHeader,
    VInput,
    VPrePhone,
    BindTelegram,
  },
  mixins: [isbind],
  data() {
    return {
      codeWarn: '',
      numberMsg: '',
      level2: '',
      type: this.$route.params.type,
      codeText: '',
      code: '',
      label: '',
      number: '',
      sendBtnText: this.$t('m.bindPhone.sendSmsCode'),
      cantClick: false,
      disabled: true,
      cantSubmit: true,
      btnText: this.$t('m.bindPhone.confirm'),
      countryCode: 'CN', // 默认null , current_user里的country_code始终为null
    }
  },
  created() {
    this.isBind()
    this.init()
  },

  computed: {
    ...mapState('currentUser', ['currentUser']),
    btnType() {
      return this.number && this.code && this.code.length === 6 && this.preSend() ? 'primary' : 'default'
    },
  },
  methods: {
    ...mapActions('settings', ['verify', 'confirmFactor']),
    init() {
      if (this.type === 'phone') {
        this.level2 = this.$t('m.bindPhone.bindPhone')
        this.label = this.$t('m.bindPhone.phone')
        this.codeText = this.$t('m.bindPhone.smsCode')
      } else if (this.type === 'email') {
        this.level2 = this.$t('m.bindPhone.bindEmail')
        this.label = this.$t('m.bindPhone.email')
        this.codeText = this.$t('m.bindPhone.emailCode')
      }
    },

    preSend() {
      if (!this.number && this.type !== 'phone') {
        this.numberMsg = this.$t('m.errMessages.blankEmail')
        return false
      }
      if (!this.number && this.type === 'phone') {
        this.numberMsg = this.$t('m.errMessages.blankPhone')
        return false
      }
      if (this.type === 'phone') {
        return isPhone(this.number) ? true : false
      }
      if (this.type !== 'phone' && !isEmail(this.number)) {
        this.numberMsg = this.$t('m.errMessages.emailErr')
        return false
      }
      return true
    },

    sendCode() {
      if (this.cantClick) return
      if (!this.preSend()) {
        return
      }
      this.type === 'phone' ? this.sendSms('sms') : this.sendEmail('email')
    },

    bindVerify() {
      this.type === 'phone' ? this.bindSms('sms') : this.bindEmail('email')
    },

    // number input
    numberInput(val) {
      if (!isPhone(val) && this.type === 'phone') {
        this.numberMsg = this.$t('m.errMessages.phoneErr')
      } else {
        this.numberMsg = ''
      }
    },

    emailBlur(val) {
      if (!isEmail(val)) {
        this.numberMsg = this.$t('m.errMessages.emailErr')
        return
      }
      this.numberMsg = ''
    },

    // 倒计时
    countDown() {
      this.cantClick = true
      const codeText = this.sendBtnText
      let second = 60
      this.sendBtnText = second + 's'

      const t = setInterval(() => {
        if (--second < 0) {
          this.cantClick = false
          this.sendBtnText = codeText
          clearInterval(t)
          return
        }
        this.sendBtnText = second + 's'
      }, 1000)
    },

    // send sms
    async sendSms(type) {
      const res = await this.verify({ auth_action: 'bind', type, phone_number: this.number, country: this.countryCode })
      if (res.data.verify && res.data.verify.result.result === 'success') {
        this.codeWarn = ''
        this.countDown()
      } else {
        this.numberMsg = serviceError(res)
      }
    },

    // send email
    async sendEmail(type) {
      if (this.isEmailSame(this.number)) {
        this.numberMsg = this.$t('m.errMessages.sameEmail')
        return
      }
      const res = await this.verify({ auth_action: 'bind', email: this.number, type })
      if (res.data.verify && res.data.verify.result.result === 'success') {
        this.codeWarn = ''
        this.countDown()
      } else {
        this.codeWarn = serviceError(res)
      }
    },

    // bind sms
    async bindSms(type) {
      if (!this.cantSubmit) return

      this.cantSubmit = false
      this.btnText = this.$t('m.btnText.submitting')
      const res = await this.confirmFactor({ auth_action: 'bind', type, otp: this.code })
      if (res.data.confirmFactor && res.data.confirmFactor.result.result === 'success') {
        this.$notify.success(this.$t('m.successMessage.bindSuccess'))
        this.goHref()
      } else {
        this.cantSubmit = true
        this.btnText = this.$t('m.bindPhone.confirm')
        this.codeWarn = serviceError(res)
      }
    },
    // bind email
    async bindEmail(type) {
      if (!this.cantSubmit) return
      this.cantSubmit = false
      this.btnText = this.$t('m.btnText.submitting')
      const res = await this.confirmFactor({ auth_action: 'bind', type, otp: this.code })
      if (res.data.confirmFactor && res.data.confirmFactor.result.result === 'success') {
        this.$notify.success(this.$t('m.successMessage.bindSuccess'))
        this.goHref()
      } else {
        this.cantSubmit = true
        this.btnText = this.$t('m.bindPhone.confirm')
        this.codeWarn = serviceError(res)
      }
    },
    goHref() {
      let href = '/settings'
      if (sessionStorage.getItem('two_factors_redirect_to')) {
        href = sessionStorage.getItem('two_factors_redirect_to')
        sessionStorage.removeItem('two_factors_redirect_to')
      }
      setTimeout(() => {
        location.href = href
      }, 1500)
    },
    isEmailSame(email) {
      if (this.currentUser) {
        return email.trim() === this.currentUser.email ? true : false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.remove-bind_component {
  .send {
    padding: 0 10px;
  }
  .history-wrap {
    padding: 20px 35px 0;
  }

  .remove-bind_form {
    margin: 100px auto;
    width: 300px;
    text-align: center;

    .change-btn {
      margin-top: 48px;
    }

    .remind {
      margin-top: 20px;
      text-align: center;
      font-size: 13px;
      color: $color-assist1;
    }

    .input-wrap {
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: 0;
      position: relative;
      .label {
        position: relative;
      }
      label {
        font-size: 12px;
        color: $color-assist2;
        float: left;
        font-weight: 500;
      }

      .send-wrap {
        display: inline-block;
        margin-left: 14px;
      }

      .warning {
        position: absolute;
        top: 0;
        text-align: right;
        font-size: 12px;
        color: #ee4343;
        width: 300px;
        background: #ffffff;
        height: 30px;
      }
      .warn {
        border-color: #ee4343;
      }
    }
    .message-wrap {
      width: 300px;
      margin: 0 auto;
      .left-content {
        flex: 1;
      }
      .input-normal_wrap {
        margin-top: 0;
        width: 100%;
      }
      label {
        margin-left: 0;
      }
      .send-code {
        margin-left: 10px;
      }
    }
  }
}
</style>
