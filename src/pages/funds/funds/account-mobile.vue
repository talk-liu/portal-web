<template>
  <div class="funds-page_account">
    <!-- header -->
    <div class="content-header">
      <div class="now-value_section">
        <p>{{$t('m.funds.fundsMenu.title')}}</p>
        <p class="value-detail">
          <span>{{totalAccount.btc}}</span>
          <span class="">BTC</span>
        </p>
        <p>
          ≈ {{totalLegal(totalAccount.usdt)}}
        </p>
      </div>
    </div>
    <!-- body -->
    <div class="content-body">
      <div class="content_tab">
        <div class="item" v-for="(item, index) in menuList" :key='index' @click='goSpecificDetail(item.name)'>{{item.label}}</div>
      </div>
      <div class="content-body_header">
        <v-checkbox :label="$t('m.funds.hideSmallCurrency')" bgColor="#40D15C" v-model='hideSmallAccount'></v-checkbox>
      </div>
      <!-- table data -->
      <el-table class="content-body_table funds-body_table" :data="items" :empty-text="$t('m.noRecord')" @row-click="toCurrencyDetail" :show-header="false" >
        <el-table-column>
          <template slot-scope="scope">
            <div class="currency-img_box">
              <div class="currency-img" :style="{backgroundImage:`url(https://i.riostox.com/img/currency/${scope.row.currency}.png)`}"></div>
              <div class="title">{{scope.row.currency | upperCase}}</div>
              <div class="subtitle">{{scope.row.readable_name}}</div>
            </div>
            <div class="currency-info">
              <p class="subtitle">{{$t('m.funds.availableBalance')}}</p>
              <p class="title">{{Number(scope.row.balance).toFixed(8)}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div class="currency-img_box"></div>
            <div class="currency-info">
              <p class="subtitle">
                {{$t('m.funds.frozed')}}
              </p>
              <p class="title">
                {{Number(scope.row.locked).toFixed(8)}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div class="currency-img_box"></div>
            <div class="currency-info">
              <p class="subtitle">
                {{$t('m.funds.estimated')}}
              </p>
              <p class="title">
                {{totalLegal(scope.row.usdt)}}
              </p>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import VCheckbox from '@/components/checkbox-mobile'
import accountMixin from './account-mixin'
export default {
  mixins: [accountMixin],
  components: {
    VCheckbox
  },
  data() {
    return {
      menuList: [
        { label: this.$t('m.funds.fundsMenu.recharge'), name: 'recharge' },
        { label: this.$t('m.funds.fundsMenu.withdraw'), name: 'withdraw' },
        { label: this.$t('m.funds.fundsMenu.historyRecords'), name: 'records' },
      ],
    }
  },
  methods: {
    toCurrencyDetail(row) {
      this.$router.push(this.$i18nRoute({
        name: 'currency',
        params: {
          currency: row.currency,
        }
      }))
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/scss/variable.scss';

.funds-page_account {
  padding-top: 5px;
}

.funds-page {
  .content-header {
    margin: 0 20px;
    background: url(https://i.riostox.com/i/25/254678427cc00e3d8936068183a18c82.png) no-repeat;
    height: 160px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    padding-left: 30px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
    background-size: 100% 100%;
    .now-value_section {
      color: #ffffff;
      p {
        font-size: 17px;
        &:nth-of-type(3) {
          margin-top: 5px;
        }
      }
      .value-detail {
        margin-top: 18px;
        span {
          &:nth-of-type(1) {
            font-size: 24px;
          }
          &:nth-of-type(2) {
            font-size: 16px;
          }
        }
      }
    }
  }
  .content_tab {
    width: 100%;
    margin: 0 auto;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    height: 60px;
    align-items: center;
    .item {
      flex: 1;
      color: #292533;
      font-size: 15px;
      border-left: 1px solid rgba(0, 0, 0, 0.1);
      text-align: center;
      &:first-child {
        border: none;
      }
    }
  }
  .content-body {
    padding: 0 0 15px;
    .content-body_header {
      height: 40px;
      display: flex;
      align-items: center;
      width: 335px;
      margin: 0 auto;
    }
    .content-body_table {
      width: 100%;
      margin: 0 auto;
      border-top: 1px solid #eaedf5;

      .currency-img_box {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        height: 25px;
        min-width: 100px;
        position: absolute;
        top: 15px;
        padding-left: 10px;
      }
      .currency-info {
        margin-top: 35px;
        padding-left: 10px;
      }
      .currency-img {
        width: 20px;
        height: 20px;
        background-size: 100% 100%;
        margin: 0 8px 0 0;
      }
      .title,
      .subtitle {
        white-space: nowrap;
      }
      .title {
        color: #224057;
        font-size: 13px;
        font-weight: bold;
        margin-right: 5px;
      }
      .subtitle {
        color: #8d9ead;
        font-size: 10px;
        line-height: 1.3;
      }
    }
  }
}
</style>

