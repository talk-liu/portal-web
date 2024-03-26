<template>
  <div class="depth-toggle">
    <div :class="['item',index == 0 ? 'current':'']" @click="click(0)">
      <span class="rectangle red"></span>
      <span class="rectangle gray"></span>
      <span class="rectangle green"></span>
    </div>
    <div :class="['item',index == 1 ? 'current':'']" @click="click(1)">
      <span class="rectangle green"></span>
      <span class="rectangle green"></span>
      <span class="rectangle green"></span>
    </div>
    <div :class="['item',index == 2 ? 'current':'']" @click="click(2)">
      <span class="rectangle red"></span>
      <span class="rectangle red"></span>
      <span class="rectangle red"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['toggle'],
  data() {
    return {
      index: this.toggle.idx,
      prev: this.toggle.prev,
    }
  },
  methods: {
    click(i) {
      this.prev = this.index
      this.index = i
      this.$emit('update:toggle', { idx: this.index, prev: this.prev })
    },
  },
}
</script>
<style lang="scss" scoped>
.depth-toggle {
  display: flex;
  justify-content: space-between;
  width: 80px;
  .item {
    padding: 1px 0;
    width: 20px;
    height: 20px;
    border-radius: 2px;
    border: 1px solid $color-assist3;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    cursor: pointer;
    &.current {
      cursor: default;
      background-color: $color-primary;
      border-color: $color-primary;
    }
    .rectangle {
      height: 2px;
      width: 12px;
      align-self: center;
    }
    .green {
      background-color: $color-assist5;
    }
    .red {
      background-color: $color-assist6;
    }
    .gray {
      background-color: $color-assist3;
    }
  }
}
</style>
