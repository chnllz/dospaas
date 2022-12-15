<template>
  <div style="height: 100%">
    <a-tabs v-model="currentTab" :animated="false" class="tabs-flex" @change="handleTabChange">
      <a-tab-pane v-for="parentItem in tabList" :key="parentItem.key" :tab="parentItem.title">
        <div class="page">
          <a-form :form="form" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" :colon="false" class="search">
            <a-card size="small" :title="$t('搜索')">
              <a-space slot="extra">
                <a-button htmlType="submit" @click="$refs['table' + parentItem.key][0].refresh(true)">
                  {{ $t('搜索') }}
                </a-button>
                <a-button @click="reset">{{ $t('重置') }}</a-button>
                <a-button
                  :icon="advanced ? 'up' : 'down'"
                  style="font-size: 11px"
                  @click="advanced = !advanced"
                ></a-button>
              </a-space>
              <a-row :class="advanced ? 'advanced' : 'normal'" class="form">
                <a-col :span="6">
                  <a-form-item :label="$t('签入时间')">
                    <a-range-picker
                      v-if="['day', 'time'].includes(parentItem.key)"
                      v-model="showObj['sessionTime' + parentItem.key]"
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
                      @change="getInputMonth"
                      @openChange="openMonthChange"
                      @panelChange="handlePanelChange"
                    />
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
                <a-col v-if="parentItem.key !== 'time'" :span="6">
                  <a-form-item :label="$t('工号')">
                    <a-input v-model="showObj['agentNumber' + parentItem.key]" />
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
                <a-col v-if="parentItem.key === 'day' || parentItem.key === 'month'" :span="6">
                  <a-form-item label="签入次数">
                    <a-input-group compact>
                      <a-input-number
                        v-model="showObj['checkInStartCount' + parentItem.key]"
                        style="width: calc(50% - 15px)"
                        placeholder="起始次数"
                      />
                      <a-input
                        style="width: 30px; border-left: 0; pointer-events: none; backgroundcolor: #fff"
                        placeholder="-"
                        disabled
                      />

                      <a-input-number
                        v-model="showObj['checkInEndCount' + parentItem.key]"
                        style="width: calc(50% - 15px); border-left: 0"
                        placeholder="结束次数"
                      />
                    </a-input-group>
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
            :scroll="{ y: true }"
            :columns="columns['columns' + parentItem.key]"
            :data="loadDataTable"
            class="table-fill"
            size="small"
            rowKey="id"
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
      advanced: false,
      loading: false,
      scope: this,
      currentTab: 'day',
      tabList: [{
        title: this.$t('签入-按天'),
        key: 'day'
      }, {
        title: this.$t('签入-按月'),
        key: 'month'
      }
        // , {
        //   title: this.$t('签入-按时段'),
        //   key: 'time'
        // }
      ],
      jobList: [],
      // 搜索栏显示参数
      showObj: {
        sessionTimeday: [this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')],
        sessionTimetime: [this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')],
        sessionTimemonth: [this.moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'), this.moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')],
        periodtime: 60,
        departmentday: [],
        departmenttime: [],
        departmentmonth: []
      },
      // 搜索参数
      queryParam: {
        startTime: this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
        searchType: 'day'
      },
      // 表头
      columns: {
        columnsday: [],
        columnsmonth: [],
        columnstime: [{
          title: this.$t('时间段'),
          dataIndex: 'times'
        }, {
          title: this.$t('签入人数'),
          dataIndex: 'checkInTimes'
        }, {
          title: this.$t('签出人数'),
          dataIndex: 'checkOutTimes'
        }]
      },
      column: [{
        title: this.$t('签入时间'),
        dataIndex: 'date',
        width: 120
      }, {
        title: this.$t('部门'),
        width: 100,
        dataIndex: 'department'
      }, {
        title: this.$t('姓名'),
        dataIndex: 'agentRealName',
        width: 120
      }, {
        title: this.$t('工号'),
        width: 120,
        dataIndex: 'agentNumber'
      }, {
        title: this.$t('首次签入时间'),
        width: 120,
        dataIndex: 'firstStartTime'
      }, {
        title: this.$t('末次签出时间'),
        width: 120,
        dataIndex: 'lastEndTime'
      }, {
        title: this.$t('签入时长/min'),
        width: 120,
        dataIndex: 'checkInDuration'
      }, {
        title: this.$t('签入次数'),
        width: 120,
        dataIndex: 'checkInTimes'
      }],
      showTable: {},
      showApi: {
        dayIs: false,
        monthIs: false,
        timeIs: false
      },
      modeMonth: ['month', 'month'],
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
      windowHeight: document.documentElement.clientHeight,
      disabledCurrent: null
    }
  },
  mounted () {
    this.columns['columnsday'] = this.column.slice()
    this.columns['columnsmonth'] = this.column.slice()
    const strArr = ['day', 'month', 'time']
    strArr.forEach(element => {
      this.$set(this.showObj, ['checkInStartCount' + element], undefined)
      this.$set(this.showObj, ['checkInEndCount' + element], undefined)
      this.$set(this.showObj, ['agentNumber' + element], undefined)
    })
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight
        this.windowHeight = window.fullHeight
      })()
    }
  },
  methods: {
    selectDepartment (content, node) {
      this.showObj['department' + this.currentTab] = content
      this.queryParam.department = content
    },
    loadDataTable (parameter) {
      this.queryParam.startTime = this.showObj['sessionTime' + this.currentTab][0]
      this.queryParam.endTime = this.showObj['sessionTime' + this.currentTab][1]
      this.queryParam.department = this.showObj['department' + this.currentTab]
      this.queryParam.checkInStartCount = this.showObj['checkInStartCount' + this.currentTab]
      this.queryParam.checkInEndCount = this.showObj['checkInEndCount' + this.currentTab]
      this.queryParam.agentNumber = this.showObj['agentNumber' + this.currentTab]
      this.queryParam.period = this.showObj['period' + this.currentTab]
      this.queryParam.searchType = this.currentTab
      return this.axios({
        url: '/callcenter/checkLog/initByMonthDay',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    // 重置
    reset () {
      this.showObj['department' + this.currentTab] = undefined
      this.showObj['period' + this.currentTab] = this.currentTab === 'time' ? '60' : undefined
      this.showObj['checkInStartCount' + this.currentTab] = undefined
      this.showObj['checkInEndCount' + this.currentTab] = undefined
      this.showObj['agentNumber' + this.currentTab] = undefined
      const startDayTime = this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
      const startMonth = this.moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')
      const endDayTime = this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      const endMonth = this.moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.queryParam = {
        startTime: ['day', 'time'].includes(this.currentTab) ? startDayTime : startMonth,
        endTime: ['day', 'time'].includes(this.currentTab) ? endDayTime : endMonth,
        period: this.currentTab === 'time' ? '60' : undefined,
        searchType: this.currentTab,
        department: undefined,
        agentNumber: undefined,
        checkInStartCount: undefined,
        checkInEndCount: undefined
      }
      const day = [this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')]
      const month = [this.moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'), this.moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')]
      this.showObj['sessionTime' + this.currentTab] = ['day', 'time'].includes(this.currentTab) ? day : this.currentTab === 'month' ? month : ''
      this.$refs['table' + this.currentTab][0].refresh(true)
      this.$refs['treeDepartment' + this.currentTab][0].reset()
    },
    handleTabChange (activeKey) {
      this.currentTab = activeKey
      this.queryParam.searchType = activeKey
      this.advanced = false
      if (['day', 'month'].includes(activeKey)) {
        this.$set(this.queryParam, 'period', undefined)
        if (activeKey === 'month' && !this.showApi.monthIs) {
          this.showApi.monthIs = true
        }
      } else {
        this.$set(this.queryParam, 'period', this.showObj['period' + this.currentTab] || '60')
        if (!this.showApi.timeIs) {
          this.showApi.timeIs = true
        }
      }
      this.queryParam.startTime = this.showObj['sessionTime' + this.currentTab][0]
      this.queryParam.endTime = this.showObj['sessionTime' + this.currentTab][1]
      this.queryParam.department = this.showObj['department' + this.currentTab]
      this.queryParam.checkInStartCount = this.showObj['checkInStartCount' + this.currentTab]
      this.queryParam.checkInEndCount = this.showObj['checkInEndCount' + this.currentTab]
      this.queryParam.agentNumber = this.showObj['agentNumber' + this.currentTab]
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
      this.showObj['sessionTime' + this.currentTab][0] = dateString[0] + ' 00:00:00'
      this.showObj['sessionTime' + this.currentTab][1] = dateString[1] + ' 23:59:59'
      this.queryParam.startTime = dateString[0]
      this.queryParam.endTime = dateString[1]
    },
    getInputMonth (date, dateString) {
      this.showObj['sessionTime' + this.currentTab][0] = this.moment(date[0]).startOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.showObj['sessionTime' + this.currentTab][1] = this.moment(date[1]).endOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.queryParam.startTime = this.showObj['sessionTime' + this.currentTab][0]
      this.queryParam.endTime = this.showObj['sessionTime' + this.currentTab][1]
    },
    // 控制月份中改变的设置
    openMonthChange (status) {
      // 清空禁用时间段的设置
      this.disabledCurrent = null
      this.openMonth = status
    },
    handlePanelChange (value, mode) {
      this.showObj['sessionTime' + this.currentTab][0] = this.moment(value[0]).startOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.showObj['sessionTime' + this.currentTab][1] = this.moment(value[1]).endOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.queryParam.startTime = this.showObj['sessionTime' + this.currentTab][0]
      this.queryParam.endTime = this.showObj['sessionTime' + this.currentTab][1]
    },
    handleExport () {
      this.queryParam.startTime = this.showObj['sessionTime' + this.currentTab][0]
      this.queryParam.endTime = this.showObj['sessionTime' + this.currentTab][1]
      this.queryParam.department = this.showObj['department' + this.currentTab]
      this.queryParam.checkInStartCount = this.showObj['checkInStartCount' + this.currentTab]
      this.queryParam.checkInEndCount = this.showObj['checkInEndCount' + this.currentTab]
      this.queryParam.agentNumber = this.showObj['agentNumber' + this.currentTab]
      this.queryParam.period = this.showObj['period' + this.currentTab]
      this.queryParam.searchType = this.currentTab
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        number: 'SysAnalyze',
        className: 'ExportCheckLogTask',
        setMenuName: true,
        parameter: {
          condition: {
            req: this.queryParam,
            type: 'checkLogByMonthDay'
          }
        }
      })
    }
  }
}
</script>
