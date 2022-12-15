<template>
  <div>
    <a-modal
      :title="config.title"
      :visible="visible"
      :okText="config.okText"
      :cancelText="$t('关闭')"
      :destroyOnClose="true"
      @ok="handleSubmit"
      @cancel="visible = !visible"
    >
      <template>
        <a-form :form="form">
          <a-form-item :label="$t('分配给客服')" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-select
              v-decorator="['serviceIds', { rules: [{ required: true, message: $t('请选择需要分配的客服') }] }]"
              allowClear
              :mode="config.mode"
              option-filter-prop="children"
              show-search
            >
              <a-select-option v-for="item in serversList" :key="item.value">{{ item.label }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </template>
    </a-modal>
  </div>
</template>
<script>
export default {
  i18n: window.lang('crm'),
  data () {
    return {
      visible: false,
      config: {},
      form: this.$form.createForm(this),
      serversList: []
    }
  },
  methods: {
    show (config) {
      this.config = config
      this.axios({
        url: '/chat/customerReport/serviceListInit',
        data: {}
      }).then((res) => {
        this.visible = true
        this.serversList = res.result
      })
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          if (typeof (values.serviceIds) === 'string') {
            values.serviceIds = values.serviceIds.split(',')
          }
          this.axios({
            url: '/chat/message/distribute',
            data: Object.assign({
              dataIds: this.config.parent.selectedRowKeys
            }, values)
          }).then((res) => {
            if (res.code) {
              this.$message.warning(res.message)
            } else {
              this.visible = false
              this.config.parent.refresh('noRefresh')
              this.$message.success(res.message)
            }
          })
        }
      })
    }
  }
}
</script>
