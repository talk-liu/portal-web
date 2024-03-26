(function(global, factory) {
  // eslint-disable-next-line no-undef
  if (typeof define === 'function' && define.amd) {
    // eslint-disable-next-line no-undef
    define(['exports'], factory)
  } else if (typeof exports !== 'undefined') {
    factory(exports)
  } else {
    let mod = {
      exports: {},
    }
    factory(mod.exports)
    global.actual = mod.exports
  }
})(this, function(exports) {
  'use strict'

  Object.defineProperty(exports, '__esModule', {
    value: true,
  })

  exports.default = {
    env: 'canary',
    ['_session']: 'e076587d826f1ee2c82855b4e7824d4a',
    csrfToken: 'to6CL2jKiDbKEMm0uqW-KCVg',
    noList: [
      'market',
      'profit_h5',
      'mining_h5',
      'funds_h5',
      'account_h5',
      'withdraw_h5',
      'recharge_h5',
      'withdrawCurrency_h5',
      'rechargeCurrency_h5',
      'records_h5',
      'withdrawAddress',
      'withdrawVerify',
      'currency',
      'Setting_h5',
      'signin_h5',
      'signup_h5',
      'activations_h5',
      'activationSuccess_h5',
      '404',
      '404_h5',
      'game_h5',
      'game-reward-history_h5',
    ],
    tech: { push: 'push.riostox.com', api: 'http://0.0.0.0:7009' },
    canary: { push: 'push.riostox.com', api: 'http://0.0.0.0:7009' }, // http://192.168.208.32:7002//https://riostox.com
    prod: { push: 'push.riostox.com', api: 'https://riostox.com' },
  } // 不要footer页面配置
})
