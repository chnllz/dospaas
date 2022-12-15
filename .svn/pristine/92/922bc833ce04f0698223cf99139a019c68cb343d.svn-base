<template>
  <a-modal :title="config.title" :visible="visible" :destroyOnClose="true" @cancel="visible = !visible">
    <a-spin :spinning="loading">
      <a-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-form-item :label="$t('流程名称')">
          <a-input
            v-decorator="[
              'info[workflowName]',
              {
                rules: [{ required: true, message: $t('请输入流程名称') }]
              }
            ]"
          >
            <set-lang slot="addonAfter" />
          </a-input>
        </a-form-item>
        <a-form-item :label="$t('流程对应数据表')">
          <a-cascader
            v-decorator="[
              'info[tableId]',
              {
                rules: [{ required: true, message: $t('请选择流程对应数据表') }]
              }
            ]"
            :placeholder="$t('请选择源数据表')"
            :show-search="true"
            option-filter-prop="children"
            :options="tableFieldsOptions"
          />
        </a-form-item>
      </a-form>
    </a-spin>
    <div slot="footer">
      <a-spin :spinning="loading">
        <span slot="indicator"></span>
        <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </a-spin>
    </div>
  </a-modal>
</template>
<script>
import { workflowButton } from './Table/DefaultButton'
export default {
  components: {
    SetLang: () => import('@/components/SetLang')
  },
  data () {
    return {
      config: {},
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      tableFieldsOptions: []
    }
  },
  methods: {
    show (config) {
      this.config = config
      this.visible = true
      this.loading = true
      this.axios({
        url: '/admin/table/getModuleTableOptions'
      }).then(res => {
        this.loading = false
        this.tableFieldsOptions = res.result
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          values.info.workflowSetting = {}
          values.info.workflowSetting.dataWindowButtons = workflowButton
          values.info.workflowSetting.createType = 'handle'
          values.info.workflowSetting.globalCallbackFinish = false
          values.info.workflowSetting.formViewButtons = []
          values.info.workflowSetting.icon = { type: 'profile' }
          values.info.workflowSetting.notice = {}
          values.info.workflowSetting.processStatusData = [{ value: '100', label: '已结束' }, { value: '101', label: '已取消' }, { value: '102', label: '已挂起' }]
          values.info.workflowSetting.processSubStatusData = []
          values.info.workflowSetting.globalCallbackLog = false
          values.info.workflowSetting.globalCallbackTerminate = false
          values.info.workflowSetting.cancelPermissions = []
          values.info.workflowSetting.terminateReasons = []
          values.info.workflowSetting.limitedTime = []
          values.info.workflowSetting.templateAction = '{HANDLE_WAY}'
          values.info.workflowSetting.templateDescription = '{HANDLE_REMARKS}'
          values.info.workflowSetting.globalCallbackUrge = false
          values.info.workflowSetting.urgeReasons = []
          values.info.workflowSetting.writeBackMappings = []
          values.info.tableId = values.info.tableId[1]
          values.info.accessLevel = 0
          this.loading = true
          this.axios({
            url: '/admin/workflow/add',
            data: Object.assign(values.info, { syncProcessFields: true })
          }).then((res) => {
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
        } else {
          this.$message.warning(this.$t('表单填写不符合要求，请参考页面内具体提示修改'))
        }
      })
    }
  }
}
</script>
