<template>
  <div :class='["th5-tab-item",isActive ? "current":""]' @click.stop='click' @mouseenter='mouseenter' :style="{fontSize: fontSize + 'px'}">
    {{text}}
    <slot name='label'></slot>
  </div>
</template>

<script>
export default {
  props: ['text', 'index', 'disabled', 'trigger', 'fontSize'],
  data() {
    return {
      isActive: 0,
    }
  },
  methods: {
    click() {
      if (!this.disabled && (this.trigger === 'click' || !this.trigger)) {
        this.$emit('click', this.index)
      }
    },
    mouseenter() {
      if (!this.disabled && this.trigger === 'mouseenter') {
        this.$emit('click', this.index)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.th5-tab-item {
  // color: $color-6;
  font-size: 13px;
  // font-weight: 600;
  cursor: pointer;
  position: relative;
  margin-right: 30px;

  @include themify($themes) {
    color: themed('textColor6');
  }
  &:last-child {
    margin-right: 0;
  }
  &.current {
    cursor: default;
    // color: $color-0;
    @include themify($themes) {
      color: themed('tabColor');
    }
  }
  &.current:after {
    content: '';
    // background-color: $color-0;
    height: 2px;
    width: 50%;
    position: absolute;
    bottom: 10%;
    left: 50%;
    margin-left: -25%;
    border-radius: 20%;

    @include themify($themes) {
      background-color: themed('tabActiveColor');
    }
  }
}
</style>
