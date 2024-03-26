<template>
  <div class="depth-table-ct">
    <div class="table-ct"
         :class="['orderbook-'+toggle.prev+'-'+toggle.idx]">
      <table>
        <thead>
          <tr class>
            <th class="fm">
              {{$t('m.exchange.price')}}
              <span class="semi-bold">{{quoteUnit | upperCase}}</span>
            </th>
            <th class="fm">
              {{$t('m.exchange.amount')}}
              <span class="semi-bold">{{baseUnit | upperCase}}</span>
            </th>
            <th class="fm">
              {{$t('m.exchange.orderTotal')}}
              <span class="semi-bold">{{quoteUnit | upperCase}}</span>
            </th>
          </tr>
        </thead>
        <tbody class="scrollStyle ask-table"
               v-if="currentAsksAmount">
          <tr class="red semi-bold"
              v-for="item in currentAsksAmount.orders"
              :key="item.id"
              @click="setOrderPrice(item.price)">
            <td>{{item.formatPrice}}</td>
            <td>{{item.formatAmount}}</td>
            <td>{{item.total}}</td>
            <div class="percent"
                 :style="formatPercent(item.amount,currentAsksAmount.max)"></div>
            <div class="self"
                 v-if="item.mySize > 0"></div>
          </tr>
        </tbody>
      </table>
      <div class="price-wrap"
           v-if="trades.length"
           @click="setOrderPrice([currentPrice.price])">
        <p class="semi-bold price-bid"
           v-if="currentPrice.type === 'buy'"
           :class="{fade:update}">
          <span>{{currentPrice.price}}</span>
          <span class="last-price">{{lastLegal(currentTicker,4)}}</span>
        </p>
        <p class="semi-bold price-ask"
           v-if="currentPrice.type === 'sell'"
           :class="{fade:update}">
          <span>{{currentPrice.price}}</span>
          <span class="last-price">{{lastLegal(currentTicker,4)}}</span>
        </p>
      </div>
      <table>
        <tbody class="scrollStyle bid-table"
               v-if="currentBidsAmount">
          <tr class="green semi-bold"
              v-for="item in currentBidsAmount.orders"
              :key="item.id"
              @click="setOrderPrice(item.price)">
            <td>{{item.formatPrice}}</td>
            <td>{{item.formatAmount}}</td>
            <td>{{item.total}}</td>
            <div class="percent"
                 :style="formatPercent(item.amount,currentBidsAmount.max)"></div>
            <div class="self"
                 v-if="item.mySize > 0"></div>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import BigNumber from 'bignumber.js'
import totalMoney from '@/mixins/total-money'

