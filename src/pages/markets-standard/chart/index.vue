<template>
  <div
    class='chart regular'
    :class="isFullScreen? 'full-screen-chart': ''"
  >
    <div
      class='fullscreen'
      @click='fullscreen'
    >
      <span></span>
    </div>
    <div class='tab fb '>
      <div
        :class='["item" ,index == 0 ? "current":""]'
        @click="index =0"
      >{{$t('m.exchange.candlesticks')}}</div>
      <div
        :class='["item" ,index == 1 ? "current":""]'
        @click="index =1"
      >{{$t('m.exchange.depth')}}</div>
    </div>
    <div
      class='tab time'
      v-show='index == 0'
    >
      <div
        :class='["item",kTabIndex ==0? "current":""]'
        @click='updateKTabIndex(0)'
      >{{$t('m.exchange.time')}}</div>
      <div :class='["fb","item" ,"minutes",kTabIndex ==1? "current":""]'>
        {{minute
        <=30?minute
        : ""
        }}{{$t( 'm.exchange.min'
        )}}
        <div
          class='menu fb'
        >
          <span
            class='menu-item'
            @click='period(1);kTabIndex=1'
          >1{{$t('m.exchange.min')}}</span>
          <span
            class='menu-item'
            @click='period(5);kTabIndex=1'
          >5{{$t('m.exchange.min')}}</span>
          <span
            class='menu-item'
            @click='period(15);kTabIndex=1'
          >15{{$t('m.exchange.min')}}</span>
          <span
            class='menu-item'
            @click='period(30);kTabIndex=1'
          >30{{$t('m.exchange.min')}}</span>
        </div>
      </div>
      <div :class='["fb","item" ,"hours",kTabIndex == 2? "current":""]'>
        {{minute
          <=12*
          60
          &&
          minute
          >30 && minute
            <1440
          ?
            minute /
          60: ""
        }}{{$t( 'm.exchange.hour'
        )}}
        <div
          class='menu '
        >
          <span
            class='menu-item'
            @click='period(1* 60);kTabIndex=2'
          >1{{$t('m.exchange.hour')}}</span>
          <span
            class='menu-item'
            @click='period(2* 60 );kTabIndex=2'
          >2{{$t('m.exchange.hour')}}</span>
          <span
            class='menu-item'
            @click='period(4* 60 );kTabIndex=2'
          >4{{$t('m.exchange.hour')}}</span>
          <span
            class='menu-item'
            @click='period(6* 60 );kTabIndex=2'
          >6{{$t('m.exchange.hour')}}</span>
          <span
            class='menu-item'
            @click='period(12* 60 );kTabIndex=2'
          >12{{$t('m.exchange.hour')}}</span>
        </div>
      </div>
      <div
        :class='["fb","item",kTabIndex ==3? "current":""]'
        @click='period(1440);kTabIndex=3'
      >{{$t('m.exchange.day')}}</div>
      <div
        :class='["fb","item",kTabIndex ==4? "current":""]'
        @click='period(10080);kTabIndex=4'
      >{{$t('m.exchange.week')}}</div>
    </div>
    <stock
      v-show='index == 0'
      :period='minute'
      :is-show-close-line='isShowCloseLine'
      :isFullScreen='isFullScreen'
    ></stock>
    <depth
      v-if='index == 1'
      :isFullScreen='isFullScreen'
    ></depth>
  </div>
