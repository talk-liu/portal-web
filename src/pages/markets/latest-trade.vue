<template>
  <div class="trade-table">
    <div class="thead">
      <ul class="th">
        <li class="amount">{{$t('m.exchange.amount')}}</li>
        <li>{{$t('m.exchange.price')}}</li>
        <li>{{$t('m.exchange.tradeDate')}}</li>
      </ul>
    </div>
    <!-- <div class="tbody scrollStyle"> -->
    <transition-group name="latest-list" tag="div" :class="['tbody', 'scrollStyle', activeName]">
      <ul
        class="tr"
        @click="setPrice(item.price)"
        :class="item.type"
        v-for="item in trades"
        :key="item.tid"
      >
        <li class="amount">
          <span class="line"></span>
          <span>
            {{item.amount}}
            <span class="zero">{{item.amountZero}}</span>
          </span>
        </li>
        <li class="price">
          <span class="before">{{item.priceBefore}}.</span>
          <span class="after">{{item.priceAfter}}</span>
        </li>
        <li>{{item.date}}</li>
      </ul>
    </transition-group>
    <!-- </div> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      activeName: 'animation-init',
    }
  },
  computed: {
    ...mapGetters('trades', ['trades']),
  },
  methods: {
    ...mapMutations('orderForm', ['setPrice']),
  },
  mounted() {
    setTimeout(() => {
      this.activeName = 'animation-active'
    }, 1000)
  },
}
</script>

<style lang="scss" scoped>
.trade-table {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; // firefox hack
  .animation-active {
    .latest-list-enter-active {
      transition: all 1s;
      &.buy {
        @include themify($themes) {
          background-color: rgba(themed('buyColor'), 0.5);
        }
      }
      &.sell {
        @include themify($themes) {
          background-color: rgba(themed('sellColor'), 0.5);
        }
      }
    }
  }
  .tr,
  .th {
    display: flex;
    li {
      flex: 1;
      &:nth-child(1) {
        text-align: left;

        @include themify($themes) {
          color: themed('textColor3');
        }
      }
      &:nth-child(2) {
        text-align: center;
      }
      &:nth-child(3) {
        text-align: right;

        @include themify($themes) {
          color: themed('textColor9');
        }
      }
      .amount {
        max-width: 100px;
      }
    }
  }
  .thead {
    height: 30px;
    padding: 0 15px 0 0;
    margin-bottom: 10px;
    .th {
      font-size: 13px;
      line-height: 30px;
      border-bottom-width: 1px;
      border-bottom-style: solid;

      @include themify($themes) {
        border-color: themed('lineBorderColorF5');
      }
      li {
        text-align: right;
        display: flex;
        justify-content: flex-end;

        @include themify($themes) {
          color: themed('textColor7');
        }
      }
    }
  }
  .tbody {
    flex: 1;
    overflow-y: scroll;
    font-family: dinMedium;
    min-height: 0; // firefox hack
    .buy {
      .before {
        @include themify($themes) {
          color: rgba(themed('buyColor'), 0.5);
        }
      }
      .after {
        @include themify($themes) {
          color: themed('buyColor');
        }
      }
      .line {
        @include themify($themes) {
          background-color: themed('buyColor');
        }
      }
    }
    .sell {
      .before {
        @include themify($themes) {
          color: rgba(themed('sellColor'), 0.5);
        }
      }
      .after {
        @include themify($themes) {
          color: themed('sellColor');
        }
      }
      .line {
        @include themify($themes) {
          background-color: themed('sellColor');
        }
      }
    }
    .tr {
      height: 22px;
      line-height: 22px;
      font-size: 12px;
      padding: 0 15px 0 0;
      cursor: pointer;
      .price {
        cursor: pointer;
      }
      .zero {
        @include themify($themes) {
          color: themed('zeroColor');
        }
      }
      li {
        text-align: right;
        &:nth-child(1) {
          display: flex;
          justify-content: space-between;
          text-align: right;
          .line {
            display: block;
            height: 22px;
            width: 1px;
          }
        }
        &:last-child {
          font-family: dinRegular;
        }
      }
    }
  }
}
</style>

