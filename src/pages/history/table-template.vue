<template>
  <div class="history-table-wrap">
    <div class="filters" v-if="isFilter">
      <template v-if="isTime">
        <span class="time">{{$t('m.historyOrders.time')}}</span>
        <el-date-picker
          :clearable="false"
          prefix-icon="el-custom-icon"
          v-model="from"
          type="datetime"
          format="yyyy-MM-dd"
          placeholder="yyyy-mm-dd"
        ></el-date-picker>
        <span class="time-line">-</span>
        <el-date-picker
          :clearable="false"
          prefix-icon="el-custom-icon"
          v-model="to"
          type="datetime"
          format="yyyy-MM-dd"
          placeholder="yyyy-mm-dd"
        ></el-date-picker>
      </template>
      <template v-if="isMarket">
        <label class="label">{{$t('m.historyOrders.pair')}}</label>
        <div class="item-select">
          <v-drop-down v-model="baseUnit" type="labelSelect">
            <template slot="list">
              <li @click="selectBaseUnit($t('m.historyOrders.all'))">{{$t('m.historyOrders.all')}}</li>
              <li
                v-for="(item,index) in tickerInfo.baseUnitList"
                :key="index"
                @click="selectBaseUnit(item)"
              >{{item | upperCase}}</li>
            </template>
          </v-drop-down>
        </div>
        <span class="line">/</span>
        <div class="item-select">
          <v-drop-down v-model="quoteUnit" type="labelSelect">
            <template slot="list">
              <li @click="selectQuoteUnit($t('m.historyOrders.all'))">{{$t('m.historyOrders.all')}}</li>
              <li
                v-for="(item,index) in quoteUnitList"
                :key="index"
                @click="selectQuoteUnit(item)"
              >{{item | upperCase}}</li>
            </template>
          </v-drop-down>
        </div>
      </template>
      <template v-if="isSide">
        <label class="label">{{$t('m.historyOrders.slide')}}</label>
        <div class="item-select">
          <v-drop-down type="labelSelect" v-model="sideTypeLabel">
            <template slot="list">
              <li @click="selectSideType($t('m.historyOrders.all'))">{{$t('m.historyOrders.all')}}</li>
              <li
                @click="selectSideType($t('m.historyOrders.buy'), 'bid')"
              >{{$t('m.historyOrders.buy')}}</li>
              <li
                @click="selectSideType($t('m.historyOrders.sell'),'ask')"
              >{{$t('m.historyOrders.sell')}}</li>
            </template>
          </v-drop-down>
        </div>
      </template>
      <div class="btn-group">
        <button class="btn" @click="submit">{{$t('m.historyOrders.search')}}</button>
        <button class="btn" @click="reset">{{$t('m.historyOrders.reset')}}</button>
      </div>
      <span class="export-history" @click="exportDialog = true" v-if="isExport">
        <span class="icon"></span>
        <span>{{$t('m.historyOrders.export')}}</span>
        <a href id="exportTime"></a>
      </span>
    </div>
    <el-table ref="table" :data="tableData" @cell-click="cellHandleClick" style="width: 100%;">
      <slot name="table-list"></slot>
    </el-table>
    <div class="page" v-if="isPage && pageMeta.total_count > pageMeta.page_size">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pageMeta.total_count"
        :page-size="pageMeta.page_size"
        :current-page="pageMeta.page"
        @current-change="changePage"
      ></el-pagination>
    </div>
    <v-dialog :visible="exportDialog">
      <v-box
        :title="$t('m.historyOrders.exportHistory')"
        height="450"
        :showClose="true"
        @close="exportDialog=false"
      >
        <div class="box-content">
          <div class="radio-title">{{$t('m.historyOrders.dateRange')}}：</div>
          <div class="radio-group clearfix">
            <v-radio
              :label="exportTime === 0"
              @click="selectExportTime(0)"
              class="item"
            >{{$t('m.historyOrders.last24hours')}}</v-radio>
            <v-radio
              :label="exportTime === 1"
              @click="selectExportTime(1)"
              class="item"
            >{{$t('m.historyOrders.yesterday')}}</v-radio>

            <v-radio
              :label="exportTime === 2"
              @click="selectExportTime(2)"
              class="item"
            >{{$t('m.historyOrders.last2weeks')}}</v-radio>
            <v-radio
              :label="exportTime === 3"
              @click="selectExportTime(3)"
              class="item"
            >{{$t('m.historyOrders.monthToDay')}}</v-radio>

            <v-radio
              :label="exportTime === 4"
              @click="selectExportTime(4)"
              class="item"
            >{{$t('m.historyOrders.pastMonth')}}</v-radio>
            <v-radio
              :label="exportTime === 5"
              @click="selectExportTime(5)"
              class="item"
            >{{$t('m.historyOrders.past3months')}}</v-radio>
          </div>
          <div class="custom-group">
            <v-radio
              :label="exportTime === 6"
              @click="selectExportTime(6)"
            >{{$t('m.historyOrders.custom')}}（{{$t('m.historyOrders.maxMonth')}}）</v-radio>
            <el-date-picker
              :disabled="exportTime !== 6"
              ref="datetimerange"
              :picker-options="options"
              class="datetimerange"
              :clearable="false"
              prefix-icon="el-custom-icon"
              format="yyyy-MM-dd"
              v-model="rangeTime"
              type="datetimerange"
              range-separator="~"
              :start-placeholder="$t('m.historyOrders.startDate')"
              :end-placeholder="$t('m.historyOrders.endDate')"
            ></el-date-picker>
          </div>
          <div class="btn">
            <v-btn type="primary" @click="toExportExcel">{{$t('m.historyOrders.export')}}</v-btn>
          </div>
        </div>
      </v-box>
    </v-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import dayjs from 'dayjs'
