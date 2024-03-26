<template>
  <div class="change-password_component">
    <div class="history-wrap">
      <v-history-header
        :level1="[{name:$t('m.changePasswords.title')}]"
        :level2="$t('m.changePasswords.changePasswords')"
      ></v-history-header>
    </div>

    <!-- 修改密码表单 -->
    <div class="change-form">
      <form
        class="simple_form form-horizontal"
        novalidate="novalidate"
        id="edit_identity_1"
        action="/identity.1"
        accept-charset="UTF-8"
        method="post"
        name="changePassForm"
      >
        <div class="input-wrap">
          <input
            type="password"
            :placeholder="$t('m.register.passwordPlaceholder')"
            v-model="oldPass"
            name="identity[old_password]"
            autocomplete="off"
            :class="{warn:showOldWarn}"
            @blur="verifyPass(oldPass, 'showOldWarn')"
            @input="verifyPass(oldPass, 'showOldWarn')"
            @focus="verifyPass(oldPass, 'showOldWarn')"
          >
          <div class="clearfix">
            <label>{{$t('m.changePasswords.oldPassword')}}</label>
            <p
              class="warning"
              v-if="showOldWarn"
            >{{passErr}}</p>
          </div>
        </div>
        <div class="input-wrap">
          <input
            type="password"
            :placeholder="$t('m.register.passwordPlaceholder')"
            v-model="newPass"
            @blur="verifyPass(newPass, 'showNewWarn')"
            :class="{warn:showNewWarn}"
            name="identity[password]"
            @input="verifyPass(newPass, 'showNewWarn')"
            @focus="verifyPass(newPass, 'showNewWarn')"
          >
          <div class="clearfix">
            <label>{{$t('m.changePasswords.newPassword')}}</label>
            <p
              class="warning"
              v-if="showNewWarn"
            >{{passErr}}</p>
          </div>
        </div>
        <div class="input-wrap">
          <input
            type="password"
            :placeholder="$t('m.register.passwordPlaceholder')"
            v-model="repeatPass"
            @blur="verifyConf(repeatPass)"
            :class="{warn:showConfWarn}"
            name="identity[password_confirmation]"
            @input="()=>{this.showConfWarn=false}"
          >
          <div class="clearfix">
            <label>{{$t('m.changePasswords.confirmPassword')}}</label>
            <p
              class="warning"
              v-if="showConfWarn"
            >{{passErr}}</p>
          </div>
        </div>

        <div class="change-btn">
          <v-btn
            :type="btnType"
            :disabled="btnType === 'default'"
            @click="updatePassword"
          >{{$t('m.changePasswords.modifyPassword')}}</v-btn>
        </div>
      </form>
      <p class="err-color">{{$t('m.errMessages.changeWithErr')}}</p>
    </div>

    <v-dialog
      v-if='showDialog'
      :visible="showDialog"
      width="300px"
      @close="close"
    >
      <v-verify
        :type="verifyType"
        @close="close"
        :verifyList='twoFactorsList'
        disabled=true
        @success="verifySuccess"
        methods="patch"
        noFactors="true"
        :acceptWarn="sendWarn"
        @clear="()=>{this.sendWarn=''}"
      ></v-verify>
    </v-dialog>

    <!-- 选择认证弹框 -->
    <!-- <v-dialog :visible="showAuthDialog">
            <v-authentic @close="closeAuth" @nextStep="showVerifyDialog"></v-authentic>
    </v-dialog> -->

  </div>
</template>

<script>
import VBtn from '@/components/btn'
import VVerify from '@/components/verify'
import VDialog from '@/components/dialog'
import VHistoryHeader from '@/components/history-header-plus'
import VBtnInput from '@/components/btn-input'
import { isPasswords } from '@/utils/verify'
import factors from '@/mixins/factors'
import { mapState, mapActions } from 'vuex'
import serviceError from '@/utils/service-error'

