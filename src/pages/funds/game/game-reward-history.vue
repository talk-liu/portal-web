<template>
  <div class="profit-records" v-if="content.length>0">
    <div class="title">{{$t('m.vote.rewardsHistory')}}</div>
    <div class="records-table clearfix">
      <el-table :data="content" style="width: 100%;" class="profit-table" :empty-text="$t('m.noData')">
        <el-table-column class="fb" :label="$t('m.funds.fundsMenu.week')" align="center" min-width="50%">
          <template slot-scope="scope">
            <span class="fb">{{getShowMessage(scope.row.groupName,scope.row.groupNameCn)}}</span>
          </template>
        </el-table-column>
        <el-table-column class="fb" :label="$t('m.funds.fundsMenu.rewards')" align="center" min-width="50%">
          <template slot-scope="scope">
            <span class="fb">{{scope.row.rewardAmount}} AT</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" v-if='content.length > 60'>
        <el-pagination background layout="prev, pager, next"  :total="profitsMeta.total_count" :page-size="60" @current-change="changePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>

import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import {
  Table,
  TableColumn,
  Pagination
} from 'element-ui'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
export default {
  computed: {
    ...mapState('historyAtGameReward', ['content']),
  },
  methods: {
    ...mapActions('historyAtGameReward', ['getGameRewardHistory']),
    changePage(page) {
      this.toggleData(page)
    },
    toggleData(page = 1) {
      this.getGameRewardHistory({
        page,
        num: 60
      })
    },
    getShowMessage(taskTitle, taskTitleCn) {
      if (this.$fifth.lang === 'zh-CN' || this.$fifth.lang === 'zh-TW') {
        return taskTitleCn
      } else {
        return taskTitle
      }
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
</style>
<style lang="scss">
  .profit-table {
    th {
      background-color: #fafafa;
      color: #000000;
    }
  }
</style>
