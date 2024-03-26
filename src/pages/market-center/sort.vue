<template>
  <div class="sort-wrap">
    <div class="up" :class="{selected : data.sort ==='up'}" @click="sortClick('up')"></div>
    <div class="down" :class="{selected : data.sort ==='down'}" @click="sortClick('down')"></div>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Object, default: () => ({}) },
  },
  methods: {
    sortClick(type) {
      this.$emit('sortClick', { type, data: this.data })
    },
  },
}
</script>

<style lang='scss' scoped>
.sort-wrap {
  display: inline-block;
  cursor: pointer;
  .up {
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-bottom: 5px solid #bfbfbf;
    margin-bottom: 3px;
  }
  .up.selected {
    border-bottom: 5px solid #666666;
  }
  .down {
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 5px solid #bfbfbf;
  }
  .down.selected {
    border-top: 5px solid #666666;
  }
}
</style>
