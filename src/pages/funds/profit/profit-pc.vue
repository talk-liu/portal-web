<template>
  <div class="funds-profit">
    <div class="header">
      <div class="at-value">
        <p class="b-title">{{$t("m.funds.fundsMenu.program")}}</p>
        <div class="item">
          <p class="value" v-if="!isEmptyData(at_vip_grade)">
            {{getlangMessage(at_vip_grade)}}</p>
          <p v-else class="no-value">--</p>
        </div>
      </div>
      <!--      <div class="valuation">-->
      <!--        <div class="item totalRewards">-->
      <!--          <p class="title">{{$t("m.funds.profit.totalRewards")}}</p>-->
      <!--                <p class="value" v-if="totalProfitBtc() > 0 ">-->
      <!--            {{splitUsdt(totalProfit())[0]}} <span class="font30">{{splitUsdt(totalProfit())[1]}}</span>-->
      <!--          </p>-->
      <!--          <p v-else class="no-at">- -</p>-->
      <!--        </div>-->
      <!--        <div class="profit-item" v-if="totalProfitBtc() > 0">-->
      <!--          <div class="item" v-for='(item,key) in getCurrencyData()' :key="key">-->
      <!--            <div class="percent">-->
      <!--              <radial-progress-bar :diameter="60" circleBoxShadow="0 3px 7px 3px rgba(214, 228, 255, 0.5)" :strokeWidth="5" stopColor="#B5CCFF" startColor='#4A82FF' innerStrokeColor="#D6E4FF" :completed-steps="item.percent" :total-steps="100">{{Number(item.percent).toFixed(0)}}%</radial-progress-bar>-->
      <!--            </div>-->
      <!--            <div class="detail">-->
      <!--              <span>{{$t("m.funds.profit.accumulativeRewards",{currency: item.currency.toUpperCase()})}}</span>-->
      <!--              <span class="value">{{Number(item.amount).toFixed(8)}}</span>-->
      <!--              <span>≈ {{item.money}}</span>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <div class="platform">
      <div class="left">
        <div class="all">
          <p class="title">{{$t("m.funds.profit.eligibleRewards")}}
            <info-tip class="info-tip">
              <img src='https://i.riostox.com/i/c4/c45711b12e72d6003a4dfee4c2e226c5.png' alt="" slot='img' height="16">
              <span slot="info">{{$t('m.funds.profit.eligibleRewardsTip')}}</span>
            </info-tip>
          </p>
          <p class="num value" v-if="finished_cache">{{minProfitItem.profit}}
            <span>AT</span>
          </p>
          <p class="calculating" v-else>
            {{$t('m.funds.profit.calculating')}}
            <span class="dotting-animation"></span>
          </p>
        </div>
        <div class="down">
          <div class="item">
            <p class="title">{{$t("m.funds.profit.totalDelivered")}}</p>
            <p class="value" v-if='totalDelivered > 0'>
              {{totalDelivered}}
              <span>AT</span>
            </p>
            <p v-else>- -</p>
          </div>
          <div class="item locked" v-if="locked_at_amount > 0">
            <span class="title">{{$t("m.funds.profit.locked")}}</span>
            <div class="locked-value">
              <div class="value">{{locked_at_amount}}</div>
              <div class="unit">AT</div>
              <info-tip class="info-tip">
                <img src='https://i.riostox.com/i/c4/c45711b12e72d6003a4dfee4c2e226c5.png' alt="" slot='img' height="16">
                <div slot="info">
                  <span class="info-label">{{$t("m.funds.profit.defrozenLabel")}}</span>
                  <div v-for='(item,key) in locked_at_list' :key='key' class="info-list">
                    <span>{{$t("m.funds.profit.defrozenTip1", { amount: item.amount, time: formatYmd(item.unfreeze_at) })}}</span>
                  </div>
                </div>
              </info-tip>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">{{$t("m.funds.profit.sevenDayATHolidings")}}</div>
        <div class="profit-chart" v-if="sevenDaysAt.length > 0">
          <span class="date">{{formatYm(sevenDaysAt[0].date)}}</span>
          <div class="items">
            <div class="item" :style="setPercent(item.profit)" v-for="(item, index) in sevenDaysAt" :key='index' :class="{'min': index == minIndex, 'zero': item.profit == 0}">
              <div class="tip-text items-tip">
                <span class="title">{{$t('m.funds.profit.lowestHolding', { date: formatYm(item.date) })}}
                </span>
                <span class="value">{{formatPriceFloat(item.profit).first | thousands}}
                  <span v-if="formatPriceFloat(item.profit).last">.{{formatPriceFloat(item.profit).last}}</span>
                </span>
              </div>
            </div>
          </div>
          <span class="date">{{formatYm(sevenDaysAt[6].date)}}</span>
        </div>
      </div>
    </div>
    <profitHistory/>
  </div>
