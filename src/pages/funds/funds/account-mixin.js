import upperCase from '@/utils/upperCase'
import { mapGetters, mapState } from 'vuex'
import totalMoney from '@/mixins/total-money'

import VInputSearch from '@/components/input-search'
import Vue from 'vue'
import { Table, TableColumn } from 'element-ui'
Vue.use(Table)
Vue.use(TableColumn)
export default {
  mixins: [totalMoney, upperCase],
  data() {
    return {
      keyWord: '',
      hideSmallAccount: true,
      items: []
    }
  },
  components: {
    VInputSearch,
  },
  computed: {
    ...mapGetters('tickers', ['allTickers']),
    ...mapState('currentUser', ['currentUser']),
    ...mapGetters('currentUser', ['limitWithdraw']),
    ...mapGetters('accounts', ['totalAccount', 'accountsList']),
  },
  watch: {
    hideSmallAccount() {
      this.items = this.filterAccount()
    },
    accountsList() {
      this.items = this.filterAccount()
    }
  },
  methods: {
    filterAccount() {
      let items = this.keyWord ? this.accountsList.filter(
        i => i.currency.toUpperCase().indexOf(this.keyWord.toUpperCase()) > -1 && this.filterSmall(i),
      ) : this.accountsList.filter(i => this.filterSmall(i))
      return this.addTickers(items)
    },
    filterSmall(item) {
      return this.hideSmallAccount
        ? item.btc > 0.0005
        : true
    },
    getMarketLink(id) {
      location.href = `/pro/markets/${id}`
    },
    goSpecificDetail(tab, currency) {
      if (currency) {
        this.$router.push(this.$i18nRoute({
          name: `${tab}Currency`,
          params: {
            currency: currency,
          },
        }))
      } else {
        this.$router.push(this.$i18nRoute({
          name: tab
        }))
      }
    },
    addTickers(items) {
      const tickers = this.allTickers
      if (Array.isArray(items)) {
        items.forEach(item => {
          item.tickers = []
          for (let i = 0; i < tickers.length; i++) {
            if (tickers[i].quote_unit === item.currency) {
              item.tickers.push(tickers[i])
            }
          }
          if (item.tickers.length === 0) {
            for (let i = 0; i < tickers.length; i++) {
              if (tickers[i].base_unit === item.currency) {
                item.tickers.push(tickers[i])
              }
            }
          }
        })
      } else {
        items['tickers'] = []
        for (let i = 0; i < tickers.length; i++) {
          if (tickers[i].quote_unit === items.currency) {
            items['tickers'].push(tickers[i])
          }
        }
        if (items.tickers.length === 0) {
          for (let i = 0; i < tickers.length; i++) {
            if (tickers[i].base_unit === items.currency) {
              items['tickers'].push(tickers[i])
            }
          }
        }
      }
      return items
    },
  }
}
