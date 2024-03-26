<template>
  <div
    class="mobile-header-wrap"
    ref="header"
  >
    <div class="header-wrap">
      <div
        class="menu"
        @click="changeShow('left')"
      >
        <i
          class="iconfont icon-guanbi"
          @click.stop="closeShow"
          v-if="show === 'left'"
        ></i>
        <i
          class="iconfont icon-menu"
          v-else
        ></i>
      </div>
      <div class="logo">
        <template v-if="headerType==='system'">
          <a
            class="logo-text"
            href="/"
          >
            <!-- <i class="iconfont icon-Riostoxlogo"></i> -->
            <img width="100px" src="../../assets/images/riostox.png"/>
          </a>
        </template>
        <!-- <template v-if="headerType==='market'">
          <div class="text" @click="changeShow('center')">
            {{$t('m.menu.exchangeCenter')}}
            <i class="iconfont icon-xiala down"></i>
          </div>
        </template>-->
      </div>
      <div
        class="user"
        @click="changeShow('right')"
      >
        <i
          class="iconfont icon-guanbi"
          @click.stop="closeShow"
          v-if="show === 'right'"
        ></i>
        <i
          class="iconfont icon-yonghu1"
          v-else
        ></i>
      </div>
    </div>
    <div
      class="header-drop"
      @touchmove.prevent
      v-if="show !== ''"
    >
      <div
        class="list"
        @click="closeShow"
      >
        <template v-if="show === 'left'">
          <mobile-menu-item
            v-if="((menu.checkLogin && isLogin) || !menu.checkLogin)
              && ((menu.checkCn && $fifth.isCn) || !menu.checkCn)
            && ((menu.checkNotCn && !$fifth.isCn) || !menu.checkNotCn)"
            v-for="(menu,idx) in menuData.system"
            :menu="menu"
            :key="`left-${idx}`"
            :active="active"
            @changeActive="changeActive"
          />
        </template>
        <template v-if="show === 'center'">
          <mobile-menu-item
            v-if="((menu.checkLogin && isLogin) || !menu.checkLogin)
              && ((menu.checkCn && $fifth.isCn) || !menu.checkCn)
            && ((menu.checkNotCn && !$fifth.isCn) || !menu.checkNotCn)"
            v-for="(menu,idx) in centerMenuData"
            :menu="menu"
            :key="`center-${idx}`"
            :active="active"
            @changeActive="changeActive"
          />
          <div class="close">
            <i
              class="iconfont icon-guanbi"
              @click.stop="closeShow"
            ></i>
          </div>
        </template>
        <template v-if="show === 'right'">
          <mobile-menu-item
            v-if="((menu.checkLogin && isLogin) || !menu.checkLogin)
              && ((menu.checkCn && $fifth.isCn) || !menu.checkCn)
            && ((menu.checkNotCn && !$fifth.isCn) || !menu.checkNotCn)"
            v-for="(menu,idx) in menuData.right.common"
            :menu="menu"
            :key="`right-common-${idx}`"
            :active="active"
            @changeActive="changeActive"
          />
          <template v-if="isLogin">
            <mobile-menu-item
              v-if="((menu.checkLogin && isLogin) || !menu.checkLogin)
                && ((menu.checkCn && $fifth.isCn) || !menu.checkCn)
              && ((menu.checkNotCn && !$fifth.isCn) || !menu.checkNotCn)"
              v-for="(menu,idx) in menuData.right.logged.common"
              :menu="menu"
              :key="`right-common-logged-${idx}`"
              :active="active"
              @changeActive="changeActive"
            />
          </template>
          <template v-else>
            <div class="link">
              <router-link
                :to="$i18nRoute({ path: '/signin' })"
                class="header_menu_item"
              >{{$t('m.menu.login')}}</router-link>
            </div>
            <div class="link">
              <router-link
                :to="$i18nRoute({ path: signupHref })"
                class="header_menu_item"
              >{{$t('m.menu.join')}}</router-link>

            </div>
          </template>
          <div
            class="link"
            :class="active==='lang' ? 'active':''"
            @click.stop="changeActive('lang')"
          >
            <div class="title">
              {{lang.name}}
              <span class="show">+</span>
            </div>
            <ul>
              <li
                @click.stop="changeLang(item)"
                v-for="(item,idx) in lang.list"
                :key="idx"
              >
                <i
                  v-if="$fifth.lang === item.value"
                  class="iconfont icon-gou"
                ></i>
                {{item.name}}
              </li>
            </ul>
          </div>
          <div
            class="link"
            :class="active==='coin' ? 'active':''"
            @click.stop="changeActive('coin')"
          >
            <div class="title">
              {{symbol.currency | upperCase}}
              <span class="show">+</span>
            </div>
            <ul>
              <li
                @click.stop="selectSymbol(item)"
                v-for="(item,idx) in coinList"
                :key="idx"
              >
                <i
                  v-if="symbol.currency === item.currency"
                  class="iconfont icon-gou"
                ></i>
                {{item.currency | upperCase}}
              </li>
            </ul>
          </div>
          <template v-if="isLogin">
            <div class="link">
              <a @click.stop="loginout">{{$t('m.personalMenu.logout')}}</a>
              <span class="email">{{userEmail}}</span>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import find from 'lodash/find'
