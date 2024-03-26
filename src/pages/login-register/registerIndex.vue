<template>
  <register-new v-if="type!=='h5'"/>
  <register-mobile v-else/>
</template>

<script>
import registerNew from './register-new'
import registerMobile from './register-mobile'

import { mapGetters } from 'vuex'

export default {
  name:'RegisterIndes',
  components:{
    registerNew,
    registerMobile
  },
  computed:{
    ...mapGetters('viewport', ['type'])
  }
}
</script>

<style lang="scss" scoped>

</style>