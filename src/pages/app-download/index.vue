<template>
  <div class="app-download">
    <div class="app-download-web">
      <div class="content-section">
        <div class="app-page th-en" :class="{en:!$fifth.isCn}">
          <img src="../../assets/images/app-download-cn.png" class="app-img" v-if="$fifth.isCn">
          <img src="../../assets/images/app-download-en.png" class="app-img" v-else>
          <div class="download-way">
            <div class="title">
              <h4>{{$t('m.appDownLoad.title')}}</h4>
            </div>
            <div class="title">
              <p class="vesion">Riostox App V{{appConfig.iOS.version}}</p>
              <p class="vesion">Riostox App V{{appConfig.android.version}}</p>
            </div>
            <div class="code_wrap">
              <div class="dl" :class="{en:!$fifth.isCn}">
                <div id="ios-code"></div>
                <p>{{$t('m.appDownLoad.ioscode')}}</p>
              </div>
              <div class="dl" :class="{en:!$fifth.isCn}">
                <div id="android-code"></div>
                <p>{{$t('m.appDownLoad.androidcode')}}</p>
              </div>
            </div>
            <a :href="$t('m.appDownLoad.howIosHref')" target="_blank" class="tip">{{$t('m.appDownLoad.howIos')}}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="app-download-mobile">
      <div class="logo">
        <img src="../../assets/images/app-download-logo.png">
        <h4>Riostox App V{{version}}</h4>
      </div>
      <div>
        <v-download v-if="isIos" :ios="true"></v-download>
        <v-download v-else></v-download>
        <a v-if="isIos" :href="$t('m.appDownLoad.howIosHref')" target="_blank" class="tip">{{$t('m.appDownLoad.howIos')}}</a>
        <a v-else href="javascript:;">{{$t('m.appDownLoad.googleplay')}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import AppCofig from '@/mixins/app-download'
import VDownload from './download'
import QRcode from 'qrcodejs2'
import { phoneType } from '@/utils/phone-type'
const phone = phoneType()

export default {
  mixins: [AppCofig],
  data() {
    return {
      isIos: phone.isIOS,
      qrcodeUrl: 'https://riostox.com/app_download'
    }
  },
  mounted() {
    this.createdQRcode()
  },
  components: {
    VDownload,
  },
  computed: {
    version() {
      return this.isIos ? this.appConfig.iOS.version : this.appConfig.android.version
    },
  },
  methods: {
    createdQRcode() {
      new QRcode(document.getElementById('ios-code'), {
        text: this.qrcodeUrl,
        width: 120,
        height: 120,
      })
      new QRcode(document.getElementById('android-code'), {
        text: this.qrcodeUrl,
        width: 120,
        height: 120,
      })
    },
  }
}
</script>

<style lang="scss" scoped>

.app-download-mobile {
  display: none;
}

.app-download-web {
  background: #f6f6f6;
  overflow: hidden;
}

.content-section {
  margin: 20px auto 50px;
  padding: 10px 40px 15px;
  width: 1200px;
  min-height: 700px;
  background-color: #ffffff;
  border: 1px solid #eaedf5;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.03) 0 5px 10px 0;
  // color: $color-3;
}

.app-page {
  display: flex;
  justify-content: space-around;
  margin: 120px 150px;

  &.en {
    margin: 120px 100px;
  }

  .app-img {
    display: block;
    width: 240px;
    height: 457px;
  }

  .title {
    margin-top: 20px;
    color: $color-3;
  }

  .vesion {
    height: 24px;
    font-size: 18px;
    display: inline-block;
    margin-right: 65px;
    margin-bottom: 10px;
  }

  h4 {
    height: 42px;
    line-height: 42px;
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: normal;
  }

  .tip {
    display: block;
    margin-top: 20px;
    margin-bottom: 10px;
    color: $color-3;
    font-size: 12px;
  }

  .code_wrap {
    padding-bottom: 30px;
    border-bottom: 1px solid #d8d8d8;

    p {
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
    }

    .dl {
      width: 146px;
      display: inline-block;
      &.en {
        width: 140px;
      }
    }

    .dl:nth-of-type(1) {
      margin-right: 50px;
    }
  }

  #ios-code,
  #android-code {
    padding: 10px;
    margin-bottom: 5px;
    text-align: center;
    width: 140px;
    height: 140px;
    border: 1px solid #eaedf5;
    border-radius: 3px;
  }
}

@include screen-h5-new() {
  .app-download-web {
    display: none;
  }
  .app-download-mobile {
    display: block;
    padding: 150px 0;
    text-align: center;
  }
  img {
    display: block;
    margin: 0 auto;
    height: 70px;
  }

  h4 {
    margin-bottom: 50px;
    font-weight: bold;
    font-size: 16px;
    color: $color-text;
  }

  a {
    display: block;
    padding: 0 40px;
    margin-top: 30px;
    font-size: 14px;
    color: #777777;
    text-decoration: none;
  }
}
</style>
