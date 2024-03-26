<template>
  <div>
    <game v-if="type !=='h5' "></game>
    <gameMobile v-else></gameMobile>
  </div>
</template>

<script>
import game from './game-pc'
import gameMobile from './game-mobile'
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
    game,
    gameMobile
  }
}
</script>
