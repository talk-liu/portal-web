<template>
  <div class="setting">
    <div class="wrap">
      <div class="opt">
        <i class="iconfont icon-shensebanicon dark" :class="theme==='dark'?'active':''" @click="changeTheme({theme:'dark', save:true})"></i>
        <i class="iconfont icon-qiansebanicon light" :class="theme==='light'?'active':''" @click="changeTheme({theme:'light', save:true})"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  methods: {
    ...mapMutations('viewport', ['changeTheme']),
  },
  computed: {
    ...mapState('viewport', ['theme']),
  },
}
</script>

<style lang="scss" scoped>
.setting {
  height: 40px;
  width: 100%;

  @include themify($themes) {
    background-color: themed('bgColor');
  }
  .wrap {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    // background-color: #ffffff;
    @include themify($themes) {
      background-color: themed('wrapBgColor');
    }
    .opt {
      display: flex;
      .dark,
      .light {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        height: 100%;
        width: 50px;
        font-size: 20px;
        border-left: 1px solid;
        color: #666666;

        @include themify($themes) {
          border-color: themed('lineBorderColorF5');
        }
      }
      .dark {
        font-size: 18px;
      }
      .active {
        @include themify($themes) {
          background-color: themed('themedActive');
          color: themed('themedIconActive');
        }
      }
    }
  }
}
</style>

