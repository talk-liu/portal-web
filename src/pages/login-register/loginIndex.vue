<template>
  <login v-if="type !== 'h5'"/>
  <login-mobile v-else/>
</template>

<script>
import login from './login'
import loginMobile from './login-mobile'
import { mapGetters } from 'vuex'
export default {
  name: 'LoginIndex',
  components:{
    login,
    loginMobile
  },
  computed:{
    ...mapGetters('viewport', ['type'])
  }
}
</script>

<style lang="scss" scoped>

</style>