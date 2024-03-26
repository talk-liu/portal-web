<template>
  <div class='cmp-wrap'>
    <div class='btn-wrap'>
      <a target='_blank' href='https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8' style='margin-right:20px;' class='btn'>
        <img src="https://i.riostox.com/i/d5/d571a2dcaf76d421784ab8e025707f8c.png" alt="">
        <div class='down-store-text'>
          <p class='down'>Download it from</p>
          <p class='store'>APP STORE</p>
        </div>
      </a>
      <a target='_blank' href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2' class='btn'>
        <img src="https://i.riostox.com/i/d5/d540f0676ba6a9ef0a1cd8652c072350.png" alt="">
        <div class='down-store-text'>
          <p class='down'>Download it from</p>
          <p class='store'>GOOGLE PLAY</p>
        </div>
      </a>
    </div>
    <v-btn type="primary" width="300" @click="nextStep()">{{$t('m.company.next')}}</v-btn>
  </div>
</template>

<script>
import VBtn from '@/components/btn'
import isbind from '@/mixins/isbind'
export default {
  components: {
    VBtn,
  },
  mixins: [isbind],
  methods: {
    nextStep() {
      this.$router.push(this.$i18nRoute({
        name: 'BindGoogle',
        params: {
          type: 'google',
          step: 'copyKey',
        },
      }))
    },
  },
  created() {
    this.isBind()
  },
}
</script>

<style lang='scss' scoped>
.cmp-wrap {
  text-align: center;
  .btn-wrap {
    display: flex;
    justify-content: center;
    margin-top: 44px;
    margin-bottom: 143px;
    a {
      color: $color-6;
    }
    img {
      height: 40px;
      margin-right: 16px;
    }
    .btn {
      cursor: pointer;
      width: 220px;
      height: 70px;
      border: 1px solid #bdc7d1;
      border-radius: 5px;
      box-shadow: 0 2px 3px #eeeeee;
      display: flex;
      align-items: center;
      justify-content: center;
      .down-store-text {
        text-align: left;
        .down {
          font-size: 14px;
        }
        .store {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
    .btn:hover {
      box-shadow: 0 3px 4px #eeeeee;
    }
  }
}
</style>
