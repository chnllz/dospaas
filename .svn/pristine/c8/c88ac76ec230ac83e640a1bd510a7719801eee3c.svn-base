<template>
  <div>
    <!-- <a-button @click="show"></a-button> -->
    <a-drawer
      :destroyOnClose="true"
      :title="$t('详情')"
      :width="1300"
      :visible="visible"
      :getContainer="false"
      @close="visible = !visible"
    >
      <a-spin :spinning="loading">
        <div>
          <a-row type="flex" :gutter="32">
            <a-col :span="12">
              <div>
                <div class="title">{{ $t('工单信息') }}</div>
                <a-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-form-item :label="$t('工单号')">
                    <a-input
                      v-decorator="[
                        'gdbh',
                        {
                          initialValue: apiData ? apiData.afterPay.gdbh : '',
                          rules: [{ required: true, message: $t('请输入工单号') }]
                        }
                      ]"
                      disabled
                      :placeholder="$t('请输入工单号')"
                    />
                  </a-form-item>
                  <a-form-item :label="$t('状态')">
                    <a-select
                      v-decorator="[
                        'status',
                        {
                          initialValue: apiData ? apiData.afterPay.status : undefined,
                          rules: [{ required: true, message: $t('请选择状态') }]
                        }
                      ]"
                      disabled
                      :placeholder="$t('请选择状态')"
                    >
                      <a-select-option v-for="item in statusList" :key="item.value" :value="item.value">
                        {{ item.label }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item :label="$t('订单号')">
                    <a-input
                      v-decorator="[
                        'orderId',
                        {
                          initialValue: apiData ? apiData.afterPay.orderId : '',
                          rules: [{ required: true, message: $t('请输入订单号') }]
                        }
                      ]"
                      disabled
                      :placeholder="$t('请输入订单号')"
                    />
                  </a-form-item>
                  <a-form-item :label="$t('客服')">
                    <a-input
                      v-decorator="['service', { initialValue: apiData ? apiData.afterPay.service : '' }]"
                      disabled
                    />
                  </a-form-item>
                  <a-form-item :label="$t('站点')">
                    <a-input v-decorator="['site', { initialValue: apiData ? apiData.afterPay.site : '' }]" disabled />
                  </a-form-item>
                </a-form>
              </div>
              <div>
                <div class="title" style="margin-top: 16px">{{ $t('邮件记录') }}</div>
                <div style="border-top: 1px solid #eee; border-bottom: 1px solid #eee">
                  <a-row :gutter="16" style="padding: 16px 0">
                    <a-col :span="2"></a-col>
                    <a-col :span="9" class="mailRecordTitle">{{ $t('发件人') }}</a-col>
                    <a-col :span="9" class="mailRecordTitle">{{ $t('主题') }}</a-col>
                    <a-col :span="4" class="mailRecordTitle">{{ $t('时间') }}</a-col>
                  </a-row>
                </div>
                <div style="height: calc(100vh - 460px); overflow: hidden auto">
                  <div
                    v-for="(mailItem, mailIndex) in apiData.mailData"
                    :key="mailIndex"
                    :style="{
                      'border-radius': '4px',
                      cursor: 'pointer',
                      'border-bottom': '1px solid #EEE',
                      background: clickIndex === mailIndex ? '#1890FF' : '',
                      color: clickIndex === mailIndex ? 'white' : ''
                    }"
                    @click="showMailInfo(mailItem.id, mailIndex)"
                  >
                    <a-row :gutter="16" style="padding: 16px 0" type="flex" align="middle">
                      <a-col :span="2" style="text-align: center; color: #d9d9d9">
                        <a-icon v-if="mailItem.type === 1" :component="outSvg" style="font-size: 24px; color: red" />
                        <a-icon v-else :component="inSvg" style="font-size: 24px" />
                      </a-col>
                      <a-col :span="9" style="text-align: center">{{ mailItem.sender }}</a-col>
                      <a-col :span="9" style="text-align: center">{{ mailItem.title }}</a-col>
                      <a-col :span="4" style="text-align: center">{{ mailItem.sendTime }}</a-col>
                    </a-row>
                  </div>
                </div>
              </div>
            </a-col>
            <a-col :span="12">
              <div class="title">{{ $t('邮件详情') }}</div>
              <div :style="{ height: mailInfo.content ? 'calc(100vh - 164px)' : '', overflow: 'hidden auto' }">
                <a-form :labelCol="{ span: 5 }" :wrapperCol="{ span: 19 }" style="background: #eee">
                  <a-form-item :label="$t('发件人')">{{ mailInfo.senderDisplay || '--' }}</a-form-item>
                  <a-form-item :label="$t('发送时间')">{{ mailInfo.sendTime || '--' }}</a-form-item>
                  <a-form-item :label="$t('收件人')">{{ mailInfo.senderToDisplay || '--' }}</a-form-item>
                  <a-form-item :label="$t('主题')">{{ mailInfo.title || '--' }}</a-form-item>
                  <a-form-item v-if="mailInfo.attachment" :label="$t('附件')">
                    <div>
                      <div v-for="(item, index) in mailInfo.attachment" :key="index">
                        <a @click="downLoad(item)">{{ item.fileName }}</a>
                      </div>
                    </div>
                  </a-form-item>
                  <div v-dompurify-html="mailInfo.content" style="padding: 8px; background: #f5f5f5"></div>
                </a-form>
              </div>
            </a-col>
          </a-row>
        </div>
        <div class="bbar">
          <a-button-group>
            <a-button @click="reply('replay')">{{ $t('回复') }}</a-button>
            <a-button @click="reply('replyAll')">{{ $t('回复全部') }}</a-button>
            <a-button @click="reply('forward')">{{ $t('转发') }}</a-button>
          </a-button-group>
          <!-- <a-button type="primary" @click="handleSubmit">发送</a-button> -->
          <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
        </div>
      </a-spin>
      <MailView ref="MailView" />
    </a-drawer>
  </div>
