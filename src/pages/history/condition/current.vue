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
          :width="head.width"
        >
          <template slot="header" slot-scope="scope">
            <a class="cancel-all" @click.prevent="cancelAll" :key="scope.$index">{{$t('m.exchange.cancelAll')}}</a>
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
          prop: '',
          label: 'cancel',
        },
      ],
    }
  },
  computed: {
    ...mapGetters('conditionCurrent', ['allOrders']),
    ...mapGetters('currentUser', ['isLogin']),
  },
  methods: {
    ...mapActions('conditionCurrent', ['getConditionCurrent', 'conditionCancel', 'clearCondition']),
    async cancel(id) {
      const resp = await this.conditionCancel(id)
      const result = resp && resp.data && resp.data.conditionCancel && resp.data.conditionCancel.result
      if (result === 'success') {
        this.$notify.success(this.$t('m.successMessage.cancelSuccess'))
      } else {
        this.$notify.error(this.$t('m.exchange.cancelFailed'))
      }
    },
    async cancelAll() {
      if (this.allOrders.length === 0) return false
      const resp = await this.clearCondition()
      const result = resp && resp.data && resp.data.conditionClear && resp.data.conditionClear.result
      if (result === 'success') {
        this.$notify.success(this.$t('m.successMessage.cancelSuccess'))
      } else {
        this.$notify.error(this.$t('m.exchange.cancelFailed'))
      }
    },
  },
  watch: {
    isLogin() {
      this.getConditionCurrent()
    },
  },
  mounted() {
    if (this.isLogin) {
      this.getConditionCurrent()
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
