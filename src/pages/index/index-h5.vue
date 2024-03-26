<template>
  <div class="index-wrap">
    <div class="introduction-riostox">
      <div class="left">
        <h1>
          Your easy and instant access to crypto
        </h1>
        <h4>
          Riostox, world's leading digital assets platform, aims to provide a seamless experience for users.
        </h4>
        <div class="btns">
          <a class="btn google" href="https://play.google.com/store/apps/details?id=com.riostox.exchange"></a>
          <a class="btn app-store" href="https://apps.apple.com/app/id1428903145"></a>
        </div>
      </div>
      <div class="register" v-if="isLogin">
        <div class="top">
          <div class="left"
               onclick="window.open('https://help.riostox.com/hc/en-us/articles/360031057632-Riostox-Zero-Fee-API-Trading')">
            <img src="../../assets/images/index_1_chinese.png" alt="" v-if="lang==='zh-CN'">
            <img src="../../assets/images/index_1_ra.png" alt="" v-else-if="lang==='ru'">
            <img src="../../assets/images/index_1_english.png" alt="" v-else>
          </div>
          <div class="right"
               onclick="window.open('https://help.riostox.com/hc/en-us/articles/360035840252-TASUKI-TSK-Token-Sale-on-Riostox-HIVE')">
            <img src="../../assets/images/index_2_chinese.png" alt="" v-if="lang==='zh-CN'">
            <img src="../../assets/images/index_2_ra.png" alt="" v-else-if="lang==='ru'">
            <img src="../../assets/images/index_2_english.png" alt="" v-else>
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            <img src="../../assets/images/index_3_chinese.png" alt="" v-if="lang==='zh-CN'"
                 onclick="window.open('https://help.riostox.com/hc/zh-cn/articles/360042362651-Riostox%E7%9A%84%E6%94%B9%E7%89%88%E7%BD%91%E7%AB%99%E4%B8%8A%E7%BA%BF%E4%BA%86-')">
            <img src="../../assets/images/index_3_ra.png" alt="" v-else-if="lang==='ru'"
                 onclick="window.open('https://help.riostox.com/hc/ru/articles/360042362651-%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9-%D0%B2%D0%B5%D0%B1-%D1%81%D0%B0%D0%B9%D1%82-Riostox-%D0%B7%D0%B0%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D0%BB-')">
            <img src="../../assets/images/index_3_english.png" alt="" v-else
                 onclick="window.open('https://help.riostox.com/hc/en-us/articles/360042362651-Riostox-s-Revamped-Website-Goes-Live-')">
          </div>
          <div class="right"
               onclick="window.open('https://help.riostox.com/hc/en-us/articles/360034373632-Live-Now-Enhanced-AT-Privilege-Program')">
            <img src="../../assets/images/index_4_chinese.png" alt="" v-if="lang==='zh-CN'">
            <img src="../../assets/images/index_4_ra.png" alt="" v-else-if="lang==='ru'">
            <img src="../../assets/images/index_4_english.png" alt="" v-else>
          </div>
        </div>
      </div>
      <register-mobile class="register_inner" v-else></register-mobile>
    </div>
    <!--交易图表 -->
    <div class="head-exchange">
      <exchange
        key="common"
        type="common"
        :class="[hasSpecialExchange ? 'nopaddingtop' : '']"
      />
    </div>
    <div class="about-riostox-exchange">
      <div class="about-riostox-content">
        <h1>
          Create your own cryptocurrency portfolio with Riostox exchange
        </h1>
        <div class="riostox-feature">
          <div class="text-top">
            <!-- 1-->
            <div class="left-content">
              <img class="img" src="../../assets/images/exchange_4.png" alt="">
              <div class="content">
                <h1 class="context-title">High Flow</h1>
                <h1 class="context-text">Fast and efficient transactions and low rates</h1>
              </div>
            </div>

            <!-- 2-->
            <div class="left-content">
              <img class="img" src="../../assets/images/exchange_3.png" alt="">
              <div class="content">
                <h1 class="context-title">Reliability</h1>
                <h1 class="context-text">7X24 hours trading digital currencies</h1>
              </div>
            </div>
          </div>
          <div class="text-top">
            <!-- 3-->
            <div class="left-content">
              <img class="img" src="../../assets/images/exchange_2.png" alt="">
              <div class="content">
                <h1 class="context-title">Safety</h1>
                <h1 class="context-text">
                  Rich experience in digital asset financial services, and professional distributed structure.
                </h1>
              </div>
            </div>
            <!-- 4-->
            <div class="left-content">
              <img class="img" src="../../assets/images/exchange_1.png" alt="">
              <div class="content">
                <h1 class="context-title">Diversified Investment</h1>
                <h1 class="context-text">According to the user’s risk appetite, various investment targets including currency trading & OTC.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile-app">
      <!--      <img src="../../assets/images/riostox.jpg" alt="">-->
      <h1>Trading made easy</h1>
      <p>
        Riostox Exchange provides an easy platform for you to trade cryptocurrencies fast
      </p>
    </div>
    <!--交易流程-->
    <div class="riostox-feature1">
      <div class="text">
        <div class="icon-text">
          <img class="icon-image" src="../../assets/images/icon_logo_register.png">
          <h1>Register now</h1>
        </div>
        <div><img class="icon-line" src="../../assets/images/icon_line.png"></div>
        <div class="icon-text"><img class="icon-image" src="../../assets/images/icon_logo_kyc.png">
          <h1> KYC Verification </h1>
        </div>
        <div><img class="icon-line" src="../../assets/images/icon_line.png"></div>
        <div class="icon-text"><img class="icon-image" src="../../assets/images/icon_logo_trade.png">
        <h1>Deposit and start trading</h1></div>
      </div>
    </div>

    <!-- Featured in-->
    <div class="feature_in">
      <div class="top">
        <p>Featured in</p>
        <img class="img" src="../../assets/images/icon_fratured_in.png" alt="">
      </div>
    </div>
    <!-- -->
    <div class="contact-us">
      <div class="contact-us-content">
        <h1>Want to trade instantly?</h1>
        <p>Register your account with Riostox Exchange to start trading right away!</p>
      </div>
      <div>
        <div class="contact-us-search">
          <input placeholder="Your email address" v-model="email"></input>
          <div class="btn">
            <router-link :to="$i18nRoute({ name: 'signup' })" class="btn-text">Register
            </router-link>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

