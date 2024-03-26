<template>
  <v-dialog :visible="isShow" class="pop-dialog">
    <div class="pop-over">
      <div class="title" v-if='options.title'>
        {{options.title}}
      </div>
      <div class="content" v-if='options.content'>
        {{options.content}}
      </div>
      <div class="btns">
        <span @click='cancelHandler' v-if="options.cancel">{{options.cancelText}}</span>
        <span @click='confirmHandler' v-if="options.confirm">{{options.confirmText}}</span>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import VDialog from '@/components/dialog'
export default {
  data() {
    return {
      isShow: true,
      options: {},
    }
  },

  mounted() {},
  components: {
    VDialog,
  },
  methods: {
    cancelHandler() {
      this.isShow = false
      typeof this.options.cancel === 'function' && this.options.cancel()
    },
    confirmHandler() {
      this.isShow = false
      typeof this.options.confirm === 'function' && this.options.confirm()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.pop-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pop-over {
  max-width: 315px;
  min-width: 270px;
  min-height: 145px;
  background: #ffffff;
  border-radius: 12px;
  padding: 20px 15px 45px;
  box-sizing: border-box;
  position: relative;

  .title {
    font-size: 17px;
    color: #000000;
    text-align: center;
    padding: 20px 0;
  }
  .content {
    margin-top: 80px;
    text-align: center;
    color: #666666;
    font-size: 14px;
  }
  .btns {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #007aff;
    font-size: 17px;
    border-top: 1px solid #f5f4f5;
    height: 45px;
    span {
      height: 45px;
      line-height: 45px;
      flex: 1;
      text-align: center;
      border-right: 1px solid #f5f4f5;
      &:last-child {
        border: none;
      }
    }
  }
}
</style>
