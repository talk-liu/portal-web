<template>
  <div class="otc-wrap">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  beforeCreate() {
    if (this.$fifth.lang === 'zh-CN' || this.$fifth.lang === 'zh-TW') {
      this.$router.replace(this.$i18nRoute({ path:'/otc' }))
    }
  }
}
</script>
