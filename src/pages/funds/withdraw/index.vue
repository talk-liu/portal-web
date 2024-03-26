<template>
  <div>
    <withdraw v-if="type !=='h5' "></withdraw>
    <withdraw-mobile v-else></withdraw-mobile>
  </div>
</template>

<script>
import withdraw from './withdraw'
import WithdrawMobile from './withdraw-mobile'
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
    withdraw,
    WithdrawMobile
  }
}
</script>