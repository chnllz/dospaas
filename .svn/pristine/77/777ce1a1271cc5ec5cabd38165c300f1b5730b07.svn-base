<template>
  <div class="page">
    <a-spin :spinning="loading">
      <a-tabs v-model="currentTab" :animated="false" @change="handleTabChange">
        <a-tab-pane v-for="parentItem in tabList" :key="parentItem.key" :tab="parentItem.title">
          <a-form :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }" class="search">
            <a-card size="small" :title="$t('搜索')">
              <a-space slot="extra">
                <a-button htmlType="submit" @click="getDataList()">{{ $t('搜索') }}</a-button>
                <a-button @click="reset">{{ $t('重置') }}</a-button>
              </a-space>
              <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
                <a-col :span="6">
                  <a-form-item :label="$t('会话开始时间')">
                    <a-range-picker
                      v-if="['day', 'period'].includes(parentItem.key)"
                      v-model="showObj['sessionTime' + parentItem.key]"
                      :allowClear="false"
                      :disabled-date="disabledDate"
                      :ranges="{
                        [$t('昨天')]: [
                          moment().startOf('day').subtract('day', 1),
                          moment().endOf('day').subtract('day', 1)
                        ],
                        [$t('本周')]: [moment().startOf('week'), moment().endOf('week')],
                        [$t('最近七天')]: [moment().subtract(6, 'days'), moment()],
                        [$t('本月')]: [moment().startOf('month'), moment().endOf('month')],
                        [$t('最近31天')]: [moment().subtract(30, 'days'), moment()]
                      }"
                      format="YYYY-MM-DD"
                      style="width: 100%"
                      @change="getInputTime"
                      @openChange="onOpenChange"
                      @calendarChange="onCalendarChange"
                    />
                    <a-range-picker
                      v-else-if="parentItem.key == 'month'"
                      v-model="showObj['sessionTime' + parentItem.key]"
                      style="width: 100%"
                      :allowClear="false"
                      format="YYYY-MM"
                      :ranges="{
                        [$t('本月')]: [moment().startOf('month'), moment().endOf('month')],
                        [$t('上个月')]: [
                          moment().startOf('month').subtract('month', 1),
                          moment().endOf('month').subtract('month', 1)
                        ],
                        [$t('最近3个月')]: [moment().subtract(2, 'month'), moment()]
                      }"
                      :mode="modeMonth"
                      :open="openMonth"
                      @change="
                        (date, dateString) => {
                          queryParam.startTime = dateString[0] + '-01'
                          queryParam.endTime = dateString[1] + '-01'
                        }
                      "
                      @openChange="openMonthChange"
                      @panelChange="handlePanelChange"
                    />
                  </a-form-item>
                </a-col>
                <a-col v-if="parentItem.key === 'period'" :span="6">
                  <a-form-item :label="$t('时间段')">
                    <a-select v-model="showObj['period' + parentItem.key]" style="width: 100%">
                      <a-select-option v-for="(item, index) in timeIntervalData" :key="index" :value="item.value">
                        {{ item.label }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item :label="$t('部门')">
                    <a-select
                      v-model="showObj['department' + parentItem.key]"
                      :show-arrow="false"
                      :filter-option="false"
                      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                      allowClear
                      mode="multiple"
                      show-search
                      style="width: 100%"
                      @search="handleSearch"
                    >
                      <a-select-option v-for="item in departmentList" :key="item.departmentId">
                        {{ item.departmentName }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-card>
          </a-form>
          <a-row type="flex" justify="space-between" align="middle" style="margin-bottom: 8px">
            <a-col>
              <a-space>
                <a-button v-action:export icon="download" @click="handleExport">{{ $t('导出') }}</a-button>
              </a-space>
            </a-col>
            <a-col>
              <a-popover placement="left">
                <template slot="content">
                  <div v-dompurify-html="content.replace(/。/g, `。 <br />`)" style="width: 300px"></div>
                </template>
                <a-icon type="question-circle" style="font-size: 16px" />
              </a-popover>
            </a-col>
          </a-row>
          <a-table
            ref="table"
            :scroll="{ x: true, y: advanced ? windowHeight - 400 : windowHeight - 370 }"
            class="table-fill"
            size="small"
            rowKey="id"
            :columns="columns"
            :dataSource="showTable['dataList' + parentItem.key]"
            :pagination="false"
          ></a-table>
        </a-tab-pane>
      </a-tabs>
      <general-export ref="generalExport" />
    </a-spin>
  </div>
</template>
<script>
import debounce from 'lodash/debounce'
export default {
  i18n: window.lang('chat'),
  components: {
    GeneralExport: () => import('@/views/admin/Table/GeneralExport')
  },
  data () {
    this.handleSearch = debounce(this.handleSearch, 600)
    return {
      loading: false,
      filterTreeOption (input, treeNode) {
        return treeNode.data.props.title.includes(input)
      },
      // 搜索栏显示参数
      showObj: {
        sessionTimeday: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
        sessionTimeperiod: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
        sessionTimemonth: [this.moment().startOf('month'), this.moment().startOf('month')],
        periodtime: '60'
      },
      // 表格数据对象
      showTable: {},
      showApi: {
        dayIs: false,
        monthIs: false,
        timeIs: false
      },
      modeMonth: ['month', 'month'],
      currentTab: 'day',
      sessionTime: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
      tabList: [{
        title: this.$t('接通率-按天'),
        key: 'day'
      }, {
        title: this.$t('接通率-按月'),
        key: 'month'
      }, {
        title: this.$t('接通率-按时段'),
        key: 'period'
      }],
      openMonth: false,
      timeIntervalData: [{
        label: this.$t('1小时'),
        value: '60'
      }, {
        label: this.$t('30分钟'),
        value: '30'
      }, {
        label: this.$t('15分钟'),
        value: '15'
      }],
      groupList: [],
      advanced: false,
      queryParam: {
        startTime: this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD'),
        endTime: this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD'),
        sortField: 'startTime',
        sortOrder: 'descend',
        tab: 'day'
      },
      columns: [{
        title: '#',
        width: 40,
        customRender: (text, record, index) => {
          return index + 1
        }
      }, {
        title: this.$t('会话开始时间'),
        dataIndex: 'startTime',
        width: 150,
        sorter: (a, b) => a.startTime === this.$t('合计') ? 0 : Date.parse(a.startTime.replace(/-/g, '/')) - Date.parse(b.startTime.replace(/-/g, '/'))
      }, {
        title: this.$t('部门'),
        width: 120,
        dataIndex: 'department',
        sorter: true
      }, {
        title: this.$t('会话请求量'),
        width: 120,
        dataIndex: 'askNumber',
        sorter: (a, b) => a.startTime === this.$t('合计') ? 0 : a.askNumber - b.askNumber
      }, {
        title: this.$t('会话接通量'),
        width: 80,
        dataIndex: 'connectedNumber',
        sorter: (a, b) => a.startTime === this.$t('合计') ? 0 : a.connectedNumber - b.connectedNumber
      }, {
        title: this.$t('接通率'),
        width: 80,
        dataIndex: 'connectedRete',
        sorter: (a, b) => a.startTime === this.$t('合计') ? 0 : a.connectedRete - b.connectedRete
      }, {
        title: this.$t('平均回复时长'),
        width: 120,
        dataIndex: 'replyIntervalTotalTime',
        sorter: (a, b) => a.startTime === '合计' ? 0 : a.replyIntervalTotalTime - b.replyIntervalTotalTime,
        customRender: (text) => {
          return this.changeTime(text)
        }
      }, {
        title: this.$t('平均响应时长'),
        width: 120,
        dataIndex: 'responseTotalTime',
        sorter: (a, b) => a.startTime === '合计' ? 0 : a.responseTotalTime - b.responseTotalTime,
        customRender: (text) => {
          return this.changeTime(text)
        }
      }],
      yearFormat: 'YYYY',
      windowHeight: document.documentElement.clientHeight,
      disabledCurrent: null,
      content: `${this.$t('会话请求量：访客请求人工客服的数量。')}<br />

                ${this.$t('会话接通量：访客被客服接起的数量。')}<br />

                ${this.$t('接通率：会话请求量/会话接通量*100%。')}<br />

                ${this.$t('平均回复时长：客服消息间隔总时长/客服消息间隔总次数')}<br />

                ${this.$t('平均响应时长：所有会话轮次下，访客发言到客服回复的时间间隔的平均值。')}`,
      treeData: [],
      departmentList: []
    }
  },
  created () {
    this.getDataList()
    this.handleSearch()
  },
  mounted () {
    this.axios({
      url: '/crm/pbxx/getDepartmentList'
    }).then(res => {
      this.treeData = res.result.data
    })
    const strArr = ['day', 'month', 'period']
    strArr.forEach(element => {
      this.$set(this.showObj, ['department' + element], undefined)
    })
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight
        this.windowHeight = window.fullHeight
      })()
    }
  },
  methods: {
    getDataList () {
      this.queryParam.department = this.showObj['department' + this.currentTab]
      this.queryParam.period = this.showObj['period' + this.currentTab]
      this.loading = true
      this.axios({
        url: '/chat/customerReport/getDepartmentConversationInfo',
        data: this.queryParam
      }).then(res => {
        this.loading = false
        if (res.code !== 0) {
          this.$message.error(res.message)
          return
        }
        let result = res.result.data || []
        result = result.map((item, index) => {
          item.id = index
          return item
        })
        this.showTable['dataList' + this.currentTab] = result
        if (res.result?.total) {
          const obj = { ...res.result.total, ...{ startTime: this.$t('合计') } }
          obj.id = Date.now()
          this.showTable['dataList' + this.currentTab].push(obj)
        }
        this.$forceUpdate()
      })
    },
    // 重置
    reset () {
      this.showObj['department' + this.currentTab] = undefined
      this.showObj['channel' + this.currentTab] = undefined
      this.showObj['second_' + this.currentTab] = 60
      this.showObj['period' + this.currentTab] = this.currentTab === 'period' ? '60' : undefined
      const startDayTime = this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD')
      const startMonth = this.moment().startOf('month').format('YYYY-MM-DD')
      const endDayTime = this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD')
      this.queryParam = {
        startTime: ['day', 'period'].includes(this.currentTab) ? startDayTime : startMonth,
        endTime: ['day', 'period'].includes(this.currentTab) ? endDayTime : startMonth,
        period: this.currentTab === 'period' ? '60' : undefined,
        sortField: 'startTime',
        sortOrder: 'descend',
        tab: this.currentTab
      }
      const day = [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)]
      const month = [this.moment().startOf('month'), this.moment().startOf('month')]
      this.showObj['sessionTime' + this.currentTab] = ['day', 'period'].includes(this.currentTab) ? day : this.currentTab === 'month' ? month : ''
      this.getDataList()
    },
    advancedChange () {
      this.advanced = !this.advanced
    },
    handleTabChange (activeKey) {
      this.currentTab = activeKey
      this.queryParam.tab = activeKey
      this.advanced = false
      if (['day', 'month'].includes(activeKey)) {
        this.$set(this.queryParam, 'period', undefined)
        this.columns[1].title = this.$t('会话开始时间')
        this.queryParam.sortOrder = 'descend'
        if (activeKey === 'month' && !this.showApi.monthIs) {
          this.getDataList()
          this.showApi.monthIs = true
        }
      } else {
        this.$set(this.queryParam, 'period', this.showObj['period' + this.currentTab] || '60')
        this.columns[1].title = this.$t('会话时间段')
        if (!this.showApi.timeIs) {
          this.getDataList()
          this.showApi.timeIs = true
        }
      }
      this.columns[1].sorter = activeKey !== 'period' ? (a, b) => Date.parse(a.startTime.replace(/-/g, '/')) - Date.parse(b.startTime.replace(/-/g, '/')) : false
      this.queryParam.startTime = this.showObj['sessionTime' + this.currentTab][0].format('YYYY-MM-DD')
      this.queryParam.endTime = this.showObj['sessionTime' + this.currentTab][1].format('YYYY-MM-DD')
    },
    onOpenChange (status) {
      // 清空禁用时间段的设置
      this.disabledCurrent = null
    },
    onCalendarChange (dates) {
      // 获取手动选择的时间段起始值
      this.disabledCurrent = dates[0]
    },
    disabledDate (current, date) {
      return current && current < this.moment(this.disabledCurrent).subtract(1, 'year').endOf('day') ||
        current > this.moment(this.disabledCurrent).add(1, 'years').endOf('day')
    },
    getInputTime (date, dateString) {
      this.queryParam.startTime = dateString[0]
      this.queryParam.endTime = dateString[1]
    },
    // 控制月份中改变的设置
    openMonthChange (status) {
      // 清空禁用时间段的设置
      this.disabledCurrent = null
      this.openMonth = status
    },
    handlePanelChange (value, mode) {
      const chooseTime = value
      this.modeMonth = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
      if (mode[0] === 'date') {
        this.disabledCurrent = value[0]
      } else {
        this.disabledCurrent = null
      }
      if (mode[1] === 'date') {
        this.openMonth = false
        const time = value[1].diff(value[0], 'month')
        if (time > 11) {
          chooseTime[0] = this.moment(value[1]).subtract(11, 'M').startOf('day')
        }
      }
      this.queryParam.startTime = chooseTime[0].format('YYYY-MM-DD')
      this.queryParam.endTime = chooseTime[1].format('YYYY-MM-DD')
      this.showObj['sessionTime' + this.currentTab] = chooseTime
    },
    handleExport () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        number: 'SysAnalyze',
        className: 'ExportChatStatsTask',
        parameter: {
          condition: {
            req: this.queryParam,
            type: 'departmentInfo'
          }
        }
      })
    },
    changeTime (text) {
      let sec = parseInt(text)
      let min = 0
      let hour = 0
      if (sec > 59) {
        min = parseInt(sec / 60)
        sec = parseInt(sec % 60)
        if (min > 59) {
          hour = parseInt(min / 60)
          min = parseInt(min % 60)
        }
      }
      const result = `${parseInt(hour) < 10 ? '0' + parseInt(hour) : parseInt(hour)}:${parseInt(min) < 10 ? '0' + parseInt(min) : parseInt(min)}:${parseInt(sec) < 10 ? '0' + parseInt(sec) : parseInt(sec)}`
      return result
    },
    handleSearch (value) {
      this.axios({
        url: '/chat/customerReport/departmentListInit',
        data: {
          departmentName: value
        }
      }).then(res => {
        this.departmentList = res.result || []
      })
    }
  }
}
</script>
