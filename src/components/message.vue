<template>
  <div class="message-wrap">
    <div class="message-box success" v-if="type==='success'">
      <i class="iconfont icon-chenggong1"></i>
      <div>{{message}}</div>
    </div>
    <div class="message-box error" v-if="type==='error'">
      <i class="iconfont icon-shibai"></i>
      <div>{{message}}</div>
    </div>
    <div class="message-box warn" v-if="type==='warn'">
      <i class="iconfont icon-yichangtishi"></i>
      <div>{{message}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      type: 'success',
      duration: 2000,
      timer: null,
    }
  },

  mounted() {
    this.startTimer()
  },

  methods: {
    destoryElement() {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },

    clearTimer() {
      clearTimeout(this.timer)
    },

    startTimer() {
      this.timer = setTimeout(() => {
        this.clearTimer()
        this.destoryElement()
      }, this.duration)
    },
  },
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.message-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba($color: #000000, $alpha: 0.2);
  font-size: 17px;
  z-index: $zindex-tooltip;

  .message-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 50px 30px;
    min-width: 300px;
    max-width: 600px;
    min-height: 180px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 4px;
    z-index: $zindex-tooltip;
    font-weight: 500;
    color: $color-text;

    &.success {
      color: $color-assist5;

      i {
        font-size: 65px;
        font-weight: normal;
      }

      div {
        font-size: 24px;
        font-weight: normal;
      }
    }

    &.error {
      color: $color-error;
    }

    &.warn {
      color: #ff7b00;

      div {
        color: $color-text;
      }
    }
  }

  .iconfont {
    display: block;
    margin: 30px 0 20px;
    font-size: 60px;
  }
}
</style>
