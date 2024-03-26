<template>
  <div class="funds-dialog_withdraw">
    <div class="recharge-bit_name">
      <v-select :selectItems="accountsList | accountsFil" :type="selectType" :selected="selected"  @change="changeBit" @show="()=>{this.addressListShow = false;this.percentListShow = false}"></v-select>
    </div>
    <div class="recharge-bit_info" v-if="selected.currency">
      <div class="bit-funds_info">
        <div>
          <span class="fb">{{$t('m.funds.balance')}}</span>
          <span class="semi-bold">{{allBalance}} {{unit}}</span>
        </div>
        <div>
          <span class="fb">{{$t('m.funds.availableBalance')}}</span>
          <span class="semi-bold">{{balance}} {{unit}}</span>
        </div>
        <div>
          <span class="fb">{{$t('m.funds.frozed')}}</span>
          <span class="semi-bold">{{lockedBalance}} {{unit}}</span>
        </div>
      </div>
      <span v-if="selected.currency.toLowerCase() === 'usdt'" class="chain-type">Chain Type:</span>
      <tabs v-if="selected.currency.toLowerCase() === 'usdt'" class="withdraw-usdt-tabs" :idx.sync="tabIndex" :count="tabConfig.length">
        <tab-item class="tab-item" v-for="(v,i) in tabConfig" :key="i" :index="i">
          <span slot="label">{{v.label}}</span>
        </tab-item>
      </tabs>
      <div v-if="selected.withdrawable === false" style="margin:150px 50px; line-height:1.7; text-align:center;" class="dark-text-color">
        {{selected.vote_currency ? $t('m.funds.voteWithdrawPause') : $t('m.funds.withdrawPause')}}
      </div>
      <div class="withdraw-info_content" v-else>
        <!-- <div class="input-box">
          <label class="fb">{{unit}} {{$t('m.funds.withdrawAddress')}}</label>
          <v-btn-input width="75" v-model="withdrawAddress.fund_uid" :listShow="addressListShow" @change="()=>{this.showAddressErr = false}" @appendClick="showAddress">
            <template slot="append">{{$t('m.funds.currencyAddress')}}
              <i class="iconfont icon-xiala append"></i>
            </template>
            <template slot="list">
              <li class="address-list_item" @click="addAddress">
                <div class="fb item">+ {{$t('m.funds.useAddress')}}</div>
              </li>
              <li class="clearfix address-list_item" v-for="(item,key) in fundSources" :key="key" @click.prevent="selectAddress(item)">
                <div class="item clearfix">
                  <div class="info-item">
                    <div class="fb remark">{{$t('m.funds.remarks')}}： {{item.fund_extra}}</div>
                    <div class="fb address">{{$t('m.funds.address')}}: {{item.fund_uid}}</div>
                  </div>
                  <div class="fb del-item" @click.stop="delAddressItem(item)">{{$t('m.funds.delete')}}</div>
                </div>
              </li>
            </template>
          </v-btn-input>
        </div> -->
        <el-select placeholder="Funding source" v-model="withdrawAddress.fund_uid" style="width:100%">
          <el-option v-for="(item, key) in bankList" :key="key" :label="item.bank_name" :value="item.id.toString()"> </el-option>
        </el-select>
        
        <!-- 新增提现地址 -->
        <div class="add-address_wrap" :class="{'focus':focus,bordererr:showAddressErr}" v-if="newAddressShow">
          <textarea :placeholder="$t('m.funds.remarks')" v-model="addForm.fund_extra" class="fb"></textarea>
          <input type="text" :placeholder="$t('m.funds.withdrawAddress')" class="fb" v-model="addForm.fund_uid" maxlength="200">
          <div class="btns-group">
            <v-btn type="info" :small="true" @click="addFundsSrc">{{$t('m.funds.confirm')}}</v-btn>
            <v-btn type="info" :small="true" @click="cancel">{{$t('m.funds.cancel')}}</v-btn>
          </div>
        </div>
        <p class="err-color f12" v-if="showAddressErr">{{$t('m.errMessages.addressErr')}}</p>

        <!-- tag输入框 -->
        <div class="input-box" v-if="selected.require_memo">

          <div class="clearfix tag-switch">
            <label for="">{{unit}} {{$t('m.funds.withdrawTag')}}</label>
            <div class="fr">
              <v-radio :label="!noTag" @click="useTag()">{{$t('m.funds.hasTag')}}</v-radio>
              <v-radio :label="noTag" @click="noUseTag()">{{$t('m.funds.noTag')}}</v-radio>
            </div>
          </div>
          <input type="text" :disabled="noTag" v-model="withdrawMemo">
        </div>

        <div class="input-box">
          <div class="clearfix">
            <label for="">{{unit}} {{$t('m.funds.withdrawAmount')}}</label>
            <span class="title-color">24 {{$t('m.funds.withdrawLimit')}}： {{currentUser && currentUser.withdraw_amount_h24}}/{{limitWithdraw}} USDT</span>
          </div>
          <v-btn-input v-model="withdrawSum" :disabled="false" :placeholder="restCurrency" inputType="number" :listShow="percentListShow" width="78" @appendClick="withdrawAll" :maxLen="maxLen" :errShow="sumErr" @change="()=>{this.sumErr = false}">
            <template slot="append">{{$t('m.funds.allWithdraw')}}
              <i class="iconfont icon-xiala append"></i>
            </template>
            <template slot="list">
              <li class="percent-list">
                <span class="percent-item dark-text-color semi-bold" v-for="(item,key) in percentList" :key="key" @click="selectPercent(item)">
                  {{item.text}}
                </span>
              </li>
            </template>
          </v-btn-input>
          <p class="err-color f12" v-if="sumErr">{{sumErr}}</p>
        </div>
        <div class="order-btn">
          <div class="order-info">
            <span>{{$t('m.funds.poundage')}}：{{withdraw_fee}}</span>
            <span>{{$t('m.funds.actualAccount')}}：{{realWithdraw}}</span>
          </div>
          <div class="checkbox-wrap">
            <v-checkbox v-model="checked">
              {{ this.withDrawDeclaration}}
            </v-checkbox>
          </div>
          <v-btn @click="submitOrder" :type="btnType" height="40">{{$t('m.funds.fundsMenu.withdraw')}}</v-btn>
        </div>
      </div>
    </div>
    <div class="recharge-bit_footer clearfix" v-if="selected.currency">
      <div class="hint-wrap">
        <p class="title color-text fb">
          {{$t('m.funds.reminder')}}
        </p>
        <ul class="hint-list fm">
          <li class="error" v-if="selected.currency === 'wicc'">
            <i class="iconfont icon-yichangtishi"></i>
            <span>{{$t('m.funds.message10', {currency: selected.currency.toUpperCase()})}}</span>
          </li>
          <li class="error" v-if="selected.currency === 'icx'">
            <i class="iconfont icon-yichangtishi"></i>
            <span>{{$t('m.funds.message11')}}</span>
          </li>
          <li v-if="selected.currency.toLowerCase() === 'usdt' && tabIndex === 0">
          <i>·</i> {{$t('m.funds.message1')}} 10 {{unit}}</li>
          <li v-else>
          <i>·</i> {{$t('m.funds.message1')}} {{selected.minimum_withdraw_amount}} {{unit}}</li>
          <li>
          <i>·</i> {{$t('m.funds.message2')}}</li>
          <li>
            <i>·</i> {{$t('m.funds.message7')}}
          </li>
        </ul>
      </div>
      <v-all-tickers :currency="selected.currency"></v-all-tickers>
    </div>
    <!-- 删除提示确认弹框 -->
    <v-alert :visible="confirmVisible" :title="$t('m.funds.delAlert')" @close="()=>{this.confirmVisible=false}" @click="confirmDelet"></v-alert>
    <v-dialog v-if='showDialog' :visible="showDialog" width="300px" @close="close">
      <v-verify :type="verifyType" @close="close" :verifyList='twoFactorsList' disabled=true @success="verifySuccess" methods="patch" noFactors="true"></v-verify>
    </v-dialog>
    <!-- 提现确认成功 -->
    <v-dialog :visible="withdrawSuccessShow">
      <v-box :title="$t('m.successMessage.orderSuccess')" :showClose="true" @close="closeSuccess">
        <div class="withdraw-success-wrap">
          <i class="iconfont icon-chenggong1"></i>
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
        </div>
      </v-box>
    </v-dialog>
    <!-- 提现确认页面 -->
    <v-dialog :visible="withdrawVerifyShow">
      <v-box :title="$t('m.verifyTitle.emailTitle')" :showClose="true" @close="closeWithdrawVerify">
        <div class="withdraw-verify-wrap">
          <span class="icon"></span>
          <div class="success-text">
            <p class="title">{{$t('m.funds.emailPageForh5.hasSend')}}{{currentUser && currentUser.email}}{{$t('m.funds.emailPageForh5.enterToComplete')}}</p>
            <input-code @success="submitCode" @resend="resendCode" @change="codeChange" ref="inputCode" :placeholder="$t('m.placeholders.verifyCode')"></input-code>
            <div class="err-color f14">{{withdrawVerifyError}}</div>
          </div>
        </div>
      </v-box>
    </v-dialog>
    <VDialog2 v-if="false" class="dialog">
    </VDialog2>
  </div>
