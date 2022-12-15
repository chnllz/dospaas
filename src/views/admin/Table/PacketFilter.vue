<template>
  <div>
    <a-table
      ref="table"
      size="small"
      rowKey="value"
      :columns="columns"
      :pagination="false"
      :dataSource="workflowFilters"
      :sorter="{ field: 'id', order: 'descend' }"
    >
      <div slot="title">
        <a-space>
          <a-button @click="handleAdd('workflowFilters')">{{ $t('添加') }}</a-button>
          <a-button @click="handleSort('workflowFilters')">{{ $t('排序') }}</a-button>
        </a-space>
        <a-alert
          :message="$t('在所有“启用”的按钮中，默认选中排序最靠前的')"
          type="info"
          showIcon
          style="margin-top: 8px"
        ></a-alert>
      </div>
      <div slot="customName" slot-scope="text, record">
        <a-input v-model="record.customName" :value="$t(record.customName)"></a-input>
      </div>
      <div slot="help" slot-scope="text, record">
        <a-input v-model="record.help" size="small" />
      </div>
      <div slot="badge" slot-scope="text, record">
        <a-switch
          size="small"
          :checked="record.badge"
          @change="
            (e) => {
              badgeChange(e, record, 'workflowFilters')
            }
          "
        />
      </div>
      <div slot="enable" slot-scope="text, record">
        <a-switch
          size="small"
          :checked="record.enable"
          @change="
            (e) => {
              enableChange(e, record, 'workflowFilters')
            }
          "
        />
      </div>
      <div slot="action" slot-scope="text, record, index">
        <!-- :disabled="record.searchType !== 'custom'" -->
        <a @click="handleAdd('workflowFilters', record, index)">
          {{ $t('编辑') }}
        </a>
        <a-divider type="vertical" />
        <a @click="handleSearchPriv(record, index)">
          <a-badge v-if="record.usePermissions && record.usePermissions.length > 0" status="success" />
          <a-badge v-else status="default" />
          {{ $t('授权') }}
        </a>
        <a-divider type="vertical" />
        <a @click="copyPrivShow(record, 'workflowFilters')">{{ $t('复制权限给') }}</a>
        <a-divider type="vertical" />
        <a :disabled="record.searchType !== 'custom'" @click="handleDelete(record, index)">{{ $t('删除') }}</a>
      </div>
    </a-table>
    <drag-sort ref="dragSort" @ok="getSort" />
    <priv-visit-form ref="privVisitForm" @func="getPrivs" />
    <a-modal v-model="visibleCopy" :title="$t('复制权限给')" @ok="getCopy" @cancel="visibleCopy = !visibleCopy">
      <div :style="{ borderBottom: '1px solid #E9E9E9', marginBottom: '8px' }">
        <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
          {{ $t('全选') }}
        </a-checkbox>
      </div>
      <a-checkbox-group v-model="copyCheck" @change="onChange">
        <a-row :gutter="[8, 8]">
          <a-col v-for="data in plainOptions" :key="data.value" :span="6">
            <a-checkbox :value="data.value">{{ data.label }}</a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </a-modal>
    <a-drawer
      :destroyOnClose="true"
      :title="configDrawer.title"
      :width="800"
      :visible="visibleDrawer"
      @close="visibleDrawer = !visibleDrawer"
    >
      <a-spin :spinning="lodingDrawer">
        <a-form :form="form">
          <a-form-item :label="$t('按钮名称')" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              v-decorator="[
                'info[name]',
                {
                  initialValue: configDrawer.record ? configDrawer.record.name : '',
                  rules: [{ required: true, message: '请输入按钮名称' }]
                }
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('按钮value值')" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              v-decorator="[
                'info[value]',
                {
                  initialValue: configDrawer.record ? configDrawer.record.value : '',
                  rules: [{ required: true, message: '请输入按钮value值' }]
                }
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('条件设置')" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <editor ref="editorInit" :params="editorData" />
          </a-form-item>
          <a-form-item :label="$t('自定义帮助')" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea
              v-decorator="['info[help]', { initialValue: configDrawer.record ? configDrawer.record.help : '' }]"
              :autoSize="{ minRows: 2, maxRows: 6 }"
            />
          </a-form-item>
          <a-form-item :label="$t('启用禁用')" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select
              v-decorator="[
                'info[enable]',
                { initialValue: configDrawer.record ? (configDrawer.record.enable ? '1' : '0') : '1' }
              ]"
            >
              <a-select-option value="1">{{ $t('启用') }}</a-select-option>
              <a-select-option value="0">{{ $t('禁用') }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('备注')" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea
              v-decorator="['info[remark]', { initialValue: configDrawer.record ? configDrawer.record.remark : '' }]"
              :autoSize="{ minRows: 2, maxRows: 6 }"
            />
          </a-form-item>
          <a-form-item :label="$t('操作列显示规则')" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <template
              v-if="['webProcessCenterDataWindow', 'appProcessCenterDataWindow'].includes(flowgroupBtnConfig.type)"
            >
              <a-table size="small" rowKey="index" :columns="flowColumns" :dataSource="buttonMap" :pagination="false">
                <div slot="buttonColumn" slot-scope="text, record">
                  <a-checkbox-group :value="flowButtonMap[record.workflowId]" style="width: 100%">
                    <a-row style="margin-top: 8px; width: 100%">
                      <a-col v-for="(item, index) in record.buttonColumn" :key="index" span="6">
                        <a-checkbox
                          :value="item.usage"
                          :disabled="item.btnType !== 'custom' && searchType !== 'custom'"
                          @change="onChangeCheck(record.workflowId, item.usage)"
                        >
                          <span :class="{ show: item.visible, noshow: !item.visible }">{{ item.label }}</span>
                        </a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>
                </div>
              </a-table>
            </template>
            <template v-else>
              <a-checkbox-group :value="flowButtonMap[workflowId]" style="width: 100%">
                <a-row v-for="(buttonMapItem, idx) in buttonMap" :key="idx" style="margin-top: 8px; width: 100%">
                  <a-col v-for="(item, index) in buttonMapItem.buttonColumn" :key="index" span="4">
                    <a-checkbox
                      :value="item.usage"
                      :disabled="item.btnType !== 'custom' && searchType !== 'custom'"
                      @change="onChangeCheck(workflowId, item.usage)"
                    >
                      <span :class="{ show: item.visible, noshow: !item.visible }">{{ item.label }}</span>
                    </a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
            </template>
          </a-form-item>
        </a-form>
        <div class="bbar">
          <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
          <a-button @click="visibleDrawer = !visibleDrawer">{{ $t('关闭') }}</a-button>
        </div>
      </a-spin>
    </a-drawer>
  </div>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
    DragSort: () => import('@/views/admin/Common/DragSort'),
    PrivVisitForm: () => import('./PrivVisitForm'),
    Editor: () => import('@/views/admin/Formula/Editor'),
    SetLang: () => import('@/components/SetLang')
  },
  props: {
    config: {
      type: Object,
      default: () => { }
    },
    flowgroupBtnConfig: {
      type: Object,
      default: () => { }
    },
    allWorkflows: {
      type: Array,
      default: () => []
    },
    tabThis: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      visible: false,
      loading: false,
      lodingDrawer: false,
      visibleCopy: false,
      visibleDrawer: false,
      form: this.$form.createForm(this),
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      message: '',
      privData: {},
      copyCheck: [],
      plainOptions: [{}],
      copyType: '',
      indeterminate: false,
      checkAll: false,
      configDrawer: {},
      typeDrawer: '',
      columns: [{
        title: '操作',
        dataIndex: 'action',
        width: 240,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: '#',
        width: 40,
        align: 'center',
        customRender: (text, record, index) => {
          return index + 1
        }
      }, {
        title: this.$t('按钮名称'),
        dataIndex: 'name',
        width: 100
      }, {
        title: this.$t('自定义名称'),
        dataIndex: 'customName',
        width: 100,
        // customRender: (text) => {
        //   return text || '--'
        // }
        scopedSlots: { customRender: 'customName' }
      }, {
        title: this.$t('自定义帮助说明'),
        dataIndex: 'help',
        // customRender: (text) => {
        //   return text || '--'
        // }
        scopedSlots: { customRender: 'help' }
      }, {
        title: this.$t('角标'),
        dataIndex: 'badge',
        scopedSlots: { customRender: 'badge' }
      }, {
        title: this.$t('启用'),
        dataIndex: 'enable',
        scopedSlots: { customRender: 'enable' }
      }, {
        title: this.$t('备注'),
        dataIndex: 'remark'
      }],
      workflowFilters: [{
        name: this.$t('我的待办'),
        value: 'my_process',
        enable: true,
        customName: '',
        remark: this.$t('{当前办理人}包含当前登录用户的变迁'),
        help: ''
      }, {
        name: this.$t('我的已办'),
        value: 'my_handle',
        enable: true,
        customName: '',
        remark: this.$t('当前登录用户办理过的变迁'),
        help: ''
      }, {
        name: this.$t('我的发起'),
        value: 'my_create',
        enable: true,
        customName: '',
        remark: this.$t('当前登录用户发起的流程'),
        help: ''
      }, {
        name: this.$t('我的挂起'),
        value: 'my_suspend',
        enable: true,
        customName: '',
        remark: this.$t('当前登录用户挂起的流程'),
        help: ''
      }, {
        name: this.$t('抄送给我'),
        value: 'my_cc',
        enable: true,
        customName: '',
        remark: this.$t('抄送给当前登录用户的流程'),
        help: ''
      }, {
        name: this.$t('委托给我'),
        value: 'my_entrust',
        enable: true,
        customName: '',
        remark: this.$t('委托给当前登录用户的流程'),
        help: ''
      }, {
        name: this.$t('我的关注'),
        value: 'my_subscribe',
        enable: true,
        customName: '',
        remark: this.$t('当前登录用户关注的流程'),
        help: ''
      }, {
        name: this.$t('所有挂起'),
        value: 'all_suspend',
        enable: true,
        customName: '',
        remark: this.$t('所有挂起的流程'),
        help: ''
      }, {
        name: this.$t('所有流程'),
        value: 'all_flow',
        enable: true,
        customName: '',
        remark: this.$t('所有流程（遵循数据窗口的条件设置）'),
        help: ''
      }, {
        name: this.$t('所有待办'),
        value: 'all_process',
        enable: true,
        customName: '',
        remark: this.$t('流程的所有待办变迁（遵循数据窗口的条件设置）'),
        help: ''
      }],
      editorData: {
        value: ''
      },
      // flowCenterButton
      flowButton: [{
        usage: 'flow_view',
        label: '查看',
        visible: false,
        btnType: 'system'
      }, {
        usage: 'flow_process',
        label: '办理',
        visible: false,
        btnType: 'system'
      }, {
        usage: 'flow_take',
        label: '领取',
        visible: false,
        btnType: 'system'
      }, {
        usage: 'flow_takeprocess',
        label: '领办',
        visible: false,
        btnType: 'system'
      }, {
        usage: 'flow_remarks',
        label: '备注',
        visible: false,
        btnType: 'system'
      }, {
        usage: 'flow_urge',
        label: '催办',
        visible: false,
        btnType: 'system'
      }, {
        usage: 'flow_terminate',
        label: '取消',
        visible: false,
        btnType: 'system'
      }, {
        usage: 'flow_jump',
        label: '流转',
        visible: false,
        btnType: 'system'
      }, {
        usage: 'flow_transfer',
        label: '转办',
        visible: false,
        btnType: 'system'
      }, {
        usage: 'flow_hangup',
        label: '挂起',
        visible: false,
        btnType: 'system'
      }, {
        usage: 'flow_activate',
        label: '激活',
        visible: false,
        btnType: 'system'
      }, {
        usage: 'flow_subscribe',
        label: '关注',
        visible: false,
        btnType: 'system'
      }, {
        usage: 'flow_unsubscribe',
        label: '取消关注',
        visible: false,
        btnType: 'system'
      }],
      flowColumns: [{
        title: this.$t('流程名称'),
        dataIndex: 'workflowName',
        width: 100
      }, {
        title: this.$t('操作列'),
        dataIndex: 'buttonColumn',
        scopedSlots: { customRender: 'buttonColumn' }
      }],
      buttonMap: [],
      showFlowBtn: [],
      flowButtonMap: {},
      workflowId: '',
      searchType: '' // 编辑时，是内置流程筛选还是自定义流程筛选
    }
  },
  mounted () {
    this.message = (<div>
      <div>{this.$t('1）流程快捷筛选按钮的排序、自定义名称、自定义帮助是全局设置，《流程中心》依照该设置，《数据窗口》默认加载该设置。')}</div>
      <div>{this.$t('2）此处的【授权】控制《流程中心》的权限机制，没有授权时，所有人都有权限使用。授权后，仅有权限的人可以使用。')}</div></div>)
  },
  methods: {
    handleSort (type) {
      this.$refs.dragSort.show({
        title: this.$t('排序'),
        placement: 'right',
        width: 600,
        sortId: 'value',
        sortData: this.workflowFilters
      })
    },
    getSort (data) {
      this.workflowFilters = data
    },
    handleAdd (type, record, index) {
      this.typeDrawer = type
      if (record) {
        this.searchType = record.searchType
        this.initFlowButton(record.value, record.searchType, 'edit')
        this.editorData = {
          value: record.queryParam ? record.queryParam : ''
        }
        this.configDrawer = {
          title: this.$t('编辑'),
          record: record,
          index: index,
          action: 'edit'
        }
      } else {
        this.editorData = {
          value: ''
        }
        this.searchType = 'custom'
        this.configDrawer = {
          title: this.$t('添加'),
          action: 'add'
        }
        this.initFlowButton('', 'custom', 'add')
      }
      this.visibleDrawer = true
    },
    enableChange (e, record) {
      if (this.workflowFilters.filter(item => item.value !== record.value).every(item => !item.enable)) {
        this.$message.warning(this.$t('请保持至少有一个处于启用状态'))
      } else {
        this.$set(record, 'enable', record.enable = e)
        this.$forceUpdate()
      }
    },
    badgeChange (e, record) {
      this.$set(record, 'badge', record.badge = e)
      this.$forceUpdate()
    },
    copyPrivShow (record, type) {
      this.copyPriv = record.usePermissions
      this.copyCheck = []
      this.copyType = type
      this.indeterminate = false
      this.checkAll = false
      this.plainOptions = this.workflowFilters.map(item => {
        const obj = {
          label: item.name,
          value: item.value
        }
        return obj
      })
      this.visibleCopy = true
    },
    onCheckAllChange (e) {
      Object.assign(this, {
        copyCheck: e.target.checked ? this.plainOptions.map(item => item.value) : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
    },
    onChange (checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < this.plainOptions.length
      this.checkAll = checkedList.length === this.plainOptions.length
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          values.info.enable = values.info.enable === '1'
          values.info.searchType = this.searchType
          values.info.queryParam = this.$refs.editorInit.getValue()
          values.info.actionButtonsMappings = this.flowButtonMap
          if (this.configDrawer.action === 'add') {
            this.workflowFilters.splice(this.workflowFilters.length, 0, values.info)
          } else {
            Object.assign(this.workflowFilters[this.configDrawer.index], values.info)
          }
          this.visibleDrawer = false
        }
      })
    },
    handleDelete (record, index) {
      const that = this
      this.$confirm({
        title: this.$t('您确认要删除该记录吗？'),
        onOk () {
          that.workflowFilters.splice(index, 1)
        }
      })
    },
    handleSearchPriv (record, index) {
      this.privData = record
      this.$refs.privVisitForm.show({
        action: 'edit',
        title: this.$t('授权'),
        record: record,
        index: index,
        key: 'usePermissions',
        selectType: 'radio',
        privArr: {
          visit: this.$t('可访问')
        },
        defaultpriv: 'visit'
      })
    },
    getPrivs (usePermissions, index) {
      const item = this.workflowFilters[index]
      item.usePermissions = usePermissions
      this.$forceUpdate()
    },
    getCopy () {
      this.workflowFilters.forEach(item => {
        if (this.copyCheck.includes(item.value)) {
          item.usePermissions = this.copyPriv
        }
      })
      this.visibleCopy = false
      this.$forceUpdate()
    },
    checkButtonPermissions (usage, flowCondition) {
      const newList = []
      switch (usage) {
        case 'flow_process':
          if (['all_process', 'my_entrust', 'my_process', 'my_subscribe'].indexOf(flowCondition) > -1) {
            newList.push(usage)
          }
          break
        case 'flow_takeprocess':
          if (flowCondition === 'my_process') {
            newList.push(usage)
          }
          break
        case 'flow_take':
          if (flowCondition === 'my_process') {
            newList.push(usage)
          }
          break
        case 'flow_urge':
          if (['my_process', 'my_suspend', 'my_cc', 'my_entrust', 'all_suspend', 'my_subscribe', 'all_process'].indexOf(flowCondition) > -1) {
            newList.push(usage)
          }
          break
        case 'flow_terminate':
          if (['my_process', 'my_suspend', 'my_entrust', 'all_process', 'all_suspend'].indexOf(flowCondition) > -1) {
            newList.push(usage)
          }
          break
        case 'flow_jump':
          if (['my_process', 'all_process'].indexOf(flowCondition) > -1) {
            newList.push(usage)
          }
          break
        case 'flow_transfer':
          if (['my_process', 'all_process', 'my_entrust'].indexOf(flowCondition) > -1) {
            newList.push(usage)
          }
          break
        case 'flow_hangup':
          if (['my_process', 'my_cc', 'my_entrust', 'all_process', 'all_flow'].indexOf(flowCondition) > -1) {
            newList.push(usage)
          }
          break
        case 'flow_activate':
          if (['my_suspend', 'all_suspend'].indexOf(flowCondition) > -1) {
            newList.push(usage)
          }
          break
        case 'flow_subscribe':
          if (['my_subscribe', 'my_suspend'].indexOf(flowCondition) === -1) {
            newList.push(usage)
          }
          break
        case 'flow_unsubscribe':
          if (flowCondition === 'my_subscribe') {
            newList.push(usage)
          }
          break
        default:
          newList.push(usage)
          break
      }
      return newList
    },
    onChangeCheck (workflowId, usage) {
      const index = this.flowButtonMap[workflowId].indexOf(usage)
      if (index > 0) {
        this.flowButtonMap[workflowId].splice(index, 1)
      } else {
        this.flowButtonMap[workflowId].push(usage)
      }
    },
    /**
     * flowCondition 流程筛选组类型
     * searchType 内置流程筛选、自定义流程筛选
     * handleType 添加、编辑
     */
    initFlowButton (flowCondition, searchType, handleType) {
      this.flowButtonMap = {}
      if (['webProcessCenterDataWindow', 'appProcessCenterDataWindow'].includes(this.flowgroupBtnConfig.type)) {
        const actionButtonsObj = this.workflowFilters.filter(item => item.value === flowCondition)
        const actionButtonsMappings = actionButtonsObj[0] && actionButtonsObj[0].actionButtonsMappings ? actionButtonsObj[0].actionButtonsMappings : {}
        if (searchType === 'custom') { // 自定义流程筛选
          this.buttonMap = this.allWorkflows.map(workflowItem => {
            const flowButton = []
            const list = []
            const actionButtons = actionButtonsMappings[workflowItem.workflowId] ? actionButtonsMappings[workflowItem.workflowId] : []
            workflowItem.workflowSetting.dataWindowButtons && workflowItem.workflowSetting.dataWindowButtons.forEach(dwBtn => {
              const index = this.flowButton.findIndex(flowBtnItem => dwBtn.usage === flowBtnItem.usage)
              // visibleType pc端流程中心、移动端流程中心 按钮显示情况
              const visibleType = this.flowgroupBtnConfig.type === 'webProcessCenterDataWindow' ? dwBtn.visible : dwBtn.appVisible
              if (!visibleType) {
                return
              }
              if (index < 0) {
                flowButton.push({
                  usage: dwBtn.usage,
                  label: dwBtn.name,
                  btnType: 'custom',
                  visible: true
                })
              } else {
                flowButton.push({
                  usage: dwBtn.usage,
                  label: dwBtn.name,
                  btnType: 'system',
                  visible: true
                })
              }
            })
            flowButton.forEach(flowButtonItem => {
              if (actionButtons.includes(flowButtonItem.usage)) {
                list.push(flowButtonItem.usage)
              }
            })
            this.flowButtonMap[workflowItem.workflowId] = list
            return {
              workflowName: workflowItem.workflowName,
              buttonColumn: flowButton,
              workflowId: workflowItem.workflowId
            }
          })
        } else { // 内置流程筛选
          this.buttonMap = this.allWorkflows.map(workflowItem => {
            let list = []
            const actionButtons = actionButtonsMappings[workflowItem.workflowId] ? actionButtonsMappings[workflowItem.workflowId] : []
            const flowButton = JSON.parse(JSON.stringify(this.flowButton))
            workflowItem.workflowSetting.dataWindowButtons && workflowItem.workflowSetting.dataWindowButtons.forEach(dwBtn => {
              const index = this.flowButton.findIndex(flowBtnItem => dwBtn.usage === flowBtnItem.usage)
              const visibleType = this.flowgroupBtnConfig.type === 'webProcessCenterDataWindow' ? dwBtn.visible : dwBtn.appVisible
              // 添加自定义按钮 判断自定义按钮是否显示再添加
              if (index < 0 && visibleType) {
                flowButton.push({
                  usage: dwBtn.usage,
                  label: dwBtn.name,
                  btnType: 'custom',
                  visible: true
                })
              } else if (index >= 0) {
                flowButton[index].visible = visibleType
              }
            })
            flowButton.forEach(flowButtonItem => {
              if (flowButtonItem.btnType !== 'custom') {
                list = [...list, ...this.checkButtonPermissions(flowButtonItem.usage, flowCondition)]
              } else if (actionButtons.includes(flowButtonItem.usage)) {
                list.push(flowButtonItem.usage)
              }
            })
            this.flowButtonMap[workflowItem.workflowId] = list
            if (handleType === 'add') {
              this.workflowFilters.forEach(item => {
                if (item.value === flowCondition) {
                  if (!item.actionButtonsMappings) {
                    item.actionButtonsMappings = {}
                  }
                  item.actionButtonsMappings[workflowItem.workflowId] = list
                }
              })
            }
            return {
              workflowName: workflowItem.workflowName,
              buttonColumn: flowButton,
              workflowId: workflowItem.workflowId
            }
          })
        }
      } else { // 普通流程
        this.workflowId = this.tabThis.form.getFieldValue('setting[workflowId]')
        const actionButtonsObj = this.workflowFilters.filter(item => item.value === flowCondition)
        const actionButtonsMappings = actionButtonsObj[0] && actionButtonsObj[0].actionButtonsMappings ? actionButtonsObj[0].actionButtonsMappings[this.workflowId] : []
        if (searchType === 'custom') { // 自定义流程筛选
          this.buttonMap = [{
            buttonColumn: []
          }]
          const list = []
          const flowButton = []
          this.flowgroupBtnConfig.buttonList.filter(item => item.position === 'line').forEach(dwBtn => {
            const index = this.flowButton.findIndex(flowBtnItem => dwBtn.usage === flowBtnItem.usage)
            // 添加自定义按钮
            if (!dwBtn.visible) {
              return
            }
            if (index < 0) {
              flowButton.push({
                usage: dwBtn.usage,
                label: dwBtn.name,
                btnType: 'custom',
                visible: true
              })
            } else if (index >= 0) {
              flowButton.push({
                usage: dwBtn.usage,
                label: dwBtn.name,
                btnType: 'system',
                visible: true
              })
            }
          })
          flowButton.forEach(flowButtonItem => {
            if (actionButtonsMappings.includes(flowButtonItem.usage)) {
              // 从actionButtons抽取保存的自定义按钮
              list.push(flowButtonItem.usage)
            }
          })
          this.flowButtonMap[this.workflowId] = list
          this.buttonMap[0].buttonColumn = flowButton
        } else {
          this.buttonMap = [{
            buttonColumn: []
          }]
          let list = []
          const flowButton = JSON.parse(JSON.stringify(this.flowButton))
          this.flowgroupBtnConfig.buttonList.filter(item => item.position === 'line').forEach(dwBtn => {
            const index = flowButton.findIndex(flowBtnItem => dwBtn.usage === flowBtnItem.usage)
            // 添加自定义按钮
            if (index < 0 && dwBtn.visible) {
              flowButton.push({
                usage: dwBtn.usage,
                label: dwBtn.name,
                btnType: 'custom',
                visible: true
              })
            } else if (index >= 0) {
              flowButton[index].visible = dwBtn.visible
            }
          })
          flowButton.forEach(flowButtonItem => {
            if (flowButtonItem.btnType !== 'custom') {
              list = [...list, ...this.checkButtonPermissions(flowButtonItem.usage, flowCondition)]
            } else if (actionButtonsMappings.includes(flowButtonItem.usage)) {
              // 从actionButtons抽取保存的自定义按钮
              list.push(flowButtonItem.usage)
            }
          })
          this.flowButtonMap[this.workflowId] = list
          this.buttonMap[0].buttonColumn = flowButton
          if (handleType === 'add') {
            this.workflowFilters.forEach(item => {
              if (item.value === flowCondition) {
                if (!item.actionButtonsMappings) {
                  item.actionButtonsMappings = {}
                }
                item.actionButtonsMappings[this.workflowId] = list
              }
            })
          }
        }
      }
    },
    show () {
      if (!this.config.workflowFilters) {
        //  添加流程筛选
        this.axios({
          url: '/admin/workflow/flowSetting',
          data: { action: 'get' }
        }).then(res => {
          this.loading = false
          if (res.result) {
            this.workflowFilters = res.result.workflowFilters ? res.result.workflowFilters : []
            // 初始化流程筛选组的按钮
            this.workflowFilters.forEach(item => {
              this.initFlowButton(item.value, '', 'add')
            })
          }
        })
      } else {
        // 编辑流程筛选
        this.workflowFilters = this.config.workflowFilters
      }
    }
  }
}
</script>

<style lang="less" scoped>
.show {
  color: #262626;
}
.noshow {
  color: #bfbfbf;
}
</style>
