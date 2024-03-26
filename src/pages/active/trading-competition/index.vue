<template>
  <div class="trading-competition">
    <section class="banner">
      <div class="content ofh">
        <div class="banner-text">
          <p class="time show-h5">{{langText.bannerText.time}}</p>
          <p class="title">{{langText.bannerText.title}}</p>
          <p class="desc">{{langText.bannerText.desc}}</p>
          <p class="time hide-h5">{{langText.bannerText.time}}</p>
        </div>
      </div>
    </section>
    <section class="profitRate">
      <div class="content ofh">
        <p class="p1">{{langText.profitRate.p1}}</p>
        <div class="profit-box">
          <p class="title">{{langText.profitRate.title}}</p>
          <p class="desc">{{langText.profitRate.desc}}</p>
          <ul class="list">
            <li v-for="(item, index) in langText.profitRate.list" :key="index">{{item}}</li>
          </ul>
        </div>
      </div>
    </section>
    <section class="rewward">
      <div class="content ofh">
        <div class="title">{{langText.rewward.title}}</div>
        <a class="toTrade hide-h5" href="https://riostox.com/pro/">{{langText.rewward.toTrade}}></a>
        <dl class="dlist">
          <dt>
            <p>{{langText.rewward.rank}}</p>
            <p>{{langText.rewward.prize}}</p>
          </dt>
          <dd>
            <p>1</p>
            <p>2000</p>
          </dd>
          <dd>
            <p>2</p>
            <p>1000</p>
          </dd>
          <dd>
            <p>3-10</p>
            <p>{{langText.rewward.avage(1000)}}</p>
          </dd>
          <dd>
            <p>11-20</p>
            <p>{{langText.rewward.avage(500)}}</p>
          </dd>
        </dl>
        <a href="https://riostox.com/pro/" class="btn-totrade show-h5">{{langText.rewward.toTrade}}</a>
      </div>
    </section>
    <section class="rankingList">
      <div class="content ofh">
        <div class="rank-box ofh">
          <div class="title">*{{langText.rankingList.title(`${dateTime} (UTC+8)`)}}</div>
          <dl class="ranklist">
            <dt>
              <p>{{langText.rankingList.rank}}</p>
              <p>{{langText.rankingList.username}}</p>
              <p>{{langText.rankingList.return}}</p>
            </dt>
            <dd v-for="(item, index) in rankData" :key="index">
              <p>{{item.rank}}</p>
              <p>{{item.email}}</p>
              <p>{{item.profit_rate}}</p>
            </dd>
          </dl>
          <div class="tips">*{{langText.rankingList.tips}}</div>
        </div>
        <div class="notice-box">
          <h3 class="title">{{langText.notice.title}}</h3>
          <ul class="notic-list">
            <li v-for="(item, index) in langText.notice.list" :key="index">{{item}}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
