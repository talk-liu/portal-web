<template>
  <div class='button-wrap'>
    <button @click='exchangeTalk' :class='{isClose : !otcExchange}'>
      <div v-if='otcExchange' :style='textStyle' class='text'>立即购买</div>
      <div :style='textStyle' class='text' v-else>
        已打烊
      </div>
    </button>
    <div :style='rateStyle' class='rate'>USDT {{usdtRate}} CNY</div>
  </div>
</template>

<script>
import otcConfig from '@/mixins/otc-config'
export default {
  props: ['rateStyle', 'textStyle'],
  mixins: [otcConfig]
}
</script>

<style lang='scss'>
.button-wrap {
  text-align: center;
  .rate {
    height: 21px;
    line-height: 21px;
    margin-top: 10px;
    color: #ffffff;
    font-size: 14px;
  }
  button {
    height: 22px;
    padding: 0 10px;
    font-size: 14px !important;
    border-radius: 4px;
    color: #4b58ec;
    background: #ffffff;
    border: none;
    cursor: pointer;
    display: inline-block;
  }
  button:hover {
    background: #ffd200;
    color: #000000;
  }
  button:active {
    background: #ffd200;
    color: #000000;
  }
  button.isClose {
    background: #323fa2;
    color: #ffffff;
    cursor: auto;
  }
}

@include screen-h5-new() {
  .button-wrap {
    button {
      width: 200px;
      height: 32px;
    }
    .rate {
      font-size: 12px;
    }
  }
}
</style>
