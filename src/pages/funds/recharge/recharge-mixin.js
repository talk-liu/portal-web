import upperCase from '@/utils/upperCase'
import QRcode from 'qrcodejs2'
import { mapGetters, mapActions, mapState } from 'vuex'
import VAllTickers from '@/components/all-tickers'
import VCheckbox from '@/components/checkbox'
import VBtn from '@/components/btn'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import Message from '@/utils/message'
Vue.use(VueClipboard)
export default {
  mixins: [upperCase],
  components: {
    VAllTickers,
    VBtn,
    VCheckbox,
  },
  data() {
    return {
      selectType: 'deposits',
      copySuccess: false,
      copyMemoSuccess: false,
      selectedMemo: '',
      showTag: true,
      understand: false,
      iconShow: false,
      selected: {},
      time: 1,
      // usdt提现显示的链类型
      tabConfig: [
        {
          label: 'ERC20',
          name: 'ERC20',
        },
        // {
        //   label: 'OMNI',
        //   name: 'OMNI',
        // },
      ],
      tabIndex: 0,
    }
  },
  computed: {
    ...mapGetters('viewport', ['type']),
    ...mapGetters('accounts', ['accountsList']),
    ...mapState('currencies', ['currencies']),
    unit() {
      if (!this.selected.currency) return
      return this.selected.currency.toUpperCase()
    },
    isShowMemoSelect() {
      return this.selected.memo && this.showTag && this.selected.currency !== 'grin'
    },
    continueBtn() {
      return this.understand ? 'primary' : 'default'
    },
    isTrx() {
      if (this.selected.currency) {
        const currency = this.currencies[this.selected.currency]
        if (currency.base_currency_code === 'trx') {
          return true
        } else {
          return false
        }
      }
    }
  },

  created() {
    this.initSelectItem()
  },
  watch: {
    selected() {
      this.resetTag()
      this.$nextTick(() => {
        if (document.getElementById('qrcode')) {
          document.getElementById('qrcode').innerHTML = ''
        }
      })
      this.reloadAddress()
      this.createQRcode()
      // if (!this.selected.deposit_address || (!this.selected.memo && this.selected.require_memo)) {
      //   // this.reloadAddress()
      // } else {
      //
      // }
    },
    tabIndex() {
      //  监听选择的是哪个链协议
      // this.changeBit()
      this.resetTag()
      this.$nextTick(() => {
        if (document.getElementById('qrcode')) {
          document.getElementById('qrcode').innerHTML = ''
        }
      })
      this.reloadAddress()
      console.log('选择的链协议:' + this.tabConfig[this.tabIndex].name)
    },
  },

  methods: {
    ...mapActions('accounts', ['getAccounts']),
    ...mapActions('deposit', ['getDepositAddress']),
    async reloadAddress() {
      this.resetTag()
      this.$nextTick(() => {
        if (document.getElementById('qrcode')) {
          document.getElementById('qrcode').innerHTML = ''
        }
      })
      this.iconShow = true
      // if (this.selected.depositable) {
      let currrncy
      if (this.selected.currency.toLowerCase() === 'usdt') {
        //  ERC20
        currrncy = this.selected.currency + '-erc20'
      } else {
        currrncy = this.selected.currency
      }
      const res = await this.getDepositAddress({ currency: currrncy })
      if (res && res.data && res.data.depositAddress && res.data.depositAddress.result) {
        if (!this.selected.memo && this.selected.require_memo) {
          this.selected.memo = res.data.depositAddress.result.memo
        }
        // if (!this.selected.deposit_address) {
        this.selected.deposit_address = res.data.depositAddress.result.deposit_address
        // }
        this.selected = this.renderSelectItem(this.selected)
        this.iconShow = false
        this.createQRcode()
      }
      // }
    },
    renderSelectItem(item) {
      if (item.currency === 'grin' && item.deposit_address) {
        item.deposit_address = item.deposit_address.replace('%s', item.memo)
      }
      return item
    },
    initSelectItem() {
      this.currency = this.$route.params.currency
      if (!this.currency) return
      this.accountsList.forEach(item => {
        if (item.currency == this.currency) {
          this.selected = this.renderSelectItem(item)
        }
      })
    },
    // create qrcode
    createQRcode() {
      if (document.getElementById('qrcode')) {
        document.getElementById('qrcode').innerHTML = ''
      }
      this.$nextTick(() => {
        if (document.getElementById('qrcode')) {
          new QRcode(document.getElementById('qrcode'), {
            text: this.selected.deposit_address,
            width: this.qrcodeWidth,
            height: this.qrcodeWidth,
          })
        }
      })
    },
    changeBit(item) {
      this.selected = this.renderSelectItem(item)
      this.$router.replace(this.$i18nRoute({
        name: 'rechargeCurrency',
        params: {
          currency: item.currency,
        },
      }))
      if (this.selected.currency.toLowerCase() === 'usdt') {
        this.tabIndex = 0
      }
    },
    onSuccess() {
      this.copySuccess = true
      setTimeout(() => {
        this.copySuccess = false
      }, 1500)
    },
    onMemoSuccess() {
      this.copyMemoSuccess = true
      setTimeout(() => {
        this.copyMemoSuccess = false
      }, 1500)
    },
    onError() {
      Message(this.$t('m.errMessages.cantCopy'))
    },
    continueDeposit() {
      if (this.understand) {
        this.showTag = false
        this.$nextTick(() => {
          this.createQRcode()
        })
      }
    },
    resetTag() {
      this.showTag = true
      this.understand = false
    },
  },
}
