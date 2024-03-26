<template>
  <div class='mining-h5-wrap'>
    <current-exchange :isMiningNow='seletedIdx==3' :currentExchangeData='currentExchangeData' />
    <div class='block-list'>
      <div v-for='(v,i) in minedBlock' :key='i' class='block-item' @mouseenter='blockClick(i)'>
        <block-mined :i='i' v-if='i<3' :seletedIdx='seletedIdx' :height='blockHeight(v,210)' />
        <block-mining :i='i' v-else :seletedIdx='seletedIdx' :height='blockHeight(v,210)' />
      </div>
    </div>
  </div>
</template>

<script>
import blockMined from './block-mined'
import blockMining from './block-mining'
import currentExchange from './current-exchange'
import miningMixin from '../mixins/mining-mixin'
export default {
  data() {
    return {
      seletedIdx: 3,
    }
  },
  components: {
    blockMined,
    blockMining,
    currentExchange,
  },
  mixins: [miningMixin],
  methods: {
    blockClick(i) {
      localStorage.setItem('mine_clicked', 1)
      this.seletedIdx = i
    },
  },
}
</script>

<style lang='scss' scoped>
.mining-h5-wrap {
  // padding: 20px 20px 0;
  .block-list {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    // padding-top: .37rem;
    border-top: 1px solid rgba($color: #ffffff, $alpha: 0.2);
    // .selected {
    //   border: 1px solid #b1b1b1;
    // }
    .block-item {
      height: 260px;
      width: 120px;
      display: flex;
      align-items: flex-end;
      position: relative;
    }
  }
}
</style>
