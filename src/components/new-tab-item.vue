<template>
  <div class="new-tabs-item" :name="name" :class="{active: select===name}">
    {{label}}
  </div>
</template>

<script>
export default {
  props: ['label', 'name', 'select'],
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.new-tabs-item {
  position: relative;
  display: inline-block;
  margin: 0 20px;
  font-size: 14px;
  color: $color-assist7;
  cursor: pointer;

  &.active {
    color: $color-text;
    font-weight: 500;
  }

  &:nth-last-of-type() {
    margin-right: 0;
  }

  &:nth-of-type(1) {
    margin-left: 0;
  }
}
</style>
