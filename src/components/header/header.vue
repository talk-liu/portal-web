<template>
  <div ref="header">
    <header :class="['v-header', isFixed ? 'fixed' : '']">
      <div class="dynamicMarket">
        <label>Latest Market Data</label>
        <div class="dynamicMarketBox">
          <vue-seamless-scroll :data="listData"
                               :class-option="optionLeft">
            <div>
              <h3 v-for="(item, key) in listData"
                  :key="key">
                {{ item.name }} {{ item.symbol }}
                <span>{{ item.last }} ({{ item.changePercent }}%)</span>
              </h3>
            </div>
          </vue-seamless-scroll>
        </div>
      </div>
      <div class="navigationWrapper"
           :style="{ background: isIndex && !isFixed ? 'transparent' : '#002060' }">
        <div class="header-wrap">
          <div class="left">
            <router-link class="logo-text"
                         :to="$i18nRoute({ path: '/' })">
              <img src="../../assets/images/riostox.png"
                   height="50px" />
            </router-link>
            <a class="beta"
               href="javascript:;">Beta</a>
            <!-- <router-link class="beta"
                         :to="$i18nRoute({ path: '/markets/btcusdt' })">Beta</router-link> -->
            <header-menu-item v-if="headerType !== 'system'"
                              :class="['systemicon', hoverMenuName === 'system' ? 'active' : ' ']"
                              :menu="{ name: 'system', icon: 'icon-daohang', hideName: true, menu: systemMenus }">
              <div class="dropmenu"
                   v-if="systemMenus">
                <header-menu-item v-for="(submenu, idx) in systemMenus"
                                  v-if="
                                    ((submenu.checkLogin && isLogin) || !submenu.checkLogin) &&
                                      ((submenu.checkCn && $fifth.isCn) || !submenu.checkCn) &&
                                      ((submenu.checkNotCn && !$fifth.isCn) || !submenu.checkNotCn)
                                  "
                                  :class="[hoverMenuName === submenu.name ? 'active' : '']"
                                  :menu="submenu"
                                  :key="idx" />
              </div>
            </header-menu-item>
            <template v-for="(menu, idx) in menuData[headerType]">
              <header-menu-item v-if="
                                  ((menu.checkLogin && isLogin) || !menu.checkLogin) &&
                                    ((menu.checkCn && $fifth.isCn) || !menu.checkCn) &&
                                    ((menu.checkNotCn && !$fifth.isCn) || !menu.checkNotCn)
                                "
                                :class="[hoverMenuName === menu.name ? 'active' : ' ']"
                                :menu="menu"
                                :key="`left-${idx}`">
                <div class="dropmenu"
                     v-if="menu.menu">
                  <header-menu-item v-for="(submenu, idx) in menu.menu"
                                    v-if="
                                      ((submenu.checkLogin && isLogin) || !submenu.checkLogin) &&
                                        ((submenu.checkCn && $fifth.isCn) || !submenu.checkCn) &&
                                        ((submenu.checkNotCn && !$fifth.isCn) || !submenu.checkNotCn)
                                    "
                                    :class="[hoverMenuName === submenu.name ? 'active' : '']"
                                    :menu="submenu"
                                    :key="`left-dropmenu-${idx}`" />
                </div>
              </header-menu-item>
            </template>

            <router-link class="menu-item"
                         :to="$i18nRoute({ path: '/markets-list' })">
              Market Centre
            </router-link>
            <router-link class="menu-item"
                         :to="$i18nRoute({ path: '/products' })">
              Products
            </router-link>
            <!-- <router-link class="menu-item"
                         :to="$i18nRoute({ path: '/news' })">
              News
            </router-link> -->
            <router-link class="menu-item"
                         :to="$i18nRoute({ path: '/about' })">
              About
            </router-link>

            <!-- <template v-for="(menu, idx) in menuData.newsCenter.menu">
              <header-menu-item v-show="headerType === 'system'" :menu="menu" :key="`left-${idx}`">
                <div class="dropmenu" v-if="menu.menu">
                  <header-menu-item
                    v-for="(submenu, idx) in menu.menu"
                    v-if="
                      ((submenu.checkLogin && isLogin) || !submenu.checkLogin) &&
                      ((submenu.checkCn && $fifth.isCn) || !submenu.checkCn) &&
                      ((submenu.checkNotCn && !$fifth.isCn) || !submenu.checkNotCn)
                    "
                    :class="[hoverMenuName === submenu.name ? 'active' : '']"
                    :menu="submenu"
                    :key="`left-dropmenu-${idx}`"
                  />
                </div>
              </header-menu-item>
            </template> -->
            <!-- <template v-for="(menu, idx) in menuData.aboutCenter.menu">
              <header-menu-item v-show="headerType === 'system'" :menu="menu" :key="`left-${idx}`">
                <div class="dropmenu" v-if="menu.menu">
                  <header-menu-item
                    v-for="(submenu, idx) in menu.menu"
                    v-if="
                      ((submenu.checkLogin && isLogin) || !submenu.checkLogin) &&
                      ((submenu.checkCn && $fifth.isCn) || !submenu.checkCn) &&
                      ((submenu.checkNotCn && !$fifth.isCn) || !submenu.checkNotCn)
                    "
                    :class="[hoverMenuName === submenu.name ? 'active' : '']"
                    :menu="submenu"
                    :key="`left-dropmenu-${idx}`"
                  />
                </div>
              </header-menu-item>
            </template> -->
          </div>
          <div class="right">
            <template v-for="(menu, idx) in menuData.right.common">
              <header-menu-item v-if="
                                  ((menu.checkLogin && isLogin) || !menu.checkLogin) &&
                                    ((menu.checkCn && $fifth.isCn) || !menu.checkCn) &&
                                    ((menu.checkNotCn && !$fifth.isCn) || !menu.checkNotCn)
                                "
                                :class="[hoverMenuName === menu.name ? 'active' : ' ']"
                                :menu="menu"
                                :key="`right-common-${idx}`">
                <div class="dropmenu"
                     v-if="menu.menu">
                  <header-menu-item v-for="(submenu, idx) in menu.menu"
                                    v-if="
                                      ((submenu.checkLogin && isLogin) || !submenu.checkLogin) &&
                                        ((submenu.checkCn && $fifth.isCn) || !submenu.checkCn) &&
                                        ((submenu.checkNotCn && !$fifth.isCn) || !submenu.checkNotCn)
                                    "
                                    :class="[hoverMenuName === submenu.name ? 'active' : '']"
                                    :menu="submenu"
                                    :key="`right-common-dropmenu-${idx}`" />
                </div>
              </header-menu-item>
            </template>
            <template v-if="isLogin">
              <template v-for="(menu, idx) in menuData.right.logged[headerType]">
                <header-menu-item v-if="
                                    ((menu.checkLogin && isLogin) || !menu.checkLogin) &&
                                      ((menu.checkCn && $fifth.isCn) || !menu.checkCn) &&
                                      ((menu.checkNotCn && !$fifth.isCn) || !menu.checkNotCn)
                                  "
                                  :class="[hoverMenuName === menu.name ? 'active' : ' ']"
                                  :menu="menu"
                                  :key="`right-logged-${headerType}-${idx}`">
                  <div class="dropmenu"
                       v-if="menu.menu">
                    <header-menu-item v-for="(submenu, idx) in menu.menu"
                                      v-if="
                                        ((submenu.checkLogin && isLogin) || !submenu.checkLogin) &&
                                          ((submenu.checkCn && $fifth.isCn) || !submenu.checkCn) &&
                                          ((submenu.checkNotCn && !$fifth.isCn) || !submenu.checkNotCn)
                                      "
                                      :class="[hoverMenuName === submenu.name ? 'active' : '']"
                                      :menu="submenu"
                                      :key="`right-logged-${headerType}-dropmenu-${idx}`" />
                  </div>
                </header-menu-item>
              </template>
              <template v-for="(menu, idx) in menuData.right.logged.common">
                <header-menu-item v-if="
                                    ((menu.checkLogin && isLogin) || !menu.checkLogin) &&
                                      ((menu.checkCn && $fifth.isCn) || !menu.checkCn) &&
                                      ((menu.checkNotCn && !$fifth.isCn) || !menu.checkNotCn)
                                  "
                                  :class="[hoverMenuName === menu.name ? 'active' : ' ']"
                                  :menu="menu"
                                  :key="`right-logged-common-${idx}`">
                  <div class="dropmenu"
                       v-if="menu.menu">
                    <header-menu-item v-if="menu.key === 'account'"
                                      :class="['email-account', hoverMenuName === currentUser.email ? 'active' : '']"
                                      :menu="{ name: currentUser.email, url: '/settings', icon: isMiner ? 'icon-kuanggong' : '' }"
                                      :key="`right-logged-common-dropmenu-${currentUser.email}`" />
                    <header-menu-item v-for="(submenu, idx) in menu.menu"
                                      v-if="
                                        ((submenu.checkLogin && isLogin) || !submenu.checkLogin) &&
                                          ((submenu.checkCn && $fifth.isCn) || !submenu.checkCn) &&
                                          ((submenu.checkNotCn && !$fifth.isCn) || !submenu.checkNotCn)
                                      "
                                      :class="[hoverMenuName === submenu.name ? 'active' : '']"
                                      :menu="submenu"
                                      :key="`right-logged-common-dropmenu-${idx}`" />
                  </div>
                </header-menu-item>
              </template>
            </template>
            <template v-else>
              <router-link :to="$i18nRoute({ path: '/signin' })"
                           class="menu-item">Login</router-link>
              <router-link :to="$i18nRoute({ path: signupHref })"
                           class="menu-item">Sign up</router-link>
            </template>
            <v-scl class="settings"></v-scl>
          </div>
        </div>
      </div>
    </header>
    <div style="height: 54px"
         v-show="isFixed"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapState, mapMutations } from 'vuex'
