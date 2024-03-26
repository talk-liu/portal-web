<template>
  <div class='cmp-wrap'>
    <div class='input-value-wrap'>
      <keyInputValue class='marginValue' :value="key" />
    </div>

    <v-btn type="primary" width="300" @click="nextStep()">{{$t('m.company.next')}}</v-btn>
  </div>
</template>

<script>
import VBtn from '@/components/btn'
import keyInputValue from './keyInputValue'
import isbind from '@/mixins/isbind'
export default {
  data() {
    return {
      key: '',
    }
  },
  mixins: [isbind],
  components: {
    VBtn,
    keyInputValue,
  },
  created() {
    this.isBind()
    this.key = this.$route.query.key
  },
  methods: {
    nextStep() {
      this.$router.push(this.$i18nRoute({
        name: 'BindGoogle',
        params: {
          type: 'google',
          step: 'googleEnabled',
        },
      }))
    },
  },
}
</script>

<style lang='scss' scoped>
.cmp-wrap {
  text-align: center;
  .input-value-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    .marginValue {
      margin-top: 50px;
      margin-bottom: 135px;
    }
  }
}
</style>
