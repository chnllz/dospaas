<template>
  <a-form :form="form">
    <!-- 下拉框 -->
    <template v-if="formType === 'combobox'">
      <a-form-item :label="$t('输入提示')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['setting[attribute][emptyText]', { initialValue: data.attribute.emptyText || '' }]" />
      </a-form-item>
      <a-form-item :label="$t('可选择数据模式')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-radio-group
          v-decorator="[
            'setting[attribute][mode]',
            {
              initialValue: data.attribute.mode || 'default',
              rules: [{ required: true, message: $t('可选择数据模式不能为空') }]
            }
          ]"
          @change="
            (e) => {
              mode = e.target.value
            }
          "
        >
          <a-radio value="default">{{ $t('单选') }}</a-radio>
          <a-radio value="multiple">{{ $t('多选') }}</a-radio>
        </a-radio-group>
      </a-form-item>
    </template>
    <!-- 单选框 -->
    <template v-else-if="formType === 'radio'">
      <a-form-item :label="$t('展现形式')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-radio-group
          v-decorator="[
            'setting[attribute][style]',
            {
              initialValue: data.attribute.style || 'radio',
              rules: [{ required: true, message: $t('展现形式不能为空') }]
            }
          ]"
        >
          <a-radio value="radio" style="width: 80px">radio</a-radio>
          <a-radio value="btn">{{ $t('按钮样式') }}</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :label="$t('选项宽度')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-radio-group
          v-decorator="[
            'setting[attribute][optionType]',
            {
              initialValue: data.attribute.optionType || 'self',
              rules: [{ required: true, message: $t('选项宽度不能为空') }]
            }
          ]"
          @change="changeType"
        >
          <a-radio value="self" style="width: 80px">{{ $t('自适应') }}</a-radio>
          <a-radio value="line" style="width: 100px">{{ $t('一行一个') }}</a-radio>
          <a-radio value="fixed">
            {{ $t('固定宽度') }}
            <a-input-number
              v-decorator="['setting[attribute][optionWidth]', { initialValue: data.attribute.optionWidth }]"
              size="small"
              style="width: 60px"
              :max="1000"
              :min="100"
            />
            px
          </a-radio>
        </a-radio-group>
      </a-form-item>
    </template>
    <!-- 多选框 -->
    <template v-else>
      <a-form-item :label="$t('显示全选')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-switch
          v-decorator="[
            'setting[attribute][checkAll]',
            { initialValue: data.attribute.checkAll === '1' ? true : false, valuePropName: 'checked' }
          ]"
          :un-checked-children="$t('否')"
          :checked-children="$t('是')"
        />
      </a-form-item>
      <a-form-item :label="$t('允许勾选个数')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-row>
          <a-col :span="4">
            <a-form-item>
              <a-input-number
                v-decorator="[
                  'setting[attribute][minCheckedLength]',
                  { initialValue: data.attribute.minCheckedLength || null }
                ]"
                style="width: 100%"
                :min="0"
                @change="
                  (e) => {
                    minCheckedLength = e
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col :span="1" style="text-align: center">至</a-col>
          <a-col :span="4">
            <a-form-item>
              <a-input-number
                v-decorator="[
                  'setting[attribute][maxCheckedLength]',
                  { initialValue: data.attribute.maxCheckedLength || null }
                ]"
                style="width: 100%"
                :min="minCheckedLength"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item :label="$t('选项宽度')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-radio-group
          v-decorator="[
            'setting[attribute][optionType]',
            {
              initialValue: data.attribute.optionType || 'self',
              rules: [{ required: true, message: $t('选项宽度不能为空') }]
            }
          ]"
          @change="changeType"
        >
          <a-radio value="self" style="width: 100px">{{ $t('自适应') }}</a-radio>
          <a-radio value="line" style="width: 100px">{{ $t('一行一个') }}</a-radio>
          <a-radio value="fixed">
            {{ $t('固定宽度') }}
            <a-input-number
              v-decorator="['setting[attribute][optionWidth]', { initialValue: data.attribute.optionWidth }]"
              size="small"
              style="width: 60px"
              :max="1000"
              :min="100"
            />
            px
          </a-radio>
        </a-radio-group>
      </a-form-item>
    </template>
    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
      <span slot="label">
        {{ $t('数据源') }}
        <a-tooltip>
          <template slot="title">
            <div>
              <div>{{ $t('数据字典：从数据字典中选择，key/value结构，存储key，显示value。') }}</div>
              <div>{{ $t('数据联动：根据本表某字段的值，联动筛选数据源。') }}</div>
              <div v-show="formType === 'combobox'">{{ $t('地址簿(回写)：用于地址选择字段回写省市区。') }}</div>
              <div v-show="formType === 'combobox'">{{ $t('数据字典(回写)：用于级联选择字段回写级联值。') }}</div>
            </div>
          </template>
          <a-icon type="question-circle" />
        </a-tooltip>
      </span>
      <a-select
        v-decorator="[
          'setting[attribute][dataSource]',
          {
            initialValue: data.attribute.dataSource || 'dictionary',
            rules: [{ required: true, message: $t('数据源不能为空') }]
          }
        ]"
        @change="choiceDataSource"
      >
        <a-select-option value="dictionary">{{ $t('数据字典') }}</a-select-option>
        <a-select-option value="linkData">{{ $t('数据联动') }}</a-select-option>
        <a-select-option v-if="formType === 'combobox'" value="addressBookBack">
          {{ $t('地址簿(回写)') }}
        </a-select-option>
        <a-select-option v-if="formType === 'combobox'" value="dictionaryBack">
          {{ $t('数据字典(回写)') }}
        </a-select-option>
      </a-select>
      <template v-if="dataSource === 'custom'">
        <a-row>
          <a
            href="#"
            @click="
              customDataList.splice(customDataList.length, 0, {
                id: new Date().valueOf() + customDataList.length,
                value: '',
                status: 'success',
                help: ''
              })
            "
          >
            {{ $t('添加一行') }}
          </a>
          <a-divider type="vertical"></a-divider>
          <a href="#" @click="openModal">{{ $t('批量编辑') }}</a>
          <a-divider type="vertical"></a-divider>
          <a href="#" @click="handleClear">{{ $t('清除默认选项') }}</a>
        </a-row>
        <!-- 单选 -->
        <a-radio-group v-if="mode === 'default'" style="width: 100%" :value="radioId" @change="onChange">
          <draggable v-model="customDataList" animation="200" handle=".mover" @start="drag = true" @end="drag = false">
            <a-form-item
              v-for="(item, index) in customDataList"
              :key="index"
              :validateStatus="item.status"
              :help="item.help"
            >
              <a-row type="flex" align="middle">
                <a-col :span="1" class="mover">
                  <a-icon type="drag" />
                </a-col>
                <a-col :span="1">
                  <a-radio :value="item.id" />
                </a-col>
                <a-col :span="12">
                  <a-input
                    v-model="item.value"
                    :placeholder="$t('请输入选项值')"
                    :maxLength="32"
                    @change="handleValidate(item, index)"
                  />
                </a-col>
                <a-col :span="1" class="center">
                  <a-icon
                    :style="{ fontSize: '26px', color: '#52c41a' }"
                    type="plus-square"
                    theme="filled"
                    @click="add(index)"
                  />
                </a-col>
                <a-col :span="1" class="center">
                  <a-icon
                    :style="{ fontSize: '26px', color: '#ff4d4f' }"
                    type="minus-square"
                    theme="filled"
                    @click="del(index)"
                  />
                </a-col>
              </a-row>
            </a-form-item>
          </draggable>
        </a-radio-group>
        <!-- 多选 -->
        <a-checkbox-group v-else style="width: 100%" :value="checkIds" @change="onChange">
          <draggable v-model="customDataList" animation="200" handle=".mover" @start="drag = true" @end="drag = false">
            <a-form-item
              v-for="(item, index) in customDataList"
              :key="index"
              :validateStatus="item.status"
              :help="item.help"
            >
              <a-row type="flex" align="middle">
                <a-col :span="1" class="mover">
                  <a-icon type="drag" />
                </a-col>
                <a-col :span="1">
                  <a-checkbox :value="item.id" />
                </a-col>
                <a-col :span="12">
                  <a-input
                    v-model="item.value"
                    :placeholder="$t('请输入选项值')"
                    :maxLength="32"
                    @change="handleValidate(item, index)"
                  />
                </a-col>
                <a-col :span="1" class="center">
                  <a-icon
                    :style="{ fontSize: '26px', color: '#52c41a' }"
                    type="plus-square"
                    theme="filled"
                    @click="add(index)"
                  />
                </a-col>
                <a-col :span="1" class="center">
                  <a-icon
                    :style="{ fontSize: '26px', color: '#ff4d4f' }"
                    type="minus-square"
                    theme="filled"
                    @click="del(index)"
                  />
                </a-col>
              </a-row>
            </a-form-item>
          </draggable>
        </a-checkbox-group>
      </template>
      <template v-if="dataSource === 'linkData'">
        <a-button @click="handleDefaultLink">{{ $t('数据联动') }}</a-button>
      </template>
    </a-form-item>
    <a-form-item
      v-if="dataSource === 'custom'"
      :label="$t('默认值生效时机')"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-select
        v-decorator="['setting[form][quoteType]', { initialValue: data.form.quoteType || 'insert' }]"
        :allowClear="true"
        :placeholder="$t('请选择默认值生效时机')"
      >
        <a-select-option v-for="quoteType in quoteTypes" :key="quoteType.value" :value="quoteType.value">
          {{ quoteType.text }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <template v-if="dataSource === 'dictionary'">
      <a-form-item :label="$t('数据字典')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-row>
          <a-select
            v-decorator="[
              'setting[form][src]',
              { initialValue: data.form.src || undefined, rules: [{ required: true, message: $t('数据字典不能为空') }] }
            ]"
            :placeholder="$t('请选择数据字典')"
            :showSearch="true"
            allowClear
            :show-arrow="false"
            option-filter-prop="children"
          >
            <a-select-option
              v-for="value in srcPath"
              :key="value.dictCategoryNumber"
              :value="value.dictCategoryNumber"
              @click="changeDefault(value.dictCategoryNumber, value.dictType)"
            >
              {{ value.dictCategoryName }}
            </a-select-option>
          </a-select>
        </a-row>
      </a-form-item>
      <a-form-item v-if="formType === 'combobox'" :label="$t('加载模式')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-radio-group
          v-decorator="[
            'setting[form][loadMode]',
            {
              initialValue: data.form.loadMode || 'static',
              rules: [{ required: true, message: $t('加载模式不能为空') }]
            }
          ]"
        >
          <a-radio value="static">{{ $t('静态') }}</a-radio>
          <a-radio value="dynamic">{{ $t('动态') }}</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :label="$t('可选范围')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-row type="flex" align="middle">
          <a-col :span="4">
            <a-select
              v-decorator="['setting[form][optionRange]', { initialValue: setting.form.optionRange || '3' }]"
              @change="
                (value) => {
                  optionValue = value
                }
              "
            >
              <a-select-option value="3">{{ $t('不限制') }}</a-select-option>
              <a-select-option v-if="dictType === 'basic'" value="0">{{ $t('自定义') }}</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="20">
            <a-select
              v-if="optionValue === '0'"
              v-decorator="['setting[form][optionalRange]', { initialValue: setting.form.optionalRange || [] }]"
              mode="multiple"
              :placeholder="$t('请选择可选范围')"
              allowClear
              showSearch
              option-filter-prop="children"
            >
              <a-select-option v-for="item in dictArr" :key="item.value" :value="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
        <span slot="label">
          {{ $t('默认值') }}
          <a-tooltip placement="top">
            <span slot="title">
              <div>{{ $t('打开表单视图时，该字段默认显示的值。按生效时机分为：新建时、新建+编辑时。') }}</div>
            </span>
            <a-icon type="question-circle" />
          </a-tooltip>
        </span>
        <a-row type="flex" align="middle">
          <a-col :span="4">
            <a-select
              v-decorator="['setting[form][defaultTemplate]', { initialValue: setting.form.defaultTemplate || '' }]"
              :placeholder="$t('请选择默认值模板')"
              @change="
                (e) => {
                  setting.form.defaultTemplate = e
                  if (e === 'formula' && !setting.form.defaultFormula) {
                    setting.form.defaultFormula = {
                      value: '',
                      html: ''
                    }
                  }
                }
              "
            >
              <a-select-option
                v-for="defaultTemplate in defalutTemplates"
                :key="defaultTemplate.value"
                :value="defaultTemplate.value"
              >
                {{ defaultTemplate.text }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="20">
            <a-form-item>
              <a-select
                v-if="setting.form.defaultTemplate === 'value'"
                v-decorator="['setting[form][defaultValue]', { initialValue: data.form.defaultValue || undefined }]"
                :placeholder="$t('请选择默认值')"
                allowClear
                showSearch
                option-filter-prop="children"
                :mode="
                  !['radio'].includes(formType)
                    ? ['combobox'].includes(formType) && mode == 'default'
                      ? 'default'
                      : 'multiple'
                    : 'default'
                "
              >
                <a-select-option v-for="item in dictArr" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
              <a-row v-else-if="setting.form.defaultTemplate === 'formula'" type="flex" align="middle">
                <a-col :span="24">
                  <querier-codemirror-input
                    ref="querierCodemirrorInput"
                    :lineStyle="{ lineHeight: '18px' }"
                    :params.sync="setting.form.defaultFormula"
                  />
                </a-col>
                <div style="position: absolute; right: -570px; cursor: pointer; z-index: 10" @click="handleCodemirror">
                  fx
                </div>
                <a-input
                  v-show="false"
                  v-decorator="[
                    'defaultValueCheck',
                    {
                      initialValue: setting.form.defaultFormula ? setting.form.defaultFormula.value : '',
                      rules: [{ required: true, message: $t('请输入默认值') }]
                    }
                  ]"
                />
              </a-row>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item
        v-if="setting.form.defaultTemplate"
        :label="$t('默认值生效时机')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          v-decorator="['setting[form][quoteType]', { initialValue: data.form.quoteType || 'insert' }]"
          :placeholder="$t('请选择默认值生效时机')"
        >
          <a-select-option v-for="quoteType in quoteTypes" :key="quoteType.value" :value="quoteType.value">
            {{ quoteType.text }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
        <span slot="label">
          {{ $t('数据保存时强制更新') }}
          <a-tooltip placement="top" :title="$t('后端事件。无论前端提交什么数据，将强制执行该更新策略。')">
            <a-icon type="question-circle" />
          </a-tooltip>
        </span>
        <a-switch
          v-decorator="[
            'setting[form][forcedUpdate]',
            { initialValue: data.form.forcedUpdate == 1 ? true : false, valuePropName: 'checked' }
          ]"
          @change="(checked) => (data.form.forcedUpdate = checked)"
        />
      </a-form-item>
      <a-form-item
        v-if="Number(data.form.forcedUpdate) || data.form.forcedUpdate == 1"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <span slot="label">
          {{ $t('强制更新为') }}
          <a-tooltip placement="top" :title="$t('其定义数据强制更新策略，支持公式编辑器。')">
            <a-icon type="question-circle" />
          </a-tooltip>
        </span>
        <a-select
          v-decorator="[
            'setting[form][forcedDefaultValue]',
            {
              initialValue: data.form.forcedDefaultValue || undefined,
              rules: [{ required: true, message: $t('默认值不能为空') }]
            }
          ]"
          :placeholder="$t('请选择默认值')"
          allowClear
          showSearch
          option-filter-prop="children"
          :mode="
            !['radio'].includes(formType)
              ? ['combobox'].includes(formType) && mode == 'default'
                ? 'default'
                : 'multiple'
              : 'default'
          "
        >
          <a-select-option v-for="item in dictArr" :key="item.value" :value="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        v-if="Number(data.form.forcedUpdate) || data.form.forcedUpdate == 1"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <span slot="label">
          {{ $t('强制更新时机') }}
          <a-tooltip placement="top">
            <span slot="title">
              <div>{{ $t('强制更新的时机。') }}</div>
              <div>{{ $t('新建时：仅新建数据时执行默认值策略。') }}</div>
              <div>{{ $t('新建+编辑时：新建数据、编辑数据时，均执行默认值策略。') }}</div>
            </span>
            <a-icon type="question-circle" />
          </a-tooltip>
        </span>
        <a-select
          v-decorator="['setting[form][forcedQuoteType]', { initialValue: setting.form.forcedQuoteType || 'insert' }]"
          :placeholder="$t('请选择默认值生效时机')"
        >
          <a-select-option v-for="quoteType in quoteTypes" :key="quoteType.value" :value="quoteType.value">
            {{ quoteType.text }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </template>
    <template v-else-if="dataSource === 'otherTable'">
      <a-form-item :label="$t('源数据表')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-cascader
          v-decorator="[
            'setting[form][tableName]',
            { initialValue: data.form.tableName || [], rules: [{ required: true, message: $t('请选择源数据表') }] }
          ]"
          :placeholder="$t('请选择源数据表')"
          :options="tableField"
          :show-search="true"
          option-filter-prop="children"
          @change="handleTable"
        />
      </a-form-item>
      <a-form-item :label="$t('源数据表名称字段')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-select
          v-decorator="[
            'setting[form][nameField]',
            {
              initialValue: data.form.nameField || undefined,
              rules: [{ required: true, message: $t('请选择源数据表字段') }]
            }
          ]"
          :placeholder="$t('请选择源数据表字段')"
          show-search
          option-filter-prop="children"
        >
          <a-select-option v-for="item in fields" :key="item.fieldId" :value="item.alias">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label="$t('源数据表编号字段')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-select
          v-decorator="[
            'setting[form][numberField]',
            {
              initialValue: data.form.numberField || undefined,
              rules: [{ required: true, message: $t('请选择源数据表字段') }]
            }
          ]"
          :placeholder="$t('请选择源数据表字段')"
          show-search
          option-filter-prop="children"
        >
          <a-select-option v-for="item in fields" :key="item.fieldId" :value="item.alias">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label="$t('过滤条件')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-button size="small" @click="codeEditor">
          <a-badge v-if="attributeFlag" status="success" :text="$t('条件设置')" />
          <a-badge v-else status="default" :text="$t('条件设置')" />
        </a-button>
      </a-form-item>
    </template>
    <a-modal :title="$t('批量编辑')" :visible="visible" @ok="handleOk" @cancel="visible = !visible">
      <a-space direction="vertical" style="width: 100%">
        <a-alert>
          <div slot="message">
            <div>{{ $t('1、一行一个，空行将被自动删除。') }}</div>
            <div>{{ $t('2、重复内容将被自动删除。') }}</div>
          </div>
        </a-alert>
        <a-textarea v-model="edits" :auto-size="{ minRows: 7, maxRows: 10 }" :placeholder="$t('请输入')" />
      </a-space>
    </a-modal>
    <dict-form ref="dictForm" />
    <formula-edit ref="FormulaEdit" :key="refreshKey" :params="formulaData" @ok="handleFormulate" />
    <DateLinkage ref="dataLinkage" :key="linkKey" @ok="getDateLinkage" />
    <form-rule-way-condition ref="formRuleWayCondition" @func="getCondition" />
  </a-form>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
    draggable: () => import('vuedraggable'),
    FormulaEdit: () => import('./FormulaEdit'),
    dictForm: () => import('../Dict/DictForm'),
    DateLinkage: () => import('./DataLinkage'),
    FormRuleWayCondition: () => import('@/views/admin/Flow/modules/FormRuleWayCondition'),
    QuerierCodemirrorInput: () => import('@/views/admin/Table/QuerierCodemirrorInput')
  },
  props: {
    setting: {
      type: Object,
      default: () => { }
    },
    tableField: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: () => { }
    },
    dataOld: {
      type: Object,
      default: () => { }
    },
    formType: {
      type: String,
      default: ''
    },
    parentNumber: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      linkKey: 'linkKey',
      refreshKey: 'formula',
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      minCheckedLength: null,
      maxCheckedLength: null,
      form: this.$form.createForm(this),
      visible: false,
      data: {},
      dataSource: '',
      customDataList: [{ id: 1, value: '', status: 'success', help: '' }],
      drag: true,
      mode: 'default',
      radioId: '',
      radioValue: '',
      checkIds: [],
      checkValue: [],
      edits: '',
      options: [],
      pathFlag: false,
      path: [],
      srcPath: [],
      defalutTemplates: [
        { value: '', text: this.$t('不设置') },
        { value: 'value', text: this.$t('自定义') },
        { value: 'formula', text: this.$t('公式编辑') }
      ],
      quoteTypes: [
        { value: 'insert', text: this.$t('新建时') },
        { value: 'always', text: this.$t('新建+编辑时') }
      ],
      dictArr: [],
      fields: [],
      tableId: '',
      formulaData: {},
      attributeFlag: false, // 设置
      optionValue: '3', // 可选范围
      dictType: 'basic' // 数据字典类型
    }
  },
  watch: {
    setting: {
      handler (newVal) {
        this.data = JSON.parse(JSON.stringify(newVal))
        this.mode = this.data.attribute.mode
        this.data.form = this.data.form && !(this.data.form instanceof Array) ? this.data.form : {}
        this.data.attribute = this.data.attribute && !(this.data.attribute instanceof Array) ? this.data.attribute : {}
        this.setting.form.formulateValue = this.setting.form.formulateValue ?? {}
        this.attributeFlag = !!this.setting.form.formulateValue.value
        this.dataSource = this.data.attribute.dataSource || 'dictionary'
        this.optionValue = this.data.form.optionRange
        switch (this.dataSource) {
          case 'custom':
            this.customDataList = this.data.form.customDataList || this.customDataList
            if (this.mode === 'default') {
              this.radioId = this.data.form.radioId || ''
              this.radioValue = this.data.form.defaultValue || ''
            } else {
              this.checkIds = this.data.form.checkIds || []
              this.checkValue = this.data.form.defaultValue || []
            }
            break
          case 'dictionary':
            if (this.data.form.src) {
              this.axios({
                url: '/admin/search/dictSearch',
                data: { dictCategoryNumber: this.data.form.src }
              }).then(res => {
                this.dictArr = res.result
              })
            }
            this.getSrcPath()
            break
          case 'otherTable':
            const arr = this.data.form.tableName || []
            this.tableId = arr[arr.length - 1]
            this.axios({
              url: '/admin/table/getFieldsAndTemplates',
              data: { tableId: this.tableId }
            }).then(res => {
              if (res.code === 0) {
                this.fields = res.result.fields
              } else {
                this.$message.error(res.message)
              }
            })
            break
          default:
            break
        }
      },
      immediate: true
    },
    formType: {
      handler (newVal) {
        this.dataSource = this.data.attribute.dataSource || 'dictionary'
        if (newVal === 'radio') {
          this.mode = 'default'
        } else if (newVal === 'checkbox') {
          this.mode = 'multiple'
        } else {
          this.mode = this.data.attribute.mode || 'default'
        }
        this.form.setFieldsValue({
          'setting[attribute][dataSource]': this.dataSource
        })
      },
      immediate: true
    }
  },
  methods: {
    // 选择模式
    choiceDataSource (value) {
      this.dataSource = value
      this.data.form.defaultValue = undefined
      this.form.setFieldsValue({
        'setting[form][defaultValue]': undefined
      })
      if (value === 'dictionary') {
        this.getSrcPath()
      }
    },
    getSrcPath () {
      this.axios({
        url: '/admin/dict/listCategory',
        data: { dictMode: 0, pageSize: 999, pageNo: 1 }
      }).then(res => {
        this.srcPath = this.formType === 'combobox' ? res.result.data : res.result.data.filter(item => item.dictType === 'basic')
      })
    },
    // 获取默认值
    changeDefault (dictCategoryNumber, dictType) {
      const src = this.form.getFieldValue('setting[form][src]')
      if (src !== dictCategoryNumber) {
        this.dictType = dictType
        // 将可选范围初始化
        this.form.setFieldsValue({
          'setting[form][optionalRange]': [],
          'setting[form][optionRange]': '3'
        })
        this.optionValue = '3'
      }
      this.axios({
        url: '/admin/search/dictSearch',
        data: { dictCategoryNumber: dictCategoryNumber }
      }).then(res => {
        this.dictArr = res.result
        this.pathFlag = true
      })
    },
    // 清除默认选项
    handleClear () {
      this.radioId = ''
      this.radioValue = ''
      this.checkIds = []
      this.checkValue = []
    },
    // 显示公式编辑器
    handleCodemirror () {
      this.$refs.formRuleWayCondition.show({
        tableId: this.config.tableId,
        data: { wayCondition: this.setting.form.defaultFormula }
      })
    },
    getCondition (data) {
      this.setting.form.defaultFormula = data
      this.$forceUpdate()
    },
    // 选择默认选项
    onChange (e) {
      if (this.mode === 'default') {
        const id = e.target.value
        this.radioId = id
        const arr = this.customDataList.filter(item => item.id === id)
        if (arr.length > 0) {
          this.radioValue = arr[0].value
        }
      } else {
        const ids = e
        this.checkIds = e
        const arr = []
        this.customDataList.forEach(item => {
          if (ids.indexOf(item.id) !== -1) {
            arr.push(item.value)
          }
        })
        if (arr.length > 0) {
          this.checkValue = arr
        }
      }
    },
    // 单选框复选框选项宽度选择
    changeType (e) {
      const { setFieldsValue } = this.form
      setFieldsValue({ 'setting[attribute][optionWidth]': undefined })
    },
    // 增加数据源自定义选项
    add (index) {
      const id = new Date().valueOf() + index
      this.customDataList.splice(index + 1, 0, { id: id, value: '', status: 'success', help: '' })
    },
    // 删除数据源选项
    del (index) {
      this.customDataList.splice(index, 1)
    },
    // 打开批量编辑
    openModal () {
      const arr = this.customDataList.map(item => item.value)
      this.edits = arr.join('\n')
      this.visible = true
    },
    // 批量编辑
    handleOk () {
      let arr = this.edits.trim().split('\n')
      const arrSet = new Set(arr)
      // 去重，不允许重复字段
      arr = [...arrSet]
      const ids = this.customDataList.map(item => item.id)
      const list = []
      arr.forEach((item, index) => {
        const obj = {}
        if (item) {
          if (ids[index]) {
            obj.id = ids[index]
            obj.value = item
          } else {
            obj.id = new Date().valueOf() + index
            obj.value = item
          }
          list.push(obj)
        }
      })
      let isSet = false
      for (let i = 0; i < arr.length; i++) {
        if (!this.customDataList[i] || arr[i] !== this.customDataList[i].value) {
          isSet = true
          break
        }
      }
      if (isSet) {
        this.handleClear()
      }
      this.customDataList = list
      this.visible = false
    },
    // 验证不重复选项
    handleValidate (item, index) {
      const value = {}
      let ids = []
      this.customDataList.forEach((ele, eleIndex) => {
        if (ele.value) {
          if (!value[ele.value]) {
            value[ele.value] = ele
          } else {
            const index1 = value[ele.value].id
            ids.push(index1)
            ids.push(ele.id)
          }
        }
        ele.status = 'success'
        ele.help = ''
      })
      ids = [...new Set(ids)]
      this.customDataList.forEach(ele => {
        if (ids.indexOf(ele.id) !== -1) {
          ele.status = 'error'
          ele.help = this.$t('选项值重复')
        }
      })
      this.handleClear()
    },
    // 选择源数据表
    handleTable (val) {
      const { setFieldsValue } = this.form
      // 初始化字段，窗口等信息
      setFieldsValue({ 'setting[form][nameField]': undefined })
      setFieldsValue({ 'setting[form][numberField]': undefined })
      const tableField = val[val.length - 1]
      this.tableId = tableField
      this.axios({
        url: '/admin/table/getFieldsAndTemplates',
        data: { tableId: tableField }
      }).then(res => {
        if (res.code === 0) {
          this.fields = res.result.fields
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 打开设置附加属性
    codeEditor () {
      this.refreshKey = this.refreshKey === 'formula' ? 'formula_1' : 'formula'
      this.formulaData = { tableId: this.tableId, data: this.setting.form.formulateValue ? this.setting.form.formulateValue : {} }
      this.$nextTick(() => {
        this.$refs.FormulaEdit.show({ title: this.$t('公式编辑器') })
      })
    },
    // 获取附加属性
    handleFormulate (value) {
      this.setting.form.formulateValue = value.data
      this.attributeFlag = !!value.data
    },
    // 默认值数据联动
    handleDefaultLink () {
      this.linkKey = this.linkKey === 'linkKey' ? 'linkKey_1' : 'linkKey'
      this.$nextTick(() => {
        this.$refs.dataLinkage.show({
          data: this.dataOld,
          setting: this.setting,
          tableField: this.tableField,
          tableId: this.config.tableId
        })
      })
    },
    // 获取数据联动值
    getDateLinkage (val) {
      this.setting.form.defaultValueLink = val
    },
    // 提交
    handleSubmit () {
      let val = {}
      const { validateFields } = this.form
      validateFields((errors, values) => {
        if (!errors) {
          values.setting.form = values.setting.form || {}
          values.setting.form.defaultValueLink = this.dataSource === 'linkData' ? this.setting.form.defaultValueLink : undefined
          if (values.setting.attribute.dataSource === 'custom') {
            values.setting.form.customDataList = this.customDataList.filter(item => !!item.value)
            values.setting.form.defaultTemplate = 'value'
            if (this.mode === 'default') {
              values.setting.form.radioId = this.radioId
              values.setting.form.defaultValue = this.radioValue.toString()
            } else {
              values.setting.form.checkIds = this.checkIds
              values.setting.form.defaultValue = this.checkValue.toString()
            }
          }
          values.setting.form.formulateValue = this.setting.form.formulateValue || {}
          val = values
        }
      })
      return val
    }
  }
}
</script>
<style lang="less" scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
}
</style>
