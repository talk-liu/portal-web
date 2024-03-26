<template>
  <div class="download-item_wrap">
    <div class="ios-download_wrap phone" v-if="ios">
      <a class="ios app phone" href="javascript:;" @click="appStore">
        <i class="iconfont icon-Apple"></i>
        <div>
          <p class="store">Download it from</p>
          <p>App Store</p>
        </div>
      </a>
      <a class="ios app phone" href="javascript:;" @click="iosClick">
        <i class="iconfont icon-Apple"></i>
        <div>{{$t('m.appDownLoad.ios')}}</div>
      </a>
    </div>
    <div class="android-download_wrap" v-else>
      <a class="android app phone" href="https://play.google.com/store/apps/details?id=com.riostox.exchange" target="_blank">
        <i class="iconfont icon-android1"></i>
        <div>
          <p class="store">Download it from</p>
          <p>Google Play</p>
        </div>

      </a>
      <a class="android app phone" href="javascript:;" target="_blank" @click="androidClick">
        <i class="iconfont icon-android1"></i>
        <p>Android APK</p>
      </a>
    </div>
    <div class="modal" v-if="modalShow">
      <img src="../../assets/images/ios-modal.png" v-if="$fifth.isCn">
      <img src="../../assets/images/android-modal.png" v-else>
    </div>
  </div>
</template>

<script>
import { isPc, isWx } from '@/utils/phone-type'
import AppCofig from '@/mixins/app-download'
export default {
  mixins: [AppCofig],
  props: ['ios'],
  data() {
    return {
      isPc: isPc(),
      modalShow: false,
    }
  },
  methods: {
    iosClick() {
      if (!isWx()) {
        window.location.href = this.appConfig.iOS.link
      } else {
        this.modalShow = true
      }
    },
    appStore() {
      if (!isWx()) {
        window.location.href = 'https://itunes.apple.com/app/id1428903145'
      } else {
        this.modalShow = true
      }
    },
    androidClick() {
      if (!isWx()) {
        window.location.href = this.appConfig.android.link
      } else {
        this.modalShow = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variable.scss';

.download-item_wrap {
  .ios-download_wrap {
    margin-right: 20px;

    &.phone {
      margin-right: 0;
    }
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.98);
    z-index: $zindex-modal;

    img {
      display: block;
      margin-top: 150px;
      margin-left: 120px;
      width: 235px;
      height: 231px;
    }
  }

  .app {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 60px;
    border: 1px solid #bdc7d1;
    box-shadow: rgba(194, 207, 220, 0.54) 0 3px 8px 0;
    border-radius: 3px;
    color: $color-text;
    font-size: 14px;
    cursor: pointer;

    .store {
      font-size: 12px;
    }

    &.phone {
      width: 180px;
      margin: 0 auto;
    }

    &:nth-of-type(1) {
      margin-bottom: 20px;
    }

    .from {
      font-size: 12px;
    }

    i {
      margin-right: 10px;
    }

    .icon-Apple {
      font-size: 24px;
    }

    .icon-android1 {
      font-size: 28px;
    }
  }
}
</style>
