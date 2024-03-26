<template>
  <div>
    <records v-if="type !=='h5' "></records>
    <records-mobile v-else></records-mobile>
  </div>
</template>

<script>
import records from './records-pc'
import RecordsMobile from './records-mobile'
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
    records,
    RecordsMobile
  }
}
</script>