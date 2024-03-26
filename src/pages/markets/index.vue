<template>
  <div class="markets-wrap scrollStyle">
    <div class="content" v-if="type !== 'h5'">
      <div class="market-main">
        <sidebar class="sidebar mr4"></sidebar>
        <order-book-trade class="order-book wrap mr4"></order-book-trade>
        <div class="chart-trading">
          <chart class="chart wrap mb4"></chart>
          <delegation class="trading wrap"></delegation>
        </div>
        <div class="latest-trade wrap ml4" v-if="width > 1680">
          <div class="title">{{$t('m.exchange.tradeHistory')}}</div>
          <latest-trade></latest-trade>
        </div>
      </div>
      <setting></setting>
    </div>
    <mobile-market v-else/>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'
import dayjs from 'dayjs'
import pusher from '@/pusher'
import bindChannelEvent from '@/pusher/bindChannelEvent'
import EventBus from '@/components/event-bus'

import Sidebar from './sidebar'
import Delegation from './delegation'
import LatestTrade from './latest-trade'
import Chart from './chart'
import OrderBookTrade from './order-book-trade'
import MobileMarket from './mobile-market'
import Setting from './setting'
import DisabletradeDialog from './disabletrade-dialog'

export default {
  components: {
    Sidebar,
    Chart,
    Delegation,
    LatestTrade,
    OrderBookTrade,
    MobileMarket,
    Setting,
    DisabletradeDialog,
  },
  computed: {
    ...mapGetters('currentUser', ['isLogin']),
    ...mapGetters('tickers', ['currentTicker']),
    ...mapGetters('viewport', ['type']),
    ...mapState('viewport', ['width']),
    ...mapState('tickers', ['currentMarketId']),
    ...mapState('currentUser', ['currentUser']),
  },
  methods: {
    ...mapMutations('tickers', ['setCurrentMarketId']),
    ...mapMutations('viewport', ['changeTheme']),
    ...mapMutations('orderForm', ['resetState']),
    ...mapMutations('depthChart', ['resetDepthChart']),
    ...mapActions('trades', ['getTrades']),
    ...mapActions('openOrders', ['getOrders']),
    ...mapActions('historyOrders', ['getHistoryOrders']),
    ...mapActions('vouchers', ['getVouchers']),
    ...mapActions('markets', ['getMarkets']),
    ...mapActions('otc', ['getOptionOtc']),
    ...mapActions('conditionCurrent', ['getConditionCurrent']),
    ...mapActions('conditionHistory', ['getConditionHistory']),
    ...mapMutations('cachedTrade', ['resetCachedTrades']),
    ...mapMutations('orderBook', ['setMarketId']),
    initMarket(id) {
      // 设置当前交易对id
      this.setCurrentMarketId(id)
      this.setMarketId(id)

      // 获取当前交易对最新成交初始化
      this.getTrades(id)

      // 订阅当前交易对推送
      pusher.myChannelList[`trade-${id}`] = pusher.subscribe(`trade-${id}`)
      bindChannelEvent(pusher.myChannelList[`trade-${id}`], id)
      pusher.myChannelList[`incr-${id}`] = pusher.subscribe(`incr-${id}`)
      bindChannelEvent(pusher.myChannelList[`incr-${id}`], id)
      // 先订阅增量等待0.5s再订阅全量，防止后端数据丢失
      setTimeout(() => {
        pusher.myChannelList[`full-${id}`] = pusher.subscribe(`full-${id}`)
        bindChannelEvent(pusher.myChannelList[`full-${id}`], id)
      }, 500)
    },
    // 修改title
    changeTitle(last, name) {
      const title = `${last} - ${name} - Riostox`
      document.title = title
    },
    // 登录鉴权后请求接口
    getLoginedData() {
      const begin_time = dayjs()
        .add(-1, 'day')
        .unix()
      this.getOrders()
      // 获取24h历史委托数据
      this.getHistoryOrders({ page: 1, page_size: 100, from: begin_time })
      // 获取倍增劵数据
      this.getVouchers()
      // 获取当前计划委托
      this.getConditionCurrent()
      // 获取24h历史计划委托
      this.getConditionHistory({ page: 1, page_size: 100, begin_time })
    },
  },
  watch: {
    currentTicker(val) {
      if (!val.name) return false
      this.changeTitle(val.last, val.name)
    },
    isLogin() {
      this.getLoginedData()
    },
  },
  mounted() {
    const marketId = this.$route.params.id
    // 初始化
    this.initMarket(marketId)
    // 保存主题状态
    const theme = localStorage.getItem('theme') || 'dark'
    this.changeTheme({ theme: theme, save: true })

    // otc初始化
    this.getOptionOtc()
    // markets初始化
    this.getMarkets()

    if (this.isLogin) {
      this.getLoginedData()
    }
  },
  beforeRouteUpdate(to, from, next) {
    const oldId = from.params.id
    const newId = to.params.id

    // 取消订阅旧交易对
    pusher.myChannelList[`full-${oldId}`].unbind()
    pusher.unsubscribe(`full-${oldId}`)
    pusher.myChannelList[`incr-${oldId}`].unbind()
    pusher.unsubscribe(`incr-${oldId}`)
    pusher.myChannelList[`trade-${oldId}`].unbind()
    pusher.unsubscribe(`trade-${oldId}`)

    // 切换交易对后重新初始化页面数据
    this.initMarket(newId)
    EventBus.$emit('setSymbol', newId)
    this.resetState()
    // 重置深度图
    this.resetDepthChart()
    // 保存最后一次交易对id
    localStorage.setItem('currentMarket', newId)
    next()
  },
  beforeRouteLeave(to, from, next) {
    const marketId = from.params.id
    // 离开时取消交易对订阅
    pusher.myChannelList[`full-${marketId}`].unbind()
    pusher.unsubscribe(`full-${marketId}`)
    pusher.myChannelList[`incr-${marketId}`].unbind()
    pusher.unsubscribe(`incr-${marketId}`)
    pusher.myChannelList[`trade-${marketId}`].unbind()
    pusher.unsubscribe(`trade-${marketId}`)

    // 离开时切回亮色版
    this.changeTheme({ theme: 'light', save: false })

    // 离开时改回title
    let title = 'Riostox - 数字资产交易平台'
    if (!this.$fifth.isCn) {
      title = 'Riostox - Crypto Asset Exchange | Trade-to-Mine AT'
    }
    document.title = title
    next()
  },
}
</script>

