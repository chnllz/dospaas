<template>
  <a-modal
    :title="$t('导入')"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    :destroyOnClose="true"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            v-decorator="['file']"
            :action="`${$store.state.env.VUE_APP_API_BASE_URL}admin/menu/import/?type=uploadFile`"
            :headers="{ 'Access-Token': $store.getters.userInfo.accessToken }"
            :showUploadList="false"
            @change="handleChange"
          >
            <a-button>
              <a-icon type="upload" />
              {{ $t('选择文件') }}
            </a-button>
          </a-upload>
          {{ uploadMessage }}
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>
<script>
export default {
  data () {
    return {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 },
      visible: false,
      loading: false,
      parentId: '',
      form: this.$form.createForm(this),
      fileName: '',
      uploadMessage: this.$t('请选择要导入的文件')
    }
  },
  methods: {
    show () {
      this.visible = true
      this.loading = false
      this.fileName = ''
      this.uploadMessage = this.$t('请选择要导入的文件')
      this.parentId = ''
      if (this.$parent.$parent.breadcrumb.length) {
        this.parentId = this.$parent.$parent.breadcrumb[this.$parent.$parent.breadcrumb.length - 1]['menuId']
      }
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          this.loading = true
          if (this.fileName) {
            this.axios({
              url: '/admin/menu/import',
              data: { fileName: this.fileName, parentMenuId: this.parentId }
            }).then((res) => {
              this.visible = false
              this.loading = false
              this.$emit('ok', values)
              if (res.code) {
                this.$message.warning(res.message)
              } else {
                this.$message.success(res.message)
                this.form.resetFields()
              }
            })
          } else {
            this.loading = false
            this.$message.warning(this.$t('请选择文件'))
          }
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    handleChange (info) {
      this.loading = true
      if (info.file.status === 'uploading') {
        this.uploadMessage = this.$t('文件【{0}】上传中...', { 0: info.file.name })
      } else if (info.file.status === 'done') {
        this.loading = false
        this.uploadMessage = this.$t('文件【{0}】上传完成', { 0: info.file.name })
        this.fileName = info.file.response.result.fileName
      } else if (info.file.status === 'error') {
        this.loading = false
        this.uploadMessage = this.$t('文件【{0}】上传失败', { 0: info.file.name })
        this.fileName = ''
      }
    }
  }
}
</script>
