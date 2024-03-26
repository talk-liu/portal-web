<template>
  <div class="at-mining-wrap">
    <!-- <div :class="['mining-tabs', curTab]">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        :class="[{current: curTab === tab.key}]"
        @click="changeTab(tab.key)"
      >
        <i :class="['iconfont', tab.icon]"></i>
        {{tab.name}}
      </div>
    </div> -->
    <component :is="currentView"></component>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AtEquity from './at-equity'
import AtMining from './at-mining'
import AtToken from './at-token'

export default {
  components: {
    AtEquity,
    AtMining,
    AtToken,
  },
  data() {
    return {
      currentView: 'AtEquity',
      curTab: 'equity',
    }
  },
  computed: {
    ...mapGetters('viewport', ['type']),
    // tabs() {
    //   return [
    //     {
    //       name: this.$t('m.index.overview'),
    //       icon: this.curTab === 'token' ? 'icon-zonglan-liulanzhuangtai' : 'icon-zonglan-zhengchangzhuangtai',
    //       key: 'token',
    //     },
    //     {
    //       name: this.$t('m.index.atRewards'),
    //       icon: this.curTab === 'equity' ? 'icon-ATjiangli-liulanzhuangtai' : 'icon-ATjiangli-zhengchangzhuangtai',
    //       key: 'equity',
    //     },
    //     {
    //       name: this.$t('m.index.atTom'),
    //       icon: this.curTab === 'at-mining' ? 'icon-ATwakuang-liulanzhuangtai' : 'icon-ATwakuang-zhengchangzhuangtai',
    //       key: 'at-mining',
    //     },
    //   ]
    // },
  },
  // watch: {
  // curTab(val) {
  //   this.currentView =
  //     {
  //       token: 'AtToken',
  //       equity: 'AtEquity',
  //       'at-mining': 'AtMining',
  //     }[val] || 'AtToken'
  // },
  // },
  methods: {
    ...mapActions(['getAtMiningData']),
    ...mapActions('otc', ['getOptionOtc']),
    // changeTab(tab) {
    //   const list = ['token', 'equity', 'at-mining']
    //   if (list.includes(tab)) {
    //     this.curTab = tab
    //     this.$router.push({ path: 'at-mining', query: { tab: tab } })
    //   } else {
    //     this.curTab = 'token'
    //     this.$router.push({ path: 'at-mining', query: { tab: 'token' } })
    //   }
    // },
  },
  mounted() {
    // this.changeTab(this.$route.query.tab)
    this.getOptionOtc()
    this.getAtMiningData()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.type === 'h5') {
        document.body.style.minWidth = '1350px'
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    document.body.style.minWidth = 'auto'
    next()
  },
}
</script>

<style lang="scss" scoped>
.at-mining-wrap {
  position: relative;
  .mining-tabs {
    display: flex;
    position: absolute;
    left: 126px;
    top: 20px;
    z-index: $zindex-sticky;
    font-size: 14px;
    line-height: 28px;
    color: rgba($color: #ffffff, $alpha: 0.6);
    div {
      cursor: pointer;
      margin-right: 50px;
      display: flex;
      i {
        font-size: 28px;
        margin-right: 10px;
      }
    }
    .current {
      color: #ffffff;
    }
  }
  .mining-tabs.token {
    color: #777777;
    .current {
      color: #111111;
    }
  }
}
</style>
