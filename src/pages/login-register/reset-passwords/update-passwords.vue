<template>
  <div class="reset-passwords_page">
    <v-box :title="resetTitle">
      <div class="content-wrap">
        <form
          class="simple_form form-horizontal"
          novalidate="novalidate"
          name="updateForm"
          id="new_reset_password"
        >
          <v-input
            type="password"
            name="reset_password[password]"
            v-model="newPasswords"
            :placeholder="$t('m.register.passwordPlaceholder')"
            @blur="verifyPass(newPasswords)"
            @change="()=>{this.passErr=''}"
            :showErrMsg="passErr"
            :errMessage="passErr"
          ></v-input>
          <v-input
            type="password"
            v-model="repetPasswords"
            :placeholder="$t('m.updatePassword.confirmpassword')"
            :showErrMsg="errMessage"
            :errMessage="errMessage"
            @input="verifyRepeat"
          ></v-input>
          <div class="btn">
            <v-btn
              :type="btnType"
              @click="confirm"
            >{{btnText}}</v-btn>
          </div>
        </form>
      </div>
    </v-box>
    <v-dialog
      v-if='showDialog && twoFactorsList.length >0'
      :visible="showDialog && twoFactorsList.length >0"
      width="300px"
      @close="close"
    >
      <v-verify
        :verifyList='twoFactorsList'
        :hideClose='true'
        @success="verifySuccess"
        methods="patch"
        noFactors="true"
        :acceptWarn="twoFactorErrMessage"
        @clear="()=>{this.twoFactorErrMessage=false}"
        :params="sendParams"
        interfaceType='forgetPsw'
      ></v-verify>
    </v-dialog>
  </div>
</template>

<script>
import VInput from '@/components/input.vue'
import VBox from '@/components/box.vue'
import VBtn from '@/components/btn'
import VDialog from '@/components/dialog'
import VVerify from '@/components/verify'
import { isPasswords } from '@/utils/verify'
import factors from '@/mixins/factors'
import { mapActions } from 'vuex'
import serviceError from '@/utils/service-error'

export default {
  mixins: [factors],
  components: {
    VInput,
    VBox,
    VBtn,
    VVerify,
    VDialog,
  },
  data() {
    return {
      newPasswords: '',
      repetPasswords: '',
      isAuth: false,
      errMessage: '',
      twoFactorErrMessage: '',
      passErr: '',
      resetTitle: this.$t('m.updatePassword.title'),
      pageToken: location.pathname.split('/')[2],
      btnText: this.$t('m.updatePassword.confirm'),
    }
  },
  computed: {
    btnType() {
      return this.newPasswords && this.repetPasswords && this.isSame() && this.verifyPass(this.newPasswords)
        ? 'primary'
        : 'default'
    },
    sendParams() {
      return {
        'reset_password[token]': this.pageToken,
      }
    },
  },

  created() {
    document.title = this.$t('m.pageTitle.resetPasswords')
  },

  methods: {
    ...mapActions('loginRegister', ['resetForgetPassword']),
    // 验证两次密码是否相同
    isSame() {
      return this.newPasswords === this.repetPasswords
    },
    verifyRepeat() {
      this.errMessage = ''
      if (!isPasswords(this.repetPasswords)) {
        this.errMessage = this.$t('m.updatePassword.passFormatError')
        return false
      } else if (this.repetPasswords.length > 24) {
        this.errMessage = this.$t('m.errMessages.passwordToLongErr')
        return false
      } else if (!this.isSame()) {
        this.errMessage = this.$t('m.updatePassword.passDisaffinityError')
        return false
      }
      return true
    },
    // 验证密码格式
    verifyPass(val) {
      if (!isPasswords(val)) {
        this.passErr = this.$t('m.updatePassword.passFormatError')
        return false
      } else if (val.length > 24) {
        this.passErr = this.$t('m.errMessages.passwordToLongErr')
        return false
      }
      return true
    },
    // 点击重置
    async confirm() {
      if (!this.isSame()) {
        this.errMessage = this.$t('m.updatePassword.passDisaffinityError')
        return
      }
      if (!this.verifyPass(this.newPasswords)) {
        return
      }
      this.btnText = this.$t('m.btnText.submitting')
      this.needToFactors(JSON.parse(sessionStorage.getItem('two_factors')))
      if (this.twoFactorsList.length === 0) {
        this.email = sessionStorage.getItem('email')
        const res = await this.resetForgetPassword({
          email: this.email,
          password: this.newPasswords,
          code: this.$route.params.code,
        })
        if (res.data.resetForgetPassword && res.data.resetForgetPassword.result.result === 'success') {
          this.$router.replace(this.$i18nRoute({ name: 'resetSuccessLogin' }))
        } else {
          // 邮箱验证码过期
          if (res.errors[0].errorCode === 2041) {
            this.emailCodeOverdueBack()
            return
          }
          this.btnText = this.$t('m.updatePassword.confirm')
          this.$notify.error(serviceError(res))
        }
      }
    },
    emailCodeOverdueBack() {
      this.$notify.error(this.$t('m.resetPasswords.emailCodeOutOfTime'))
      setTimeout(() => {
        this.$router.replace(this.$i18nRoute({ name: 'resetPasswordsConfirm' }))
      }, 2000)
    },
    // 二步验证成功
    async verifySuccess({ code = '', type = '' }) {
      this.email = sessionStorage.getItem('email')
      const res = await this.resetForgetPassword({
        email: this.email,
        password: this.newPasswords, // 新旧密码
        code: this.$route.params.code, // 邮箱验证码
        otp: code, // 二次验证code
        type, // 二次验证类型
      })
      if (res.data.resetForgetPassword && res.data.resetForgetPassword.result.result === 'success') {
        this.$router.replace(this.$i18nRoute({ name: 'resetSuccessLogin' }))
      } else {
        // 邮箱验证码过期
        if (res.errors[0].errorCode === 2041) {
          this.emailCodeOverdueBack()
          return
        }
        this.btnText = this.$t('m.updatePassword.confirm')
        this.twoFactorErrMessage = serviceError(res)
      }
    },
    needToFactors(res) {
      if (!res) {
        return
      }
      const twoFactorsList = []
      if (res.app_two_factor) {
        twoFactorsList.push({
          type: 'app',
          number: '',
        })
      }
      if (res.sms_two_factor) {
        twoFactorsList.push({
          type: 'sms',
          number: res.masked_phone_number,
        })
      }
      if (res.email_two_factor) {
        twoFactorsList.push({
          type: 'email',
          number: res.masked_two_factor_email,
        })
      }
      this.showDialog = true
      this.twoFactorsList = twoFactorsList
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

  .confirm-mail-box {
    margin: 0 110px;
    color: $color-assist1;
    font-size: 16px;
    text-align: center;

    h4 {
      font-size: 22px;
      color: $color-assist1;
    }

    .retry-btn {
      margin: 55px auto;
      display: block;
      width: 150px;
      height: 40px;
      line-height: 40px;
      color: $color-assist3;
      font-size: 15px;
      border-radius: 3px;
      box-shadow: rgba(0, 0, 0, 0.02) 0 4px 4px 0;

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
  }
}
</style>
