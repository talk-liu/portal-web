<template>
  <div>
    <profit v-if="type !=='h5' "></profit>
    <profit-mobile v-else></profit-mobile>
  </div>
</template>

<script>
import profit from './profit-pc'
import ProfitMobile from './profit-mobile'
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
    profit,
    ProfitMobile
  }
}
</script>