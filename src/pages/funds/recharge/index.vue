<template>
  <div>
    <recharge v-if="type !=='h5' "></recharge>
    <recharge-mobile v-else></recharge-mobile>
  </div>
</template>

<script>
import recharge from './recharge'
import RechargeMobile from './recharge-mobile'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('viewport', ['type']),
  },
  components: {
    recharge,
    RechargeMobile
  }
}
</script>