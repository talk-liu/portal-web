import lang, { languages } from '@/utils/lang-utils'

const Trans = {
  get defaultLanguage() {
    return 'en'
  },
  get supportedLanguages() {
    return Object.keys(languages)
  },
  get currentLanguage() {
    return lang.lang
  },
  getUserSupportedLang() {
    const userPreferredLang = Trans.getUserLang()
    if (Trans.isLangSupported(userPreferredLang.lang)) {
      return userPreferredLang.lang
    }
    return Trans.defaultLanguage
  },
  getUserLang() {
    const lang = window.navigator.language || window.navigator.userLanguage || Trans.defaultLanguage
    return { lang }
  },
  isLangSupported(lang) {
    return Trans.supportedLanguages.includes(lang)
  },
  routeMiddleware(to, from, next) {
    const lang = to.params.lang
    if (!Trans.isLangSupported(lang)) {
      let path = Trans.getUserSupportedLang() + to.path
      return next({ path: path, replace: true })
    } else {
      next()
    }
  },
  i18nRoute(to) {
    if (to.path) {
      return {
        path: `/${this.currentLanguage}${to.path}`,
      }
    } else {
      return {
        ...to,
        params: { lang: this.currentLanguage, ...to.params },
      }
    }
  },
}

export { Trans }
