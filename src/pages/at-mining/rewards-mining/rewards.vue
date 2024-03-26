<template>
  <div class='rewards-wrap'>
    <div class='flex jcc aic'>
      <!-- <scroll-exchange-fee class='hidden-xs hidden-sm hidden-md' /> -->
      <scroll-exchange-fee />
      <!-- <rewards-pc class='hidden-xs' /> -->
      <rewards-pc />
    </div>
    <!-- <rewards-mobile class='hidden-sm hidden-md hidden-lg' /> -->
  </div>
</template>

<script>
// import InfoTip from '@/components/tip'
import rewardsPc from './pc/rewards'
// import rewardsMobile from './mobile/rewards'
import scrollExchangeFee from './pc/scroll-exchange-fee'
export default {
  components: {
    // InfoTip,
    rewardsPc,
    // rewardsMobile,
    scrollExchangeFee,
  },
}
</script>

<style lang="scss">
.rewards-wrap {
  height: 100%;
}
</style>
