<template>
  <div class="content">
    <div class="success">
      <span class="icon"></span>
      <p class="tip regular">{{$t('m.activationSuccess.message1')}}</p>
      <p>{{$t('m.activationSuccess.message2')}}</p>
    </div>
    <v-btn
      type="primary"
      class="btn"
      @click="login"
    >{{$t('m.activationSuccess.login')}}</v-btn>
  </div>
</template>

<script>
import VBtn from '@/components/btn'
export default {
  components: {
    VBtn,
  },
}
</script>

<style lang="scss">
.success {
  padding-top: 176px;
}

.success .icon {
  background: url('../../../assets/images/success-mobile.png') no-repeat;
  background-size: 100% 100%;
  display: block;
  margin: 0 auto;
  width: 80px;
  height: 80px;
}

.success p {
  margin-top: 25px;
  color: #27cf47;
  font-size: 24px;
  text-align: center;
  &:last-child {
    margin-top: 10px;
    font-size: 15px;
    color: $color-9;
  }
}

.btn {
  width: 315px;
  margin: 1px auto 0 !important;
}
</style>
