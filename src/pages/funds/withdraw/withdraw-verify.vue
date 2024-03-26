<template>
  <div class="withdraw-verify">
    <div class="withdraw-verify_top">
      <div class="icon"></div>
      <h5>{{$t('m.verifyTitle.emailTitle')}}</h5>
      <p>{{$t('m.funds.emailPageForh5.hasSend')}}{{currentUser && currentUser.email}}{{$t('m.funds.emailPageForh5.enterToComplete')}}</p>
      <input-code @success="submitCode" @resend="resendCode" @change="codeChange" ref="inputCode" :placeholder="$t('m.placeholders.verifyCode')"></input-code>
      <div class="error" v-if="withdrawVerifyError">{{withdrawVerifyError}}</div>
    </div>
    <div class="recharge-bit_footer clearfix">
      <div class="hint-wrap">
        <p class="title color-text fb">
          {{$t('m.funds.reminder')}}
        </p>
        <ul class="hint-list fm">
          <li>
            {{$t('m.funds.emailPageForh5.noWayToRiostox')}}
          </li>
          <li>
            {{$t('m.funds.emailPageForh5.wetherToSpam')}}
          </li>
          <li>
            {{$t('m.funds.emailPageForh5.contactEmail')}}
          </li>
        </ul>
      </div>
    </div>
    <v-dialog :visible="withdrawSuccessShow" class="withdraw-dialog">
      <div class="withdraw-success-wrap">
        <img src="../../../assets/images/withdraw-icon.png" />
        <div class="success-text">
          <p class="title">{{$t('m.funds.withdrawSuccessTitle')}}</p>
          <p class="content">
            {{$t('m.funds.withdrawSuccessText1')}}
            <span @click="goHistory">
              {{$t('m.funds.withdrawSuccessText2')}}
            </span>
            {{$t('m.funds.withdrawSuccessText3')}}
          </p>
        </div>
        <v-btn class="hide-btn" type="primary" @click='closeMobileSuccess'>{{$t('m.btnText.confirmBtn')}}</v-btn>
      </div>
    </v-dialog>
  </div>
</template>
<script>
import withdrawMixin from './withdraw-mixin'
import InputCode from '@/components/input-code'
export default {
  mixins: [withdrawMixin],
  components: {
    InputCode
  },
  created() {
    if (this.type !== 'h5') {
      this.$router.replace(this.$i18nRoute({
        name: 'funds'
      }))
    }
    this.withdrawId = this.$route.params.id
  },
}
</script>
<style scoped lang="scss">
  .withdraw-verify {
    .withdraw-verify_top {
      margin: 20px auto 0;
      width: 275px;
      .icon {
        background: url(../../../assets/images/email.png) no-repeat;
        width: 104px;
        height: 77px;
        background-size: 100% 100%;
        margin: 0 auto;
      }
      .error {
        color: #ee4343;
        margin-top: 10px;
        text-align: left;
        font-size: 14px;
      }
      h5 {
        font-size: 24px;
        color: #333333;
        margin-top: 35px;
        text-align: center;
        font-weight: normal;
      }
      p {
        color: #777777;
        font-size: 12px;
        margin: 15px auto 37px;
        line-height: 21px;
      }
    }
  }

  .recharge-bit_footer {
    margin: 100px auto 0;
    font-size: 14px;
    width: 315px;
    padding-top: 30px;
    border-top: 1px solid #e6e6e6;
    ul {
      margin-top: 10px;
    }
    .hint-list {
      font-size: 12px;
      color: #999999;
      max-width: 400px;
      li {
        margin-bottom: 5px;
        list-style: none;
        line-height: 17px;
        span {
          padding-right: 6px;
        }
      }
    }
  }

  .withdraw-dialog {
    display: flex;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    background: #ffffff;
    justify-content: center;
  }

  .withdraw-success-wrap {
    img {
      width: 155px;
      height: 100px;
      margin: 0 auto;
      display: block;
    }
    .success-text {
      text-align: center;
      .title {
        color: #3bb46e;
        font-size: 24px;
        margin-top: 50px;
      }
      .content {
        margin-top: 10px;
        color: #999999;
        font-size: 14px;
        span {
          color: #e06f0d;
        }
      }
    }
    .hide-btn {
      width: 315px;
      margin: 110px auto 0;
    }
  }
</style>
