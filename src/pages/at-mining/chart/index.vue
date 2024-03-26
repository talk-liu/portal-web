<template>
  <div class="data-wrap clearfix">
    <div class="chart-box pull-left"></div>
    <div class="now-data_pc pull-right">
      <div class="time f12">{{recentData.interval}}</div>
      <div class="item block block1">
        <p>{{recentData.atPrice}}</p>
        <p>{{$t('m.atMing.atPrice')}}</p>
      </div>
      <div class="item block block2">
        <p>{{recentData.atMiningCost}}</p>
        <p>{{$t('m.atMing.atMiningCost')}}</p>
      </div>
      <div class="item block block3">
        <p>{{recentData.totalCP | thousands}}</p>
        <p>{{$t('m.atMing.totalCP')}}</p>
      </div>
    </div>
    <div class="now-data_mobile">
      <div>
        <div class="time f12">
          {{recentData.interval}}
        </div>
        <div class="item block1">
          <span>{{$t('m.atMing.atPrice')}}</span>
          <span>{{recentData.atPrice}}</span>
        </div>
        <div class="item  block2">
          <span>{{$t('m.atMing.atMiningCost')}}</span>
          <span>{{recentData.atMiningCost}}</span>
        </div>
        <div class="item  block3">
          <span>{{$t('m.atMing.totalCP')}}</span>
          <span>{{recentData.totalCP}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chartOptions from './chart-option'
export default {
  mixins: [chartOptions],
  watch: {
    atTotalInfos() {
      this.draw()
    },
  },
  mounted() {
    this.init()
    this.draw()
  },
  methods: {
    // atPrice
    // atMiningCost
    init() {
      const el = document.querySelector('.chart-box')
      this.echart = window.echarts.init(el)
      this.echart.showLoading({
        text: 'loading',
        color: 'rgba(255,163,36,.3)',
        textColor: 'rgba(255,163,36,.3)',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        zlevel: 0,
      })

      window.addEventListener('resize', () => {
        this.echart.resize({
          width: 'auto',
          height: 'auto',
        })
      })
    },
    draw() {
      const self = this
      this.echart.setOption({
        backgroundColor: '#fafafa',
        tooltip: {
          trigger: 'axis',
          padding: 20,
          position(point, params, dom, rect, size) {
            const left = point[0] < size.viewSize[0] / 2 ? 30 : -220
            return [point[0] + left, '0%']
          },
          backgroundColor: '#ffffff',
          borderColor: '#F1CFB2',
          borderWidth: '0.5',
          borderRadius: 0,
          textStyle: {
            color: '#777777',
            fontSize: '12',
          },
          formatter(params) {
            let res = params[0].name

            for (let i = 0; i < params.length; i++) {
              // 1. 399EFF 2. EE4343 3. FF8200
              if (i === 0) {
                res += `<p style="padding:5px 0;color:#399EFF;">${params[i].seriesName}: ${self.addUnit(
                  params[i].data,
                )}</p>`
                continue
              }
              if (i === 1) {
                res += `<p style="padding:5px 0; color:#ee4343;"><span>${
                  params[i].seriesName
                }:</span><span style="margin-left:5px;">${self.addUnit(params[i].value)}</span></p>`
                continue
              }
              if (i === 2) {
                res += `<p style="padding:5px 0; color:#FF8200;">
                            <span>${params[i].seriesName}:</span><span style="margin-left:5px;">${
  params[i].data.value
}</span>`
                continue
              }
            }
            return res
          },
        },
        toolbox: {
          show: false,
        },
        grid: {
          x: '-3.9%', // 默认是80px
          y: 0, // 默认是60px
          x2: '-3.9%', // 默认80px
          y2: 0, // 默认60px
        },
        // legend: {   data: ['算力', 'AT币价', 'AT挖矿成本'], },
        xAxis: [
          {
            type: 'category',
            data: this.timeArray,
            axisPointer: {
              type: 'shadow',
              shadowStyle: {
                color: 'rgba(189,199,209,.3)',
              },
            },
            axisLine: false,
            // boundaryGap:false
          },
        ],
        yAxis: [
          // {
          //   type: 'value',
          //   name: 'AT币价',
          //   min: 0,
          //   minInterval: 1,
          //   max: 'dataMax',
          //   show: false
          // },
          {
            type: 'value',
            name: 'AT挖矿成本',
            min: function(value) {
              // 满足最小值在坐标轴的2/3处
              return value.max - ((value.max - value.min) / 2) * 3
            },
            minInterval: 1,
            max: 'dataMax',
            show: false,
          },
          {
            type: 'value',
            name: '算力',
            min: 0,
            max: function(value) {
              return value.max * 3
            },
            show: false,
          },
        ],
        series: [
          {
            name: this.$t('m.atMing.atPrice'),
            type: 'line',
            yAxisIndex: 0,
            data: this.atPriceArray,
            showSymbol: false,
            itemStyle: {
              color: '#51AAFD',
            },
            lineStyle: {
              normal: {
                width: 1,
                shadowColor: 'rgba(90,173,253,0.23)',
                shadowBlur: 4,
                shadowOffsetY: 15,
              },
            },
            symbol: 'rect',
            areaStyle: {
              normal: {
                opacity: 1,
                color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(223,240,253,1)',
                  },
                  {
                    offset: 1,
                    color: '#fafafa',
                  },
                ]),
              },
            },
          },
          {
            name: this.$t('m.atMing.atMiningCost'),
            type: 'line',
            yAxisIndex: 0,
            data: this.atMiningCostArray,
            showSymbol: false,
            itemStyle: {
              color: '#FF378F',
            },
            lineStyle: {
              normal: {
                width: 1,
                shadowColor: 'rgba(255,60,220,0.31)',
                shadowBlur: 3,
                shadowOffsetY: 15,
              },
            },
            symbol: 'rect',
            // showSymbol: false
            // markArea: {
            //   data: [
            //     [{
            //       xAxis: "9/18 00:00-6:00 UTC+8"
            //     }, {
            //       xAxis: "9/18 12:00-18:00 UTC+8"
            //     }]
            //   ]
            // }
          },
          {
            name: this.$t('m.atMing.totalCP'),
            type: 'bar',
            yAxisIndex: 1,
            itemStyle: {
              color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255,184,0,.5)',
                },
                {
                  offset: 1,
                  color: 'rgba(255,223,72,.5)',
                },
              ]),
            },
            data: this.totalCPWithOtherCP,
          },
        ],
      })
      this.echart.hideLoading()
    },
  },
}
</script>

