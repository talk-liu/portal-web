<template>
  <div class="other-bit-wrap">
    <p class="title color-text fb">{{$t('m.funds.trade')}}</p>
    <ul class="other-bit-list semi-bold">
      <!-- <li>BNB/BTC</li>
            <li>BNB/ETH</li>
      <li>BNB/USTD</li>-->
      <li
        v-for="(item,index) in tickers"
        @click="goMarkLink(item)"
        :key="index"
        v-if="index<3"
      >{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['currency'],
  computed: {
    ...mapGetters('tickers', ['allTickers']),
  },

  data() {
    return {
      tickers: [],
    }
  },

  created() {
    this.selectTickers()
  },

  watch: {
    currency() {
      this.selectTickers()
    },
  },

  methods: {
    goMarkLink(item) {
      location.href = `/pro/markets/${item.marketId}`
    },
    // 选择交易对
    selectTickers() {
      this.tickers = []
      const currency = this.currency
      this.allTickers.forEach(ele => {
        if (ele.quote_unit === currency) {
          this.classify(ele)
          // this.tickers.push(ele);
        }
      })
      if (this.tickers.length === 0) {
        this.allTickers.forEach(ele => {
          if (ele.base_unit === currency) {
            this.tickers.push(ele)
          }
        })
      }
      this.tickers = this.tickers.slice(0, 4)
    },
    // 判断分类交易对
    classify(ele) {
      let tickers = this.tickers
      if (ele.base_unit === 'eth') {
        tickers.splice(0, 0, ele)
        return
      }
      if (ele.base_unit === 'xrp') {
        tickers.splice(1, 0, ele)
        return
      }
      if (ele.base_unit === 'ltc') {
        tickers.splice(2, 0, ele)
        return
      }
      if (ele.base_unit === 'xmr') {
        tickers.splice(3, 0, ele)
        return
      }
      tickers.push(ele)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.other-bit-wrap {
  float: right;

  .other-bit-list {
    margin-top: 10px;
    font-size: 12px;
    color: $color-assist1;

    li {
      margin-right: 10px;
      list-style: none;
      display: inline-block;
      cursor: pointer;

      &:hover {
        color: $color-primary;
      }
    }
  }
}
</style>
