<template>
  <div class="input-label">
    <input class="fb" :class="{err:errMsg,price:price}" :type='inputType' ref="input" :placeholder="beforeLabel" @keyup="onKeyup($event.target.value)" :disabled='disabled' :value='value' @input='updateValue($event.target.value)' @focus="onFocus($event.target.value)" @mousewheel.prevent>
    <span class='after label semi-bold' v-if='afterLabel'>{{afterLabel}}</span>
    <span class="error label" v-if="errMsg">{{errMsg}}</span>
    <span class="price label" v-if="price">{{price}}</span>
  </div>
</template>

<script>
export default {
  name: 'input-label',
  props: {
    afterLabel: { type: String },
    beforeLabel: { type: String },
    value: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    inputType: { type: String, default: 'number' },
    decimalCount: { type: Number, default: 2 },
    errMsg: { type: String, default: '' },
    price: { type: String, default: '' },
  },
  data() {
    return {}
  },
  computed: {
    step() {
      let result = new Array(this.decimalCount).join('0')
      result += '1'
      return `0.${result}`
    },
  },
  watch: {},
  methods: {
    onKeyup(v) {
      this.$emit('keyup', v)
    },
    onFocus(v) {
      this.$emit('focus', v)
    },
    updateValue(v) {
      this.$emit('input', v)
    },
  },
}
</script>

<style lang="scss" scoped>
.input-label {
  position: relative;
  input {
    border: 1px solid #dce0eb;
    border-radius: 2px;
    height: 29px;
    width: 216px;
    padding: 0 54px 0 8px;
    font-size: 12px;
    text-align: left;
    color: $color-assist1;
    &::-webkit-input-placeholder {
      color: $color-font-text-gray;
    }
    &.price {
      padding: 0 132px 0 8px;
    }
  }
  input:disabled {
    background-color: $color-assist4;
  }
  input:focus {
    border-color: $color-font-text-gray;
  }
  .err {
    border: 1px solid $color-error;
  }
  .err:focus {
    border-color: $color-error;
  }
  .price {
    left: 83px;
    font-weight: bold;
  }
  .price:before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 8px;
    background-color: #d8d8d8;
    margin-right: 9px;
  }
  .label {
    color: $color-font-text-gray;
    position: absolute;
    top: 6px;
    user-select: none;
    font-size: 12px;
  }

  .after {
    right: 10px;
    font-weight: 500;
  }

  .sec-after {
    right: 55px;
    font-weight: 500;
  }
  // .before {
  //   left: 10px;
  // }
  .error {
    display: block;
    width: 100%;
    position: absolute;
    top: 29px;
    background-color: rgba($color: #ed4343, $alpha: 0.8);
    color: #ffffff;
    font-size: 12px;
    line-height: 16px;
    padding: 3px 10px;
    z-index: 999;
    border-radius: 2px;
  }
}
</style>
