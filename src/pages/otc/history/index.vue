<template>
  <div class="transaction-history">
    <list-pc v-if="type !== 'h5'"></list-pc>
    <list-h5 v-else></list-h5>
  </div>
</template>
<script>
import listPc from './list-pc'
import listH5 from './list-h5'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('viewport', ['type']),
  },
  components: {
    listPc,
    listH5,
  },
}
</script>
<style lang="scss" scoped>
.transaction-history {
  padding-bottom: 60px;
}
</style>
