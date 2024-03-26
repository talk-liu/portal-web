<template>
  <section class="h5-wraps">
    <h3 class="title">Transaction History</h3>
    <ul class="history-list">
      <li v-if="h5historyList.length === 0" class="noData">
        <img src="@/assets/images/otc/no-data.png" alt="">
        <p>no Data</p>
      </li>
      <li v-for="(item, index) in h5historyList" :key="index">
        <transition name="fade">
          <div v-if="showCopy && curCopy === index" class="copyNo">
            <p>{{item.paymentId}}</p>
            <button v-clipboard:copy="item.paymentId" v-clipboard:success="onCopy">Copy</button>
          </div>
        </transition>
        <div class="flex">
          <div class="wlTop">
            <p class="NO flex" @click="copyHandle(index)">
              <span>NO.{{item.paymentId}}</span>
              <img src="@/assets/images/otc/icon-h5-arrow.png" alt="">
            </p>
            <p class="date">{{item.date}}</p>
          </div>
          <div class="wrTop">
            <p class="process">{{item.status}}</p>
            <p class="fee">
              <span class="color7">Fee</span>
              <span>{{item.fee}} {{item.paymentCurrencies}}</span>
            </p>
          </div>
        </div>
        <div class="flex content1">
          <div class="wl">
            <p class="name">Cryptocurrencies</p>
            <p class="val">{{item.cryptocurrencies}}</p>
          </div>
          <div class="wr">
            <p class="name">Purchase Amount</p>
            <p class="val blod">{{item.purchaseAmount}}</p>
          </div>
        </div>
        <div class="flex content2">
          <div class="wl">
            <p class="name">Payment Currencies</p>
            <p class="val">{{item.paymentCurrencies}}</p>
          </div>
          <div class="wr">
            <p class="name">Payment Amount</p>
            <p class="val blod">{{item.paymentAmount}}</p>
          </div>
        </div>
      </li>
    </ul>
    <a v-if="pageMeta.total_count > pageMeta.page_size && pageMeta.page < pageMeta.total_pages" href="javascript:;" class="more" @click="getPaymentOrders({page: page++})">Load More</a>
  </section>
</template>
<script>
import historyData from './mixins/historyData'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

export default {
  mixins: [historyData],
  data() {
    return {
      page: 1,
      curH5List: [],
      showCopy: false,
      curCopy: 0
    }
  },
  computed: {
    h5historyList() {
      this.curH5List = [...this.curH5List, ...this.historyList]
      return this.curH5List
    }
  },
  methods: {
    onCopy() {
      this.showCopy = false
    },
    copyHandle(i) {
      if (this.curCopy == i) {
        this.showCopy = !this.showCopy
      } else {
        this.showCopy = true
        this.curCopy = i
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.h5-wraps {
  width: 92%;
  margin: 0 auto;
  .title {
    margin: 10px 0;
    line-height: 22px;
    color: #333333;
    font-size: 16px;
  }
  .history-list {
    li {
      padding: 4%;
      position: relative;
      background: #f7f7f7;
      &:not(:last-child) {
        margin-bottom: 4%;
      }
      .wlTop {
        width: 60%;
        position: relative;
      }
      .wrTop {
        width: 40%;
      }
      .wl {
        width: 45%;
      }
      .wr {
        width: 55%;
      }
      .content1 {
        margin-top: 19px;
        padding-bottom: 10px;
        box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
      }
      .content2 {
        margin-top: 15px;
      }
      .NO {
        height: 18px;
        font-size: 17px;
        color: #333333;
        font-weight: bold;
        align-items: center;
        user-select: none;
        span {
          width: 90%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        img {
          width: 14px;
          height: 14px;
        }
      }
      .copyNo {
        width: 100%;
        height: 35px;
        padding: 0 4%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        left: 0;
        top: 40px;
        z-index: $zindex-newspace;
        background: #ffffff;
        box-shadow: 0 3px 14px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        transition: all 0.3s ease-in-out;
        button {
          width: 50px;
          height: 20px;
          // line-height: 20px;
          display: block;
          border-radius: 2px;
          text-align: center;
          color: #666666;
          border: 1px solid rgba(102, 102, 102, 1);
          background: #ffffff;
          outline: none;
        }
        p {
          width: 100%;
          height: 35px;
          line-height: 35px;
        }
      }
      .process {
        height: 18px;
        line-height: 18px;
        font-size: 12px;
        color: #333333;
        text-align: right;
      }
      .date,
      .fee {
        font-size: 12px;
        line-height: 15px;
        margin-top: 5px;
        &.fee {
          text-align: right;
          .color7 {
            color: #777777;
          }
        }
      }
      .name {
        line-height: 14px;
        font-size: 11px;
        color: #777777;
      }
      .val {
        margin-top: 6px;
        font-size: 13px;
        color: #333333;
      }
      .blod {
        font-weight: bold;
      }
    }
    .noData {
      text-align: center;
      background: #ffffff;
      img {
        width: 180px;
        height: 180px;
        display: inline-block;
      }
      p {
        line-height: 20px;
        font-weight: normal;
        color: #777777;
      }
    }
  }
  .more {
    width: 100%;
    height: 30px;
    display: block;
    margin: 8% auto 0;
    line-height: 30px;
    text-align: center;
    color: #4c84ff;
    border: 1px solid #bbbbbb;
    border-radius: 2px;
    font-size: 13px;
  }
}
</style>
