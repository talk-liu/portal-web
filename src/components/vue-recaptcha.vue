<template>
  <div
    class="g-recaptcha"
    :data-sitekey="captcha.key"
    data-callback="emitVerify"
    data-error-callback="emitError"
    data-expired-callback="emitExpired"
    v-if="captcha.provider === 'recaptcha_v2'"
    data-size="invisible"
  >
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapState('loginRegister', ['captcha']),
  },
  mounted() {
    const script = document.createElement('script')
    script.setAttribute('src', 'https://www.google.com/recaptcha/api.js?hl=' + (this.$fifth.isCn ? 'zh-CN' : 'en'))
    script.setAttribute('type', 'text/javascript')
    script.async = true
    script.defer = true
    document.body.appendChild(script)
    window.emitVerify = this.emitVerify
    window.emitExpired = this.emitExpired
    window.emitError = this.emitError
  },
  methods: {
    emitVerify(response) {
      this.$emit('recaptchaSuccess', { token: response, type: 'recaptcha' })
    },
    emitExpired() {
      if (window.grecaptcha) {
        window.grecaptcha.reset()
      }
    },
    emitError(err) {
      console.log(err)
    },
    verify() {
      if (window.grecaptcha) {
        window.grecaptcha.reset()
        window.grecaptcha.execute()
      } else {
        this.$emit('error')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.g-recaptcha {
  margin: 35px auto -15px;
}
</style>