import Cookies from '@/utils/cookies'
import axios from 'axios'
import scroll from 'vue-seamless-scroll'

import { Menu, Submenu, MenuItem } from 'element-ui'
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(scroll)

import VScl from '@/components/settings-cl/index'
import HeaderMenuItem from './header-menu-item'
import { throttle } from 'echarts/lib/export'

export default {
  props: {
    menuData: Object,
    headerType: {
      type: String,
      default: 'common',
      validator: function (value) {
        // 头部导航类型，系统层 | 复合层
        return ['system', 'market', 'option'].indexOf(value) !== -1
      },
    },
  },
  data() {
    return {
      hoverMenuName: '',
      isFixed: true,
      coingeckoList: [],
    }
  },
  components: {
    VScl,
    HeaderMenuItem,
  },
  computed: {
    ...mapGetters('currentUser', ['isLogin', 'isMiner']),
    ...mapState('viewport', ['width']),
    ...mapState('currentUser', ['currentUser']),
    ...mapGetters('tickers', ['filterList', 'maxFee', 'minFee']),
    listData() {
      const attr = []
      const usdtList = this.filterList('usdt')
      const usdList = this.filterList('usd')
      for (let i in usdtList) {
        for (let j in usdtList[i]) {
          attr.push(usdtList[i][j])
        }
      }
      for (let i in usdList) {
        for (let j in usdList[i]) {
          attr.push(usdList[i][j])
        }
      }
      return attr
    },

    optionLeft() {
      return {
        direction: 2,
        limitMoveNum: 2,
      }
    },
    systemMenus() {
      return [
        {
          name: 'Home',
          icon: 'icon-Home',
          url: '/',
        },
        ...this.menuData.system,
      ]
    },
    signupHref() {
      let signup = '/signup'
      let aff = localStorage.getItem('aff')
      let utmSource = Cookies.getCookie('utm_source')
      if (aff && utmSource) {
        signup += `?aff=${aff}&utm_source=${utmSource}`
        return signup
      }
      if (aff) {
        signup += `?aff=${aff}`
        return signup
      }
      if (utmSource) {
        signup += `?utm_source=${utmSource}`
        return signup
      }
      return signup
    },
    // 是否是首页
    isIndex() {
      // const flag = this.$route.name === 'index'
      // this.isFixed = !flag
      // if (flag) {
      //   window.addEventListener('scroll', this.handleFixStatus, true)
      // } else {
      //   window.removeEventListener('scroll', this.handleFixStatus, true)
      // }
      return false
    },
  },
  methods: {
    ...mapMutations('viewport', ['setHeaderHeight']),
    handleFixStatus: throttle(function () {
      const rootEle = document.querySelector('.root')
      const carousel = document.querySelector('#carousel')
      if (!rootEle || !carousel || !this.isIndex) return
      const { top } = rootEle.getBoundingClientRect()
      this.isFixed = Math.abs(top) > carousel.clientHeight
    }, 100),
    menuEve() {
      this.$refs.menuRef.style.display = 'none'
    },
    menusEve() {
      this.$refs.menuRef.style.display = 'block'
    },
  },
  mounted() {
    this.setHeaderHeight(this.$refs.header.clientHeight)

    const coingecko = {
      vs_currency: 'usd',
      page: 1,
      per_page: 100,
      sparkline: false,
      order: 'market_cap_desc',
      ids: '',
    }
    const _this = this
    axios.get('https://api.coingecko.com/api/v3/coins/markets/', { params: coingecko }).then((res) => {
      const data = res.data.splice(0, 100)
      _this.coingeckoList = data
    })
  },
}
</script>

