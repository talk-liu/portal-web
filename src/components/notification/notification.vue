<template>
  <div v-if="viewType !== 'h5'" :class="['notification-box', type]" :style="style">
    <div class="msg">{{message}}</div>
    <div class="iconfont icon-guanbi1 close" @click="destoryElement"></div>
  </div>
  <div v-else :class="['mobile-notification-box', type]">
    <div class="msg">{{message}}</div>
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
      style: '',
      viewType: 'lg',
    }
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
  mounted() {
    this.startTimer()
  },
}
</script>


<style lang="scss" scoped>
.notification-box {
  position: fixed;
  top: 60px;
  left: 50%;
  font-size: 13px;
  z-index: $zindex-tooltip;
  display: flex;
  min-width: 280px;
  transform: translate(-50%, 0);
  box-shadow: rgba($color: #000000, $alpha: 0.1) 0 3px 14px;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;

  @include themify($themes) {
    background-color: themed('notificationBg');
  }
  .msg {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    font-size: 12px;
  }
  &.success {
    @include themify($themes) {
      border-color: rgba(themed('textSuccess'), $alpha: 0.95);
    }
    .msg {
      @include themify($themes) {
        color: themed('textSuccess');
      }
    }
  }
  &.error {
    @include themify($themes) {
      border-color: rgba(themed('textError'), $alpha: 0.95);
    }
    .msg {
      @include themify($themes) {
        color: themed('textError');
      }
    }
  }
  &.warn {
    @include themify($themes) {
      border-color: rgba(themed('textWarn'), $alpha: 0.95);
    }
    .msg {
      @include themify($themes) {
        color: themed('textWarn');
      }
    }
  }
  i {
    font-size: 14px;
    font-weight: normal;
  }
  .close {
    cursor: pointer;

    @include themify($themes) {
      color: themed('textColor3');
    }
  }
  .iconfont {
    display: flex;
    align-items: center;
    margin: 0 10px 0 20px;
  }
}

.mobile-notification-box {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: $zindex-tooltip;
  display: flex;
  align-items: center;
  transform: translate(-50%, -50%);
  min-height: 76px;
  max-width: 256px;
  background-color: rgba($color: #000000, $alpha: 0.8);
  border-radius: 6px;
  font-size: 14px;
  line-height: 20px;
  padding: 18px 20px;
  &.success {
    .msg {
      @include themify($themes) {
        color: themed('textSuccess');
      }
    }
  }
  &.error {
    .msg {
      @include themify($themes) {
        color: themed('textError');
      }
    }
  }
  &.warn {
    .msg {
      @include themify($themes) {
        color: themed('textWarn');
      }
    }
  }
}

.theme-dark {
  .mobile-notification-box {
    background-color: rgba($color: #000000, $alpha: 0.9);
  }
}
</style>
