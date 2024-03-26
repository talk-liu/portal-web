<template>
  <div class="page-wrap">
    <div class="simplex">
      <h2 class="title tac">Buy BTC/ETH with Credit Card</h2>
      <div class="card">
        <p class="visa">
          <img src="@/assets/images/otc/visa1.png" alt>
        </p>
        <p class="master">
          <img src="@/assets/images/otc/master-card.png" alt>
        </p>
      </div>
      <div class="select-wrap">
        <down-select
          class="mrgSelet"
          :placeholder="payPlaceholder"
          :numValue.sync="fiatNumber"
          :currencyValue.sync="fiatCurrency"
          :requestStatus.sync="fiatRequest"
          :loading="fiatLoading"
          :trendList="fiatTrendList"
          precision="2"
          :errorBorder="fiatError"
        >
          <div slot="tips">
            <p
              class="fee"
              v-if="!fiatLoading && !digitalLoading && !fiatError && !digitalError && fee_money"
            >Fee: {{fee_money}} {{fiatCurrency}}</p>
            <p class="err" v-if="fiatError">{{textError}}</p>
          </div>
        </down-select>
        <down-select
          class="mrgSelet"
          :placeholder="receivelaceholder"
          :numValue.sync="digitalNumber"
          :currencyValue.sync="digitalCurrency"
          :requestStatus.sync="digitalRequest"
          :loading="digitalLoading"
          :trendList="digitalTrendList"
          precision="8"
          :errorBorder="digitalError"
        >
          <div slot="tips">
            <p
              class="differ"
              v-if="!fiatLoading && !digitalLoading && !fiatError && !digitalError && fee_money"
            >{{differText}}</p>
            <p class="err" v-if="digitalError">Please enter a number greater than zero.</p>
          </div>
        </down-select>
      </div>
      <p v-if="currentUser" class="comfirm" @click="conformHandle">Confirm</p>
      <router-link v-if="currentUser" class="to-history" to="/en/otc/history">Transaction History</router-link>

      <div class="no-login" v-else>
        <router-link :to="$i18nRoute({ name: 'signin' })">{{$t('m.exchange.login')}}</router-link> or
        <router-link :to="$i18nRoute({ name: 'signup' })">{{$t('m.exchange.join')}}</router-link>
        <span>{{$t('m.exchange.trading')}}</span>
      </div>

      <div class="help">
        <a class="to-help" href="https://www.simplex.com/support/" target="_blank">Need help？</a>
        <p class="text">Powered by：</p>
        <img src="@/assets/images/otc/simplex.png" alt>
        <p class="text">simplex</p>
      </div>
    </div>
    <div class="process-wrap">
      <h3 class="title tac">Procedure</h3>
      <ul class="process-list">
        <li v-for="(item, index) in step" :key="index">
          <div class="step-img">
            <img :src="item.img" alt>
          </div>
          <p class="step-text">
            <span>{{index + 1}}.</span>
            {{item.text}}
          </p>
        </li>
      </ul>
    </div>
    <a
      class="to-helplink"
      href="https://help.riostox.com/hc/en-us/articles/360020852071-How-to-buy-cryptos-with-a-credit-card-on-Riostox-"
      target="_blank"
    >How to Start</a>
    <form-submit :quoteData="quoteData" :paymentData="paymentData" :email="useremail"></form-submit>
    <toast :message="errors" v-if="errors"></toast>
  </div>
