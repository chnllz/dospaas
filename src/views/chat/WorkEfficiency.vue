<template>
  <div class="page">
    <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search">
      <a-card size="small" :title="$t('搜索')">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
          <a-button @click="reset">{{ $t('重置') }}</a-button>
        </a-space>
        <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
          <a-col :span="6">
            <a-form-item :label="$t('会话开始时间')">
              <a-range-picker
                v-model="sessionTime"
                :allowClear="false"
                :disabled-date="disabledDate"
                :ranges="{
                  [$t('昨天')]: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
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
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('客服名称')">
              <a-tree-select
                v-model="queryParam.serviceId"
                :filterTreeNode="filterTreeOption"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                allowClear
                treeCheckable
                multiple
                :replaceFields="{
                  value: 'serviceId',
                  title: 'nickName'
                }"
                style="width: 100%"
                :tree-data="treeData"
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
      rowKey="serviceId"
      :columns="columns"
      :data="loadDataTable"
      :sorter="sorter"
    ></s-table>
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
      filterTreeOption (input, treeNode) {
        return treeNode.data.props.title.includes(input)
      },
      treeData: [],
      sessionTime: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
      openMonth: false,
      modeMonth: ['month', 'month'],
      groupList: [],
      advanced: false,
      queryParam: {
        startTime: this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD'),
        endTime: this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD')
      },
      content: `${this.$t('会话量：客服接待访客的会话量。')}<br />
                ${this.$t('会话总时长：客服接待访客的会话总时长。')}<br />
                ${this.$t('客服消息总数：客服发送的消息总数。')}<br />
                ${this.$t('客服撤回消息次数：客服撤回消息的次数。')}<br />
                ${this.$t('客服平均消息数：客服消息总数/会话量。')}<br />
                ${this.$t('客服平均消息间隔：客服消息间隔总时长/客服消息间隔总次数')}<br />
                ${this.$t('快捷词使用量： 客服选择快捷词的次数。')}<br />
                ${this.$t('访客消息总数：访客发送的消息总数。')}<br />
                ${this.$t('访客平均消息数：访客消息总数/会话量。')}<br />
                ${this.$t('访客平均消息间隔：访客消息间隔总时长/访客消息总数，访客消息间隔为访客发送2条消息之间的时间间隔。')}`,
      selectCurrentDate: null,
      columns: [{
        title: this.$t('#'),
        width: 40,
        customRender: (text, record, index) => {
          return index + 1
        }
      }, {
        title: this.$t('客服名称'),
        dataIndex: 'name',
        customRender: (text, record) => {
          return record.serviceId && text !== '合计' ? `${record.serviceId}(${text})` : text
        },
        width: 150,
        sorter: true
      }, {
        title: this.$t('会话量'),
        dataIndex: 'conversationNumber',
        sorter: true
      }, {
        title: this.$t('会话总时长'),
        dataIndex: 'totalTime',
        sorter: true,
        customRender: (text) => {
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
        }
      }, {
        title: this.$t('客服消息总数'),
        dataIndex: 'messageService',
        sorter: true
      }, {
        title: this.$t('客服撤回消息次数'),
        dataIndex: 'serviceWithdraw',
        sorter: true
      }, {
        title: this.$t('客服平均消息数'),
        dataIndex: 'avgMessageService',
        sorter: true
      }, {
        title: this.$t('客服平均消息间隔(秒)'),
        dataIndex: 'avgServiceAverageReplyInterval',
        sorter: true,
        width: 180
      }, {
        title: this.$t('快捷词使用量'),
        dataIndex: 'serviceReplyNumber'
      }, {
        title: this.$t('访客消息总数'),
        dataIndex: 'messageVisitor',
        sorter: true
      }, {
        title: this.$t('访客平均消息数'),
        dataIndex: 'avgMessageVisitor',
        sorter: true
      }, {
        title: this.$t('访客平均消息间隔(秒)'),
        dataIndex: 'visitorAverageReplyInterval',
        sorter: true,
        width: 180
      }],
      sorter: { field: 'serviceId', order: 'descend' },
      params: {},
      disabledCurrent: null
    }
  },
  created () {
    this.getGroupData()
    this.axios({
      url: '/chat/group/getAllGroup'
    }).then(res => {
      const getTreeData = (array, parent) => {
        array.forEach(item => {
          if (item.children && item.children.length) {
            getTreeData(item.children, item)
          } else if (!item.distributionMode) {
            item.nickName = `${item.serviceId}(${item.nickName})`
            item.serviceId = `${item.serviceId}-${parent?.['serviceId'] || ''}`
          } else {
            item.disabled = true
          }
        })
      }
      getTreeData(res.result.data)
      this.treeData = res.result.data
    })
  },
  methods: {
    loadDataTable (parameter) {
      this.params = Object.assign(parameter, this.queryParam)
      if (this.params.serviceId) {
        this.params.serviceId = this.queryParam.serviceId.map(item => {
          return item.split('-')[0]
        })
      }
      return this.axios({
        url: '/chat/customerReport/workInit',
        data: this.params
      }).then(res => {
        if (res.result?.total) {
          const obj = { ...res.result.total, ...{ serviceId: parseInt(Math.random() * (10000000 - 100000 + 1) + 100000, 10), name: this.$t('合计') } }
          res.result.data.push(obj)
        }
        return res.result
      })
    },
    getGroupData () {
      this.axios({
        url: '/chat/group/groupList',
        data: {}
      }).then((res) => {
        this.groupList = res.result
      })
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
    openMonthChange (status) {
      this.openMonth = status
    },
    handlePanelChange (value, mode) {
      const starttime = this.moment(value[0]).format('YYYY-MM-DD')
      const endtime = this.moment(value[1]).format('YYYY-MM-DD')
      this.sessionTime = value
      this.modeMonth = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
      this.queryParam.startTime = starttime
      this.queryParam.endTime = endtime
      this.openMonth = false
    },
    // 重置
    reset () {
      this.queryParam = {}
      this.queryParam.startTime = this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD')
      this.queryParam.endTime = this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD')
      const day = [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)]
      this.sessionTime = day
      this.$refs.table.refresh()
    },
    calendarChange (date, dateString) {
      if (date.length <= 1) {
        this.selectCurrentDate = date[0]
      } else {
        this.selectCurrentDate = null
      }
    },
    handleExport () {
      const params = this.queryParam
      if (params.serviceId) {
        params.serviceId = this.queryParam.serviceId.map(item => {
          return item.split('-')[0]
        })
      }
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        number: 'SysWork',
        className: 'ExportChatStatsTask',
        parameter: {
          condition: {
            req: params,
            type: 'work'
          }
        }
      })
    }
  }
}
</script>
