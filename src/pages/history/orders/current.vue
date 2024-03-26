<template>
  <table-tpl :table-data="allOrders" :is-filter="false" :is-page="false">
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
            <div :class="['side', scope.row.kind]">
              <span
                class="type kind"
              >{{scope.row.kind==='bid'?$t('m.exchange.buy'):$t('m.exchange.sell')}}</span>
              <span class="type">{{scope.row.ord_type==='limit'?$t('m.exchange.limit'):$t('m.exchange.market')}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="idx === headData.length - 1"
          :key="`head-${idx}`"
          :width="head.width"
        >
          <template slot="header" slot-scope="scope">
            <a
              class="cancel-all"
              @click.prevent="cancelAll"
              :key="scope.$index"
            >{{$t('m.exchange.cancelAll')}}</a>
          </template>
          <template slot-scope="scope">
            <a
              href="javascript:;"
              class="cancel"
              @click="cancel(scope.row.id)"
            >{{$t('m.exchange.cancel')}}</a>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="`head-${idx}`"
          :prop="head.prop"
          :label="head.label"
          :width="head.width"
        />
        {{idx}}
      </template>
    </template>
  </table-tpl>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TableTpl from '../table-template'
export default {
  components: {
    TableTpl,
  },

  data() {
    return {
      headData: [
        {
          prop: 'kind',
          label: this.$t('m.exchange.slide'),
        },
        {
          prop: 'marketName',
          label: this.$t('m.exchange.pair'),
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
          prop: 'executed_volume',
          label: this.$t('m.exchange.executed'),
        },
        {
          prop: 'remaining_volume',
          label: this.$t('m.exchange.unexecuted'),
        },
        {
          prop: 'date',
          label: this.$t('m.exchange.date'),
        },
        {
          prop: '',
          label: 'cancel',
        },
      ],
    }
  },
  computed: {
    ...mapGetters('openOrders', ['allOrders']),
    ...mapGetters('currentUser', ['isLogin']),
  },
  methods: {
    ...mapActions('openOrders', ['getOrders', 'cancelOrder', 'clearOrder']),
    async cancelAll() {
      if (this.list.length === 0) return false
      const resp = await this.clearOrder()
      const result = resp && resp.data && resp.data.clearOrder
      if (result && result[0].id) {
        this.$notify.success(this.$t('m.successMessage.cancelSuccess'))
      } else {
        this.$notify.error(this.$t('m.exchange.cancelFailed'))
      }
    },
    async cancel(id) {
      const resp = await this.cancelOrder(id)
      const result = resp && resp.data && resp.data.cancelOrder && resp.data.cancelOrder.id
      if (result) {
        this.$notify.success(this.$t('m.successMessage.cancelSuccess'))
      } else {
        this.$notify.error(this.$t('m.exchange.cancelFailed'))
      }
    },
  },
  watch: {
    isLogin() {
      this.getOrders()
    },
  },
  mounted() {
    if (this.isLogin) {
      this.getOrders()
    }
  },
}
</script>

<style lang="scss" scoped>
.history-table-wrap {
  .side {
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
  .cancel {
    padding: 0 10px;
    border-width: 1px;
    border-style: solid;
    border-radius: 2px;

    @include themify($themes) {
      color: themed('textColor6');
      border-color: themed('textColor9');
    }
    &:hover {
      @include themify($themes) {
        color: themed('textColor3');
        border-color: themed('textColor3');
      }
    }
  }
  .cancel-all {
    cursor: pointer;
  }
}
</style>
