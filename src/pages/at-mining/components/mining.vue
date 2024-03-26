<template>
  <div class="plateform-info_wrap">
    <platform-item :title="$t('m.atMing.platformActive')" :ptSource='ptSource' />
    <seven-table :title="$t('m.atMing.sevenMing')" :dataSource='dataSource' :dateList='dateList' />
    <line-chart/>
  </div>
</template>

<script>

import sevenTable from './seven-table'
import platformItem from './platform-item'
import lineChart from './line-chart-mining'
import mixin from '../mixins/mining-mixin'
export default {
  components: {
    sevenTable,
    platformItem,
    lineChart
  },
  mixins:[mixin]
}
</script>

<style lang="scss" scoped>
  $color1: #666666;
  $color2: #777777;

  .content {
    padding: 0 15px;
    margin: 0 auto;
    max-width: 1200px;
    text-align: center;
  }

  .header {
    margin-bottom: 20px;
    span {
      margin-left: 40px;
    }
    a {
      color: #4c84ff;
      font-size: 13px;
    }
  }

  .item-box {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #d8d8d8;
  }

  .item {
    margin-right: 85px;
    .price {
      font-size: 18px;
    }
    .last {
      font-size: 14px;
      color: $color1;
    }
    .value {
      color: #000000;
    }
    p {
      text-align: left;
      margin-top: 5px;
      font-size: 12px;
      color: $color2;
    }
  }

  .tabs {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
    span {
      // flex: 1;
      color: #333333;
      .active {
        font-family: dinBold;
        border-bottom: 1px solid #111111;
        padding-bottom: 7px;
      }
    }
  }

  // @include screen-xs() {
  //   .header {
  //     font-size: 13px;
  //     span {
  //       margin: 0;
  //     }
  //   }
  //   .top-data {
  //     display: block;
  //     border-bottom: none;
  //     padding-bottom: 0;
  //     .item {
  //       display: flex;
  //       justify-content: space-between;
  //       margin: 0;
  //       flex-direction: row-reverse;
  //       align-items: center;
  //       height: 35px;
  //       border-bottom: 1px solid #d8d8d8;
  //       .value {
  //         font-size: 13px;
  //         font-family: dinMedium;
  //         color: #333333;
  //         .price {
  //           font-size: 13px;
  //         }
  //       }
  //       .label {
  //         color: #666666;
  //         font-size: 12px;
  //       }
  //     }
  //   }
  // }
</style>

