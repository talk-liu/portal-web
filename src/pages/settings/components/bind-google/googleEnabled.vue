<template>
  <div class='cmp-wrap'>
    <div style='margin-bottom:10px;'>
      <div
        v-for='(v,i) in inputArray'
        :key='i'
        class="input-wrap"
      >
        <v-input
          :type="v.type"
          width="300"
          v-model="v.vmodel"
          @blur="blur(v.key)"
          :showErr="v.msg"
          @change="(value)=>{v.msg = '';}"
        ></v-input>
        <div class="clearfix">
          <label>{{v.label}}</label>
          <p
            v-if="v.msg"
            class="warning"
          >{{v.msg}}</p>
        </div>
      </div>
    </div>
    <v-btn
      :type="btnType"
      class="btn"
      width="300"
      :disabled="btnType === 'default'"
      @click="enablingGoogle()"
    >{{bindText}}</v-btn>
  </div>
</template>

<script>
// todo: to fixed btn default can still click
import VBtn from '@/components/btn'
import VInput from '@/components/input-normal'
import { isPasswords } from '@/utils/verify'
import isbind from '@/mixins/isbind'
import { mapActions } from 'vuex'
import serviceError from '@/utils/service-error'

export default {
  data() {
    return {
      bindText: this.$t('m.bindPhone.googleEnabled'),
      codeWarn: '',
      cantSubmit: true,
      inputArray: [
        {
          type: 'password',
          key: 'password',
          vmodel: '',
          msg: '',
          label: this.$t('m.settings.password'),
        },
        {
          type: 'number',
          key: 'googleCode',
          vmodel: '',
          msg: '',
          label: this.$t('m.bindPhone.googleCode'),
        },
      ],
    }
  },
  mixins: [isbind],
  components: {
    VBtn,
    VInput,
  },
  created() {
    this.isBind()
  },
  methods: {
    ...mapActions('settings', ['appFactor']),
    async enablingGoogle() {
      if (!this.cantSubmit) return
      this.cantSubmit = false
      this.btnText = this.$t('m.btnText.submitting')
      const res = await this.appFactor({
        auth_action: 'bind',
        otp: this.inputArray[1].vmodel,
        password: this.inputArray[0].vmodel,
      })
      if (res.data.appFactor && res.data.appFactor.result.result === 'success') {
        this.$notify.success(this.$t('m.successMessage.bindSuccess'))
        this.goHref()
      } else {
        this.cantSubmit = true
        this.btnText = this.$t('m.bindPhone.googleEnabled')
        if (res.errors[0].errorCode === 2015) {
          this.inputArray[0].msg = serviceError(res)
        }
        if (res.errors[0].errorCode === 2022) {
          this.inputArray[1].msg = serviceError(res)
        }
      }
    },
    goHref() {
      let href = '/settings'
      if (sessionStorage.getItem('two_factors_redirect_to')) {
        href = sessionStorage.getItem('two_factors_redirect_to')
        sessionStorage.removeItem('two_factors_redirect_to')
      }
      setTimeout(() => {
        location.href = href
      }, 1500)
    },
    blur(k) {
      this.inputArray.forEach(v => {
        switch (k) {
          case 'password':
            if (!isPasswords(v.vmodel) && v.key === k) {
              v.msg = this.$t('m.errMessages.passwordErr')
            }
            break
        }
      })
    },
    showBtnType() {
      let result = true
      this.inputArray.forEach(v => {
        switch (v.key) {
          case 'googleCode':
            if (v.vmodel.length < 6) {
              result = false
            }
            break
          case 'password':
            if (!isPasswords(v.vmodel)) {
              result = false
            }
            break
        }
      })
      return result
    },
  },
  computed: {
    btnType() {
      return this.showBtnType() ? 'primary' : 'default'
    },
  },
}
</script>

<style lang='scss' scoped>
@import '../../../../assets/scss/variable.scss';

.cmp-wrap {
  width: 300px;
  margin: 0 auto;
  .btn {
    margin-top: 28px;
  }
  .input-wrap {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 0;
    position: relative;
    label {
      // margin-left: 42px;
      font-size: 12px;
      color: $color-assist2;
      float: left;
      font-weight: 500;
    }
    .send-wrap {
      display: inline-block;
      margin-left: 14px;
    }
    .warning {
      position: absolute;
      right: 0;
      top: 53px;
      text-align: right;
      font-size: 12px;
      color: #ee4343;
      width: 300px;
      background: #ffffff;
      height: 30px;
    }
    .warn {
      border-color: #ee4343;
    }
  }
}
</style>
