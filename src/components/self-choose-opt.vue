<template>
  <div class='self-choose-opt'>
    <div class='search-box' :class="isEn ? 'en' : ''">
      <img class='search-icon' src="../assets/images/search.png" alt="">
      <input type="text" :placeholder="$t('m.search')" class="fm" v-model="value" @input="search">
    </div>
    <div class='toggle' :class="isEn ? 'en' : ''">
      <span class="fm" :class='index === 0 ? "current" : ""' @click='togglecColumn(0)'>{{$t('m.exchange.change')}}</span>
      <span class="fm" :class='index === 1 ? "current" : ""' @click='togglecColumn(1)'>{{$t('m.exchange.volume')}}</span>
    </div>
  </div>
</template>
<script>
// 自选模块的搜索和筛选
export default {
  name: 'self-choose-opt',
  data() {
    return {
      value: '',
      index: 0,
      isEn: this.$fifth.lang !== 'zh-CN',
    }
  },
  methods: {
    search() {
      this.$emit('send', this.value)
    },
    togglecColumn(index) {
      if (this.index !== index) {
        this.index = index
        this.$emit('togglecColumn', index)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.self-choose-opt {
  display: flex;
  padding: 0 5px;
  justify-content: space-between;
  height: 24px;
  .toggle {
    font-size: 12px;
    line-height: 24px;
    width: 118px;
    text-align: right;
    &.en {
      width: 125px;
    }
    > span {
      cursor: pointer;
      padding-left: 15px;
      margin-left: 3px;
      position: relative;
      color: $color-assist2;
      &.current {
        color: $color-text;
        cursor: default;
        &:after {
          content: '';
          background-color: $color-text;
          height: 4px;
          width: 4px;
          border-radius: 100%;
          position: absolute;
          left: 4px;
          top: 7px;
        }
      }
      &.current:before {
        border-color: $color-text;
      }
      &:before {
        content: '';
        position: absolute;
        border: 1px solid $color-assist8;
        border-radius: 100%;
        width: 10px;
        height: 10px;
        left: 0;
        top: 3px;
      }
    }
  }
  .search-box {
    width: 150px;
    position: relative;
    display: inline-block;
    &.en {
      width: 135px;
    }
    .search-icon {
      position: absolute;
      top: 6px;
      left: 9px;
      font-size: 15px;
      color: #ced0d7;
      height: 12px;
      width: 12px;
      opacity: 0.3;
    }

    input {
      width: 100%;
      height: 24px;
      border: 1px solid #bdc7d1;
      border-radius: 20px;
      text-indent: 30px;
      color: $color-text;
      font-size: 14px;

      &::-webkit-input-placeholder {
        color: #ced0d7;
      }

      &:focus {
        border-color: $color-border-hover;
      }
    }
  }
}
</style>
