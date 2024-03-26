// import { telegramBind, telegramUnBind, isTelegramBind } from '@/api/index'
import copyToClipboard from '@/utils/copy'
import { mapActions } from 'vuex'
const isProd = location.href.indexOf('riostox.com') >= 0
import Message from '@/utils/message'
export default {
  data() {
    return {
      botHref: isProd ? 'https://t.me/riostox_id_bot' : 'https://t.me/riostoxtest_bot',
      telegramCode: '',
      copySuccess: false,
      telegramIsBind: null,
    }
  },
  created() {
    this.queryIsTelegramBind()
  },
  computed: {
    bindUrl() {
      return this.botHref + '?start=' + this.telegramCode
    },
  },
  methods: {
    ...mapActions('settings', ['proxyAuth']),
    listenerBindChange() {
      document.addEventListener('visibilitychange', this.queryIsTelegramBind)
    },
    removeListenerBindChange() {
      document.removeEventListener('visibilitychange', this.queryIsTelegramBind)
    },
    copy(content) {
      const success = copyToClipboard(content)
      if (success) {
        this.copySuccess = true
        setTimeout(() => {
          this.copySuccess = false
        }, 1500)
      } else {
        Message.warn(this.$t('m.errMessages.cantCopy'))
      }
    },
    async queryIsTelegramBind() {
      if (document.visibilityState === 'visible') {
        const res = await this.proxyAuth({
          forwardName: 'isTelegramBind',
        })
        if (res.data.proxyAuth && res.data.proxyAuth.result.isBind === true) {
          this.telegramIsBind = true
        } else {
          this.telegramIsBind = false
        }
      }
    },
    async telegramBindInfo() {
      const res = await this.proxyAuth({
        forwardName: 'telegramBind',
      })
      if (res.data.proxyAuth && res.data.proxyAuth.result) {
        const data = res.data.proxyAuth.result
        if (data && data.bind && data.bind.enable === 1) {
          this.telegramIsBind = true
        } else {
          this.telegramCode = data.verifycode
          this.telegramIsBind = false
        }
      }
    },
    async removeBind(type) {
      if (type === 'telegram') {
        const res = await this.proxyAuth({
          forwardName: 'telegramUnbind',
        })
        if (res.data.proxyAuth && res.data.proxyAuth.result) {
          this.telegramIsBind = false
        }
      } else {
        this.$router.push(this.$i18nRoute({
          name: 'RemoveBinding',
          params: {
            type,
          },
        }))
      }
    },
    toBindTelegram() {
      const href = this.bindUrl
      window.open(href)
    },
  },
}
