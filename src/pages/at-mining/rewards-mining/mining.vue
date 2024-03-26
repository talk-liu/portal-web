<template>
  <div class='mining-wrap'>
    <mining-pc class='hidden-xs' />
    <mining-mobile class='hidden-sm hidden-md hidden-lg' />
  </div>
</template>

<script>
import miningPc from './pc/mining'
import miningMobile from './mobile/mining'
export default {
  components: {
    miningPc,
    miningMobile
  }
}
</script>

<style lang='scss' scoped>
  // .mining-wrap {}
</style>