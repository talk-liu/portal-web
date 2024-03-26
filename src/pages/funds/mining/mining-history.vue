<template>
  <div class="mining-records">
    <div class="title">{{$t("m.funds.fundsMenu.mining")}}</div>
    <div class="records-table clearfix">
      <el-table :data="miningHistory" style="width: 100%;" class="mining-table" :empty-text="$t('m.noData')">
        <el-table-column width="220" class="fb" :label="$t('m.funds.historyRecords.miningDate')">
          <template slot-scope="scope">
            <span class="fb">{{scope.row.update_time}}</span>
          </template>
        </el-table-column>
        <el-table-column class="fb" :label="$t('m.funds.historyRecords.currency')">
          <template slot-scope="scope">
            <span class="fb">{{scope.row.currency && scope.row.currency.toUpperCase()}}</span>
          </template>
        </el-table-column>
        <el-table-column class="fb" :label="$t('m.funds.historyRecords.amount')">
          <template slot-scope="scope">
            <span class="fb">{{scope.row.amount | Fixed}}</span>
          </template>
        </el-table-column>
        <el-table-column class="fb" :label="$t('m.funds.historyRecords.source')">
          <template slot-scope="scope">
            <span class="fb">{{state[scope.row.source]}}</span>
          </template>
        </el-table-column>
        <el-table-column width="230" class="fb" :label="$t('m.funds.historyRecords.notes')">
          <template slot-scope="scope">
            <span class="fb">{{scope.row.extra}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" v-if='miningMeta.total_count > 20'>
        <el-pagination background layout="prev, pager, next"  :total="miningMeta.total_count" :page-size="20" @current-change="changePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapState, mapActions } from 'vuex'
import profitHistory from '@/mixins/profit-history'
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
  filters: {
    Fixed(val) {
      if (val.length > 9) {
        return Number(val).toFixed(8)
      } else {
        return val
      }
    },
  },
  computed: {
    ...mapGetters('historyMinings', ['miningHistory']),
    ...mapState('historyMinings', ['miningMeta']),
  },
  methods: {
    ...mapActions('historyMinings', ['getMiningHistory']),
    changePage(page) {
      this.toggleData(page)
    },
    toggleData(page = 1) {
      this.getMiningHistory({
        page
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

  .mining-records {
    margin-top: 50px;
    padding-bottom: 30px;
    .title {
      color: #333333;
      font-size: 15px;
      margin-bottom: 20px;
      text-align: center;
    }
  }

  .el-table {
    font-size: 12px;
  }

  .pagination {
    text-align: right;
    margin-top: 20px;
  }

  .el-table__header-wrapper {
    border-top: 1px solid #eaedf5;
  }
</style>
<style lang="scss">
  .mining-table {
    th {
      background-color: #fafafa;
      color: #000000;
    }
  }

  .el-pagination.is-background {
    .el-pager {
      li:not(.disabled).active,
      li:not(.disabled):hover {
        background-color: $color-primary;
        color: #333333;
      }
    }
  }
</style>
