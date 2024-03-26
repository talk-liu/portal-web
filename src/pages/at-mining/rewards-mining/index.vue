<template>
  <div class='rewards-mining-wrap'>
    <div class="calculate_container">
      <tabs @tabIndex='(i)=>{this.tabIndex = i}' />
      <rewards v-if='tabIndex==0' />
      <mining v-if='tabIndex==1' />
    </div>
  </div>
</template>

<script>
import rewards from './rewards'
import mining from './mining'
import tabs from './tabs'
export default {
  data() {
    return {
      isShow: false,
      tabIndex: 0,
    }
  },
  components: {
    rewards,
    mining,
    tabs,
  },
  mounted() {
    setTimeout(() => {
      this.isShow = true
    }, 500)
  },
}
</script>

<style lang="scss" scoped>
.rewards-mining-wrap {
  background-color: #160922;
  .calculate_container {
    position: relative;
    margin: 0 auto;
    max-width: 1200px;
    box-shadow: rgba(0, 0, 0, 0.03) 0 5px 10px 0;
    overflow: hidden;
    background: url('../../../assets/images/home-bg-pc.png');
    background-repeat: no-repeat;
    background-size: 1440px 100%;

    @keyframes opacity {
      from {
        opacity: 0.5;
      }
      25% {
        opacity: 0.65;
      }
      50% {
        opacity: 0.75;
      }
      75% {
        opacity: 0.85;
      }
      to {
        opacity: 0.95;
      }
    }
  }
}

// @include screen-xs() {
//   .rewards-mining-wrap {
//     background: url('../../../assets/images/home-bg-h5.png');
//     background-repeat: no-repeat;
//     // background-size: 480px 100%;
//   }
// }

// @include screen-sm() {}
// @include screen-md() {}
// @include screen-lg() {}
</style>
