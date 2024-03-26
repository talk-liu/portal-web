export default {
  title: 'MenaPay 全球 IEO 首发',
  curSupportText: '目前累计支持：',
  sold: '已达成',
  participants: '人已支持',
  surplus: '剩余：',
  day: '日',
  hour: '时',
  min: '分',
  sec: '秒',
  toSupport: function() {
    return '我要支持'
  },
  information: '项目简介',
  website: '前往官网',
  whitePaper: '项目白皮书',
  baseInfo: '基本信息',
  fahangTime: '发行时间',
  fahangTotal: '发行总量',
  fahangPrice: '项目发行币价',
  buyMin: '最低买入：',
  currencyPrice: function(currency) {
    return `(视${currency}价格而定)`
  },
  endTime: '倒计时：',
  social: '社交工具',
  myInfo: '我的信息',
  account: '账户',
  bonus: '首发IEO激励',
  soldOut: '已售罄',
  depositAddress: function(currency) {
    return `${currency}充值地址`
  },
  copyBtn: function(currency) {
    return `复制充值${currency}地址`
  },
  cancelBtn: '取消',
  activePeriod: function(time) {
    return `IEO时间：${time}，数据每日12:00（UTC+8）更新`
  },
  copySuccess: '复制成功！',
  deposit:'充值',
  balance: '余额',
  payment: '支付',
  payment_placeholder: '请输入价格',
  get: '购买数量',
  get_placeholder: '请输入数量',
  buy: '购买',
  estimatedValue: '',
  price: '',
  purchaseAmount: '',
  amountIncludingBonus: '',
  value:'',
  important_notes: '注意事项:',
  estimated_value:'资产折合',
  purchase_amount:'购买数量',
  amount_including_bonus:'数量（包含优惠赠送）',
  price_name: '单价',
  bonus_name:'赠送数量',
  ieo_protocol: '我同意代币购买条款.',
  scan_ieo_protocol: '查看条款',
  rechargePrompt: '余额不足，请充值',
  quantityVerification: '购买数量必须是10的倍数'
}
