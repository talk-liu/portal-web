<template>
  <div class="trading">
    <div class="heads">
      <h2>
        {{$t('m.feeCharge.transaction')}}
      </h2>
      <!-- <el-button type="primary">充值&提现费率</el-button> -->
    </div>
    <div class="introduce">
      <!-- <p>
        享受更高的折扣和特权。<a>VIP项目</a>
      </p>
      <p>
        以下交易您可能会享受BNB的更多抵扣<a>了解更多</a>
      </p> -->
      <ul>
        <li>
          <h4>
            Lv {{vipLevel.vip_level-1}}
          </h4>
          <label>
            {{currentUser.email|emails}}
          </label>
        </li>
        <li>
          <span>
            {{$t('m.feeCharge.asset')}}(RFUEL)
          </span>
          <h3>
            {{tableData[vipLevel.vip_level-1].rfuel_amount_1d}}
          </h3>
        </li>
        <li>
          <span>
            {{$t('m.feeCharge.trading')}}
          </span>
          <h3>
            {{tableData[vipLevel.vip_level-1].trading_amount_30d}}
          </h3>
        </li>
      </ul>
    </div>
    <div class="tabels">
      <h3>{{$t('m.feeCharge.rate')}}</h3>
      <el-table :data="tableData" border style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column
          prop="vip_level"
          :label="$t('m.feeCharge.level')"
          width="180">
        </el-table-column>
        <el-table-column
          prop="rfuel_amount_1d"
          :label="$t('m.feeCharge.turnover')"
          width="480">
          <template slot-scope="scope">
            <label> >= {{scope.row.rfuel_amount_1d}}</label>
            <span>/</span>
            <label> >= {{scope.row.trading_amount_30d}}</label>
          </template>
        </el-table-column>
        <el-table-column
          prop="maker_fee"
          :label="$t('m.feeCharge.handling')">
          <template slot-scope="scope">
            {{(scope.row.maker_fee*100).toFixed(2)}}%
          </template>
        </el-table-column>
        <el-table-column
          prop="taker_fee"
          :label="$t('m.feeCharge.charge')">
          <template slot-scope="scope">
            {{(scope.row.taker_fee*100).toFixed(2)}}%
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import api from '@/graphql'
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
import { Button, Form, FormItem, Table, tableColumn } from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(tableColumn)

export default {
  data() {
    return {
      vipLevel: { vip_level: 1 },
      tableData: [
        {
          vip_level: 'Lv 0',
          rfuel_amount_1d: '0',
          trading_amount_30d: '0',
          maker_fee: 0.002,
          taker_fee: 0.002,
        },
        {
          vip_level: 'Lv 1',
          rfuel_amount_1d: '10,000',
          trading_amount_30d: '50,000',
          maker_fee: 0.0018,
          taker_fee: 0.0018,
        },
        {
          vip_level: 'Lv 2',
          rfuel_amount_1d: '20,000',
          trading_amount_30d: '100,000',
          maker_fee: 0.0016,
          taker_fee: 0.0018,
        },
        {
          vip_level: 'Lv 3',
          rfuel_amount_1d: '40,000',
          trading_amount_30d: '500,000',
          maker_fee: 0.0014,
          taker_fee: 0.0016,
        },
        {
          vip_level: 'Lv 4',
          rfuel_amount_1d: '80,000',
          trading_amount_30d: '1,000,000',
          maker_fee: 0.001,
          taker_fee: 0.0014,
        },
        {
          vip_level: 'Lv 5',
          rfuel_amount_1d: '160,000',
          trading_amount_30d: '5,000,000',
          maker_fee: 0.0008,
          taker_fee: 0.0012,
        },
        {
          vip_level: 'Lv 6',
          rfuel_amount_1d: '300,000',
          trading_amount_30d: '10,000,000',
          maker_fee: 0.0,
          taker_fee: 0.001,
        },
        {
          vip_level: 'Lv 7',
          rfuel_amount_1d: '450,000',
          trading_amount_30d: '25,000,000',
          maker_fee: 0.0,
          taker_fee: 0.0008,
        },
        {
          vip_level: 'Lv 8',
          rfuel_amount_1d: '600,000',
          trading_amount_30d: '100,000,000',
          maker_fee: 0.0,
          taker_fee: 0.0004,
        },
        {
          vip_level: 'Lv 9',
          rfuel_amount_1d: '900,000',
          trading_amount_30d: '250,000,000',
          maker_fee: 0.0,
          taker_fee: 0.0002,
        },
        {
          vip_level: 'Lv 10',
          rfuel_amount_1d: '1800,000',
          trading_amount_30d: '500,000,000',
          maker_fee: 0.0,
          taker_fee: 0.0001,
        },
      ],
    }
  },
  computed: {
    ...mapState('currentUser', ['currentUser']),
  },
  filters: {
    emails(val) {
      console.log(val)
      const e = val.substring(val.indexOf('@'), val.length)
      const s = val.substring(0, val.indexOf('@') - 1)
      return s + '***' + e
    },
  },
  async mounted() {
    const { data } = await api.query('VIPLEVEL')
    this.vipLevel = data.vipLevel.result
    console.log(this.vipLevel)
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === this.vipLevel.vip_level - 1) {
        return 'warning-row'
      }
      return null
    },
  },
}
</script>


<style lang="scss">
.trading {
  .warning-row {
    background: #f4f7fd;
    color: #2c61e0;
    border: 1px solid #2c61e0;
  }
}
</style>
<style lang="scss" scoped>
.trading {
  .heads {
    // background-color: #fafafa;
    padding: 60px 220px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-size: 40px;
      color: #1e2329;
    }
  }
  .introduce {
    padding: 0px 220px;
    p {
      font-size: 16px;
      color: #707a8a;
      margin-top: 24px;
    }
    a {
      color: #c99400;
      font-size: 14px;
    }
    ul {
      margin-top: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background-color: #f9f9f9;
      padding: 23px;
      margin-bottom: 23px;
      li {
        margin-right: 150px;
        span {
          font-size: 16px;
          color: #1e2329;
        }
        h3 {
          color: #1e2329;
          margin-top: 8px;
          font-size: 24px;
          line-height: 32px;
        }
        h4 {
          font-size: 36px;
          font-weight: 700;
          color: #226fe2;
        }
        label {
          font-size: 12px;
          color: #949494;
        }
      }
    }
  }
  .tabels {
    padding: 0px 220px;
    margin-bottom: 120px;
    h3 {
      margin-bottom: 20px;
    }
    label {
      display: inline-block;
      width: 130px;
    }
    span {
      margin-right: 100px;
    }
  }
}
</style>
