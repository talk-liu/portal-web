<template>
  <div class="table-box din-regular">
    <div class="title">
      <span>{{textConfig.tableTitle}}</span>
      <span class="dropdown">2018.08.10</span>
    </div>
    <table>
      <thead>
        <th width="90px">{{textConfig.th1}}</th>
        <th width="180px">{{textConfig.th2}}</th>
        <th>{{textConfig.th3}}</th>
      </thead>
      <tbody>
        <tr v-for="(item,index) in data" :key="index">
          <td :class="{top:index<3}">
            {{item.rank}}
            <i class="iconfont icon-paixing" v-if="index<3"></i>
          </td>
          <td class="email">{{item.email}}</td>
          <td class="price th-num-bold">{{item.price}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['data', 'textConfig'],
}
</script>

<style lang="scss" scoped>
  .din-regular {
    font-family: dinRegular;
  }

  .table-box {
    padding: 30px 45px;
    background-color: #ffffff;
    .title {
      text-align: left;
      font-size: 14px;
      color: #333333;
    }
    table {
      margin-top: 35px;
      font-size: 13px;
      border-collapse: collapse;
      th {
        color: #999999;
      }
      td,
      th {
        position: relative;
        padding: 15px 0;
        border-bottom: 1px solid #d8d8d8;
        text-align: left;
      }
      .price {
        text-align: right;
      }
      .email {
        font-family: 'PingFang SC';
      }
      .top {
        color: #ee4343;
        font-family: 'dinBold';
      }
    }
    .dropdown {
      margin-left: 10px;
      color: $color-6;
    }
  }

  // @include screen-xs() {
  // .table-box {
  //   .title {
  //     text-align: center;
  //   }
  //   table {
  //     margin: 35px auto 0;
  //   }
  // }
  // }
</style>

