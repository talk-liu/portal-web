<template>
  <div class='rate-ticket-wrap' v-if="item">
    <div ref="infoTip" @mouseover='onMouseover' @mouseout="onMouseleave">
      <img class='rate-img' slot='img' :src="imgUrl">
      <span class='rate-value th-en'>{{item.rate}}</span>
      <span class='rate-unit th-en'>{{$t('m.funds.profit.rate')}}</span>
      <img class='icon-up' src="https://i.riostox.com/i/4b/4beb84bd715c13eedd035ef8da9187d0.png" />
    </div>
  </div>
</template>

<script>
import Tooltip from '@/components/tip/tool-tip.js'
// import lang from '@/utils/lang'
import tickerRate from '@/mixins/ticker-rate'
export default {
  props: ['current_market'], // 'rate', 'validity'
  mixins: [tickerRate],
  data() {
    return {
      x: 0,
      y: 0,
    }
  },
  computed: {
    rate() {
      return this.$t('m.funds.profit.enhancementVoucherTip', {
        currency: this.item.currency && this.item.currency.toUpperCase(),
        rate: this.item.rate,
      })
    },
    validity() {
      return `${this.$t('m.funds.profit.validPeriod')}` + '：' + `${this.formatDate(this.item.date)}`
    },
    item() {
      return this.getCurrentTicker()
    },
    imgUrl() {
      return this.isCn
        ? 'https://i.riostox.com/i/0d/0dde62b4994634b98d41bfb58d3fdbc4.png'
        : 'https://i.riostox.com/i/08/0865edd549dd04f8ec7e11724cd4ef0c.png'
    },
  },
  methods: {
    formatDate(date) {
      // return date && new Date(date).format('yyyy-MM-dd')
      return date
    },
    onMouseleave() {
      this.$clearTooltip()
    },
    onMouseover() {
      if (this.$refs.infoTip) {
        const documentScrollTop = document.documentElement.scrollTop
        const element = this.$refs.infoTip
        const obj = element.getBoundingClientRect()
        this.x = Math.ceil(obj.left)
        this.y = obj.top + documentScrollTop
        Tooltip({
          x: this.x - 65,
          y: this.y + 26,
          rate: this.rate,
          validity: this.validity,
        })
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.rate-ticket-wrap {
  display: inline-block;
  margin-top: -2px;
  img,
  span {
    vertical-align: middle;
  }
  .rate-img {
    width: 20px;
    height: 14px;
    background-size: 100% 100%;
  }
  .rate-validity-wrap {
    width: 186px;
    .rate {
      color: #111111;
    }
    .validity {
      color: #666666;
    }
  }
  .rate-value {
    font-size: 13px;
    color: #3bb46e;
  }
  .rate-unit {
    font-size: 13px;
    color: #3bb46e;
  }
  .icon-up {
    height: 9px;
  }
}
</style>