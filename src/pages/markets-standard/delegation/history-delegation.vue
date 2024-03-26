<template>
  <div class="bottom-delegation" v-show="list.length >= 0">
    <div class="block-title fb">
      <h5>{{$t('m.exchange.orderHistory')}}</h5>
      <router-link
        :to="$i18nRoute({ path: '/history/orders/history' })"
        class="go-all"
      >{{$t('m.exchange.more')}}</router-link>
      <div class="opt">
        <v-checkbox class="history-delegation-check" v-model="checked">{{lang.hidePairs}}</v-checkbox>
      </div>
    </div>
    <table>
      <thead>
        <tr class="fb">
          <th>{{$t('m.exchange.date')}}</th>
          <th>{{$t('m.exchange.pair')}}</th>
          <th>{{$t('m.exchange.type')}}</th>
          <th>{{$t('m.exchange.slide')}}</th>
          <th>{{$t('m.exchange.price')}}</th>
          <th>{{$t('m.exchange.amount')}}</th>
          <th>{{$t('m.exchange.tradeAmount')}}</th>
          <th>{{$t('m.exchange.tradeTotal')}}</th>
          <th>{{$t('m.exchange.status')}}</th>
        </tr>
      </thead>
      <div class="tbody-wrap scrollStyle">
        <tbody>
          <tr class="empty fb" v-if="list.length == 0">
            <td colspan="11">{{lang.noOrderHistory}}</td>
          </tr>
          <tr v-else v-for="item in list" :key="item.id" class="semi-bold">
            <td>{{item.date}}</td>
            <td>{{item.marketName | upperCase}}</td>
            <td>{{item.ord_type == 'limit'?lang.limit:lang.market}}</td>
            <td :class="item.kind">{{item.kind =='bid'? lang.buyText:lang.sellText}}</td>
            <td>{{item.ord_type==='market'?$t('m.exchange.market'):item.price}}</td>
            <td>{{item.volume}}</td>
            <td>{{item.executed_volume}}</td>
            <td>{{item.amount || item.total}}</td>
            <td>{{item.state==='done'?$t('m.exchange.orderDone'):$t('m.exchange.orderCancel')}}</td>
          </tr>
        </tbody>
      </div>
    </table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import VCheckbox from '@/components/checkbox'

export default {
  components: {
    VCheckbox,
  },
  data() {
    return {
      checked: false,
    }
  },
  computed: {
    ...mapGetters('historyOrders', ['allOrders', 'currentOrders']),
    list() {
      return this.checked ? this.currentOrders : this.allOrders
    },
    lang() {
      let noOrderHistory = this.$t('m.exchange.noOrderHistory')
      let limit = this.$t('m.exchange.limit')
      let market = this.$t('m.exchange.market')
      let buyText = this.$t('m.exchange.buy')
      let sellText = this.$t('m.exchange.sell')
      let hidePairs = this.$t('m.exchange.hidePairs')
      return { noOrderHistory, limit, market, buyText, sellText, hidePairs }
    },
  },
}
</script>

<style lang="scss">
.history-delegation-check.th5-check-box {
  .label-3 {
    font-size: 13px;
  }
}
</style>

<style lang="scss" scoped>
.bottom-delegation {
  border: 1px solid #eaedf5;
  border-radius: 4px;
  background-color: #ffffff;
  padding: 0 15px 10px;
  min-height: 228px;
  font-size: 12px;
  color: $color-assist1;
  .ask {
    color: $color-assist6;
  }
  .bid {
    color: $color-assist5;
  }
  .block-title {
    position: relative;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    border-bottom: 1px solid $color-line;
    .go-all {
      color: #9dadbb;
      position: absolute;
      right: 2px;
      top: 0;
    }
    h5 {
      font-size: 14px;
      color: $color-assist1;
    }
    .opt {
      color: $color-assist3;
      user-select: none;
      cursor: pointer;
      .th5-check-box {
        margin-right: 100px;
      }
    }
  }
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    th {
      color: $color-assist9;
      font-size: 12px;
      height: 40px;
      text-align: left;
      padding-left: 10px;
      &:last-child {
        color: $color-assist3;
        text-align: center;
      }
    }
    .tbody-wrap {
      width: 1180px;
      max-height: 800px;
    }
    tbody {
      display: block;
      width: 1170px;
      padding-right: 0;
      tr {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        td {
          text-align: left;
          flex: 1;
          padding-left: 10px;
          &:last-child {
            text-align: center;
          }
        }
        &:nth-child(2n + 1) {
          background-color: $color-assist4;
        }
        &.empty {
          background-color: #ffffff;
        }
      }
    }
    .empty {
      height: 150px;
      color: #cccccc;
      font-size: 14px;
      line-height: 150px;
      td {
        text-align: center;
      }
    }
  }
}
</style>
