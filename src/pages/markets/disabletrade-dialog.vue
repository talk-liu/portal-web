<template>
  <v-dialog class="disableTradeDialog" :visible="visible">
    <v-box :title="$t('m.exchange.notice')" showClose="true" minHeight="335" @close="close" width="680">
      <div class="item">
        <p>{{$t('m.exchange.disabeltradeinfo')}}</p>
        <p class="disabeltradeinfo2">{{$t('m.exchange.disabeltradeinfo2')}}</p>
      </div>
      <div class="btn-wrap">
        <button class="cancel" @click="close()">{{$t('m.exchange.ok')}}</button>
        <button class="confirm" @click="goNotice">{{$t('m.exchange.announcements')}}</button>
        <!-- <v-btn class="cancel" type="new" width="120" height="40" @click="close()">{{$t('m.btnText.cancel')}}</v-btn> -->
        <!-- <v-btn type="primary" width="120" height="40" @click="submit">{{$t('m.btnText.confirmBtn')}}</v-btn> -->
      </div>
    </v-box>
  </v-dialog>
</template>

<script>
import VBox from '@/components/box'
import VDialog from '@/components/dialog'
import VBtn from '@/components/btn'

export default {
  props: ['currentMarketId'],
  components: {
    VBox,
    VDialog,
    VBtn,
  },
  data() {
    return {
      visible: false,
      disabelTradeMarketId: 'bch'
    }
  },
  methods: {
    showDialog() {
      this.visible = true
    },
    close() {
      this.visible = false
    },
    goNotice() {
      let url = this.$fifth.isCn
        ? 'https://help.riostox.com/hc/zh-cn/articles/360019065431'
        : 'https://help.riostox.com/hc/en-us/articles/360019065431-Riostox-will-Support-Bitcoin-Cash-Hard-Fork'
      if (this.currentMarketId.indexOf(this.disabelTradeMarketId) !== -1) {
        window.open(url)
      }
    },
  },
  watch: {
    currentMarketId() {
      if (this.currentMarketId.indexOf(this.disabelTradeMarketId) !== -1) {
        this.visible = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.disableTradeDialog {
  .item {
    margin: 30px 16px 0;
    label {
      margin-bottom: 10px;
      display: block;
      text-align: left;
      font-size: 12px;
      // color: #999999;
      @include themify($themes) {
        color: themed('textColor9');
      }
    }
    .disabeltradeinfo2 {
      padding: 30px 0;
    }
  }
  .btn-wrap {
    padding: 0 80px;
    display: flex;
    margin-top: 20px;
    justify-content: space-around;
    button {
      height: 40px;
      width: 120px;
      line-height: 40px;
      font-size: 16px;
      text-align: center;
      border-radius: 3px;
      outline: none;
      cursor: pointer;
      background-color: #f3f4f6;
      color: #333333;
      border: 0;
      &.confirm {
        &:hover {
          background-color: #ffd200;
        }
      }
    }
  }
}

.theme-dark {
  .disableTradeDialog {
    .item {
      p {
        color: rgba($color: #ffffff, $alpha: 0.7);
      }
    }

    .btn-wrap {
      button {
        background-color: #353535;
        color: rgba($color: #ffffff, $alpha: 0.7);
        &.confirm {
          &:hover {
            background-color: #e2a633;
            color: #171718;
          }
        }
      }
    }
  }
}
</style>
