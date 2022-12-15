<template>
  <div class="page">
    <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
      <a-card size="small" :title="$t('搜索')">
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
      rowKey="userName"
      :columns="columns"
      :data="loadDataTable"
      :sorter="{ field: 'endWorkOrderNumber', order: 'descend' }"
    >
      <div slot="manualOrderComplete" slot-scope="text, record">
        {{ text }}/{{ record.manualOrderCompleteRate || '--' }}
      </div>
      <div slot="autoOrderComplete" slot-scope="text, record">
        {{ text }}/{{ record.autoOrderCompleteRate || '--' }}
      </div>
    </s-table>
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
        title: this.$t('完结工单数'),
        dataIndex: 'endWorkOrderNumber',
        sorter: true
      }, {
        title: this.$t('完结正负偏离度'),
        dataIndex: 'proportion',
        sorter: true
      }, {
        title: this.$t('客服手动完单数/占比'),
        dataIndex: 'manualOrderComplete',
        scopedSlots: { customRender: 'manualOrderComplete' }
      }, {
        title: this.$t('超时自动完单数/占比'),
        dataIndex: 'autoOrderComplete',
        scopedSlots: { customRender: 'autoOrderComplete' }
      }, {
        title: this.$t('就绪总时长'),
        dataIndex: 'readTime'
      }, {
        title: this.$t('示忙总时长'),
        dataIndex: 'busyTime'
      }],
      content: `${this.$t('完结工单数：工单子状态为“已解决，工单结束”，或“关闭，工单结束”，或“客户超期未回复，工单结束”，且工单责任客服为当前客服的工单累计数之和。')}<br />
                ${this.$t('完单正负偏离度：（当前客服完结工单数-所有客服已完结工单数的平均值）/所有客服已完结工单数的平均值*100%。')}<br />
                ${this.$t('客服手动完单数：工单子状态为“已解决，工单结束”或“关闭，工单结束“的工单总数。')}<br />
                ${this.$t('客服手动完单数占比：客服手动完单数/完结工单数。')}<br />
                ${this.$t('超时自动完单数：工单子状态为“客户超期未回复，工单结束”的工单总数。')}<br />
                ${this.$t('超时自动完单数占比：超时自动完单数/完结工单数。')}<br />
                ${this.$t('就绪总时长：客服选择就绪状态后持续总时长。')}<br />
                ${this.$t('示忙总时长：客服选择示忙状态后持续总时长。')}`,
      serviceTree: [],
      serviceList: [],
      getServiceList: [],
      param: {}
    }
  },
  created () {
    this.getService()
    this.getFields()
  },
  methods: {
    getFields () {
      this.axios({
        url: '/crm/report/getServiceStatus'
      }).then(res => {
        if (res.code === 0) {
          const columns = []
          res.result.data.forEach(item => {
            const obj = {
              title: item.label,
              dataIndex: item.dataIndex
            }
            columns.push(obj)
          })
          this.columns = [...this.columns, ...columns]
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
    loadDataTable (parameter) {
      const queryParam = this.queryParam
      this.queryParam.serviceId = this.getServiceList
      this.param = {
        sortOrder: parameter.sortOrder,
        sortField: parameter.sortField
      }
      return this.axios({
        url: '/crm/report/getServiceWorkload',
        data: Object.assign(this.param, queryParam)
      }).then(res => {
        if (res.result?.total && res.result?.data && res.result.data.length > 0) {
          res.result.data.push({ ...res.result.total, ...{ realName: this.$t('合计'), userName: this.$t('合计') } })
        }
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
              endTime: this.queryParam.endTime,
              startTime: this.queryParam.startTime,
              ...this.param
            },
            type: 'workload'
          }
        }
      })
    }
  }
}
</script>
