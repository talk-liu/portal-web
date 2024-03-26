<template>
  <div class="currency-detail">
    <div class="currency-info">
      <div class="currency_img" :style="{backgroundImage:`url(https://i.riostox.com/img/currency/${currency}.png)`}"></div>
      <div class="currency_info">
        <p>
          <span>{{currency | upperCase}}</span>
          <span>{{item.readable_name}}</span>
        </p>
        <p class="value">{{(Number(item.balance)+Number(item.locked)) ? (Number(item.balance)+Number(item.locked)).toFixed(8) : 0}} {{currency | upperCase}}</p>
      </div>
    </div>
    <div class="currency-detail-info">
      <div class="item">
        <span>{{$t('m.funds.available')}}</span>
        <span>{{Number(item.balance).toFixed(8)}}
          <span class="label">{{currency | upperCase}}</span>
        </span>
      </div>
      <div class="item">
        <span>{{$t('m.funds.frozed')}}</span>
        <span class="disabled">{{Number(item.locked).toFixed(8)}}
          <span class="label ">{{currency | upperCase}}</span>
        </span>
      </div>
      <div class="item">
        <span>{{$t('m.funds.estimated')}}（BTC）</span>
        <span>{{item.btc}}
          <span class="label">BTC</span>
        </span>
      </div>
      <div class="item">
        <span>{{$t('m.funds.estimated')}} ({{splitTotalLegal.unit}})</span>
        <span>{{splitTotalLegal.value}}</span>
      </div>
      <div class="item">
        <span>{{$t('m.funds.lastPrice')}}</span>
        <span class="red">{{renderLast(currency)}} {{ currency === 'btc' ? 'USDT' : 'BTC'}}</span>
      </div>

    </div>
    <div class="trade">
      <div class="title">{{$t('m.funds.toTrade')}}</div>
      <ul>
        <li v-for="(ticker, index) in item.tickers" :key="index" v-if='index < 3' @click='getMarketLink(ticker.marketId)'>
          <div class="top">
            <span class="name ">{{ticker.base_unit | upperCase}}
              <span>/{{ticker.quote_unit | upperCase}}</span>
            </span>
            <span class="change" :class="ticker.changePercent > 0 ? 'green' : ticker.changePercent < 0  ? 'red' : ''">{{ticker.changePercent}}%</span>
          </div>
          <div class="bottom">
            <span class="volume">{{ticker.last}} {{ticker.label}}</span>
            <span class="volume last-money">{{lastLegal(ticker.usdt)}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="btns">
      <v-btn type='primary' class="btn" v-if="item.depositable !== false" @click="goSpecificDetail('recharge', currency)">{{$t('m.funds.fundsMenu.recharge')}}</v-btn>
      <v-btn type='primary' class="btn" v-if="item.withdrawable !== false" @click="goSpecificDetail('withdraw', currency)">{{$t('m.funds.fundsMenu.withdraw')}}</v-btn>
    </div>
  </div>
</template>
<script>
import VBtn from '@/components/btn'
import find from 'lodash/find'
import { mapGetters } from 'vuex'
import totalMoney from '@/mixins/total-money'
import accountMixin from './account-mixin'
export default {
  mixins: [totalMoney, accountMixin],
  components: {
    VBtn
  },
  data() {
    return {
      item: {}
    }
  },
  computed: {
    ...mapGetters('tickers', ['allTickers']),
    ...mapGetters('accounts', ['accountsList']),
    ...mapGetters('viewport', ['type']),
    splitTotalLegal() {
      const totalLegal = this.totalLegal(this.item.usdt)
      return {
        unit: totalLegal.slice(0, 1),
        value: totalLegal.slice(1, totalLegal.length - 1),
      }
    },
  },
  watch: {
    accountsList() {
      const item = find(this.accountsList, { currency: this.currency })
      if (item) {
        this.item = this.addTickers(item)
      }
    }
  },
  created() {
    this.currency = this.$route.params.currency
    if (this.type !== 'h5') {
      this.$router.replace(this.$i18nRoute({
        name: 'funds'
      }))
    }
  },
  methods: {
    // 找到对应的account的最新价
    findLast(currency) {
      let last = 0
      if (currency === 'usdt') {
        for (let i = 0; i < this.allTickers.length; i++) {
          if (this.allTickers[i].quote_unit === 'usdt' && this.allTickers[i].base_unit === 'btc') {
            last = this.allTickers[i].last
            break
          }
        }
      }
      for (let i = 0; i < this.allTickers.length; i++) {
        if (this.allTickers[i].quote_unit === 'btc' && this.allTickers[i].base_unit === currency) {
          last = this.allTickers[i].last
          break
        }
      }
      return last
    },
    renderLast(currency) {
      return currency === 'btc'
        ? this.findLast('usdt')
        : currency === 'usdt'
          ? this.findLast(currency) > 0 ? (1 / this.findLast(currency)).toFixed(8) : 0
          : this.findLast(currency)
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/scss/variable.scss';

.currency-detail {
  padding-bottom: 60px;
}

.currency-info {
  display: flex;
  padding: 0 20px;
  align-items: center;
  margin-bottom: 16px;
  .currency_img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    background-size: 100% 100%;
  }
  p {
    span {
      font-size: 20px;
      color: #111111;
      &:last-child {
        color: #777777;
        font-size: 12px;
      }
    }
    &:last-child {
      color: #111111;
      font-size: 15px;
    }
  }
}

.currency-detail-info {
  padding: 0 20px;
  .item {
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    color: #666666;
    font-size: 13px;
    .label {
      font-size: 12px;
    }
    &:nth-child(odd) {
      background: #f6f6f6;
    }
    .disabled {
      color: rgba(102, 102, 102, 0.5);
    }
  }
}

.recharge-closed {
  width: 100%;
  margin: 127px auto 0;
  img {
    width: 175px;
    height: 104px;
    margin: 0 auto 30px;
    display: block;
  }
  p {
    margin: 0 auto;
    // width: 3rem;
    color: #bbbbbb;
    text-align: center;
    font-size: 16px;
  }
}

.green {
  color: #3bb46e;
}

.red {
  color: #ee4343;
}

.btns {
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 0 20px 10px;
  .btn {
    flex: 1;
    width: 155px;
    margin-right: 25px;
    &:last-child {
      margin-right: 0;
    }
  }
}

.trade {
  padding: 15px 20px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  width: 100%;
  margin: 25px auto;
  .title {
    color: #999999;
    font-size: 12px;
    margin-bottom: 10px;
  }
  ul li {
    width: 160px;
    height: 60px;
    border: 1px solid rgba(189, 199, 209, 0.5);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.06);
    margin-bottom: 12px;
    float: left;
    list-style: none;
    padding: 10px;
    &:nth-child(odd) {
      margin-right: 12px;
    }
    .top {
      display: flex;
      justify-content: space-between;
    }
    .name {
      color: rgba(51, 51, 51, 1);
      font-size: 14px;
      span {
        color: rgba(51, 51, 51, 0.5);
      }
    }

    .change {
      font-size: 12px;
    }
    .volume {
      color: #999999;
      font-size: 12px;
    }
    .last-money {
      font-size: 10px;
    }
  }
}
</style>