Vue.use(axios)
import dayjs from 'dayjs'
import enLang from './lang/en.js'
import zhLang from './lang/zh-CN.js'
import koLang from './lang/ko.js'
export default {
  data() {
    return {
      dateTime : '',
      rankData: [],
    }
  },
  created() {
    axios.get('/portal/competition').then(res => {
      if (res.data) {
        if (this.$fifth.lang == 'en') {
          let now = new Date(res.data.time)
          this.dateTime = `${now.getHours()}, Dec ${now.getDate()}`
        } else {
          this.dateTime = dayjs(res.data.time).format('YYYY.MM.DD HH:00')
        }
        this.rankData = res.data.list
      }
    })
  },
  computed: {
    langText() {
      if (this.$fifth.lang === 'en') {
        return enLang
      } else if (this.$fifth.lang === 'zh-CN') {
        return zhLang
      } else if (this.$fifth.lang === 'ko') {
        return koLang
      } else {
        return enLang
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ofh {
  overflow: hidden;
}

.show-h5 {
  display: none;
}

.hide-h5 {
  display: show;
}

.trading-competition {
  .content {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
  }
  .banner {
    height: 392px;
    background: url('~@/assets/images/active/trading-competition/banner.png') center center no-repeat;
    background-size: cover;
    .banner-text {
      margin-top: 120px;
      margin-left: 165px;
      .title {
        color: #ffffff;
        font-size: 46px;
      }
      .desc {
        margin-top: 20px;
        color: rgba(255, 255, 255, 0.7);
        font-size: 24px;
        line-height: 33px;
      }
      .time {
        line-height: 21px;
        margin-top: 46px;
        font-size: 15px;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
  .profitRate {
    width: 100%;
    min-height: 336px;
    text-align: center;
    color: #666666;
    .p1 {
      margin: 50px 0 34px;
      line-height: 16px;
      font-size: 14px;
    }
    .title {
      font-size: 24px;
      color: #333333;
    }
    .desc {
      line-height: 20px;
      margin-top: 28px;
      font-size: 16px;
    }
    .list {
      display: inline-block;
      margin-top: 28px;
      margin-bottom: 50px;
      li {
        text-align: left;
        list-style-type: disc;
        margin-left: 16px;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
  .rewward {
    height: 408px;
    background: url('~@/assets/images/active/trading-competition/bg.png') center center no-repeat;
    background-size: cover;
    text-align: center;
    .title {
      margin: 40px 0 10px;
      line-height: 30px;
      font-size: 24px;
      color: #ffffff;
    }
    .toTrade {
      display: block;
      margin: 0 auto;
      font-size: 18px;
      line-height: 20px;
      color: #e99e80;
    }
    .dlist {
      width: 750px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      margin: 20px auto 0;
      dt,
      dd {
        height: 50px;
        line-height: 50px;
        &:not(:last-child) {
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        p {
          float: left;
          width: 50%;
          &:not(:last-child) {
            box-shadow: 1px 0 rgba(255, 255, 255, 0.2);
          }
        }
      }
      dt {
        color: #ffffff;
      }
      dd {
        p {
          color: rgba($color: #ffffff, $alpha: 0.9);
        }
      }
    }
  }
  .rankingList {
    text-align: center;
    .rank-box {
      width: 750px;
      margin: 50px auto;
      border-radius: 4px;
      border: solid 1px #eaedf5;
      .title {
        line-height: 18px;
        margin: 24px 0 18px;
        font-size: 12px;
        color: #666666;
      }
      .ranklist {
        width: 700px;
        margin: 0 auto;
        border-top: 1px solid #f8f8fb;
        dt,
        dd {
          p {
            width: 33.33%;
            float: left;
          }
        }
        dt {
          height: 44px;
          line-height: 44px;
          font-size: 12px;
          color: #777777;
        }
        dd {
          height: 34px;
          line-height: 34px;
          font-size: 13px;
          color: #666666;
          &:nth-child(2n) {
            background: #fafafa;
          }
        }
      }
      .tips {
        line-height: 20px;
        margin: 30px auto 18px;
        font-size: 12px;
        color: #666666;
      }
    }
    .notice-box {
      color: #666666;
      margin: 50px 0;
      .title {
        font-size: 18px;
        font-weight: 400;
      }
      .notic-list {
        width: 750px;
        margin-top: 28px;
        display: inline-block;
        text-align: left;
        li {
          list-style: decimal;
          // list-style-position: inside;
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 4px;
          margin-left: 10px;
        }
      }
    }
  }
}

@include screen-h5-new() {
  .show-h5 {
    display: block;
  }
  .hide-h5 {
    display: none;
  }
  .trading-competition {
    .content {
      width: 100%;
    }
    .banner {
      height: 370px;
      background: url('~@/assets/images/active/trading-competition/banner-h5.png') center center no-repeat;
      background-size: cover;
      .banner-text {
        max-width: 90%;
        text-align: center;
        margin: 0 auto;
        .title {
          margin-top: 17px;
          font-size: 32px;
        }
        .desc {
          margin-top: 12px;
          font-size: 16px;
          line-height: unset;
        }
        .time {
          line-height: 18px;
          margin-top: 40px;
          font-size: 12px;
        }
      }
    }
    .profitRate {
      min-height: unset;
      .p1 {
        width: 86%;
        margin: 33px auto 12px;
        line-height: 16px;
        font-size: 12px;
      }
      .profit-box {
        background: #fafafa;
        width: 90%;
        padding: 20px 14px 0;
        margin: 0 auto 50px;
        .title {
          font-size: 16px;
          height: 56px;
          line-height: 56px;
          border-bottom: 1px solid #d8d8d8;
        }
        .desc {
          text-align: left;
          margin-top: 16px;
        }
        .list {
          margin-top: 24px;
          li {
            font-size: 14px;
            margin-bottom: 6px;
            line-height: 20px;
          }
        }
      }
    }
    .rewward {
      height: unset;
      background: url('~@/assets/images/active/trading-competition/bg.png') center center no-repeat;
      background-size: cover;
      .title {
        margin: 22px 0 18px;
        line-height: unset;
        font-size: 16px;
      }
      .toTrade {
        display: none;
      }
      .btn-totrade {
        width: 76%;
        height: 30px;
        margin: 20px auto;
        line-height: 30px;
        text-align: center;
        color: #ffffff;
        background-image: linear-gradient(117deg, #9c5a4f 0%, #da9265 100%);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
        border: solid 0 #d88d5e;
      }
      .dlist {
        width: 76%;
        display: block;
        border: 1px solid rgba(255, 255, 255, 0.2);
        margin: 0 auto 0;
        dt,
        dd {
          font-size: 14px;
        }
      }
    }
    .rankingList {
      text-align: center;
      .rank-box {
        width: 100%;
        margin: 30px auto 0;
        border-radius: 4px;
        border: none;
        background: #fafafa;
        .title {
          line-height: 18px;
          margin: 20px 0;
          font-size: 12px;
        }
        .ranklist {
          width: 94%;
          margin: 0 auto;
          border-top: 1px solid #fefefe;
          dd {
            &:nth-child(2n) {
              background: #ffffff;
            }
          }
        }
        .tips {
          width: 94%;
          line-height: 20px;
          margin: 20px auto;
          font-size: 12px;
          color: #666666;
        }
      }
      .notice-box {
        color: #666666;
        margin: 30px 0 50px;
        .title {
          font-size: 16px;
          font-weight: 400;
        }
        .notic-list {
          width: 90%;
          margin: 20px auto 0;
          li {
            font-size: 12px;
            line-height: 18px;
            margin-bottom: 6px;
          }
        }
      }
    }
  }
}
</style>
