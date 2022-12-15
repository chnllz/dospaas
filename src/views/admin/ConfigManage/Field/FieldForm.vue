<template>
  <div>
    <a-modal
      :destroyOnClose="true"
      :width="900"
      :bodyStyle="{
        height: 'calc(100vh - 150px)',
        overflow: 'auto'
      }"
      centered
      :visible="visible"
      @cancel="visible = !visible"
    >
      <template slot="title">
        <a-row>
          <a-col :span="20">{{ title }}</a-col>
          <a-col :span="4" style="text-align: right">
            <HelpPanel
              :number="'22041616461504'"
              :styleStr="'font-size: 16px;margin-right: 26px;color: rgba(0, 0, 0, 0.65);'"
            ></HelpPanel>
          </a-col>
        </a-row>
      </template>
      <a-spin :spinning="loading">
        <a-form :form="form">
          <!-- 基础设置 -->
          <a-divider orientation="left">{{ $t('基础设置') }}</a-divider>
          <a-row>
            <a-col :span="12">
              <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                <span slot="label">
                  {{ $t('模块') }}
                </span>
                <a-select
                  v-decorator="[
                    'info[module]',
                    {
                      initialValue: data.module,
                      rules: [{ required: true, message: $t('请选择模块名称') }]
                    }
                  ]"
                  :allowClear="true"
                  :disabled="config.action === 'edit' ? true : false"
                >
                  <a-select-option v-for="(moduleItem, index) in moduleList" :key="index" :value="moduleItem">
                    {{ moduleItem }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                <span slot="label">
                  {{ $t('显示名称') }}
                  <a-tooltip placement="top">
                    <span slot="title">
                      {{ $t('字段在表单视图、数据窗口中的默认显示名称，建议控制在6个字符以内。不允许重复。') }}
                    </span>
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </span>
                <a-auto-complete
                  v-decorator="[
                    'info[name]',
                    {
                      initialValue: data.name,
                      rules: [
                        { required: true, message: $t('请输入显示名称') },
                        { validator: checkName },
                        { max: 128, message: $t('最多请输入128个字符') }
                      ]
                    }
                  ]"
                  :placeholder="$t('请输入字段显示名称')"
                  @blur="handleBlur"
                >
                  <template slot="dataSource">
                    <a-select-option v-for="item in nameList" :key="item.c" :value="item.c">
                      {{ item.c }}
                    </a-select-option>
                  </template>
                  <a-input>
                    <set-lang slot="addonAfter" />
                  </a-input>
                </a-auto-complete>
              </a-form-item>

              <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                <span slot="label">
                  {{ $t('允许') + '/' + $t('只读') }}
                  <a-tooltip placement="top">
                    <span slot="title">
                      {{
                        $t('字段在表单视图中默认的“允许/只读”属性，若表单视图中有新的配置，则会覆盖当前的默认配置。')
                      }}
                    </span>
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </span>
                <a-radio-group
                  v-decorator="['setting[rule]', { initialValue: data.setting ? data.setting.rule : 'allow' }]"
                >
                  <a-radio value="allow">{{ $t('允许') }}</a-radio>
                  <a-radio value="readonly">{{ $t('只读') }}</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item v-if="userInfo.superAdmin" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                <span slot="label">
                  {{ $t('访问级别') }}
                  <a-tooltip placement="top">
                    <template slot="title">
                      <span>
                        {{
                          $t(
                            '请慎重修改。访问级别是为了保护系统重要配置项而设计的，防止因修改系统必须的某些配置内容，而导致系统错误。'
                          )
                        }}
                      </span>
                    </template>
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </span>
                <a-select v-decorator="['info[accessLevel]', { initialValue: data.accessLevel || 0 }]">
                  <a-select-option :key="0" :value="0">{{ $t('可见可编可删') }}</a-select-option>
                  <a-select-option :key="1" :value="1">{{ $t('可见可编不可删') }}</a-select-option>
                  <a-select-option :key="2" :value="2">{{ $t('可见不可编不可删') }}</a-select-option>
                  <a-select-option :key="3" :value="3">{{ $t('不可见不可编不可删') }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                <span slot="label">
                  {{ $t('分类名称') }}
                </span>
                <a-auto-complete
                  v-decorator="[
                    'info[category]',
                    {
                      initialValue: data.category,
                      rules: [
                        { required: true, message: $t('请输入分类名称') },
                        { max: 32, message: $t('最多请输入32个字符') }
                      ]
                    }
                  ]"
                  :data-source="typeList"
                  allowClear
                  @search="onSearch"
                  @change="onSearch"
                  @focus="clickCategory"
                ></a-auto-complete>
              </a-form-item>
              <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                <span slot="label">
                  {{ $t('系统名称') }}
                  <a-tooltip placement="top">
                    <template slot="title">
                      <span>
                        {{
                          $t(
                            '系统名称创建时由{显示名称}拼音全拼组成，使用小驼峰命名法。如：{显示名称}="我爱祖国"，自动生成的{系统名称}为"woAiZuGuo"。同一模块下，不允许重复。一旦创建，不允许修改。'
                          )
                        }}
                      </span>
                    </template>
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </span>
                <a-auto-complete
                  v-decorator="[
                    'info[alias]',
                    {
                      initialValue: data.alias,
                      rules: [
                        { required: true, message: $t('请输入系统名称') },
                        {
                          pattern: new RegExp(/^[a-z]+([A-Z][a-z]+)*$/),
                          message: $t('仅支持输入大小写字母，且首字母小写，驼峰形式，禁止出现连续大写字母')
                        },
                        { max: 128, message: $t('最多请输入128个字符') }
                      ]
                    }
                  ]"
                  :disabled="aliasDisabled"
                >
                  <a-input v-if="config.action === 'add'">
                    <set-alias
                      slot="addonAfter"
                      ref="setAlias"
                      :name="form.getFieldValue('info[name]')"
                      :aliasDisabled="aliasDisabled"
                      @setAlias="setAlias"
                    />
                  </a-input>
                </a-auto-complete>
                <div
                  v-if="aliasPinyingObj.hasMultiPinYin && !aliasDisabled"
                  style="height: 20px; position: relative; left: 0; top: -16px; font-size: 12px; color: #faad14"
                >
                  {{ $t('{显示名称}中存在多音字，请注意检查') }}
                </div>
              </a-form-item>
              <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                <span slot="label">
                  {{ $t('字段状态') }}
                  <a-tooltip placement="top">
                    <span slot="title">
                      {{ $t('字段的“启用/禁用”状态。“禁用”时，该字段在所有表单视图、数据窗口将不可用。') }}
                    </span>
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </span>
                <a-radio-group v-decorator="['info[status]', { initialValue: data.status || 1 }]">
                  <a-radio :value="1">{{ $t('启用') }}</a-radio>
                  <a-radio :value="0">{{ $t('禁用') }}</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item :label="$t('字段备注')" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea
              v-decorator="['info[remarks]', { initialValue: data.remarks || '' }]"
              :autoSize="{ minRows: 3, maxRows: 6 }"
            />
          </a-form-item>
          <!-- UI组件 -->
          <template>
            <a-divider orientation="left">{{ $t('UI组件') }}</a-divider>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
              <span slot="label">
                {{ $t('UI组件') }}
                <a-tooltip placement="top">
                  <span slot="title">
                    {{ $t('表单控件在表单视图/数据窗口的展现形式。如：单行、多行、单选、多选、下拉等。') }}
                  </span>
                  <a-icon type="question-circle" />
                </a-tooltip>
              </span>
              <a-select
                v-decorator="[
                  'info[formType]',
                  { rules: [{ required: true, message: $t('请选择UI组件') }], initialValue: data.formType || '' }
                ]"
                :placeholder="$t('请选择UI组件')"
                show-search
                option-filter-prop="children"
                @change="handleComponentChange"
              >
                <a-select-option v-for="(item, key, index) in formtypes" :key="index" :value="item.value">
                  {{ item.text }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-row v-if="['checkbox', 'editor'].includes(data.formType)">
              <a-col :span="4"></a-col>
              <a-col :span="20">
                <a-alert
                  v-if="['checkbox'].includes(data.formType)"
                  :message="$t('请结合实际情况，设置合理的{字段类型}和{字段长度}')"
                  :show-icon="false"
                />
                <a-alert
                  v-else-if="['editor'].includes(data.formType)"
                  :message="$t('请结合实际情况，设置合理的{字段类型}')"
                  :show-icon="false"
                />
              </a-col>
            </a-row>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
              <span slot="label">
                {{ $t('字段类型') }}
                <a-tooltip placement="top">
                  <span slot="title">{{ $t('由“UI组件”决定，一般情况下采用默认值即可。') }}</span>
                  <a-icon type="question-circle" />
                </a-tooltip>
              </span>
              <a-select
                v-decorator="[
                  'info[fieldType]',
                  { initialValue: data.fieldType || '', rules: [{ required: true, message: $t('请选择字段类型') }] }
                ]"
                :placeholder="$t('请选择字段类型')"
                @change="changeFieldtype"
              >
                <a-select-option v-for="fieldType in fieldtypes" :key="fieldType.value" :value="fieldType.value">
                  {{ fieldType.text }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <template v-if="data.formType !== 'switch'">
              <template v-if="data.fieldType === 'DECIMAL'">
                <a-form-item
                  v-if="data.formType === 'number'"
                  :label="$t('小数位数')"
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                >
                  <a-input-number
                    v-decorator="['info[fieldDecimal]', { initialValue: parseInt(data.fieldDecimal) || 2 }]"
                    :precision="0"
                    :min="1"
                    @change="
                      (val) => {
                        data.fieldDecimal = val
                      }
                    "
                  />
                </a-form-item>
              </template>
            </template>
            <a-form-item v-if="data.formType === 'text'" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <span slot="label">
                {{ $t('索引唯一') }}
                <a-tooltip placement="top">
                  <span slot="title">
                    {{ $t('索引：即数据库普通Index索引。索引唯一：即数据库Unique Index索引，不允许重复。') }}
                  </span>
                  <a-icon type="question-circle" />
                </a-tooltip>
              </span>
              <a-radio-group
                v-decorator="[
                  'info[fieldKey]',
                  { initialValue: data.fieldKey || '', rules: [{ required: false, message: $t('请选择索引') }] }
                ]"
                :disabled="data.formType === 'serialnumber'"
              >
                <a-radio v-for="fieldKey in fieldkeys" :key="fieldKey.value" :value="fieldKey.value">
                  {{ fieldKey.text }}
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item :label="$t('帮助说明')" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['setting[attribute][help]', { initialValue: setting.attribute.help || '' }]" />
            </a-form-item>
            <a-form-item v-if="data.formType !== 'switch'" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <span slot="label">
                {{ $t('是否必填') }}
                <a-tooltip placement="top">
                  <span slot="title">
                    {{ $t('字段在表单视图中默认的“必填”属性，若表单视图中有新的配置，则会覆盖当前的默认配置。') }}
                  </span>
                  <a-icon type="question-circle" />
                </a-tooltip>
              </span>
              <a-switch
                v-decorator="[
                  'setting[attribute][required]',
                  { initialValue: setting.attribute.required, valuePropName: 'checked' }
                ]"
                :un-checked-children="$t('否')"
                :checked-children="$t('是')"
                @change="
                  (e) => {
                    $set(setting.attribute, 'required', e)
                  }
                "
              />
            </a-form-item>
            <!-- 单行文本 -->
            <div v-if="data.formType === 'text'">
              <field-text ref="fieldText" :setting="setting" />
            </div>
            <!-- 多行文本 json数据格式-->
            <div v-else-if="data.formType === 'textarea' || data.formType === 'json'">
              <field-textarea ref="fieldTextarea" :setting="setting" />
            </div>
            <!-- 单选框 多选框 下拉框-->
            <div v-else-if="data.formType === 'radio' || data.formType == 'checkbox' || data.formType === 'combobox'">
              <field-select
                ref="fieldSelect"
                :setting="setting"
                :dataOld="data"
                :config="config"
                :formType="data.formType"
                :moduleTable="moduleTable"
              />
            </div>
            <!-- 编辑框 -->
            <div v-else-if="data.formType === 'editor'">
              <a-form-item :label="$t('编辑器高度')" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input-number
                  v-decorator="[
                    'setting[attribute][height]',
                    {
                      initialValue: setting.attribute.height || 150,
                      rules: [{ required: true, message: $t('请输入编辑器高度') }]
                    }
                  ]"
                  :min="1"
                />
                {{ $t('PX(像素)') }}
              </a-form-item>
            </div>
            <!-- 图片 -->
            <template v-else-if="data.formType === 'image'">
              <a-form-item
                :label="$t('允许上传数量')"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                :validateStatus="imageStatus"
                :help="imgHelp"
              >
                <a-input-number
                  v-decorator="[
                    'setting[attribute][minFiles]',
                    { initialValue: setting.attribute.minFiles || 0, rules: [{ required: true }] }
                  ]"
                  :min="0"
                  :max="10"
                  :precision="0"
                  @change="
                    (value) => {
                      getImgNum(value, 'min')
                    }
                  "
                />
                <span style="margin: 0 5px">~</span>
                <a-input-number
                  v-decorator="[
                    'setting[attribute][maxFiles]',
                    { initialValue: setting.attribute.maxFiles || 10, rules: [{ required: true }] }
                  ]"
                  :min="minImg > 0 ? minImg : 1"
                  :max="10"
                  :precision="0"
                  @change="
                    (value) => {
                      getImgNum(value, 'max')
                    }
                  "
                />
              </a-form-item>
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                <span slot="label">
                  {{ $t('允许上传格式') }}
                  <a-tooltip placement="top">
                    <template slot="title">
                      <span>{{ $t('允许上传的文件类型，以“,”(英文逗号)分隔') }}</span>
                    </template>
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </span>
                <a-input
                  v-decorator="[
                    'setting[form][format]',
                    {
                      initialValue: setting.form.format || '.png,.jpg,.jpeg,.gif,.bmp',
                      rules: [{ required: true, message: $t('请输入允许上传的文件类型') }]
                    }
                  ]"
                />
              </a-form-item>
              <a-form-item :label="$t('单图片大小限制')" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input-number
                  v-decorator="[
                    'setting[form][size]',
                    {
                      initialValue: setting.form.size || (fileMax > 2 ? 2 : fileMax),
                      rules: [{ required: true, message: $t('请输入单图片最大限制') }]
                    }
                  ]"
                  :min="1"
                  :max="fileMax"
                />
                MB
              </a-form-item>
              <a-form-item :label="$t('移动端配置')" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-button size="small" @click="openImgSetting">
                  <a-badge v-if="appSetFlag" status="success" :text="$t('设置')" />
                  <a-badge v-else status="default" :text="$t('设置')" />
                </a-button>
              </a-form-item>
              <field-img-setting ref="fieldImgSetting" :config="config" :setting="setting" @ok="getAppSetting" />
            </template>
            <!-- 数字 -->
            <template v-else-if="data.formType === 'number'">
              <field-number
                ref="fieldNumber"
                :setting="setting"
                :fieldType="data.fieldType"
                :precision="data.fieldDecimal ? parseInt(data.fieldDecimal) : 2"
              />
            </template>
            <!-- 开关 -->
            <template v-else-if="data.formType === 'switch'">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                <span slot="label">
                  {{ $t('显示内容') }}
                  <a-tooltip placement="top">
                    <template slot="title">
                      {{ $t('开关字段显示内容一旦选择，无法修改；自定义文字时，不能超过2个字') }}
                    </template>
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </span>
                <a-radio-group
                  :defaultValue="setting.form.word.type ? setting.form.word.type : 'open'"
                  style="margin-top: 10px"
                  @change="getSwitch"
                >
                  <a-radio value="open">{{ $t('开/关') }}</a-radio>
                  <br />
                  <a-radio value="yes">{{ $t('是/否') }}</a-radio>
                  <br />
                  <a-radio value="enable">{{ $t('启用/禁用') }}</a-radio>
                  <br />
                  <a-radio value="custom">
                    {{ $t('自定义') }}
                    <template>
                      {{ $t('"开"文字') }}
                      <a-input
                        v-model="openText"
                        type="text"
                        style="width: 60px"
                        size="small"
                        :disabled="config.action === 'edit'"
                        @change="getSwitchText"
                      />
                      <a-divider type="vertical"></a-divider>
                      {{ $t('"关"文字') }}
                      <a-input
                        v-model="closeText"
                        type="text"
                        style="width: 60px"
                        size="small"
                        :disabled="config.action === 'edit'"
                        @change="getSwitchText"
                      />
                    </template>
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </template>
            <a-form-item :label="$t('附加属性')" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-button size="small" @click="codeEditor">
                <a-badge v-if="attributeFlag" status="success" :text="$t('设置')" />
                <a-badge v-else status="default" :text="$t('设置')" />
              </a-button>
            </a-form-item>
          </template>
        </a-form>
        <code-editor ref="codeEditor" @func="getCode" />
      </a-spin>
      <div slot="footer">
        <a-spin :spinning="loading">
          <span slot="indicator"></span>
          <a-button type="primary" :hidden="!!config.record" @click="handleSubmit(true)">
            {{ $t('保存并添加') }}
          </a-button>
          <a-button type="primary" @click="handleSubmit(false)">
            {{ $t('保存') }}
          </a-button>
          <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
        </a-spin>
      </div>
      <field-form-fillset
        ref="fieldFormFillset"
        :params="{ currentFields: currentFields, sourceFields: sourceFields, sourceFillset: sourceFillset }"
      />
    </a-modal>
    <a-modal :title="$t('提示')" :width="600" :visible="confirmModalShow" :closable="false">
      <p>{{ $t(confirmModalMsg) }}</p>
      <template slot="footer">
        <a-button key="back" @click="handleCancel">{{ $t('继续保存') }}</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">{{ $t('返回修改') }}</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import debounce from 'lodash/debounce'
