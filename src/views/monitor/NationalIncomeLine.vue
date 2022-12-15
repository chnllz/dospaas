<template>
  <div class="useMonitor">
    <div class="box">
      <div class="content" style="height: 100%">
        <div class="color-fff gloTime font-12">
          <div>{{ nowTime }}</div>
          <div>{{ $t(monitor.technical) }}</div>
        </div>
        <!-- 头部 -->
        <div class="globalClass toHead">
          <div class="topLogo topLogoImg">
            <img :src="heardImg" />
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
        <div class="tableBox glo-row">
          <!-- 左部分 -->
          <div class="flex-3 glo-flex glo-row">
            <div class="flex-1">
              <div class="color-fff font-18 toLeftEfficiency">{{ $t('历史进线数') }}</div>
              <div class="dialogNumListClass glo-flex">
                <div v-for="(item, index) in historyNumList" :key="index" class="dialogNumBox">
                  <div class="dialogNumItem dialogNumFirst"></div>
                  <div class="dialogNumItem dialogNumSecond"></div>
                  <div class="color-fff dialogNumText">{{ item }}</div>
                </div>
              </div>
              <div class="color-fff font-18 toLeftText">{{ $t('今日进线数') }}</div>
              <div class="dialogNumListClass glo-flex">
                <div v-for="(item, index) in todayNumList" :key="index" class="dialogNumBox">
                  <div class="dialogNumItem dialogNumFirst"></div>
                  <div class="dialogNumItem dialogNumSecond"></div>
                  <div class="color-fff dialogNumText">{{ item }}</div>
                </div>
              </div>
              <div class="color-fff font-18 toLeftText">{{ $t('接通率') }}</div>
              <div ref="charts_connectRate" class="toCenChart"></div>
            </div>
            <div class="flex-4">
              <div ref="charts_map" style="width: 100%; height: 100%"></div>
            </div>
          </div>
          <!-- 右部分 -->
          <div class="flex-1 naTableBox">
            <div class="naTableHead font-14">
              <div>{{ $t('排名') }}</div>
              <div>{{ $t('省份') }}</div>
              <div>{{ $t('进线量') }}</div>
              <div>{{ $t('接通量') }}</div>
              <div>{{ $t('接通率') }}</div>
            </div>
            <subTable style="width: 100%; height: 100%">
              <div slot="body" ref="rightBoxRef" class="tableBoxBody" style="height: 93%">
                <a-table
                  ref="table"
                  size="small"
                  rowKey="id"
                  :pagination="false"
                  :columns="columns"
                  :data-source="tableData"
                >
                  <template slot="pm" slot-scope="text">
                    <div
                      :class="[
                        text === 1 ? 'firstNum' : text === 2 ? 'secondNum' : text === 3 ? 'thirdNum' : 'otherNum'
                      ]"
                    >
                      {{ text }}
                    </div>
                  </template>
                  <template slot="province" slot-scope="text">{{ $t(text) }}</template>
                </a-table>
              </div>
            </subTable>
          </div>
        </div>
      </div>
      <a-modal
        :title="$t('说明')"
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
// 引入中国地图数据json
import china from 'echarts/map/json/china.json'
import AddressCoordinates from './assets/json/AddressCoordinates.js'
import { NationalIncomeLine } from './mock/monitordata.js'
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
      columns: [{
        title: '排名',
        dataIndex: 'pm',
        scopedSlots: { customRender: 'pm' },
        align: 'center'
      }, {
        title: '省份',
        dataIndex: 'province',
        scopedSlots: { customRender: 'province' },
        align: 'center'
      }, {
        title: '进线量',
        dataIndex: 'incomingLineCount',
        align: 'center'
      }, {
        title: '接通量',
        dataIndex: 'connectCount',
        align: 'center'
      }, {
        title: '接通率',
        dataIndex: 'connectRate',
        align: 'center'
      }],
      tableData: [],
      historyNumList: [],
      todayNumList: [],
      chartsOptions: {
        // 地图
        charts_map: {},
        // 接通率
        charts_connectRate: {
          color: ['#FF2994', '#582472'],
          // 圆点中间文字
          title: {
            textAlign: 'center',
            textStyle: {
              color: '#ffffff',
              fontSize: 16
            },
            x: 'middle',
            y: 'center'
          },
          tooltip: {
            show: false
          },
          legend: {
            show: false,
            textStyle: {
              color: '#8AC9FF',
              fontSize: 12
            },
            orient: 'vertical',
            right: 50, // 图例栏偏移
            top: 20,
            formatter: function (name) {
              return name
            }
          },
          series: [{
            name: '接通率',
            type: 'pie',
            hoverAnimation: false,
            radius: ['75%', '100%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'inner',
              formatter: '{b}：\n{c}'
            },
            labelLine: {
              normal: {
                show: true,
                length: 30,
                length2: 55
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { name: '接通率', value: 38 },
              { name: '不接通率', value: 62 }
            ]
          }]
        }
      },
      chartsMap: null,
      chartsConnectRate: null,
      openExplain: false,
      pageScroll: null,
      monitor: {},
      timeOutCurrent: null,
      initNum: 0,
      fn: null
    }
  },
  activated () {
    this.changeTime()
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
    clearInterval(this.pageScroll)
    clearTimeout(this.timeOutCurrent)
    window.removeEventListener('resize', this.fn)
  },
  mounted () {
    this.changeTime()
    this.getInit()
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
            title: result.monitorIncomingLinesTitle,
            enable: result.monitorIncomingLinesEnable,
            help: result.monitorIncomingLinesHelp,
            refresh: result.monitorIncomingLinesRefresh,
            technical: result.monitorTechnicalSupport
          }
          if (res.result.monitorIncomingLinesEnable) {
            const data = NationalIncomeLine().result.data
            this.changeData(data)
          } else {
            this.loaddata()
          }
        }
      })
    },
    // 滚动定时器
    scrollList () {
      this.pageScroll = setInterval(() => {
        if (this.$refs.rightBoxRef.scrollTop < this.$refs.rightBoxRef.scrollHeight - this.$refs.rightBoxRef.clientHeight) {
          this.$refs.rightBoxRef.scrollTop = this.$refs.rightBoxRef.scrollTop + 60
        } else {
          this.$refs.rightBoxRef.scrollTop = 0
        }
      }, (this.monitor.refresh || 5) * 1000)
    },
    // 时间定时器
    changeTime () {
      this.nowTime = this.moment().format('YYYY-MM-DD HH:mm:ss')
      this.timeid = setInterval(() => {
        this.nowTime = this.moment().format('YYYY-MM-DD HH:mm:ss')
      }, 1000)
    },
    // 赋值
    changeData (res) {
      this.historyNumList = JSON.stringify(res.historyIncomingLineCount).split('')
      this.todayNumList = JSON.stringify(res.todayIncomingLineCount).split('')
      const connectData = this.chartsOptions.charts_connectRate.series[0].data
      connectData[0].value = parseFloat(res.todayConnectionRate.split('%')[0])
      connectData[1].value = 100 - connectData[0].value
      res.provincialData.forEach((item, index) => {
        item.pm = index + 1
      })
      this.tableData = res.provincialData
      const connectRate = this.chartsOptions.charts_connectRate
      connectRate.title.text = res.todayConnectionRate
      const provincialIncoming = JSON.parse(JSON.stringify(res.provincialIncoming))
      const exitData = provincialIncoming.filter(item => item.value > 0)
      exitData.forEach(item => {
        const obj = AddressCoordinates.find(itemAddress => itemAddress.name === item.name)
        item.alias = item.value
        if (obj) {
          item.value = obj.value
        }
      })
      this.drawMap(res.provincialIncoming, exitData)
      this.drowerpic()
      setTimeout(() => {
        this.scrollList()
      }, (this.monitor.refresh || 5) * 1000)
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
    // 接口赋值
    loaddata () {
      this.axios({
        url: '/callcenter/monitor/incomingLines'
      }).then(res => {
        this.changeData(res.result.data)
      })
    },
    // 绘制地图
    drawMap (dataList, exitData) {
      this.chartsOptions.charts_map = {
        visualMap: {
          show: true,
          showLabel: true,
          seriesIndex: [0],
          textStyle: {
            color: '#ffffff'
          },
          pieces: [{
            gte: 1000,
            label: '>= 1000',
            color: '#151D61'
          }, {
            gte: 500,
            lt: 999,
            label: '500 - 999',
            color: '#1E2A7F'
          }, {
            gte: 100,
            lt: 499,
            label: '100 - 499',
            color: '#28389A'
          }, {
            gte: 10,
            lt: 99,
            label: '10 - 99',
            color: '#2E43B1'
          }, {
            lt: 10,
            label: '<10',
            color: '#3955D3'
          }]
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            if (params.data.value) {
              return params.name + '<br/>进线量：' + (params.data.alias || params.data.value)
            }
          }
        },
        geo: {
          map: 'china',
          zoom: 1,
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              color: '#fff',
              areaColor: '#002689',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        series: [{
          name: '突发事件',
          type: 'map',
          geoIndex: 0,
          data: dataList
        }, {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          symbol: 'circle',
          symbolSize: 12,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 3
          },
          itemStyle: {
            normal: {
              color: '#FF2994' // 标志颜色
            }
          },
          data: exitData
        }]
      }
      echarts.registerMap('china', china)
    },
    // 绘制echart
    drowerpic () {
      // 客服服务分布图
      this.chartsMap = echarts.init(this.$refs.charts_map)
      this.chartsMap.setOption(this.chartsOptions.charts_map, true)
      // 接通率
      this.chartsConnectRate = echarts.init(this.$refs.charts_connectRate)
      this.chartsConnectRate.setOption(this.chartsOptions.charts_connectRate, true)
    },
    // 放大缩小控制
    resizeHandler () {
      let timer
      return () => {
        if (timer) window.clearTimeout(timer)
        timer = window.setTimeout(() => {
          if (this.chartsMap) { this.chartsMap.resize() }
          if (this.chartsConnectRate) { this.chartsConnectRate.resize() }
        }, 500)
      }
    }
  }
}
</script>
<style lang="less" scoped>
// 头部
.toHead {
  margin-bottom: 0.04em;
}
.glo-row {
  flex-direction: row;
}
// 左部
.toLeftEfficiency {
  margin-bottom: 0.08rem;
}
.toLeftText {
  margin: 0.13rem 0 0.08rem 0;
}
// 中间
.toCenChart {
  width: 0.45rem;
  height: 0.45rem;
}
.toCenRate {
  height: 0.45rem;
  line-height: 0.45rem;
}
// 右部
.naTableBox {
  position: relative;
}
.naTableHead {
  position: absolute;
  z-index: 30;
  list-style: none;
  display: flex;
  width: 91%;
  justify-content: space-between;
  top: 0.13rem;
  left: 0.1rem;
  color: #fff;
  background-color: #0d44b5;
}
.naTableHead div {
  padding: 9px;
}
</style>
