<template>
  <table-tpl
    :table-data="allTrades"
    :is-market="true"
    :is-export="true"
    export-type="trades"
    :page-meta="tradeMeta"
    @page-change="getHistoryData"
    @search="searchHistoryData"
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
            <div :class="['side', scope.row.type]">
              <span>{{scope.row.type==='buy'?$t('m.exchange.buy'):$t('m.exchange.sell')}}</span>
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
          label: this.$t('m.historyOrders.dealPrice'),
        },
        {
          prop: 'amount',
          label: this.$t('m.historyOrders.dealAmount'),
        },
        {
          prop: 'fFunds',
          label: this.$t('m.exchange.tradeTotal'),
        },
        {
          prop: 'date',
          label: this.$t('m.exchange.date'),
        },
        {
          prop: 'fFee',
          label: this.$t('m.historyOrders.poundage'),
        },
      ],
      begin_time: undefined,
      end_time: undefined,
      market: undefined,
    }
  },
  computed: {
    ...mapGetters('historyTrades', ['allTrades']),
    ...mapGetters('currentUser', ['isLogin']),
    ...mapState('historyTrades', ['tradeMeta']),
  },
  methods: {
    ...mapActions('historyTrades', ['getHistoryTrades']),
    getHistoryData(page = 1, page_size = 20) {
      this.getHistoryTrades({
        page,
        page_size,
        from: this.begin_time,
        to: this.end_time,
        market: this.market,
      })
    },
    searchHistoryData(params) {
      const { to, from, market } = params
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
      this.market = market
      this.getHistoryData()
    },
  },
  watch: {
    isLogin() {
      this.getHistoryData()
    },
  },
  mounted() {
    if (this.isLogin) {
      this.getHistoryData()
    }
  },
}
</script>

<style lang="scss" scoped>
.side {
  font-size: 12px;
  &.sell {
    @include themify($themes) {
      color: themed('sellColor');
    }
  }
  &.buy {
    @include themify($themes) {
      color: themed('buyColor');
    }
  }
}
</style>
