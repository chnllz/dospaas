<template>
  <div class="page">
    <a-form :form="form" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
      <a-card size="small" :title="$t('搜索')">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
          <a-button @click="reset">{{ $t('重置') }}</a-button>
          <a-button :icon="advanced ? 'up' : 'down'" style="font-size: 11px" @click="advanced = !advanced"></a-button>
        </a-space>
        <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
          <a-col :span="6">
            <a-form-item :label="$t('手机号码')">
              <a-input v-model="queryParam.phone" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('发送状态')">
              <a-select v-model="queryParam.sendStatus" allow-clear>
                <a-select-option v-for="value in sendStatus" :key="value.value" :value="value.value">
                  {{ value.type }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('发送时间')">
              <a-range-picker
                v-model="showTime"
                :ranges="{
                  [$t('今天')]: [moment().startOf('day'), moment().endOf('day')],
                  [$t('昨天')]: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
                  [$t('本周')]: [moment().startOf('week'), moment().endOf('week')],
                  [$t('本月')]: [moment().startOf('month'), moment().endOf('month')]
                }"
                :show-time="{ format: 'HH:mm:ss' }"
                format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
                @change="onSendTime"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('发送内容')">
              <a-input v-model="queryParam.sendContent" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('发送模板')">
              <a-select v-model="queryParam.template" allowClear>
                <a-select-option v-for="value in template" :key="value.value" :value="value.value">
                  {{ value.display }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('回复时间')">
              <a-range-picker
                v-model="replyShowTime"
                :ranges="{
                  [$t('今天')]: [moment().startOf('day'), moment().endOf('day')],
                  [$t('昨天')]: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
                  [$t('本周')]: [moment().startOf('week'), moment().endOf('week')],
                  [$t('本月')]: [moment().startOf('month'), moment().endOf('month')]
                }"
                :show-time="{ format: 'HH:mm:ss' }"
                format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
                @change="onReplyTime"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('回复内容')">
              <a-input v-model="queryParam.replyContent" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('发送人')">
              <a-input v-model="queryParam.sendUser" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <a-space>
      <a-button v-action:send icon="plus" type="primary" @click="handleAdd">{{ $t('发送') }}</a-button>
      <a-button v-action:export icon="download" @click="handleExport">{{ $t('导出') }}</a-button>
      <a-button
        v-action:delete
        icon="delete"
        type="danger"
        :disabled="selectedRowKeys.length == 0"
        @click="handleDelete"
      >
        {{ $t('批量删除') }}
      </a-button>
    </a-space>
    <s-table
      ref="table"
      class="table-fill"
      :scroll="{ y: true }"
      size="small"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :rowSelection="rowSelection"
      :sorter="sorter"
    >
      <span slot="sendStatus" slot-scope="text">
        <a-badge v-if="text == '1'" status="success" :text="$t('发送成功')" />
        <a-badge v-else-if="text == '-1'" status="error" :text="$t('发送失败')" />
        <a-badge v-else status="processing" :text="$t('待发送')" />
      </span>
      <span slot="receiveStatus" slot-scope="text">
        <a-badge v-if="text == '1'" status="success" :text="$t('成功')" />
        <a-badge v-else-if="text == '-1'" status="error" :text="$t('失败')" />
        <a-badge v-else status="processing" :text="$t('未知')" />
      </span>
      <div slot="action" slot-scope="text, record">
        <a v-action:template_edit @click="handleDelete(record)">{{ $t('删除') }}</a>
      </div>
    </s-table>
    <send-form ref="sendForm" @ok="handleOk" />
    <general-export ref="generalExport" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('sms'),
  components: {
    SendForm: () => import('./SendForm'),
    GeneralExport: () => import('@/views/admin/Table/GeneralExport')
  },
  data () {
    return {
      advanced: false,
      sendStatus: [{
        value: '0',
        type: this.$t('待发送')
      }, {
        value: '1',
        type: this.$t('发送成功')
      }, {
        value: '-1',
        type: this.$t('发送失败')
      }],
      template: [],
      // 搜索参数
      queryParam: {
        sendTime: [this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')]
      },
      showTime: [this.moment().startOf('day'), this.moment().endOf('day')],
      replyShowTime: [],
      form: this.$form.createForm(this),
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 80,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: 'ID',
        dataIndex: 'id',
        width: 60
      }, {
        title: this.$t('手机号码'),
        dataIndex: 'number',
        width: 100
      }, {
        title: this.$t('发送时间'),
        dataIndex: 'sendTime',
        width: 140
      }, {
        title: this.$t('发送内容'),
        dataIndex: 'sendContent',
        ellipsis: false,
        width: 300
      }, {
        title: this.$t('计费条数'),
        dataIndex: 'count',
        width: 80
      }, {
        title: this.$t('发送状态'),
        dataIndex: 'sendStatus',
        width: 100,
        scopedSlots: { customRender: 'sendStatus' }
      }, {
        title: this.$t('接收状态'),
        dataIndex: 'receiveStatus',
        width: 100,
        scopedSlots: { customRender: 'receiveStatus' }
      }, {
        title: this.$t('回复时间'),
        dataIndex: 'replyTime',
        width: 140,
        customRender: (text, record) => {
          return text || '--'
        }
      }, {
        title: this.$t('回复内容'),
        dataIndex: 'replyContent',
        width: 150,
        customRender: (text, record) => {
          return text || '--'
        }
      }, {
        title: this.$t('发送人'),
        dataIndex: 'sendUser',
        width: 120
      }],
      selectedRowKeys: [],
      rowSelection: {
        onChange: (selectedRowKeys) => {
          this.selectedRowKeys = selectedRowKeys
        }
      },
      colLayout: {},
      sorter: { field: 'id', order: 'descend' }
    }
  },
  created () {
    this.getTemplate()
  },
  methods: {
    getTemplate () {
      this.axios({
        url: '/sms/template/getTemplate'
      }).then((res) => {
        this.template = res.result.data
      })
    },
    loadData (parameter) {
      return this.axios({
        url: '/sms/send/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    handleAdd () {
      this.$refs.sendForm.show({
        action: 'add',
        title: this.$t('发送'),
        url: '/sms/template/getTemplate'
      })
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    onSendTime (date, dateString) {
      this.showTime = date
      this.queryParam.sendTime = dateString
    },
    reset () {
      this.queryParam = {}
      this.queryParam.sendTime = [this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')]
      this.showTime = [this.moment().startOf('day'), this.moment().endOf('day')]
      this.$refs.table.refresh()
    },
    onReplyTime (date, dateString) {
      this.replyShowTime = date
      this.queryParam.replyTime = dateString
    },
    handleDelete (record) {
      const table = this.$refs.table
      const id = record && record.id || this.selectedRowKeys
      const that = this
      this.$confirm({
        title: this.$t('您确认要删除该记录吗？'),
        onOk () {
          that.axios({
            url: '/sms/send/bulkDelete',
            data: { id: id }
          }).then(res => {
            table.refresh()
          })
        }
      })
    },
    handleExport () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'ExportSmsSendTask',
        parameter: {
          condition: this.queryParam
        }
      })
    }
  }
}
</script>
