<template>
  <div class="login-page">
    <div class="leftSide">
      <img src="../../assets/images/auth/auth.jpg" />
    </div>
    <!-- <v-verify :type="verifyType"  :verifyNumber="verifyEmailNumber" :hideClose='true' @success="verifySuccess" methods="patch" noFactors="true"></v-verify> -->
    <v-box v-if="twoFactorsList.length === 0"
           id="rightSide">
      <div>
        <p class="logo">
          <img src="../../assets/images/auth/coloredLogo.png" />
          <span>
            {{$t("m.signin.investement")}}
          </span>
        <h1>
          {{$t("m.signin.log")}}
        </h1>
        <label>{{$t("m.signin.account")}}</label>
        </p>
        <div class="content-wrap">
          <form id="form">
            <div class="input-wrap">
              <v-input type="email"
                       maxlength='40'
                       name="auth_key"
                       v-model="email"
                       :placeholder="$t('m.login.username')"
                       @change="()=>{this.emailErr=''}"
                       :showErrMsg="emailErr"
                       :errMessage="emailErr"
                       @blur="verifyEmail(email)"></v-input>
              <v-input type="password"
                       v-model="password"
                       name="password"
                       :placeholder="$t('m.register.passwordPlaceholder')"
                       @change="()=>{this.errMessage=''}"
                       :showErrMsg="errMessage"
                       :errMessage="errMessage"
                       @blur="verifyPass(password)"></v-input>
              <br />
              <!-- <p v-if="errMessage" class="err-message">{{errMessage}}</p> -->
              <div id="captchaBox"></div>
            </div>
            <v-recaptcha @recaptchaSuccess='validateSuccess'
                         @error='recaptchaError'
                         ref='recaptcha'></v-recaptcha>
            <div class="btn">
              <v-btn id='submit'
                     :type="btnType"
                     width="300"
                     @click="submit"
                     @keyup.enter="submit">{{btnText}}</v-btn>
            </div>
          </form>

          <div class="menu-wrap clearfix"
               :class="{'f13': $fifth.lang!=='zh-CN'}">
            <router-link :to="$i18nRoute({name: 'resetPasswordsNew'})">{{$t('m.login.forgotPassword')}}？</router-link>
            <router-link :to="$i18nRoute({name: 'signup'})">{{$t('m.login.register')}}</router-link>
            <span class="pull-right">{{$t('m.signin.yet')}}</span>
          </div>
        </div>
      </div>
    </v-box>
    <v-verify v-else
              :verifyList='twoFactorsList'
              :hideClose='true'
              @success="verifySuccess"
              methods="patch"
              noFactors="true"
              :acceptWarn="errMessage"
              interfaceType='twoFrontendFactor'
              @clear="()=>{this.errMessage=false}"></v-verify>
  </div>
</template>

<script>
import Cookies from '@/utils/cookies'
import loginMixins from '@/mixins/login.js'
import VVerify from '@/components/verify'
import VInput from '@/components/input.vue'
import Lang from '../lang.vue'

export default {
  mixins: [loginMixins],
  components: {
    VVerify,
    VInput,
    Lang,
  },
  computed: {
    signupHref() {
      let signup = '/signup'
      let utmSource = Cookies.getCookie('utm_source')
      if (utmSource) {
        signup += `?utm_source=${utmSource}`
      }
      return signup
    },
  },
}
</script>

<style lang="scss">
.login-page {
  display: flex;
  flex: 1 0 auto;
  box-sizing: border-box;
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
    text-align: inherit;
    margin: 30px auto;
    > div {
      max-width: 520px;
      box-sizing: border-box;
      margin: 0 auto;
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
      font-weight: 700;
      color: #002060;
      margin: 0px;
      padding: 0px;
      margin-bottom: 10px;
    }
    label {
      font-size: 16px;
      font-weight: 400;
      color: #888;
      margin: 10px 0 90px;
    }
    .btn {
      text-align: center;
      margin: 50px 0px;
      button {
        font-size: 20px;
        line-height: 120%;
        font-weight: 700;
        background: #07e9b2;
        color: #002060;

        width: 314px;
        height: 40px;
        border-radius: 5px;
        margin-bottom: 10px;
        box-shadow: none;
        border: none;
      }
    }
  }
  .content-wrap {
    padding: 20px 0px;

    form {
      margin: 0 auto;
      .v-input input {
        border: 1px solid #000;
        border-radius: 5px;
        padding: 15px 27px;
        font-size: 16px;
        text-align: left;
      }
    }

    .err-message {
      position: absolute;
      width: 310px;
      font-size: 12px;
      color: $color-error;
    }
  }

  .slider {
    margin-top: 45px;
  }
  .btn {
    margin-top: 45px;
  }
  .input-wrap {
    input {
      margin-top: 20px;
    }
  }

  .phone-confirm_wrap {
    padding: 70px 100px;

    .send-code_btn {
      margin: 40px auto 56px;
      width: 110px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border: 1px solid #bdc7d1;
      box-shadow: #eaedf5 0 1px 4px;
      cursor: pointer;
    }
  }

  .menu-wrap {
    font-size: 14px;
    margin-top: 10px;

    span {
      color: $color-assist2;
    }

    a {
      cursor: pointer;
      color: $color-assist7;

      &:hover {
        color: $color-text;
      }

      &:nth-of-type(1) {
        float: left;
      }

      &:nth-of-type(2) {
        float: right;
      }
    }
  }
}
</style>
