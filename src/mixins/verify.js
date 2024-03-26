import { mapActions } from 'vuex'
import serviceError from '@/utils/service-error'
export default {
  methods: {
    ...mapActions('twoFactor', ['twoFactor']),
    ...mapActions('loginRegister', ['forgetPsw', 'twoFrontendFactor']),
    checkType(index) {
      this.verifyItems[index] = this.verifyItems.splice(0, 1, this.verifyItems[index])[0]
      this.codeWarn = ''
      this.code = ''
      this.stopCountDown()
    },
    closeModal() {
      this.$emit('close')
    },
    stopCountDown() {
      clearInterval(this.t)
      this.cantClick = false
      this.sendBtnText = this.$t('m.btnText.sendCodeBtn')
    },
    input() {
      this.$emit('input')
    },
    bindOrFactor(type) {
      if (!this.cantSubmit) return
      this.cantSubmit = false
      if (!this.code) {
        this.codeWarn = this.$t('m.errMessages.firstVerifyCode')
        return
      }
      if (this.type === 'app') {
        this.factorsGoogle()
        return
      }
      if (this.disabled) {
        this.type === 'sms' ? this.factorsSms(type) : this.factorsEmail(type)
      }
    },
    factorsSms() {
      if (this.number && this.noFactors) {
        this.$emit('success', { number: this.number, code: this.code, type: 'sms' })
        return false
      }
    },
    factorsEmail() {
      if (this.number && this.noFactors) {
        this.$emit('success', { number: this.number, code: this.code, type: 'email' })
        return false
      }
    },
    async sendCode() {
      if (this.cantClick) return
      // 发送二次验证code
      if (this.disabled) {
        let res = null
        switch (this.interfaceType) {
          case 'forgetPsw':
            res = await this.forgetPsw({
              type: this.type,
              code: this.$route.params.code,
              email: sessionStorage.getItem('email'),
              refresh: true,
            })
            break
          case 'twoFrontendFactor':
            res = await this.twoFrontendFactor({
              type: this.type,
              refresh: true,
            })
            break
          default:
            res = await this.twoFactor({
              type: this.type,
              refresh: true,
            })
            break
        }

        this.callInterface(res, this.interfaceType || 'twoFactor')
      }
      this.countDown()
    },
    callInterface(res, v) {
      if (!(res && res.data && res.data[v] && res.data[v].result && res.data[v].result.result === 'success')) {
        {
          // 更新密码页停留时间过长，邮箱验证码已经过期回到上一页重新获取邮箱验证码
          if (this.isNeedAuth === false) {
            this.$notify.error(this.$t('m.resetPasswords.emailCodeOutOfTime'))
            setTimeout(() => {
              this.$router.replace(this.$i18nRoute({ name: 'resetPasswordsConfirm' }))
            }, 2000)
            return
          }
          this.codeWarn = serviceError(res)
          this.stopCountDown()
        }
      }
    },
    factorsGoogle() {
      this.$emit('success', { code: this.code, type: 'app' })
    },
    changeCode() {
      this.codeWarn = ''
      this.$emit('clear')
    },
  },
}
