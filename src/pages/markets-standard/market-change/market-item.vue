<template>
  <div
    class="item-wrap"
    v-if="listData && listData[type] && listData[type].length > 0"
  >
    <div
      v-if="type === minFee && listData[minFee]"
      class="title"
    >
      {{$t('m.exchange.specialOffer')}}
      <span class="sub">（{{$t('m.exchange.transactionFee')}}{{` ${minFee*100}%）`}}</span>
    </div>
    <div
      v-if="type === maxFee && listData[minFee] && listData[minFee].length > 0"
      class="title"
    >
      {{$t('m.exchange.nonToMTrading')}}
      <span class="sub">（{{$t('m.exchange.transactionFee')}}{{` ${maxFee*100}%）`}}</span>
    </div>
    <div
      v-if="type === 'mining' && listData['mining']"
      class="title"
    >{{$t('m.exchange.tradeToMine')}}</div>
    <div
      v-if="type === 'normal' && listData['normal']"
      class="title"
    >
      {{$t('m.exchange.nonToMTrading')}}
      <span class="sub">（{{$t('m.exchange.noMingPower')}}）</span>
    </div>
    <router-link
      class="list"
      v-for="item in sortList(listData[type])"
      :to="$i18nRoute({path:`/markets/${item.code}`})"
      :key="item.code"
    >
      <div class="item name">
        <favorite
          class="love-icon"
          :marketId="item.code"
        />
        <span>{{item.name}}</span>
      </div>
      <div class="item price">{{item.last}}</div>
      <div
        :class="['item', Number(item.changePercent) < 0 ? 'down':'up']"
        v-if="checkValue == 0"
      >{{item.changePercent}}%</div>
      <div
        class="item"
        v-else
      >{{item.funds}}</div>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Favorite from '@/components/favorite'
export default {
  props: {
    listData: { type: Object, default: () => ({}) },
    type: { default: '' },
    checkValue: { type: Number, default: 0 },
  },
  components: {
    Favorite,
  },
  computed: {
    ...mapGetters('tickers', ['maxFee', 'minFee']),
  },
  methods: {
    sortList(arr) {
      if (!arr) return []
      const type = this.checkValue == 0 ? 'changePercent' : 'funds'
      return arr.sort((a, b) => {
        return a[type] - b[type] > 0 ? -1 : 1
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.item-wrap {
  a {
    color: $color-7;
  }
  .title {
    font-size: 12px;
    color: $color-3;
    font-weight: 600;
    height: 29px;
    line-height: 29px;
    border-top: 1px solid $color-line;
    border-bottom: 1px solid $color-line;
    .sub {
      color: $color-9;
    }
  }
  .list {
    display: flex;
    font-size: 13px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    .item {
      flex: 1;
      &:last-child {
        text-align: right;
      }
    }
    .name {
      display: flex;
      min-width: 100px;
    }
    .price {
      min-width: 90px;
    }
    .down {
      color: #ee4343;
    }
    .up {
      color: #3bb46e;
    }
  }
}
</style>

