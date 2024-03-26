<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="infinite">
    <div class="funds-dialog_records">
      <div class="header-top">
        <div class="header-total">
          <span style="font-weight: bold;">{{$t("m.funds.historyRecords.totalPoints")}} : {{totalPoint}}</span>
          <div class="history">
            <router-link
              :to="$i18nRoute({ path: '/funds/game-reward-history' })"
              class="header_menu_item"
            >{{$t('m.funds.fundsMenu.historyReward')}}</router-link>
          </div>
        </div>
      </div>

      <div class="records-list" >
        <div class="records-list-header">
          <span class="left">{{$t("m.funds.historyRecords.gameQuests")}}</span>
          <span class="midle">{{$t("m.funds.historyRecords.gamePoints")}}</span>
          <span class="right">{{$t("m.funds.historyRecords.gameStatus")}}</span>
        </div>
        <div class='records-list-item' v-for="(item, index) in contentData" :key="index" v-if='contentData.length > 0'>
          <span class="left">{{getShowMessage(item.taskTitle,item.taskTitleCn)}}</span>
          <span class="midle">{{item.Point}}</span>
          <div  class="right">
            <div v-if='item.isCompleted >0'>
              <img class="img-1" src="../../../assets/images/game/box-select.png">
              <span >{{$t('m.funds.historyRecords.gameCompleted')}}</span>
            </div>
            <div v-else>
              <img class="img-1" src="../../../assets/images/game/box-unselect.png">
              <span >{{$t('m.funds.historyRecords.unDone')}}</span>
            </div>
          </div>
        </div>
        <no-records v-else class="empty"></no-records>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import infiniteScroll from 'vue-infinite-scroll'
import NoRecords from '@/components/no-records'
import { mapActions, mapState } from 'vuex'

Vue.use(infiniteScroll)
export default {
  data() {
    return {
      btnNumber: 0,
      loading: false,
      currentMeta: {},
    }
  },
  created() {
    this.toggleData()
  },
  updated() {
    this.$emit('showVipGrade', this.vipGrade, this.getShowMessage(this.groupName, this.groupNameCn))
  },
  components: {
    NoRecords
  },
  computed: {
    ...mapState('atGame', ['contentData', 'groupName', 'vipGrade', 'totalPoint', 'groupNameCn']),
  },
  methods: {
    ...mapActions('atGame', ['getGame']),
    loadMore() {
      let per_page = 0
      switch (Number(this.btnNumber)) {
        case 0:
          this.currentMeta = this.profitsMeta
          per_page = this.currentMeta.page_size || 60
          break
        case 1:
          this.currentMeta = this.miningMeta
          per_page = this.currentMeta.page_size || 20
          break
      }
      let page = this.currentMeta.page || 0
      let total_count = this.currentMeta.total_count || 0
      const maxPage = Math.ceil((total_count) / per_page)
      this.loading = true
      page++
      if (page > maxPage) {
        this.loading = false
        return
      }
      this.toggleData(page)
      this.loading = false
    },
    changeMenu(num) {
      if (this.btnNumber === num) {
        return
      }
      this.btnNumber = num
      if (
        (this.miningHistory.length > 0 && this.btnNumber === 1) ||
        (this.contentData.length > 0 && this.btnNumber === 0)
      ) {
        return
      }
      this.toggleData()
    },
    async toggleData(page = 1) {
      switch (Number(this.btnNumber)) {
        case 0:
          await this.getGame({ page, page_size: 60, isLoadMore: true })
          break
        case 1:
          await this.getGame({ page, page_size: 20, isLoadMore: true })
          break
      }
    },
    getShowMessage(taskTitle, taskTitleCn) {
      if (this.$fifth.lang === 'zh-CN' || this.$fifth.lang === 'zh-TW') {
        return taskTitleCn
      } else {
        return taskTitle
      }
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/scss/variable.scss';

.infinite {
  min-height: 400px;
}

.header-top {
  padding: 10px;
}

.header-total {
  color: $color-assist1;
  font-size: 14px;
  width: 100%;
  .history {
    text-decoration: underline;
    float: right;
  }
}

.funds-dialog_records {
  .empty {
    margin-top: 50px;
    padding-bottom: 50px;
  }
  .records-list {
    width: 100%;
    margin: 0 auto;
    .records-list-header,
    .records-list-item {
      padding: 0 10px;
      font-size: 12px;
      background: #f6f6f6;
      &:first-child {
        background: none;
      }
      .left {
        min-width: 60%;
      }
      .midle {
        min-width: 20%;
      }
      .right {
        min-width: 20%;
        text-align: right;
      }
      .img-1 {
        width: 12px;
        height: 12px;
      }
      span {
        flex: 1;
        text-align: center;
        &:first-child {
          text-align: left;
        }
        &:last-child {
          text-align: right;
          flex: 1.2;
        }
      }
    }
    .records-list-header {
      height: 37px;
      color: $color-assist2;
      display: flex;
      font-weight: bold;
      align-items: center;
    }
    .records-list-item {
      border-radius: 3px;
      color: #111111;
      padding: 10px;
      display: flex;
      margin-bottom: 10px;
    }
  }
}
</style>
