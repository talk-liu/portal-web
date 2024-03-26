<template>

  <div class="create-key_component">
    <div class="create-key" :class="{haveApi: tokens.length>0}">
      <i class="iconfont icon-api" v-if="tokens.length === 0"></i>
      <form class="simple_form form-horizontal" :class="{form:tokens.length > 0}" novalidate="novalidate" id="new_api_token"  accept-charset="UTF-8" method="post" name="newKeyForm">
        <v-input v-model="apiKey" :placeholder="$t('m.createKey.keyPlaceholder')" require=true  autocomplete="off" :showErrMsg="errorMessage" ref="apiKeyInput"></v-input>
        <p class="remind error" v-if="errorMessage">{{$t('m.createKey.errorMessage')}}</p>
        <p class="remind" v-else>{{$t('m.createKey.createKeyTip')}}</p>
        <input type="hidden" class="two_factor_auth_otp" v-model="factorCode">
        <input type="hidden" class="two_factor_auth_type" v-model="factorType">
        <v-btn :type="createBtnType" @click="createNewKey">{{$t('m.createKey.createKeyBtn')}}</v-btn>
      </form>
    </div>

    <div v-if="tokens.length>0">
      <div class="api-key_footer " v-for="(token,index) in tokens" :key='index'>
        <div class="key-info">
          <div class="key-name">
            {{token.label}}
          </div>
          <div class="key-base_info">
            <div class="api-key_info">
              <div class="api-key">
                <p class="title">Api key</p>
                <p>{{token.access_key}}</p>
              </div>
              <div class="api-key">
                <p class="title">Api Secret</p>
                <p>{{token.masked_secret_key}}</p>
              </div>
              <div class="api-key">
                <p class="title">{{$t('m.createKey.permission')}}</p>
                <p>
                  <v-radio :label="read" :disabled="true" color="#999">{{$t('m.createKey.readInformation')}}</v-radio>
                  <v-radio :label="exchange" :disabled="true" color="#999">{{$t('m.createKey.allowTrading')}}</v-radio>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="setting-ip">
          <div class="btn-group">
            <v-btn v-if="!token.edit" type="info" small=true @click="editApi(token,index)">{{$t('m.createKey.edit')}}</v-btn>
            <v-btn v-else type="info" small=true @click="saveApi(token,index)">{{$t('m.createKey.save')}}</v-btn>
            <v-btn type="info" small=true @click="deletApiShow(token, index)">{{$t('m.createKey.delete')}}</v-btn>
          </div>
          <div class="setting-ip-content">
            <div class="title">
              {{$t('m.createKey.visitiveLimit')}}
            </div>
            <div class="radio-group">
              <v-radio :label="token.hasIp" :disabled="!token.edit" @click="limitIp(token)">{{$t('m.createKey.partialLimit')}}</v-radio>
              <v-radio :label="!token.hasIp" :disabled="!token.edit" @click="unLimitIp(token)">{{$t('m.createKey.notLimit')}}</v-radio>
            </div>
            <div v-if="token.hasIp">
              <div class="edit-box">
                <div class="ip">
                  <span>{{$t('m.createKey.currentIp')}}</span>
                  <span>{{currentIp}}</span>
                </div>
                <div class="input clearfix">
                  <span>{{$t('m.createKey.trustIp')}}</span>
                  <input type="text" class="trust-ip_input" :disabled="!token.edit"  v-model="token.trusted_ip_list"  placeholder="0.0.0.0">
                </div>
              </div>
              <p class="tip">{{$t('m.createKey.ipPlaceholder')}}</p>
            </div>
            <div v-if="!token.hasIp" class="err">{{$t('m.createKey.errorTip')}}</div>
          </div>
        </div>
      </div>

    </div>

    <v-dialog v-if='showDialog' :visible="showDialog" width="300px" @close="close">
      <v-verify :type="verifyType" @close="close" :verifyList="twoFactorsList" disabled=true @success="verifySuccess" methods="patch" noFactors="true" :acceptWarn="sendWarn" @clear="()=>{this.sendWarn=''}"></v-verify>
    </v-dialog>
    <v-dialog v-if='showSuccessDialog' :visible="showSuccessDialog" width="300px" @close="close">
      <v-box :title="$t('m.createKey.createSuccessTitle')" height="470" class="box" :showClose='true' @close='closeDialog'>
        <div class="box-content">
          <div class="key-box">
            <div class="key-item">
              <p>API Key:</p>
              <p>
                <span>{{newAccess}}</span>
                <span class="copy-success" :class="{animate:secretCoped}">
                  <i class="iconfont icon-chenggong"></i>
                  {{$t('m.funds.copySuccess')}}
                </span>
                <span @click="copy(newAccess, 'secret')" class="copy">{{$t('m.createKey.copy')}}</span>
              </p>
            </div>
            <div class="key-item">
              <p>Secret Key:</p>
              <p>
                <span>{{newSecret}}</span>
                <span class="copy-success" :class="{animate:apiCoped}">
                  <i class="iconfont icon-chenggong"></i>
                  {{$t('m.funds.copySuccess')}}
                </span>
                <span @click="copy(newSecret, 'api')" class="copy">{{$t('m.createKey.copy')}}</span>
              </p>
            </div>
          </div>
          <div class="key-tip">
            {{$t('m.createKey.createSuccessTip')}}
          </div>
          <v-btn width='140' type="primary" @click='closeDialog()'>{{$t('m.createKey.confirm')}}</v-btn>
        </div>
      </v-box>
    </v-dialog>
    <!-- 选择认证弹框 -->
    <v-dialog :visible="showAuthDialog">
      <v-authentic
        @close="closeAuth"
        @nextStep="showVerifyDialog"
        :showFooter="true"
      ></v-authentic>
    </v-dialog>

    <v-dialog :visible="deleteDialog">
      <v-warn :title="$t('m.createKey.removeApi')" :content="content" @action="toDeletApi" @cancel="()=>{this.deleteDialog=false}"></v-warn>
    </v-dialog>
  </div>
