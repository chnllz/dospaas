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
      rowKey="id"
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
      modeMonth: ['month', 'month'],
      sessionTime: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
      openMonth: false,
      advanced: false,
      queryParam: {
        startTime: this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD'),
        endTime: this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD')
      },
      columns: [{
        title: this.$t('日期'),
        dataIndex: 'dates'
      }, {
        title: this.$t('客服名称'),
        dataIndex: 'realName',
        width: 160,
        customRender: (text, record) => {
          return `${record.userName}(${text})`
        }
      }, {
        title: this.$t('有效工时率'),
        dataIndex: 'effectiveWorkingRate'
      }, {
        title: this.$t('首次在线时间'),
        dataIndex: 'firstOnlineTime'
      }, {
        title: this.$t('首次就绪时间'),
        dataIndex: 'firstReadyTime'
      }, {
        title: this.$t('示忙次数'),
        dataIndex: 'busy'
      }, {
        title: this.$t('示忙总时长'),
        dataIndex: 'totalBusy'
      }, {
        title: this.$t('离开次数'),
        dataIndex: 'unready'
      }, {
        title: this.$t('最后登出时间'),
        dataIndex: 'lastOffLine'
      }],
      param: {},
      content: `${this.$t('有效工时率：（排班工时-日程及请假时长）/排班工时；')}<br />
                ${this.$t('首次在线时间：首次在线的时间点，如：2021-11-15 08:45:24；')}<br />
                ${this.$t('首次就绪时间：首次就绪的时间点，如：2021-11-15 09:00:00；')}<br />
                ${this.$t('示忙次数：客服切换示忙的次数；')}<br />
                ${this.$t('示忙总时长：示忙累计总时长；')}<br />
                ${this.$t('未就绪次数：客服切换未就绪的次数；')}<br />
                ${this.$t('最后离线时间：客服最后离线的时间点，如：2021-11-15 18:05:30')}`,
      serviceTree: [],
      serviceList: [],
      getServiceList: []
    }
  },
  created () {
    this.getService()
  },
  methods: {
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
      this.queryParam.serviceId = this.getServiceList
      const param = {
        sortOrder: parameter.sortOrder,
        sortField: parameter.sortField
      }
      return this.axios({
        url: '/crm/report/getServiceAttendance',
        data: Object.assign(param, this.queryParam)
      }).then(res => {
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
              endTime: this.queryParam.endTime
            },
            type: 'attendance'
          }
        }
      })
    }
  }
}
</script>
