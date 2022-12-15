<template>
  <div class="page">
    <a-spin :spinning="loading">
      <a-tabs v-model="currentTab" :animated="false" @change="handleTabChange">
        <a-tab-pane
          v-for="parentItem in tabList"
          v-show="parentItem.key === currentTab"
          :key="parentItem.key"
          :tab="parentItem.title"
        >
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
                <a-col :span="6">
                  <a-form-item :label="$t('技能组')">
                    <a-select
                      v-model="showObj['groupId' + parentItem.key]"
                      mode="multiple"
                      allowClear
                      showSearch
                      option-filter-prop="children"
                      style="width: 100%"
                    >
                      <a-select-option v-for="item in groupList" :key="item.id" :value="item.id">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
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
                  <div>{{ $t('会话量：当前类型的人工接通量。') }}</div>
                  <div>{{ $t('占比：当前类型的人工接通量/人工接通总量。') }}</div>
                </template>
                <a-icon type="question-circle" style="font-size: 16px" />
              </a-popover>
            </a-col>
          </a-row>
          <a-table
            ref="table"
            :scroll="{ x: true, y: advanced ? windowHeight - 400 : windowHeight - 370 }"
            class="table-fill"
            size="small"
            rowKey="id"
            :columns="showTable['columns' + parentItem.key]"
            :dataSource="showTable['dataList' + parentItem.key]"
            :pagination="false"
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
      loading: false,
      // 搜索栏显示参数
      showObj: {
        sessionTimeday: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
        sessionTimetime: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
        sessionTimemonth: [this.moment().startOf('month'), this.moment().startOf('month')]
      },
      // 表格数据对象
      showTable: {},
      showApi: {
        dayIs: false,
        monthIs: false,
        timeIs: false
      },
      openMonth: false,
      modeMonth: ['month', 'month'],
      tabList: [{
        title: this.$t('会话问题-按天'),
        key: 'day'
      }, {
        title: this.$t('会话问题-按月'),
        key: 'month'
      }],
      currentTab: 'day',
      advanced: false,
      groupList: [],
      channelLists: [],
      queryParam: {
        startTime: this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD'),
        endTime: this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD')
      },
      columns: [{
        title: this.$t('咨询分类'),
        dataIndex: 'dictDataName',
        width: 150
      }],
      params: {},
      scrollX: 150,
      windowHeight: document.documentElement.clientHeight,
      disabledCurrent: null
    }
  },
  mounted () {
    const strArr = ['day', 'month', 'time']
    strArr.forEach(element => {
      this.$set(this.showObj, ['second_' + element], 60)
      this.$set(this.showObj, ['groupId' + element], undefined)
      this.$set(this.showObj, ['channel' + element], undefined)
    })
    this.getGroup()
    this.getChannel()
    this.getDataList()
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight
        this.windowHeight = window.fullHeight
      })()
    }
  },
  methods: {
    getDataList () {
      this.queryParam.tab = this.currentTab === 'day' ? 'day' : this.currentTab === 'month' ? 'month' : 'hour'
      this.queryParam.groupId = this.showObj['groupId' + this.currentTab]
      this.queryParam.channel = this.showObj['channel' + this.currentTab]
      this.loading = true
      this.axios({
        url: '/chat/problem/init',
        data: this.queryParam
      }).then(res => {
        this.loading = false
        if (res.code !== 0) {
          this.$message.error(res.message)
          return
        }
        this.showTable['columns' + this.currentTab] = [{
          title: this.$t('咨询分类'),
          dataIndex: 'dictDataName',
          width: 150
        }]
        this.scrollX = 150
        res.result.other.dictDataName = this.$t('其他')
        res.result.other.id = 0
        const arr = [res.result.other]
        res.result.data = [...res.result.data, ...arr]
        if (res.result.data.length) {
          const item = res.result.data[0]
          if (item.data.length) {
            item.data.forEach((dataItem, dataIndex) => {
              const obj = {
                title: dataItem.conversationDate,
                dataIndex: 'data[' + dataIndex + ']',
                width: 120,
                customRender: (obj) => {
                  return obj ? (obj.accessNumber + '/' + obj.accessRate) : null
                }
              }
              this.showTable['columns' + this.currentTab].push(obj)
              this.scrollX = this.scrollX + 120
            })
          }
        }
        this.showTable['dataList' + this.currentTab] = res.result.data
      })
    },
    handleTabChange (activeKey) {
      this.currentTab = activeKey
      this.queryParam.tab = activeKey
      this.queryParam.startTime = this.showObj['sessionTime' + this.currentTab][0].format('YYYY-MM-DD')
      this.queryParam.endTime = this.showObj['sessionTime' + this.currentTab][1].format('YYYY-MM-DD')
      if (activeKey === 'month' && !this.showApi.monthIs) {
        this.getDataList()
        this.showApi.monthIs = true
      }
    },
    // 获取技能组
    getGroup () {
      this.axios({
        url: '/chat/group/groupList'
      }).then(res => {
        this.groupList = res.result
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
    // 重置
    reset () {
      this.showObj['groupId' + this.currentTab] = undefined
      this.showObj['channel' + this.currentTab] = undefined
      const startDayTime = this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD')
      const startMonth = this.moment().startOf('month').format('YYYY-MM-DD')
      const endDayTime = this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD')
      this.queryParam = {
        startTime: ['day'].includes(this.currentTab) ? startDayTime : startMonth,
        endTime: ['day'].includes(this.currentTab) ? endDayTime : startMonth,
        tab: this.currentTab
      }
      const day = [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)]
      const month = [this.moment().startOf('month'), this.moment().startOf('month')]
      this.showObj['sessionTime' + this.currentTab] = ['day'].includes(this.currentTab) ? day : this.currentTab === 'month' ? month : ''
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
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        number: 'SysProblemInit',
        className: 'ExportChatStatsTask',
        parameter: {
          condition: {
            req: Object.assign(this.queryParam),
            type: 'problemInit'
          }
        }
      })
    }
  }
}
</script>
