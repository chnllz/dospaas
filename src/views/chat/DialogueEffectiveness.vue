<template>
  <div class="page">
    <a-spin :spinning="loading">
      <a-tabs v-model="currentTab" :animated="false" @change="handleTabChange">
        <a-tab-pane v-for="parentItem in tabList" :key="parentItem.key" :tab="parentItem.title">
          <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search">
            <a-card size="small" :title="$t('搜索')">
              <a-space slot="extra">
                <a-button htmlType="submit" @click="getDataList()">{{ $t('搜索') }}</a-button>
                <a-button @click="reset">{{ $t('重置') }}</a-button>
              </a-space>
              <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
                <a-col :span="6">
                  <a-form-item :label="$t('会话开始时间')">
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
                      @change="
                        (date, dateString) => {
                          queryParam.startTime = dateString[0] + '-01'
                          queryParam.endTime = dateString[1] + '-01'
                        }
                      "
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
                  <a-form-item :label="$t('客服名称')">
                    <a-tree-select
                      v-model="showObj['serviceId' + parentItem.key]"
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
                <a-col :span="6">
                  <a-form-item :label="$t('渠道')">
                    <a-select
                      v-model="showObj['channel' + parentItem.key]"
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
                  <div v-dompurify-html="content.replace(/。/g, `。 <br />`)" style="width: 300px"></div>
                </template>
                <a-icon type="question-circle" style="font-size: 16px" />
              </a-popover>
            </a-col>
          </a-row>
          <a-table
            ref="table"
            :pagination="false"
            bordered
            :scroll="{ y: windowHeight - 420 }"
            class="table-fill"
            size="small"
            rowKey="conversationDate"
            :columns="columns"
            :dataSource="showTable['dataList' + parentItem.key]"
            :sorter="sorter"
          ></a-table>
        </a-tab-pane>
      </a-tabs>
      <general-export ref="generalExport" />
    </a-spin>
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
      loading: false,
      // 搜索栏显示参数
      showObj: {
        sessionTimeday: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
        sessionTimetime: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
        sessionTimemonth: [this.moment().startOf('month'), this.moment().startOf('month')],
        periodTime: '60'
      },
      // 表格数据对象
      showTable: {},
      showApi: {
        dayIs: false,
        monthIs: false,
        timeIs: false
      },
      treeData: [],
      sessionTime: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
      openMonth: false,
      modeMonth: ['month', 'month'],
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
      currentTab: 'day',
      tabList: [{
        title: this.$t('会话有效性-按天'),
        key: 'day'
      }, {
        title: this.$t('会话有效性-按月'),
        key: 'month'
      }, {
        title: this.$t('会话有效性-按时段'),
        key: 'time'
      }],
      content: `${this.$t('总会话量：访客被客服接起的数量。')}<br />

                ${this.$t('有效会话量：满足统计设置中{有效咨询设置}的会话数。')}<br />

                ${this.$t('有效会话率：有效会话量/总会话量*100%。')}<br />

                ${this.$t('客服未发言数量：访客被客服接起后，直到会话结束，客服没有发言的数量。')}<br />

                ${this.$t('客服未发言占比：客服未发言数量/总会话量*100%。')}<br />

                ${this.$t('访客未发言数量：访客被客服接起后，直到会话结束，访客没有发言的数量。')}<br />

                ${this.$t('访客未发言占比：访客未发言数量/总会话量*100%。')}`,
      advanced: false,
      queryParam: {
        sortField: 'conversationDate',
        sortOrder: 'descend',
        tab: 'day',
        startTime: this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD'),
        endTime: this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD')
      },
      channelLists: [],
      columns: [{
        title: '#',
        align: 'center',
        width: 40,
        customRender: (text, record, index) => {
          return index + 1
        }
      }, {
        title: this.$t('会话开始时间'),
        dataIndex: 'conversationDate',
        sorter: (a, b) => Date.parse(a.conversationDate) - Date.parse(b.conversationDate),
        align: 'center'
      }, {
        title: this.$t('总会话量'),
        dataIndex: 'conversationNumber',
        sorter: (a, b) => a.conversationDate === this.$t('合计') ? 0 : a.conversationNumber - b.conversationNumber,
        align: 'center'
      }, {
        title: this.$t('有效会话'),
        children: [{
          title: this.$t('数量'),
          dataIndex: 'effectiveConversationNumber',
          align: 'center'
        }, {
          title: this.$t('占比'),
          dataIndex: 'efficientConversation',
          align: 'center'
        }]
      }, {
        title: this.$t('客服未发言'),
        children: [{
          title: this.$t('数量'),
          dataIndex: 'serviceNotSay',
          align: 'center'
        }, {
          title: this.$t('占比'),
          dataIndex: 'invalidConversation',
          align: 'center'
        }]
      }, {
        title: this.$t('访客未发言'),
        children: [{
          title: this.$t('数量'),
          dataIndex: 'visitorNotSay',
          align: 'center'
        }, {
          title: this.$t('占比'),
          dataIndex: 'visitorConversation',
          align: 'center'
        }]
      }],
      sorter: { field: 'id', order: 'descend' },
      params: {},
      dataList: [],
      disabledCurrent: null,
      windowHeight: document.documentElement.clientHeight
    }
  },
  mounted () {
    const strArr = ['day', 'month', 'time']
    strArr.forEach(element => {
      this.$set(this.showObj, ['serviceId' + element], undefined)
      this.$set(this.showObj, ['channel' + element], undefined)
    })
    this.getChannel()
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
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight
        this.windowHeight = window.fullHeight
      })()
    }
    this.getDataList()
  },
  methods: {
    getDataList () {
      this.queryParam.channel = this.showObj['channel' + this.currentTab]
      this.queryParam.serviceId = this.showObj['serviceId' + this.currentTab]
      this.queryParam.period = this.showObj['period' + this.currentTab]
      this.loading = true
      const params = this.queryParam
      if (params.serviceId) {
        params.serviceId = this.queryParam.serviceId.map(item => {
          return item.split('-')[0]
        })
      }
      this.axios({
        url: '/chat/customerReport/effectiveDialogueInit',
        data: params
      }).then(res => {
        this.loading = false
        if (res.result?.total) {
          const obj = { ...res.result.total, ...{ id: parseInt(Math.random() * (10000000 - 100000 + 1) + 100000, 10), conversationDate: this.$t('合计') } }
          res.result.data.push(obj)
        }
        this.showTable['dataList' + this.currentTab] = res.result.data
        this.$forceUpdate()
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
    handleTabChange (activeKey) {
      this.currentTab = activeKey
      this.queryParam.tab = activeKey
      if (['day', 'month'].includes(activeKey)) {
        this.$set(this.queryParam, 'period', undefined)
        this.columns[1].title = this.$t('会话开始时间')
        this.columns[1].sorter = (a, b) => Date.parse(a.conversationDate) - Date.parse(b.conversationDate)
        if (activeKey === 'month' && !this.showApi.monthIs) {
          this.getDataList()
          this.showApi.monthIs = true
        }
      } else {
        this.$set(this.queryParam, 'period', this.showObj['period' + this.currentTab])
        this.columns[1].title = this.$t('会话时间段')
        this.columns[1].sorter = false
        if (!this.showApi.timeIs) {
          this.getDataList()
          this.showApi.timeIs = true
        }
      }
      this.queryParam.startTime = this.showObj['sessionTime' + this.currentTab][0].format('YYYY-MM-DD')
      this.queryParam.endTime = this.showObj['sessionTime' + this.currentTab][1].format('YYYY-MM-DD')
    },
    // 重置
    reset () {
      this.showObj['channel' + this.currentTab] = undefined
      this.showObj['serviceId' + this.currentTab] = undefined
      this.showObj['period' + this.currentTab] = this.currentTab === 'time' ? '60' : undefined
      const startDayTime = this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD')
      const startMonth = this.moment().startOf('month').format('YYYY-MM-DD')
      const endDayTime = this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD')
      this.queryParam = {
        startTime: ['day', 'time'].includes(this.currentTab) ? startDayTime : startMonth,
        endTime: ['day', 'time'].includes(this.currentTab) ? endDayTime : startMonth,
        period: this.currentTab === 'time' ? '60' : undefined,
        sortField: 'conversationDate',
        sortOrder: 'descend',
        tab: this.currentTab
      }
      const day = [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)]
      const month = [this.moment().startOf('month'), this.moment().startOf('month')]
      this.showObj['sessionTime' + this.currentTab] = ['day', 'time'].includes(this.currentTab) ? day : this.currentTab === 'month' ? month : ''
      this.getDataList()
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
    // 控制月份中改变的设置
    openMonthChange (status) {
      // 清空禁用时间段的设置
      this.disabledCurrent = null
      this.openMonth = status
    },
    handlePanelChange (value, mode) {
      const chooseTime = value
      this.modeMonth = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
      if (mode[0] === 'date') {
        this.disabledCurrent = value[0]
      } else {
        this.disabledCurrent = null
      }
      if (mode[1] === 'date') {
        this.openMonth = false
        const time = value[1].diff(value[0], 'month')
        if (time > 11) {
          chooseTime[0] = this.moment(value[1]).subtract(11, 'M').startOf('day')
        }
      }
      this.queryParam.startTime = chooseTime[0].format('YYYY-MM-DD')
      this.queryParam.endTime = chooseTime[1].format('YYYY-MM-DD')
      this.showObj['sessionTime' + this.currentTab] = chooseTime
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
        number: 'SysEffectiveDialogue',
        className: 'ExportChatStatsTask',
        parameter: {
          condition: {
            req: params,
            type: 'effectiveDialogue'
          }
        }
      })
    }
  }
}
</script>
