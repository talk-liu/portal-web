<template>
  <div class="content">
    <div class="header">
      <span>{{title}}</span>
      <!-- <a href="" class="pull-right">平台待分配收入图解</a> -->
    </div>
    <div class="top-data item-box">
      <div v-for='(v,i) in ptSource' :key='i' class="item ">
        <p class="value th-num-bold">
          <span class="unit" v-if="v.unit==='USDT'">{{unit}}</span>
          <span class="price">{{v.integer}}</span>
          <span v-if='v.decimal' class='price'>.</span>
          <span class="last">{{v.decimal}}</span>
          <span class="last" v-if="v.unit!=='USDT'">{{v.unit}}</span>
        </p>
        <p class="label ">{{v.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import totalMoney from '@/mixins/total-money'
export default {
  mixins: [totalMoney],
  props: {
    title: {
      type: String,
      default: '',
    },
    ptSource: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
}
</script>

<style lang='scss' scoped>
$color2: #777777;

.content {
  padding: 0 15px;
  margin: 0 auto;
  max-width: 1200px;
  text-align: center;
}

.header {
  margin-bottom: 20px;
  a {
    color: #4c84ff;
    font-size: 13px;
  }
}

.item-box {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #d8d8d8;
}

.item {
  .price {
    font-size: 18px;
  }
  .last {
    font-size: 14px;
    color: $color-6;
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
//         // font-family: dinMedium;
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
