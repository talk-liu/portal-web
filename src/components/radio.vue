<template>
  <div
    class="th5-radio fm"
    :class="{disabled:disabled, checked: checked}"
    :style="{color: color}"
    @click="click"
  >
    <span :class="{checked: checked}"></span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['label', 'name', 'disabled', 'color'],
  data() {
    return {
      checked: Boolean(this.label),
    }
  },
  watch: {
    label(val) {
      this.checked = val
    },
  },
  methods: {
    click() {
      if (!this.disabled && !this.checked) {
        this.$emit('click')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.th5-radio {
  display: inline-block;
  cursor: pointer;

  &.disabled {
    cursor: not-allowed;
    color: #999999;
  }
  &.checked {
    color: #333333;
  }

  &:not(:nth-last-child(1)) {
    margin-right: 20px;
  }

  span {
    display: inline-block;
    position: relative;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid #cccccc;
    vertical-align: sub;

    &.checked {
      border-color: $color-text;
    }

    &.checked:before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: $color-text;
    }
  }

  &:hover {
    & > span {
      border-color: $color-text;
    }
  }
}
</style>
