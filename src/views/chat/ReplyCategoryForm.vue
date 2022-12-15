<template>
  <!-- 个人库/公共库抽屉 -->
  <a-modal :title="config.title" :width="600" :visible="visible" :destroyOnClose="true" @cancel="visible = !visible">
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span slot="label" :title="$t('分类名称')">
            {{ $t('分类名称') }}
            <a-tooltip :title="$t('2-20个字符。')">
              <a-icon type="question-circle" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
              'info[name]',
              {
                initialValue: data.name,
                rules: [
                  { required: true, message: $t('请输入分类名称') },
                  { min: 2, max: 20, message: $t('请输入2-20个字符') }
                ]
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
      visible: false,
      config: {},
      loading: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: this.$form.createForm(this),
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
        this.data = res.result
      })
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          this.loading = true
          this.axios({
            url: this.config.url,
            data: Object.assign(values, { id: this.data.id, type: this.config.type })
          }).then((res) => {
            this.loading = false
            if (res.code === 0) {
              this.$emit('ok')
              this.visible = false
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    }
  }
}
</script>
