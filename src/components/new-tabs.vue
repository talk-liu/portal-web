<template>
  <div class="new-tabs-wrap clearfix" @click="tabClick">
    <div>
      <span class="tab-bar" :style="{width:width+'px',left:left+'px'}"></span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      width: 0,
      left: 0,
      tabData: {},
    }
  },
  created() {
    window.addEventListener('load', () => {
      this.initData()
    })
  },
  watch: {
    value() {
      this.initTabBar()
    },
  },
  methods: {
    initData() {
      const tabItems = document.querySelectorAll('.new-tabs-item')
      tabItems.forEach(ele => {
        let obj = {}
        obj.width = ele.offsetWidth
        obj.left = ele.offsetLeft
        this.tabData[ele.getAttribute('name')] = obj
      })
    },
    initTabBar() {
      if (this.tabData[this.value]) {
        this.width = this.tabData[this.value].width
        this.left = this.tabData[this.value].left
      }
    },
    tabClick(e) {
      if (!e.target.getAttribute('name')) {
        return
      }
      this.$emit('tab-click', e.target.getAttribute('name'))
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.new-tabs-wrap {
  position: relative;
  margin-bottom: 10px;

  & > div {
    position: relative;
    height: 50px;
  }

  .tab-bar {
    display: block;
    position: absolute;
    bottom: 0;
    height: 1px;
    background-color: $color-text;
    transition:
      all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
</style>
