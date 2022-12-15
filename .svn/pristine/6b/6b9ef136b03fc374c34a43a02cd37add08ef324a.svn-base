<template>
  <div style="height: 100%">
    <a-tabs v-model="currentTab" :animated="false" class="tabs-flex" @change="handleTabChange">
      <a-tab-pane v-for="parentItem in tabList" :key="parentItem.key" :tab="parentItem.title">
        <div class="page">
          <a-form :form="form" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search">
            <a-card size="small" :title="$t('搜索')">
              <a-space slot="extra">
                <a-button htmlType="submit" @click="$refs['table' + parentItem.key][0].refresh(true)">
                  {{ $t('搜索') }}
                </a-button>
                <a-button @click="reset()">{{ $t('重置') }}</a-button>
              </a-space>
              <a-row class="form normal">
                <a-col :span="6">
                  <a-form-item :label="$t('呼叫时间')">
                    <a-range-picker
                      v-if="['day', 'time'].includes(parentItem.key)"
                      v-model="showObj['callTime' + parentItem.key]"
                      :allowClear="false"
                      :disabled-date="disabledDate"
                      :ranges="{
                        [$t('昨天')]: [
                          moment().startOf('day').subtract('day', 1),
                          moment().endOf('day').subtract('day', 1)
                        ],
                        [$t('本周')]: [moment().startOf('week'), moment().endOf('week')],
                        [$t('最近七天')]: [moment().subtract(7, 'days'), moment()],
                        [$t('本月')]: [moment().startOf('month'), moment().endOf('month')],
                        [$t('最近31天')]: [moment().subtract(31, 'days'), moment()]
                      }"
                      format="YYYY-MM-DD HH:mm:ss"
                      style="width: 100%"
                      @change="getInputTime"
                      @openChange="onOpenChange"
                      @calendarChange="onCalendarChange"
                    />
                    <a-range-picker
                      v-else-if="parentItem.key == 'month'"
                      v-model="showObj['callTime' + parentItem.key]"
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
                      @change="getInputMonth"
                      @openChange="openMonthChange"
                      @panelChange="handlePanelChange"
                    />
                  </a-form-item>
                </a-col>
                <a-col v-if="parentItem.key === 'time'" :span="6">
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
                    <data-picker
                      :ref="'treeDepartment' + parentItem.key"
                      :placeholder="$t('请选择')"
                      :scope="scope"
                      :multiple="true"
                      :name="'department' + parentItem.key"
                      displayType="tree"
                      url="/admin/department/init"
                      searchUrl="/admin/search/departmentSearch"
                      parentId="parentDepartmentId"
                      :optionsConversion="
                        (list, displayType, searchType) => {
                          if (searchType) {
                            return list.map((item) => {
                              const obj = item
                              obj.key = item.departmentId
                              obj.label = item.fullDepartmentName
                              return obj
                            })
                          } else {
                            return list.map((item) => {
                              const obj = item
                              obj.key = item.departmentId
                              obj.label = item.departmentName
                              return obj
                            })
                          }
                        }
                      "
                      @select="selectDepartment"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-card>
          </a-form>
          <a-space>
            <a-button v-action:export icon="download" @click="handleExport">{{ $t('导出') }}</a-button>
          </a-space>
          <s-table
            :ref="'table' + parentItem.key"
            size="small"
            class="table-fill"
            :scroll="{ x: true, y: true }"
            :rowKey="
              (record, index) => {
                return index + 1
              }
            "
            :columns="columns"
            :data="loadDataTable"
          ></s-table>
        </div>
      </a-tab-pane>
    </a-tabs>
    <general-export ref="generalExport" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('chat'),
  components: {
    GeneralExport: () => import('@/views/admin/Table/GeneralExport')
  },
  data () {
    return {
      form: this.$form.createForm(this),
      scope: this,
      loading: false,
      // 搜索栏显示参数
      showObj: {
        callTimeday: [this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')],
        callTimetime: [this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')],
        callTimemonth: [this.moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'), this.moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')],
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
      tabList: [{
        title: this.$t('话务量统计-按天'),
        key: 'day'
      }, {
        title: this.$t('话务量统计-按月'),
        key: 'month'
      }
        // , {
        //   title: this.$t('话务量统计-按时段'),
        //   key: 'time'
        // }
      ],
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
      queryParam: {
        callTime: [this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')],
        type: 'day'
      },
      columns: [{
        title: this.$t('呼叫时间'),
        dataIndex: 'recordTime',
        width: 200
      }, {
        title: this.$t('部门'),
        dataIndex: 'departmentName',
        width: 200
      }, {
        title: this.$t('签入时长/min'),
        dataIndex: 'checkInDuration',
        width: 200
      }, {
        title: this.$t('呼入电话总数'),
        dataIndex: 'totalIncomingCalls',
        width: 200
      }, {
        title: this.$t('进入ACD电话数'),
        dataIndex: 'numberOfIncomingAcdCalls',
        width: 200
      }, {
        title: this.$t('ACD应答电话数'),
        dataIndex: 'numberOfAcdAnswerCalls',
        width: 200
      }, {
        title: this.$t('ACD放弃电话数'),
        dataIndex: 'numberOfAcdAbandonedCalls',
        width: 200
      }, {
        title: this.$t('呼入接通率/%'),
        dataIndex: 'incomingCallConnectionRate',
        width: 200
      }, {
        title: this.$t('排队接通率/%'),
        dataIndex: 'queueConnectionRate',
        width: 200
      }, {
        title: this.$t('呼入6秒内接通后挂断量'),
        dataIndex: 'inHangUpSixSecondsCounts',
        width: 200
      }, {
        title: this.$t('10秒内接通量'),
        dataIndex: 'tenSecondInternalFlux',
        width: 200
      }, {
        title: this.$t('10秒内接通率/%'),
        dataIndex: 'turnOnRateInTenSeconds',
        width: 200
      }, {
        title: this.$t('20秒内接通量'),
        dataIndex: 'twentySecondInternalFlux',
        width: 200
      }, {
        title: this.$t('20秒内接通率/%'),
        dataIndex: 'turnOnRateInTwentySeconds',
        width: 200
      }, {
        title: this.$t('外呼次数'),
        dataIndex: 'outboundCallTimes',
        width: 200
      }, {
        title: this.$t('呼出6秒内接通后挂断量'),
        dataIndex: 'outHangUpSixSecondsCounts',
        width: 200
      }, {
        title: this.$t('外呼呼通量'),
        dataIndex: 'outboundCallFlux',
        width: 200
      }, {
        title: this.$t('外呼呼通率/%'),
        dataIndex: 'outboundCallRate',
        width: 200
      }, {
        title: this.$t('技能组平均座席'),
        dataIndex: 'averageSeatOfSkillGroup',
        width: 200
      }, {
        title: this.$t('总处理量'),
        dataIndex: 'totalProcessingCapacity',
        width: 200
      }, {
        title: this.$t('呼入总通话时长/s'),
        dataIndex: 'totalIncomingCallDuration',
        width: 200
      }, {
        title: this.$t('呼入平均通话时长/s'),
        dataIndex: 'averageIncomingCallDuration',
        width: 200
      }, {
        title: this.$t('呼入总振铃时长/s'),
        dataIndex: 'totalInRingDuration',
        width: 200
      }, {
        title: this.$t('呼出总通话时长/s'),
        dataIndex: 'totalOutgoingCallDuration',
        width: 200
      }, {
        title: this.$t('呼出平均通话时长/s'),
        dataIndex: 'averageOutgoingCallDuration',
        width: 200
      }, {
        title: this.$t('呼出总振铃时长/s'),
        dataIndex: 'totalRingingDurationOfOutgoingCall',
        width: 200
      }, {
        title: this.$t('总通话时长/s'),
        dataIndex: 'totalCallDuration',
        width: 200
      }, {
        title: this.$t('总平均通话时长/s'),
        dataIndex: 'totalAverageCallDuration',
        width: 200
      }, {
        title: this.$t('话后处理时长/s'),
        dataIndex: 'postSessionProcessingDuration',
        width: 200
      }, {
        title: this.$t('服务时长/min'),
        dataIndex: 'serviceDuration',
        width: 200
      }, {
        title: this.$t('工时利用率/%'),
        dataIndex: 'hourUtilization',
        width: 200
      },
      {
        title: this.$t('通话工时利用率/%'),
        dataIndex: 'callHourUtilization',
        width: 200
      }],
      windowHeight: document.documentElement.clientHeight,
      disabledCurrent: null
    }
  },
  mounted () {
    const strArr = ['day', 'month', 'time']
    strArr.forEach(element => {
      this.$set(this.showObj, ['departmentId' + element], undefined)
    })
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight
        this.windowHeight = window.fullHeight
      })()
    }
  },
  methods: {
    loadDataTable (parameter) {
      this.queryParam.callTime = this.showObj['callTime' + this.currentTab] || undefined
      this.queryParam.departmentId = this.showObj['departmentId' + this.currentTab] || undefined
      this.queryParam.period = this.showObj['period' + this.currentTab] || undefined
      return this.axios({
        url: '/callcenter/callTransfer/initAgentRecord',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    selectDepartment (content, node) {
      this.showObj['departmentId' + this.currentTab] = content
      this.queryParam.departmentId = content
    },
    // 重置
    reset () {
      const day = [this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')]
      const time = [this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')]
      const month = [this.moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'), this.moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')]
      this.showObj['callTime' + this.currentTab] = this.currentTab === 'day' ? day : this.currentTab === 'time' ? time : month
      this.showObj['departmentId' + this.currentTab] = undefined
      this.showObj['period' + this.currentTab] = this.currentTab === 'time' ? '60' : undefined
      this.queryParam = {
        callTime: this.currentTab === 'day' ? day : this.currentTab === 'time' ? time : month,
        period: this.currentTab === 'time' ? '60' : undefined,
        type: this.currentTab
      }
      this.$refs['treeDepartment' + this.currentTab][0].reset()
      this.$refs['table' + this.currentTab][0].refresh(true)
    },
    handleTabChange (activeKey) {
      this.currentTab = activeKey
      this.queryParam.type = activeKey
      this.queryParam.callTime = this.showObj['callTime' + this.currentTab]
      this.queryParam.departmentId = this.showObj['departmentId' + this.currentTab]
      if (['day', 'month'].includes(activeKey)) {
        this.$set(this.queryParam, 'period', undefined)
        this.columns[0].title = this.$t('呼叫时间')
        if (activeKey === 'month' && !this.showApi.monthIs) {
          this.showApi.monthIs = true
        }
      } else {
        this.$set(this.queryParam, 'period', this.showObj['period' + this.currentTab] || '60')
        this.columns[0].title = this.$t('时间段')
        if (!this.showApi.timeIs) {
          this.showApi.timeIs = true
        }
      }
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
      if (!this.disabledCurrent) return false
      return (current && current < this.moment(this.disabledCurrent).subtract(31, 'days').endOf('day')) || current > this.moment(this.disabledCurrent).add(30, 'days').endOf('day')
    },
    getInputTime (date, dateString) {
      this.showObj['callTime' + this.currentTab] = dateString
      this.queryParam.callTime = dateString
    },
    getInputMonth (date, dateString) {
      this.showObj['callTime' + this.currentTab][0] = this.moment(date[0]).startOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.showObj['callTime' + this.currentTab][1] = this.moment(date[1]).endOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.queryParam.callTime = this.showObj['callTime' + this.currentTab]
    },
    // 控制月份中改变的设置
    openMonthChange (status) {
      // 清空禁用时间段的设置
      this.disabledCurrent = null
      this.openMonth = status
    },
    handlePanelChange (value, mode) {
      this.showObj['callTime' + this.currentTab][0] = this.moment(value[0]).startOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.showObj['callTime' + this.currentTab][1] = this.moment(value[1]).endOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.queryParam.callTime = this.showObj['callTime' + this.currentTab]
    },
    handleExport () {
      this.queryParam.callTime = this.showObj['callTime' + this.currentTab] || undefined
      this.queryParam.departmentId = this.showObj['departmentId' + this.currentTab] || undefined
      this.queryParam.period = this.showObj['period' + this.currentTab] || undefined
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        number: 'SysAnalyze',
        className: ' ExportAgentRecordTask',
        parameter: {
          condition: this.queryParam
        }
      })
    }
  }
}
</script>
