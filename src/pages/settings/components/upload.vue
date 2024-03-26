<template>
  <div class="upload-page">
    <div class="history-header">
      <v-history-header :level1="[{name:$t('m.identity.title')}]" :level2="region" type="component" @goBack="returnRegion">
        <span v-if="countrysCode === 'US' || countrysCode === 'SG'">{{$t('m.identity.limitTip',{country:countryName})}}</span>
      </v-history-header>
    </div>
    <form class="simple_form form-horizontal" novalidate="novalidate" id="edit_id_document_5" enctype="multipart/form-data"  accept-charset="UTF-8" method="post" name="profileForm">
      <div class="base-form">
        <div class="form-item">
          <input type="hidden" name="country" v-model="country">
          <div class="input-normal_wrap-box">
            <v-input v-model="firstName" inputType="normal" :placeholder="$t('m.identity.first_name')" name="first_name" maxlength="50"></v-input>
          </div>
          <div class="input-normal_wrap-box">
            <v-input v-model="lastName" inputType="normal" :placeholder="$t('m.identity.last_name')" name="last_name" maxlength="50"></v-input>
          </div>
          <div class="gender-box" @click="selectGender">
            <span :class="{active: gender==='1'}" name="1">{{$t('m.identity.man')}}</span>
            <span :class="{active: gender==='2'}" name="2">{{$t('m.identity.woman')}}</span>
          </div>
          <div class="birth-date">
            <span>{{$t('m.identity.birthDate')}}</span>
            <el-date-picker :popper-class='popperClass' :clearable='false' prefix-icon='el-custom-icon' v-model="birth_date" type="datetime" value-format='yyyyMMdd' format='yyyy-MM-dd' placeholder="yyyy-mm-dd">
            </el-date-picker>
          </div>
        </div>
        <div class="form-item">
          <div class="input-normal_wrap-box">
            <v-input v-model="address" inputType="normal" :placeholder="$t('m.identity.address')" name="address"></v-input>
          </div>
          <div class="input-normal_wrap-box">
            <v-input v-model="city"  inputType="normal" :placeholder="$t('m.identity.city')" name="city"></v-input>
          </div>
          <div class="input-normal_wrap-box">
            <v-input v-model="zipcode" inputType="normal" :placeholder="$t('m.identity.zipcode')" name="zipcode"></v-input>
          </div>
        </div>
        <div class="form-item">
          <div class="gender-box" @click="selectCertificatesType">
            <span :class="{active: id_document_type==='1'}" name="1">{{id_document_type_arr[0]}}</span>
            <span :class="{active: id_document_type==='2'}" name="2">{{id_document_type_arr[1]}}</span>
            <span :class="{active: id_document_type==='3'}" name="3">{{id_document_type_arr[2]}}</span>
          </div>
          <div class="input-normal_wrap-box">
            <v-input v-model="cardId" inputType="normal" :placeholder="idPlaceholder" name="id_document_number"></v-input>
          </div>
          <p class="remind">{{$t('m.identity.abroadBaseInfoTip')}}</p>
        </div>
      </div>
      <div class="upload-form_wrap">
        <div class="upload-form_item">
          <div class="title">{{$t('m.identity.passportCover')}}</div>
          <div class="remind">{{$t('m.identity.passportCoverTip')}}</div>
          <div class="upload-img_box">
            <v-img-upload name="primary_id_document_file_attributes" id="one"></v-img-upload>
            <div class="text">
              {{$t('m.identity.example')}}
              <div class="iconfont icon-jiantou"></div>
            </div>
            <div class="example-img">
              <img src="../../../assets/images/huzhao.png">
            </div>
          </div>
        </div>
        <div class="upload-form_item">
          <div class="title">{{$t('m.identity.passportInfo')}}</div>
          <div class="remind">{{$t('m.identity.passportInfoTip')}}</div>
          <div class="upload-img_box">
            <v-img-upload name="secondary_id_document_file_attributes" id="two"></v-img-upload>
            <div class="text">
              {{$t('m.identity.example')}}
              <div class="iconfont icon-jiantou"></div>
            </div>
            <div class="example-img">
              <img src="../../../assets/images/huzhao-info.png">
            </div>
          </div>
        </div>
        <div class="upload-form_item">
          <div class="title">{{$t('m.identity.passportHold')}}</div>
          <div class="remind">{{$t('m.identity.passportHoldTip')}}</div>
          <div class="upload-img_box">
            <v-img-upload name="selfie_id_document_file_attributes" id="three"></v-img-upload>
            <div class="text">
              {{$t('m.identity.example')}}
              <div class="iconfont icon-jiantou"></div>
            </div>
            <div class="example-img">
              <img src="../../../assets/images/huzhao-man.png">
            </div>
          </div>
        </div>
      </div>
      <div class="phone-form_wrap">
        <label>{{$t('m.identity.phoneNumber')}}</label>
        <div class="phone-tip">{{$t('m.identity.phoneNumberTip')}}</div>
        <v-pre-phone v-model="phone" :countryCode="regionCode" @changeCountry="changeCountry" :showErr="phoneWarn" @change="()=>{this.phoneWarn = ''}"></v-pre-phone>
        <div class="warning">
          <span v-if="phoneWarn">{{phoneWarn}}</span>
        </div>
        <div class="input-wrap">
          <div class="input-normal_wrap-box">
            <v-input  inputType="normal" v-model="token" :center="true" :showErr="codeWarn" @change="()=>{this.codeWarn = ''}"></v-input>
          </div>
          <div class="send-wrap">
            <v-btn type="info" height="34" :small="true" :disabled="!cantClick" @click="sendCode()">{{sendBtnText}}</v-btn>
          </div>
        </div>
        <div class="warning">
          <span v-if="codeWarn">{{codeWarn}}</span>
        </div>
      </div>
      <div class="btn-wrap">
        <v-btn type="primary" @click="submit" width="220">{{$t('m.identity.submit')}}</v-btn>
      </div>
    </form>
    <v-dialog :visible="loadingShow" class="dialog-box">
      <v-loading class="loading"></v-loading>
    </v-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import VBtn from '@/components/btn'
