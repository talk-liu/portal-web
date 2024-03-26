<template>
  <div class="funds-dialog_recharge">
    <h2>Deposit instructions</h2>
    <p>Fund Your* account by contacting your approved external bank on file, and have sent to us.</p>

    <div v-show="types.continueBoll">
      <p style="margin: 50px 0px">
        <el-select placeholder="Currency" v-model="currencyUsd">
          <el-option v-for="item in currencyOptions" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </p>
      <el-button @click="continueEve">Continue</el-button>
    </div>

    <div v-if="types.instructionsBoll" class="currencyForm">
      <p class="usd">
        <span> Currency </span>
        <el-select disabled placeholder="USD" size="mini" value="USD"> </el-select>
      </p>
      <p style="text-align: right">
        <a href="javascript:;"> <router-link :to="$i18nRoute({name: 'Member'})">Manage external accounts</router-link> </a>
      </p>

      <el-form ref="bankForm" :rules="rules" :model="bankForm" v-loading="loading">
        <el-form-item prop="bank_card_id">
          <el-select placeholder="Funding source" v-model="bankForm.bank_card_id">
            <el-option v-for="(item, key) in bankList" :key="key" :label="item.bank_name" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="source_of_funds">
          <el-select placeholder="Source of funds" v-model="bankForm.source_of_funds">
            <el-option v-for="(keys, item) in sourceOfFundsOptions" :key="keys" :label="item" :value="keys"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="amount">
          <el-input placeholder="Amount" v-model="bankForm.amount">
            <template slot="append">USD</template>
          </el-input>
        </el-form-item>
      </el-form>

      <div class="transfer">
        <h4>Transfer Fees</h4>
        <p>
          Although we don’t charge fees, the banks that handle your wire transfer may charge fees. Any fees incurred
          will be deducted from the TrueUSD that it minted. Domestic wire fees can be around $30 USD and international
          wire fees can be up to $100 USD depending on the intermediaries between our fiduciary partners and your bank.
        </p>
      </div>
      <el-button @click="instructionsEve" :disabled="disabled">Get Instructions</el-button>
    </div>
    <div v-if="types.returnBoll" class="information">
      <p>The information below will be necessary for a wire transfer into First Digital Trust. To proceed:</p>
      <ul>
        <li>
          <label>Bank address</label>
          <span>{{ bankWiresData.target_bank_city }} {{ bankWiresData.target_bank_country }}</span>
        </li>
        <li>
          <label>Account name</label>
          <span>{{ bankWiresData.target_bank_account_beneficiary_name }}</span>
        </li>
        <li>
          <label>Account number</label>
          <span>{{ bankWiresData.target_bank_account_number }}</span>
        </li>
        <li>
          <label>Currency</label>
          <span>USD</span>
        </li>
        <li>
          <label>SWIFT code</label>
          <span>{{ bankWiresData.target_bank_swift }}</span>
        </li>
        <!-- <li>
          <label>CNAPS code</label>
          <span>{{ bankWiresData.target_bank_cnaps }}</span>
        </li> -->
        <li>
          <label>Branch</label>
          <span>{{ bankWiresData.target_bank_name }}</span>
        </li>
        <li>
          <label>Amount</label>
          <span>{{ bankWiresData.amount }}</span>
        </li>
        <li>
          <label>Reference Nr.</label>
          <a href="javascript:;" title="点击复制" @click="copy(bankWiresData.provider_tracking_ref)">{{ bankWiresData.provider_tracking_ref }}</a>
        </li>
      </ul>
      <p class="attention">
        Attention! You must write {{ bankWiresData.provider_tracking_ref }} in the memo or instructions filed of the
        wire transfer in orer for funds to reach your First Digital Trust accont
      </p>
      <el-button @click="returnEve">Return to the Form</el-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import api from '@/graphql'
import Cry from './cry'
import { sourceOfFundsOptions, currencyOptions } from './bank.js'

