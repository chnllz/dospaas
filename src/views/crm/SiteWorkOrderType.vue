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
    <a-space>
      <a-button v-action:export icon="download" @click="handleExport">{{ $t('导出') }}</a-button>
    </a-space>
    <s-table
      ref="table"
      :scroll="{ y: true }"
      class="table-fill"
      size="small"
      rowKey="rowKey"
      :columns="columns"
      :data="loadDataTable"
      :sorter="{ field: 'endWorkOrderNumber', order: 'descend' }"
    ></s-table>
    <general-export ref="generalExport" />
  </div>
</template>
<script>
import debounce from 'lodash/debounce'
export default {
  i18n: window.lang('crm'),
  components: {
    GeneralExport: () => import('@/views/admin/Table/GeneralExport')
  },
  data () {
    this.fetcSite = debounce(this.fetcSite, 800)
    return {
      sessionTime: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
      advanced: false,
      queryParam: {
        startTime: this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD'),
        endTime: this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD')
      },
      columns: [{
        title: '站点名称',
        dataIndex: 'siteName'
      }, {
        title: '完结工单数',
        dataIndex: 'endWorkOrderNumber',
        sorter: true
      }, {
        title: this.$t('下单前咨询'),
        dataIndex: 'preOrderConsultation'
      }, {
        title: this.$t('支付问题'),
        dataIndex: 'paymentProblem'
      }, {
        title: this.$t('订单问题'),
        dataIndex: 'orderProblem'
      }, {
        title: this.$t('物流问题'),
        dataIndex: 'logisticsProblem'
      }, {
        title: this.$t('退换货'),
        dataIndex: 'changingOrRefunding'
      }, {
        title: this.$t('投诉与建议'),
        dataIndex: 'complaintsAndSuggestions'
      }, {
        title: this.$t('商务合作'),
        dataIndex: 'businessCooperation'
      }, {
        title: this.$t('会员权益'),
        dataIndex: 'rightAndInterestOfMember'
      }, {
        title: this.$t('折扣'),
        dataIndex: 'discount'
      }, {
        title: this.$t('账户问题咨询'),
        dataIndex: 'accountConsultation'
      }, {
        title: this.$t('其他'),
        dataIndex: 'other'
      }, {
        title: this.$t('无'),
        dataIndex: 'nil'
      }],
      param: {},
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
  methods: {
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
      this.queryParam.site = siteList
      const queryParam = this.queryParam
      this.sortField = parameter.sortField
      this.sortOrder = parameter.sortOrder
      return this.axios({
        url: '/crm/report/getSiteWorkOrderType',
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
      this.queryParam.startTime = this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD')
      this.queryParam.endTime = this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD')
      const day = [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)]
      this.queryParam.site = []
      this.site = []
      this.searchData = ''
      this.sessionTime = day
      this.$refs.table.refresh()
    },
    handleTabChange (activeKey) {
      this.currentTab = activeKey
      this.reset()
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
              site: this.queryParam.site,
              sortField: this.sortField,
              sortOrder: this.sortOrder
            },
            type: 'workOrderType'
          }
        }
      })
    }
  }
}
</script>
