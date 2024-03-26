<template>
  <div class="buyieo-form-wrap">
    <tabs class="buyieo-form-tabs" :idx.sync="tabIndex" :count="tabConfig.length">
      <tab-item class="tab-item" v-for="(v,i) in tabConfig" :key="i" :index="i" disabled="v.click">
        <span slot="label">{{v.label}}</span>
      </tab-item>
    </tabs>
    <a class="deposite" @click="toDeposite">{{ langText.deposit }} {{ paymen_currency_unit }}</a>
    <div class="balance">{{ langText.balance }} {{ curAccount.total }} {{ paymen_currency_unit }}</div>
    <div class="payment">
      <span>{{ langText.payment }}</span>
      <!--      <input type="number" v-model="payment_num" @input="changePaymentNumInput" disabled="true"-->
      <!--             :placeholder='langText.payment_placeholder' autofocus-->
      <!--             autocomplete="off">-->
      <span class="paymentInput"> {{ payment_num }}</span>
      <span class="unit-payment">{{ paymen_currency_unit }}</span>
    </div>
    <!--    <tabs class="buyieo-form-percent" :idx.sync="percentIndex" :count="percentConfig.length">-->
    <!--      <tab-item class="tab-item" v-for="(v,i) in percentConfig" :key="i" :index="i">-->
    <!--        <span slot="label">{{v.label}}</span>-->
    <!--      </tab-item>-->
    <!--    </tabs>-->
    <div class="getNewCoin">
      <span class="puchaseDes">{{ langText.get }}</span>
      <input type="text" v-model="get_value"
             @keyup="number($event)"
             :placeholder="langText.get_placeholder"
             autocomplete="off" maxlength="10" >
      <span class="unit-payment">{{ currency }}</span>
    </div>
    <div v-if="isLogin">
      <div class="checkbox-wrap">
        <v-checkbox v-model="checked">
          {{ langText.ieo_protocol }}
          <router-link
            :to="$i18nRoute({path: '/documents/ieoAgreement'})"
            target="_blank"
            class="protocol-title"
          >{{ langText.scan_ieo_protocol }}
          </router-link>
        </v-checkbox>
      </div>
      <div class="btn">
        <v-btn
          id='submit'
          :type="btnType" @click="submit" :disable="btnType==='default'">{{langText.buy}}
        </v-btn>
      </div>
    </div>
    <div class="logout" v-else>
      <router-link :to="$i18nRoute({ name: 'signin' })">{{$t('m.exchange.login')}}</router-link> or
      <router-link :to="$i18nRoute({ name: 'signup' })">{{$t('m.exchange.join')}}</router-link>
      {{$t('m.exchange.trading')}}
    </div>

    <ul class="billlist" v-if="isLogin">
      <li>
        <p class="billname"> {{langText.estimated_value}}</p>
        <p class="billvalue">{{ this.estimated_value }} USDT</p>
      </li>

      <li>
        <p class="billname">{{ langText.price_name }}</p>
        <p class="billvalue">{{ this.price }} USDT</p>
      </li>

      <li>
        <p class="billname">{{ langText.purchase_amount }}</p>
        <p class="billvalue">{{this.purchase_amount }} {{ currency }}</p>
      </li>

      <li>
        <p class="billname">{{ langText.bonus_name }}</p>
        <p class="billvalue">{{ bonus }} {{ currency }}</p>
      </li>

      <li>
        <p class="billname">{{ langText.amount_including_bonus }}</p>
        <p class="billvalue">{{ this.amount_including_bonus }} {{ currency }}</p>
      </li>
    </ul>
    <!--    <div class="cautions">-->
    <!--      <div class="tittle">CAUTIONS</div>-->
    <!--      <div class="separateLine"></div>-->
    <!--      <ul>-->
    <!--        <li v-for="item in cautions" :key="item.id">-->
    <!--          <span class="circle">-->
    <!--          </span>-->
    <!--          <span>{{ item.des }}</span>-->

    <!--        </li>-->
    <!--      </ul>-->
    <!--    </div>-->
  </div>
