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
                searchTime = []
                queryParam = {
                  qualityBeginTime: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
                  qualityEndTime: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
                }
                searchTime = [moment().startOf('month'), moment().endOf('month')]
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
            <a-form-item :label="$t('质检员')">
              <a-select v-model.trim="queryParam.qualityUser" :allowClear="true" show-search>
                <a-select-option v-for="item in userList" :key="item.id" :value="item.name">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('坐席姓名')">
              <a-select v-model.trim="queryParam.agentRealName" :allowClear="true" show-search>
                <a-select-option v-for="item in userList" :key="item.id" :value="item.name">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('主叫号码')">
              <a-input v-model.trim="queryParam.src" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('被叫号码')">
              <a-input v-model.trim="queryParam.dst" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('质检时间')">
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
          <a-col v-if="roc" :span="6">
            <a-form-item :label="$t('是否复议')">
              <a-select v-model.trim="queryParam.isReconsider" :allowClear="true" show-search>
                <a-select-option v-for="(item, key) in reconside" :key="key" :value="item.value">
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
      size="small"
      rowKey="id"
      :columns="columns"
      :data="loadDataTable"
      class="table-fill"
      :sorter="{ field: 'id', order: 'descend' }"
      :scroll="{ y: true }"
    >
      <div slot="action" slot-scope="text, record">
        <a-space>
          <a @click="handleDetail(record)">{{ $t('查看') }}</a>
          <a
            v-if="roc"
            :style="record.reconsiderStatus === '未复议' ? '' : { opacity: 0.2, cursor: 'default' }"
            @click="record.reconsiderStatus === '未复议' ? handleConside(record) : 'return false'"
          >
            {{ $t('申请复议') }}
          </a>
        </a-space>
      </div>
    </s-table>
    <general-export ref="generalExport" />
    <record-form ref="recordForm" />
    <apply-reconside ref="applyReconside" @ok="$refs.table.refresh(true)" />
  </div>
</template>
<script>
export default {
  components: {
    GeneralExport: () => import('@/views/admin/Table/GeneralExport'),
    RecordForm: () => import('./RecordForm'),
    ApplyReconside: () => import('./ApplyReconside')
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    exportType: {
      type: String,
      default: ''
    },
    roc: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      advanced: false,
      searchTime: [this.moment().startOf('month'), this.moment().endOf('month')],
      userList: [],
      // 搜索参数
      parameter: {
        pageNo: 1,
        pageSize: 20,
        sortField: 'id',
        sortOrder: 'descend'
      },
      queryParam: {
        qualityBeginTime: this.moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
        qualityEndTime: this.moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
      },
      reconside: [{
        value: 1,
        name: '是'
      }, {
        value: 0,
        name: '否'
      }],
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 120,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: this.$t('ID'),
        dataIndex: 'id',
        width: 60,
        sorter: true
      }, {
        title: this.$t('质检时间'),
        dataIndex: 'qualityTime',
        width: 150,
        sorter: true
      }, {
        title: this.$t('坐席姓名'),
        dataIndex: 'agentRealName',
        sorter: true
      }, {
        title: this.$t('主叫号码'),
        dataIndex: 'source',
        sorter: true
      }, {
        title: this.$t('被叫号码'),
        dataIndex: 'destination',
        sorter: true
      }, {
        title: this.$t('呼叫时间'),
        dataIndex: 'callTime',
        width: 150,
        sorter: true
      }, {
        title: this.$t('通话时长'),
        dataIndex: 'billsec',
        sorter: true
      }, {
        title: this.$t('质检员'),
        dataIndex: 'qualityUser',
        sorter: true
      }, {
        title: this.$t('质检结果'),
        dataIndex: 'qualityResult',
        sorter: true
      }, {
        title: this.$t('质检得分'),
        dataIndex: 'qualityScore',
        sorter: true
      }, {
        title: this.$t('质检评语'),
        dataIndex: 'qualityComment',
        sorter: true
      }, {
        title: this.$t('复议前得分'),
        dataIndex: 'reconsiderScore',
        sorter: true
      }, {
        title: this.$t('复议状态'),
        dataIndex: 'reconsiderStatus',
        sorter: true
      }]
    }
  },
  mounted () {
    this.getUserName()
  },
  methods: {
    // 页面数据渲染
    loadDataTable (parameter) {
      this.parameter = parameter
      return this.axios({
        url: this.url,
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    // 获取质检员、坐席信息
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
      this.queryParam.qualityBeginTime = dateString[0]
      this.queryParam.qualityEndTime = dateString[1]
    },
    // 查看明细
    handleDetail (record) {
      let data = record
      if (this.exportType === 'ExportCheckedRecording') {
        data = Object.assign(record, { tabsShow: true })
      }
      this.$refs.recordForm.show({
        data,
        title: this.$t('查看明细'),
        action: 'query'
      })
    },
    // 申请复议
    handleConside (record) {
      this.$refs.applyReconside.show({
        data: record,
        title: this.$t('申请复议')
      })
    },
    // 导出
    handleExport () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: this.exportType,
        setMenuName: true,
        parameter: {
          condition: Object.assign(this.parameter, this.queryParam)
        }
      })
    }
  }
}
</script>
