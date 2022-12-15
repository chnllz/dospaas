<template>
  <a-drawer :title="config.title || $t('详情')" :width="1200" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="false">
      <div style="display: flex; flex-direction: column">
        <a-form :labelCol="{ span: 2 }" :wrapperCol="{ span: 22 }">
          <a-form-item label="From">{{ mailInfo.senderDisplay || '--' }}</a-form-item>
          <a-form-item label="To">{{ mailInfo.senderToDisplay || '--' }}</a-form-item>
          <a-form-item label="Cc">{{ mailInfo.senderCcDisplay || '--' }}</a-form-item>
          <a-form-item label="Subject">{{ mailInfo.title || '--' }}</a-form-item>
          <a-form-item label="Time">
            {{ mailInfo.sendTime || '--' }} ({{ mailInfo.elapsedDay }} {{ mailInfo.elapsedDay > 1 ? 'days' : 'day' }})
          </a-form-item>
          <a-form-item label="File">
            <div v-if="mailInfo.attachment">
              <div v-for="(item, index) in mailInfo.attachment" :key="index">
                <a @click="downLoad(item)">{{ item.fileName }}</a>
              </div>
            </div>
            <div v-else>--</div>
          </a-form-item>
          <a-form-item v-if="config.type === 'workbench'" label="Workflow No">
            <!-- 工作台 邮件对话框点击的view详情 需要绑定工单号按钮 -->
            <div>
              <span style="margin-right: 8px">{{ config.data.caseNumber }}</span>
              <a @click="showModal = !showModal">{{ $t('绑定工单号') }}</a>
            </div>
          </a-form-item>
        </a-form>
        <div ref="iframewrapper" style="background: #f7f7f7; border-radius: 4px; flex: 1; padding: 8px" />
      </div>
      <div class="bbar">
        <a-button-group v-if="['in', 'out'].includes(config.type)">
          <a-button @click="reply('replay')">{{ $t('回复') }}</a-button>
          <a-button @click="reply('replyAll')">{{ $t('回复全部') }}</a-button>
          <a-button @click="reply('forward')">{{ $t('转发') }}</a-button>
        </a-button-group>
        <a-button v-if="config.type === 'workbench'" type="primary" @click="createOrder">{{ $t('创建工单') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
    <a-modal
      v-model="showModal"
      :title="$t('绑定工单号')"
      :ok-text="$t('保存')"
      :cancel-text="$t('关闭')"
      :destroyOnClose="true"
      @ok="handleSave"
    >
      <a-form :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }" :form="form">
        <a-form-item :label="$t('工单号')">
          <a-input
            v-decorator="[
              'gdh',
              {
                initialValue:
                  mailForm && mailForm.gdh ? mailForm.gdh : config.type === 'workbench' ? config.data.caseNumber : '',
                rules: [{ required: true, message: $t('请输入工单号') }]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <MailView ref="MailView" />
    <workflow-handle-form ref="workflowHandleForm" @ok="submitReturn" />
  </a-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  i18n: window.lang('mail'),
  components: {
    MailView: () => import('./MailView'),
    WorkflowHandleForm: () => import('@/views/admin/WorkflowHandleForm')
  },
  data () {
    return {
      config: {},
      visible: false,
      mailForm: {},
      showModal: false,
      mailInfo: {},
      form: this.$form.createForm(this)
    }
  },
  computed: {
    ...mapGetters(['setting'])
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.axios({
        url: '/mail/data/getMailInfo',
        data: { id: [config.data.id] }
      }).then(res => {
        this.mailInfo = res.result
        this.mailInfo.content = this.mailInfo.content.replace(/<link.*\.js.*>/g, '').replace(/<iframe.*<\/iframe>/g, '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        const ifr = document.createElement('iframe')
        ifr.setAttribute('frameborder', '0')
        ifr.setAttribute('id', 'iframeResult')
        ifr.setAttribute('width', '100%')
        ifr.setAttribute('height', '100%')
        this.$refs.iframewrapper.innerHTML = ''
        this.$refs.iframewrapper.appendChild(ifr)
        const ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument
        ifrw.document.open()
        ifrw.document.write(this.mailInfo.content)
        ifrw.document.close()
        if (config.data.isread === 0 && config.type === 'in') {
          this.$emit('ok')
        }
      })
    },
    createOrder () {
      this.$refs.workflowHandleForm.show({
        config: {
          title: this.$t('创建流程'),
          width: 1200,
          tplviewUrl: '/admin/wcase/add/?action=getview',
          url: '/admin/wcase/add?action=submit',
          workflowId: 'e73f17b8d1e94d76bbd636b0cb63d64c',
          parameter: {},
          viewType: 'create'
        }
      })
    },
    // 绑定工单号提交
    handleSave () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          if (values.gdh === this.config.data.caseNumber) {
            this.showModal = false
            this.$message.error(this.$t('未修改工单号'))
            return
          }
          this.axios({
            url: '/crm/assist/rebindWorkOrderNumber',
            data: {
              oldWorkOrderNumber: this.config.data.caseNumber,
              newWorkOrderNumber: values.gdh,
              emailNumber: this.config.data.number || ''
            }
          }).then((res) => {
            if (res.code === 0) {
              this.showModal = false
              this.config.data.caseNumber = values.gdh
              this.visible = false
              this.$emit('ok')
              this.$message.success(this.$t('操作成功'))
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    reply (str) {
      // type: in 收件箱 out 发件箱
      // string: replay 回复 replyAll 回复全部 forward 转发
      this.$refs.MailView.show({
        headTitle: str === 'forward' ? this.$t('转发邮件') : this.$t('回复邮件'),
        action: 'reply',
        data: this.mailInfo,
        string: str,
        type: this.$route.query.type,
        isOnlyMail: true // true-纯邮件功能，不用解析变量  false 工单关联邮件功能， 需要解析变量
      })
    },
    downLoad (item) {
      let fileName = item.fileName.includes('.') ? item.fileName.substring(0, item.fileName.lastIndexOf('.')) : item.fileName
      const filePath = encodeURIComponent(item.filePath)
      fileName = encodeURIComponent(fileName)
      window.open(this.$store.state.env.VUE_APP_API_BASE_URL + 'admin/api/download/?filePath=' + filePath + '&fileName=' + fileName)
    },
    submitReturn (data, params) {
      if (params.submitType === 'submitSend') {
        this.axios({
          url: '/crm/assist/preSendInfo',
          data: {
            orderNo: data.result.ddh,
            workOrderNumber: data.result.caseNumber,
            sid: this.$store.getters.userInfo.sid
          }
        }).then(res => {
          const createItem = {
            workOrderNumber: data.result.caseNumber,
            senderTo: res.result.yxdz,
            sender: res.result.sender
          }
          this.$refs.MailView.show({
            mailShowType: 'workbench',
            headTitle: this.$t('写邮件'),
            action: 'create',
            data: createItem,
            url: '/crm/assist/replyMail',
            formData: data.result,
            orderData: data.result,
            isOnlyMail: false // true-纯邮件功能，不用解析变量  false-工单关联邮件功能，需要解析变量
          })
        })
      }
    }
  }
}
</script>
