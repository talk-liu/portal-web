<template>
  <div
    v-if="type !== 'h5'"
    class="register-page"
  >
    <v-box :title="$t('m.activationSuccess.title')">
      <div class="content-wrap">
        <div class="mail-success_content">
          <div class="icon-box">
            <i class="iconfont icon-chenggong1"></i>
          </div>
          <div class="success-text semi-bold">
            <p>{{$t('m.activationSuccess.message1')}}</p>
            <p>{{$t('m.activationSuccess.message2')}}</p>
          </div>
          <v-btn
            type="primary"
            @click="login"
          >{{$t('m.activationSuccess.login')}}</v-btn>
        </div>
      </div>
    </v-box>
  </div>
  <activation-success-mobile v-else />

</template>

<script>
import activationSuccessMobile from './activation-success-mobile'
import { mapGetters } from 'vuex'

export default {
  components: {
    activationSuccessMobile,
  },
  computed: {
    ...mapGetters('viewport', ['type']),
  },
}
</script>

<style lang="scss">
.content-section {
  min-height: 780px;

  .top {
    text-align: center;
    .icon {
      background: url(../../../assets/images/success-mobile.png) no-repeat;
      background-size: 100% 100%;
      width: 60px;
      height: 60px;
      display: inline-block;
      margin-top: 40px;
    }
    h4 {
      font-weight: normal;
      color: #000000;
      font-size: 20px;
      margin-top: 15px;
    }
    h5 {
      font-weight: normal;
      color: #666666;
      font-size: 16px;
      margin-top: 10px;
    }
  }

  .list {
    display: flex;
    justify-content: center;
    margin-top: 45px;
    .item {
      background: #fafafa;
      border-radius: 4px;
      height: 356px;
      flex: 1;
      margin-left: 20px;
      text-align: center;
      padding: 64px 30px 0;
      &:first-child {
        margin-left: 0;
      }
      h5 {
        color: #000000;
        font-size: 16px;
        font-weight: normal;
        margin-top: 14px;
      }
      p {
        color: #666666;
        font-size: 12px;
        margin-top: 14px;
      }
      span {
        margin-top: 33px;
        display: inline-block;
        color: #4c7df7;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }

  .btn {
    text-align: center;
    margin-top: 44px;
    span {
      display: inline-block;
      padding: 0 49px;
      background: #ffd200;
      height: 34px;
      line-height: 34px;
      border-radius: 3px;
      text-align: center;
      color: #000000;
      font-size: 14px;
      cursor: pointer;
    }
  }
}

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

  .confirm-mail-box {
    margin: 0 40px;
    color: $color-assist1;
    font-size: 16px;
    text-align: left;

    div {
      font-size: 14px;

      &:nth-of-type(1) {
        padding: 40px 0 30px;
      }

      &:nth-of-type(2) {
        position: relative;
        margin-top: 40px;

        p {
          font-weight: bold;
        }

        span {
          position: absolute;
          right: 37px;
          top: 112px;
        }

        ul {
          list-style-type: decimal;

          li {
            list-style-position: inside;
            padding: 10px 0;
          }
        }
      }
    }
  }

  .mail-success_content {
    .icon-box {
      margin: 30px auto 0;
      //width: 70px;
      //height: 70px;
      //border: 2px solid $color-assist5;
      //border-radius: 50%;
    }

    i {
      font-size: 80px;
      color: $color-assist5;
    }

    .success-text {
      margin: 30px 0 65px;

      p:nth-of-type(1) {
        font-size: 24px;
        color: $color-assist5;
      }

      p:nth-of-type(2) {
        margin-top: 10px;
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
}
</style>
