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
      <records-tpl-mobile :data="depositsHistory" :btnNumber="btnNumber" v-show="btnNumber === 0"></records-tpl-mobile>
      <records-tpl-mobile :data="withdrawsHistory" :btnNumber="btnNumber" v-show="btnNumber === 1"></records-tpl-mobile>
      <records-tpl-mobile :data="othersHistory" :btnNumber="btnNumber" v-show="btnNumber === 2"></records-tpl-mobile>
      <records-tpl-mobile :data="othersHistory" :btnNumber="btnNumber" v-show="btnNumber === 3"></records-tpl-mobile>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import RecordsTplMobile from './records-tpl-mobile'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  components: {
    RecordsTplMobile
  },
  computed: {
    ...mapGetters('depositsHistory', ['depositsHistory']),
    ...mapState('depositsHistory', ['depositsMeta']),
    ...mapGetters('withdrawsHistory', ['withdrawsHistory']),
    ...mapState('withdrawsHistory', ['withdrawsMeta']),
    ...mapGetters('othersHistory', ['othersHistory']),
    ...mapState('othersHistory', ['othersMeta']),
    tabConfig() {
      return [{
        label: this.$t('m.funds.fundsMenu.recharge'),
        name: 'recharge'
      },
      {
        label: this.$t('m.funds.fundsMenu.withdraw'),
        name: 'withdraw'
      },
      {
        label: this.$t('m.funds.fundsMenu.other'),
        name: 'other'
      },
      {
        label: 'IEO',
        name: 'ieo'
      }]
    },
  },
  data() {
    return {
      loading: false,
      btnNumber: Number(this.$route.query.tag) || 0,
      currentMeta: {}
    }
  },
  mounted() {
    this.toggleData()
  },
  methods: {
    ...mapActions('depositsHistory', ['getDepositHistory']),
    ...mapActions('withdrawsHistory', ['getWithdrawsHistory']),
    ...mapActions('othersHistory', ['getOthersHistory']),
    loadMore() {
      switch (Number(this.btnNumber)) {
        case 0:
          this.currentMeta = this.depositsMeta
          break
        case 1:
          this.currentMeta = this.withdrawsMeta
          break
        case 2:
          this.currentMeta = this.othersMeta
          break
        case 3:
          this.currentMeta = this.othersMeta
          break
      }
      const maxPage = Math.ceil((this.currentMeta.total_count || 0) / 20)
      let page = this.currentMeta.page || 0
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
        (this.depositsHistory.length > 0 && this.btnNumber === 0) ||
        (this.withdrawsHistory.length > 0 && this.btnNumber === 1) ||
        (this.othersHistory.length > 0 && this.btnNumber === 2) ||
        (this.othersHistory.length > 0 && this.btnNumber === 3)
      ) {
        return
      }
      this.toggleData()
    },
    async toggleData(page = 1) {
      switch (Number(this.btnNumber)) {
        case 0:
          await this.getDepositHistory({ page, isLoadMore: true })
          break
        case 1:
          await this.getWithdrawsHistory({ page, isLoadMore: true })
          break
        case 2:
          await this.getOthersHistory({ page, isLoadMore: true })
          break
        case 3:
          await this.getOthersHistory({ page, isLoadMore: true })
          break
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variable.scss';

.funds-dialog_records {
  .empty {
    margin-top: 110px;
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
}
</style>
