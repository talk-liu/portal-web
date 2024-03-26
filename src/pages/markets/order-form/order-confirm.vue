<template>
  <v-dialog :visible="visible">
    <div class="order-confirm-wrap" v-if="viewType !== 'h5'">
      <div class="header">
        <h4 class="regular">{{$t('m.exchange.confirmTitle')}}</h4>
        <i class="iconfont icon-guanbi" @click="()=>{this.$emit('close')}"></i>
      </div>
      <div class="content">
        <div class="desc">{{descText}}</div>
        <div class="info">
          <div>
            <p>{{$t('m.exchange.confirmTrading')}}{{name}}</p>
            <p>{{priceText}}<span class="num">{{price}}</span> {{quote}}</p>
            <p>{{isStop ? $t('m.exchange.stopConfirmMarketPrice'):$t('m.exchange.confirmMarketPrice')}}<span class="num">{{isStop ? triggerPrice:lastPrice}}</span> {{quote}}</p>
          </div>
          <div>
            <p>{{$t('m.exchange.confirmCount')}}{{volume}}</p>
            <p>{{$t('m.exchange.confirmTotal')}}{{total}} {{quote}}</p>
          </div>
        </div>
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
      <div class="title">{{$t('m.exchange.confirmTitle')}}</div>
      <div class="main">
        <div class="desc">{{descText}}</div>
        <div class="info">
          <p>{{$t('m.exchange.confirmTrading')}}{{name}}</p>
          <p>{{priceText}}<span class="num">{{price}}</span> {{quote}}</p>
          <p>{{isStop ? $t('m.exchange.stopConfirmMarketPrice'):$t('m.exchange.confirmMarketPrice')}}<span class="num">{{isStop ? triggerPrice:lastPrice}}</span> {{quote}}</p>
          <p>{{$t('m.exchange.confirmCount')}}{{volume}}</p>
          <p>{{$t('m.exchange.confirmTotal')}}{{total}} {{quote}}</p>
        </div>
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
import VDialog from '@/components/dialog'

export default {
  components: {
    VDialog,
  },
  props: ['visible', 'confirmType'],
  computed: {
    ...mapGetters('tickers', ['quoteUnit', 'baseUnit', 'lastPrice']),
    ...mapGetters('orderForm', ['total']),
    ...mapGetters('viewport', { viewType: 'type' }),
    ...mapState('orderForm', ['price', 'volume', 'type', 'triggerPrice', 'orderType']),
    descText() {
      if (this.confirmType === 'low') {
        return this.isStop ? this.$t('m.exchange.stopConfirmLowDesc') : this.$t('m.exchange.confirmLowDesc')
      } else {
        return this.isStop ? this.$t('m.exchange.stopConfirmHighDesc') : this.$t('m.exchange.confirmHighDesc')
      }
    },
    priceText() {
      if (this.type === 'buy') {
        return this.$t('m.exchange.confirmOrderBuyPrice')
      } else {
        return this.$t('m.exchange.confirmOrderSellPrice')
      }
    },
    quote() {
      return this.quoteUnit.toUpperCase()
    },
    name() {
      return this.baseUnit.toUpperCase() + '/' + this.quoteUnit.toUpperCase()
    },
    isStop() {
      return this.orderType === 'stop' ? true : false
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
    padding: 0 40px;
    .desc {
      font-size: 15px;
      line-height: 26px;
      margin: 28px 0 24px 0;

      @include themify($themes) {
        color: themed('textColor3');
      }
    }
    .info {
      display: flex;
      div {
        flex: 1;
        font-size: 13px;
        line-height: 18px;

        @include themify($themes) {
          color: themed('textColor3');
        }
        .num {
          @include themify($themes) {
            color: themed('sellColor');
          }
        }
        p {
          margin-bottom: 10px;
        }
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
    }
    .info {
      margin-top: 20px;
      p {
        font-size: 13px;
        line-height: 24px;
        font-weight: 600;

        @include themify($themes) {
          color: themed('textColor3');
        }
      }
      .num {
        @include themify($themes) {
          color: themed('sellColor');
        }
      }
    }
  }
  .footer {
    margin-top: 40px;
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
    .header {
      background-color: #1a1a1a;
      border-bottom: 1px solid #333333;
    }
    .footer {
      button {
        &:nth-child(1) {
          background-color: #171718;
          border-color: #171718;
          color: rgba(#ffffff, 0.7);
        }
      }
    }
  }
}
</style>
