<template>
  <a-modal
    :title="$t('发送短信')"
    :visible="visible"
    :destroyOnClose="true"
    :confirmLoading="loading"
    @ok="handleOk"
    @cancel="visible = !visible"
  >
    <a-form :form="form">
      <a-form-item :label="$t('手机号码')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input
          v-decorator="[
            'info[number]',
            {
              initialValue: config.phone,
              rules: [
                { required: true, message: $t('请输入手机号码') },
                {
                  validator: (rule, value, callback) => {
                    if (!/^\d{11}$/.test(value)) {
                      callback($t('电话号码不符合规范'))
                    } else {
                      callback()
                    }
                  }
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item :label="$t('发送模板')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-select
          v-decorator="[
            'info[templateNumber]',
            { rules: [{ required: true, message: $t('请选择模板') }], initialValue: '' }
          ]"
          :placeholder="$t('请选择模板')"
          :disabled="config.disabled"
          @change="handleGetTemplate"
        >
          <a-select-option v-for="(value, key) in template" :key="key" :value="value.value">
            {{ value.display }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        v-for="(value, key) in fieldTemplate"
        :key="key"
        :value="key"
        :label="value.label"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="[value.name, { rules: [{ required: true, message: $t('请输入参数') }] }]" />
      </a-form-item>
      <a-form-item :label="$t('发送内容')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-textarea
          v-decorator="[
            'info[sendContent]',
            { rules: [{ required: true, message: $t('请输入内容') }], initialValue: content }
          ]"
          :disabled="tempTag !== 'custom'"
          :autoSize="{ minRows: 5, maxRows: 10 }"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      config: {},
      content: '',
      myfilepath: '',
      template: [],
      fieldTemplate: [],
      tempTag: ''
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.axios({
        url: '/sms/template/getTemplate'
        // data: Object.assign({ id: config.record ? config.record.id : 0 })
      }).then(res => {
        this.loading = false
        this.template = res.result.data
        this.handleGetTemplate(config.templateNumber)
        this.form.setFieldsValue({
          'info[templateNumber]': config.templateNumber
        })
        this.tempTag = config.templateNumber
        this.$nextTick(() => {
          if (config.dynamicCom) {
            const obj = {}
            for (const i in config.dynamicCom) {
              obj['dynamicCom[' + i + ']'] = config.dynamicCom[i]
            }
            this.form.setFieldsValue(obj)
          }
        })
      })
    },
    handleGetTemplate (value) {
      this.tempTag = value
      const myTemplate = this.template
      for (var key in myTemplate) {
        if (myTemplate[key].value === value) {
          this.content = myTemplate[key].text
          this.form.setFieldsValue({
            'info[sendContent]': this.content
          })
          var patt = /\${[a-zA-Z0-9_]+}/g
          var res = myTemplate[key].text.match(patt)
          this.fieldTemplate = []
          for (var i in res) {
            var fname = res[i].substring(2, res[i].length - 1)
            this.fieldTemplate.push({ label: fname, name: 'dynamicCom[' + fname + ']' })
          }
        }
      }
    },
    handleOk () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          this.loading = true
          values.dataSource = 'manual'
          this.axios({
            url: '/sms/send/send',
            data: values
          }).then((res) => {
            this.loading = false
            if (res.code) {
              this.$message.error(res.message)
            } else {
              this.$message.success(res.message)
              this.visible = false
            }
          })
        }
      })
    }
  }
}
</script>