export default {
  mixins: [totalMoney],
  name: 'depth-table',
  props: ['currentBidsAmount', 'currentAsksAmount', 'toggle'],
  computed: {
    ...mapGetters('tickers', ['currentTicker', 'baseUnit', 'quoteUnit']),
    ...mapGetters('trades', ['trades']),
  },
  data() {
    return {
      update: true,
      currentPrice: {},
    }
  },
  watch: {
    trades(val, oldVal) {
      if (val.length === 0 || oldVal.length === 0) return false
      const date = val[0].date
      const oldDate = oldVal[0].date
      if (date === oldDate) return false
      this.formatCurrentPrice()
    },
    toggle() {
      setTimeout(() => {
        let askBox = document.querySelector('.ask-table')
        if (askBox) {
          askBox.scrollTop = askBox.scrollHeight
        }
      }, 0)
    },
  },
  mounted() {
    this.formatCurrentPrice()
  },
  methods: {
    ...mapMutations('standardPrice', ['setOrderPrice']),
    formatCurrentPrice() {
      if (this.trades.length > 1) {
        let fixed = this.currentTicker.bid_fixed
        this.currentPrice = {
          type: this.trades[0].type,
          price: BigNumber(this.trades[0].price).toFixed(fixed, 1),
        }
        this.update = false
        setTimeout(() => {
          this.update = true
        }, 100)
      }
    },
    formatPercent(val, max) {
      if (val === '-') {
        return { width: 0 }
      } else {
        let percent = (val / max) * 100
        return { width: `${percent}%` }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.depth-table-ct {
  color: $color-gray;
  border-top: 1px solid $color-assist4;
  margin-top: 10px;
  .last-price {
    text-align: center;
    color: #999999;
    font-size: 13px;
  }
  .price-wrap {
    height: 60px;
    border-top: 1px solid #eaedf5;
    border-bottom: 1px solid #eaedf5;
    margin: 5px 0;
    text-align: center;
    line-height: 60px;
    font-size: 26px;
    background-color: #ffffff;
    cursor: pointer;
    span {
      display: block;
      margin-top: 7px;

      &.last-price {
        margin-top: 3px;
      }
    }
    .price-ask {
      height: 60px;
      opacity: 0;
      transform: translateY(-15px);
      color: $color-assist6;
      line-height: 1;
    }
    .price-bid {
      height: 60px;
      opacity: 0;
      transform: translateY(15px);
      color: $color-assist5;
      line-height: 1;
    }
    .fade {
      height: 60px;
      opacity: 1;
      transition: 0.3s linear;
      transform: translateY(0);
      line-height: 1;
    }
  }
  .orderbook-2-0 {
    .ask-table {
      height: 270px;
      animation: 0.22s changeOrderbook20Ask;
    }
    .bid-table {
      height: 270px;
      animation: 0.22s changeOrderbook20Bid;
    }
    .price-wrap {
      animation: 0.22s changeOrderbook20Bid;
    }

    @keyframes changeOrderbook20Ask {
      0% {
        transform: translateY(270px);
      }
      100% {
        transform: translateY(0);
      }
    }

    @keyframes changeOrderbook20Bid {
      0% {
        transform: translateY(270px);
      }
      100% {
        transform: translateY(0);
      }
    }
  }
  .orderbook-1-0 {
    .ask-table {
      height: 270px;
      animation: 0.22s changeOrderbook10Ask;
    }
    .bid-table {
      height: 270px;
      animation: 0.22s changeOrderbook10Bid;
    }

    @keyframes changeOrderbook10Ask {
      0% {
        height: 0;
      }
      100% {
        height: 270px;
      }
    }

    @keyframes changeOrderbook10Bid {
      0% {
        height: 0;
      }
      100% {
        height: 270px;
      }
    }
  }
  .orderbook-0-1,
  .orderbook-1-1,
  .orderbook-2-1 {
    .ask-table {
      height: 0;
      animation: 0.22s changeOrderbook1Ask ease-out;
    }
    .bid-table {
      height: 540px;
    }

    @keyframes changeOrderbook1Ask {
      0% {
        height: 540px;
      }
      100% {
        height: 0;
      }
    }
  }
  .orderbook-0-2,
  .orderbook-1-2,
  .orderbook-2-2 {
    .ask-table {
      height: 540px;
      animation: 0.22s changeOrderbook2Ask ease-out;
    }
    .bid-table {
      height: 0;
    }

    @keyframes changeOrderbook2Ask {
      0% {
        height: 0;
      }
      100% {
        height: 540px;
      }
    }
  }
  .table-ct {
    table {
      table-layout: fixed;
      width: 100%;
      text-align: left;
      font-size: 13px;
      border-collapse: collapse;
      thead {
        tr {
          display: block;
          padding: 0 15px;
        }
        th {
          height: 38px;
          font-size: 12px;
          padding: 0 5px;
          color: $color-assist9;
          width: 75px;
          &:nth-child(1) {
            width: 95px;
          }
          &:nth-child(3) {
            width: 100px;
          }
          &:nth-child(2),
          &:nth-child(3) {
            text-align: right;
          }
        }
      }
      tbody {
        // width: 275px;
        display: block;
        padding: 0 15px;
        tr {
          display: flex;
          width: 100%;
          height: 27px;
          line-height: 27px;
          position: relative;
          td {
            padding: 0 5px;
            width: 75px;
            &:nth-child(1) {
              width: 95px;
            }
            &:nth-child(2) {
              text-align: right;
            }
            &:nth-child(3) {
              width: 100px;
              text-align: right;
              color: $color-assist2;
            }
          }
          &:hover {
            cursor: pointer;
            background-color: #f6f6f6;
          }

          > :nth-child(2) {
            color: $color-assist1;
          }
        }
      }
      .red {
        > :first-child {
          color: $color-assist6;
        }
        .percent {
          position: absolute;
          top: 2px;
          right: 0;
          height: 23px;
          background-color: #ee4343;
          opacity: 0.1;
        }
        .self {
          position: absolute;
          height: 6px;
          width: 4px;
          border-radius: 2px;
          left: -10px;
          top: 10px;
          background-color: #ee4343;
        }
      }
      .green {
        > :first-child {
          color: $color-assist5;
        }
        .percent {
          position: absolute;
          top: 2px;
          right: 0;
          height: 23px;
          background-color: #3bb46e;
          opacity: 0.1;
        }
        .self {
          position: absolute;
          height: 6px;
          width: 4px;
          border-radius: 2px;
          left: -10px;
          top: 10px;
          background-color: #3bb46e;
        }
      }
    }
  }
}
</style>