import { mapGetters } from 'vuex'
export default {
  i18n: window.lang('admin'),
  components: {
    FieldFormFillset: () => import('./FieldFormFillset'),
    CodeEditor: () => import('@/views/admin/CodeEditor'),
    FieldText: () => import('./FieldText'),
    FieldTextarea: () => import('./FieldTextarea'),
    FieldNumber: () => import('./FieldNumber'),
    FieldSelect: () => import('./FieldSelect'),
    FieldImgSetting: () => import('./FieldImgSetting'),
    SetLang: () => import('@/components/SetLang'),
    SetAlias: () => import('@/components/SetAlias/SetAlias'),
    HelpPanel: () => import('@/views/admin/HelpPanel')
  },
  props: {
    moduleList: {
      type: Array,
      default: () => []
    },
    moduleTable: {
      type: Array,
      default: () => []
    }
  },
  data () {
    this.checkName = debounce(this.checkName, 500)
    this.getNameList = debounce(this.getNameList, 500)
    return {
      // 单条信息id号
      id: '',
      title: '',
      // 表单提交地址
      url: '',
      // 过滤的分类列表
      typeList: [],
      // 所有分类名称
      categoryList: [],
      action: '',
      dataLink: {},
      defaultDataLink: {},
      refreshKey: 0,
      departKey: 2,
      userKey: 4,
      formulaData: {},
      typeValue: 'user',
      optionValue: '0',
      defaultValue: '0',
      config: {},
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      visible: false,
      loading: false,
      aliasDisabled: false,
      data: {},
      form: this.$form.createForm(this),
      nameList: [],
      editable: false,
      // tableField: [],
      setting: {
        form: {},
        attribute: {},
        autofill: {},
        virtualField: {}
      },
      imageStatus: 'success',
      imgHelp: '',
      attributeFlag: false, // 设置
      defaultFlag: false, // 公式编辑
      codeType: 'setting', // 代码编辑器是由哪个打开
      formulateValue: [],
      sourceFields: [],
      currentFields: [],
      tableFormLists: [],
      tableFormViews: [],
      virtualSourceFields: [],
      virtualCurrentFields: [],
      parentNumber: [],
      cascaderValue: '',
      sourceStatus: false,
      sourceFillset: [],
      forcedType: '',
      fieldLength: {
        text: 64,
        associated: 64,
        autocomplete: 64,
        combobox: 256,
        radio: 32,
        switch: 4,
        checkbox: 256,
        cascader: 32,
        address: 32,
        serialnumber: 32,
        organization: 256,
        treeselect: 256,
        tag: 256,
        location: 32
      },
      formtypes: {
        text: {
          value: 'text',
          text: this.$t('单行文本'),
          fieldtypes: [
            { value: 'VARCHAR', text: 'VARCHAR' }
          ]
        },
        textarea: {
          value: 'textarea',
          text: this.$t('多行文本'),
          fieldtypes: [
            { value: 'TEXT', text: 'TEXT' },
            { value: 'MEDIUMTEXT', text: 'MEDIUMTEXT' },
            { value: 'LONGTEXT', text: 'LONGTEXT' }
          ]
        },
        combobox: {
          value: 'combobox',
          text: this.$t('下拉框'),
          fieldtypes: [
            { value: 'VARCHAR', text: 'VARCHAR' },
            { value: 'TEXT', text: 'TEXT' }
          ]
        },
        radio: {
          value: 'radio',
          text: this.$t('单选框'),
          fieldtypes: [
            { value: 'VARCHAR', text: 'VARCHAR' }
          ]
        },
        checkbox: {
          value: 'checkbox',
          text: this.$t('复选框'),
          fieldtypes: [
            { value: 'VARCHAR', text: 'VARCHAR' },
            { value: 'TEXT', text: 'TEXT' }
          ]
        },
        editor: {
          value: 'editor',
          text: this.$t('编辑器'),
          fieldtypes: [
            { value: 'TEXT', text: 'TEXT' },
            { value: 'MEDIUMTEXT', text: 'MEDIUMTEXT' },
            { value: 'LONGTEXT', text: 'LONGTEXT' }
          ]
        },
        image: {
          value: 'image',
          text: this.$t('图片'),
          fieldtypes: [
            { value: 'JSON', text: 'JSON' }
          ]
        },
        number: {
          value: 'number',
          text: this.$t('数字'),
          fieldtypes: [
            { value: 'INT', text: this.$t('INT-整数') },
            { value: 'DECIMAL', text: this.$t('DECIMAL-小数') }
          ]
        },
        switch: {
          value: 'switch',
          text: this.$t('开关'),
          fieldtypes: [
            { value: 'TINYINT', text: 'TINYINT' }
          ]
        },
        json: {
          value: 'json',
          text: this.$t('JSON'),
          fieldtypes: [
            { value: 'JSON', text: 'JSON' }
          ]
        }
      },
      fieldtypes: [],
      fieldkeys: [
        { value: '', text: this.$t('无') },
        { value: 'unique_key', text: this.$t('唯一') },
        { value: 'key', text: this.$t('索引') }
      ],
      defalutTemplates: [
        { value: '', text: this.$t('不设置') },
        { value: 'value', text: this.$t('自定义') }
        // { value: 'formula', text: this.$t('公式编辑') }
        // { value: 'linkData', text: this.$t('数据联动') }
      ],
      defaultType: '',
      quoteTypes: [
        { value: 'insert', text: this.$t('新建时') },
        { value: 'always', text: this.$t('新建+编辑时') }
      ],
      regexs: [
        { value: '', text: this.$t('常用正则') },
        { value: '/^([+-]?)\\d*\\.?\\d+$/', text: this.$t('数字') },
        { value: '/^-?[1-9]\\d*$/', text: this.$t('整数') },
        { value: '/^[A-Za-z]+$/', text: this.$t('字母') },
        { value: '/^\\w+$/', text: this.$t('字母+数字') },
        { value: '/^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$/', text: 'E-mail' },
        { value: '/^[1-9]*[1-9][0-9]*$/', text: 'QQ' },
        { value: '/^http:///', text: this.$t('超级链接') },
        { value: '/^(1)[0-9]{10}$/', text: this.$t('手机号码') },
        { value: '/^[0-9-]{6,13}$/', text: this.$t('电话号码') },
        { value: '/^[0-9]{6}$/', text: this.$t('邮政编码') }
      ],
      limitLevelTypes: [
        { value: '>', text: '>' },
        { value: '>=', text: '>=' },
        { value: '==', text: '=' },
        { value: '<', text: '<' },
        { value: '<=', text: '<=' }
      ],
      count: 0,
      columns: [{
        title: this.$t('当前表字段'),
        dataIndex: 'currentFieldName'
      }, {
        title: this.$t('源数据表字段'),
        dataIndex: 'sourceFieldName'
      }, {
        title: this.$t('操作'),
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
      }],
      optionCustom: [],
      custom: [],
      customObj: {},
      initMode: '', // 判断已保存数据与当前模式是否匹配
      defaultCustom: [],
      openText: '',
      closeText: '',
      onText: '',
      offText: '',
      customText: '',
      minFiles: 0, // 最小附件数
      minImg: 0, // 最小图片数
      maxImg: 10,
      fileMax: Infinity, // 图片附件最大存储限制
      switchValue: '', // 开关显示的值
      subformStatus: 'success',
      subformHelp: undefined,
      sonField: '1',
      currentField: '1',
      suffixIcon: '',
      suffixVal: '',
      srcPath: [],
      currentFieldArr: [], // 当前表字段
      linkFields: [], // 关联数据表字段
      tpl: [], // 关联数据表窗口
      tableId: '',
      record: { id: '' },
      // dropDownField: [], // 下拉字段
      tagDownField: [], // 分值回写字段
      writeBack: [{ value: undefined, tab: '1级' }, { value: undefined, tab: '2级' }], // 回写策略
      dataFormId: true,
      format: '', // 时间格式,
      linkKey: 'linkKey',
      appSetFlag: false,
      nameLoading: false,
      noMore: false,
      nameParams: {
        pageNo: 1,
        pageSize: 20
      },
      confirmModalShow: false,
      confirmModalMsg: '',
      valuesObj: null,
      copyVisible: false,
      aliasPinyingObj: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    // popupScroll (e) {
    //   const scrollTop = e.target.scrollTop
    //   const scrollHeight = e.target.scrollHeight
    //   const clientHeight = e.target.clientHeight
    //   const scrollBottom = scrollHeight - clientHeight - scrollTop
    //   if (scrollBottom === 0) {
    //     this.nameParams.pageNo++
    //     this.getNameList()
    //   }
    // },
    showAdd (config) {
      this.title = '添加'
      this.url = 'admin/config/addItem'
      this.config = config
      this.id = ''
      this.visible = true
      this.loading = true
      this.aliasPinyingObj = {}
      this.editable = false
      this.aliasDisabled = false
      this.nameList = []
      this.data = {}
      // 字段类型
      this.fieldtypes = []
      this.setting = {
        form: {},
        attribute: {},
        autofill: {},
        virtualField: {}
      }
      this.attributeFlag = false
      // 默认值初始化
      this.defaultType = ''
      this.loading = false
      this.axios({
        url: 'admin/config/category'
      }).then(res => {
        this.typeList = res.result
      })
    },
    showEdit (config) {
      this.title = '编辑'
      this.url = 'admin/config/editItem'
      this.id = config.record.id
      this.visible = true
      this.loading = true
      this.editable = false
      this.aliasPinyingObj = {}
      this.config = config
      this.aliasDisabled = true
      this.nameList = []
      this.axios({
        url: 'admin/config/category'
      }).then(res => {
        this.typeList = res.result
      })
      this.axios({
        url: `admin/config/getItem`,
        params: { id: config.record.id }
      }).then((res) => {
        this.form.resetFields()
        this.data = {}
        this.data = res.result
        this.data.setting = JSON.parse(this.data.setting)
        this.fieldtypes = this.formtypes[this.data.formType]?.fieldtypes
        this.parentNumber = res.result.parentNumber
        this.setting = res.result.setting || {}
        this.setting.autofill = this.setting.autofill || {}
        this.attributeFlag = !!this.setting.form.attribute
        // 默认值初始化
        this.defaultType = this.setting.form.defaultTemplate || ''
        if (this.setting.form.defaultTemplate === 'formula') {
          this.defaultFlag = !!this.setting.form.defaultValue
        }
        if (this.data.formType === 'switch') {
          this.onText = this.setting.form.word.value[1] || this.$t('开')
          this.offText = this.setting.form.word.value[0] || this.$t('关')
          if (this.setting.form.word.type === 'custom') {
            this.openText = this.setting.form.word.value[1]
            this.closeText = this.setting.form.word.value[0]
          }
        } else if (this.data.formType === 'image' || this.data.formType === 'file') {
          this.minImg = parseInt(this.setting.attribute.minFiles)
          this.maxImg = parseInt(this.setting.attribute.maxFiles)
          this.appSetFlag = this.setting.form && !!this.setting.form.appSetting && this.setting.form.appSetting.length > 0
          this.axios({
            url: '/admin/field/getUploadMax'
          }).then(res => {
            this.fileMax = res.result.max
          })
        }
        if (this.setting.autofill && typeof (this.setting.autofill.source) !== 'undefined' && this.setting.autofill.source.length > 0) {
          this.axios({
            url: '/admin/field/getSourceOptions',
            data: Object.assign({ sourceTableId: this.setting.autofill.source[1], currentTableId: this.config.tableId, virtualField: 0 })
          }).then(res => {
            this.sourceFields = res.result.sourceFields
            this.currentFields = res.result.currentFields
            this.tableFormLists = res.result.tableFormLists
            this.tableFormViews = res.result.tableFormViews
            this.sourceStatus = true
            if (typeof (this.setting.autofill.sourceFillset) !== 'undefined') {
              this.sourceFillset = JSON.parse(this.setting.autofill.sourceFillset)
            }
          })
        }
        this.loading = false
      })
    },
    // 自动完成搜索
    onSearch (val) {
      if (val) {
        this.typeList = this.categoryList.filter(item => item.includes(val))
      } else {
        this.typeList = JSON.parse(JSON.stringify(this.categoryList))
      }
    },
    clickCategory () {
      const val = this.$t(this.form.getFieldValue('info[category]'))
      this.typeList = this.categoryList.filter(item => item.includes(val))
    },
    getNameList (type) {
      const val = this.$t(this.form.getFieldValue('info[name]'))
      if (!val) {
        return
      }
      if (!type || !this.nameList.length) {
        this.nameLoading = true
        this.axios({
          url: '/admin/systemLibrary/list',
          data: {
            pageNo: this.nameParams.pageNo,
            pageSize: this.nameParams.pageSize,
            sortField: 'id',
            sortOrder: 'descend',
            name: val
          }
        }).then(res => {
          this.nameLoading = false
          this.nameList = [...this.nameList, ...res.result.data]
          // 添加c属性，用于渲染。使a-select-option不换行
          this.nameList.forEach(item => {
            item.c = item.langZhCn
          })
          this.noMore = res.result.data.length < this.nameParams.pageSize
        })
      }
    },
    deletewriteBack (index) {
      if (this.writeBack.length > 1) {
        this.writeBack.splice(index, 1)
      }
    },
    setAlias (item) {
      if (this.config.action === 'add') {
        this.aliasPinyingObj = item
        const { setFieldsValue } = this.form
        setFieldsValue({ 'info[alias]': item.pinYin })
      }
    },
    // 根据显示名称赋值系统名称
    handleChangeName (e) {
      // this.nameParams = {
      //   pageNo: 1,
      //   pageSize: 20
      // }
      this.nameList = []
      this.$refs.setAlias.setAlias()
      this.getNameList()
    },
    handleBlur () {
      if (!this.form.getFieldValue('info[alias]')) {
        this.$refs.setAlias.searchAlias()
      }
    },
    handleEdit () {
      const that = this
      this.$confirm({
        title: this.$t('您确认要修改系统名称吗？'),
        content: this.$t('修改系统名称会造成系统未知错误，强烈建议不要修改'),
        onOk () {
          that.aliasDisabled = false
        }
      })
    },
    // 递归判断是否首字不是数字
    getVal (val, reg) {
      if (!reg.test(val[0])) {
        val.shift()
        this.getVal(val, reg)
      }
    },
    sourceChange (value) {
      this.axios({
        url: '/admin/field/getSourceOptions',
        data: Object.assign({ sourceTableId: value[1], currentTableId: this.config.tableId, virtualField: 0 })
      }).then(res => {
        this.sourceFields = res.result.sourceFields
        this.currentFields = res.result.currentFields
        this.tableFormLists = res.result.tableFormLists
        this.tableFormViews = res.result.tableFormViews
        this.sourceStatus = true
      })
    },
    // 获取图片最小数
    getImgNum (value, type) {
      if (type !== 'min') {
        this.maxImg = value
      } else {
        this.minImg = value
        if (this.minImg > this.maxImg) {
          this.form.setFieldsValue({
            'setting[attribute][maxFiles]': value
          })
          this.setting.attribute.maxFiles = this.minImg
          this.maxImg = this.minImg
        }
      }
      if (!this.minImg && this.minImg !== 0) {
        this.imageStatus = 'error'
        this.imgHelp = this.$t('请输入最小图片数')
      } else if (!this.maxImg && this.maxImg !== 0) {
        this.imageStatus = 'error'
        this.imgHelp = this.$t('请输入最大图片数')
      } else {
        this.imgHelp = ''
        this.imageStatus = 'success'
      }
    },
    // 获取附件最小数
    getMinFiles (e) {
      this.minFiles = e
    },
    // 获取图标
    getIcon (value) {
      this.suffixVal = value
    },
    // 后置图标
    handleLatter (val) {
      this.suffixIcon = val.target.value
    },
    // 打开图标库
    // handleMenuIcon () {
    //   this.$refs.menuIcon.show()
    // },
    // 打开设置附加属性
    codeEditor () {
      this.codeType = 'setting'
      this.$refs.codeEditor.show({
        value: this.setting.form.attribute || ''
      })
    },
    // 获取附加属性
    getCode (value) {
      if (this.codeType === 'setting') {
        this.setting.form.attribute = value
        this.attributeFlag = !!value
      } else {
        this.setting.form.defaultValue = value
        this.defaultFlag = !!value
      }
    },
    // 选择UI组件
    handleComponentChange (value) {
      this.data.formType = value
      this.fieldtypes = this.formtypes[value].fieldtypes
      const fieldType = value !== 'web_sub_data_window' ? this.formtypes[value].fieldtypes[0].value : []
      const { setFieldsValue } = this.form
      this.data.fieldType = fieldType
      this.$nextTick(() => {
        setFieldsValue({ 'info[fieldType]': fieldType })
        if (['text', 'associated', 'datetime', 'serialnumber'].includes(value)) {
          setFieldsValue({ 'info[fieldKey]': '' })
        }
      })
      this.defaultType = this.setting.form.defaultTemplate = ''
      this.$nextTick(() => {
        setFieldsValue({ 'setting[form][defaultTemplate]': '' })
      })
      switch (value) {
        case 'switch':
          this.setting.form = this.setting.form || {}
          this.$set(this.setting.form, 'defaultType', 'switch')
          this.$set(this.setting.form, 'defaultValue', 0)
          this.setting.form.word = {
            type: 'open',
            value: {
              1: this.$t('开'),
              0: this.$t('关')
            }
          }
          this.onText = this.$t('开')
          this.offText = this.$t('关')
          break
        default:
          break
      }
    },
    // 选择字段类型
    changeFieldtype (value) {
      this.data.fieldType = value
      if (this.data.formType === 'number') {
        if (!this.setting.attribute) {
          this.setting.attribute = {}
          this.data.fieldDecimal = 2
        }
      } else if (this.data.formType === 'datetime') {
        switch (value) {
          case 'DATETIME':
            this.$set(this.setting.attribute, 'format', 'Y-m-d H:i:s')
            this.format = 'Y-m-d H:i:s'
            break
          case 'DATE':
            this.$set(this.setting.attribute, 'format', 'Y-m-d')
            this.format = 'Y-m-d'
            break
          case 'TIME':
            this.$set(this.setting.attribute, 'format', 'H:i:s')
            this.format = 'H:i:s'
            break
          default:
            break
        }
        const fieldDate = this.$refs.fieldDate
        if (fieldDate.minType === 'custom') {
          this.$refs.fieldDate.minValue = this.moment().format(this.format)
        } else {
          this.$refs.fieldDate.minValue = undefined
          this.$refs.fieldDate.form.setFieldsValue({
            'setting[form][minValue]': undefined
          })
        }
        if (fieldDate.maxType === 'custom') {
          this.$refs.fieldDate.maxValue = this.moment().format(this.format)
        } else {
          this.$refs.fieldDate.maxValue = undefined
          this.$refs.fieldDate.form.setFieldsValue({
            'setting[form][maxValue]': undefined
          })
        }
      }
    },
    // 默认值公式编辑
    handleDefaultEdit () {
      this.codeType = 'defaultSetting'
      this.$refs.codeEditor.show({
        value: this.setting.form.defaultValueLink || ''
      })
    },

    // 图片移动端设置
    openImgSetting () {
      this.$refs.fieldImgSetting.show()
    },

    // 组织结构
    // 选择类型
    onChange (e) {
      this.typeValue = e.target.value
      if (this.typeValue !== this.customObj.type) {
        this.custom = []
        this.defaultCustom = []
      } else {
        this.custom = this.customObj.value
        this.defaultCustom = this.customObj.defaultCustom
      }
    },
    // 选择默认值
    handleDefaultChange (value) {
      this.defaultValue = value
    },
    handleDataLink (res) {
      if (res.dataType === 'dataLink') {
        this.datalink = res.data
        this.setting.form.dataLink = this.datalink
      } else {
        this.defaultDataLink = res.data
        this.setting.form.defaultDataLink = this.defaultDataLink
      }
    },
    // 获取选择的值
    handleUser (val, dataType, initMode, mode) {
      // 选择范围值
      this.initMode = initMode
      this.customObj.type = this.typeValue
      if (dataType === 'optionCustom') {
        this.custom = val
        this.customObj.value = val
      } else {
        this.defaultCustom = val
        this.customObj.defaultCustom = this.defaultCustom
      }
    },
    handleDefaultDataLinkage () {
      this.setting.form.defaultDataLink = this.defaultDataLink
      const { form: { getFieldValue } } = this
      const alias = getFieldValue('info[alias]')
      const name = getFieldValue('info[name]')
      if (this.refreshKey) {
        this.refreshKey = 0
      } else {
        this.refreshKey = 1
      }
      this.$nextTick(() => {
        this.$refs.fieldFormDatalink.show({
          tableId: this.config.tableId,
          data: this.setting.form.defaultDataLink,
          name: name,
          alias: alias,
          dataType: 'defaultDataLink'
        })
      })
    },
    handleOptionChange (value) {
      this.optionValue = value
      if (value !== '1') {
        this.defaultValue = '0'
        this.setting.form.defaultValue = '0'
        this.custom = ''
      }
    },
    handleAdd () {
      this.$refs.fieldFormFillset.show({
        action: 'add',
        title: this.$t('添加填充设置'),
        record: {
          id: new Date().valueOf()
        }
      })
    },
    handleDelete (record) {
      const dataSource = [...this.sourceFillset]
      this.sourceFillset = dataSource.filter(item => item.id !== record.id)
    },
    // 开关文字
    getSwitch (e) {
      const value = e.target.value
      this.setting.form.word.type = value
      const obj = {
        open: this.$t('开/关'),
        yes: this.$t('是/否'),
        enable: this.$t('启用/禁用'),
        custom: this.openText + '/' + this.closeText
      }
      this.setting.form.word.value = {
        0: obj[value].split('/')[1],
        1: obj[value].split('/')[0]
      }
      this.onText = obj[value].split('/')[0]
      this.offText = obj[value].split('/')[1]
    },
    getSwitchDef (e) {
      this.setting.form.defaultType = e.target.value
      this.setting.form.defaultValue = e.target.value === 'switch' ? 0 : {}
    },
    getSwitchText () {
      this.onText = this.openText = this.openText.slice(0, 2)
      this.offText = this.closeText = this.closeText.slice(0, 2)
      this.setting.form.word.value = {
        1: this.openText,
        0: this.closeText
      }
    },
    // 子表单-> 选择数据表
    handleTable (val) {
      const tableField = val[val.length - 1]
      this.tableId = tableField
      this.axios({
        url: '/admin/table/getFieldsAndTemplates',
        data: { tableId: tableField, type: 'webSubformDataWindow' }
      }).then(res => {
        if (res.code === 0) {
          this.linkFields = res.result.fields
          this.tpl = res.result.tpl
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 选择关联字段
    handleSonField (val) {
      this.sonField = val
      if (!this.sonField || !this.currentField) {
        this.subformHelp = this.$t('请选择关联字段')
        this.subformStatus = 'error'
      } else {
        this.subformHelp = ''
        this.subformStatus = 'success'
      }
    },
    handleCurrentField (val) {
      this.currentField = val
      if (!this.sonField || !this.currentField) {
        this.subformHelp = this.$t('请选择关联字段')
        this.subformStatus = 'error'
      } else {
        this.subformHelp = ''
        this.subformStatus = 'success'
      }
    },
    // 获取数据窗口id
    handleChangeDataForm (val) {
      this.dataFormId = !!val
      this.tpl.forEach(item => {
        if (item.uid === val) {
          this.tableId = item.value
          this.record.id = item.id
          this.record.name = item.name
        }
      })
    },
    // 显示名称验证是否重复
    checkName (rule, value, callback) {
      this.axios({
        url: '/admin/field/checkUnique',
        data: {
          id: this.config.record ? this.config.record.id : null,
          tableId: this.config.tableId,
          name: value
        },
        tips: false
      }).then(res => {
        if (res.code) {
          callback(res.message)
        } else {
          callback()
        }
      })
    },
    // 获取移动端图片设置
    getAppSetting (value) {
      this.appSetFlag = !(!value || value.length === 0)
      this.setting.form.appSetting = value
    },
    getCondition (data) {
      if (this.forcedType === 'forced') {
        this.setting.form.forcedDefaultValue = data
      } else {
        this.setting.form.defaultFormula = data
      }
    },
    // 提交数据
    handleSubmit (visible = false) {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (values.info.formType === 'tag' && !this.setting.form.tagSetting) {
          errors = '请填写标签设置'
        }
        if (!errors) {
          this.valuesObj = values
          this.copyVisible = visible
          if (values.info.name.length > 6) {
            this.confirmModalShow = true
            this.confirmModalMsg = '{显示名称}超过6个字，建议优化到6个字以内。'
          } else {
            this.toSubmit(values, visible)
          }
        } else {
          this.loading = false
          if (errors.setting && errors.setting.form && (errors.setting.form.currentField || errors.setting.form.sonField)) {
            this.subformStatus = 'error'
            this.subformHelp = this.$t('请选择关联字段')
          } else {
            this.$message.warning(this.$t('表单填写不符合要求，请参考页面内具体提示修改'))
          }
        }
      })
    },
    toSubmit (values, visible) {
      this.confirmModalShow = false
      this.loading = true
      values.info.category = values.info.category ? values.info.category.replace(/\s+/g, '') : ''
      values.setting.form = values.setting.form || {}
      values.setting.attribute = values.setting.attribute || {}
      values.info.trace = values.info.trace ? 1 : 0
      if (this.sourceFillset.length > 0) {
        values.setting.autofill.sourceFillset = JSON.stringify(this.sourceFillset)
      }
      let val = {}
      values.defaultValueCheck = values.forcedDefaultValue = undefined
      if (values.info.formType !== 'cascader') {
        values.setting.form.defaultValue = this.setting.form.defaultValue
      }
      values.setting.form.defaultFormula = this.setting.form.defaultFormula
      values.setting.form.forcedDefaultValue = this.setting.form.forcedDefaultValue
      switch (values.info.formType) {
        case 'switch':
          values.setting.form = values.setting.form ? values.setting.form : {}
          values.setting.form.word = {}
          values.setting.form.defaultType = this.setting.form.defaultType
          values.setting.form.defaultValue = this.setting.form.defaultValue
          values.setting.form.word.type = this.setting.form.word.type
          values.setting.form.word.value = this.setting.form.word.value
          break
        case 'text':
          val = this.$refs.fieldText.handleSubmit()
          if (Object.keys(val).length === 0) {
            this.loading = false
            return false
          }
          values.setting.attribute = Object.assign(values.setting.attribute, val.setting.attribute)
          values.setting.form = Object.assign(values.setting.form, val.setting.form)
          break
        case 'textarea':
        case 'json':
          val = this.$refs.fieldTextarea.handleSubmit()
          if (Object.keys(val).length === 0) {
            this.loading = false
            return false
          }
          values.setting.attribute = Object.assign(values.setting.attribute, val.setting.attribute)
          values.setting.form = Object.assign(values.setting.form, val.setting.form)
          break
        case 'number':
          val = this.$refs.fieldNumber.handleSubmit()
          if (Object.keys(val).length === 0) {
            this.loading = false
            return false
          }
          values.setting.attribute = Object.assign(values.setting.attribute, val.setting.attribute)
          values.setting.form = Object.assign(values.setting.form, val.setting.form)
          break
        case 'radio':
        case 'checkbox':
        case 'combobox':
          val = this.$refs.fieldSelect.handleSubmit()
          if (Object.keys(val).length === 0) {
            this.loading = false
            return false
          }
          values.setting.attribute = Object.assign(values.setting.attribute, val.setting.attribute)
          values.setting.attribute.checkAll = values.setting.attribute.checkAll ? '1' : '0'
          values.setting.form = values.setting.form ? values.setting.form : {}
          values.setting.form = Object.assign(values.setting.form, val.setting.form)
          break
        case 'image':
          values.setting.form.appSetting = this.$refs.fieldImgSetting.dynamicData
          break
        default:
          break
      }
      values.setting.form.attribute = this.setting.form.attribute
      // if ((values.setting.form.defaultTemplate === 'linkData' || values.setting.form.defaultTemplate === 'formula' || this.setting.form.defaultType === 'linkData') && values.info.formType !== 'address') {
      //   values.setting.form.defaultValueLink = this.setting.form.defaultValueLink
      // }
      // 虚拟字段&&子表单默认设置为单行文本，VARCHAR，1
      // if (values.info.virtualField || values.info.formType === 'web_sub_data_window') {
      //   values.info.fieldType = 'VARCHAR'
      //   values.info.fieldLength = 1
      // }
      values.info.formType = values.info.virtualField ? 'text' : values.info.formType
      values.info.virtualField = values.info.virtualField ? 1 : 0
      values.info.accessLevel = values.info.accessLevel ? values.info.accessLevel : 0
      let params = {}
      if (this.config.action === 'edit') {
        params = Object.assign({ id: this.id }, values.info)
        delete params.alias
      } else if (this.config.action === 'add') {
        params = Object.assign({}, values.info)
      }
      params.setting = values.setting
      this.axios({
        url: this.url,
        data: params
      }).then((res) => {
        if (res.code) {
          this.$message.warning(res.message)
        } else {
          this.$message.success(res.message)
          this.openText = ''
          this.closeText = ''
          this.form.resetFields()
          this.visible = visible
          this.$emit('ok', values)
          if (visible) {
            this.showAdd(this.config)
          }
        }
        this.$nextTick(() => {
          this.loading = false
        })
      }).catch(() => {
        this.loading = false
      })
    },
    handleOk () {
      this.confirmModalShow = false
    },
    handleCancel () {
      this.toSubmit(this.valuesObj, this.copyVisible)
    }
  }
}
</script>
