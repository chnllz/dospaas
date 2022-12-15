<template>
  <div class="page">
    <a-card size="small" :bordered="false">
      <a-tabs v-model="currentTab">
        <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.title"></a-tab-pane>
      </a-tabs>
    </a-card>
    <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" :colon="false" class="search">
      <a-card size="small" :title="$t('搜索')">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
          <a-button @click="reset">{{ $t('重置') }}</a-button>
        </a-space>
        <a-row :class="advanced ? 'advanced' : 'normal'" class="form">
          <a-col :span="6">
            <a-form-item :label="currentTab == 'day' ? $t('日期') : $t('月份')">
              <a-range-picker
                v-if="['day', 'time'].includes(currentTab)"
                v-model="sessionTime"
                :allowClear="false"
                :disabled-date="disabledDate"
                :ranges="{
                  [$t('昨天')]: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
                  [$t('本周')]: [moment().startOf('week'), moment().endOf('week')],
                  [$t('最近七天')]: [moment().subtract(7, 'days'), moment()],
                  [$t('本月')]: [moment().startOf('month'), moment().endOf('month')],
                  [$t('最近31天')]: [moment().subtract(31, 'days'), moment()]
                }"
                format="YYYY-MM-DD"
                style="width: 100%"
                @change="getInputTime"
              />
              <a-range-picker
                v-else-if="currentTab == 'month'"
                v-model="sessionTime"
                style="width: 100%"
                :placeholder="['Start month', 'End month']"
                format="YYYY-MM"
                :ranges="{
                  [$t('本月')]: [moment().startOf('month'), moment().endOf('month')],
                  [$t('上个月')]: [
                    moment().startOf('month').subtract('month', 1),
                    moment().endOf('month').subtract('month', 1)
                  ],
                  [$t('最近3个月')]: [moment().subtract(3, 'month'), moment()]
                }"
                :mode="modeMonth"
                :open="openMonth"
                @openChange="openMonthChange"
                @panelChange="handlePanelChange"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('站点')">
              <a-select v-model="queryParam.site" allowClear showSearch style="width: 100%">
                <a-select-option v-for="item in siteList" :key="item.value" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('客服')">
              <a-tree-select
                v-model="queryParam.serviceId"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                allowClear
                treeCheckable
                multiple
                :replaceFields="{
                  value: 'rootId',
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
    <s-table
      ref="table"
      :showPagination="false"
      :scroll="{ y: true }"
      class="table-fill"
      size="small"
      rowKey="conversationDate"
      :columns="columns"
      :data="loadDataTable"
      :sorter="{ field: 'conversationDate', order: 'descend' }"
    >
      <a-row slot="title" type="flex" justify="space-between" align="middle">
        <a-col>
          <a-space>
            <a-button v-action:export icon="download" @click="handleExport">{{ $t('导出') }}</a-button>
          </a-space>
        </a-col>
        <a-col style="margin: 8px 8px 0">
          <a-popover placement="left">
            <template slot="content">
              <div v-dompurify-html="content.replace(/。/g, `。 <br />`)" style="width: 300px"></div>
            </template>
            <a-icon type="question-circle" style="font-size: 16px" />
          </a-popover>
        </a-col>
      </a-row>
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
      modeMonth: ['month', 'month'],
      currentTab: 'day',
      sessionTime: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
      tabList: [{
        title: this.$t('满意度明细表'),
        key: 'day'
      }],
      openMonth: false,
      advanced: false,
      queryParam: {
        startTime: this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD'),
        endTime: this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD'),
        second: '60'
      },
      columns: [{
        title: this.$t('工单号'),
        dataIndex: 'gdh'
      }, {
        title: this.$t('满意度结果'),
        dataIndex: 'mydjg'
      }, {
        title: this.$t('订单号'),
        dataIndex: 'ddh'
      }, {
        title: this.$t('订单来源'),
        dataIndex: 'ddly'
      }, {
        title: this.$t('站点'),
        dataIndex: 'zd'
      }, {
        title: this.$t('工单结案客服'),
        dataIndex: 'gdjakf'
      }, {
        title: this.$t('工单类型'),
        dataIndex: 'gdlx'
      }, {
        title: this.$t('工单关键词（一级）'),
        dataIndex: 'gdgjc'
      }, {
        title: this.$t('用户邮箱'),
        dataIndex: 'yhyx'
      }, {
        title: this.$t('邀评时间'),
        dataIndex: 'ypsj'
      }, {
        title: this.$t('评价时间'),
        dataIndex: 'pjsj'
      }],
      param: {},
      siteList: [],
      treeData: [],
      content: `${this.$t('邀评量：发送满意度调研问卷的邮件数量；')}<br />
                ${this.$t('参评量：调查问卷回收份数；')}<br />
                ${this.$t('参评率：参评量/问卷投放量*100%；')}<br />
                ${this.$t('满意度：满意数量/参评量；')}<br />
                ${this.$t('满意：评价结果为“非常满意”+“满意”的数量；')}<br />
                ${this.$t('一般：评价结果为”一般“的数量；')}<br />
                ${this.$t('不满意：评价结果为”不满意“+”非常不满意“的数量。')}`
    }
  },
  mounted () {
    this.getService()
  },
  methods: {
    getService () {
      this.axios({
        url: '/chat/group/getAllGroup'
      }).then(res => {
        this.treeData = res.result.data
        this.treeData.forEach(item => {
          item.rootId = item.serviceId
          item.children.forEach(itemChild => {
            itemChild.rootId = item.serviceId + itemChild.serviceId
          })
        })
      })
    },
    loadDataTable (parameter) {
      this.queryParam.tab = this.currentTab === 'day' ? 'day' : this.currentTab === 'month' ? 'month' : 'hour'
      if (this.queryParam.serviceId) {
        const service = []
        this.treeData.forEach(item => {
          this.queryParam.serviceId.forEach(itemSer => {
            if (itemSer.includes(item.serviceId)) {
              let str = ''
              str = itemSer.split(item.serviceId)[1]
              console.log('str', str)
              service.push(str)
            }
          })
        })
        for (let i = 0; i < service.length; i++) {
          for (let j = i + 1; j < service.length; j++) {
            if (service[i] === service[j]) {
              service.splice(j, 1)
            }
          }
        }
        this.queryParam.serviceId = service
      }
      const queryParam = this.queryParam
      this.sortField = parameter.sortField
      this.sortOrder = parameter.sortOrder
      this.param = {
        sortField: parameter.sortField,
        sortOrder: parameter.sortOrder
      }
      return this.axios({
        url: '/chat/customerReport/init',
        data: Object.assign(this.param, queryParam)
      }).then(res => {
        if (res.result?.total) {
          const obj = { ...res.result.total, ...{ id: parseInt(Math.random() * (10000000 - 100000 + 1) + 100000, 10), conversationDate: '合计' } }
          res.result.data.push(obj)
        }
        return res.result
      })
    },
    // 重置
    reset () {
      this.queryParam.startTime = this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD')
      this.queryParam.endTime = this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD')
      this.queryParam.second = '60'
      const day = [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)]
      const month = [this.moment().startOf('month'), this.moment().startOf('month')]
      this.sessionTime = ['day', 'time'].includes(this.currentTab) ? day : this.currentTab === 'month' ? month : ''
      this.$refs.table.refresh()
    },
    disabledDate (current, date) {
      return current < this.moment().subtract(2, 'days').subtract(1, 'years')
    },
    getInputTime (date, dateString) {
      this.queryParam.startTime = dateString[0]
      this.queryParam.endTime = dateString[1]
    },
    // 控制月份中改变的设置
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
    handleExport () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'ExportChatStatsTask',
        parameter: {
          condition: {
            req: Object.assign(this.param, this.queryParam),
            type: 'analyze'
          }
        }
      })
    }
  }
}
</script>
