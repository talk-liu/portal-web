<template>
  <table-tpl
    :table-data="allOrders"
    :is-side="true"
    :is-market="true"
    :is-export="true"
    export-type="orders"
    :page-meta="orderMeta"
    @page-change="getHistoryData"
    @search="searchHistoryData"
    @cell-click="orderDetailHandle"
    ref="tableTpl"
  >
    <template slot="table-list">
      <template v-for="(head,idx) in headData">
        <el-table-column
          v-if="idx === 0"
          :key="`head-${idx}`"
          :prop="head.prop"
          :label="head.label"
          :width="head.width"
        >
          <template slot-scope="scope">
            <div :class="['side', scope.row.kind]">
              <span
                class="type kind"
              >{{scope.row.kind==='bid'?$t('m.exchange.buy'):$t('m.exchange.sell')}}</span>
              <span
                class="type"
              >{{scope.row.ord_type==='limit'?$t('m.exchange.limit'):$t('m.exchange.market')}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="idx === 2"
          :key="`head-${idx}`"
          :prop="head.prop"
          :label="head.label"
          :width="head.width"
        >
          <template slot-scope="scope">
            <span>{{scope.row.ord_type==='market'?$t('m.historyOrders.market'):scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="idx === headData.length - 2"
          :key="`head-${idx}`"
          :prop="head.prop"
          :label="head.label"
          :width="head.width"
        >
          <template slot-scope="scope">
            <span>{{scope.row.state==='done'?$t('m.historyOrders.deal'):$t('m.historyOrders.cancel')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="idx === headData.length - 1"
          :key="`head-${idx}`"
          :prop="head.prop"
          :label="head.label"
          :width="head.width"
          type="expand"
        >
          <template slot-scope="scope">
            <div
              class="deal-total fb"
            >{{$t('m.historyOrders.dealTotal')}}：{{scope.row.amount}} {{scope.row.unit}}</div>
            <el-table
              :data="historyOrdersDeatil[scope.row.id]"
              :class="['deatil-table',`table-${scope.row.id}`]"
              :empty-text="$t('m.noData')"
            >
              <el-table-column :label="$t('m.historyOrders.dealTime')" width="160">
                <template slot-scope="scopeExpand">
                  <div>{{scopeExpand.row.date}}</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('m.historyOrders.dealPrice')">
                <template slot-scope="scopeExpand">
                  <div>{{scopeExpand.row.price}}</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('m.historyOrders.dealAmount')">
                <template slot-scope="scopeExpand">
                  <div>{{scopeExpand.row.amount}}</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('m.historyOrders.dealTotal')">
                <template slot-scope="scopeExpand">
                  <div>{{scopeExpand.row.fFunds}}</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('m.historyOrders.poundage')">
                <template slot-scope="scopeExpand">
                  <div>{{scopeExpand.row.fFee}}</div>
                </template>
              </el-table-column>
            </el-table>
            <div
              class="pagination detail-pagination"
              v-if="tradeMeta && tradeMeta.total_count > tradeMeta.page_size"
            >
              <el-pagination
                background
                layout="prev, pager, next"
                :total="tradeMeta.total_count"
                :page-size="page_size"
                @current-change="changeDetailPage"
              ></el-pagination>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="`head-${idx}`"
          :prop="head.prop"
          :label="head.label"
          :width="head.width"
        />
      </template>
    </template>
  </table-tpl>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions, mapState } from 'vuex'
import dayjs from 'dayjs'
import TableTpl from '../table-template'
export default {
  components: {
    TableTpl,
  },
  data() {
    return {
      headData: [
        {
          prop: 'side',
          label: this.$t('m.exchange.slide'),
        },
        {
          prop: 'marketName',
          label: this.$t('m.exchange.pair'),
        },
        {
          prop: 'price',
          label: this.$t('m.exchange.price'),
        },
        {
          prop: 'volume',
          label: this.$t('m.exchange.amount'),
        },
        {
          prop: 'avg_price',
          label: this.$t('m.historyOrders.averagePrice'),
        },
        {
          prop: 'amount',
          label: this.$t('m.exchange.tradeTotal'),
        },
        {
          prop: 'date',
          label: this.$t('m.exchange.date'),
        },
        {
          prop: 'state',
          label: this.$t('m.exchange.status'),
          width: 80,
        },
        {
          prop: '',
          label: this.$t('m.historyOrders.operation'),
          width: 100,
        },
      ],
      begin_time: undefined,
      end_time: undefined,
      market: undefined,
      side: undefined,
      historyOrdersDeatil: {},
    }
  },
  computed: {
    ...mapGetters('historyOrders', ['allOrders']),
    ...mapGetters('historyTrades', ['allTrades']),
    ...mapGetters('currentUser', ['isLogin']),
    ...mapState('historyOrders', ['orderMeta']),
    ...mapState('historyTrades', ['tradeMeta']),
  },
  methods: {
    ...mapActions('historyOrders', ['getHistoryOrders']),
    ...mapActions('historyTrades', ['getHistoryTrades']),
    getHistoryData(page = 1, page_size = 20) {
      this.getHistoryOrders({
        page,
        page_size,
        from: this.begin_time,
        to: this.end_time,
        side: this.side,
        market: this.market,
      })
    },
    searchHistoryData(params) {
      const { to, from, side, market } = params
      let begin = undefined
      let end = undefined
      if (from) {
        begin = dayjs(from).unix()
      }
      if (to) {
        end = dayjs(to).unix()
      }
      this.begin_time = begin
      this.end_time = end
      this.side = side
      this.market = market
      this.getHistoryData()
    },
    modifyBtnHtml() {
      this.$nextTick(() => {
        const doms = document.getElementsByClassName('el-table__expand-column')
        for (let i = 0; i < doms.length; i++) {
          if (i > 0) {
            doms[i].innerHTML =
              '<div class="cell"><div class="el-table_btn"><button>' +
              this.$t('m.historyOrders.orderDetail') +
              '</button></div></div>'
          }
        }
      })
    },
    orderDetailHandle(row, column) {
      if (column.className && column.className.indexOf('el-table__expand-column') > -1) {
        const box = document.querySelector(`.deatil-table.table-${row.id}`)
        if (!box) {
          this.getOrderDetail(row)
        } else {
          this.$refs.tableTpl.tableToggleRowExpansion(row, false)
        }
      }
    },
    getOrderDetail(row) {
      if (this.row) {
        this.$refs.tableTpl.tableToggleRowExpansion(this.row, false)
      }
      this.row = row
      this.getHistoryTradeData(row)
    },
    getHistoryTradeData(row, page) {
      this.$refs.tableTpl.tableToggleRowExpansion(row, true)
      this.getHistoryTrades({ page: page || 1, order_id: row.id, from: this.begin_time, to: this.end_time }).then(
        () => {
          Vue.set(this.historyOrdersDeatil, row.id, this.allTrades)
        },
      )
    },
    changeDetailPage(val) {
      this.getHistoryTradeData(this.row, val)
    },
  },
  watch: {
    isLogin() {
      this.getHistoryData()
    },
  },
  updated() {
    this.modifyBtnHtml()
  },
  mounted() {
    this.modifyBtnHtml()
    if (this.isLogin) {
      this.getHistoryData()
    }
  },
}
</script>

<style lang="scss">
.el-table_btn button {
  background-color: #ffffff;
  color: #97a5b3;
  border: 1px solid #bdc7d1;
  display: inline-block;
  height: 22px;
  padding: 0 10px;
  line-height: 22px;
  font-size: 12px;
  text-align: center;
  border-radius: 3px;
  cursor: pointer;
  user-select: none;
  outline: none;
}

.expanded .el-table_btn button {
  background-color: #ffd200b8;
  color: #333333;
  border: none;
}
</style>


<style lang="scss" scoped>
.side {
  font-size: 12px;
  &.ask {
    @include themify($themes) {
      color: themed('sellColor');
    }
  }
  &.bid {
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
      top: 4px;
      right: -8px;

      @include themify($themes) {
        background-color: themed('lineBorderColorD8');
      }
    }
  }
}
</style>
