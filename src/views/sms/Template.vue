<template>
  <div class="page">
    <a-form :form="form" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
      <a-card size="small" :title="$t('搜索')">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
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
        <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
          <a-col :span="6">
            <a-form-item :label="$t('模板名称')">
              <a-input v-model="queryParam.name" placeholder="" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('模板编号')">
              <a-input v-model="queryParam.number" placeholder="" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('模板内容')">
              <a-input v-model="queryParam.content" placeholder="" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <a-space>
      <a-button v-action:add icon="plus" type="primary" @click="handleAdd">{{ $t('添加') }}</a-button>
      <a-button
        v-action:delete
        icon="delete"
        type="danger"
        :disabled="selectedRowKeys.length == 0"
        @click="handleBulkDelete()"
      >
        {{ $t('批量删除') }}
      </a-button>
      <a-button v-action:import icon="upload" @click="handleImport">{{ $t('导入') }}</a-button>
      <a-button v-action:export icon="download" @click="handleExport">{{ $t('导出') }}</a-button>
    </a-space>
    <s-table
      ref="table"
      class="table-fill"
      :scroll="{ y: true }"
      size="small"
      rowKey="id"
      :columns="columns"
      :data="loadDataTable"
      :rowSelection="rowSelection"
      :sorter="{ field: 'id', order: 'descend' }"
    >
      <div slot="action" slot-scope="text, record">
        <a v-action:edit @click="handleEdit(record)">{{ $t('编辑') }}</a>
        <a-divider type="vertical" />
        <a v-action:delete @click="handleBulkDelete(record)">{{ $t('删除') }}</a>
      </div>
    </s-table>
    <template-form ref="settingForm" @ok="handleOk" />
    <general-export ref="generalExport" @ok="handleOk" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('sms'),
  components: {
    TemplateForm: () => import('./TemplateForm'),
    GeneralExport: () => import('@/views/admin/Table/GeneralExport')
  },
  data () {
    return {
      advanced: false,
      queryParam: {},
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 100,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: 'ID',
        dataIndex: 'id',
        width: 60,
        sorter: true
      }, {
        title: this.$t('模板名称'),
        dataIndex: 'name',
        sorter: true
      }, {
        title: this.$t('模板编号'),
        dataIndex: 'number',
        sorter: true
      }, {
        title: 'CODE1',
        dataIndex: 'code1',
        sorter: true
      }, {
        title: 'CODE2',
        dataIndex: 'code2',
        sorter: true
      }, {
        title: 'CODE3',
        dataIndex: 'code3',
        sorter: true
      }, {
        title: this.$t('最后修改人'),
        dataIndex: 'updateUser',
        sorter: true
      }, {
        title: this.$t('最后修改时间'),
        dataIndex: 'updateTime',
        sorter: true
      }, {
        title: this.$t('模板内容'),
        dataIndex: 'content',
        sorter: true
      }],
      selectedRowKeys: [],
      rowSelection: {
        onChange: (selectedRowKeys) => {
          this.selectedRowKeys = selectedRowKeys
        }
      },
      form: this.$form.createForm(this)
    }
  },
  methods: {
    loadDataTable (parameter) {
      return this.axios({
        url: '/sms/template/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    handleAdd () {
      this.$refs.settingForm.show({
        title: this.$t('添加'),
        url: '/sms/template/add'
      })
    },
    handleEdit (record) {
      this.$refs.settingForm.show({
        title: this.$t('编辑') + '：' + record.name,
        url: '/sms/template/edit',
        record: record
      })
    },
    handleBulkDelete (record) {
      const table = this.$refs.table
      const id = record ? record.id : this.selectedRowKeys
      const me = this
      this.$confirm({
        title: this.$t('您确认要删除该记录吗？'),
        onOk () {
          me.axios({
            url: '/sms/template/bulkDelete',
            data: Object.assign({ id: id })
          }).then(res => {
            table.refresh()
          })
        }
      })
    },
    handleExport () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'ExportSmsTemplateTask',
        parameter: {
          condition: this.queryParam
        }
      })
    },
    handleImport () {
      this.$refs.generalExport.show({
        title: this.$t('导入'),
        type: 'import',
        className: 'ImportSmsTemplateTask',
        filePath: 'static/template/短信模板导入模板.xlsx'
      })
    }
  }
}
</script>
