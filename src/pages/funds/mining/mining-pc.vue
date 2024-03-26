<template>
  <div class="funds-mining">
    <div class="header">
      <div class="at-value">
        <p class="title">{{$t("m.funds.profit.totalAtReleased")}}</p>
        <p v-if='total_at_amount > 0' >
          <span class="value">{{total_at_amount}}</span>
          <span class="unit">AT</span>
        </p>
        <p v-else class="no-value">- -</p>
      </div>
      <div class="valuation">
        <div class="item">
          <p class="title">{{$t("m.funds.profit.latestedReward")}}</p>
          <p v-if="last_at_income > 0 ">
            <span class="value">{{last_at_income}}</span>
            <span>AT</span>
          </p>
          <p v-else class="no-at">- -</p>
        </div>
      </div>
    </div>
    <p class="legal" v-if='total_at_amount > 0'>≈ {{changeUsdt('at', total_at_amount, true)}}</p>
    <miningHistory />
  </div>
</template>
<script>
import myProfit from '@/mixins/my-profit'
import miningHistory from './mining-history'
export default {
  mixins: [myProfit],
  components: {
    miningHistory
  },
}
</script>
<style lang="scss" scoped>
.funds-mining {
  width: 1120px;
  margin: 0 auto;
  padding-top: 50px;
  .header {
    display: flex;
    align-items: center;
  }
  .at-value {
    border-right: 1px solid #efefef;
    margin-right: 80px;
    padding-right: 75px;
    min-width: 300px;
    .no-at {
      img {
        width: 314px;
      }
    }
    .title {
      color: $color-3;
      font-size: 18px;
      font-weight: 500;
    }
    .value {
      color: $color-3;
      font-size: 40px;
    }
    .no-value {
      margin-top: 10px;
    }
    .unit {
      color: $color-9;
      font-size: 24px;
    }
    .otc {
      color: $color-9;
      font-size: 16px;
    }
  }

  .legal {
    color: $color-9;
    font-size: 16px;
    display: block;
    margin-bottom: 45px;
    margin-top: 5px;
  }
  .valuation {
    display: flex;
    justify-content: center;
    .item {
      margin-right: 80px;
      .title {
        font-size: 13px;
        color: $color-9;
        margin-bottom: 5px;
      }
      .value {
        font-size: 20px;
        color: $color-3;
      }
      .unit {
        font-size: 14px;
        color: $color-7;
      }
      .locked-value {
        color: #bbbbbb;
        .unit {
          color: #bbbbbb;
        }
      }
      .no-at {
        color: $color-text;
        font-size: 20px;
      }
    }
  }
}
</style>