import Carousel from './carousel'
import Exchange from './exchange'
import Announce from './announce'
import Advantage from './advantage'
import AppDownload from './app-download'
import SpOuter from './sp-outer'
import RegisterMobile from '@/pages/login-register/register-mobile.vue'
// import api from '@/graphql'
// 邀请链接首页会带上?utm_source
import utmCookie from '@/mixins/utmCookie'

export default {
  async created() {
  },
  components: {
    Carousel,
    Exchange,
    Announce,
    Advantage,
    AppDownload,
    SpOuter,
    RegisterMobile,
  },
  data() {
    return {
      announce: process.env.NODE_ENV === 'production' ? window.gon.announce : {},
      banner: process.env.NODE_ENV === 'production' ? window.gon.banner : {},
    }
  },
  mixins: [utmCookie],
  computed: {
    ...mapGetters('viewport', ['type']),
    ...mapState('markets', ['oriMarkets']),
    ...mapGetters('currentUser', ['isLogin', 'isMiner']),
    lang() {
      let lang = ''
      if (this.$fifth.lang === 'zh-CN' || this.$fifth.lang === 'zh-TW') {
        lang = 'zh-CN'
      } else {
        lang = this.$fifth.lang
      }
      return lang
    },
    bannerList() {
      return this.banner[this.lang] ? this.banner[this.lang] : this.banner.en
    },
    announceList() {
      let option = false
      if (this.announce.option) {
        option = this.announce.option[this.lang]
        if (typeof option === 'undefined') {
          option = this.announce.option.en
        }
      }
      if (!option) {
        return []
      } else {
        return this.announce[this.lang] ? this.announce[this.lang] : this.announce.en
      }
    },
    hasSpecialExchange() {
      return !this.isLogin || (this.isLogin && !this.isMiner)
    },
  },
  methods: {
    ...mapMutations('viewport', ['changeTheme']),
    ...mapActions('markets', ['getMarkets']),
  },
  mounted() {
    this.changeTheme({ theme: 'dark', save: false })
  },
  beforeRouteLeave(to, from, next) {
    // 离开时切回亮色版
    this.changeTheme({ theme: 'light', save: false })
    next()
  },
}
</script>

<style lang="scss">
  body {
    min-width: auto;
  }
</style>

