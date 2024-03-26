<template>
  <div class="market-list-wrap" :style="listStyle">
    <div class="search" @click.stop>
      <input type="text" :placeholder="$t('m.search')" v-model="search">
      <i class="iconfont icon-search"></i>
    </div>
    <div class="list-wrap">
      <div class="u-tabs tabs market-change-tab" v-if="!search">
        <div
          v-for="tab in tabs"
          :key="tab.key"
          :class="['u-tab-button', {current: curTab === tab.key}]"
          @click.stop="tabChange(tab)"
          @mouseenter.stop="tabChange(tab)"
        >{{tab.name}}</div>
      </div>
      <div class="list">
        <div class="head">
          <span class="max-name">{{$t('m.exchange.pair')}}</span>
          <span class="max">{{$t('m.exchange.newPrice')}}</span>
          <span>24h {{$t('m.exchange.change')}}</span>
        </div>
        <div class="body scrollStyle">
          <market-change-area
            :listData="listData"
            :type="minFee"
            :clearStatus="clearStatus"
            v-if="!isLogin || (isLogin && !isMiner)"
          />
          <market-change-area
            :listData="listData"
            :type="maxFee"
            :clearStatus="clearStatus"
            v-if="!isLogin  || (isLogin && !isMiner)"
          />
          <market-change-area
            :listData="listData"
            type="mining"
            :clearStatus="clearStatus"
            v-if="isMiner"
          />
          <market-change-area
            :listData="listData"
            type="normal"
            :clearStatus="clearStatus"
            v-if="isMiner"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Favorite from '@/components/favorite'
import totalMoeny from '@/mixins/total-money'
import MarketChangeArea from './market-change-area'

export default {
  mixins: [totalMoeny],
  components: {
    Favorite,
    MarketChangeArea,
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
        // },
      ],
      search: '',
    }
  },
  computed: {
    ...mapGetters('tickers', ['filterList', 'maxFee', 'minFee']),
    ...mapGetters('vouchers', ['allVouchers']),
    ...mapState('viewport', ['height', 'headerHeight']),
    ...mapGetters('currentUser', ['isLogin', 'isMiner']),
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
  methods: {
    // 切换tab时清空搜索条件
    tabChange(tab) {
      this.search = ''
      this.curTab = tab.key
    },
    // 切换交易对成功清空状态，避免频繁计算
    clearStatus() {
      this.search = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.market-list-wrap {
  min-height: 500px;
  width: 460px;
  padding: 20px;
  background-color: #ffffff;
  .search {
    position: relative;
    input {
      height: 26px;
      width: 100%;
      outline: none;
      border: 1px solid #dfdfdf;
      border-radius: 13px;
      font-size: 13px;
      padding-left: 30px;
      color: #c1c1c1;
    }
    i {
      position: absolute;
      top: 8px;
      left: 11px;
      font-size: 13px;
      color: #c1c1c1;
    }
  }
  .list-wrap {
    height: calc(100% - 26px);
    .market-change-tab {
      border-bottom-width: 1px;
      border-bottom-style: solid;
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
      height: calc(100% - 52px);
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
          &:last-child {
            text-align: right;
          }
        }

        @include themify($themes) {
          color: themed('textColor9');
        }
      }
      .body {
        height: calc(100% - 34px);
      }
    }
  }
}

.theme-dark {
  .market-list-wrap {
    background-color: #141414;
    .search {
      input {
        border-color: rgba($color: #ffffff, $alpha: 0.2);
        background-color: #141414;
        color: rgba($color: #ffffff, $alpha: 0.45);
      }
      i {
        color: rgba($color: #ffffff, $alpha: 0.45);
      }
    }
    .list-wrap {
      .list {
        .head {
          color: rgba($color: #ffffff, $alpha: 0.45);
        }
      }
    }
  }
}
</style>

