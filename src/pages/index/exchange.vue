<template>
  <div class="exchange-wrap" v-if="list.length > 0">
    <div class="header">
      <div class="title">
        <!--        {{ type === 'common' ? $t('m.index.market') : $t('m.exchange.specialOffer')}}-->
        <span
          class="fee"
          v-if="type !== 'common'"
        >{{`（Fees ${minFee*100}%）`}}</span>
      </div>
    </div>
    <div class="main">
      <!--      <template v-if="type === 'common'">-->
      <!--        <div class="u-tabs tabs">-->
      <!--          <div-->
      <!--            v-for="tab in tabs"-->
      <!--            :key="tab.key"-->
      <!--            :class="['u-tab-button', {current: curTab === tab.key}]"-->
      <!--            @click="curTab = tab.key"-->
      <!--          >{{tab.name}}</div>-->
      <!--        </div>-->
      <!--        <div class="coins">-->
      <!--          <span>{{$t('m.index.listedCoins')}} {{tickerInfo.coins}}</span>-->
      <!--          <span>{{$t('m.index.tradingPairs')}} {{tickerInfo.tickerLen}}</span>-->
      <!--        </div>-->
      <!--      </template>-->
      <!--      <template v-else>-->
      <!--        <div class="transactionFeeTip">-->
      <!--          <img src="../../assets/images/tips.png" class="tip">-->
      <!--          <span class="txt">{{$t('m.home.transactionFeeTip')}}</span>-->
      <!--        </div>-->
      <!--      </template>-->
      <div class="listwrap">
        <exchange-list
          class="list listLeft"
          :list="listLeft"
          pos="left"
          :marketsKData="marketsKData"
          :extype="type"
        />
        <exchange-list class="list listRight" :list="listRight" :marketsKData="marketsKData"/>
      </div>
    </div>
    <!--    <router-link :to="$i18nRoute({path: '/my_favorite_markets'})" class="more" target="_blank">{{$t('m.index.seeMore')}}</router-link>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '@/graphql'
import ExchangeList from './exchange-list'
export default {
  props: ['type'],
  data() {
    return {
      curTab: 'up',
      tabs: [
        {
          name: 'Gainers',
          key: 'up',
        },
        {
          name: 'Losers',
          key: 'down',
        },
        {
          name: 'Volumes',
          key: 'volume',
        },
      ],
      marketsKData: [],
    }
  },
  computed: {
    ...mapGetters('tickers', ['tickerInfo', 'upList', 'downList', 'volumeList', 'feeList', 'minFee', 'maxFee']),
    list() {
      if (this.type === 'common') {
        return (
          {
            up: this.upList,
            down: this.downList,
            volume: this.volumeList,
          }[this.curTab] || []
        )
      } else {
        return this.feeList[this.minFee] || []
      }
    },
    listLeft() {
      return this.type === 'common' ? this.list.slice(0, 3) : this.list.slice(0, 2)
    },
    listRight() {
      return this.type === 'common' ? this.list.slice(3, 7) : this.list.slice(2, 5)
    },
  },
  watch: {
    list: {
      handler(val) {
        this.fetchMarkets(val)
      },
      deep: true,
    },
  },
  methods: {
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
  },
  components: {
    ExchangeList,
  },
}
</script>

<style lang="scss" scoped>
.exchange-wrap {
  width: 100%;
  height: 100%;
  padding: 65px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .header {
    text-align: center;
    .title {
      font-size: 30px;
      line-height: 42px;
      color: #0f0f1d;
      margin-bottom: 30px;
      .fee {
        color: #999999;
        font-family: dinRegular;
        font-weight: 300;
      }
    }
  }
  .main {
    flex: 1;
    width: 1400px;
    // background-color: #eee;
    .tabs {
      height: 66px;
      display: flex;
      justify-content: center;
      .u-tab-button {
        font-size: 18px;
        color: rgba($color: #0f0f1d, $alpha: 0.6);
        &.current {
          color: #0f0f1d;
        }
        &.current:after {
          width: 90%;
          left: 50%;
          margin-left: -45%;
          background-color: rgba($color: #0f0f1d, $alpha: 0.5);
        }
      }
    }
    .coins {
      font-size: 12px;
      line-height: 15px;
      color: rgba($color: #0f0f1d, $alpha: 0.6);
      font-family: dinMedium;
      margin-bottom: 20px;
      span {
        margin-right: 40px;
      }
    }
    .transactionFeeTip {
      color: #666666;
      margin-bottom: 18px;
      .tip {
        width: 14px;
        height: 14px;
        margin-right: 6px;
        vertical-align: baseline;
      }
      .txt {
        flex: 1;
      }
    }
    .listwrap {
      display: flex;
      .list {
        flex: 1;
      }
      .listLeft {
        margin-right: 5.7%;
      }
    }
  }
  .more {
    margin-top: 51px;
    font-size: 16px;
    color: #4c84ff;
    padding: 9px 46px;
    border: 1px solid #e0e0e0;
    border-radius: 3px;
  }
}

@include screen-sm-md-new() {
  .exchange-wrap {
    padding: 67px 0 79px;
    .main {
      width: 84%;
      .list {
        a {
          &:nth-child(2n) {
            padding-left: 4.6%;
          }
          &:nth-child(2n + 1) {
            padding-right: 4.6%;
          }
        }
      }
      .listwrap {
        flex-direction: column;
        .listLeft {
          margin-right: 0;
        }
      }
    }
  }
}

@include screen-h5-new() {
  .exchange-wrap {
    padding: pxtovw(20px) 0 pxtovw(21px);
    .header {
      .title {
        font-size: pxtovw(20px);
        line-height: pxtovw(28px);
        margin-bottom: pxtovw(10px);
      }
    }
    .main {
      width: pxtovw(350px);
      overflow: hidden;
      .tabs {
        height: pxtovw(53px);
        .u-tab-button {
          font-size: pxtovw(14px);
          height: pxtovw(28px);
          line-height: pxtovw(28px);
          &.current:after {
            bottom: 4%;
          }
        }
      }
      .coins {
        font-size: pxtovw(10px);
        line-height: pxtovw(14px);
        span {
          margin-right: pxtovw(20px);
        }
      }
      .transactionFeeTip {
        font-size: 13px;
      }
      .list {
        a {
          width: 100%;
        }
      }
      .listwrap {
        flex-direction: column;
        .listLeft {
          margin-right: 0;
        }
      }
    }
    .more {
      margin-top: 30px;
      font-size: pxtovw(15px);
      color: #4c84ff;
      padding: pxtovw(9px) pxtovw(30px);
    }
  }
}
</style>

