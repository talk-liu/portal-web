<template>
  <div class="share" :class="{en: $fifth.lang === 'en'}">
    <div class="item" v-if="$fifth.lang === 'zh-CN'">
      <i class="iconfont icon-wx"></i>
      <span class="text">微信好友</span>
      <div class="popover">
        <div class="content">
          <div class="qrcode"></div>
          <p class="qrcode-text">扫码分享</p>
        </div>
      </div>
    </div>
    <div class="item" v-if="$fifth.lang === 'zh-CN'">
      <i class="iconfont icon-pengyouquan"></i>
      <span class="text">朋友圈</span>
      <div class="popover">
        <div class="content">
          <div class="qrcode"></div>
          <p class="qrcode-text">扫码分享</p>
        </div>
      </div>
    </div>
    <div class="item" v-if="$fifth.lang === 'zh-CN'">
      <i class="iconfont icon-weibo"></i>
      <span class="text">微博</span>
      <div class="popover">
        <div class="content">
          <p class="title">{{content}}</p>
          <a :href="url">{{url}}</a>
          <p class="btns">
            <v-btn type="info" fontSize="12" borderColor="#333" class="btn" @click="copy('weibo')">{{this.copyStatus.weibo ? $t('m.vote.copied') : $t('m.vote.copy')}}</v-btn>
            <a target="_blank" :href="'http://service.weibo.com/share/share.php?title=' + content + '&url=' + url">打开微博</a>
          </p>
        </div>
      </div>
    </div>
    <div class="item">
      <i class="iconfont icon-tele"></i>
      <span class="text">Telegram</span>
      <div class="popover">
        <div class="content">
          <p class="title">{{content}}</p>
          <a :href="url">{{url}}</a>
          <p class="btns">
            <v-btn type="info" fontSize="12" borderColor="#333" class="btn" @click="copy('telegram')">{{this.copyStatus.telegram ? $t('m.vote.copied') : $t('m.vote.copy')}}</v-btn>
            <a :href="$t('m.footerMenu.telegramHref')" target="_blank">{{$t('m.vote.shareTelegram')}}</a>
          </p>
        </div>
      </div>
    </div>
    <div class="item">
      <i class="iconfont icon-twitter"></i>
      <span class="text">Twitter</span>
      <div class="popover">
        <div class="content">
          <p class="title">{{content}}</p>
          <a :href="url">{{url}}</a>
          <p class="btns">
            <v-btn type="info" fontSize="12" borderColor="#333" class="btn" @click="copy('twitter')">{{this.copyStatus.twitter ? $t('m.vote.copied') : $t('m.vote.copy')}}</v-btn>
            <a target="_blank" :href="'https://twitter.com/share?text=' + content + '&url=' + url">{{$t('m.vote.shareTwitter')}}</a>
          </p>
        </div>
      </div>
    </div>
    <div class="item">
      <i class="iconfont icon-facebook"></i>
      <span class="text">Facebook</span>
      <div class="popover">
        <div class="content">
          <p class="title">{{content}}</p>
          <a :href="url">{{url}}</a>
          <p class="btns">
            <v-btn type="info" fontSize="12" borderColor="#333" class="btn" @click="copy('facebook')">{{this.copyStatus.facebook ? $t('m.vote.copied') : $t('m.vote.copy')}}</v-btn>
            <a target="_blank" :href="'https://www.facebook.com/sharer.php?title=' + content + '&u=' + encodeURIComponent(url)">{{$t('m.vote.shareFacebook')}}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.share {
  display: flex;
  border-top: 1px solid #eaedf5;
  padding-top: 28px;
  justify-content: center;
  &.en {
    width: 335px;
    margin: 0 auto;
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    // width: 65px;
    flex: 1;
    height: 65px;
    position: relative;
    &:hover {
      background: #f5f5f5;
      .popover {
        display: block;
      }
    }
    .iconfont {
      display: block;
    }
    .text {
      font-size: 12px;
      color: #777777;
      margin-top: 5px;
    }
    .popover {
      position: absolute;
      top: 72px;
      left: 10px;
      z-index: $zindex-popover;
      display: none;
      .content {
        padding: 20px;
        border: 1px solid #e9e9e9;
        box-shadow: 0 4px 7px rgba(0, 0, 0, 0.08);
        background: #ffffff;
        border-radius: 4px;
        &:after {
          background: #ffffff;
          border-right: 1px solid #e9e9e9;
          border-top: 1px solid #e9e9e9;
          content: "";
          display: block;
          height: 10px;
          position: absolute;
          left: 22px;
          top: -5px;
          transform: rotate(-45deg);
          width: 10px;
        }
      }
      .qrcode-text {
        font-size: 12px;
        color: #333333;
        margin-top: 8px;
      }
      .title {
        white-space: nowrap;
        text-align: left;
        font-size: 13px;
        color: #333333;
      }
      a {
        white-space: nowrap;
        text-align: left;
        color: #4c84ff;
        font-size: 12px;
        margin-top: 5px;
        display: block;
      }
      .btns {
        display: flex;
        margin-top: 16px;
        a {
          color: #333333;
          height: 32px;
          line-height: 32px;
          border-radius: 3px;
          text-align: center;
          border: 1px solid #333333;
          font-size: 12px;
          padding: 0 28px;
          margin-top: 0;
        }
        .btn {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>

<script>
import QRcode from 'qrcodejs2'
import VBtn from '@/components/btn'
import copyToClipboard from '@/utils/copy'
export default {
  components: {
    VBtn
  },
  props: ['currency'],
  data() {
    return {
      url: 'https://www.riostox.com/vote?lang=' + this.$fifth.lang,
      content: this.$t('m.vote.shareTip', { currency: this.currency }),
      copyStatus: {
        weibo: false,
        telegram: false,
        twitter: false,
        facebook: false
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.createQRcode()
    })
  },
  methods: {
    copy(type) {
      const success = copyToClipboard(this.content + this.url)
      if (success) {
        this.copyStatus[type] = true
      }
    },
    createQRcode() {
      const dom = document.getElementsByClassName('qrcode')
      if (dom && this.url) {
        for (let i = 0; i < dom.length; i++) {
          new QRcode(dom[i], {
            text: this.url,
            width: 86,
            height: 86,
          })
        }
      }
    }
  }
}
</script>

