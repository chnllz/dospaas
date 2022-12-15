
<template>
  <a-drawer :destroyOnClose="true" :title="config.title" :width="800" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="false">
      <a-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-form-item :label="$t('关键词')">
          <a-input
            v-decorator="[
              'keyword',
              { initialValue: param ? param.keyword : '', rules: [{ required: true, message: $t('请输入关键词') }] }
            ]"
          />
        </a-form-item>
        <a-form-item :label="$t('匹配模式')">
          <a-select
            v-decorator="[
              'mode',
              { initialValue: param ? param.mode : 'cn', rules: [{ required: true, message: $t('请选择匹配模式') }] }
            ]"
          >
            <a-select-option v-for="item in modeList" :key="item.value" :value="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('状态')">
          <a-select
            v-decorator="[
              'status',
              { initialValue: param ? param.status : 0, rules: [{ required: true, message: $t('请选择状态') }] }
            ]"
          >
            <a-select-option v-for="item in statusList" :key="item.value" :value="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <div class="bbar">
        <a-button type="primary" html-type="submit" @click="handleSubmit">{{ $t('确定') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('chat'),
  data () {
    return {
      form: this.$form.createForm(this),
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
      config: '',
      visible: false,
      param: {},
      modeList: [{
        value: 'cn', label: this.$t('包含匹配')
      }, {
        value: 'eq', label: this.$t('完全匹配')
      }],
      statusList: [{
        value: 0, label: this.$t('禁用')
      }, {
        value: 1, label: this.$t('启用')
      }]
    }
  },
  created () {
  },
  methods: {
    show (config) {
      this.config = config
      this.param = config.data
      this.visible = true
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        // eslint-disable-next-line camelcase
        const { id, updateTime, robotId } = this.param
        if (!errors) {
          this.axios({
            url: this.config.url,
            data: Object.assign(values, {
              id, robotId, updateTime
            })
          }).then((res) => {
            this.visible = false
            this.$emit('ok', '')
            this.$message.success(res.message)
          })
        }
      })
    }
  }
}
</script>
