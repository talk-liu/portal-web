<template>
  <div class="input-normal_wrap">
    <input
      class="input"
      :class="{disabled: disabled,error:showErr,center:center}"
      :type="type"
      :placeholder="placeholder"
      :name="name"
      v-model="val"
      @input="input"
      @blur="blur"
      :style="{width:width +'px'}"
      :disabled="disabled"
      autocomplete="new-password"
      :maxlength="maxlength"
    >
    <transition name="fade">
      <p
        class="err-msg"
        v-if="showErr"
      >
        {{errMessage}}
      </p>
    </transition>
  </div>
</template>

<script>
export default {
  props: [
    'value',
    'placeholder',
    'name',
    'errMessage',
    'showErr',
    'require',
    'type',
    'width',
    'disabled',
    'center',
    'maxlength',
    'inputClass',
  ],

  data() {
    return {
      val: this.value,
    }
  },
  watch: {
    value() {
      this.val = this.value
    },
  },

  methods: {
    input() {
      this.$emit('input', this.val)
      this.$emit('change', this.val)
    },
    blur() {
      if (this.require && this.val === '') {
        this.showErr = true
      } else {
        this.$emit('blur', this.val)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.input-normal_wrap {
  display: inline-block;
  margin: 10px 0;

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .err-msg {
    position: absolute;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px 0;
    color: $color-error;
    font-size: 12px;
  }

  input {
    width: 100%;
    height: 34px;
    border: 1px solid $color-line;
    text-indent: 10px;
    border-radius: 2px;
    color: $color-text;
    font-size: 13px;
    font-weight: 500;

    &.disabled {
      background-color: $color-assist4;
      color: $color-assist3;
      font-size: 14px;
    }

    &.error {
      border-color: $color-error;
    }

    &.center {
      text-align: center;
    }

    &::-webkit-input-placeholder {
      color: $color-assist3;
    }

    &:focus {
      border-color: $color-primary;
    }
  }
}
</style>
