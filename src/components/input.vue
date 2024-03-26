<template>

  <div class="v-input">
    <input :class="{error: showErrMsg,autofocus: autoFocus, normal: inputType === 'normal'}" :type="type" v-model="val" :placeholder="placeholder" :name="name" @input="input" @focus="focus" ref='input' :disabled="disabled" :maxlength="max" :autocomplete='autocomplete'>
    <transition name="fade">
      <p class="err-msg" v-if="showErrMsg">
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
    'type',
    'require',
    'errMessage',
    'showErrMsg',
    'name',
    'disabled',
    'maxlength',
    'autocomplete',
    'autoFocus',
    'inputType'
  ],
  data() {
    return {
      val: this.value,
      showErr: this.showErrMsg,
    }
  },
  watch: {
    value(val) {
      this.val = val
    }
  },
  computed: {
    max() {
      if (this.maxlength) {
        return this.maxlength
      }
    },
  },
  mounted() {
    if (this.autoFocus) {
      document.getElementsByClassName('autofocus')[0].focus()
    }
  },
  methods: {
    input() {
      this.$emit('input', this.val)
      this.$emit('change')
    },
    blur() {
      if (this.require && this.val === '') {
        this.showErr = true
      } else {
        this.$emit('blur', this.val)
      }
    },
    focus() {
      this.$refs.input.focus()
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.v-input {
  position: relative;
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
    line-height: 13px;
    transform: translateX(-50%);
    padding: 5px 0;
    color: $color-error;
    font-size: 12px;
  }
  input {
    display: block;
    width: 100%;
    padding: 10px 0;
    font-size: 14px;
    color: $color-text;
    text-align: center;
    border: none;
    border-bottom: 1px solid #eaedf5;
    background-color: transparent;
    &::-webkit-input-placeholde {
      color: $color-assist2;
    }
    &:focus {
      border-bottom-color: $color-primary;
    }
    &.error {
      border-bottom-color: $color-error;
    }
    &.normal {
      border: 1px solid #eaedf5;
      font-size: 13px;
      text-indent: 10px;
      text-align: left;
      border-radius: 2px;
      color: $color-text;
      &::-webkit-input-placeholder {
        color: $color-assist3;
      }
    }
  }
}
</style>
