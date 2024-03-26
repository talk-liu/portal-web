<template>
  <div class="market-info-wrap">
    <div class="mobile-market-title" v-if="type === 'h5'">
      <div class="name" @click="visible = true">
        <span class="max-name">{{currentTicker.name}}</span>
        <i class="iconfont icon-xiala1 change"></i>
      </div>
      <div class="theme-change">
        <i
          class="iconfont icon-qiansebanicon light"
          :class="theme==='light'?'active':''"
          @click="changeTheme({theme:'light', save:true})"
        ></i>
        <i
          class="iconfont icon-shensebanicon dark"
          :class="theme==='dark'?'active':''"
          @click="changeTheme({theme:'dark', save:true})"
        ></i>
      </div>
    </div>
    <div class="info-wrap">
      <div class="name-wrap">
        <div
          class="icon"
          :style="{backgroundImage: currentTicker.base_unit ? `url(https://i.riostox.com/img/currency/${currentTicker.base_unit}.png)` : ''}"
        ></div>
        <div class="name">
          {{currentTicker.base_unit | upperCase}}
          <span>{{currentTicker.coin_info.readable_name}}</span>
        </div>
      </div>
      <div class="info">
        <div class="last space" @click="setPrice(currentTicker.last)">
          <div class="desc">{{$t('m.exchange.lastPrice')}}</div>
          <div class="val">
            {{currentTicker.last}} {{currentTicker.quote_unit | upperCase}}
            <span>≈ {{lastLegal(currentTicker, 4)}}</span>
          </div>
        </div>
        <div class="day">
          <div class="change space">
            <div class="desc">24h {{$t('m.exchange.high')}}</div>
            <div
              class="val"
            >{{currentTicker.high | thousands}} {{currentTicker.quote_unit | upperCase}}</div>
          </div>
          <div class="volume space">
            <div class="desc">24h {{$t('m.exchange.low')}}</div>
            <div
              class="val"
            >{{currentTicker.low | thousands}} {{currentTicker.quote_unit | upperCase}}</div>
          </div>
        </div>
        <div class="day">
          <div class="change space">
            <div class="desc">24h {{$t('m.exchange.change')}}</div>
            <div :class="['val', currentTicker.is_up ? 'up' : 'down']">
              {{currentTicker.percent}}
              <trend-up v-if="currentTicker.is_up"></trend-up>
              <trend-down v-else></trend-down>
            </div>
          </div>
          <div class="volume space">
            <div class="desc">24h {{$t('m.exchange.volume')}}</div>
            <div
              class="val"
            >{{currentTicker.funds | thousands}} {{currentTicker.quote_unit | upperCase}}</div>
          </div>
        </div>
      </div>
    </div>
    <vouchers/>
    <mobile-market-change :visible="visible" @close="visible = false" :name="currentTicker.name"/>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

import TrendUp from '@/layouts/trend-up-icon'
import TrendDown from '@/layouts/trend-down-icon'
import Vouchers from './vouchers'
import MobileMarketChange from './mobile-market-change'

import totalMoeny from '@/mixins/total-money'

export default {
  mixins: [totalMoeny],
  components: {
    TrendUp,
    TrendDown,
    Vouchers,
    MobileMarketChange,
  },
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    ...mapGetters('tickers', ['currentTicker']),
    ...mapGetters('viewport', ['type']),
    ...mapState('viewport', ['theme']),
  },
  methods: {
    ...mapMutations('orderForm', ['setPrice']),
    ...mapMutations('viewport', ['changeTheme']),
  },
}
</script>

<style lang="scss" scoped>
.market-info-wrap {
  .mobile-market-title {
    height: 40px;
    display: flex;
    border-bottom-width: 1px;
    border-bottom-style: solid;

    @include themify($themes) {
      color: themed('textColor3');
      border-color: themed('lineBorderColorF5');
    }
    .name {
      height: 40px;
      line-height: 40px;
      margin: 0 20px;
      font-size: 18px;
      font-weight: 500;
      font-family: euBold;
      flex: 1;
    }
    .theme-change {
      width: 95px;
      display: flex;
      align-items: center;
      margin-right: 20px;
      .dark,
      .light {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        height: 28px;
        width: 47px;
        font-size: 20px;
        border: 1px solid #dedede;
      }
      .light {
        border-radius: 3px 0 0 3px;
        color: #999999;
      }
      .dark {
        font-size: 18px;
        border-left: none;
        border-radius: 0 3px 3px 0;
        color: #333333;
      }
      .active {
        &.light {
          background-color: #f4f4f4;
        }
        &.dark {
          background-color: #292929;
          color: #626262;
        }
      }
    }
  }
  .info-wrap {
    padding: 14px 20px;
    .name-wrap {
      display: flex;
      .icon {
        height: 24px;
        width: 24px;
        margin-right: 10px;
        background-size: 100% 100%;
      }
      .name {
        height: 24px;
        line-height: 24px;
        font-size: 16px;
        font-family: euBold;

        @include themify($themes) {
          color: themed('textColor3');
        }
        span {
          font-size: 12px;
          display: inline-block;
          margin-left: 10px;
          font-family: euRegular;

          @include themify($themes) {
            color: themed('textColor9');
          }
        }
      }
    }
    .space {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .info {
      flex: 1;
      .last,
      .day {
        height: 38px;
        margin-top: 14px;
        .desc {
          font-size: 12px;

          @include themify($themes) {
            color: themed('textColor9');
          }
        }
        .val {
          font-size: 15px;

          @include themify($themes) {
            color: themed('textColor3');
          }
        }
      }
      .last {
        cursor: pointer;
        .val {
          font-size: 15px;
          font-family: dinMedium;

          @include themify($themes) {
            color: themed('textColor3');
          }
          span {
            font-size: 12px;
            font-family: dinRegular;

            @include themify($themes) {
              color: themed('textColor6');
            }
          }
        }
      }
      .day {
        display: flex;
        .val {
          font-family: dinMedium;
          border-right-width: 1px;
          border-right-style: solid;

          @include themify($themes) {
            border-color: themed('lineBorderColorD8');
          }
        }
        .change {
          width: 120px;
          .up {
            @include themify($themes) {
              color: themed('buyColor');
            }
          }
          .down {
            @include themify($themes) {
              color: themed('sellColor');
            }
          }
        }
        .volume {
          flex: 1;
          padding-left: 15px;
          .val {
            border: none;
          }
        }
      }
    }
  }
}

.theme-dark {
  .market-info-wrap {
    .mobile-market-title {
      .theme-change {
        .dark,
        .light {
          border-color: #626262;
        }
        .light {
          background-color: #141414;
          color: #b8b8b8;
        }
      }
    }
  }
}
</style>