</template>

<script>
import Tabs from '@/components/tabs/tabs'
import TabItem from '@/components/tabs/tab-item'
import VBtn from '@/components/btn'
import VCheckbox from '@/components/checkbox'
import { mapGetters, mapState, mapActions } from 'vuex'
import { BigNumber } from 'bignumber.js'
import Message from '@/utils/message'

export default {
  props: ['langText', 'isStart', 'isEnd'],

  components: {
    Tabs,
    TabItem,
    VBtn,
    VCheckbox,
  },
  // ...mapActions('accounts', ['accounts', 'totalAccount']),

  data() {
    return {
      tabConfig: [
        {
          // label: this.$t('m.exchange.buy'),
          label: 'AT',
          name: 'AT',
          click: false,
        },
        {
          label: 'USDT',
          name: 'USDT',
          click: true,
        },
        {
          label: 'BTC',
          name: 'BTC',
          click: false,
        },
        {
          label: 'ETH',
          name: 'ETH',
          click: false,
        },
      ],
      percentConfig: [
        {
          // label: this.$t('m.exchange.buy'),
          label: '25%',
          name: '25%',
        },
        {
          label: '50%',
          name: '50%',
        },
        {
          label: '75%',
          name: '75%',
        },
        {
          label: '100%',
          name: '100%',
        },
      ],
      billList: [
        {
          name: 'Estimated Value',
          value: '100.000000 USDT',
        },
        {
          name: 'Price',
          value: '100.000000 USDT',
        },
        {
          name: 'Purchase amount',
          value: 'Bonus',
        },
        {
          name: 'Amount including Bonus',
          value: '100.000000 USDT',
        },
        {
          name: 'Value',
          value: '100.000000 USDT',
        },
      ],
      cautions: [
        {
          id: 1,
          des: 'Distribution schedule of NAVI is to be determined by the issuer',
        },
        {
          id: 2,
          des: 'Distribution schedule of NAVI is to be determined by the issuer',
        },
        {
          id: 3,
          des: 'Distribution schedule of NAVI is to be determined by the issuer',
        },
        {
          id: 4,
          des: 'Distribution schedule of NAVI is to be determined by the issuer',
        },
      ],
      tabIndex: 1,
      percentIndex: -1,
      init: true,
      paymen_currency_unit: 'USDT',
      currency: this.$route.params.currency.toUpperCase(),
      checked: false,
      payment_num: '',
      get_value: '',
      estimated_value: 0.0,
      purchase_amount: 0.0,
      amount_including_bonus: 0.0,
      price: 0.0,
      bonus: 0.0,
    }
  },
  created() {
    this.getUsdt()
    this.tabIndex = 1
  },
  computed: {
    ...mapState('ieoInfo', ['currentRate']),
    ...mapGetters('accounts', ['accounts', 'totalAccount']),
    ...mapGetters('tickers', ['atUsdtRate', 'btcUsdtRate', 'ethUsdtRate']),
    ...mapGetters('ieoInfo', ['exchangeRate', 'ieoCode', 'paymentCurrency']),
    ...mapGetters('currentUser', ['isLogin']),
    ...mapState('ieoInfo', ['ieoRspVo']),
    ...mapState('currentUser', ['currentUser']),

    curAccount: function() {
      return this.accounts[this.paymen_currency_unit.toLowerCase()] || {}
    },
    btnType: function() {
      return this.canSubmit() ? 'primary' : 'default'
    },
  },
  watch: {
    tabIndex() {
      this.paymen_currency_unit = this.tabConfig[this.tabIndex].label
    },
    // get_value(newName) {
    //   let reg = /^([1-9])$/
    //   if (!reg.test(newName)) {
    //     this.get_value = ''
    //     this.changeGetNewCoinInput()
    //   } else {
    //     this.get_value = newName
    //   }
    // },
  },
  methods: {
    ...mapActions('ieoPurchase', ['submitIeoOrder']),
    // 验证只能输入正整数
    number(e) {

      // console.log(e.target.value)
      // let flag = new RegExp('^[1-9]([0-9]){0,9}$').test(e.target.value)
      // eslint-disable-next-line no-unused-vars
      let value = e.target.value
      // eslint-disable-next-line no-useless-escape
      this.get_value = this.get_value.replace(/[^\d\\.]/g, '')
      console.log('输入的金额是:' + this.get_value)
      // if (flag) {
      // this.get_value = ''
      this.changeGetNewCoinInput()
      // }
    },

    // 验证是否是10的倍数
    isTenMutiple(number) {
      return number % 10 == 0
    },
    // 返回最接近的整数
    getLastTenNumber(number) {
      return Math.ceil(number / 10) * 10
    },
    toDeposite() {
      this.$router.replace(
        this.$i18nRoute({
          name: 'rechargeCurrency',
          params: {
            currency: this.paymen_currency_unit,
          },
        }),
      )
    },
    // changePaymentNumInput() {
    //   let input = parseFloat(this.payment_num)
    //   // 转化率
    //   let rate = this.exchangeRate(this.paymen_currency_unit)
    //   // 奖励比率
    //   let prizeRate = parseFloat(this.currentRate)
    //   // 转usdt
    //   this.estimated_value = BigNumber(input)
    //     .multipliedBy(this.getUsdt()).toFixed(8)
    //     // 购买数量
    //   this.purchase_amount = BigNumber(input)
    //     .multipliedBy(rate).toFixed(0)
    //     // 赠送数量
    //   this.bonus = BigNumber(input)
    //     .multipliedBy(prizeRate).toFixed(0)
    //     // 总数量
    //   this.amount_including_bonus = parseFloat(this.purchase_amount) + parseFloat(this.bonus)
    //   this.get_value = this.amount_including_bonus
    //   // 单价
    //   this.price = BigNumber(1).toFixed(8)
    // },
    clearData() {
      this.get_value = ''
      this.changeGetNewCoinInput()
    },
    changeGetNewCoinInput() {
      if (this.get_value === '') {
        this.payment_num = ''
        this.get_value = ''
        this.estimated_value = 0
        this.purchase_amount = 0
        this.amount_including_bonus = 0
        this.price = 0
        this.bonus = 0
        return
      }
      // 购买新币的数量
      let input = parseFloat(this.get_value)
      // 转化率
      let rate = this.exchangeRate(this.paymen_currency_unit)
      // 奖励比率
      let prizeRate = parseFloat(this.currentRate)
      //
      this.payment_num = BigNumber(input).multipliedBy(rate).toFixed(8)
      // 转usdt
      this.estimated_value = BigNumber(this.payment_num)
        .multipliedBy(this.getUsdt()).toFixed(8)
        // 购买数量
      this.purchase_amount = input
      // 赠送数量
      this.bonus = BigNumber(this.get_value)
        .multipliedBy(prizeRate).toFixed(0)
        // 总数量
      this.amount_including_bonus = parseFloat(input) + parseFloat(this.bonus)
      // this.get_value = input
      // 单价
      this.price = BigNumber(1).toFixed(8)
    },
    canSubmit() {
      return this.checked
        // 输入数量验证
        && this.payment_num !== '' && this.get_value !== ''
        // 有效时间验证
        && this.isStart == true && this.isEnd == false
        // 剩余数验证
        && this.ieoRspVo.amount > this.ieoRspVo.saleNum
    },
    getUsdt() {
      if (this.paymen_currency_unit === 'AT') {
        return this.atUsdtRate
      } else if (this.paymen_currency_unit === 'BTC') {
        return this.btcUsdtRate
      } else if (this.paymen_currency_unit === 'ETH') {
        return this.ethUsdtRate
      } else {
        return 1
      }
    },
    //  提交订单
    submit() {
      // console.log(this.ieoCode + '--' + this.currentUser.id + '--' + this.purchase_amount +
      // '--' + parseFloat(this.payment_num) + '--' + this.bonus + '--' +
      //   this.exchangeRate(this.paymen_currency_unit) + '--' + this.paymentCurrency(this.paymen_currency_unit))
      // this.submitIeoOrder({
      //   ieoCode: this.ieoCode,
      //   memberId: this.currentUser.id,
      //   buyAmount: parseFloat(this.purchase_amount),
      //   currencyAmount: parseFloat(this.payment_num),
      //   rewardAmount:this.bonus,
      //   rewardRate: this.exchangeRate(this.paymen_currency_unit),
      //   currency: this.paymentCurrency(this.paymen_currency_unit),
      // })
      // 1.验证是否登录
      // 2.验证是否是10的倍数
      if (!this.isTenMutiple(parseInt(this.get_value))) {
        // this.get_value = this.getLastTenNumber(parseInt(this.get_value))
        Message.error(this.langText.quantityVerification)
        this.get_value = ''
        this.changeGetNewCoinInput()
        return
      }
      if (parseFloat(this.curAccount.total) < parseFloat(this.payment_num)) {
        Message.error(this.langText.rechargePrompt)
      } else {
        this.submitIeoOrder({
          ieoCode: this.ieoCode,
          memberId: this.currentUser.id,
          buyAmount: this.purchase_amount,
          currencyAmount: parseFloat(this.payment_num),
          rewardAmount:this.bonus,
          rewardRate: parseFloat(this.currentRate),
          currency: this.paymentCurrency(this.paymen_currency_unit),
        }),
        this.clearData()
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .buyieo-form-wrap {
    max-width: 500px;
    margin: 0 auto;

    .buyieo-form-tabs,
    .buyieo-form-percent {
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
        &:nth-child(4) {
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
    .buyieo-form-percent {
      height: 20px;
      line-height: 20px;
    }

    .deposite {
      display: block;
      font-size: 14px;
      margin-top: 20px;
      margin-right: 0;
      text-align: right;
      color: #4b58ec;
      cursor: pointer;
    }

    .balance {
      text-align: right;
      font-size: 14px;
      margin-top: 15px;
    }

    .payment,
    .getNewCoin {
      display: flex;
      height: 50px;
      border: 1px solid #f5f5f5;
      margin-top: 15px;

      span {
        display: inline-block;
        margin-left: 15px;
        width: 100px;
        line-height: 50px;
        border-right: 1px solid #f5f5f5;
      }
      .paymentInput {
        display: inline-block;
        text-align: center;
        width: 370px;
        max-width: 300px;
        flex: 1;
        margin-left: 30px;
        border-style: none;
      }
      input {
        text-align: center;
        width: 200px;
        max-width: 200px;
        flex: 1;
        margin-left: 10px;
        outline-color: invert;
        outline-style: none;
        outline-width: 0;
        border-style: none;
        text-shadow: none;
        -webkit-appearance: none;
        -webkit-user-select: text;
        box-shadow: none;
      }

      .puchaseDes {
        width: 180px;
      }
      .unit-payment {
        text-align: right;
        width: 70px;
        margin-right: 15px;
        border: 0 solid #000000;
      }
    }
    .getNewCoin {
      span {
        border-right-width: 0;
      }
    }
    .checkbox-wrap {
      margin-top: 30px;
    }

    .protocol-title {
      color: #e06f0d;
    }

    .btn {
      margin-top: 30px;

      button {
        width: 100%;
        margin: 0 auto !important;
        padding: 0;
      }
    }
    .billlist {
      margin-top: 25px;

      li {
        height: 30px;

        .billname {
          float: left;
        }

        .billvalue {
          float: right;
        }
      }
    }
    .cautions {
      margin-top: 45px;

      .tittle {
        text-align: center;
        font-size: 20px;
      }

      .separateLine {
        margin-top: 25px;
        background-color: #d8d8d8;
        height: 1px;
      }

      ul {
        margin-top: 20px;

        li {
          height: 20px;
          font-size: 12px;
          line-height: 20px;

          .circle {
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: black;
          }
        }
      }
    }
  }

  .logout {
    font-size: 14px;
    text-align: center;
    margin-top: 50px;

    @include themify($themes) {
      color: themed('textColor3');
    }
    a {
      color: #4c84ff;
    }
  }
</style>
