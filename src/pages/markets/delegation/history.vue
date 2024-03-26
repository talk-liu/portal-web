<template>
  <div class="history-orders-table">
    <div class="thead">
      <ul class="th">
        <li>{{$t('m.exchange.slide')}}</li>
        <li>{{$t('m.exchange.pair')}}</li>
        <li>{{$t('m.exchange.price')}}</li>
        <li>{{$t('m.exchange.amount')}}</li>
        <li>{{$t('m.exchange.tradeTotal')}}</li>
        <li class="right">{{$t('m.exchange.date')}}</li>
        <li class="right">{{$t('m.exchange.status')}}</li>
      </ul>
    </div>
    <div class="tbody scrollStyle" v-if="historyList.length">
      <ul :class="['tr', item.type]" v-for="item in historyList" :key="item.id">
        <li :class="item.kind">
          <span class="type kind">{{item.kind==='bid'?$t('m.exchange.buy'):$t('m.exchange.sell')}}</span>
          <span class="type">{{item.ord_type==='limit'?$t('m.exchange.limit'):$t('m.exchange.market')}}</span>
        </li>
        <li>{{item.marketName | upperCase}}</li>
        <li>{{item.ord_type==='market'?$t('m.exchange.market'):item.price}}</li>
        <li>{{item.volume}}</li>
        <li>{{item.amount || item.total}}</li>
        <li class="right">{{item.date}}</li>
        <li class="right">{{item.state==='done'?$t('m.exchange.orderDone'):$t('m.exchange.orderCancel')}}</li>
      </ul>
    </div>
    <div class="empty" v-else>{{$t('m.exchange.noOrderHistory')}}</div>
  </div>
</template>

<script>
import orderMixin from './orderMixin'

export default {
  mixins: [orderMixin]
}
</script>

<style lang="scss" scoped>
.history-orders-table {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: 370px;
  padding: 0 20px 18px;
  .empty {
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 13px;

    @include themify($themes) {
      color: themed('textColorC');
    }
  }
  .right {
    text-align: right;
  }
  .tr,
  .th {
    display: flex;
    padding: 0 10px;
    li {
      flex: 1;
    }
  }
  .thead {
    width: 100%;
    .th {
      font-size: 12px;
      height: 32px;
      line-height: 32px;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-top-width: 1px;
      border-top-style: solid;

      @include themify($themes) {
        border-color: themed('lineBorderColorF5');
        color: themed('textColor7');
      }
    }
  }
  .tbody {
    flex: 1;
    max-height: 165px;
    padding: 10px 0;
    .tr {
      font-size: 12px;
      height: 36px;
      line-height: 36px;
      font-family: dinRegular;

      @include themify($themes) {
        color: themed('textColor3');
      }
      &:nth-child(2n + 1) {
        @include themify($themes) {
          background-color: themed('bgColor');
        }
      }
      &:hover {
        cursor: pointer;

        @include themify($themes) {
          background-color: themed('orderHover');
        }
      }
      .type {
        text-transform: capitalize;
      }
      .ask {
        @include themify($themes) {
          color: themed('sellColor');
        }
      }
      .bid {
        @include themify($themes) {
          color: themed('buyColor');
        }
      }
      .kind {
        position: relative;
        margin-right: 10px;
        &:after {
          content: '';
          display: inline-block;
          height: 14px;
          width: 1px;
          position: absolute;
          top: 1px;
          right: -6px;

          @include themify($themes) {
            background-color: themed('lineBorderColorD8');
          }
        }
      }
    }
  }
}

.theme-dark .history-orders-table .tbody .tr {
  &:nth-child(2n + 1) {
    background-color: rgba($color: #000000, $alpha: 0.1);
  }
  &:hover {
    background-color: rgba($color: #000000, $alpha: 0.3);
  }
}
</style>