<style lang="scss" scoped>
  .index-wrap {
    background-color: #ffffff;
    margin: 0 auto;
    width: 100%;

    .contact-us {
      width: 100%;
      background: url('../../assets/images/bg_fund.png');
      margin: 30px auto;
      padding-bottom: 20px;
      display: flex;
      flex-flow: column;

      .contact-us-content {
        width: 100%;
        display: flex;
        flex-flow: column;

        h1 {
          font-size: 28px;
          font-family: Roboto-Medium;
          color: #ffffff;
          opacity: 1;
          margin-bottom: 10px;
          text-align: center;
          padding-top: 20px;
        }

        p {
          font-size: 16px;
          font-family: Roboto;
          font-weight: 400;
          color: #ffffff;
          opacity: 0.8;
          margin-top: 10px;
          margin-bottom: 20px;
          text-align: center;
        }
      }
      .contact-us-search {
        width: 90%;
        background: #ffffff;
        opacity: 1;
        border-radius: 4px;
        margin: 0 auto;
        position: relative;
        margin-bottom: 30px;
        top: 50%;

        input {
          outline-style: none;
          border: 1px solid #cccccc;
          border-radius: 3px;
          padding: 14px 14px;
          width: 100%;
          font-size: 20px;
          color: #929299;
        }

        p {
          font-size: 18px;
          font-family: Roboto;
          font-weight: 400;
          line-height: 52px;
          margin-left: 10px;
          color: #929299;
          opacity: 1;
        }

        .btn {
          width: 112px;
          height: 42px;
          background: #222222;
          opacity: 1;
          border-radius: 4px;
          margin: 0 auto;
          text-align: center;
          position: absolute;
          right: 10px;
          top: 5px;
          bottom: 5px;

          .btn-text {
            font-size: 18px;
            font-family: Roboto-Medium;
            color: #ffffff;
            opacity: 1;
            position: relative;
            top: 12px;
          }
        }
      }
    }
    .riostox-feature1 {
      display: flex;
      margin: 20px auto;
      .text {
        display: flex;
        margin: 0 auto;
      }

      .icon-text {
        width: auto;
        margin: 0 auto;
        text-align: center;

        h1 {
          font-size: 14px;
          font-family: Roboto-Medium;
          line-height: 24px;
          color: #292933;
          opacity: 1;
          text-align: center;
        }
      }
      .icon-image {
        width: 54px;
        height: 54px;
        margin: 0 auto;
      }

      .icon-line {
        width: 60px;
        height: 8px;
        margin-top: 20px;
      }
    }
    .feature_in {
      margin: 10px auto;
      width: 100%;
      display: flex;

      .top {
        margin: 10px auto;

        p {
          flex: 1;
          text-align: center;
          font-size: 28px;
          font-family: Roboto-Medium;
          color: #292933;
          opacity: 1;
          margin-bottom: 20px;
        }

        .img {
          flex: 1;
          width: 90%;
          height: auto;
          margin-left: 5%;
        }
      }
    }
    .head-exchange {
      position: relative;
      top: -20px;
    }
    .introduction-riostox {
      width: 100%;
      flex-flow: column;
      display: flex;

      .register {
        flex-flow: column;
        display: flex;
        margin-top: 20px;

        .top {
          display: flex;
          margin: 0 auto;
          width: 100%;
          .left {
            width: 50%;
            img {
              margin: 0 auto;
              width: 100%;
              height: auto;
            }
          }
          .right {
            width: 50%;
            position: relative;
            top: -20px;

            img {
              margin: 0 auto;
              width: 100%;
              height: auto;
            }
          }
        }
        .bottom {
          display: flex;
          margin: 0 auto;

          .left {
            flex: 1;
            width: 50%;
            cursor: pointer;

            img {
              margin: 0 auto;
              width: 100%;
              height: auto;
            }
          }
          .right {
            flex: 1;
            width: 50%;
            position: relative;
            top: -20px;

            img {
              margin: 0 auto;
              width: 100%;
              height: auto;
            }
          }
        }
      }

      .left {
        width: 100%;
        margin: 0 auto;
        color: white;
        background-image: url('../../assets/images/index_home_new.png');
        position: relative;
        top: -20px;

        h1 {
          text-align: center;
          font-size: 28px;
          padding-top: 30px;
        }

        h4 {
          font-size: 14px;
          margin-left: 20px;
          margin-right: 20px;
          margin-top: 20px;
        }

        .btns {
          margin: 15px auto;
          text-align: center;
          padding-bottom: 20px;
          padding-top: 20px;
        }

        .btn {
          display: inline-block;
          width: 120px;
          height: 35px;
          margin-left: 19px;
          margin-right: 19px;
          background: 0 0 no-repeat;
          background-size: 120px 35px;
        }

        .google {
          background-image: url('../../assets/images/index-download2.png');
        }

        .app-store {
          background-image: url('../../assets/images/index-download3.png');
        }

        .register_inner {
          display: block;
          width: 90%;
        }
      }
    }
    .about-riostox-exchange {
      margin: 0 auto;
      width: 100%;
      background-color: #fafafa;
      display: flex;
      padding-left: 20px;
      padding-right: 20px;
      position: relative;
      top: -20px;

      .about-riostox-content {
        width: 100%;
        margin: 0 auto;

        h1 {
          text-align: center;
          font-size: 28px;
        }

        .riostox-feature {
          margin: 0 auto;
          width: 100%;
          text-align: center;
          .text-top {
            width: 100%;
            margin-top: 20px;
            display: flex;

            .left-content {
              width: 50%;
              img {
                width: 71px;
                height: 64px;
                margin: 0 auto;
              }

              .content {
                display: flex;
                flex-flow: column;

                .context-title {
                  font-size: 16px;
                  color: #292933;
                  text-align: center;
                  position: relative;
                  top: -10px;
                }

                .context-text {
                  font-size: 12px;
                  color: #737380;
                  text-align: center;
                  position: relative;
                  padding-left: 2px;
                  top: -20px;
                }
              }
            }
          }
        }
      }
    }
    .mobile-app {
      margin: 0 auto;
      width: 100%;

      h1 {
        text-align: center;
        font-size: 28px;
      }

      p {
        font-size: 14px;
        margin: 10px 30px;
      }

      img {
        display: block;
        height: 50px;
        width: auto;
        margin: 10px auto;
      }
    }
    .content {
      display: flex;
      flex-wrap: wrap;

      div {
        height: auto;
        width: 50%;
        margin-bottom: 10px;
      }
    }
  }

</style>

