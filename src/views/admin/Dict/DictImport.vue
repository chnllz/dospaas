<template>
  <a-modal
    :title="config.title"
    :width="600"
    :visible="visible"
    :confirmLoading="loading"
    @ok="handleSubmit"
    @cancel="visible = !visible"
  >
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-upload
          v-decorator="['file']"
          :action="`${$store.state.env.VUE_APP_API_BASE_URL}${config.url}?type=uploadFile`"
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
      </a-form>
    </a-spin>
  </a-modal>
</template>
<script>
export default {
  data () {
    return {
      config: {},
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      fileName: '',
      uploadMessage: this.$t('请选择要导入的文件')
    }
  },
  methods: {
    show (config) {
      this.config = config
      this.visible = true
      this.fileName = ''
      this.uploadMessage = this.$t('请选择要导入的文件')
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
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          if (this.fileName) {
            this.loading = true
            this.axios({
              url: this.config.url,
              data: { fileName: this.fileName, parentNubmer: this.config.parentNubmer }
            }).then((res) => {
              this.loading = false
              this.$emit('ok', values)
              if (res.code) {
                this.$message.warning(res.message)
              } else {
                this.visible = false
                this.$message.success(res.message)
                this.form.resetFields()
              }
            })
          } else {
            this.$message.warning(this.$t('请选择要导入的文件'))
          }
        }
      })
    }
  }
}
</script>
