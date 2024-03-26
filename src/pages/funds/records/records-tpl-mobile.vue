<template>
  <div>
    <div v-if='data.length > 0' class="records-list">
      <div v-for='(v,i) in data' :key='i' class='records-list-item'>
        <div class='nomal-info-wrap'>
          <div class="img" :class="v.currency" :style="{backgroundImage:`url(https://i.riostox.com/img/currency/${v.currency && v.currency.toLowerCase()}.png)`}"></div>
          <div class='content-wrap'>
            <div class='name-coin-wrap'>
              <div class='name'>
                <span>{{v.currency}}</span>
              </div>
              <div class='coin'>
                <span>{{v.amount}}</span>
              </div>
            </div>
            <div class='time-state-wrap'>
              <div class='time'>
                <span>{{v.date}}</span>
              </div>
              <div class='state'>
                <span class="upper">{{state[v.state]}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="other-info-wrap">
          <!--其它-->
          <div v-if='btnNumber === 2'>
            <p class="extra-info">
              <i style='margin-right:10px;' class='iconfont icon-huodong'></i>
              <span>{{renderExtroInfo(v.extra_info)}}</span>
            </p>
          </div>
          <!--提现-->
          <div v-if="btnNumber === 1">
            <div class='address-txid-wrap'>
              <p class="address">
                {{v.fund_uid}}
              </p>
              <p style='margin-top:6px;' class='txid-label-wrap' v-if="v.state === 'processing' || v.state === 'almost_done' || v.state === 'almost_done' || v.state === 'done' || v.state === 'failed'">
                <span v-if='v.txid' class="txid-label">Txid:</span>
                <a :href="v.blockchain_url" target="_blank">{{v.txid}}</a>
              </p>
            </div>
          </div>
          <!--充值-->
          <div v-if="btnNumber === 0">
            <div class='txid-wrap'>
              <div class='txid-label-wrap'>
                <span class='txid-label'>Txid: </span>
                <a :href="v.blockchain_url" target="_blank" class="block-chain-url" v-if="v.deposit_type === 'deposit_chain'">{{v.txid}}</a>
                <span v-else>
                  {{v.txid}}
                </span>
              </div>
              <div class='confirmations-wrap'>
                <span v-if="v.state === 'submitted'" class="funds-confirm">{{$t('m.funds.confirmations')}}&nbsp;</span>
                <span v-if="v.state === 'submitted'">{{v.confirmations || 0}}/{{maxConfirm(v)}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <no-records v-else class="records-empty"></no-records>
  </div>
</template>
<script>
import NoRecords from '@/components/no-records'
import recordsTplMixin from './records-tpl-mixin'
export default {
  mixins: [recordsTplMixin],
  components: {
    NoRecords
  },
  watch: {
    btnNumber(val) {
      if (val === 2) {
        this.getDepositRemarks()
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.records-empty {
  margin-top: 110px;
}

.records-list {
  .records-list-item {
    margin: 0 20px;
    padding: 16px 0;
    border-bottom: 1px solid #f6f6f6;
    .nomal-info-wrap {
      display: flex;
      align-items: center;
      .img {
        width: 32px;
        height: 28px;
        margin-right: 10px;
        background-size: 100% 100%;
      }
      .content-wrap {
        width: 100%;
        .name-coin-wrap {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          font-size: 15px;
        }
        .time-state-wrap {
          display: flex;
          justify-content: space-between;
          color: #999999;
          font-size: 12px;
          span {
            margin-top: 5px;
            display: inline-block;
          }
        }
      }
    }
    .other-info-wrap {
      margin-top: 15px;
      padding: 10px 15px;
      background: #f6f6f6;
      border-bottom: 1px solid #f6f6f6;
      .address-txid-wrap {
        .address {
          color: #777777;
          font-size: 11px;
        }
      }
      .txid-label-wrap {
        display: flex;
        font-size: 11px;
        a {
          color: #e06f0d;
          word-break: break-all;
        }
        .txid-label {
          color: #e06f0d;
          margin-right: 5px;
        }
      }
      .txid-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .confirmations-wrap {
          display: flex;
          font-size: 11px;
        }
      }
      .extra-info {
        color: #bbbbbb;
        i,
        span {
          font-size: 12px;
        }
      }
    }
  }
}
</style>

