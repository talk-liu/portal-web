<template>
  <div class="funds-profit">
    <div class='at'>
      <a :href='mineRuleUrl' class="rule">{{$t("m.home.mineRule")}}</a>
      <div class="top">
        <p class="title">
          <span>{{$t("m.funds.fundsMenu.program")}}</span>
        </p>
        <p class="atpeivlege" v-if="!isEmptyData(at_vip_grade)">
          {{getlangMessage(at_vip_grade)}}</p>
        <p v-else class="num">--</p>
        <div class="line"></div>
      </div>
      <div class="bottom">
        <div class="item">
          <p>
            {{$t("m.funds.profit.totalDelivered")}}
          </p>
          <p v-if='totalDelivered'>{{totalDelivered}}
            <span>AT</span>
          </p>
          <p v-else>- -</p>
        </div>
        <div class="item">
          <p class="title">
            <span>{{$t("m.funds.profit.eligibleRewards")}}</span>
          </p>
          <p class="num " v-if="finished_cache">{{minProfitItem.profit}}
            <span>AT</span>
          </p>
          <p class="calculating" v-else>
            {{$t('m.funds.profit.calculating')}}<span class="dotting-animation"></span>
          </p>
        </div>
      </div>
    </div>
    <div class="locked-value" v-if='locked_at_amount'>
      <p @click.stop="showLocked">
        <i class="iconfont icon-locked"></i>
        <span>{{$t("m.funds.profit.locked")}}</span>
      </p>
      <p>
        {{locked_at_amount}}
        <span>AT</span>
      </p>
    </div>
    <ul class="valuation" >
      <li v-if='totalProfitBtc() > 0'>
        <div class="label">
          {{$t("m.funds.profit.totalRewards")}}
        </div>
        <div class="num ">
          {{totalProfit()}}
        </div>
      </li>
      <li v-if='last_at_income'>
        <div class="label">
          {{$t("m.funds.profit.latestedReward")}}
        </div>
        <div class="num ">
          {{last_at_income}} AT
        </div>
      </li>
      <li>
        <div class="label">
          {{$t("m.funds.profit.yesterdayRewards")}}
        </div>
        <div class="num ">
          <span v-if='calculated'>
            {{yesterdayProfit()}}
          </span>
          <span v-else class="calculating">
            {{$t('m.funds.profit.calculating')}}
            <span class="dotting-animation"></span>
          </span>
        </div>
      </li>
      <li>
        <div class="label">
          {{$t("m.funds.profit.currentRewards")}}
        </div>
        <div class="num ">
          {{currentProfit()}}
        </div>
      </li>
    </ul>
    <div class="profit" v-if='total_at_amount > 0'>
      <div class="title">{{$t("m.funds.profit.rewardsProportion")}}</div>
      <ul>
        <li v-for='(item,key) in getCurrencyData()' :key="key">
          <div class="percent ">{{item.percent.toFixed(0)}}%</div>
          <div class="detail">
            <p>{{item.currency | upperCase}}</p>
            <p>
              <span>{{item.amount}}</span>/{{item.money}}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <profitHistoryMobile/>
    <v-dialog :visible="show" class="dialog">
      <div class="locked-content">
        <div class="locked-list">
          <div class="label">{{$t("m.funds.profit.defrozenLabel")}}</div>
          <div class="item" v-for='(item,key) in locked_at_list' :key='key'>
            <i class="iconfont icon-locked"></i>
            <span>
              {{$t("m.funds.profit.defrozenTip1", { amount: item.amount, time: formatYmd(item.unfreeze_at) })}}
            </span>
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>
<script>
import myProfit from '@/mixins/my-profit'
import profitHistoryMobile from './profit-history-mobile'
import VDialog from '@/components/dialog'
export default {
  mixins: [myProfit],
  components: {
    VDialog,
    profitHistoryMobile
  },
  data() {
    return {
      show: false,
      mineRuleUrl:
        this.$fifth.lang === 'zh-CN'
          ? 'https://help.riostox.com/hc/zh-cn/articles/360006572332-%E5%85%B3%E4%BA%8ERiostox-Token%E6%8C%96%E7%9F%BF'
          : 'https://help.riostox.com/hc/en-us/articles/360006572332-Riostox-Token-Issuance',
    }
  },
  mounted() {
    document.addEventListener('click', () => {
      this.show = false
    })
  },
  methods: {
    showLocked() {
      this.show = true
    },
    // 判断字符是否为空的方法
    isEmptyData(obj) {
      if (typeof obj == 'undefined' || obj == null || obj == '') {
        return true
      } else {
        return false
      }
    },
  }
}
</script>
<style lang="scss" scoped>
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
  padding: 0 20px;
  .no-at {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #ffffff;
    border-radius: 8px;
    width: 100%;
    height: 110px;
    border: 1px solid #eaeaed;
    margin: 0 auto;
    padding: 4px 2px;
    box-shadow: 0 5px 4px rgba(0, 0, 0, 0.03);
    img {
      width: 100%;
    }
  }
  .at {
    background: #f9f9fb;
    border: 1px solid #eaeaed;
    width: 100%;
    margin: 0 auto;
    border-radius: 8px;
    padding-bottom: 15px;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.03);
    position: relative;
    .line {
      width: 100%;
      height: 1px;
      background: #eaeaed;
      margin: 15px 0 0;
      transform: scaleY(0.5);
    }
    .rule {
      position: absolute;
      right: 15px;
      top: 14px;
      color: #97a5b3;
      font-size: 12px;
    }

    .top {
      padding: 15px 20px 0;
      .title {
        span {
          color: $color-assist1;
          font-size: 14px;
        }
        a {
          color: $color-assist3;
          font-size: 12px;
        }
      }
      .calculating {
        margin-top: 5px;
      }
      .atpeivlege {
        color: #fac140;
        font-size: 24px;
        margin-top: 5px;
      }
      .num {
        color: #111111;
        font-size: 24px;
        margin-top: 5px;
        span {
          vertical-align: middle;
          font-size: 14px;
        }
      }
      .value {
        color: $color-assist2;
        font-size: 16px;
      }
    }
    .bottom {
      padding: 15px 20px 0;
      display: flex;
      .item {
        flex: 1;
        p {
          &:first-child {
            color: $color-assist1;
            font-size: 14px;
            &.locked {
              color: #e06f0d;
            }
          }
          &:last-child {
            color: #111111;
            font-size: 15px;
            margin-top: 5px;
            span {
              font-size: 12px;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
  .locked-value {
    display: flex;
    width: 100%;
    margin: 9px auto 0;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #eaeaed;
    p {
      flex: 1;
      &:first-child {
        color: #e06f0d;
        font-size: 14px;
      }
      &:last-child {
        color: #111111;
        font-size: 15px;
        text-align: right;
      }
    }
  }
  .valuation {
    width: 100%;
    margin: 10px auto 0;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      border-bottom: 1px solid #e6e6e6;
      color: #111111;
      .label {
        font-size: 14px;
      }
      .num {
        font-size: 17px;
        .calculating {
          font-size: 15px;
          display: block;
          width: 95px;
        }
      }

      &:first-child {
        display: block;
        padding: 20px 0;
        height: 85px;
        .label {
          font-size: 15px;
        }
        .num {
          margin-top: 5px;
          font-size: 24px;
        }
      }
    }
  }

  .profit {
    width: 100%;
    margin: 0 auto 15px;
    .title {
      color: #111111;
      font-size: 15px;
      border-bottom: 1px solid #eaeaed;
      margin-top: 30px;
      padding-bottom: 15px;
    }
    ul {
      li {
        display: flex;
        border-bottom: 1px solid #eaeaed;
        height: 60px;
        align-items: center;
        .percent {
          width: 35px;
          height: 35px;
          border: 1px solid #ee4343;
          color: #ee4343;
          font-size: 12px;
          text-align: center;
          line-height: 35px;
          border-radius: 50%;
          margin-right: 20px;
        }
        .detail {
          p {
            &:first-child {
              color: #111111;
              font-size: 15px;
            }
            &:last-child {
              color: #ababac;
              font-size: 14px;
              span {
                color: #111111;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
}

.dialog {
  display: flex;
  justify-content: center;
  align-items: center;
}

.locked-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 145px;
  max-height: 290px;
  overflow: scroll;
  border-radius: 12px;
  background: #ffffff;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.locked-list {
  width: 270px;
  padding: 22px 22px 0;
  color: #030303;
  font-size: 15px;
  .label {
    font-size: 16px;
    color: #030303;
    font-weight: bold;
  }
  .item {
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid #e6e6e6;
    text-align: left;
    i {
      color: #e06f0d;
      margin-right: 20px;
      vertical-align: middle;
    }
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
