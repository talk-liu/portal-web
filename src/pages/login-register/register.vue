<template>
  <div
    class="pc_register_bgs"
    :style="{background:`url(${this.pcBgUrl})`,backgroundSize:'cover',backgroundPosition:'center' }"
  >
    <div
      class="register-page"
      :class="{active:this.active && this.pcBgUrl}"
    >
      <!-- 注册 -->
      <v-box-new
        class="bg"
        :title="$t('m.register.title')"
        :active="this.active && this.pcBgUrl"
      >
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
            <!-- 输入a码 -->
            <!-- <v-input type="text" @blur="verifyCode(invitation_token)" v-model="invitation_token" name="invitation_token" :placeholder="$t('m.register.codePlaceholder')" :showErrMsg="showCodeErr" :errMessage="codeErr" @change="changeCode"></v-input> -->
          </div>
          <div class="checkbox-wrap">
            <v-checkbox-new v-model="checked">
              {{$t('m.register.read')}}
              <router-link
                :to="$i18nRoute({path: '/documents/agreement'})"
                target="_blank"
                class="protocol-title"
              >{{$t('m.register.clause')}}</router-link>
            </v-checkbox-new>
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
          <!--          <div class="menu-wrap">-->
          <!--            <span>{{$t('m.register.isRegister')}}?</span>-->
          <!--            <router-link :to="$i18nRoute({name: 'signin'})">-->
          <!--              <span>{{$t('m.register.login')}}</span>-->
          <!--            </router-link>-->
          <!--          </div>-->
          <div
            class="limit-err"
            v-if="limitErr"
          >{{limitErr}}</div>
          <div
            class="limit-err"
            v-if="captchaErr"
          >{{captchaErr}}</div>
        </div>
      </v-box-new>
    </div>
  </div>
</template>

<script>
import VRecaptcha from '@/components/vue-recaptcha'
import VInput from '@/components/input.vue'
import VBoxNew from '@/components/box-new.vue'
import VBtn from '@/components/btn'
import VCheckboxNew from '@/components/checkbox-new'
import registerMixins from '@/mixins/register.js'
import registerMobile from './register-mobile'

export default {
  mixins: [registerMixins],
  components: {
    VInput,
    VBoxNew,
    VCheckboxNew,
    VBtn,
    VRecaptcha,
    registerMobile,
  }
}
</script>

<style  lang="scss">
.pc_register_bgs {
  overflow-y: hidden;
  width: 480px;
  background-color: #ffffff;
}

.register-page {
  margin: 0 auto;
  height: 630px;
  width: 480px;
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
  .bg {
    background-color: #ffffff;
  }
  .content-wrap {
    padding: 20px 100px;
    background-color: #ffffff;
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
    width: 300px;
    margin-top: 25px;

    .v-input:not(:nth-of-type(1)) {
      margin-top: 25px;
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
