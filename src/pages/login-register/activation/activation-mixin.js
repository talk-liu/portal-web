import { mapActions, mapState } from 'vuex'
import serviceError from '@/utils/service-error'
import VInput from '@/components/input'

export default {
  ...mapActions('loginRegister', ['activationEmail']),
  created() {
    document.title = this.$t('m.pageTitle.activation')
  },
  data() {
    return {
      verifyRes: false,
      emailVerify: true,
      emailCode: '',
      errMessage: '',
    }
  },
  components: {
    VInput,
  },
  computed: {
    ...mapState('currentUser', ['currentUser']),
    email() {
      return this.currentUser && this.currentUser.email
    },
  },
  methods: {
    ...mapActions('loginRegister', ['activationEmail', 'activate']),
    async reWithdraw() {
      const res = await this.activationEmail({ email: this.email })
      if (res && res.data && res.data.activationEmail && res.data.activationEmail.result.result === 'success') {
        this.$notify.success(this.$t('m.successMessage.sendCode'))
      } else {
        this.$notify.error(serviceError(res))
      }
    },
  },
  watch: {
    async emailCode() {
      if (this.emailCode.length === 6) {
        const res = await this.activate({ code: this.emailCode })
        if (res && res.data && res.data.activate && res.data.activate.result.result === 'success') {
          this.$notify.success(this.$t('m.activationSuccess.message1'))
          const _this = this;
          setTimeout(() => {
            // window.open('https://ares-riostoxexchange.cynopsis.co')
            _this.$router.push(_this.$i18nRoute({
              name: 'IsKyc',
            }))
          }, 1000)
        } else {
          this.$notify.error(serviceError(res))
        }
      }
    },
  },
  mounted() {
    // this.reWithdraw()
  },
}
