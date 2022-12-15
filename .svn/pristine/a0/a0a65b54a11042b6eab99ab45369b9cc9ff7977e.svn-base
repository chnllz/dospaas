<template>
  <div class="page">
    <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
      <a-card size="small" :title="$t('搜索')" class="search">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
          <a-button @click="reset">{{ $t('重置') }}</a-button>
        </a-space>
        <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
          <a-col :span="6">
            <a-form-item :label="$t('日期')">
              <a-range-picker
                v-model="sessionTime"
                :allowClear="false"
                :disabled-date="disabledDate"
                :ranges="{
                  [$t('昨天')]: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
                  [$t('本周')]: [
                    moment()
                      .week(moment().week() - 1)
                      .startOf('week')
                      .add(6, 'days'),
                    moment().endOf('week').subtract('day', 1)
                  ],
                  [$t('最近七天')]: [moment().subtract(7, 'days'), moment()],
                  [$t('本月')]: [moment().startOf('month'), moment().endOf('month')],
                  [$t('最近31天')]: [moment().subtract(31, 'days'), moment()]
                }"
                format="YYYY-MM-DD"
                style="width: 100%"
                @change="getInputTime"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('客服名称')">
              <a-tree-select
                v-model="serviceList"
                :filterTreeNode="filterTreeOption"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                allowClear
                treeCheckable
                multiple
                :replaceFields="{
                  children: 'data',
                  value: 'id',
                  key: 'username',
                  title: 'realName'
                }"
                style="width: 100%"
                :tree-data="serviceTree"
                @change="handleServiceChange"
              />
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
            <div v-dompurify-html="content" style="width: 300px"></div>
          </template>
          <a-icon type="question-circle" style="font-size: 16px" />
        </a-popover>
      </a-col>
    </a-row>
    <s-table
      ref="table"
      :showPagination="false"
      :scroll="{ y: true }"
      class="table-fill"
      size="small"
      rowKey="rowKey"
      :columns="columns"
      :data="loadDataTable"
      :sorter="{ field: 'userName', order: 'descend' }"
    ></s-table>
    <general-export ref="generalExport" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('crm'),
  components: {
    GeneralExport: () => import('@/views/admin/Table/GeneralExport')
  },
  data () {
    return {
      filterTreeOption (input, treeNode) {
        return treeNode.data.props.title.includes(input)
      },
      sessionTime: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
      advanced: false,
      queryParam: {
        startTime: this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD'),
        endTime: this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD')
      },
      columns: [{
        title: this.$t('客服名称'),
        dataIndex: 'realName',
        width: 160,
        customRender: (text, record) => {
          if (text !== this.$t('合计')) {
            return `${record.userName}(${text})`
          } else {
            return text
          }
        }
      }, {
        title: this.$t('平均首响时长'),
        dataIndex: 'avgResponseTime',
        sorter: true
      }, {
        title: '对客平均响应时长',
        dataIndex: 'guestWorkitemDuration',
        width: 136,
        sorter: true
      }, {
        title: '12小时对客响应占比',
        dataIndex: 'guestRowCountP'
      }, {
        title: this.$t('平均响应时长'),
        dataIndex: 'workitemDuration',
        sorter: true
      }, {
        title: this.$t('12小时响应占比'),
        dataIndex: 'rowCountP'
      }, {
        title: this.$t('平均完单时长'),
        dataIndex: 'endWorkOrderTime',
        sorter: true
      }, {
        title: this.$t('24小时工单完结数'),
        dataIndex: 'oneDayEndWorkOrder',
        sorter: true
      }, {
        title: this.$t('24小时工单完结数占比'),
        dataIndex: 'oneDayProportion'
      }, {
        title: this.$t('3天工单完结数'),
        dataIndex: 'threeDayEndWorkOrder',
        sorter: true
      }, {
        title: this.$t('3天工单完结数占比'),
        dataIndex: 'threeDayProportion'
      }, {
        title: this.$t('5天工单完结数'),
        dataIndex: 'fiveDayEndWorkOrder',
        sorter: true
      }, {
        title: this.$t('5天工单完结数占比'),
        dataIndex: 'fiveDayProportion'
      }],
      param: {},
      content: `${this.$t('平均首响时长：当前客服参与首响的所有工单首响时长之和/参与首响的所有工单数量。')}<br />
                ${this.$t('平均响应时长：当前客服处理任务的时长（分配时间到客服提交时间）的平均值。')}<br />
                ${this.$t('12小时响应占比：12小时内（含）响应的次数/总响应次数。')}<br />
                ${this.$t('平均完单时长：当前客服所有手动完结工单的处理时长和/当前客服手动完结的工单总数。')}<br />
                ${this.$t('24小时完结工单数：完单时长≤24H的已完结工单数。')}<br />
                ${this.$t('24小时完结工单数占比：当前客服24小时完结工单数/当前客服手动完结的工单总数。')}<br />
                ${this.$t('3天完结工单数：完单时长≤3天的已完结工单数。')}<br />
                ${this.$t('3天完结工单数占比：当前客服3天内完结工单数/当前客服手动完结的工单总数。')}<br />
                ${this.$t('5天完结工单数：完单时长≤5天的已完结工单数。')}<br />
                ${this.$t('5天完结工单数占比：当前客服5天完结工单数/当前客服手动完结的工单总数。')}`,
      serviceTree: [],
      serviceList: [],
      getServiceList: [],
      sortField: '',
      sortOrder: ''
    }
  },
  created () {
    this.getService()
  },
  methods: {
    handleServiceChange (value, label, extra) {
      const arr = []
      if (extra.allCheckedNodes && extra.allCheckedNodes.length > 0) {
        extra.allCheckedNodes.forEach(item => {
          if (item.children) {
            this.forItem(item.children, arr)
          } else {
            arr.push(item.node.key)
          }
        })
      }
      this.getServiceList = arr
    },
    forItem (val, arr) {
      val.forEach(item => {
        if (item.children) {
          this.forItem(item.children, arr)
        } else {
          val.forEach(itemVal => {
            if (arr.indexOf(itemVal.node.key) === -1 && !itemVal.children) {
              arr.push(itemVal.node.key)
            }
          })
        }
      })
    },
    getService () {
      this.axios({
        url: '/crm/report/getService'
      }).then(res => {
        if (res.code === 0) {
          const getTreeData = (array) => {
            array.forEach(item => {
              if (item.data && item.data.length) {
                getTreeData(item.data)
              } else {
                item.realName = `${item.username}(${item.realName})`
              }
            })
          }
          getTreeData(res.result.data)
          this.serviceTree = res.result.data
        }
      })
    },
    loadDataTable (parameter) {
      const queryParam = this.queryParam
      this.queryParam.serviceId = this.getServiceList
      this.sortField = parameter.sortField
      this.sortOrder = parameter.sortOrder
      const param = {
        sortOrder: parameter.sortOrder,
        sortField: parameter.sortField
      }
      return this.axios({
        url: '/crm/report/getServiceWorkQuality',
        data: Object.assign(param, queryParam)
      }).then(res => {
        if (res.result?.total && res.result?.data && res.result.data.length > 0) {
          res.result.data.push({ ...res.result.total, ...{ realName: this.$t('合计'), userName: this.$t('合计') } })
        }
        res.result.data.forEach((item, index) => {
          item.rowKey = index + 1
        })
        return res.result
      })
    },
    // 重置
    reset () {
      this.queryParam.startTime = this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD')
      this.queryParam.endTime = this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD')
      const day = [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)]
      this.queryParam.serviceId = []
      this.getServiceList = []
      this.serviceList = []
      this.sessionTime = day
      this.$refs.table.refresh()
    },
    disabledDate (current, date) {
      return current < this.moment().subtract(2, 'days').subtract(1, 'years')
    },
    getInputTime (date, dateString) {
      this.queryParam.startTime = dateString[0]
      this.queryParam.endTime = dateString[1]
    },
    handleExport () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'ExportCrmReportTask',
        parameter: {
          condition: {
            req: {
              serviceId: this.getServiceList,
              startTime: this.queryParam.startTime,
              endTime: this.queryParam.endTime,
              sortField: this.sortField,
              sortOrder: this.sortOrder
            },
            type: 'workQuality'
          }
        }
      })
    }
  }
}
</script>
