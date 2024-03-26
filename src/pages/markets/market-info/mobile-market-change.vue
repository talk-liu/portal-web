<template>
  <div v-if="visible" class="mobile-market-change-mask">
    <div class="mobile-market-list-wrap">
      <div class="market-name" @click="()=>{this.$emit('close')}">
        <span class="max-name">{{name}}</span>
        <i class="iconfont icon-xiala1 change"></i>
      </div>
      <div class="search">
        <input type="text" :placeholder="$t('m.search')" v-model="search">
        <i class="iconfont icon-search"></i>
      </div>
      <div class="list-wrap">
        <div class="u-tabs tabs market-change-tab" v-if="!search">
          <div
            v-for="tab in tabs"
            :key="tab.key"
            :class="['u-tab-button', {current: curTab === tab.key}]"
            @click="tabChange(tab)"
            @mouseenter="tabChange(tab)"
          >{{tab.name}}</div>
        </div>
        <div class="list">
          <div class="head">
            <span class="max-name">{{$t('m.exchange.pair')}}</span>
            <span class="max">{{$t('m.exchange.newPrice')}}</span>
            <span>24h {{$t('m.exchange.change')}}</span>
          </div>
          <div class="body scrollStyle">
            <market-change-area
              :listData="listData"
              :type="minFee"
              :clearStatus="clearStatus"
              v-if="!isLogin || (isLogin && !isMiner)"
            />
            <market-change-area
              :listData="listData"
              :type="maxFee"
              :clearStatus="clearStatus"
              v-if="!isLogin  || (isLogin && !isMiner)"
            />
            <market-change-area
              :listData="listData"
              type="mining"
              :clearStatus="clearStatus"
              v-if="isMiner"
            />
            <market-change-area
              :listData="listData"
              type="normal"
              :clearStatus="clearStatus"
              v-if="isMiner"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Favorite from '@/components/favorite'
import totalMoeny from '@/mixins/total-money'
import MarketChangeArea from './market-change-area'

export default {
  mixins: [totalMoeny],
  props: {
    visible: { type: Boolean, default: false },
    name: { type: String, default: '' },
  },
  components: {
    Favorite,
    MarketChangeArea,
  },
  data() {
    return {
      curTab: 'favorite',
      tabs: [
        {
          name: this.$t('m.exchange.marked'),
          key: 'favorite',
        },
        {
          name: 'USDT',
          key: 'usdt',
        },
        {
          name: 'USD',
          key: 'usd',
        },
      ],
      search: '',
    }
  },
  computed: {
    ...mapGetters('tickers', ['filterList', 'maxFee', 'minFee']),
    ...mapGetters('vouchers', ['allVouchers']),
    ...mapState('viewport', ['height', 'headerHeight']),
    ...mapGetters('currentUser', ['isLogin', 'isMiner']),
    listData() {
      // 当存在搜索条件是展示搜索结果
      if (this.search) {
        return this.filterList('all', this.search)
      }
      // 获取对应交易对数据
      return this.filterList(this.curTab)
    },
  },
  methods: {
    // 切换tab时清空搜索条件
    tabChange(tab) {
      this.search = ''
      this.curTab = tab.key
    },
    // 切换交易对搜索状态
    clearStatus() {
      this.search = ''
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.mobile-market-change-mask {
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: $zindex-modal-mask;
}

.mobile-market-list-wrap {
  height: 100%;
  width: 100%;
  padding: 0 20px 20px;
  background-color: #ffffff;
  .market-name {
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-weight: 500;
    font-family: euBold;
    flex: 1;

    @include themify($themes) {
      color: themed('textColor3');
    }
  }
  .search {
    position: relative;
    height: 30px;
    input {
      height: 30px;
      line-height: 30px;
      width: 100%;
      outline: none;
      border: 1px solid #dfdfdf;
      border-radius: 13px;
      font-size: 13px;
      padding-left: 30px;
      color: #c1c1c1;
    }
    i {
      position: absolute;
      top: 10px;
      left: 11px;
      font-size: 13px;
      color: #c1c1c1;
    }
  }
  .list-wrap {
    height: calc(100% - 70px);
    .market-change-tab {
      border-bottom-width: 1px;
      border-bottom-style: solid;
      margin: 0;
      padding-left: 10px;

      @include themify($themes) {
        border-color: themed('lineBorderColorF5');
      }
      .u-tab-button {
        height: 52px;
        line-height: 52px;
        font-family: euBold;
        &.current:after {
          width: 100%;
          left: 0;
          margin: 0;
          bottom: 20%;
        }
      }
    }
    .list {
      height: calc(100% - 52px);
      margin-top: 7px;
      .max {
        min-width: 145px;
      }
      .max-name {
        min-width: 115px;
      }
      .head {
        font-size: 12px;
        display: flex;
        height: 27px;
        line-height: 27px;
        padding: 0 10px;
        span {
          flex: 1;
          &:last-child {
            text-align: right;
          }
        }

        @include themify($themes) {
          color: themed('textColor9');
        }
      }
      .body {
        height: calc(100% - 34px);
        .item {
          display: flex;
          height: 27px;
          line-height: 27px;
          font-size: 12px;
          padding: 0 10px;

          @include themify($themes) {
            color: themed('textColor3');
          }
          &:hover {
            background-color: #f3f3f3;
            border-radius: 2px;
          }
          span {
            flex: 1;
            &:last-child {
              text-align: right;
            }
          }
          .name-wrap {
            height: 27px;
            line-height: 27px;
            display: block;
            font-size: 12px;
            .favorite {
              float: left;
              margin-left: -5px;
            }
            .name {
              display: block;
              float: left;
              font-size: 13px;
              font-family: euBold;
            }
            .vouchers {
              display: flex;
              align-items: center;
              padding-left: 4px;
              .icon {
                display: block;
                height: 12px;
              }
              .rate {
                font-size: 12px;
                max-width: 34px;
                font-family: dinMedium;

                @include themify($themes) {
                  color: themed('buyColor');
                }
              }
              i {
                display: block;
                font-size: 12px;
                margin-left: -3px;

                @include themify($themes) {
                  color: themed('buyColor');
                }
              }
            }
          }
          .last,
          .percent {
            font-family: dinMedium;
          }
          .price {
            font-size: 13px;

            @include themify($themes) {
              color: themed('textColor9');
            }
          }
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
      }
    }
  }
}

.theme-dark {
  .mobile-market-list-wrap {
    background-color: #141414;
    .search {
      input {
        border-color: rgba($color: #ffffff, $alpha: 0.2);
        background-color: #141414;
        color: rgba($color: #ffffff, $alpha: 0.45);
      }
      i {
        color: rgba($color: #ffffff, $alpha: 0.45);
      }
    }
    .list-wrap {
      .list {
        .head {
          color: rgba($color: #ffffff, $alpha: 0.45);
        }
        .body {
          .item {
            &:hover {
              background-color: rgba($color: #ffffff, $alpha: 0.08);
            }
          }
        }
      }
    }
  }
}
</style>

