<template>
  <div class="page">
    <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
      <a-card :title="$t('搜索')" size="small">
        <a-space slot="extra">
          <a-button
            htmlType="submit"
            type="primary"
            @click="$refs.table.refresh(true)"
            @keydown.enter="$refs.table.refresh(true)"
          >
            {{ $t('搜索') }}
          </a-button>
          <a-button
            @click="
              () => {
                searchTime = [moment().startOf('month'), moment().endOf('month')]
                queryParam = {
                  reconsiderApplyBeginTime: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
                  reconsiderApplyEndTime: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
                }
                $refs.table.refresh(true)
              }
            "
          >
            {{ $t('重置') }}
          </a-button>
          <a-button :icon="advanced ? 'up' : 'down'" style="font-size: 11px" @click="advanced = !advanced"></a-button>
        </a-space>
        <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
          <a-col :span="6">
            <a-form-item :label="$t('坐席真实姓名')">
              <a-select v-model.trim="queryParam.agentRealName" :allowClear="true" show-search>
                <a-select-option v-for="item in userList" :key="item.id" :value="item.name">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('质检员')">
              <a-select v-model.trim="queryParam.qualityUser" :allowClear="true" show-search>
                <a-select-option v-for="item in userList" :key="item.id" :value="item.name">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('复议时间')">
              <a-range-picker
                v-model="searchTime"
                :allowClear="false"
                :ranges="{
                  [$t('昨天')]: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
                  [$t('今天')]: [moment().startOf('day'), moment().endOf('day')],
                  [$t('本周')]: [moment().startOf('day').startOf('week'), moment().endOf('week')],
                  [$t('最近七天')]: [moment().startOf('day').subtract(7, 'days'), moment().endOf('day')],
                  [$t('本月')]: [moment().startOf('month'), moment().endOf('month')],
                  [$t('最近31天')]: [moment().startOf('day').subtract(31, 'days'), moment().endOf('day')]
                }"
                format="YYYY-MM-DD HH:mm:ss"
                :showTime="{ defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')] }"
                style="width: 100%"
                @change="getInputTime"
              />
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
      size="small"
      rowKey="id"
      :columns="columns"
      :data="loadDataTable"
      class="table-fill"
      :sorter="{ field: 'id', order: 'descend' }"
    >
      <div slot="action" slot-scope="text, record">
        <a @click="handleReview(record)">{{ $t('审核') }}</a>
      </div>
    </s-table>
    <general-export ref="generalExport" />
    <record-form ref="recordForm" @ok="$refs.table.refresh(true)" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
    GeneralExport: () => import('@/views/admin/Table/GeneralExport'),
    RecordForm: () => import('./RecordForm')
  },
  data () {
    return {
      advanced: false,
      loading: false,
      details: false,
      searchTime: [this.moment().startOf('month'), this.moment().endOf('month')],
      userList: [],
      readonly: true,
      recording: {},
      listscore: [],
      // 搜索参数
      queryParam: {
        quality_agent: undefined,
        agent: undefined,
        reconsiderApplyBeginTime: this.moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
        reconsiderApplyEndTime: this.moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
      },
      config: {
        data: {}
      },
      showingveto: {},

      visiblescore: false,
      form: this.$form.createForm(this),
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 60,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: this.$t('ID'),
        dataIndex: 'id',
        width: 70,
        sorter: true
      }, {
        title: this.$t('申请复议时间'),
        dataIndex: 'reconsiderApplyTime',
        width: 60,
        sorter: true
      }, {
        title: this.$t('坐席真实姓名'),
        dataIndex: 'agentRealName',
        width: 60,
        sorter: true
      }, {
        title: this.$t('质检得分'),
        dataIndex: 'qualityScore',
        width: 60,
        sorter: true
      }, {
        title: this.$t('申请复议理由'),
        dataIndex: 'remark',
        width: 120
      }
      ]
    }
  },
  created () {
    this.changeAdvanced(false)
  },
  mounted () {
    this.getUserName()
  },
  methods: {
    // 页面数据渲染
    loadDataTable (parameter) {
      this.parameter = parameter
      return this.axios({
        url: '/quality/pendingReview/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    // 获取申请坐席、质检员信息
    getUserName () {
      return this.axios({
        url: '/quality/data/getUserArr'
      }).then(res => {
        const obj = res.result
        for (const key in obj) {
          this.userList.push({
            id: key,
            name: obj[key]
          })
        }
      })
    },
    // 选择时间
    getInputTime (date, dateString) {
      this.queryParam.reconsiderApplyBeginTime = dateString[0]
      this.queryParam.reconsiderApplyEndTime = dateString[1]
    },
    // 导出
    handleExport () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'ExportPendingReviewRecording',
        setMenuName: true,
        parameter: {
          condition: Object.assign(this.parameter, this.queryParam)
        }
      })
    },
    // 审核
    handleReview (record) {
      this.$refs.recordForm.show({
        data: Object.assign(record, { tabsShow: true }),
        title: this.$t('审核'),
        action: 'review'
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
    }
  }
}
</script>
