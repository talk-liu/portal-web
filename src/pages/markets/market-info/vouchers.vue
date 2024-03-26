<template>
  <div class="vouchers-wrap" v-if="currentVouchers.currency">
    <div class="icon-wrap">
      <img :src="iconUrl" alt="icon">
    </div>
    <div class="info-warp">
      <div class="info">
        <span class="currency">{{currentVouchers.currency | upperCase}} {{currentVouchers.rate}}</span>
        <span>{{currentVouchers.amount}}/{{currentVouchers.origin_amount}} {{currentVouchers.quote | upperCase}}</span>
      </div>
      <div class="date">{{$t('m.funds.profit.validPeriod')}}: {{currentVouchers.date}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('vouchers', ['currentVouchers']),
    iconUrl() {
      return this.$fifth.isCn
        ? 'https://i.riostox.com/i/0d/0dde62b4994634b98d41bfb58d3fdbc4.png'
        : 'https://i.riostox.com/i/08/0865edd549dd04f8ec7e11724cd4ef0c.png'
    },
  },
}
</script>

<style lang="scss" scoped>
.vouchers-wrap {
  padding: 15px 20px;
  display: flex;
  border-top-width: 1px;
  border-top-style: solid;

  @include themify($themes) {
    border-color: themed('lineBorderColorF5');
  }
  .icon-wrap {
    width: 34px;
    img {
      width: 20px;
    }
  }
  .info-warp {
    flex: 1;
    font-size: 13px;
    height: 39px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .info {
      @include themify($themes) {
        color: themed('textColor3');
      }
      .currency {
        font-family: dinBold;
      }
    }
    .date {
      font-size: 12px;

      @include themify($themes) {
        color: themed('textColor9');
      }
    }
  }
}
</style>
