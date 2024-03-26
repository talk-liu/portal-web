<template>
  <div class="funds-dialog_records clearfix">
    <div class="headline">{{$t('m.funds.fundsMenu.records')}}</div>
    <div class="btns clearfix">
      <v-btn-group :btnNumber="btnNumber">
        <button name="deposits" @click="changeMenu(0)">{{$t('m.funds.fundsMenu.recharge')}}</button>
        <button name="withdraws" @click="changeMenu(1)">{{$t('m.funds.fundsMenu.withdraw')}}</button>
        <!-- <button name="transfer" @click="changeMenu(2)">{{$t('m.funds.fundsMenu.transfer')}}</button> -->
        <button name="reward" @click="changeMenu(3)">{{$t('m.funds.fundsMenu.other')}}</button>
        <!-- <button name="reward" @click="changeMenu(4)">IEO</button> -->
        <button name="reward" @click="changeMenu(5)">USD</button>
      </v-btn-group>
      <span v-if="currency" class="current-currency">{{$t('m.funds.currentCur')}}：{{currency | upperCase}}</span>
      <div class="search">
        <v-input-search v-model="searchKey" @search="searchCoin" :placeholder="$t('m.funds.fundsMenu.searchName')" width="200" height="30" v-show="btnNumber === 0 || btnNumber === 1 || btnNumber === 3"></v-input-search>
      </div>
    </div>
    <router-view/>
    <records-tpl v-show="btnNumber === 0" :data="filterDepositData" :meta="depositsMeta" :btnNumber="btnNumber"></records-tpl>
    <records-tpl v-show="btnNumber === 1" :data="filterWithdrawData" :meta="withdrawsMeta" :btnNumber="btnNumber"></records-tpl>
    <transfer-tpl v-show="btnNumber === 2" :data="transfersHistory" :meta="transfersMeta" :btnNumber="btnNumber"></transfer-tpl>
    <records-tpl v-show="btnNumber === 3" :data="filterOtherData" :meta="othersMeta" :btnNumber="btnNumber" @change="changePage"></records-tpl>
    <records-ieo-order v-show="btnNumber === 4" :data="filterIeoOrderData" :btnNumber="btnNumber" ></records-ieo-order>
    <div v-show="btnNumber === 5">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="account_name" label="银行卡地址" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.target_bank_city}}{{scope.row.target_bank_country}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="account_name" label="账户名称" width="180" />
        <el-table-column prop="account_number" label="账户号码" width="180" />
        <el-table-column prop="account_number" label="货币" width="180">
          <template slot-scope="scope">
            <span>USD</span>
          </template>
        </el-table-column>
        <el-table-column prop="target_bank_swift" label="SWIFT代码" />
        <el-table-column prop="amount" label="数量">
          <template slot-scope="scope">
            <span>{{scope.row.amount}} USD</span>
          </template>
        </el-table-column>
        <el-table-column prop="provider_tracking_ref" label="参考编号" />
      </el-table>
    </div>
  </div>
</template>
<script>
import api from '@/graphql'
import VBtnGroup from '@/components/btn-group'
import VInputSearch from '@/components/input-search'
import UpperCase from '@/utils/upperCase'
import RecordsTpl from './records-tpl'
import TransferTpl from './transfer-tpl'
import RecordsIeoOrder from './records-ieoOrder'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  mixins: [UpperCase],
  components: {
    VBtnGroup,
    VInputSearch,
    RecordsTpl,
    TransferTpl,
    RecordsIeoOrder,
  },
  data() {
    return {
      searchKey: this.$route.query.currency || '',
      currency: this.$route.query.currency || '',
      btnNumber: Number(this.$route.query.tag) || 0,
      tableData:[]
    }
  },
  computed: {
    ...mapGetters('depositsHistory', ['depositsHistory']),
    ...mapState('depositsHistory', ['depositsMeta']),
    ...mapGetters('withdrawsHistory', ['withdrawsHistory']),
    ...mapState('withdrawsHistory', ['withdrawsMeta']),
    ...mapGetters('othersHistory', ['othersHistory']),
    ...mapState('othersHistory', ['othersMeta']),
    ...mapGetters('transfersHistory', ['transfersHistory']),
    ...mapState('transfersHistory', ['transfersMeta']),
    ...mapGetters('ieoHistoryOrder', ['ieoOrderList']),
    ...mapState('ieoHistoryOrder', ['ieoHistoryMeta']),
    ...mapState('currentUser', ['currentUser']),
    filterDepositData() {
      if (this.currency) {
        return this.depositsHistory.filter(i => i.currency.indexOf(this.currency.toUpperCase()) > -1)
      } else {
        return this.depositsHistory
      }
    },
    filterWithdrawData() {
      const withdrawsHistory = this.withdrawsHistory
      withdrawsHistory.map(i => {
        i.showTxid = false
      })
      if (this.currency) {
        return withdrawsHistory.filter(i => i.currency.indexOf(this.currency.toUpperCase()) > -1)
      } else {
        return withdrawsHistory
      }
    },
    filterOtherData() {
      if (this.currency) {
        return this.othersHistory.filter(i => i.currency.indexOf(this.currency.toUpperCase()) > -1)
      } else {
        return this.othersHistory
      }
    },
    filterIeoOrderData() {
      console.log('货币是:' + this.currency)
      if (this.currency) {
        console.log('ieo历史数据:' + this.ieoOrderList)
        return this.ieoOrderList.filter(i => i.currency.indexOf(this.currency.toUpperCase()) > -1)
      } else {
        console.log('ieo历史数据:' + this.ieoOrderList)
        return this.ieoOrderList
      }
    },
  },
  async created() {
    this.toggleData()
    const res = await this.usdData()
    console.log(res)
    this.tableData = res;
  },
  methods: {
    ...mapActions('depositsHistory', ['getDepositHistory']),
    ...mapActions('withdrawsHistory', ['getWithdrawsHistory']),
    ...mapActions('othersHistory', ['getOthersHistory']),
    ...mapActions('transfersHistory', ['getTransfersHistory']),
    ...mapActions('ieoHistoryOrder', ['getIeoHistory']),
    async usdData(){
      const { data } = await api.query('BANKWIRESLIST')
      return data.bankWiresList.result
    },
    searchCoin(val) {
      this.currency = val
    },
    changeMenu(val) {
      if (this.btnNumber === val) {
        return
      }
      this.searchKey = ''
      this.currency = ''
      this.btnNumber = val
      this.toggleData()
    },
    changePage(val) {
      this.toggleData(val)
    },
    async toggleData(page = 1) {
      switch (Number(this.btnNumber)) {
        case 0:
          await this.getDepositHistory({ page })
          break
        case 1:
          await this.getWithdrawsHistory({ page })
          break
        case 2:
          await this.getTransfersHistory({ page })
          break
        case 3:
          await this.getOthersHistory({ page })
          break
        case 4:
          console.log('ieo历史数据请求')
          await this.getIeoHistory({
            memberId: parseInt(this.currentUser.id),
            ieoCode: 'TSK',
            number: 1,
            size: 40,
          })
          break
      }
    }
  },
}
</script>

<style scoped lang="scss">
@import '../../../assets/scss/variable.scss';

.funds-dialog_records {
  margin: 0 auto;
  min-height: 700px;
  padding: 50px 0;
  width: 1120px;
  .headline {
    color: $color-3;
    font-size: 18px;
    font-weight: 500;
    padding-bottom: 24px;
    border-bottom: 1px solid #d8d8d8;
  }
  .btns {
    padding: 20px 0 10px;
  }
  .current-currency {
    color: #bfbfbf;
    display: inline-block;
    font-size: 13px;
    margin-left: 25px;
  }
  .search {
    float: right;
  }
}
</style>
