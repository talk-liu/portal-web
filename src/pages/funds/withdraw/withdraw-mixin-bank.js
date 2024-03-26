import bigNumber from 'bignumber.js'
import VDialog from '@/components/dialog'
import VBtnInput from '@/components/btn-input'
import VBtn from '@/components/btn'
import { mapGetters, mapActions, mapState } from 'vuex'
import VRadio from '@/components/radio'
import VAllTickers from '@/components/all-tickers'
import Alert from '@/utils/alert'
import factors from '@/mixins/factors'
import Message from '@/utils/message'
import VAlert from '@/components/alert'
import totalMoney from '@/mixins/total-money'
import api from '@/graphql'

export default {
  mixins: [factors, totalMoney],
  data() {
    return {
      selectType: 'withdraw',
      selected: {},
      addressListShow: false,
      showAddressErr: false,
      withdrawUid: '',
      addForm: {
        fund_uid: '',
        fund_extra: '',
      },
      withdrawAddress: {
        fund_uid: '',
      },
      percentList: [
        { text: '25%', value: 0.25 },
        { text: '50%', value: 0.5 },
        { text: '75%', value: 0.75 },
        { text: '100%', value: 1 },
      ],
      sumErr: '',
      newAddressShow: false,
      focus: false,
      percentListShow: false,
      currencyFixed: {
        at: 4,
        edg: 0,
        r: 0,
        ada: 6,
        gusd: 2
      },
      noTag: false,
      withdrawSum: '',
      withdrawMemo: '',
      currency: '',
      saveAddress: false,
      confirmVisible: false,
      delItem: {},
      errMessage: '',
      withdrawSuccessShow: false,
      withdrawVerifyShow: false,
      withdrawVerifyError: '',
      showMemoErr: false,
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
      checked: false,
      // 银行卡
      bankList:[],
      bank_card_id:''
    }
  },
  components: {
    VBtnInput,
    VBtn,
    VRadio,
    VAllTickers,
    VDialog,
    VAlert
  },
  async created() {

    const { data } = await api.query('WITHDRAWLIST')
    if (data.withdrawList.result) {
      const attr = []
      for(let i in data.withdrawList.result){
        attr.push(data.withdrawList.result[i])
      }
      this.bankList = attr
      console.log(attr)
    }

    this.initSelectItem()
  },
  filters:{
    accountsFil(value){
      if (!value) return []
      const attr = []
      for(let i in value){
        if(value[i].code=='usd'){
          attr.push(value[i])
          break;
        }
      }
      return attr;
    }
  },
  computed: {
    ...mapGetters('viewport', ['type']),
    ...mapState('currentUser', ['currentUser']),
    ...mapGetters('currentUser', ['limitWithdraw']),
    ...mapGetters('accounts', ['accountsList']),
    ...mapGetters('withdraw', ['fund_sources']),
    ...mapGetters('withdraw', ['withdrawMe']),
    withDrawDeclaration() {
      if (this.$fifth.lang === 'zh-CN') {
        return '我在此声明，我是该提款地址帐户的唯一所有者。'
      } else {
        return 'I hereby declare that I am the sole and exclusive owner of the account of this withdrawal address.'
      }
    },
    btnType() {
      return this.isSubmit ? 'primary' : 'default'
    },
    isSubmit() {
      if (!this.checked) {
        return false
      }
      if (this.selected.require_memo && !this.noTag && !this.addressToTrim(this.withdrawMemo)) { // 选择使用tag且未填tag时返回false
        return false
      }
      return (Number(this.withdrawSum) > 0 && this.addressToTrim(this.withdrawUid)) || (Number(this.withdrawSum) > 0 && this.addressToTrim(this.withdrawAddress.fund_uid)) ||
        (Number(this.withdrawSum) > 0 && this.addressToTrim(this.addForm.fund_uid) && this.addressToTrim(this.addForm.fund_extra))
    },
    maxLen() {
      return this.currencyFixed[this.selected.currency] >= 0 ? this.currencyFixed[this.selected.currency] : 8
    },
    restCurrency() {
      return `${this.$t('m.funds.availableBalance')} ${(this.selected.balance &&
        bigNumber(this.selected.balance).toFixed(this.maxLen, 1)) ||
        0} ${this.unit}`
    },
    unit() {
      if (!this.selected.currency) return
      return this.selected.currency.toUpperCase()
    },
    allBalance() {
      return bigNumber(this.selected.balance).plus(this.selected.locked).toFixed(this.maxLen, 1)
    },
    lockedBalance() {
      return bigNumber(this.selected.locked).toFixed(this.maxLen, 1)
    },
    balance() {
      return bigNumber(this.selected.balance).toFixed(this.maxLen, 1) || 0
    },
    withdraw_fee() {
      if (this.tabIndex === 0 && this.selected.currency.toLowerCase() === 'usdt') {
        return '5.00000000'
      } else {
        return this.selected.withdraw_fee && bigNumber(this.selected.withdraw_fee).toFixed(this.maxLen) || Number(0).toFixed(this.maxLen)
      }
    },
    realWithdraw() {
      if (this.withdrawSum > 0) {
        const real_withdraw = this.withdrawSum - this.withdraw_fee
        return real_withdraw > 0 ? bigNumber(real_withdraw).toFixed(this.maxLen) : Number(0).toFixed(this.maxLen)
      } else {
        return Number(0).toFixed(this.maxLen)
      }
    },
    fundSources() {
      let sources = []
      let currency
      if (this.tabIndex === 0 && this.selected.currency.toLowerCase() === 'usdt') {
        currency = this.selected.currency + '-erc20'
      } else {
        currency = this.selected.currency
      }
      this.fund_sources && this.fund_sources.forEach(ele => {
        if (ele.currency === currency) {
          sources.push(ele)
        }
      })
      this.withdrawUid = sources[0] && sources[0].fund_uid || ''
      this.withdrawAddress = sources[0] || { uid: '' }
      return sources
    },
    memoPlaceholder() {
      return !this.noTag ? this.$t('m.funds.enterOrPasteTag') : this.$t('m.funds.noTag')
    },
  },
  methods: {
    ...mapActions('withdraw', ['getWithdrawAddress', 'addFundsSrc', 'withdrawCreate', 'delWithdrawAddress', 'addWithdrawAddress', 'getWithdrawMe', 'withdrawResend', 'withdrawVerify']),
    ...mapActions('accounts', ['getAccounts']),
    useTag() {
      this.noTag = false
    },
    noUseTag() {
      this.noTag = true
    },
    toWithdrawAddress(currency) {
      this.$router.push(this.$i18nRoute({
        name: 'withdrawAddress',
        params: {
          currency: currency
        }
      }))
    },
    selectAddress(item) {
      this.withdrawAddress = item
      this.addressListShow = false
    },
    initSelectItem() {
      this.currency = this.$route.params.currency
      if (!this.currency) return
      this.accountsList.forEach(item => {
        if (item.currency == this.currency) {
          this.selected = item
        }
      })
    },
    // 提现选择百分比
    selectPercent(item) {
      this.percentListShow = false
      this.withdrawSum = bigNumber(this.selected.balance)
        .multipliedBy(item.value)
        .toFixed(this.maxLen, 1)
    },
    withdrawAll() {
      this.percentListShow = !this.percentListShow
      this.addressListShow = false
    },
    changeBit(item) {
      this.selected = item
      this.$router.replace(this.$i18nRoute({
        name: 'withdrawCurrency',
        params: {
          currency: item.currency
        }
      }))
      this.withdrawSum = ''
    },
    showAddress() {
      this.addressListShow = !this.addressListShow
      this.percentListShow = false
      if (this.addressListShow) {
        let currrency
        if (this.tabIndex === 0 && this.selected.currency.toLowerCase() === 'usdt') {
          currrency = this.selected.currency + '-erc20'
        } else {
          currrency = this.selected.currency
        }
        this.getWithdrawAddress(currrency)
      }
    },
    selectAll() {
      this.withdrawSum = bigNumber(this.selected.balance)
        .multipliedBy(1)
        .toFixed(this.maxLen, 1)
    },
    addAddress() {
      this.newAddressShow = true
      this.addressListShow = false
      this.withdrawAddress = {}
    },
    addressToTrim(val) {
      return val && val.trim()
    },
    async addFundsSrc() {
      if (this.saveAddress) {
        return
      }
      this.saveAddress = true
      if (!this.addressToTrim(this.addForm.fund_extra) || !this.addressToTrim(this.addForm.fund_uid)) {
        Message.error(this.$t('m.errMessages.blankExtra'))
        this.saveAddress = false
        return
      }
      let currrency
      if (this.tabIndex === 0 && this.selected.currency.toLowerCase() === 'usdt') {
        currrency = this.selected.currency + '-erc20'
      } else {
        currrency = this.selected.currency
      }
      const res = await this.addWithdrawAddress({
        currency: currrency,
        extra: this.addForm.fund_extra,
        uid: this.addForm.fund_uid
      })
      if (res && res.data && res.data.createAddress && res.data.createAddress.result) {
        this.addForm = {
          fund_uid: '',
          fund_extra: '',
        }
        this.withdrawAddress = res.data.createAddress.result
        Message.success(this.$t('m.successMessage.saveSuccess'))
        this.newAddressShow = false
      } else {
        Message.error(this.$t('m.errMessages.submitErr'))
      }
      this.saveAddress = false
    },
    cancel() {
      this.newAddressShow = false
      this.addForm = {
        fund_uid: '',
        fund_extra: '',
      }
    },
    // 判断usdt erc20提现输入的金额是否正确
    isUsdtErc20WithdrawSum() {
      const withdrawUsdt = this.currencyChangeUsdt(this.selected.currency, this.withdrawSum)
      if (!this.withdrawSum) {
        this.sumErr = this.$t('m.errMessages.blankWithdraw')
        return false
      }
      if (Number(this.withdrawSum) > Number(this.selected.balance)) {
        this.sumErr = this.$t('m.errMessages.moreBalance')
        return false
      }
      if (
        withdrawUsdt >
        bigNumber(this.limitWithdraw)
          .minus(this.currentUser.withdraw_amount_h24)
          .toNumber()
      ) {
        this.sumErr = this.$t('m.errMessages.moreLimit')
        return false
      }
      if (Number(this.withdrawSum) < Number(2)) { // 最小提现额
        this.sumErr = this.$t('m.errMessages.lessMinimum')
        return false
      }
      return true
    },

    // 判断提现输入的金额是否正确
    isWithdrawSum() {
      const withdrawUsdt = this.currencyChangeUsdt(this.selected.currency, this.withdrawSum)
      if (!this.withdrawSum) {
        this.sumErr = this.$t('m.errMessages.blankWithdraw')
        return false
      }
      if (Number(this.withdrawSum) > Number(this.selected.balance)) {
        this.sumErr = this.$t('m.errMessages.moreBalance')
        return false
      }
      if (
        withdrawUsdt >
        bigNumber(this.limitWithdraw)
          .minus(this.currentUser.withdraw_amount_h24)
          .toNumber()
      ) {
        this.sumErr = this.$t('m.errMessages.moreLimit')
        return false
      }
      if (Number(this.withdrawSum) < Number(this.currentUser.minimum_withdraw_amount)) {
        this.sumErr = this.$t('m.errMessages.lessMinimum')
        return false
      }
      return true
    },
    async submitOrder() {
      if (!this.isSubmit) return
      if (this.currentUser && this.currentUser.withdraw_disabled) {
        Message.warn(this.$t('m.errMessages.withdraw_disabled'))
        return false
      }
      if (this.tabIndex === 0 && this.selected.currency.toLowerCase() === 'usdt') {
        if (!this.isUsdtErc20WithdrawSum()) {
          console.log('1')
          return false
        }
      } else {
        if (!this.isWithdrawSum()) {
          return false
        }
      }
      if (!this.addressToTrim(this.withdrawAddress.fund_uid) && this.newAddressShow) {
        let currrency
        if (this.tabIndex === 0 && this.selected.currency.toLowerCase() === 'usdt') {
          currrency = this.selected.currency + '-erc20'
        } else {
          currrency = this.selected.currency
        }
        const obj = {
          currency: currrency,
          extra: this.addForm.fund_extra,
          uid: this.addForm.fund_uid
        }
        // 先生成一个地址
        const res = await this.addWithdrawAddress(obj)
        if (res && res.data && res.data.createAddress) {
          this.withdrawAddress = res.data
        } else {
          Message.error(this.$t('m.errMessages.submitErr'))
          return
        }
      }
      if (!this.withdrawMe) {
        await this.getWithdrawMe()
      }
      if (this.withdrawMe && this.withdrawMe.two_factors) {
        this.factors()
        this.confirmMailShow = false
      } else {
        this.withdraw()
      }
    },
    async submitMobileOrder() {
      if (!this.isSubmit) return
      if (this.currentUser && this.currentUser.withdraw_disabled) {
        Alert({
          title: this.$t('m.errMessages.withdraw_disabled'),
          confirm: () => {},
          confirmText: this.$t('m.btnText.confirm'),
        })
        return false
      }
      if (this.tabIndex === 0 && this.selected.currency.toLowerCase() === 'usdt') {
        if (!this.isUsdtErc20WithdrawSum()) {
          return false
        }
      } else {
        if (!this.isWithdrawSum()) {
          return false
        }
      }
      // 是否24小时内不能体现
      if (this.currentUser && this.currentUser.security_settings_changed_within_h24) {
        Alert({
          title: this.$t('m.errMessages.cantWithdraw'),
          confirm: () => {},
          confirmText: this.$t('m.btnText.confirm'),
        })
        return
      }
      if (!this.withdrawMe) {
        await this.getWithdrawMe()
      }
      if (this.withdrawMe && this.withdrawMe.two_factors) {
        this.factors()
        this.confirmMailShow = false
      } else {
        this.withdraw('mobile')
      }
    },
    async withdraw(type) {
      const fund_uid = type === 'mobile' ? (this.withdrawUid && this.withdrawUid.trim()) : (this.withdrawAddress.fund_uid && this.withdrawAddress.fund_uid.trim() || this.addForm.fund_uid && this.addForm.fund_uid.trim())
      let currrency
      if (this.tabIndex === 0 && this.selected.currency.toLowerCase() === 'usdt') {
        currrency = this.selected.currency + '-erc20'
      } else {
        currrency = this.selected.currency
      }
      const params = {
        currency: currrency,
        fund_uid: fund_uid,
        sum: this.withdrawSum,
      }
      if (this.factorType) {
        params['type'] = this.factorType
      }
      if (this.factorCode) {
        params['otp'] = this.factorCode
      }
      if (this.withdrawMemo) {
        params['memo'] = this.withdrawMemo.trim()
      }
      params['bank_card_id'] = params.fund_uid

      let res = await api.query('FIAT',params)//await this.withdrawCreate(params)
      this.showDialog = false
      if (res && res.data && res.data.fiat && res.data.fiat.result) {
        this.confirmMailShow = true
        this.withdrawId = res.data.fiat.result.id
        this.withdrawVerifyShow = true
        this.withdrawVerifyError = ''
        if (type === 'mobile') {
          this.$router.push(this.$i18nRoute({
            name: 'withdrawVerify',
            params: {
              id: this.withdrawId
            }
          }))
        }
      } else {
        this.sumErr = res.errors[0].message
      }
    },
    delAddressItem(item) {
      this.confirmVisible = true
      this.delItem = item
    },
    async confirmDelet() {
      const res = await this.delWithdrawAddress({ id: this.delItem.id })
      this.confirmVisible = false
      if (res && res.data && res.data.deleteAddress) {
        Message.success(this.$t('m.successMessage.deletSuccess'))
      }
    },
    // 验证成功回调
    verifySuccess(obj) {
      this.factorCode = obj.code
      this.factorType = obj.type
      this.withdraw()
    },
    verifyMobileSuccess(obj) {
      this.factorCode = obj.code
      this.factorType = obj.type
      this.withdraw('mobile')
    },
    closeSuccess() {
      this.withdrawSuccessShow = false
    },
    closeMobileSuccess() {
      this.withdrawSuccessShow = false
      location.href = '/funds'
    },
    closeWithdrawVerify() {
      this.withdrawVerifyShow = false
    },
    goHistory() {
      this.closeSuccess()
      this.$router.push(this.$i18nRoute({
        name: 'records',
        query: {
          tag: 1
        }
      }))
    },
    async submitCode(code) {
      const res = await this.withdrawVerify({
        code: code,
        id: this.withdrawId
      })
      if (res && res.data && res.data.withdrawVerify && res.data.withdrawVerify.result) {
        this.withdrawSuccessShow = true
        this.withdrawVerifyShow = false
      } else {
        this.withdrawVerifyError = res.errors[0].originErr && res.errors[0].originErr.error.message
      }
    },
    async resendCode() {
      const res = await this.withdrawResend({
        id: this.withdrawId
      })
      if (res && res.data && res.data.withdrawResend && res.data.withdrawResend.result && res.data.withdrawResend.result.result === 'success') {
        this.$refs.inputCode.countDown()
      }
    },
    codeChange() {
      this.withdrawVerifyError = ''
    }
  },
  watch: {
    tabIndex() {
      let currrency
      if (this.tabIndex === 0 && this.selected.currency.toLowerCase() === 'usdt') {
        currrency = this.selected.currency + '-erc20'
      } else {
        currrency = this.selected.currency
      }
      this.getWithdrawAddress(currrency)
    }
  },
}
