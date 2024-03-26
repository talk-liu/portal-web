<template>
  <v-dialog :visible="visible">
    <div class="order-confirm-wrap" v-if="viewType !== 'h5'">
      <div class="header">
        <h4 class="regular">{{$t('m.exchange.reminder')}}</h4>
        <i class="iconfont icon-guanbi" @click="()=>{this.$emit('close')}"></i>
      </div>
      <div class="content">
        <p class="desc">{{desc[0]}}<span class="num">{{desc[1] | thousands}}</span>{{desc[2]}}<span class="num">{{desc[3] | thousands}}</span>{{desc[4]}}<span class="num">{{desc[5] | thousands}}</span>{{desc[6]}}</p>
        <p class="desc">{{desc[7]}}<span class="num">{{desc[8] | thousands}}</span>{{desc[9]}}</p>
        <p class="tips">{{$t('m.exchange.stopDescTips')}}</p>
      </div>
      <div class="footer">
        <button @click="()=>{this.$emit('close')}">{{$t('m.exchange.cancelBtn')}}</button>
        <button @click="()=>{this.$emit('confirm')}">{{$t('m.exchange.confirmBtn')}}</button>
      </div>
    </div>
    <div class="mobile-order-confirm-wrap" v-else>
      <div class="close">
        <i class="iconfont icon-guanbi" @click="()=>{this.$emit('close')}"></i>
      </div>
      <div class="title">{{$t('m.exchange.reminder')}}</div>
      <div class="main">
        <p class="desc">{{desc[0]}}<span class="num">{{desc[1] | thousands}}</span>{{desc[2]}}<span class="num">{{desc[3] | thousands}}</span>{{desc[4]}}<span class="num">{{desc[5] | thousands}}</span>{{desc[6]}}</p>
        <p class="desc">{{desc[7]}}<span class="num">{{desc[8] | thousands}}</span>{{desc[9]}}</p>
        <div class="tips">{{$t('m.exchange.stopDescTips')}}</div>
      </div>
      <div class="footer">
        <button class="confirm" @click="()=>{this.$emit('confirm')}">{{$t('m.exchange.confirmBtn')}}</button>
        <button class="cancel" @click="()=>{this.$emit('close')}">{{$t('m.exchange.cancelBtn')}}</button>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import BigNumber from 'bignumber.js'
import VDialog from '@/components/dialog'

export default {
  components: {
    VDialog,
  },
  props: ['visible'],
  computed: {
    ...mapGetters('tickers', ['quoteUnit', 'baseUnit', 'lastPrice']),
    ...mapGetters('viewport', { viewType: 'type' }),
    ...mapState('orderForm', ['price', 'volume', 'type', 'triggerPrice']),
    base() {
      return this.baseUnit.toUpperCase()
    },
    quote() {
      return this.quoteUnit.toUpperCase()
    },
    desc() {
      let tpl = []
      if (this.type === 'buy') {
        if (BigNumber(this.triggerPrice).gt(this.lastPrice)) {
          tpl = this.$t('m.exchange.buyUpDesc', {
            triggerPrice: this.triggerPrice,
            price: this.price,
            volume: this.volume,
            base: this.base,
            quote: this.quote,
          }).split('<s>')
        } else {
          tpl = this.$t('m.exchange.buyDownDesc', {
            triggerPrice: this.triggerPrice,
            price: this.price,
            volume: this.volume,
            base: this.base,
            quote: this.quote,
          }).split('<s>')
        }
      } else {
        if (BigNumber(this.triggerPrice).gt(this.lastPrice)) {
          tpl = this.$t('m.exchange.sellUpDesc', {
            triggerPrice: this.triggerPrice,
            price: this.price,
            volume: this.volume,
            base: this.base,
            quote: this.quote,
          }).split('<s>')
        } else {
          tpl = this.$t('m.exchange.sellDownDesc', {
            triggerPrice: this.triggerPrice,
            price: this.price,
            volume: this.volume,
            base: this.base,
            quote: this.quote,
          }).split('<s>')
        }
      }
      // at交易特殊提示且只有卖出提示
      if (this.base === 'AT' || this.quote === 'AT') {
        if (this.type === 'sell') {
          this.$t('m.exchange.atDesc', { volume: this.volume })
            .split('<s>')
            .map(item => {
              tpl.push(item)
            })
        }
      }
      return tpl
    },
  },
}
</script>

