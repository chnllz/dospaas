<template>
  <a-modal
    :destroyOnClose="true"
    :title="$t('取消')"
    :width="600"
    :maskClosable="!buttonLoading"
    :closable="!buttonLoading"
    :confirmLoading="buttonLoading"
    :okText="okText"
    :visible="visible"
    @cancel="visible = !visible"
    @ok="handleSubmit"
  >
    <a-spin :spinning="buttonLoading">
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }" :label="$t('取消原因')">
          <a-select
            v-decorator="['action', { rules: [{ required: true, message: $t('取消原因不能为空') }] }]"
            show-search
            @change="onChange"
          >
            <a-select-option v-for="(myitem, myindex) in terminateReasons" :key="myindex" :value="myitem.name">
              {{ myitem.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }" :label="$t('取消备注')">
          <a-textarea
            v-decorator="['remark', { rules: [{ required: remarkFlag, message: $t('取消原因不能为空') }] }]"
            :rows="6"
          ></a-textarea>
        </a-form-item>
        <a-form-item
          v-if="handleCompel === 'visit'"
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 20 }"
          :label="$t('强制取消')"
        >
          <a-checkbox v-decorator="['handleCompel', { valuePropName: 'checked' }]"></a-checkbox>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  i18n: window.lang('admin'),
  data () {
    return {
      visible: false,
      okText: this.$t('确定'),
      buttonLoading: false,
      form: this.$form.createForm(this),
      config: {},
      remark: '',
      terminateReasons: [],
      wait: null,
      timer: null,
      loading: false,
      codeShow: false,
      handleCompel: '',
      remarkFlag: false,
      // 取消流程信息
      isCancelInfo: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'setting'])
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.axios({
        url: 'order/fuWuDan/getApplyCancelConfig'
      }).then(res => {
        // 系统配置取消角色选择
        this.isCancelInfo = res.result
        // 符合申请取消角色 并且 工单为服务单
        if (this.isCancelInfo.exist && this.config.record.workflowId === '48a1b86d51c646f9b965b9e42d6772f0') {
          this.codeShow = true
          this.okText = this.$t('申请取消')
        } else {
          this.codeShow = false
          this.okText = this.$t('确定')
        }
        this.axios({
          url: '/admin/workflow/getWorkflowSet',
          data: { caseId: this.config.caseId, type: 'terminateReasons', workflowId: config.workflowId }
        }).then(res => {
          this.terminateReasons = res.result.data
          this.handleCompel = res.result.priv
        })
      })
    },
    onChange (value) {
      if (value === '其它原因') {
        this.remarkFlag = true
      }
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          this.buttonLoading = true
          if (this.isCancelInfo.exist && this.config.record.workflowId === '48a1b86d51c646f9b965b9e42d6772f0') {
            // 是否开启发送短信
            if (this.isCancelInfo.sendMessage) {
              this.axios({
                url: 'sms/send/init',
                data: {
                  phone: this.config.record.gongDanLianXiDianHua,
                  sendContent: this.config.record.caseNumber,
                  template: '21061801',
                  pageNo: 1,
                  pageSize: 20,
                  sortField: 'id',
                  sortOrder: 'descend'
                }
              }).then(res => {
                if (res.code === 0) {
                  // 申请次数上限
                  if (res.result.data.length > this.isCancelInfo.limitSendTimes) {
                    this.$message.error('申请取消次数已达上限！')
                    this.buttonLoading = false
                  } else {
                    this.requestMethod(values, 'order/fuWuDan/applyCancel')
                  }
                }
              })
            } else {
              this.requestMethod(values, 'order/fuWuDan/applyCancel')
            }
          } else {
            this.requestMethod(values, this.config.url || '/admin/workitem/processing')
          }
        }
      })
    },
    requestMethod (values, url) {
      let caseId
      if (this.config.type === 'batch') {
        caseId = this.config.data.map(item => item.caseId__)
      } else {
        caseId = this.config.caseId
      }
      this.axios({
        url: url,
        data: {
          caseId: caseId,
          handleWay: values.action,
          handleRemarks: values.remark,
          operation: 'cancel',
          handleCompel: values.handleCompel ? '1' : '0'
        }
      }).then(res => {
        this.buttonLoading = false
        if (res.code > 0) {
          this.$message.error(res.message)
        } else {
          this.visible = false
          this.$message.success(res.message)
          this.$emit('ok')
        }
      })
    }
  }
}
</script>
