<template>
  <div class="plateform-info_wrap">
    <platform-item :title="$t('m.atMing.rewardsFromPlatform')" :ptSource='ptSource' />
    <seven-table :title="$t('m.atMing.sevenRewards')" :dataSource='dataSource' :dateList='dateList' />
    <line-chart/>
  </div>
</template>

<script>

import sevenTable from './seven-table'
import platformItem from './platform-item'
import lineChart from './line-chart-equity'
import mixin from '../mixins/equity-mixin'

export default {
  components: {
    sevenTable,
    platformItem,
    lineChart
  },
  mixins:[mixin],
}
</script>

