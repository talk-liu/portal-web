<template>
  <div>
    <tabs class='tabs flex jcc hidden-sm hidden-md hidden-lg' :idx.sync='tabIndex' :count='tabConfig.length'>
      <tab-item class='tab-item' v-for='(v,i) in tabConfig' :key='i' :index='i'>
        <span slot='label'>{{v.label}}</span>
      </tab-item>
    </tabs>
    <tabs-pc :tabConfig='tabConfig' class='hidden-xs' @tabIndex='(i)=>{this.tabIndex = i}' />
  </div>
</template>

<script>
import tabsPc from './pc/tabs'
import tabs from '@/components/tabs/tabs'
import tabItem from '@/components/tabs/tab-item'

export default {
  data() {
    return {
      tabConfig: [
        {
          label: this.$t('m.home.rewards'),
        },
        {
          label: this.$t('m.home.mining'),
        },
      ],
      tabIndex: 0,
    }
  },
  components: {
    tabsPc,
    tabs,
    tabItem,
  },
  watch: {
    tabIndex() {
      this.$emit('tabIndex', this.tabIndex)
    },
  },
}
</script>

<style lang='scss' scoped>
.tabs {
  margin-top: 12px;
  .tab-item {
    font-size: 14px;
    color: $color-255-normal;
  }
  .tab-item:nth-of-type(2) {
    margin-left: 50px;
  }
  .current {
    color: $color-255 !important;
  }
  .current:after {
    background: $color-255 !important;
  }
}
</style>
