<template>
  <div class="tip" :style="{width: width + 'px'}">
    <span class="icon"></span><span>{{text}}</span>
  </div>
</template>
<script>
export default {
  props: ['text', 'width']
}
</script>

<style scoped lang="scss">
  .tip {
    color: #666666;
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    line-height: 18px;
    span {
      vertical-align: middle;
      &.icon {
        background: url(https://i.riostox.com/i/e1/e16572e85281bfcd027a826630113d6d.png) no-repeat;
        background-size: 100% 100%;
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 10px;
      }
      &:last-child {
        flex: 1;
      }
    }
  }
</style>

