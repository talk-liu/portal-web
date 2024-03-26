<template>
  <div class="message-wrap">
    <div class="message-box success" v-if="type==='success'">
      <i class="iconfont icon-chenggong1"></i>
      <div class="msg">{{message}}</div>
      <div class="iconfont icon-guanbi1 close" @click="destoryElement"></div>
    </div>
    <div class="message-box error" v-if="type==='error'">
      <i class="iconfont icon-shibai"></i>
      <div class="msg">{{message}}</div>
      <div class="iconfont icon-guanbi1 close" @click="destoryElement"></div>
    </div>
    <div class="message-box warn" v-if="type==='warn'">
      <i class="iconfont icon-yichangtishi"></i>
      <div class="msg">{{message}}</div>
      <div class="iconfont icon-guanbi1 close" @click="destoryElement"></div>
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
      this.clearTimer()
    },
    clearTimer() {
      clearTimeout(this.timer)
    },
    startTimer() {
      this.timer = setTimeout(() => {
        this.destoryElement()
      }, this.duration)
    },
  },
}
</script>


<style lang="scss" scoped>
.message-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba($color: #000000, $alpha: 0.2);
  font-size: 13px;
  z-index: $zindex-tooltip;
  .message-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    min-height: 44px;
    background-color: #ffffff;
    border-radius: 3px;
    z-index: $zindex-tooltip;
    color: $color-3;
    display: flex;
    i {
      font-size: 14px;
      font-weight: normal;
    }
    .msg {
      flex: 1;
      display: flex;
      align-items: center;
      line-height: 1.5;
      padding: 15px 0;
    }
    .close {
      cursor: pointer;
    }
    &.success {
      i {
        color: $color-success;
      }
    }
    &.error {
      i {
        color: $color-error;
      }
    }
    &.warn {
      i {
        color: $color-warn;
      }
    }
    .iconfont {
      display: flex;
      align-items: center;
      margin: 0 10px 0 20px;
    }
  }
}
</style>
