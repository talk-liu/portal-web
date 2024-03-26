// const sha1 = require('js-sha1')
import { mapState, mapGetters, mapActions } from 'vuex'
import api from '@/graphql'
require('./gt')
export default {
  created() {
    this.getCaptcha()
  },
  computed: {
    ...mapState('loginRegister', ['captcha']),
    ...mapGetters('viewport', ['type']),
    isGeetest() {
      return this.captcha.provider === 'geetest'
    },
    isRecapchaV2() {
      return this.captcha.provider === 'recaptcha_v2'
    },
  },
  methods: {
    ...mapActions('loginRegister', ['getCaptcha']),
    manMachineBefore() {
      this.btnText = this.$t('m.btnText.submitting')
    },
    // eslint-disable-next-line no-unused-vars
    // initGeetest(key) {
    //   this.setInfos()
    // },
    setInfos() {
      var aeetData = {
        token: "",
        type: "",
      }
      document.getElementById('submit').onclick=()=>{this.validateSuccess(aeetData)}
      const _this = this;
      api.query('CHALLENGE').then(({data}) => {
        window.initGeetest({
          lang: _this.$fifth.isCn ? 'zh-cn' : 'en',
          gt: data.challenge.key,
          challenge: data.challenge.challenge,
          offline: !'1',
          new_captcha: true,
          product: 'popup'
        }, function(captchaObj){
          _this.captchaObj = captchaObj;
          captchaObj.appendTo("#captchaBox");
          captchaObj.onReady(function(d){
            //验证码ready之后才能调用verify方法显示验证码
            captchaObj.verify();

          }).onSuccess(function(d){
            var validate = captchaObj.getValidate();
            _this.captchaIs = true
            aeetData = {
              token: validate.geetest_seccode,
              type: _this.captcha.provider,
            }
            _this.validateSuccess(aeetData)
            //your code
          }).onError(function(err){
            console.log(err)
            //your code
          })
          console.log(captchaObj)
        })

      })
      // eslint-disable-next-line no-undef
      // new YpRiddler({
      //   expired: 10,
      //   mode: 'dialog',
      //   winWidth: this.type === 'h5' ? 300 : 500,
      //   lang: this.$fifth.isCn ? 'zh-cn' : 'en', // 界面语言, 目前支持: 中文简体 zh-cn, 英语 en
      //   // langPack: LANG_OTHER, // 你可以通过该参数自定义语言包, 其优先级高于lang
      //   container: document.getElementById('submit'), // listen to all click on element with id 'submit'
      //   noButton: true,
      //   appId: 'b588e40502bc4856bde2ea7ed8278fa0',
      //   version: 'v1',
      //   onError: (param) => {
      //     if (!param.code) {
      //       console.error('错误请求')
      //     } else if (parseInt(param.code / 100) == 5) {
      //       // 服务不可用时，开发者可采取替代方案
      //       console.error('验证服务暂不可用')
      //     } else if (param.code == 429) {
      //       console.warn('请求过于频繁，请稍后再试')
      //     } else if (param.code == 403) {
      //       console.warn('请求受限，请稍后再试')
      //     } else if (param.code == 400) {
      //       console.warn('非法请求，请检查参数')
      //     }
      //     // 异常回调
      //     console.error('验证服务异常')
      //   },
      //   onSuccess: (validInfo, close, useDefaultSuccess) => {
      //     // 验证成功默认样式
      //     useDefaultSuccess(true)
      //     close()
      //     this.validateSuccess({
      //       token: JSON.stringify(validInfo),
      //       type: this.captcha.provider,
      //     })
      //   },
      //   onFail: (code, msg, retry) => {
      //     // 失败回调
      //     alert('出错啦：' + msg + ' code: ' + code)
      //     retry()
      //   },
      //   beforeStart: (next) => {
      //     console.log('验证马上开始')
      //     next()
      //   },
      //   onExit: () => {
      //     this.sense.destroy()
      //     this.setInfos()
      //     this.resetBtnText && this.resetBtnText()
      //     console.log('退出验证')
      //   }
      // })
    },
    initValidate() {
      this.setInfos()
    },
    verify() {
      // no captcha called as YpRiddler already set in setInfos
      this.manMachineBefore()
    },
  },
  watch: {
    captcha() {
      // if (this.captcha.provider === 'geetest') {
      //   require('@/utils/gt.sense')
      // } else if (this.captcha.provider === 'recapcha_v3') {
      //   const script = document.createElement('script')
      //   script.setAttribute(
      //     'src',
      //     'https://www.google.com/recaptcha/api.js?render=' +
      //       this.captcha.key +
      //       '&hl=' +
      //       (this.$fifth.isCn ? 'zh-CN' : 'en'),
      //   )
      //   script.setAttribute('type', 'text/javascript')
      //   document.body.appendChild(script)
      // }
      this.initValidate()
    },
  },
}
