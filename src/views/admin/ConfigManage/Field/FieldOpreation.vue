<template>
  <a-drawer
    :title="$t('从其他数据表中添加字段')"
    width="700"
    placement="right"
    :closable="false"
    :destroyOnClose="true"
    :visible="visible"
    @close="onClose"
  >
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item :wrapperCol="wrapperCol">
          <a-cascader
            style="width: 100%"
            :options="tableField"
            :show-search="{ filter }"
            :value="tableValue"
            :placeholder="$t('请选择源数据表')"
            @change="sourceChange"
          />
        </a-form-item>
        <a-form-item>
          <a-table
            :columns="columns"
            :dataSource="sourceFields"
            rowKey="id"
            size="small"
            :loading="sourceLoading"
            :pagination="false"
            :row-selection="{ selectedRows: selectedRows, onChange: onSelectChange }"
          ></a-table>
        </a-form-item>
      </a-form>
      <div class="bbar">
        <a-button type="primary" :disabled="checkdone" @click="handleSubmit">{{ $t('保存') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  name: 'FiledOpreation',
  i18n: window.lang('admin'),
  data () {
    return {
      visible: false,
      form: this.$form.createForm(this),
      fieldWidth: '',
      wrapperCol: { span: 24 },
      loading: false,
      tableField: [],
      checkdone: true,
      columns: [{
        title: this.$t('显示名称'),
        dataIndex: 'name'
      }, {
        title: this.$t('系统名称'),
        dataIndex: 'alias'
      }, {
        title: this.$t('UI组件'),
        dataIndex: 'formType'
      }, {
        title: this.$t('字段类型'),
        dataIndex: 'fieldType'
      }, {
        title: this.$t('字段长度'),
        dataIndex: 'fieldLength'
      }],
      sourceFields: [],
      sourceLoading: false,
      selectedRows: [],
      tableValue: []
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.form.resetFields()
      this.checkdone = true
      this.sourceFields = []
      this.tableValue = []
      this.selectedRows = []
      this.axios({
        url: this.config.url,
        data: Object.assign({ tableId: config.tableId ? config.tableId : 0, parentNumber: [], fieldId: config.record ? config.record.fieldId : 0 })
      }).then((res) => {
        this.tableField = res.result.tableField
      })
    },
    filter (inputValue, path) {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
    },
    onClose () {
      this.visible = false
    },
    sourceChange (value) {
      this.tableValue = value
      this.sourceLoading = true
      this.axios({
        url: '/admin/field/getSourceOptions',
        data: Object.assign({ sourceTableId: value[1], currentTableId: this.config.tableId, virtualField: 0 })
      }).then(res => {
        if (res.code === 0) {
          this.sourceFields = res.result.sourceFields
          this.sourceLoading = false
          this.checkdone = false
        }
      })
    },
    // 拿到某个数据表
    getField (e) {
      console.log('Selected', e)
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows
    },
    handleSubmit () {
      const fieldId = []
      for (const k in this.selectedRows) {
        fieldId.push(this.selectedRows[k].fieldId)
      }
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          this.loading = true
          this.axios({
            url: '/admin/field/addFromOther',
            data: { tableId: this.config.tableId, id: fieldId }
          }).then((res) => {
            this.$message.info({ content: res.message, duration: 8 })
            this.loading = false
            this.checkdone = true
            this.sourceFields = []
            this.tableValue = []
            this.visible = false
            this.$emit('ok')
          })
        }
      })
    }
  }
}
</script>
