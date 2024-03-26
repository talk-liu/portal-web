<template>
  <div
    class="content"
    v-if="$fifth.isCn"
  >
    <div class="success-wrap">
      <span class="icon"></span>
      <p class="tip fb">{{email}}</p>
    </div>
    <div class="email-tip fm">
      {{$t('m.activation.hadSendToEmailCode')}}
      <v-input
        class='email-code'
        type="password"
        v-model="emailCode"
        :errMessage='errMessage'
        :showErrMsg='errMessage'
        :placeholder="$t('m.login.inputSmsCode')"
      ></v-input>
    </div>
    <div
      @click='reWithdraw'
      class="retry-btn fb"
    >
      {{$t('m.activation.resend')}}
    </div>
    <div class="footer">
      <div class="item">
        <div class="icon telegram"></div>
        <div class="fm">
          <p class="title fm"><b class="semi-bold">{{$t('m.slideTg')}}</b></p>
          <p class="subtitle fm"><a href="https://t.me/riostox_cn"><b class="semi-bold">Riostox</b>{{$t('m.register.officialChineseGroup')}}</a></p>
        </div>
      </div>
      <!-- 官方中文群已关闭-->
      <!-- <div class="item">
        <div class="icon wx"></div>
        <div class="fm">
          <p class="fm title">加官方账号入群</p>
          <p class="subtitle semi-bold">riostox_cn</p>
        </div>
      </div> -->
    </div>
  </div>
  </div>
</template>

<script>
import activationMixin from './activation-mixin'
import VInput from '@/components/input'

export default {
  mixins: [activationMixin],
  components: {
    VInput,
  },
}
</script>

<style lang="scss">
.footer {
  margin: 105px auto 0;
  text-align: center;
  display: flex;
  .item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    // width: 234rem;
    position: relative;
    &:before {
      position: absolute;
      left: 0;
      top: 5px;
      content: '';
      width: 1px;
      height: 21px;
      background: rgba(179, 179, 196, 0.5);
    }
    &:first-child:before {
      display: none;
    }
    .title {
      color: #97a5b3;
      font-size: 10px;
    }
    p {
      margin: 0;
      text-align: left;
    }
    .subtitle {
      color: #8394a5;
      font-size: 10px;
    }
    .icon {
      display: block;
      width: 30px;
      height: 26px;
      margin-right: 10px;
    }
    a {
      color: #5f87e0;
    }
    .telegram {
      background: url(../../../assets/images/success-telegram.png) no-repeat;
      background-size: contain;
    }
    .wx {
      background: url(../../../assets/images/success-wx.png) no-repeat;
      background-size: contain;
    }
  }
}

.success-wrap {
  padding-top: 70px;
}

.success-wrap .icon {
  background: url(../../../assets/images/success-mobile.png) no-repeat;
  display: block;
  margin: 0 auto;
  width: 80px;
  height: 80px;
}

.success-wrap p {
  margin-top: 20px;
  color: #27cf47;
  font-size: 24px;
  text-align: center;
}

.email-tip {
  font-size: 15px;
  width: 298px;
  margin: 60px auto 0;
  color: $color-6;
  line-height: 25px;
  text-align: center;
}

.retry-btn {
  margin: 27.5px auto;
  display: block;
  width: 200px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #bdc7d1;
  color: #97a5b3;
  text-align: center;
  font-size: 18px;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.02) 0 4px 4px 0;

  i {
    font-size: 20px;
    vertical-align: middle;
  }
}

.en {
  .success-wrap {
    padding-top: 60px;
  }
  .email-tip {
    width: 340px;
    margin-top: 30px;
  }
  .retry-btn {
    margin-top: 60px;
  }
  .footer {
    margin-top: 50px;
  }
}
</style>
