<template>
  <div class="member-form">
    <h3>Add new bank account</h3>
    <el-form ref="formFields" :rules="rules" :model="formFields" label-width="80px" v-loading="loading">
      <el-form-item class="box" prop="name">
        <el-select v-model="formFields.fdt_country_id" placeholder="Country*">
          <el-option v-for="(item, key) in countries" :key="key" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-form-item prop="state_province">
          <el-input v-model="formFields.state_province" placeholder="State / Region*"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item class="box" prop="city">
        <el-form-item>
          <el-input v-model="formFields.city" placeholder="City*"></el-input>
        </el-form-item>
        <el-form-item prop="address1">
          <el-input v-model="formFields.address1" placeholder="Sreet address, c/o*"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item prop="address2">
        <el-input v-model="formFields.address2" placeholder="Apartament, suit, unit, building, floor, etc.*"></el-input>
      </el-form-item>
      <el-form-item class="box" prop="postal_code">
        <el-form-item>
          <el-input v-model="formFields.postal_code" placeholder="Postal code*"></el-input>
        </el-form-item>
        <el-form-item prop="relationship">
          <el-input v-model="formFields.relationship" placeholder="Relationship*"></el-input>
        </el-form-item>
      </el-form-item>

      <el-form-item class="box" prop="fdt_bank_id">
        <el-select
          :remote-method="banksEve"
          v-model="formFields.fdt_bank_id"
          filterable
          remote
          reserve-keyword
          placeholder="Bank swift code*"
        >
          <el-option v-for="(item, key) in banks" :key="key" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-form-item prop="account_number">
          <el-input v-model="formFields.account_number" placeholder="Bank account number*"></el-input>
        </el-form-item>
      </el-form-item>

      <!-- <el-form-item class="box" prop="shot">
        <el-form-item>
          <el-input v-model="formFields.shot" placeholder="Shot code (if any)"></el-input>
        </el-form-item>
      </el-form-item> -->

      <el-form-item class="account">
        <el-button type="primary" @click="onSubmit" :disabled="disabled">Add Bank Account</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Vue from 'vue'
import { Form, FormItem, Input, Select, Option, Loading } from 'element-ui'

import api from '@/graphql'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Loading)
export default {
  components: {},
  data() {
    return {
      loading: true,
      countries: [],
      banks: [],
      disabled: false,
      formFields: {
        fdt_country_id: '',
        state_province: '',
        city: '',
        address1: '',
        address2: '',
        postal_code: '',
        relationship: '',
        account_number: '',
        fdt_bank_id: '',
        // shot: '',
      },
      rules: {
        fdt_country_id: [{ required: true, trigger: 'change' }],
        state_province: [{ required: true, trigger: 'change' }],
        city: [{ required: true, trigger: 'change' }],
        address1: [{ required: true, trigger: 'change' }],
        address2: [{ required: true, trigger: 'change' }],
        postal_code: [{ required: true, trigger: 'change' }],
        relationship: [{ required: true, trigger: 'change' }],
        account_number: [{ required: true, trigger: 'change' }],
        fdt_bank_id: [{ required: true, trigger: 'change' }],
      },
    }
  },
  computed: {},
  async mounted() {
    const { data } = await api.query('COUNTRIES')
    this.countries = data.countries.markets
    this.loading = false
  },
  methods: {
    async onSubmit() {
      this.$refs['formFields'].validate((valid) => {
        if (valid) {
          this.disabled = true
          api.query('BANKCARDS', this.formFields).then(({ data }) => {
            this.disabled = false
            if (data.bankCards.result) {
              this.$emit('childChangeData')
            }
          })
        }
      })
    },
    async banksEve(value) {
      console.log(value)
      const { data } = await api.query('BANKS', { swift_code: value, name: value })
      this.banks = data.banks.result || []
    },
  },
}
</script>

<style lang="scss">
.box {
  .el-form-item__content {
    display: flex;
    .el-select,
    .el-form-item {
      width: 50%;
    }
    div:nth-child(2) {
      margin-left: 11px;
    }
  }
}
</style>
<style lang="scss" scoped>
.member-form {
  max-width: 540px;
  margin: auto;
  h3 {
    font-size: 24px;
    margin-top: 106px;
    margin-bottom: 52px;
    text-align: center;
  }
  .account {
    text-align: center;
    margin-top: 83px;
    margin-bottom: 106px;
    .el-button {
      background: #07e9b2;
      border: none;
      border-radius: 5px;
      box-shadow: none;
      color: #002060;
      font-size: 20px;
      font-weight: 700;
      line-height: 120%;
      margin: 30px;
    }
  }
}
</style>