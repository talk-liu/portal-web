<template>
  <div class="table-box">
    <div class="title">
      <span>{{title}}</span>
      <span class="dropdown">{{dayInterval}}</span>
    </div>
    <table class="hidden-xs">
      <thead>
        <th></th>
        <th v-for="(item,i) in dateList" :key="i">
          {{item}}
        </th>
      </thead>
      <tbody>
        <tr v-for='(v,i) in dataSource' :key='i'>
          <td>{{v.name}}</td>
          <td v-for="(item,j) in v.itemSource" :key="j">
            <span v-if="v.unit === 'USDT'">{{addUnit(item,4,false)}}</span>
            <span v-else>{{item | thousands}}</span>
            <span v-if="v.unit !=='USDT'">{{v.unit}}</span>
            <!-- <span>{{item | thousands}}</span> -->
            <!-- <span>{{v.unit}}</span> -->
          </td>
        </tr>
      </tbody>
    </table>
    <div class="hidden-sm hidden-md hidden-lg">
      <tabs class='tabs flex jcsa' :idx.sync='tabIndex' :count='dateList.length'>
        <tab-item class='tab-item' v-for='(v,i) in dateList' :key='i' :index='i'>
          <span slot='label'>{{v}}</span>
        </tab-item>
      </tabs>
      <div class="item-wrapper">
        <div v-for='(v,i) in dataSource' :key='i' class="item">
          <span>{{v.name}}</span>
          <div>
            <span>{{v.itemSource[tabIndex] | thousands}}</span>
            <span>{{v.unit}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tabs from '@/components/tabs/tabs'
import tabItem from '@/components/tabs/tab-item'
import totalMoney from '@/mixins/total-money'

export default {
  mixins: [totalMoney],
  data() {
    return {
      tabIndex: 0,
    }
  },
  components: {
    tabs,
    tabItem,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    dateList: {
      type: Array,
      default: () => {
        return []
      },
    },
    dataSource: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  computed: {
    dayInterval() {
      if (this.dateList.length > 0) {
        const first = this.dateList[0].replace('/', '.')
        const last = this.dateList[this.dateList.length - 1].replace('/', '.')
        return `${first} - ${last}`
      } else {
        return []
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.table-box {
  margin-bottom: 60px;
  background-color: #ffffff;
  .title {
    text-align: center;
    font-size: 14px;
    color: #333333;
  }
  table {
    margin: 35px auto 0;
    width: 100%;
    max-width: 1200px;
    font-size: 13px;
    border-collapse: collapse;
    th {
      color: #000000;
      background-color: #fafafa;
      height: 50px;
      text-align: left;
    }
    tr {
      td {
        &:first-child {
          padding-left: 20px;
          padding-right: 45px;
        }
      }
    }
    td {
      position: relative;
      padding: 15px 0;
      min-width: 110px;
      border-bottom: 1px solid #d8d8d8;
      text-align: left;
    }
  }
  .dropdown {
    margin-left: 20px;
    color: $color-6;
  }
}

.item-wrapper {
  padding: 0 20px;
  margin-top: 25px;
  .item {
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    border-bottom: 1px solid #d8d8d8;
    span {
      &:first-child {
        font-size: 12px;
        color: #666666;
      }
      &:last-child {
        font-size: 13px;
        font-family: dinMedium;
      }
    }
  }
}

.th5-tabs {
  .th5-tab-item {
    margin-left: 0;
  }
}
</style>