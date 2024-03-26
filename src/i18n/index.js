import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import langUtils from '@/utils/lang-utils'

import ElementLocale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import ruRULocale from 'element-ui/lib/locale/lang/ru-RU'
import koLocale from 'element-ui/lib/locale/lang/ko'
import jaLocale from 'element-ui/lib/locale/lang/ja'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import { languages } from '@/utils/lang-utils'
Vue.use(VueI18n)

// 设置默认的语言
const ENV = process.env.NODE_ENV
const hash = ENV !== 'production' ? '' : window.gon.transifex.hash

const elementI18n = {
  'zh-CN': zhLocale,
  ru: ruRULocale,
  ko: koLocale,
  ja: jaLocale,
  en: enLocale
}

export const i18n = new VueI18n({
  locale: '',
  messages: {},
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export const local = langUtils.lang
const elementLang = elementI18n[local] || elementI18n['en']

// 本地开发
async function setLoaclLanguage(lang) {
  const res = await axios.get('/portal/transifex') // get gon.transifex
  let transifex = {}
  if (res && res.data) {
    transifex = res.data
  }
  const { hash } = transifex
  return getTransifex(lang, hash)
}

function getTransifex(lang, hash) {
  return axios.get(`/transifex/${lang}-${hash}.json`).then(response => {
    i18n.setLocaleMessage(lang, { m: response.data, el: elementLang.el })
    cacheLang({ m: response.data, el: elementLang.el })
    return setI18nLanguage(lang)
  }).catch(err => {
    console.log(err)
    const langauage = localStorage.getItem('th5Lang') ? JSON.parse(localStorage.getItem('th5Lang')) : {}
    i18n.setLocaleMessage(lang, { ...langauage, ...elementLang })
    return setI18nLanguage(lang)
  })
}

export function setI18nLanguage(lang) {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return Promise.resolve()
}
// 动态加载语言文件
export function loadLanguageAsync(lang) {
  if (hash && localStorage.getItem('th5Hash') === hash && localStorage.getItem('th5Local') === local) {
    const langauage = localStorage.getItem('th5Lang') ? JSON.parse(localStorage.getItem('th5Lang')) : {}
    i18n.setLocaleMessage(lang, { ...langauage, ...elementLang })
    return setI18nLanguage(lang)
  } else {
    // 匹配不到我们以发布语言版本直接默认显示英文
    if (Object.keys(languages).indexOf(lang) < 0) {
      lang = 'en'
    }
    // dev mode ?
    // if (ENV === 'development') { // todo
    //   return import(/* webpackChunkName: "lang-[request]" */ `@/assets/lang/${lang}.js`).then(msgs => {
    //     i18n.setLocaleMessage(lang, msgs)
    //     cacheLang(msgs)
    //     return setI18nLanguage(lang)
    //   })
    // }
    if (ENV !== 'production') {
      return setLoaclLanguage(lang)
    }
    return getTransifex(lang, hash)
  }
}

// 缓存语言包
function cacheLang(langObj) {
  localStorage.removeItem('th5Hash')
  localStorage.removeItem('th5Lang')
  localStorage.removeItem('th5Local')
  localStorage.setItem('th5Hash', hash)
  localStorage.setItem('th5Local', local)
  localStorage.setItem('th5Lang', JSON.stringify(langObj))
}

