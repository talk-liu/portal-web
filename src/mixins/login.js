const sha1 = require('js-sha1')
import { isEmail, isPasswords } from '@/utils/verify'
import { mapState, mapActions, mapMutations } from 'vuex'
import VRecaptcha from '@/components/vue-recaptcha'
import VBox from '@/components/box.vue'
import VBtn from '@/components/btn'
import captchaValidate from '@/mixins/captchaValidate'
import serviceError from '@/utils/service-error'
import getQueryString from '@/utils/getQueryString'

const whiteList = [
  'https://distributor.riostox.com',
  'https://distributor.riostox.com',
  'https://distributor.riostox.com',
]

export default {
  created() {
    document.title = this.$t('m.pageTitle.login')
  },
  data() {
    return {
      recaptcha_res: '',
      cantSubmit: true,
      btnText: this.$t('m.login.title'),
      verifyList: [],
      email: '',
      password: '',
      confirmCode: '',
      canClick: true, // 防止连续点击获取验证码
      text: this.$t('m.login.sendCode'),
      confirmErr: this.$t('m.login.inputSmsCode'),
      emailErr: '',
      isAuth: false,
      showConfirmMsg: false,
      errMessage: '',
      twoFactorsList: [],
      showDialog: false,
      captchaIs: false,
      captchaObj: {},
    }
  },
  mixins: [captchaValidate],
  components: {
    VBox,
    VBtn,
    VRecaptcha,
  },
  computed: {
    ...mapState('loginRegister', ['captcha']),
    ...mapState('path', ['beforeSigninPath']),
    confirmBtnType() {
      return this.confirmCode.length > 0 ? 'primary' : 'default'
    },
    btnType() {
      return this.isSubmit() ? 'primary' : 'default'
    },
  },
  methods: {
    ...mapActions('loginRegister', ['signin', 'authTwoFactor']),
    ...mapMutations('currentUser', ['setCurrentUser']),
    factors(resp) {
      const data = {
        app_enabled: resp.app_two_factor,
        email: resp.masked_two_factor_email,
        email_enabled: resp.email_two_factor,
        phone_number: resp.masked_phone_number,
        sms_enabled: resp.sms_two_factor,
      }
      if (data.app_enabled) {
        this.twoFactorsList.push({
          type: 'app',
          number: '',
        })
      }
      if (data.sms_enabled) {
        this.twoFactorsList.push({
          type: 'sms',
          number: data.phone_number,
        })
      }
      if (data.email_enabled) {
        this.twoFactorsList.push({
          type: 'email',
          number: data.email,
        })
      }
      if (this.twoFactorsList.length > 0) {
        this.showDialog = true
      }
    },
    resetBtnText() {
      this.cantSubmit = true
      this.btnText = this.$t('m.login.title')
    },
    isSubmit() {
      return this.verifyEmail(this.email) && this.verifyPass(this.password)
    },
    submit() {
      if (this.isSubmit()) {
        this.verifyRecapcha()
      }
    },
    verifyRecapcha() {
      this.verify()
    },
    async verifySuccess(data) {
      const param = {
        email: this.email,
        type: data.type,
        otp: data.code,
      }
      const res = await this.authTwoFactor(param)
      if (res && res.data && res.data.authTwoFactor) {
        this.locationToPath()
      } else {
        this.errMessage = serviceError(res)
      }
    },
    // 发送验证码
    sendCode() {
      if (this.confirmCode === '' || !this.canClick) return
      // 发送请
      this.countDown()
    },
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
    // 验证邮箱
    verifyEmail(val) {
      this.emailErr = ''
      if (!val) {
        return false
      } else if (val && !isEmail(val)) {
        this.emailErr = this.$t('m.errMessages.emailErr')
        return false
      }
      return true
    },
    // 验证密码
    verifyPass(val) {
      this.errMessage = ''
      if (!val) {
        return false
      } else if (!isPasswords(val)) {
        this.errMessage = this.$t('m.errMessages.passwordErr')
        return false
      } else if (val.length > 24) {
        this.errMessage = this.$t('m.errMessages.passwordToLongErr')
        return false
      }
      return true
    },
    // 倒计时60s
    countDown() {
      this.canClick = false
      this.text = '60s'
      let second = 60
      setInterval(() => {
        if (second === 0) {
          this.text = this.$t('m.login.sendCode')
          this.canClick = true
        } else {
          second--
          this.text = second + 's'
        }
      }, 1000)
    },
    async validateSuccess(data) {
      console.log('validate success data[' + JSON.stringify(data) + ']')
      const captcha = {
        token: data.token,
        id_type: 3,
        id_value: sha1(this.email),
      }
      const param = {
        email: this.email,
        password: this.password,
        ...captcha,
      }
      if (this.verifyEmail(this.email)) {
        if (!this.cantSubmit) {
          return
        }
        if (!this.captchaIs) {
          this.resetBtnText()
          return
        }
        this.btnText = this.$t('m.btnText.submitting')
        this.cantSubmit = false
        const res = await this.signin(param)
        console.log(JSON.stringify(res), 9999)
        if (res.data.signin && res.data.signin.result) {
          const result = res.data.signin.result
          if (result.two_factors) {
            this.factors(result)
            return
          }
          console.log('validate success result[' + JSON.stringify(result) + ']')

          if (!result.activated || result.activated === null) {
            // this.$router.replace(this.$i18nRoute({ path: '/activations' }))
            this.setCurrentUser(result)
            location.href = '/activations?exchange=riostox'
            return
          }
          if (result.force_kyc) {
            this.setCurrentUser(result)
            // window.open('https://ares-riostoxexchange.cynopsis.co')
            location.href = '/en/identitys'
            return
          }
          if (!result.two_factors) {
            this.locationToPath()
          }
        } else {
          this.resetBtnText()
          console.log(serviceError(res))
          this.$notify.error(serviceError(res))
          if (this.captchaObj.reset) {
            this.captchaObj.reset()
          }
        }
      }
    },
    locationToPath() {
      let host
      if (getQueryString('from')) {
        const from = decodeURIComponent(getQueryString('from'))
        if (whiteList.includes(from)) {
          host = from
        }
      }
      location.href = host ? host : this.beforeSigninPath
    },
  },
}
