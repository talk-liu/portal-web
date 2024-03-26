<template>
  <div>
    <premiumClub v-if="type !=='h5' "></premiumClub>
    <premiumClub v-else></premiumClub>
  </div>
</template>

<script>
import premiumClub from './premiumClub'
// import atPrivilegeMobile from './premiumClub-mobile'
import { mapGetters } from 'vuex'
export default {
  name: 'index',
  components: {
    premiumClub
  },
  computed: {
    ...mapGetters('viewport', ['type']),
  },
}
</script>

