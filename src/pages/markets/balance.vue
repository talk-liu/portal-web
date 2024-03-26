<template>
  <div class="balance-wrap">
    <div class="totalAccount">
      <span class="num-strong btcval">{{totalAccount.btc}}</span>
      <span class="word-strong" :style="{margin: '0 6px'}">BTC</span>
      <span class="num-normal">≈ {{lastLegal(totalAccount.usdt)}}</span>
    </div>
    <div class="iconInfo" v-if="type==='sell'">
      <div class="icon"  :style="{backgroundImage: baseUnit ? `url(https://i.riostox.com/img/currency/${baseUnit}.png)` : ''}"></div>
      <div class="info">
        <div :style="{marginBottom: '7px'}">
          <span class="num-strong">{{baseUnit | upperCase}}</span>
          <span class="word-light readable-name" :style="{marginLeft: '6px'}">{{curAccount['readable_name']}}</span>
        </div>
        <div :style="{marginBottom: '16px'}">
          <span class="num-strong" :style="{fontSize: '13px'}">{{curAccount.total}}</span>
          <span class="word-strong" :style="{fontSize: '12px'}">{{baseUnit | upperCase}}</span>
          <span class="num-light">≈ {{lastLegal(curAccount.usdt)}}</span>
        </div>
        <div class="areawrap">
          <div class="area">
            <div class="title word-light">{{$t('m.exchange.balance')}}</div>
            <div class="num num-light">{{Number(curAccount.balance).toFixed(8)}}</div>
          </div>
          <div class="area last">
            <div class="title word-light">{{$t('m.funds.frozed')}}</div>
            <div class="num num-light">{{Number(curAccount.locked).toFixed(8)}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="iconInfo" v-else>
      <div class="icon"  :style="{backgroundImage: currentTicker.quote_unit ? `url(https://i.riostox.com/img/currency/${currentTicker.quote_unit}.png)` : ''}"></div>
      <div class="info">
        <div :style="{marginBottom: '7px'}">
          <span class="num-strong">{{currentTicker.quote_unit}}</span>
          <span class="word-light readable-name" :style="{marginLeft: '6px'}">{{usdtAccount['readable_name']}}</span>
        </div>
        <div :style="{marginBottom: '16px'}">
          <span class="num-strong" :style="{fontSize: '13px'}">{{usdtAccount.total}}</span>
          <span class="word-strong" :style="{fontSize: '12px'}">{{currentTicker.quote_unit}}</span>
          <span class="num-light">≈ {{lastLegal(usdtAccount.usdt)}}</span>
        </div>
        <div class="areawrap">
          <div class="area">
            <div class="title word-light">{{$t('m.exchange.balance')}}</div>
            <div class="num num-light">{{Number(usdtAccount.balance).toFixed(8)}}</div>
          </div>
          <div class="area last">
            <div class="title word-light">{{$t('m.funds.frozed')}}</div>
            <div class="num num-light">{{Number(usdtAccount.locked).toFixed(8)}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapState } from 'vuex'
import totalMoeny from '@/mixins/total-money'

export default {
  mixins: [totalMoeny],
  computed: {
    ...mapState('orderForm', ['price', 'volume', 'type', 'triggerPrice']),
    ...mapGetters('accounts', ['accounts', 'totalAccount']),
    ...mapGetters('tickers', ['baseUnit','currentTicker']),
    curAccount: function() {
      return this.accounts[this.baseUnit] || {}
    },
    usdtAccount: function() {
      return this.accounts[this.currentTicker.quote_unit] || {}
    },
  },
}
</script>

<style lang="scss" scoped>
.balance-wrap {
  padding: 0 20px;
  .totalAccount {
    height: 46px;
    line-height: 46px;
    margin-bottom: 16px;
    white-space: nowrap;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    // border-bottom: 1px solid #f5f5f5;
    @include themify($themes) {
      border-color: themed('lineBorderColorF5');
    }
    .btcval {
      font-family: dinMedium;
    }
  }
}

.num-strong {
  font-size: 18px;
  font-family: dinBold;

  @include themify($themes) {
    color: themed('textColor3');
  }
}

.num-normal {
  font-size: 12px;
  font-family: dinMedium;

  @include themify($themes) {
    color: themed('textColor6');
  }
}

.num-light {
  font-size: 12px;
  font-family: dinRegular;

  @include themify($themes) {
    color: themed('textColor6');
  }
}

.word-strong {
  font-size: 14px;
  font-weight: 500;
  font-family: euBold;

  @include themify($themes) {
    color: themed('textColor3');
  }
}

.word-light {
  font-size: 12px;
  font-family: enReuglar;

  @include themify($themes) {
    color: themed('textColor3');
  }
}

.iconInfo {
  display: flex;
  .icon {
    width: 23px;
    height: 23px;
    background-size: 100% 100%;
  }
  .info {
    flex: 1;
    margin-left: 11px;
    .readable-name {
      @include themify($themes) {
        color: themed('textColor9');
      }
    }
    .areawrap {
      display: flex;
      .area {
        flex: 1;
        .title {
          margin-bottom: 5px;

          @include themify($themes) {
            color: themed('textColor9');
          }
        }
        .num {
          font-size: 13px;

          @include themify($themes) {
            color: themed('textColor3');
          }
        }
        &.last {
          .num,
          .title {
            padding-left: 22px;
          }
          .num {
            border-left: 1px solid #d8d8d8;
          }
        }
      }
    }
  }
}
</style>

