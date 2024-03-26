<template>
  <div class="markets-list">
    <el-form ref="ruleForm"
             :model="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <h2>
        <strong>Markets</strong>
        <el-form-item class="searchName">
          <el-input width="348px"
                    placeholder="Search Coin Name"
                    v-model="searcs" />
        </el-form-item>
      </h2>

      <p class="cities">
        <span v-for="item in cities"
              :key="item.name">{{ item.name }}</span>
      </p>

      <div class="selectBox">
        <el-form-item label-width="0px">
          <el-select placeholder="Category">
            <el-option> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label-width="0px">
          <el-select placeholder="Platform">
            <el-option> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label-width="0px">
          <el-select placeholder="Algorithm">
            <el-option> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label-width="0px">
          <el-select placeholder="Currency">
            <el-option> </el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <div>
      <el-table :data="listData"
                style="width: 100%">
        <el-table-column label="Asset"
                         width="180">
          <template slot-scope="scope">
            <span class="base_unit">
              <img width="30px"
                   :src="'https://i.riostox.com/img/currency/' + scope.row.base_unit + '.png'" />
              {{ scope.row.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="last"
                         label="Latest price"
                         width="180"> </el-table-column>
        <el-table-column prop="changePercent"
                         label="24h change">
          <template slot-scope="scope">
            {{scope.row.changePercent}}%
          </template>
        </el-table-column>
        <el-table-column prop="funds"
                         label="24h trading volume"> </el-table-column>
        <el-table-column prop="low"
                         label="24H  low/High"> </el-table-column>
        <!-- <el-table-column prop="cap" label="Market cap"> </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations, mapState } from 'vuex'
import {
  Form,
  Input,
  FormItem,
  Button,
  Checkbox,
  CheckboxGroup,
  Select,
  Option,
  CheckboxButton,
  Table,
  TableColumn,
} from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(CheckboxButton)
Vue.use(Table)
Vue.use(TableColumn)
export default {
  computed: {
    ...mapGetters('tickers', ['filterList', 'maxFee', 'minFee']),
    listData() {
      const attr = []
      const usdtList = this.filterList('usdt')
      const usdList = this.filterList('usd')
      for (let i in usdtList) {
        for (let j in usdtList[i]) {
          if (usdtList[i][j].base_unit.indexOf(this.searcs) != -1) {
            attr.push(usdtList[i][j])
          }
        }
      }
      for (let i in usdList) {
        for (let j in usdList[i]) {
          if (usdList[i][j].base_unit.indexOf(this.searcs) != -1) {
            attr.push(usdList[i][j])
          }
        }
      }
      return attr
    },
  },
  mounted() {
    console.log(this.filterList('usdt'))
  },
  data() {
    return {
      searcs: '',
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      cities: [
        {
          name: 'usdt',
        },
        {
          name: 'usd',
        },
      ],
      tableData: [],
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.markets-list {
  max-width: 1440px;
  margin: auto;
  padding: 80px 20px 120px 20px;
  h2 {
    color: #002060;
    font-size: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .cities {
    margin: 10px 0px;
    span {
      color: #888888;
      border: 2px solid #888888;
      padding: 2px 10px;
      border-radius: 5px;
      margin: 0px 5px;
      cursor: pointer;
    }
  }
  .searchName {
    display: inline-block;
    width: 350px;
  }
  .selectBox {
    display: flex;
    justify-content: left;
    align-items: center;
    .el-form-item {
      margin-right: 10px;
    }
  }
  .base_unit {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      margin-right: 10px;
    }
  }
}
.el-form-item {
  margin: 0px;
}
</style>
