<template>
  <div>
    <mining v-if="type !=='h5' "></mining>
    <profit-mobile v-else></profit-mobile>
  </div>
</template>

<script>
import mining from './mining-pc'
import ProfitMobile from '../profit/profit-mobile'
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
    mining,
    ProfitMobile
  }
}
</script>