<template>
  <div class="box-wraps" :class="{noshadow: showClose,fixed: isFixed}" :style="{height:height+'px','min-height': minHeight+'px',width:width+'px'}">
    <div class="title">
      <span v-if="showClose" :class="{close:showClose}" @click="closeDialog">
        <i class="iconfont icon-guanbi"></i>
      </span>
      <span>{{title}}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['title', 'showClose', 'height', 'isFixed', 'active', 'minHeight', 'width'],
  methods: {
    closeDialog() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.box-wraps {
  width: 500px;
  min-height: 450px;
  border-radius: 4px;
  text-align: center;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.05) 0 5px 20px 0;
  border: 1px solid $color-line;
  margin: 108px auto;

  @include themify($themes) {
    background-color: themed('wrapBgColor');
  }
  &.noshadow {
    border: none;
  }

  .title {
    position: relative;
    padding: 19px 0;
    font-size: 20px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    background-color: #ffffff;
    span {
      color: #242433;
    }

    @include themify($themes) {
      border-color: themed('lineBorderColorD8');
    }

    @include themify($themes) {
      color: themed('textColor3');
    }
    .close {
      position: absolute;
      display: block;
      top: 23px;
      font-size: 16px;
      right: 20px;
      cursor: pointer;
    }
  }
}

.fixed {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 0;
}

.theme-dark {
  .box-wrap {
    .title {
      background-color: #ffffff;
      border-bottom: 1px solid #333333;
      color: rgba(36, 36, 51, 1);
    }
  }
}
</style>
