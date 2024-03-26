<template>
  <div class="profile_content">
    <div class="profile-info_base flex jcsb">
      <div class="flex aic info_base">
        <img src="../../assets/images/user-avatar.png">
        <div>
          <p class="text-color  f16 user-email fb">
            {{ currentUser.email}}
          </p>
          <p
            v-if='loginDataNow'
            class="fm"
          >
            <span class="fm">{{$t('m.settings.lastLoginTime')}}：</span>
            <span>{{dayjs(loginDataNow.updated_at).format('YYYY.MM.DD HH:mm:ss')}}</span>
            <span
              class="line line2"
              v-if="loginDataNow.country || loginDataNow.city"
            >
            </span>
            <span v-if='loginDataNow.country || loginDataNow.country'>
              <i class="iconfont icon-dingwei"></i>{{loginDataNow.city}}
            </span>
          </p>
          <p class="fm">
            <span class='fb'>{{$t('m.settings.asset')}}：
              <span class=" f16 text-color">{{totalCurrencyAccount.btc}}
                <span class="unit">BTC</span>
                <span class=" f14 text-color"> / {{totalLegal(totalCurrencyAccount.usdt,4)}}</span>
              </span>
            </span>
          </p>
          <p
            class="fm medal"
            v-if="isMiner"
          >
            <span class="fm">{{$t('m.home.myTitles')}}：</span>
            <span class="miner-wrap">
              <i class="iconfont icon-xunzhang"></i>
              <div class="tips">{{$t('m.home.miner')}}</div>
            </span>
          </p>
          <p>
            <span class="fm rate">
              {{$t('m.feeCharge.rateLevel')}}
              <router-link :to="$i18nRoute({path:'/fee/trading'})">VIP {{vipLevel.vip_level-1}}</router-link>
            </span>
          </p>
        </div>
      </div>
      <div class=" info_another">
        <p class="info">{{$t('m.settings.cashAmount')}}
          <span class="fb text-color">{{limit}}</span>
        </p>
        <p class='settings-state'>
          <v-btn
            v-if="currentUser.id_document_state === 'unverified'"
            type="info"
            @click="completeVerify"
          >{{$t('m.settings.authentication')}}</v-btn>

          <v-btn
            v-if="currentUser.id_document_state === 'rejected'"
            type="info"
            @click="completeVerify"
          >{{$t('m.settings.reApply')}}</v-btn>

          <span
            v-if="currentUser.id_document_state === 'verified'"
            class="authented fb"
          >{{$t('m.settings.authented')}}</span>

          <span
            v-if="currentUser.id_document_state === 'verifying'"
            class="authenting"
          >{{$t('m.settings.authenting')}}</span>
        </p>
        <p
          class="tip"
          v-if="currentUser.id_document_state === 'rejected'"
        >
          {{$t('m.settings.failTip')}}
        </p>
        <p
          class="dark-text-color desc"
          v-if="currentUser.id_document_state === 'unverified'"
        >{{$t('m.settings.cashAmountDesc1', {maxWithdrawAmount: maxWithdrawAmount})}}</p>

        <p class="dark-text-color desc">{{$t('m.settings.cashAmountDesc2', {maxWithdrawAmount: maxWithdrawAmount})}}</p>
        <p class="spec-color">contact@riostox.com</p>
      </div>
    </div>
    <div class="profile-info_account">
      <!-- 登录密码修改-->
      <div class="account-item">
        <div class="item-info">
          <div class="text-color fb item-title">{{$t('m.settings.password')}}</div>
          <div class="item-val fm">*********</div>
          <div class="item-remind">{{$t('m.settings.passwordDesc')}}</div>
        </div>
        <v-btn
          type="info"
          padding='0 10px'
          @click="changePassword"
        >{{$t('m.settings.modify')}}</v-btn>
      </div>
      <!--逐渐弱化邮箱验证。1.如果新用户不展示邮箱验证 2.旧用户已经开启展示，关闭后不再展示邮箱验证-->
      <div
        v-for='(v,i) in authData'
        :key='i'
        class="account-item"
      >
        <div class="item-info">
          <div class="text-color fb item-title">{{v.name}}</div>
          <div
            class="item-val fm"
            v-if="v.enabled"
          >{{v.keyValue}}</div>
          <div
            v-else
            class="item-val grey-color"
          >{{v.noKeyDes}}</div>
          <div class="item-remind">{{v.veryDesc}}</div>
        </div>
        <div v-if='v.showBtn !== false'>
          <v-btn
            v-if="v.enabled"
            type="info"
            padding='0 10px'
            @click="removeBind(v.key)"
          >{{v.btnValue[1]}}</v-btn>
          <v-btn
            v-else
            padding='0 10px'
            type="info"
            @click="bindFactors(v.key)"
          >{{v.btnValue[0]}}</v-btn>
        </div>
      </div>
    </div>
    <div class="profile-info_login">
      <el-table
        :data="loginData"
        style="width:100%;"
        class="login-records_table"
        stripe
        :empty-text="$t('m.noData')"
      >
        <el-table-column
          width="300"
          prop="updated_at"
          :label="$t('m.settings.time')"
        >
          <template slot-scope="scope">
            <span>{{dayjs(scope.row.updated_at).format('YYYY.MM.DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          prop="platform"
          :label="$t('m.settings.loginStyle')"
        ></el-table-column>
        <el-table-column
          width="200"
          prop="ip"
          :label="$t('m.settings.loginIp')"
        ></el-table-column>
        <el-table-column
          :label="$t('m.settings.loginPlace')"
          class-name="last-th"
        >
          <template slot-scope="scope">
            {{scope.row.city}}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 二次认证 -->
    <v-dialog
      :visible="showDialog"
      width="300px"
    >
      <v-verify
        :type="verifyType"
        @close="closeVerify"
        :verifyNumber="verifyNumber"
        @success="verifySuccess"
        :methods="methods"
      ></v-verify>
    </v-dialog>
    <!-- 二次认证弹框 -->
    <v-dialog :visible="showAuthDialog">
      <v-authentic
        @close="closeAuth"
        @nextStep="showVerifyDialog"
        :showFooter="true"
      ></v-authentic>
    </v-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import VBtn from '@/components/btn'
import VVerify from '@/components/verify'
import VDialog from '@/components/dialog'
import VAuthentic from '@/components/authentic'
import VMiner from '@/components/miner'
import bindTG from '@/mixins/settings-telegram-bind'
import { mapGetters, mapState } from 'vuex'
import totalMoney from '@/mixins/total-money'
import { BigNumber as bn } from 'bignumber.js'
import { Table, TableColumn } from 'element-ui'
import api from '@/graphql'
import dayjs from 'dayjs'
Vue.use(Table)
Vue.use(TableColumn)
export default {
  components: {
    VBtn,
    VVerify,
    VDialog,
    VAuthentic,
    VMiner,
  },
  mixins: [bindTG, totalMoney],
  data() {
    return {
      showDialog: null,
      showAuth: sessionStorage.getItem('showAuth'), // 关闭当前页再次进入弹提示
      // totalEstimatedValue: data.total_estimated_value, // TODO:  私募相关，已过私募期
      methods: '', // 打开还是关闭
      verifyType: '', // 验证类型
      verifyNumber: '', // 验证的电话号码or邮箱地址
      maxWithdrawAmount: '1,000,000 USDT',
      vipLevel: { vip_level: 1 },
    }
  },

  computed: {
    ...mapState('currentUser', ['currentUser']),
    ...mapGetters('accounts', ['totalAccount']),
    ...mapState('withdraw', ['withdrawMe']),
    ...mapGetters({
      isMiner: 'isMiner',
    }),
    totalCurrencyAccount() {
      return {
        btc: bn(this.totalAccount.btc).toFixed(8, 1),
        usdt: bn(this.totalAccount.usdt).toFixed(8, 1),
      }
    },
    showAuthDialog() {
      if (this.withdrawMe) {
        return !this.withdrawMe.two_factors && !this.showAuth // 更多认证弹框
      }
    },

    limit() {
      return this.currentUser.id_document_state === 'third_verified' ? '1,000,000 USDT' : '10,000 USDT'
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
    authData() {
      if (this.withdrawMe) {
        const {
          app_two_factor,
          masked_phone_number,
          sms_two_factor,
          masked_two_factor_email,
          email_two_factor,
        } = this.withdrawMe
        return [
          {
            key: 'google',
            name: this.$t('m.settings.googleVerification'),
            keyValue: this.$t('m.settings.enabled'), // todo
            noKeyDes: this.$t('m.settings.noGoogle'),
            veryDesc: this.$t('m.settings.googleVerificationDesc'),
            enabled: app_two_factor, // todo
            btnValue: [this.$t('m.settings.enable'), this.$t('m.settings.close')],
          },
          {
            key: 'phone',
            name: this.$t('m.settings.phoneVerification'),
            keyValue: masked_phone_number,
            noKeyDes: this.$t('m.settings.noPhone'),
            veryDesc: this.$t('m.settings.phoneVerificationDesc'),
            enabled: sms_two_factor,
            btnValue: [this.$t('m.settings.enable'), this.$t('m.settings.close')],
          },
          {
            key: 'email',
            name: this.$t('m.settings.emailVerification'),
            keyValue: masked_two_factor_email,
            noKeyDes: this.$t('m.settings.noEmail'),
            veryDesc: this.$t('m.settings.emailVerificationDesc'),
            enabled: email_two_factor,
            btnValue: [this.$t('m.settings.enable'), this.$t('m.settings.close')],
          },
          // {
          //   key: 'telegram',
          //   name: this.$fifth.isCn ? this.$t('m.settings.relateAccount') : this.$t('m.settings.telegram'),
          //   keyValue: this.$fifth.isCn ? this.$t('m.settings.telegram') : 'Enabled', // todo
          //   noKeyDes: this.$fifth.isCn ? this.$t('m.settings.telegram') : 'Telegram',
          //   veryDesc: this.$t('m.settings.telegramVerificationDesc'),
          //   enabled: this.telegramIsBind, // todo
          //   showBtn: this.telegramIsBind !== null, // 给予按钮三种状态 1：null状态载入中，2：false ,3:true
          //   btnValue: [this.$t('m.settings.enable'), this.$t('m.settings.close')],
          // },
        ]
      }
    },
  },

  async mounted() {
    const { data } = await api.query('VIPLEVEL')
    this.vipLevel = data.vipLevel.result
  },
  methods: {
    dayjs,
    changePassword() {
      this.$router.push(
        this.$i18nRoute({
          name: 'ChangePassword',
        }),
      )
    },
    closeVerify() {
      this.showDialog = false
    },
    closeAuth() {
      this.showAuth = true
      sessionStorage.setItem('showAuth', true)
    },
    // 打开手机或者email弹框
    showVerifyDialog(type, methods) {
      this.methods = methods
      this.verifyType = type

      if (type === 'phone' && this.currentUser.two_factor_sms_enabled) {
        this.verifyNumber = this.currentUser.phone_number
      }

      if (type === 'email' && this.currentUser.two_factor_email_enabled) {
        this.verifyNumber = this.currentUser.two_factor_email
      }

      this.showDialog = true
    },
    // 完成更多验证
    completeVerify() {
      this.$router.push(
        this.$i18nRoute({
          name: 'IsKyc',
        }),
      )
    },
    // 手机或者email绑定成功回调函数
    verifySuccess() {
      this.$notify.success(this.$t('m.successMessage.bindSuccess'))
      setTimeout(() => {
        location.reload()
      }, 1500)
    },

    bindFactors(type) {
      if (type === 'google') {
        this.$router.push(
          this.$i18nRoute({
            name: 'BindGoogle',
            params: {
              type,
              step: 'downloadApp',
            },
          }),
        )
      } else {
        this.$router.push(
          this.$i18nRoute({
            name: 'Bind',
            params: {
              type,
            },
          }),
        )
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.profile_content {
  .profile-info_base {
    padding: 25px;
    font-size: 13px;
    border-bottom: 1px solid $color-line;
    .info_base {
      .user-email {
        display: inline-block;
        margin-right: 15px;
      }
      .rate {
        a {
          color: rgb(201, 148, 0);
        }
      }
      img {
        margin-right: 25px;
        width: 80px;
        height: 80px;
      }
      .iconfont {
        font-size: 80px;
      }
      .icon-touxiang1 {
        margin-right: 25px;
        color: #333333;
      }
      .icon-dingwei {
        font-size: 12px;
        color: #de605b;
      }
      .unit {
        font-size: 13px;
      }
      .reward {
        display: inline-block;
        position: relative;
        .info {
          position: relative;
        }
        .icon {
          display: inline-block;
          // 如果以后有需求，就添加iconfont [ icon-info ]
          background-size: 100% 100%;
          width: 16px;
          height: 16px;
          vertical-align: sub;
          margin-left: 9px;
          &:hover + .tip {
            display: block;
          }
        }
        .btc {
          font-size: 13px;
        }
        .tip {
          display: none;
          position: absolute;
          top: 30px;
          left: -13px;
          &:before {
            content: '';
            position: absolute;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid #fff6cd;
            width: 0;
            height: 0;
            top: -5px;
            left: 25px;
          }
          .content {
            width: 260px;
            border-radius: 4px;
            padding: 10px 13px;
            font-size: 12px;
            color: #e06f0d;
            background: #fff6cd;
            display: inline-block;
            &.en {
              width: 550px;
            }
          }
        }
      }
      div {
        .fw {
          font-size: 16px;
          font-weight: bold;
        }
        p:not(:last-of-type) {
          margin-bottom: 10px;
        }
        p:nth-of-type(2) {
          color: $color-7;
        }
        .line {
          margin: 0 20px;
          img {
            margin-right: 0;
            height: 10px;
            width: 1px;
          }
          &.line2 {
            margin: 0 10px;
          }
        }
        .desc {
          span {
            display: block;
            &:last-child {
              margin-top: 10px;
            }
          }
        }
        p:nth-of-type(3) {
          color: $color-7;
        }
        p:nth-of-type(4) {
          color: $color-7;
        }
        p:nth-of-type(5) {
          color: $color-7;
        }
      }

      .medal {
        .miner-wrap {
          position: relative;
          display: inline-block;
        }
        .icon-xunzhang {
          font-size: 22px;
          color: #e06f0d;
          cursor: pointer;
          &:hover + .tips {
            display: block;
          }
        }
        .tips {
          display: none;
          position: absolute;
          top: 28px;
          left: 11px;
          transform: translateX(-50%);
          padding: 2px 10px;
          border: 1px solid #ffd200;
          background-color: #fffff1;
          border-radius: 2px;
          text-align: center;
          color: #666666;
          font-size: 12px;
          line-height: 15px;
          white-space: nowrap;
          &:before {
            content: '';
            width: 6px;
            height: 6px;
            transform: rotate(-45deg);
            top: -4px;
            left: calc(50% - 5px);
            position: absolute;
            border-top: 1px solid #ffd200;
            border-right: 1px solid #ffd200;
            background-color: #fffff1;
          }
        }
      }
    }
    .info_another {
      text-align: center;
      .settings-state {
        margin: 15px 0 10px;
      }
      .info {
        font-size: 16px;
        color: $color-assist1;
      }
      .name {
        font-size: 13px;
      }
      .tip {
        margin-top: -5px;
        margin-bottom: 5px;
        font-size: 12px;
        color: #ee4343;
      }
      .authented {
        display: inline-block;
        margin: 15px 0 10px;
        color: $color-assist5;
        font-size: 14px;
      }
      .authenting {
        display: inline-block;
        margin: 15px 0 10px;
        font-size: 14px;
        color: #cccccc;
      }
    }
  }
  .profile-info_account {
    .account-item {
      padding: 15px 30px;
      margin: 10px 15px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid $color-line;
      justify-content: space-between;
      font-size: 14px;
      .item-title {
        //padding-right: 40px;
        min-width: 100px;
        border-right: 1px solid $border-line;
      }
      .item-val {
        padding-left: 40px;
        width: 200px;
        color: $color-7;
      }
      .item-info {
        display: flex;
        align-items: center;
      }
      .item-remind {
        // flex: 1;
        width: 600px;
        color: $color-7;
        font-size: 13px;
      }
    }
  }
  .profile-info_login {
    padding: 30px 20px;
  }
}

.dark-text-color {
  color: $color-9;
  line-height: 20px;
}

.spec-color {
  color: #e06f0d;
}

.text-color {
  color: $color-3;
}
</style>
