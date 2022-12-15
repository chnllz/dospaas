<template>
  <a-modal :destroyOnClose="true" :title="title" :width="600" :visible="visible" @cancel="visible = !visible">
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item label="报错内容">
          <a-textarea
            v-decorator="['info[content]', { rules: [{ required: true, message: '请填写报错内容' }] }]"
            style="height: 300px"
          ></a-textarea>
        </a-form-item>
      </a-form>
    </a-spin>
    <div slot="footer">
      <a-spin :spinning="loading">
        <span slot="indicator"></span>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
        <a-button @click="visible = !visible">关闭</a-button>
      </a-spin>
    </div>
  </a-modal>
</template>
<script>
export default {
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
        title: '全部',
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

      this.title = `${config.detail.article.title}`
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          values.info.articleId = this.config.detail.article.id
          this.axios({
            url: '/knowledge/index/addError',
            data: Object.assign(values)
          }).then(res => {
            if (!res.code) {
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
