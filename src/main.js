import Vue from 'vue'
import { i18n, local, loadLanguageAsync } from '@/i18n'
import '@/assets/font/iconfont/iconfont'
import App from './app.vue'
import router from '@/router'
import apolloProvider from '@/utils/apollo-provider'
import store from '@/store'
import '@/pusher/events'
import '@/utils'
import '@/assets/scss/main.scss'
// echarts
import echarts from 'echarts'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/chart/line'
window.echarts = echarts

loadLanguageAsync(local).then(() => {
  new Vue({
    el: '#app',
    provide: apolloProvider.provide(),
    i18n,
    router,
    store,
    render: h => h(App),
  })
})
