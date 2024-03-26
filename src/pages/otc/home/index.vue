<template>
  <div class="otc-index">
    <otc-zh v-if="this.$fifth.lang === 'zh-CN' || this.$fifth.lang === 'zh-TW'"></otc-zh>
    <!--    <otc-err v-if="this.$fifth.lang === 'zh-CN' || this.$fifth.lang === 'zh-TW'"></otc-err>-->
    <otc-en v-else></otc-en>
  </div>
</template>
<script>
// import otcErr from './otc-err'
import otcZh from './otc-zh'
import otcEn from './otc-en'
export default {
  components: {
    // otcErr,
    otcZh,
    otcEn
  }
}
</script>
