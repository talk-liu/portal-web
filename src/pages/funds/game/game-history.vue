<template>
  <div class="profit-records">
    <div class="title">{{$t("m.funds.historyRecords.totalPoints")}} : {{totalPoint}}</div>
    <div class="records-table clearfix">
      <el-table :data="contentData" style="width: 100%;" class="profit-table" :empty-text="$t('m.noData')">
        <el-table-column class="fb" :label="$t('m.funds.historyRecords.gameQuests')" min-width="70%">
          <template slot-scope="scope">
            <span>{{getShowMessage(scope.row.taskTitle,scope.row.taskTitleCn)}}</span>
          </template>
        </el-table-column>
        <el-table-column class="fb" :label="$t('m.funds.historyRecords.gamePoints')" min-width="20%">
          <template slot-scope="scope">
            <span>{{scope.row.Point}}</span>
          </template>
        </el-table-column>
        <el-table-column class="fb" :label="$t('m.funds.historyRecords.gameStatus')" min-width="10%">
          <template slot-scope="scope">
            <div v-if='scope.row.isCompleted >0'>
              <img class="img-1" src="../../../assets/images/game/box-select.png">
              <span >{{$t('m.funds.historyRecords.gameCompleted')}}</span>
            </div>
            <div v-else>
              <img class="img-1" src="../../../assets/images/game/box-unselect.png">
              <span >{{$t('m.funds.historyRecords.unDone')}}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import Bus from '@/components/event-bus'
import {
  Table,
  TableColumn,
} from 'element-ui'

Vue.use(Table)
Vue.use(TableColumn)
export default {
  computed: {
    ...mapState('atGame', ['contentData', 'groupName', 'vipGrade', 'totalPoint', 'groupNameCn']),
  },
  methods: {
    ...mapActions('atGame', ['getGame']),
    changePage(page) {
      this.toggleData(page)
    },
    toggleData(page = 1) {
      this.getGame({
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
    }
  },
  created() {
    this.toggleData()
  },
  updated() {
    Bus.$emit('weekData', this.getShowMessage(this.groupName, this.groupNameCn))
    this.$emit('showVipGrade', this.vipGrade)
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
      font-weight: bold;
    }
  }

  .img-1 {
    width: 15px;
    height: 15px;
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
