export default [
  {
    path: 'active',
    name: 'active',
    component: () => import('@/pages/active/index'),
    children: [
      {
        path: 'trading-competition',
        name: 'tradingCompetition',
        component: () => import('@/pages/active/trading-competition'),
      },
      {
        path: 'profit-competition',
        name: 'profitCompetition',
        component: () => import('@/pages/active/profit-competition'),
      },
      {
        path: 'ieo/:currency',
        name: 'ieo',
        component: () => import('@/pages/active/ieo'),
        // children: [
        //   {
        //     path: 'buy',
        //     name: 'buyieo',
        //     component: () => import('@/pages/active/buyieo'),
        //   },
        // ],
      },
      {
        path: 'ieo/:currency/buy',
        name: 'buyieo',
        component: () => import('@/pages/active/buyieo/ieo-form'),
      },
    ],
  },
]