</template>

<script>
import Vue from 'vue'
import VSelect from '@/components/select'
import withdrawMixin from './withdraw-mixin-bank'
import VBox from '@/components/box'
import InputCode from '@/components/input-code'
import VNewTabs from '@/components/new-tabs'
import VNewTabItem from '@/components/new-tab-item'
import Tabs from '@/components/tabs/tabs'
import TabItem from '@/components/tabs/tab-item'
import VCheckbox from '@/components/checkbox'
import VDialog2 from '@/components/kyc-dialog2'
import { mapGetters } from 'vuex'
import { Select,Option } from 'element-ui'
Vue.use(Select)
Vue.use(Option)
export default {
  mixins: [withdrawMixin],
  components: {
    VSelect,
    VBox,
    InputCode,
    VNewTabs,
    VNewTabItem,
    Tabs,
    TabItem,
    VCheckbox,
    VDialog2
  },
  computed: {
    ...mapGetters('currentUser', ['isKYC']),
  },
  created() {
    document.addEventListener('click', e => {
      if (e.target.className.indexOf('append') === -1) {
        this.percentListShow = false
        this.addressListShow = false
      }
    })
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variable.scss';

.dialog{
  z-index: 1000;
}

.err-color {
  color: #ee4343;
  margin-top: 5px;
  text-align: left;
}

.chain-type {
  font-size: 14px;
  margin-left: 250px;
  display: block;
  width: 100px;
  text-align: left;
}

.withdraw-usdt-tabs {
  height: 30px;
  width: 50%;
  line-height: 30px;
  display: flex;
  padding: 0;
  margin-top: 20px;
  margin-left: 250px;
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

.funds-dialog_withdraw {
  padding: 50px 0 50px;
  margin: 0 auto;
  width: 1120px;
  min-height: 700px;
  .headline {
    color: $color-3;
    font-size: 18px;
    font-weight: 500;
    padding-bottom: 24px;
    border-bottom: 1px solid #d8d8d8;
  }

  .recharge-bit_name {
    padding: 51px 152px 0;
  }
  .xrp-remind-wrap {
    margin: 20px auto 5px;
    padding: 30px 20px;
    background-color: #f8f8f8;
    border-radius: 4px;
    text-align: left;

    .important {
      margin-bottom: 6px;
      font-size: 12px;
    }

    ul {
      margin-top: 10px;
      list-style-position: inside;
    }

    .force-info {
      position: relative;
      margin: 15px 0;
      padding: 11px 20px;
      font-size: 14px;
      color: $color-error;
      border: 1px solid $color-error;
    }

    .xrp-check {
      font-size: 12px;
      color: $color-text;

      .v-btn {
        margin-top: 15px;
        text-align: center;
      }
    }
  }

  .address-list_item {
    cursor: pointer;

    .item {
      margin: 0 40px;
      padding: 15px 0;
      border-bottom: 1px solid #eaedf5;
      .address {
        word-break: break-all;
      }
    }

    &:hover {
      background-color: $color-assist4;
    }
    .info-item {
      float: left;
    }
    .del-item {
      float: right;
      margin-top: 15px;
      color: $color-assist1;

      &:hover {
        color: $color-primary;
      }
    }
  }
  .percent-list {
    padding: 20px 0 0;
    display: flex;
    justify-content: space-around;
  }

  .remark {
    margin-bottom: 15px;
    color: $color-assist2;
  }

  .percent-item {
    display: inline-block;
    width: 80px;
    height: 28px;
    text-align: center;
    line-height: 25px;
    border: 1px solid #bdc7d1;

    &:hover {
      border-color: $color-primary;
    }
  }

  .recharge-bit_info {
    text-align: center;

    .bit-funds_info {
      padding: 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 12px;
      color: #97a5b3;
    }
    .withdraw-maintenance {
      height: 245px;
      width: 100%;
      text-align: center;
      line-height: 300px;
      color: $color-assist2;
      font-size: 14px;
    }
    .withdraw-info_content {
      margin: 10px auto;
      padding: 10px 60px 30px;
      width: 740px;
      background-color: $color-assist4;
      text-align: left;

      .remind {
        font-size: 12px;
      }
      .tag-switch {
        margin-bottom: 10px;
      }
      .add-address_wrap {
        margin-top: 20px;
        padding: 0 20px;
        position: relative;
        width: 615px;
        height: 110px;
        background-color: #ffffff;
        border: 1px solid #eaedf5;
        .btns-group {
          position: absolute;
          bottom: 15px;
          right: 20px;
          div {
            font-size: 0;
            display: inline-block;
            &:last-child {
              margin-left: 10px;
            }
          }
        }
        &.focus {
          border-color: $color-primary;
        }
        input,
        textarea {
          border: none;
          resize: none;
          font-size: 12px;
          &::-webkit-input-placeholder {
            color: #c9c9c9;
          }
        }

        input {
          width: 440px;
          height: 43px;
          line-height: 43px;
        }

        textarea {
          display: block;
          margin-top: 2px;
          width: 100%;
          height: 43px;
          line-height: 43px;
          border-bottom: 1px solid #eaedf5;
        }
      }

      .input-box {
        margin-top: 20px;
        font-size: 14px;
        color: $color-text;

        label {
          display: inline-block;
          font-weight: bold;
          margin-bottom: 6px;
        }

        input {
          display: block;
          width: 100%;
          height: 40px;
          background-color: #ffffff;
          border: 1px solid #eaedf5;
          border-radius: 3px;
          text-indent: 30px;

          &:disabled {
            background-color: #f2f2f6;
          }
        }

        span.title-color {
          float: right;
          font-size: 13px;
          color: #97a5b3;
        }
      }

      .order-btn {
        margin-top: 14px;
        font-size: 13px;
        span {
          line-height: 25px;
        }
        .order-info {
          display: flex;
          justify-content: space-between;
          color: #97a5b3;
        }
        .checkbox-wrap {
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }
    }
  }

  .recharge-bit_footer {
    margin: 25px 0;
    font-size: 14px;

    ul {
      margin-top: 10px;
    }

    .hint-wrap {
      float: left;
      padding-left: 11px;
    }

    .hint-list {
      font-size: 12px;
      max-width: 600px;
      color: #999999;

      li {
        margin-bottom: 5px;
        line-height: 19px;
        list-style: none;
        text-indent: -7px;
        span {
          padding-right: 5px;
        }
        &.error {
          color: #ef5252;
          vertical-align: middle;
        }
        .icon-yichangtishi {
          color: #ef5252;
          vertical-align: middle;
          width: 18px;
          display: inline-block;
          height: 18px;
          text-align: center;
        }
      }
    }
  }
  .withdraw-verify-wrap {
    padding: 55px 100px 95px;
    .icon {
      background: url(../../../assets/images/email.png) no-repeat;
      width: 104px;
      height: 77px;
      background-size: 100% 100%;
      margin: 0 auto;
      display: block;
    }
    .title {
      font-size: 16px;
      line-height: 23px;
      color: #777777;
      border: none;
    }
  }
  .withdraw-success-wrap {
    padding: 95px 120px 115px;
    i {
      font-size: 70px;
      color: $color-assist5;
    }
    .title {
      font-size: 24px;
      color: $color-assist5;
    }

    .content {
      font-size: 16px;
      color: $color-assist1;
      margin-top: 10px;
      span {
        color: #e06f0d;
        cursor: pointer;
      }
    }
  }
}
</style>
