<template>
  <div class="remove-bind_component">
    <div class="history-wrap">
      <v-history-header
        :level1="[{name:$t('m.relieve.level1')}]"
        :level2="level2"
      ></v-history-header>
    </div>
    <div
      class="remove-bind_form"
      :class="{en: $fifth.lang!=='zh-CN'}"
    >
      <div class="input-wrap">
        <!-- 以下2个代码防止chrome自动弹出密码 -->
        <input
          type="text"
          name="prevent_autofill"
          id="prevent_autofill"
          value=""
          style="display:none;
"
        />
        <input
          type="password"
          name="password_fake"
          id="password_fake"
          value=""
          style="display:none;
"
        />
        <v-input
          type="password"
          width="300"
          v-model="password"
          @change="changePass"
          :showErr="passMsg"
          @blur="verifyPass(password)"
          @input="()=>{this.passMsg=''}"
        ></v-input>
        <div class="clearfix label">
          <label>{{$t('m.relieve.password')}}</label>
          <p
            v-if="passMsg"
            class="warning"
            :class="{en: $fifth.lang!=='zh-CN'}"
          >{{passMsg}}</p>
        </div>
      </div>
      <div
        class="input-wrap"
        v-if="tag !== 'google'"
      >
        <v-input
          type="text"
          width="300"
          v-model="number"
          :disabled="true"
          center=true
        ></v-input>
        <div class="clearfix label">
          <label>{{label}}</label>
        </div>
      </div>
      <div
        class="input-wrap"
        v-else
      >
        <v-input
          type="text"
          width="300"
          v-model="code"
          :disabled="false"
          center=true
        ></v-input>
        <div class="clearfix label">
          <label>{{codeText}}</label>
          <p
            v-if="codeMsg"
            class="warning"
            :class="{en: $fifth.lang!=='zh-CN'}"
          >{{codeMsg}}</p>
        </div>
      </div>
      <div
        class="input-wrap"
        v-if='tag !== "google"'
      >
        <v-input
          type="number"
          width="180"
          v-model="code"
          center=true
          @input="()=>{this.codeMsg = ''}"
        ></v-input>
        <div class="send-wrap">
          <v-btn
            type="info"
            :disabled="!password || cantClick"
            height="34"
            width="106"
            padding='0 10px'
            @click="sendCode"
          >{{sendBtnText}}</v-btn>
        </div>
        <div class="clearfix label">
          <label>{{codeText}}</label>
          <p
            v-if="codeMsg"
            class="warning"
            :class="{en: $fifth.lang!=='zh-CN'}"
          >{{codeMsg}}</p>
        </div>
      </div>
      <div class="change-btn">
        <v-btn
          :type="btnType"
          :width="300"
          @click="confirmRemove"
          :disabled="btnType === 'default'"
        >{{btnText}}</v-btn>
      </div>
      <div class="err-color f12">
        {{$t('m.errMessages.withdrawRemind')}}
      </div>
    </div>
  </div>
</template>


<script>
import VBtn from '@/components/btn'
import VHistoryHeader from '@/components/history-header-plus'
import VInput from '@/components/input-normal'
import isbind from '@/mixins/isbind'
import { isPasswords } from '@/utils/verify'
import { mapState, mapActions } from 'vuex'
import serviceError from '@/utils/service-error'

