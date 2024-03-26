<template>
  <div class="select-region">
    <img src="../../../assets/images/identity-bg.png">
    <div class="identity-form">
      <div class="country-wrap">
        <v-country-select v-model="value" :placeholder="$t('m.identity.area')" :value-key="key" :suggestions="countries" @select="change" :label-key="key" @input="input"></v-country-select>
      </div>
      <v-btn :type="btnType" @click="nextStep" class="btn">{{$t('m.identity.next')}}</v-btn>
      <p class="tips" :class="{en: $fifth.lang === 'en'}" v-if="$fifth.lang === 'zh-CN' || $fifth.lang === 'en'">{{tips}}</p>
    </div>
    <v-dialog :visible="isShowDialog">
      <v-box :title="$t('m.personalMenu.identityAuth')" :isFixed='true' height="420" class="box" :showClose='true' @close='closeDialog'>
        <div class="box-content">
          <div id='qrcode' class="qrcode"></div>
          <p class="qrcode-text">{{$t('m.identity.qrcodeText')}}</p>
        </div>
      </v-box>
    </v-dialog>
  </div>
</template>

<script>
import VBtn from '@/components/btn'
import AllCountries from '@/utils/country'
import VCountrySelect from '@/components/th5-select'
import VBox from '@/components/box'
import VDialog from '@/components/dialog'
import QRcode from 'qrcodejs2'
export default {
  components: {
    VBtn,
    VCountrySelect,
    VBox,
    VDialog,
    QRcode,
  },
  data() {
    return {
      qrcodeAddress: '',
      value: '',
      isShowDialog: false,
      countries: AllCountries,
      isClick: false,
    }
  },
  computed: {
    key() {
      if (this.$fifth.lang === 'zh-CN') {
        return 'cn'
      } else {
        return this.countries[0][this.$fifth.lang] ? this.$fifth.lang : 'en'
      }
    },
    btnType() {
      return this.value && this.isClick ? 'primary' : 'default'
    },
    tips() {
      return this.$fifth.lang === 'zh-CN'
        ? '由于相关国家政策限制，目前不支持中国用户的身份认证。'
        : 'Due to policy restriction, KYC for Chinese residents is disabled.'
    },
  },
  methods: {
    nextStep() {
      if (this.value && this.isClick) {
        this.$parent.currentView = 'Upload'
      }
    },
    closeDialog() {
      this.isShowDialog = false
    },
    change(val) {
      this.isClick = true
      this.value = val[this.key]
      this.code = val.code
      this.$parent.region = val[this.key]
      this.$parent.regionCode = val['code']
    },
    input() {
      this.isClick = false
    },
  },
}
</script>

<style lang="scss" scoped>
.select-region {
  margin: 20px 0 0 35px;
  margin-bottom: 300px;

  img {
    display: block;
    margin: 0 auto 37px;
  }

  .identity-form {
    margin: 0 auto;
    .country-wrap,
    .btn {
      width: 300px;
      margin: 20px auto 0;
    }
    .country-wrap {
      height: 40px;
      position: relative;
      z-index: 1;
    }
    .checkbox-wrap {
      text-align: center;
      margin-top: 20px;
    }
  }
}

.qrcode {
  border: 1px solid #d7dce1;
  border-radius: 3px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
  padding: 10px;
  margin: 55px auto 20px;
  width: 200px;
}

.qrcode-text {
  color: #333333;
  font-size: 14px;
  text-align: center;
}

.tips {
  color: #777777;
  margin: 150px auto 0;
  text-align: center;
  font-size: 14px;
}
</style>
