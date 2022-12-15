<template>
  <div ref="main" style="height: 400px"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      myChart: null,
      screenWidth: null,
      screenHeight: null
    }
  },
  watch: {
    screenWidth (val) {
      this.myChart.resize()
    },
    screenHeight (val) {
      this.myChart.resize()
    }
  },
  mounted () {
    const me = this
    window.onresize = function () { // 定义窗口大小变更通知事件
      me.screenWidth = document.documentElement.clientWidth // 窗口宽度
      me.screenHeight = document.documentElement.clientHeight // 窗口高度
    }
    this.myEcharts()
  },
  methods: {
    myEcharts () {
      this.myChart = echarts.init(this.$refs.main)
      const labelOption = {
        show: true,
        position: 'top'
      }
      const option = {
        grid: {
          left: '10px',
          right: '10px',
          bottom: '10px',
          containLabel: true
        },
        color: ['#003366', '#006699', '#4cabce', '#e5323e'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Forest', 'Steppe', 'Desert', 'Wetland']
        },
        toolbox: {
          show: false
        },
        xAxis: [{
          type: 'category',
          axisTick: { show: false },
          data: ['2012', '2013', '2014', '2015', '2016']
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: 'Forest',
          type: 'bar',
          label: labelOption,
          barGap: '10%',
          data: [320, 332, 301, 334, 390]
        }, {
          name: 'Steppe',
          type: 'bar',
          label: labelOption,
          data: [220, 182, 191, 234, 290]
        }, {
          name: 'Desert',
          type: 'bar',
          label: labelOption,
          data: [150, 232, 201, 154, 190]
        }, {
          name: 'Wetland',
          type: 'bar',
          label: labelOption,
          data: [98, 77, 101, 99, 40]
        }]
      }
      this.myChart.setOption(option)
    }
  }
}
</script>
