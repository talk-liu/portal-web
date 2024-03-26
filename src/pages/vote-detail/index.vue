<template>
  <div class="vote-detail">
    <div class="banner">
      <div class="content">
        <div class="currency-info">
          <div class="icon">
            <img :src="voteDetail.img_url" alt="">
            <div class="rank">{{$t('m.vote.rank')}}：<span>{{voteDetail.rank}}</span></div>
          </div>
          <div class="currency">
            <div class="info">
              <div class="currency-name">
                <div class="name">
                  <span>{{voteDetail.currency && voteDetail.currency.toUpperCase()}}</span>
                </div>
                <div class="all-name">{{voteDetail.all_name}}</div>
              </div>
              <div class="reward" v-if="voteDetail.reward">
                <div class="reward-item">
                  <div class="label">{{$t('m.vote.votingIncentives')}}：</div>
                  <div class="value">{{formatString(voteDetail.reward)}}<span> {{voteDetail.currency && voteDetail.currency.toUpperCase()}}</span></div>
                </div>
                <div class="reward-item">
                  <div class="label">{{$t('m.vote.incentivesEachVote')}}：</div>
                  <div class="value">{{perReward(voteDetail.reward, voteDetail.ticket)}}<span> {{voteDetail.currency && voteDetail.currency.toUpperCase()}}</span></div>
                </div>
              </div>
            </div>
            <div class="invest">
              <span v-for="(name,key) in voteDetail.invest" :key="key">{{name}}</span>
            </div>
          </div>
        </div>
        <div class="vote">
          <div class="ticket">{{formatString(voteDetail.ticket)}}<span>{{$t('m.vote.votes')}}</span></div>
          <div class="btns">
            <v-btn type="info" color="#fff" height="40" @click="share(voteDetail.currency)">{{$t('m.vote.shareCampaign')}}</v-btn>
            <v-btn v-if="!disabled" type="info" class="btn" backgroundColor='#FFD200' borderColor='#FFD200' height="40" @click="toVote(voteDetail.currency)" >{{$t('m.vote.voteNow')}}</v-btn>
            <v-btn v-else type="info" :disabled="disabled" class="btn" backgroundColor='#515263' borderColor='#515263' color="#999" height="40" @click="toVote(voteDetail.currency)" >{{$t('m.vote.voteNow')}}</v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="title">
        <span class="icon"></span>
        <span>{{$t('m.vote.projectProfile')}}</span>
      </div>
      <div class="content clearfix">
        <p class="intro">{{$fifth.lang == 'zh-CN' ? voteDetail.intro_zh : voteDetail.intro_en}}</p>
        <div class="btns">
          <a :href="voteDetail.website" target="_blank">{{$t('m.vote.visitOfficialWebsite')}}</a>
          <a :href="voteDetail.project_url" target="_blank">{{$t('m.vote.projectWhitePaper')}}</a>
        </div>
      </div>
      <div class="title">
        <span class="icon"></span>
        <span>{{$t('m.vote.background')}}</span>
      </div>
      <div class="content clearfix">
        <div class="info-item">
          <div class="item">
            <span class="label">{{$t('m.vote.issuanceDate')}}</span>
            <span class="value">{{voteDetail.issue_date}}</span>
          </div>
        </div>
        <div class="info-item">
          <div class="item">
            <span class="label">{{$t('m.vote.totalSupply')}}</span>
            <span class="value">{{formatString(voteDetail.issue_amount)}}</span>
          </div>
        </div>
        <!-- <div class="info-item">
          <div class="item">
            <span class="label">{{$t('m.vote.offeringPrice')}}</span>
            <span class="value">{{formatString(voteDetail.issue_price)}} USDT</span>
          </div>
        </div> -->
        <div class="info-item">
          <div class="item">
            <span class="label">{{$t('m.vote.socialMedia')}}</span>
            <span class="value icon">
              <a :href="voteDetail.weixin" v-if="$fifth.lang == 'zh-CN' && voteDetail.weixin" target="_blank"><i class="iconfont icon-wx"></i></a>
              <a :href="voteDetail.weibo" v-if="$fifth.lang == 'zh-CN' && voteDetail.weibo" target="_blank"><i class="iconfont icon-weibo"></i></a>
              <a v-if="voteDetail.facebook" :href="voteDetail.facebook" target="_blank"><i class="iconfont icon-facebook"></i></a>
              <a v-if="voteDetail.twitter" :href="voteDetail.telegram" target="_blank"><i class="iconfont  icon-twitter"></i></a>
              <a v-if="$fifth.lang === 'zh-CN' && voteDetail['telegram-zh']" :href="voteDetail['telegram-zh']" target="_blank"><i class="iconfont icon-tele"></i></a>
              <a v-if="$fifth.lang === 'en' && voteDetail['telegram-en']" :href="voteDetail['telegram-en']" target="_blank"><i class="iconfont icon-tele"></i></a>
            </span>
          </div>
        </div>
      </div>
    </div>
    <vote-dialog :type="dialogType" v-if="isShowDialog" @close='closeDialog' :coin='currency' :amount_total='amount_total' :quota='quota' :left_amount='left_amount'></vote-dialog>
  </div>
