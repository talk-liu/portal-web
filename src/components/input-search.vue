<template>
  <div class="search-box">
    <i class="iconfont icon-sousuo"></i>
    <input type="text" v-model="keyWord" :placeholder="placeholder" @input="input" :style="{width:width+'px',height:height+'px'}">
  </div>
</template>

<script>
export default {
  props: ['value', 'placeholder', 'width', 'height'],

  data() {
    return {
      keyWord: this.value,
      t: null,
    }
  },
  watch: {
    value(val) {
      this.keyWord = val
    }
  },
  methods: {
    input() {
      this.$emit('input', this.keyWord)
      clearTimeout(this.t)
      this.t = setTimeout(() => {
        this.$emit('search', this.keyWord)
      }, 500)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.search-box {
  position: relative;
  display: inline-block;

  i {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    font-size: 25px;
    color: #ced0d7;
  }

  input {
    width: 300px;
    height: 34px;
    border: 1px solid #bdc7d1;
    border-radius: 20px;
    text-indent: 34px;
    color: $color-text;
    font-size: 14px;
    font-weight: 500;

    &::-webkit-input-placeholder {
      color: #ced0d7;
    }

    &:focus {
      border-color: $color-border-hover;
    }
  }
}
</style>
