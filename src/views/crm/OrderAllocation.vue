<template>
  <a-modal
    :title="$t('分配')"
    :visible="visible"
    :destroyOnClose="true"
    :closable="!loading"
    :maskClosable="!loading"
    :confirmLoading="loading"
    @ok="handleSubmit"
    @cancel="visible = !visible"
  >
    <a-form :form="form" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
      <a-form-item :label="$t('分配客服')">
        <a-select
          v-decorator="['username', { rules: [{ required: true, message: $t('请选择分配客服') }] }]"
          :placeholder="$t('请选择分配客服')"
          showSearch
        >
          <a-select-option v-for="(userItem, userIndex) in userOptions" :key="userIndex" :value="userItem.username">
            {{ userItem.realName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label="$t('备注')">
        <a-textarea v-decorator="['remark']" :auto-size="{ minRows: 3, maxRows: 5 }" />
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
      loading: false,
      userOptions: [],
      config: {},
      form: this.$form.createForm(this)
    }
  },
  methods: {
    show (config) {
      this.config = config
      this.axios({
        url: config.getUrl,
        data: {}
      }).then(res => {
        this.visible = true
        this.userOptions = res.result
      })
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          const ids = this.config.parent.selectedRowKeys
          this.loading = true
          this.axios({
            url: this.config.submitUrl,
            data: Object.assign(values, {
              id: ids,
              allocateFlag: true
            })
          }).then(res => {
            this.loading = false
            if (res.code) {
              this.$message.error(res.message)
            } else {
              this.visible = false
              this.config.parent.refresh('noRefresh')
              this.$message.info(res.message)
            }
          })
        }
      })
    }
  }
}
</script>
