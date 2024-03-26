<template>
  <div>
    <atPrivilege v-if="type !=='h5' "></atPrivilege>
    <atPrivilegeMobile v-else></atPrivilegeMobile>
  </div>
</template>

<script>
import atPrivilege from './atPrivilege'
import atPrivilegeMobile from './atPrivilege-mobile'
import { mapGetters } from 'vuex'
export default {
  name: 'index',
  components: {
    atPrivilege,
    atPrivilegeMobile
  },
  computed: {
    ...mapGetters('viewport', ['type']),
  },
}
</script>

