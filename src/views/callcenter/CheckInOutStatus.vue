<template>
  <div style="height: 100%">
    <div class="page">
      <a-form :form="form" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" :colon="false" class="search">
        <a-card size="small" :title="$t('搜索')">
          <a-space slot="extra">
            <a-button htmlType="submit" @click="$refs['tabledetails'].refresh(true)">
              {{ $t('搜索') }}
            </a-button>
            <a-button @click="reset">{{ $t('重置') }}</a-button>
            <a-button :icon="advanced ? 'up' : 'down'" style="font-size: 11px" @click="advanced = !advanced"></a-button>
          </a-space>
          <a-row :class="advanced ? 'advanced' : 'normal'" class="form">
            <a-col :span="6">
              <a-form-item :label="$t('签入时间')">
                <a-range-picker
                  v-model="showObj['sessionTimedetails']"
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
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item :label="$t('部门')">
                <data-picker
                  :ref="'treeDepartmentdetails'"
                  :placeholder="$t('请选择')"
                  :scope="scope"
                  :multiple="true"
                  :name="'departmentdetails'"
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
            <a-col :span="6">
              <a-form-item :label="$t('工号')">
                <a-input v-model="showObj['agentNumberdetails']" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
      </a-form>
      <a-space>
        <a-button v-action:export icon="download" @click="handleExport">{{ $t('导出') }}</a-button>
      </a-space>
      <s-table
        :ref="'tabledetails'"
        :scroll="{ y: true }"
        :columns="columns"
        :data="loadDataTable"
        class="table-fill"
        size="small"
        rowKey="id"
      ></s-table>
    </div>
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
      jobList: [],
      // 搜索栏显示参数
      showObj: {
        sessionTimedetails: [this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')],
        departmentdetails: []
      },
      // 搜索参数
      queryParam: {
        startTime: this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      },
      // 表头
      columns: [{
        title: this.$t('ID'),
        dataIndex: 'id',
        customRender: (text, record, index) => index + 1,
        width: 80
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
        title: this.$t('开始时间'),
        width: 120,
        dataIndex: 'startTime'
      }, {
        title: this.$t('结束时间'),
        width: 120,
        dataIndex: 'endTime'
      }, {
        title: this.$t('签入时长/min'),
        width: 120,
        dataIndex: 'checkInDuration'
      }],
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
      windowHeight: document.documentElement.clientHeight,
      disabledCurrent: null
    }
  },
  mounted () {
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight
        this.windowHeight = window.fullHeight
      })()
    }
  },
  methods: {
    selectDepartment (content, node) {
      this.showObj['departmentdetails'] = content
      this.queryParam.department = content
    },
    loadDataTable (parameter) {
      this.queryParam.startTime = this.showObj['sessionTimedetails'][0]
      this.queryParam.endTime = this.showObj['sessionTimedetails'][1]
      this.queryParam.department = this.showObj['departmentdetails']
      this.queryParam.checkInStartCount = this.showObj['checkInStartCountdetails']
      this.queryParam.checkInEndCount = this.showObj['checkInEndCountdetails']
      this.queryParam.agentNumber = this.showObj['agentNumberdetails']
      return this.axios({
        url: '/callcenter/checkLog/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    // 重置
    reset () {
      this.showObj['checkInStartCountdetails'] = undefined
      this.showObj['checkInEndCountdetails'] = undefined
      this.showObj['agentNumberdetails'] = undefined
      const startDayTime = this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
      const endDayTime = this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      this.queryParam = {
        startTime: startDayTime,
        endTime: endDayTime,
        department: undefined,
        agentNumber: undefined,
        checkInStartCount: undefined,
        checkInEndCount: undefined
      }
      const day = [this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')]
      this.showObj['sessionTimedetails'] = day
      this.$refs['tabledetails'][0].refresh(true)
      this.$refs['treeDepartmentdetails'][0].reset()
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
      this.showObj['sessionTimedetails'][0] = dateString[0] + ' 00:00:00'
      this.showObj['sessionTimedetails'][1] = dateString[1] + ' 23:59:59'
      this.queryParam.startTime = dateString[0]
      this.queryParam.endTime = dateString[1]
    },
    getInputMonth (date, dateString) {
      this.showObj['sessionTimedetails'][0] = this.moment(date[0]).startOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.showObj['sessionTimedetails'][1] = this.moment(date[1]).endOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.queryParam.startTime = this.showObj['sessionTimedetails'][0]
      this.queryParam.endTime = this.showObj['sessionTimedetails'][1]
    },
    // 控制月份中改变的设置
    openMonthChange (status) {
      // 清空禁用时间段的设置
      this.disabledCurrent = null
      this.openMonth = status
    },
    handlePanelChange (value, mode) {
      this.showObj['sessionTimedetails'][0] = this.moment(value[0]).startOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.showObj['sessionTimedetails'][1] = this.moment(value[1]).endOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.queryParam.startTime = this.showObj['sessionTimedetails'][0]
      this.queryParam.endTime = this.showObj['sessionTimedetails'][1]
    },
    handleExport () {
      this.queryParam.startTime = this.showObj['sessionTimedetails'][0]
      this.queryParam.endTime = this.showObj['sessionTimedetails'][1]
      this.queryParam.department = this.showObj['departmentdetails']
      this.queryParam.checkInStartCount = this.showObj['checkInStartCountdetails']
      this.queryParam.checkInEndCount = this.showObj['checkInEndCountdetails']
      this.queryParam.agentNumber = this.showObj['agentNumberdetails']
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        number: 'SysAnalyze',
        className: 'ExportCheckLogTask',
        setMenuName: true,
        parameter: {
          condition: {
            req: this.queryParam,
            type: 'checkLog'
          }
        }
      })
    }
  }
}
</script>
