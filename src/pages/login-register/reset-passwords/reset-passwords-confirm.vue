<template>
  <div>
    <v-box :title="$t('m.resetPasswords.emailVerify')">
      <div
        class="confirm-mail-box"
        :class="{en:$fifth.lang!=='zh-CN'}"
      >
        <div>
          <h4>{{outputEmail}}</h4>
        </div>

        <div>
          {{$t('m.resetPasswords.sendInfo')}}
        </div>
        <v-input
          class='email-code'
          type="password"
          v-model="emailCode"
          :errMessage='errMessage'
          :showErrMsg='errMessage'
          :placeholder="$t('m.login.inputSmsCode')"
        ></v-input>
        <a
          href="javascript:;"
          @click="submit"
          class="retry-btn reset-btn"
        >
          <i class="iconfont icon-zhongfayoujian"></i>
          {{$t('m.resetPasswords.resend')}}
        </a>
      </div>
      <v-recaptcha
        ref='recaptcha'
        @error='recaptchaError'
        @recaptchaSuccess='validateSuccess'
      ></v-recaptcha>
    </v-box>
  </div>

</template>

<script>
import VBox from '@/components/box.vue'
import VInput from '@/components/input.vue'
import { mapActions } from 'vuex'
import VRecaptcha from '@/components/vue-recaptcha'
import captchaValidate from '@/mixins/captchaValidate'
const sha1 = require('js-sha1')

export default {
  created() {
    this.initValidate()
  },
  data() {
    return {
      emailCode: '',
      outputEmail: sessionStorage.getItem('email'),
      errMessage: '',
      showDialog: false,
    }
  },
  mixins: [captchaValidate],
  components: {
    VBox,
    VInput,
    VRecaptcha,
  },
  methods: {
    ...mapActions('loginRegister', ['forgetPasswordCode']),
    ...mapActions('loginRegister', ['forgetPassword']),
    // 重发邮件
    submit() {
      this.email = sessionStorage.getItem('email')
      if (this.isRecapchaV2) {
        this.$refs.recaptcha.verify()
      } else {
        this.verify()
      }
    },
    // 验证人机校验
    recaptchaError() {
      this.errMessage = this.$t('m.errMessages.captchaNotExist')
    },
    async validateSuccess({ token, type }) {
      const params =
        type === 'geetest'
          ? {
            email: this.email,
            token,
            id_type: 3,
            id_value: sha1(this.email),
          }
          : { token, email: this.email }
      const resp = await this.forgetPassword(params)
      if (resp.data.forgetPassword && resp.data.forgetPassword.result.result === 'success') {
        // this.btnText = this.$t('m.btnText.submitting')
      } else {
        this.$notify.error(resp.errors[0].message)
      }
    },
  },
  watch: {
    emailCode() {
      if (this.emailCode.length === 6) {
        this.email = sessionStorage.getItem('email')
        this.forgetPasswordCode({ email: this.email, code: this.emailCode }).then(e => {
          if (e.data.forgetPasswordCode && e.data.forgetPasswordCode.result) {
            sessionStorage.setItem('two_factors', JSON.stringify(e.data.forgetPasswordCode.result))
            this.$router.replace(this.$i18nRoute({
              name: 'resetPasswordsEdit',
              params: {
                code: this.emailCode
              },
            }))
          } else {
            this.errMessage = e.errors[0].message
          }
        })
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.confirm-mail-box {
  margin: 0 70px;
  color: $color-assist1;
  font-size: 16px;
  text-align: center;

  &.en {
    margin: 0 50px;
  }

  h4 {
    font-size: 22px;
    color: $color-assist1;
  }

  .retry-btn {
    margin: 55px auto;
    display: inline-block;
    min-width: 150px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #bdc7d1;
    color: $color-assist3;
    font-size: 15px;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.02) 0 4px 4px 0;
    padding: 0 15px;
    &.reset-btn {
      margin: 0 auto;
    }

    i {
      font-size: 16px;
      vertical-align: middle;
    }
  }

  div {
    font-size: 16px;

    &:nth-of-type(1) {
      padding: 80px 0 30px;
    }

    &:nth-of-type(2) {
      position: relative;
    }
  }
  .email-code {
    margin: 20px auto 80px auto;
  }
}
</style>
