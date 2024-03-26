<template >
  <div v-if="width !== 0 && page && !isInApp">
    <navbar-back v-if="showNavBack"></navbar-back>
    <mobile-header v-else-if="width < 1000" :menuData="menuData" :headerType="headerType" />
    <pc-header v-else :menuData="menuData" :headerType="headerType" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import MobileHeader from './mobile-header'
import PcHeader from './header'
import NavbarBack from './navbar-back'
export default {
  props: ['page', 'showNavBack'],
  data() {
    return {
      menuData: {
        system: [
          {
            name: 'Exchange',
            icon: 'icon-Exchange',
            handleClick: this.goPro,
          },
          // { name: 'AT', url: '/at-mining', icon: 'icon-AT', isRoute: true },
          // {
          //   name: `${this.$t('m.exchange.fiatTrading')}`,
          //   url: '/otc',
          //   checkNotCn: true,
          //   icon: 'icon-fabijiaoyi1',
          //   isRoute: true },
          // {
          //   name: `${this.$t('m.exchange.applyCoin')}`,
          //   url: 'https://docs.google.com/forms/d/e/1FAIpQLScRYmN9jQmK5ErgLgusI6CUUx1k9LxNwpi1lGJp93gO3HCdXg/viewform',
          //   target: '_blank',
          //   icon: 'icon-shenqingshangbi',
          // },
          // {
          //   name: `${this.$t('m.exchange.applyIeo')}`,
          //   // url: 'http://bit.ly/apply2hive',
          //   url: `/active/ieo/${window.gon && window.gon.ieo_active ? window.gon.ieo_active.list[0].currency : 'TSK'}`,
          //   target: '_blank',
          //   icon: 'icon-IEO',
          //   isRoute: true
          // },
          // {
          //   name: this.$t('m.menu.beAmbassador'),
          //   url: 'https://docs.google.com/forms/d/e/1FAIpQLSc8R0Os9UpDfTaQfX6amu5Nbo1L5NGiscBvquoYVbQz3GSXEQ/viewform?usp=sf_link',
          //   target: '_blank',
          //   icon: 'icon-riostoxdashi',
          // },
          // {
          //   name: 'Riostox Cloud',
          //   url: 'https://cloud.riostox.com/',
          //   target: '_blank',
          //   icon: 'icon-riostoxdashi',
          // },
          // {
          //   name: 'OTC',
          //   url: '/otc',
          //   target: '_blank',
          //   icon: 'icon-riostoxdashi',
          // },
          // {
          //   name: 'AT Privilege',
          //   url: '/aTPrivilege',
          //   target: 'blank',
          //   isRoute: true
          // }
          // {
          //   name: 'Premium Club',
          //   url: '/premiumClub',
          //   target: 'blank',
          //   isRoute: true
          // }
        ],
        market: [
          {
            name: 'Markets',
            handleClick: this.goPro,
            menu: [
              { name: 'Base', url: '/markets/btcusdt', isRoute: true },
              { name: 'Pro', handleClick: this.goPro },
            ],
          },
          // { name: 'Market Centre', url: '/my_favorite_markets' },
          {
            name: 'My Orders - Riostox',
            url: '/history/orders/current',
            isRoute: true,
            checkLogin: true,
            menu: [
              { name: 'Open order', url: '/history/orders/current', isRoute: true },
              { name: 'Order history', url: '/history/orders/history', isRoute: true },
              {
                name: 'Trade history',
                url: '/history/orders/trades',
                isRoute: true,
              },
              {
                name: 'Stop Limit/Stop Loss',
                url: '/history/condition/current',
                isRoute: true,
              },
              {
                name: 'Stop Limit/Stop Loss History',
                url: '/history/condition/history',
                isRoute: true,
              },
            ],
          },
        ],
        newsCenter: {
          menu: [
            {
              name: this.$t('m.newsCenter.center'),
              url: '/news-center/release',
              isRoute: true,
              checkLogin: true,
              menu: [
                {
                  name: this.$t('m.newsCenter.center'),
                  url: '/news-center/release',
                  isRoute: true,
                },
                {
                  name: this.$t('m.newsCenter.announcements'),
                  url: '/news-center/announcements',
                  isRoute: true,
                },
                {
                  name: this.$t('m.newsCenter.market'),
                  url: '/news-center/market-data',
                  isRoute: true,
                },
                {
                  name: this.$t('m.newsCenter.data'),
                  url: '/news-center/market-communications',
                  isRoute: true,
                },
              ],
            },
          ],
        },
        aboutCenter: {
          menu: [
            {
              name: 'About RioStox',
              url: '/about',
              isRoute: true,
              checkLogin: true,
              menu: [
                {
                  name: 'Corporation',
                  url: '/about',
                  isRoute: true,
                },
                {
                  name: 'Mission/Objectives',
                  url: '/about/mission',
                  isRoute: true,
                },
                {
                  name: 'Leadership',
                  url: '/about/leadership',
                  isRoute: true,
                },
                {
                  name: 'Values',
                  url: '/about/values',
                  isRoute: true,
                },
                {
                  name: 'Our team',
                  url: '/about/team',
                  isRoute: true,
                },
              ],
            },
          ],
        },
        right: {
          common: [
            // {
            //   name: this.$t('m.menu.blog'),
            //   url: this.$fifth.isRu ? 'https://blog.riostox.com/ru/' : 'https://blog.riostox.com/',
            //   target: '_blank',
            // },
            // {
            //   name: 'Notice',
            //   url: 'https://help.Riostox.com/hc/en-us/categories/360000884592',
            //   target: '_blank',
            // },
          ],
          logged: {
            common: [
              {
                name: `${this.$t('m.menu.assetManagement')}`,
                url: '/funds',
                menu: [
                  { name: `${this.$t('m.menu.myAssets')}`, url: '/funds', isRoute: true, hide: false },
                  {
                    name: `${this.$t('m.funds.fundsMenu.recharge')}`,
                    url: '/funds/recharge',
                    isRoute: true,
                    hide: true,
                  },
                  {
                    name: `${this.$t('m.funds.fundsMenu.withdraw')}`,
                    url: '/funds/withdraw',
                    isRoute: true,
                    hide: true,
                  },
                  { name: `${this.$t('m.funds.fundsMenu.records')}`, url: '/funds/records', isRoute: true, hide: true },
                  // {
                  //   name: 'AT',
                  //   url: '/funds/profit',
                  //   isRoute: true,
                  // },
                  // {
                  //   name: `${this.$t('m.funds.fundsMenu.atGame')}`,
                  //   url: '/funds/game',
                  //   isRoute: true,
                  // },
                  // {
                  //   name: `${this.$t('m.funds.fundsMenu.otc')}`,
                  //   url: 'https://docs.google.com/forms/d/e/1FAIpQLSdqaukTOrNccTU_FQdtjaxhxrBNwN3vnGHJPFPVI7pkZxOU7A/formResponse',
                  //   isRoute: false,
                  // },
                ],
              },
              {
                name: `${this.$t('m.exchange.accout')}`,
                icon: 'icon-zhanghu1',
                hideName: true,
                key: 'account',
                menu: [
                  { name: `${this.$t('m.personalMenu.personalInfo')}`, url: '/settings', isRoute: true },
                  { name: `${this.$t('m.personalMenu.identityAuth')}`, url: '/settings/is-kyc', isRoute: true },
                  {
                    name: `${this.$t('m.menu.feedback')}`,
                    urlObj: {
                      'zh-CN': 'https://help.riostox.com/hc/zh-cn/requests/new',
                      en: 'https://help.riostox.com/hc/en-us/requests/new',
                      ru: 'https://help.riostox.com/hc/ru/requests/new',
                      ko: 'https://help.riostox.com/hc/ko/requests/new',
                    },
                    target: '_blank',
                  },
                  {
                    name: `${this.$t('m.personalMenu.logout')}`,
                    handleClick: this.loginout,
                    hide: true,
                  },
                ],
              },
            ],
          },
        },
      },
    }
  },
  components: {
    MobileHeader,
    PcHeader,
    NavbarBack,
  },
  computed: {
    ...mapGetters('viewport', ['type']),
    ...mapState('viewport', ['width', 'isInApp']),
    headerType() {
      const marketList = [
        'market',
        'marketStandard',
        'ordersCurrent',
        'ordersHistory',
        'ordersTrades',
        'conditionCurrent',
        'conditionHistory',
      ]
      if (marketList.includes(this.page)) {
        return 'market'
      } else {
        return 'system'
      }
    },
  },
  methods: {
    ...mapActions('loginRegister', ['signout']),
    goPro() {
      let market = localStorage.getItem('currentMarket') || 'btcusdt'
      this.$router.push(this.$i18nRoute({ path: `/pro/markets/${market}` }))
    },
    loginout() {
      sessionStorage.setItem('showAuth', '')
      this.signout()
    },
  },
}
</script>
