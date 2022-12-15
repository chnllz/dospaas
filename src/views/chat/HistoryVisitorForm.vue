<template>
  <!-- 历史访客编辑 -->
  <a-drawer :title="config.title" :width="600" :visible="visible" :destroyOnClose="true" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item :label="$t('访客ID')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['info[visitorId]', { initialValue: data.visitorId }]" disabled />
        </a-form-item>
        <a-form-item :label="$t('访客名称')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="[
              'info[visitorName]',
              { initialValue: data.visitorName, rules: [{ required: true, message: $t('请输入访客名称') }] }
            ]"
          />
        </a-form-item>
        <a-form-item :label="$t('备注')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea
            v-decorator="['info[remarks]', { initialValue: data.remarks }]"
            :autoSize="{ minRows: 6, maxRows: 8 }"
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
  i18n: window.lang('chat'),
  data () {
    return {
      config: {},
      data: {},
      loading: false,
      visible: false,
      form: this.$form.createForm(this),
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }
  },
  methods: {
    show (config) {
      this.config = config
      this.loading = true
      this.visible = true
      this.axios({
        url: this.config.url,
        data: Object.assign({ action: 'get', id: config.record ? config.record.id : 0 })
      }).then((res) => {
        this.loading = false
        this.data = res.result
      })
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          this.loading = true
          this.axios({
            url: this.config.url,
            data: Object.assign(values, { id: this.data.id, action: 'submit' })
          }).then((res) => {
            this.visible = false
            this.loading = false
            if (res.code === 0) {
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
            this.$emit('ok')
            this.form.resetFields()
          })
        }
      })
    }
  }
}
</script>
