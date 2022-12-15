<template>
  <a-form :form="form">
    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
      <span slot="label">
        {{ $t('允许输入长度') }}
        <a-tooltip>
          <a-icon type="question-circle" />
          <div slot="title">
            <div>{{ $t('1、最小输入长度不得小于1，为空表示不限制最小输入长度。') }}</div>
            <div>{{ $t('2、最大输入长度不能小于最小输入长度，为空表示不限制最大输入长度。') }}</div>
          </div>
        </a-tooltip>
      </span>
      <a-row>
        <a-col :span="4">
          <a-form-item>
            <a-input-number
              v-decorator="['setting[attribute][minLength]', { initialValue: data.attribute.minLength || '' }]"
              style="width: 100%"
              :min="1"
              @change="
                (e) => {
                  minLength = e
                }
              "
            />
          </a-form-item>
        </a-col>
        <a-col :span="1" style="text-align: center">{{ $t('至') }}</a-col>
        <a-col :span="4">
          <a-form-item>
            <a-input-number
              v-decorator="['setting[attribute][maxLength]', { initialValue: data.attribute.maxLength || '' }]"
              style="width: 100%"
              :min="minLength"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
      <span slot="label">
        {{ $t('行数范围') }}
        <a-tooltip placement="top">
          <template slot="title">
            <span>{{ $t('设置多行文本在表单视图中的所占行数。超过最大行数时，出现内部滚动条') }}</span>
          </template>
          <a-icon type="question-circle" />
        </a-tooltip>
      </span>
      <a-row>
        <a-col :span="4">
          <a-form-item>
            <a-input-number
              v-decorator="[
                'setting[attribute][minRows]',
                {
                  initialValue: parseInt(data.attribute.minRows) || 2,
                  rules: [{ required: true, message: $t('最小行数范围不能为空') }]
                }
              ]"
              style="width: 100%"
              :min="1"
              :max="100"
              @change="
                (num) => {
                  data.attribute.minRows = num
                }
              "
            />
          </a-form-item>
        </a-col>
        <a-col :span="1" style="text-align: center">{{ $t('至') }}</a-col>
        <a-col :span="4">
          <a-form-item>
            <a-input-number
              v-decorator="[
                'setting[attribute][maxRows]',
                {
                  initialValue: parseInt(data.attribute.maxRows) || 2,
                  rules: [{ required: true, message: $t('最大行数范围不能为空') }]
                }
              ]"
              style="width: 100%"
              :min="parseInt(data.attribute.minRows) || 1"
              :max="100"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item :label="$t('输入提示')" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-input v-decorator="['setting[attribute][emptyText]', { initialValue: data.attribute.emptyText || '' }]" />
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  i18n: window.lang('admin'),
  props: {
    setting: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      form: this.$form.createForm(this),
      data: {},
      minLength: null,
      regexs: [
        { value: '', text: this.$t('常用正则') },
        { value: '/^([+-]?)\\d*\\.?\\d+$/', text: this.$t('数字') },
        { value: '/^-?[1-9]\\d*$/', text: this.$t('整数') },
        { value: '/^[A-Za-z]+$/', text: this.$t('字母') },
        { value: '/^\\w+$/', text: this.$t('字母+数字') },
        { value: '/^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$/', text: 'E-mail' },
        { value: '/^[1-9]*[1-9][0-9]*$/', text: 'QQ' },
        { value: '/^http:///', text: this.$t('超级链接') },
        { value: '/^(1)[0-9]{10}$/', text: this.$t('手机号码') },
        { value: '/^[0-9-]{6,13}$/', text: this.$t('电话号码') },
        { value: '/^[0-9]{6}$/', text: this.$t('邮政编码') }
      ]
    }
  },
  watch: {
    setting: {
      handler (newVal) {
        this.data = JSON.parse(JSON.stringify(newVal))
        this.data.form = this.data.form && !(this.data.form instanceof Array) ? this.data.form : {}
      },
      immediate: true
    }
  },
  methods: {
    handleSubmit () {
      let val = {}
      const { validateFields } = this.form
      validateFields((errors, values) => {
        if (!errors) {
          val = values
        }
      })
      return val
    }
  }
}
</script>
