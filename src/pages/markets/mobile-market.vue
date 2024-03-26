<template>
  <div class="mobile-market">
    <div class="tab-content">
      <sidebar v-show="curTab==='sidebar'"></sidebar>
      <delegation v-show="curTab==='delegation'"></delegation>
      <chart v-show="curTab==='chart'"></chart>
      <order-book v-if="curTab==='order'"></order-book>
      <latest-trade v-show="curTab==='trades'"></latest-trade>
    </div>
    <div class="u-tabs tabs">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        :class="['u-tab-button', {current: curTab === tab.key}]"
        @click="curTab = tab.key"
      >
        <i :class="['iconfont', tab.icon]"></i>
        <div class="name">{{tab.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './sidebar'
import OrderBook from './order-book'
import Chart from './mobile-chart'
import Delegation from './delegation'
import LatestTrade from './latest-trade'

export default {
  components: {
    Sidebar,
    OrderBook,
    Chart,
    Delegation,
    LatestTrade,
  },
  data() {
    return {
      curTab: 'sidebar',
      tabs: [
        {
          name: this.$t('m.optionExchange.trading'),
          key: 'sidebar',
          icon: 'icon-jiaoyi-zhengchangzhuangtai',
        },
        {
          name: this.$t('m.exchange.openOrders'),
          key: 'delegation',
          icon: 'icon-dangqianweituo-zhengchangzhuangtai',
        },
        {
          name: this.$t('m.marketChart.ktitle'),
          key: 'chart',
          icon: 'icon-Kxiantu-zhengchangzhuangtai',
        },
        {
          name: this.$t('m.exchange.orders'),
          key: 'order',
          icon: 'icon-weituodingdan-zhengchangzhuangtai',
        },
        {
          name: this.$t('m.exchange.tradeHistory'),
          key: 'trades',
          icon: 'icon-zuixinchengjiao-zhengchangzhuangtai',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.mobile-market {
  display: flex;
  height: 100%;

  @include themify($themes) {
    background-color: themed('wrapBgColor');
  }
}

.title {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid;
  margin: 0 20px;
  font-size: 14px;
  font-weight: 500;
  font-family: euBold;

  @include themify($themes) {
    border-color: themed('lineBorderColorF5');
  }
}

.wrap {
  @include themify($themes) {
    background-color: themed('wrapBgColor');
  }
}

.tab-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  width: 100%;
}

.tabs.u-tabs {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: rgba(#000000, 0.95);
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  z-index: $zindex-sticky;
  .u-tab-button {
    flex: 1;
    height: 50px;
    line-height: 34px;
    color: rgba(#ffffff, 0.7);
    margin: 0;
    text-align: center;
    i {
      font-size: 22px;
    }
    .name {
      margin-top: -16px;
      font-size: 12px;
      font-weight: 300;
      transform: scale(0.9);
    }
    &.current {
      color: $color-primary;
      &:after {
        content: none;
      }
    }
  }
}
</style>
