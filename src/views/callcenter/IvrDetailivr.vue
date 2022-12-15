<template>
  <div class="page">
    <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
      <a-card size="small" :title="$t('搜索')">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
          <a-button
            @click="
              () => {
                queryParam = {
                  searchtime: [moment().startOf('day'), moment().endOf('day')],
                  ivrId: null,
                  startTime: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                  endTime: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
                  username: null
                }
                $refs.table.refresh(true)
              }
            "
          >
            {{ $t('重置') }}
          </a-button>
        </a-space>
        <a-row class="form">
          <a-col :span="6">
            <a-form-item :label="$t('IVR节点')">
              <a-select v-model="queryParam.ivrId" initValue>
                <a-select-option v-for="(value, key) in ivrar" :key="key" :value="value.value">
                  {{ value.text }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('来电时间')">
              <a-range-picker
                v-model="queryParam.searchtime"
                :ranges="{
                  [$t('今天')]: [moment().startOf('day'), moment().endOf('day')],
                  [$t('昨天')]: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
                  [$t('本周')]: [moment().startOf('week'), moment().endOf('week')],
                  [$t('本月')]: [moment().startOf('month'), moment().endOf('month')]
                }"
                showTime
                style="width: 100%"
                @change="getDate"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <a-space>
      <a-button v-action:export icon="download" @click="handleExport()">{{ $t('导出') }}</a-button>
    </a-space>
    <s-table
      ref="table"
      class="table-fill"
      :scroll="{ y: true }"
      size="small"
      rowKey="ivrKey"
      :columns="columns"
      :data="loadDataTable"
    ></s-table>
    <div ref="main" style="height: 400px"></div>
    <general-export ref="generalExport" />
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  i18n: window.lang('callcenter'),
  components: {
    GeneralExport: () => import('@/views/admin/Table/GeneralExport')
  },
  data () {
    return {
      colLayout: {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 8,
        xl: 6,
        xxl: 6
      },
      // 时间组件
      mychartData: [],
      ivrar: [],
      // 搜索参数
      queryParam: {
        searchtime: [this.moment().startOf('day'), this.moment().endOf('day')],
        startTime: this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), // null,
        endTime: this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'), // null,
        ivrId: '21'// null
      },
      // 表头
      columns: [{
        title: this.$t('按键值'),
        dataIndex: 'ivrKey',
        sorter: false
      }, {
        title: this.$t('按键值说明'),
        dataIndex: 'ivrKeyDesc',
        sorter: false
      }, {
        title: this.$t('按键次数'),
        dataIndex: 'total',
        sorter: false
      }, {
        title: this.$t('按键占比%'),
        dataIndex: 'percent',
        sorter: false
      }]
    }
  },
  watch: {
    params: {
      handler () {
        this.axios({
          url: '/callcenter/ivr/getIvrArr'
        }).then(res => {
          this.ivrar = res.result
        })
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    loadDataTable (parameter) {
      return this.axios({
        url: '/callcenter/ivr/detailivr',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        this.queryParam.searchtime = [res.result.startTime ? this.moment(res.result.startTime, 'YYYY-MM-DD HH:mm:ss') : '', res.result.endTime ? this.moment(res.result.endTime, 'YYYY-MM-DD HH:mm:ss') : '']
        this.queryParam.ivrId = res.result.ivrId

        this.mychartData = res.result.chart
        this.myEcharts()
        return res.result
      })
    },
    getDate (date, dateString) {
      this.queryParam.startTime = dateString[0]
      this.queryParam.endTime = dateString[1]
    },
    handleExport () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'ExportIvrStatementTask',
        setMenuName: true,
        parameter: {
          condition: {
            req: this.queryParam,
            type: 'ivrKeyStats'
          }
        }
      })
    },
    myEcharts () {
      const myChart = echarts.init(this.$refs.main)
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          x: 50,
          y: 50,
          x2: 120,
          y2: 50,
          borderWidth: 1
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          y: 'center',
          data: this.mychartData.listIvrKeyName
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: this.mychartData.listIvrKeyTimeInterval
        }],
        yAxis: [{
          type: 'value'
        }],
        series: this.mychartData.listIvrKeyData
      }
      myChart.setOption(option, true)
    }
  }
}
</script>
