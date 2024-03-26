<template>
  <div class="pie-chart">
  </div>
</template>

<script>
export default {
  name: 'piechart',
  props: ['token_allocation_chart'],
  computed: {
    genData() {
      let legendData = []
      let seriesData = []
      // 转换成json对象
      let jsonData = JSON.parse(this.token_allocation_chart)
      let data = Object.values(jsonData)
      for (let i = 0; i < data.length; i++) {
        let name = data[i].name
        let value = data[i].value
        legendData.push(data[i].name)
        seriesData.push({
          name: name,
          value: value
        })
      }

      return {
        legendData: legendData,
        seriesData: seriesData,
      }
    },
  },
  mounted() {
    this.init()
    this.draw()
  },
  methods: {
    init() {
      const el = document.querySelector('.pie-chart')
      this.echart = window.echarts.init(el)
      // window.addEventListener('resize', () => {
      //   this.echart.resize({
      //     width: 'auto',
      //     height: 'auto',
      //   })
      // })
    },
    draw() {
      this.echart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
          // formatter: '{a} <br/>{b}'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right:10,
          y: 'center',
          data: this.genData.legendData,
          // formatter:
        },
        series: [
          {
            name:'',
            type:'pie',
            radius: '55%',
            center: ['40%', '50%'],
            // avoidLabelOverlap: true,
            // label: {
            //   normal: {
            //     show: false,
            //     position: 'center'
            //   },
            // emphasis: {
            //   show: true,
            //   textStyle: {
            //     fontSize: '30',
            //     fontWeight: 'bold'
            //   }
            // }
            // },
            // labelLine: {
            //   normal: {
            //     show: true,
            //   }
            // },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: this.genData.seriesData
          }
        ]
      })
    },

  }
}
</script>

