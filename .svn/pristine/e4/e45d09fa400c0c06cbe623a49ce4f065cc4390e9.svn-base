<template>
  <div>
    <!-- 报表信息 -->
    <a-table
      rowKey="key"
      :columns="config.tablesViceHead"
      :data-source="tablesViceData"
      size="small"
      :pagination="false"
    >
      <template slot="title">
        <div style="font-weight: bold; font-size: 16px">{{ $t('报表信息') }}</div>
      </template>
    </a-table>
    <!-- 表中表 -->
    <a-table
      style="margin-top: 16px"
      rowKey="key"
      :columns="config.tablesHead"
      :data-source="tablesData"
      size="small"
      @expand="onExpand"
    >
      <template slot="title">
        <div style="font-weight: bold; font-size: 16px">{{ config.tablesTitle }}</div>
      </template>
      <!-- -->
      <!-- 原版子表备份 -->
      <!-- <a-table
        rowKey="key"
        slot="expandedRowRender"
        slot-scope="record"
        :columns="config.tablesHeadChild"
        :data-source="record.child"
        size="small"
        :bordered="false" >
      </a-table> -->
      <s-table
        ref="tableChild"
        slot="expandedRowRender"
        size="small"
        :columns="config.tablesHeadChild"
        :data="initTablesChildData"
      ></s-table>
    </a-table>
    <!-- 图表展示 -->
    <div ref="top" style="height: 400px"></div>
    <div ref="middle" style="height: 400px"></div>
    <div ref="bottom" style="height: 400px"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    dataChildState: {
      type: Object,
      default: () => { }
    },
    config: {
      type: Object,
      default: () => { }
    },
    currentKey: {
      type: String,
      default: ''
    },
    chartsTitle: {
      type: Object,
      default: () => { }
    },
    searchData: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      // s-table搜索参数
      queryParam: {},
      // 图表配置信息
      chartsOptions: {
        // 每项图表配置
        top: {
          grid: {
            left: '10px',
            right: '10px',
            bottom: '10px',
            containLabel: true
          },
          color: ['#67DC00', '#C52518'],
          title: {
            text: this.chartsTitle.top
          },
          toolbox: {
            show: false
          },
          tooltip: {},
          // 柱子数量
          legend: {
            data: ['接听', '未接']
          },
          // X轴名称
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: [{ type: 'value' }],
          // 对应柱子高度
          series: [{
            name: '接听',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }, {
            name: '未接',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
          ]
        },
        middle: {
          grid: {
            left: '10px',
            right: '10px',
            bottom: '10px',
            containLabel: true
          },
          color: ['#AFD8F8'],
          title: { text: this.chartsTitle.middle },
          tooltip: {},
          // 柱子数量
          legend: { data: ['时长'] },
          // X轴名称
          xAxis: { data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'] },
          yAxis: {},
          // 对应柱子高度
          series: [{
            name: '',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        },
        bottom: {
          grid: {
            left: '10px',
            right: '10px',
            bottom: '10px',
            containLabel: true
          },
          color: ['#AFD8F8'],
          title: { text: this.chartsTitle.bottom },
          tooltip: {},
          // 柱子数量
          legend: { data: ['总数'] },
          // X轴名称
          xAxis: { data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'] },
          yAxis: {},
          // 对应柱子高度
          series: [{
            name: '',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        }
      },
      tablesViceData: [],
      tablesData: [],
      state: {}
    }
  },
  mounted () {
  },
  updated () {
  },
  methods: {
    // 初始化报表信息
    initTablesViceData (key) {
      // 加载报表信息
      this.axios({
        data: {
          searchData: this.searchData
        },
        url: '/cdrstat/tablesViceData/' + key
      }).then((res) => {
        res.result.startTime = this.searchData.startTime
        res.result.endTime = this.searchData.endTime
        this.tablesViceData = [res.result]
        console.log('请求报表信息数据， 请求地址：', '/cdrstat/tablesViceData/' + key)
        console.log('请求报表信息数据， 请求参数：', { searchData: this.searchData })
        console.log('请求报表信息数据， 返回结果：', res)
        console.log('\n\n')
      })
    },
    // 初始化父表数据
    initTablesData (key) {
      this.axios({
        data: {
          searchData: this.searchData
        },
        url: `/cdrstat/tablesData/${key}`
      }).then((res) => {
        // 绑定父表数据
        this.tablesData = res.result
        this.$message.success(key + ': 数据加载成功')
        console.log('请求父表数据， 请求地址：', '/cdrstat/tablesData/' + key)
        console.log('请求父表数据， 请求参数：', { searchData: this.searchData })
        console.log('请求父表数据， 返回结果：', res)
        console.log('\n\n')
      })
    },
    onExpand (expanded, record) {
      if (expanded === true) {
        this.queryParam = { key: record.key }
      } else { }
    },
    // 初始化子表格数据
    initTablesChildData (parameter) {
      // if (!this.dataChildState[this.currentKey][record.key]) {
      return this.axios({
        data: Object.assign(parameter, this.queryParam),
        url: `/cdrstat/tablesDataChild/${this.currentKey}`
      }).then((res) => {
        // record.child = res.result
        console.log('请求子表数据， 请求地址：', `/cdrstat/tablesDataChild/${this.currentKey}`)
        console.log('请求子表数据， 请求参数：', { parameter })
        console.log('请求子表数据， 返回结果：', res)
        console.log('\n\n')
        return res.result
      })
      // } else { }
    },
    // 备份子表数据初始化
    // initTablesChildData (expanded, record) {
    //   if (!this.dataChildState[this.currentKey][record.key]) {
    //     this.axios({
    //       params: {
    //         searchData: this.searchData,
    //         key: record.key
    //       },
    //       url: `/cdrstat/tablesDataChild/${this.currentKey}`
    //     }).then((res) => {
    //       record.child = res.result
    //       console.log('请求子表数据， 请求地址：', `/cdrstat/tablesDataChild/${this.currentKey}`)
    //       console.log('请求子表数据， 请求参数：', {
    //         searchData: this.searchData,
    //         key: record.key
    //       })
    //       console.log('请求子表数据， 返回结果：', res)
    //       console.log('\n\n')
    //       this.dataChildState[this.currentKey][record.key] = true
    //       // 测试s-table用
    //       // return res.result
    //     })
    //   } else { }
    // },
    // 初始化图表数据
    initCharts (key) {
      // 发送TOP
      this.axios({
        data: {
          searchData: this.searchData,
          key: 'top'
        },
        url: `/cdrstat/chartsData/${key}`
      }).then((res) => {
        this.chartsOptions.top.xAxis.data = res.result.xAxis
        this.chartsOptions.top.series[0].data = res.result.series.success
        this.chartsOptions.top.series[1].data = res.result.series.fail
        const chartsTop = echarts.init(this.$refs.top)
        chartsTop.setOption(this.chartsOptions.top)
        console.log('请求top图表数据， 请求地址：', `/cdrstat/chartsData/${key}`)
        console.log('请求top图表数据， 请求参数：', {
          searchData: this.searchData,
          key: 'top'
        })
        console.log('请求top图表数据， 返回结果：', res)
        console.log('\n\n')
      })
      // 发送middle
      this.axios({
        data: {
          searchData: this.searchData,
          key: 'middle'
        },
        url: `/cdrstat/chartsData/${key}`
      }).then((res) => {
        this.chartsOptions.middle.xAxis.data = res.result.xAxis
        this.chartsOptions.middle.series.data = res.result.series
        const chartsTop = echarts.init(this.$refs.middle)
        chartsTop.setOption(this.chartsOptions.middle)
        console.log('请求middle图表数据， 请求地址：', `/cdrstat/chartsData/${key}`)
        console.log('请求middle图表数据， 请求参数：', {
          searchData: this.searchData,
          key: 'middle'
        })
        console.log('请求middle图表数据， 返回结果：', res)
        console.log('\n\n')
      })
      // 发送bottom
      this.axios({
        data: {
          searchData: this.searchData,
          key: 'bottom'
        },
        url: `/cdrstat/chartsData/${key}`
      }).then((res) => {
        this.chartsOptions.bottom.xAxis.data = res.result.xAxis
        this.chartsOptions.bottom.series.data = res.result.series
        const chartsTop = echarts.init(this.$refs.bottom)
        chartsTop.setOption(this.chartsOptions.bottom)
        console.log('请求bottom图表数据， 请求地址：', `/cdrstat/chartsData/${key}`)
        console.log('请求bottom图表数据， 请求参数：', {
          searchData: this.searchData,
          key: 'bottom'
        })
        console.log('请求bottom图表数据， 返回结果：', res)
        console.log('\n\n')
      })
    }
  }
}
</script>
