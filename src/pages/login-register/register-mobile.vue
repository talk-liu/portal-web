<template>
  <div class="content">
    <div
      class="logo"
      v-if="!active || !h5BgUrl"
    ></div>
    <img
      :src="h5BgUrl"
      v-else
      class="bg_img"
    >
    <div
      class="form"
      :class="{active:active}"
    >
      <div class="input-box">
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
      </div>
      <div class="input-box">
        <v-input
          type="password"
          :showDelBtn="true"
          :showChangeType='true'
          @blur="verifyPass(password)"
          v-model="password"
          @change="changePass"
          name="password"
          :placeholder="$t('m.register.passwordPlaceholder')"
          :showErrMsg="showPassErr"
          :errMessage="passErr"
        ></v-input>
      </div>
      <div class="input-box">
        <v-input
          type="password"
          :showDelBtn="true"
          :showChangeType='true'
          @blur="verifyRepass(rePassword)"
          v-model="rePassword"
          name="password_confirmation"
          :placeholder="$t('m.register.passwordConfirmPlaceholder')"
          :showErrMsg="showRepassErr"
          :errMessage="repassErr"
          @change="changeConfirm"
        ></v-input>
      </div>
      <div class="input-box">
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
      </div>
      <br/>
      <div id="captchaBox"></div>
    </div>
    <div class="agreement regular">
      <v-checkbox
        v-model="checked"
        class="checkbox"
      ></v-checkbox>
      <span class="fm">
        <b @click='()=>{this.checked = !this.checked}'>{{$t('m.register.read')}}</b>
        <a
          href="javascript:;"
          @click='()=>{this.isShowClause=true}'
        > {{$t('m.register.clause')}}</a>
      </span>
    </div>
    <div class="recaptcha">
      <v-recaptcha
        ref='recaptcha'
        @error='recaptchaError'
        @recaptchaSuccess='validateSuccess'
      ></v-recaptcha>
    </div>
    <v-btn
      id="submit"
      class="btn fm"
      :type='btnType'
      @click="submit"
    >{{btnText}}</v-btn>
    <router-link :to="$i18nRoute({name: 'signin'})">
      <div class="login-btn">{{$t('m.home.login')}}</div>
    </router-link>
    <div
      class="limit-err"
      v-if='limitErr'
    >{{limitErr}}</div>
    <div
      class="limit-err"
      v-if="captchaErr"
    >{{captchaErr}}</div>
    <v-clause
      :visiable='isShowClause'
      @close='()=>{this.isShowClause= false}'
    ></v-clause>
  </div>
</template>

<script>
import VRecaptcha from '@/components/vue-recaptcha'
import VClause from './components/clause'
import getQueryString from '@/utils/getQueryString'
import VPopover from '@/components/popover'
import VInput from '@/components/input-mobile.vue'
import VCheckbox from '@/components/switch'
import VBtn from '@/components/btn'
import registerMixins from '@/mixins/register.js'
export default {
  mixins: [registerMixins],
  components: {
    VPopover,
    VInput,
    VCheckbox,
    VClause,
    VBtn,
    VRecaptcha,
  },
  data() {
    return {
      isShowClause: false,
    }
  },
  methods: {
    // 邀请活动
    rewardsActive() {
      if (getQueryString('aff')) {
        localStorage.setItem('aff', getQueryString('aff'))
      } else {
        if (localStorage.getItem('aff')) {
          let url = `${location.href}?aff=${localStorage.getItem('aff')}`
          window.history.pushState({}, 0, url)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.bg_img {
  display: block;
  margin: 0 auto;
  width: 345px;
  height: 150px;
}

.logo {
  background: url(../../assets/images/logo-small.png) no-repeat;
  display: block;
  width: 109px;
  height: 28px;
  background-size: 100% 100%;
  margin: 15px auto 0;
}

.content {
  margin: 25px auto 0;
}

.header {
  width: 100%;
  color: $color-3;
  margin: 30px auto 0;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(155, 155, 155, 0.2);
}

.header p {
  font-size: 18px;
  text-align: center;
}

.form {
  margin: 69px auto 0;
  width: 315px;

  &.active {
    margin: 30px auto 0;
  }
}

.input-box {
  height: 70px;
}

.login-btn {
  width: 315px;
  color: #97a5b3;
  font-size: 15px;
  text-align: right;
  margin: 20px auto 0;
}

input.error {
  border: 1px solid #ee4343;
}

.error-tip {
  line-height: 15px;
  color: #ee4343;
  font-size: 13px;
  display: block;
  margin-top: 5px;
}

.limit-err {
  font-size: 12px;
  text-align: center;
  margin-top: 25px;
  color: red;
}

.btn {
  margin: 27px auto 0 !important;
  width: 315px;
  text-align: center;
}

.agreement {
  width: 315px;
  margin: 12px auto 0;
  text-align: left;
  font-size: 14px;
  white-space: nowrap;
  .checkbox {
    display: inline;
    vertical-align: middle;
  }
  a {
    color: #e06f0d;
    text-decoration: none;
  }
  b {
    color: $color-6;
    font-weight: normal;
  }
  span {
    vertical-align: middle;
  }
}

.recaptcha {
  width: 315px;
  margin: 0 auto;
}
</style>
