<template>
  <div class="currency-list">
    <div class="item" v-for="(item, index) in coins" :key="index">
      <div class="currency-info">
        <div class="num" :class="{'active': index <= 2}">{{index + 1}}</div>
        <div class="currency">
          <div class="icon">
            <img :src="item.img_url" alt="">
            <div class="info">
              <div class="name">
                {{item.currency && item.currency.toUpperCase()}}
              </div>
              <div class="all-name">{{item.all_name}}</div>
            </div>
          </div>
          <div class="invest">
            <span v-for="(name,key) in item.invest" :key="key">{{name}}</span>
          </div>
        </div>
        <div class="reward" v-if="item.reward">
          <div class="reward-item">
            <div class="label">{{$t('m.vote.votingIncentives')}}：</div>
            <div class="value">{{formatString(item.reward)}}<span>{{item.currency}}</span></div>
          </div>
          <div class="reward-item">
            <div class="label">{{$t('m.vote.incentivesEachVote')}}：</div>
            <div class="value">{{perReward(item.reward, item.ticker)}}<span>{{item.currency}}</span></div>
          </div>
        </div>
      </div>
      <div class="vote">
        <div class="ticket">{{formatString(item.ticker)}}<span>{{$t('m.vote.votes')}}</span></div>
        <div class="btns">
          <span @click="toDetail(item.currency, index + 1)">{{$t('m.vote.learnMore')}}</span>
          <v-btn type="info" @click="share(item.currency)" :fontSize='12'>{{$t('m.vote.shareCampaign')}}</v-btn>
          <v-btn v-if="!disabled" type="info" class="btn" backgroundColor='#FFD200' borderColor='#FFD200' @click="toVote(item.currency)" :fontSize='12'>{{$t('m.vote.voteNow')}}</v-btn>
          <v-btn v-else type="info" :disabled="disabled" class="btn" backgroundColor='#F4F4F4' borderColor='#F4F4F4' @click="toVote(item.currency)" :fontSize='12'>{{$t('m.vote.voteNow')}}</v-btn>
        </div>
      </div>
    </div>
    <vote-dialog :type="dialogType" v-if="isShowDialog" @close='closeDialog' :coin='currency' :amount_total='amount_total' :quota='quota' :left_amount='left_amount'></vote-dialog>
  </div>
</template>
<style scoped lang="scss">
.currency-list {
  margin-top: 15px;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border-radius: 3px;
    padding: 28px 40px 18px 25px;
    margin-bottom: 10px;
    .currency-info {
      display: flex;
      align-items: center;
    }
    .num {
      color: #b5b5b5;
      font-size: 28px;
      width: 50px;
      // margin-top: -25px;
      &.active {
        color: #333333;
      }
    }
    .currency {
      width: 351px;
      .icon {
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 20px;
        }
        .info {
          flex: 1;
          .name {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #333333;
            font-size: 24px;
            margin-right: 20px;
          }
          .all-name {
            color: #666666;
            font-size: 15px;
          }
        }
      }
      .invest {
        margin-left: 58px;
        span {
          color: #999999;
          font-size: 12px;
          background: #f6f6f6;
          border-radius: 2px;
          display: inline-block;
          padding: 6px;
          margin: 6px 6px 0 0;
        }
      }
    }
    .reward {
      border-left: 1px solid #eeeeee;
      display: flex;
      padding-left: 48px;
      .reward-item {
        width: 140px;
        &:first-child {
          margin-right: 40px;
        }
        .label {
          color: #999999;
          font-size: 12px;
        }
        .value {
          color: #333333;
          font-size: 18px;
          margin-top: 6px;
          span {
            font-size: 12px;
            margin-left: 6px;
          }
        }
        &:last-child {
          .value {
            font-size: 14px;
            color: #999999;
          }
        }
      }
    }
    .vote {
      .ticket {
        text-align: right;
        font-size: 16px;
        color: #666666;
        margin-bottom: 4px;
        span {
          font-size: 12px;
          margin-left: 4px;
        }
      }
      .btns {
        display: flex;
        align-items: center;
        span {
          cursor: pointer;
          color: #4c84ff;
          font-size: 12px;
          margin-right: 20px;
        }
        .btn {
          margin-left: 14px;
        }
      }
    }
  }
}
</style>

<script>
import VBtn from '@/components/btn'
import vote from '@/mixins/vote'
import VoteDialog from '@/components/vote-dialog'
export default {
  props: ['coins', 'tickers', 'disabled'],
  data() {
    return {
      isShowDialog: false,
      dialogType: '',
      currency: '',
      left_amount: '',
      amount_total: '',
      quota: '',
    }
  },
  mixins: [vote],
  components: {
    VBtn,
    VoteDialog
  },
  methods: {
    toDetail(currency, index) {
      const search = location.search
      if (search.indexOf('?') > -1) {
        location.href = '/vote-detail' + search + '&currency=' + currency
      } else {
        location.href = '/vote-detail' + '?currency=' + currency
      }
      localStorage.setItem('current-coin', currency)
      localStorage.setItem('current-coin-rank', index)
    },
  }
}
</script>

