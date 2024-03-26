<template>
  <div class="profit-competition">
    <section class="banner">
      <div class="banner-text">
        <h2 class="t1">Riostox期权大师班</h2>
        <h2 class="t2">盈利交易大赛</h2>
        <p class="t3">活动日期：2018年12月26日00:00-2019年1月15日24:00</p>
      </div>
    </section>
    <section class="profit-main">
      <div class="rank-content">
        <rank-list class="w375" :tableName="tablePersonName" :rankData="rankPersonData">
          <div slot="title" class="title">个人手续费排名（1BTC奖金）</div>
          <div slot="tips" class="tips">
            <p>*截止 {{time}} (UTC+8) 排名</p>
            <p>*排行榜每个自然日（UTC + 8）进行一次更新</p>
          </div>
        </rank-list>
        <rank-list class="w375" :tableName="tableTeamName" :rankData="rankTeamData">
          <div slot="title" class="title">团队手续费排名（最高3BTC奖金）</div>
          <div slot="tips" class="tips">
            <p>*截止 {{time}} (UTC+8) 排名</p>
            <p>*排行榜每个自然日（UTC + 8）进行一次更新</p>
          </div>
        </rank-list>
      </div>
      <div class="combat-team">
        <h2>立即参赛领100AT</h2>
        <ul class="team-list">
          <li v-for="(item, index) in teamList" :key="index" @mouseleave="showEwmIndex = null">
            <div class="flipper" :class="{'hover': showEwmIndex === index}">
              <div class="front">
                <div class="team-box">
                  <p class="team-avatar">
                    <img :src="item.team_avatar" alt="">
                  </p>
                  <div class="team-desc">
                    <div class="team-name">{{item.team_name}}</div>
                    <div class="team-leader">队长：{{item.team_leader}}</div>
                  </div>
                </div>
                <div class="team-btn">
                  <a :href="item.team_url" target="_blank">立即注册</a>
                  <a href="javascript:;" @click="showEwm(index)">加入团队</a>
                </div>
              </div>
              <div class="back">
                <div class="ewm-box" v-if="item.team_wechat">
                  <img class="ewm-pic" :src="item.team_wechat" alt="">
                  <p class="ewm-text">微信群管理员</p>
                </div>
                <div class="ewm-box" v-if="item.team_tele">
                  <p class="tel-admin">Telegram admin:</p>
                  <p class="team-tele">{{item.team_tele}}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="profit-question">
        <div class="qa-box mgb40">
          <div class="question">特别提醒：</div>
          <p class="answer">各位投资者，平台特别提醒您，通过脚本实现自成交或两个账户的对应成交伪造交易额属于作弊行为，将不计入个人排名和团队排名。</p>
        </div>
        <div class="qa-box">
          <div class="question">如何参赛？</div>
          <p class="answer">1月14日24:00（UTC+8）在上方选择一个团队的投资大师邀请码注册Riostox交易所，即可加入该大师班（团队）并获得竞赛资格。参赛者需要重新注册一个Riostox账户，并完成实名认证。</p>
        </div>
        <div class="qa-box">
          <div class="question">参赛有何福利？</div>
          <p class="answer">每位参赛者可在注册并完成实名认证次日24:00 （UTC+8）前获得100AT的期权投资基金，100AT将直接转入参赛者的Riostox账户。</p>
        </div>
        <div class="qa-box">
          <div class="question">参赛奖励是什么？</div>
          <p class="answer">活跃排名奖：</p>
          <p class="answer">活动期间期权交易手续费排名第1名可获得1BTC奖励。</p>
          <p class="answer">排名依据：活动开始当天-1月15日24:00（UTC+8）所有期权交易所产生的手续费。</p>
        </div>
        <div class="qa-box">
          <div class="question">大师班奖励：</div>
          <dl class="qa-table">
            <dt>
              <p>排名</p>
              <p>奖励</p>
              <p>奖励分配</p>
            </dt>
            <dd>
              <p>第一名</p>
              <p>3BTC</p>
              <p>
                <span>1BTC由投资大师（团长）支配</span>
                <span>2BTC由团队内手续费排名前60名的用户按照交易手续费的贡献比例瓜分。 </span>
              </p>
            </dd>
            <dd>
              <p>第二名</p>
              <p>1BTC</p>
              <p>
                <span>0.5BTC由投资大师（团长）支配</span>
                <span>0.5BTC由团队内手续费排名前60名的用户按照交易手续费的贡献比例瓜分。 </span>
              </p>
            </dd>
            <dd>
              <p>第三名</p>
              <p>0.8BTC</p>
              <p>
                <span>0.4BTC由投资大师（团长）支配</span>
                <span>0.4BTC由团队内手续费排名前60名的用户按照交易手续费的贡献比例瓜分。 </span>
              </p>
            </dd>
            <dd>
              <p>四到十名</p>
              <p>0.4BTC</p>
              <p>
                <span>0.4BTC由投资大师（团长）支配</span>
              </p>
            </dd>
          </dl>
          <a class="rule" href="https://help.riostox.com/hc/zh-cn/articles/360021129911" target="_blank">《本次比赛详细规则》</a>
        </div>
      </div>
    </section>
    <section class="mask" v-if="showMask" @click="hideMask">
      <div class="mask-box" v-on:click.stop>
        <template v-if="maskEwm">
          <img class="mask-ewm" :src="maskEwm" alt="">
          <p class="mask-t1">微信群管理员</p>
          <p class="mask-t2">长按图片保存到相册</p>
        </template>
        <template v-if="maskTel">
          <p class="mask-admin">Telegram admin:</p>
          <p class="mask-tel">{{maskTel}}</p>
        </template>
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios'
import rankList from './rank-list'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tablePersonName: {
        rank: '序号',
        username: '账号',
        return: '手续费/USDT'
      },
      tableTeamName: {
        rank: '序号',
        username: '团队',
        return: '手续费/USDT'
      },
      rankPersonData: [],
      rankTeamData: [],
      teamList: [],
      time: '',
      showEwmIndex: null,
      showMask: false,
      maskEwm: '',
      maskTel: '',
    }
  },
  created() {
    axios.get('/portal/competition').then(res => {
      if (res.data) {
        this.rankPersonData = res.data.list
        this.rankTeamData = res.data.team_rank_list
        this.teamList = res.data.team_list
        this.time = res.data.time
      }
    })
  },
  mounted() {},
  components: {
    rankList
  },
  methods: {
    showEwm(index) {
      if (this.type === 'h5') {
        this.maskEwm = this.teamList[index].team_wechat
        this.maskTel = this.teamList[index].team_tele
        this.showMask = true
      } else {
        this.showEwmIndex = index
      }
    },
    hideMask() {
      this.showMask = false
      this.maskEwm = ''
      this.maskTel = ''
    }
  },
  computed: {
    ...mapGetters('viewport', ['type'])
  }
}
</script>