</template>
<script>
import downSelect from '../components/down-select'
import toast from '../components/toast'
import formSubmit from '../components/form-submit'
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      payPlaceholder: 'Pay with（min 50）',
      receivelaceholder: 'Purchased',
      dayLimitText: 'Single day limit is exceeded, please purchase again the next day',
      monthLimitText: 'Single month limit is exceeded, please purchase again the next month',
      needLoginText: 'Please login or sign up first.',
      differText:
        'The actual amount received may differ from the amount you purchased due to fluctuations in the exchange rate.',
      textError: '',
      fiatLoading: false,
      digitalLoading: false,
      fiatCurrency: '',
      digitalCurrency: '',
      currencyValue: '',
      fiatNumber: '',
      digitalNumber: '',
      fiatRequest: true,
      digitalRequest: false,
      fiatTrendList: [
        {
          id: 'USD',
          label: 'USD',
        },
        {
          id: 'EUR',
          label: 'EUR',
        },
      ],
      digitalTrendList: [
        {
          id: 'BTC',
          label: 'BTC',
        },
        {
          id: 'ETH',
          label: 'ETH',
        },
      ],
      step: [
        {
          img: require('@/assets/images/otc/step1.png'),
          text: 'Confirm Amount of Purchase',
        },
        {
          img: require('@/assets/images/otc/step2.png'),
          text: 'Enter Billing and Payment Info',
        },
        {
          img: require('@/assets/images/otc/step3.png'),
          text: 'Cardholder Verification',
        },
        {
          img: require('@/assets/images/otc/step4.png'),
          text: 'Credited within 20-30 mins',
        },
      ],
      timer: null,
      fiatError: false,
      digitalError: false,
      quoteData: {
        wallet_id: null,
        quote_id: null,
        user_id: null,
        fiat_money: {
          total_amount: 0,
          currency: '',
        },
        digital_money: {
          amount: 0,
          currency: '',
        },
      },
      paymentData: {
        payment_id: null,
        wallet_address: null,
        wallet_currency: null,
      },
    }
  },
  components: {
    downSelect,
    toast,
    formSubmit,
  },
  methods: {
    ...mapActions('otc', ['getCurrency', 'paymentOrders']),
    ...mapMutations('otc', ['setDigitalMoney', 'setFiatMoney', 'setErrorTips', 'setMoreThanLimit']),
    // 初始化数据以及状态
    initDataState() {
      this.digitalError = false
      this.fiatError = false
      if (this.errors) {
        this.setErrorTips('')
      }
      if (this.moreThanLimit) {
        this.setMoreThanLimit('')
      }
    },
    getDigital() {
      // 防抖
      this.timer = setTimeout(() => {
        this.digitalLoading = true
        this.fiatNumber &&
          this.getCurrency({
            digital_currency: this.digitalCurrency,
            fiat_currency: this.fiatCurrency,
            requested_currency: this.fiatCurrency,
            requested_amount: parseFloat(this.fiatNumber),
          }).then(res => {
            if (res) {
              this.quoteData = res
              this.digitalNumber = this.digital_money.amount
              this.errorCondition(this.fiat_money.total_amount)
            }
            this.digitalLoading = false
            this.digitalRequest = false
          })
      }, 600)
    },
    getFiat() {
      // 防抖
      this.timer = setTimeout(() => {
        this.fiatLoading = true
        this.digitalNumber &&
          this.getCurrency({
            digital_currency: this.digitalCurrency,
            fiat_currency: this.fiatCurrency,
            requested_currency: this.digitalCurrency,
            requested_amount: parseFloat(this.digitalNumber),
          }).then(res => {
            if (res) {
              this.quoteData = res
              this.fiatNumber = this.fiat_money.base_amount
              this.errorCondition(this.fiat_money.total_amount)
            }
            this.fiatLoading = false
            this.fiatRequest = false
          })
      }, 600)
    },
    fiatToDigital() {
      clearTimeout(this.timer)
      if (this.fiatNumber * 1) {
        if (this.fiatRequest) {
          this.digitalLoading = true
          // 初始化数据
          this.initDataState()
          // 请求数据
          this.getDigital()
        }
      } else {
        this.digitalLoading = false
        this.fiatError = true
        this.textError = this.lessThanText
      }
    },
    digitalToFiat() {
      clearTimeout(this.timer)
      if (this.digitalNumber * 1) {
        if (this.digitalRequest) {
          this.fiatLoading = true
          // 初始化数据
          this.initDataState()
          // 请求数据
          this.getFiat()
        }
      } else {
        this.fiatLoading = false
        this.digitalError = true
      }
    },
    conformHandle() {
      if (this.fiatNumber && this.digitalNumber) {
        if (!this.fiatError && !this.digitalError && this.quote_id) {
          this.paymentOrders(this.quote_id).then(res => {
            if (res === 'error') {
              if (this.moreThanLimit) {
                this.textError = this.moreThanLimit === 'day' ? this.dayLimitText : this.monthLimitText
                this.fiatError = true
              }
            } else if (res) {
              this.paymentData = res
            }
          })
        }
      } else if (!this.fiatNumber) {
        this.textError = this.lessThanText
        this.fiatError = true
      } else if (!this.digitalNumber) {
        this.digitalError = true
      }
    },
    requestDirection() {
      if (this.fiatRequest && this.fiatNumber) {
        this.fiatToDigital()
      }
      if (this.digitalRequest && this.digitalNumber) {
        this.digitalToFiat()
      }
    },
    errorCondition(val) {
      this.fiatError = false
      if (val < 50 || val > 20000) {
        if (val > 20000) {
          this.textError = this.moreThanText
        } else if (val < 50) {
          this.textError = this.lessThanText
        }
        this.fiatError = true
      }
    },
  },
  computed: {
    ...mapState('currentUser', ['currentUser']),
    ...mapGetters('otc', ['fee_money', 'fiat_total_money']),
    ...mapState('otc', ['quote_id', 'digital_money', 'fiat_money', 'moreThanLimit', 'errors']),
    useremail() {
      return this.currentUser && this.currentUser.email
    },
    lessThanText() {
      return `Each payment must be no less than 50 ${this.fiatCurrency} (inclusive of the transaction fee).`
    },
    moreThanText() {
      return `Each payment must be no greater than 20,000 ${this.fiatCurrency} (inclusive of the transaction fee).`
    },
  },
  watch: {
    fiatNumber(val) {
      if (this.currentUser) {
        if (val) {
          this.fiatToDigital()
        } else {
          clearTimeout(this.timer)
          this.digitalLoading = false
          this.textError = this.lessThanText
          this.fiatError = true
        }
      } else {
        this.digitalLoading = false
        this.fiatError = true
        this.textError = this.needLoginText
      }
    },
    digitalNumber(val) {
      if (this.currentUser) {
        if (val) {
          this.digitalToFiat()
        } else {
          clearTimeout(this.timer)
          this.fiatLoading = false
          this.digitalError = true
        }
      } else {
        this.fiatLoading = false
        this.fiatError = true
        this.textError = this.needLoginText
      }
    },
    fiatCurrency() {
      this.requestDirection()
    },
    digitalCurrency() {
      this.requestDirection()
    },
    errors(val) {
      if (val) {
        setTimeout(() => {
          this.setErrorTips('')
        }, 3000)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.tac {
  text-align: center;
}
$color-white-70: rgba(
  $color: #ffffff,
  $alpha: 0.7,
);

img {
  max-width: 100%;
}

.page-wrap {
  min-width: 1200px;
  .simplex {
    height: 540px;
    overflow: hidden;
    background: url('~@/assets/images/otc/page-bg.png') center center no-repeat;
    background-size: cover;
    .title {
      height: 64px;
      line-height: 64px;
      margin-top: 90px;
      color: #ffffff;
      font-size: 48px;
    }
    .card {
      height: 36px;
      margin-top: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        margin: 0 23px;
        &.visa {
          width: 85px;
          height: 26px;
        }
        &.master {
          width: 58px;
          height: 35px;
        }
      }
    }
    .select-wrap {
      height: 94px;
      margin-top: 54px;
      display: flex;
      justify-content: center;
      .mrgSelet {
        margin: 0 18px;
      }
      .fee,
      .err {
        width: 268px;
        margin: 3px 16px 0;
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        color: $color-white-70;
      }
      .err {
        color: #ee4343;
      }
      .differ {
        width: 300px;
        margin: 3px 0 0;
        font-size: 12px;
        line-height: 20px;
        font-weight: 400;
        color: rgba($color: #ffffff, $alpha: 0.45);
      }
    }
    .comfirm {
      width: 138px;
      height: 40px;
      line-height: 40px;
      margin: 27px auto 0;
      background: rgba(255, 210, 0, 1);
      border-radius: 2px;
      color: #333333;
      font-size: 18px;
      text-align: center;
      cursor: pointer;
      user-select: none;
    }
    .to-history {
      width: 120px;
      display: block;
      margin: 12px auto 0;
      text-align: center;
      line-height: 20px;
      color: #4c84ff;
      font-size: 14px;
      font-weight: 400;
    }
    .help {
      width: 600px;
      height: 30px;
      margin-top: 35px;
      margin-left: 50%;
      transform: translateX(320px);
      display: flex;
      align-items: center;
      justify-items: start;
      font-size: 14px;
      .to-help {
        line-height: 20px;
        font-weight: 400;
        margin-right: 28px;
        color: #4c84ff;
      }
      .text {
        line-height: 20px;
        font-weight: bold;
        color: $color-white-70;
      }
      img {
        width: 30px;
        height: 30px;
        margin: 0 4px;
      }
    }
  }
  .process-wrap {
    background: #ffffff;
    overflow: hidden;
    .title {
      height: 48px;
      line-height: 48px;
      color: #000000;
      font-size: 36px;
      margin-top: 80px;
    }
    .process-list {
      margin-top: 60px;
      display: flex;
      // align-items: center;
      justify-content: center;
      li {
        width: 280px;
        margin: 0 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        &:not(:last-child):before {
          content: '';
          width: 35px;
          height: 18px;
          background: url('~@/assets/images/otc/arrow1.png');
          background-size: 35px 18px;
          position: absolute;
          top: 89px;
          right: -38px;
          z-index: $zindex-newspace;
        }
        .step-img {
          width: 200px;
          height: 200px;
        }
        .step-text {
          height: 40px;
          margin-top: 23px;
          color: #333333;
          font-size: 18px;
          span {
            font-size: 32px;
          }
        }
      }
    }
  }
  .to-helplink {
    width: 138px;
    height: 40px;
    line-height: 40px;
    display: block;
    margin: 60px auto;
    text-align: center;
    border-radius: 2px;
    border: 1px solid rgba(187, 187, 187, 1);
    color: #4c84ff;
    font-size: 15px;
    font-weight: bold;
  }
}

.no-login {
  margin-top: 38px;
  height: 60px;
  text-align: center;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
  a {
    color: #4c84ff;
  }
}

@include screen-h5-new() {
  .no-login {
    font-size: 18px;
    height: 40px;
  }
  .page-wrap {
    min-width: 320px;
    .simplex {
      height: unset;
      overflow: hidden;
      background: url('~@/assets/images/otc/page-bg2.png') center center no-repeat;
      background-size: cover;
      .title {
        height: 40px;
        line-height: 40px;
        margin-top: 56px;
        color: #ffffff;
        font-size: 23px;
      }
      .card {
        height: 24px;
        margin-top: 20px;
        p {
          margin: 0 15px;
          &.visa {
            width: 61px;
            height: 19px;
          }
          &.master {
            width: 41px;
            height: 24px;
          }
        }
      }
      .select-wrap {
        height: unset;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: unset;
        align-items: center;
        .mrgSelet {
          margin: 20px 0 0;
        }
        .fee,
        .err {
          margin: 3px 16px 0;
          font-size: 12px;
          line-height: 18px;
        }
      }
      .comfirm {
        width: 120px;
        margin: 38px auto 0;
        font-size: 16px;
      }
      .help {
        width: 100%;
        height: 20px;
        margin: 46px 0 14px;
        transform: unset;
        display: flex;
        justify-content: center;
        font-size: 14px;
        .to-help {
          margin-right: 10px;
        }
        img {
          width: 20px;
          height: 20px;
          margin: 0 4px 0 1px;
        }
      }
    }
    .process-wrap {
      height: auto;
      overflow: hidden;
      .title {
        height: 28px;
        line-height: 28px;
        font-size: 20px;
        margin-top: 30px;
      }
      .process-list {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        li:not(:last-child) {
          width: 100%;
          margin: 0;
          margin-bottom: 54px;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          &:not(:last-child):before {
            display: none;
          }
          &:not(:first-child):after {
            content: '';
            width: 34px;
            height: 16px;
            background: url('~@/assets/images/otc/arrow1.png');
            background-size: 35px 18px;
            transform: translateX(50%) rotate(90deg);
            position: absolute;
            top: -34px;
            right: 50%;
            z-index: $zindex-newspace;
            opacity: 0.5;
          }
          .step-img {
            width: 200px;
            height: 200px;
            border: none;
          }
          .step-text {
            height: 28px;
            margin-top: 4px;
            margin-bottom: 16px;
            font-size: 16px;
            span {
              font-size: 22px;
            }
          }
        }
      }
    }
    .to-helplink {
      margin-top: 50px;
    }
  }
}
</style>

