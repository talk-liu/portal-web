<template>
  <v-dialog :visible="true">
    <v-box :title="title[type]" :isFixed='true' class="box" :showClose='true' @close='closeDialog'>
      <div class="box-content" v-if="type === 1">
        <p class="info">{{$t('m.vote.campaignTip', {currency: currency})}}</p>
        <v-share class="share" :currency='currency'></v-share>
      </div>
      <div class="box-content" v-if="type === 2">
        <p class="sub-info">{{$t('m.vote.voteSuccess', {currency: currency})}}{{$t('m.vote.moreVoteTip')}}</p>
        <div class="btns">
          <v-btn type="info"  backgroundColor='#FFD200' borderColor='#FFD200' height="40" @click="closeDialog()">{{$t('m.vote.ok')}}</v-btn>
        </div>
      </div>
      <div class="box-content" v-if="type === 3">
        <p class="sub-info">{{$t('m.vote.currentDeposited', {currency: currency, quota: quota, amount: amount_total, left_amount: left_amount})}}{{$t('m.vote.maxVoteTip', {currency: "BTC"})}}</p>
        <div class="btns">
          <v-btn type="info"  backgroundColor='#FFD200' borderColor='#FFD200' height="40" @click="toDeposits">{{$t('m.vote.deposit')}}</v-btn>
        </div>
      </div>
      <div class="box-content" v-if="type === 4">
        <p class="info">{{$t('m.vote.verificationBothTip')}}</p>
        <p class="sub-info">{{$t('m.vote.noReport')}}</p>
        <div class="btns">
          <v-btn type="info" class="btn" backgroundColor='#FFD200' borderColor='#FFD200' height="40" @click="kycVerification">{{$t('m.vote.kyc')}}</v-btn>
          <v-btn type="info"  backgroundColor='#FFD200' borderColor='#FFD200' height="40" @click="phoneVerification">{{$t('m.vote.phoneVerification')}}</v-btn>
        </div>
      </div>
      <div class="box-content" v-if="type === 5">
        <p class="info">{{$t('m.vote.kycTip')}}</p>
        <p class="sub-info">{{$t('m.vote.noReport')}}</p>
        <div class="btns">
          <v-btn type="info" class="btn" backgroundColor='#F3F4F6' borderColor='#F3F4F6' height="40" @click="closeDialog">{{$t('m.vote.cancel')}}</v-btn>
          <v-btn type="info"  backgroundColor='#FFD200' borderColor='#FFD200' height="40" @click="kycVerification">{{$t('m.vote.kyc')}}</v-btn>
        </div>
      </div>
      <div class="box-content" v-if="type === 6">
        <p class="info">{{$t('m.vote.verificationPhoneTip')}}</p>
        <p class="sub-info">{{$t('m.vote.noReport')}}</p>
        <div class="btns">
          <v-btn type="info" class="btn" backgroundColor='#F3F4F6' borderColor='#F3F4F6' height="40" @click="closeDialog">{{$t('m.vote.cancel')}}</v-btn>
          <v-btn type="info"  backgroundColor='#FFD200' borderColor='#FFD200' height="40" @click="phoneVerification">{{$t('m.vote.phoneVerification')}}</v-btn>
        </div>
      </div>
    </v-box>
  </v-dialog>
</template>

<script>
import VDialog from '@/components/dialog'
import VBox from '@/components/box'
import VBtn from '@/components/btn'
import VShare from '@/components/share'
export default {
  props: ['type', 'coin', 'amount_total', 'quota', 'left_amount'],
  components: {
    VDialog,
    VBox,
    VBtn,
    VShare
  },
  data() {
    return {
      title: {
        1: this.$t('m.vote.share'),
        2: this.$t('m.vote.voteSuccessully'),
        3: this.$t('m.vote.depositingVote'),
        4: this.$t('m.vote.reminder'),
        5: this.$t('m.vote.reminder'),
        6: this.$t('m.vote.reminder'),
      },
      currency: this.coin
    }
  },
  watch: {
    coin(val) {
      console.log(val)
      this.currency = val
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    phoneVerification() {
      location.href = '/settings/bind/phone'
    },
    kycVerification() {
      // window.open('https://ares-riostoxexchange.cynopsis.co')
      this.$router.push(this.$i18nRoute({
        name: 'IsKyc',
      }))
    },
    toDeposits() {
      location.href = '/funds/recharge/' + this.currency.toLowerCase()
    }
  }
}
</script>

<style scoped lang="scss">
.box-content {
  padding: 50px 22px 50px;
  p {
    line-height: 30px;
    text-align: center;
  }
  .info {
    color: #333333;
    font-size: 14px;
  }
  .sub-info {
    color: #777777;
    font-size: 13px;
  }
  .btns {
    display: flex;
    justify-content: center;
    margin: 40px auto 0;
    .btn {
      margin-right: 65px;
    }
  }
  .share {
    margin-top: 30px;
  }
}
</style>

