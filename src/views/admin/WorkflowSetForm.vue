<template>
  <a-drawer :title="config.title" :width="600" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item :label="$t('原因名称')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="[
              'name',
              { rules: [{ required: true, message: $t('请输入按钮名称') }], initialValue: data.name }
            ]"
          />
        </a-form-item>
      </a-form>
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  data () {
    return {
      config: {},
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      data: {}
    }
  },
  methods: {
    show (config, data) {
      this.visible = true
      this.config = config
      this.data = config.record
      this.recordIndex = config.index
      this.form.resetFields()
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          values = Object.assign(this.data, values)
          this.visible = false
          this.$message.success(this.$t('操作成功'))
          if (this.config.action === 'add') {
            this.$emit('func', 'add', values, null, this.config.type)
          } else {
            this.$emit('func', 'edit', values, this.recordIndex, this.config.type)
          }
        }
      })
    }
  }
}
</script>
