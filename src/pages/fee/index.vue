<template>
  <div class="funds-page">
    <div class="content_menu" v-if="showTabs">
      <div class="u-tabs tabs">
        <div
          v-for="tab in menuList"
          :key="tab.name"
          :class="['u-tab-button', {current: curTab === tab.name || curTab === tab.subName}]"
          @click="changeMenu(tab.name)">{{tab.label}}
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Bus from '@/components/event-bus'

export default {
  data() {
    return {
      showTabs: true,
      curTab: 'funds',
      weekData: '',
    }
  },
  computed: {
    ...mapGetters('currentUser', ['isLogin']),
    ...mapGetters('viewport', ['type']),
    ...mapState('myIncome', ['total_at_amount']),
    menuList() {
      const name = this.$route.name
      if (name === 'profit' || name === 'mining') {
        if (Number(this.total_at_amount) > 0) {
          return [
            { label: ` ${this.$t('m.funds.fundsMenu.atPrivilege')}`, name: 'profit' },
            { label: ` ${this.$t('m.funds.fundsMenu.tom')}`, name: 'mining' },
          ]
        } else {
          return [
            { label: ` ${this.$t('m.funds.fundsMenu.atPrivilege')}`, name: 'profit' },
          ]
        }
      } else if (name === 'game') {
        return [
          { label: ` ${this.weekData}`, name: 'game' }, // ${this.$t('m.funds.fundsMenu.atGame')}
        ]
      } else {
        return [
          { label: this.$t('m.funds.fundsMenu.title'), name: 'funds' },
          { label: this.$t('m.funds.fundsMenu.recharge'), name: 'recharge', subName: 'rechargeCurrency' },
          { label: this.$t('m.funds.fundsMenu.withdraw'), name: 'withdraw', subName: 'withdrawCurrency' },
          { label: this.$t('m.funds.fundsMenu.records'), name: 'records' },
        ]
      }
    },
  },
  mounted() {
    this.initTab()
  },
  watch: {
    $route() {
      this.initTab()
    },
    type() {
      this.initTab()
    },
  },

  methods: {
    changeMenu(tab) {
      const items = {
        withdraw: {
          route: '/funds/withdraw',
        },
        recharge: {
          route: '/funds/recharge',
        },
        withdrawCurrency: {
          route: '/funds/withdraw',
        },
        rechargeCurrency: {
          route: '/funds/recharge',
        },
        records: {
          route: '/funds/records',
        },
        funds: {
          route: '/funds',
        },
        profit: {
          route: '/funds/profit',
        },
        mining: {
          route: '/funds/mining',
        },
        game: {
          route: '/funds/game',
        },
      }
      const item = items[tab]
      item.route && this.$router.push(this.$i18nRoute({ path: item.route }))
    },
    initTab() {
      const name = this.$route.name
      const list = ['withdrawCurrency', 'rechargeCurrency', 'withdraw', 'recharge', 'records', 'mining', 'profit', 'account', 'funds', 'currency', 'Week', 'game']
      const hideTabsList = ['account', 'currency']
      if (name === 'mining' && Number(this.total_at_amount) === 0) {
        this.$router.replace(this.$i18nRoute({
          name: 'profit',
        }))
        return
      }
      if (this.type === 'h5' || hideTabsList.includes(name)) {
        this.showTabs = false
      } else {
        this.showTabs = true
      }
      if (list.includes(name)) {
        this.curTab = name
      } else {
        this.curTab = 'funds'
      }
    },
  },
  created() {
    let vm = this
    Bus.$on('weekData', (data) => {
      vm.weekData = data
    })
  },
  beforeDestroy() {
    Bus.$off('weekData')
  },
}
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/variable.scss';

  .funds-page {

    .content_menu {
      background-color: #fafafa;
      border-bottom: 1px solid #eaedf5;
      display: flex;
      justify-content: center;
      height: 50px;
      align-items: center;

      .u-tabs {
        font-size: 14px;
      }
    }
  }

  .title {
    font-size: 18px;
    font-weight: bold;
  }
</style>
