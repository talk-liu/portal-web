<template>
  <div class="funds-page_account">
    <!-- header -->
    <div class="content-header">
      <div class="now-value_section">
        <p class="value-title">{{$t('m.funds.valueTitle')}}</p>
        <div class="value-detail">
          <span>{{totalAccount.btc}}</span>
          <span>BTC</span>
          <span> / {{totalLegal(totalAccount.usdt,4)}}</span>
        </div>
      </div>
      <div class="rule_section">
        <div class="item">
          <!-- 24 {{$t('m.funds.withdrawLimit')}}： -->
          year withdrawal limit
          <span>{{limitWithdraw}}</span>
          <span>USD</span>
        </div>
        <div class="item">
          {{$t('m.funds.amountUsed')}}：
          <span>{{currentUser && currentUser.withdraw_amount_h24}}</span>
          <span>USD</span>
        </div>
      </div>
    </div>
    <div class="content-body">
      <div class="search-box">
        <v-input-search v-model="keyWord" :placeholder="$t('m.search')" class="search"></v-input-search>
        <v-checkbox v-model="hideSmallAccount" >{{$t('m.funds.hideCurrency')}}</v-checkbox>
        <info-tip class="info-tip">
          <img src='https://i.riostox.com/i/c4/c45711b12e72d6003a4dfee4c2e226c5.png' alt="" slot='img' height="16">
          <span slot="info">{{$t('m.funds.smallCurrenciesTip')}}</span>
        </info-tip>
      </div>
      <el-table class="content-body_table" :data="items" style="width: 100%;" :show-header="false" :empty-text="$t('m.noData')">
        <el-table-column width="80">
          <template slot-scope="scope">
            <div class="currency">
              <span class="currency-img" :style="{backgroundImage:`url(https://i.riostox.com/img/currency/${scope.row.currency}.png)`}"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="140">
          <template slot-scope="scope">
            <div class="bit-info_name">
              <p>{{scope.row.currency | upperCase}}</p>
              <p>{{scope.row.readable_name}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="320">
          <template slot-scope="scope">
            <div class="bit-info_price">
              <p>
                <span>{{(Number(scope.row.balance) + Number(scope.row.locked)).toFixed(8)}}</span>
                <span>{{scope.row.currency | upperCase}}</span>
              </p>
              <p>
                <span v-if="scope.row.currency === 'btc'">=</span>
                <span v-else>≈</span>
                <span>{{Number(scope.row.btc).toFixed(8)}}</span>
                <span>BTC</span>
                <span> / {{totalLegal(scope.row.usdt,4)}}</span>
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="300">
          <template slot-scope="scope">
            <div>
              <p >
                <span class="available">{{$t('m.funds.availableBalance')}}：</span>
                <span>{{Number(scope.row.balance).toFixed(8)}}</span>
              </p>
              <p>
                <span class="froze">
                  {{$t('m.funds.frozed')}}：
                </span>
                <span>
                  {{Number(scope.row.locked).toFixed(8)}}
                </span>
              </p>
            </div>
          </template>
        </el-table-column>

        <el-table-column width="320">
          <template slot-scope="scope" >
            <div class="group-btn">
              <span class="btn" name="deposits" @click="goSpecificDetail('recharge', scope.row.currency)">{{$t('m.funds.fundsMenu.recharge')}}</span>
              <span class="btn" name="withdraw" @click="goSpecificDetail('withdraw', scope.row.currency)">{{$t('m.funds.fundsMenu.withdraw')}}</span>
              <div class="deal-btn">
                <span>{{$t('m.funds.deal')}}</span>
                <ul v-if="scope.row.tickers && scope.row.tickers.length > 0">
                  <li :key='key' v-for="(item,key) in scope.row.tickers" @click="getMarketLink(item.marketId)">{{item.name}}</li>
                </ul>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import accountMixin from './account-mixin'
import VCheckbox from '@/components/checkbox'
import InfoTip from '@/components/tip/index'
export default {
  mixins: [accountMixin],
  components: {
    VCheckbox,
    InfoTip
  },
}
</script>
<style scoped lang="scss">
.funds-page_account {
  padding: 50px 0 50px;
  margin: 0 auto;
  width: 1120px;
  .content-header {
    display: flex;
    padding: 0 0 47px;
    border-bottom: 1px solid #eaedf5;
    .value-title {
      color: $color-3;
      font-size: 18px;
      font-weight: 500;
    }
    .now-value_section {
      flex: 1;
      .value-detail {
        margin-top: 23px;
        span {
          font-size: 20px;
          color: #999999;
          &:nth-of-type(1) {
            font-size: 40px;
            color: $color-3;
            font-weight: 400;
            font-family: 'dinMedium';
          }
        }
      }
    }

    .rule_section {
      padding-bottom: 10px;
      font-weight: bold;
      margin-top: 4px;
      font-size: 13px;
      .item {
        display: inline-block;
        &:nth-of-type(2) {
          margin-left: 30px;
        }
      }
    }
  }
  .search-box {
    padding: 15px 0;
    .search {
      margin-right: 15px;
    }
    .info-tip {
      display: inline-block;
    }
  }
  .content-body_table {
    .currency {
      padding-left: 20px;
      .currency-img {
        display: inline-block;
        width: 38px;
        height: 38px;
        background-size: 100% 100%;
      }
    }
    .bit-info_name {
      padding: 12px 0;
      p {
        &:first-child {
          color: #333333;
          font-size: 24px;
        }
        &:last-child {
          color: #666666;
          font-size: 15px;
        }
      }
    }
    .bit-info_price {
      font-size: 14px;
    }
    .group-btn {
      display: flex;
      align-items: center;
      .deal-btn {
        &:hover {
          & > ul {
            display: block;
          }
        }
        ul {
          display: none;
          position: absolute;
          list-style: none;
          color: $color-assist1;
          font-weight: 500;
          min-width: 100px;
          text-align: center;
          background-color: #ffffff;
          z-index: 9999;
          font-size: 12px;
          box-shadow: rgba($color: #000000, $alpha: 0.05) 0 10px 10px;
          max-height: 140px;
          overflow-y: scroll;

          li {
            margin: 10px;
            border-radius: 3px;
            padding: 0 5px;
            cursor: pointer;

            &:hover {
              background-color: $color-primary;
              color: $color-text;
            }
          }
        }
      }
      span {
        color: #666666;
        cursor: pointer;
        padding: 0 10px;
        position: relative;
        &.btn:after {
          background-color: #333333;
          content: "";
          display: inline-block;
          height: 10px;
          position: absolute;
          right: 0;
          top: 5px;
          width: 1px;
        }
        &:hover {
          color: #e06f0d;
        }
      }
    }
  }
}
</style>

