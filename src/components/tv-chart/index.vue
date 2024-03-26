<template>
  <div class="wrap"
       :style="{visibility: this.tvWidgetReady ? 'visible' : 'hidden'}">
    <div id="tvcontainer"
         class="tvcontainer"></div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import { BigNumber } from 'bignumber.js'
import api from '@/graphql'
import EventBus from '@/components/event-bus'
import VDropDown from '@/components/dropdown'
import themeCfg from './theme'
import timezone from './timezone.js'
export default {
  props: ['theme'],
  data() {
    return {
      tvWidgetReady: false,
      curInterval: localStorage.getItem('pro_interval') || '60',
      resolutions: [
        { period: '1m', resolution: '1', language: 'm.marketChart.minutes', languageUnit: '1' },
        { period: '5m', resolution: '5', language: 'm.marketChart.minutes', languageUnit: '5' },
        { period: '15m', resolution: '15', language: 'm.marketChart.minutes', languageUnit: '15' },
        { period: '30m', resolution: '30', language: 'm.marketChart.minutes', languageUnit: '30' },
        { period: '1h', resolution: '60', language: 'm.marketChart.hours', languageUnit: '1' },
        { period: '2h', resolution: '120', language: 'm.marketChart.hours', languageUnit: '2' },
        { period: '4h', resolution: '240', language: 'm.marketChart.hours', languageUnit: '4' },
        { period: '6h', resolution: '360', language: 'm.marketChart.hours', languageUnit: '6' },
        { period: '1d', resolution: '1d', language: 'm.marketChart.days', languageUnit: '1' },
      ],
      studyList: [
        { name: 'EMA12', isVisible: true, color: '#4CB6FF', arg: '12' },
        { name: 'EMA26', isVisible: true, color: '#BC6FC7', arg: '26' },
      ],
      curBar: {
        close: '-',
        open: '-',
        high: '-',
        low: '-',
        volume: '-',
      },
      enablieRefresh: false, // 长时间读不到是否开启自动刷新
    }
  },
  computed: {
    ...mapState('tickers', ['currentMarketId', 'originalTickers']),
    ...mapState('currentUser', ['currentUser']),
    ...mapGetters('tickers', ['currentTicker', 'filterList']),
    ...mapState('trades', ['oriTrades']),
    ...mapState('cachedTrade', ['cachedTrades', 'last_ts', 'next_ts', 'lastBar']),
    ...mapState('viewport', ['width']),
    ...mapGetters('viewport', { viewType: 'type' }),
    curThemeCfg: function() {
      return themeCfg[this.theme]
    },
    locale: function() {
      // 将网站自己的lang标识准成tradingView需要的
      const localMap = {
        en: 'en',
        'zh-CN': 'zh',
        'zh-TW': 'zh_TW',
        ru: 'ru',
        ko: 'ko',
        vi: 'vi',
        ja: 'ja',
      }
      return localMap[this.$fifth.lang] ? localMap[this.$fifth.lang] : 'en'
    },
    formatedCurBar: function() {
      if (this.curBar.open === '-') return this.curBar
      const { bid_fixed, ask_fixed } = this.currentTicker
      return {
        open: this.curBar.open.toFixed(bid_fixed),
        close: this.curBar.close.toFixed(bid_fixed),
        high: this.curBar.high.toFixed(bid_fixed),
        low: this.curBar.low.toFixed(bid_fixed),
        volume: this.curBar.volume.toFixed(ask_fixed),
      }
    },
    overrides: function() {
      return {
        'timeScale.rightOffset': 0, // 这个属性无效，疑似tradingview1.13的bug
        // 默认展示蜡烛图
        'mainSeriesProperties.style': 1,
        'symbolWatermarkProperties.color': '#944',
        'scalesProperties.lineColor': this.curThemeCfg['scalesProperties.lineColor'],
        volumePaneSize: 'medium',
        // line styles
        'mainSeriesProperties.lineStyle.color': this.curThemeCfg['mainSeriesProperties.lineStyle.color'],
        'mainSeriesProperties.lineStyle.linewidth': 2,
        // Candles styles
        'mainSeriesProperties.candleStyle.upColor': this.curThemeCfg['mainSeriesProperties.candleStyle.upColor'],
        'mainSeriesProperties.candleStyle.downColor': this.curThemeCfg['mainSeriesProperties.candleStyle.downColor'],
        'mainSeriesProperties.candleStyle.drawWick': true,
        'mainSeriesProperties.candleStyle.drawBorder': false,
        'mainSeriesProperties.candleStyle.wickUpColor': this.curThemeCfg[
          'mainSeriesProperties.candleStyle.wickUpColor'
        ],
        'mainSeriesProperties.candleStyle.wickDownColor': this.curThemeCfg[
          'mainSeriesProperties.candleStyle.wickDownColor'
        ],
        'paneProperties.legendProperties.showSeriesOHLC': true,
        // 顶部legendProperties 默认隐藏，需要点击打开
        'paneProperties.legendProperties.showLegend': false,
        // 坐标轴刻度字体颜色
        'scalesProperties.textColor': this.curThemeCfg['scalesProperties.textColor'],
        'paneProperties.background': this.curThemeCfg['paneProperties.background'],
        'paneProperties.bottomMargin': 5,
        'paneProperties.horzGridProperties.color': this.curThemeCfg['paneProperties.gridProperties.color'],
        'paneProperties.vertGridProperties.color': this.curThemeCfg['paneProperties.gridProperties.color'],
      }
    },
    studiesOverrides: function() {
      return {
        'volume.volume.color.0': this.curThemeCfg['volume.volume.color.0'],
        'volume.volume.color.1': this.curThemeCfg['volume.volume.color.1'],
      }
    },
    enabledFeatures: function() {
      const features = [
        // 关闭多余的n/a显示
        'hide_last_na_study_output',
        'dont_show_boolean_study_arguments',
      ]
      if (this.currentUser) {
        features.push('study_templates')
      }
      return features
    },
    disabledFeatures: function() {
      const features = [
        'header_compare',
        'header_settings',
        'header_symbol_search',
        'symbol_search_hot_key',
        'compare_symbol',
        'timeframes_toolbar',
        // 关闭以后volume图表和主图表分开展示
        // 'volume_force_overlay',
        // 隐藏喜欢相关图标
        'items_favoriting',
        'context_menus',
        'symbol_info',
        'header_undo_redo',
        'header_screenshot',
        'header_saveload',
      ]
      if (this.viewType === 'h5') {
        features.push('header_fullscreen_button')
      }
      return features
    },
  },
  methods: {
    ...mapMutations('cachedTrade', ['updateTs', 'clearCachedTrades', 'resetCachedTrades']),
    createFeeds: function() {
      const vm = this
      return {
        onReady: function(callback) {
          const resolutions = vm.resolutions.map(rs => rs.resolution)
          new Promise(resolve => resolve()).then(() => {
            callback({
              supports_search: false,
              supports_group_request: true,
              supported_resolutions: resolutions,
              supports_marks: false,
              supports_timescale_marks: false,
            })
          })
        },
        searchSymbols: function(userInput, exchange, symbolType, onResultReadyCallback) {
          const obj = vm.filterList('all', userInput)
          let result = []
          Object.keys(obj).forEach(key => {
            if (Array.isArray(obj[key]) && obj[key].length > 0) {
              result = result.concat(obj[key])
            }
          })
          const filterArr = result.map(val => {
            return {
              symbol: val.name,
              full_name: val.code,
              description: val.name,
              exchange: 'Riostox',
              type: 'bitcoin',
            }
          })
          onResultReadyCallback(filterArr)
        },
        resolveSymbol: function(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
          const { bid_fixed } = vm.originalTickers[symbolName.toLocaleLowerCase()]
          new Promise(resolve => resolve())
            .then(() => {
              onSymbolResolvedCallback({
                type: 'bitcoin',
                name: symbolName,
                minmov: '1',
                minmov2: 0,
                pricescale: Math.pow(10, bid_fixed),
                session: '24x7',
                has_intraday: true,
                timezone,
              })
            })
            .catch(err => {
              console.log(err)
              onResolveErrorCallback('unknow_symbol')
            })
        },
        getBars: function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
          const param = {
            market: symbolInfo.name,
            period: vm.changeResolutionToPeriod(resolution),
            _t: Date.now(),
            limit: 1000,
          }
          if (firstDataRequest) {
            api
              .query(
                'PENDINGKLINE',
                {
                  ...param,
                  trade_id: vm.oriTrades.length > 0 ? vm.oriTrades[0].tid : 0,
                },
                'no-cache',
              )
              .then(resp => {
                if (!resp.data.pendingKLine || !resp.data.pendingKLine || resp.errors) {
                  onHistoryCallback([], { noData: true })
                  return false
                }
                const { meta, bars } = vm.handleRecentData(resp.data.pendingKLine, from, to, param.period)
                onHistoryCallback(bars, meta)
              })
          } else {
            api
              .query(
                'SINGLEKLINE',
                {
                  ...param,
                  timestamp: from,
                  to: to,
                },
                'no-cache',
              )
              .then(resp => {
                if (!resp.data.singleKLine || !resp.data.singleKLine || resp.errors) {
                  onHistoryCallback([], { noData: true })
                  return false
                }
                const { meta, bars } = vm.handleHistoryData(resp.data.singleKLine, from, to)
                onHistoryCallback(bars, meta)
              })
          }
        },
        subscribeBars: function(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
          const minutes = vm.changeResolutionToPeriod(resolution)
          // 大于等于日线不需要实时更新
          if (Number(minutes) > 1440) return
          vm.timer = setInterval(() => {
            // 每隔1.5s将trades的数据生成k线数据，并绘制到图表中
            const bars = []
            // 如果存在历史数据，需要将他放入bars数组以便更新时使用
            vm.lastBar.time && bars.push({ ...vm.lastBar })
            const { cachedTrades, last_ts, next_ts } = vm
            // 如果没有新的trades数据就不需要更新图表
            if (cachedTrades.length <= 0) return
            const ifNeedReset = vm.updateBars({
              bars,
              trades: cachedTrades,
              last_ts,
              next_ts,
              minutes,
              action: 'subscribeBars',
            })
            // 将合并过的trades从store中删除，防止反复绘制
            vm.clearCachedTrades()
            if (typeof ifNeedReset === 'boolean') {
              onResetCacheNeededCallback()
            } else {
              bars.forEach(bar => {
                onRealtimeCallback(bar)
              })
            }
          }, 1500)
        },
        unsubscribeBars: function() {
          clearInterval(vm.timer)
          vm.resetCachedTrades()
        },
      }
    },
    handleRecentData: function(data, from, to, minutes) {
      // 获取最新一屏数据
      const meta = {
        noData: false,
      }
      const bars = []
      if (typeof data === 'object' && data.k && data.k.length !== 0 && data.k[0][0] <= to) {
        const kData = data.k
        kData[0][0] < from && kData.shift()
        kData[kData.length - 1][0] > to && kData.pop()
        kData.forEach(item => {
          bars.push(this.changeServerDataToTvData(item))
        })
        const last_ts = bars[bars.length - 1].time / 1000
        const next_ts = last_ts + 60 * minutes
        const lastBar = { ...bars[bars.length - 1] }
        this.curBar = lastBar
        this.updateTs({ last_ts, next_ts, lastBar })
        this.updateBars({ bars, trades: data.trades, last_ts, next_ts, minutes })
      } else {
        meta.noData = true
      }
      return { meta, bars }
    },
    handleHistoryData: function(data, from, to) {
      const meta = {
        noData: false,
      }
      const bars = []
      if (typeof data === 'object' && data.k && data.k.length !== 0 && data.k[0][0] <= to) {
        const kData = data.k
        kData[0][0] < from && kData.shift()
        kData[kData.length - 1][0] > to && kData.pop()
        kData.forEach(item => {
          bars.push(this.changeServerDataToTvData(item))
        })
      } else {
        meta.noData = true
      }
      return { meta, bars }
    },
    updateBars: function({ bars, trades, last_ts, next_ts, minutes, action }) {
      trades.every(trade => {
        // 更新指定bar数据
        if (last_ts <= trade.date && trade.date < next_ts && bars.length > 0) {
          const bar = bars[bars.length - 1]
          const { price, amount } = trade
          // 更新收盘价
          bar.close = Number(price)
          // 更新最高价
          price > bar.high && (bar.high = Number(price))
          // 更新最低价
          price < bar.low && (bar.low = Number(price))
          // 更新数量
          bar.volume = BigNumber(bar.volume)
            .plus(amount)
            .toNumber()
          this.updateTs({ lastBar: bar })
          return true
        } else if (trade.date >= next_ts) {
          // 添加新的bar到bars
          // 如果新的订单时间戳大于等于下一条数据的指定时间戳
          const n = Math.ceil((trade.date - last_ts) / (minutes * 60))
          if (n > 100 && this.enablieRefresh) {
            // 如果新获取的trade里最新的bar太远，重新更新数据
            this.tvWidget.chart().resetData()
            if (action === 'subscribeBars') {
              // 触发subscribeBars里的 onResetCacheNeededCallback
              bars = true
              return false
            }
          }
          next_ts = last_ts + minutes * 60 * n
          last_ts = next_ts - minutes * 60
          const { price, amount } = trade
          bars.push({
            time: last_ts * 1000,
            close: Number(price),
            open: Number(price),
            high: Number(price),
            low: Number(price),
            volume: Number(amount),
          })
          const lastBar = { ...bars[bars.length - 1] }
          this.updateTs({ last_ts, next_ts, lastBar })
          return true
        }
      })
      return bars
    },
    changeResolutionToPeriod: function(resolution) {
      // 将tv的周期规则，转成接口需要的period
      return resolution === '1D' ? 1440 : Number(resolution) // 1D及以上时间，需要转成分钟（暂时只有1D）
    },
    changeServerDataToTvData: function(item) {
      // 将server传过来的k线数据转成tv想要的结构
      const curBar = {
        time: item[0] * 1000,
        close: Number(item[4]),
        open: Number(item[1]),
        high: Number(item[2]),
        low: Number(item[3]),
        volume: Number(item[5]),
      }
      return curBar
    },
    toggleStudy: function(idx) {
      const st = this.studyList[idx]
      if (st.id) {
        const study = this.tvWidget.chart().getStudyById(st.id)
        st.isVisible = !study.isVisible()
        study.setVisible(st.isVisible)
      } else {
        this.tvWidget.chart().createStudy(
          'Moving Average',
          true,
          false,
          [st.arg],
          entityId => {
            st.id = entityId
            st.isVisible = true
          },
          { 'Plot.color': st.color, 'Plot.transparency': 0 },
          {
            priceScale: 'right',
          },
        )
      }
    },
  },
  watch: {
    theme: function() {
      const vm = this
      this.tvWidget.onChartReady(function() {
        vm.tvWidget.changeTheme(vm.theme === 'light' ? 'Light' : 'Dark')
        vm.tvWidget.applyOverrides(vm.overrides)
        vm.tvWidget.applyStudiesOverrides(vm.studiesOverrides)
      })
    },
  },
  mounted: function() {
    setTimeout(() => {
      this.enablieRefresh = true
    }, 60000) // 10分钟后开启
    const vm = this
    console.log(window.TradingView)
    this.tvWidget = new window.TradingView.widget({
      timezone,
      fullscreen: false,
      autosize: true,
      container_id: 'tvcontainer',
      library_path: '/charting_library/',
      symbol: this.$route.params.id,
      interval: this.curInterval,
      locale: this.locale,
      debug: false,
      datafeed: this.createFeeds(),
      theme: this.theme === 'light' ? 'Light' : 'Dark',
      disabled_features: this.disabledFeatures,
      enabled_features: this.enabledFeatures,
      overrides: this.overrides,
      studies_overrides: this.studiesOverrides,
      custom_css_url: `./custom-pro.css?${new Date().getTime()}`, // 相对于library_path
      charts_storage_url: `${location.protocol}//${location.host}/portal`,
      client_id: 'riostox_exchange_pro',
      user_id: this.currentUser ? this.currentUser.id : '',
      charts_storage_api_version: '1.1',
    })
    this.initTheme = this.theme
    this.tvWidget.onChartReady(function() {
      vm.tvWidgetReady = true
      EventBus.$on('setSymbol', newId => {
        vm.tvWidget.chart().setSymbol(newId, () => {
          clearInterval(vm.timer)
          vm.resetCachedTrades()
          vm.tvWidget.chart().executeActionById('timeScaleReset')
        })
      })
      vm.studyList.forEach(st => {
        st.isVisible &&
          vm.tvWidget.chart().createStudy(
            'Moving Average',
            true,
            false,
            [st.arg],
            entityId => {
              st.id = entityId
            },
            {
              'Plot.color': st.color,
              'Plot.transparency': 0,
            },
            {
              priceScale: 'right',
            },
          )
      })
      if (vm.initTheme !== vm.theme) {
        vm.tvWidget.changeTheme(vm.theme === 'light' ? 'Light' : 'Dark')
        vm.tvWidget.applyOverrides(vm.overrides)
        vm.tvWidget.applyStudiesOverrides(vm.studiesOverrides)
      }
      vm.tvWidget
        .chart()
        .onIntervalChanged()
        .subscribe(null, function(interval) {
          localStorage.setItem('pro_interval', interval)
        })
    })
  },
  destroyed: function() {
    EventBus.$off('setSymbol')
    window.removeEventListener('resize', this.handleResize)
  },
  components: {
    VDropDown,
  },
}
</script>

<style lang="scss" >
.tvchartmenu {
  .drop-list {
    left: 0;
  }
}
</style>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.header {
  display: flex;
  height: 34px;
  line-height: 34px;
  border-bottom: 1px solid;

  @include themify($themes) {
    border-bottom-color: themed('lineBorderColorF5');
  }
  .menu {
    position: relative;
    padding: 0 10px;
    text-align: center;
    border-right: 1px solid;
    font-size: 13px;

    @include themify($themes) {
      color: themed('textColor7');
      border-color: themed('lineBorderColorF5');
    }
    .list {
      li {
        a {
          position: relative;
          padding: 0;
        }
      }
    }
    .dot {
      position: absolute;
      width: 6px;
      height: 6px;
      left: 6px;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
      &.disabled {
        opacity: 0.4;
      }
    }
  }
  .legend {
    font-size: 12px;
    text-align: right;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;

    @include themify($themes) {
      color: themed('textColor3');
    }
    .cnt {
      display: inline;
    }
    span {
      padding-left: 20px;
      &:first-child {
        padding-left: 0;
      }
    }
  }
}

.tvcontainer {
  flex: 1;
}

.list {
  li {
    cursor: pointer;
  }
}
</style>


