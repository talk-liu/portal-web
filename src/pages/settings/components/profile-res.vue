<template>
  <div class="profile-res-page">
    <img src="../../../assets/images/identity-bg.png">
    <div class="content">
      <h4 class="fb" :class="{success:success}">{{title}}</h4>
      <div v-if="success" class="two-title">
        {{$t('m.settings.verifySuccess')}}
        <span class="semi-bold fb">{{maxWithdrawAmount}}</span>
      </div>
      <div class="desc" v-if="idDocumentState !== 'rejected'">
        <span>{{$t('m.settings.cashAmountDesc2')}}</span>
        <span class="spec-color">{{$t('m.settings.contactUs')}}</span>
      </div>
      <div class="desc" v-else>
        <span>{{$t('m.settings.cashAmountDesc3',{email:email})}}</span>
        <div class="re-submit">
          <v-btn type="primary" width="375" @click="reSubmit">{{$t('m.settings.reSubmit')}}</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VBtn from '@/components/btn'
import { mapState } from 'vuex'
export default {
  components: {
    VBtn,
  },
  data() {
    return {
      success: this.$parent.success,
      maxWithdrawAmount: '1,000,000 USDT'
    }
  },

  computed: {
    ...mapState('currentUser', ['currentUser']),
    idDocumentState() {
      return this.currentUser && this.currentUser.id_document_state
    },
    email() {
      return this.currentUser && this.currentUser.email
    },
    title() {
      if (this.idDocumentState === 'verifyed') {
        return this.$t('m.identity.verifyed')
      }
      if (this.idDocumentState === 'verifying') {
        return this.$t('m.identity.verifying')
      }
      if (this.idDocumentState === 'rejected') {
        return this.$t('m.identity.failed')
      }
    },
  },
  methods: {
    reSubmit() {
      this.$parent.currentView = 'Region'
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variable.scss';

.profile-res-page {
  // margin: 40px 0 0 35px;
  margin: 20px 0 300px 35px;

  img {
    display: block;
    margin: 0 auto 37px;
  }

  .content {
    margin: -60px auto 0;
    text-align: center;

    h4 {
      margin-bottom: 20px;
      font-size: 24px;
      color: $color-assist7;
    }

    .success {
      color: $color-assist5;
    }

    .two-title {
      margin: 10px 0 10px;
      font-size: 16px;
      color: $color-assist1;
    }

    .desc {
      font-size: 13px;
      color: $color-assist2;
    }

    .spec-color {
      color: #e06f0d;
    }

    .re-submit {
      margin-top: 75px;
    }
  }
}
</style>
