<template>
  <label role="checkbox" class="th5-check-box">
    <span class="check-box__inner">
      <span class="check-box_inner" :class="{checked: val}" @click.self="click">

      </span>
    </span>
    <span class="label-3" @click.self="click">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      val: this.value,
    }
  },
  methods: {
    click() {
      this.val = !this.val
      this.$emit('input', this.val)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.th5-check-box {
  position: relative;
  white-space: nowrap;
  user-select: none;

  .check-box__inner {
    display: inline-block;
    width: 14px;
  }

  .checkbox-input {
    opacity: 0;
    outline: 0;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    z-index: -1;
  }

  .check-box_inner {
    display: inline-block;
    position: relative;
    top: 2px;
    width: 14px;
    height: 14px;
    border: 1px solid #dddddd;
    background-color: #ffffff;
    border-radius: 2px;
    cursor: pointer;
    transform-origin: center;

    &:after {
      content: '';
      height: 3px;
      width: 7px;
      position: absolute;
      left: 2px;
      top: 2px;
      // border-bottom: 2px solid $color-3;
      // border-left: 2px solid $color-3;
      border-bottom-width: 2px;
      border-bottom-style: solid;
      border-left-width: 2px;
      border-left-style: solid;
      transform: rotate(-45deg) scale(0);
      transition: all 0.2s ease-in-out;

      @include themify($themes) {
        color: themed('textColor9');
      }
    }

    &.checked {
      background-color: #ffffff;
      // color: $color-3;
      // border-color: $color-primary;
      @include themify($themes) {
        color: themed('textColor9');
      }

      &:after {
        transform: rotate(-45deg) scale(1);
      }
    }

    &:hover {
      // border-color: $color-primary;
      @include themify($themes) {
        color: themed('textColor9');
      }
    }
  }

  .label-3 {
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    font-size: 14px;
  }
}

.theme-dark {
  .th5-check-box {
    .check-box_inner {
      background-color: #1a1a1a;
      border: 1px solid #000000;
      &:after {
        border-color: rgba($color: #ffffff, $alpha: 0.35);
      }
      &.checked {
        background-color: #1a1a1a;
      }
    }
  }
}
</style>