export default {
  data() {
    return {
      oldPass: '',
      newPass: '',
      repeatPass: '',
      showNewWarn: false,
      showConfWarn: false,
      showDialog: false,
      showOldWarn: '', // TODO: window.gon.errMessage
      phonenumber: '',
      showPasswordForm: false,
      sendWarn: '',
      factorType: '',
      factorOtp: '',
      // authToken: document.getElementById('authenticity_token').value,
    }
  },
  mixins: [factors],
  components: {
    VBtn,
    VVerify,
    VDialog,
    VHistoryHeader,
    VBtnInput,
  },
  mounted() {
    this.bindEvent()
  },
  computed: {
    ...mapState('withdraw', ['withdrawMe']),
    btnType() {
      return this.oldPass && this.newPass && this.repeatPass && this.verifyConf(this.repeatPass) ? 'primary' : 'default'
    },
  },
  methods: {
    ...mapActions('settings', ['resetPassword']),
    // 验证密码格式
    verifyPass(val, ele) {
      if (!isPasswords(val)) {
        this[ele] = true
        this.passErr = this.$t('m.changePasswords.passwordErr')
        return
      }
      if (val.length > 24) {
        this.passErr = this.$t('m.errMessages.passwordToLongErr')
        this[ele] = true
        return
      }
      this[ele] = false
      return true
    },

    // 验证密码是否一致
    verifyConf(val) {
      if (!isPasswords(val)) {
        this.showConfWarn = true
        this.passErr = this.$t('m.errMessages.passwordErr')
        return false
      } else if (val.length > 24) {
        this.showConfWarn = true
        this.passErr = this.$t('m.errMessages.passwordToLongErr')
        return false
      }
      if (val && this.newPass !== val) {
        this.showConfWarn = true
        this.passErr = this.$t('m.changePasswords.repeatPasswordErr')
        return false
      }
      return true
    },

    confirmUpdate() {
      this.showPasswordForm = true
    },

    bindEvent() {
      document.addEventListener('click', e => {
        if (e.target.tagName.toLowerCase() !== 'input') {
          if (this.oldPass === '') {
            this.showOldWarn = false
          }
          if (this.newPass === '') {
            this.showNewWarn = false
          }
        } else {
          if (e.target.name === 'identity[password]') {
            if (this.oldPass === '') {
              this.showOldWarn = true
              return
            }
          }
          if (e.target.name === 'identity[password_confirmation]') {
            if (this.oldPass === '') {
              this.showOldWarn = true
            }
            if (this.newPass === '') {
              this.showNewWarn = true
            }
          }
        }
      })
    },

    // 提交表单更新密码
    async updatePassword() {
      if (this.verifyPass(this.newPass) && this.verifyConf(this.repeatPass) && this.oldPass !== '') {
        if (!this.withdrawMe.two_factors) {
          const res = await this.resetPassword({
            old_password: this.oldPass,
            password: this.newPass,
            password_confirmation: this.repeatPass,
          })
          if (res.data.resetPassword && res.data.resetPassword.result.result) {
            setTimeout(() => {
              this.$notify.success(this.$t('m.updatePassword.success'))
              location.href = '/settings'
            }, 1500)
          } else {
            this.showOldWarn = true
            this.passErr = serviceError(res)
          }
          return
        }
        this.factors()
      }
    },
    async verifySuccess({ code = '', type = '' }) {
      const res = await this.resetPassword({
        otp: code,
        type,
        old_password: this.oldPass,
        password: this.newPass,
        password_confirmation: this.repeatPass,
      })
      if (res.data.resetPassword && res.data.resetPassword.result.result) {
        setTimeout(() => {
          this.$notify.success(this.$t('m.updatePassword.success'))
          location.href = '/settings'
        }, 1500)
      } else {
        this.sendWarn = serviceError(res)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.change-password_component {
  .history-wrap {
    padding: 20px 35px 0;
  }

  .change-form {
    margin: 70px auto;
    width: 380px;

    form {
      margin: 0 auto;
      width: 300px;
    }

    .input-wrap {
      margin-top: 40px;

      .code-input {
        input {
          width: 180px;
        }
        button {
          margin: 0;
          width: 110px;
          height: 34px;
          border-radius: 2px;
          border: 1px solid $color-line;
          color: $color-assist3;
          cursor: pointer;

          &:hover {
            color: $color-text;
            background-color: $color-primary;
            border-color: $color-primary;
          }
        }
      }

      input {
        width: 100%;
        height: 34px;
        border: 1px solid #dce0eb;
        text-indent: 20px;

        &:focus {
          border-color: $color-primary;
        }
      }

      div {
        margin-top: 10px;
      }

      label {
        font-size: 12px;
        color: $color-assist2;
        float: left;
        font-weight: 500;
      }
      .warning {
        float: right;
        font-size: 12px;
        color: #ee4343;
      }
      .warn {
        border-color: #ee4343;
      }
    }

    .change-btn {
      margin-top: 48px;
    }
  }
  input {
    font-size: 12px;
  }
  .err-color {
    margin-top: 10px;
    color: $color-error;
    font-size: 12px;
    text-align: center;
  }
}
</style>
