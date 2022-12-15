<template>
  <div class="page">
    <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search">
      <a-card size="small" :title="$t('搜索')">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
          <a-button @click="reset">{{ $t('重置') }}</a-button>
          <a-button :icon="advanced ? 'up' : 'down'" style="font-size: 11px" @click="advanced = !advanced"></a-button>
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
                  [$t('最近七天')]: [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')],
                  [$t('本月')]: [moment().startOf('month'), moment().endOf('month')],
                  [$t('最近31天')]: [moment().subtract(30, 'days').startOf('day'), moment().endOf('day')]
                }"
                format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
                @change="getInputTime"
                @openChange="onOpenChange"
                @calendarChange="onCalendarChange"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('会话内容')">
              <a-input v-model="queryParam.content" />
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
                :tree-data="treeDataKF"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('渠道')">
              <a-select
                v-model="queryParam.channel"
                style="width: 100%"
                mode="multiple"
                allowClear
                showSearch
                option-filter-prop="children"
              >
                <a-select-option v-for="item in channelLists" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('咨询分类')">
              <a-tree-select
                v-model="queryParam.classificationOfConsulting"
                multiple
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                treeNodeFilterProp="title"
                allowClear
                :replaceFields="{
                  value: 'dictDataNumber',
                  title: 'dictDataName'
                }"
                style="width: 100%"
                :tree-data="treeData"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('服务质量')">
              <a-select v-model="queryParam.evaluate" :allowClear="true">
                <a-select-option v-for="satisfaction in satisfactionList" :key="satisfaction.value">
                  {{ satisfaction.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('是否转接')">
              <a-select v-model="queryParam.throughConnection">
                <a-select-option value="1">{{ $t('是') }}</a-select-option>
                <a-select-option value="0">{{ $t('否') }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('首次响应时长')">
              <div style="display: flex; margin-top: 4px">
                <a-input-number
                  v-model="queryParam.replyFirstTime"
                  style="width: 100%; margin-right: -1px"
                  :min="1"
                  :max="60"
                ></a-input-number>
                <a-button style="display: inline-block">{{ $t('秒') }}</a-button>
              </div>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('平均响应时长')">
              <div style="display: flex; margin-top: 4px">
                <a-input-number
                  v-model="queryParam.averageReplyTime"
                  style="width: 100%; margin-right: -1px"
                  :min="1"
                  :max="60"
                ></a-input-number>
                <a-button style="display: inline-block">{{ $t('秒') }}</a-button>
              </div>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('访客ID')">
              <a-input v-model="queryParam.visitorId" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('访客名称')">
              <a-input v-model="queryParam.visitorName" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('访客手机号')">
              <a-input v-model="queryParam.visitorTel" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('会话总时长')">
              <div style="display: flex; margin-top: 4px">
                <a-input-number
                  v-model="queryParam.totalTime"
                  style="width: 100%; margin-right: -1px"
                  :min="0"
                ></a-input-number>
                <a-button style="display: inline-block">{{ $t('分钟') }}</a-button>
              </div>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('结束原因')">
              <a-select v-model="queryParam.endType" :allowClear="true" mode="multiple">
                <a-select-option value="1">{{ $t('访客手动结束') }}</a-select-option>
                <a-select-option value="2">{{ $t('访客首回合沉默结束') }}</a-select-option>
                <a-select-option value="3">{{ $t('访客超时未回复结束') }}</a-select-option>
                <a-select-option value="4">{{ $t('访客离线结束') }}</a-select-option>
                <a-select-option value="6">{{ $t('客服手动结束') }}</a-select-option>
                <a-select-option value="7">{{ $t('客服离线结束') }}</a-select-option>
                <a-select-option value="8">{{ $t('管理员强制结束') }}</a-select-option>
                <a-select-option value="9">{{ $t('黑名单来访结束') }}</a-select-option>
                <a-select-option value="10">{{ $t('非人工服务时间结束') }}</a-select-option>
                <a-select-option value="11">{{ $t('排队过多转留言结束') }}</a-select-option>
                <a-select-option value="12">{{ $t('排队中访客手动结束') }}</a-select-option>
                <a-select-option value="13">{{ $t('排队中访客离线结束') }}</a-select-option>
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
            <div v-dompurify-html="content" style="width: 300px"></div>
          </template>
          <a-icon type="question-circle" style="font-size: 16px" />
        </a-popover>
      </a-col>
    </a-row>
    <s-table
      ref="table"
      :scroll="{ x: true, y: true }"
      class="table-fill"
      size="small"
      rowKey="id"
      pageMode="simple"
      :showSome="true"
      :columns="columns"
      :data="loadDataTable"
      :sorter="sorter"
    >
      <div slot="endType" slot-scope="text">
        {{ text }}
      </div>
      <div slot="action" slot-scope="text, record">
        <a @click="handleRecord(record)">{{ $t('会话记录') }}</a>
      </div>
    </s-table>
    <general-export ref="generalExport" />
    <conversationRecord ref="conversationRecord" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('chat'),
  components: {
    GeneralExport: () => import('@/views/admin/Table/GeneralExport'),
    ConversationRecord: () => import('./ConversationRecord')
  },
  data () {
    return {
      filterTreeOption (input, treeNode) {
        return treeNode.data.props.title.includes(input)
      },
      sessionTime: [this.moment().subtract(1, 'day').startOf('day'), this.moment().subtract(1, 'day').endOf('day')],
      treeData: [],
      satisfactionList: [{
        value: 1,
        label: this.$t('非常满意')
      }, {
        value: 2,
        label: this.$t('满意')
      }, {
        value: 3,
        label: this.$t('一般')
      }, {
        value: 4,
        label: this.$t('不满意')
      }, {
        value: 5,
        label: this.$t('非常不满意')
      }],
      advanced: false,
      colLayout: {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 8,
        xl: 6,
        xxl: 6
      },
      content: `${this.$t('会话开始时间：访客接入在线客服系统的时间。')}<br />
                ${this.$t('首次响应时长：访客被客服接起，访客发送首条消息后，客服第一次回复的时间间隔。')}<br />
                ${this.$t('平均响应时长：指客服每次手动输入消息（除自动欢迎语外）回复访客问题的总平均时长，客户有多轮个问题，从第一个问题发起时间开始计算。')}<br />
                ${this.$t('消息总数：访客消息数+客服消息数。')}<br />
                ${this.$t('访客消息数：访客被客服接起后，访客发送的消息数。')}<br />
                ${this.$t('客服消息数：访客被客服接起后，客服发送的消息数。')}<br />
                ${this.$t('交互轮次：访客被客服接起开始，无论谁先说话，说话角色互换一次为一轮。')}<br />
                ${this.$t('是否转接：会话是否产生过转接行为。')}<br />
                ${this.$t('服务质量：满意度评价结果。')}`,
      treeDataKF: [],
      channelLists: [],
      selectCurrentDate: null,
      queryParam: {
        startTime: this.moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.moment().subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss')
      },
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        align: 'center',
        width: 100,
        scopedSlots: { customRender: 'action' }
      }, {
        title: this.$t('会话ID'),
        dataIndex: 'id',
        width: 80,
        sorter: true
      }, {
        title: this.$t('会话开始时间'),
        dataIndex: 'startTime',
        width: 140,
        sorter: true
      }, {
        title: this.$t('访客ID'),
        width: 200,
        ellipsis: false,
        dataIndex: 'visitorId'
      }, {
        title: this.$t('访客名称'),
        width: 200,
        ellipsis: false,
        dataIndex: 'visitorName'
      }, {
        title: this.$t('访客手机号'),
        width: 140,
        dataIndex: 'visitorTel',
        customRender: (text) => {
          return text || '--'
        }
      }, {
        title: this.$t('客服名称'),
        dataIndex: 'userName',
        ellipsis: false,
        customRender: (text, record) => {
          return record.serviceId ? `${record.serviceId}(${text})` : (text || '--')
        },
        width: 150
      }, {
        title: this.$t('技能组'),
        dataIndex: 'groupName',
        sorter: true,
        width: 120
      }, {
        title: this.$t('会话总时长'),
        dataIndex: 'totalTime',
        sorter: true,
        width: 100
      }, {
        title: this.$t('首次响应时长'),
        dataIndex: 'replyFirstTime',
        width: 120,
        sorter: true
      }, {
        title: this.$t('平均响应时长'),
        width: 120,
        dataIndex: 'averageReplyTime',
        sorter: true
      }, {
        title: this.$t('消息总数'),
        dataIndex: 'messageAll',
        width: 100,
        sorter: true
      }, {
        title: this.$t('访客消息数'),
        width: 120,
        dataIndex: 'messageVisitor',
        sorter: true
      }, {
        title: this.$t('客服消息数'),
        width: 120,
        dataIndex: 'messageService',
        sorter: true
      }, {
        title: this.$t('系统消息数'),
        width: 120,
        dataIndex: 'messageSystem',
        sorter: true
      }, {
        title: this.$t('交互轮次'),
        width: 120,
        dataIndex: 'questionAnswerCount',
        sorter: (a, b) => a.questionAnswerCount - b.questionAnswerCount
      }, {
        title: this.$t('结束原因'),
        sorter: true,
        dataIndex: 'endType',
        width: 180,
        scopedSlots: { customRender: 'endType' }
      }, {
        title: this.$t('是否转接'),
        sorter: true,
        width: 100,
        dataIndex: 'throughConnection'
      }, {
        title: this.$t('服务质量'),
        sorter: true,
        width: 120,
        dataIndex: 'evaluate',
        scopedSlots: { customRender: 'evaluate' }
      }, {
        title: this.$t('咨询分类'),
        sorter: true,
        ellipsis: false,
        width: 180,
        dataIndex: 'summaryConsultClassify'
      }, {
        title: this.$t('渠道'),
        sorter: true,
        width: 120,
        dataIndex: 'channelName',
        customRender: (text) => {
          return text || '--'
        }
      }],
      sorter: { field: 'id', order: 'descend' },
      disabledCurrent: null,
      params: {},
      settingControl: {}
    }
  },
  created () {
    this.changeAdvanced()
    this.getChannel()
    this.getTreeData()
    this.gettreeDataKF() // 客服列表树选择
    this.axios({
      url: '/chat/setting/base',
      data: { action: 'get' }
    }).then(res => {
      this.settingControl = res.result.info
      switch (this.settingControl.commentGrade) {
        case 'second':
          this.satisfactionList = this.satisfactionList.filter(item => [2, 4].includes(item.value))
          break
        case 'third':
          this.satisfactionList = this.satisfactionList.filter(item => ![1, 5].includes(item.value))
          break
        case 'forth':
          this.satisfactionList = this.satisfactionList.filter(item => ![3].includes(item.value))
          break
      }
    })
  },
  methods: {
    gettreeDataKF () {
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
        this.treeDataKF = res.result.data
      })
    },
    handleRecord (record) {
      this.$refs.conversationRecord.show({
        title: this.$t('会话记录'),
        url: '/chat/stats/record',
        record: record,
        tab: 0
      })
    },
    // 获取渠道
    getChannel () {
      this.axios({
        url: '/chat/channel/getChannel'
      }).then(res => {
        this.channelLists = res.result
      })
    },
    // 咨询分类
    getTreeData () {
      this.axios({
        url: '/admin/dict/initData',
        data: {
          pageNo: 1,
          pageSize: 999,
          dictCategoryNumber: 'zxfl',
          sortField: 'listOrder',
          sortOrder: 'ascend'
        }
      }).then(res => {
        this.treeData = res.result
        this.treeData.forEach(item => {
          item.disabled = undefined
          if (item.children && item.children.length) {
            // item.selectable = false //是否可选中该级  默认是true
            item.children.forEach(childItem => {
              childItem.disabled = undefined
              if (childItem.children && childItem.children.length) {
                childItem.children.forEach(keyItem => { keyItem.disabled = undefined })
                childItem.selectable = false
              }
            })
          }
        })
      })
    },
    loadDataTable (parameter) {
      this.params = Object.assign(parameter, this.queryParam)
      if (this.params.serviceId) {
        this.params.serviceId = this.queryParam.serviceId.map(item => {
          return item.split('-')[0]
        })
      }
      return this.axios({
        url: '/chat/historyConversation/init',
        data: this.params
      }).then(res => {
        return res.result
      })
    },
    changeAdvanced (tag) {
      if (tag) {
        this.advanced = !this.advanced
      }
      if (this.advanced) {
        this.colLayout = { xs: 24, sm: 12, md: 8, lg: 8, xl: 6, xxl: 6 }
      } else {
        this.colLayout = { xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 6 }
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
      this.queryParam.startTime = this.moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
      this.queryParam.endTime = this.moment().subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss')
      const day = [this.moment().subtract(1, 'day').startOf('day'), this.moment().subtract(1, 'day').endOf('day')]
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
        number: 'SysHistoryConversation',
        className: 'ExportChatStatsTask',
        parameter: {
          condition: {
            req: params,
            type: 'historyConversation'
          }
        }
      })
    }
  }
}
</script>
