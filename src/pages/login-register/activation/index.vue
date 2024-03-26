<template>
  <component v-bind:is='currentView'></component>
</template>

<script>
import activations from './activation'

export default {
  created() {
    this.currentView = this.$route.name
  },
  components: {
    activations,
  },
  watch: {
    $route() {
      this.currentView = this.$route.name
    },
  },
}
</script>