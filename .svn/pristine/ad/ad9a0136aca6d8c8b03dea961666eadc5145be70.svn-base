<template>
  <a-drawer :title="config.title" :width="500" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item :required="true" :label="$t('申请复议理由')">
          <a-textarea
            v-decorator="['remark', { rules: [{ required: true, message: '请填写复议理由' }] }]"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          ></a-textarea>
        </a-form-item>
      </a-form>
      <div class="bbar">
        <a-button type="primary" @click="submit">{{ $t('提交') }}</a-button>
        <a-button @click="visible = false">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      config: {},
      visible: false,
      loading: true,
      id: {}
    }
  },
  watch: {
    visible: {
      handler (newVal) {
        if (!newVal) {
          this.form.resetFields()
        }
      },
      immediate: true
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.loading = false
      this.config = config
      this.id = config.data.id
    },
    submit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          this.axios({
            url: '/quality/checked/apply',
            params: Object.assign({ id: this.id }, values)
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
      })
    }
  }
}
</script>
