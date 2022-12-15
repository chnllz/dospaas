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
              <a-month-picker
                v-model="sessionTime"
                :placeholder="$t('请选择月份')"
                :allowClear="false"
                style="width: 100%"
                @change="openMonthChange"
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
      bordered
      :showPagination="false"
      :scroll="{ y: true }"
      class="table-fill"
      size="small"
      rowKey="userName"
      :columns="columns"
      :data="loadDataTable"
      :sorter="{ field: 'totalScore', order: 'descend' }"
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
      sessionTime: this.moment().subtract(1, 'months').startOf('month'),
      openMonth: false,
      modeMonth: ['month', 'month'],
      advanced: false,
      queryParam: {
        startTime: this.moment().subtract(1, 'months').format('YYYY-MM-DD')
      },
      treeData: [],
      columns: [{
        title: this.$t('客服名称'),
        dataIndex: 'realName',
        width: 160,
        customRender: (text, record) => {
          if (text !== this.$t('合计')) {
            return `${record.userName}(${text})`
          } else {
            return text
          }
        }
      }, {
        title: 'CPH',
        children: [{
          title: this.$t('CPH值'),
          dataIndex: 'cphValue'
        }, {
          title: this.$t('CPH排名'),
          dataIndex: 'cphSort'
        }, {
          title: this.$t('基础分'),
          dataIndex: 'cphBase'
        }, {
          title: this.$t('排名分'),
          dataIndex: 'cphSortScore'
        }, {
          title: this.$t('CPH总分'),
          dataIndex: 'cphTotalScore'
        }]
      }, {
        title: 'FCR',
        children: [{
          title: this.$t('FCR值'),
          dataIndex: 'fcrValue'
        }, {
          title: this.$t('FCR排名'),
          dataIndex: 'fcrSort'
        }, {
          title: this.$t('基础分'),
          dataIndex: 'fcrBase'
        }, {
          title: this.$t('排名分'),
          dataIndex: 'fcrSortScore'
        }, {
          title: this.$t('FCR总分'),
          dataIndex: 'fcrTotalScore'
        }]
      }, {
        title: 'QA',
        dataIndex: 'qaScore'
      }, {
        title: this.$t('绩效总分'),
        dataIndex: 'totalScore',
        sorter: true
      }],
      content: `${this.$t('CPH计算')}<br />
                ${this.$t('CPH值：该月份，当前客服平均每小时（排班工时扣除日程申请时长后）完结工单总数；')}<br />
                ${this.$t('CPH排名：根据CPH值大小，降序排列，CPH值越大，排名越靠前。')}<br />
                ${this.$t('基础分：满分35分，如果客服CPH值≥10个/H，则基础分为35分。如果客服CPH（工单）值＜10个/H，则基础分为0，同时，排名分为0；')}<br />
                ${this.$t('排名分：满分35分，排名分计算公式如下：')}<br />
                ${this.$t('1.排名百分位=（参与排名总人数-CPH排名+1）/参与排名总人数*100%')}<br />
                ${this.$t('2.排名分=满分35分*排名百分位；')}<br />
                ${this.$t('CHP总分=基础分+排名分；')}<br />
                <br />
                ${this.$t('FCR计算')}<br />
                ${this.$t('FCR值：工单一次性完结率，当前客服一次性完结工单数/当前客服已完结工单总数*100%')}<br />
                ${this.$t('其中，一次性完结工单指：同一客人，同一工单类型，一次邮件回复即完结的工单。')}<br />
                ${this.$t('FCR排名：根据FCR值大小，降序排列，FCR值越大，排名越靠前。')}<br />
                ${this.$t('基础分：满分5分，当前FCR值≥所有客服算术平均值的90%，则得5分。否则，得0分。')}<br />
                ${this.$t('排名分：满分5分，排名分计算公式如下：')}<br />
                ${this.$t('1.排名百分位=（参与排名总人数-FCR排名+1）/参与排名总人数*100%')}<br />
                ${this.$t('2.排名分=满分5分*排名百分位。')}<br />
                <br />
                ${this.$t('QA计算')}<br />
                ${this.$t('默认所有客服均得20分。')}<br />
                <br />
                ${this.$t('绩效总分=CPH总分+FCR总分+QA得分')}`,
      serviceTree: [],
      serviceList: [],
      getServiceList: []
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
      this.queryParam.serviceId = this.getServiceList
      return this.axios({
        url: '/crm/report/getPerformanceAppraisal',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        if (res.result?.total && res.result?.data && res.result.data.length > 0) {
          res.result.data.push({ ...res.result.total, ...{ realName: this.$t('合计'), userName: this.$t('合计') } })
        }
        return res.result
      })
    },
    reset () {
      this.queryParam.startTime = this.moment().subtract(1, 'months').format('YYYY-MM-DD')
      const month = this.moment().subtract(1, 'months').startOf('month')
      this.sessionTime = month
      this.queryParam = {}
      this.getServiceList = []
      this.serviceList = []
      this.$refs.table.refresh()
    },
    openMonthChange (status) {
      this.openMonth = status
      this.sessionTime = status
      this.queryParam.startTime = this.moment(status).format('YYYY-MM-DD')
    },
    handleExport () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'ExportCrmReportTask',
        parameter: {
          condition: {
            req: {
              serviceId: this.getServiceList,
              startTime: this.queryParam.startTime
            },
            type: 'appraisal'
          }
        }
      })
    }
  }
}
</script>