<style lang="scss" scoped>
//文本溢出省略号显示
@mixin ellipsis($line: 1) {
  @if $line == 1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @else {
    display: -webkit-box;
    -webkit-line-clamp: $line;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.ofh {
  overflow: hidden;
}

.w375 {
  width: 365px;
}

img {
  max-width: 100%;
}

.mgb40 {
  margin-bottom: 40px;
}

.banner {
  height: 392px;
  background: url('~@/assets/images/active/profit-competition/banner.png') center center no-repeat, #4b447a;
  background-size: cover;
  position: relative;
  .banner-text {
    position: absolute;
    top: 112px;
    left: 50%;
    z-index: $zindex-newspace;
    margin-left: -400px;
    line-height: 62px;
    color: #ffffff;
    .t1,
    .t2 {
      font-size: 46px;
    }
    .t3 {
      font-size: 18px;
      color: rgba($color: #ffffff, $alpha: 0.8);
    }
  }
}

.profit-main {
  width: 848px;
  margin: 30px auto;
  .rank-content {
    display: flex;
    justify-content: space-around;
    .title {
      margin: 22px 0;
      line-height: 24px;
      font-size: 16px;
      color: #333333;
    }
    .tips {
      margin: 12px auto 20px;
      // text-align: left;
      // text-indent: 14%;
    }
  }
  .combat-team {
    h2 {
      margin: 60px 0 40px;
      text-align: center;
      font-size: 24px;
      font-weight: normal;
      color: #333333;
    }
    .team-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 194px;
        height: 160px;
        margin-bottom: 25px;
        border-radius: 4px;
        background: #fafafa;
        .flipper {
          width: 100%;
          height: 100%;
          transition: 0.6s;
          transform-style: preserve-3d;
          position: relative;
          &.hover {
            transform: rotateY(180deg);
          }
          .front,
          .back {
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            &.front {
              padding: 15px 10px;
            }
            &.back {
              transform: rotateY(180deg);
            }
          }
        }
        .team-box {
          width: 100%;
          height: 94px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .team-avatar {
            width: 60px;
            height: 60px;
            border: 1px solid #eeeeee;
            border-radius: 100%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .team-desc {
            width: 98px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .team-name {
              line-height: 22px;
              font-size: 16px;
              color: #333333;

              @include ellipsis(2);
            }
            .team-leader {
              margin-top: 10px;
              line-height: 17px;
              font-size: 12px;
              color: rgba($color: #666666, $alpha: 0.8);

              @include ellipsis(2);
            }
          }
        }
        .team-btn {
          display: flex;
          justify-content: space-between;
          a {
            width: 74px;
            height: 22px;
            display: block;
            line-height: 22px;
            text-align: center;
            border: 1px solid #eaedf5;
            color: #5b7c91;
            font-size: 12px;
          }
        }
        .ewm-box {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .ewm-pic {
            width: 90px;
            height: 90px;
          }
          .ewm-text {
            margin-top: 8px;
            font-size: 12px;
            color: rgba($color: #666666, $alpha: 0.8);
          }
          .tel-admin {
            font-size: 12px;
            color: rgba($color: #666666, $alpha: 0.8);
          }
          .team-tele {
            margin-top: 10px;
            font-size: 16px;
            color: #666666;
          }
        }
      }
    }
  }
  .profit-question {
    padding: 0 20px;
    .qa-box {
      margin-top: 16px;
      color: #666666;
      .question {
        line-height: 44px;
        font-size: 18px;
        font-weight: 400;
      }
      .answer {
        line-height: 20px;
        font-size: 14px;
      }
      .qa-table {
        border-radius: 6px;
        border: 1px solid rgba($color: #666666, $alpha: 0.1);
        text-align: center;
        dt,
        dd {
          font-size: 18px;
          display: flex;
          align-items: stretch;
          border-bottom: 1px solid rgba($color: #666666, $alpha: 0.1);
          p {
            width: 140px;
            min-height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid rgba($color: #666666, $alpha: 0.1);
            &:last-child {
              width: 518px;
              padding-left: 40px;
              justify-content: flex-start;
              border-right: none;
            }
          }
        }
        dd {
          color: rgba(102, 102, 102, 0.7);
          &:last-child {
            border: none;
          }
          p:last-child {
            text-align: left;
            font-size: 14px;
            line-height: 18px;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
          }
        }
      }
      .rule {
        line-height: 50px;
        color: #5b7c91;
        font-size: 14px;
      }
    }
  }
}

@include screen-h5-new() {
  .w375 {
    width: unset;
  }
  .banner {
    height: 370px;
    background: url('~@/assets/images/active/profit-competition/banner-h5.png') center center no-repeat, #4b447a;
    background-size: cover;
    .banner-text {
      position: absolute;
      top: 24px;
      left: 0;
      right: 0;
      margin: auto;
      z-index: $zindex-newspace;
      line-height: 46px;
      text-align: center;
      .t1,
      .t2 {
        font-size: 36px;
      }
      .t3 {
        margin-top: 10px;
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
  .profit-main {
    width: 100%;
    margin: 0;
    .rank-content {
      display: unset;
      .rank-wraps:last-child {
        margin-top: 1px;
      }
    }
    .combat-team {
      h2 {
        margin: 60px 0 40px;
        text-align: center;
        font-size: 24px;
        font-weight: normal;
        color: #333333;
      }
      .team-list {
        min-width: 320px;
        margin: 0 2%;
        display: flex;
        align-items: center;
        li {
          width: 48%;
          height: 310px;
          margin-bottom: 4%;
          .flipper {
            width: 100%;
            height: 100%;
            transition: 0.6s;
            transform-style: preserve-3d;
            position: relative;
            &.hover {
              transform: rotateY(180deg);
            }
            .front,
            .back {
              width: 100%;
              height: 100%;
              backface-visibility: hidden;
              position: absolute;
              top: 0;
              left: 0;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              &.front {
                padding: 15px 10px;
              }
              &.back {
                transform: rotateY(180deg);
              }
            }
          }
          .team-box {
            width: 100%;
            height: 170px;
            // margin: 10px 0;
            margin-top: 14px;
            display: flex;
            flex-direction: column; // add
            align-items: center;
            // justify-content: space-around;
            .team-avatar {
              width: 75px;
              height: 75px;
            }
            .team-desc {
              width: 100%;
              height: 90px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              text-align: center;
              .team-name {
                line-height: 22px;
                font-size: 16px;
                color: #333333;

                @include ellipsis(2);
              }
              .team-leader {
                margin-top: 4px;
                line-height: 17px;
                font-size: 12px;
                color: rgba($color: #666666, $alpha: 0.8);

                @include ellipsis(2);
              }
            }
          }
          .team-btn {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            a {
              width: 65%;
              height: 30px;
              display: block;
              line-height: 30px;
              font-size: 16px;
              &:first-child {
                margin-bottom: 15px;
              }
            }
          }
          .ewm-box {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .ewm-pic {
              width: 90px;
              height: 90px;
            }
            .ewm-text {
              margin-top: 8px;
              font-size: 12px;
              color: rgba($color: #666666, $alpha: 0.8);
            }
          }
        }
      }
    }
    .profit-question {
      padding: 0 6% 40px;
      margin-top: 40px;
      // margin-bottom: 20px;
      background: #fafafa;
      .qa-box {
        .question {
          font-size: 16px;
          line-height: 50px;
        }
        .answer {
          line-height: 24px;
          font-size: 12px;
        }
        &:last-child {
          .question {
            text-align: center;
          }
        }
        .qa-table {
          background: #ffffff;
          dt,
          dd {
            font-size: 14px;
            p {
              width: 140px;
              &:last-child {
                padding: 10px;
              }
            }
          }
          dt {
            p:last-child {
              justify-content: center;
            }
          }
          dd {
            font-size: 12px;
            p:last-child {
              font-size: 12px;
            }
          }
        }
      }
    }
  }

  .mask {
    width: 100%;
    height: 100%;
    display: block;
    background: rgba($color: #000000, $alpha: 0.6);
    position: fixed;
    z-index: $zindex-modal-mask;
    top: 0;
    left: 0;
    .mask-box {
      width: 300px;
      height: 300px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      z-index: $zindex-modal;
      background: #ffffff;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      user-select: none;
      .mask-ewm {
        width: 188px;
        height: 188px;
      }
      .mask-t1 {
        margin: 16px 0 4px;
        line-height: 18px;
        font-size: 12px;
        color: rgba($color: #333333, $alpha: 0.8);
      }
      .mask-t2 {
        line-height: 20px;
        font-size: 14px;
        color: rgba($color: #333333, $alpha: 0.8);
      }
      .mask-admin,
      .mask-tel {
        font-size: 18px;
        color: rgba($color: #333333, $alpha: 0.8);
        &.mask-tel {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
