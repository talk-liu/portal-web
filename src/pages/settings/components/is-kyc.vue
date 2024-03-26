<template>
  <div class="isKyc-page" id="kycs">
    <h1 v-if="tips">
      {{ tips }}
    </h1>
    <div v-else>
      <div v-if="isKycBoll_x">
        <div v-if="isKycBoll">
          <h3>{{ $t('m.onfido.info') }}</h3>
          <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="lastName">
              <el-input v-model="ruleForm.lastName" :placeholder="$t('m.identity.first_name')"></el-input>
            </el-form-item>
            <el-form-item prop="firstName">
              <el-input v-model="ruleForm.firstName" :placeholder="$t('m.identity.last_name')"></el-input>
            </el-form-item>
            <el-form-item prop="postalCode">
              <el-date-picker
                v-model="ruleForm.postalCode"
                type="date"
                :placeholder="$t('m.onfido.date')"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item prop="type">
              <el-checkbox-group v-model="ruleForm.checkbox">
                <el-checkbox :label="$t('m.onfido.checking')" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item class="ss">
              <el-button type="primary" :disabled="!ruleForm.checkbox" @click="onSubmit">{{
                $t('m.identity.next')
              }}</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div v-else>
          <h3>{{ $t('m.onfido.what') }}</h3>
          <el-form
            :model="addressForm"
            ref="addressForm"
            :rules="addressRules"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item prop="country">
              <el-select style="width: 100%" filterable v-model="addressForm.country" :placeholder="$t('m.onfido.country')">
                <el-option
                  v-for="(val, key) in countryList"
                  :key="key"
                  :label="val.name"
                  :value="val.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="city">
              <el-input v-model="addressForm.city" :placeholder="$t('m.onfido.city')"></el-input>
            </el-form-item>
            <el-form-item prop="address">
              <el-input v-model="addressForm.address" :placeholder="$t('m.onfido.address')"></el-input>
            </el-form-item>
            <el-form-item prop="zipcode">
              <el-input v-model="addressForm.zipcode" :placeholder="$t('m.onfido.code')"></el-input>
            </el-form-item>

            <el-form-item prop="type">
              <el-checkbox-group v-model="addressForm.checkbox">
                <el-checkbox :label="$t('m.onfido.nationality')" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <!-- 不持有 -->
            <div v-if="addressForm.checkbox">
              <el-form-item prop="nationality_other_country">
                <el-select style="width: 100%" v-model="addressForm.nationality_other_country" :placeholder="$t('m.onfido.country')">
                  <el-option
                    v-for="(val, key) in countryList"
                    :key="key"
                    :label="val.name"
                    :value="val.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="nationality_city">
                <el-input v-model="addressForm.nationality_city" :placeholder="$t('m.onfido.city')"></el-input>
              </el-form-item>
              <el-form-item prop="nationality_address">
                <el-input v-model="addressForm.nationality_address" :placeholder="$t('m.onfido.address')"></el-input>
              </el-form-item>
              <el-form-item prop="nationality_zipcode">
                <el-input v-model="addressForm.nationality_zipcode" :placeholder="$t('m.onfido.code')"></el-input>
              </el-form-item>
            </div>

            <el-form-item class="ss">
              <el-button type="primary" @click="applicants">{{ $t('m.onfido.certification') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div v-else id="onfido-mount"></div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  Pagination,
  DatePicker,
  Form,
  Input,
  FormItem,
  Button,
  Checkbox,
  CheckboxGroup,
  Select,
  Option,
  Message,
} from 'element-ui'
import api from '@/graphql'
import { mapState, mapActions, mapGetters } from 'vuex'
import { init, SdkHandle } from 'onfido-sdk-ui'
import countries from 'i18n-iso-countries'
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
countries.registerLocale(require('i18n-iso-countries/langs/zh.json'))
countries.registerLocale(require('i18n-iso-countries/langs/ru.json'))
countries.registerLocale(require('i18n-iso-countries/langs/ko.json'))
countries.registerLocale(require('i18n-iso-countries/langs/vi.json'))
countries.registerLocale(require('i18n-iso-countries/langs/tr.json'))

Vue.use(Pagination)
Vue.use(DatePicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Select)
Vue.use(Option)

export default {
  components: {},
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 86400000 * 6572
        },
      },
      countryList: [],
      tips: '',
      isKycBoll: true,
      isKycBoll_x: true,
      applicant_id: '',
      // form字段
      rules: {
        firstName: [{ required: true, trigger: 'blur' }],
        lastName: [{ required: true, trigger: 'blur' }],
        postalCode: [{ required: true, trigger: 'blur' }],
      },
      ruleForm: {
        firstName: '',
        lastName: '',
        postalCode: '',
        checkbox: '',
      },
      addressRules: {
        city: [{ required: true, trigger: 'blur' }],
        address: [{ required: true, trigger: 'blur' }],
        zipcode: [{ required: true, trigger: 'blur' }],
        nationality_other_country: [{ required: true, trigger: 'blur' }],
        nationality_city: [{ required: true, trigger: 'blur' }],
        nationality_address: [{ required: true, trigger: 'blur' }],
        nationality_zipcode: [{ required: true, trigger: 'blur' }],
      },
      addressForm: {
        // country: 'GBR',
        // city: 'London',
        // zipcode: 'SW4 6EH',
        // address: 'Main Street',
        country: '',
        city: '',
        zipcode: '',
        address: '',
        checkbox: '',
        //  nationality_city nationality_address nationality_zipcode
        nationality_other_country:'',
        nationality_city:'',
        nationality_address:'',
        nationality_zipcode:''

      },
      applicantsBoll: true,
    }
  },
  computed: {
    ...mapState('currentUser', ['currentUser']),
    success() {},
  },
  mounted() {
    switch (this.currentUser.id_document_state) {
      case 'verifying':
        this.tips = this.$t('m.identity.verifyed')
        break
      case 'verified':
        this.tips = this.$t('m.identity.verifyed')
        break
      case 'third_verified':
        this.tips = this.$t('m.identity.verifyed')
        break
    }
    const countrie = countries.getAlpha3Codes()
    let lang = this.$fifth.lang
    if (lang.indexOf('zh-') >= 0) {
      lang = 'zh'
    }
    for (let i in countrie) {
      if (i == 'CHN') {
        continue
      }
      this.countryList.push({
        name: countries.getName(countrie[i], lang, { select: 'official' }),
        value: i,
      })
    }
  },
  methods: {
    async onSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.isKycBoll = false
        }
      })
    },
    async applicants() {
      const _this = this
      this.$refs['addressForm'].validate((valid) => {
        if (valid && this.applicantsBoll) {
          this.applicantsBoll = false
          const { firstName: first_name, lastName: last_name, postalCode: birth_date } = this.ruleForm
          const { country, city, zipcode, address, checkbox, nationality_city, nationality_address, nationality_zipcode, nationality_other_country } = this.addressForm
          const dd = {
            first_name,
            last_name,
            birth_date,
            country,
            city,
            zipcode,
            address,
          }
          if (checkbox) {
            dd['nationality_other_country'] = nationality_other_country
            dd['nationality_city'] = nationality_city
            dd['nationality_address'] = nationality_address
            dd['nationality_zipcode'] = nationality_zipcode
          }
          // const dd = {
          //   first_name,
          //   last_name,
          //   birth_date: '1990-01-31',
          //   city: 'London',
          //   country: 'GBR',
          //   zipcode: 'SW4 6EH',
          //   address: 'Main Street',
          // }
          this.applicantsEve(dd)

          api.query('SDKTOKENKYC').then((resp) => {
            if (resp.data.sdkTokenKyc) {
              init({
                containerId: 'onfido-mount',
                useModal: false,
                token: resp.data.sdkTokenKyc.token,
                onComplete: function(data) {
                  api.query('CHECKKYC').then(() => {
                    // _this.$router.push(_this.$i18nRoute({ path: `/settings` }))
                  })
                },
                steps: ['welcome', 'document', 'face', 'complete'],
              })
            } else {
              _this.isKycBoll_x = true
              _this.isKycBoll = true
            }
          })
        }
      })
    },
    async applicantsEve(dd) {
      const resp = await api.query('APPLICANTS', dd)
      this.applicantsBoll = true
      if (resp.errors) {
        Message.error(resp.errors)
      } else {
        this.applicant_id = resp.data.applicants.applicant_id
        this.isKycBoll_x = false
      }
    },
  },
}
</script>

<style lang="scss">
#kycs .el-form-item__content {
  line-height: 0px;
}
#kycs .el-form-item::after,
#kycs .el-form-item::before {
  content: initial;
}

.isKyc-page {
  h1 {
    text-align: center;
    color: #2ead65;
  }
  width: 600px;
  margin: 90px auto;
  white-space: pre-wrap;
  h3 {
    margin-bottom: 30px;
    text-align: center;
  }
  .el-form-item {
    .el-checkbox__label {
      white-space: pre-wrap;
    }
    .el-checkbox__input {
      float: left;
      line-height: revert;
    }
  }
  .ss {
    text-align: center;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #000;
  }
}
</style>
