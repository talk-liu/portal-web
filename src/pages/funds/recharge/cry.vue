<template>
  <div class="funds-dialog_recharge">
    <!-- <div class="headline">{{$t('m.funds.fundsMenu.recharge')}}</div> -->
    <div class="recharge-bit_name">
      <v-select
        :selectItems="accountsList"
        :type="selectType"
        :selected="selected || selectItems[0]"
        @change="changeBit"
      ></v-select>
    </div>
    <div class="recharge-bit_info" v-if="selected.currency">
      <div class="bit-funds_info">
        <div>
          <span class="fb">{{$t('m.funds.balance')}}</span>
          <span
            class="semi-bold"
          >{{(Number(selected.balance) + Number(selected.locked)).toFixed(8)}} {{unit}}</span>
        </div>
        <div>
          <span class="fb">{{$t('m.funds.availableBalance')}}</span>
          <span class="semi-bold">{{Number(selected.balance).toFixed(8)}} {{unit}}</span>
        </div>
        <div>
          <span class="fb">{{$t('m.funds.frozed')}}</span>
          <span class="semi-bold">{{Number(selected.locked).toFixed(8)}} {{unit}}</span>
        </div>
      </div>
      <div v-if="selected.currency.toLowerCase() === 'usdt'" class="chain-type">Chain Type:</div>
      <tabs v-if="selected.currency.toLowerCase() === 'usdt'" class="recharge-usdt-tabs" :idx.sync="tabIndex" :count="tabConfig.length">
        <tab-item class="tab-item" v-for="(v,i) in tabConfig" :key="i" :index="i">
          <span slot="label">{{v.label}}</span>
        </tab-item>
      </tabs>
      <div
        style="margin:150px 80px; line-height:1.7; text-align:center;"
        v-if="selected.depositable === false"
      >{{selected.vote_currency ? $t('m.funds.voteRechargePause') : $t('m.funds.rechargePause')}}
      </div>
      <div v-else>
        <div v-if="isShowMemoSelect" class="xrp-remind-wrap">
          <div class="important">
            <strong>{{$t('m.funds.xrpImportant')}}</strong>
            <ul>
              <li>{{$t('m.funds.xrpState',{unit:unit})}}</li>
            </ul>
          </div>
          <div class="force-info">
            <i class="iconfont icon-yichangtishi"></i>
            {{$t('m.funds.xrpInfo',{unit:unit})}}
          </div>
          <div class="xrp-check">
            <v-checkbox v-model="understand">{{$t('m.funds.xrpUnderstand')}}</v-checkbox>
            <v-btn
              :type="continueBtn"
              :width="300"
              @click="continueDeposit"
            >{{$t('m.funds.continueRecharge')}}</v-btn>
          </div>
        </div>
        <div v-else>
          <div>
            <div class="qrcode-box">
              <div class="bit-qrcode" id="qrcode"></div>
              <img
                src="../../../assets/images/reload.png"
                @click="reloadAddress"
                class="img"
                v-if="!selected.deposit_address && iconShow"
              >
            </div>
            <div class="code-text">
              <p class="copy-success" :class="{animate:copySuccess}">
                <i class="iconfont icon-chenggong"></i>
                {{$t('m.funds.copySuccess')}}
              </p>
              <div
                v-if="selected.memo && selected.currency !== 'grin'"
                class="deposit-label fb"
              >{{unit}} {{$t('m.funds.depositTag')}}</div>
              <v-btn-input
                v-if="selected.memo && selected.currency !== 'grin'"
                v-model="selected.memo"
                :disabled="true"
              >
                <div
                  slot="append"
                  v-clipboard:copy="selected.memo"
                  v-clipboard:success="onSuccess"
                  v-clipboard:error="onError"
                >{{$t('m.funds.copy')}}</div>
              </v-btn-input>
              <div v-if="selected.deposit_address" class="deposit-label deposit-tip fb flex jcsb">
                {{unit}} {{$t('m.funds.depositAdd')}}
                <a
                  target="_blank"
                  v-if="isTrx"
                  :href="$fifth.isCn ? 'https://help.riostox.com/hc/zh-cn/articles/360025752012-TRC10-TRC20-%E5%85%85%E5%80%BC%E7%9B%B8%E5%85%B3' : 'https://help.riostox.com/hc/en-us/articles/360025752012-Deposit-on-TRC10-TRC20-token'"
                >{{$t('m.funds.importantTip')}}</a>
              </div>
              <v-btn-input :value="selected.deposit_address" :disabled="true">
                <div
                  slot="append"
                  v-clipboard:copy="selected.deposit_address"
                  v-clipboard:success="onSuccess"
                  v-clipboard:error="onError"
                >{{$t('m.funds.copy')}}</div>
              </v-btn-input>
              <p v-if="selected.currency === 'at'" class="error">{{$t('m.funds.policyTip')}}</p>
            </div>
            <div
              class="recharge-tip"
              v-if="selected.currency === 'wicc' || selected.currency === 'icx'"
            >
              <i class="iconfont icon-yichangtishi"></i>
              <span>{{$t('m.funds.message9', {currency: selected.currency.toUpperCase()})}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="recharge-bit_footer clearfix" v-if="selected.currency">
      <div class="hint-wrap">
        <p class="title color-text fb">{{$t('m.funds.reminder')}}</p>
        <ul class="dark-text-color hint-list fm">
          <li class="error" v-if="selected.depositable === false && selected.vote_currency">
            <i>·</i>
            {{$t('m.funds.voteCoinTip')}}
          </li>
          <li class="error" v-if="selected.base_currency_code === 'trx'">
            <i>·</i>
            {{$t('m.funds.trxAttention',{ coin: selected.token_info_kind && selected.token_info_kind.toUpperCase()}) }}
          </li>
          <li class="error" v-else>
            <i>·</i>
            {{$t('m.funds.message6',{ currency: selected.currency && selected.currency.toUpperCase()})}}
          </li>
          <li class="error">
            <i>·</i>
            {{$t('m.funds.message8')}}
          </li>
          <li>
            <i>·</i>
            {{$t('m.funds.message4',{ unit: unit, maxConfirm: '' + selected.max_confirmations})}}
          </li>
          <li>
            <i>·</i>
            {{$t('m.funds.message3')}}
          </li>
          <li>
            <i>·</i>
            {{$t('m.funds.message7')}}
          </li>
        </ul>
      </div>
      <v-all-tickers :currency="selected.currency"></v-all-tickers>
    </div>
    <v-dialog v-if="!isKYC" class="dialog">
    </v-dialog>
  </div>
</template>

<script>
import VSelect from '@/components/select'
import VBtnInput from '@/components/btn-input'
import rechargeMixin from './recharge-mixin'
import Tabs from '@/components/tabs/tabs'
import TabItem from '@/components/tabs/tab-item'
import VDialog from '@/components/kyc-dialog2'
import { mapGetters } from 'vuex'

export default {
  mixins: [rechargeMixin],
  components: {
    VSelect,
    VBtnInput,
    Tabs,
    TabItem,
    VDialog
  },
  data() {
    return {
      qrcodeWidth: 140,

    }
  },
  computed: {
    ...mapGetters('currentUser', ['isKYC']),
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variable.scss';

.chain-type {
  font-size: 14px;
  margin-left: 310px;
  display: block;
  width: 100px;
  text-align: left;
}
.dialog{
  z-index: 1000;
}
.recharge-usdt-tabs {
  height: 30px;
  width: 50%;
  line-height: 30px;
  display: flex;
  padding: 0;
  margin-top: 20px;
  margin-left: 310px;
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

.funds-dialog_recharge {
  padding: 50px 0 50px;
  margin: 0 auto;
  width: 1120px;
  min-height: 700px;
  .error {
    color: $color-error;
    font-size: 12px;
  }
  .headline {
    color: $color-3;
    font-size: 18px;
    font-weight: 500;
    padding-bottom: 24px;
    border-bottom: 1px solid #d8d8d8;
  }
  .recharge-bit_name {
    //height: 55px;
    //border-bottom: 1px solid $color-line;
    padding: 51px 152px 0;
  }

  .deposit-label {
    font-size: 14px;
    text-align: left;
  }
  .deposit-tip {
    margin-bottom: 4px;
    a {
      color: #4c84ff;
      font-size: 12px;
    }
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
  .qrcode-box {
    position: relative;
    .img {
      position: absolute;
      width: 40px;
      left: 50%;
      top: 40%;
      transform: translateX(-50%);
      cursor: pointer;
    }
  }
  .recharge-tip {
    color: #ef5252;
    font-size: 12px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 500px;
    margin: 0 auto;
    span {
      text-align: left;
    }
    .icon-yichangtishi {
      margin: 0 5px 0 0;
      width: 22px;
      display: inline-block;
      height: 18px;
      text-align: center;
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

    .img {
      position: absolute;
      width: 40px;
      left: 50%;
      top: 40%;
      transform: translateX(-50%);
      cursor: pointer;
    }

    .bit-qrcode {
      position: relative;
      display: inline-block;
      margin: 20px auto 5px;
      padding: 10px;
      width: 160px;
      height: 160px;
      border: 1px solid #bdc7d1;
      background-color: #ffffff;
      box-shadow: rgba(0, 0, 0, 0.07) 0 4px 4px 0;
    }

    .code-text {
      margin: 0 auto;
      width: 500px;

      .btn-input-wrap {
        margin-bottom: 15px;
      }

      .copy-success {
        text-align: right;
        color: $color-assist5;
        font-size: 12px;
        opacity: 0;

        &.animate {
          animation: fade 1s ease-in-out;
        }

        i {
          vertical-align: middle;
        }
      }
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

  .recharge-bit_footer {
    margin: 50px 75px 0;
    font-size: 14px;

    ul {
      margin-top: 10px;
    }

    .hint-wrap {
      float: left;
      padding-left: 11px;
      max-width: 600px;
    }

    .hint-list {
      font-size: 12px;
      max-width: 400px;
      li {
        margin-bottom: 5px;
        list-style: none;
        text-indent: -10px;

        span {
          padding-right: 6px;
        }
      }
    }
  }
}
</style>
