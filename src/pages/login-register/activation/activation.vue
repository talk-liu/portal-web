<!-- 去激活 -->
<template>
  <div
    v-if="type !== 'h5'"
    class="register-page"
  >
    <!-- 邮箱验证 -->
    <v-box :title="$t('m.activation.title')">
      <div
        class="confirm-mail-box"
        :class="{en:$fifth.lang!=='zh-CN'}"
      >
        <div>
          <h4 class="semi-bold">{{email}}</h4>
        </div>
        <div class="semi-bold">
          {{$t('m.activation.hadSendToEmailCode')}}
        </div>
        <v-input
          class='email-code'
          type="password"
          v-model="emailCode"
          :errMessage='errMessage'
          :showErrMsg='errMessage'
          :placeholder="$t('m.login.inputSmsCode')"
        ></v-input>

        <div class="withdraw-box">
          <a
            @click="reWithdraw"
            class="retry-btn"
          >
            <i class="iconfont icon-zhongfayoujian"></i>
            {{$t('m.activation.resend')}}
          </a>
          <p>{{$t('m.funds.withdrawRemind2')}}</p>
          <p>{{$t('m.funds.withdrawRemind3')}}
            <span class="orange-color semi-bold">support@riostox.com</span>
          </p>
        </div>
      </div>
    </v-box>
  </div>
  <activation-mobile v-else />
</template>

<script>
import VBox from '@/components/box.vue'
import VBtn from '@/components/btn'
import activationMobile from './activation-mobile'
import { mapGetters } from 'vuex'
import activationMixin from './activation-mixin'

export default {
  components: {
    VBox,
    VBtn,
    activationMobile,
  },
  mixins: [activationMixin],
  computed: {
    ...mapGetters('viewport', ['type']),
  },
}
</script>

<style lang="scss">
.register-page {
  margin: 30px auto;
  width: 1104px;
  height: 585px;
  background: url('../../../assets/images/login-bg.png') no-repeat;
  background-size: cover;

  .content-wrap {
    padding: 15px 100px;

    .slider {
      margin-top: 30px;
    }
  }

  .input-wrap {
    width: 300px;

    .v-input:not(:nth-of-type(1)) {
      margin-top: 20px;
    }
  }

  .mail-success_content {
    .icon-box {
      margin: 30px auto 0;
      width: 70px;
      height: 70px;
      border: 2px solid $color-assist5;
      border-radius: 50%;
    }

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

  .btn {
    margin-top: 20px;

    button {
      width: 100%;
      font-size: 18px;
    }
  }

  .menu-wrap {
    margin-top: 10px;
    text-align: right;

    span {
      cursor: pointer;
    }
  }
  .confirm-mail-box {
    margin: 0 50px;
    color: $color-assist1;
    font-size: 16px;
    text-align: center;

    .withdraw-box {
      font-size: 12px;
      color: $color-assist7;

      p {
        margin-bottom: 5px;
      }
    }

    .orange-color {
      color: #e06f0d;
    }

    &.en {
      margin: 0 30px;
      padding-bottom: 40px;
    }

    h4 {
      font-size: 22px;
      color: $color-assist1;
    }

    .retry-btn {
      margin: 30px auto;
      display: block;
      padding: 0 20px;
      width: 250px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #bdc7d1;
      color: $color-assist3;
      font-size: 15px;
      border-radius: 3px;
      box-shadow: rgba(0, 0, 0, 0.02) 0 4px 4px 0;
      cursor: pointer;
      &.disable {
        background-color: #f6f6f6;
        border: 1px solid #f6f6f6;
        color: #cccccc;
      }

      i {
        font-size: 20px;
        vertical-align: middle;
      }
    }

    div {
      font-size: 16px;

      &:nth-of-type(1) {
        text-align: center;
        padding: 60px 0 30px;
      }

      &:nth-of-type(2) {
        position: relative;
        margin: 0 auto;
        // width: 300px;
        line-height: 2;
      }
    }

    .confirm-footer {
      margin-top: 30px;
      padding: 30px 20px;
      border-top: 1px solid $color-line;
      color: $color-assist7;
      text-align: left;
      line-height: 1.7;

      .orange-color {
        color: #e06f0d;
      }

      ul {
        margin-left: 15px;
        list-style-type: decimal;
      }
    }
  }
}
</style>