</template>
<script>
export default {
  i18n: window.lang('crm'),
  components: {
    MailView: () => import('@/views/mail/MailView')
  },
  data () {
    return {
      config: {},
      clickIndex: -1,
      apiData: '',
      mailInfo: '',
      loading: false,
      visible: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: this.$form.createForm(this),
      outSvg: {
        template: `<svg t="1633766165852" viewBox="0 0 1000 1000" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3844" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M661.43 259.774h-364.149c-28.44 0-51.491 23.051-51.491 51.491v364.149c0 28.44 23.051 51.491 51.491 51.491s51.491-23.051 51.491-51.491v-239.829l349.073 349.073c20.119 20.119 52.711 20.119 72.831 0s20.119-52.711 0-72.831l-349.073-349.073h239.829c14.202 0.001 27.093-5.754 36.415-15.076s15.094-22.195 15.076-36.415c0-28.44-23.051-51.491-51.491-51.491z" p-id="3845" fill="#bfbfbf"></path></svg>`
      },
      inSvg: {
        template: `<svg t="1633766293190" viewBox="0 0 1000 1000" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4297" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M362.57 764.226h364.149c28.44 0 51.491-23.051 51.491-51.491v-364.149c0-28.44-23.051-51.491-51.491-51.491s-51.491 23.051-51.491 51.491v239.829l-349.073-349.073c-20.119-20.119-52.711-20.119-72.831 0s-20.119 52.711 0 72.831l349.073 349.073h-239.829c-14.202-0.001-27.093 5.754-36.415 15.076s-15.094 22.195-15.076 36.415c0 28.44 23.051 51.491 51.491 51.491z" p-id="4298" fill="#bfbfbf"></path></svg>`
      },
      statusList: [{
        label: this.$t('待回复'),
        value: 'waitReply'
      }, {
        label: this.$t('已回复'),
        value: 'replied'
      }, {
        label: this.$t('已解决'),
        value: 'resolved'
      }],
      mailsList: []
    }
  },
  mounted () {
  },
  methods: {
    show (config) {
      this.apiData = ''
      this.clickIndex = -1
      this.mailInfo = ''
      this.visible = true
      this.config = config
      this.loading = true
      this.axios({
        url: `/pay/after/detail/${config.record.id}`
      }).then(res => {
        this.loading = false
        this.apiData = res.result
        this.apiData.mailData.forEach(element => {
          const date = element.sendTime.split(' ')
          const month = date[0].split('-')
          element.sendTime = month[1] + '-' + month[2]
        })
      })
    },
    showMailInfo (id, index) {
      this.clickIndex = index
      this.axios({
        url: '/mail/data/getMailInfo',
        data: { id: [id] }
      }).then(res => {
        this.mailInfo = res.result
        this.mailInfo.content = this.mailInfo.content.replace(/(<head[^>]*>(?:(?!<\/head>)[\s\S])*<\/head>)|(<style[^>]*>(?:(?!<\/style>)[\s\S])*<\/style>)/gi, '')
      })
    },
    reply (str) {
      if (this.clickIndex === -1) {
        this.$message.warning(this.$t('请先选择邮件'))
        return
      }
      delete this.apiData.afterPay.sender // 这里接口工单表单数据返回了 sender 删掉该字段 再Object.assign
      // type: in 收件箱 out 发件箱
      // string: replay 回复 replyAll 回复全部 forward 转发
      this.$refs.MailView.show({
        headTitle: this.$t('回复邮件'),
        action: 'reply',
        data: Object.assign(this.mailInfo, this.apiData.afterPay),
        orderStatus: this.apiData.afterPay.ddzt || '',
        formData: Object.assign(this.mailInfo, this.apiData.afterPay, { ddh: this.apiData.afterPay.orderId || '' }),
        url: '/pay/after/replyMail',
        draftUrl: '/pay/after/saveDraft',
        string: str,
        type: 'in',
        isOnlyMail: false // true-纯邮件功能，不用解析变量  false 工单关联邮件功能， 需要解析变量
      })
    },
    downLoad (item) {
      let fileName = item.fileName.includes('.') ? item.fileName.substring(0, item.fileName.lastIndexOf('.')) : item.fileName
      const filePath = encodeURIComponent(item.filePath)
      fileName = encodeURIComponent(fileName)
      window.open(this.$store.state.env.VUE_APP_API_BASE_URL + 'admin/api/download/?filePath=' + filePath + '&fileName=' + fileName)
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  font-size: 15px;
  font-weight: 700;
  margin: 0 0 16px 0;
}
.mailRecordTitle {
  font-weight: 600;
  text-align: center;
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 6px;
  scrollbar-arrow-color: red;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  scrollbar-arrow-color: red;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>
