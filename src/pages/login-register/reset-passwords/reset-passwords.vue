<template>
  <div class="reset-passwords_page">
    <v-box
      :title="$t('m.resetPasswords.resetPasswords')"
      height="385"
    >
      <div class="content-wrap">
        <form
          class="simple_form form-horizontal"
          novalidate="novalidate"
          name="resetForm"
          id="new_reset_password"
          accept-charset="UTF-8"
          method="post"
        >
          <v-input
            type="email"
            name="reset_password[email]"
            v-model="email"
            :placeholder="$t('m.resetPasswords.emailPlaceholder')"
            :showErrMsg="errMessage"
            :errMessage="errMessage"
            @blur="verifyEmail"
            @change="()=>{this.errMessage=''}"
            maxlength=40
          ></v-input>
          <br/>
          <div id="captchaBox"></div>
          <div class="recaptcha">
            <v-recaptcha
              ref='recaptcha'
              @error='recaptchaError'
              @recaptchaSuccess='validateSuccess'
            ></v-recaptcha>
          </div>
          <div class="btn">
            <v-btn
              id="submit"
              :type="btnType"
              @click="submit"
              :disabled="btnType === 'default'"
            >{{btnText}}</v-btn>
          </div>
        </form>
      </div>
    </v-box>
  </div>
</template>

<script>
import VRecaptcha from '@/components/vue-recaptcha'
import VInput from '@/components/input.vue'
import VBox from '@/components/box.vue'
import VBtn from '@/components/btn'
import { isEmail } from '@/utils/verify'
import captchaValidate from '@/mixins/captchaValidate'
const sha1 = require('js-sha1')
import { mapState, mapActions } from 'vuex'
export default {
  mixins: [captchaValidate],
  name: 'app',
  components: {
    VInput,
    VBox,
    VBtn,
    VRecaptcha,
  },
  data() {
    return {
      btnText: this.$t('m.resetPasswords.confirm'),
      recaptcha_res: '',
      email: '',
      isAuth: false,
      errMessage: '',
      captchaIs:false
    }
  },
  computed: {
    ...mapState('loginRegister', ['captcha']),
    btnType() {
      return this.preConfirm() ? 'primary' : 'default'
    },
  },
  created() {
    document.title = this.$t('m.pageTitle.resetPasswords')
    this.initValidate()
  },
  methods: {
    ...mapActions('loginRegister', ['forgetPassword']),
    resetBtnText() {
      this.btnText = this.$t('m.resetPasswords.confirm')
    },
    async validateSuccess({ token, type }) {
      if(!this.preConfirm()){
        return false
      }
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
        this.btnText = this.$t('m.btnText.submitting')
      } else {
        this.$notify.error(resp.errors[0].message)
      }
      this.confirm()
    },
    recaptchaSuccess(data) {
      this.recaptcha_res = data
    },
    submit() {
      if (this.preConfirm()) {
        this.errMessage = ''
        if (this.isRecapchaV2) {
          this.$refs.recaptcha.verify()
        } else {
          this.verify()
        }
      }
    },
    preConfirm() {
      return this.email && this.verifyEmail(this.email)
    },
    // 验证邮箱
    verifyEmail(val) {
      if (!val) {
        return false
      } else if (!isEmail(val) && val) {
        this.errMessage = this.$t('m.errMessages.emailErr')
        return false
      }
      if(!this.captchaIs){
        return false
      }
      return true
    },
    // 验证人机校验
    recaptchaError() {
      this.errMessage = this.$t('m.errMessages.captchaNotExist')
    },
    // 验证人机校验
    verifyRecaptcha(val) {
      if (!val) {
        this.errMessage = this.$t('m.errMessages.captchaNotExist')
        return false
      }
      return true
    },
    verifySuccess() {
      this.isAuth = true
    },
    confirm() {
      if (this.preConfirm()) {
        sessionStorage.setItem('email', this.email)
        this.$router.replace(this.$i18nRoute({
          name: 'resetPasswordsConfirm',
        }))
      }
    },
  },
}
</script>

<style lang="scss">
.reset-passwords_page {
  margin: 30px auto;
  width: 1104px;
  height: 585px;
  background: url('../../../assets/images/login-bg.png') no-repeat;
  background-size: cover;

  form.en {
    height: 50px;
  }

  .content-wrap {
    padding: 40px 100px;

    input {
      margin-top: 20px;
    }

    .btn {
      margin: 80px 0 0;
    }

    .err-message {
      font-size: 12px;
      color: $color-error;
    }
  }
}
</style>
