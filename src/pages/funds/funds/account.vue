<template>
  <div>
    <account v-if="type !=='h5' "></account>
    <account-mobile v-else></account-mobile>
  </div>
</template>

<script>
import account from './account-pc'
import AccountMobile from './account-mobile'
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
    account,
    AccountMobile
  }
}
</script>