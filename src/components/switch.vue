<template>
  <div class="checkbox">
    <span  :class="{checked: val}" @click.self="changeVal"></span>
    <label @click.self="changeVal" class="label"><slot></slot></label>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      val: this.value,
    }
  },
  watch: {
    value(val) {
      this.val = val
    },
  },
  methods: {
    changeVal() {
      this.val = !this.val
      this.$emit('input', this.val)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.checkbox {
  font-size: 0;
}

span {
  border: 1px solid #bdc7d1;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  margin-right: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  &.checked {
    background: #007aff;
    border: 1px solid #007aff;
    position: relative;
    &:before {
      content: '';
      display: block;
      width: 10px;
      height: 8px;
      background: url(../assets/images/check.png) no-repeat;
      background-size: 100% 100%;
    }
  }
}

label {
  vertical-align: middle;
  color: #999999;
  font-size: 12px;
}
</style>