import { Form, FormItem, Select, Option, Button, Input, Loading } from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Input)
Vue.use(Loading)

export default {
  components: {
    Cry,
  },
  data() {
    return {
      sourceOfFundsOptions: sourceOfFundsOptions,
      activeName: 'cry',
      bankList: [],
      loading: true,
      disabled: false,
      // 创建订单
      bankForm: {
        bank_card_id: '',
        source_of_funds: '',
        amount: '',
      },
      rules: {
        bank_card_id: [{ required: true, trigger: 'change' }],
        source_of_funds: [{ required: true, trigger: 'change' }],
        amount: [{ required: true, trigger: 'change' }],
      },
      currencyOptions: currencyOptions,
      currencyUsd: 'USD',
      types: {
        continueBoll: true,
        instructionsBoll: false,
        returnBoll: false,
      },
      // 详情列表
      bankWiresData: {},
    }
  },
  async mounted() {
    const { data } = await api.query('DEPOSITLIST')
    if (data.depositList.result) {
      const attr = []
      for (let i in data.depositList.result) {
        attr.push(data.depositList.result[i])
      }
      this.loading = false
      this.bankList = attr
    }
  },
  methods: {
    copy(val) {
      let oInput = document.createElement('input')
      oInput.value = val
      document.body.appendChild(oInput)
      oInput.select() // 选择对象;
      // 执行浏览器复制命令
      /// 复制命令会将当前选中的内容复制到剪切板中
      /// 如这里构建的 Input标签
      document.execCommand('Copy')
      ///复制成功后再将构造的标签 移除
      oInput.remove()
    },
    continueEve() {
      this.types.instructionsBoll = true
      this.types.returnBoll = false
      this.types.continueBoll = false
    },
    instructionsEve() {
      this.$refs['bankForm'].validate((valid) => {
        if (valid) {
          this.disabled = true
          api.query('BANKWIRES', this.bankForm).then(({ data }) => {
            if (data.bankWires.result) {
              this.types.instructionsBoll = false
              this.types.continueBoll = false
              this.types.returnBoll = true

              api.query('BANKWIRESGET', { id: data.bankWires.result.id }).then(({ data }) => {
                this.disabled = false
                if (data.bankWiresGet.result) {
                  this.bankWiresData = data.bankWiresGet.result
                }
              })
            }
          })
        }
      })
    },
    returnEve() {
      this.types.continueBoll = true
      this.types.instructionsBoll = false
      this.types.returnBoll = false
    },
  },
}
</script>

<style lang="scss" scoped>
.funds-dialog_recharge {
  padding: 50px 0 50px;
  margin: 0 auto;
  max-width: 540px;
  min-height: 700px;
  text-align: center;
  h2 {
    font-size: 24px;
  }
  p {
    font-size: 16px;
    color: #888;
    margin: 24px 0px;
  }
  .el-button {
    background: #07e9b2;
    border: none;
    border-radius: 5px;
    box-shadow: none;
    color: #002060;
    font-size: 20px;
    font-weight: 700;
    line-height: 120%;
  }

  .currencyForm {
    .el-select {
      width: 100%;
      text-align: center;
    }
    .usd {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-select {
        width: 90px;
      }
      input {
        border: none;
      }
    }
    a {
      color: #888;
      font-size: 13px;
      text-decoration: underline;
    }
    .transfer,
    .transfer p {
      color: #e80000;
      font-size: 13px;
    }
  }
  .information {
    margin-top: 40px;
    font-size: 16px;
    color: #333;
    p {
      text-align: left;
    }
    ul {
      text-align: left;
      li {
        margin-bottom: 16px;
        label {
          font-weight: bold;
        }
        span {
          margin-left: 20px;
        }
      }
    }
    .attention {
      color: #4e87f7;
      margin-top: 70px;
      text-align: center;
    }
  }
}
</style>
