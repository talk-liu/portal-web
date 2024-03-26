export default {
  data() {
    return {
      appConfig: process.env.NODE_ENV === 'production' ? window.gon.appConfig : this.defaultApp()
    }
  },
  methods: {
    defaultApp() {
      return {
        iOS: {
          version: '1.0.0',
          link: 'itms-services://?action=download-manifest&url=https://s.riostox.com/res/app/ios/manifest.plist'
        },
        android: {
          version: '1.0.1',
          link: 'https://s.riostox.com/res/app/android/riostox.apk'
        }
      }
    }
  }
}