<template>
  <div class="input-item">
    <label class="title" :for="name">{{name}}</label>
    <div class="input-wrap">
      <input
        :class="['val',error?'err':'',viewType==='h5'?'mobile-input':'']"
        type="text"
        v-model="oriValue"
        :id="name"
        :placeholder="placeholder"
        :disabled="disabled"
        autocomplete="off"
        @focus="$emit('focus')"
      >
      <div class="tips" v-if="tips && money">{{money}}</div>
      <div class="after" v-if="after">{{after}}</div>
      <span class="error" v-if="error">{{error}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import totalMoeny from '@/mixins/total-money'
export default {
  props: {
    value: { type: [String, Number], default: '' },
    type: { type: String, default: 'base' },
    name: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
    tips: { type: Boolean, default: false },
    after: { type: String, default: '' },
    error: { type: String, default: '' },
  },
  mixins: [totalMoeny],
  data() {
    return {
      oriValue: this.value,
    }
  },
  computed: {
    ...mapGetters('tickers', ['currentTicker', 'quoteUnit']),
    ...mapGetters('viewport', { viewType: 'type' }),
    money() {
      if (!this.oriValue) return null
      return '≈ ' + this.changeUsdt(this.quoteUnit, this.oriValue, false, 4)
    },
  },
  watch: {
    oriValue(val, oldVal) {
      // 按照精度格式化输入数据
      let fixed = 0
      let { ask_fixed, bid_fixed } = this.currentTicker || { ask_fixed: 0, bid_fixed: 0 }
      if (this.type === 'base') {
        fixed = bid_fixed
      } else {
        fixed = ask_fixed
      }
      const reg = new RegExp('^\\d+(\\.\\d{0,' + fixed + '})?$')
      if (val && reg.test(val)) {
        val = val.replace(/^0(\d)/, '$1')
        this.$emit('input', val)
      } else {
        if (!val) {
          this.$emit('input', '')
        } else {
          this.oriValue = oldVal
        }
      }
    },
    value(val) {
      this.oriValue = val
    },
  },
}
</script>

<style lang="scss" scoped>
.input-item {
  height: 32px;
  margin-bottom: 16px;
  display: flex;
  .title {
    display: block;
    width: 60px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    text-transform: capitalize;

    @include themify($themes) {
      color: themed('textColor6');
    }
  }
  .input-wrap {
    position: relative;
    flex: 1;
    // z-index: $zindex-newspace;
    .val {
      display: block;
      outline: none;
      width: 100%;
      height: 32px;
      line-height: 32px;
      border-radius: 2px;
      padding-left: 15px;
      font-size: 14px;
      border-width: 1px;
      border-style: solid;
      padding-right: 60px;

      @include themify($themes) {
        color: themed('textColor3');
        background-color: themed('inputBgColor');
        border-color: themed('inputBorderColor');
      }
      &:focus {
        @include themify($themes) {
          border-color: themed('textColor3');
        }
      }
      &::placeholder {
        font-size: 14px;

        @include themify($themes) {
          color: themed('textColor9');
        }
      }
      &:disabled {
        border-width: 1px;
        border-style: solid;

        @include themify($themes) {
          background-color: themed('disabledColor');
          border-color: themed('disabledColor');
        }
      }
    }
    .val.err {
      @include themify($themes) {
        border-color: themed('textError');
      }
      &:focus {
        @include themify($themes) {
          border-color: themed('textError');
        }
      }
    }
    .tips {
      position: absolute;
      top: -28px;
      left: 0;
      max-width: 216px;
      height: 24px;
      line-height: 24px;
      z-index: $zindex-fixed;
      border-radius: 4px;
      border-width: 1px;
      border-style: solid;
      padding: 0 15px;
      font-size: 13px;

      @include themify($themes) {
        color: themed('textColor3');
        border-color: themed('primaryColor');
        background-color: themed('tipsBg');
      }
      &:before {
        content: '';
        width: 6px;
        height: 6px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-left-width: 1px;
        border-left-style: solid;
        transform: rotate(-45deg);
        top: 19px;
        left: 15px;
        position: absolute;
        // background: #fffdf4;
        @include themify($themes) {
          border-color: themed('primaryColor');
          background-color: themed('tipsBg');
        }
      }
    }
    .after {
      position: absolute;
      width: 60px;
      height: 32px;
      line-height: 32px;
      top: 0;
      right: 10px;
      font-size: 13px;
      text-align: right;

      @include themify($themes) {
        color: themed('textColor3');
      }
    }
    .error {
      border-radius: 2px;
      color: #ffffff;
      display: block;
      font-size: 12px;
      line-height: 16px;
      padding: 3px 10px;
      position: absolute;
      top: 32px;
      width: 100%;
      z-index: $zindex-fixed;

      @include themify($themes) {
        background-color: themed('textError');
      }
    }
  }
}

.theme-dark {
  .input-item {
    .input-wrap {
      .val {
        background-color: #000000;
        &:focus {
          border-color: #000000;
        }
      }
      .val.mobile-input {
        background-color: #2b2b2b;
        &:focus {
          border-color: #2b2b2b;
        }
      }
      .tips {
        border-color: #454545;
        background-color: #1a1a1a;
        &:before {
          border-color: #454545;
          background-color: #1a1a1a;
        }
      }
    }
  }
}
</style>