<style lang="scss" scoped>
.order-confirm-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  transform: translate(-50%, -50%);
  border-radius: 5px;

  @include themify($themes) {
    background-color: themed('wrapBgColor');
  }
  .header {
    border-radius: 5px 5px 0 0;
    height: 70px;
    line-height: 70px;
    text-align: center;
    position: relative;

    @include themify($themes) {
      background-color: themed('primaryColor');
    }
    h4 {
      display: inline-block;
      font-size: 24px;
      font-weight: 400;
      text-align: center;

      @include themify($themes) {
        color: themed('textColor3');
      }
    }
    i {
      font-size: 20px;
      float: right;
      line-height: 36px;
      cursor: pointer;
      position: absolute;
      right: 20px;
      top: 17px;

      @include themify($themes) {
        color: themed('textColor3');
      }
    }
  }
  .content {
    padding: 24px 40px 0;
    .desc {
      font-size: 13px;
      line-height: 24px;

      @include themify($themes) {
        color: themed('textColor3');
      }
      .num {
        @include themify($themes) {
          color: themed('textError');
        }
      }
    }
    .tips {
      font-size: 13px;
      line-height: 18px;
      margin-top: 16px;

      @include themify($themes) {
        color: themed('textError');
      }
    }
  }
  .footer {
    height: 50px;
    margin: 35px 0;
    padding: 2px 40px;
    display: flex;
    justify-content: space-between;
    button {
      display: inline-block;
      width: 180px;
      height: 46px;
      line-height: 46px;
      border: none;
      color: #333333;
      font-size: 18px;
      border-radius: 3px;
      text-align: center;
      outline: none;
      cursor: pointer;
      &:nth-child(1) {
        border: 1px solid #bdc7d1;
        color: #97a5b3;
      }
      &:nth-child(2) {
        @include themify($themes) {
          background-color: themed('primaryColor');
        }
      }
    }
  }
}

.mobile-order-confirm-wrap {
  height: 100%;
  padding: 15px;

  @include themify($themes) {
    background-color: themed('wrapBgColor');
  }
  .close {
    @include themify($themes) {
      color: themed('textColor3');
    }
  }
  .title {
    font-size: 18px;
    margin: 18px 0;

    @include themify($themes) {
      color: themed('textColor3');
    }
  }
  .main {
    .desc {
      margin: 12px 0;
      font-size: 13px;
      line-height: 26px;

      @include themify($themes) {
        color: themed('textColor3');
      }
      .num {
        @include themify($themes) {
          color: themed('textError');
        }
      }
    }
    .tips {
      font-size: 13px;

      @include themify($themes) {
        color: themed('textError');
      }
    }
  }
  .footer {
    margin-top: 50px;
    button {
      outline: none;
      display: block;
      width: 100%;
      height: 40px;
      font-size: 14px;
      line-height: 40px;
      text-align: center;
      border: none;

      @include themify($themes) {
        color: themed('textColor3');
      }
    }
    .confirm {
      border-radius: 3px;

      @include themify($themes) {
        background-color: themed('primaryColor');
        border-color: themed('primaryColor');
      }
    }
    .cancel {
      @include themify($themes) {
        background-color: themed('wrapBgColor');
      }
    }
  }
}

.theme-dark {
  .order-confirm-wrap {
    background-color: #222222;
    .header {
      background-color: #222222;
      border-bottom: 1px solid #333333;
    }
    .footer {
      button {
        &:nth-child(1),
        &:nth-child(2) {
          background-color: #353535;
          border-color: #353535;
          color: rgba(#ffffff, 0.7);
        }
        &:nth-child(2) {
          &:hover {
            background-color: #ffd200;
            color: #333333;
          }
        }
      }
    }
  }
}
</style>