</template>

<script>
import VInput from '@/components/input'
import VBtn from '@/components/btn'
import VVerify from '@/components/verify'
import VDialog from '@/components/dialog'
import VAuthentic from '@/components/authentic'
import VRadio from '@/components/radio'
import VBox from '@/components/box'
import VWarn from '@/components/warn-message'
import factors from '@/mixins/factors'
import { isIp } from '@/utils/verify'
import copyToClipboard from '@/utils/copy'
import { mapState, mapActions, mapGetters } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import Message from '@/utils/message'
import serviceError from '@/utils/service-error'

const current_ip = window.gon && window.gon.current_ip && window.gon.current_ip.ip || ''
export default {
  mixins: [factors],

  components: {
    VInput,
    VBtn,
    VVerify,
    VDialog,
    VAuthentic,
    VRadio,
    VBox,
    VWarn,
  },
  data() {
    return {
      apiKey: '',
      read: true,
      exchange: true,
      tokens: [],
      token: {},
      delIndex: '',
      currentIp: current_ip,
      operationType: '',
      deleteDialog: false,
      content: '',
      showSuccessDialog: false,
      showDialog: false,
      secretCoped: false,
      apiCoped: false,
      showAuthDialog: false,
      newSecret: '',
      newAccess: '',
      sendWarn: '', // 报错信息
    }
  },
  computed: {
    ...mapState('currentUser', ['currentUser']),
    ...mapState('apiManagement', ['tokenList']),
    ...mapGetters('withdraw', ['withdrawMe']),
    createBtnType() {
      return (this.apiKey && this.apiKey.length <= 40) ? 'primary' : 'none'
    },
    errorMessage() {
      return this.apiKey.length > 40
    },
  },
  created() {
    this.initTokens()
    this.$nextTick(() => {
      this.$refs.apiKeyInput.focus()
    })
    this.getWithdrawMe()
  },
  methods: {
    ...mapActions('apiManagement', ['getTokens', 'createApi', 'deleteApi', 'updateApi']),
    ...mapActions('withdraw', ['getWithdrawMe']),
    copy(data, type) {
      const success = copyToClipboard(data)
      if (success) {
        if (type === 'secret') {
          this.secretCoped = true
        } else if (type === 'api') {
          this.apiCoped = true
        }
        setTimeout(() => {
          this.secretCoped = false
          this.apiCoped = false
        }, 1500)
      }
    },
    closeDialog() {
      this.showSuccessDialog = false
    },
    // 初始化tokens
    async initTokens() {
      await this.getTokens()
      this.tokens = cloneDeep(this.tokenList)
      this.tokens.reverse()
      this.tokens.map(token => {
        token.edit = false
        token.hasIp = token.trusted_ip_list && token.trusted_ip_list.length > 0 ? true : false
      })
    },
    async createNewKey() {
      if (!(this.apiKey && this.apiKey.length <= 40)) return
      this.operationType = 'create'
      if (this.withdrawMe && this.withdrawMe.two_factors) {
        this.factors()
      } else {
        this.showAuthDialog = true
      }
    },

    // 短信验证成功的回调函数
    verifySuccess(obj) {
      this.factorCode = obj.code
      this.factorType = obj.type
      if (this.operationType === 'create') {
        this.toCreateApi()
        return
      }
      if (this.operationType === 'update') {
        this.toUpdateApi()
      }
    },
    async toCreateApi() {
      const res = await this.createApi({
        label: this.apiKey,
        otp:this.factorCode,
        type: this.factorType
      })
      if (res.data && res.data.postApiToken) {
        this.showDialog = false
        this.showSuccessDialog = true
        let postApiToken = res.data.postApiToken.result
        postApiToken.masked_secret_key == '********'
        postApiToken.edit = false
        postApiToken.hasIp = false
        this.tokens.unshift(postApiToken)
        this.newSecret = res.data.postApiToken.result.secret_key
        this.newAccess = res.data.postApiToken.result.access_key
        this.apiKey = ''
      } else {
        this.sendWarn = serviceError(res)
      }
    },

    async toUpdateApi() {
      const res = await this.updateApi({
        id: this.token.id,
        ip_whitelist: this.arrayToString(this.token.trusted_ip_list),
        otp: this.factorCode,
        type: this.factorType,
      })
      if (res && res.data && res.data.updateApiToken && res.data.updateApiToken.result && res.data.updateApiToken.result.result === 'success') {
        location.reload()
      } else {
        this.sendWarn = serviceError(res)
      }
    },

    // 编辑Api
    editApi(token, index) {
      let tokens = cloneDeep(this.tokens)
      tokens[index].edit = true
      this.tokens = tokens
    },

    // 转为数组
    toArray(val) {
      if (val === null || val === undefined) {
        return ['']
      }
      if (Array.isArray(val)) {
        return val
      } else {
        return val.split(',')
      }
    },
    arrayToString(val) {
      if (Array.isArray(val)) {
        return val.join(',')
      }
      return val
    },
    // 合法ip地址？
    isIp(list) {
      let res = true
      for (let i = 0; i < list.length; i++) {
        if (!isIp(list[i].trim())) {
          res = false
          break
        }
      }
      return res
    },

    // 保存Api
    saveApi(token) {
      if (!token.hasIp) {
        token.trusted_ip_list = ''
      } else {
        const ipList = this.toArray(token.trusted_ip_list)
        if (!this.isIp(ipList)) {
          Message.warn(this.$t('m.errMessages.ipErr'))
          return
        }
      }
      this.operationType = 'update'
      this.token = token
      this.factors()
    },

    // 显示确认删除框
    deletApiShow(token, index) {
      this.content = token.label
      this.token = token
      this.delIndex = index
      this.deleteDialog = true
    },

    // 删除Api
    async toDeletApi() {
      const id = this.token.id
      const res = await this.deleteApi({ id })
      if (res && res.data && res.data.deleteApiToken && res.data.deleteApiToken.result && res.data.deleteApiToken.result.result === 'success') {
        this.tokens.splice(this.delIndex, 1)
        this.deleteDialog = false
      }
    },
    limitIp(token) {
      token.hasIp = true
    },
    unLimitIp(token) {
      token.hasIp = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variable.scss';

.create-key_component {
  text-align: center;

  .qrcode {
    display: inline-block;
    width: 130px;
    height: 130px;
    vertical-align: top;
    padding: 10px;
    border: 1px solid #bdc7d1;
    border-radius: 4px;
  }

  .message-box {
    padding: 60px 70px 0;
    font-size: 24px;
    color: $color-text;

    .v-btn {
      padding: 0 20px;
      margin-top: 80px;
    }
  }

  .create-key {
    margin: 140px auto;
    width: 300px;

    &.haveApi {
      margin: 30px auto;
      width: auto;
    }

    .form {
      border-radius: 4px;
      margin: 0 auto;
      padding: 40px 150px;
      width: 600px;
      background-color: $color-assist4;
    }

    i {
      display: block;
      margin-bottom: 60px;
      font-size: 110px;
    }

    .remind {
      margin: 10px 0 33px;
      font-size: 12px;
      color: #999999;
      &.error {
        color: #ee4343;
      }
    }
    .api-doc {
      color: #777777;
      font-size: 12px;
      a {
        color: #4c84ff;
        padding: 0 5px;
      }
    }
  }
  .key-box {
    width: 400px;
    margin: 30px auto 0;
    .key-item {
      text-align: left;
      color: #666666;
      font-size: 13px;
      border-bottom: 1px solid #e0e0e0;
      padding: 25px 0;
      &:last-child {
        border-bottom: none;
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
      .copy-success {
        text-align: right;
        color: $color-assist5;
        font-size: 12px;
        opacity: 0;
        position: absolute;
        top: -16px;
        right: 0;
        &.animate {
          animation: fade 1s ease-in-out;
        }

        i {
          vertical-align: middle;
        }
      }
      p {
        position: relative;
        &:last-child {
          margin-top: 4px;
          display: flex;
          justify-content: space-between;
          span {
            &:first-child {
              width: 300px;
              word-break: break-all;
            }
            &.copy {
              color: #4c84ff;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .key-tip {
    color: #ee4343;
    font-size: 13px;
    text-align: left;
    width: 400px;
    margin: 0 auto 50px;
  }
  .api-key_footer {
    padding: 0 0 40px;
    border-top: 1px solid $color-line;
    border-bottom: 1px solid $color-line;
    text-align: left;
    display: flex;
    justify-content: space-between;
    &:last-child {
      border-bottom: none;
    }
    .key-info {
      margin-top: 30px;
      .key-name {
        margin-bottom: 20px;
        font-size: 16px;
        color: $color-assist1;
        font-weight: 500;
      }

      .key-base_info {
        padding-right: 35px;

        img {
          width: 140px;
          height: 140px;
          vertical-align: super;
        }

        .api-key_info {
          display: inline-block;
          font-size: 12px;

          .api-key {
            margin-bottom: 20px;
            font-weight: 500;

            .err-color {
              margin-top: 5px;
            }
          }

          .title {
            margin-bottom: 10px;
            color: #97a5b3;
          }
        }
      }
    }
    .setting-ip {
      margin-top: 11px;
      .setting-ip-content {
        padding-left: 30px;
        border-left: 1px solid $color-line;
      }
      .title {
        margin-bottom: 10px;
        font-size: 12px;
        color: #97a5b3;
      }
      .radio-group {
        margin-bottom: 20px;
        font-size: 13px;
        input {
          margin-right: 10px;
        }
      }
      .err {
        color: #ee4343;
        font-size: 12px;
      }
      .tip {
        color: #999999;
        font-size: 12px;
        margin-top: 15px;
      }
      .edit-box {
        font-size: 12px;
        background: #fffae5;
        padding: 20px;
        .trust-ip:not(:last-child):after {
          content: ',';
        }
        .ip {
          color: #666666;
        }
        .input {
          position: relative;
          margin-top: 10px;

          span {
            margin-right: 8px;
            color: #666666;
          }

          p:nth-of-type(1) {
            float: left;
            color: $color-assist2;
            line-height: 24px;
          }

          p:nth-of-type(2) {
            line-height: 24px;
          }
        }

        .trust-ip_input {
          display: inline-block;
          padding: 5px 0;
          font-size: 13px;
          text-indent: 10px;
          width: 300px;
          color: $color-assist1;
          border: 1px solid #eed58e;
          background-color: transparent;

          &.errinput {
            border-bottom: 1px solid $color-error;

            &:focus {
              border-bottom-color: $color-error;
            }
          }

          &:focus {
            border-bottom-color: $color-primary;
          }
        }
      }

      .btn-group {
        text-align: right;
      }

      .v-btn {
        display: inline-block;
      }
    }
  }
}
</style>
