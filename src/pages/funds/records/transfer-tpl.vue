<template>
  <div class="records-table">
    <table-tpl :table-data="data" :page-meta="meta" @page-change="changePage">
      <template slot="table-list">
        <template v-for="(head,idx) in headData">
          <el-table-column
            v-if="idx === 3"
            :key="`head-${idx}`"
            :prop="head.prop"
            :label="head.label"
            :width="head.width">
            <template slot-scope="scope">
              <span>{{accountText[scope.row.from_account]}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="idx === 4"
            :key="`head-${idx}`"
            :prop="head.prop"
            :label="head.label"
            :width="head.width">
            <template slot-scope="scope">
              <span>{{accountText[scope.row.to_account]}}</span>
            </template>
          </el-table-column>
          <el-table-column
            :key="`head-${idx}`"
            :prop="head.prop"
            :label="head.label"
            :width="head.width"
            v-else
          />
        </template>
      </template>
    </table-tpl>
  </div>
</template>
<script>
import TableTpl from './table-template'
export default {
  components: {
    TableTpl
  },
  props: ['data', 'meta', 'btnNumber'],
  data() {
    return {
      accountText: {
        exchange_account: this.$t('m.funds.historyRecords.cryptocurrencyAccount'),
        option_account: this.$t('m.funds.historyRecords.optionsAccount')
      },
      headData: [
        {
          prop: 'date',
          label: this.$t('m.funds.historyRecords.time'),
        },
        {
          prop: 'currency',
          label: this.$t('m.funds.historyRecords.currency'),
        },
        {
          prop: 'amount',
          label: this.$t('m.funds.historyRecords.amount'),
        },
        {
          prop: 'from_account',
          label: this.$t('m.funds.historyRecords.rollOutSide'),
        },
        {
          prop: 'to_account',
          label: this.$t('m.funds.historyRecords.theTransferee'),
        },
        {
          prop: 'mark',
          label: this.$t('m.funds.historyRecords.notes'),
        },
      ],
    }
  },
  methods: {
    changePage(val) {
      this.$emit('change', val)
    },
  }
}
</script>
