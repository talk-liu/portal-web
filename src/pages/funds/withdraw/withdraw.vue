<template>
  <div class="funds-dialog_recharge">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Withdrawals" name="withd">
        <Withd></Withd>
      </el-tab-pane>
      <el-tab-pane label="Bank Withdrawals" name="second">
        <Bank></Bank>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import Vue from 'vue'
import Withd from './withd.vue'
import Bank from './bank.vue'

import {
  Tabs,
  TabPane
} from 'element-ui'

Vue.use(Tabs)
Vue.use(TabPane)

export default {
  components: {
    Withd,
    Bank
  },
  data() {
    return {
      activeName:'second',
    }
  },
  methods:{
    handleClick(){

    }
  }
}
</script>

<style lang="scss" scoped>

.funds-dialog_recharge {
  padding: 50px 0 50px;
  margin: 0 auto;
  width: 1120px;
  min-height: 700px;
}
</style>
