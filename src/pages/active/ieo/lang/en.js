export default {
  title: 'MenaPay Global IEO Launch',
  curSupportText: 'Total Token Sold: ',
  sold: 'Sold',
  participants: 'Participants',
  surplus: 'End of token sale :',
  day: 'Days',
  hour: 'hours',
  min: 'Minutes',
  sec: 'seconds',
  toSupport: function(token) {
    return `Buy ${token}`
  },
  information: 'Project Information',
  website: 'Website',
  whitePaper: 'White Paper',
  baseInfo: 'Token Sale Information',
  fahangTime: 'Start',
  fahangTotal: 'Total Token Supply',
  fahangPrice: 'Token Price',
  buyMin: 'Minimum buy-in:',
  currencyPrice: function(currency) {
    return `(Subject to ${currency} price)`
  },
  endTime: 'End of token sale : ',
  social: 'Social Media',
  myInfo: 'My info',
  account: 'Account',
  bonus: 'IEO Launch Bonus',
  soldOut: 'Sold Out',
  depositAddress: function(currency) {
    return `${currency} Deposit Address`
  },
  copyBtn: function(currency) {
    return `Copy ${currency} Address`
  },
  cancelBtn: 'Cancel',
  activePeriod: function(time) {
    return `Token Sale Period: ${time}, status update at 12:00 daily (UTC+8)`
  },
  copySuccess: 'Success!',
  deposit:'Deposit',
  balance: 'Balance',
  payment: 'Payment',
  payment_placeholder: 'Please enter the price',
  get: 'Purchase amount',
  get_placeholder: 'Please enter the quantity',
  buy: 'Purchase',
  estimatedValue: 'Estimated Value',
  price: 'Price',
  purchaseAmount: 'Purchase amount',
  amountIncludingBonus: 'Amount including Bonus',
  value:'Value',
  important_notes: 'Important Notes:',
  estimated_value:'Estimated Value',
  purchase_amount:'Purchase amount',
  amount_including_bonus:'Amount including Bonus',
  price_name: 'Price',
  bonus_name:'Bonus',
  ieo_protocol: 'I agree with the token purchasing terms.',
  scan_ieo_protocol: 'View Terms',
  rechargePrompt: 'Insufficient balance, please recharge',
  quantityVerification: 'The purchase quantity must be a multiple of 10'
}
