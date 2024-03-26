import { mapState } from 'vuex'
// TODO: 可优化
export default {
  computed: {
    ...mapState('currentUser', ['currentUser']),
    ...mapState('withdraw', ['withdrawMe']),
  },
  methods: {
    isBind() {
      if (!this.withdrawMe) {
        return
      }
      const { sms_two_factor, email_two_factor, app_two_factor } = this.withdrawMe
      const type = this.$route.params.type
      if (type === 'phone' && sms_two_factor) {
        location.href = '/settings'
      }
      if (type === 'email' && email_two_factor) {
        location.href = '/settings'
      }
      if (type === 'google' && app_two_factor) {
        location.href = '/settings'
      }
    },
    isNotBind() {
      if (!this.withdrawMe) {
        return
      }
      const type = this.$route.params.type
      const { sms_two_factor, email_two_factor, app_two_factor } = this.withdrawMe
      if (type === 'phone' && !sms_two_factor) {
        location.href = '/settings'
      }
      if (type === 'email' && !email_two_factor) {
        location.href = '/settings'
      }
      if (type === 'google' && !app_two_factor) {
        location.href = '/settings'
      }
    },
  },
}
