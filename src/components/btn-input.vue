<template>
  <div class="btn-input-wrap"
       :class="{active:listShow,err:errShow,focus:focus}">
    <span class="pre"
          v-if="type==='pre'">
      <slot name="pre"></slot>
    </span>
    <input v-if="inputType==='number'"
           type="text"
           class="fm"
           v-model="val"
           :disabled="disabled"
           :placeholder="placeholder"
           @input="input"
           :style="{width:width+'%', height:height +'px'}">
    <input v-else
           :type="inputType"
           class="fm"
           v-model="val"
           :disabled="disabled"
           :placeholder="placeholder"
           @input="input"
           :style="{width:width+'%', height:height +'px'}">
    <span @click="click"
          v-if="type!=='pre'"
          class="append fb"
          :style="{width:100-width + '%', height: height + 'px',lineHeight:height + 'px'}"
          :class="btnType === 'primary' ? 'primary' : ''">
      <slot name="append"></slot>
    </span>
    <ul v-if="listShow">
      <slot name="list"></slot>
    </ul>
  </div>
</template>


<script>
export default {
  props: [
    'value',
    'disabled',
    'placeholder',
    'type',
    'listShow',
    'width',
    'errShow',
    'focus',
    'height',
    'btnType',
    'inputType',
    'maxLen',
    'intNumber',
  ], // 'primary' : 'default'

  data() {
    return {
      val: this.value,
    }
  },

  watch: {
    value(val) {
      this.val = val
    },
    val(val, oldVal) {
      if (this.inputType === 'number') {
        const reg = new RegExp('^\\d+(\\.\\d{0,8})?$')
        if (val && reg.test(val)) {
          val = val.replace(/^0(\d)/, '$1')
          this.$emit('input', val)
        } else {
          if (!val) {
            this.$emit('input', '')
          } else {
            this.val = oldVal
          }
        }
        this.$emit('change')
      } else {
        if (this.maxLen >= 0) {
          if (val.indexOf('.') > -1) {
            const mixiNum = val.split('.')[1]
            if (mixiNum.length > this.maxLen) {
              const len = Number(this.maxLen) === 0 ? val.length - 2 : val.length - 1
              this.val = this.val.slice(0, len)
            }
          }
        }
        this.$emit('input', this.val)
        this.$emit('change')
      }
    },
  },

  methods: {
    click() {
      this.$emit('appendClick', this.val)
    },
    input() {
      // console.log(this.val)
      // this.$emit('input', this.val);
      // this.$emit('change');
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.btn-input-wrap {
  position: relative;
  font-size: 0;
  border-radius: 3px;
  display: flex;
  &.err {
    border-color: $color-error;
  }

  &.active {
    border-color: $color-primary;
  }

  &.focus {
    border-color: $color-primary;
  }

  ul {
    position: absolute;
    margin-top: 1px;
    padding-bottom: 20px;
    width: 100%;
    //min-height: 120px;
    max-height: 330px;
    overflow-y: scroll;
    background-color: #ffffff;
    border-radius: 3px;
    border: 1px solid #dce0eb;
    box-shadow: rgba(54, 8, 8, 0.08) 0 7px 14px 0;
    z-index: $zindex-dropdown;
    font-size: 13px;

    li {
      list-style: none;
    }
  }

  input {
    border: 1px solid #bdc7d1;
    border-right: none;
    height: 40px;
    padding: 0 20px;
    width: 85%;
    color: #666666;
    font-size: 14px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    background-color: #ffffff;

    &::-webkit-input-placeholder {
      font-weight: normal;
      color: $color-assist2;
    }
  }

  span {
    flex: 1;
    vertical-align: top;
    padding: 0 20px;
    //margin-top: 0.5px;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #666666;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #bdc7d1;
    &.append {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      border-left: 1px solid #bdc7d1;
      background-color: #ffffff;

      &:hover {
        background-color: $color-assist4;
        color: $color-text;
        //border-color: $color-primary;
      }
    }
    &.primary {
      border: 1px solid $color-primary;
      background: $color-primary;
      color: $color-text;
      &:hover {
        background-color: $color-primary;
      }
    }

    &.pre {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      border-right: 0;

      & + input {
        border-radius: 0;

        &[disabled] {
          background-color: #f8f8fb;
        }
      }
    }
  }
}
</style>
