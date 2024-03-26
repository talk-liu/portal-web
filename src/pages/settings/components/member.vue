<template>
  <div>
    <div class="member" v-if="memberBoll">
      <p>
        <el-button @click="returnEve((memberBoll = !memberBoll))">Create Bank Account</el-button>
      </p>
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column prop="bank_name" label="Bank" width="180"> </el-table-column>
        <el-table-column prop="name" label="Account holder" width="180"> </el-table-column>
        <el-table-column prop="account_number" label="Account number"> </el-table-column>
        <!-- <el-table-column prop="name" label="Holder Address"> </el-table-column>
        <el-table-column prop="name" label="Relationship"> </el-table-column> -->
        <el-table-column prop="status" label="Status"> </el-table-column>
        <el-table-column prop="name">
          <template slot-scope="scope">
            <p class="operation">
              <a href="javascript:;"><img width="14px" src="../../../assets/newImg/images/member/edit.png" /></a>
              <a href="javascript:;"><img width="14px" src="../../../assets/newImg/images/member/remove.png" /></a>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-else>
      <member-form @childChangeData="changeData"></member-form>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Table, TableColumn, Button, Loading } from 'element-ui'

import api from '@/graphql'
import MemberForm from './member-form.vue'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Loading)
export default {
  components: {
    MemberForm,
  },
  data() {
    return {
      loading: true,
      countries: [],
      tableData: [],
      memberBoll: true,
    }
  },
  computed: {},
  async mounted() {
    this.bankList()
  },
  methods: {
    async bankList() {
      this.loading = true
      const { data } = await api.query('BANKGET')
      this.tableData = data.bankGet.result
      this.loading = false
    },
    async changeData() {
      this.memberBoll = true
      this.bankList()
    },
  },
}
</script>

<style lang="scss" scoped>
.member {
  p {
    text-align: right;
  }
  .el-button {
    background: #07e9b2;
    border: none;
    border-radius: 5px;
    box-shadow: none;
    color: #002060;
    font-size: 20px;
    font-weight: 700;
    line-height: 120%;
    margin: 30px;
  }
  .operation {
    a {
      margin-right: 30px;
    }
  }
}
</style>