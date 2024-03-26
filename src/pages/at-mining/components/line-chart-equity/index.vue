<template>
  <div class="data-wrap clearfix">
    <div class="chart-line-equity pull-left"></div>
    <div class="now-data_pc pull-right">
      <div class="time f12">{{dateList[dateList.length-1]? dateList[dateList.length-1]:''}}</div>
      <div class="item block block1">
        <!-- <p>{{thousandAtAwardArray[thousandAtAwardArray.length-1] ?(thousandAtAwardArray[thousandAtAwardArray.length-1] + ' USDT'):''}}</p> -->
        <p>{{thousandAtAwardArray[thousandAtAwardArray.length-1] ?addUnit(thousandAtAwardArray[thousandAtAwardArray.length-1]):''}}</p>
        <p>{{$t('m.atMing.equityOne.explain')}}</p>
      </div>
      <div class="item block block2">
        <p>{{atAwardPerDayArray[atAwardPerDayArray.length-1]?(atAwardPerDayArray[atAwardPerDayArray.length-1]):''}}
          <span style='fontsize:12px;'>%</span>
        </p>
        <p>{{$t('m.atMing.dailyRate')}}</p>
      </div>
      <div class="item block block3">
        <p>{{atAwardPerWeekArray[atAwardPerWeekArray.length-1]?(atAwardPerWeekArray[atAwardPerWeekArray.length-1]):''}}
          <span style='fontsize:12px;'>%</span>
        </p>
        <p>{{$t('m.atMing.weekRate')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '../../mixins/equity-mixin'
export default {
  mixins: [mixin],
  watch: {
    lastSevenAtAwards() {
      this.draw()
    },
  },
  mounted() {
    this.init()
    this.draw()
  },
  methods: {
    init() {
      this.echart = window.echarts.init(document.querySelector('.chart-line-equity'))
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
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'axis',
          padding: 20,
          position(point, params, dom, rect, size) {
            const left = point[0] < size.viewSize[0] / 2 ? 60 : -220
            return [point[0] + left, '0%']
          },
          borderRadius: 0,
          backgroundColor: '#ffffff',
          borderColor: '#F1CFB2',
          borderWidth: '0.5',
          textStyle: {
            color: '#777777',
            fontSize: '12',
          },
          formatter(params) {
            let res = params[0].name
            for (let i = 0; i < params.length; i++) {
              if (i === 0) {
                res += `<p style="padding:5px 0; color:#399eff;"><span>${
                  params[i].seriesName
                }:</span><span style="margin-left:5px;">${self.addUnit(params[i].value)}</span></p>`
                continue
              }
              if (i === 1) {
                res += `<p style="padding:5px 0; color:#ee4343;"><span>${
                  params[i].seriesName
                }:</span><span style="margin-left:5px;">${params[i].value}%</span></p>`
                continue
              }
              if (i === 2) {
                res += `<p style="padding:5px 0; color:#FF8200;"><span>${
                  params[i].seriesName
                }:</span><span style="margin-left:5px;">${params[i].value}%</span></p>`
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
          x: '-20%', // 默认是80px
          y: 0, // 默认是60px
          x2: '-20%', // 默认80px
          y2: 30, // 默认60px
        },
        // legend: {
        //   data: ['算力', 'AT币价', 'AT挖矿成本'],
        // },
        xAxis: [
          {
            type: 'category',
            // data: cloneDeep(this.dateList).reverse(),
            data: this.virtualDateList.map(v => {
              return {
                value: v.replace('/', '.'),
                textStyle: {
                  color: '#333',
                },
              }
            }),
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ccc',
              },
            },
            axisPointer: {
              type: 'line',
              lineStyle: {
                color: 'rgba(224,111,13,.3)',
              },
            },
            // boundaryGap:false
          },
        ],
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        series: [
          {
            name: this.$t('m.atMing.hundredProfit'),
            type: 'line',
            itemStyle: {
              color: '#399EFF',
            },
            lineStyle: {
              normal: {
                width: 1,
                shadowColor: 'rgba(57,158,255,.25)',
                shadowBlur: 8,
                shadowOffsetY: 15,
              },
            },
            showSymbol: false,
            data: this.virtualThousandAtAwardArray,
            symbolSize: 15,
            // symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAAH7+Yj7AAAAAXNSR0IArs4c6QAABYtJREFUWAm9Wc9r3UUQn9n30gS0NXqx0XqQ2lY8WFqLJqaCWqhUtIKgBxHUk+AhTVpF8A/wom1iBT2q4EWFgD9oMVAs2DRBqqUexFSDFzH1IjFVSPre+44z8/3uvv3ud7953/eiLrzs7szsZ+e7szszuwHICg1P7qX7T26XLsofGj7xuNS2GJHQDuFnID8uBkztTyth6+hwywQaPf6o7WA4CfThhbpyswm03aDDxg7J6iWp61Azl6GVHLZMnD/6uc4uhAK2leJBODu+EKhpEIg+tTKA5FCNr3JOSKdJV0KaBmePnYohMG3JR2zr+MDkEDRonxuUNeRDpOkEpUMH37gO/qrfB2RWce7IeaHZkn4MEcLI5GOW6NcWMV3IEiEZYJctbxvfHADT/DHvKzomP3mmwVEltv886ZpkdrQFCcccI9JoCxp6JsJ3JAM1ammPuEZ83XE888GN9ZnA1k4s1+i8e9Bcw7nxL2VUzjIWhkandvF+3Gn70VpU7ts7g2cfavp8B0jrWNEfEG3XYAlnj14QXvrN62rE9iJ4lkVvYoN+wyOmeHunCxqg69roBlypPRzweM+0z0CBJwS1TDIf8ozu5pBK+G5IKvSJXivQmGDkaBQYCD8XaBUJJjxn6Tg6zvX0uhj+BrSCdbyaGuXBr+qwevGQpfdUZ3vRbRsBodET+6AFQ10D3rbtFH7ytFo+B+gD0cjbdwI1dvg01+ZPg821OTw9tuZoWaMUUPgacohuBtMcVOMlsAxbmgs488rfIZDtFwBJ1rPx3UFoYc0KRevM84e8HGClMxwizE18gYhkyQ6wZ4MIkgeqHpEkWPRiXauW5/VTFxuJPCqLso54jA3yEZ9tPo4Fx24hecuxy+NSz7aHY7gG4fPsZbJIoEt0K/dfZVBxDE8AJG7ddEzqPxf4LMf2mhlmoXZYcbNkDT+EezzxXOkne0RtlniSvFjk81fqu+KA+ZHxnjrdgGVgsHdA8eBhwWSgd0AJB2FJ6stlgJqOhfK5vsSWsCD+bkA8R1iQXgxJQX86Fqjw/NiiETcUCKfd1CMXNZXgZNMZf2CWWuhZppGpR4CSTT6/6/bAntMS9HUNbRrRNYgdIK4syyDaRmE3bvld1Zo1jC/YMc59WUJXn88pPH49kVvnAqAA06GT/XC1NQJN2mwnytWcW+Lcyz/maFknChgTFJpOtHztdqjVtpZOVjZYtmerdQUGN/0SC25lwzoqqM68iXdveFeFGnBewM74+9AEBbGQIH166uMa/Pbrng1FmRhwGY03Htyy7aLNPXyxwgr2FJh9xI20I5mDU1DTj7VLB/51U3arsJi+f/cZ6xdUQd38K40DHXOj3GQcZYleYFKnVJKvtfgeh/BCbp+D8zviVrf0nZHDlN70xQV0StwsgOQSGv7zKYNlR+oh/hC+K+hatK+tEUFHEl1EJ4CzqOlp0rzLMcsakjEl8A6zO61YGYKlL/Et5qVYdLMCrjb1HzhJ4ty5SiEYZ7GNKicz8YoqVudZWTd+IOLEvkohvLeKWCWZqlisW/zKGJ2F/oiSeyJWxOLrrOF9tVxpDoQPK8lVEaqKxboZua9VweT4Mpt7pKk2qCilzwmMVaXIXVLkaORNvr2a+O21AKSPgc8xufymURijBHYx+EHhShOXZa+UZjiqoMj0FOLE9RDItYidNtzBqNldgPdY+vQxz/V8JZfiK+qFPKegKlnyZumP/c/bQZKZU1CVlEe0/ZP3/G+ZjP1iyWjOTXzrvwYIq6CgldfXvv1v7ez4bGgH9FqzOeHckcuhYhauVEErIHX60HKJ/0nQ2l45ZvsAflvvV7VF6Nu9aDMWnx22KykYDpJ++mzevxWS1g2AZoBPXfpTJr8XypshJav6r4zr166s9/QUw7e0fwCqYgKPcSsuMAAAAABJRU5ErkJggg==',
            symbol: 'none',
            zlevel: 10,
          },
          {
            name: this.$t('m.atMing.dailyRate'),
            type: 'line',
            data: this.virtualAtAwardPerDayArray,
            showSymbol: false,
            itemStyle: {
              color: '#EE438E',
            },
            lineStyle: {
              normal: {
                width: 1,
                shadowColor: 'rgba(238,67,142,.25)',
                shadowBlur: 8,
                shadowOffsetY: 15,
              },
            },
            symbolSize: 15,
            // symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAAH7+Yj7AAAAAXNSR0IArs4c6QAABYtJREFUWAm9Wc9r3UUQn9n30gS0NXqx0XqQ2lY8WFqLJqaCWqhUtIKgBxHUk+AhTVpF8A/wom1iBT2q4EWFgD9oMVAs2DRBqqUexFSDFzH1IjFVSPre+44z8/3uvv3ud7953/eiLrzs7szsZ+e7szszuwHICg1P7qX7T26XLsofGj7xuNS2GJHQDuFnID8uBkztTyth6+hwywQaPf6o7WA4CfThhbpyswm03aDDxg7J6iWp61Azl6GVHLZMnD/6uc4uhAK2leJBODu+EKhpEIg+tTKA5FCNr3JOSKdJV0KaBmePnYohMG3JR2zr+MDkEDRonxuUNeRDpOkEpUMH37gO/qrfB2RWce7IeaHZkn4MEcLI5GOW6NcWMV3IEiEZYJctbxvfHADT/DHvKzomP3mmwVEltv886ZpkdrQFCcccI9JoCxp6JsJ3JAM1ammPuEZ83XE888GN9ZnA1k4s1+i8e9Bcw7nxL2VUzjIWhkandvF+3Gn70VpU7ts7g2cfavp8B0jrWNEfEG3XYAlnj14QXvrN62rE9iJ4lkVvYoN+wyOmeHunCxqg69roBlypPRzweM+0z0CBJwS1TDIf8ozu5pBK+G5IKvSJXivQmGDkaBQYCD8XaBUJJjxn6Tg6zvX0uhj+BrSCdbyaGuXBr+qwevGQpfdUZ3vRbRsBodET+6AFQ10D3rbtFH7ytFo+B+gD0cjbdwI1dvg01+ZPg821OTw9tuZoWaMUUPgacohuBtMcVOMlsAxbmgs488rfIZDtFwBJ1rPx3UFoYc0KRevM84e8HGClMxwizE18gYhkyQ6wZ4MIkgeqHpEkWPRiXauW5/VTFxuJPCqLso54jA3yEZ9tPo4Fx24hecuxy+NSz7aHY7gG4fPsZbJIoEt0K/dfZVBxDE8AJG7ddEzqPxf4LMf2mhlmoXZYcbNkDT+EezzxXOkne0RtlniSvFjk81fqu+KA+ZHxnjrdgGVgsHdA8eBhwWSgd0AJB2FJ6stlgJqOhfK5vsSWsCD+bkA8R1iQXgxJQX86Fqjw/NiiETcUCKfd1CMXNZXgZNMZf2CWWuhZppGpR4CSTT6/6/bAntMS9HUNbRrRNYgdIK4syyDaRmE3bvld1Zo1jC/YMc59WUJXn88pPH49kVvnAqAA06GT/XC1NQJN2mwnytWcW+Lcyz/maFknChgTFJpOtHztdqjVtpZOVjZYtmerdQUGN/0SC25lwzoqqM68iXdveFeFGnBewM74+9AEBbGQIH166uMa/Pbrng1FmRhwGY03Htyy7aLNPXyxwgr2FJh9xI20I5mDU1DTj7VLB/51U3arsJi+f/cZ6xdUQd38K40DHXOj3GQcZYleYFKnVJKvtfgeh/BCbp+D8zviVrf0nZHDlN70xQV0StwsgOQSGv7zKYNlR+oh/hC+K+hatK+tEUFHEl1EJ4CzqOlp0rzLMcsakjEl8A6zO61YGYKlL/Et5qVYdLMCrjb1HzhJ4ty5SiEYZ7GNKicz8YoqVudZWTd+IOLEvkohvLeKWCWZqlisW/zKGJ2F/oiSeyJWxOLrrOF9tVxpDoQPK8lVEaqKxboZua9VweT4Mpt7pKk2qCilzwmMVaXIXVLkaORNvr2a+O21AKSPgc8xufymURijBHYx+EHhShOXZa+UZjiqoMj0FOLE9RDItYidNtzBqNldgPdY+vQxz/V8JZfiK+qFPKegKlnyZumP/c/bQZKZU1CVlEe0/ZP3/G+ZjP1iyWjOTXzrvwYIq6CgldfXvv1v7ez4bGgH9FqzOeHckcuhYhauVEErIHX60HKJ/0nQ2l45ZvsAflvvV7VF6Nu9aDMWnx22KykYDpJ++mzevxWS1g2AZoBPXfpTJr8XypshJav6r4zr166s9/QUw7e0fwCqYgKPcSsuMAAAAABJRU5ErkJggg==',
            symbol: 'none',
            zlevel: 10,
          },
          {
            name: this.$t('m.atMing.weekRate'),
            type: 'line',
            data: this.virtualAtAwardPerWeekArray,
            showSymbol: false,
            itemStyle: {
              color: '#FFA323',
            },
            lineStyle: {
              normal: {
                width: 1,
                shadowColor: 'rgba(255,163,35,.25)',
                shadowBlur: 8,
                shadowOffsetY: 15,
              },
            },
            zlevel: 100,
            symbolSize: 15,
            symbol:
              'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAAH7+Yj7AAAAAXNSR0IArs4c6QAABYtJREFUWAm9Wc9r3UUQn9n30gS0NXqx0XqQ2lY8WFqLJqaCWqhUtIKgBxHUk+AhTVpF8A/wom1iBT2q4EWFgD9oMVAs2DRBqqUexFSDFzH1IjFVSPre+44z8/3uvv3ud7953/eiLrzs7szsZ+e7szszuwHICg1P7qX7T26XLsofGj7xuNS2GJHQDuFnID8uBkztTyth6+hwywQaPf6o7WA4CfThhbpyswm03aDDxg7J6iWp61Azl6GVHLZMnD/6uc4uhAK2leJBODu+EKhpEIg+tTKA5FCNr3JOSKdJV0KaBmePnYohMG3JR2zr+MDkEDRonxuUNeRDpOkEpUMH37gO/qrfB2RWce7IeaHZkn4MEcLI5GOW6NcWMV3IEiEZYJctbxvfHADT/DHvKzomP3mmwVEltv886ZpkdrQFCcccI9JoCxp6JsJ3JAM1ammPuEZ83XE888GN9ZnA1k4s1+i8e9Bcw7nxL2VUzjIWhkandvF+3Gn70VpU7ts7g2cfavp8B0jrWNEfEG3XYAlnj14QXvrN62rE9iJ4lkVvYoN+wyOmeHunCxqg69roBlypPRzweM+0z0CBJwS1TDIf8ozu5pBK+G5IKvSJXivQmGDkaBQYCD8XaBUJJjxn6Tg6zvX0uhj+BrSCdbyaGuXBr+qwevGQpfdUZ3vRbRsBodET+6AFQ10D3rbtFH7ytFo+B+gD0cjbdwI1dvg01+ZPg821OTw9tuZoWaMUUPgacohuBtMcVOMlsAxbmgs488rfIZDtFwBJ1rPx3UFoYc0KRevM84e8HGClMxwizE18gYhkyQ6wZ4MIkgeqHpEkWPRiXauW5/VTFxuJPCqLso54jA3yEZ9tPo4Fx24hecuxy+NSz7aHY7gG4fPsZbJIoEt0K/dfZVBxDE8AJG7ddEzqPxf4LMf2mhlmoXZYcbNkDT+EezzxXOkne0RtlniSvFjk81fqu+KA+ZHxnjrdgGVgsHdA8eBhwWSgd0AJB2FJ6stlgJqOhfK5vsSWsCD+bkA8R1iQXgxJQX86Fqjw/NiiETcUCKfd1CMXNZXgZNMZf2CWWuhZppGpR4CSTT6/6/bAntMS9HUNbRrRNYgdIK4syyDaRmE3bvld1Zo1jC/YMc59WUJXn88pPH49kVvnAqAA06GT/XC1NQJN2mwnytWcW+Lcyz/maFknChgTFJpOtHztdqjVtpZOVjZYtmerdQUGN/0SC25lwzoqqM68iXdveFeFGnBewM74+9AEBbGQIH166uMa/Pbrng1FmRhwGY03Htyy7aLNPXyxwgr2FJh9xI20I5mDU1DTj7VLB/51U3arsJi+f/cZ6xdUQd38K40DHXOj3GQcZYleYFKnVJKvtfgeh/BCbp+D8zviVrf0nZHDlN70xQV0StwsgOQSGv7zKYNlR+oh/hC+K+hatK+tEUFHEl1EJ4CzqOlp0rzLMcsakjEl8A6zO61YGYKlL/Et5qVYdLMCrjb1HzhJ4ty5SiEYZ7GNKicz8YoqVudZWTd+IOLEvkohvLeKWCWZqlisW/zKGJ2F/oiSeyJWxOLrrOF9tVxpDoQPK8lVEaqKxboZua9VweT4Mpt7pKk2qCilzwmMVaXIXVLkaORNvr2a+O21AKSPgc8xufymURijBHYx+EHhShOXZa+UZjiqoMj0FOLE9RDItYidNtzBqNldgPdY+vQxz/V8JZfiK+qFPKegKlnyZumP/c/bQZKZU1CVlEe0/ZP3/G+ZjP1iyWjOTXzrvwYIq6CgldfXvv1v7ez4bGgH9FqzOeHckcuhYhauVEErIHX60HKJ/0nQ2l45ZvsAflvvV7VF6Nu9aDMWnx22KykYDpJ++mzevxWS1g2AZoBPXfpTJr8XypshJav6r4zr166s9/QUw7e0fwCqYgKPcSsuMAAAAABJRU5ErkJggg==',
          },
        ],
      })
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
  margin: 0 auto 100px;
  max-width: 1200px;
}

.now-data_pc {
  padding-left: 25px;
  width: 15%;
  height: 250px;
  background-color: #fafafa;
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

.chart-line-equity {
  width: 85%;
  height: 279px;
}

.now-data_mobile {
  display: none;
  position: relative;
  top: 20px;
  margin: 20px 10px;
  //display: flex;
  justify-content: space-between;
  padding: 10px 25px;
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
//   .data-wrap {
//     display: none;
//   }
//   .chart-line-box {
//     display: none;
//     height: 170px;
//     width: 100%;
//   }
//   .now-data_pc {
//     display: none;
//   }
//   .now-data_mobile {
//     display: flex;
//   }
// }

// @include screen-sm() {
//   .now-data_pc {
//     display: none;
//     padding-left: 20px;
//   }
// }
</style>
