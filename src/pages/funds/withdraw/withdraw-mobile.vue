<template>
  <div class="funds-dialog_recharge">
    <div class="recharge-bit_name">
      <v-select :selectItems="accountsList" :type="selectType" :selected="selected" @change="changeBit" @show="()=>{this.addressListShow = false;this.percentListShow = false}"></v-select>
    </div>
    <div v-if="selected.currency === 'usdt' || selected.currency === 'USDT'" class="chain-type">Chain Type:</div>
    <tabs v-if="selected.currency === 'usdt' || selected.currency === 'USDT'" class="withdraw-usdt-tabs" :idx.sync="tabIndex" :count="tabConfig.length">
      <tab-item class="tab-item" v-for="(v,i) in tabConfig" :key="i" :index="i">
        <span slot="label">{{v.label}}</span>
      </tab-item>
    </tabs>
    <div v-if="selected.currency">
      <div v-if="selected.withdrawable === false" style="margin:150px 50px; line-height:1.7; text-align:center;" class="dark-text-color">
        {{selected.vote_currency ? $t('m.funds.voteWithdrawPause') : $t('m.funds.withdrawPause')}}
      </div>
      <div class="recharge-bit_info" v-else>
        <div class="bit-funds_info title-color ">
          <p class="fb">{{$t('m.funds.availableBalance')}}</p>
          <p class="semi-bold">{{balance}}
            <span>{{unit}}</span>
          </p>
        </div>
        <div class="withdraw-info_content">
          <ul class='withdraw-form'>
            <li>
              <input type="text" :placeholder="$t('m.funds.enterOrPasteAddress')" maxlength="200" v-model="withdrawUid" @change="()=>{this.showAddressErr = false}">
              <i class="iconfont icon-save" @click='toWithdrawAddress(selected.currency)'></i>
              <p class="error" v-if='showAddressErr'>{{$t('m.errMessages.addressErr')}}</p>
              <label v-else-if="selected.currency.toLowerCase() === 'usdt' && tabIndex === 0">{{$t('m.funds.message1')}} 2 {{unit}}</label>
              <label v-else="">{{$t('m.funds.message1')}} {{selected.minimum_withdraw_amount}} {{unit}}</label>
            </li>
            <li v-if="selected.require_memo">
              <input type="text" :disabled="noTag" :placeholder="memoPlaceholder" maxlength="200" v-model="withdrawMemo" @change="()=>{this.showMemoErr = false}">
              <v-checkbox v-model="noTag" class="checkbox">{{$t('m.funds.noTag')}}</v-checkbox>
              <p class="error" v-if='showMemoErr'>{{$t('m.errMessages.addressErr')}}</p>
              <p class="error" v-else>{{$t('m.funds.memoTip')}}</p>
            </li>
            <li>
              <input type="number" :placeholder="restCurrency" v-model="withdrawSum" @input="withdrawSumChange">
              <i @click="selectAll()">{{$t('m.funds.allToWithdraw')}}</i>
              <p class="error" v-if='sumErr'>{{sumErr}}</p>
              <label v-else>
                <span class="fl">{{$t('m.funds.poundage')}}：{{withdraw_fee}}</span>
                <span class="fr">{{$t('m.funds.actualAccount')}}：{{realWithdraw}}</span>
              </label>
            </li>
          </ul>
        </div>
        <div class="checkbox-wrap">
          <v-checkbox v-model="checked">
            {{ this.withDrawDeclaration}}
          </v-checkbox>
        </div>
      </div>
      <div class="recharge-bit_footer clearfix">
        <div class="hint-wrap">
          <p class="title color-text fb">
            {{$t('m.funds.reminder')}}
          </p>
          <ul class="hint-list fm">
            <li class="error" v-if="selected.currency === 'wicc'">
              <span>{{$t('m.funds.message10', {currency: selected.currency.toUpperCase()})}}</span>
            </li>
            <li class="error" v-if="selected.currency === 'icx'">
              <span>{{$t('m.funds.message11')}}</span>
            </li>
            <li>
              <i>·</i> 24 {{$t('m.funds.withdrawLimit')}}： {{currentUser && currentUser.withdraw_amount_h24}}/{{limitWithdraw}} USDT
            </li>
            <li>
              <i>·</i> {{$t('m.funds.message2')}}
            </li>
            <li v-if="selected.require_memo">
              <i>·</i> {{$t('m.funds.message5')}}
            </li>
            <li>
              <i>·</i> {{$t('m.funds.message7')}}
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div style="width: 100%; height:40px;"></div>
        <div class="order-btn fb">
          <v-btn @click="submitMobileOrder" borderRadius='0' height='40' :type="btnType">{{$t('m.funds.fundsMenu.withdraw')}}</v-btn>
        </div>
      </div>
    </div>
    <v-verify-mobile v-if='showDialog' :visible='showDialog' :verifyList="twoFactorsList" @close='close' @success="verifyMobileSuccess" methods="patch" :noFactors="true" :acceptWarn="errMessage" @clear="()=>{this.errMessage=false}">
    </v-verify-mobile>
  </div>
