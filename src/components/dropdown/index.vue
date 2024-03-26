<template>
  <div
    class="v-drop-down"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    @click="changeShow"
  >
    <slot name="content"></slot>
    <ul class="drop-list clearfix" @click.stop="clickItem" ref="droplist">
      <slot name="list"></slot>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    }
  },
  methods: {
    clickItem(e) {
      this.$refs.droplist.style.transform = 'scaleY(0)'
      this.$emit('mouseleave', e)
      setTimeout(() => {
        this.open = false
      }, 400)
    },
    mouseenter() {
      if (!this.open) {
        this.open = true
        setTimeout(() => {
          this.$refs.droplist.style.transform = 'scaleY(1)'
          this.$emit('mouseenter')
        }, 0)
      }
    },
    mouseleave() {
      this.$refs.droplist.style.transform = 'scaleY(0)'
      this.$emit('mouseleave')
      this.open = false
    },
    changeShow() {
      this.open ? this.mouseleave() : this.mouseenter()
    },
  },
}
</script>

<style lang="scss" scoped>
.v-drop-down.lang-change-wrap {
  .drop-list {
    width: 180px;
    right: 0;
    padding-left: 10px;

    li {
      display: inline-block;
      min-width: 75px;
      margin-right: 5px;
      margin-left: 0;
    }
  }
}

.v-drop-down {
  position: relative;
  color: $color-1;
  height: 100%;
  &:hover {
    // .selected-item {
    //   background-color: $color-3;
    //   color: $color-primary;
    // }
    .drop-list {
      display: block;
    }
  }
  .drop-list {
    display: none;
    position: absolute;
    padding: 10px 0;
    min-width: 140%;
    max-height: 500px;
    transform: scaleY(0);
    transform-origin: top center;
    box-shadow: rgba($color: $color-0, $alpha: 0.05) 0 10px 10px;
    transition: all 0.3s;
    z-index: $zindex-dropdown;
    overflow-x: hidden;
    // background-color: $color-255;
    @include themify($themes) {
      background-color: themed('dropBgColor');
    }
    li {
      margin: 0 10px;
      list-style: none;
      // cursor: pointer;
      font-size: $font-size-base;
      border-radius: $border-radius-base;
      color: $color-6;
      &:hover {
        // background-color: $color-primary;
        // color: $color-3;
        @include themify($themes) {
          color: themed('dropTextHoverColor');
          background-color: themed('primaryColor');
        }
        a {
          color: $color-3;

          @include themify($themes) {
            color: themed('dropTextHoverColor');
          }
        }
      }
      a {
        padding: 10px 10px;
        white-space: nowrap;
        display: block;
        width: 100%;
        height: 100%;
        text-decoration: none;
        // color: $color-6;
        @include themify($themes) {
          color: themed('textColor6');
        }
      }
    }
  }
}
</style>
