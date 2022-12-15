<template>
  <div>
    <a-spin :spinning="loading">
      <div style="margin-bottom: 10px; display: flex">
        <a-space>
          <a-button @click="checkShow">{{ $t('选择字段') }}</a-button>
          <a-button @click="batchShow">{{ $t('批量设置') }}</a-button>
          <a-button v-if="type === 'webSubformDataWindow'" @click="formRuleShow">{{ $t('表单规则') }}</a-button>
          <a-dropdown>
            <a-menu slot="overlay" @click="handlePosition">
              <a-menu-item key="left">
                {{ $t('居左') }}
              </a-menu-item>
              <a-menu-item key="center">
                {{ $t('居中') }}
              </a-menu-item>
              <a-menu-item key="right">
                {{ $t('居右') }}
              </a-menu-item>
            </a-menu>
            <a-button>
              {{ $t('对齐') }}
              <a-icon type="down" />
            </a-button>
          </a-dropdown>
          <a-button icon="sort-ascending" @click="handleSort">{{ $t('排序') }}</a-button>
        </a-space>
        <a-input
          v-model="searchValue"
          :placeholder="$t('请输入字段显示名称搜索')"
          style="margin-left: 8px"
          @change="onSearch"
        />
      </div>
      <a-form :form="formTable">
        <a-table
          v-if="showFlag"
          ref="table"
          rowKey="id"
          :columns="columns"
          :dataSource="dataSource ? dataSource.filter((item) => !item.unshow) : []"
          size="small"
          :pagination="false"
          :scroll="scroll"
        >
          <template slot="sortId" slot-scope="text, record">
            <a-input-number v-model="record.sortId" step="10" :min="0" size="small" style="width: 50px" />
          </template>
          <template slot="customTitle" slot-scope="text, record, index">
            <a-row>
              <a-col :span="20">
                <a-form-item class="customTitle">
                  <a-input
                    v-decorator="[
                      record.alias,
                      { initialValue: record.customTitle || '', rules: [{ validator: checkName }] }
                    ]"
                    :disabled="record.alias === 'action'"
                    size="small"
                    style="width: 120px"
                    @change="(e) => getCustomTitle(e, index)"
                  >
                    <set-lang slot="addonAfter" />
                  </a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </template>
          <template slot="width" slot-scope="text, record">
            <a-input-number v-model="record.width" step="10" :min="0" size="small" style="width: 70px" />
          </template>
          <template slot="sorter" slot-scope="text, record">
            <a-checkbox
              :disabled="['textarea', 'image', 'file', 'editor'].includes(record.formType) || record.alias === 'action'"
              :checked="record.sorter"
              @change="
                (e) => {
                  record.sorter = e.target.checked
                  $forceUpdate()
                }
              "
            ></a-checkbox>
          </template>
          <template slot="align" slot-scope="text, record">
            <a-radio-group
              :disabled="record.alias === 'action'"
              :value="record.align"
              size="small"
              @change="
                (e) => {
                  record.align = e.target.value
                }
              "
            >
              <a-radio-button value="left">{{ $t('左') }}</a-radio-button>
              <a-radio-button value="center">{{ $t('中') }}</a-radio-button>
              <a-radio-button value="right">{{ $t('右') }}</a-radio-button>
            </a-radio-group>
          </template>
          <template slot="display" slot-scope="text, record">
            <a-checkbox
              :checked="record.display === 'h'"
              @change="
                (e) => {
                  record.display = e.target.checked ? 'h' : 'v'
                }
              "
            ></a-checkbox>
          </template>
          <template slot="rule" slot-scope="text, record, index">
            <a-radio-group
              :value="record.rule || 'allow'"
              size="small"
              @change="
                (e) => {
                  choiceRule(e, record, index)
                }
              "
            >
              <a-radio-button value="allow">{{ $t('允许') }}</a-radio-button>
              <a-radio-button value="readonly">{{ $t('只读') }}</a-radio-button>
              <a-radio-button value="hidden">{{ $t('隐藏') }}</a-radio-button>
            </a-radio-group>
          </template>
          <template slot="style" slot-scope="text, record, index">
            <a :disabled="record.alias === 'action'" @click="exteriorEdit(record, index)">
              <a-badge
                :status="
                  record.style &&
                  (record.style.fontsize != '13px' || record.style.color != '' || record.style.bgcolor != '')
                    ? 'success'
                    : 'default'
                "
              />
              {{ $t('设置') }}
            </a>
          </template>
          <template slot="attribute" slot-scope="text, record, index">
            <a :disabled="record.alias === 'action'" @click="handleEdit(record, index)">
              <a-badge :status="record.attribute ? 'success' : 'default'" />
              {{ $t('设置') }}
            </a>
          </template>
          <template slot="action" slot-scope="text, record, index">
            <a v-if="record.alias === 'action'" @click="actionSetting(record)">{{ $t('设置') }}</a>
            <a-divider v-if="record.alias === 'action'" type="vertical" />
            <a-popconfirm
              :title="$t('您确定要删除该记录?')"
              :ok-text="$t('确定')"
              :cancel-text="$t('取消')"
              @confirm="handleDelete(index)"
            >
              <a :disabled="record.alias === 'action'">{{ $t('删除') }}</a>
            </a-popconfirm>
          </template>
        </a-table>
      </a-form>
    </a-spin>
    <a-modal
      :title="$t('外观设置')"
      :visible="visible"
      :destroyOnClose="true"
      @ok="handleOk"
      @cancel="visible = !visible"
    >
      <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" @submit="handleOk">
        <a-form-item>
          <span slot="label">
            {{ $t('字体大小') }}
            <a-tooltip placement="top">
              <template slot="title">
                <span>{{ $t('字体大小默认为13px') }}</span>
              </template>
              <a-icon type="question-circle" />
            </a-tooltip>
          </span>
          <a-select
            v-decorator="[
              'fontsize',
              { initialValue: exteriordata.style && exteriordata.style.fontsize ? exteriordata.style.fontsize : '13px' }
            ]"
          >
            <a-select-option v-for="(value, index) in fontsize" :key="index" :value="value">
              {{ value }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('字体颜色')">
          <a-row type="flex">
            <a-col flex="auto">
              <a-input
                v-decorator="[
                  'color',
                  { initialValue: exteriordata.style && exteriordata.style.color ? exteriordata.style.color : '' }
                ]"
              />
            </a-col>
            <a-col>
              <a-dropdown>
                <a-button>{{ $t('选择') }}</a-button>
                <a-menu slot="overlay">
                  <a-sub-menu
                    v-for="(value, index) in colorTitle"
                    :key="index"
                    :title="value.name"
                    :style="{ 'background-color': value.color }"
                  >
                    <a-menu-item
                      v-for="(values, indexs) in colorAll[index]"
                      :key="indexs"
                      :style="{ 'background-color': values }"
                      @click="sendColor('color', values)"
                    >
                      {{ values }}
                    </a-menu-item>
                  </a-sub-menu>
                </a-menu>
              </a-dropdown>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item :label="$t('背景颜色')">
          <a-row type="flex">
            <a-col flex="auto">
              <a-input
                v-decorator="[
                  'bgcolor',
                  { initialValue: exteriordata.style && exteriordata.style.bgcolor ? exteriordata.style.bgcolor : '' }
                ]"
              />
            </a-col>
            <a-col>
              <a-dropdown>
                <a-button>{{ $t('选择') }}</a-button>
                <a-menu slot="overlay">
                  <a-sub-menu
                    v-for="(value, index) in colorTitle"
                    :key="index"
                    :title="value.name"
                    :style="{ 'background-color': value.color }"
                  >
                    <a-menu-item
                      v-for="(values, indexs) in colorAll[index]"
                      :key="indexs"
                      :style="{ 'background-color': values }"
                      @click="sendColor('bgcolor', values)"
                    >
                      {{ values }}
                    </a-menu-item>
                  </a-sub-menu>
                </a-menu>
              </a-dropdown>
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      :title="$t('操作列设置')"
      :visible="actionVisible"
      :width="600"
      :destroyOnClose="true"
      @cancel="actionVisible = !actionVisible"
    >
      <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-form-item :label="$t('操作列样式')">
          <a-radio-group
            v-decorator="[
              'actionStyle',
              {
                initialValue: actionItem.actionStyle || '2',
                rules: [{ required: true, message: $t('请选择操作列样式') }]
              }
            ]"
            @change="actionTypeChange"
          >
            <a-radio value="2" style="width: 100%; display: flex; align-items: center">
              <a-form-item style="display: inline-block">
                {{ $t('最多展示') }}
                <a-tooltip
                  :title="
                    $t(
                      '当设置为3时，如果有3个行菜单按钮，会全部显示。如果有4个行菜单按钮，排序前2名的显示，后2名的收起在”更多“中。默认：3，范围2-10。'
                    )
                  "
                >
                  <a-icon type="question-circle" />
                </a-tooltip>
                <a-input-number
                  v-decorator="[
                    'maxDisplay',
                    {
                      initialValue: actionItem.maxDisplay || 3,
                      rules: [{ required: true, message: $t('请输入最多展示按钮数') }]
                    }
                  ]"
                  style="margin: 0px 8px"
                  :min="2"
                  :max="10"
                />
                {{ $t('个按钮，超出部分显示在“更多”中') }}
              </a-form-item>
            </a-radio>
            <a-radio value="1" style="width: 100%">
              {{ $t('全部展开') }}
              <a-tooltip
                :title="$t('显示所有行菜单按钮，请注意适当设置操作列的列宽。3个2个字符的行菜单按钮，建议列宽160px。')"
              >
                <a-icon type="question-circle" />
              </a-tooltip>
            </a-radio>
            <a-radio value="0" style="width: 100%; margin-top: 8px">
              {{ $t('全部收起') }}
              <a-tooltip :title="$t('收起所有行菜单按钮在竖行的“…”中，操作列默认设置为60px。')">
                <a-icon type="question-circle" />
              </a-tooltip>
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :label="$t('操作列宽度')">
          <a-input-number
            v-decorator="[
              'width',
              { initialValue: actionItem.width, rules: [{ required: true, message: $t('请输入操作列宽度') }] }
            ]"
            :min="0"
            :max="1000"
          />
          px
        </a-form-item>
      </a-form>
      <div slot="footer">
        <a-button type="primary" @click="actionHandleOk">{{ $t('保存') }}</a-button>
        <a-button @click="actionVisible = !actionVisible">{{ $t('关闭') }}</a-button>
      </div>
    </a-modal>
    <!-- 设置附加属性 -->
    <CodeEditor ref="codeEditor" :columnData="dataSource" @func="getCode" />
    <drag-sort ref="dragSort" @ok="getList" />
    <column-check ref="columnCheck" :dataList="dataSource" :fieldCategory="fieldCategory" @ok="getList" />
    <column-batch ref="columnBatch" @ok="getList" />
    <!-- 表单规则 -->
    <querier-form-rule ref="querierFormRule" @ok="getRule" />
  </div>
