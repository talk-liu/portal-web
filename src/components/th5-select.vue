<template>
  <div class="th5-region-select">
    <div class="th5-input">
      <input class="select-input" type="text" autocomplete="off" :placeholder="placeholder" v-model="val" @click.stop="inputFocus" @focus="inputFocus" @input="filter" @blur="blur" :readonly="disabled">
      <i class="iconfont icon-xiala" @click.stop="emitFocus"></i>
    </div>
    <div class="th5-select-items-wrap" ref="selectList" :style="{height:height+'px'}">
      <div class="th5-select-item" v-for="(item,index) in selectArr" :key="index" :class="{odd:index%2!==0 && lineColor}" @click.prevent.stop="selectItem(item)">{{item[labelKey]}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
    },
    suggestions: {
      type: Array,
    },
    valueKey: {
      type: String,
    },
    labelKey: {
      type: String,
    },
    value: {
      type: String,
    },
    height: {
      type: Number,
    },
    num: {
      type: Number,
      default: 0,
    },
    lineColor: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      val: this.value,
      selectArr: this.suggestions,
    }
  },
  mounted() {
    document.addEventListener('click', () => {
      this.$refs.selectList && (this.$refs.selectList.style.transform = 'scaleY(0)')
    })
  },
  methods: {
    selectItem(val) {
      this.val = val[this.labelKey]
      this.$emit('select', val)
      this.$refs.selectList.style.transform = 'scaleY(0)'
    },
    blur() {
      setTimeout(() => {
        this.$refs.selectList.style.transform = 'scaleY(0)'
      }, 200)
    },
    inputFocus() {
      this.$refs.selectList.style.transform = 'scaleY(1)'
    },
    emitFocus() {
      document.querySelectorAll('.select-input')[this.num].focus()
      // document.getElementById('select-input').focus()
    },
    filter() {
      this.selectArr = this.suggestions.filter(i => i[this.labelKey].toUpperCase().indexOf(this.val.toUpperCase()) > -1)
      this.$emit('input')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.th5-region-select {
  margin-bottom: 20px;
  position: relative;
  width: 100%;
  height: 100%;

  .th5-select-items-wrap {
    //display: none;
    transform: scaleY(0);
    transform-origin: top center;
    transition: transform 0.3s;
    position: absolute;
    width: 100%;
    max-height: 290px;
    padding: 5px 15px;
    overflow: scroll;
    // border: 1px solid #eaedf5;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.08) 0 7px 14px 0;
    // background-color: #ffffff;
    z-index: $zindex-dropdown;

    @include themify($themes) {
      background-color: themed('wrapBgColor');
    }
    .th5-select-item {
      padding: 10px 15px;
      // color: $color-assist1;
      font-size: 15px;
      cursor: pointer;

      @include themify($themes) {
        color: themed('textColor6');
      }
      &.disabled {
        color: #999999;
        cursor: not-allowed;
        &:hover {
          background-color: #ffffff;
          color: #999999;
        }
      }

      &.odd {
        background-color: #f8f8fb;
      }

      &:hover {
        // background-color: $color-primary;
        // color: $color-text;
        @include themify($themes) {
          color: themed('textColor3');
          background-color: themed('primaryColor');
        }
      }
    }
  }

  .th5-input {
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;

    input {
      display: inline-block;
      width: 100%;
      height: 100%;
      padding: 0 30px;
      color: $color-assist1;
      outline: 0;
      font-size: 14px;
      // background-color: #ffffff;
      // border: 1px solid #dce0eb;
      border-width: 1px;
      border-style: solid;
      border-radius: 3px;

      @include themify($themes) {
        background-color: themed('wrapBgColor');
        border-color: themed('lineBorderColorD8');
      }
      &:hover,
      &:focus {
        // border-color: $color-border-hover;
        @include themify($themes) {
          background-color: themed('wrapBgColor');
          border-color: themed('lineBorderColorF5');
        }
      }
    }

    i {
      position: absolute;
      // color: $color-assist3;
      right: 0;
      top: 0;
      margin-top: 0;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;

      @include themify($themes) {
        color: themed('textColor6');
      }
    }
  }
}

.theme-dark {
  .th5-region-select {
    .th5-select-items-wrap {
      background-color: #000000;
      .th5-select-item {
        color: rgba($color: #ffffff, $alpha: 0.7);
        &:hover {
          color: #171718;
        }
      }
    }
    .th5-input {
      input {
        background-color: #000000;
        border-color: #000000;
        &:hover,
        &:focus {
          background-color: #000000;
          border-color: #000000;
        }
      }
    }
  }
}
</style>
