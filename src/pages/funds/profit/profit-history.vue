<template>
  <div class="profit-records">
    <div class="title">{{$t("m.funds.profit.atHoldHistory")}}</div>
    <div class="records-table clearfix">
      <el-table :data="profitsHistory" style="width: 100%;" class="profit-table" :empty-text="$t('m.noData')">
        <el-table-column width="220" class="fb" :label="$t('m.funds.historyRecords.rewardsDistributedDate')">
          <template slot-scope="scope">
            <span class="fb">{{scope.row.update_time}}</span>
          </template>
        </el-table-column>
        <el-table-column class="fb" :label="$t('m.funds.historyRecords.btcProfit')">
          <template slot-scope="scope">
            <span class="fb">{{scope.row.btc || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column class="fb" :label="$t('m.funds.historyRecords.ethProfit')">
          <template slot-scope="scope">
            <span class="fb">{{scope.row.eth || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column class="fb" :label="$t('m.funds.historyRecords.usdtProfit')">
          <template slot-scope="scope">
            <span class="fb">{{scope.row.usdt || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column class="fb" :label="$t('m.funds.historyRecords.atProfit')" v-if="total_profit.beu.at > 0">
          <template slot-scope="scope">
            <span class="fb">{{scope.row.at || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column class="fb" :label="$t('m.funds.historyRecords.trxProfit')">
          <template slot-scope="scope">
            <span class="fb">{{scope.row.trx || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column class="fb" :label="$t('m.funds.historyRecords.totalDailyRewards')">
          <template slot-scope="scope">
            <span class="fb">{{totalDailyRewards(scope.row)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" v-if='profitsMeta.total_count > 60'>
        <el-pagination background layout="prev, pager, next"  :total="profitsMeta.total_count" :page-size="60" @current-change="changePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import profitHistory from '@/mixins/profit-history'
import { mapGetters, mapState, mapActions } from 'vuex'
import {
  Table,
  TableColumn,
  Pagination
} from 'element-ui'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
export default {
  mixins: [profitHistory],
  computed: {
    ...mapGetters('historyProfits', ['profitsHistory']),
    ...mapState('historyProfits', ['profitsMeta']),
    ...mapState('myIncome', ['total_profit']),
  },
  methods: {
    ...mapActions('historyProfits', ['getProfitsHistory']),
    changePage(page) {
      this.toggleData(page)
    },
    toggleData(page = 1) {
      this.getProfitsHistory({
        page,
        page_size: 60
      })
    },
  },
  created() {
    this.toggleData()
  },
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/variable.scss';

  .profit-records {
    padding-bottom: 30px;
    .title {
      color: #333333;
      font-size: 15px;
      margin-bottom: 20px;
      text-align: center;
    }
  }

  .pagination {
    text-align: right;
    margin-top: 20px;
  }
</style>
<style lang="scss">
  .profit-table {
    th {
      background-color: #fafafa;
      color: #000000;
    }
  }
</style>
