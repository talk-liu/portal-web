<template>
  <component :is='currentView'></component>
</template>

<script>
import resetPasswordsNew from './reset-passwords'
import resetPasswordsEdit from './update-passwords'
import resetPasswordsConfirm from './reset-passwords-confirm'
import resetSuccessLogin from './reset-success-login'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      currentView: ''
    }
  },
  created() {
    this.currentView = this.$route.name
  },
  components: {
    resetPasswordsNew,
    resetPasswordsEdit,
    resetPasswordsConfirm,
    resetSuccessLogin
  },
  watch: {
    $route() {
      this.currentView = this.$route.name
    },
  },
  methods: {
    ...mapActions('loginRegister', ['getCaptcha']),
  },
  mounted() {
    this.getCaptcha()
  },
}
</script>
