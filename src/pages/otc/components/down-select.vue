
<template>
  <div class="v-down-select">
    <div class="select-box" :class="{'errorBorder': errorBorder}">
      <div class="loading" v-if="loading">
        <div class="loading-text">
          <span>Converting...</span>
          <btn-loading class="loading-svg" />
        </div>
      </div>
      <input ref="inputElement" type="text" :placeholder="placeholder" v-model.trim="inputValue" @focus="requestHandle">
      <div class="select-list" @click="clickItem" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <div class="value-text">
          <p>{{trendValue}}</p>
          <img class="icon-down" src="@/assets/images/otc/down.png" />
        </div>
        <ul class="ul-list" ref="ullist">
          <li v-for="(item, index) in trendList" :key="index" @click="selectItem(item.label)" :class="item.label === trendValue ? 'active' : ''">{{item.label}}</li>
        </ul>
      </div>
    </div>
    <slot name="tips"></slot>
  </div>
</template>
<script>
import btnLoading from '@/components/btn-loading'

export default {
  props: ['placeholder', 'trendList', 'numValue', 'currencyValue', 'requestStatus', 'loading', 'precision', 'errorBorder'],
  data() {
    return {
      showList: false,
      trendValue: '',
      inputValue: this.numValue,
      requestAble: this.requestStatus,
    }
  },
  created() {
    this.trendValue = this.trendList[0].label
  },
  mounted() {
    this.$refs.inputElement.onkeypress = (event) => { // 只允许输入数字和小数点以及精度限制
      let code = String.fromCharCode(event.which)
      let val = this.inputValue + code
      let precisionAble = (this.getDiscLength(val) <= this.precision) // 小数精度
      return !isNaN(val) && precisionAble
    }
  },
  computed: {
    // inputValue: {
    //   get: function() {
    //     return this.numValue
    //   },
    //   set:  function(newValue) {
    //     this.numValue = newValue.replace(/[^\d]/g, '')

    //   }
    // }
  },
  // directives: {
  //   onkeypress: {
  //     bind: function(el, binding) {
  //       console.log(el)
  //       console.log(binding)
  //       el.onkeypress = function(el) {
  //         return (/^\d+(\.\d+)?$/.test(String.fromCharCode(el.keyCode)))
  //       }
  //     }
  //   }
  // },
  methods: {
    mouseenter() {
      setTimeout(() => {
        this.$refs.ullist.style.transform = 'scaleY(1)'
        this.showList = false
      }, 0)
    },
    mouseleave() {
      setTimeout(() => {
        this.$refs.ullist.style.transform = 'scaleY(0)'
        this.showList = true
      }, 0)
    },
    clickItem() {
      this.showList ? this.mouseenter() : this.mouseleave()
    },
    selectItem(val) {
      // this.requestAble = true
      this.trendValue = val
    },
    requestHandle() {
      this.requestAble = true
    },
    getDiscLength(n) {
      if (n.toString().split('.').length > 1) {
        return n.toString().split('.')[1].length
      } else {
        return 0
      }
    }
  },
  watch: {
    numValue(val) {
      this.inputValue = val
    },
    requestStatus(val) {
      this.requestAble = val
    },
    inputValue(val) {
      // console.log('update:numValue: ' + val)
      this.$emit('update:numValue', val)
    },
    trendValue(val) {
      this.$emit('update:currencyValue', val)
    },
    requestAble(val) {
      // console.log('requestAble ' + val)
      this.$emit('update:requestStatus', val)
    }
  },
  components: {
    btnLoading
  }
}
</script>
<style lang="scss" scoped>
.v-down-select {
  .select-box {
    width: 300px;
    height: 40px;
    border: 1px solid rgba($color: #8c8c8c, $alpha: 0.4);
    border-radius: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    &.errorBorder {
      border-color: #ee4343;
    }
    .loading {
      width: 100%;
      height: 38px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: $zindex-newspace;
      display: flex;
      .loading-text {
        width: 212px;
        height: 100%;
        line-height: 38px;
        text-indent: 14px;
        color: #8c8c8c;
        background: #1c1c1c;
        display: flex;
        align-items: center;
        .loading-svg {
          margin-left: 5px;
          opacity: 0.7;
        }
      }
    }
    input {
      width: 222px;
      padding: 8px 16px;
      font-size: 18px;
      line-height: 26px;
      color: #ffffff;
      border: none;
      outline: none;
      background: none;
    }
    .select-list {
      min-width: 86px;
      height: 100%;
      position: relative;
      user-select: none;
      .value-text {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        cursor: pointer;
        p {
          height: 100%;
          line-height: 40px;
          font-size: 18px;
          font-weight: bold;
          margin-right: 6px;
        }
        .icon-down {
          width: 13px;
          height: 13px;
        }
      }
      &:before {
        content: '';
        width: 1px;
        height: 16px;
        position: absolute;
        top: 12px;
        opacity: 0.3;
        background: rgba($color: #ffffff, $alpha: 0.7);
      }
      .ul-list {
        width: 88px;
        padding: 7px 6px;
        position: absolute;
        top: 40px;
        z-index: $zindex-newspace;
        background: #242424;
        border-radius: 0 0 2px 2px;
        transform: scaleY(0);
        transform-origin: top center;
        transition: all 0.3s;
        li {
          width: 100%;
          margin-bottom: 2px;
          line-height: 30px;
          text-indent: 14px;
          color: rgba($color: #ffffff, $alpha: 0.7);
          font-size: 18px;
          font-weight: normal;
          border-radius: 2px;
          cursor: pointer;
          &:hover,
          &.active {
            background: #1c1c1c;
            color: #ffd200;
          }
        }
      }
    }
  }
}
</style>

