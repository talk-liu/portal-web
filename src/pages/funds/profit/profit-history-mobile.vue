<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="infinite">
    <div class="funds-dialog_records">
      <div class="u-tabs tabs u-tabs-m">
        <div
          v-for="(tab, index) in tabConfig"
          :key="index"
          :class="['u-tab-button', {current: btnNumber === index}]"
          @click="changeMenu(index)"
        >{{tab.label}}</div>
      </div>
      <div v-show='btnNumber === 1'>
        <div class="records-list" v-if='miningHistory.length > 0'>
          <div class="records-list-header">
            <span>{{$t('m.funds.historyRecords.miningDate')}}</span>
            <span>AT</span>
            <span>{{$t('m.funds.historyRecords.source')}}</span>
          </div>
          <div class='records-list-item' v-for="(item, index) in miningHistory" :key="index">
            <div class="top">
              <span>{{item.update_time}}</span>
              <span>{{item.amount}}</span>
              <span>{{state[item.source]}}</span>
            </div>
            <div class="bottom " v-if='item.extra'>{{item.extra}}</div>
          </div>
        </div>
        <no-records v-else class="empty"></no-records>
      </div>
      <div v-show='btnNumber === 0'>
        <div class="records-list" v-if='profitsHistory.length > 0'>
          <div class="records-list-header">
            <span>{{$t('m.funds.historyRecords.rewardsDistributedDate')}}</span>
            <span>{{$t('m.funds.historyRecords.currency')}}</span>
            <span>{{$t('m.funds.historyRecords.amount')}}</span>
          </div>
          <div class='records-list-item' v-for="(item, index) in profitsHistory" :key="index">
            <div class="top">
              <span>{{item.update_time}}</span>
              <span>BTC</span>
              <span>{{item.btc || 0}}</span>
            </div>
            <div class="line"></div>
            <div class="top">
              <span></span>
              <span>ETH</span>
              <span >{{item.eth || 0}}</span>
            </div>
            <div class="line"></div>
            <div class="top">
              <span></span>
              <span>USDT</span>
              <span >{{item.usdt || 0}}</span>
            </div>
            <div class="line"></div>
            <div class="top" v-if="total_profit.beu.at > 0">
              <span></span>
              <span>AT</span>
              <span >{{item.at || 0}}</span>
            </div>
            <div class="line" v-if="total_profit.beu.at > 0"></div>
            <div class="top">
              <span></span>
              <span>TRX</span>
              <span >{{item.trx || 0}}</span>
            </div>
            <div class="line"></div>
            <div class="bottom dinBold">{{totalDailyRewards(item)}}</div>
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
Vue.use(infiniteScroll)
import NoRecords from '@/components/no-records'
import { mapGetters, mapState, mapActions } from 'vuex'
import profitHistory from '@/mixins/profit-history'
export default {
  mixins: [profitHistory],
  data() {
    return {
      btnNumber: 0,
      loading: false,
      currentMeta: {},
    }
  },
  mounted() {
    this.toggleData()
  },
  components: {
    NoRecords
  },
  computed: {
    ...mapGetters('historyProfits', ['profitsHistory']),
    ...mapState('historyProfits', ['profitsMeta']),
    ...mapGetters('historyMinings', ['miningHistory']),
    ...mapState('historyMinings', ['miningMeta']),
    ...mapState('myIncome', ['total_profit']),
    tabConfig() {
      return [
        { label:this.$t('m.funds.fundsMenu.profit'), name: 'profit' },
        { label: this.$t('m.funds.fundsMenu.mining'), name: 'mining' }
      ]
    }
  },
  methods: {
    ...mapActions('historyProfits', ['getProfitsHistory']),
    ...mapActions('historyMinings', ['getMiningHistory']),
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
        (this.profitsHistory.length > 0 && this.btnNumber === 0)
      ) {
        return
      }
      this.toggleData()
    },
    async toggleData(page = 1) {
      switch (Number(this.btnNumber)) {
        case 0:
          await this.getProfitsHistory({ page, page_size: 60, isLoadMore: true })
          break
        case 1:
          await this.getMiningHistory({ page, page_size: 20, isLoadMore: true })
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/scss/variable.scss';

.infinite {
  min-height: 400px;
}

.funds-dialog_records {
  .empty {
    margin-top: 50px;
    padding-bottom: 50px;
  }
  .tab {
    min-width: 78px;
    height: 50px;
    border-bottom: 1px solid #f6f6f6;
    margin: 0 15px;
    .tab-item {
      line-height: 50px;
      .label {
        font-size: 16px;
        i {
          font-weight: normal;
          color: #979797;
          font-size: 22px;
          vertical-align: middle;
        }
      }
    }
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
      .top {
        display: flex;
        align-items: center;
        padding: 12px 0;
      }
      .line {
        height: 1px;
        width: 100%;
        background: #d8d8d8;
        transform: scaleY(0.5);
      }
      .bottom {
        color: #414141;
        font-size: 14px;
        text-align: right;
        padding: 5px 0 10px;
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
      margin-bottom: 10px;
    }
  }
}
</style>
