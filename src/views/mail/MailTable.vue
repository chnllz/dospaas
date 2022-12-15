<template>
  <div class="page">
    <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
      <a-card size="small" :title="$t('搜索')">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
          <a-button @click="refresh">{{ $t('重置') }}</a-button>
          <a-button
            v-if="['in', 'out'].includes($route.query.type)"
            :icon="advanced ? 'up' : 'down'"
            style="font-size: 11px"
            @click="advanced = !advanced"
          ></a-button>
        </a-space>
        <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
          <a-col :span="6">
            <a-form-item :label="$t('状态')">
              <a-select v-model="queryParam.isread" :allowClear="true">
                <a-select-option v-for="(item, index) in ztData" :key="index" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('主题')">
              <a-input v-model="queryParam.title" placeholder="" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('收件人')">
              <a-input v-model="queryParam.senderTo" placeholder="" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('发件人')">
              <a-input v-model="queryParam.sender" placeholder="" />
            </a-form-item>
          </a-col>
          <a-col v-if="['in'].includes($route.query.type)" :span="6">
            <a-form-item :label="$t('收件时间')">
              <a-range-picker
                v-model="startTime"
                :ranges="{
                  [$t('今天')]: [moment().startOf('day'), moment().endOf('day')],
                  [$t('昨天')]: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
                  [$t('本周')]: [moment().startOf('week'), moment().endOf('week')],
                  [$t('本月')]: [moment().startOf('month'), moment().endOf('month')]
                }"
                :showTime="{ defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')] }"
                format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
                @change="getTime"
              />
            </a-form-item>
          </a-col>
          <a-col v-if="['out'].includes($route.query.type)" :span="6">
            <a-form-item :label="$t('发送时间')">
              <a-range-picker
                v-model="startTime"
                :ranges="{
                  [$t('今天')]: [moment().startOf('day'), moment().endOf('day')],
                  [$t('昨天')]: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
                  [$t('本周')]: [moment().startOf('week'), moment().endOf('week')],
                  [$t('本月')]: [moment().startOf('month'), moment().endOf('month')]
                }"
                :showTime="{ defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')] }"
                format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
                @change="getTime"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <a-space>
      <a-button v-if="['in', 'out'].includes($route.query.type)" type="primary" @click="createMail">
        {{ $t('写邮件') }}
      </a-button>
      <a-button v-if="['in', 'out'].includes($route.query.type)" @click="bulkMail">{{ $t('批量发送') }}</a-button>
      <a-button
        v-if="$route.query.type !== 'deleted'"
        icon="delete"
        type="danger"
        :disabled="selectedRowKeys.length == 0"
        @click="handleDelete"
      >
        {{ $t('批量删除') }}
      </a-button>
      <a-button
        v-if="$route.query.type === 'deleted'"
        icon="delete"
        type="danger"
        :disabled="selectedRowKeysDel.length == 0"
        @click="handleDeleteForever"
      >
        {{ $t('彻底删除') }}
      </a-button>
    </a-space>
    <s-table
      ref="table"
      class="table-fill"
      size="small"
      rowKey="id"
      :columns="columns"
      :data="loadDataTable"
      :scroll="{ y: true }"
      :rowSelection="$route.query.type === 'deleted' ? rowSelectionDel : rowSelection"
      :sorter="sorter"
    >
      <span slot="zt" slot-scope="text, record">
        <template v-if="['in', 'out'].includes($route.query.type)">
          <a-badge v-if="record.isread == 1" status="default" />
          <a-badge v-else status="processing" />
        </template>
        {{ text }}
      </span>
      <div slot="action" slot-scope="text, record">
        <a @click="handleDetail(record)">{{ $t('详情') }}</a>
      </div>
    </s-table>
    <mail-view ref="MailView" @ok="$refs.table.refresh()" />
    <mail-info ref="MailInfo" @ok="$refs.table.refresh()" />
    <bulk-mail-send ref="BulkMailSend" @ok="$refs.table.refresh()" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('mail'),
  components: {
    MailView: () => import('./MailView'),
    MailInfo: () => import('./MailInfo'),
    BulkMailSend: () => import('./BulkMailSend')
  },
  data () {
    return {
      startTime: null,
      showIndex: 0,
      mailForm: {
        textContent: ''
      },
      labelColModal: { span: 4 },
      wrapperColModal: { span: 20 },
      loading: false,
      visible: false,
      advanced: false,
      ztData: [
        { value: 0, label: this.$t('未读') },
        { value: 1, label: this.$t('已读') }
      ],
      queryParam: {},
      showTime: [this.moment('00:00:00', 'HH:mm:ss'), this.moment('23:59:59', 'HH:mm:ss')],
      selectedRowKeys: [],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys
        }
      },
      selectedRowKeysDel: [],
      rowSelectionDel: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeysDel = selectedRowKeys
        }
      },
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 80,
        scopedSlots: { customRender: 'action' }
      }, {
        title: 'ID',
        dataIndex: 'id',
        width: 80,
        sorter: true
      }, {
        title: this.$t('主题'),
        dataIndex: 'title',
        scopedSlots: { customRender: 'zt' },
        sorter: true
      }, {
        title: this.$t('收件人'),
        dataIndex: 'senderTo'
      }, {
        title: this.$t('发件人'),
        dataIndex: 'sender'
      }, {
        title: this.$t('发送时间'),
        dataIndex: 'sendTime',
        width: 200,
        sorter: true
      }],
      sorter: { field: 'id', order: 'descend' }
    }
  },
  created () {
    if (this.$route.query.type === 'in') {
      this.columns.splice(5, 0, {
        title: this.$t('收件时间'),
        dataIndex: 'inputTime',
        width: 200,
        sorter: true
      })
    }
  },
  methods: {
    getTime (date, dateString) {
      const str = this.$route.query.type === 'in' ? 'inputTime' : 'sendTime'
      this.queryParam[str] = date.length ? dateString : undefined
    },
    createMail () {
      this.$refs.MailView.show({
        headTitle: this.$t('写邮件'),
        action: 'create',
        data: {},
        type: this.$route.query.type,
        isOnlyMail: true // true-纯邮件功能，不用解析变量  false 工单关联邮件功能， 需要解析变量
      })
    },
    bulkMail () {
      this.$refs.BulkMailSend.show({})
    },
    loadDataTable (parameter) {
      const pathParam = this.$route.query.type
      // in为收件箱， out为发件箱， draft为草稿箱
      this.queryParam.tab = pathParam
      return this.axios({
        url: '/mail/data/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    // 批量删除
    handleDelete () {
      const that = this
      this.$confirm({
        title: this.$t('您确认要删除选中的记录吗？'),
        onOk () {
          that.axios({
            url: '/mail/data/del',
            data: { id: that.selectedRowKeys }
          }).then(res => {
            if (res.code === 0) {
              that.$message.success(that.$t('操作成功'))
              that.$refs.table.refresh(true)
            }
          })
        }
      })
    },
    // 彻底删除
    handleDeleteForever () {
      const that = this
      this.$confirm({
        title: this.$t('您确认要彻底删除选中的记录吗？'),
        onOk () {
          that.axios({
            url: '/mail/data/completelyDelete',
            data: { id: that.selectedRowKeysDel }
          }).then(res => {
            if (res.code === 0) {
              that.$message.success(that.$t('操作成功'))
              that.$refs.table.refresh(true)
            }
          })
        }
      })
    },
    handleDetail (record) {
      const type = this.$route.query.type
      // type: in-收件箱 out-发件箱  deleted-已删除邮件
      if (type === 'in' || type === 'out' || type === 'deleted') {
        this.$refs.MailInfo.show({
          data: record,
          title: this.$t('详情'),
          type: this.$route.query.type
        })
      } else {
        this.$refs.MailView.show({
          headTitle: this.$t('详情'),
          action: 'draft_mail',
          type: this.$route.query.type,
          data: record,
          isOnlyMail: true // true-纯邮件功能，不用解析变量  false 工单关联邮件功能， 需要解析变量
        })
      }
    },
    // 刷新表格
    refresh () {
      this.queryParam = {}
      this.$refs.table.refresh()
    },
    onChange2 (dates, dateStrings) {
      this.showTime = dates
      this.queryParam.startTime = dateStrings[0]
      this.queryParam.endTime = dateStrings[1]
    }
  }
}
</script>
