<template>
  <a-drawer :destroyOnClose="true" :title="config.title" :width="600" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item :label="$t('上级菜单')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-cascader
            v-decorator="['parentMenuId']"
            :placeholder="$t('作为一级菜单')"
            :options="options"
            :showSearch="true"
            changeOnSelect
          />
        </a-form-item>
        <a-form-item :label="$t('菜单名称')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="[
              'name',
              { rules: [{ required: true, message: $t('请填写菜单名称') }], initialValue: config.record.name }
            ]"
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
  name: 'DashboardCreateMenu',
  i18n: window.lang('admin'),
  data () {
    return {
      config: {},
      visible: false,
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      form: this.$form.createForm(this),
      options: [],
      data: {}
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.loading = true
      this.config = config
      this.axios({
        url: this.config.url
      }).then((res) => {
        this.loading = false
        this.options = res.result || []
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          values.parentMenuId = values.parentMenuId && values.parentMenuId.length ? values.parentMenuId[values.parentMenuId.length - 1] : null
          this.loading = true
          this.axios({
            url: this.config.submitUrl,
            data: Object.assign({
              info: {
                viewMode: 0,
                parentMenuId: values.parentMenuId,
                menuName: values.name,
                param: '',
                enabled: '1',
                display: '1',
                priv: '',
                remarks: null,
                view: '[{"type":"custom","viewPath":"admin/DashboardPage/index","priv":[]}]',
                icon: 'fa-arrow-right'
              },
              action: 'submit',
              id: null
            })
          }).then(res => {
            this.loading = false
            if (res.code) {
              this.$message.warning(res.message)
            } else {
              this.visible = false
              this.$emit('ok', values)
              this.$message.success(res.message)
              this.form.resetFields()
            }
          })
        }
      })
    }
  }
}
</script>
