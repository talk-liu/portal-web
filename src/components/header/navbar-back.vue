<template>
  <div v-if='showNav'>
    <div class='nav-bar' @click='goBack'>
      <div class='iconfont back-icon icon-back'></div>
      <span class='back-text fb'>{{$t('m.notices.back')}}</span>
      <slot />
    </div>
    <div style='height:44px;'></div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      showNav: qs.parse(location.search.substring(1)).source !== 'app'
    }
  },
  methods: {
    goBack() {
      if (document.referrer) {
        window.history.back()
      } else {
        location.href = '/'
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.nav-bar {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 15px;
  position: fixed;
  top: 0;
  width: 100%;
  background: #ffffff;
  z-index: $zindex-fixed;
  .back-icon {
    display: inline-block;
    margin-right: 2px;
    font-size: 14px;
  }
  .back-text {
    line-height: 18px;
  }
}
</style>
