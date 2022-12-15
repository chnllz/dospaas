<template>
  <a-drawer :title="config.title" :width="600" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item :label="$t('当前表字段')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="['currentField', { rules: [{ required: true, message: $t('请选择当前表字段') }] }]"
            :placeholder="$t('请选择当前表字段')"
          >
            <a-select-option v-for="(value, key) in params.currentFields" :key="key" :value="value.alias">
              {{ value.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('源数据表字段')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="['sourceField', { rules: [{ required: true, message: $t('请选择源数据表字段') }] }]"
            :placeholder="$t('请选择源数据表字段')"
          >
            <a-select-option v-for="(value, key) in params.sourceFields" :key="key" :value="value.alias">
              {{ value.name }}
            </a-select-option>
          </a-select>
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
  i18n: window.lang('admin'),
  props: {
    params: {
      type: Object,
      default () {
        return {}
      },
      required: false
    }
  },
  data () {
    return {
      config: {},
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      data: {},
      field: [],
      tpl: []
    }
  },
  methods: {
    show (config, data) {
      this.visible = true
      this.config = config
      this.data = config.record
      this.recordIndex = config.index
      this.form.resetFields()
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          values = Object.assign(this.data, values)
          if (this.config.action === 'add') {
            this.params.currentFields.forEach(function (arr) {
              if (arr.alias === values.currentField) {
                values.currentFieldName = arr.name
              }
            })
            this.params.sourceFields.forEach(function (arr) {
              if (arr.alias === values.sourceField) {
                values.sourceFieldName = arr.name
              }
            })
            this.params.sourceFillset.push(values)
          } else {
            this.$set(this.params.sourceFillset, this.recordIndex, values)
          }
          this.visible = false
          this.$message.success(this.$t('操作成功'))
          this.$emit('ok')
        }
      })
    }
  }
}
</script>