</template>
<script>
// 交易页中间图标数据容器
import stock from './echart-k'
import depth from './echart-depth'
let getPeriodHistory = function() {
  let p = parseInt(localStorage.getItem('k-period'))
  if (p >= 1) {
    return p
  } else {
    return 1
  }
}
let getKTabIndex = function() {
  let i = parseInt(localStorage.getItem('k-kTabIndex'))
  return i >= 0 ? i : 1
}
export default {
  components: {
    stock,
    depth,
  },
  data() {
    let minute = getPeriodHistory()
    let kTabIndex = 1
    if (minute <= 30) {
      kTabIndex = 1
    } else if (minute <= 12 * 60) {
      kTabIndex = 2
    } else if (minute == 1440) {
      kTabIndex = 3
    } else if (minute == 10080) {
      kTabIndex = 4
    }
    if (getKTabIndex() == 0) {
      // 如果是分时
      kTabIndex = 0
      minute = 1
    }
    return {
      isFullScreen: false,
      kTabIndex,
      index: 0,
      minute,
      isShowCloseLine: getKTabIndex() == 0,
    }
  },
  watch: {
    kTabIndex() {
      this.isShowCloseLine = this.kTabIndex == 0
      if (this.isShowCloseLine) {
        this.minute = 1
      }
      this.setPeriodHistory()
    },
    minute() {
      this.setPeriodHistory()
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.period(this.minute)
    })
  },
  methods: {
    fullscreen() {
      this.isFullScreen = !this.isFullScreen
      this.$nextTick(() => {
        if (this.isFullScreen) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = 'auto'
        }
      })
    },
    updateKTabIndex(n) {
      this.kTabIndex = n
    },
    period(n) {
      this.minute = n
    },
    setPeriodHistory() {
      this.$nextTick(() => {
        localStorage.setItem('k-period', this.minute)
        localStorage.setItem('k-kTabIndex', this.kTabIndex)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.chart {
  position: relative;
  background: #ffffff;

  &.full-screen-chart {
    position: fixed;
    z-index: 999999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
  }
  .fullscreen {
    span {
      background-color: #ffffff;
      width: 13px;
      height: 12px;
      position: absolute;
      left: 2px;
      top: 2px;
    }

    cursor: pointer;
    background-color: $color-gray;
    width: 17px;
    height: 16px;
    position: absolute;
    top: 16px;
    right: 17px;
    z-index: auto;
  }
  .fullscreen:after {
    content: '';
    background-color: rgb(255, 255, 255);
    height: 100%;
    width: 5px;
    z-index: 10;
    position: absolute;
    margin-left: 50%;
    left: -3px;
  }
  .fullscreen:before {
    content: '';
    background-color: rgb(255, 255, 255);
    width: 100%;
    height: 6px;
    position: absolute;
    z-index: 11;
    margin-top: 50%;
    top: -4px;
  }
  .tab {
    font-size: 13px;
    margin-bottom: 2px;
    user-select: none;
    padding: 14px 40px 0 20px;
    justify-content: flex-end;
    display: flex;
    .item {
      color: $color-gray;
      border-radius: 2px;
      border: 1px solid $color-gray;
      // float: left;
      display: inline;
      margin-right: 15px;
      padding-left: 5px;
      padding-right: 5px;
      cursor: pointer;
    }
    .item.current {
      border-color: $color-0;
      color: $color-0;
      cursor: default;
    }
  }
  .tab.time {
    margin-top: 12px;
    font-size: 12px;
    padding-left: 20px;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    padding-top: 5px;
    .item {
      border: none;
      &:hover {
        .menu {
          display: block;
        }
      }
      .menu {
        position: absolute;
        display: none;
        top: 17px;
        left: -6px;
        right: -6px;
        z-index: 2;
        box-shadow: rgba(0, 0, 0, 0.05) 0 10px 10px;
        background-color: rgb(255, 255, 255);
        box-sizing: content-box;
        text-align: center;
        min-width: 60px;
        padding: 0 5px;
        .menu-item {
          box-sizing: content-box;
          color: $color-gray;
          display: block;
          padding: 4px 5px;
          text-align: center;
          border-radius: 3px;
          min-width: 30px;
          &:hover {
            background-color: #ffd200;
            color: $color-text;
          }
        }
      }
    }
    .minutes,
    .hours {
      position: relative;
    }
  }
}
</style>