</template>
<style>
  body {
    min-width: 1200px;
  }
</style>

<style lang="scss" scoped>
.banner {
  background: url(https://i.riostox.com/i/2f/2ff105d2dd1c097a207e79da573db91d.png) no-repeat;
  min-width: 1200px;
  height: 180px;
  background-size: cover;
  background-position: center;
  margin: 0 auto;
  .content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 180px;
    .currency-info {
      display: flex;
      .icon {
        text-align: center;
        margin-right: 30px;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: block;
        }
        .rank {
          text-align: center;
          padding: 3px 7px;
          background: #373a4f;
          color: #ffffff;
          border-radius: 2px;
          font-size: 12px;
          display: inline-block;
          margin-top: 10px;
          span {
            font-size: 13px;
          }
        }
      }
      .currency {
        .info {
          display: flex;
          align-items: center;
          .currency-name {
            margin-right: 50px;
            margin-top: 2px;
            .name {
              font-size: 30px;
              color: #ffffff;
            }
            .all-name {
              color: rgba(255, 255, 255, 0.72);
              font-size: 18px;
            }
          }
        }
        .reward {
          display: flex;
          border-left: 1px solid #b0bbc4;
          align-items: center;
          height: 36px;
          padding-left: 50px;
          .reward-item {
            &:first-child {
              margin-right: 70px;
            }
            .label {
              color: rgba(255, 255, 255, 0.6);
              font-size: 12px;
              margin-bottom: 7px;
            }
            .value {
              color: #ffffff;
              font-size: 20px;
              span {
                font-size: 14px;
              }
            }
          }
        }
        .invest {
          margin-top: 13px;
          span {
            display: inline-block;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            padding: 3px 6px;
            color: rgba(255, 255, 255, 0.6);
            font-size: 12px;
            margin-right: 6px;
          }
        }
      }
    }
    .vote {
      .ticket {
        text-align: right;
        color: #ffffff;
        font-size: 19px;
        span {
          font-size: 12px;
          margin-left: 4px;
        }
      }
      .btns {
        display: flex;
        margin-top: 6px;
        .btn {
          margin-left: 12px;
        }
      }
    }
  }
}

.main {
  width: 1120px;
  margin: 0 auto;
  min-height: 900px;
  .title {
    color: #333333;
    font-size: 18px;
    margin-top: 30px;
    span {
      vertical-align: middle;
      &.icon {
        display: inline-block;
        width: 3px;
        height: 16px;
        background: #ffd200;
        margin-right: 10px;
      }
    }
  }
  .content {
    .intro {
      color: #666666;
      font-size: 12px;
      line-height: 26px;
      margin-top: 16px;
    }
    .btns {
      margin-top: 24px;
      height: 32px;
      margin-bottom: 20px;
      a {
        padding: 6px 34px;
        color: #333333;
        font-size: 13px;
        border: 1px solid rgba(51, 51, 51, 0.5);
        border-radius: 3px;
      }
    }
    .info-item {
      margin-top: 13px;
      .item {
        height: 70px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eaedf5;
        .label {
          color: #666666;
          font-size: 14px;
          width: 215px;
        }
        .value {
          color: #333333;
          font-size: 14px;
          .iconfont {
            color: #000000;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>

<script>
import VBtn from '@/components/btn'
import vote from '@/mixins/vote'
import find from 'lodash/find'
import VoteDialog from '@/components/vote-dialog'
import getQueryString from '@/utils/getQueryString'
export default {
  data() {
    return {
      currency: '',
      voteDetail: {},
      coinType: '',
      coinArr: [],
      isShowDialog: false,
      dialogType: '',
      left_amount: '',
      amount_total: '',
      quota: '',
      period: '',
      coins: [],
      disabled: false
    }
  },
  mixins: [vote],
  components: {
    VBtn,
    VoteDialog
  },
  watch: {
    voteInfo: 'parseData',
  },
  mounted() {
    this.currency = localStorage.getItem('current-coin') || getQueryString('currency')
    this.rank = localStorage.getItem('current-coin-rank')
    this.getVoteInfo()
  },
  methods: {
    async parseData() {
      this.period = this.voteInfo.period
      this.coins = this.voteInfo.list
      this.date = this.voteInfo.date
      if (this.date) {
        this.checkDateExpire()
      }
      await this.getVoteCountInfo({
        period: this.period
      })
      this.parseVoteCountInfo()
    },
    parseVoteCountInfo() {
      if (this.coins && this.coins.length > 0) {
        const currentVote = find(this.coins, (data) => {
          return data.currency.toLowerCase() === this.currency.toLowerCase()
        })
        this.voteDetail = currentVote
        const item = find(this.voteCountInfo, (data) => {
          return data.code.toLowerCase() === currentVote['currency'].toLowerCase()
        })
        if (item) {
          this.voteDetail['ticket'] = item['count']
          this.voteDetail['rank'] = this.voteCountInfo.indexOf(item) + 1
        } else {
          this.voteDetail['ticket'] = 0
          this.voteDetail['rank'] = this.rank
        }
      }
    }
  }
}
</script>


