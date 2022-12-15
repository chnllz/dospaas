<template>
  <!-- 表单组件 -->
  <div class="ant-drawer-body">
    <a-spin v-if="code === 0" :spinning="pageLoading">
      <user-table-form-view
        ref="userTableFormView"
        :params="{
          tableName,
          template,
          fieldRule: fieldRule,
          parentParams: params,
          page: 'workflow',
          handleWayData: handleWayData,
          templateOther: templateOther,
          remarksRule: remarksRule,
          handleFormRules: handleFormRules,
          remarksMaxRows: remarksMaxRows,
          remarksMinRows: remarksMinRows
        }"
        :formThis="data_"
        @ok="getVisible"
        @start="handleStart"
      />
      <div v-if="formViewButtons.some((i) => i.visible)" class="bbar">
        <component :is="item.component" v-for="(item, index) in formViewButtons" v-show="item.visible" :key="index" />
      </div>
    </a-spin>
    <span v-else>{{ message }}</span>
    <a-modal :visible="imagePreviewVisible" :footer="null" @cancel="imagePreviewVisible = !imagePreviewVisible">
      <img :src="imagePreviewUrl" style="width: 100%" />
    </a-modal>
    <user-table-components ref="userTableComponents" />
    <!-- 添加办理备注 -->
    <user-table-workflow-remarks ref="userTableWorkflowRemarks" :key="remarkKey" @ok="refresh" />
    <!-- 撤销 -->
    <user-table-workflow-terminate ref="userTableWorkflowTerminate" :key="terminateKey" @ok="refresh" />
    <!-- 转办 -->
    <user-table-workflow-complaint ref="userTableWorkflowComplaint" :key="complaintKey" @ok="refresh" />
    <send-message ref="sendMessage" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import UserTableComponents from '@/views/admin/General/UserTableComponents'
