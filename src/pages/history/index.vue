<template>
  <div class="history-wrap">
    <div class="u-tabs tabs">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        :class="['u-tab-button', {current: curTab === tab.key}]"
        @click="changeKey(tab)"
      >{{tab.name}}</div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      curTab: 'ordersCurrent',
      tabs: [
        {
          name: this.$t('m.historyOrders.openOrder'),
          key: 'ordersCurrent',
        },
        {
          name: this.$t('m.historyOrders.entrust'),
          key: 'ordersHistory',
        },
        {
          name: this.$t('m.historyOrders.tradeHistory'),
          key: 'ordersTrades',
        },
        {
          name: this.$t('m.historyOrders.historyConditionCurrent'),
          key: 'conditionCurrent',
        },
        {
          name: this.$t('m.historyOrders.historyConditionHistory'),
          key: 'conditionHistory',
        },
      ],
      timer: null
    }
  },
  methods: {
    ...mapActions('markets', ['getMarkets']),
    changeKey(tab) {
      this.curTab = tab.key
      const items = {
        ordersCurrent: {
          route: '/history/orders/current',
        },
        ordersHistory: {
          route: '/history/orders/history',
        },
        ordersTrades: {
          route: '/history/orders/trades',
        },
        conditionCurrent: {
          route: '/history/condition/current',
        },
        conditionHistory: {
          route: '/history/condition/history',
        },
      }
      const item = items[tab.key]
      item.route && this.$router.push(this.$i18nRoute({ path:item.route }))
      this.goTop()
    },
    initTab() {
      const name = this.$route.name
      const historyList = ['ordersCurrent', 'ordersHistory', 'ordersTrades', 'conditionCurrent', 'conditionHistory']
      if (historyList.includes(name)) {
        this.curTab = name
      } else {
        this.curTab = 'ordersCurrent'
      }
      this.goTop()
    },
    goTop() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop
        let ispeed = Math.floor(-osTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
        if (osTop === 0) {
          clearInterval(this.timer)
        }
      }, 20)
    }
  },
  watch: {
    $route() {
      this.initTab()
    },
  },
  mounted() {
    // 初始化tab
    this.initTab()
    // 初始化markets
    this.getMarkets()
  },
}
</script>

<style lang="scss">
.coditionCurrent .main {
  background-color: #f6f6f6;
}
</style>


<style lang="scss" scoped>
.history-wrap {
  width: 1220px;
  margin: 20px auto 50px;
  padding: 15px 20px;
  background-color: #ffffff;
  border: 1px solid #eaedf5;
  border-radius: 8px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.03);
  min-height: 700px;
}
</style>
