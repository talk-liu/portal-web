<template>
  <div class="at-equity-wrap">
    <div class="rewards">
      <div class="calculate_container">
        <rewards-animation/>
      </div>
    </div>
    <banner :list="atEquityList" class="section" :bannerConfig="equityCfg"></banner>
    <equity></equity>
  </div>
</template>

<script>
import Banner from './components/banner'
import dataList from './components/bannerConfig'
import equity from './components/equity'
import RewardsAnimation from './rewards-mining/rewards'

export default {
  mixins: [dataList],
  components: {
    Banner,
    equity,
    RewardsAnimation,
  },
}
</script>

<style lang="scss" scoped>
.at-equity-wrap {
  .rewards {
    background-color: #160922;
    .calculate_container {
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
