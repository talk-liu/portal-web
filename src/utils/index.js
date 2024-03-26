import Vue from 'vue'
import eventBus from './event-bus'
import lang from './lang-utils'
import Notification from '@/components/notification'
import { Trans } from './translation'

import VueLogger from 'vuejs-logger'
const options = {
  // required ['debug', 'info', 'warn', 'error', 'fatal']
  logLevel: 'debug',
  // optional : defaults to false if not specified
  stringifyArguments: true,
  // optional : defaults to false if not specified
  showLogLevel: true,
  // optional : defaults to false if not specified
  showMethodName: true,
  // optional : defaults to '|' if not specified
  separator: '|',
  // optional : defaults to false if not specified
  showConsoleColors: true,
}

Vue.use(VueLogger, options)

// 全局notify消息
Vue.prototype.$notify = Notification
Vue.prototype.$fifth = {
  eventBus,
  ...lang,
}
// 国际化路由
Vue.prototype.$i18nRoute = Trans.i18nRoute.bind(Trans)

// 千分位
Vue.filter('thousands', function(value) {
  // 过滤小于1的小数及为零的情况
  if (value < 1 || value == 0) return value
  if (!value) return ''
  return Number(value).toLocaleString('en-US', { maximumFractionDigits: 8 })
})

// 首字母大写
Vue.filter('upperCase', function(val) {
  if (!val) return val
  return val.toUpperCase()
})