export default {
  i18n: window.lang('admin'),
  components: {
    TinyMce: () => import('@/components/Editor/TinyMce'),
    UserTableFormView: () => import('@/views/admin/General/UserTableFormView'),
    UserTableList: () => import('@/views/admin/General/UserTableList'),
    UserTableComponents,
    UserTableWorkflowRemarks: () => import('@/views/admin/General/UserTableWorkflowRemarks'),
    userTableWorkflowTerminate: () => import('@/views/admin/General/UserTableWorkflowTerminate'),
    SendMessage: () => import('@/views/admin/General/SendMessage'),
    UserTableWorkflowComplaint: () => import('@/views/admin/General/UserTableWorkflowComplaint'),
    HelpPanel: () => import('@/views/admin/HelpPanel')
  },
  data () {
    return {
      data_: this,
      activeKey: 0,
      remarkKey: 'remark',
      terminateKey: 'terminate',
      complaintKey: 'complaint',
      params: {},
      record: {},
      visible: false,
      pageLoading: false,
      sourceUrl: null,
      loading: false,
      form: this.$form.createForm(this),
      beforeSubmit: '', // 表单提交前的验证脚本
      // 图片预览
      imagePreviewVisible: false,
      imagePreviewUrl: '',
      template: [],
      templateCom: [],
      templateOther: [],
      fieldRule: [],
      // 用于定制开发作数据交换时使用，自定义组件时使用parent.$set(parent.data, 'mydata', 'hello')
      data: {},
      formViewButtons: [],
      handleWayData: [],
      handleFormRules: [],
      remarksRule: '',
      tableName: '',
      relationTable: [],
      code: 0,
      message: '',
      advancedLog: false,
      // 流程日志表头
      columnsLog: [{
        title: 'ID',
        dataIndex: 'id',
        width: 80
      }, {
        title: this.$t('流程任务'),
        dataIndex: 'logTitle',
        width: 200
      }, {
        title: this.$t('办理人'),
        dataIndex: 'username',
        ellipsis: false,
        width: 200
      }, {
        title: this.$t('办理时间'),
        dataIndex: 'inputTime',
        width: 200
      }, {
        title: this.$t('办理方式'),
        dataIndex: 'handleWay',
        width: 150
      }, {
        title: this.$t('办理备注'),
        dataIndex: 'handleRemarks',
        ellipsis: false,
        minWidth: 200
      }],
      advancedUrge: false,
      // 催办日志表头
      columnsUrge: [{
        title: 'ID',
        dataIndex: 'id',
        width: 60
      }, {
        title: this.$t('催办人'),
        dataIndex: 'urgeUser',
        width: 100
      }, {
        title: this.$t('催办时间'),
        dataIndex: 'urgeTime',
        width: 150
      }, {
        title: this.$t('催办流程节点'),
        dataIndex: 'urgeTitle',
        width: 120
      }, {
        title: this.$t('被催办人'),
        dataIndex: 'username',
        ellipsis: false,
        width: 150
      }, {
        title: this.$t('催办原因'),
        dataIndex: 'urgeReason',
        width: 150
      }, {
        title: this.$t('催办备注'),
        ellipsis: false,
        dataIndex: 'urgeRemarks'
      }, {
        title: this.$t('催办后完成时效'),
        dataIndex: 'finishEfective',
        width: 120
      }],
      selectedRowKeys: [],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys
        }
      },
      queryParamLog: {},
      queryParamUrge: {},
      colLayoutLog: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 6 },
      colLayoutUrge: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 6 },
      saveStatus: false, // 提交接口是否请求成功
      returnData: {}, // 提交接口返回数据
      viewMessage: '', // 后台没有返回视图显示
      // 数据窗口页面内容
      listThis: {},
      helpNotes: '',
      helpVisible: false,
      helpText: false,
      remarksMinRows: 2,
      remarksMaxRows: 4,
      actions: new Map([[
        '', function (value, inputValue) {
          return true
        }], [
        'contain', function (value, inputValue) {
          if (inputValue.indexOf(value) === -1) {
            return false
          } else {
            return true
          }
        }], [
        'equal', function (value, inputValue) {
          if (inputValue === value) {
            return true
          } else {
            return false
          }
        }], [
        'great', function (value, inputValue) {
          if (inputValue > value) {
            return true
          } else {
            return false
          }
        }], [
        'nc', function (value, inputValue) {
          if (inputValue.indexOf(value) === -1) {
            return true
          } else {
            return false
          }
        }], [
        'ne', function (value, inputValue) {
          if (inputValue !== value) {
            return true
          } else {
            return false
          }
        }], [
        'lt', function (value, inputValue) {
          if (inputValue < value) {
            return true
          } else {
            return false
          }
        }], [
        'ge', function (value, inputValue) {
          if (inputValue > value || inputValue === value) {
            return true
          } else {
            return false
          }
        }], [
        'le', function (value, inputValue) {
          if (inputValue < value || inputValue === value) {
            return true
          } else {
            return false
          }
        }], [
        'bw', function (value, inputValue) {
          if (inputValue.indexOf(value) === 0) {
            return true
          } else {
            return false
          }
        }], [
        'ew', function (value, inputValue) {
          const len = value.length
          if (inputValue.slice(-len) === value) {
            return true
          } else {
            return false
          }
        }]]),
      templateId: '',
      popscreenCallInfo: {},
      popparameter: {},
      customerOption: []
    }
  },
  computed: {
    ...mapGetters(['setting', 'userInfo'])
  },
  mounted () {
    this.$nextTick(() => {
      this.show({
        config: {
          title: this.$t('创建流程'),
          width: 1200,
          tplviewUrl: '/admin/wcase/add',
          url: '/admin/wcase/add',
          workflowId: '48a1b86d51c646f9b965b9e42d6772f0',
          parameter: {},
          viewType: 'create'
        },
        listThis: this,
        setFieldValue: {},
        currentValue: ''
      })
    })
  },
  methods: {
    async show (parameter) {
      this.popparameter = parameter
      this.$setLoading(true)
      this.params = parameter.config
      this.record = parameter.record
      this.listThis = parameter.listThis
      this.saveStatus = false
      this.template = []
      if (parameter.config.viewType === 'handle' || parameter.config.viewType === 'create') {
        this.$setLoading(false)
        this.visible = true
        this.pageLoading = true
        await this.axios('order/api/getPopscreenCallInfo?phone=' + (this.$route.query.Method === 'Dialout' ? this.$route.query.Calleeid : this.$route.query.Callerid)).then(res => {
          if (res.code === 0) {
            res.result.gongDanLianXiRen = res.result.keHuMingCheng
            res.result.gongDanLianXiDianHua = res.result.keHuDianHua
            res.result.keHuDiZhi = res.result.option
            this.popscreenCallInfo = res.result
          }
        })
        await this.axios({
          url: '/admin/tag/tagOption',
          data: {
            pageNo: 1,
            pageSize: 999,
            sortField: 'id',
            sortOrder: 'descend',
            tagCategoryNumber: ['e2d2cbb279474245ab1b9f7c542dc578']
          }
        }).then(res => {
          this.customerOption = []
          res.result.option.forEach(item => {
            this.customerOption = [...this.customerOption, ...item.children]
          })
        })
        this.afterVisibleChange(true)
      } else {
        this.pageLoading = true
        let templateId = ''
        const params = {
          id: this.record.id,
          // dataWindowId: parameter.config.templateId
          workflowId: this.record.workflowId
        }
        await this.axios({
          url: '/admin/general/getWorkflowView',
          data: params,
          tips: false
        }).then(res => {
          templateId = res.code === 0 ? res.result : null
          if (templateId) {
            this.params.templateId = templateId
            this.$setLoading(false)
            this.visible = true
            this.pageLoading = true
          } else {
            this.$setLoading(false)
            this.$message.warning(res.message)
          }
        })
      }
    },
    compare (listOrder) {
      return function (a, b) {
        const value1 = a[listOrder]
        const value2 = b[listOrder]
        return value1 - value2
      }
    },
    // 请求视图列表数据
    requestData () {
      const _this = this
      this.axios({
        url: this.params.tplviewUrl,
        data: Object.assign(this.params, { action: 'get' })
      }).then(res => {
        if (res.code === 0) {
          this.pageLoading = false
          this.params.tableId = res.result.tableId
          this.params.caseId = res.result.caseId
          this.params.workitemId = res.result.workitemId
          this.params.record = res.result.data
          this.helpText = res.result.helpText
          this.code = res.result.code || 0
          this.message = res.result.message
          this.tableName = res.result.tableName
          this.formViewButtons = res.result.formViewButtons || []
          this.beforeSubmit = res.result.templateScript ? res.result.templateScript.beforeSubmit : ''
          this.templateId = res.result.templateId
          this.formViewButtons.forEach(item => {
            const funcStr = `return (_this) => {  return ${item.attribute} }`
            // eslint-disable-next-line no-new-func
            const func = new Function(funcStr)
            const obj = func()(_this)
            if (obj.template) {
              obj.template = obj.template.replace(/[\r\n]/g, '')
            }
            item.component = obj
          })
          this.handleWayData = res.result.handleMethods
          this.handleFormRules = res.result.handleFormRules
          if (res.result.handleMethods) {
            this.handleWayData.sort(this.compare('sortId'))
          }
          this.remarksRule = res.result.remarksRule
          this.remarksMinRows = res.result.remarksMinRows
          this.remarksMaxRows = res.result.remarksMaxRows
          this.relationTable = res.result.relationTable || []
          this.template = JSON.parse(JSON.stringify(res.result.template)) || []
          this.templateOther = JSON.parse(JSON.stringify(res.result.template)) || []
          this.template.forEach(item => {
            if (item.type === 'component') {
              this.templateCom[item.value] = item
            }
          })
          this.fieldRule = res.result.fieldRule || []
          if (this.template) {
            // 表单初始化loader
            if (res.result.templateScript && res.result.templateScript.afterInit) {
              var initAttribute = res.result.templateScript.afterInit
              var initTemplate = {
                type: 'component',
                attribute: initAttribute
              }
              this.template.push(initTemplate)
            }
            const formRecord = { ...this.popscreenCallInfo, ...this.popparameter.setFieldValue.record, ...{ gongDanLeiXing: this.popparameter.setFieldValue } }
            const getComponent = (array) => {
              array.forEach((item, index) => {
                if (item.columns) {
                  getComponent(item.columns)
                } else if (item.trs) {
                  getComponent(item.trs)
                } else if (item.list) {
                  getComponent(item.list)
                } else {
                  if (item.type === 'component') {
                    const funcStr = `return (_this) => {  return ${item.attribute} }`
                    // eslint-disable-next-line no-new-func
                    const func = new Function(funcStr)
                    const obj = func()(_this)
                    if (obj.template) {
                      obj.template = obj.template.replace(/[\r\n]/g, '')
                    }
                    item.component = obj
                  } else if (item.type === 'web_sub_data_window' && item.relationTable.relationSetting) {
                    this.$set(item.relationTable.relation, 'val', formRecord[item.relationTable.relationSetting.thisField] || '')
                  }
                  this.$nextTick(() => {
                    // 信息填充
                    for (const key in formRecord) {
                      const fieldValue = formRecord[key]
                      if (fieldValue !== null && item.field && item.field.alias === key) {
                        if (key === 'gongDanLeiXing' && fieldValue.valueArr) {
                          const gdlxOption = { fullDictDataNumber: '' }
                          for (const item of fieldValue.valueArr) {
                            gdlxOption.fullDictDataNumber += item + '/'
                          }
                          gdlxOption.fullDictDataNumber = gdlxOption.fullDictDataNumber.slice(0, gdlxOption.fullDictDataNumber.length - 1)
                          gdlxOption.fullDictDataName = fieldValue.value.display
                          this.$set(item.field, 'value', fieldValue.value)
                          this.$set(item.field, 'option', [gdlxOption])
                        } else if (key === 'keHuBiaoQian') {
                          this.customerOption = this.customerOption.map(tagItem => {
                            const category = item.field.setting.form?.tagSetting?.rnumber[0]
                            return {
                              category: category,
                              name: tagItem.label,
                              number: tagItem.value,
                              selectType: 1,
                              tagType: 0
                            }
                          })
                          this.$set(item.field, 'value', fieldValue)
                          this.$set(item.field, 'tagData', this.customerOption)
                        } else if (key === 'zhuanShuFuWu' && fieldValue) {
                          this.$set(item.field, 'value', fieldValue)
                          this.$set(item.field, 'option', [{ label: fieldValue, value: fieldValue, children: null, childCount: null }])
                        } else if (key === 'keHuDiZhi') {
                          this.$set(item.field, 'value', this.popscreenCallInfo.diZhi)
                          this.$set(item.field, 'option', this.popscreenCallInfo.option)
                          this.$set(item.field, 'addressDetails', this.popscreenCallInfo.diZhixiangXi)
                          this.$forceUpdate()
                        } else {
                          this.$set(item.field, 'value', fieldValue)
                        }
                      }
                    }
                  })
                }
              })
            }
            getComponent(this.template)
          }
        } else {
          this.visible = false
          this.$message.error(res.message)
          this.$emit('ok')
        }
        if (this.params.takeFlow) {
          this.$emit('ok')
        }
      })
    },
    getHelp () {
      this.helpVisible = false
      this.axios({
        url: '/admin/document/edit',
        data: {
          action: 'get',
          number: this.params.templateId
        }
      }).then(res => {
        if (!res.code) {
          const obj = res.result
          if (obj.displayMode === 'drawer') {
            this.helpVisible = false
            this.$showDocument({ visible: true, content: obj.content })
          } else {
            this.helpVisible = true
            this.helpNotes = obj.content
          }
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    afterVisibleChange (e) {
      if (e) this.requestData()
    },
    handlePlayback () {
      if (this.record.uniqueid) {
        this.axios({
          url: 'admin/api/getRecordFile',
          data: { uniqueid: this.record.uniqueid }
        }).then(res => {
          if (res.code === 0) {
            this.sourceUrl = this.setting.interfaceurl + 'sdk/index/record/?type=download&file=' + res.result.file
            this.$setSetting({ audioPlayData: { visible: true, sourceUrl: this.sourceUrl } })
          } else {
            this.$message.warning(res.message)
          }
        })
      } else {
        this.$message.error(this.$t('未配置uniqueid'))
      }
    },
    handleDownload () {
      if (this.record.uniqueid) {
        this.axios({
          url: 'admin/api/getRecordFile',
          data: { uniqueid: this.record.uniqueid }
        }).then(res => {
          if (res.code === 0) {
            window.open(this.setting.interfaceurl + 'sdk/index/record/?type=download&file=' + res.result.file)
          } else {
            this.$message.warning(res.message)
          }
        })
      } else {
        this.$message.error(this.$t('未配置uniqueid'))
      }
    },
    // 流程日志
    loadDataLog (parameter) {
      return this.axios({
        url: '/admin/centerflow/workflowLog',
        data: Object.assign(parameter, this.queryParamLog, { caseId: this.params.caseId })
      }).then(res => {
        for (const i in res.result.data) {
          res.result.data[i]['logTitle'] = res.result.data[i].transitionName
        }
        return res.result
      })
    },
    // 流程催办日志
    loadDataUrge (parameter) {
      return this.axios({
        url: '/admin/centerflow/workflowUrgeLog',
        data: Object.assign(parameter, this.queryParamLog, { caseId: this.params.caseId })
      }).then(res => {
        for (const i in res.result.data) {
          res.result.data[i]['urgeTitle'] = res.result.data[i].title
        }
        return res.result
      })
    },
    sendMessage (data) {
      this.$refs.sendMessage.show(data)
    },
    // 判断当前用户，用户所在部门，所属于角色
    handleUserSimple (current, conditionValue) {
      if (conditionValue.indexOf(current) !== -1) {
        return true
      } else {
        return false
      }
    },
    // 规则函数
    handleSimple (include, value, inputValue) {
      const action = this.actions.get(`${include}`)
      return action(value, inputValue)
    },
    // 办理备注
    handleRemarks () {
      this.remarkKey = this.remarkKey === 'remark' ? 'remark_1' : 'remark'
      this.$nextTick(() => {
        this.$refs.userTableWorkflowRemarks.show({
          caseId: this.record.caseId
        })
      })
    },
    // 撤销
    handleTerminate () {
      this.terminateKey = this.cancelKey === 'terminate' ? 'terminate_1' : 'terminate'
      this.$nextTick(() => {
        this.$refs.userTableWorkflowTerminate.show({
          caseId: this.record.caseId || this.record.caseId__
        })
      })
    },
    // 转办
    handleTransfer () {
      this.complaintKey = this.complaintKey === 'complaint' ? 'complaint_1' : 'complaint'
      this.$nextTick(() => {
        this.$refs.userTableWorkflowComplaint.show({
          caseId: this.record.caseId || this.record.caseId__
        })
      })
    },
    // 刷新日志
    refresh () {
      if (this.$refs.tableLog) {
        this.$refs.tableLog.refresh(false)
      }
    },
    // 提交表单
    handleSubmit (data) {
      const beforeSubmit = this.beforeSubmit
      if (beforeSubmit) {
        const parent = this
        const str = 'return ' + beforeSubmit
        // eslint-disable-next-line no-new-func
        const func = new Function(str)
        const flag = func()(parent)
        if (typeof flag !== 'boolean') {
          // 返回Promise的时候
          flag.then(res => {
            if (res) {
              this.$refs.userTableFormView.handleSubmit(data, this.parentPage, this.params.jointable).then(() => {
                this.handleCancel()
              }).catch(() => {
                this.loading = false
              })
            }
          })
        } else if (flag) {
          this.$refs.userTableFormView.handleSubmit(data, this.parentPage, this.params.jointable).then(() => {
            this.handleCancel()
          }).catch(() => {
            this.loading = false
          })
        }
      } else {
        this.$refs.userTableFormView.handleSubmit(data).then(() => {
          this.handleCancel()
        }).catch(() => {
          this.loading = false
        })
      }
    },
    // 仅保存
    handleOnlySave (data) {
      this.$refs.userTableFormView.handleSubmit(data, this.parentPage, this.params.jointable, 'onlySave').then(() => {
        this.pageLoading = false
      }).catch(() => {
        this.pageLoading = false
      })
    },
    // 仅保存并关闭
    handleOnlySaveClose (data) {
      this.$refs.userTableFormView.handleSubmit(data, this.parentPage, this.params.jointable, 'onlySaveClose').then(() => {
        this.pageLoading = false
        this.handleCancel()
      }).catch(() => {
        this.pageLoading = false
      })
    },
    getVisible (values, tableName, message, data) {
      if (message !== 'error') {
        this.visible = false
        this.saveStatus = true
        this.returnData = data
        this.$emit('ok', data, this.params)
      } else {
        this.pageLoading = false
      }
    },
    handleStart () {
      this.pageLoading = true
    },
    // 取消
    handleCancel () {
      window.close()
    }
  }
}
</script>
<style lang="less" scoped>
.ant-drawer-body {
  height: calc(100% - 0px);
  padding: 0;
}
</style>
