<template>
  <div class="bind-container">
    <div class="history-wrap">
      <v-history-header
        :level1="level1"
        :level2="level2"
      ></v-history-header>
      <step
        :current='currentStepNum'
        :array='stepArray'
      />
      <div class='step-text'>{{stepText}}</div>
      <component v-bind:is='currentView'></component>
    </div>
  </div>
</template>

<script>
import VBtn from '@/components/btn'
import VHistoryHeader from '@/components/history-header-plus'
import downloadApp from './downloadApp'
import copyKey from './copyKey'
import backupKey from './backupKey'
import googleEnabled from './googleEnabled'
import step from './step'
import isbind from '@/mixins/isbind'
import { mapActions } from 'vuex'
const stepNumList = ['downloadApp', 'copyKey', 'backupKey', 'googleEnabled']

export default {
  components: {
    VBtn,
    VHistoryHeader,
    downloadApp,
    copyKey,
    backupKey,
    googleEnabled,
    step,
  },
  mixins: [isbind],
  data() {
    return {
      level1: [],
      level2: '',
      type: this.$route.params.type,
      currentView: '',
      stepText: '',
      stepArray: [
        this.$t('m.bindPhone.downloadApp'),
        this.$t('m.bindPhone.copyKey'),
        this.$t('m.bindPhone.backupKey'),
        this.$t('m.bindPhone.googleEnabled'),
      ],
    }
  },
  created() {
    this.currentView = this.$route.params.step
    this.init()
  },

  computed: {
    currentStepNum() {
      return stepNumList.indexOf(this.currentView) + 1
    },
  },

  methods: {
    ...mapActions('settings', ['getGoogleKey']),
    init() {
      if (this.type === 'google') {
        this.getCurrentHistory(this.$route.params.step)
      }
    },
    getCurrentHistory(cv) {
      switch (cv) {
        case 'downloadApp':
          this.level1 = [
            {
              href: '/settings',
              name: this.$t('m.bindPhone.title'),
            },
          ]
          this.level2 = this.$t('m.bindPhone.downloadApp')
          this.stepText = this.$t('m.bindPhone.step1')
          break
        case 'copyKey':
          this.level1 = [
            {
              href: '/settings',
              name: this.$t('m.bindPhone.title'),
            },
            {
              name: this.$t('m.bindPhone.downloadApp'),
            },
          ]
          this.level2 = this.$t('m.bindPhone.copyKey')
          this.stepText = this.$t('m.bindPhone.step2')
          break
        case 'backupKey':
          this.level1 = [
            {
              href: '/settings',
              name: this.$t('m.bindPhone.title'),
            },
            {
              name: this.$t('m.bindPhone.copyKey'),
            },
          ]
          this.level2 = this.$t('m.bindPhone.backupKey')
          this.stepText = this.$t('m.bindPhone.step3')
          break
        case 'googleEnabled':
          this.level1 = [
            {
              href: '/settings',
              name: this.$t('m.bindPhone.title'),
            },
            {
              name: this.$t('m.bindPhone.backupKey'),
            },
          ]
          this.level2 = this.$t('m.bindPhone.googleEnabled')
          this.stepText = this.$t('m.bindPhone.step4')
          break
      }
    },
  },

  watch: {
    $route() {
      this.currentView = this.$route.params.step
      this.getCurrentHistory(this.currentView)
    },
  },
  mounted() {
    this.getGoogleKey()
  },
}
</script>

<style lang="scss" scoped>
.bind-container {
  .history-wrap {
    padding: 20px 35px;
    .step-text {
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      width: 540px;
      margin: 0 auto;
    }
  }
}
</style>
