import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './routes'
import api from '@/graphql'
import { Trans } from '@/utils/translation'
import store from '@/store'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})
let beforeEnterPath = ''
router.beforeEach(async function(to, from, next) {
  NProgress.start()
  let member
  if (process.env.NODE_ENV === 'development') {
    const resp = await api.query('MEMBER')
    member = resp && resp.data && resp.data.member
  } else {
    member = window.gon && window.gon.member
  }
  const matched = to.matched
  for (let i = 0; i <= matched.length - 1; i++) {
    if (matched[i].meta.auth && member && (!member.activated || member.activated === null)) {
      // 未激活用户
      if (matched[i].name.includes('activations')) {
        next()
      } else {
        location.href = '/activations'
        break
      }
    } else if (matched[i].meta.auth && member && member.force_kyc && router.history.pending.name !== 'IsKyc') {
      // 未KYC
      if (matched[i].name.includes('identitys')) {
        next()
      } else {
        location.href = '/en/identitys'
        // location.href = 'https://riostox.com/en/identitys'
        break
      }
    } else if (matched[i].meta.auth && member && member.activated) {
      // 已经激活用户
      if (matched[i].name.includes('activations')) {
        location.href = '/'
        break
      } else {
        next()
      }
    }
    if (matched[i].meta.notAuth && member) {
      location.href = '/settings'
      break
    } else if (matched[i].meta.requireApi && member && !member.api_token_tasted) {
      location.href = 'https://riostox.com/error_pages/403.html'
      break
    } else if (matched[i].meta.auth && !member) {
      beforeEnterPath = to.path
      next(Trans.i18nRoute({
        name: 'signin',
      }))
      break
    } else if (matched[i].path === '/:lang') {
      // lang匹不到对应有meta的路由
      continue
    } else {
      next()
    }
  }
})

router.afterEach((to, from) => {
  // afterEach只会执行一次
  // 进入登陆页
  if (to.name === 'signin' || to.name === 'signup') {
    store.commit('path/setBeforeSigninPath', beforeEnterPath ? beforeEnterPath : from.path)
    beforeEnterPath = ''
  }
  // 离开登陆页
  if (from.name === 'signin' || from.name === 'signup') {
    store.commit('path/clearBeforeSigninPath')
  }

  NProgress.done()
})

export default router
