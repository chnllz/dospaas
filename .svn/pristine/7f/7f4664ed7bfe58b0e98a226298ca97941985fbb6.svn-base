<template>
  <a-drawer :title="config.title" :width="600" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item :label="$t('规则名称')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['name', { initialValue: data.name, message: $t('请输入规则名称') }]" />
        </a-form-item>
        <a-form-item :label="$t('控件类型')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[
              'type',
              { rules: [{ required: true, message: $t('请选择控件类型') }], initialValue: data.type }
            ]"
            @change="onChange"
          >
            <a-select-option value="component">{{ $t('组件') }}</a-select-option>
            <a-select-option value="field">{{ $t('字段') }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-if="itemstype == 'field'" :label="$t('选择字段')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="['field', { rules: [{ required: true }], initialValue: data.field + '' }]"
            show-search
            option-filter-prop="children"
          >
            <a-select-option v-for="(value, key) in fieldData" :key="key" :value="key" :record="value">
              {{ value.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-if="itemstype == 'field'" :label="$t('字段规则')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="['rule', { rules: [{ required: true }], initialValue: data.rule }]">
            <a-select-option value="show_allow">{{ $t('显示必填') }}</a-select-option>
            <a-select-option value="show_no_allow">{{ $t('显示不必填') }}</a-select-option>
            <a-select-option value="show">{{ $t('显示') }}</a-select-option>
            <a-select-option value="hidden">{{ $t('隐藏') }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('占用列宽')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number
            v-decorator="['column', { rules: [{ required: true }], initialValue: data.column }]"
            :min="1"
            :max="24"
          />
        </a-form-item>
        <a-form-item :label="$t('附加属性')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['attribute', { initialValue: data.attribute }]" :rows="12" />
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
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      data: {},
      fieldData: [],
      itemstype: 'field'
    }
  },
  methods: {
    show (config, data) {
      this.visible = true
      this.config = config
      this.data = config.record
      this.recordIndex = config.index
      this.form.resetFields()
      this.itemstype = this.data.type ? this.data.type : this.itemstype
      this.fieldData = this.params.fieldData
    },
    onChange (value) {
      this.itemstype = value
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          values = Object.assign(this.data, values)
          if (this.config.action === 'add') {
            this.params.wayRuleData.push(values)
          } else {
            this.$set(this.params.wayRuleData, this.recordIndex, values)
          }
          this.visible = false
          this.$message.success(this.$t('操作成功'))
        }
      })
    }
  }
}
</script>
