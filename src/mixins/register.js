import { isEmail, isPasswords, isInviteCode } from '@/utils/verify'
import getQueryString from '@/utils/getQueryString'
import { mapState, mapActions } from 'vuex'
import Cookies from '@/utils/cookies'
import captchaValidate from '@/mixins/captchaValidate'

const sha1 = require('js-sha1')

export default {
  created() {
    this.getRegisterActive()
    this.getInviteCode()
  },
  data() {
    return {
      aff: '',
      codeErr: '',
      showCodeErr: false,
      active: '',
      pcBgUrl: '',
      h5BgUrl: '',
      btnText: this.$t('m.register.experienceRegister'),
      email: '',
      password: '',
      rePassword: '',
      checked: false,
      showPassErr: false,
      showRepassErr: false,
      showEmailErr: false,
      emailErr: '',
      passErr: '',
      repassErr: '',
      limitErr: '',
      captchaErr: '',
      captchaIs:false,
      captchaObj:{}
    }
  },
  mixins: [captchaValidate],
  computed: {
    ...mapState('loginRegister', ['captcha', 'registerActiveTasks']),
    ...mapState('path', ['beforeSigninPath']),
    btnType() {
      return this.isSubmit() ? 'primary' : 'default'
    },
  },
  methods: {
    ...mapActions('loginRegister', ['signup', 'getRegisterActive']),
    resetBtnText() {
      this.btnText = this.$t('m.register.register')
    },
    submit() {
      if (this.isSubmit()) {
        this.verifyRecapcha()
      }
    },
    // 验证邀请码
    verifyInviteCode(val) {
      this.showCodeErr = false
      this.codeErr = ''
      if (val && !isInviteCode(val)) {
        this.showCodeErr = true
        this.codeErr = this.$t('m.errMessages.invitationCodeError')
        return false
      }
      return true
    },
    verifyRecapcha() {
      this.verify()
    },
    // 是否可以提交
    isSubmit() {
      return (
        this.checked &&
        this.password != '' &&
        this.rePassword != '' &&
        this.email != '' &&
        // this.invitation_token &&
        this.verifyEmail(this.email) &&
        this.verifyPass(this.password) &&
        this.verifyRepass() &&
        this.verifyInviteCode(this.aff)
      )
    },
    async validateSuccess(data) {
      if(!this.captchaIs){
        this.resetBtnText();
        return
      }
      if (this.isSubmit()) {
        this.btnText = this.$t('m.btnText.submitting')
        const captcha =
          data.type === 'geetest'
            ? {
              token: data.token,
              id_type: 3,
              id_value: sha1(this.email),
            }
            : {
              token: data.token,
            }
        const param = {
          ...captcha,
          email: this.email,
          password: this.password,
          password_confirmation: this.rePassword,
          // "invitation_token": this.invitation_token,
          aff: this.aff || '',
          utm_source: Cookies.getCookie('utm_source') || '',
          utm_medium: getQueryString('utm_medium') || '',
        }
        const res = await this.signup(param)
        if (res && res.data && res.data.signup && res.data.signup.result) {
          this.locationToPath()
        } else {
          this.resetBtnText()
          const { errorCode, message } = res.errors[0]
          if (errorCode === 2024) {
            this.showEmailErr = true
            this.emailErr = message
          } else if (errorCode === 2033) {
            this.captchaErr = this.$t('m.errMessages.captchaFail')
          }
          if(this.captchaObj.reset){
            this.captchaObj.reset()
          }
        }
      }
    },
    // 验证邮箱
    verifyEmail(val) {
      if (!val) {
        return false
      } else if (!isEmail(val) && val) {
        this.showEmailErr = true
        this.emailErr = this.$t('m.errMessages.emailErr')
        return false
      }
      return true
    },
    // 验证密码
    verifyPass(val) {
      this.showPassErr = false
      this.passErr = ''
      if (!val) {
        return false
      } else if (!isPasswords(val)) {
        this.showPassErr = true
        this.passErr = this.$t('m.errMessages.passwordErr')
        return false
      } else if (val.length > 24) {
        this.showPassErr = true
        this.passErr = this.$t('m.errMessages.passwordToLongErr')
        return false
      }
      return true
    },
    // 验证邀请码 <!-- 输入a码 -->
    // verifyCode() {
    //   this.showCodeErr = false
    //   this.codeErr = ''
    //   if (this.invitation_token != '') {
    //     this.showCodeErr = true
    //     this.codeErr = this.$t('m.errMessages.invitationCodeError');
    //     return false
    //   }
    //   return true
    // },
    // 验证确认密码
    verifyRepass() {
      this.showRepassErr = false
      this.repassErr = ''
      if (!isPasswords(this.rePassword)) {
        this.showRepassErr = true
        this.repassErr = this.$t('m.errMessages.passwordErr')
        return false
      } else if (this.rePassword.length > 24) {
        this.showRepassErr = true
        this.repassErr = this.$t('m.errMessages.passwordToLongErr')
        return false
      } else if (this.password !== this.rePassword && this.rePassword) {
        this.showRepassErr = true
        this.repassErr = this.$t('m.errMessages.repeatPasswordErr')
        return false
      }
      return true
    },
    // 验证人机校验
    recaptchaError() {
      this.captchaErr = this.$t('m.errMessages.captchaNotExist')
    },
    // 验证人机校验
    verifyRecaptcha(val) {
      if (!val) {
        this.showRepassErr = true
        this.repassErr = this.$t('m.errMessages.captchaNotExist')
        return false
      }
      return true
    },
    changeConfirm() {
      this.showRepassErr = false
    },
    changeEmail() {
      this.showEmailErr = false
    },
    changePass() {
      this.showPassErr = false
    },
    changeCode() {
      this.showCodeErr = false
    },
    getInviteCode() {
      this.aff = getQueryString('aff')
    },
    getActive() {
      const active = getQueryString('active')
      this.active = active
      if (active) {
        const list = this.registerActiveTasks
        if (list && list.length > 0) {
          for (let i = 0; i < list.length; i++) {
            if (list[i].title === active) {
              this.pcBgUrl = this.isCn ? list[i].pc_zn_img_url : list[i].pc_en_img_url
              this.h5BgUrl = this.isCn ? list[i].h5_zn_img_url : list[i].h5_en_img_url
              break
            }
          }
        }
      }
    },
    locationToPath() {
      location.href = this.beforeSigninPath
    }
  },
  watch: {
    registerActiveTasks() {
      if (this.registerActiveTasks.length > 0) {
        this.getActive()
      }
    },
  },
}
