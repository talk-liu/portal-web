<!--todo 二维码，秘要 -->
<template>
  <div class='cmp-wrap'>
    <div class='code-input-wrap'>
      <div class="code">
        <div class="code-value">
          <div
            class='code-value-img'
            id='qrcode'
          ></div>
        </div>
        <p class="code-text">
          {{$t('m.bindPhone.appScan')}}
        </p>
      </div>
      <div class="input">
        <keyInputValue :value="key" />
        <p class="input-text">
          {{$t('m.bindPhone.appCopy')}}
        </p>
      </div>
    </div>
    <v-btn
      type="primary"
      width="300"
      @click="nextStep()"
    >{{$t('m.company.next')}}</v-btn>
  </div>
</template>

<script>
import QRcode from 'qrcodejs2'
import VBtn from '@/components/btn'
import keyInputValue from './keyInputValue'
import isbind from '@/mixins/isbind'
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      qrcodeAddress: '',
      key: '',
    }
  },
  mixins: [isbind],
  components: {
    VBtn,
    keyInputValue,
  },
  created() {
    this.isBind()
  },
  computed: {
    ...mapState('settings', ['googleKey']),
  },
  watch: {
    googleKey() {
      this.googleKeyQRcode()
    },
  },
  methods: {
    ...mapActions('settings', ['getGoogleKey']),
    nextStep() {
      this.$router.push(this.$i18nRoute({
        name: 'BindGoogle',
        params: {
          type: 'google',
          step: 'backupKey',
        },
        query: {
          key: this.key,
        },
      }))
    },
    createQRcode() {
      new QRcode(document.getElementById('qrcode'), {
        text: this.qrcodeAddress,
        width: 120,
        height: 120,
      })
    },
    googleKeyQRcode() {
      if (this.googleKey) {
        this.qrcodeAddress = this.googleKey.otp_uri
        this.key = this.googleKey.otp_secret
        localStorage.setItem('otp_secret', this.key)
        this.createQRcode()
      }
    },
  },
  mounted() {
    this.googleKeyQRcode()
  },
}
</script>

<style lang='scss' scoped>
.cmp-wrap {
  text-align: center;
  .code-input-wrap {
    margin: 40px 0;
    display: flex;
    justify-content: center;
    .code {
      margin-right: 60px;
      .code-value {
        width: 140px;
        height: 140px;
        border-radius: 5px;
        border: 1px solid #bdc7d1;
        box-shadow: 0 2px 3px #eeeeee;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        .code-value-img {
          width: 120px;
          height: 120px;
          background: #111111;
        }
      }
      .code-text {
        margin-top: 10px;
        color: #999999;
        font-size: 12px;
        font-weight: bold;
        width: 200px;
      }
    }
    .input {
      margin-top: 90px;
      width: 200px;
      .input-text {
        margin-top: 10px;
        color: #999999;
        font-size: 12px;
        font-weight: bold;
      }
    }
  }
}
</style>
