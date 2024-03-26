<template>
  <div>
    <template v-if="height < 970 && tabs.length > 1">
      <div class="u-tabs tabs">
        <div
          v-for="tab in tabs"
          :key="tab.key"
          :class="['u-tab-button', {current: curTab.key === tab.key}]"
          @click="curTab = tab"
        >{{tab.name}}</div>
      </div>
      <div class="kChart" v-show="curTab.key === 'Candlesticks'">
        <tv-chart v-if="this.currentTicker.last !== '0' && this.isAuthed" :theme="theme"></tv-chart>
      </div>
      <depth-chart class="depthchart full" v-if="curTab.key === 'Depth'" :theme="theme"></depth-chart>
    </template>
    <template v-else>
      <div class="title">{{$t('m.marketChart.chart')}}</div>
      <div class="kChart">
        <tv-chart v-if="this.currentTicker.last !== '0' && this.isAuthed" :theme="theme"></tv-chart>
      </div>
      <depth-chart class="depthchart" :theme="theme"></depth-chart>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import DepthChart from '@/components/depth-chart'
import TvChart from '@/components/tv-chart'

export default {
  components: {
    DepthChart,
    TvChart,
  },
  data() {
    return {
      curTab: { key: 'Candlesticks', name: this.$t('m.marketChart.ktitle') },
    }
  },
  computed: {
    ...mapState('viewport', ['height', 'theme']),
    ...mapGetters('tickers', ['currentTicker']),
    ...mapState('currentUser', ['isAuthed']),
    tabs() {
      return [
        { key: 'Candlesticks', name: this.$t('m.marketChart.ktitle') },
        { key: 'Depth', name: this.$t('m.marketChart.dtitle') },
      ]
    },
  },
  methods: {},
  mounted() {},
}
</script>

<style lang="scss" scoped>
.title {
  height: 45px;
  line-height: 45px;
  margin: 0 20px;
  font-size: 14px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  font-weight: 500;
  font-family: euBold;

  @include themify($themes) {
    border-color: themed('lineBorderColorF5');
    color: themed('textColor3');
  }
}

.tabs {
  border-bottom-width: 1px;
  border-bottom-style: solid;

  @include themify($themes) {
    border-color: themed('lineBorderColorF5');
  }
}

.kChart {
  display: flex;
  flex: 1;
}

.depthchart {
  margin-top: 14px;
  height: 200px;
  &.full {
    height: auto;
    flex: 1;
  }
}
</style>
