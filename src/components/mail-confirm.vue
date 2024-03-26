<template>
  <div
    class="confirm-mail-box"
    :class="{en:$fifth.lang!=='zh-CN'}"
  >
    <div>
      <h4 class="semi-bold">{{email}}</h4>
    </div>
    <div class="semi-bold">
      {{content}}
    </div>
    <v-input
      class='email-code'
      type="password"
      v-model="emailCode"
      :errMessage='errMessage'
      :showErrMsg='errMessage'
      :placeholder="$t('m.login.inputSmsCode')"
    ></v-input>
    <div
      v-if="type === 'hasFooter'"
      class="confirm-footer f13"
    >
      <p>{{$t('m.funds.withdrawRemind')}}</p>
      <ul>
        <li>{{$t('m.funds.withdrawRemind1')}}</li>
        <li>{{$t('m.funds.withdrawRemind2')}}</li>
        <li>{{$t('m.funds.withdrawRemind3')}}
          <span class="orange-color semi-bold">support@riostox.com</span>
        </li>
      </ul>
    </div>

    <div
      v-else-if="type==='withdraw'"
      class="withdraw-box"
    >
      <a
        :href="href"
        @click="reWithdraw"
        class="retry-btn"
        :class="{disable: !canClick}"
      >
        <i class="iconfont icon-zhongfayoujian"></i>
        {{$t('m.activation.resend')}}
        <span v-if="!canClick">({{time}})</span>
      </a>
      <p>{{$t('m.funds.withdrawRemind2')}}</p>
      <p>{{$t('m.funds.withdrawRemind3')}}
        <span class="orange-color semi-bold">support@riostox.com</span>
      </p>
    </div>

    <div v-else>
      <a
        :href="href"
        @click="resend"
        class="retry-btn"
        v-if="!retry"
      >
        <i class="iconfont icon-zhongfayoujian"></i>
        {{$t('m.activation.resend')}}
      </a>

      <a
        href="javascript:;"
        class="retry-btn"
        v-else
      >
        <i class="iconfont icon-zhongfayoujian"></i>
        {{$t('m.activation.sent')}}
      </a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import getQueryString from '@/utils/getQueryString'
import VInput from '@/components/input'
export default {
  props: ['content', 'href', 'type', 'id'],
  data() {
    return {
      retry: false,
      canClick: true,
      time: 59,
      emailCode:'',
      errMessage: ''
    }
  },
  components:{
    VInput
  },
  mounted() {
    if (getQueryString('retry') === 'true') {
      this.retry = true
    }
  },
  computed: {
    ...mapState('currentUser', ['currentUser']),
    email() {
      return this.currentUser && this.currentUser.email
    },
  },
  watch: {
    mailNotice() {
      this.mailNotice && this.$notify.warn(this.$t('m.errMessages.laterTry'))
    },
  },
  methods: {
    ...mapActions('loginRegister', ['resendWithdrawEmail']),
    async resend() {
      if (this.type && this.type === 'ajax') {
        this.resendWithdrawEmail(this.id)
      }
    },
    reWithdraw() {
      if (this.canClick) {
        this.canClick = false
        this.$emit('reWithdraw')
        this.downTime()
      }
    },
    downTime() {
      const t = setInterval(() => {
        if (this.time <= 0) {
          clearInterval(t)
          this.time = 59
          this.canClick = true
        } else {
          this.time--
        }
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

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
</style>
