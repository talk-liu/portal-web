export default {
  namespaced: true,
  state: {
    width: window.innerWidth || 0,
    height: window.innerHeight || 0,
    theme: 'light',
    headerHeight: 0,
    isInApp: window.navigator.userAgent.indexOf('riostox') !== -1,
  },
  getters: {
    type: state => {
      let w = state.width
      let t = null
      if (w > 1440) {
        t = 'lg'
      } else if (w <= 1440 && w > 1281) {
        t = 'md'
      } else if (w <= 1280 && w > 768) {
        t = 'sm'
      } else if (w <= 768) {
        t = 'h5'
      }
      return t
    },
    themeClass: ({ theme }) => {
      return `theme-${theme}`
    },
  },
  mutations: {
    resizeView(state, { width, height }) {
      state.width = width
      state.height = height
    },
    changeTheme(state, data) {
      if (!data.theme) return false
      state.theme = data.theme
      if (data.save) {
        localStorage.setItem('theme', data.theme)
      }
      if (data.theme === 'dark') {
        document.body.classList.replace('theme-light', 'theme-dark')
      } else {
        document.body.classList.replace('theme-dark', 'theme-light')
      }
    },
    setHeaderHeight(state, data) {
      state.headerHeight = data
    },
  },
}
