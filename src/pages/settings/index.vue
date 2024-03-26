<template>
  <div
    v-if="type !== 'h5'"
    class="profile-page"
  >
    <!-- 期权因政策风险-->
    <!-- <a
      class='top-banner'
      href="/at_invitation/event"
      target="_blank"
    >
      <img
        :src="$fifth.isCn?'https://i.riostox.com/i/ad/ad7f53b048fd447892c1001f56c5f38b.png':'https://i.riostox.com/i/40/4054afddab4f28bcab0b0181545238d6.png'"
        alt=""
      >
    </a> -->
    <div class="content-section">
      <div class="u-tabs tabs">
        <div
          v-for="tab in menuList"
          :key="tab.name"
          :class="['u-tab-button', {current: activeMenu === tab.name}]"
          @click="changeMenu(tab.name)"
        >{{tab.label}}</div>
      </div>
      <router-view />
    </div>
  </div>
  <settings-mobile v-else />
</template>

<script>
// DONE
import { mapState, mapActions, mapGetters } from 'vuex'
import settingsMobile from './settings-mobile'

export default {
  components: {
    settingsMobile,
  },

  data() {
    return {
      activeMenu: '',
    }
  },

  computed: {
    ...mapState('currentUser', ['currentUser']),
    ...mapGetters('viewport', ['type']),
    menuList() {
      let list = [
        {
          label: this.$t('m.personalMenu.personalInfo'),
          name: 'Setting',
        },
        {
          label: this.$t('m.personalMenu.identityAuth'),
          name: 'IsKyc',
        },
        {
          label: 'Member bank account',
          name: 'Member',
        },
      ]
      if (this.currentUser && this.currentUser.api_token_tasted) {
        list = list.concat({
          label: this.$t('m.personalMenu.apiAdmin'),
          name: 'Api',
        })
      }
      return list
    },
    showInvitation() {
      return this.$route.name !== 'IsKyc'
    },
  },

  mounted() {
    document.title = this.$t('m.pageTitle.settings')
    this.initActive()
    this.getWithdrawMe()
  },

  watch: {
    $route() {
      this.initActive()
    },
  },

  methods: {
    ...mapActions('withdraw', ['getWithdrawMe']),
    changeMenu(name) {
      this.activeMenu = name
      this.$router.push(this.$i18nRoute({
        name,
      }))
    },
    initActive() {
      const name = this.$route.name
      if (name === 'Setting' || name === 'IsKyc' || name === 'Api' || name === 'Member') {
        this.activeMenu = this.$route.name
      } else {
        this.activeMenu = 'Setting'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.profile-page {
  min-height: 500px;
  .top-banner {
    img {
      width: 1200px;
      margin: 0 auto;
      display: block;
      margin-top: 20px;
    }
  }
  .content-section {
    width: 1120px;
    margin: 0 auto;
    .content_menu {
      position: relative;
      border-bottom: 1px solid $color-line;
      .invitation {
        position: absolute;
        font-size: 14px;
        color: #97a5b3;
        font-weight: 500;
        right: 0;
        top: 10px;
        i {
          display: inline-block;
          margin-right: 5px;
          font-size: 14px;
        }
      }
    }
  }
  .u-tabs {
    padding-bottom: 10px;
    border-bottom: 1px solid #eaedf5;
  }
}
</style>
