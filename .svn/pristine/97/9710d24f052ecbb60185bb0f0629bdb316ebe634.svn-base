<template>
  <a-modal
    :destroyOnClose="true"
    :title="
      config.type === $t('备注') ? $t('添加备注') : config.type === $t('暂不处理') ? $t('暂不处理') : $t('绑定订单号')
    "
    :width="600"
    :visible="visible"
    :maskClosable="!buttonLoading"
    :confirmLoading="buttonLoading"
    :closable="!buttonLoading"
    @cancel="visible = !visible"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item
        v-if="config.type === $t('绑定订单号')"
        :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        :label="$t('订单号')"
      >
        <a-input
          v-decorator="[
            'orderId',
            {
              initialValue: config.record && config.record.orderId ? config.record.orderId : '',
              rules: [{ required: false }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        v-if="config.type === $t('备注')"
        :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        :label="$t('备注')"
      >
        <a-textarea
          v-decorator="[
            'remark',
            {
              initialValue: config.record && config.record.remark ? config.record.remark : '',
              rules: [{ required: true, message: $t('备注不能为空') }]
            }
          ]"
          :autoSize="{ minRows: 8, maxRows: 16 }"
        />
      </a-form-item>
      <a-form-item
        v-if="config.type === $t('暂不处理')"
        :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        label=" "
        :colon="false"
      >
        <div>{{ $t('请确认是否要将该争议信息转移至“暂不处理”？') }}</div>
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
          const url = `${this.config.url}`
          let obj = {
            url: url
          }
          if (this.config.type !== this.$t('暂不处理')) {
            // 绑定订单号/备注 需要增加以下参数
            obj = Object.assign(obj, {
              data: {
                orderNo: values.orderId,
                remark: values.remark,
                sid: this.$store.getters.userInfo.sid,
                id: this.config.record.id,
                updateFieldName: 'order_id',
                tableName: this.config.tableName,
                conditionFieldName: 'id',
                conditionFieldValue: this.config.record.id
              }
            })
          }
          this.axios(obj).then(res => {
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
