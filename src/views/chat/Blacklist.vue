<template>
  <div class="page">
    <a-form class="search" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
      <a-row class="form normal">
        <a-col :span="6">
          <a-form-item :label="$t('访客名称')">
            <a-input v-model="queryParam.visitorName" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item :label="$t('状态')">
            <a-select v-model="queryParam.status" :allowClear="true">
              <a-select-option value="1">{{ $t('待审核') }}</a-select-option>
              <a-select-option value="2">{{ $t('已生效') }}</a-select-option>
              <a-select-option value="3">{{ $t('已失效') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-space style="margin-left: 8px; margin-top: -2px">
          <a-button htmlType="submit" type="primary" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
          <a-button
            @click="
              () => {
                queryParam = {}
                $refs.table.refresh(true)
              }
            "
          >
            {{ $t('重置') }}
          </a-button>
        </a-space>
      </a-row>
    </a-form>
    <s-table
      ref="table"
      size="small"
      class="table-fill"
      :scroll="{ y: true }"
      rowKey="id"
      :columns="columns"
      :data="loadDataTable"
      :sorter="{ field: 'id', order: 'descend' }"
    >
      <div slot="action" slot-scope="text, record">
        <a @click="handleRecord(record)">{{ $t('会话记录') }}</a>
        <a-divider type="vertical" />
        <a @click="handleCheck(record)">{{ $t('审核') }}</a>
        <a-divider type="vertical" />
        <a @click="handleDelete(record)">{{ $t('删除') }}</a>
      </div>
      <div slot="status" slot-scope="record">
        <template v-if="record == 1">
          <a-badge status="processing" />
          {{ $t('待审核') }}
        </template>
        <template v-else-if="record == 2">
          <a-badge status="success" />
          {{ $t('已生效') }}
        </template>
        <template v-else>
          <a-badge status="default" />
          {{ $t('已失效') }}
        </template>
      </div>
      <div slot="startTime" slot-scope="record">
        <span>{{ record ? moment(record).format('YYYY-MM-DD') : '' }}</span>
      </div>
      <div slot="endTime" slot-scope="record">
        <span>{{ record ? moment(record).format('YYYY-MM-DD') : '' }}</span>
      </div>
    </s-table>
    <blacklist-check ref="blacklistCheck" @ok="handleOk"></blacklist-check>
    <conversationRecord ref="conversationRecord" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('chat'),
  components: {
    BlacklistCheck: () => import('./BlacklistCheck'),
    ConversationRecord: () => import('./ConversationRecord')
  },
  data () {
    return {
      queryParam: {},
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        align: 'center',
        width: 170,
        scopedSlots: { customRender: 'action' }
      }, {
        title: this.$t('ID'),
        dataIndex: 'id',
        sorter: true,
        width: 70
      }, {
        title: this.$t('访客ID'),
        dataIndex: 'visitorId',
        sorter: true
      }, {
        title: this.$t('访客名称'),
        dataIndex: 'visitorName',
        sorter: true
      }, {
        title: this.$t('状态'),
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' },
        sorter: false
      }, {
        title: this.$t('创建人'),
        dataIndex: 'inputUser',
        sorter: true
      }, {
        title: this.$t('创建时间'),
        dataIndex: 'inputTime'
      }, {
        title: this.$t('备注'),
        dataIndex: 'remarks'
      }, {
        title: this.$t('审核人'),
        dataIndex: 'checkUser',
        sorter: true
      }, {
        title: this.$t('生效时间'),
        dataIndex: 'startTime',
        scopedSlots: { customRender: 'startTime' },
        sorter: true
      }, {
        title: this.$t('失效时间'),
        dataIndex: 'endTime',
        scopedSlots: { customRender: 'endTime' },
        sorter: true
      }]
    }
  },
  methods: {
    loadDataTable (parameter) {
      const params = Object.assign(parameter, this.queryParam)
      return this.axios({
        url: '/chat/blacklist/init',
        data: params
      }).then(res => {
        return res.result
      })
    },
    handleRecord (record) {
      this.$refs.conversationRecord.show({
        title: this.$t('会话记录'),
        url: '/chat/stats/record',
        record: record
      })
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    handleCheck (record) {
      this.$refs.blacklistCheck.show({
        title: this.$t('审核：') + record.visitorName,
        url: '/chat/blacklist/edit',
        record: record
      })
    },
    handleDelete (record) {
      const that = this
      const table = this.$refs.table
      this.$confirm({
        title: record ? this.$t('您确认要删除该记录吗？') : this.$t('您确认要删除选中的记录吗？'),
        onOk () {
          that.axios({
            url: '/chat/blacklist/delete',
            data: { id: record.id }
          }).then(res => {
            if (res.code === 0) {
              that.$message.success(res.message)
            } else {
              that.$message.error(res.message)
            }
            table.refresh()
          })
        }
      })
    }
  }
}
</script>
