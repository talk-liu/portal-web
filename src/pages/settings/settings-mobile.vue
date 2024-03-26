<template>
  <div class='my-info'>
    <div class='info-personal'>
      <div>
        <div>
          <p class="email fb">
            {{currentUser.email}}
            <a :href="this.$t('m.home.adFourHref')"><img
              src="../../assets/images/diamon.png"
              v-if="isMiner"
            ></a>
          </p>
        </div>
        <template v-if='loginDataNow'>
          <div class="last-login-time">
            <span class="fm">{{$t('m.settings.lastLoginTime')}}：</span>
            <span>{{dayjs(loginDataNow.updated_at).format('YYYY.MM.DD HH:mm:ss')}}</span>
          </div>
          <div class="country">
            <span v-if='loginDataNow.country || loginDataNow.city'>
              <i class="iconfont icon-dingwei"></i>
              {{loginDataNow.city}}
            </span>
          </div>
        </template>
      </div>
    </div>
    <div class='info-auth'>
      <div class="account-item">
        <div class="account-name fb">{{$t('m.personalMenu.identityAuth')}}</div>
        <div
          class="account-enabled"
          v-if="idAuth === 'verified'"
        >
          <i
            style='color:#3bb46e;'
            class='iconfont icon-enabled icon-gouxuanxuanzhong2'
          ></i>&nbsp;{{$t('m.settings.authented')}}
        </div>
        <div
          v-else
          class="account-enabled"
        >
          <span v-if="idAuth === 'unverified'">{{$t('m.settings.unauthented')}}</span>
          <span v-if="idAuth === 'verifying'">{{$t('m.settings.authentingh5')}}</span>
          <span v-if="idAuth === 'rejected'">{{$t('m.settings.failed')}}</span>
        </div>
      </div>
      <div
        v-for='(v,i) in dataSource'
        :key='i'
        class="account-item"
      >
        <div class="account-name fb">{{v.name}}</div>
        <div
          class="account-enabled"
          v-if="v.enabled && v.showBtn !==false"
        >
          <i
            style='color:#3bb46e;'
            class='iconfont icon-enabled icon-gouxuanxuanzhong2'
          ></i> {{v.text[1]}}
        </div>
        <div
          v-else-if="v.showBtn !==false"
          class="account-enabled"
        >{{v.text[0]}}</div>
      </div>
    </div>
    <div
      class='telegram-bind'
      v-if="!telegramIsBind"
    >
      <div class="item">
        <p>
          {{$t('m.settings.telegramRelateDesc')}}
        </p>
        <div
          class="btn"
          @click='toBindTelegram'
        >{{$t('m.settings.relateTelegram')}}</div>
      </div>
    </div>
    <div
      class="logout"
      @click='logout'
      v-if="currentUser"
    >
      {{$t('m.personalMenu.logout')}}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import VDialog from '@/components/dialog'
import VBtn from '@/components/btn'
import bindTG from '@/mixins/settings-telegram-bind'
import dayjs from 'dayjs'
import Alert from '@/utils/alert'

