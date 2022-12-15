<template>
  <a-drawer :destroyOnClose="true" :title="config.title" :width="600" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item>
          <a-textarea
            v-decorator="[
              'content',
              {
                initialValue: config.content ? config.content.content : '',
                rules: [{ required: true, message: '回答内容不能为空' }]
              }
            ]"
            :auto-size="{ minRows: 10, maxRows: 15 }"
            placeholder="请输入回答内容"
          />
        </a-form-item>
        <a-form-item>
          <div style="display: flex; flex-flow: column wrap">
            <div style="display: flex; flex-flow: column wrap; flex: 1">
              <a-upload
                :action="`${$store.state.env.VUE_APP_API_BASE_URL}admin/attachment/upload/?uploadName=upload`"
                :headers="{ 'Access-Token': $store.getters.userInfo.accessToken }"
                list-type="picture-card"
                :file-list="videoList"
                accept="video/*"
                style="flex: 1"
                name="upload"
                @change="handleVideoChange"
              >
                <div v-if="videoList.length < 1">
                  <a-icon type="plus" />
                  <div style="width: 60px; height: 40px; margin: auto">视频上传</div>
                </div>
              </a-upload>
            </div>
            <div style="display: flex; flex-flow: column wrap; flex: 1">
              <a-upload
                v-viewer
                :action="`${$store.state.env.VUE_APP_API_BASE_URL}admin/attachment/upload/?uploadName=upload`"
                :headers="{ 'Access-Token': $store.getters.userInfo.accessToken }"
                list-type="picture-card"
                :file-list="fileList"
                accept="image/*"
                :multiple="true"
                style="flex: 1"
                name="upload"
                class="tp"
                @preview="handlePreview"
                @change="handleChange"
              >
                <div v-if="fileList.length < 8">
                  <a-icon type="plus" />
                  <div style="width: 60px; height: 40px; margin: auto">图片上传</div>
                </div>
              </a-upload>
            </div>
          </div>
        </a-form-item>
      </a-form>
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">保存</a-button>
        <a-button @click="visible = !visible">关闭</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      config: {},
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      fileList: [],
      isLt2M: true,
      videoList: []

    }
  },
  computed: {
    ...mapGetters(['userInfo', 'setting'])
  },
  methods: {
    show (config) {
      this.config = config
      this.visible = true
      this.fileList = []
      if (config.action === 'edit') {
        config.content.images.forEach((item, index) => {
          const obj = {}
          obj.uid = index
          obj.name = item
          obj.status = 'done'
          obj.url = this.setting.rootUrl + item
          obj.thumbUrl = this.setting.rootUrl + item
          this.fileList.push(obj)
        })
        if (config.content.videos) {
          const video = {}
          video.uid = config.content.number
          video.name = config.content.videos
          video.status = 'done'
          video.url = this.setting.rootUrl + config.content.videos
          video.thumbUrl = this.setting.rootUrl + config.content.videos
          this.videoList.push(video)
        }
      }
    },
    handlePreview (file) {
      const name = '.tp'
      const viewer = this.$el.querySelector(name).$viewer
      viewer.view(file.uid)
    },
    handleChange ({ fileList }) {
      this.fileList = fileList.filter(item => item.status !== 'error')
    },
    beforeUpload (file) {
      this.isLt2M = file.size / 1024 / 1024 < 2
      if (!this.isLt2M) {
        this.$message.error('图片大小不能超过 2MB!')
      }
      return !this.isLt2M
    },
    handleVideoChange ({ fileList }) {
      this.videoList = fileList
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          values.number = this.config.data.number
          const images = []
          this.fileList.forEach(item => {
            if (item.response) {
              images.push(item.response.result.filePath)
            } else {
              images.push(item.name)
            }
          })
          values.images = images
          let video = ''
          this.videoList.forEach(item => {
            if (item.response) {
              video = item.response.result.filePath
            } else {
              video = item.name
            }
          })
          values.videos = video
          if (this.config.action === 'edit') {
            values.answerNumber = this.config.content.number
          }
          this.axios({
            url: '/forum/index/saveAnswer',
            data: values
          }).then(res => {
            if (!res.code) {
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
            this.loading = false
            this.visible = false
            this.$emit('ok', '')
          })
        }
      })
    }
  }
}
</script>
