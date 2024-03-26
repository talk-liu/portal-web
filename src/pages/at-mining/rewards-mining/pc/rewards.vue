<template>
  <div class='rewards-pc-wrap slideInUp'>
    <div class='flex jcsb aic'>
      <div class='item' style='margin-right:60px;'>
        <div class='current-profit th-num-bold fb'>
          <span class='unit pull-left'>{{unit}}</span>
          <span class='integer' id='current-profit-integer'>{{currentProfitSplice[0]}}</span>
          <span class='point'>.</span>
          <span class='decimal' id='current-profit-decimal'>.{{currentProfitSplice[1]}}</span>
          <!-- <span class='decimal'>&nbsp;USDT</span> -->
        </div>
        <p class='main-p'>{{$t('m.home.currentProfit')}}</p>
        <p class='sub-p fb-r'>{{$t('m.home.deliverAt')}}{{profitDeliveredShow}}</p>
      </div>
      <div class='item'>
        <div class='profit-rate-100 th-num-bold'>
          <span class='unit pull-left'>{{unit}}</span>
          <span class='integer'>{{hundredProfitSplice[0]}}</span>
          <span class='decimal'>.{{hundredProfitSplice[1]}}</span>
          <!-- <span class='decimal'>&nbsp;USDT</span> -->
        </div>
        <p class='main-p'>{{$t('m.home.hundredProfit')}}</p>
        <div class="profit-rate sub-p fb-r">
          <span>{{$t('m.home.dailyRate')}}</span>
          <span class='integer'>{{atProfitRateSplice[0]}}</span>
          <span class='decimal'>.{{atProfitRateSplice[1]}}</span>
          <span class='unit'>%</span>
        </div>
      </div>
    </div>
    <div class='flex jcsb aic' style='margin-top:40px;'>
      <div class='item' style='margin-right:60px;'>
        <div class="yesterday-profit th-num-bold fb'">
          <span class='unit pull-left'>{{unit}}</span>
          <span class='integer'>{{yesterdayProfitSplice[0]}}</span>
          <span class='decimal'>.{{yesterdayProfitSplice[1]}}</span>
          <!-- <span class='decimal'>&nbsp;USDT</span> -->
        </div>
        <div class="price-btc fb-r">/ {{yesterdayProfit}} BTC</div>
        <p class='main-p fb-r'>{{$t('m.home.yesterdayProfit')}}</p>
      </div>
      <div class='item'>
        <div class="total-profit th-num-bold fb'">
          <span class='unit pull-left'>{{unit}}</span>
          <span class='integer'>{{totalProfitSplice[0]}}</span>
          <span class='decimal'>.{{totalProfitSplice[1]}}</span>
          <!-- <span class='decimal'>&nbsp;USDT</span> -->
        </div>
        <div class="price-btc fb-r">/ {{totalProfit}} BTC</div>
        <p class='main-p fb-r'>{{$t('m.home.totalProfit')}}</p>
      </div>
    </div>

  </div>
</template>

<script>
import rewardMixin from '../mixins/reward-mixin'
import CountUp from 'countup.js'

export default {
  mixins: [rewardMixin],
  methods: {
    delcommafy(num) {
      if ((num + '').trim() == '') {
        return ''
      }
      num = num.replace(/,/gi, '')
      return num
    },
    addZero(val) {
      val = parseInt(val)
      return val < 10 ? `0${val}` : val
    },
  },
  mounted() {
    // 动画效果
    const options = {
      useEasing: false,
      useGrouping: true,
      separator: ',',
      decimal: '.',
    }
    this.countUpInteger = new CountUp(
      'current-profit-integer',
      0,
      this.delcommafy(this.currentProfitSplice[0]),
      0,
      0.6,
      options,
    )

    this.countUpDecimal = new CountUp(
      'current-profit-decimal',
      0,
      this.addZero(this.currentProfitSplice[1]),
      0,
      0.6,
      options,
    )

    if (!this.countUpInteger.error) {
      setTimeout(() => {
        this.countUpInteger.start()
        this.countUpDecimal.start()
      }, 0)
    } else {
      console.error(this.countUpInteger.error, this.countUpDecimal.error)
    }
    setInterval(() => {
      this.countUpInteger.update(this.delcommafy(this.currentProfitSplice[0]))
      this.countUpDecimal.update(this.currentProfitSplice[1])
    }, 1000)

    setTimeout(() => {
      this.animateHeight = this.height
    }, 0)
  },
}
</script>

<style lang='scss' scoped>
$color-integer: rgba(255, 255, 255, 0.8);
$color-decimal: rgba(128, 128, 128, 0.8);
$color-p: rgba(255, 255, 255, 0.7);
$color-p-sub: rgba(255, 255, 255, 0.5);
$color-red-sub: #aa3232;
$color-red-main: #ee4343;

.main-p {
  color: $color-p;
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 8px;
}

.sub-p {
  color: $color-p-sub;
  font-size: 12px;
  margin-top: 12px;
}

.item {
  flex: 1;
}

.price-btc {
  color: $color-p-sub;
  font-size: 13px;
  margin-top: 10px;
  // margin-bottom: -5px;
}

.rewards-pc-wrap {
  width: 630px;
  margin-left: 129px;
  height: 400px;
  padding-top: 100px;
  .current-profit {
    .unit {
      color: $color-255;
      font-size: 24px;
      margin-top: 18px;
      margin-right: 5px;
    }
    .integer {
      color: $color-255;
      font-size: 45px;
    }
    .point {
      margin-left: -5px;
      color: #6d6770;
      font-size: 30px;
    }
    .decimal {
      color: #6d6770;
      font-size: 20px;
    }
  }
  .profit-rate-100 {
    .unit {
      color: $color-red-main;
      font-size: 24px;
      margin-top: 18px;
      margin-right: 5px;
    }
    .integer {
      color: $color-red-main;
      font-size: 45px;
    }
    .decimal {
      color: $color-red-sub;
      font-size: 20px;
      margin-left: -5px;
    }
  }
  .total-profit,
  .yesterday-profit {
    .unit {
      color: $color-integer;
      font-size: 20px;
      margin-top: 8px;
      margin-right: 5px;
    }
    .integer {
      color: $color-integer;
      font-size: 30px;
    }
    .decimal {
      color: $color-decimal;
      font-size: 16px;
      margin-left: -2px;
    }
  }
}

#current-profit-decimal {
  width: 22px;
  display: inline-block;
}
</style>
