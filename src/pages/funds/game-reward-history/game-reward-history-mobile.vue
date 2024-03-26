<template>
  <div class="reward-list" >
    <div class="reward-list-header">
      <span>{{$t("m.funds.fundsMenu.week")}}</span>
      <span>{{$t('m.funds.fundsMenu.rewards')}}</span>
    </div>
    <div class='reward-list-item' v-for="(item, index) in content" :key="index" v-if='content.length > 0'>
      <div class="top">
        <span>{{getShowMessage(item.groupName,item.groupNameCn)}}</span>
        <span>{{item.rewardAmount}} AT</span>
      </div>
      <div class="line"></div>
    </div >
    <no-records v-show="content.length === 0" class="empty"></no-records>
  </div>

</template>

<script>
import NoRecords from '@/components/no-records'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'game-reward-history-mobile',
  components: {
    NoRecords
  },
  computed: {
    ...mapState('historyAtGameReward', ['content']),
  },
  methods: {
    ...mapActions('historyAtGameReward', ['getGameRewardHistory']),
    data() {
      return {
        // loading: false,
        // currentMeta: {},
      }
    },
    // loadMore() {
    //   let per_page = 0
    //   this.currentMeta = this.content
    //   per_page = this.currentMeta.page_size || 60
    //   let page = this.currentMeta.page || 0
    //   let total_count = this.currentMeta.total_count || 0
    //   const maxPage = Math.ceil((total_count) / per_page)
    //   this.loading = true
    //   page++
    //   if (page > maxPage) {
    //     this.loading = false
    //     return
    //   }
    //   this.toggleData(page)
    //   this.loading = false
    // },
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

  .reward-list {
    width: 100%;
    margin: 0 auto;
    .reward-list-header,
    .reward-list-item {
      padding: 10px 10px;
      font-size: 12px;
      background: #f6f6f6;
      &:last-child {
        background: none;
      }
      .top {
        display: flex;
        align-items: center;
      }
      .line {
        height: 1px;
        width: 100%;
        background: #d8d8d8;
        transform: scaleY(0.5);
        margin-top: 10px;
      }
      span {
        flex: 1;
        text-align: center;
        &:first-child {
          text-align: left;
          margin-left: 10px;
        }
        &:last-child {
          text-align: right;
          flex: 1.2;
          float: right;
          margin-right: 10px;
        }
      }
    }
    .records-list-header {
      height: 200px;
      color: $color-assist2;
      display: flex;
      font-weight: bold;
      align-items: center;
    }
    .records-list-item {
      border-radius: 3px;
      color: #111111;
      margin-bottom: 10px;
    }
  }
</style>
