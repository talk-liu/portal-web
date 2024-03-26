<template>
  <div>
    <template v-if="width <= 1680">
      <div class="u-tabs tabs">
        <div
          v-for="tab in tabs"
          :key="tab.key"
          :class="['u-tab-button', {current: curTab === tab.key}]"
          @click="curTab = tab.key"
        >{{tab.name}}</div>
      </div>
      <order-book v-if="curTab==='orders'"></order-book>
      <latest-trade v-if="curTab==='trades'"></latest-trade>
    </template>
    <template v-else>
      <div class="title">{{$t('m.exchange.orders')}}</div>
      <order-book></order-book>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import OrderBook from './order-book'
import LatestTrade from './latest-trade'

export default {
  components: {
    OrderBook,
    LatestTrade,
  },
  data() {
    return {
      curTab: 'orders',
      tabs: [
        {
          name: this.$t('m.exchange.orders'),
          key: 'orders',
        },
        {
          name: this.$t('m.exchange.tradeHistory'),
          key: 'trades',
        },
      ],
    }
  },
  computed: {
    ...mapState('viewport', ['width']),
  },
}
</script>

<style lang="scss" scoped>
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

.tabs {
  border-bottom-width: 1px;
  border-bottom-style: solid;

  @include themify($themes) {
    border-color: themed('lineBorderColorF5');
  }
}
</style>
