<template>
  <a-modal
    :destroyOnClose="true"
    :title="$t('流转')"
    :width="600"
    :visible="visible"
    :maskClosable="!buttonLoading"
    :confirmLoading="buttonLoading"
    :closable="!buttonLoading"
    @cancel="visible = !visible"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }" :label="$t('活动')">
        <a-select v-decorator="['event', { rules: [{ required: true, message: $t('活动不能为空') }] }]">
          <a-select-option v-for="event in eventData" :key="event.transitionId" :value="event.transitionId">
            {{ event.transitionName }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  i18n: window.lang('admin'),
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
      this.axios({
        url: config.type === 'batch' ? config.url : '/admin/centerflow/jumpFlow',
        data: { action: 'get', caseId: config.caseId, workflowId: config.workflowId }
      }).then(res => {
        this.eventData = res.result.data
      })
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          this.buttonLoading = true
          let caseId
          if (this.config.type === 'batch') {
            caseId = this.config.data.map(item => item.caseId__)
          } else {
            caseId = this.config.caseId
          }
          this.axios({
            url: this.config.url || '/admin/workitem/processing',
            data: {
              action: 'jump',
              caseId: caseId,
              transitionId: values.event,
              handleWay: '流转',
              operation: 'jump'
            }
          }).then(res => {
            this.buttonLoading = false
            if (res.code > 0) {
              this.$message.error(res.message)
            } else {
              this.visible = false
              this.$message.success(res.message)
              this.$emit('ok')
            }
          })
        }
      })
    }
  }
}
</script>
