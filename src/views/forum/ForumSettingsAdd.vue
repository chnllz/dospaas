<template>
  <div>
    <a-drawer :destroyOnClose="true" :title="config.title" :width="800" :visible="visible" @close="visible = !visible">
      <a-spin :spinning="loading">
        <a-form :form="form">
          <a-form-item :label="$t('分类名称')" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: setting.name || '',
                  rules: [
                    { required: true, message: $t('分类名称不能为空') },
                    { max: 20, message: $t('分类名称长度不得大于20') }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('分类负责人')" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-button @click="selectManager">
              <a-badge v-if="manager" status="success" />
              <a-badge v-else status="default" />
              {{ $t('选择') }}
            </a-button>
            <select-user-form ref="forumSettingsManager" @ok="getManager" />
            <a-input
              v-show="false"
              v-decorator="[
                'manager',
                {
                  initialValue: setting.manager || '',
                  rules: [{ required: true, message: $t('分类负责人不能为空') }]
                }
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('是否推荐')" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-switch
              v-decorator="[
                'recommended',
                { initialValue: setting.recommended === '1' ? true : false, valuePropName: 'checked' }
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('备注')" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea
              v-decorator="['remarks', { initialValue: setting.remarks || '' }]"
              :auto-size="{ minRows: 6, maxRows: 10 }"
            />
          </a-form-item>
        </a-form>
        <div class="bbar">
          <a-button type="primary" html-type="submit" @click="handleSubmit">{{ $t('保存') }}</a-button>
          <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
        </div>
      </a-spin>
    </a-drawer>
  </div>
</template>
<script>
export default {
  i18n: window.lang('forum'),
  components: {
    SelectUserForm: () => import('@/views/admin/General/SelectUserForm')
  },
  data () {
    return {
      visible: false,
      loading: false,
      config: {},
      setting: {},
      manager: '',
      form: this.$form.createForm(this),
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    }
  },
  methods: {
    show (config) {
      this.config = config
      this.setting = config.data
      this.manager = config.data ? config.data.manager : ''
      this.visible = true
    },
    selectManager () {
      this.$refs.forumSettingsManager.show({
        page: 'statistic',
        mode: 'multiple',
        selectValue: this.manager ? this.manager.split(',') : ''
      })
    },
    getManager (val) {
      this.manager = val.toString()
      this.form.setFieldsValue({
        manager: this.manager
      })
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.recommended = values.recommended ? '1' : '0'
          this.axios({
            url: 'forum/setting/saveCategory',
            data: this.config.action === 'add' ? values : Object.assign(values, { number: this.config.data.number })
          }).then(res => {
            this.visible = false
            if (res.code === 0) {
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
            this.$emit('ok', '')
          })
        }
      })
    }
  }
}
</script>
