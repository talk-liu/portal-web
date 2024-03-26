<template>
  <div class="records-table">
    <table-tpl :table-data="data" :page-meta="meta" @page-change="changePage">
      <template slot="table-list">
        <template v-for="(head,idx) in headData">
          <el-table-column
            v-if="idx === 0"
            :key="`head-${idx}`"
            :prop="head.prop"
            :label="head.label"
            :width="head.width">
            <template slot-scope="scope">
              <span>{{state[scope.row.state]}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="idx === headData.length - 1"
            :key="`head-${idx}`"
            :prop="head.prop"
            :label="head.label"
            :width="head.width">
            <template slot-scope="scope">
              <div class="info-column" v-if="btnNumber === 0">
                <p class="txid">
                  <span>Txid</span>
                  <a :href="scope.row.blockchain_url" target="_blank" class="block-chain-url" v-if="scope.row.deposit_type === 'deposit_chain'">
                    {{scope.row.txid}}
                  </a>
                  <span v-else>
                    {{scope.row.txid}}
                  </span>
                  <span v-if="scope.row.state === 'submitted'" class="funds-confirm">{{$t('m.funds.confirmations')}}</span>
                  <span v-if="scope.row.state === 'submitted'">({{scope.row.confirmations || 0}}/{{maxConfirm(scope.row)}})</span>
                </p>
              </div>
              <div class="info-column" v-if="btnNumber === 1">
                <div>
                  <p>
                    <span>
                      {{$t('m.funds.historyRecords.address')}}
                    </span>
                    {{scope.row.fund_uid}}
                  </p>
                  <p v-if="scope.row.showTxid" class="txid">
                    <span>Txid</span>
                    <a :href="scope.row.blockchain_url" target="_blank">
                      {{scope.row.txid}}
                    </a>
                  </p>
                </div>
                <span v-if="scope.row.txid" @click="updateShowTx(scope.$index)">
                  <i class="el-icon-arrow-down" v-if="!scope.row.showTxid"></i>
                  <i v-else class="el-icon-arrow-up"></i>
                </span>
              </div>
              <div class="info-column" v-if="btnNumber === 3">
                {{renderExtroInfo(scope.row.extra_info)}}
              </div>
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
import recordsTplMixin from './records-tpl-mixin'
export default {
  components: {
    TableTpl
  },
  mixins: [recordsTplMixin],
  data() {
    return {
      headData: [
        {
          prop: 'state',
          label: this.$t('m.funds.historyRecords.status'),
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
          prop: 'date',
          label: this.$t('m.funds.historyRecords.time'),
        },
        {
          prop: '',
          label: this.$t('m.funds.historyRecords.info'),
          width: 500
        },
      ],
    }
  },
  watch: {
    btnNumber(val) {
      if (val === 3) {
        this.getDepositRemarks()
      }
    }
  },
  methods: {
    updateShowTx(index) {
      this.data[index].showTxid = !this.data[index].showTxid
    },
    changePage(val) {
      this.$emit('change', val)
    },
  }
}
</script>

<style lang="scss" scoped>
  .records-table {
    .info-column {
      .txid {
        color: #999999;
        a {
          color: #999999;
        }
      }
    }
  }
</style>

