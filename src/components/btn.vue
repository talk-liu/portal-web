<template>
  <div class="v-btn">
    <button
      @click.prevent="click"
      class="semi-bold"
      :class="classObj"
      :style="{height:height+'px',width:width+'px',borderRadius: borderRadius,borderColor: borderColor,fontSize: fontSize+ 'px',fontWeight:fontWeight, color:color,backgroundColor: backgroundColor, padding: padding}"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  props: [
    'type',
    'height',
    'width',
    'disabled',
    'small',
    'large',
    'fontSize',
    'borderColor',
    'borderRadius',
    'loading',
    'fontWeight',
    'color',
    'backgroundColor',
    'padding'
  ],
  computed: {
    classObj() {
      return {
        default: this.type === 'default',
        primary: this.type === 'primary',
        none: this.type === 'none',
        info: this.type === 'info',
        disabled: this.disabled,
        small: this.small,
        large: this.large,
      }
    },
  },

  methods: {
    click() {
      this.type !== 'default' && this.$emit('click')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.v-btn {
  button {
    height: 32px;
    width: 100%;
    line-height: 32px;
    font-size: 16px;
    text-align: center;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
    &.none {
      background-color: #f2f2f6;
      color: #cccccc;
      border: 0;
      font-weight: bold;
    }

    &.primary {
      background-color: $color-primary;
      color: $color-3;
      border: 1px solid $color-primary;
      box-shadow: 0 3px 6px 0 #03e8b0;
      &.small {
        background-color: $color-primary;
        color: $color-3;
        border-color: $color-primary;
        padding: 7px 15px;
        font-size: 14px;
        height: 30px;
        line-height: 0;
      }
      &.large {
        font-size: 18px;
      }

      &:hover {
        background-color: #09efb6;
        border: 1px solid #09efb6;
      }
      &:active {
        outline: 0;
        background-image: none;
        box-shadow: (inset 0 3px 5px rgba(0, 0, 0, 0.125));
      }
    }

    &.submitting {
      background-color: #ffd200b8;
      border: 1px solid #ffd200b8;
      color: $color-3;
    }

    &.default {
      background-color: #f4f4f4;
      color: #cccccc;
      border: 1px solid transparent;
      cursor: not-allowed;
    }

    &.info {
      padding: 0 28px;
      text-align: center;
      background: none;
      color: $color-3;
      font-size: 14px;
      height: 32px;
      line-height: 0;
      width: auto;
      border: 1px solid #bdc7d1;
      box-shadow: rgba(0, 0, 0, 0.02) 0 4px 4px 0;
      &.disabled {
        color: #cccccc;
      }
      &.disabled:hover {
        cursor: not-allowed;
      }

      &.large {
        color: $color-3;
        font-size: 18px;
        font-weight: normal;

        &:hover {
          background-color: #ffffff;
          color: $color-3;
          border-color: #bdc7d1;
        }
      }

      &.small {
        padding: 0 10px;
        color: #97a5b3;
        height: 30px;
        &:hover {
          background-color: #ffd200b8;
          border: 1px solid #ffd200b8;
          color: $color-3;
        }
      }
    }
  }
}
</style>
