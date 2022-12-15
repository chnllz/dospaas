<template>
  <!-- 敏感词编辑表单 -->
  <a-modal :title="config.title" :width="600" :visible="visible" :destroyOnClose="true" @cancel="visible = !visible">
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item
          :label="config.type == 0 ? $t('敏感词') : $t('违禁词')"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-textarea
            v-if="config.action === 'batch'"
            v-decorator="[
              'info[keyword]',
              {
                initialValue: data.keyword,
                rules: [{ required: true, message: `${$t('请输入')}${config.type == 0 ? $t('敏感词') : $t('违禁词')}` }]
              }
            ]"
            :placeholder="$t('一行一个')"
            :auto-size="{ minRows: 6, maxRows: 10 }"
          />
          <a-input
            v-else
            v-decorator="[
              'info[keyword]',
              {
                initialValue: data.keyword,
                rules: [{ required: true, message: `${$t('请输入')}${config.type == 0 ? $t('敏感词') : $t('违禁词')}` }]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-spin>
    <div slot="footer">
      <a-button type="primary" :loading="loading" @click="handleSubmit">{{ $t('保存') }}</a-button>
      <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
    </div>
  </a-modal>
</template>
<script>
export default {
  i18n: window.lang('chat'),
  data () {
    return {
      form: this.$form.createForm(this),
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
      visible: false,
      loading: false,
      config: {},
      data: {}
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.loading = true
      this.config = config
      this.axios({
        url: this.config.url,
        data: Object.assign({ action: 'get', id: config.record ? config.record.id : 0 })
      }).then((res) => {
        this.loading = false
        this.data = res.result.data
      })
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        values.info.type = this.config.type
        const data = values.info
        if (!errors) {
          if (!data.keyword.split('\n').filter(item => item).length) {
            this.$message.warning(`${this.$t('请输入')}${this.config.type === 0 ? this.$t('敏感词') : this.$t('违禁词')}`)
            return
          }
          this.loading = true
          data.keyword = data.keyword.split('\n').filter(item => item).join('\n')
          this.axios({
            url: this.config.url,
            data: Object.assign(data, { action: 'submit', id: this.data.id })
          }).then((res) => {
            this.loading = false
            if (res.code === 0) {
              this.visible = false
              this.$emit('ok')
              this.form.resetFields()
              this.$message.success(res.message)
            } else {
              this.$message.warning(res.message)
            }
          })
        }
      })
    }
  }
}
</script>