import Lang, { languages, langKeyValueMap } from '@/utils/lang-utils'
import Cookies from '@/utils/cookies'
import MobileMenuItem from './mobile-menu-item'

export default {
  props: {
    menuData: Object,
    headerType: {
      type: String,
      default: 'common',
      validator: function(value) {
        // 头部导航类型，系统层 | 复合层
        return ['system', 'market', 'option'].indexOf(value) !== -1
      },
    },
  },
  components: {
    MobileMenuItem,
  },
  data() {
    return {
      systemShow: false,
      userShow: false,
      key: '',
      coinList: [
        { symbol: '$ USD', local: 'en', currency: 'usd' },
        { symbol: '￥ CNY', local: 'zh-CN', currency: 'cny' },
        { symbol: '₩ KRW ', local: 'ko', currency: 'krw' },
        { symbol: '₽ RUB', local: 'ru', currency: 'rub' },
        { symbol: '€ EUR', local: 'it', currency: 'eur' },
        { symbol: '£ GBP', local: '', currency: 'gbp' },
      ],
      symbol: '',
      show: '',
      active: '',
    }
  },
  computed: {
    ...mapGetters('currentUser', ['isLogin']),
    ...mapState('currentUser', ['currentUser']),
    centerMenuData() {
      return this.menuData[this.headerType]
    },
    lang() {
      return {
        name: languages[this.$fifth.lang],
        list: langKeyValueMap,
      }
    },
    userEmail() {
      if (this.currentUser.email.length > 18) {
        let email = this.currentUser.email
        let emailArr = email.split('@')
        let emailArrLeft = emailArr[0]
        return emailArrLeft.slice(0, 5) + '...@' + emailArr[1]
      } else {
        return this.currentUser.email
      }
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
  },
  methods: {
    ...mapActions('loginRegister', ['signout']),
    ...mapMutations('viewport', ['setHeaderHeight']),
    changeShow(name) {
      this.show = name
    },
    closeShow() {
      this.show = ''
    },
    changeActive(name) {
      if (this.active === name) {
        this.active = ''
      } else {
        this.active = name
      }
    },
    changeLang(v) {
      const lang = v.value
      const url = window.location.pathname.replace(window.location.pathname.split('/')[1], lang)
      window.location.href = url
    },
    loginout() {
      sessionStorage.setItem('showAuth', '')
      this.signout()
    },
    init(arr = []) {
      let res = ''
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].local === Lang.lang) {
          res = arr[i]
          break
        }
      }
      return res
    },
    initSymbol() {
      const currentOtc = localStorage.getItem('currentOtc')
      if (currentOtc) {
        return find(this.coinList, {
          currency: currentOtc,
        })
      } else {
        return ''
      }
    },
    selectSymbol(val) {
      this.symbol = val
      const currentOtc = this.symbol['currency']
      localStorage.setItem('currentOtc', currentOtc)
      window.location.reload()
    },
  },
  created() {
    this.symbol = this.initSymbol() || this.init(this.coinList)
  },
  mounted() {
    this.setHeaderHeight(this.$refs.header.clientHeight)
  },
}
</script>

<style lang="scss" scoped>
.mobile-header-wrap {
  .header-wrap {
    height: 40px;
    background-color: #000000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    cursor: pointer;
    position: relative;
    z-index: $zindex-fixed;
    i {
      color: #ffffff;
      font-size: 16px;
    }
    .text {
      color: #ffffff;
      font-size: 16px;
      font-family: euBold;
    }
  }
  .header-drop {
    position: fixed;
    top: 40px;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: $zindex-modal;
    background-color: #000000;
    padding: 0 30px;
    .list {
      .link {
        font-size: 14px;
        min-height: 40px;
        line-height: 40px;
        color: #ffffff;
        border-bottom: 1px solid #666666;
        cursor: pointer;
        position: relative;
        .title {
          display: flex;
          justify-content: space-between;
          .show {
            font-size: 20px;
          }
        }
        .icon-gou {
          font-size: 12px;
          position: absolute;
          left: 0;
        }
        .email {
          font-size: 12px;
          color: rgba($color: #ffffff, $alpha: 0.5);
          margin-left: 20px;
        }
        a {
          color: #ffffff;
          display: inline-block;
          height: 100%;
          widows: 100%;
        }
        ul {
          margin-left: 18px;
          margin-bottom: 5px;
          display: none;
          li {
            height: 30px;
            line-height: 30px;
            a {
              color: rgba($color: #ffffff, $alpha: 0.7);
            }
          }
        }
      }
      .link.active {
        .title {
          .show {
            transform: rotate(45deg);
            transition: 0.3s;
          }
        }
        ul {
          display: block;
        }
      }
      .close {
        height: 40px;
        width: 40px;
        margin: 30px auto;
        border-radius: 50%;
        border: 1px solid rgba($color: #ffffff, $alpha: 0.5);
        text-align: center;
        i {
          color: #ffffff;
          line-height: 40px;
        }
      }
    }
  }
}
</style>

