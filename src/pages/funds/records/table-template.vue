<template>
  <div class="record-table">
    <el-table ref="table" :data="tableData" style="width: 100%;">
      <slot name="table-list"></slot>
    </el-table>
    <div class="pagination" v-if="pageMeta.total_count > (pageMeta.page_size || pageMeta.per_page)">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pageMeta.total_count"
        :page-size="pageMeta.page_size || pageMeta.per_page"
        :current-page="pageMeta.page"
        @current-change="changePage"
      />
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Table, TableColumn, Pagination } from 'element-ui'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
export default {
  props: {
    tableData: { type: Array, default: () => [] },
    pageMeta: { type: Object, default: () => ({}) },
  },
  methods: {
    changePage(page) {
      this.$emit('page-change', page)
    },
  }
}
</script>
<style lang="scss">
  .el-table {
    font-size: 12px;
  }

  .el-table__header-wrapper {
    border-top: 1px solid #eaedf5;
  }

  .pagination {
    text-align: right;
    margin-top: 20px;
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

  .records-table .info-column {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .txid {
      color: #999999;
      a {
        color: #999999;
      }
    }
  }
</style>
