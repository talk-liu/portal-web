<template>
  <div class='block-mined-wrap'>
    <div class='flex jcsb aic slideInUp'>
      <div class='price th-num-bold'>
        <!-- <span class='unit'>{{unit}}</span> -->
        <span class='integer'>{{allPrice.integer | thousands}}</span>
        <span class='decimal'>.{{allPrice.decimal}}</span>
        <span class='decimal'>&nbsp;USDT</span>
      </div>
      <div class='time'>
        {{formatCavasTime}}
      </div>
    </div>
    <div class='flex jcsb aic margin-diy slideInUp'>
      <div class='average-AT-price fb'>
        <!-- {{$t('m.home.atAvg')}}<span class='unit'>{{unit}}</span> -->
        <span class='value'>{{averagePriceOfAT}}</span>
      </div>
      <div class='at-block-wrap'>{{$t('m.home.loadat',{mining:'43,750'})}}</div>
    </div>
    <div class='block' :style="{height:animateHeight || 0}">

    </div>
  </div>
</template>

<script>
import mixin from '../mixins/mining-block-mixin'

export default {
  mixins: [mixin]
}
</script>

<style lang='scss' scoped>
  $color-price-red:#ee4343;
  $color-price-decimal:#ad3139;

  .block-mined-wrap {
    width: 100%;
    .margin-diy {
      margin-top: 8px;
      margin-bottom: 10px;
    }
    .price {
      .integer {
        margin-right: -3px;
        color: $color-price-red;
        font-size: 15px;
      }
      .decimal {
        // margin-left: -3px;
        font-size: 12px;
        color: $color-price-decimal;
      }
    }
    .time {
      color: #a19aa8;
      font-size: 12px;
    }
    .average-AT-price {
      color: $color-255;
      font-size: 12px;
    }
    .at-block-wrap {
      color: $color-255;
      font-size: 12px;
      font-weight: 200;
    }
    .block {
      background: linear-gradient(to bottom, rgba(68, 64, 76, 0.9), rgba(110, 108, 113, 0.9));
      height: 0;
      transition: all 0.9s cubic-bezier(0.15, 0.54, 0.6, 0.98);
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
</style>
