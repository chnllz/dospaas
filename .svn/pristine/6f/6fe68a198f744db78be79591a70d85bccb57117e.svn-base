<template>
  <div class="useMonitor">
    <div class="box">
      <div class="content">
        <div class="color-fff gloTime font-12">
          <div>{{ nowTime }}</div>
          <div>{{ $t(monitor.technical) }}</div>
        </div>
        <!-- 头部 -->
        <div class="globalClass">
          <div class="topLogo topLogoImg">
            <img :src="heardImg" alt="" />
          </div>
          <div class="centerTitleHeight centerTitleImg">
            <div class="centerTitle">{{ $t(monitor.title) }}</div>
          </div>
        </div>
        <!-- 说明 -->
        <div
          v-if="monitor.help"
          class="gloExplainClass"
          @click="
            () => {
              openExplain = true
            }
          "
        >
          <img src="./assets/image/explain.png" class="explainImage" alt="" />
          <div class="color-ffc font-12">{{ $t('帮助说明') }}</div>
        </div>
        <!-- 中间 -->
        <div class="tableBox">
          <!-- 上半部分表格 -->
          <div class="topClass">
            <!-- 第一个 -->
            <subTable class="flex-2">
              <div slot="body" class="tFirBoxBody">
                <div class="color-fff font-21">{{ $t('当前等待') }}</div>
                <div class="firBox viewBoxClass">
                  <div v-for="(item, index) in currentWait" :key="index" class="firBoxItem">{{ item }}</div>
                  <div class="firBoxText">{{ $t('人') }}</div>
                </div>
                <div class="firTime global-flex-jus">
                  <div>
                    <div class="color-fff firTimeTitle">{{ $t('最长等待时长') }}</div>
                    <div class="firTimeText color-ff6">{{ max_wait }}</div>
                  </div>
                  <div>
                    <div class="color-fff firTimeTitle">{{ $t('平均等待时长') }}</div>
                    <div class="firTimeText color-4cb">{{ avg_wait }}</div>
                  </div>
                </div>
              </div>
            </subTable>
            <!-- 第二个 -->
            <subTable class="topSecClass">
              <div slot="body" class="secClass">
                <div class="global-flex-jus">
                  <div
                    v-for="(item, index) in secTopList"
                    :key="index"
                    class="secBox flex-1"
                    :style="{ marginRight: index !== secTopList.length - 1 ? '0.17rem' : '' }"
                  >
                    <div class="font-14 color-fff">{{ item.name }}</div>
                    <div class="font-32 secText color-2e6">{{ item.num }}</div>
                  </div>
                </div>
                <div class="secCenterBox">
                  <div class="secLineLeft flex-1"></div>
                  <div class="flex-2 phoneBox">
                    <img src="./assets/image/phone.png" class="phoneClass" />
                    <div>
                      <span class="font-18 color-fff">{{ $t('平均通话时长') }}：</span>
                      <span class="font-18 color-2e6">{{ call_data.avgBillingSeconds }}</span>
                    </div>
                  </div>
                  <div class="secLineRight flex-1"></div>
                </div>
                <div class="global-flex-jus text-center">
                  <div v-for="(item, index) in secBottomList" :key="index">
                    <div class="font-18 color-fff">{{ item.name }}</div>
                    <div class="font-32 font-600" :style="{ color: item.color }">{{ item.num }}</div>
                  </div>
                </div>
              </div>
            </subTable>
            <!-- 第三个 -->
            <subTable style="flex: 300px">
              <div slot="body" class="fullClass">
                <div ref="pie" class="fullClass"></div>
              </div>
            </subTable>
          </div>
          <!-- 下半部分表格 -->
          <div class="global-flex-jus bottomClass">
            <!-- 第一个 -->
            <subTable class="bottomFirBox">
              <div slot="body" class="fullClass bFirBoxBody">
                <div class="color-fff font-21 bFirText">{{ $t('近12小时通话') }}</div>
                <div ref="charts" class="bChart bChartFirst"></div>
              </div>
            </subTable>
            <!-- 第二个 -->
            <subTable style="flex: 295px">
              <div slot="body" class="fullClass bSecBoxBody">
                <div class="color-fff font-21">{{ $t('坐标状态') }}</div>
                <div ref="charts_pieHollow" class="bChart bChartTop"></div>
              </div>
            </subTable>
          </div>
        </div>
      </div>
      <a-modal
        title="说明"
        :visible="openExplain"
        :bodyStyle="{ maxHeight: '500px', overflowY: 'height' > 500 ? 'scroll' : 'auto' }"
      >
        <div>{{ $t(monitor.help) }}</div>
        <div slot="footer">
          <a-button @click="() => (openExplain = false)">{{ $t('关闭') }}</a-button>
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script>
import './assets/css/chartframe.less'
import echarts from 'echarts'
import { serverView } from './mock/monitordata.js'
export default {
  components: {
    subTable: () => import('./components/subTable')
  },
  data () {
    return {
      heardImg: '',
      nowTime: null,
      // 时间定时器
      timeid: null,
      secTopList: [{
        name: this.$t('来电数'),
        alias: 'callInCount',
        num: 0
      }, {
        name: this.$t('应答数'),
        alias: 'answerCount',
        num: 0
      }, {
        name: this.$t('放弃数'),
        alias: 'hangUpCount',
        num: 0
      }, {
        name: this.$t('未接数'),
        alias: 'ringingMissedCount',
        num: 0
      }],
      secBottomList: [{
        name: this.$t('呼出数'),
        alias: 'callOutCount',
        color: '#25D9FD',
        num: 0
      }, {
        name: this.$t('呼出接通数'),
        alias: 'callOutAnswerCount',
        color: '#824EE2',
        num: 0
      }, {
        name: this.$t('呼出未接数'),
        alias: 'callOutUnAnswerCount',
        color: '#EB3374',
        num: 0
      }, {
        name: this.$t('呼出接听率'),
        alias: 'callOutAnswerRate',
        color: '#34FF9A',
        num: '0%'
      }],
      chartsOptions: {
        // 柱状图
        charts: {
          grid: {
            left: '10px',
            right: '10px',
            bottom: '10px',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
          },
          color: ['#2E64FF', '#00D9FF', '#824EE2', '#314A78', '#0d5da2', '#147AFC', '#ffffff'],
          toolbox: { show: false },
          // 柱子数量
          legend: {
            data: [{
              icon: 'circle',
              name: this.$t('呼入量')
            }, {
              icon: 'circle',
              name: this.$t('转坐席量')
            }, {
              icon: 'circle',
              name: this.$t('接听量')
            }, {
              icon: 'circle',
              name: this.$t('放弃量')
            }, {
              icon: 'circle',
              name: this.$t('未接量')
            }
              // {
              //   name: this.$t('接通率')
              // }
            ],
            right: '0',
            textStyle: {
              color: '#ffffff'
            }
          },
          // X轴名称
          xAxis: {
            type: 'category',
            data: [],
            splitLine: {
              show: true,
              lineStyle: {
                color: '#ffffff',
                type: 'dashed',
                width: 0.5
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              color: '#ffffff'
            }
          },
          yAxis: [{
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: '#ffffff',
                type: 'dashed',
                width: 0.5
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#ffffff'
            },
            axisLine: {
              show: false
            }
          }],
          // 对应柱子高度
          series: [{
            name: this.$t('呼入量'),
            type: 'bar',
            itemStyle: {
              normal: { barBorderRadius: [30, 30, 0, 0] }
            },
            data: []
          }, {
            name: this.$t('转坐席量'),
            type: 'bar',
            itemStyle: {
              normal: { barBorderRadius: [30, 30, 0, 0] }
            },
            data: []
          }, {
            name: this.$t('接听量'),
            type: 'bar',
            itemStyle: {
              normal: { barBorderRadius: [30, 30, 0, 0] }
            },
            data: []
          }, {
            name: this.$t('放弃量'),
            type: 'bar',
            itemStyle: {
              normal: { barBorderRadius: [30, 30, 0, 0] }
            },
            data: []
          }, {
            name: this.$t('未接量'),
            type: 'bar',
            itemStyle: {
              normal: { barBorderRadius: [30, 30, 0, 0] }
            },
            data: []
          }, {
            name: this.$t('接通率'),
            type: 'line',
            smooth: true,
            data: []
          }]
        },
        // 饼状图
        pie: {
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              return `${this.$t(params.name)}\n\n${params.value}%`
            }
          },
          color: ['#2E64FF', '#7D24FB'],
          legend: {
            orient: 'vertical',
            bottom: '50%',
            right: '10%',
            data: ['接通率', '放弃率'],
            textStyle: {
              color: '#ffffff'
            }
          },
          series: {
            type: 'pie',
            label: {
              position: 'inner',
              formatter: (params) => {
                return `${this.$t(params.name)}\n\n${params.value}%`
              }
            },
            right: '30%',
            labelLine: {
              show: false
            },
            data: [
              { value: 0, name: '放弃率' },
              { value: 0, name: '接通率' }
            ]
          }
        },
        // 空心饼状图
        charts_pieHollow: {
          color: ['#7D24FB', '#2E64FB', '#b6a2de', '#00D9FF', '#EB3374', '#0B1095'],
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              return `${this.$t(params.name)}\n\n${params.value}%`
            }
          },
          legend: {
            icon: 'circle',
            bottom: 0,
            textStyle: {
              color: '#ffffff',
              fontSize: 12
            }
          },
          series: [
            {
              type: 'pie',
              radius: ['24%', '43%'],
              labelLine: {
                length: 33,
                lineStyle: {
                  color: '#2D99FF'
                }
              },
              label: {
                formatter: (params) => {
                  return `{b|${this.$t(params.name)}}\n{d|${params.value}}`
                },
                rich: {
                  b: {
                    color: '#ffffff',
                    fontSize: 14
                  },
                  d: {
                    color: '#00DDFF',
                    fontSize: 20
                  }
                }
              },
              data: [
                { value: 300, name: '离线' },
                { value: 1048, name: '在线' },
                { value: 735, name: '空闲' },
                { value: 580, name: '示忙' },
                { value: 484, name: '通话' },
                { value: 300, name: '振铃' }
              ]
            }
          ]
        }
      },
      fn: null,
      chartview: null,
      chartpie: null,
      pieline: null,
      pieHollow: null,
      avg_wait: '00:00:00', // 平均等待时长
      max_wait: '00:00:00', // 最长等待时长
      currentWait: [], // 当前等待
      call_data: {},
      openExplain: false,
      timeOutCurrent: null,
      initNum: 0,
      monitor: {}
    }
  },
  activated () {
    if (this.initNum > 1) {
      this.getInit()
      this.fn = this.resizeHandler()
      this.$nextTick(() => {
        this.fn()
        window.addEventListener('resize', this.fn)
      })
      this.changeTime()
    }
  },
  // 销毁循环
  deactivated () {
    clearInterval(this.timeid)
    clearTimeout(this.timeOutCurrent)
    window.removeEventListener('resize', this.fn)
  },
  mounted () {
    this.getInit()
    this.changeTime()
  },
  methods: {
    getInit () {
      this.axios({
        url: '/monitor/base/getConfig'
      }).then(res => {
        if (res.code === 0) {
          const result = res.result
          if (result.monitorLogo) {
            this.heardImg = `${this.$store.state.env.VUE_APP_API_BASE_URL}/admin/api/download/?filePath=/${result.monitorLogo.filePath}`
          }
          this.monitor = {
            title: result.monitorMacroTrafficTitle,
            enable: result.monitorMacroTrafficEnable,
            help: result.monitorMacroTrafficHelp,
            refresh: result.monitorMacroTrafficRefresh,
            technical: result.monitorTechnicalSupport
          }
          if (res.result.monitorMacroTrafficEnable) {
            const data = serverView().result.data
            this.changeData(data)
          } else {
            this.loaddata()
          }
        }
      })
    },
    changeTime () {
      this.nowTime = this.moment().format('YYYY-MM-DD HH:mm:ss')
      this.timeid = setInterval(() => {
        this.nowTime = this.moment().format('YYYY-MM-DD HH:mm:ss')
      }, 1000)
    },
    // 转化数值
    changeData (res) {
      this.avg_wait = res.avgWaitingTime
      const currentWait = res.currentWaitCount.toString()
      const arr = []
      this.call_data = res
      this.secBottomList.forEach(item => {
        item.num = res[item.alias] || 0
      })
      for (let i = 0; i < currentWait.length; i++) {
        arr.push(currentWait[i])
      }
      this.currentWait = arr
      this.max_wait = res.maximumWaitingTime
      this.secTopList.forEach(item => {
        item.num = res[item.alias] || 0
      })
      const dataOf12Hour = res.dataOf12Hour
      this.chartsOptions.charts.xAxis.data = dataOf12Hour.hour
      this.chartsOptions.charts.series[0].data = dataOf12Hour.callInCount
      this.chartsOptions.charts.series[1].data = dataOf12Hour.turnAgentCount
      this.chartsOptions.charts.series[2].data = dataOf12Hour.connectCount
      this.chartsOptions.charts.series[3].data = dataOf12Hour.hangUpCount
      this.chartsOptions.charts.series[4].data = dataOf12Hour.ringingMissedCount
      // this.chartsOptions.charts.series[5].data = dataOf12Hour.value_connect
      this.chartsOptions.pie.series.data[0].value = parseFloat(this.call_data.hangUpRate.split('%')[0])
      this.chartsOptions.pie.series.data[1].value = parseFloat(this.call_data.connectRate.split('%')[0])
      this.chartsOptions.pie.legend.formatter = (name) => {
        const data = this.chartsOptions.pie.series.data
        const obj = data.filter(item => item.name === name)
        return `${this.$t(obj[0].name)} (${obj[0].value}%)`
      }
      const agentStatus = res.agentStatus
      this.chartsOptions.charts_pieHollow.series[0].data[0].value = agentStatus.offline
      this.chartsOptions.charts_pieHollow.series[0].data[1].value = agentStatus.login
      this.chartsOptions.charts_pieHollow.series[0].data[2].value = agentStatus.idle
      this.chartsOptions.charts_pieHollow.series[0].data[3].value = agentStatus.busy
      this.chartsOptions.charts_pieHollow.series[0].data[4].value = agentStatus.call
      this.chartsOptions.charts_pieHollow.series[0].data[5].value = agentStatus.ringing
      this.chartsOptions.charts_pieHollow.legend.formatter = (name) => {
        const data = this.chartsOptions.charts_pieHollow.series[0].data
        const obj = data.filter(item => item.name === name)[0]
        return `${this.$t(name)} ${obj.value}`
      }
      this.drowerpic()
      if (!this.monitor.enable) {
        clearTimeout(this.timeOutCurrent)
        this.setTime()
      }
    },
    setTime () {
      this.timeOutCurrent = setTimeout(() => {
        this.loaddata()
      }, (this.monitor.refresh || 5) * 1000)
    },
    // 请求接口数据
    loaddata () {
      this.axios({
        url: '/callcenter/monitor/macroTraffic'
      }).then(res => {
        this.initNum++
        this.changeData(res.result.data)
      })
    },
    // 渲染图表
    drowerpic () {
      this.chartpie = echarts.init(this.$refs.pie)
      this.chartpie.setOption(this.chartsOptions.pie, true)
      this.chartview = echarts.init(this.$refs.charts)
      this.chartview.setOption(this.chartsOptions.charts, true)
      this.pieHollow = echarts.init(this.$refs.charts_pieHollow)
      this.pieHollow.setOption(this.chartsOptions.charts_pieHollow, true)
    },
    // 处理页面大小改变
    resizeHandler () {
      let timer
      return () => {
        if (timer) window.clearTimeout(timer)
        timer = window.setTimeout(() => {
          if (this.pieHollow) { this.pieHollow.resize() }
          if (this.chartview) { this.chartview.resize() }
          if (this.chartpie) { this.chartpie.resize() }
          if (this.pieline) { this.pieline.resize() }
        }, 500)
      }
    }
  }
}
</script>
