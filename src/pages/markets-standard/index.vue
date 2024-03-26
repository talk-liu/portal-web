<template>
  <div class="exchange-page body">
    <v-ad-banner/>
    <market-info/>
    <div class="content">
      <div class="item left">
        <order-book class="order-book"/>
      </div>
      <div class="item center">
        <div class="center-top">
          <chart></chart>
        </div>
        <order-form class="center-bottom"/>
      </div>
      <div class="item right">
        <market-change/>
        <latest-deal></latest-deal>
      </div>
    </div>
    <v-tg/>
    <delegation/>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import dayjs from 'dayjs'
import pusher from '@/pusher'
import bindChannelEvent from '@/pusher/bindChannelEvent'

import VAdBanner from './ad-banner'
import MarketInfo from './market-info'
import OrderBook from './order-book'
import Chart from './chart'
import MarketChange from './market-change'
import OrderForm from './order-form'
import LatestDeal from './latest-deal'
import Delegation from './delegation'
import VTg from '@/components/slide-tg'

export default {
  components: {
    VAdBanner,
    MarketInfo,
    OrderBook,
    Chart,
    MarketChange,
    OrderForm,
    LatestDeal,
    Delegation,
    VTg,
  },
  computed: {
    ...mapGetters('currentUser', ['isLogin']),
    ...mapGetters('tickers', ['currentTicker']),
  },
  methods: {
    ...mapMutations('tickers', ['setCurrentMarketId']),
    ...mapMutations('orderBook', ['setMarketId']),
    ...mapMutations('orderForm', ['resetState']),
    ...mapActions('openOrders', ['getOrders']),
    ...mapActions('historyOrders', ['getHistoryOrders']),
    ...mapActions('trades', ['getTrades']),
    ...mapActions('otc', ['getOptionOtc']),
    ...mapActions('markets', ['getMarkets']),
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
    this.resetState()

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
$gap: 1rem;

.body {
  background-color: #f6f6f6;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  font-family: quote, semiBold, PingFang SC, Microsoft YaHei, '微软雅黑', Helvetica Neue, Helvetica, Hiragino Sans GB, Arial, sans-serif;
  .bottom {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50px;
    margin-top: 1rem;
  }
  .content {
    display: flex;
    justify-content: space-between;
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
    .item {
      min-height: 100px;
      background-color: #ffffff;
      flex: 1;
      border-radius: 4px;
    }
    .left {
      border: 1px solid $color-line;
      height: 704px;
      overflow: hidden;
      .order-book {
        padding: 12px 0;
      }
    }
    .right {
      border-radius: 0;
      background-color: rgba(0, 0, 0, 0);
    }
    .center {
      border-radius: 0;
      flex: none;
      width: 566px;
      margin-left: $gap;
      margin-right: $gap;
      background-color: rgba($color: #000000, $alpha: 0);
      .center-top {
        border: 1px solid $color-line;
        height: 383px;
        border-radius: 4px;
        background-color: #ffffff;
        overflow: hidden;
        &.tickers-rate {
          height: 318px;
        }
      }
      .center-bottom {
        margin-top: 16px;
      }
    }
  }
}
</style>