import VInput from '@/components/input'
import VHistoryHeader from '@/components/history-header-plus'
import VImgUpload from '@/components/img-upload'
import VPrePhone from '@/components/pre-phone'
import { verifyId } from '@/api/index'
import { mapActions } from 'vuex'
import VLoading from '@/components/loading'
import VDialog from '@/components/dialog'
import Message from '@/utils/message'
import {
  DatePicker,
} from 'element-ui'
Vue.use(DatePicker)
export default {
  components: {
    VBtn,
    VHistoryHeader,
    VInput,
    VLoading,
    VPrePhone,
    VImgUpload,
    VDialog
  },
  data() {
    return {
      cantClick: true,
      token: '',
      codeWarn: '',
      popperClass: this.$fifth.lang === 'zh-CN' ? 'cn' : 'en',
      birth_date: '',
      address: '',
      city: '',
      zipcode: '',
      firstName: '',
      lastName: '',
      cardId: '',
      gender: 0,
      id_document_type_arr: [this.$t('m.identity.idCard'), this.$t('m.identity.passport'), this.$t('m.identity.driverLicense')],
      id_document_type: 0,
      country: '',
      phone: '',
      showCardErr: false,
      cardErrMsg: '',
      phoneWarn: '',
      loadingShow: false,
      region: this.$parent.region,
      countrysCode: this.$parent.regionCode,
      regionCode: this.$parent.regionCode,
      sendBtnText: this.$t('m.bindPhone.sendSmsCode'),
    }
  },

  mounted() {
    this.country = this.$parent.region
  },

  computed: {
    countryName() {
      if (this.countrysCode === 'US') {
        return this.$fifth.lang === 'zh-CN' ? '美国' : 'the USA'
      }
      if (this.countrysCode === 'SG') {
        return this.$fifth.lang === 'zh-CN' ? '新加坡' : 'Singaporean'
      }
    },
    idPlaceholder() {
      const id_document_type = this.id_document_type - 1 < 0 ? 0 : this.id_document_type - 1
      return `*${this.id_document_type_arr[id_document_type]}ID`
    }
  },

  methods: {
    ...mapActions('documentSms', ['documentSms']),
    async sendCode() {
      if (!this.cantClick) return
      const res = await this.documentSms({
        phone: this.phone,
        country_code: this.regionCode
      })
      if (res && res.data && res.data.documentSms && res.data.documentSms.result && res.data.documentSms.result.result === 'success') {
        this.phoneWarn = ''
        this.countDown()
      } else if (res.errors[0].message === 'id_document_sms_failed') {
        this.phoneWarn = this.$t('m.errMessages.smsTypeError')
      } else if (res.errors[0].message === 'id_document_sms_locked') {
        this.phoneWarn = this.$t('m.errMessages.limitCodeMessage')
      }
    },
    // 倒计时
    countDown() {
      this.cantClick = false
      const codeText = this.sendBtnText
      let second = 60
      this.sendBtnText = second + 's'

      const t = setInterval(() => {
        if (--second < 0) {
          this.cantClick = true
          this.sendBtnText = codeText
          clearInterval(t)
          return
        }
        this.sendBtnText = second + 's'
      }, 1000)
    },
    // change country
    changeCountry(countryCode) {
      this.regionCode = countryCode
    },

    selectGender(event) {
      const name = event.target.getAttribute('name')
      this.gender = name
    },
    selectCertificatesType(event) {
      const name = event.target.getAttribute('name')
      this.id_document_type = name
    },
    // 提交认证
    submit() {
      this.$nextTick(() => {
        if (this.verify()) {
          this.verifyDocumentId()
        }
      })
    },
    // 认证AJAX
    async verifyDocumentId() {
      const form = document.getElementById('edit_id_document_5')
      let formData = new FormData(form)
      formData.append('gender', this.gender)
      formData.append('phone', this.phone)
      formData.append('country_code', this.regionCode)
      formData.append('birth_date', this.birth_date)
      formData.append('id_document_type', this.id_document_type - 1)
      formData.append('token', this.token)
      this.loadingShow = true
      const res = await verifyId(formData)
      if (res && res.status === 200) {
        this.loadingShow = false
        window.location.reload()
      } else {
        this.loadingShow = false
        if (res.response.data.error.message === 'phone_number_token_verification_failed') {
          Message.error(this.$t('m.errMessages.smsVerificationError'))
        } else if (res.response.data.error.message === 'id_document_sms_locked') {
          Message.error(this.$t('m.errMessages.limitCodeMessage'))
        }
      }
    },
    // 验证字段是否空
    verify() {
      const img1 = document.getElementById('one').value
      const img2 = document.getElementById('two').value
      const img3 = document.getElementById('three').value
      if (
        this.firstName == '' ||
        this.lastName == '' ||
        this.cardId == '' ||
        this.city == '' ||
        this.address == '' ||
        this.birth_date == '' ||
        this.token == '' ||
        this.zipcode == '' ||
        !this.id_document_type ||
        !img1 ||
        !img2 ||
        !img3 ||
        this.phone == ''
      ) {
        Message.warn(this.$t('m.errMessages.requeryInfo'))
        return false
      }
      return true
    },
    // 返回选择国家地区
    returnRegion() {
      this.$parent.currentView = 'Region'
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variable.scss';

.upload-page {
  padding: 25px 30px;

  .phone-form_wrap {
    padding: 30px;
    font-size: 14px;
    color: $color-assist1;

    label {
      display: block;
      margin-bottom: 2px;
    }
    .phone-tip {
      color: #999999;
      font-size: 12px;
      margin-bottom: 23px;
    }
    .warning {
      width: 300px;
      text-align: right;
      color: #ee4343;
      font-size: 12px;
      margin-top: 5px;
      height: 20px;
    }
    .v-phone_code {
      margin: 0;
    }
  }
  .input-wrap {
    width: 300px;
    display: flex;
    justify-content: space-between;
    .send-wrap {
      margin-left: 10px;
    }
  }
  .base-form {
    margin: 12px 0;
    .form-item {
      margin-top: 20px;
    }
    .input-normal_wrap-box {
      position: relative;
      display: inline-block;
      margin-right: 20px;
      width: 266px;
    }
    .remind {
      padding: 10px 0;
      color: $color-assist1;
      font-size: 12px;
    }
    .birth-date {
      float: right;
      span {
        color: $color-assist3;
        font-size: 12px;
        margin-right: 5px;
        display: inline-block;
      }
    }
    .gender-box {
      display: inline-block;
      height: 34px;
      line-height: 34px;
      text-align: center;
      font-size: 0;
      color: $color-assist3;
      margin-right: 20px;

      span {
        display: inline-block;
        min-width: 100px;
        padding: 0 20px;
        height: 100%;
        font-size: 14px;
        border: 1px solid $color-line;
        cursor: pointer;

        &:nth-last-child(1) {
          border-left: 0;
        }
      }

      .active {
        background-color: $color-primary;
        color: $color-text;
        border: 1px solid $color-primary;
      }
    }
  }

  .upload-form_wrap {
    border-top: 1px solid $color-line;
    border-bottom: 1px solid $color-line;

    .upload-form_item {
      padding: 30px;

      &:not(:last-child) {
        border-bottom: 1px solid $color-line;
      }

      .title {
        font-size: 14px;
        color: $color-assist1;
      }

      .remind {
        font-size: 12px;
        color: $color-assist2;
        margin-top: 5px;
      }

      .upload-img_box {
        display: flex;
        align-items: center;
        margin-top: 20px;

        .text {
          margin: 0 30px;
          color: $color-assist3;
          font-weight: 500;
        }
        .icon-jiantou {
          font-size: 23px;
          font-weight: normal;
          text-align: center;
          margin-top: -7px;
        }
        .example-img {
          height: 180px;

          img {
            width: 334px;
            height: 197px;
          }
        }
      }
    }
  }

  .btn-wrap {
    margin: 30px 0;
    p {
      font-size: 13px;
      color: $color-assist2;

      a {
        color: $color-assist10;
      }
    }
  }
  .dialog-box {
    .loading {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
