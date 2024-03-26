import Cookies from '@/utils/cookies'

const bowerLang = navigator.language || navigator.userLanguage

const lang = window.location.pathname.split('/')[1] || Cookies.getCookie('lang') || bowerLang // 默认为en,后期优化

export default {
  lang,
  isEn: lang === 'en',
  isCn: lang === 'zh-CN',
  isRu: lang === 'ru',
  isKo: lang === 'ko',
  isTr: lang === 'tr'
}

const languages = {
  en: 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  ru: 'Русский',
  ko: '한국어',
  vi: 'Tiếng Việt',
  tr: 'Türkçe',
  es: 'Español'
  // ja: '日本語',
}
const langArr = Object.keys(languages)
const langKeyValueMap = []
langArr.forEach(v => {
  langKeyValueMap.push({
    name: languages[v],
    value: v
  })
})

export {
  languages,
  langKeyValueMap
}
