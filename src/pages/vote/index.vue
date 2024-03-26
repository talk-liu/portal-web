<template>
  <div class="vote">
    <div class="banner">
      <div class="banner-content">
        <h3>{{$t('m.vote.communityConsensus')}}</h3>
        <h4>{{$t('m.vote.voteToList')}}</h4>
        <div class="count-down">
          <div class="label">{{$t('m.vote.countdown')}}：</div>
          <div class="item">
            <span>{{d}}</span>{{$t('m.vote.day')}}
          </div>
          <div class="item">
            <span>{{h}}</span>{{$t('m.vote.hour')}}
          </div>
          <div class="item">
            <span>{{m}}</span>{{$t('m.vote.minute')}}
          </div>
          <div class="item">
            <span>{{s}}</span>{{$t('m.vote.second')}}
          </div>
        </div>
        <div class="rule">
          <a target="_blank" :href="rulesLink[this.$fifth.lang]">{{$t('m.vote.rules')}}</a>
          <a target="_blank" :href="criteraLink[this.$fifth.lang]">{{$t('m.vote.critera')}}</a>
          <a target="_blank" :href="applicationlLink[this.$fifth.lang]">{{$t('m.vote.application')}}</a>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="content clearfix">
        <div class="tab-header">
          <tabs :idx.sync='tabIndex' :count='tabConfig.length' class='tab flex jcc'>
            <span class='line'></span>
            <tab-item v-for="(v,k) in tabConfig" :key='k' :index='k' class='tab-item' :fontSize="18">
              <span slot='label' class='tab-label'>
                {{v.label}}
              </span>
            </tab-item>
          </tabs>
          <tip :text="$t('m.vote.voteTip')"></tip>
        </div>
        <currency v-if="tabIndex === 0" :coins="newCoins" :tickers="voteCountInfo" :disabled="disabled"></currency>
        <div class="history-record" v-if="tabIndex === 1">
          <v-btn-group :btnNumber="btnNumber">
            <button name="mining"  @click="changeMenu(0)">{{$t('m.vote.votingHistory')}}</button>
            <button name="profit"  @click="changeMenu(1)">{{$t('m.vote.rewardsHistory')}}</button>
          </v-btn-group>
          <history :btnNumber='btnNumber'></history>
        </div>
        <div class="refresh">{{$t('m.vote.refreshTime')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import tabs from '@/components/tabs/tabs'
import tabItem from '@/components/tabs/tab-item'
import VBtnGroup from '@/components/btn-group'
import history from './history'
import Currency from './currency'
import VBtn from '@/components/btn'
import tip from '@/components/tip'
import vote from '@/mixins/vote'
import find from 'lodash/find'
import cloneDeep from 'lodash/cloneDeep'
export default {
  mixins: [vote],
  components: {
    tabs,
    tabItem,
    VBtnGroup,
    history,
    Currency,
    VBtn,
    tip
  },
  mounted() {
    this.getVoteInfo()
  },
  watch: {
    voteInfo: 'parseData',
  },
  data() {
    return {
      tabConfig: [{
        label: this.$t('m.vote.currentCandidateProjects')
      }, {
        label: this.$t('m.vote.myVotes')
      }],
      rulesLink: {
        'zh-CN': 'https://help.riostox.com/hc/zh-cn/articles/360014980652-Riostox%E5%85%85%E5%80%BC%E6%8A%95%E7%A5%A8%E8%A7%84%E5%88%99',
        'en': 'https://help.riostox.com/hc/en-us/articles/360015265532-Riostox-Premium-Project-Assessment-Policy'
      },
      criteraLink: {
        'zh-CN': 'https://help.riostox.com/hc/zh-cn/articles/360015265532-%E5%85%B3%E4%BA%8ERiostox%E4%BC%98%E8%B4%A8%E9%A1%B9%E7%9B%AE%E5%BE%81%E9%9B%86%E7%9A%84%E5%AE%A1%E6%A0%B8%E8%AF%B4%E6%98%8E',
        'en': 'https://help.riostox.com/hc/en-us/articles/360014980652-Riostox-Community-Vote-to-List-Scheme'
      },
      applicationlLink: {
        'zh-CN': 'https://jinshuju.net/f/r2A9qW',
        'en': 'https://docs.google.com/a/riostox.com/forms/d/1pXosWxoha4-yeAGEY3tnAKWUo-tdeIx8oH3OTUH5uoQ/edit?usp=drive_open&ths=true'
      },
      tabIndex: 0,
      btnNumber: 0,
      coinType: '',
      coinArr: [],
      coins: [],
      period: '',
      newCoins: [],
      date: '',
      d: 0,
      h: 0,
      m: 0,
      s: 0,
      disabled: false
    }
  },
  methods: {
    countdown() {
      const end_time = parseInt(Date.parse(new Date(this.date)) / 1000)
      const curr_time = parseInt(Date.parse(new Date()) / 1000)
      const diff_time = parseInt(end_time - curr_time)
      if (diff_time <= 0) {
        this.d = 0
        this.h = 0
        this.m = 0
        this.s = 0
      } else {
        this.d = Math.floor(diff_time / 86400)
        this.h = Math.floor(diff_time / 3600 % 24)
        this.m = Math.floor((diff_time / 60 % 60))
        this.s = Math.floor((diff_time % 60))
        setTimeout(this.countdown, 1000)
      }
    },
    async parseData() {
      this.date = this.voteInfo.date
      this.period = this.voteInfo.period
      this.coins = this.voteInfo.list
      if (this.date) {
        this.countdown()
        this.checkDateExpire()
      }
      await this.getVoteCountInfo({
        period: this.period
      })
      this.parseVoteCountInfo()
    },
    parseVoteCountInfo() {
      if (this.coins && this.coins.length > 0) {
        this.coins.map((val) => {
          const item = find(this.voteCountInfo, (data) => {
            return data.code.toLowerCase() === val.currency.toLowerCase()
          })
          if (item) {
            val['ticker'] = item['count']
          } else {
            val['ticker'] = 0
          }
        })
        const coins = cloneDeep(this.coins)
        const sortCoins = coins.sort((a, b) => {
          return a['ticker'] > b['ticker'] ? -1 : 1
        })
        this.newCoins = sortCoins
      }
    },
    closeDialog() {
      this.isShowDialog = false
    },
    changeMenu(val) {
      this.btnNumber = val
    }
  }
}
</script>
<style>
body {
  min-width: 1200px;
}
</style>

<style lang="scss" scoped>

.banner {
  background: url(https://i.riostox.com/i/8b/8b0c1956284e5cb845e949af792f3e5a.png) no-repeat;
  height: 400px;
  background-size: cover;
  background-position: center;
  min-width: 1200px;
  .banner-content {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    padding-top: 43px;
    h3 {
      font-size: 24px;
      font-weight: normal;
      color: rgba(255, 255, 255, 0.72);
    }
    h4 {
      color: #ffffff;
      font-size: 118px;
      font-weight: normal;
      margin-top: 18px;
      font-family: 'fCu';
    }
    .count-down {
      display: flex;
      justify-content: center;
      align-items: center;
      .label {
        font-size: 30px;
        color: rgba(255, 255, 255, 0.72);
      }
      .item {
        color: rgba(255, 255, 255, 0.72);
        font-size: 21px;
        margin-right: 14px;
        &:last-child {
          margin-right: 0;
        }
        span {
          font-size: 36px;
          color: #ffffff;
          margin-right: 2px;
        }
      }
    }
    .rule {
      color: rgba(255, 255, 255, 0.8);
      font-size: 14px;
      display: flex;
      justify-content: center;
      margin: 78px auto 0;
      height: 18px;
      align-items: center;
      a {
        color: rgba(255, 255, 255, 0.8);
        position: relative;
        border-right: 1px solid rgba(255, 255, 255, 0.5);
        padding-right: 60px;
        margin-right: 60px;
        &:last-child {
          border-right: none;
          padding-right: 0;
          margin-right: 0;
        }
      }
    }
  }
}

.main {
  background: #fafafa;
  min-height: 700px;
  margin: 0 auto;
  min-width: 1200px;
}

.content {
  width: 1200px;
  margin: 0 auto;
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
}

.history-record {
  margin-top: 15px;
  padding: 20px 40px;
  background: #ffffff;
  border-radius: 3px;
}

.refresh {
  text-align: right;
  color: #999999;
  font-size: 12px;
  padding: 20px 0 30px;
}
</style>