<style lang="scss" scoped>
$price-color: #399eff;
$cost-color: #ee438e;
$cal-color: #ffa323;

@mixin f12 {
  font-size: 12px;
  color: #777777;
}

.data-wrap {
  display: flex;
  align-items: flex-end;
}

.now-data_pc {
  padding-left: 45px;
  width: 15%;
  height: 400px;
  background-color: rgba(214, 214, 214, 0.2);
  .time {
    margin-top: 20px;
    margin-bottom: 30px;
    margin-left: -10px;

    @include f12;
  }
  .item {
    position: relative;
    margin-top: 15px;
    &.block:before {
      content: '';
      position: absolute;
      left: -10px;
      top: 3px;
      width: 7px;
      height: 11px;
      background-color: $price-color;
    }
    &.block2:before {
      background-color: $cost-color;
    }
    &.block3:before {
      background-color: $cal-color;
    }
    p:nth-of-type(1) {
      font-size: 15px;
      font-weight: bold;
      color: #333333;
    }
    p:nth-of-type(2) {
      margin-top: 5px;

      @include f12;
    }
  }
}

.chart-box {
  width: 85%;
  height: 330px;
}

.now-data_mobile {
  display: none;
  position: relative;
  top: 20px;
  margin: 20px 10px;
  //display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  border: 1px solid #d8d8d8;
  box-shadow: rgba(0, 0, 0, 0.04) 0 2px 5px 0;
  border-radius: 3px;
  .item {
    margin-top: 10px;
    font-size: 12px;
    color: #666666;
  }
  .block1 {
    color: $price-color;
  }
  .block2 {
    color: $cost-color;
  }
  .block3 {
    color: $cal-color;
  }
}

// @include screen-xs() {
//   .chart-box {
//     height: 170px;
//     width: 100%;
//   }
//   .now-data_pc {
//     display: none;
//   }
//   .now-data_mobile {
//     display: flex;
//     align-items: flex-end;
//     justify-content: space-between;
//   }
// }

// @include screen-sm() {
//   .now-data_pc {
//     padding-left: 20px;
//   }
// }
</style>
