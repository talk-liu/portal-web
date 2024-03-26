<template>
  <div class="market-change-wrap">
    <div class="u-tabs tabs delegation-tabs">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        :class="['u-tab-button', {current: curTab === tab.key}]"
        @click="curTab = tab.key"
      >
        {{tab.name}}
      </div>
    </div>
    <div class="main">
      <self-choose-opt
        @send='searchData'
        @togglecColumn="togglecColumn"
      />
      <div class="title">
        <span class="item name">{{$t('m.exchange.pair')}}</span>
        <span class="item price">{{$t('m.exchange.newPrice')}}</span>
        <span
          class="item change"
          v-if="checkValue == 0"
        >24h {{$t('m.exchange.change')}}</span>
        <span
          class="item volume"
          v-else
        >24h {{$t('m.exchange.volume')}}</span>
      </div>
      <div class="list-wrap scrollStyle">
        <market-item
          :listData="listData"
          :checkValue="checkValue"
          :type="minFee"
          v-if="!isLogin || (isLogin && !isMiner)"
        />
        <market-item
          :listData="listData"
          :checkValue="checkValue"
          :type="maxFee"
          v-if="!isLogin || (isLogin && !isMiner)"
        />
        <market-item
          :listData="listData"
          :checkValue="checkValue"
          type="mining"
          v-if="isMiner"
        />
        <market-item
          :listData="listData"
          :checkValue="checkValue"
          type="normal"
          v-if="isMiner"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import SelfChooseOpt from '@/components/self-choose-opt'
import MarketItem from './market-item'
export default {
  components: {
    SelfChooseOpt,
    MarketItem,
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
      ],
      search: '',
      checkValue: 0,
    }
  },
  computed: {
    ...mapState('currentUser', ['currentUser']),
    ...mapGetters('currentUser', ['isLogin']),
    ...mapGetters('tickers', ['filterList', 'maxFee', 'minFee']),
    isMiner() {
      return this.currentUser && this.currentUser.member_tags && this.currentUser.member_tags.includes('miner')
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
    searchData(val) {
      this.search = val
    },
    togglecColumn(val) {
      this.checkValue = val
    },
  },
}
</script>

<style lang="scss" scoped>
.market-change-wrap {
  background-color: $color-255;
  border: 1px solid $color-line;
  border-radius: 4px;
  height: 386px;
  padding: 14px 15px;
  width: 308px;
  .u-tabs {
    display: flex;
    width: 100%;
    margin: 0;
    margin-bottom: 9px;
  }
  .u-tab-button {
    box-sizing: border-box;
    flex: 1;
    text-align: center;
    height: 20px;
    line-height: 18px;
    color: #777777;
    font-size: 13px;
    cursor: pointer;
    border: 1px solid #bdc7d1;
    margin-right: 0;
    &.current {
      cursor: default;
      color: $color-3;
      border-color: $color-3;
    }
    &:first-child {
      border-radius: 2px 0 0 2px;
    }
    &:last-child {
      border-radius: 0 2px 2px 0;
    }
  }
  .u-tab-button.current:after {
    width: 0;
  }
  .main {
    .name {
      min-width: 100px;
    }
    .price {
      min-width: 90px;
    }
    .title {
      font-size: 12px;
      color: $color-9;
      display: flex;
      margin: 14px 0 8px;
      .item {
        flex: 1;
        &:last-child {
          text-align: right;
        }
      }
    }
    .list-wrap {
      height: 258px;
    }
  }
}
</style>

