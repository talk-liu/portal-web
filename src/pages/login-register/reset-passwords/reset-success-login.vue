<template>
  <!-- 发送成功 -->
  <v-box :title="$t('m.updatePassword.success')">
    <div class="content-wrap">
      <div class="mail-success_content">
        <i class="iconfont icon-chenggong1"></i>
        <div class="success-text">
          <p>{{$t('m.updatePassword.success')}}</p>
        </div>
        <v-btn type="primary" @click="login">{{$t('m.updatePassword.login')}}</v-btn>
      </div>
    </div>
  </v-box>
</template>

<script>
import VBox from '@/components/box.vue'
import VBtn from '@/components/btn'

export default {
  methods: {
    // 登录
    login() {
      this.$router.push(
        this.$i18nRoute({
          name: 'signin',
        }),
      )
    },
  },
  components: {
    VBox,
    VBtn,
  },
}
</script>

<style lang='scss' scoped>
.content-wrap {
  padding: 40px 100px;

  input {
    margin-top: 40px;
  }

  .err-message {
    font-size: 12px;
    color: $color-error;
  }

  .btn {
    margin-top: 40px;
  }
}

.mail-success_content {
  i {
    font-size: 60px;
    color: $color-assist5;
  }

  .success-text {
    margin: 30px 0 65px;

    p:nth-of-type(1) {
      font-size: 24px;
      color: $color-assist5;
    }

    p:nth-of-type(2) {
      font-size: 16px;
      color: #666666;
    }
  }
}
</style>