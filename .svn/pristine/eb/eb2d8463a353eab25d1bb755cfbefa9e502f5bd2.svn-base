<template>
  <div class="page">
    <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false" :form="form">
      <a-card size="small" :title="$t('搜索')">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
          <a-button @click="reset">
            {{ $t('重置') }}
          </a-button>
        </a-space>
        <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
          <a-col :span="6">
            <a-form-item :label="$t('呼叫时间')">
              <a-range-picker
                v-model="requestTime"
                :ranges="{
                  [$t('今天')]: [moment().startOf('day'), moment().endOf('day')],
                  [$t('昨天')]: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
                  [$t('本周')]: [moment().startOf('week'), moment().endOf('week')],
                  [$t('本月')]: [moment().startOf('month'), moment().endOf('month')]
                }"
                format="YYYY-MM-DD"
                style="width: 100%"
                @change="getSearchDate"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('部门')">
              <data-picker
                ref="treeDepartment"
                :placeholder="$t('请选择部门')"
                name="department"
                :multiple="true"
                parentId="parentDepartmentId"
                displayType="tree"
                url="/admin/department/init"
                searchUrl="/admin/search/departmentSearch"
                :scope="scope"
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
                @select="(e) => (queryParam.department = e)"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('工号')">
              <a-input v-model="queryParam.extension"></a-input>
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
      :scroll="{ x: true, y: true }"
      size="small"
      rowKey="id"
      :sorter="sorter"
      :columns="columns"
      :data="loadDataTable"
    ></s-table>
    <general-export ref="generalExport" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('callcenter'),
  components: {
    GeneralExport: () => import('@/views/admin/Table/GeneralExport')
  },
  data () {
    return {
      // 时间组件
      requestTime: [this.moment().startOf('day'), this.moment().endOf('day')],
      advanced: false,
      scope: this,
      // 搜索参数
      queryParam: {
        department: [],
        extension: '',
        startTime: this.moment().startOf('day').format('YYYY-MM-DD'),
        endTime: this.moment().endOf('day').format('YYYY-MM-DD')
      },
      // 排序
      sorter: { field: 'time', order: 'descend' },
      // 表头
      columns: [{
        title: this.$t('时间'),
        dataIndex: 'time',
        align: 'left',
        width: 80
      }, {
        title: this.$t('所属部门'),
        dataIndex: 'department',
        align: 'left',
        width: 120
      }, {
        title: this.$t('工号'),
        dataIndex: 'extension',
        align: 'left',
        width: 60
      }, {
        title: this.$t('姓名'),
        dataIndex: 'realName',
        align: 'left',
        width: 60
      }, {
        title: this.$t('登录总时长'),
        dataIndex: 'totalLoginTime',
        align: 'left',
        width: 80
      }, {
        title: this.$t('空闲时间'),
        dataIndex: 'freeTime',
        align: 'left',
        width: 80
      }, {
        title: this.$t('呼入数'),
        dataIndex: 'callInCount',
        align: 'left',
        width: 80
      }, {
        title: this.$t('呼入接通总量'),
        dataIndex: 'acdNumberOfAnswers',
        align: 'left',
        width: 100
      }, {
        title: this.$t('呼入接通总量（6S以上量）'),
        align: 'left',
        dataIndex: 'acdNumberOfAnswers6s',
        width: 180
      }, {
        title: this.$t('坐席放弃数'),
        dataIndex: 'agentHangupCount',
        align: 'left',
        width: 100
      }, {
        title: this.$t('呼入时长'),
        dataIndex: 'callInDuration',
        align: 'left',
        width: 80
      }, {
        title: this.$t('平均呼入时长'),
        dataIndex: 'avgCallInDuration',
        align: 'left',
        width: 100
      }, {
        title: this.$t('呼出电话数'),
        dataIndex: 'callOutCounts',
        align: 'left',
        width: 80
      }, {
        title: this.$t('呼通电话数'),
        dataIndex: 'callOutCount',
        align: 'left',
        width: 80
      }, {
        title: this.$t('呼通电话数（≥6S以上量）'),
        align: 'left',
        dataIndex: 'callOutCount6s',
        width: 180
      }, {
        title: this.$t('呼出时长'),
        dataIndex: 'callOutDuration',
        align: 'left',
        width: 80
      }, {
        title: this.$t('平均呼出时长'),
        dataIndex: 'avgCallOutDuration',
        align: 'left',
        width: 120
      }, {
        title: this.$t('通话总数'),
        dataIndex: 'totalCalls',
        align: 'left',
        width: 100
      }, {
        title: this.$t('通话总数（≥6S以上量）'),
        dataIndex: 'totalCalls6s',
        align: 'left',
        width: 180
      }, {
        title: this.$t('总通话时长'),
        dataIndex: 'totalCallDuration',
        align: 'left',
        width: 100
      }, {
        title: this.$t('保持次数'),
        dataIndex: 'holdTimes',
        align: 'left',
        width: 80
      }, {
        title: this.$t('保持时长'),
        dataIndex: 'holdDuration',
        align: 'left',
        width: 80
      }, {
        title: this.$t('平均保持时长'),
        dataIndex: 'avgHoldDuration',
        align: 'left',
        width: 100
      }, {
        title: this.$t('话后处理次数'),
        dataIndex: 'afterWordsTimes',
        align: 'left',
        width: 100
      }, {
        title: this.$t('话后处理时长'),
        dataIndex: 'afterWordsDuration',
        align: 'left',
        width: 100
      }, {
        title: this.$t('平均后处理时长'),
        dataIndex: 'avgAfterWordsDuration',
        align: 'left',
        width: 120
      }, {
        title: this.$t('示忙次数'),
        dataIndex: 'busyTimes',
        align: 'left',
        width: 80
      }, {
        title: this.$t('示忙时长'),
        dataIndex: 'busyDuration',
        align: 'left',
        width: 80
      }, {
        title: this.$t('平均示忙时长'),
        dataIndex: 'avgBusyDuration',
        align: 'left',
        width: 100
      }, {
        title: this.$t('如厕次数'),
        dataIndex: 'toiletTimes',
        align: 'left',
        width: 100
      }, {
        title: this.$t('如厕时长'),
        dataIndex: 'toiletDuration',
        align: 'left',
        width: 100
      }, {
        title: this.$t('平均如厕时长'),
        dataIndex: 'avgToiletDuration',
        align: 'left',
        width: 100
      }, {
        title: this.$t('值日次数'),
        dataIndex: 'onDutyTimes',
        align: 'left',
        width: 100
      }, {
        title: this.$t('值日时长'),
        dataIndex: 'onDutyDuration',
        align: 'left',
        width: 100
      }, {
        title: this.$t('平均值日时长'),
        dataIndex: 'avgOnDutyDuration',
        align: 'left',
        width: 100
      }, {
        title: this.$t('休息次数'),
        dataIndex: 'restTimes',
        align: 'left',
        width: 100
      }, {
        title: this.$t('休息时长'),
        dataIndex: 'restDuration',
        align: 'left',
        width: 120
      }, {
        title: this.$t('平均休息时长'),
        dataIndex: 'avgRestDuration',
        align: 'left',
        width: 100
      }, {
        title: this.$t('培训总时长'),
        dataIndex: 'totalTrainingDuration',
        align: 'left',
        width: 100
      }, {
        title: this.$t('就餐总时长'),
        dataIndex: 'totalDiningTime',
        align: 'left',
        width: 120
      }, {
        title: this.$t('呼入振铃时长'),
        dataIndex: 'callInRingDuration',
        align: 'left',
        width: 120
      }, {
        title: this.$t('呼出振铃时长'),
        dataIndex: 'callOutRingDuration',
        align: 'left',
        width: 120
      }, {
        title: this.$t('平均呼入振铃时长'),
        dataIndex: 'avgCallInRingDuration',
        align: 'left',
        width: 120
      }, {
        title: this.$t('平均呼出振铃时长'),
        dataIndex: 'avgCallOutRingDuration',
        align: 'left',
        width: 120
      }, {
        title: this.$t('工时利用率(%)'),
        dataIndex: 'manHourUtilization',
        align: 'left',
        width: 120
      }, {
        title: this.$t('通话工时利用率(%)'),
        dataIndex: 'callHourUtilization',
        align: 'left',
        width: 150
      }],
      form: this.$form.createForm(this),
      userData: []
    }
  },
  methods: {
    loadDataTable (parameter) {
      return this.axios({
        url: '/callcenter/personalAssessment/init',
        data: Object.assign(this.queryParam, parameter)
      }).then(res => {
        if (res.code === 0) {
          res.result.data.forEach((item, index) => {
            item.id = index
            return item
          })
          return res.result
        } else {
          return []
        }
      })
    },
    getSearchDate (date, dateString) {
      this.requestTime = date
      this.queryParam.startTime = dateString[0]
      this.queryParam.endTime = dateString[1]
    },
    selectUser (data, options) {
      this.queryParam.username = data
    },
    reset () {
      this.queryParam = {
        department: [],
        startTime: this.moment().startOf('day').format('YYYY-MM-DD'),
        endTime: this.moment().endOf('day').format('YYYY-MM-DD'),
        extension: ''
      }
      this.userData = []
      this.requestTime = [this.moment().startOf('day'), this.moment().endOf('day')]
      this.$refs.table.refresh(true)
      this.$refs.treeDepartment.reset()
      this.form.resetFields()
    },
    handleExport () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'CallcenterPersonalAssessmentTask',
        setMenuName: true,
        parameter: {
          condition: {
            req: this.queryParam
          }
        }
      })
    }
  }
}
</script>
