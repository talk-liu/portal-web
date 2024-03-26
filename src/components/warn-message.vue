<template>
  <div class="warning-box">
    <i class="iconfont icon-guanbi" @click="cancel"></i>
    <div class="title">{{title}}</div>
    <div class="content">{{content}}</div>
    <div class="btns">
      <v-btn type="primary" width="140" height="40" @click="confirm" large=true>{{$t('m.createKey.yes')}}</v-btn>
      <v-btn type="info" large=true width="140" height="40"  @click="cancel">{{$t('m.createKey.no')}}</v-btn>
    </div>
  </div>
</template>

<script>
import VBtn from '@/components/btn'

export default {
  props: ['title', 'content'],

  components: {
    VBtn,
  },
  methods: {
    confirm() {
      this.$emit('action')
    },
    cancel() {
      this.$emit('cancel')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.warning-box {
  padding: 45px 45px 20px;
  position: absolute;
  top: 200px;
  left: 50%;
  width: 400px;
  background-color: #ffffff;
  border-radius: 4px;
  transform: translateX(-50%);
  box-shadow: rgba($color: #000000, $alpha: 0.02) 0 5px 10px 0;

  .icon-guanbi {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .title {
    text-align: left;
    font-size: 18px;
    color: $color-assist1;
  }

  .content {
    margin: 10px 0 25px;
    text-align: left;
    word-wrap: break-word;
    color: $color-assist1;
    font-size: 14px;
  }
  .btns {
    display: flex;
    justify-content: space-between;
  }
}
</style>
