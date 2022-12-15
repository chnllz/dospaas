<template>
  <a-drawer :title="config.title" :width="600" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item :label="$t('办理方式显示名')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="[
              'way',
              {
                rules: [
                  { required: true, message: $t('请输入办理方式显示名') },
                  { min: 2, message: $t('请输入至少两个字符') }
                ],
                initialValue: data.way
              }
            ]"
            @change="handleChangeName"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span slot="label">
            {{ $t('办理方式系统名') }}
            <a-tooltip placement="top">
              <template slot="title">
                <span>
                  {{
                    $t(
                      '办理方式系统名由办理方式显示名自动生成。取显示名称前2个字的全拼，从第三个字起取首字母，全拼和首字母之间用下划线连接。保存时系统进行唯一性校验，若已存在当前名称，则会在末尾以2为起点，以1为步进增加数字标识，直到系统名称唯一。如：anzhuang、anzhuang2、anzhuang3'
                    )
                  }}
                </span>
              </template>
              <a-icon type="question-circle" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
              'alias',
              { rules: [{ required: true, message: $t('请输入办理方式系统名') }], initialValue: data.alias }
            ]"
            :disabled="config.action === 'edit'"
          />
        </a-form-item>
        <a-form-item :label="$t('启用')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-switch v-decorator="['onOff', { valuePropName: 'checked', initialValue: data.onOff }]" />
        </a-form-item>
        <a-form-item :label="$t('是否默认')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-radio-group
            v-decorator="['checked', { rules: [{ required: true }], initialValue: data.checked + '' || '0' }]"
          >
            <a-radio value="1">{{ $t('是') }}</a-radio>
            <a-radio value="0">{{ $t('否') }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :label="$t('说明')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['remarks', { initialValue: data.remarks }]" :rows="8" />
        </a-form-item>
      </a-form>
      <div class="bbar">
        <a-button v-if="config.action === 'add'" type="primary" @click="handleSubmit(1)">
          {{ $t('保存并添加') }}
        </a-button>
        <a-button type="primary" @click="handleSubmit(0)">{{ $t('保存') }}</a-button>
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
      data: {}
    }
  },
  methods: {
    show (config, data) {
      this.visible = true
      this.config = config
      this.data = JSON.parse(JSON.stringify(config.record))
      this.recordIndex = config.index
      this.form.resetFields()
    },
    // 根据显示名称赋值系统名称
    handleChangeName (e) {
      const pinyin = require('js-pinyin')
      const reg = new RegExp(/^(?![0-9]|_)[a-z0-9_]+$/)
      const reg2 = new RegExp(/^[a-z0-9_]+$/)
      const string = e.target.value
      let val = pinyin.getCamelChars(e.target.value)
      if (string.length <= 2) {
        val = pinyin.getFullChars(string)
      } else {
        const str1 = string.substring(0, 2)
        const str2 = string.substring(2, string.length)
        val = pinyin.getFullChars(str1) + '_' + pinyin.getCamelChars(str2)
      }
      val = val.toLowerCase()
      val = val.split('')
      this.getVal(val, reg)
      val = val.filter(item => {
        return reg2.test(item)
      })
      if (this.config.action === 'add') {
        let str = val.join('')
        let index = 0
        this.params.handleMethods.forEach(item => {
          if (item.alias.indexOf(str) !== -1) {
            index++
          }
        })
        if (index) {
          str = str + index
        }
        this.form.setFieldsValue({ 'alias': str })
      }
    },
    // 递归判断是否首字不是数字
    getVal (val, reg) {
      if (!reg.test(val[0])) {
        val.shift()
        this.getVal(val, reg)
      }
    },
    handleSubmit (res) {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          values = Object.assign(this.data, values)
          if (this.config.action === 'add') {
            this.$emit('ok', 'add', values)
          } else {
            this.$emit('ok', 'edit', values, this.recordIndex)
          }
          this.$message.success(this.$t('操作成功'))
          if (res === 1) {
            this.form.resetFields()
            this.data = {
              id: (new Date()).valueOf(),
              listOrder: this.params.handleMethods.length + 1,
              way: '',
              checked: 0,
              rule: '',
              alias: '',
              onOff: true,
              remarks: ''
            }
          } else {
            this.visible = false
          }
        }
      })
    }
  }
}
</script>
