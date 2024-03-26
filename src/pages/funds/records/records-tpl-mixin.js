import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      state: {
        submitting: this.$t('m.funds.historyRecords.submitting'),
        submitted: this.$t('m.funds.historyRecords.submitted'),
        canceled: this.$t('m.funds.historyRecords.canceled'),
        accepted: this.$t('m.funds.historyRecords.accepted'),
        deducted: this.$t('m.funds.historyRecords.deducted'),
        suspect: this.$t('m.funds.historyRecords.suspect'),
        rejected: this.$t('m.funds.historyRecords.rejected'),
        processing: this.$t('m.funds.historyRecords.processing'),
        almost_done: this.$t('m.funds.historyRecords.almost_done'),
        done: this.$t('m.funds.historyRecords.done'),
        failed: this.$t('m.funds.historyRecords.failed'),
        checked: this.$t('m.funds.historyRecords.checked'),
        warning: this.$t('m.funds.historyRecords.warning')
      },
    }
  },
  props: ['data', 'meta', 'btnNumber'],
  computed: {
    ...mapState('depositRemarks', ['depositRemarks']),
    ...mapGetters('accounts', ['accounts']),
  },
  methods: {
    ...mapActions('depositRemarks', ['getDepositRemarks']),
    renderExtroInfo(data) {
      try {
        const extra_info = JSON.parse(data)
        if (extra_info.vote_reward) {
          return this.$t('m.funds.historyRecords.rewardsForVote', {
            period: Number(extra_info.vote_reward.period) + 1,
            currency: extra_info.vote_reward.currency,
          })
        }
        if (extra_info.type === 'mining') {
          extra_info.event_reward = 'my-tom'
        } else if (extra_info.level === 0 && extra_info.type === 'power_coupon') {
          extra_info.event_reward = 'power-coupon'
        } else if (extra_info.level === 0) {
          extra_info.event_reward = 'invited-tom'
        } else if (extra_info.level === 1) {
          extra_info.event_reward = 'level1-tom'
        } else if (extra_info.level === 2) {
          extra_info.event_reward = 'level2-tom'
        }
        if (extra_info.event_reward === 'atoken-mining-profit' && extra_info.source === 'option_trades') {
          extra_info.event_reward = 'option-trades'
        }
        if (this.depositRemarks[extra_info.event_reward]) {
          let memo = this.depositRemarks[extra_info.event_reward][this.$fifth.lang] || this.depositRemarks[extra_info.event_reward]['en']
          memo += extra_info.event_id || ''
          return memo
        }
      } catch (error) {
        return data
      }
    },
    maxConfirm(item) {
      const accounts = this.accounts
      const account = accounts[item.currency.toLowerCase()]
      if (account) {
        return account.max_confirmations
      }
    },
  }
}