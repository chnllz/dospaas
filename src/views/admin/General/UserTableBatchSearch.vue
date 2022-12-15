<template>
  <a-modal
    :title="$t('批量搜索')"
    :visible="visible"
    :maskClosable="!loading"
    :closable="!loading"
    @ok="handleOk"
    @cancel="visible = !visible"
  >
    <a-form :form="form">
      <a-form-item>
        <a-textarea
          v-decorator="[
            'text',
            { initialValue: config.text, rules: [{ required: true, message: $t('请输入搜索内容') }] }
          ]"
          :placeholder="`${$t('请输入搜索内容，多个内容请换行输入，例如')}:
AZ2106070000001
AZ2106070000002
AZ2106070000003`"
          :auto-size="{ minRows: 8, maxRows: 8 }"
        />
      </a-form-item>
    </a-form>
    <div slot="footer">
      <a-row type="flex" align="middle">
        <a-col :span="24" style="text-align: right">
          <a-button type="primary" :loading="loading" @click="handleOk">{{ $t('搜索') }}</a-button>
          <a-button :loading="loading" @click="resetSearch">{{ $t('重置') }}</a-button>
          <a-button :loading="loading" @click="visible = !visible">{{ $t('关闭') }}</a-button>
        </a-col>
      </a-row>
    </div>
  </a-modal>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  data () {
    return {
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      config: {}
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
    },
    resetSearch () {
      this.form.setFieldsValue({
        'text': ''
      })
      this.$emit('ok', { text: '' }, '', 'bulkSearch')
      this.visible = false
    },
    handleOk () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          this.$emit('ok', values, '', 'bulkSearch')
          this.visible = false
        }
      })
    }
  }
}
</script>
