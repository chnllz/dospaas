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
            <a-form-item :label="$t('站点名称')">
              <a-select
                v-model="site"
                showSearch
                mode="multiple"
                label-in-value
                allowClear
                :placeholder="$t('请输入站点名称')"
                style="width: 100%"
                :filter-option="false"
                :not-found-content="fetching ? undefined : null"
                @search="fetcSite"
                @change="handleChange"
                @popupScroll="popupSiteScroll"
              >
                <a-spin v-if="fetching" slot="notFoundContent" size="small" />
                <a-select-option v-for="item in siteList" :key="item.number" :value="item.number">
                  {{ item.name }}
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
            <div v-dompurify-html="content" style="width: 300px"></div>
          </template>
          <a-icon type="question-circle" style="font-size: 16px" />
        </a-popover>
      </a-col>
    </a-row>
    <s-table
      ref="table"
      :scroll="{ x: 'calc(700px + 50%)', y: true }"
      class="table-fill"
      size="small"
      rowKey="rowKey"
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
      sessionTime: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
      advanced: false,
      queryParam: {
        startTime: this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD'),
        endTime: this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD')
      },
      columns: [{
        title: this.$t('站点名称'),
        dataIndex: 'siteName',
        width: 160
      }, {
        title: this.$t('新增工单数'),
        dataIndex: 'additionalWorkOrderNumber',
        sorter: true,
        width: 128
      }, {
        title: this.$t('完结工单数'),
        dataIndex: 'endWorkOrderNumber',
        sorter: true,
        width: 128
      }, {
        title: this.$t('客服手动完单数/占比'),
        dataIndex: 'manualOrderComplete',
        width: 136,
        scopedSlots: { customRender: 'manualOrderComplete' }
      }, {
        title: this.$t('超时自动完单数/占比'),
        dataIndex: 'autoOrderComplete',
        width: 136,
        scopedSlots: { customRender: 'autoOrderComplete' }
      }, {
        title: this.$t('平均首响时长'),
        dataIndex: 'averageFirstResponseTime',
        sorter: true,
        width: 128
      }, {
        title: '对客平均响应时长',
        dataIndex: 'guestWorkitemDuration',
        sorter: true,
        width: 128
      }, {
        title: '12小时对客响应占比',
        dataIndex: 'guestRowCountP',
        width: 136
      }, {
        title: this.$t('平均响应时长'),
        dataIndex: 'workitemDuration',
        sorter: true,
        width: 128
      }, {
        title: this.$t('12小时响应占比'),
        dataIndex: 'rowCountP',
        width: 128
      }, {
        title: this.$t('平均完单时长'),
        dataIndex: 'averageProcessingTime',
        sorter: true,
        width: 128
      }, {
        title: this.$t('24小时完结工单数'),
        dataIndex: 'twentyFourHourEndWorkOrderNumber',
        width: 128
      }, {
        title: this.$t('24小时完结工单数占比'),
        dataIndex: 'twentyFourHourEndWorkOrderRate',
        width: 154
      }, {
        title: this.$t('3天完结工单数'),
        dataIndex: 'threeDaysEndWorkOrderNumber',
        width: 128
      }, {
        title: this.$t('3天完结工单数占比'),
        dataIndex: 'threeDaysEndWorkOrderRate',
        width: 128
      }, {
        title: this.$t('5天完结工单数'),
        dataIndex: 'fiveDaysEndWorkOrderNumber',
        width: 128
      }, {
        title: this.$t('5天完结工单数占比'),
        dataIndex: 'fiveDaysEndWorkOrderRate',
        width: 128
      }],
      param: {},
      content: `${this.$t('新增工单数：当前站点，新生成的工单数量。')}<br />
                ${this.$t('完结工单数：当前站点，所有已完结工单总数。')}<br />
                ${this.$t('客服手动完单数：工单子状态为“已解决，工单结束”或“关闭，工单结束“的工单总数。')}<br />
                ${this.$t('客服手动完单数占比：客服手动完单数/完结工单数。')}<br />
                ${this.$t('超时自动完单数：工单子状态为“客户超期未回复，工单结束”的工单总数。')}<br />
                ${this.$t('超时自动完单数占比：超时自动完单数/完结工单数。')}<br />
                ${this.$t('平均首响时长：当前站点所有已首响的工单首响时长之和/当前站点所有已首响的工单总数。')}<br />
                ${this.$t('平均响应时长：当前站点下，客服处理任务的时长（分配时间到客服提交时间）的平均值。')}<br />
                ${this.$t('12小时响应占比：12小时内（含）响应的次数/总响应次数。')}<br />
                ${this.$t('平均完单时长：当前站点所有手动完结工单的完单时长之和/当前站点手动完结的工单总数。')}<br />
                ${this.$t('24小时完结工单数：完单时长≤24H的已完结工单数。')}<br />
                ${this.$t('24小时完结工单数占比：当前站点24小时内完结工单数/当前客服手动完结的工单总数。')}<br />
                ${this.$t('3天完结工单数：完单时长≤3天的已完结工单数。')}<br />
                ${this.$t('3天完结工单数占比：当前站点3天内完结工单数/当前客服手动完结的工单总数。')}<br />
                ${this.$t('5天完结工单数：完单时长≤5天的已完结工单数。')}<br />
                ${this.$t('5天完结工单数占比：当前站点5天内完结工单数/当前客服手动完结的工单总数。')}`,
      siteList: [],
      pageSite: {
        pageNo: 1,
        pageSize: 20,
        sortField: 'id',
        sortOrder: 'descend'
      },
      fetching: false,
      scrollStats: false,
      searchData: '',
      site: [],
      sortField: '',
      sortOrder: ''
    }
  },
  mounted () {
    this.getCondition()
  },
  methods: {
    getCondition () {
      const arr = ['gdly', 'gdlx']
      arr.forEach(item => {
        this.axios({
          url: '/admin/dict/initData',
          data: {
            pageNo: 1,
            pageSize: 999,
            dictDataNumber: item,
            sortField: 'listOrder',
            sortOrder: 'ascend'
          }
        }).then(res => {
          if (res.code === 0) {
            this[`${item}List`] = res.result
          }
        })
      })
    },
    handleChange (value) {
      this.site = value
    },
    popupSiteScroll (e) {
      const scrollTop = e.target.scrollTop
      const scrollHeight = e.target.scrollHeight
      const clientHeight = e.target.clientHeight
      const scrollBottom = scrollHeight - clientHeight - scrollTop
      if (scrollBottom < 1 && this.scrollStats && this.searchData) {
        this.pageSite.pageNo++
        this.getSiteScroll()
      }
    },
    getSiteScroll () {
      this.axios({
        url: '/crm/report/getWebSite',
        data: Object.assign(this.pageSite, { name: this.searchData })
      }).then(res => {
        if (res.code === 0) {
          if (!res.result.data.length) {
            this.scrollStats = false
          }
          this.siteList = [...this.siteList, ...res.result.data]
        }
      })
    },
    fetcSite (e) {
      this.searchData = e
      this.pageSite.pageNo = 1
      this.scrollStats = true
      if (e) {
        this.fetching = true
        this.axios({
          url: '/crm/report/getWebSite',
          data: Object.assign(this.pageSite, { name: e })
        }).then(res => {
          if (res.code === 0) {
            this.siteList = res.result.data
            this.fetching = false
          }
        })
      }
    },
    loadDataTable (parameter) {
      const siteList = []
      if (this.site.length > 0) {
        this.site.forEach(item => {
          siteList.push(item.key)
        })
      }
      this.queryParam.siteId = siteList
      const queryParam = this.queryParam
      this.sortField = parameter.sortField
      this.sortOrder = parameter.sortOrder
      return this.axios({
        url: '/crm/report/getSiteWorkOrderDetail',
        data: Object.assign(parameter, queryParam)
      }).then(res => {
        if (res.result?.total && res.result?.data && res.result.data.length > 0 && res.result.data.length !== parameter.pageSize) {
          res.result.data.push({ ...res.result.total, ...{ siteName: this.$t('合计') } })
        }
        res.result.data.forEach((item, index) => {
          item.rowKey = index + 1
        })
        return res.result
      })
    },
    // 重置
    reset () {
      this.queryParam = {
        startTime: this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD'),
        endTime: this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD')
      }
      this.site = []
      const day = [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)]
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
              endTime: this.queryParam.endTime,
              startTime: this.queryParam.startTime,
              siteId: this.queryParam.siteId,
              sortField: this.sortField,
              sortOrder: this.sortOrder
            },
            type: 'workOrderDetail'
          }
        }
      })
    }
  }
}
</script>
