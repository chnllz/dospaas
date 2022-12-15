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
      :scroll="{ y: true, x: true }"
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
      sessionTime: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
      advanced: false,
      content: `${this.$t('会话量：客服接待访客的会话数。')}<br />
                ${this.$t('会话总时长：客服接待访客的会话总时长。')}<br />
                ${this.$t('平均会话时长：会话总时长/总会话量。')}<br />
                ${this.$t('同时服务人数：会话总时长/工作时长。')}<br />
                ${this.$t('登录时长：客服处于“登录”状态的时长。')}<br />
                ${this.$t('工作时长：客服处于接待访客的时长(无论客服是否处于”就绪“状态)。')}<br />
                ${this.$t('工时利用率：工作时长/登录时长*100%。')}<br />
                ${this.$t('就绪时长：客服处于就绪状态的时长。')}<br />
                ${this.$t('非就绪时长： 登录时长-就绪时长。')}<br />
                ${this.$t('非就绪有会话时长：非就绪状态下的工作时长。')}<br />
                ${this.$t('非就绪无会话时长：非就绪时长-非就绪有会话时长。')}<br />
                ${this.$t('示忙次数：选择示忙(含示忙细分状态)的次数。')}<br />
                ${this.$t('第一次会话时间：客服第一次接入访客的时间。')}<br />
                ${this.$t('最后一次会话时间：客服最后一次接入访客的时间。')}`,
      treeData: [],
      selectCurrentDate: null,
      queryParam: {
        startTime: this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD'),
        endTime: this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD')
      },
      columns: [{
        title: '#',
        width: 40,
        customRender: (text, record, index) => {
          return index + 1
        }
      }, {
        title: this.$t('客服名称'),
        dataIndex: 'serviceName',
        width: 200,
        ellipsis: false,
        customRender: (text, record) => {
          return record.serviceId && text !== this.$t('合计') ? `${record.serviceId}(${text})` : text
        },
        sorter: true
      }, {
        title: this.$t('会话量'),
        width: 80,
        dataIndex: 'conversationNumber',
        sorter: true
      }, {
        title: this.$t('会话总时长'),
        width: 120,
        dataIndex: 'sumConversationTime',
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
        title: this.$t('平均会话时长'),
        dataIndex: 'avgConversationTime',
        width: 140,
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
        title: this.$t('同时服务人数'),
        width: 140,
        dataIndex: 'meanwhileServiceNumber',
        sorter: true
      }, {
        title: this.$t('登录时长'),
        width: 120,
        dataIndex: 'loginTime',
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
        title: this.$t('工作时长'),
        width: 120,
        dataIndex: 'workTime',
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
        title: this.$t('工时利用率'),
        width: 120,
        dataIndex: 'manHourUtilizationRate',
        sorter: true
      }, {
        title: this.$t('就绪时长'),
        dataIndex: 'readyTime',
        width: 120,
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
        title: this.$t('非就绪时长'),
        dataIndex: 'unreadyTime',
        width: 120,
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
        title: this.$t('非就绪有会话时长'),
        width: 180,
        dataIndex: 'sessionDurationIsUnready',
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
        title: this.$t('非就绪无会话时长'),
        width: 180,
        dataIndex: 'noSessionDurationIsUnready',
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
        title: this.$t('示忙次数'),
        width: 100,
        dataIndex: 'busyTime',
        sorter: true
      }, {
        title: this.$t('第一次会话时间'),
        dataIndex: 'firstTime',
        width: 150,
        sorter: true
      }, {
        title: this.$t('最后一次会话时间'),
        dataIndex: 'lastTime',
        width: 150,
        sorter: true
      }],
      sorter: { field: 'serviceId', order: 'descend' },
      disabledCurrent: null,
      params: {}
    }
  },
  mounted () {
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
        url: '/chat/customerReport/workStateInit',
        data: this.params
      }).then(res => {
        if (res.result?.total) {
          const obj = { ...res.result.total, ...{ serviceId: parseInt(Math.random() * (10000000 - 100000 + 1) + 100000, 10), serviceName: this.$t('合计') } }
          res.result.data.push(obj)
        }
        return res.result
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
    onChange (dates, dateStrings) {
      this.sessionTime = dates
      this.queryParam.startTime = dateStrings[0]
      this.queryParam.endTime = dateStrings[1]
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
        number: 'SysWorkStateInit',
        className: 'ExportChatStatsTask',
        parameter: {
          condition: {
            req: params,
            type: 'workStateInit'
          }
        }
      })
    }
  }
}
</script>
