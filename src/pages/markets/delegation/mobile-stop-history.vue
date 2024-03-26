<template>
  <div class="mobile-stop-history-wrap">
    <div :class="['item', item.side]" v-for="item in historyList" :key="item.id">
      <div class="name-wrap">
        <span class="name">{{item.marketName | upperCase}}</span>
      </div>
      <div class="status-wrap">
        <span :class="item.side">{{item.side==='bid'?$t('m.exchange.buy'):$t('m.exchange.sell')}}</span>
        <i class="line"></i>
        <span>{{$t('m.exchange.stopLimit')}}</span>
        <i class="line"></i>
        <span>{{item.date}}</span>
        <span class="status">{{item.state==3?$t('m.exchange.cancelled'):formatReason(item.reason)}}</span>
      </div>
      <div class="info-wrap">
        <span>
          {{$t('m.exchange.triggerConditions')}}
          <span class="num">{{item.trigger_price}}</span>
        </span>
        <span>
          {{$t('m.exchange.price')}}
          <span class="num">{{item.price}}</span>
        </span>
        <span>
          {{$t('m.exchange.amount')}}
          <span class="num">{{item.volume}}</span>
        </span>
      </div>
      <div class="info-wrap">
        <span>
          {{$t('m.exchange.openTotal')}}
          <span class="num">{{item.total}}</span>
        </span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
import stopMixin from './stopMixin'
export default {
  mixins: [stopMixin],
}
</script>

<style lang="scss" scoped>
.mobile-stop-history-wrap {
  padding: 0 15px 60px;
  .item {
    border-radius: 3px;
    margin-top: 6px;
    padding: 10px 15px;
    .name-wrap {
      display: flex;
      justify-content: space-between;
      .name {
        font-size: 12px;
        line-height: 18px;
        font-weight: 500;
        font-family: euBold;

        @include themify($themes) {
          color: themed('textColor3');
        }
      }
      .cancel {
        font-size: 10px;
        line-height: 14px;

        @include themify($themes) {
          color: themed('textColor3');
        }
      }
    }
    .status-wrap {
      font-size: 10px;
      margin: 5px 0;

      @include themify($themes) {
        color: themed('textColor3');
      }
      .bid {
        @include themify($themes) {
          color: themed('buyColor');
        }
      }
      .ask {
        @include themify($themes) {
          color: themed('sellColor');
        }
      }
      .line {
        display: inline-block;
        height: 10px;
        width: 1px;
        margin: 0 10px;

        @include themify($themes) {
          background-color: themed('lineBorderColorD8');
        }
      }
      .status {
        float: right;
      }
    }
    .info-wrap {
      font-size: 10px;
      line-height: 13px;
      // color: #777777;
      display: flex;
      margin-top: 5px;

      @include themify($themes) {
        color: themed('textColor6');
      }
      span {
        flex: 1;
        &:last-child {
          text-align: right;
        }
      }
      .num {
        font-family: dinMedium;

        @include themify($themes) {
          color: themed('textColor3');
        }
      }
      .max {
        min-width: 120px;
      }
    }
  }
  .bid.item {
    background-color: #e6f5e3;
  }
  .ask.item {
    background-color: #fff2f2;
  }
}

.theme-dark {
  .mobile-stop-history-wrap {
    .bid.item {
      background-color: #262626;
    }
    .ask.item {
      background-color: #262626;
    }
  }
}
</style>
