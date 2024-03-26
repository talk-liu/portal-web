<template>
  <div class="depths">
    <div class="table-head">
      <depth-toggle :toggle.sync="toggle"></depth-toggle>
      <div class="depth-merge fb">
        <span>{{$t('m.exchange.groups')}}：</span>
        <span class="num">{{currentFixed}}</span>
        <span class="iconfont icon-xiala"></span>
        <select name="dm" class="dm" v-model="currentFixed" @change="changeDepthFixed">
          <option :value="n" v-for="n in depthFixed" :key="n">{{n}}</option>
        </select>
      </div>
    </div>
    <depth-table
      v-if="toggle.idx == 0"
      :current-asks-amount="orderIndex.asks"
      :current-bids-amount="orderIndex.bids"
      :toggle="toggle"
    ></depth-table>
    <depth-table v-if="toggle.idx == 1" :current-bids-amount="orderBids" :toggle="toggle"></depth-table>
    <depth-table v-if="toggle.idx == 2" :current-asks-amount="orderAsks" :toggle="toggle"></depth-table>
  </div>
</template>
<script>
// 交易页 左边栏 切换买盘  卖盘
import depthTable from './depth-table'
import depthToggle from './depth-toggle'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'depths',
  components: {
    depthTable,
    depthToggle,
  },
  data() {
    return {
      toggle: {
        idx: 0,
        prev: 0,
      },
      currentFixed: '0.01',
      depthFixed: [],
      asksAmount: [],
      bidsAmount: [],
    }
  },
  computed: {
    ...mapGetters('orderBook', ['orderIndex', 'orderAsks', 'orderBids']),
    ...mapGetters('markets', ['currentMarket']),
  },
  watch: {
    currentMarket: 'formatDepthFixed',
  },
  mounted() {
    this.formatDepthFixed()
  },
  methods: {
    ...mapMutations('orderBook', ['depthMerge']),
    formatDepthFixed() {
      let depthMerge = this.currentMarket.depth_merge || { max: 4, min: 2 }
      let depthFixedArr = [
        '1',
        '0.1',
        '0.01',
        '0.001',
        '0.0001',
        '0.00001',
        '0.000001',
        '0.0000001',
        '0.00000001',
        '0.000000001',
        '0.0000000001',
      ]
      let fixedArrary = []
      for (let i = depthMerge.min; i <= depthMerge.max; i++) {
        fixedArrary.push(depthFixedArr[i])
      }
      this.depthFixed = fixedArrary
      this.currentFixed = depthFixedArr[depthMerge.max]
    },
    changeDepthFixed() {
      let fixed = this.currentFixed.length - 2
      if (fixed < 0) {
        fixed = 0
      }
      this.depthMerge(fixed)
    },
  },
}
</script>
<style lang="scss" scoped>
.table-head {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  .depth-merge {
    position: relative;
    color: $color-assist3;
    font-size: 0;
    cursor: pointer;
    span {
      font-size: 13px;
    }
    .num {
      color: $color-assist1;
      margin-right: 21px;
    }
    .icon-xiala {
      display: inline-block;
      color: $color-assist1;
      margin-left: 2px;
      font-size: 22px;
      font-weight: normal;
      position: absolute;
      right: 0;
      top: -2px;
    }
    .dm {
      font-size: 13px;
      opacity: 0;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>