export default {
  mixins: [bindTG],
  components: {
    VDialog,
    VBtn,
  },
  data() {
    return {
      copySuccess: false,
    }
  },
  created() {
    this.telegramBindInfo()
    document.title = this.$t('m.pageTitle.settings')
  },
  mounted() {
    this.listenerBindChange()
  },
  beforeDestroy() {
    this.removeListenerBindChange()
  },
  computed: {
    ...mapGetters(['isMiner']),
    ...mapState('currentUser', ['currentUser']),
    ...mapState('withdraw', ['withdrawMe']),
    idAuth() {
      if (this.currentUser) {
        return this.currentUser.id_document_state
      }
    },
    loginData() {
      if (this.withdrawMe) {
        return this.withdrawMe.latest_histories
      }
    },
    loginDataNow() {
      if (this.loginData && this.loginData.length > 0) {
        return this.loginData[0]
      } else {
        null
      }
    },
    dataSource() {
      if (this.withdrawMe) {
        const { sms_two_factor, email_two_factor } = this.withdrawMe
        return [
          {
            name: this.$t('m.settings.phoneVerification'),
            enabled: sms_two_factor,
            text: [this.$t('m.settings.notEnabled'), this.$t('m.settings.enabled')],
          },
          {
            name: this.$t('m.settings.emailVerification'),
            enabled: email_two_factor,
            text: [this.$t('m.settings.notEnabled'), this.$t('m.settings.enabled')],
          },
          {
            name: this.$t('m.settings.relateTelegram'),
            enabled: this.telegramIsBind,
            showBtn: this.telegramIsBind !== null, // 给予按钮三种状态 1：null状态载入中，2：false ,3:true
            text: [this.$t('m.settings.notEnabled'), this.$t('m.settings.enabled')],
          },
        ]
      }
    },
  },
  methods: {
    ...mapActions('loginRegister', ['signout']),
    dayjs,
    logout() {
      Alert({
        title: this.$t('m.personalMenu.logoutTip'),
        confirm: () => {
          this.signout()
        },
        cancel: () => {},
        cancelText: this.$t('m.btnText.cancel'),
        confirmText: this.$t('m.btnText.confirm'),
      })
    },
  },
}
</script>

<style lang="scss">
.dialog-wrap {
  .dialog-content {
    height: 100px !important;
  }
}

.my-info {
  padding-bottom: 60px;
  .info-personal {
    color: #ffffff;
    margin: 0 auto;
    background: url(https://i.riostox.com/i/25/254678427cc00e3d8936068183a18c82.png) no-repeat;
    width: 335px;
    height: 160px;
    padding-top: 27px;
    padding-left: 30px;
    border-radius: 10px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
    background-size: 100% 100%;
    margin-top: 10px;
    .email {
      font-size: 24px;
      img {
        width: 22px;
        height: 20px;
        vertical-align: middle;
      }
    }
    .last-login-time {
      margin: 12px 0;
    }
    .icon-more {
      position: absolute;
      right: 25px;
      top: 20px;
    }
    .country {
      margin-top: 15px;
    }
  }
  .info-auth {
    .account-item {
      text-align: center;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      width: 335px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      height: 60px;
      &:last-child {
        border: none;
      }
      .account-name {
        font-size: 17px;
        .account-enabled {
          margin-top: 3px;
          color: $color-9;
          font-size: 13px;
        }
      }
    }
  }
  .telegram-bind {
    width: 335px;
    margin: 10px auto 0;
    text-align: center;
    .item {
      position: relative;
      margin: 0 auto;
      width: 200px;
    }
    .btn {
      margin: 0 auto;
      margin-top: 10px;
      width: 160px;
      height: 34px;
      text-align: center;
      color: #97a5b3;
      font-size: 15px;
      line-height: 20px;
      border: 1px solid #97a5b3;
      border-radius: 5px;
      padding: 7px 0;
      font-weight: bold;
      box-shadow: 0 5px 7px rgba(0, 0, 0, 0.05);
    }
    p {
      color: $color-9;
      font-size: 12px;
      &.error {
        color: #da4343;
      }
    }
    .copy-success {
      text-align: right;
      color: $color-assist5;
      font-size: 12px;
      opacity: 0;
      position: absolute;
      right: 10px;
      bottom: 10px;
      &.animate {
        animation: fade 1s ease-in-out;
      }
      i {
        vertical-align: middle;
      }
    }

    @keyframes fade {
      from {
        transform: translateY(0);
        opacity: 0.2;
      }
      to {
        transform: translateY(-15px);
        opacity: 1;
      }
    }
  }
  .bottom-label {
    text-align: center;
    display: block;
    width: 100%;
    .icon-home {
      font-size: 20px;
    }
  }
  .logout {
    border-top: 1px solid #eeeeee;
    margin: 10px auto 0;
    height: 45px;
    line-height: 45px;
    font-size: 15px;
    background: $color-255;
    z-index: $zindex-newspace;
    text-align: center;
    font-weight: bold;
    position: fixed;
    bottom: 0;
    width: 100%;
    color: $color-error;
  }
}
</style>
