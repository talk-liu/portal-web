<template>
  <div @click='blockClick' :style="{height:animateHeight}" :class="['block-mining',{seleted}]">
  </div>
</template>

<script>
export default {
  data() {
    return {
      animateHeight: 0,
    }
  },
  props: ['seletedIdx', 'i', 'height'],
  computed: {
    seleted() {
      return this.seletedIdx == this.i
    },
  },
  methods: {
    blockClick() {
      this.$emit('blockClick', this.i)
    },
  },
  mounted() {
    setTimeout(() => {
      this.animateHeight = this.height
    }, 1000)
  },
}
</script>

<style lang='scss' scoped>
.block-mining.seleted {
  // border-top: 1px solid $color-primary;
  // border-left: 1px solid $color-primary;
  // border-right: 1px solid $color-primary;
  border: 1px solid $color-primary;
}

.block-mining.block-mining.seleted:before {
  background: #d8d8d8;
  content: '';
  height: 1px;
  width: 100%;
  left: 0;
  top: -1px;
  position: absolute;
  // background: #160426;
  // border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  // border-left: 1px solid rgba(255, 255, 255, 0.3);
  // content: '';
  // height: 8px;
  // left: 29px;
  // position: absolute;
  // top: -5px;
  // -webkit-transform: rotate(-45deg);
  // -ms-transform: rotate(-45deg);
  // transform: rotate(-45deg);
  // width: 8px;
}

.block-mining {
  width: 100%;
  background: rgba(255, 199, 1, 1);
  transition: 0.6s;
  border-radius: 3px;
  cursor: pointer;
}
</style>
