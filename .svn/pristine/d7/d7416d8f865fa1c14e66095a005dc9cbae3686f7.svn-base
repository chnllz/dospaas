<template>
  <div>
    <a-form-item :label="$t('表单名称')" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-input
        v-decorator="[
          'info[name]',
          { initialValue: data.name || '', rules: [{ required: true, message: $t('请输入表单名称') }] }
        ]"
      />
    </a-form-item>
    <a-form-item :label="$t('备注')" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-textarea
        v-decorator="['setting[description]', { initialValue: setting.description || '' }]"
        :autoSize="{ minRows: 3, maxRows: 6 }"
      />
    </a-form-item>
  </div>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  props: {
    data: {
      type: Object,
      default () {
        return {}
      },
      required: true
    },
    setting: {
      type: Object,
      default () {
        return {}
      },
      required: true
    }
  },
  data () {
    return {
      config: {},
      labelCol: { span: 3 },
      wrapperCol: { span: 10 },
      visible: false,
      loading: false
    }
  }
}
</script>
