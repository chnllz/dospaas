<template>
  <a-spin :spinning="loading" class="container">
    <a-form :form="form">
      <a-tabs
        v-model="activeKey"
        tabPosition="left"
        style="height: calc(100vh - 210px); overflow: auto"
        class="tplviewDataFormEdit"
      >
        <a-tab-pane key="1" :tab="$t('基础设置')" force-render>
          <Setting
            :fieldMappings="fieldMappings"
            :treeSelectList="treeSelectList"
            :workflow="workflow"
            :data="data"
            :setting.sync="setting"
            :remarks="remarks"
            :pageName="configdata.type"
          />
        </a-tab-pane>
        <a-tab-pane
          key="2"
          :tab="$t('列属性')"
          :style="{ overflow: configdata.type !== 'tableCardWindow' ? 'auto' : 'hidden' }"
          force-render
        >
          <Column
            v-if="configdata.type !== 'tableCardWindow'"
            ref="column"
            :fieldColumns="fieldColumns"
            :fieldMappings="allList"
            :setting="setting"
            :tableId="config.tableId"
            :action="configdata.action"
            :type="configdata.type"
            :fieldCategory="fieldCategory"
          />
          <k-form-design
            v-else
            ref="kFormDesign"
            tableType="window"
            :fieldColumns="fieldColumns"
            :myTemplate="cardTemplate"
            :formdata="{}"
            :setting="{}"
          />
        </a-tab-pane>
        <a-tab-pane v-if="configdata.type !== 'webSubformDataWindow'" key="3" :tab="$t('搜索器')" force-render>
          <TplviewDataQuerier
            ref="tplviewdataquerier"
            :fieldColumns="querierFieldsarr"
            :fieldMappings="allList"
            :myTemplate="myTemplate"
            :tableId="config.tableId"
            :tabThis="tabThis"
            :setting="setting"
            :fieldCategory="fieldCategory"
            :flowgroupBtnConfig="flowgroupBtnConfig"
          />
        </a-tab-pane>
        <a-tab-pane key="4" :tab="$t('按钮')" force-render>
          <Tool
            ref="tool"
            :dataWindowButtons="dataWindowButtons"
            :tableidAll="tableId"
            :fieldColumns="fieldColumns"
            :fieldMappings="allList"
            :active="active"
            :tabThis="tabThis"
            :config="configdata"
            @func="getBarMenus"
          />
        </a-tab-pane>
        <a-tab-pane key="5" :tab="$t('表单应用')" force-render>
          <!-- <a-space direction="vertical" style="width: 100%" size="middle"> -->
          <h3>
            <tag-icon />
            {{ $t('①选择表单视图') }}
          </h3>
          <a-card size="small" style="margin-bottom: 16px">
            <FormApply
              ref="formapply"
              :params="{ formViewMappings: formViewMappings, tableId: configdata.tableId }"
              :formViewData="bindingFormViews"
            />
          </a-card>
          <h3>
            <tag-icon />
            {{ $t('②设置表单视图按钮') }}
          </h3>
          <a-card size="small" style="margin-bottom: 16px">
            <ExtendButton ref="extendbutton" :extendBarMenuData="formViewButtons" />
          </a-card>
          <h3>
            <tag-icon />
            {{ $t('③表单打开方式') }}
          </h3>
          <a-card size="small">
            <a-form-item
              v-if="configdata.type !== 'webSubformDataWindow'"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <span slot="label">
                {{ $t('抽屉宽度') }}
                <a-tooltip
                  placement="top"
                  :title="
                    $t(
                      '设置数据窗口打开表单视图时抽屉的宽度。固定宽度: 打开的表单视图使用固定宽度。百分比: 打开的表单视图使用分辨率百分比。'
                    )
                  "
                >
                  <a-icon type="question-circle" />
                </a-tooltip>
              </span>
              <a-row :gutter="8">
                <a-col :span="4">
                  <a-form-item>
                    <a-select
                      v-decorator="['setting[drawerType]', { initialValue: setting.drawerType || '0' }]"
                      @change="
                        (e) => {
                          setting.drawerType = e
                        }
                      "
                    >
                      <a-select-option value="0">{{ $t('固定宽度') }}</a-select-option>
                      <a-select-option value="1">{{ $t('百分比') }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="20">
                  <a-input-number
                    v-if="setting.drawerType === '0'"
                    v-decorator="['setting[drawerFixedWidth]', { initialValue: setting.drawerFixedWidth || 1200 }]"
                    :min="100"
                  />
                  <a-input-number
                    v-else
                    v-decorator="['setting[drawerPercentWidth]', { initialValue: setting.drawerPercentWidth || 80 }]"
                    :min="10"
                    :max="100"
                  />
                  <span>{{ setting.drawerType === '0' ? 'px' : '%' }}</span>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item
              v-if="configdata.type !== 'webSubformDataWindow'"
              :label="$t('表单Label宽度')"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input-number
                v-decorator="['setting[labelWidth]', { initialValue: setting.labelWidth || 100 }]"
                :min="50"
              />
            </a-form-item>
          </a-card>
        </a-tab-pane>
        <!-- <a-tab-pane tab="视图自定义" key="6" >
        </a-tab-pane> -->
      </a-tabs>
    </a-form>
  </a-spin>
</template>
<script>
import Vue from 'vue'
import KFormDesign from '@/views/admin/FormDesign/packages/index'
Vue.use(KFormDesign)
export default {
  name: 'TplviewDataFormEdit',
  i18n: window.lang('admin'),
  components: {
    Setting: () => import('./Table/Setting'),
    Column: () => import('./Table/Column'),
    Tool: () => import('./Table/Tool'),
    FormApply: () => import('./Table/FormApply'),
    ExtendButton: () => import('./Table/ExtendButton'),
    TplviewDataQuerier: () => import('./Table/TplviewDataQuerier')
  },
  props: {
    configdata: {
      type: Object,
      default () {
        return {}
      },
      required: false
    },
    tableId: {
      type: Array,
      default () {
        return []
      },
      required: true
    },
    active: {
      type: String,
      default () {
        return ''
      },
      required: true
    }
  },
  data () {
    return {
      config: {},
      loading: false,
      activeKey: '1',
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
      data: {},
      setting: {
        bindingFormViews: []
      },
      remarks: '', // 数据窗口备注
      tabThis: this,
      allList: [],
      bindingFormViews: [],
      myTemplate: [],
      cardTemplate: [],
      fieldColumns: [],
      querierFieldsarr: [],
      fieldCategory: [],
      fieldMappings: [],
      treeSelectList: [],
      dataWindowButtons: [],
      formViewMappings: [],
      formViewButtons: [],
      form: this.$form.createForm(this),
      workflow: [],
      flowgroupBtnConfig: {
        type: '', // 数据窗口类型
        buttonList: []
      }
    }
  },
  watch: {
    fieldColumns (newValue) {
      this.querierFieldsarr = this.getQuerier(newValue)
      this.querierFieldsarr = this.querierFieldsarr.sort(this.compare('id'))
    }
  },
  // 祖先级组件数据传递，以及被子孙级组件动态修改
  provide () {
    this.theme = Vue.observable({
      viewData: {}
    })
    return {
      theme: this.theme
    }
  },
  mounted () {
    this.show()
  },
  methods: {
    show () {
      if (this.configdata.action === 'edit') {
        this.activeKey = '2'
      } else {
        this.activeKey = '1'
      }
      this.loading = true
      this.config = this.configdata
      this.theme.item = this.configdata.item || {}
      this.axios({
        url: '/admin/template/getDataWindow',
        data: {
          tableId: this.configdata.tableId ? this.config.tableId : 0,
          id: this.configdata.record ? this.configdata.record.id : 0
        }
      }).then((res) => {
        this.loading = false
        this.form.resetFields()
        this.theme.viewData = res.result
        this.data = res.result.data
        this.fieldMappings = res.result.fieldMappings
        this.fieldColumns = res.result.fieldInfos || []
        this.treeSelectList = this.fieldColumns.filter(item => item.formType === 'treeselect')
        this.allList = this.fieldMappings.map(item => { const obj = this.fieldColumns.find(arrItem => arrItem.alias === item.value); return obj }).filter(item => item)
        this.fieldCategory = res.result.fieldCategory
        this.dataWindowButtons = res.result.dataWindowButtons || []
        this.dataWindowButtons = this.dataWindowButtons.sort(this.compare('listOrder'))
        this.flowgroupBtnConfig = {
          type: this.configdata.type,
          buttonList: this.dataWindowButtons
        }
        this.setting = res.result.setting || {}
        if (this.data.type === 'webProcessCenterDataWindow') {
          this.setting.enableWorkflow = true
        }
        this.setting.fieldColumns = this.setting.fieldColumns || []
        if (!this.setting.actionColumn) {
          this.setting.actionColumn = {
            alias: 'action',
            align: 'center',
            display: 'v',
            dataIndex: 'action',
            inlineButtons: [],
            fieldId: 'action',
            maxDisplay: 3,
            actionStyle: '2',
            attribute: '',
            title: this.$t('操作'),
            sorter: false,
            sortId: '10',
            listOrder: '10',
            type: 'action',
            id: 'action',
            value: 'action',
            width: 160
          }
        }
        this.setting.fieldColumns.unshift(this.setting.actionColumn)
        this.bindingFormViews = res.result.setting.bindingFormViews || []
        this.formViewMappings = res.result.formViewMappings
        this.formViewButtons = res.result.formViewButtons || []
        let { commonFieldSearchers = [], workflowSearcher = {}, templateGroupSearchers = [], multiFieldSearchers = [], componentSearchers = [] } = res.result.setting
        commonFieldSearchers = commonFieldSearchers || []
        workflowSearcher = workflowSearcher || {}
        templateGroupSearchers = templateGroupSearchers || []
        multiFieldSearchers = multiFieldSearchers || []
        componentSearchers = componentSearchers || []
        this.myTemplate = this.getTemplate(commonFieldSearchers, workflowSearcher, templateGroupSearchers, multiFieldSearchers, componentSearchers)
        this.cardTemplate = res.result.setting.cardTemplate || []
        this.workflow = res.result.workflow
        if (this.config.action === 'copy') {
          this.data.name = ''
        }
      })
    },
    getTemplate (commonFieldSearchers, workflowSearcher, templateGroupSearchers, multiFieldSearchers, componentSearchers) {
      let arr = [...commonFieldSearchers, ...templateGroupSearchers, ...multiFieldSearchers, ...componentSearchers]
      if (workflowSearcher && workflowSearcher.workflowFilters && workflowSearcher.workflowFilters.length > 0) {
        arr.push(workflowSearcher)
      }
      arr = arr.sort(this.compare('listOrder'))
      return arr
    },
    // 数组对象排序
    compare (property) {
      return (obj1, obj2) => {
        const val1 = obj1[property]
        const val2 = obj2[property]
        return val1 - val2
      }
    },
    getBarMenus (data) {
      this.dataWindowButtons = data.sort(this.compare('listOrder'))
    },
    handleSubmit (action) {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          const fieldColumns = this.$refs.column ? this.$refs.column.dataSource : (this.setting.fieldColumns || [])
          values.setting.actionColumn = fieldColumns.filter(item => item.fieldId === 'action')[0]
          values.setting.fieldColumns = fieldColumns.filter(item => item.fieldId !== 'action')
          values.setting.fieldColumns = values.setting.fieldColumns.map(item => {
            const keys = ['fieldId', 'id', 'listOrder', 'attribute', 'align', 'customTitle', 'display', 'width', 'sorter', 'sortId', 'style', 'rule']
            const obj = {}
            keys.forEach(key => {
              obj[key] = item[key] || null
            })
            return obj
          })
          values.setting.fieldColumns.sort(function (a, b) {
            return parseInt(a.sortId) - parseInt(b.sortId)
          })
          let errKey
          if (this.$refs.column) {
            const { fieldRule, afterInit, beforeSubmit } = this.$refs.column
            values.setting.fieldRule = fieldRule
            values.setting.afterInit = afterInit
            values.setting.beforeSubmit = beforeSubmit
            this.$refs.column.searchValue = ''
            this.$refs.column.formTable.validateFields((err, value) => {
              errKey = err
            })
          }
          if (errKey) {
            this.activeKey = '2'
            return
          }
          values.setting.fieldColumns.forEach(item => { delete item.unshow })
          let bindingFormViews = this.$refs.formapply && this.$refs.formapply.bindingFormViews ? JSON.parse(JSON.stringify((this.$refs.formapply.bindingFormViews))) : this.setting.bindingFormViews
          bindingFormViews = bindingFormViews || []
          if (bindingFormViews.length > 0) {
            const arr = []
            bindingFormViews.forEach(item => {
              if (item.templateId) {
                const {
                  fieldPermissions, id, listOrder, templateId, templateName, enableCondition
                } = item
                arr.push({
                  fieldPermissions, id, listOrder, templateId, templateName, enableCondition
                })
              }
            })
            bindingFormViews = arr
          }
          values.setting.bindingFormViews = bindingFormViews
          values.setting.dataWindowButtons = this.$refs.tool ? this.$refs.tool.myBarMenus : this.dataWindowButtons
          values.setting.formViewButtons = this.$refs.extendbutton ? this.$refs.extendbutton.formViewButtons : this.formViewButtons
          let myTemplate = this.$refs.tplviewdataquerier ? this.$refs.tplviewdataquerier.data : this.myTemplate
          myTemplate = myTemplate.map((item, index) => {
            item.listOrder = (index + 1) * 10
            return item
          })
          const commonFieldSearchers = myTemplate.filter(item => item.type === 'field') || []
          values.setting.commonFieldSearchers = commonFieldSearchers.map(item => {
            const { type, column, name, help, listOrder, fieldId, value, placeholder, fieldRule, changeTitle, formType } = item
            return {
              type, column, name, help, listOrder, fieldId, value, placeholder, fieldRule, changeTitle, formType
            }
          })
          const workflowSearchers = myTemplate.filter(item => item.type === 'workflowFilter') || []
          const workflowSearcher = workflowSearchers[0] || {}
          if (Object.keys(workflowSearcher).length > 0) {
            values.setting.workflowSearcher = workflowSearcher
          }
          values.setting.templateGroupSearchers = myTemplate.filter(item => item.type === 'searchTemplate')
          values.setting.multiFieldSearchers = myTemplate.filter(item => item.type === 'multiFieldSearch')
          const componentSearchers = myTemplate.filter(item => item.type === 'component') || []
          values.setting.componentSearchers = componentSearchers.map(item => {
            const { type, column, name, help, listOrder, attribute, id } = item
            return {
              type, column, name, help, listOrder, attribute, id
            }
          })
          values.setting.condition = this.setting.condition
          values.setting.searchSection = this.$refs.tplviewdataquerier && this.$refs.tplviewdataquerier.searchSection
          values.setting.helpText = this.setting.helpText
          values.value = this.config.tableId
          values.module = this.config.module
          values.type = this.config.type
          if (this.config.action === 'edit') {
            values.id = this.data.id
            values.templateId = this.data.templateId
          }
          if (this.config.type === 'tableCardWindow' && this.$refs.kFormDesign) {
            values.setting.cardTemplate = this.$refs.kFormDesign.data.list
            values.setting.fieldColumns.forEach(item => {
              item.display = 'v'
            })
          }
          this.axios({
            url: '/admin/template/checkRepeat',
            data: { id: this.config.action === 'edit' ? this.data.id : 0, name: values.name, type: this.config.type, tableId: this.config.tableId }
          }).then((res) => {
            if (res.code) {
              this.$message.error(res.message)
              this.loading = false
            } else {
              this.loading = true
              this.axios({
                url: this.config.submitUrl || this.config.url,
                data: {
                  id: values.id,
                  name: values.name,
                  setting: values.setting,
                  accessLevel: values.accessLevel ? values.accessLevel : this.data.accessLevel,
                  remarks: values.remarks
                }
              }).then((res) => {
                this.loading = false
                if (res.result) {
                  this.$emit('ok', values, res.result.templateId)
                  this.$emit('refresh', values, res.result.id)
                } else {
                  this.$emit('ok', values)
                  this.$emit('refresh', values, this.data.id)
                }
                if (res.code) {
                  this.$message.warning(res.message)
                } else {
                  this.$message.success(res.message)
                  if (this.config.action !== 'edit') {
                    this.config.action = 'edit'
                    this.config.submitUrl = ''
                    this.data.id = res.result.id
                    this.data.templateId = res.result.templateId
                  }
                }
              })
            }
          })
        } else {
          this.activeKey = '1'
          this.$message.warning(this.$t('表单填写不符合要求，请参考页面内具体提示修改'))
        }
      })
    },
    getQuerier (fieldColumns) {
      return fieldColumns.filter(item => {
        return ['image', 'file', 'editor', 'web_sub_data_window'].indexOf(item.formType) === -1
      })
    }
  }
}
</script>
