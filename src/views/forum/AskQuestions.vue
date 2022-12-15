<template>
  <a-drawer :title="config.title" :width="900" :visible="visible" :destroyOnClose="true" @close="visible = !visible">
    <a-spin :spinning="false">
      <a-form :form="form">
        <a-form-item :label="$t('问题')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea
            v-decorator="[
              'title',
              {
                initialValue: setData.title || '',
                rules: [{ required: true, message: $t('问题不能为空') }]
              }
            ]"
            :auto-size="{ minRows: 6, maxRows: 10 }"
            :placeholder="$t('请输入问题。提问应遵循客观、明确的原则，结尾建议加“？”')"
          />
        </a-form-item>
        <a-form-item :label="$t('所属分类')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[
              'categoryNumber',
              {
                initialValue: setData.categoryNumber || undefined,
                rules: [{ required: true, message: $t('所属分类不能为空') }]
              }
            ]"
            :placeholder="$t('请选择至少一个分类')"
            mode="multiple"
            allowClear
          >
            <a-select-option v-for="value in categroy" :key="value.id" :value="value.number">
              {{ value.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('热门分类')" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
          <a-button
            v-for="value in hotCategroy"
            :key="value.number"
            style="margin-right: 10px; padding: 0px 20px"
            @click="pushCategory(value)"
          >
            {{ value.name }}
          </a-button>
        </a-form-item>
        <a-form-item :label="$t('问题描述')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea
            v-decorator="[
              'content',
              {
                initialValue: setData.content || ''
              }
            ]"
            :auto-size="{ minRows: 10, maxRows: 15 }"
          />
        </a-form-item>
        <a-form-item label=" " :colon="false" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <div style="display: flex; flex-flow: column wrap">
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
                <div style="width: 60px; height: 40px; margin: auto">
                  {{ $t('视频上传') }}
                </div>
              </div>
            </a-upload>
          </div>
          <div style="display: flex; flex-flow: column wrap">
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
                <div style="width: 60px; height: 40px; margin: auto">
                  {{ $t('图片上传') }}
                </div>
              </div>
            </a-upload>
          </div>
        </a-form-item>
      </a-form>
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  i18n: window.lang('forum'),
  data () {
    return {
      visible: false,
      config: {},
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      form: this.$form.createForm(this),
      setData: {},
      categroy: [],
      hotCategroy: [],
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
      this.visible = true
      this.config = config
      this.setData = {}
      this.fileList = []
      this.videoList = []
      this.axios({
        url: '/forum/setting/getCategorys',
        data: { recommended: '0' }
      }).then(res => {
        this.categroy = res.result.data
      })
      this.axios({
        url: '/forum/setting/getCategorys',
        data: { recommended: '1' }
      }).then(res => {
        this.hotCategroy = res.result.data
      })
      if (config.action === 'edit') {
        this.setData = JSON.parse(JSON.stringify(config.data))
        this.setData.categoryNumber = config.data.categoryNumber.split(',')
        if (config.data.images && config.data.images.length > 0) {
          config.data.images.forEach((item, index) => {
            const obj = {}
            obj.uid = index
            obj.name = item
            obj.status = 'done'
            obj.url = this.setting.rootUrl + item
            obj.thumbUrl = this.setting.rootUrl + item
            this.fileList.push(obj)
          })
        }
        if (config.data.videos) {
          const video = {}
          video.uid = config.data.number
          video.name = config.data.videos
          video.status = 'done'
          video.url = this.setting.rootUrl + config.data.videos
          video.thumbUrl = this.setting.rootUrl + config.data.videos
          this.videoList.push(video)
        }
      }
    },
    pushCategory (value) {
      const number = this.form.getFieldsValue().categoryNumber || []
      if (number.indexOf(value.number) === -1) {
        number.push(value.number)
        this.form.setFieldsValue({
          'categoryNumber': number
        })
      }
    },
    beforeUpload (file) {
      this.isLt2M = file.size / 1024 / 1024 < 2
      if (!this.isLt2M) {
        this.$message.error(this.$t('图片大小不能超过 2MB!'))
      }
      return !this.isLt2M
    },
    handlePreview (file) {
      const name = '.tp'
      const viewer = this.$el.querySelector(name).$viewer
      viewer.view(file.uid)
    },
    handleChange ({ fileList }) {
      this.fileList = fileList.filter(item => item.status !== 'error')
    },
    handleVideoChange ({ fileList }) {
      this.videoList = fileList
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.categoryNumber = values.categoryNumber.toString()
          const images = []
          this.fileList.forEach(item => {
            if (item.response) {
              images.push(item.response.result.filePath)
            } else {
              images.push(item.name)
            }
          })
          values.images = images
          if (this.config.action === 'edit') {
            values.number = this.config.data.number
          }
          let video = ''
          this.videoList.forEach(item => {
            if (item.response) {
              video = item.response.result.filePath
            } else {
              video = item.name
            }
          })
          values.videos = video
          this.axios({
            url: '/forum/index/saveQuestion',
            data: values
          }).then(res => {
            if (!res.code) {
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
            this.$emit('ok', '')
            this.visible = false
          })
        }
      })
    }
  }
}
</script>
