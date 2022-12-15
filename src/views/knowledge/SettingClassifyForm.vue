<template>
  <a-modal
    :title="config.title"
    :width="640"
    :visible="visible"
    centered
    :destroyOnClose="true"
    @cancel="visible = !visible"
  >
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item :label="$t('上级分类')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-cascader
            v-decorator="['info[parentId]', { initialValue: data.parentId }]"
            changeOnSelect
            :fieldNames="{ label: 'categoryName', value: 'id', children: 'children' }"
            :options="options"
            :showSearch="true"
            :placeholder="$t('作为一级分类')"
          />
        </a-form-item>
        <a-form-item :label="$t('分类名称')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="[
              'info[categoryName]',
              { rules: [{ required: true, message: '请输入分类名称' }], initialValue: data.categoryName }
            ]"
          />
        </a-form-item>
        <a-form-item :label="$t('备注')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea
            v-decorator="['info[remarks]', { initialValue: data.remarks }]"
            :autoSize="{ minRows: 2, maxRows: 6 }"
          />
        </a-form-item>
      </a-form>
    </a-spin>
    <div slot="footer">
      <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
      <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
    </div>
  </a-modal>
</template>
<script>
export default {
  data () {
    return {
      config: {},
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      options: [],
      data: {}
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.loading = true
      this.config = config
      this.data = []
      this.axios({
        url: this.config.url,
        data: { id: config.record.id ? config.record.id : 0, action: 'get' }
      }).then((res) => {
        this.loading = false
        this.form.resetFields()
        this.options = res.result.option
        if (this.config.record.id) {
          // 列表操作  新增/编辑
          if (this.config.edit) {
            this.data = res.result.data
          } else {
            this.data.parentId = res.result.data.parentId
          }
        }
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        // 编辑父类时,可以不填父类的父类选项
        if (this.config.edit && !this.data.parentId.length) {
          values.info.parentId = [0]
        }
        if (!errors) {
          this.loading = true
          if (!values.info.parentId || values.info.parentId.length === 0) {
            // 顶部添加按钮 添加一级分类 默认传[0]
            values.info.parentId = [0]
          }
          this.axios({
            url: this.config.url,
            data: Object.assign(values, { id: this.config.edit ? this.data.id : 0, action: 'submit' })
          }).then((res) => {
            this.visible = false
            this.loading = false
            this.$emit('ok', values)
            if (res.code) {
              this.$message.warning(res.message)
            } else {
              this.$message.success(res.message)
              this.form.resetFields()
            }
          })
        }
      })
    }
  }
}
</script>
