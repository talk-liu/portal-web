<template>
  <div class="identity-page">
    <keep-alive include="company">
      <component :is="currentView"></component>
    </keep-alive>
    <VDialog2 v-if="!isKYC">
    </VDialog2>
  </div>
</template>
<script>

import VBtn from '@/components/btn'
import Region from './region-select' // 选择国家地区
import Upload from './upload' // 身份证基本信息上传
import ProfileRes from './profile-res' // 个人认证结果
import { mapGetters, mapState } from 'vuex'
import VDialog2 from '@/components/kyc-dialog2'

export default {
  components: {
    VBtn,
    Region,
    Upload,
    ProfileRes,
    VDialog2
  },
  data() {
    return {
      region: '', // 选择的地区
      regionCode: '', // 地区code，kyc电话号码用
      currentView: '',
    }
  },
  computed: {
    ...mapState('currentUser', ['currentUser']),
    ...mapGetters('currentUser', ['isLogin'], ['isKYC']),
    success() {
      return this.currentUser && this.currentUser.id_document_state === 'verified' ? true : false
    }
  },
  mounted() {
    this.currentView = this.initCurrentView()
    // this.currentView = 'Upload'
  },
  methods: {
    initCurrentView() {
      const state = this.currentUser && this.currentUser.id_document_state
      if (state === 'verified') {
        return 'ProfileRes'
      } else if (state === 'unverified') {
        return 'Region'
      } else {
        return 'ProfileRes'
      }
    },
  },
}
</script>
