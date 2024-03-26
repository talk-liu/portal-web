import VVerify from '@/components/verify'
import VDialog from '@/components/dialog'
import VAuthentic from '@/components/authentic'
import { mapState } from 'vuex'

export default {
  components: {
    VVerify,
    VDialog,
    VAuthentic,
  },
  data() {
    return {
      showDialog: false,
      showAuthDialog: false,
      showMsgDialog: false,
      twoFactors: '', // todo
      factorCode: '',
      factorType: '',
      errVisble: false,
      verifyNumber: '', // 验证的账号（手机号码或者邮箱号码）
      verifyType: '', // 验证的类型
    }
  },
  computed: {
    ...mapState('withdraw', ['withdrawMe']),
  },
  methods: {
    factors() {
      if (!this.withdrawMe) {
        return
      }
      const data = {
        app_enabled: this.withdrawMe.app_two_factor,
        email: this.withdrawMe.masked_two_factor_email,
        email_enabled: this.withdrawMe.email_two_factor,
        phone_number: this.withdrawMe.masked_phone_number,
        sms_enabled: this.withdrawMe.sms_two_factor,
      }
      if (!this.twoFactors) {
        this.twoFactors = data
      }
      let twoFactorsList = []
      if (this.twoFactors.app_enabled) {
        twoFactorsList.push({
          type: 'app',
          number: '',
        })
      }
      if (this.twoFactors.sms_enabled) {
        twoFactorsList.push({
          type: 'sms',
          number: this.twoFactors.phone_number,
        })
      }
      if (this.twoFactors.email_enabled) {
        twoFactorsList.push({
          type: 'email',
          number: this.twoFactors.email,
        })
      }
      this.showDialog = true
      this.twoFactorsList = twoFactorsList
    },
    closeAuth() {
      this.showAuthDialog = false
    },
    close() {
      this.showDialog = false
      this.showAuthDialog = false
      this.showMsgDialog = false
    },
    // 打开手机或者email弹框
    // 如果都没有绑定，就跳到绑定页
    showVerifyDialog(type) {
      // this.showAuthDialog = false
      // let index = 0
      // this.twoFactorsList.forEach((v, i) => {
      //   if (v.type === type) {
      //     index = i
      //   }
      // })
      // if (index !== 0) {
      //   this.twoFactorsList[index] = this.twoFactorsList.splice(0, index, this.twoFactorsList[index])[0]
      // }
      // 是否已经绑定过
      if (!this.twoFactors.sms_enabled && !this.twoFactors.email_enabled) {
        this.goBind(type)
      } else {
        this.verifyType = type
        this.verifyNumber =
          type === 'sms' ? this.twoFactors.phone_number : type === 'email' ? this.twoFactors.email : ''
        this.showDialog = true
      }
    },
  },
}
