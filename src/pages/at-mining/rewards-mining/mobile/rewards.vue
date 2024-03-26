<template>
  <div class='rewards-h5-wrap'>
    <div class='price-wrap fb th-num-bold'>
      <span class='unit pull-left'>{{unit}}</span>
      <span class='integer'>{{currentProfitSplice[0]}}</span>
      <span class='decimal'>.{{currentProfitSplice[1]}}</span>
      <!-- <span class='decimal'>&nbsp;USDT</span> -->
    </div>
    <p class='current-profit-text main-p'>{{$t('m.home.currentProfit')}}</p>
    <p class='deliver-at-text sub-p'>{{$t('m.home.deliverAt')}} {{profitDeliveredShow}}
    </p>
    <div class="daily-rate-wrap fb">
      <div>
        <div class="profit-rate-100 th-num-bold">
          <span class='unit pull-left'>{{unit}}</span>
          <span class='integer'>{{hundredProfitSplice[0]}}</span>
          <span class='decimal'>.{{hundredProfitSplice[1]}}</span>
          <!-- <span class='decimal'>&nbsp;USDT</span> -->
        </div>
        <p class='main-p'>{{$t('m.home.hundredProfit')}}</p>
      </div>
      <div>
        <div class="profit-rate th-num-bold">
          <span class='integer'>{{atProfitRateSplice[0]}}</span>
          <span class='decimal'>.{{atProfitRateSplice[1]}}</span>
          <span class='unit'>%</span>
        </div>
        <p class='main-p'>{{$t('m.home.dailyRate')}}</p>
      </div>
    </div>

    <div class="last-day fb">
      <div class="price th-num-bold">
        <span class='small-unit-text pull-left'>{{unit}}</span>
        <span class='small-integer-text'>{{yesterdayProfitSplice[0]}}</span>
        <span class='small-decimal-text'>.{{yesterdayProfitSplice[1]}}</span>
        <!-- <span class='small-decimal-text'>&nbsp;USDT</span> -->
      </div>
      <p class='main-p'>{{$t('m.home.yesterdayProfit')}}</p>
    </div>
    <div class='fb'>
      <div class="price th-num-bold">
        <span class='small-unit-text pull-left'>{{unit}}</span>
        <span class='small-integer-text'>{{totalProfitSplice[0]}}</span>
        <span class='small-decimal-text'>.{{totalProfitSplice[1]}}</span>
        <!-- <span class='small-decimal-text'>&nbsp;USDT</span> -->
      </div>
      <p class='main-p'>{{$t('m.home.totalProfit')}}</p>
    </div>
  </div>
</template>

<script>
import rewardMixin from '../mixins/reward-mixin'
export default {
  mixins: [rewardMixin],
}
</script>

<style lang='scss' scoped>
$color-integer: rgba(255, 255, 255, 0.8);
$color-decimal: rgba(255, 255, 255, 0.5);
$color-p: rgba(255, 255, 255, 0.7);
$color-p-sub: rgba(255, 255, 255, 0.5);
$color-red-sub: #aa3232;
$color-red-main: #ee4343;

.rewards-h5-wrap {
  padding: 24px 15px 24px;
  color: #ffffff;
  .small-text {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
  }
  .small-unit-text {
    color: $color-integer;
    font-size: 10px;
    margin-top: 3px;
    margin-right: 2px;
  }
  .small-integer-text {
    color: $color-integer;
    font-size: 14px;
  }
  .small-decimal-text {
    color: $color-decimal;
    font-size: 11px;
    margin-left: -3px;
  }
  .main-p {
    color: $color-p;
    font-size: 12px;
    margin-top: 5px;
  }
  .sub-p {
    color: $color-p-sub;
  }
  // .price-wrap,
  // .profit-rate-100,
  // .profit-rate,
  // .price,
  // {
  //   span {
  //     vertical-align: sub;
  //   }
  // }
  .price-wrap {
    margin-bottom: 12px;
    .unit {
      font-size: 24px;
      margin-top: 8px;
      margin-right: 2px;
    }
    .integer {
      font-size: 35px;
    }
    .decimal {
      color: #6d6770;
      font-size: 20px;
      margin-left: -3px;
    }
  }
  .current-profit-text {
    font-size: 15px;
    color: $color-p;
    margin-top: 15px;
    margin-bottom: 8px;
  }
  .deliver-at-text {
    font-size: 12px;
    color: $color-p-sub;
  }
  .daily-rate-wrap {
    padding: 27px 0 20px;
    display: flex;
    justify-content: space-between;
    margin-right: 10px;
    .profit-rate-100 {
      .unit {
        color: $color-red-main;
        font-size: 12px;
        margin-top: 5px;
        margin-right: 2px;
      }
      .integer {
        color: $color-red-main;
        font-size: 18px;
      }
      .decimal {
        color: $color-red-sub;
        font-size: 13px;
        margin-left: -3px;
      }
    }
    .profit-rate {
      .integer {
        font-size: 18px;
        color: #d4cdd5;
      }
      .decimal {
        font-size: 13px;
        color: #d4cdd5;
        margin-left: -3px;
      }
      .unit {
        font-size: 13px;
        color: #d4cdd5;
      }
    }
  }
  .last-day {
    padding-bottom: 20px;
  }
}
</style>