<style lang="scss">
.el-menu--horizontal {
  a {
    color: #909399;
  }
  a:hover {
    color: #303133;
  }
  width: 600px;
  ul {
    padding: 20px 30px;
    li {
      margin-bottom: 20px;
    }
    .el-menu-item {
      font-size: 18px;
    }
  }
  h2 {
    color: #001f60;
    font-size: 36px;
    border-bottom: 1px solid #001f60;
    padding-bottom: 12px;
    margin-bottom: 8px;
  }
}

.v-header {
  width: 100%;
  z-index: $zindex-fixed;
  position: relative;
  &.fixed {
    position: fixed;
    top: 0;
    animation: fade 0.3s ease;
  }

  @keyframes fade {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }
  .dynamicMarket {
    padding: 12px 0px;
    background-color: #fff;
    padding-bottom: 23px;
    label {
      font-size: 16px;
      font-weight: 500;
      color: #002060;
      display: inline-block;
      background: #07e9b2;
      float: left;
      width: 197px;
      text-align: center;
      margin-left: 67px;
      margin-right: 35px;
      border-radius: 4px;
      height: 32px;
      line-height: 32px;
    }
    .dynamicMarketBox {
      overflow: hidden;
      margin-top: 5px;
      height: 20px;
      // @keyframes rowup {
      //   0% {
      //     transform: translate3d(0, 0, 0);
      //   }
      //   100% {
      //     transform: translate3d(-300px, 0, 0);
      //   }
      // }
      > div {
        height: 20px;
        // width: 1000000px;
        // animation: 8s rowup linear infinite normal;
        // width: initial;
        position: relative;
        overflow: hidden;
      }
    }
    h3 {
      color: #555555;
      font-size: 18px;
      float: left;
      margin-right: 50px;

      span {
        color: #07e9b2;
        font-size: 16px;
      }
    }
  }
  .navigationWrapper {
    height: 80px;
    padding: 0 30px;
  }

  .header-wrap {
    max-width: 1440px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto !important;
    .beta {
      color: #07e9b2;
      font-size: 14px;
      margin-top: -30px;
    }
    .logo-text {
      display: inline-block;
      font-size: 20px;
      margin-right: 20px;
      cursor: pointer;
      color: #ffffff;
      .icon-Riostoxlogo,
      .icon-logo {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .left {
      img {
        transition: all 0.6s;
      }
      img:hover {
        transform: scale(1.2);
      }
      .el-menu,
      .el-menu--horizontal,
      .el-submenu .el-submenu__title:hover {
        background-color: unset;
      }
      .el-submenu .el-submenu__title {
        color: #fff;
        font-size: 20px;
      }
      .el-menu.el-menu--horizontal {
        border: none;
      }
      .el-submenu.is-active .el-submenu__title {
        border: none;
      }
    }
    .left,
    .right {
      display: flex;
      align-items: center;
      font-size: 14px;
      .menu-item {
        position: relative;
        display: inline-block;
        padding: 0 20px;
        height: 54px;
        line-height: 54px;
        font-weight: 400;
        cursor: pointer;
        color: #ffffff;
        font-size: 20px;
        .dropmenu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          display: none;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 3px;
          box-shadow: 0 3px 2px rgba(0, 0, 0, 0.03);
          font-family: $font-family-base;
          &:before {
            position: absolute;
            content: '';
            top: -17px;
            left: 50%;
            transform: translateX(-50%);
            border-width: 8px;
            border-style: solid;
            border-color: transparent transparent rgba(0, 0, 0, 0.1);
          }
          &:after {
            position: absolute;
            content: '';
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            border-width: 6px;
            border-style: solid;
            border-color: transparent transparent #ffffff;
          }
          .menu-item {
            display: block;
            color: #888888;
            white-space: nowrap;
            padding: 12px 20px;
            height: initial;
            line-height: initial;
            &:hover {
              //background: #ffd200;
              color: #131313;
            }
          }
          .email-account {
            .iconfont {
              margin-right: 0;
              font-size: 12px;
            }

            border-bottom: 1px solid #efefef;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 152px;
          }
        }
        &.iconfont {
          font-size: 20px;
          padding-top: 3px;
        }
        &.active,
        &:hover {
          color: rgba(#ffffff, 0.5);
          .dropmenu {
            display: block;
            i {
              display: inline-block;
              margin-right: 9px;
            }
          }
        }
        i {
          display: none;
        }
      }

      @include screen-sm-new {
        .menu-item {
          padding: 0 10px;
        }
      }
      .systemicon {
        color: #ffd200;
        &.active,
        &:hover {
          color: rgba(#ffd200, 0.5);
        }
      }
    }
  }
}
</style>
