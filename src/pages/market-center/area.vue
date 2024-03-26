<template>
  <div v-if="listData && listData[type] && listData[type].length > 0">
    <div v-if="type === minFee" class="title">
      {{$t('m.exchange.specialOffer')}}
      <span>（{{$t('m.exchange.transactionFee')}}{{` ${minFee*100}%）`}}</span>
    </div>
    <div v-if="type === maxFee && listData[minFee] && listData[minFee].length > 0" class="title">
      {{$t('m.exchange.nonToMTrading')}}
      <span>（{{$t('m.exchange.transactionFee')}}{{` ${maxFee*100}%）`}}</span>
    </div>
    <div v-if="type === 'mining'" class="title">{{$t('m.exchange.tradeToMine')}}</div>
    <div v-if="type === 'normal'" class="title">
      {{$t('m.exchange.nonToMTrading')}}
      <span>（{{$t('m.exchange.noMingPower')}}）</span>
    </div>
    <router-link
      :to="$i18nRoute({path:`/pro/markets/${ticker.marketId}`})"
      v-for="ticker in sort(listData[type], 'code')"
      :key="ticker.id"
    >
      <div class="item" @click="clearStatus">
        <span class="max-name name-wrap">
          <favorite :marketId="ticker.marketId"/>
          <span class="name">{{ticker.name}}</span>
          <span class="vouchers" v-if="allVouchers[ticker.marketId]">
            <img :src="iconUrl" class="icon" alt="icon">
            <span class="rate">{{allVouchers[ticker.marketId].rate}}%</span>
            <i class="iconfont icon-zhangdiefuzhang"></i>
          </span>
        </span>
        <span class="max">
          <span class="last">{{ticker.last}}</span>
          <span class="price">/{{lastLegal(ticker,4)}}</span>
        </span>
        <span class="percent" :class="ticker.changePercent>=0?'up':'down'">{{ticker.changePercent}}%</span>
        <span>{{ticker.high | thousands}}</span>
        <span>{{ticker.low | thousands}}</span>
        <span>{{ticker.funds | thousands}}</span>
        <span class="chart">
          <chart-k
            :market="marketsKData[ticker.base_unit + ticker.quote_unit] || []"
            :bidFixed="ticker.bid_fixed"
            :marketId="ticker.marketId"
            :side="ticker.isUp ? 'up':'down'"
            class="chart"
            :class="ticker.isUp ? 'up':'down'"
          ></chart-k>
        </span>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import sortBy from 'lodash/sortBy'
import Favorite from '@/components/favorite'
import totalMoeny from '@/mixins/total-money'
import ChartK from '@/components/chart-k'

export default {
  mixins: [totalMoeny],
  props: ['listData', 'type', 'clearStatus', 'marketsKData', 'curSort'],
  components: {
    Favorite,
    ChartK,
  },
  computed: {
    ...mapGetters('tickers', ['maxFee', 'minFee']),
    ...mapGetters('vouchers', ['allVouchers']),
    iconUrl() {
      return this.$fifth.isCn
        ? 'https://i.riostox.com/i/0d/0dde62b4994634b98d41bfb58d3fdbc4.png'
        : 'https://i.riostox.com/i/08/0865edd549dd04f8ec7e11724cd4ef0c.png'
    },
  },
  methods: {
    sort(arr, type) {
      let sortArr = []
      if (this.curSort.sort != null) {
        const curSortArr = arr.sort((obj1, obj2) => {
          const val1 = obj1[this.curSort.key]
          const val2 = obj2[this.curSort.key]
          return val1 - val2 > 0 ? 1 : -1
        })
        if (this.curSort.sort === 'down') {
          sortArr = curSortArr.reverse()
        }
        sortArr = curSortArr
      } else {
        sortArr = sortBy(arr, [type])
      }
      return sortArr
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  position: relative;
  padding-left: 10px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;

  @include themify($themes) {
    color: themed('textColor3');
    background-color: themed('titleBg');
  }
  span {
    @include themify($themes) {
      color: themed('textColor9');
    }
  }
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 2px;
    content: ' ';

    @include themify($themes) {
      background: themed('primaryColor');
    }
  }
}

.item {
  display: flex;
  height: 60px;
  line-height: 60px;
  font-size: 12px;
  padding: 0 10px;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;

  @include themify($themes) {
    color: themed('textColor3');
  }
  &:hover {
    background-color: #f3f3f3;
    border-radius: 2px;
  }
  span {
    flex: 1;
    &:last-child {
      text-align: right;
    }
  }
  .name-wrap {
    height: 27px;
    line-height: 27px;
    display: block;
    font-size: 12px;
    .favorite {
      float: left;
      margin-left: -5px;
    }
    .name {
      display: block;
      float: left;
      font-size: 13px;
      font-family: euBold;
    }
    .vouchers {
      display: flex;
      align-items: center;
      padding-left: 4px;
      .icon {
        display: block;
        height: 12px;
      }
      .rate {
        font-size: 12px;
        max-width: 34px;
        font-family: dinMedium;

        @include themify($themes) {
          color: themed('buyColor');
        }
      }
      i {
        display: block;
        font-size: 12px;
        margin-left: -3px;

        @include themify($themes) {
          color: themed('buyColor');
        }
      }
    }
  }
  .last,
  .percent {
    font-family: dinMedium;
  }
  .price {
    font-size: 13px;

    @include themify($themes) {
      color: themed('textColor9');
    }
  }
  .chart {
    display: flex;
    height: 22px;
    width: 115px;
    justify-content: flex-end;
  }
  .up {
    @include themify($themes) {
      color: themed('buyColor');
    }
  }
  .down {
    @include themify($themes) {
      color: themed('sellColor');
    }
  }
  .max {
    min-width: 145px;
  }
  .max-name {
    min-width: 185px;
  }
}
</style>

