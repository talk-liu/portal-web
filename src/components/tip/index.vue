<template>
  <div @click.stop class="info-tip_wrap dl" :class="{'has-context': hasContext}">
    <slot name='img'></slot>
    <div class="info-text">
      <slot name='info'></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl:{
      type:String,
      default:'../assets/images/tips.png'
    },
    hasContext: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>

.info-tip_wrap {
  position: relative;
  &.has-context:hover {
    .info-text {
      display: block;
    }
  }

  img {
    margin-left: 2px;
    vertical-align: bottom;
    cursor: pointer;
  }

  .info-text {
    z-index: $zindex-popover;
    display: none;
    position: absolute;
    top: 25px;
    left: -67px;
    padding: 12px;
    white-space: nowrap;
    text-align: left;
    font-size: 12px;
    background-color: #fffdf4;
    border: 1px solid $color-primary;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.08) 0 4px 7px 0;

    &:before {
      content: '';
      width: 6px;
      height: 6px;
      border-top: 1px solid $color-primary;
      border-right: 1px solid $color-primary;
      transform: rotate(-45deg);
      top: -4px;
      left: 72px;
      position: absolute;
      background: #fffdf4;
    }
  }
}
</style>
