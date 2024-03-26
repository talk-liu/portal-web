<template>
  <div class="mobile-current-wrap">
    <div :class="['item', item.kind]" v-for="item in myList" :key="item.id">
      <div class="name-wrap">
        <span class="name">{{item.marketName | upperCase}}</span>
        <a class="cancel" @click="cancel(item.id)">{{$t('m.exchange.cancel')}}</a>
      </div>
      <div class="type-wrap">
        <span :class="item.kind">{{item.kind==='bid'?$t('m.exchange.buy'):$t('m.exchange.sell')}}</span>
        <i class="line"></i>
        <span>{{$t('m.exchange.limit')}}</span>
        <i class="line"></i>
        <span>{{item.date}}</span>
      </div>
      <div class="info-wrap">
        <span class="max">
          {{$t('m.exchange.price')}}
          <span class="num">{{item.price}}</span>
        </span>
        <span>
          {{$t('m.exchange.amount')}}
          <span class="num">{{item.volume}}</span>
        </span>
        <span class="max">
          {{$t('m.exchange.openTotal')}}
          <span class="num">{{item.total}}</span>
        </span>
      </div>
      <div class="info-wrap">
        <span class="max">
          {{$t('m.exchange.executed')}}
          <span class="num">{{item.executed_volume}}</span>
        </span>
        <span>
          {{$t('m.exchange.unexecuted')}}
          <span class="num">{{item.remaining_volume}}</span>
        </span>
        <span class="max"></span>
      </div>
    </div>
  </div>
</template>

<script>
import orderMixin from './orderMixin'
export default {
  mixins: [orderMixin],
}
</script>

<style lang="scss" scoped>
.mobile-current-wrap {
  padding: 0 15px 60px;
  // height: 100px;
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
    .type-wrap {
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
    }
    .info-wrap {
      font-size: 10px;
      line-height: 13px;
      color: #777777;
      display: flex;
      margin-top: 5px;
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
  .mobile-current-wrap {
    .bid.item {
      background-color: #262626;
    }
    .ask.item {
      background-color: #262626;
    }
  }
}
</style>
