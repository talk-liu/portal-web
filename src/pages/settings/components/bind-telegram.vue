<template>
  <div class="bind-container">
    <div class="history-wrap">
      <v-history-header :level1="level1" :level2="level2"></v-history-header>
    </div>
    <div class='text-wrap'>
      <p style='color:#666666; font-size:16px;'>
        {{$t('m.settings.telegramRelateDesc')}}
      </p>
      <v-btn style='margin-top:25px; margin-bottom:55px; ' type="info" @click="toBindTelegram()">{{$t('m.settings.relateTelegram')}}</v-btn>

      <p style='color:#999999; font-size:13px; margin-bottom:5px;'>
        {{$t('m.settings.telegramCopyDesc')}}
      </p>
      <a id='link-url' style='color:#e06f0d;'>{{bindUrl}}</a>
      <div class="copy-warpper">
        <v-btn style='margin-top:25px;' type="info" @click='copy(bindUrl)'>{{$t('m.settings.copyLink')}}</v-btn>
        <p class="copy-success" :class="{animate:copySuccess}">
          <i class="iconfont icon-chenggong"></i>
          {{$t('m.funds.copySuccess')}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import VHistoryHeader from '@/components/history-header-plus'
import VBtn from '@/components/btn'
import bindTG from '@/mixins/settings-telegram-bind'
export default {
  components: {
    VHistoryHeader,
    VBtn,
  },
  mixins: [bindTG],
  data() {
    return {
      level1: [
        {
          href: '/settings',
          name: this.$t('m.bindPhone.title'),
        },
      ],
      level2: this.$t('m.settings.relateAccount'),
    }
  },
  watch: {
    telegramIsBind(newVal, oldVal) {
      // 如果绑定成功 则返回上一级页面
      if (newVal === true && oldVal === false) {
        history.back()
      }
    },
  },
  mounted() {
    this.listenerBindChange()
    this.telegramBindInfo()
  },
  beforeDestroy() {
    this.removeListenerBindChange()
  },
}
</script>

<style lang="scss" scoped>

.bind-container {
  .history-wrap {
    padding: 20px 35px 0;
    .step-text {
      font-size: 14px;
      font-weight: bold;
      text-align: center;
    }
  }
  .text-wrap {
    text-align: center;
    margin-top: 145px;
  }
}

.copy-warpper {
  position: relative;
}

.copy-success {
  position: absolute;
  right: 400px;
  top: 0;
  text-align: right;
  color: $color-assist5;
  font-size: 12px;
  opacity: 0;

  &.animate {
    animation: fade 1s ease-in-out;
  }

  i {
    vertical-align: middle;
  }
}

@keyframes fade {
  from {
    transform: translateY(0);
    opacity: 0.2;
  }

  to {
    transform: translateY(-15px);
    opacity: 1;
  }
}
</style>
