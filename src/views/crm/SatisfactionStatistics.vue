<template>
  <div class="page">
    <a-tabs v-model="currentTab" @change="handleTabChange">
      <a-tab-pane v-for="parentItem in tabList" :key="parentItem.key" :tab="parentItem.title">
        <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
          <a-card size="small" :title="$t('搜索')">
            <a-space slot="extra">
              <a-button htmlType="submit" @click="$refs['table' + parentItem.key][0].refresh(true)">
                {{ $t('搜索') }}
              </a-button>
              <a-button @click="reset">{{ $t('重置') }}</a-button>
            </a-space>
            <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
              <a-col :span="6">
                <a-form-item :label="['site', 'service'].includes(parentItem.key) ? $t('邀评日期') : $t('评价日期')">
                  <a-range-picker
                    v-model="showObj['sessionTime' + parentItem.key]"
                    :allowClear="false"
                    :disabled-date="disabledDate"
                    :ranges="{
                      [$t('昨天')]: [
                        moment().startOf('day').subtract('day', 1),
                        moment().endOf('day').subtract('day', 1)
                      ],
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
              <a-col v-if="['site', 'siteComments'].includes(parentItem.key)" :span="6">
                <a-form-item :label="$t('站点名称')">
                  <a-select
                    v-model="showObj['site' + parentItem.key]"
                    showSearch
                    mode="multiple"
                    label-in-value
                    allowClear
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
              <a-col v-else-if="['service', 'serviceComments'].includes(parentItem.key)" :span="6">
                <a-form-item :label="$t('客服名称')">
                  <a-tree-select
                    v-model="showObj['serviceList' + parentItem.key]"
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
          :ref="'table' + parentItem.key"
          :scroll="{ y: true }"
          class="table-fill"
          style="height: calc(100vh - 274px)"
          size="small"
          rowKey="id"
          :columns="columns"
          :data="loadDataTable"
          :sorter="sorter"
        >
          <div slot="greatSatisfaction" slot-scope="text, record">
            {{ record.greatSatisfactionProportion ? `${text}/${record.greatSatisfactionProportion}` : text }}
          </div>
          <div slot="satisfaction" slot-scope="text, record">
            {{ record.satisfactionProportion ? `${text}/${record.satisfactionProportion}` : text }}
          </div>
          <div slot="ordinary" slot-scope="text, record">
            {{ record.ordinaryProportion ? `${text}/${record.ordinaryProportion}` : text }}
          </div>
          <div slot="dissatisfied" slot-scope="text, record">
            {{ record.dissatisfiedProportion ? `${text}/${record.dissatisfiedProportion}` : text }}
          </div>
          <div slot="unsatisfied" slot-scope="text, record">
            {{ record.unsatisfiedProportion ? `${text}/${record.unsatisfiedProportion}` : text }}
          </div>
        </s-table>
      </a-tab-pane>
    </a-tabs>
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
      // 搜索栏显示参数
      showObj: {
        sessionTimesite: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
        sessionTimeservice: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
        sessionTimesitecomments: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
        sessionTimeservicecomments: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
        sitesite: [], // 按邀评 站点
        sitesiteComments: [], // 按参评 站点
        serviceListservice: [], // 按邀评 客服
        serviceListserviceComments: [], // 按参评 客服
        getServiceListservice: [],
        getServiceListserviceComments: []
      },
      apiNum: 0,
      apiNumComment: 0,
      modeMonth: ['month', 'month'],
      currentTab: 'site',
      sessionTime: [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)],
      tabList: [{
        title: this.$t('满意度统计(站点)-按邀评'),
        key: 'site'
      }, {
        title: this.$t('满意度统计(客服)-按邀评'),
        key: 'service'
      }, {
        title: this.$t('满意度统计(站点)-按参评'),
        key: 'siteComments'
      }, {
        title: this.$t('满意度统计(客服)-按参评'),
        key: 'serviceComments'
      }],
      openMonth: false,
      advanced: false,
      queryParam: {
        startTime: this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD'),
        endTime: this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD'),
        site: []
      },
      columns: [{
        title: this.$t('站点名称'),
        dataIndex: 'siteName'
      }, {
        title: this.$t('邀评量'),
        dataIndex: 'invitedComment',
        sorter: true
      }, {
        title: this.$t('参评量'),
        dataIndex: 'joinComment',
        sorter: true
      }, {
        title: this.$t('参评率'),
        dataIndex: 'joinCommentRate',
        sorter: true
      }, {
        title: this.$t('满意度'),
        dataIndex: 'satisfactionRate',
        sorter: true
      }, {
        title: this.$t('非常满意/占比'),
        dataIndex: 'greatSatisfaction',
        scopedSlots: { customRender: 'greatSatisfaction' }
      }, {
        title: this.$t('满意/占比'),
        dataIndex: 'satisfaction',
        scopedSlots: { customRender: 'satisfaction' }
      }, {
        title: this.$t('一般/占比'),
        dataIndex: 'ordinary',
        scopedSlots: { customRender: 'ordinary' }
      }, {
        title: this.$t('不满意/占比'),
        dataIndex: 'dissatisfied',
        scopedSlots: { customRender: 'dissatisfied' }
      }, {
        title: this.$t('非常不满意/占比'),
        dataIndex: 'unsatisfied',
        scopedSlots: { customRender: 'unsatisfied' }
      }],
      sorter: { field: 'invitedComment', order: 'descend' },
      param: {},
      content: '',
      contentInvited: `${this.$t('因客户评价的动态特征，系统每天更新前30天的评价结果。')}<br />
                ${this.$t('邀评量：按{邀评日期}，发送满意度调研问卷的邮件数量。')}<br />
                ${this.$t('参评量：按{邀评日期}，客户提交的问卷数量。')}<br />
                ${this.$t('参评率：参评量/邀评量*100%。')}<br />
                ${this.$t('满意度：满意数量/参评量；其中满意数量=（非常满意+满意）。')}<br />
                ${this.$t('非常满意/占比：评价结果为“非常满意”的数量，占比=“非常满意”数/参评量。')}<br />
                ${this.$t('满意：评价结果为“满意”的数量，占比=“满意”数/参评量。')}<br />
                ${this.$t('一般：评价结果为”一般“的数量，占比=“一般”数/参评量。')}<br />
                ${this.$t('不满意：评价结果为”不满意“的数量，占比=“不满意”数/参评量。')}<br />
                ${this.$t('非常不满意：评价结果为”非常不满意“的数量，占比=“非常不满意”数/参评量。')}`,
      contentJoin: `${this.$t('邀评量：按邀评时间在统计周期{用户评价日期}内，发送满意度调研问卷的邮件数量。')}
                ${this.$t('参评量：按{用户评价日期}，客户提交的问卷数量。')}<br />
                ${this.$t('参评率：参评量/邀评量*100%（因为统计周期以{用户评价日期}为维度，所以参评率可能大于100%）。')}<br />
                ${this.$t('满意度：满意数量/参评量；其中满意数量=（非常满意+满意）。')}<br />
                ${this.$t('非常满意/占比：评价结果为“非常满意”的数量，占比=“非常满意”数/参评量。')}<br />
                ${this.$t('满意：评价结果为“满意”的数量，占比=“满意”数/参评量。')}<br />
                ${this.$t('一般：评价结果为”一般“的数量，占比=“一般”数/参评量。')}<br />
                ${this.$t('不满意：评价结果为”不满意“的数量，占比=“不满意”数/参评量。')}<br />
                ${this.$t('非常不满意：评价结果为”非常不满意“的数量，占比=“非常不满意”数/参评量。')}`,
      serviceTree: [],
      siteList: [],
      pageSite: {
        pageNo: 1,
        pageSize: 20,
        sortField: 'id',
        sortOrder: 'descend'
      },
      fetching: false,
      scrollStats: false,
      searchData: ''
    }
  },
  created () {
    this.getService()
  },
  methods: {
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
      this.showObj['getServiceList' + this.currentTab] = arr
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
    handleChange (value) {
      this.showObj['site' + this.currentTab] = value
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
    loadDataTable (parameter) {
      if (['site', 'service'].includes(this.currentTab)) {
        this.content = this.contentInvited
      } else {
        this.content = this.contentJoin
      }
      this.queryParam.tab = this.currentTab
      if (['site', 'siteComments'].includes(this.currentTab)) {
        const siteList = []
        if (this.showObj['site' + this.currentTab].length > 0) {
          this.showObj['site' + this.currentTab].forEach(item => {
            siteList.push(item.key)
          })
        }
        this.queryParam.site = siteList && siteList.length > 0 ? siteList : undefined
      } else {
        this.queryParam.serviceId = this.showObj['getServiceList' + this.currentTab]
      }
      const queryParam = this.queryParam
      return this.axios({
        url: '/crm/report/getSatisfactionStatistics',
        data: Object.assign(parameter, queryParam)
      }).then(res => {
        if (res.code === 0) {
          if (res.result?.total && res.result?.data && res.result.data.length > 0 && res.result.data.length !== parameter.pageSize) {
            res.result.data.push({ ...res.result.total, ...{ siteName: this.$t('合计'), serviceName: this.$t('合计') } })
          }
          let id = 0
          res.result.data.forEach(item => {
            item.id = id
            id++
          })
        }
        return res.result
      })
    },
    // 重置
    reset () {
      this.queryParam.startTime = this.moment().startOf('day').subtract('day', 1).format('YYYY-MM-DD')
      this.queryParam.endTime = this.moment().endOf('day').subtract('day', 1).format('YYYY-MM-DD')
      if (['site', 'siteComments'].includes(this.currentTab)) {
        delete this.queryParam.serviceId
        this.queryParam.site = []
        this.showObj['site' + this.currentTab] = []
      } else {
        delete this.queryParam.site
        this.queryParam.serviceId = []
        this.showObj['serviceList' + this.currentTab] = []
        this.showObj['getServiceList' + this.currentTab] = []
      }
      const day = [this.moment().startOf('day').subtract('day', 1), this.moment().endOf('day').subtract('day', 1)]
      this.showObj['sessionTime' + this.currentTab] = day
      this.searchData = ''
      this.$nextTick(() => {
        this.$refs['table' + this.currentTab][0].refresh()
      })
    },
    handleTabChange (activeKey) {
      this.currentTab = activeKey
      this.queryParam.tab = activeKey
      if (['service', 'serviceComments'].includes(activeKey)) {
        this.columns[0].title = this.$t('客服名称')
        this.columns[0].dataIndex = 'serviceName'
        this.columns[0].customRender = (text, record) => {
          return record.serviceId ? `${record.serviceId}(${text})` : text
        }
        this.queryParam.site = undefined
      } else {
        this.queryParam.serviceId = undefined
        this.columns[0] = {
          title: this.$t('站点名称'),
          dataIndex: 'siteName'
        }
      }
      if (['site', 'service'].includes(activeKey)) {
        this.sorter.field = 'invitedComment' // 邀评量
      } else {
        this.sorter.field = 'joinComment' // 参评量
      }
      this.queryParam.startTime = this.showObj['sessionTime' + this.currentTab][0].format('YYYY-MM-DD')
      this.queryParam.endTime = this.showObj['sessionTime' + this.currentTab][1].format('YYYY-MM-DD')
      if (['site', 'service'].includes(activeKey)) {
        this.apiNum++
        if (this.apiNum >= 2) {
          this.$nextTick(() => {
            this.$refs['table' + this.currentTab][0].refresh()
          })
        }
      } else {
        this.apiNumComment++
        if (this.apiNumComment > 2) {
          this.$nextTick(() => {
            this.$refs['table' + this.currentTab][0].refresh()
          })
        }
      }
    },
    disabledDate (current, date) {
      return current < this.moment().subtract(2, 'days').subtract(1, 'years')
    },
    getInputTime (date, dateString) {
      this.queryParam.startTime = dateString[0]
      this.queryParam.endTime = dateString[1]
    },
    handleExport () {
      this.req = {}
      if (['site', 'siteComments'].includes(this.currentTab)) {
        this.req = {
          site: this.showObj['site' + this.currentTab].map(item => item.key)
        }
      } else {
        this.req = {
          serviceId: this.showObj['getServiceList' + this.currentTab]
        }
      }
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'ExportCrmReportTask',
        parameter: {
          condition: {
            req: {
              endTime: this.queryParam.endTime,
              startTime: this.queryParam.startTime,
              tab: this.queryParam.tab,
              ...this.req
            },
            type: 'satisfaction'
          }
        }
      })
    }
  }
}
</script>
