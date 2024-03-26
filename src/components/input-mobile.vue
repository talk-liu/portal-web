<template>
  <div class="v-input">
    <input
      :class="{error: showErrMsg,autofocus: autoFocus}"
      :type="inputType"
      v-model="val"
      :placeholder="placeholder"
      :name="name"
      @input="input"
      @blur="blur"
      :disabled="disabled"
      :maxlength="max"
      :autocomplete='autocomplete'
    >
    <div class="border"></div>
    <div class="btns">
      <span
        v-if='showDelBtn && hasVal'
        class="del-btn"
        @click='delVal'
      >
        <i class="iconfont icon-guanbi"></i>
      </span>
      <span
        v-if='showChangeType'
        class="type-btn"
        @click='changeType'
      >
        <i
          class="iconfont"
          :class="inputType === 'password' ? 'icon-view' : 'icon-hidden'"
        ></i>
      </span>
    </div>
    <transition name="fade">
      <p
        class="err-msg"
        v-if="showErrMsg"
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
    'type',
    'require',
    'errMessage',
    'showErrMsg',
    'name',
    'disabled',
    'maxlength',
    'autocomplete',
    'autoFocus',
    'showChangeType',
    'showDelBtn',
  ],

  data() {
    return {
      val: this.value,
      showErr: this.showErrMsg,
      inputType: this.type,
    }
  },
  watch: {
    type(val) {
      this.inputType = val
    },
    value(val) {
      this.val = val
    },
  },
  computed: {
    max() {
      if (this.maxlength) {
        return this.maxlength
      } else if (this.type === 'password') {
        // 最大长度为24
        return 25
      }
    },
    hasVal() {
      return !!this.val
    },
  },
  mounted() {
    if (this.autoFocus) {
      document.getElementsByClassName('autofocus')[0].focus()
    }
  },

  methods: {
    delVal() {
      this.val = ''
    },
    changeType() {
      if (this.inputType === 'password') {
        this.inputType = 'text'
      } else {
        this.inputType = 'password'
      }
    },
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
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.v-input {
  position: relative;
  .btns {
    right: 0;
    bottom: 10px;
    position: absolute;
    i {
      font-size: 22px;
    }
    .del-btn {
      i {
        color: #cccccc;
      }
    }
  }
  .type-btn {
    display: inline-block;
    margin-left: 10px;
    .icon-view {
      color: #ececec;
    }
  }

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
    margin-top: 5px;
  }

  input {
    display: block;
    width: calc(100% - 32px);
    padding: 10px 0;
    font-size: 16px;
    text-align: left;
    color: #111111;
    border-radius: 0;
    border: none;
    // border-bottom: 1px solid #e6e6e6;
    background-color: transparent;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-appearance: none;
    &::-webkit-input-placeholde {
      color: #cccccc;
    }

    &:focus {
      border-bottom-color: $color-primary;
    }

    &.error {
      border-bottom-color: $color-error;
    }
  }
  .border {
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    transform: scaleY(0.5);
  }
}
</style>
