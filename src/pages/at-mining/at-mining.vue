<template>
  <div class="mining-wrap">
    <div class="mining-content">
      <mining-animation class="calculate"/>
    </div>
    <mining></mining>
  </div>
</template>

<script>
import dataList from './components/bannerConfig'
import mining from './components/mining'
import MiningAnimation from './rewards-mining/pc/mining'

export default {
  mixins: [dataList],
  components: {
    mining,
    MiningAnimation,
  },
}
</script>

<style lang="scss" scoped>
.mining-wrap {
  .mining-content {
    background-color: #160922;
    margin-bottom: 40px;
    .calculate {
      position: relative;
      margin: 0 auto;
      max-width: 1200px;
      box-shadow: rgba(0, 0, 0, 0.03) 0 5px 10px 0;
      overflow: hidden;
      background: url('../../assets/images/home-bg-pc.png');
      background-repeat: no-repeat;
      background-size: 1440px 100%;
    }
  }
  .section {
    margin-bottom: 20px;
    background-color: #fafafa;
  }
}
</style>

