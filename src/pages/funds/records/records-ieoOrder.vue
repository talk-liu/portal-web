<template>
  <div class="ieoorder">
    <table-tpl :table-data="data" :page-meta="meta" >
      <template slot="table-list">
        <template v-for="(head,idx) in headData">
          <el-table-column
            v-if='idx===0'
            :key="`head-${idx}`"
            :prop="head.prop"
            :label="head.label"
            :width="head.width">
            <template slot-scope="scope">
              <span>{{ scope.row.ieoCode}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if='idx===1'
            :key="`head-${idx}`"
            :prop="head.prop"
            :label="head.label"
            :width="head.width">
            <template slot-scope="scope">
              <span>{{ scope.row.amount}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if='idx===2'
            :key="`head-${idx}`"
            :prop="head.prop"
            :label="head.label"
            :width="head.width">
            <template slot-scope="scope">
              <span>{{ scope.row.buyAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if='idx===3'
            :key="`head-${idx}`"
            :prop="head.prop"
            :label="head.label"
            :width="head.width">
            <template slot-scope="scope">
              <span>{{ scope.row.currencyAmount}}{{ scope.row.payUnit }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if='idx===4'
            :key="`head-${idx}`"
            :prop="head.prop"
            :label="head.label"
            :width="head.width">
            <template slot-scope="scope">
              <span>{{ scope.row.rewardAmount}}</span>
            </template>
          </el-table-column>
        </template>
      </template>
    </table-tpl>
  </div>
</template>

<script>
import TableTpl from './table-template'
export default {
  name: 'records-ieoOrder',
  components: {
    TableTpl
  },
  props: ['data', 'meta', 'btnNumber'],
  data() {
    return {
      headData: [
        {
          prop: 'currency',
          label: this.$t('m.funds.historyRecords.currency'),
        },
        {
          prop: 'amount',
          label: this.$t('m.funds.historyRecords.totalAmount'),
        },
        {
          prop: 'buyAmount',
          label: this.$t('m.funds.historyRecords.purchaseQuantity')
        },
        {
          prop: 'currencyAmount',
          label: this.$t('m.funds.historyRecords.purchasingPrice')
        },
        {
          prop: 'rewardAmount',
          label: this.$t('m.funds.historyRecords.rewardsNumber')
        },
      ],
    }
  },
}
</script>

