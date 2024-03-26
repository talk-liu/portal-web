<template>
  <div class="market-center-wrap">
    <div class="title">{{$t('m.exchange.marketCentre')}}</div>
    <div class="market-list-wrap">
      <div class="u-tabs tabs market-change-tab">
        <div
          v-for="tab in tabs"
          :key="tab.key"
          :class="['u-tab-button', {current: curTab === tab.key}]"
          @click.stop="tabChange(tab)"
        >{{tab.name}}</div>
      </div>
      <div class="list">
        <div class="head">
          <span v-for="(head,idx) in headers" :key="idx" :style="{minWidth: `${head.width}px`}">
            {{head.name}}
            <sort class="head-sort" v-if="head.sort!=null" :data="head" @sortClick="sortClick"/>
          </span>
        </div>
        <div class="body">
          <Area
            class="area"
            :listData="listData"
            :type="minFee"
            :clearStatus="clearStatus"
            :marketsKData="marketsKData"
            :curSort="curSort"
            v-if="!isLogin || (isLogin && !isMiner)"
          />
          <Area
            class="area"
            :listData="listData"
            :type="maxFee"
            :clearStatus="clearStatus"
            :marketsKData="marketsKData"
            :curSort="curSort"
            v-if="!isLogin  || (isLogin && !isMiner)"
          />
          <Area
            class="area"
            :listData="listData"
            type="mining"
            :clearStatus="clearStatus"
            :marketsKData="marketsKData"
            :curSort="curSort"
            v-if="isMiner"
          />
          <Area
            class="area"
            :listData="listData"
            type="normal"
            :clearStatus="clearStatus"
            :marketsKData="marketsKData"
            :curSort="curSort"
            v-if="isMiner"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import api from '@/graphql'
import Favorite from '@/components/favorite'
import totalMoeny from '@/mixins/total-money'
import Area from './area'
import Sort from './sort'
export default {
  mixins: [totalMoeny],
  components: {
    Favorite,
    Area,
    Sort,
  },
  data() {
    return {
      curTab: 'favorite',
      tabs: [
        {
          name: this.$t('m.exchange.marked'),
          key: 'favorite',
        },
        // {
        //   name: 'BTC',
        //   key: 'btc',
        // },
        // {
        //   name: 'ETH',
        //   key: 'eth',
        // },
        {
          name: 'USDT',
          key: 'usdt',
        },
        {
          name: 'USD',
          key: 'usd',
        },
        // {
        //   name: 'TRX',
        //   key: 'trx',
        // }
      ],
      headers: [
        {
          name: this.$t('m.exchange.pair'),
          key: 'marketId',
          width: 185,
        },
        {
          name: this.$t('m.exchange.newPrice'),
          key: 'last',
          width: 145,
          sort: '',
        },
        {
          name: `24h ${this.$t('m.exchange.change')}`,
          key: 'changePercent',
          sort: '',
        },
        {
          name: `24h ${this.$t('m.exchange.high')}`,
          key: 'high',
          sort: '',
        },
        {
          name: `24h ${this.$t('m.exchange.low')}`,
          key: 'low',
          sort: '',
        },
        {
          name: `24h ${this.$t('m.exchange.volume')}`,
          key: 'funds',
          sort: '',
        },
        {
          name: `${this.$t('m.home.trend')}(7d)`,
          key: 'trend',
        },
      ],
      curSort: {},
      search: '',
      marketsKData: [],
    }
  },
  computed: {
    ...mapState('markets', ['oriMarkets']),
    ...mapGetters('tickers', ['filterList', 'maxFee', 'minFee']),
    ...mapGetters('vouchers', ['allVouchers']),
    ...mapState('viewport', ['height', 'headerHeight']),
    ...mapGetters('currentUser', ['isLogin', 'isMiner']),
    iconUrl() {
      return this.$fifth.isCn
        ? 'https://i.riostox.com/i/0d/0dde62b4994634b98d41bfb58d3fdbc4.png'
        : 'https://i.riostox.com/i/08/0865edd549dd04f8ec7e11724cd4ef0c.png'
    },
    listStyle() {
      const changeTitle = 48 + 5
      const height = this.height - this.headerHeight - changeTitle
      return { height: `${height}px` }
    },
    listData() {
      // 当存在搜索条件是展示搜索结果
      if (this.search) {
        return this.filterList('all', this.search)
      }
      // 获取对应交易对数据
      return this.filterList(this.curTab)
    },
  },
  watch: {
    listData: {
      handler(obj) {
        Object.keys(obj).forEach(key => {
          this.fetchMarkets(obj[key])
        })
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions('markets', ['getMarkets']),
    // 切换tab时清空搜索条件
    tabChange(tab) {
      this.search = ''
      this.curTab = tab.key
    },
    // 切换交易对成功清空状态，避免频繁计算
    clearStatus() {
      this.search = ''
    },
    fetchMarkets(list) {
      const markets = []
      list.forEach(item => {
        let marketId = item.base_unit + item.quote_unit
        if (Object.keys(this.marketsKData).indexOf(marketId) < 0) {
          // 是否已经载入过
          markets.push(marketId)
        }
      })
      if (markets.length > 0) {
        let marketsStr = markets.join(',')
        return api
          .query('KLINE', {
            markets: marketsStr,
            limit: 28,
            period: 360,
          })
          .then(data => {
            if (data && data.data && data.data.kline && data.data.kline.result) {
              this.marketsKData = { ...this.marketsKData, ...data.data.kline.result }
            }
          })
      }
    },
    sortClick(item) {
      if (!item.data) return false
      this.headers = this.headers.map(head => {
        if (head.key === item.data.key) {
          head.sort = item.type
        } else if (head.sort != null) {
          head.sort = ''
        }
        return head
      })
      this.curSort = { key: item.data.key, sort: item.type }
    },
  },
  mounted() {
    if (this.oriMarkets.length === 0) {
      this.getMarkets()
    }
  },
}
</script>

<style lang="scss" scoped>
.market-center-wrap {
  width: 1120px;
  margin: 50px auto;
  .title {
    font-size: 18px;
    line-height: 25px;
    padding-left: 10px;
    margin-bottom: 20px;
  }
  .market-list-wrap {
    height: calc(100% - 26px);
    .market-change-tab {
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-top-width: 1px;
      border-top-style: solid;
      margin: 0;
      padding-left: 10px;

      @include themify($themes) {
        border-color: themed('lineBorderColorF5');
      }
      .u-tab-button {
        height: 52px;
        line-height: 52px;
        font-family: euBold;
        &.current:after {
          width: 100%;
          left: 0;
          margin: 0;
          bottom: 20%;
        }
      }
    }
    .list {
      margin-top: 7px;
      .max {
        min-width: 145px;
      }
      .max-name {
        min-width: 185px;
      }
      .head {
        font-size: 12px;
        display: flex;
        height: 27px;
        line-height: 27px;
        padding: 0 10px;
        span {
          flex: 1;
          display: flex;
          align-items: center;
          &:last-child {
            justify-content: flex-end;
          }
        }

        @include themify($themes) {
          color: themed('textColor9');
        }
        .chart-title {
          width: 115px;
        }
        .head-sort {
          margin-left: 5px;
        }
      }
      .body {
        .area {
          margin-bottom: 16px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>