</template>
<script>
import { magenta, red, volcano, orange, yellow, gold, cyan, lime, green, blue, geekblue, purple } from '@ant-design/colors'
export default {
  i18n: window.lang('admin'),
  components: {
    CodeEditor: () => import('@/views/admin/CodeEditor'),
    ColumnCheck: () => import('./ColumnCheck'),
    ColumnBatch: () => import('./ColumnBatch'),
    QuerierFormRule: () => import('@/views/admin/Table/QuerierFormRule'),
    DragSort: () => import('@/views/admin/Common/DragSort'),
    SetLang: () => import('@/components/SetLang')
  },
  props: {
    fieldColumns: {
      type: Array,
      default () {
        return []
      },
      required: true
    },
    fieldMappings: {
      type: Array,
      default () {
        return []
      },
      required: true
    },
    fieldCategory: {
      type: Array,
      default () {
        return []
      },
      required: false
    },
    setting: {
      type: Object,
      default () {
        return {}
      }
    },
    action: {
      type: String,
      default () {
        return null
      },
      required: true
    },
    type: {
      type: String,
      default: ''
    },
    tableId: {
      type: String,
      default: ''
    },
    tableType: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    return {
      showFlag: true,
      advanced: false,
      checked: false,
      visible: false,
      actionVisible: false,
      // 操作列参数
      actionItem: {},
      fontsize: [],
      exteriordata: {},
      loading: false,
      exteriorkey: '',
      form: this.$form.createForm(this),
      formTable: this.$form.createForm(this),
      // 搜索参数
      queryParam: {},
      dataSource: [],
      data: {},
      scroll: {},
      recordIndex: 0, //  添加附加属性的index
      // 表头
      columns: [{
        title: '#',
        width: 40,
        customRender: (text, record, index) => {
          return index + 1
        }
      }, {
        title: this.$t('字段系统名'),
        dataIndex: 'alias',
        width: this.tableType !== 'ui' ? 160 : 100
      }, {
        title: this.$t('字段显示名'),
        dataIndex: 'title',
        width: this.tableType !== 'ui' ? 160 : 100
      }, {
        title: this.$t('列显示名'),
        dataIndex: 'customTitle',
        width: this.tableType !== 'ui' ? 160 : 130,
        scopedSlots: { customRender: 'customTitle' }
      }, {
        title: this.$t('列宽'),
        dataIndex: 'width',
        width: this.tableType !== 'ui' ? 120 : 80,
        scopedSlots: { customRender: 'width' }
      }, {
        title: this.$t('排序'),
        dataIndex: 'sorter',
        width: this.tableType !== 'ui' ? 60 : 40,
        scopedSlots: { customRender: 'sorter' }
      }, {
        title: this.$t('对齐'),
        dataIndex: 'align',
        width: this.tableType !== 'ui' ? 140 : 120,
        scopedSlots: { customRender: 'align' }
      }, {
        title: this.$t('隐藏'),
        dataIndex: 'display',
        width: this.tableType !== 'ui' ? 60 : 40,
        scopedSlots: { customRender: 'display' }
      }, {
        title: this.$t('合计'),
        dataIndex: 'total',
        width: this.tableType !== 'ui' ? 80 : 40,
        scopedSlots: { customRender: 'total' }
      }, {
        title: this.$t('外观设置'),
        dataIndex: 'style',
        scopedSlots: { customRender: 'style' }
      }, {
        title: this.$t('附加属性'),
        dataIndex: 'attribute',
        scopedSlots: { customRender: 'attribute' }
      }, {
        title: this.$t('操作'),
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
      }],
      aligns: [
        { value: 'left', text: this.$t('居左') },
        { value: 'center', text: this.$t('居中') },
        { value: 'right', text: this.$t('居右') }
      ],
      displays: [
        { value: 'v', text: this.$t('显示') },
        { value: 'h', text: this.$t('隐藏') },
        { value: 'd', text: this.$t('禁用') }
      ],
      searchValue: '',
      colorAll: [],
      colorTitle: [],
      fieldRule: [],
      afterInit: '',
      beforeSubmit: ''
    }
  },
  watch: {
    fieldColumns (newValue) {
      this.showFlag = false
      this.$nextTick(() => {
        this.showFlag = true
      })
      if (this.action === 'edit' || this.action === 'copy') {
        this.dataSource = this.setting.fieldColumns ? this.setting.fieldColumns.filter(item => item && item.display !== 'd') : []
        this.dataSource.forEach(item => {
          item.unshow = ''
          if (['textarea', 'image', 'file', 'editor'].includes(item.formType)) {
            item.sorter = false
          } else {
            item.sorter = item.sorter || false
          }
        })
      } else {
        this.dataSource = []
      }
      this.data = newValue
      this.data = newValue.map(item => {
        item.rule = item.rule || 'readonly'
        item.sorter = false
        return item
      })

      // 初始化表单规则，加载后脚本，提交前脚本
      const { fieldRule, afterInit, beforeSubmit } = this.setting
      this.fieldRule = fieldRule
      this.afterInit = afterInit
      this.beforeSubmit = beforeSubmit
    }
  },
  created () {
    if (this.action === 'edit') {
      this.dataSource = this.setting.fieldColumns ? this.setting.fieldColumns.filter(item => item && item.display !== 'd') : []
      this.dataSource.forEach(item => {
        item.unshow = ''
        if (['textarea', 'image', 'file', 'editor'].includes(item.formType)) {
          item.sorter = false
        } else {
          item.sorter = item.sorter || false
        }
      })
    }
    for (let i = 8; i <= 24; i++) {
      this.fontsize.push(i + 'px')
    }
    this.scroll.y = document.body.clientHeight - 300
    this.data = this.fieldColumns
    if (this.action === 'add') {
      for (const i in this.data) {
        if (this.data[i].formType === 'number') {
          this.data[i].align = 'right'
        } else if (this.data[i].formType === 'datetime') {
          this.data[i].align = 'center'
        }
        this.data[i].display = 'd'
        this.data[i].sorter = false
      }
    }
    if (this.type === 'webSubformDataWindow') {
      this.columns.splice(7, 1, {
        title: this.$t('输入规则'),
        width: 140,
        dataIndex: 'rule',
        scopedSlots: { customRender: 'rule' }
      })
    }
    this.colorAll = []
    this.colorTitle = []
    this.colorAll.push(magenta, red, volcano, orange, yellow, gold, cyan, lime, green, blue, geekblue, purple)
    this.colorAll.push(['#ffffff', '#fafafa', '#f5f5f5', '#f0f0f0', '#d9d9d9', '#bfbfbf', '#8c8c8c', '#595959', '#434343', '#262626', '#1f1f1f', '#141414', '#000000'])
    this.colorTitle.push(
      { name: 'magenta', color: '#eb2f96' },
      { name: 'red', color: '#f5222d' },
      { name: 'volcano', color: '#fa541c' },
      { name: 'orange', color: '#fa8c16' },
      { name: 'yellow', color: '#fadb14' },
      { name: 'gold', color: '#faad14' },
      { name: 'cyan', color: '#13c2c2' },
      { name: 'lime', color: '#a0d911' },
      { name: 'green', color: '#52c41a' },
      { name: 'blue', color: '#1890ff' },
      { name: 'geekblue', color: '#2f54eb' },
      { name: 'purple', color: '#722ed1' },
      { name: 'gray', color: '#bfbfbf' })
  },
  methods: {
    handlePosition (e) {
      const value = e.key
      this.dataSource.forEach(item => {
        if (item.alias !== 'action') {
          item.align = value
        }
      })
    },
    // 显示名称验证是否重复
    checkName (rule, value, callback) {
      const data = this.dataSource.filter(item => item.alias !== rule.field)
      const string = this.$t('列显示名重复')
      if (data.some(item => item.customTitle && item.customTitle === value) || data.some(item => !item.customTitle && item.name && item.name === value)) {
        callback(string)
      } else {
        callback()
      }
    },
    getCustomTitle (e, index) {
      this.dataSource[index].customTitle = e.target.value
    },
    checkShow () {
      this.$refs.columnCheck.show({
        action: this.action,
        title: this.$t('选择字段'),
        data: this.fieldMappings.filter(item => item.alias !== 'action')
      })
    },
    sendColor (type, color) {
      if (type === 'color') {
        this.form.setFieldsValue({ color: color })
      } else {
        this.form.setFieldsValue({ bgcolor: color })
      }
    },
    batchShow () {
      this.$refs.columnBatch.show({
        action: this.action,
        title: this.$t('批量设置'),
        data: this.dataSource.filter(item => item.alias !== 'action')
      })
    },
    exteriorEdit (record, index) {
      this.exteriordata = record
      this.visible = true
      this.exteriorkey = index
    },
    // 表单规则
    formRuleShow () {
      this.$refs.querierFormRule.show({
        title: this.$t('表单规则'),
        page: 'column',
        fieldRule: this.fieldRule || [],
        afterInit: this.afterInit || '',
        beforeSubmit: this.beforeSubmit || '',
        tableId: this.tableId
      })
    },
    getRule (data) {
      const { fieldRule, afterInit, beforeSubmit } = data
      this.fieldRule = fieldRule
      this.afterInit = afterInit
      this.beforeSubmit = beforeSubmit
    },
    handleOk (e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.dataSource[this.exteriorkey]['style'] = values
          this.visible = false
        }
      })
    },
    onSearch () {
      const value = this.searchValue
      this.dataSource.forEach(item => {
        if (value) {
          if (item.name.includes(value)) {
            item.unshow = ''
          } else {
            item.unshow = true
          }
        } else {
          this.dataSource.forEach(item => { item.unshow = '' })
        }
      })
    },
    // 排序
    handleSort () {
      this.$refs.dragSort.show({
        action: 'sort',
        title: this.$t('排序'),
        sortName: 'title',
        sortData: this.dataSource.filter(item => item.alias !== 'action')
      })
    },
    // 获取重新排序列表
    getList (data) {
      const array = data.map((item, index) => {
        item.sortId = String((index + 3) * 10)
        item.unshow = ''
        item.sorter = false
        item.width = item.width || 150
        const objItem = this.dataSource.find(dataItem => dataItem.alias === item.alias)
        if (objItem) {
          objItem.sortId = String((index + 3) * 10)
          objItem.title = objItem.title || objItem.name
          objItem.display = objItem.display || 'v'
          return objItem
        } else {
          item.rule = 'allow'
          item.title = item.title || item.name
          item.display = item.display || 'v'
          return item
        }
      })
      this.dataSource = this.dataSource.filter(item => item.alias === 'action')
      this.dataSource = [...this.dataSource, ...array]
    },
    onCellChange (key, dataIndex, value) {
      const dataSource = [...this.dataSource]
      const target = dataSource.find(item => item.id === key)
      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
      }
    },
    handleEdit (record, index) {
      this.recordIndex = index
      this.$refs.codeEditor.show({
        value: record.attribute || ''
      })
    },
    choiceRule (e, record, index) {
      record.rule = e.target.value
      this.dataSource.splice(index, 1, record)
    },
    // 获取附加属性
    getCode (value) {
      var index = this.recordIndex
      this.dataSource[index].attribute = value
    },
    // 删除
    handleDelete (index) {
      this.dataSource.splice(index, 1)
    },
    // 操作列设置
    actionSetting (item) {
      this.actionItem = JSON.parse(JSON.stringify(item))
      this.actionVisible = true
    },
    // 操作列样式change事件
    actionTypeChange (e) {
      this.actionItem.actionStyle = e.target.value
      if (this.actionItem.actionStyle === '0') {
        this.form.setFieldsValue({
          width: 60
        })
      }
    },
    // 操作列设置提交
    actionHandleOk (e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          Object.assign(this.dataSource[0], values)
          this.actionVisible = false
        }
      })
    }
  }
}
</script>
<style scoped>
.editable-cell {
  position: relative;
}
.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
.customTitle >>> .ant-form-item-control {
  line-height: 24px;
}
</style>