import { mapState, mapGetters } from 'vuex'
import { Table, TableColumn, Pagination, DatePicker, Select, Option } from 'element-ui'
import VBtn from '@/components/btn'
import VBox from '@/components/box'
import VRadio from '@/components/radio'
import VDialog from '@/components/dialog'
import VDropDown from '@/components/v-drop-down'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)

export default {
  props: {
    // 表单数据
    tableData: { type: Array, default: () => [] },
    // 分页数据
    pageMeta: { type: Object, default: () => ({}) },
    // 是否需要筛选状
    isFilter: { type: Boolean, default: true },
    // 是否需要导出
    isExport: { type: Boolean, default: true },
    // 导出类型
    exportType: { type: String, default: '' },
    // 是否需要时间筛选
    isTime: { type: Boolean, default: true },
    // 是否需要方向筛选
    isSide: { type: Boolean, default: false },
    // 是否需要市场筛选
    isMarket: { type: Boolean, default: false },
    // 是否需要分页
    isPage: { type: Boolean, default: true },
  },
  components: {
    VBtn,
    VBox,
    VRadio,
    VDialog,
    VDropDown,
  },
  data() {
    return {
      from: '',
      to: '',
      exportDialog: false,
      exportTime: 0,
      exportFrom: '',
      exportTo: '',
      options: {
        onPick: this.onPick,
      },
      rangeTime: [new Date().getTime(), new Date().getTime() + 3600 * 1000 * 24 * 7],
      sideType: '',
      sideTypeLabel: this.$t('m.historyOrders.all'),
      baseUnit: this.$t('m.historyOrders.all'),
      quoteUnit: this.$t('m.historyOrders.all'),
    }
  },
  computed: {
    ...mapGetters('tickers', ['tickerInfo']),
    ...mapState('tickers', ['quoteUnitList']),
  },
  methods: {
    // 分页变化
    changePage(page) {
      this.$emit('page-change', page)
    },
    // 点击行事件
    cellHandleClick(row, column) {
      this.$emit('cell-click', row, column)
    },
    // 切换展开行
    tableToggleRowExpansion(row, expanded) {
      this.$refs.table.toggleRowExpansion(row, expanded)
    },
    // 是否为全部
    isAll(val) {
      return val === this.$t('m.historyOrders.all')
    },
    // 提交搜索条件
    submit() {
      let side = undefined
      let market = undefined
      if (!this.isAll(this.baseUnit) && !this.isAll(this.quoteUnit)) {
        market = this.baseUnit + this.quoteUnit
      }
      if (!this.isAll(this.sideTypeLabel)) {
        side = this.sideType
      }
      this.$emit('search', { to: this.to, from: this.from, market, side })
    },
    // 重置搜索条件
    reset() {
      this.to = ''
      this.from = ''
      this.sideType = ''
      this.sideTypeLabel = this.$t('m.historyOrders.all')
      this.baseUnit = this.$t('m.historyOrders.all')
      this.quoteUnit = this.$t('m.historyOrders.all')
      this.$emit('search', { to: undefined, from: undefined, side: undefined, market: undefined })
    },
    // 导出时间筛选
    selectExportTime(val) {
      this.exportTime = val
    },
    // 限制自定义时间段
    onPick(date) {
      if (
        date.maxDate &&
        date.minDate &&
        new Date(date.maxDate).getTime() > new Date(date.minDate).getTime() + 3600 * 1000 * 24 * 30 * 3
      ) {
        this.$notify.warn(this.$t('m.historyOrders.maxMonth'))
      }
    },
    // 格式化导出时间
    formatExportDate(date) {
      return dayjs(date).format('YYYY.MM.DD HH:mm:ss')
    },
    // 导出
    toExportExcel() {
      let tDate = new Date()
      let fDate = new Date()
      switch (this.exportTime) {
        case 0:
          this.exportTo = tDate
          fDate.setDate(fDate.getDate() - 1)
          this.exportFrom = fDate
          break
        case 1:
          fDate.setDate(fDate.getDate() - 1)
          fDate.setHours(0)
          fDate.setMinutes(0)
          fDate.setSeconds(0)
          this.exportFrom = fDate
          tDate.setHours(0)
          tDate.setMinutes(0)
          tDate.setSeconds(0)
          this.exportTo = tDate
          break
        case 2:
          this.exportTo = tDate
          fDate.setDate(fDate.getDate() - 14)
          this.exportFrom = fDate
          break
        case 3:
          this.exportTo = tDate
          fDate.setDate(1)
          this.exportFrom = fDate
          break
        case 4:
          this.exportTo = tDate
          fDate.setMonth(fDate.getMonth() - 1)
          this.exportFrom = fDate
          break
        case 5:
          this.exportTo = tDate
          fDate.setMonth(fDate.getMonth() - 3)
          this.exportFrom = fDate
          break
        case 6:
          if (this.rangeTime && this.rangeTime.length > 0) {
            if (this.rangeTime[1] > this.rangeTime[0] + 7776000000) {
              // 3个月
              this.$notify.warn(this.$t('m.historyOrders.maxMonth'))
              return
            } else {
              this.exportFrom = this.rangeTime[0]
              this.exportTo = this.rangeTime[1]
            }
          } else {
            this.$notify.warn(this.$t('m.historyOrders.blankTime'))
            return
          }
          break
      }
      const exportUrl = `/history/${this.exportType}.csv?per_page=100&from=${this.formatExportDate(
        this.exportFrom,
      )}&to=${this.formatExportDate(this.exportTo)}`
      this.$nextTick(() => {
        let dom = document.getElementById('exportTime')
        dom.setAttribute('href', exportUrl)
        dom.click()
        this.exportDialog = false
      })
    },
    // 切换方向
    selectSideType(label, value) {
      this.sideType = value
      this.sideTypeLabel = label
    },
    // 筛选市场
    selectBaseUnit(val) {
      this.baseUnit = val.toUpperCase()
      const all = this.$t('m.historyOrders.all')
      if (this.isAll(this.quoteUnit)) {
        this.quoteUnit = this.quoteUnitList[0].toUpperCase()
      }
      if (this.isAll(val)) {
        this.quoteUnit = all
      }
    },
    selectQuoteUnit(val) {
      this.quoteUnit = val.toUpperCase()
      const all = this.$t('m.historyOrders.all')
      if (this.isAll(this.baseUnit)) {
        this.baseUnit = this.tickerInfo.baseUnitList[0].toUpperCase()
      }
      if (this.isAll(val)) {
        this.baseUnit = all
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.history-table-wrap {
  .filters {
    position: relative;
    color: #97a5b3;
    font-size: 12px;
    display: flex;
    align-items: center;
    height: 50px;
    border-top: 1px solid #eaedf5;
    .drop-list {
      li {
        font-size: 13px;
      }
    }
    .time {
      margin: 0 10px 0 12px;
    }
    .time-line {
      margin: 0 7px;
      font-weight: bold;
    }
    .label {
      margin-left: 20px;
      margin-right: 10px;
    }
    .item-select {
      display: inline-block;
      width: 70px;
    }
    .sort {
      width: 70px;
      height: 30px;
      border: 1px solid #dce0eb;
      font-size: 12px;
      color: #999999;
      border-radius: 4px;
      padding-left: 15px;
    }
    .line {
      margin: 0 7px;
    }
    .btn-group {
      display: inline-block;
      margin-left: 20px;
      font-size: 0;
      .btn {
        outline: none;
        background-color: #ffffff;
        border: 1px solid #bdc7d1;
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.02);
        color: #97a5b3;
        font-size: 12px;
        font-weight: 700;
        height: 30px;
        line-height: 0;
        padding: 0 10px;
        text-align: center;
        border-radius: 3px;
        cursor: pointer;
        margin-right: 10px;
        &:hover {
          background-color: #07e9b2;
          color: #333333;
          border-color: #07e9b2;
        }
      }
    }
    .hide-cancel {
      margin-left: 15px;
      display: inline-block;
      .label-text {
        font-size: 12px !important;
        color: #9dadbb !important;
      }
    }
    .export-history {
      display: inline-block;
      position: absolute;
      right: 10px;
      top: 16px;
      color: #9dadbb;
      cursor: pointer;
      .icon {
        vertical-align: middle;
        background: url('~@/assets/svg/excel.svg');
        width: 17px;
        height: 18px;
        display: inline-block;
      }
    }
  }
  .page {
    padding: 30px 0;
    display: flex;
    justify-content: flex-end;
  }
  .box-content {
    padding: 39px 76px;
    text-align: left;
    .radio-group {
      .item {
        width: 150px;
        color: #999999;
        font-size: 13px;
        margin-top: 15px;
      }
    }
    .radio-title {
      font-size: 16px;
      color: $color-text;
    }
    .custom-group {
      margin-top: 30px;
      color: #999999;
      font-size: 13px;
      font-weight: normal;
    }
    .btn {
      margin: 22px auto 0;
      width: 280px;
    }
    .datetimerange {
      margin: 20px auto 0;
      width: 280px !important;
      display: block !important;
      height: 42px !important;
    }
  }
}
</style>

<style lang="scss">
.el-table {
  font-size: 12px;
}

.el-table__header-wrapper {
  border-top: 1px solid #eaedf5;
}

.el-pagination.is-background {
  .el-pager {
    li:not(.disabled).active,
    li:not(.disabled):hover {
      background-color: $color-primary;
      color: #333333;
    }
  }
}
</style>


