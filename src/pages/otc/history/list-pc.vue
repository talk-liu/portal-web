<template>
  <section class="pc-wraps">
    <h3 class="title">Transaction History</h3>
    <dl class="history-list">
      <dt>
        <div class="cell">Payment ID</div>
        <div class="cell">Date</div>
        <div class="cell">Status</div>
        <div class="cell">Cryptocurrencies</div>
        <div class="cell">Purchase Amount</div>
        <div class="cell">Payment Currencies</div>
        <div class="cell">Payment Amount</div>
        <div class="cell">Fee</div>
      </dt>
      <dd v-for="(item, index) in historyList" :key="index">
        <div class="cell">{{item.paymentId}}</div>
        <div class="cell">{{item.date}}</div>
        <div class="cell">{{item.status}}</div>
        <div class="cell">{{item.cryptocurrencies}}</div>
        <div class="cell">{{item.purchaseAmount}}</div>
        <div class="cell">{{item.paymentCurrencies}}</div>
        <div class="cell">{{item.paymentAmount}}</div>
        <div class="cell">{{item.fee}} {{item.paymentCurrencies}}</div>
      </dd>
      <dd v-if="historyList.length < 1">no Data</dd>
    </dl>
    <v-pagination v-if="pageMeta.total_count > pageMeta.page_size" :total="pageMeta.total_count" :page-size="pageMeta.page_size" :pager-count="pageMeta.total_pages" @pagechange="pagechange"></v-pagination>
  </section>
</template>
<script>
import vPagination from '@/components/pagination'
import historyData from './mixins/historyData'
export default {
  mixins: [historyData],
  components: {
    vPagination
  }
}
</script>
<style lang="scss" scoped>
.pc-wraps {
  width: 1200px;
  margin: 0 auto;
  min-height: 400px;
  .title {
    height: 28px;
    line-height: 28px;
    margin: 50px 0 24px;
    color: #333333;
    font-size: 18px;
  }
}

.history-list {
  margin-bottom: 30px;
  dt,
  dd {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    .cell:nth-child(1) {
      width: 285px;
      padding-left: 10px;
      padding-right: 35px;
      line-height: 16px;
      word-break: break-all;
    }
    .cell:nth-child(2) {
      width: 145px;
    }
    .cell:nth-child(3) {
      width: 130px;
    }
    .cell:nth-child(4) {
      width: 130px;
    }
    .cell:nth-child(5) {
      width: 130px;
    }
    .cell:nth-child(6) {
      width: 140px;
    }
    .cell:nth-child(7) {
      width: 130px;
    }
    .cell:nth-child(8) {
      width: 110px;
    }
  }
  dt {
    background: #fafafa;
    color: #333333;
    font-size: 13px;
  }
  dd {
    color: #666666;
    font-size: 12px;
    background: #ffffff;
    border-bottom: 1px solid #e6e6e6;
    &:hover {
      background: #fafafa;
    }
  }
}
</style>