</template>
<script>
import myProfit from '@/mixins/my-profit'
import InfoTip from '@/components/tip/index'
import RadialProgressBar from '@/components/radial-progress-bar'
import profitHistory from './profit-history'

export default {
  components: {
    InfoTip,
    RadialProgressBar,
    profitHistory
  },
  mixins: [myProfit],
  methods: {
    // 判断字符是否为空的方法
    isEmptyData(obj) {
      if (typeof obj == 'undefined' || obj == null || obj == '') {
        return true
      } else {
        return false
      }
    },
    setPercent(value) {
      let height = value / this.maxProfit * 100
      if (height > 2) {
        return {
          height: `${height}%`,
        }
      } else {
        return {
          height: '2%',
        }
      }
    },
  }
}
</script>
<style scoped lang="scss">
@import '../../../assets/scss/variable.scss';

.dotting-animation {
  display: inline-block;
  overflow: hidden;
  height: 1.2em;
  line-height: 1.5em;
}

.dotting-animation:after {
  display: inline-table;
  white-space: pre;
  text-align: left;
  content: '\A.\A..\A...';
  animation: spin 2s steps(4) infinite;
}

@keyframes spin {
  to {
    transform: translateY(-5.9em);
  }
}

.funds-profit {
  width: 1120px;
  margin: 0 auto;
  padding-top: 50px;
}

.header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 35px;
}

.at-value {
  padding-right: 65px;
  min-width: 300px;
  .b-title {
    color: $color-3;
    font-size: 18px;
    margin-bottom: 24px;
    display: block;
    font-weight: 500;
    line-height: 1em;
  }
  .no-at {
    img {
      width: 314px;
    }
  }
  .title {
    color: $color-9;
    font-size: 13px;
  }
  .value {
    color: #fac140;
    font-size: 40px;
    font-weight: 400;
    margin-top: 5px;
  }
  .no-value {
    /* color: #fac140; */
    margin-top: 10px;

    /* font-size: 40px; */
  }
}

.valuation {
  border-left: 1px solid #efefef;
  padding-left: 80px;
  width: 100%;
  .totalRewards {
    margin-bottom: 10px;
    .title {
      line-height: 1em;
      margin-bottom: 7px;
    }
  }
  .item {
    .title {
      color: $color-9;
      font-size: 13px;
    }
    .value {
      color: $color-3;
      font-size: 30px;
      font-weight: 400;
    }
    .no-at {
      color: $color-text;
      font-size: 20px;
    }
  }
}

.profit-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .item {
    &:last-child {
      margin-right: 0;
    }
    .percent {
      margin: 0 auto;
      font-size: 14px;
      height: 50px;
      width: 60px;
      color: $color-text;
    }

    .detail {
      margin-top: 20px;
      span {
        display: block;
        color: $color-assist2;
        font-size: 12px;
        margin-bottom: 5px;
      }
      .value {
        color: $color-text;
        font-size: 16px;
      }
    }
  }
}

