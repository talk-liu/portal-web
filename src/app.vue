<template>
  <div :class="['root', pageConfig.name, themeClass]">
    <v-header :page="this.$route.name" :showNavBack="showNavbarBack"></v-header>
    <main class="main">
      <router-view></router-view>
    </main>
    <v-footer :show="pageConfig.show"></v-footer>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
import config from '@/config'
import VHeader from '@/components/header'
import VFooter from '@/components/footer'
export default {
  components: {
    VHeader,
    VFooter,
  },
  data() {
    return {
      showBackList: ['currency', 'records', 'profit', 'mining', 'withdraw', 'recharge', 'withdrawCurrency', 'rechargeCurrency', 'withdrawAddress', 'withdrawVerify', 'signin', 'game-reward-history', 'game']
    }
  },
  methods: {
    ...mapMutations('viewport', ['resizeView']),
  },
  computed: {
    ...mapGetters('viewport', ['type']),
    ...mapGetters('viewport', ['themeClass']),
    showNavbarBack() {
      const name = this.$route.name
      return (this.showBackList.includes(name) && this.type === 'h5')
    },
    pageConfig() {
      const list = config.noList
      let name = ''
      let show = true
      for (let i = 0, len = list.length; i < len; i++) {
        const item = list[i]
        const page = item.split('_')[0]
        const type = item.split('_')[1]
        if (this.$route.name) {
          name = this.$route.name
          if (this.$route.name === page) {
            if (type) {
              if (this.type === type) {
                show = false
                break
              }
            } else {
              show = false
              break
            }
          }
        } else {
          const reg = new RegExp(page)
          if (reg.test(location.pathname)) {
            name = page
            show = false
            break
          }
        }
      }
      return { name, show }
    },
  },
  mounted() {
    this.resizeView({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener(
      'resize',
      debounce(() => {
        this.resizeView({ width: window.innerWidth, height: window.innerHeight })
      }, 500),
    )
    document.body.classList.add(this.themeClass)
  },
}
</script>

<style lang="scss">
.index {
  position: relative;
  .v-header {
    .header-wrap {
      .order-drop-list {
        display: none;
      }
    }
    .settings-cl_wrap {
      .dialog-wrap {
        .box-wrap {
          background-color: #ffffff;
        }
        .title {
          border-color: #d8d8d8;
          color: #333333;
        }
        .th5-region-select .th5-input input {
          background-color: #ffffff;
          border-color: #999999;
        }
        .th5-region-select .th5-select-items-wrap {
          background-color: #ffffff;
        }
        .th5-region-select .th5-input {
          background-color: #ffffff;
        }
        .item {
          label {
            color: #999999;
          }
        }
        .th5-select-item {
          color: #666666;
          &:hover {
            background-color: #07e9b2;
          }
        }
        .btn-wrap {
          .cancel {
            background-color: #f3f4f6;
            color: #333333;
          }
          .confirm {
            background-color: #f3f4f6;
            color: #333333;
            &:hover {
              background-color: #07e9b2;
              color: #002060;
            }
          }
        }
      }
    }
  }
}

.market {
  .main {
    overflow: hidden;
  }
}
</style>


<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  .main {
    flex: 1;
    margin-top: 86px;
  }
}
</style>
