import { BigNumber as bn } from 'bignumber.js'
import { mapGetters, mapActions, mapState } from 'vuex'
import find from 'lodash/find'
export default {
  computed: {
    ...mapGetters({
      voteInfo: 'voteInfo',
      voteCountInfo: 'voteCountInfo',
      voteHistoryInfo: 'voteHistoryInfo'
    }),
    ...mapState('currentUser', ['currentUser'])
  },
  methods: {
    ...mapActions(['getVoteHistory', 'getVoteInfo', 'getVoteCountInfo']),
    checkDateExpire() {
      if (this.date) {
        if (new Date().getTime() >= new Date(this.date).getTime()) {
          this.disabled = true
        } else {
          setTimeout(() => {
            this.checkDateExpire()
          }, 1000)
        }
      }
    },
    perReward(allReward, ticket) {
      const reward = ticket > 0 ? bn(allReward).dividedBy(ticket).toFixed(4) : 0
      return this.formatString(reward)
    },
    formatString(val) {
      return val && parseFloat(val).toLocaleString('en-US')
    },
    closeDialog() {
      this.isShowDialog = false
    },
    share(currency) {
      if (currency) {
        this.currency = currency
        this.isShowDialog = true
        this.dialogType = 1
      }
    },
    async toVote(currency) {
      if (!currency || this.disabled) {
        return
      }
      if (this.currentUser) {
        if (this.currentUser.id_document_state !== 'verified') {
          this.dialogType = 5
          this.isShowDialog = true
          return false
        }
        this.currency = currency
        await this.getVoteHistory()
        this.parseVoteHistoryInfo()
      } else {
        location.href = '/signin'
      }
    },
    parseVoteHistoryInfo() {
      const voteHistoryInfo = this.voteHistoryInfo.filter((val) => {
        return val.period === this.voteInfo.period
      })
      const item = find(voteHistoryInfo, (data) => {
        return data.code.toLowerCase() === this.currency.toLowerCase()
      })
      if (item) {
        if (item.done) {
          this.dialogType = 2
          this.isShowDialog = true
        } else {
          this.dialogType = 3
          this.quota = item.quota
          this.amount_total = Number(item.amount_total)
          this.left_amount = item.quota - Number(item.amount_total)
          this.isShowDialog = true
        }
      } else {
        const coin = find(this.voteInfo.list, (data) => {
          return data.currency.toLowerCase() === this.currency.toLowerCase()
        })
        this.dialogType = 3
        this.quota = coin.quota
        this.amount_total = 0
        this.left_amount = coin.quota
        this.isShowDialog = true
      }
    }
  }
}
