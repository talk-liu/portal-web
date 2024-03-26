<template>
  <div ref="currentBox" class="open-orders-table">
    <div class="thead">
      <ul class="th">
        <li class="side">{{$t('m.exchange.slide')}}</li>
        <li>{{$t('m.exchange.pair')}}</li>
        <li class="min120">{{$t('m.exchange.triggerConditions')}}</li>
        <li>{{$t('m.exchange.price')}}</li>
        <li>{{$t('m.exchange.amount')}}</li>
        <li>{{$t('m.exchange.conditionVolume')}}</li>
        <li class="right date">{{$t('m.exchange.date')}}</li>
        <li class="cancel-all right" @click="cancelAll">{{$t('m.exchange.cancelAll')}}</li>
      </ul>
    </div>
    <div class="tbody scrollStyle" v-if="myList.length">
      <ul :class="['tr', item.type]" v-for="item in myList" :key="item.id">
        <li :class="['side',item.side]">
          <span class="type kind">{{item.side==='bid'?$t('m.exchange.buy'):$t('m.exchange.sell')}}</span>
          <span class="type">{{$t('m.exchange.stopLimit')}}</span>
        </li>
        <li>{{item.marketName | upperCase}}</li>
        <li class="min120">{{item.trigger_price}}</li>
        <li>{{item.price}}</li>
        <li>{{item.volume}}</li>
        <li>{{item.total}}</li>
        <li class="right date">{{item.date}}</li>
        <li class="right">
          <a href="javascript:;" class="cancel" @click="cancel(item.id)">{{$t('m.exchange.cancel')}}</a>
        </li>
      </ul>
    </div>
    <div class="empty" v-else>{{$t('m.exchange.noOpenOrder')}}</div>
  </div>
</template>

<script>
import stopMixin from './stopMixin'

export default {
  mixins: [stopMixin],
}
</script>

<style lang="scss" scoped>
.open-orders-table {
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
    .date {
      min-width: 85px;
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
      .side {
        min-width: 110px;
      }
      .cancel-all {
        cursor: pointer;

        @include themify($themes) {
          color: themed('textColor3');
        }
      }
      .min120 {
        min-width: 120px;
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
      .min120 {
        min-width: 120px;
      }
      .type {
        text-transform: capitalize;
      }
      .side {
        min-width: 110px;
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
      .cancel {
        padding: 4px 10px;
        border-width: 1px;
        border-style: solid;
        border-radius: 2px;

        @include themify($themes) {
          color: themed('textColor6');
          border-color: themed('textColor9');
        }
        &:hover {
          @include themify($themes) {
            color: themed('textColor3');
            border-color: themed('textColor3');
          }
        }
      }
    }
  }
}

.theme-dark .open-orders-table .tbody .tr {
  &:nth-child(2n + 1) {
    background-color: rgba($color: #000000, $alpha: 0.1);
  }
  &:hover {
    background-color: rgba($color: #000000, $alpha: 0.3);
  }
}
</style>
