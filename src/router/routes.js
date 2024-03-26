import { Trans } from '@/utils/translation'
import activeRoutes from './active'

const childrenRoutes = [
  {
    path: '',
    name: 'index',
    component: () => import('@/pages/index'),
  },
  {
    path: 'vote',
    name: 'vote',
    component: () => import('@/pages/vote'),
  },
  {
    path: 'identitys',
    name: 'Identitys',
    component: () => import('@/pages/settings/components/identity'),
  },
  {
    path: 'vote-detail',
    name: 'voteDetail',
    component: () => import('@/pages/vote-detail'),
  },
  {
    path: 'at-mining',
    name: 'atMining',
    component: () => import('@/pages/at-mining'),
  },
  {
    path: 'portal',
    name: 'portal',
    component: () => import('@/pages/index'),
  },
  {
    path: 'pro/markets/:id',
    name: 'market',
    component: () => import('@/pages/markets'),
  },
  {
    path: 'markets/:id',
    name: 'marketStandard',
    component: () => import('@/pages/markets-standard'),
  },
  {
    path: 'history/',
    name: 'hisotry',
    component: () => import('@/pages/history/index'),
    redirect: 'history/condition/current',
    meta: {
      auth: true,
    },
    children: [
      {
        path: 'orders/current',
        name: 'ordersCurrent',
        component: () => import('@/pages/history/orders/current'),
      },
      {
        path: 'orders/history',
        name: 'ordersHistory',
        component: () => import('@/pages/history/orders/history'),
      },
      {
        path: 'orders/trades',
        name: 'ordersTrades',
        component: () => import('@/pages/history/orders/trades'),
      },
      {
        path: 'condition/current',
        name: 'conditionCurrent',
        component: () => import('@/pages/history/condition/current'),
      },
      {
        path: 'condition/history',
        name: 'conditionHistory',
        component: () => import('@/pages/history/condition/history'),
      },
    ],
  },
  {
    path: 'funds/',
    name: 'fundsDetail',
    component: () => import('@/pages/funds/index'),
    redirect: 'funds/funds/index',
    meta: {
      auth: true,
    },
    children: [
      {
        path: '/',
        name: 'funds',
        component: () => import('@/pages/funds/funds/account'),
      },
      {
        path: 'currency/:currency',
        name: 'currency',
        component: () => import('@/pages/funds/funds/currency-detail'),
      },
      {
        path: 'withdraw',
        name: 'withdraw',
        component: () => import('@/pages/funds/withdraw/index'),
      },
      {
        path: 'withdraw/:currency',
        name: 'withdrawCurrency',
        component: () => import('@/pages/funds/withdraw/index'),
      },
      {
        path: 'recharge',
        name: 'recharge',
        component: () => import('@/pages/funds/recharge/index'),
      },
      {
        path: 'recharge/:currency',
        name: 'rechargeCurrency',
        component: () => import('@/pages/funds/recharge/index'),
      },
      {
        path: 'records',
        name: 'records',
        component: () => import('@/pages/funds/records/index'),
      },
      {
        path: 'profit',
        name: 'profit',
        component: () => import('@/pages/funds/profit/index'),
      },
      {
        path: 'mining',
        name: 'mining',
        component: () => import('@/pages/funds/mining/index'),
      },
      {
        path: 'game',
        name: 'game',
        component: () => import('@/pages/funds/game/index'),
      },
      {
        path: 'game-reward-history',
        name: 'game-reward-history',
        component: () => import('@/pages/funds/game-reward-history/index'),
      },
    ],
  },
  {
    path: 'withdraw-address/:currency',
    name: 'withdrawAddress',
    meta: {
      auth: true,
    },
    component: () => import('@/pages/funds/withdraw/withdraw-address'),
  },
  {
    path: 'withdraw-verify/:id',
    name: 'withdrawVerify',
    meta: {
      auth: true,
    },
    component: () => import('@/pages/funds/withdraw/withdraw-verify'),
  },
  // at界面
  {
    path: 'aTPrivilege',
    name: 'aTPrivilege',
    component: () => import('@/pages/atPrivilege'),
  },
  // at界面
  {
    path: 'premiumClub',
    name: 'premiumClub',
    component: () => import('@/pages/premiumClub'),
  },
  ...activeRoutes, // 活动页路由
  {
    path: 'otc/',
    name: 'otc',
    component: () => import('@/pages/otc'),
    redirect: 'otc/home',
    children: [
      {
        path: 'home',
        name: 'otcHome',
        component: () => import('@/pages/otc/home'),
      },
      {
        path: 'progress',
        name: 'otcProgress',
        component: () => import('@/pages/otc/progress'),
      },
      {
        path: 'history',
        name: 'otcHistory',
        component: () => import('@/pages/otc/history'),
      },
    ],
  },
  {
    path: 'app_download',
    name: 'appDownload',
    component: () => import('@/pages/app-download'),
  },
  {
    path: 'about_us',
    name: 'aboutUs',
    component: () => import('@/pages/about-us'),
  },
  {
    path: 'my_favorite_markets',
    name: 'marketCenter',
    component: () => import('@/pages/market-center'),
  },
  {
    path: 'documents/:link',
    name: 'documents',
    component: () => import('@/pages/documents'),
  },
  {
    path: 'settings',
    name: 'SettingsIndex',
    component: () => import('@/pages/settings'),
    redirect: 'settings/',
    meta: {
      auth: true,
    },
    children: [
      {
        path: '/',
        name: 'Setting',
        component: () => import('@/pages/settings/settings'),
      },
      {
        path: 'identity',
        name: 'Identity',
        component: () => import('@/pages/settings/components/identity'),
      },
      {
        path: 'is-kyc',
        name: 'IsKyc',
        component: () => import('@/pages/settings/components/is-kyc'),
      },
      {
        path: 'member',
        name: 'Member',
        component: () => import('@/pages/settings/components/member'),
      },
      {
        path: 'api-management',
        name: 'Api',
        meta: {
          requireApi: true,
        },
        component: () => import('@/pages/settings/components/create-key'),
      },
      {
        path: 'change-password',
        name: 'ChangePassword',
        component: () => import('@/pages/settings/components/change-password'),
      },
      {
        path: 'unbind/:type',
        name: 'RemoveBinding',
        component: () => import('@/pages/settings/components/relieve'),
      },
      {
        path: 'bind/:type',
        name: 'Bind',
        component: () => import('@/pages/settings/components/bind'),
      },
      {
        path: 'bind/:type/:step',
        name: 'BindGoogle',
        component: () => import('@/pages/settings/components/bind-google'),
      },
    ],
  },
  {
    path: 'signin',
    name: 'signin',
    meta: {
      notAuth: true,
    },
    component: () => import('@/pages/login-register/loginIndex'),
  },
  {
    path: 'signup',
    name: 'signup',
    meta: {
      notAuth: true,
    },
    component: () => import('@/pages/login-register/registerIndex'),
  },
  {
    path: 'activations',
    name: 'activations',
    meta: {
      auth: true,
    },
    component: () => import('@/pages/login-register/activation/activation'),
  },
  {
    path: 'reset_passwords',
    name: 'resetPasswordsIndex',
    component: () => import('@/pages/login-register/reset-passwords/index'),
    meta: {
      notAuth: true,
    },
    children: [
      {
        path: 'new',
        name: 'resetPasswordsNew',
        component: () => import('@/pages/login-register/reset-passwords/reset-passwords'),
      },
      {
        path: 'confirm',
        name: 'resetPasswordsConfirm',
        component: () => import('@/pages/login-register/reset-passwords/reset-passwords-confirm'),
      },
      {
        path: 'edit/:code',
        name: 'resetPasswordsEdit',
        component: () => import('@/pages/login-register/reset-passwords/update-passwords'),
      },
      {
        path: 'login',
        name: 'resetSuccessLogin',
        component: () => import('@/pages/login-register/reset-passwords/reset-success-login'),
      },
    ],
  },
  {
    path: 'news-center/:hash',
    name: 'news-center',
    component: () => import('@/pages/news-center'),
  },
  {
    path: 'markets-list',
    name: 'markets-list',
    component: () => import('@/pages/markets-list'),
  },
  {
    path: 'products',
    name: 'products',
    component: () => import('@/pages/products'),
  },
  {
    path: 'about',
    name: 'about',
    component: () => import('@/pages/about'),
  },
  {
    path: 'team',
    name: 'team',
    component: () => import('@/pages/team'),
  },
  {
    path: 'news',
    name: 'news',
    component: () => import('@/pages/news'),
  },
  // {
  //   path: 'betatrading',
  //   name: 'betatrading',
  //   component: () => import('@/pages/betatrading'),
  // },
  // {
  //   path: 'referral',
  //   name: 'referral',
  //   component: () => import('@/pages/referral'),
  // },
  {
    path: 'fee/trading',
    name: 'trading',
    component: () => import('@/pages/fee/trading'),
    meta: {
      auth: true,
    },
  },
  // {
  //   path: 'about',
  //   name: 'about',
  //   component: () => import('@/pages/about'),
  //   redirect: 'about/information',
  //   children: [
  //     {
  //       path: 'information',
  //       name: 'information',
  //       component: () => import('@/pages/about/information'),
  //     },
  //     {
  //       path: 'mission',
  //       name: 'mission',
  //       component: () => import('@/pages/about/mission'),
  //     },
  //     {
  //       path: 'leadership',
  //       name: 'leadership',
  //       component: () => import('@/pages/about/leadership/leadership'),
  //     },
  //     {
  //       path: 'values',
  //       name: 'values',
  //       component: () => import('@/pages/about/values'),
  //     },
  //     {
  //       path: 'team',
  //       name: 'team',
  //       component: () => import('@/pages/about/team'),
  //     }
  //   ]
  // },
  {
    path: 'details/:slug',
    name: 'details',
    component: () => import('@/pages/news/details'),
  },
  /*
  新加路由需要在此之上
   */
  {
    name: '404',
    path: '404',
    component: () => import('@/pages/not-found'),
  },
  {
    path: '*',
    redirect: '404',
  },
]

const routes = [
  {
    path: '/:lang',
    component: () => import('@/pages/lang'),
    beforeEnter: Trans.routeMiddleware,
    children: [...childrenRoutes],
  },
  {
    path: '*',
    redirect() {
      return Trans.getUserSupportedLang()
    },
  },
]

export default routes
