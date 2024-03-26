<template>
  <div class="security-code-wrap">
    <v-input @input="handleInput" :placeholder="placeholder" :maxlength="length"></v-input>
    <div class="code-tip">
      <template v-if="leftTime > 0">
        <span>{{$t('m.funds.emailPageForh5.noReceiveCode')}}</span> {{$t('m.funds.emailPageForh5.holdOn')}}{{leftTime | formatTime}}
      </template>
      <template v-else>
        <span @click="resend" class="resend">{{$t('m.funds.emailPageForh5.resend')}}</span>
      </template>
    </div>
  </div>
</template>

<script>
import VInput from '@/components/input'
export default {
  props: {
    length: {
      type: Number,
      default: 6,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  components: {
    VInput
  },
  created() {
    this.countDown()
  },
  data() {
    return {
      value: '',
      leftTime: 1800
    }
  },
  computed: {
    uuid() {
      return Math.random()
        .toString(36)
        .substring(3, 8)
    },
  },
  filters: {
    formatTime(time) {
      const minute = time && time % 60 < 10 ? '0' + time % 60 : time % 60
      const hour = time && Math.floor(time / 60) < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60)
      return `${hour}:${minute}`
    },
  },
  methods: {
    countDown() {
      this.leftTime = 1800
      this.t = setInterval(() => {
        if (--this.leftTime < 0) {
          this.stopCountDown()
        }
      }, 1000)
    },
    stopCountDown() {
      clearInterval(this.t)
    },
    resend() {
      this.$emit('resend')
    },
    handleInput(val) {
      if (val.length >= this.length) {
        this.$emit('success', val)
      } else {
        this.$emit('change')
      }
    },
  },
}
</script>

<style scoped lang="scss">
  .input-code {
    position: absolute;
    left: -9999px;
    top: -99999px;
    width: 0;
    height: 0;
    opacity: 0;
    overflow: visible;
    z-index: -1;
  }

  .code-tip {
    font-size: 14px;
    color: #bbbbbb;
    text-align: left;
    span {
      color: #97a5b3;
    }
    .resend {
      cursor: pointer;
    }

    margin-top: 20px;
  }
</style>