<template>
  <div class="login-page-mobile">
    <div class="logo"></div>
    <div class="content-wrap">
      <form id="form">
        <div class="input-wrap">
          <v-input
            ref='auth_key'
            :showDelBtn="true"
            type="email"
            maxlength='40'
            name="auth_key"
            v-model="email"
            :placeholder="$t('m.login.username')"
            @change="()=>{this.emailErr=''}"
            :showErrMsg="emailErr"
            :errMessage="emailErr"
            @blur="verifyEmail(email)"
            autocomplete="new-password"
          >

            ></v-input>
          <v-input
            ref="password"
            :showChangeType='true'
            type="password"
            v-model="password"
            name="password"
            :placeholder="$t('m.register.passwordPlaceholder')"
            @change="()=>{this.errMessage=''}"
            :showErrMsg="errMessage"
            :errMessage="errMessage"
            @blur="verifyPass(password)"
            autocomplete="new-password"
          >
            ></v-input>
        </div>
        <div style="margin-top:20px" id="captchaBox"></div>
        <v-recaptcha
          @recaptchaSuccess='validateSuccess'
          @error='recaptchaError'
          ref='recaptcha'
        ></v-recaptcha>
        <div class="btn">
          <v-btn
            id="submit"
            :type="btnType"
            @click="submit"
            :disabled="btnType ==='default'"
          >{{btnText}}</v-btn>
        </div>
      </form>

      <div class="menu-wrap clearfix">
        <router-link :to="$i18nRoute({ name: 'signup' })">{{$t('m.login.registerS')}}</router-link>
      </div>
    </div>
    <v-verify
      @close='()=>{this.showDialog = false;this.resetBtnText()}'
      v-if='showDialog'
      :visible='showDialog'
      :verifyList="twoFactorsList"
      @success="verifySuccess"
      methods="patch"
      :noFactors="true"
      :acceptWarn="errMessage"
      @clear="()=>{this.errMessage=false}"
      interfaceType='twoFrontendFactor'
    >
      ></v-verify>
  </div>
</template>

<script>
import loginMixins from '@/mixins/login.js'
import VVerify from '@/components/mobile-verify'
import VInput from '@/components/input-mobile'

export default {
  components: {
    VVerify,
    VInput
  },
  mixins: [loginMixins],
}
</script>

<style lang="scss">
.login-page-mobile {
  margin: 0 auto;
  .logo {
    background: url(../../assets/images/logo-small.png) no-repeat;
    display: block;
    width: 109px;
    height: 28px;
    background-size: 100% 100%;
    margin: 15px auto 0;
  }
  .content-wrap {
    padding: 20px 30px 0;

    form {
      // width: 37.5px;
      margin: 0 auto;
    }

    .err-message {
      position: absolute;
      width: 310px;
      font-size: 12px;
      margin-top: 5px;
      color: $color-error;
    }
  }

  .slider {
    margin-top: 45px;
  }
  .btn {
    margin-top: 65px;
  }
  .input-wrap {
    input {
      margin-top: 34px;
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
    margin-top: 10px;
    color: $color-gray;
    font-size: 15px;
    span {
      color: $color-gray;
    }

    a {
      cursor: pointer;
      color: $color-gray;
      &:nth-of-type(1) {
        float: right;
      }

      &:nth-of-type(2) {
        float: right;
      }
    }
  }
}
</style>