export default {
  mixins: [isbind],
  components: {
    VBtn,
    VHistoryHeader,
    VInput,
  },
  data() {
    return {
      password: '',
      passMsg: '',
      codeMsg: '',
      level2: '',
      tag: this.$route.params.type,
      codeText: '',
      code: '',
      label: '',
      cantClick: false,
      sendBtnText: this.$t('m.relieve.sendCode'),
      cantSubmit: true,
      btnText: this.$t('m.relieve.confirm'),
    }
  },
  created() {
    this.isNotBind()
    this.init()
  },

  computed: {
    ...mapState('currentUser', ['currentUser']),
    ...mapState('withdraw', ['withdrawMe']),
    number() {
      if (this.withdrawMe) {
        const { masked_phone_number, masked_two_factor_email } = this.withdrawMe
        return this.tag === 'phone' ? masked_phone_number : this.tag === 'email' ? masked_two_factor_email : ''
      }
    },
    btnType() {
      return this.password && this.verifyPass(this.password, true) && this.code.length === 6 ? 'primary' : 'default'
    },
  },

  methods: {
    ...mapActions('settings', ['verify', 'appFactor', 'confirmFactor']),
    init() {
      if (this.tag === 'phone') {
        this.level2 = this.$t('m.relieve.relievePhoneCode')
        this.label = this.$t('m.relieve.phone')
        this.codeText = this.$t('m.relieve.smsCode')
      } else if (this.tag === 'email') {
        this.level2 = this.$t('m.relieve.relieveEmailCode')
        this.label = this.$t('m.relieve.email')
        this.codeText = this.$t('m.relieve.emailCode')
      } else {
        this.level2 = this.$t('m.relieve.relieveGoogleCode')
        this.label = this.$t('m.relieve.google')
        this.codeText = this.$t('m.relieve.googleCode')
      }
    },
    // 验证密码格式
    verifyPass(val, noShow) {
      // console.log(isPasswords(val));
      if (!isPasswords(val)) {
        if (!noShow) {
          this.passMsg = this.$t('m.errMessages.passwordErr')
        }
        return false
      }
      this.passMsg = false
      return true
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
    preSend() {
      if (!this.password) {
        this.passMsg = this.$t('m.errMessages.blankPass')
        return false
      }
      if (!this.verifyPass(this.password)) {
        return false
      }
      return true
    },
    sendCode() {
      if (this.cantClick) return
      if (!this.preSend()) {
        return false
      }
      this.tag === 'phone' ? this.sendUnbindSms('sms') : this.sendUnbindEmail('email')
    },

    async sendUnbindSms(type) {
      const res = await this.verify({ auth_action: 'unbind', type, phone_number: this.number, password: this.password })
      if (res.data.verify && res.data.verify.result.result === 'success') {
        this.codeMsg = ''
        this.countDown()
      } else {
        // TODO: 错误处理
        this.passMsg = serviceError(res)
      }
    },

    async sendUnbindEmail(type) {
      const res = await this.verify({
        auth_action: 'unbind',
        password: this.password,
        email: this.number,
        type,
      })
      if (res.data.verify && res.data.verify.result.result === 'success') {
        this.codeMsg = ''
        this.countDown()
      } else {
        // TODO: 错误处理
        this.passMsg = serviceError(res)
      }
    },

    confirmRemove() {
      if (this.btnType === 'default') {
        return
      }
      switch (this.tag) {
        case 'phone':
          this.unbindSms('sms')
          break
        case 'email':
          this.unbindEmail('email')
          break
        case 'google':
          this.unbindGoogle('')
          break
      }
    },
    async unbindGoogle() {
      if (!this.cantSubmit) return
      this.cantSubmit = false
      this.btnText = this.$t('m.btnText.submitting')
      const res = await this.appFactor({
        auth_action: 'unbind',
        otp: this.code,
        password: this.password,
      })
      if (res.data.appFactor && res.data.appFactor.result.result === 'success') {
        this.$notify.success(this.$t('m.successMessage.unbindGoogle'))
        setTimeout(() => {
          location.href = '/settings'
        }, 1500)
      } else {
        this.cantSubmit = true
        this.btnText = this.$t('m.relieve.confirm')
        this.codeMsg = serviceError(res)
      }
    },
    // // 解绑手机
    async unbindSms(type) {
      if (!this.cantSubmit) return
      this.cantSubmit = false
      this.btnText = this.$t('m.btnText.submitting')
      const res = await this.confirmFactor({
        auth_action: 'unbind',
        type,
        otp: this.code,
        password: this.password,
      })
      if (res.data.confirmFactor && res.data.confirmFactor.result.result === 'success') {
        this.$notify.success(this.$t('m.successMessage.unbindSms'))
        setTimeout(() => {
          location.href = '/settings'
        }, 1500)
      } else {
        this.cantSubmit = true
        this.btnText = this.$t('m.relieve.confirm')
        this.codeMsg = serviceError(res)
      }
    },

    // // 解绑邮箱
    async unbindEmail(type) {
      if (!this.cantSubmit) return
      this.cantSubmit = false
      this.btnText = this.$t('m.btnText.submitting')
      const res = await this.confirmFactor({
        auth_action: 'unbind',
        password: this.password,
        otp: this.code,
        type,
      })
      if (res.data.confirmFactor && res.data.confirmFactor.result.result === 'success') {
        this.$notify.success(this.$t('m.successMessage.unbindEmail'))
        setTimeout(() => {
          location.href = '/settings'
        }, 1500)
      } else {
        this.cantSubmit = true
        this.btnText = this.$t('m.relieve.confirm')
        this.codeMsg = serviceError(res)
      }
    },

    changePass() {
      this.passMsg = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.remove-bind_component {
  .history-wrap {
    padding: 30px 40px 0;
  }

  .remove-bind_form {
    margin: 70px auto;
    width: 400px;
    text-align: center;

    &.en {
      width: 450px;

      label {
        margin-left: 80px !important;
      }
    }

    .change-btn {
      margin-top: 48px;
    }
    .input-wrap {
      margin-top: 40px;
      position: relative;
      .label {
        position: relative;
      }
      label {
        margin-left: 50px;
        font-size: 12px;
        color: $color-assist2;
        float: left;
        font-weight: 500;
      }

      .send-wrap {
        display: inline-block;
      }

      .warning {
        position: absolute;
        right: 50px;
        top: 0;
        text-align: right;
        font-size: 12px;
        color: #ee4343;
        width: 300px;
        background: #ffffff;
        height: 30px;
        &.en {
          width: 300px;
          right: 75px;
        }
      }
      .warn {
        border-color: #ee4343;
      }
    }
  }
  .err-color {
    color: $color-error;
    margin-top: 10px;
  }
}
</style>
