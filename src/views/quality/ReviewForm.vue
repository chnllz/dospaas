<template>
  <a-form :form="form">
    <a-row>
      <a-col span="24">
        <a-space>
          <tag-icon class="tagIcon" />
          <h3 style="margin-top: 10px">{{ $t('复议信息') }}</h3>
        </a-space>
        <a-card>
          <a-form-item
            :readOnly="true"
            :labelCol="{ span: 3 }"
            :required="true"
            :wrapperCol="{ span: 18 }"
            :label="$t('申请复议理由')"
          >
            <a-textarea :disabled="true" :auto-size="{ minRows: 3, maxRows: 5 }" />
          </a-form-item>
          <a-form-item :label="$t('审核结果')" :required="true" :labelCol="{ span: 3 }" :wrapperCol="{ span: 18 }">
            <a-radio-group name="satisfied">
              <a-radio value="1">{{ $t('同意复议') }}</a-radio>
              <a-radio value="0" style="margin-left: 62px">{{ $t('不同意复议') }}</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item :labelCol="{ span: 3 }" :required="true" :wrapperCol="{ span: 18 }" :label="$t('审核说明')">
            <a-textarea :auto-size="{ minRows: 3, maxRows: 5 }" />
          </a-form-item>
        </a-card>
      </a-col>
    </a-row>
  </a-form>
</template>
<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      config: {},
      id: '',
      req: {
        qualityId: '',
        handleType: '',
        remark: ''
      }
    }
  },
  methods: {
    show (config) {
      this.config = config
      this.id = config.id
      this.reconsideInfo()
    },
    reconsideInfo () {
      this.axios({
        url: '/quality/forReconsideration/view',
        params: { id: this.id }
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.message)
          this.form.resetFields()
          this.$emit('ok')
          this.visible = !this.visible
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
