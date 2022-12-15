<template>
  <a-modal
    :destroyOnClose="true"
    :title="$t('更新状态')"
    :width="600"
    :visible="visible"
    :maskClosable="!buttonLoading"
    :confirmLoading="buttonLoading"
    :closable="!buttonLoading"
    @cancel="visible = !visible"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }" :label="$t('状态')">
        <a-radio-group
          v-decorator="[
            'status',
            { initialValue: config.record && config.record.status ? config.record.status : '待回复' }
          ]"
        >
          <a-radio value="待回复">{{ $t('待回复') }}</a-radio>
          <a-radio value="已回复">{{ $t('已回复') }}</a-radio>
          <a-radio value="已解决">{{ $t('已解决') }}</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  i18n: window.lang('crm'),
  data () {
    return {
      visible: false,
      buttonLoading: false,
      form: this.$form.createForm(this),
      config: {},
      eventData: []
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.buttonLoading = false
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        // 绑定订单号跟添加备注 调用不同接口
        if (!errors) {
          this.buttonLoading = true
          this.axios({
            url: '/pay/after/updateStatus',
            data: {
              id: this.config.record.id,
              status: values.status
            }
          }).then(res => {
            this.buttonLoading = false
            if (res.code !== 0) {
              this.$message.error(res.message)
            } else {
              this.config.parent.refresh()
              this.visible = false
              this.$message.success(res.message)
            }
          })
        }
      })
    }
  }
}
</script>
