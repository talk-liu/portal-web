<template>
  <div @click='closeDialog' class="dialog-wrap" v-if="visible">
    <div class="dialog-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['visible', 'maskClose'],
  methods: {
    closeDialog() {
      this.maskClose && this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: $zindex-modal-mask;
  .dialog-content {
    height: 100%;
  }
}
</style>
