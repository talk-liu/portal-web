<template>
  <div class="btn-group" @click="change">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    btnNumber: { type: Number, default: 0 },
  },

  data() {
    return {}
  },

  mounted() {
    document
      .querySelector('.btn-group')
      .querySelectorAll('button')[this.btnNumber].setAttribute('class', 'active')
  },

  methods: {
    change(e) {
      const btnArr = document.querySelector('.btn-group').querySelectorAll('button')
      Array.prototype.slice.call(btnArr).map(i => {
        i.setAttribute('class', '')
      })
      e.target.className = 'active'
      this.$emit('change', e.target.name)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.btn-group {
  display: inline-block;
  font-size: 0;
  line-height: 0;
  border-radius: 3px;

  button {
    outline: none;
    padding: 5px 18px;
    // min-width: 64px;
    height: 22px;
    line-height: 0;
    text-align: center;
    font-size: 13px;
    cursor: pointer;
    border: 1px solid #dce0eb;
    color: $color-gray;
    background: #ffffff;
    border-right: none;
    &:first-child {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    &:last-child {
      border-right: 1px solid #dce0eb;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
    &.active + button {
      border-left: none;
    }
    &.active {
      background-color: $color-primary;
      color: $color-3;
      border: 1px solid $color-primary;
      font-weight: bold;
    }
  }
}
</style>
