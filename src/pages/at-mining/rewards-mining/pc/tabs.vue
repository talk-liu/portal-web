<template>
  <div class="calculate-nav">
    <div @click="showData">
      <i class="iconfont" :class="iconData"></i>
      <span class="icon-text" :class="{fw:!tabIndex}">
        {{this.tabConfig[0].label}}
      </span>
    </div>
    <div @click="showCanvas">
      <i class="iconfont" :class="iconCanvas"></i>
      <span class="icon-text" :class="{fw:tabIndex}">{{this.tabConfig[1].label}}</span>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tabIndex: 0,
    }
  },
  props: ['tabConfig'],
  computed: {
    iconCanvas() {
      return {
        'icon-ArtboardCopy1': !this.tabIndex,
        'icon-ArtboardCopy': this.tabIndex,
      }
    },
    iconData() {
      return {
        'icon-ArtboardCopy2': !this.tabIndex,
        'icon-Artboard': this.tabIndex,
      }
    },
  },
  methods: {
    showData() {
      this.tabIndex = 0
      this.$emit('tabIndex', 0)
    },
    showCanvas() {
      this.tabIndex = 1
      this.$emit('tabIndex', 1)
    },
  },
}
</script>

<style lang='scss' scoped>
// pc nav
.calculate-nav {
  position: absolute;
  top: 20px;
  // left: 35px;
  z-index: $zindex-sticky;

  & > div {
    display: inline-block;
    cursor: pointer;
  }

  .icon-ArtboardCopy1,
  .icon-Artboard {
    color: $color-255-normal;
  }
  .icon-ArtboardCopy,
  .icon-ArtboardCopy2 {
    color: $color-255;
  }
  i {
    display: inline-block;
    margin-left: 1px;
    font-size: 25px;
    cursor: pointer;
    vertical-align: sub;
  }
  .icon-text {
    margin-left: 5px;
    margin-right: 45px;
    font-size: 16px;
    color: $color-255-normal;
  }
  .fw {
    color: $color-255;
    font-weight: 500;
  }
}
</style>
