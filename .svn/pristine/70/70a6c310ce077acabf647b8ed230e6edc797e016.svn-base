<template>
  <a-modal
    :title="config.title"
    :width="600"
    :visible="visible"
    centered
    :destroyOnClose="true"
    @cancel="visible = !visible"
  >
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item :label="$t('分类名称')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="[
              'name',
              { rules: [{ required: true, message: $t('请输入分类名称') }], initialValue: data.name }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-spin>
    <div slot="footer">
      <a-button type="primary" @click="handleSave">{{ $t('保存') }}</a-button>
      <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
    </div>
  </a-modal>
</template>
<script>
export default {
  i18n: window.lang('chat'),
  data () {
    return {
      config: {},
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      data: {}
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.data = config.record
    },
    handleSave () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          this.loading = true
          this.axios({
            url: this.config.url,
            data: Object.assign(values, {
              parentId: this.config.record.id,
              robotId: this.config.record.robotId
            })
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
