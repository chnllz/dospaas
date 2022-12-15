<template>
  <a-drawer :destroyOnClose="true" :title="title" :width="600" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item :label="$t('审核不通过的原因')">
          <a-textarea
            v-decorator="['remark', { rules: [{ required: true, message: $t('请填写审核不通过原因') }] }]"
            style="height: 300px"
          ></a-textarea>
        </a-form-item>
      </a-form>
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">{{ $t('提交') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('knowledge'),
  components: {
  },
  props: {
    type: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      loading: false,
      visible: false,
      form: this.$form.createForm(this),
      data: [],
      title: '',
      // 表头
      columns: [{
        title: this.$t('全部'),
        dataIndex: 'text',
        width: 300
      }],
      selectedRowKeys: [],
      config: {}
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.title = `${this.$t('编辑')}: ${config.item.title}`
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          this.axios({
            url: this.config.url,
            data: Object.assign(values, { id: this.config.item.id, type: 'break' })
          }).then(res => {
            if (!res.code) {
              this.$message.success(res.message)
              this.visible = false
              this.$emit('ok')
            }
          })
        }
      })
    }
  }
}
</script>
