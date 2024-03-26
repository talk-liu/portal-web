<template>
  <div class="th5-tabs">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'th5-tabs',
  props: {
    navItems: {
      type: Array,
      default() {
        return []
      },
    },
    count: {
      type: Number,
    },
    idx: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.bindItemsEvent()
      this.setCmpIndex()
    })
  },
  data() {
    return {
      index: this.idx,
    }
  },
  watch: {
    idx(val) {
      this.index = val
    },
    index: 'setCmpIndex',
    count: function() {
      // 子元素数量变化后要重新绑定事件
      this.$nextTick(() => {
        this.bindItemsEvent()
        this.setCmpIndex()
      })
    },
  },
  methods: {
    setCmpIndex() {
      let list = this.$children
      let index = this.index
      for (let i = 0; i < list.length; i++) {
        const cmp = list[i]
        cmp && Vue.set(cmp, 'isActive', index === i)
      }
    },
    bindItemsEvent() {
      let list = this.$children
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        item.$off('click', this.onNavClick)
        item.$on('click', this.onNavClick)
      }
    },
    onNavClick(idx) {
      this.$emit('update:idx', idx)
      this.index = idx
    },
  },
}
</script>

<style lang="scss" scoped>
.th5-tabs {
  display: flex;
  height: 40px;
  padding: 0 5px;
  line-height: 40px;
  justify-content: flex-start;
}
</style>
