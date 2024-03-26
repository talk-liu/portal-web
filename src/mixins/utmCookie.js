import getQueryString from '@/utils/getQueryString'
import Cookies from '@/utils/cookies'

export default {
  created() {
    let utmSource = getQueryString('utm_source')
    if (utmSource && !Cookies.getCookie('utm_source')) {
      Cookies.setCookie('utm_source', utmSource, 60)
    }
  }
}