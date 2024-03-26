<template>
  <table-tpl
    :table-data="allOrders"
    :is-side="false"
    :is-export="false"
    :page-meta="orderMeta"
    @page-change="getHistoryData"
    @search="searchHistoryData"
  >
    <template slot="table-list">
      <template v-for="(head,idx) in headData">
        <el-table-column
          v-if="idx === 0"
          :key="`head-${idx}`"
          :prop="head.prop"
          :label="head.label"
          :width="head.width"
        >
          <template slot-scope="scope">
            <div :class="['side', scope.row.side]">
              <span
                class="type kind"
              >{{scope.row.side==='bid'?$t('m.exchange.buy'):$t('m.exchange.sell')}}</span>
              <span class="type">{{$t('m.exchange.stopLimit')}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="idx === headData.length - 1"
          :key="`head-${idx}`"
          :prop="head.prop"
          :label="head.label"
          :width="head.width"
        >
          <template slot-scope="scope">
            <span>{{scope.row.state==3?$t('m.exchange.cancelled'):formatReason(scope.row.reason)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="`head-${idx}`"
          :prop="head.prop"
          :label="head.label"
          :width="head.width"
        />
      </template>
    </template>
  </table-tpl>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import dayjs from 'dayjs'
import TableTpl from '../table-template'
export default {
  components: {
    TableTpl,
  },
  data() {
    return {
      headData: [
        {
          prop: 'side',
          label: this.$t('m.exchange.slide'),
        },
        {
          prop: 'marketName',
          label: this.$t('m.exchange.pair'),
        },
        {
          prop: 'trigger_price',
          label: this.$t('m.exchange.triggerConditions'),
          width: 140,
        },
        {
          prop: 'price',
          label: this.$t('m.exchange.price'),
        },
        {
          prop: 'volume',
          label: this.$t('m.exchange.amount'),
        },
        {
          prop: 'total',
          label: this.$t('m.exchange.conditionVolume'),
        },
        {
          prop: 'date',
          label: this.$t('m.exchange.date'),
        },
        {
          prop: 'state',
          label: this.$t('m.exchange.status'),
          width: 180,
        },
      ],
      begin_time: undefined,
      end_time: undefined,
    }
  },
  computed: {
    ...mapGetters('conditionHistory', ['allOrders']),
    ...mapGetters('currentUser', ['isLogin']),
    ...mapState('conditionHistory', ['orderMeta']),
  },
  methods: {
    ...mapActions('conditionHistory', ['getConditionHistory']),
    formatReason(code) {
      return (
        {
          '0': this.$t('m.exchange.succeeded'),
          '5001': this.$t('m.exchange.failed'),
          '5002': this.$t('m.exchange.failedSpread'),
          '5003': this.$t('m.exchange.failedHold'),
        }[code] || this.$t('m.exchange.failed')
      )
    },
    getHistoryData(page = 1, page_size = 20) {
      this.getConditionHistory({ page, page_size, begin_time: this.begin_time, end_time: this.end_time })
    },
    searchHistoryData(params) {
      const { to, from } = params
      let begin = undefined
      let end = undefined
      if (from) {
        begin = dayjs(from).unix()
      }
      if (to) {
        end = dayjs(to).unix()
      }
      this.begin_time = begin
      this.end_time = end
      this.getHistoryData()
    },
  },
  watch: {
    isLogin() {
      this.getHistoryData()
    },
  },
  mounted() {
    if (this.isLogin) {
      this.getHistoryData()
    }
  },
}
</script>

<style lang="scss" scoped>
.side {
  font-size: 12px;
  &.ask {
    @include themify($themes) {
      color: themed('sellColor');
    }
  }
  &.bid {
    @include themify($themes) {
      color: themed('buyColor');
    }
  }
  .kind {
    position: relative;
    margin-right: 10px;
    &:after {
      content: '';
      display: inline-block;
      height: 14px;
      width: 1px;
      position: absolute;
      top: 2px;
      right: -8px;

      @include themify($themes) {
        background-color: themed('lineBorderColorD8');
      }
    }
  }
}
</style>
