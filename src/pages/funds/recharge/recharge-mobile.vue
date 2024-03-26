<template>
  <div class="funds-dialog_recharge">
    <div class="recharge-bit_name">
      <v-select
        :selectItems="accountsList"
        :type="selectType"
        :selected="selected || selectItems[0]"
        @change="changeBit"
      ></v-select>
    </div>
    <div v-if="selected.currency === 'usdt' || selected.currency === 'USDT'" class="chain-type">Chain Type:</div>
    <tabs v-if="selected.currency === 'usdt' || selected.currency === 'USDT'" class="recharge-usdt-tabs" :idx.sync="tabIndex" :count="tabConfig.length">
      <tab-item class="tab-item" v-for="(v,i) in tabConfig" :key="i" :index="i">
        <span slot="label">{{v.label}}</span>
      </tab-item>
    </tabs>
    <div v-if="selected.currency">
      <div
        v-if="selected.depositable === false"
        style="margin:150px 50px; line-height:1.7; text-align:center;"
        class="dark-text-color"
      >{{selected.vote_currency ? $t('m.funds.voteRechargePause') : $t('m.funds.rechargePause')}}</div>
      <div class="recharge-bit_info" v-else>
        <a href>
          <div class="bit-qrcode" id="qrcode"></div>
        </a>
        <p class="qrcode-info">{{$t('m.funds.saveQr')}}</p>
        <div class="code-text" v-if="selected.deposit_address">
          <p class="copy-success" :class="{animate:copySuccess}">
            <i class="iconfont icon-chenggong"></i>
            {{$t('m.funds.copySuccess')}}
          </p>
          <p class="address semi-bold">{{selected.deposit_address}}</p>
          <v-btn
            v-clipboard:copy="selected.deposit_address"
            v-clipboard:success="onSuccess"
            v-clipboard:error="onError"
            width="200"
            type="primary"
          >{{$t('m.funds.copyAddress')}}</v-btn>
          <p class="tip" v-if="selected.currency === 'wicc' || selected.currency === 'icx'">
            <span>{{$t('m.funds.message9', {currency: selected.currency.toUpperCase()})}}</span>
          </p>
          <p class="tip" v-if="selected.currency === 'at'">{{$t('m.funds.policyTip')}}</p>
        </div>
        <div class="code-text" v-if="isShowMemoSelect">
          <p class="copy-success" :class="{animate:copyMemoSuccess}">
            <i class="iconfont icon-chenggong"></i>
            {{$t('m.funds.copySuccess')}}
          </p>
          <p class="address semi-bold">{{selected.memo}}</p>
          <v-btn
            v-clipboard:copy="selected.memo"
            v-clipboard:success="onMemoSuccess"
            v-clipboard:error="onError"
            width="200"
            type="primary"
          >{{$t('m.funds.copyTag')}}</v-btn>
          <p class="tip">{{$t('m.funds.tagTip')}}</p>
        </div>
        <a
          class="trx-tip"
          target="_blank"
          v-if="isTrx"
          :href="$fifth.isCn ? 'https://help.riostox.com/hc/zh-cn/articles/360025752012-TRC10-TRC20-%E5%85%85%E5%80%BC%E7%9B%B8%E5%85%B3' : 'https://help.riostox.com/hc/en-us/articles/360025752012-Deposit-on-TRC10-TRC20-token'"
        >{{$t('m.funds.importantTip')}}</a>
      </div>
      <div class="recharge-bit_footer clearfix">
        <div class="hint-wrap">
          <p class="title fb color-text">{{$t('m.funds.reminder')}}</p>
          <ul class="hint-list fm dark-text-color">
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
            <li v-if="selected.memo">
              <i>·</i>
              {{$t('m.funds.message5')}}
            </li>
            <li>
              <i>·</i>
              {{$t('m.funds.message7')}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VSelect from '@/components/select-mobile'
import rechargeMixin from './recharge-mixin'
import Tabs from '@/components/tabs/tabs'
import TabItem from '@/components/tabs/tab-item'
export default {
  mixins: [rechargeMixin],
  components: {
    VSelect,
    Tabs,
    TabItem,
  },
  data() {
    return {
      qrcodeWidth: 170,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variable.scss';

.chain-type {
  color: #999999;
  font-size: 14px;
  text-align: left;
  margin-top: 8px;
}

.recharge-usdt-tabs {
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

.funds-dialog_recharge {
  margin: 0 auto;
  padding: 0 15px;
  .error {
    color: $color-error;
  }
  .recharge-bit_name {
    width: 100%;
    margin: 0 auto;
  }
  .deposit-label {
    font-size: 14px;
    text-align: left;
  }

  .trx-tip {
    color: #4c84ff;
    font-size: 12px;
    display: block;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding-bottom: 10px;
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
  .recharge-bit_info {
    text-align: center;

    .bit-funds_info {
      padding: 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 12px;
    }

    .bit-qrcode {
      display: inline-block;
      margin: 20px auto 5px;
      padding: 15px;
      width: 200px;
      height: 200px;
      // border: 1px solid #bdc7d1;
      background-color: #ffffff;
      box-shadow: rgba(0, 0, 0, 0.07) 0 4px 17px;
      border-radius: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .qrcode-info {
      font-size: 15px;
      color: #97a5b3;
      text-align: center;
      margin: 20px 0 19px;
    }
    .v-btn {
      margin: 0;
    }
    .code-text {
      width: 100%;
      margin: 0 auto;
      position: relative;
      padding: 20px 0 20px;
      .tip {
        color: #da4343;
        font-size: 13px;
        margin-top: 15px;
      }
      .btn-input-wrap {
        margin-bottom: 15px;
      }
      .address {
        color: #333333;
        font-size: 14px;
        margin: 0 auto 20px;
        width: 100%;
        text-align: center;
        word-break: break-all;
      }
      .copy-success {
        text-align: right;
        color: $color-assist5;
        font-size: 12px;
        opacity: 0;
        position: absolute;
        right: -15px;
        bottom: 10px;
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
    font-size: 14px;
    width: 315px;
    margin: 0 auto;
    padding-top: 30px;
    .hint-list {
      font-size: 12px;
      margin-top: 10px;
      li {
        margin-bottom: 5px;
        list-style: none;
        line-height: 17px;
        span {
          padding-right: 6px;
        }
      }
    }
  }
}
</style>