</template>
<script>
import VSelect from '@/components/select-mobile'
import withdrawMixin from './withdraw-mixin'
import VVerifyMobile from '@/components/mobile-verify'
import VCheckbox from '@/components/switch'
import Tabs from '@/components/tabs/tabs'
import TabItem from '@/components/tabs/tab-item'
export default {
  mixins: [withdrawMixin],
  components: {
    VSelect,
    VVerifyMobile,
    VCheckbox,
    Tabs,
    TabItem,
  },
  mounted() {
    this.withdrawUid = sessionStorage.getItem('deposits-adress' + this.selected.currency) || ''
  },
  methods: {
    withdrawSumChange() {
      this.sumErr = false
      if (this.maxLen >= 0) {
        if (this.withdrawSum.indexOf('.') > -1) {
          const mixiNum = this.withdrawSum.split('.')[1]
          if (mixiNum.length > this.maxLen) {
            const len = Number(this.maxLen) === 0 ? this.withdrawSum.length - 2 : this.withdrawSum.length - 1
            this.withdrawSum = this.withdrawSum.slice(0, len)
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/scss/variable.scss';

.funds-dialog_recharge {
  margin: 0 auto;
  padding: 0 15px;
  .recharge-bit_name {
    width: 100%;
    margin: 0 auto;
  }

  .chain-type {
    color: #999999;
    font-size: 14px;
    text-align: left;
    margin-top: 8px;
  }

  .withdraw-usdt-tabs {
    height: 30px;
    line-height: 30px;
    display: flex;
    padding: 0;
    margin-top: 20px;
    .current {
      &:after {
        content: none;
      }
    }
    .tab-item {
      flex: 1;
      margin: 0;
      text-align: center;
      font-size: 14px;
      border-width: 1px;
      border-style: solid;
      font-weight: 500;
      font-family: euBold;

      @include themify($themes) {
        color: themed('textColor3');
        border-color: themed('lineBorderColorF5');
      }
      &:nth-child(1) {
        border-radius: 3px 0 0 3px;
      }
      &:nth-child(2) {
        border-radius: 0 3px 3px 0;
      }
      &.current {
        @include themify($themes) {
          color: themed('buyColor');
          border-color: themed('buyColor');
        }
      }
    }
  }
  .recharge-bit_info {
    text-align: center;

    .bit-funds_info {
      width: 100%;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      padding: 23px 0 17px;
      margin: 0 auto;
      p {
        text-align: left;
        color: #999999;
        font-size: 14px;
        &:last-child {
          font-size: 20px;
          color: #111111;
          margin-top: 5px;
        }
        span {
          font-size: 14px;
        }
      }
    }

    .withdraw-info_content {
      margin: 0 auto;
      width: 100%;
      text-align: left;
      .withdraw-form {
        li {
          position: relative;
          list-style: none;
          margin-top: 50px;
          .checkbox {
            margin-top: 13px;
          }
          input {
            padding: 10px 80px 10px 0;
            width: 100%;
            color: #111111;
            font-size: 16px;
            display: block;
            outline: none;
            border: none;
            border-radius: 0;
            -webkit-appearance: none;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            &::-webkit-input-placeholder {
              color: #cccccc;
            }
            &:disabled {
              background: none;
            }
          }
          i {
            font-style: normal;
            position: absolute;
            right: 0;
            top: 10px;
            height: 18px;
          }
          .error {
            color: #ee4343;
            margin-top: 10px;
            font-size: 12px;
          }
          label {
            margin-top: 10px;
            color: #999999;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
  .checkbox-wrap {
    margin-top: 50px;
  }
  .order-btn {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    .v-btn {
      margin: 0;
    }
  }
  .recharge-bit_footer {
    margin: 100px auto 0;
    font-size: 14px;
    width: 100%;
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
        &.error {
          color: #ef5252;
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
        a {
          color: #e06f0d;
        }
      }
    }
    .hide-btn {
      width: 100%;
      margin: 110px auto 0;
    }
  }
}
</style>