.platform {
  position: relative;
  padding: 27px 0 35px 40px;
  background-color: #fafafa;
  margin-bottom: 60px;
  display: flex;
  border-radius: 3px;
  &:before {
    content: '';
    width: 12px;
    height: 12px;
    border-top: 1px solid #fafafa;
    border-right: 1px solid #fafafa;
    transform: rotate(-45deg);
    top: -8px;
    left: 73px;
    position: absolute;
    background: #fafafa;
  }
  .info-tip {
    display: inline-block;
    .info-list {
      margin-top: 10px;
      span {
        display: block;
        &:first-child {
          border-top: 1px solid #ece8d6;
          padding-top: 8px;
        }
      }
    }
  }
  .left {
    margin-right: 199px;
    .title {
      color: $color-assist2;
      font-size: 13px;
      display: block;
    }
    .all {
      margin-bottom: 10px;
      .title {
        margin-bottom: 10px;
      }
      .calculating {
        font-size: 14px;
        display: block;
        margin-top: 5px;
      }
      .value {
        position: relative;
        color: #fac140;
        font-size: 40px;
        &:before {
          content: '';
          width: 9px;
          height: 9px;
          border-radius: 50%;
          transform: translateY(-50%);
          top: 50%;
          left: -17px;
          position: absolute;
          background: linear-gradient(to bottom, #ffbfbf, #ffe4e4);
        }
      }
    }
    .down {
      display: flex;
      align-items: baseline;
      .item {
        display: flex;
        margin-right: 30px;
        justify-content: center;
        .title {
          margin-right: 8px;
        }
        .value {
          color: $color-3;
          font-size: 14px;
          font-weight: 400;
        }
      }
      .locked-value {
        display: flex;
        align-items: center;
        color: #bbbbbb;
        .value {
          color: #bbbbbb;
          margin-right: 6px;
        }
        .unit {
          color: #bbbbbb;
        }
      }
    }
  }
  .right {
    .title {
      color: $color-9;
      font-size: 13px;
      margin-bottom: 24px;
    }
    .profit-chart {
      display: flex;
      height: 46px;
    }
    .items,
    .date {
      display: flex;
      align-items: flex-end;
      height: 100%;
    }
    .date {
      font-size: 12px;
      color: $color-3;
      &:first-child {
        margin-right: 10px;
      }
      &:last-child {
        margin-left: 10px;
      }
    }
    .item {
      position: relative;
      border-radius: 2px;
      flex: 1;
      width: 20px;
      background: linear-gradient(to bottom, #9fbdff, #d1e0ff);
      margin-left: 8px;
      &:first-child {
        margin-left: 0;
      }
      &.min,
      &.zero {
        border: 1px solid #ffd4d4;
        background: linear-gradient(to bottom, #ffabab, #ffd4d4);
      }
      &:hover {
        .tip-text {
          display: block;
        }
      }
      &.red {
        border: 1px solid #ee4343;
        &:hover {
          border: 1px solid #ee4343;
        }
      }
    }
    .tip {
      position: relative;
      display: inline-block;
    }
    .tip-text {
      z-index: 100;
      position: absolute;
      display: none;
      border: 1px solid #ffd200;
      box-shadow: 0 4px 7px 0 rgba(0, 0, 0, 0.08);
      padding: 13px;
      background: #fffdf4;
      min-width: 360px;
      border-radius: 4px;
      &:after {
        position: absolute;
        left: 43px;
        top: -6px;
        height: 10px;
        width: 10px;
        display: block;
        content: '';
        background: #fffdf4;
        border-top: 1px solid #ffd200;
        border-right: 1px solid #ffd200;
        transform: rotate(-45deg);
      }
      span {
        display: block;
        white-space: nowrap;
        &.title {
          color: $color-7;
          font-size: 12px;
          margin-bottom: 8px;
        }
        &.value {
          color: $color-3;
          font-size: 16px;
          span {
            color: $color-7;
            font-size: 12px;
            margin-left: -4px;
            display: inline-block;
          }
        }
      }
    }
    .items-tip {
      bottom: -85px;
      left: -40px;
      min-width: auto;
    }
    .profit-tip {
      top: 32px;
      right: -15px;
    }
  }
}
</style>
