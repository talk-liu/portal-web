<template>
  <div  class="th5-check-box">
    <span class="label">
      {{label}}
    </span>
    <input type="checkbox" class="checkbox" v-model="checkboxValue"/>
  </div>
</template>

<script>
export default {
  props: ['label', 'bgColor', 'value'],
  data() {
    return {
      checkboxValue: this.value,
    }
  },
  watch: {
    value(newVal) {
      this.checkboxValue = newVal
    },
    checkboxValue(newVal) {
      this.$emit('input', newVal)
    },
  },
  methods: {
    changeVal(e) {
      console.log(e)
      this.$emit('input', this.val)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.th5-check-box {
  .label {
    color: #999999;
    font-size: 14px;
    vertical-align: middle;
  }
  .checkbox {
    vertical-align: middle;
    position: relative;
    width: 38px;
    height: 24px;
    border: none;
    outline: 0;
    border-radius: 24px;
    box-sizing: border-box;
    background-color: #dfdfdf;
    transition: background-color 0.1s, border 0.1s;
    appearance: none;
    -webkit-appearance: none;
    &:before {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      width: 38px;
      height: 24px;
      border-radius: 24px;
      background: #d8d8d8;
    }
    &:checked:before {
      background-color: #ffd200;
    }
    &:after {
      content: ' ';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #fdfdfd;
      transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1.35);
    }
    &:checked:after {
      transform: translateX(14px);
      transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
    }
  }
}
</style>
