<template>
  <a-card size="small">
    <div class="table-operator">
      <a-button v-action:add icon="plus" type="primary" @click="handleAdd">{{ $t('添加') }}</a-button>
      <a-button
        v-action:delete
        icon="delete"
        type="danger"
        :disabled="selectedRowKeys.length == 0"
        @click="handleDelete"
      >
        {{ $t('批量删除') }}
      </a-button>
      <a-button icon="filter" @click="handleSearch">{{ $t('搜索') }}</a-button>
      <a-button icon="sync" @click="handleReset">{{ $t('重置') }}</a-button>
    </div>
    <s-table
      ref="table"
      size="small"
      rowKey="id"
      :columns="columns"
      :data="loadDataTable"
      :rowSelection="rowSelection"
      :sorter="sorter"
    >
      <div slot="action" slot-scope="text, record">
        <a v-if="$auth('delete')" @click="handleDelete(record)">{{ $t('删除') }}</a>
        <span v-else style="color: gray">{{ $t('删除') }}</span>
      </div>
    </s-table>
    <a-drawer :title="config.title" :width="400" :visible="visible" @close="visible = !visible">
      <a-spin :spinning="loading">
        <a-form :form="form" layout="vertical">
          <a-form-item :label="$t('黑名单号码')">
            <a-input
              v-decorator="[
                'info[number]',
                {
                  initialValue: config.data.number,
                  rules: [{ required: config.action !== 'search', message: $t('请输入号码') }]
                }
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('备注')">
            <a-textarea
              v-decorator="[
                'info[remark]',
                {
                  initialValue: config.data.remark,
                  rules: [{ required: config.action !== 'search', message: $t('请输入备注') }]
                }
              ]"
              :autoSize="{ minRows: 5 }"
            />
          </a-form-item>
        </a-form>
        <div class="bbar">
          <a-button @click="handleSubmit(false)">{{ config.action === 'search' ? $t('重置') : $t('取消') }}</a-button>
          <a-button type="primary" @click="handleSubmit(true)">
            {{ config.action === 'search' ? $t('搜索') : $t('保存') }}
          </a-button>
        </div>
      </a-spin>
    </a-drawer>
  </a-card>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  data () {
    return {
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      config: {
        data: {}
      },
      // 搜索参数
      queryParam: {},
      // 表头
      columns: [{
        title: 'ID',
        dataIndex: 'id',
        sorter: true
      }, {
        title: this.$t('号码'),
        dataIndex: 'number',
        sorter: true
      }, {
        title: this.$t('录入人'),
        dataIndex: 'operator',
        sorter: true
      }, {
        title: this.$t('录入时间'),
        dataIndex: 'inputTime',
        sorter: true
      }, {
        title: this.$t('备注'),
        dataIndex: 'remark',
        sorter: true
      }, {
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 150,
        scopedSlots: { customRender: 'action' }
      }],
      selectedRowKeys: [],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys
        }
      },
      sorter: { field: 'id', order: 'descend' }
    }
  },
  methods: {
    // 加载表格数据
    loadDataTable (parameter) {
      return this.axios({
        url: '/admin/blacklist/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    // 刷新表格
    refresh () {
      this.$refs.table.refresh()
    },
    // 搜索
    handleSearch () {
      if (this.config.action !== 'search') {
        this.form.resetFields()
      }
      this.config = {
        action: 'search',
        title: this.$t('搜索'),
        data: {}
      }
      this.visible = true
    },
    // 重置
    handleReset () {
      this.queryParam = {}
      this.refresh()
    },
    // 添加
    handleAdd () {
      this.visible = true
      this.loading = true
      this.form.resetFields()
      this.config = {
        action: 'add',
        title: this.$t('添加'),
        url: '/admin/blacklist/add',
        data: {}
      }
      this.axios({
        url: this.config.url,
        data: {
          action: 'get'
        }
      }).then((res) => {
        this.loading = false
        this.config.data = res.result
      })
    },
    // 删除
    handleDelete (record) {
      const that = this
      const id = record && record.id || this.selectedRowKeys
      this.$confirm({
        title: record ? this.$t('您确认要删除该记录吗？') : this.$t('您确认要删除选中的记录吗？'),
        onOk () {
          that.axios({
            url: '/admin/blacklist/delete',
            data: { id: id }
          }).then(res => {
            that.$refs.table.refresh()
          })
        }
      })
    },
    // 搜索/保存数据
    handleSubmit (tag) {
      if (this.config.action === 'search') {
        if (tag) {
          // 搜索
          const { info } = this.form.getFieldsValue()
          this.queryParam = info
          this.refresh()
        } else {
          // 重置
          this.queryParam = {}
          this.refresh()
        }
        this.visible = false
      } else {
        if (tag) {
          this.form.validateFields((errors, values) => {
            if (!errors) {
              this.loading = true
              this.axios({
                url: this.config.url,
                data: Object.assign(values, { action: 'submit', id: this.config.data.id })
              }).then((res) => {
                this.visible = false
                this.loading = false
                this.refresh()
                if (res.code) {
                  this.$message.warning(res.message)
                } else {
                  this.$message.success(res.message)
                }
              })
            }
          })
        } else {
          this.visible = false
        }
      }
    }
  }
}
</script>
