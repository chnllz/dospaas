<template>
  <a-drawer
    :destroyOnClose="true"
    :title="config.headTitle"
    :width="1100"
    :visible="visible"
    @close="visible = !visible"
  >
    <a-spin
      :spinning="$store.state.app.globalSpin.spinning || loadingIndex"
      :tip="$store.state.app.globalSpin.tip"
      :size="$store.state.app.globalSpin.size"
    >
      <mail-card-details
        ref="mailCardDetails"
        :infoData="Object.assign(infoData, { isOnlyMail: isOnlyMailBool })"
        :imageFileList="imageFileList"
        @handleImageChange="handleImageChange"
      />
      <div class="bbar">
        <template v-if="$route.query.type !== 'deleted'">
          <a-button type="primary" @click="sendMail('out')">{{ $t('发送') }}</a-button>
          <a-button @click="sendMail('draft')">{{ $t('存草稿') }}</a-button>
        </template>
        <a-button @click="visible = !visible">{{ $t('取消') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('mail'),
  components: {
    MailCardDetails: () => import('@/views/mail/MailCardDetails')
  },
  data () {
    return {
      infoData: {},
      form: this.$form.createForm(this),
      imageFileList: [],
      imagePreviewVisible: false,
      config: {},
      visible: false,
      loadingIndex: false,
      isOnlyMailBool: true,
      workOrderNumber: ''
    }
  },
  methods: {
    show (config) {
      this.imageFileList = []
      this.visible = true
      this.config = config
      this.infoData = JSON.parse(JSON.stringify(config))
      const data = config.data
      this.workOrderNumber = data.workOrderNumber || data.caseNumber
      // 判断父组件进来的是否纯邮件功能，如果为false表示邮件模板需要解析变量  为true表示 不用解析
      // 工单关联的邮件功能需要解析变量，纯邮件的功能不需要解析变量
      if (config && !config.isOnlyMail) {
        this.isOnlyMailBool = false
      }
      if (config.type === 'in') {
        this.infoData.data.sender = data.senderTo
        switch (config.string) {
          case 'replay':
            this.infoData.data.senderTo = data.sender
            this.infoData.data.senderCc = undefined
            this.infoData.data.senderBcc = undefined
            this.infoData.data.title = this.infoData.data.title ? this.infoData.data.title.replace(/Re: |Fw: /, '') : ''
            if (this.infoData.data.title && !this.infoData.data.title.includes('Re: ')) {
              this.infoData.data.title = 'Re: ' + this.infoData.data.title
            }
            break
          case 'replyAll':
            const display = data.senderToDisplay
            let email = display.match(/<(.+?)>/g) || []
            if (email) {
              email = email.map(item => {
                return item.replace(/<|>/g, '')
              }).filter(item => item !== data.senderTo)
              email.push(data.sender)
            }
            this.infoData.data.senderTo = email.join(';')
            this.infoData.data.senderCc = data.senderCc
            this.infoData.data.title = this.infoData.data.title ? this.infoData.data.title.replace(/Re: |Fw: /, '') : ''
            if (this.infoData.data.title && !this.infoData.data.title.includes('Re: ')) {
              this.infoData.data.title = 'Re: ' + this.infoData.data.title
            }
            break
          case 'forward':
            this.infoData.data.senderTo = this.infoData.data.senderCc = undefined
            this.infoData.data.title = this.infoData.data.title ? this.infoData.data.title.replace(/Re: |Fw: /, '') : ''
            if (this.infoData.data.title && !this.infoData.data.title.includes('Fw: ')) {
              this.infoData.data.title = 'Fw: ' + this.infoData.data.title
            }
            this.imageFileList = data.attachment.map((item, index) => {
              const obj = {
                uid: index,
                name: item.fileName,
                status: 'done',
                url: this.$store.state.env.VUE_APP_API_BASE_URL + 'admin/api/download/?filePath=' + item.filePath,
                response: { result: { filePath: item.filePath } }
              }
              return obj
            })
            break
        }
      } else if (config.type === 'out') {
        switch (config.string) {
          case 'replay':
            this.infoData.data.senderCc = undefined
            this.infoData.data.senderBcc = undefined
            this.infoData.data.title = this.infoData.data.title ? this.infoData.data.title.replace(/Re: |Fw: /, '') : ''
            if (this.infoData.data.title && !this.infoData.data.title.includes('Re: ')) {
              this.infoData.data.title = 'Re: ' + this.infoData.data.title
            }
            break
          case 'replyAll':
            // this.infoData.data.senderCc = undefined
            this.infoData.data.title = this.infoData.data.title ? this.infoData.data.title.replace(/Re: |Fw: /, '') : ''
            if (this.infoData.data.title && !this.infoData.data.title.includes('Re: ')) {
              this.infoData.data.title = 'Re: ' + this.infoData.data.title
            }
            break
          case 'forward':
            this.infoData.data.senderTo = this.infoData.data.senderCc = undefined
            this.infoData.data.title = this.infoData.data.title ? this.infoData.data.title.replace(/Re: |Fw: /, '') : ''
            if (this.infoData.data.title && !this.infoData.data.title.includes('Fw: ')) {
              this.infoData.data.title = 'Fw: ' + this.infoData.data.title
            }
            break
        }
      }
      if (config.action === 'draft_mail') {
        this.loadingIndex = true
        this.axios({
          url: '/mail/data/getMailInfo',
          data: { id: [config.data.id] }
        }).then(res => {
          this.loadingIndex = false
          res.result.senderBcc = res.result.senderBcc ? res.result.senderBcc.split(',').join(';') : ''
          res.result.senderCc = res.result.senderCc ? res.result.senderCc.split(',').join(';') : ''
          res.result.senderTo = res.result.senderTo ? res.result.senderTo.split(',').join(';') : ''
          this.infoData.data = res.result
          this.$refs.mailCardDetails.textContent = res.result.content || ''
          if (res.result.attachment && res.result.attachment.length > 0) {
            this.imageFileList = res.result.attachment.map((item, index) => {
              const obj = {
                uid: index,
                name: item.fileName,
                status: 'done',
                url: this.$store.state.env.VUE_APP_API_BASE_URL + 'admin/api/download/?filePath=' + item.filePath,
                response: { result: { filePath: item.filePath, fileName: item.fileName } }
              }
              return obj
            })
          }
        })
      }
    },
    handleImageChange (fileList) {
      this.imageFileList = fileList
    },
    sendMail (str) {
      this.$refs.mailCardDetails.form.validateFields((errors, values) => {
        if (!errors) {
          this.loadingIndex = true
          let imageFileList = []
          if (this.imageFileList.length > 0) {
            imageFileList = this.imageFileList.map(item => {
              const obj = {
                fileName: item.response.result.fileName,
                filePath: item.response.result.filePath
              }
              return obj
            })
          }
          values.files = imageFileList
          let content = ''
          // 正则匹配发件人收件人邮箱改成字符格式标签  防止 在html直接当成标签解析 如 <123.com>在页面上v-html直接被解析成 <123.com></123.com> 导致不显示
          if (this.config.action !== 'create') {
            this.infoData.data.senderDisplay = this.infoData.data.senderDisplay ? this.infoData.data.senderDisplay.replace(/</, '&lt;').replace(/>/, '&gt;') : ''
            this.infoData.data.senderToDisplay = this.infoData.data.senderToDisplay ? this.infoData.data.senderToDisplay.replace(/</, '&lt;').replace(/>/, '&gt;') : ''
            const title = this.infoData.data.title ? this.infoData.data.title.replace(/Re: |Fw: /, '') : ''
            content = this.$refs.mailCardDetails.textContent + `<br /><br /><hr style="width: 100%; height: 1px;" align="left" size="1" />
        <div style="background: #EEE">
         <div><span style="font-weight: 600">From：</span><span> ${this.infoData.data.senderDisplay || '--'}</span></div>
         <div><span style="font-weight: 600">Time：</span><span>${this.infoData.data.sendTime || '--'}</span></div>
         <div><span style="font-weight: 600">To：</span><span> ${this.infoData.data.senderToDisplay || '--'}</span></div>
         <div><span style="font-weight: 600">Subject：</span><span>${title || '--'}</span></div>
        </div>
        ` + this.$refs.mailCardDetails.InitContent || ''
          } else {
            content = this.$refs.mailCardDetails.textContent + this.$refs.mailCardDetails.InitContent
            values.content = content
          }
          values.content = content
          if (values.bccs) {
            values.bccs = values.bccs.split(';').filter(item => item) // 暗送人
          } else {
            values.bccs = []
          }
          if (values.ccs) {
            values.ccs = values.ccs.split(';').filter(item => item) // 抄送人
          } else {
            values.ccs = []
          }
          if (values.tos) {
            values.tos = values.tos.split(';').filter(item => item) // 收件人
          } else {
            values.tos = []
          }
          if (str === 'draft' || this.config.action === 'draft_mail') {
            // 保存为草稿时传，否则不传 id: '',tab: ''
            values = Object.assign(values, {
              id: this.infoData.data.id
            })
          }
          let url = str === 'draft' ? '/mail/data/addDraft' : '/mail/data/send'
          if (this.config.url) { // 父组件带上了url参数  接口的请求json参数 要改成如下
            url = str === 'draft' ? this.config.draftUrl : this.config.url
            values = {
              mailData: values
            }
            values.workOrderNumber = this.workOrderNumber
          }
          this.axios({
            url: url,
            data: values
          }).then((res) => {
            if (res.code === 0) {
              this.visible = false
              this.$message.success(this.$t('操作成功'))
              this.$emit('ok', '')
            } else {
              this.$message.error(res.message)
            }
            this.loadingIndex = false
          })
        }
      })
    }
  }
}
</script>