<style lang="scss" scoped>
.markets-wrap {
  height: 100%;
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    .market-main {
      flex: 1;
      padding: 4px 0;
      display: flex;
      min-height: 0; // firefox hack

      @include themify($themes) {
        background-color: themed('bgColor');
      }
      .sidebar,
      .order-book,
      .latest-trade {
        width: 320px;
        min-width: 320px;
      }
      .sidebar {
        display: flex;
        flex-direction: column;
      }
      .chart-trading {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;
        min-width: 0;
        .chart {
          flex: 1;
        }
      }
      .order-book {
        display: flex;
        flex-direction: column;
      }
      .order-book-trade {
        display: flex;
      }
      .chart {
        display: flex;
        flex-direction: column;
      }
      .trading {
        display: flex;
      }
      .latest-trade {
        display: flex;
        flex-direction: column;
      }
      .title {
        height: 45px;
        line-height: 45px;
        margin: 0 20px;
        font-size: 14px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        font-weight: 500;
        font-family: euBold;

        @include themify($themes) {
          border-color: themed('lineBorderColorF5');
          color: themed('textColor3');
        }
      }
    }
  }
}

.wrap {
  @include themify($themes) {
    background-color: themed('wrapBgColor');
  }
}

.mb4 {
  margin-bottom: 4px;
}

.mr4 {
  margin-right: 4px;
}

.ml4 {
  margin-left: 4px;
}
</style>
