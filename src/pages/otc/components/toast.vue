<template>
  <div class="message-wrap" :class="hideMessage ? 'fadeout': ''">
    <div class="message-box">
      <div class="message-text">{{message}}</div>
    </div>
    <div class="message-close iconfont icon-guanbi1" @click.stop="closeMessage">
    </div>
  </div>
</template>

<script>
export default {
  props: ['message'],
  data() {
    return {
      hideMessage: false,
      timer: null
    }
  },
  mounted() {
    this.timer = setTimeout(() => {
      this.hideMessage = true
    }, 3000)
  },
  methods: {
    closeMessage() {
      clearTimeout(this.timer)
      this.hideMessage = true
    }
  }
}
</script>


<style lang="scss" scoped>
.message-wrap {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translate(-50%, 0%);
  min-width: 280px;
  z-index: $zindex-tooltip;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: #ffa20a;
  font-size: 12px;
  line-height: 18px;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.1);
  padding: 8px 30px 8px 20px;
  border-radius: 3px;
  animation: fadeIn 0.3s ease-out forwards;
  &.fadeout {
    animation: fadeOut 0.3s ease-out forwards;
  }

  &.success {
    border: 1px solid #3bb46e;
    color: #3bb46e;
  }
  &.error {
    border: 1px solid #ee4343;
    color: #ee4343;
  }
  &.warn {
    border: 1px solid #fa9b00;
    color: #fa9b00;
  }
  .message-text {
    font-weight: 400;
  }
  .message-close {
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: $zindex-tooltip;
    cursor: pointer;
    padding: 4px;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-webkit-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

</style>
