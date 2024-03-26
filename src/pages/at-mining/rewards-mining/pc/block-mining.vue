<template>
  <div class='block-mining-wrap'>
    <div class='flex jcsb aic slideInUp'>
      <div class='price th-num-bold'>
        <!-- <span class='unit'>{{unit}}</span> -->
        <span class='integer' :id="getId(1)">{{allPrice.integer}}</span>
        <span class='decimal point'>.</span>
        <span class='decimal' :id="getId(2)">{{allPrice.decimal}}</span>
        <span class='decimal'>&nbsp;USDT</span>
      </div>
      <div class='time'>
        {{formatCavasTime}}
      </div>
    </div>
    <div class='flex jcsb aic margin-diy slideInUp'>
      <div class='rest-time fb'>{{restTimes}}</div>
      <div class='at-block-wrap'>{{$t('m.home.loadat',{mining:'43,750'})}}</div>
    </div>
    <div class='block' :style="{height:animateHeight || 0}">
      <div class="block-animate-wrap">
        <div class='block-animate'></div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '../mixins/mining-block-mixin'
export default {
  mixins: [mixin],
  mounted() {
    setInterval(() => {
      this.countUpInteger.update(this.allPrice.integer)
      this.countUpDecimal.update(this.allPrice.decimal)
    }, 1000)
  }
}
</script>

<style lang='scss' scoped>
  $color-price-red:#ee4343;
  $color-price-decimal:#ad3139;

  .block-mining-wrap {
    width: 100%;
    .margin-diy {
      margin-top: 8px;
      margin-bottom: 10px;
    }
    .price {
      .integer {
        color: $color-price-red;
        font-size: 15px;
      }
      .decimal {
        font-size: 12px;
        color: $color-price-decimal;
      }
      .point {
        margin-left: -3px;
        margin-right: -3px;
      }
    }
    .time {
      color: #a19aa8;
      font-size: 12px;
    }
    .rest-time {
      color: $color-255;
      font-size: 12px;
    }
    .at-block-wrap {
      color: $color-255;
      font-size: 12px;
      font-weight: 300;
    }
    .block {
      background: #ffd200;
      height: 0;
      transition: 0.9s;
      overflow: hidden;
      .block-animate-wrap {
        background: #ffa701;
        height: 15px;
        width: 100%;
      }
      .block-animate {
        height: 15px;
        width: 100px;
        animation: leftRight 2.5s infinite cubic-bezier(0.05, 0.06, 0.48, 0.53);
      }

      @keyframes leftRight {
        0% {
          transform: translate3d(-100%, 0, 0);
          background: linear-gradient(to right, #ffa701, #ff3000);
          visibility: visible;
          opacity: 0.4;
        }
        100% {
          transform: translate3d(200%, 0, 0);
          background: linear-gradient(to right, #ffa701, #ff3000);
          opacity: 1;
        }
      }
    }
  }

  @keyframes slideInUp {
    0% {
      transform: translate3d(0, 50%, 0);
      opacity: 0;
      visibility: visible;
    }
    31% {
      transform: translate3d(0, 50%, 0);
      opacity: 0;
      visibility: visible;
    }
    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  .slideInUp {
    animation: slideInUp 1.1s cubic-bezier(0.15, 0.54, 0.6, 0.98);
  }

  #animate-num2 {
    width: 13px;
    display: inline-block;
  }
</style>