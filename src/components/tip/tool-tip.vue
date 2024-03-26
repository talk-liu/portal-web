<template>
  <div class="info-tip_wrap dl" :style="{left: options.x + 'px', top: options.y + 'px'}" v-if="options.show">
    <div class='rate-validity-wrap' >
      <div class="info-text">
        <div class='rate th-en'>{{options.rate}}</div>
        <div class='validity th-en'>{{options.validity}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        show: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.info-tip_wrap {
  position: absolute;
  z-index: $zindex-tooltip;
  &.has-context:hover {
    .info-text {
      display: block;
    }
  }
  .info-text {
    z-index: $zindex-tooltip;
    padding: 12px;
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
