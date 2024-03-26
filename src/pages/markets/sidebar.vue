<template>
  <div :class="['sidebar-wrap', type!=='h5'?'sticky-sidebar-wrap':'']">
    <div class="market-change-wrap" v-if="type !== 'h5'">
      <div class="name">
        <span class="max-name">{{name[0]}}</span>
        <span>/ {{name[1]}}</span>
      </div>
      <v-drop-down class="market-change">
        <div slot="content" class="market-change-box">
          <a href="javascript:;" class="change-wrap">
            <i class="iconfont icon-xiala change"></i>
          </a>
        </div>
        <market-change slot="list"/>
      </v-drop-down>
    </div>
    <div :class="['scrollStyle','side',type==='h5'?'mobile-side':'']">
      <market-info class="wrap mb4"></market-info>
      <order-form class="wrap order-form mb4"></order-form>
      <div class="balance wrap" v-if="isLogin">
        <div class="title">
          {{$t('m.exchange.myFunds')}}
          <a
            class="more"
            href="/funds"
            target="_blank"
          >{{$t('m.exchange.more')}}</a>
        </div>
        <balance></balance>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VDropDown from '@/components/dropdown'
import MarketInfo from './market-info'
import OrderForm from './order-form'
import Balance from './balance.vue'
import MarketChange from './market-info/market-change'

export default {
  components: {
    MarketInfo,
    OrderForm,
    Balance,
    VDropDown,
    MarketChange,
  },
  computed: {
    ...mapGetters('tickers', ['currentTicker']),
    ...mapGetters('currentUser', ['isLogin']),
    ...mapGetters('viewport', ['type']),
    name() {
      return this.currentTicker.name ? this.currentTicker.name.split('/') : []
    },
  },
}
</script>

<style lang="scss">
.market-change.v-drop-down {
  .market-change-box {
    overflow: hidden;
  }
  .drop-list {
    padding: 0;
    left: -20px;
    top: 47px;
    min-width: auto;
    max-height: none;
    box-shadow: rgba(0, 0, 0, 0.15) 0 3px 6px;
  }
}
</style>

<style lang="scss" scoped>
.sidebar-wrap {
  position: relative;

  @include themify($themes) {
    background-color: themed('bgColor');
  }
  .market-change-wrap {
    position: absolute;
    right: 0;
    top: 0;
    z-index: $zindex-sticky;
    cursor: pointer;
    height: 48px;
    width: 300px;

    @include themify($themes) {
      background-color: themed('bgColor');
    }
    .name {
      position: absolute;
      bottom: 0;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      font-weight: 500;
      font-family: euBold;
      .max-name {
        margin-left: 10px;
        font-size: 20px;
        line-height: 27px;
      }
    }
    .change-wrap {
      display: flex;
      height: 36px;
      align-items: center;
      justify-content: flex-end;
      border-width: 1px;
      border-style: solid;
      margin-right: 20px;
      border-radius: 3px;
      margin-top: 10px;

      @include themify($themes) {
        border-color: themed('textColor9');
      }
      .change {
        font-size: 30px;

        @include themify($themes) {
          color: themed('textColor3');
        }
      }
    }
  }
  .side {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .mobile-side {
    padding-bottom: 50px;
  }
}

.sticky-sidebar-wrap {
  padding-top: 50px;
}

.title {
  height: 45px;
  line-height: 45px;
  margin: 0 20px;
  font-size: 14px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  overflow: hidden;
  font-weight: 500;
  font-family: euBold;

  @include themify($themes) {
    border-color: themed('lineBorderColorF5');
    color: themed('textColor3');
  }
  .more {
    float: right;
    color: #4c84ff;
    font-size: 13px;
    font-family: dinRegular;
    font-weight: 300;
  }
}

.balance {
  display: flex;
  flex-direction: column;
  height: 220px;
  min-height: 220px;
}

.wrap {
  @include themify($themes) {
    background-color: themed('wrapBgColor');
  }
}

.mb4 {
  margin-bottom: 4px;
}

.theme-dark {
  .wrap {
    background-color: #141414;
  }
  .sidebar-wrap {
    .market-change-wrap {
      .name {
        background-color: #141414;
        color: #fdaa02;
      }
    }
  }
}
</style>
