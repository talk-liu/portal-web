<template>
  <div class="sp-outer-wrap" v-if="showMask">
    <div class="main psr">
      <i class="iconfont icon-guanbi sp-outer-close" @click="showMask = false" />
      <div class="sp-outer-content" v-if="showContent">
        <div class="sp-outer-text">
          Sign up to receive the latest Riostox news and Crypto trends
        </div>
        <div class="sp-outer-inpbox psr">
          <input v-model="email" :class="['sp-outer-inp', {'err': errEmail}]" type="text" placeholder="Username@gmail.com" @focus="errEmail = false">
          <a href="javascript:;" :class="['sp-outer-btn', {'err': errEmail}]" @click="spSubmit">Subscribe</a>
          <p class="errtext" v-if="errEmail">You must use a valid email address.</p>
        </div>
      </div>
      <div class="sp-outer-success" v-if="showSuccess">
        <div class="success-title">
          <i class="iconfont icon-gouxuanxuanzhong2" />
          Confirm Subscription
        </div>
        <div class="success-desc">
          Hi there, <br>
          Thank you for subscribing to the Riostox Newsletter!<br>
          Just one last thing.<br>
          A confirmation e-mail has been sent to the e-mail address you provided {{email}} the link in the e-mail to confirm and activate the subscription.Once done,we are good to go!<br>
        </div>
        <div class="success-desc">
          Regards, <br>
          Riostox Team <br>
        </div>
      </div>
      <div class="sp-outer-error" v-if="showError">
        We are very sorry,but subscription form not found.You need to contact with website owner to solve this problem.
      </div>
    </div>
  </div>
</template>
<script>
import { isEmail } from '@/utils/verify.js'
import { addEmail, getEmail } from '@/api/index'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      showMask: false,
      showContent: false,
      showSuccess: false,
      showError: false,
      errEmail: false,
      email: '',
      requestAble: true,
      timer: null,
    }
  },
  mounted() {
    if (this.currentUser && this.currentUser.email) {
      this.isEmailAdded(this.currentUser.email)
    } else {
      this.showMask = true
      this.showContent = true
      this.setFooterMargin()
    }
  },
  computed: {
    ...mapState('currentUser', ['currentUser']),
  },
  methods: {
    spSubmit() {
      if (isEmail(this.email)) {
        if (this.requestAble) {
          this.requestAble = false
          // 防抖
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.requestAble = true
          }, 3000)

          this.addEmailHandle(this.email).then(res => {
            this.showContent = false
            if (res.result) {
              this.showSuccess = true
            } else {
              this.showError = true
            }
            this.setFooterMargin()
            setTimeout(() => {
              this.showMask = false
            }, 5000)
          })
        }
      } else {
        this.errEmail = true
      }
    },
    // 判断是否已经订阅过
    isEmailAdded(email) {
      this.getEmailHandle(email).then(res => {
        if (res.error_code === 502) { // 未订阅
          this.showMask = true
          this.showContent = true
          this.setFooterMargin()
        } else {
          this.showContent = false
        }
      })
    },
    async addEmailHandle(email) {
      const result = await addEmail({ email })
      return result.data
    },
    async getEmailHandle(email) {
      const result = await getEmail({ email })
      return result.data
    },
    // 设置footer底部间距
    setFooterMargin() {
      this.$nextTick(() => {
        const spOuterElement = document.querySelector('.sp-outer-wrap')
        const height = spOuterElement && spOuterElement.offsetHeight || 0
        const footerElement = document.querySelector('.page-footer')
        if (footerElement && footerElement.style) {
          footerElement.style.paddingBottom = `${height}px`
        }
      })
    }
  },
  beforeDestroy() {
    this.showMask = false
    this.setFooterMargin()
  },
  watch: {
    currentUser(val) {
      val.email && this.isEmailAdded(val.email)
    },
    showMask(val) {
      if (!val) { // 浮层为关闭时，底部距离设为0
        this.setFooterMargin()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.psr {
  position: relative;
}

.sp-outer-wrap {
  width: 100%;
  padding: 20px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: $zindex-modal;
  background: #ffffff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  .main {
    width: 1400px;
  }
  .sp-outer-close {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 8px;
    right: 0;
    z-index: 1;
    cursor: pointer;
  }
  .sp-outer-content {
    display: flex;
    align-items: center;
    .sp-outer-text {
      line-height: 20px;
      color: #111111;
    }
    .sp-outer-inpbox {
      width: 394px;
      margin-left: 30px;
      display: flex;
      align-items: center;
      .errtext {
        position: absolute;
        bottom: -14px;
        left: 10px;
        z-index: 1;
        font-size: 12px;
        color: #ee4343;
      }
      .sp-outer-inp {
        flex: 1;
        height: 32px;
        line-height: 32px;
        padding: 6px 10px;
        border: 1px solid #e0e0e0;
        border-right: none;
        border-radius: 2px 0 0 2px;
        outline: none;
        &:focus {
          border-color: #777777;
        }
        &.err {
          border-color: #ee4343;
        }
      }
      .sp-outer-btn {
        width: 130px;
        height: 32px;
        display: block;
        line-height: 32px;
        text-align: center;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        color: white;
        background: #4c84ff;
        &.err {
          background: #ee4343;
        }
      }
    }
  }
  .sp-outer-success {
    padding-right: 26px;
    .success-title {
      line-height: 20px;
      font-size: 15px;
      color: #3bb46e;
      margin-top: 6px;
      .icon-gouxuanxuanzhong2 {
        margin: 0 6px 0 2px;
      }
    }
    .success-desc {
      margin: 20px 0 6px;
      line-height: 20px;
    }
  }
  .sp-outer-error {
    line-height: 20px;
    padding: 6px 26px 6px 0;
    color: #ee4343;
  }
}

@include screen-sm-md-new() {
  .sp-outer-wrap {
    .main {
      width: 84%;
    }
  }
}

@media (max-width: 1000px) {
  .sp-outer-wrap {
    .sp-outer-close {
      top: 0;
    }
    .sp-outer-content {
      align-items: flex-start;
      flex-direction: column;
      .sp-outer-text {
        width: 84%;
        margin-bottom: 10px;
      }
      .sp-outer-inpbox {
        width: 100%;
        margin-left: 0;
      }
    }
  }
}

@include screen-h5-new() {
  .sp-outer-wrap {
    box-shadow: none;
    padding: 10px 0;
    background: rgba(255, 255, 255, 0.85);
    .main {
      width: 95%;
      border-radius: 4px;
      padding: 16px 10px;
      background: #f4f4f4;
    }
    .sp-outer-close {
      font-size: 10px;
      top: 12px;
      right: 12px;
    }
    .sp-outer-content {
      .sp-outer-text {
        margin-bottom: 10px;
      }
      .sp-outer-inpbox {
        width: 100%;
        margin-left: 0;
        margin-bottom: 4px;
      }
    }
    .success-title {
      margin-bottom: -10px;
    }
  }
}
</style>
