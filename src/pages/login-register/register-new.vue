<template>
  <div
    class="pc_register_bg"
    :style="{background:`url(${this.pcBgUrl})`,backgroundSize:'cover',backgroundPosition:'center' }"
  >
    <div class="leftSide">
      <img src="../../assets/images/auth/auth.jpg"/>
    </div>
    <div
      class="register-page"
      id="rightSide"
      :class="{active:this.active && this.pcBgUrl}"
    >
      <!-- 注册 -->
      <v-box
        :active="this.active && this.pcBgUrl"
      >

        <p class="logo">
          <img src="../../assets/images/auth/coloredLogo.png"/>
          <span>
            {{$t('m.signin.investement')}}
          </span>
          <h1>
            {{$t("m.signin.register")}}
          </h1>
        </p>

        <div class="content-wrap">
          <div class="input-wrap">
            <v-input
              type="email"
              name="email"
              maxlength="40"
              v-model="email"
              :showErrMsg="showEmailErr"
              :placeholder="$t('m.register.emailPlaceholder')"
              @change="changeEmail"
              :errMessage="emailErr"
              @blur="verifyEmail"
            ></v-input>
            <v-input
              type="password"
              @blur="verifyPass(password)"
              v-model="password"
              @change="changePass"
              name="password"
              :placeholder="$t('m.register.passwordPlaceholder')"
              :showErrMsg="showPassErr"
              :errMessage="passErr"
            ></v-input>
            <v-input
              type="password"
              @blur="verifyRepass(rePassword)"
              v-model="rePassword"
              name="password_confirmation"
              :placeholder="$t('m.register.passwordConfirmPlaceholder')"
              :showErrMsg="showRepassErr"
              :errMessage="repassErr"
              @change="changeConfirm"
            ></v-input>
            <v-input
              type="text"
              @blur="verifyInviteCode(aff)"
              v-model="aff"
              name="inviteCode"
              :placeholder="$t('m.register.inviteCode')"
              :showErrMsg="showCodeErr"
              :errMessage="codeErr"
              @change="changeCode"
            ></v-input>
              <br/>
              <div id="captchaBox"></div>
            <!-- 输入a码 -->
            <!-- <v-input type="text" @blur="verifyCode(invitation_token)" v-model="invitation_token" name="invitation_token" :placeholder="$t('m.register.codePlaceholder')" :showErrMsg="showCodeErr" :errMessage="codeErr" @change="changeCode"></v-input> -->
          </div>
          <div class="checkbox-wrap">
            <v-checkbox v-model="checked">
              {{$t('m.register.read')}}
              <router-link
                :to="$i18nRoute({path: '/documents/agreement'})"
                target="_blank"
                class="protocol-title"
              >{{$t('m.register.clause')}}</router-link>
            </v-checkbox>
          </div>
          <v-recaptcha
            ref='recaptcha'
            @error='recaptchaError'
            @recaptchaSuccess='validateSuccess'
          ></v-recaptcha>
          <div class="btn">
            <v-btn
              id="submit"
              :type="btnType"
              @click="submit"
              :disabled="btnType === 'default'"
            >{{btnText}}</v-btn>
          </div>
          <div class="menu-wrap">
            <span>{{$t('m.register.isRegister')}}?</span>
            <router-link :to="$i18nRoute({name: 'signin'})">
              <span>{{$t('m.register.login')}}</span>
            </router-link>
          </div>
          <div
            class="limit-err"
            v-if="limitErr"
          >{{limitErr}}</div>
          <div
            class="limit-err"
            v-if="captchaErr"
          >{{captchaErr}}</div>
        </div>
      </v-box>
    </div>
  </div>
</template>

<script>
import VRecaptcha from '@/components/vue-recaptcha'
import VInput from '@/components/input.vue'
import VBox from '@/components/box.vue'
import VBtn from '@/components/btn'
import VCheckbox from '@/components/checkbox'
import registerMixins from '@/mixins/register.js'
import registerMobile from './register-mobile'

export default {
  mixins: [registerMixins],
  components: {
    VInput,
    VBox,
    VCheckbox,
    VBtn,
    VRecaptcha,
    registerMobile,
  },
}
</script>

<style  lang="scss">
.pc_register_bg {
  overflow-y: hidden;
  min-width: 1200px;

  display: flex;
  flex: 1 0 auto;
  height: 100%;
  .leftSide {
    flex: 1 1;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  #rightSide {
    flex: 1 1;
    box-shadow: none;
    margin: 30px auto;
    > div {
      max-width: 520px;
      box-sizing: border-box;
      margin: 0 auto;
      box-shadow: none;
      width: auto;
      text-align: inherit;
    }

    .primary-bg {
      background-color: #fff;
    }
    .title {
      border-color: #fff;
    }
    .logo {
      display: flex;
      margin-bottom: 30px;
      span {
        line-height: 110%;
        font-weight: 400;
        display: flex;
        align-items: center;
        margin-left: 15px;
        padding-left: 15px;
        font-size: 24px;
        color: #555;
        border-left: 1px solid #555;
      }
    }
    h1 {
      font-size: 48px;
      line-height: 120%;
      font-weight: 700;
      color: #002060;
      margin: 0px;
      padding: 0px;
    }
    .btn {
      text-align: center;
      margin: 40px auto auto auto;
      width: 300px;
      button {
        font-size: 20px;
        line-height: 120%;
        font-weight: 700;
        background: #e1e1e1;
        color: #888;

        width: 314px;
        height: 40px;
        border-radius: 5px;
        margin-bottom: 10px;
        box-shadow: none;
        border: none;
      }
      .primary {
        background: #07e9b2;
        color: #002060;
      }
    }
  }
}

.register-page {
  margin: 30px auto;
  // height: 630px;
  // background: url('../../assets/images/login-bg.png') no-repeat;
  background-size: cover;

  &.active {
    position: relative;
    top: 150px;
    height: 730px;
  }
  .limit-err {
    margin-top: 20px;
    color: #ee4343;
    font-size: 12px;
    text-align: center;
  }
  .content-wrap {
    // padding: 15px 100px;

    .checkbox-wrap {
      margin-top: 30px;

      &.en {
        margin-left: -10px;
      }
    }

    .protocol-title {
      color: #e06f0d;
    }
  }

  .input-wrap {
    // width: 300px;
    margin-top: 25px;

    .v-input:not(:nth-of-type(1)) {
      margin-top: 25px;
    }
    .v-input input {
      border: 1px solid #000;
      border-radius: 5px;
      padding: 15px 27px;
      font-size: 16px;
      text-align: left;
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
        color: $color-6;
      }
    }
  }

  .btn {
    margin-top: 20px;

    button {
      width: 100%;
      font-size: 18px !important;
    }
  }

  .menu-wrap {
    margin-top: 15px;
    text-align: right;
    color: $color-assist7;

    span {
      &:nth-of-type(1) {
        color: $color-assist2;
      }

      &:nth-of-type(2):hover {
        color: $color-text;
        cursor: pointer;
      }
    }
  }
}
</style>
