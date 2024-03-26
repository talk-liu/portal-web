<template>
  <v-dialog :visible="visible">
    <div class="alert-box">
      <i class="iconfont icon-guanbi" @click="()=>{this.$emit('close')}"></i>
      <h4 :style="{fontSize: isCN?'24px':'18px'}" class="regular">{{title}}</h4>
      <div class="btn">
        <v-btn type="primary" @click="()=>{this.$emit('click')}">{{$t('m.funds.confirm')}}</v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import VDialog from '@/components/dialog'
import VBtn from '@/components/btn'

export default {
  data() {
    return {
      isCN: this.$fifth.lang === 'zh-CN',
    }
  },
  components: {
    VDialog,
    VBtn,
  },
  props: ['visible', 'title'],
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.alert-box {
  position: absolute;
  top: 40%;
  left: 50%;
  width: 300px;
  // height: 180px;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 4px;
  text-align: center;

  h4 {
    font-weight: normal;
    margin-top: 45px;
    font-size: 24px;
    color: $color-assist1;
  }

  i {
    position: absolute;
    top: 10px;
    right: 20px;
  }

  .btn {
    padding: 20px 80px;
  }
}
</style>
