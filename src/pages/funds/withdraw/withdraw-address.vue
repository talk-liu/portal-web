<template>
  <div>
    <div class="deposits-adress">
      <ul class="deposits-adress-list semi-bold" v-if='withdrawAddress.length > 0'>
        <li v-for="(item,index) in fund_sources" @click="setAdress(item.fund_uid)" :key='index'>
          <p>{{item.fund_extra}}</p>
          <p>{{item.fund_uid}}</p>
        </li>
      </ul>
      <no-records class="empty" v-else></no-records>
    </div>
  </div>
</template>

<script>
import NoRecords from '@/components/no-records'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    NoRecords,
  },
  computed: {
    ...mapGetters('withdraw', ['fund_sources']),
    ...mapGetters('viewport', ['type']),
    withdrawAddress() {
      let arr = []
      this.fund_sources.filter((item) => {
        if (item.currency === this.currency) {
          arr.push(item)
        }
      })
      return arr
    }
  },
  created() {
    this.currency = this.$route.params.currency
    this.getWithdrawAddress(this.currency)
    if (this.type !== 'h5') {
      this.$router.replace(this.$i18nRoute({
        name: 'funds'
      }))
    }
  },
  methods: {
    ...mapActions('withdraw', ['getWithdrawAddress']),
    setAdress(uid) {
      sessionStorage.setItem('deposits-adress' + this.currency, uid)
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variable.scss';

.deposits-adress-list {
  width: 335px;
  margin: 0 auto;
  li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 15px 0;
    list-style: none;
    p {
      color: #333333;
      font-size: 15px;
      &:last-child {
        color: #666666;
        font-size: 12px;
        margin-top: 8px;
      }
    }
  }
}

.empty {
  height: 90vh;
}
</style>
