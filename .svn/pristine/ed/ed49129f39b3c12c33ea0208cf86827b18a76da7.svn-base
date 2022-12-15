<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-space direction="vertical" style="width: 100%">
      <a-card size="small" :title="$t('基础设置')">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span slot="label">
            {{ $t('系统名称') }}
            <a-tooltip :title="$t('为在线客服取个名字，用于访客端的title显示。输入范围：2-20个字。')">
              <a-icon type="question-circle" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
              'info[systemName]',
              {
                initialValue: data.systemName || '',
                rules: [{ transform: (value) => value.trim() }, { validator: checkName }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span slot="label">
            {{ $t('系统昵称') }}
            <a-tooltip
              :title="
                $t('系统昵称，访客被客服接待前，系统发送的展现形式为“客服消息”的消息，使用此昵称。输入范围：2-20个字。')
              "
            >
              <a-icon type="question-circle" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
              'info[systemNickname]',
              {
                initialValue: data.systemNickname || '',
                rules: [
                  { transform: (value) => value.trim() },
                  { validator: checkName },
                  { required: true, message: $t('请输入系统昵称') }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item :label="$t('部门分配分流')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-switch
            v-decorator="[
              'info[assignPercent]',
              {
                initialValue: data.assignPercent,
                valuePropName: 'checked'
              }
            ]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span slot="label">
            {{ $t('系统头像') }}
            <a-tooltip
              :title="
                $t(
                  '1、新建客服时，客服默认为此头像。\n2、访客被客服接待前，系统发送的展现形式为“客服消息”的消息，使用此头像。'
                )
              "
            >
              <a-icon type="question-circle" />
            </a-tooltip>
          </span>
          <a-upload
            v-decorator="[
              'info[systemAvatar]',
              {
                initialValue: avatar,
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
                rules: [{ required: true, message: $t('请上传头像') }]
              }
            ]"
            style="width: 58px; height: 58px; margin-bottom: 2px"
            :action="`${$store.state.env.VUE_APP_API_BASE_URL}admin/attachment/upload/?uploadName=upload`"
            :headers="{ 'Access-Token': $store.getters.userInfo.accessToken }"
            name="upload"
            accept="image/*"
            listType="picture-card"
            :before-upload="beforeUploadImage"
            @preview="handleImagePreview"
          >
            <div
              v-if="
                (!form.getFieldValue('info[systemAvatar]') && data.systemAvatar && data.systemAvatar.length == 0) ||
                (form.getFieldValue('info[systemAvatar]') && form.getFieldValue('info[systemAvatar]').length == 0)
              "
            >
              <a-icon type="plus" />
              <div>{{ $t('上传') }}</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img
              alt="example"
              style="width: 100%"
              :src="`${this.$store.state.env.VUE_APP_API_BASE_URL}admin/api/download/?filePath=${imagePreviewUrl}`"
            />
          </a-modal>
        </a-form-item>
      </a-card>
      <a-button type="primary" class="chatSettingSubmit" @click="handleSubmit">{{ $t('保存') }}</a-button>
    </a-space>
  </a-form>
</template>
<script>

export default {
  i18n: window.lang('chat'),
  components: {
    draggable: () => import('vuedraggable')
  },
  props: {
    baseAll: {
      type: Object,
      default () {
        return {}
      },
      required: true
    }
  },
  data () {
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 6 },
      form: this.$form.createForm(this),
      // 预览图片的路径
      imagePreviewUrl: '',
      // 控制发送图片预览
      previewVisible: false,
      avatar: [],
      data: []
    }
  },
  watch: {
    baseAll: {
      handler (newValue) {
        this.data = newValue
        this.avatar = [{
          uid: 'vc-upload-1631537507326-8',
          status: 'done',
          lastModified: this.moment().valueOf(),
          type: 'image/png',
          response: {
            code: 0,
            message: this.$t('操作成功'),
            result: {
              fileName: 'image.png',
              fileSize: 6471,
              filePath: this.data.systemAvatar || 'static/image/man.png',
              fileType: 'png'
            }
          },
          name: 'image.png',
          url: `${this.$store.state.env.VUE_APP_API_BASE_URL}admin/api/download/?filePath=${this.data.systemAvatar || 'static/image/man.png'}`
        }]
      },
      immediate: true
    }
  },
  methods: {
    // 显示名称验证是否重复
    checkName (rule, value, callback) {
      if (value) {
        if (value.length >= 2 && value.length <= 20) {
          callback()
        } else {
          const errorMessage = '系统名称输入范围：2-20个字符'
          callback(errorMessage)
        }
      } else {
        callback()
      }
    },
    // 上传图片限制
    beforeUploadImage (file, fileList, item) {
      return new Promise((resolve, reject) => {
        const isImage = file.type
        if (!isImage.includes('image')) {
          this.$message.error(this.$t('上传的是非图片格式'))
          this.uploadFormatImage = true
          return reject(file)
        }
        return resolve(file)
      })
    },
    normFile (e) {
      if (Array.isArray(e)) {
        return e
      }
      if (e.fileList.length > 0 && e.fileList.every(item => item.response)) {
        e.fileList = e.fileList.filter(item => item.response && item.response.code === 0)
      }
      return e && e.fileList
    },
    handleImagePreview (file) {
      this.imagePreviewUrl = file.response.result.filePath
      this.previewVisible = true
    },
    // 取消预览图片
    handleCancel () {
      this.previewVisible = false
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.info.systemAvatar = values.info.systemAvatar[0].response.result.filePath
          values.info.systemName = values.info.systemName.trim()
          values.info.systemNickname = values.info.systemNickname.trim()
          this.$emit('ok', true)
          this.axios({
            url: '/chat/setting/save',
            data: Object.assign(values, { action: 'submit' })
          }).then(res => {
            this.$emit('ok', false)
            if (res.code === 0) {
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    }
  }
}
</script>
