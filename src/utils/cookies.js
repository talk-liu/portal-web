class Cookies {
  getCookie(name) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)
    if (arr) {
      return unescape(arr[2])
    } else {
      return null
    }
  }

  setCookie(name, value, days) {
    let exp = new Date()
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`
  }

  delCookie(name) {
    let exp = new Date()
    exp.setTime(exp.getTime() - 1)
    let cval = this.getCookie(name)
    if (cval != null)
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

export default new Cookies()