<template>
  <div class="bottom-current-delegation">
    <div class="block-title fb">
      <h5>
        <template>{{$t('m.exchange.openOrders')}}</template>
      </h5>
      <div class="opt">
        <v-checkbox class="current-delegation-check" v-model="checked">{{lang.hidePairs}}</v-checkbox>
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
          <th>{{$t('m.exchange.executed')}}</th>
          <th>{{$t('m.exchange.unexecuted')}}</th>
          <th>{{$t('m.exchange.openTotal')}}</th>
          <th>
            <v-tips :content="$t('m.exchange.cancelAllText')" id="all" @deleteOrder="deleteOrder">
              <span class="btn" slot="btn">{{$t('m.exchange.cancelAll')}}</span>
            </v-tips>
          </th>
        </tr>
      </thead>
      <div class="tbody-wrap scrollStyle">
        <tbody>
          <tr class="empty fb" v-if="list.length == 0">
            <td colspan="10">{{lang.noOrder}}</td>
          </tr>
          <tr v-for="item in list" :key="item.id" class="semi-bold">
            <td class="date">{{item.date}}</td>
            <td>{{item.marketName | upperCase}}</td>
            <td>{{item.ord_type == 'limit' ? lang.limit:lang.market}}</td>
            <td :class="item.kind">{{item.kind == 'bid' ? lang.buyText:lang.sellText}}</td>
            <td>{{item.price}}</td>
            <td>{{item.volume}}</td>
            <td>{{item.executed_volume}}</td>
            <td>{{item.remaining_volume}}</td>
            <td>{{item.total}}</td>
            <td>
              <v-tips
                :content="$t('m.exchange.cancelText')"
                :id="item.id"
                @deleteOrder="deleteOrder"
              >
                <span class="btn" slot="btn">{{$t('m.exchange.cancel')}}</span>
              </v-tips>
            </td>
          </tr>
        </tbody>
      </div>
    </table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

import VCheckbox from '@/components/checkbox'
import VTips from '@/components/tips'

export default {
  name: 'current-delegate',
  components: {
    VTips,
    VCheckbox,
  },
  data() {
    return {
      checked: false,
    }
  },
  computed: {
    ...mapGetters('openOrders', ['allOrders', 'currentOrders']),
    list() {
      return this.checked ? this.currentOrders : this.allOrders
    },
    lang() {
      let noOrder = this.$t('m.exchange.noOpenOrder')
      let limit = this.$t('m.exchange.limit')
      let market = this.$t('m.exchange.market')
      let buyText = this.$t('m.exchange.buy')
      let sellText = this.$t('m.exchange.sell')
      let hidePairs = this.$t('m.exchange.hidePairs')
      return { noOrder, limit, market, buyText, sellText, hidePairs }
    },
  },
  methods: {
    ...mapActions('openOrders', ['cancelOrder', 'clearOrder']),
    async cancelAll() {
      if (this.list.length === 0) return false
      const resp = await this.clearOrder()
      const result = resp && resp.data && resp.data.clearOrder
      if (result && result[0].id) {
        this.$notify.success({
          message: this.$t('m.successMessage.cancelSuccess'),
        })
      } else {
        this.$notify.error({
          message: this.$t('m.exchange.cancelFailed'),
        })
      }
    },
    async cancel(id) {
      const resp = await this.cancelOrder(id)
      const result = resp && resp.data && resp.data.cancelOrder && resp.data.cancelOrder.id
      if (result) {
        this.$notify.success({
          message: this.$t('m.successMessage.cancelSuccess'),
        })
      } else {
        this.$notify.error({
          message: this.$t('m.exchange.cancelFailed'),
        })
      }
    },
    deleteOrder(id) {
      if (id == 'all') {
        this.cancelAll()
      } else {
        this.cancel(id)
      }
    },
  },
}
</script>

<style lang="scss">
.current-delegation-check.th5-check-box {
  .label-3 {
    font-size: 13px;
  }
}
</style>

<style lang="scss" scoped>
.bottom-current-delegation {
  font-size: 12px;
  border-radius: 4px;
  background-color: #ffffff;
  padding: 0 15px 10px;
  min-height: 228px;
  margin-bottom: 15px;
  color: $color-assist1;
  border: 1px solid #eaedf5;
  .ask {
    color: $color-assist6;
  }
  .bid {
    color: $color-assist5;
  }
  .block-title {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    border-bottom: 1px solid $color-line;
    h5 {
      font-size: 14px;
      color: $color-assist1;
    }
    .opt {
      color: $color-assist3;
      user-select: none;
      cursor: pointer;
    }
  }
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    .btn {
      border: 1px solid #bdc7d1;
      padding: 0 10px;
      height: 22px;
      width: auto;
      line-height: 22px;
      border-radius: 2px;
      display: inline-block;
      font-size: 12px;
      color: $color-assist3;
      cursor: pointer;
      text-align: center;
    }
    th {
      color: $color-assist9;
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
          height: 150px;
          color: #cccccc;
          background-color: #ffffff;
          font-size: 14px;
          line-height: 150px;
        }
      }
    }
  }
}
</style>
