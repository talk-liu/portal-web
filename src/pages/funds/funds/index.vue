<template>
  <div>
    <div class="funds-page_funds" v-if="type !== 'h5'">
      <!-- header -->
      <div class="content-header">
        <div class="now-value_section">
          <p class="headline">{{$t('m.funds.valueTitle')}}</p>
          <div class="value-detail">
            <p>
              <span>{{totalCurrencyAccount.btc}}</span>
              <span>BTC</span>
            </p>
            <p>
              <span> / {{totalLegal(totalCurrencyAccount.usdt,4)}}</span>
            </p>
          </div>
        </div>
        <div class="rule_section">
          <div>
            24 {{$t('m.funds.withdrawLimit')}}：
            <span>{{limitWithdraw}}</span>
            <span>USDT</span>
          </div>
          <div>
            {{$t('m.funds.amountUsed')}}：
            <span>{{currentUser && currentUser.withdraw_amount_h24}}</span>
            <span>USDT</span>
          </div>
        </div>
      </div>
      <!-- body -->
      <div class="content-body">
        <div class="account">
          <div
            class="account-item"
            @click="goToAccountDetail(0)"
          >
            <div class="item">
              <p class="f16">{{$t('m.funds.historyRecords.cryptocurrencyAccount')}}</p>
              <p><span>{{totalAccount.btc}}</span> <span>BTC</span></p>
              <p>/ {{totalLegal(totalAccount.usdt,4)}}</p>
            </div>
          </div>
        </div>
        <div class="help" v-if="fundsInterlocution[$fifth.lang]">
          <div
            class="part"
            v-for="(item, index) in fundsInterlocution[$fifth.lang]"
            :key="index"
          >
            <h3>{{item.title}}</h3>
            <p v-html="item.content">
            </p>
          </div>
        </div>
      </div>
    </div>
    <account-mobile v-else></account-mobile>
  </div>
</template>
<script>
import AccountMobile from './account-mobile'
import { mapGetters, mapState, mapActions } from 'vuex'
import BigNumber from 'bignumber.js'
import totalMoney from '@/mixins/total-money'
export default {
  mixins: [totalMoney],
  computed: {
    ...mapState('fundsInterlocution', ['fundsInterlocution']),
    ...mapGetters('viewport', ['type']),
    ...mapState('currentUser', ['currentUser']),
    ...mapGetters('currentUser', ['limitWithdraw']),
    ...mapGetters('accounts', ['totalAccount']),
    totalCurrencyAccount() {
      return {
        btc: BigNumber(this.totalAccount.btc)
          .toFixed(8, 1),
        usdt: BigNumber(this.totalAccount.usdt)
          .toFixed(8, 1),
      }
    },
  },
  created() {
    this.getFundsInterlocution()
  },
  components: {
    AccountMobile
  },
  methods: {
    ...mapActions('fundsInterlocution', ['getFundsInterlocution']),
    goToAccountDetail(type) {
      if (type === 0) {
        this.$router.push(this.$i18nRoute({
          name: 'account',
        }))
      }
    },
  }
}
</script>
<style scoped lang="scss">
@import '../../../assets/scss/variable.scss';

.funds-page_funds {
  padding: 50px 0 50px;
  margin: 0 auto;
  width: 1120px;
  .content-header {
    display: flex;
    padding: 0 0 47px;
    border-bottom: 1px solid #eaedf5;
    .headline {
      color: $color-3;
      font-size: 18px;
      font-weight: 500;
    }
    .funds-menu_section {
      padding-right: 30px;
      border-right: 1px solid #eaedf5;

      .title {
        font-size: 14px;
        color: $color-assist1;
      }

      .btn-groups {
        .v-btn {
          display: inline-block;

          button {
            font-weight: 500;
          }
        }
      }
    }

    .now-value_section {
      flex: 1;

      .value-detail {
        margin-top: 15px;
        p {
          &:first-child {
            span {
              &:nth-of-type(1) {
                font-size: 40px;
                color: $color-3;
                font-weight: 400;
                font-family: 'dinMedium';
              }
            }
          }
          &:last-child {
            color: #999999;
            font-size: 20px;
            margin-top: 5px;
          }
        }
      }
    }

    .rule_section {
      padding-bottom: 10px;
      font-weight: bold;
      margin-top: 4px;
      color: #666666;
      font-size: 13px;
      div {
        display: inline-block;
        &:nth-of-type(2) {
          margin-left: 30px;
        }
      }
    }
  }
  .content-body {
    .account {
      display: flex;
      margin-top: 40px;
      .account-item {
        cursor: pointer;
        width: 400px;
        height: 156px;
        background: #fafafa;
        box-shadow: 0 6px 4px 0 rgba(0, 0, 0, 0.06);
        display: flex;
        align-items: center;
        margin-right: 30px;
        .item {
          padding-left: 40px;
          color: #000000;
          p {
            font-size: 16px;
            &:nth-of-type(2) {
              margin-top: 5px;
              span {
                &:first-child {
                  font-weight: bold;
                  font-size: 24px;
                }
              }
            }
            &:nth-of-type(3) {
              margin-top: 5px;
              color: #777777;
            }
          }
        }
      }
    }
    .help {
      margin-top: 68px;
      .part {
        margin-bottom: 20px;
        h3 {
          font-size: 14px;
          color: #333333;
          font-weight: bold;
        }
        p {
          color: #777777;
          font-size: 13px;
          margin-top: 5px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>


