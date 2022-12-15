<template>
  <div class="page">
    <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" :colon="false" class="search">
      <a-card size="small" :title="$t('搜索')">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
          <a-button
            @click="
              () => {
                queryParam = { type: 'receive' }
                $refs.table.refresh(true)
              }
            "
          >
            {{ $t('重置') }}
          </a-button>
        </a-space>
        <a-row :gutter="16">
          <a-col v-bind="colLayout">
            <a-form-item :label="$t('状态')">
              <a-select v-model="queryParam.status" allowClear @change="handleOk">
                <a-select-option value="0">{{ $t('已发送') }}</a-select-option>
                <a-select-option value="1">{{ $t('发送中') }}</a-select-option>
                <a-select-option value="2">{{ $t('草稿') }}</a-select-option>
                <a-select-option value="3">{{ $t('定时发送') }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout">
            <a-form-item :label="$t('标题')">
              <a-input v-model="queryParam.title" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <a-space>
      <a-button v-action:add icon="plus" type="primary" @click="handleAdd">{{ $t('发送公告') }}</a-button>
    </a-space>
    <s-table
      ref="table"
      style="flex-grow: 1; margin: 8px"
      class="table-fill"
      size="small"
      rowKey="id"
      :scroll="{ y: true }"
      :columns="columns"
      :data="loadDataTable"
      :sorter="sorter"
    >
      <span slot="status" slot-scope="text">
        <span v-if="text === 0">{{ $t('已发送') }}</span>
        <span v-else-if="text === 1">{{ $t('发送中') }}</span>
        <span v-else-if="text === 2">{{ $t('草稿') }}</span>
        <span v-else-if="text === 3">{{ $t('定时发送') }}</span>
      </span>
      <div slot="action" slot-scope="text, record">
        <a v-if="[0, 1].includes(record.status)" @click="handleView(record)">{{ $t('详情') }}</a>
        <a v-else-if="[2].includes(record.status)" @click="handleEdit(record)">{{ $t('详情') }}</a>
        <a-divider v-if="[2].includes(record.status)" type="vertical" />
        <a v-if="[2].includes(record.status)" @click="handleDelete(record)">{{ $t('删除') }}</a>
        <a v-if="[3].includes(record.status)" @click="editTime(record)">{{ $t('修改时间') }}</a>
        <a-divider v-if="[3].includes(record.status)" type="vertical" />
        <a v-if="[3].includes(record.status)" @click="handleCancel(record)">{{ $t('取消') }}</a>
      </div>
      <span slot="readDetails" slot-scope="text, record">
        <span v-if="[0].includes(record.status)">
          <a @click="handleRead(record, 'read')">
            {{ $t('已读') }} {{ record.receiverRead ? record.receiverRead.split(',').length : 0 }}
          </a>
          <a-divider type="vertical" />
          <a @click="handleRead(record, 'unread')">{{ $t('未读') }} {{ record.unread.length }}</a>
        </span>
        <span v-else>--</span>
      </span>
    </s-table>
    <modal-form ref="modalForm" @ok="handleOk" />
    <view-form ref="viewForm" @ok="handleOk" />
    <read-details ref="readDetails" />
    <a-modal
      :title="$t('定时发送')"
      :visible="visible"
      :destroyOnClose="true"
      :confirmLoading="loading"
      centered
      @ok="timeUpdate"
      @cancel="visible = !visible"
    >
      <a-form :form="form">
        <a-form-item :label="$t('选择定时发送的时间')" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
          <a-date-picker
            v-decorator="['time', { initialValue: null, rules: [{ required: true, message: $t('请选择时间') }] }]"
            format="YYYY-MM-DD HH:mm:ss"
            style="width: 100%"
            :disabled-date="disabledDate"
            :disabled-time="disabledDateTime"
            :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
    modalForm: () => import('./InformForm'),
    viewForm: () => import('./InformView'),
    ReadDetails: () => import('./InformReadDetails')
  },
  data () {
    return {
      advanced: false,
      // 搜索参数
      queryParam: {},
      inputTime: null,
      form: this.$form.createForm(this),
      visible: false,
      loading: false,
      timeRecord: {},
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 120,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: 'ID',
        dataIndex: 'id',
        width: 60,
        sorter: true
      }, {
        title: this.$t('状态'),
        dataIndex: 'status',
        width: 80,
        sorter: true,
        scopedSlots: { customRender: 'status' }
      }, {
        title: this.$t('标题'),
        dataIndex: 'title',
        sorter: true
      }, {
        title: this.$t('阅读情况'),
        dataIndex: 'readDetails',
        width: 240,
        scopedSlots: { customRender: 'readDetails' }
      }, {
        title: this.$t('发送时间'),
        dataIndex: 'sendTime',
        width: 140,
        sorter: true
      }],
      colLayout: {},
      sorter: { field: 'id', order: 'descend' }
    }
  },
  created () {
    this.changeAdvanced(false)
  },
  methods: {
    loadDataTable (parameter) {
      return this.axios({
        url: '/base/Inform/init',
        data: Object.assign(parameter, this.queryParam, { type: 'sender' })
      }).then(res => {
        res.result.data.forEach(item => {
          if (item.receiverRead) {
            item.unread = item.receiver.split(',').filter(reItem => !item.receiverRead.split(',').includes(reItem))
          } else {
            item.unread = item.receiver ? item.receiver.split(',') : []
          }
        })
        return res.result
      })
    },
    handleAdd () {
      this.$refs.modalForm.show({
        action: 'add',
        title: this.$t('发送公告'),
        url: '/base/Inform/send'
      })
    },
    handleEdit (record) {
      this.$refs.modalForm.show({
        action: 'edit',
        title: this.$t('发送公告'),
        url: '/base/Inform/send',
        record: record
      })
    },
    handleView (record) {
      this.$refs.viewForm.show({
        title: this.$t('查看'),
        record: record,
        type: 'send'
      })
    },
    handleRead (record, type) {
      this.$refs.readDetails.show({
        record: record,
        type: type
      })
    },
    editTime (record) {
      this.visible = true
      this.timeRecord = record
    },
    timeUpdate () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          this.loading = true
          values.time = values.time.format('YYYY-MM-DD HH:mm:ss')
          this.axios({
            url: '/base/Inform/update',
            data: {
              sendTime: values.time,
              id: this.timeRecord.id
            }
          }).then(res => {
            this.loading = false
            if (res.code) {
              this.$message.error(res.message)
            } else {
              this.handleOk()
              this.$message.success(this.$t('操作成功'))
              this.visible = false
            }
          })
        }
      })
    },
    handleCancel (record) {
      const that = this
      this.$confirm({
        title: this.$t('取消后将变为草稿，确定取消？'),
        onOk () {
          that.axios({
            url: '/base/Inform/cancel',
            data: { id: record.id }
          }).then(res => {
            that.$refs.table.refresh()
          })
        }
      })
    },
    range (start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    disabledDate (current) {
      return current < this.moment().subtract(1, 'day')// 今天之前的年月日不可选，不包括今天
    },
    disabledDateTime (current) {
      return {
        disabledHours: () => this.range(0, 24).splice(0, new Date().getHours()), // ban小时
        disabledMinutes: () => this.moment(current).hour() <= new Date().getHours() ? this.range(0, new Date().getMinutes()) : [], // ban分
        disabledSeconds: () => this.moment(current).hour() <= new Date().getHours() && this.moment(current).minutes() <= new Date().getMinutes() ? this.range(0, new Date().getSeconds()) : []
      }
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    handleDelete (record) {
      const that = this
      const id = record && record.id
      this.$confirm({
        title: this.$t('确定删除这条公告吗？'),
        onOk () {
          that.axios({
            url: '/base/Inform/delete',
            data: {
              id: id,
              sender: record.sender
            }
          }).then(res => {
            that.$refs.table.refresh()
          })
        }
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
