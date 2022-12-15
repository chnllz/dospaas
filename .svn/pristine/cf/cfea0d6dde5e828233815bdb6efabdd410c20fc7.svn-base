<template>
  <div>
    <h3>
      <tag-icon />
      {{ $t('基础设置') }}
    </h3>
    <a-card size="small" style="margin-bottom: 16px">
      <a-row>
        <a-col span="12">
          <a-form-item :label="$t('名称')" :labelCol="{ span: 6 }" :wrapperCol="{ span: 12 }">
            <a-input
              v-decorator="[
                'name',
                { initialValue: data.name || '', rules: [{ required: true, message: $t('请输入名称') }] }
              ]"
              :placeholder="$t('请输入名称,2-20个字符')"
            >
              <set-lang slot="addonAfter" />
            </a-input>
          </a-form-item>
        </a-col>
        <!-- <a-col span="12" pull="3">
          <a-form-item :label="$t('系统名称')" :labelCol="{ span: 6 }" :wrapperCol="{ span: 12 }">
            <a-auto-complete
              v-decorator="[
                'setting[alias]',
                {
                  initialValue: setting.alias || undefined,
                  rules: [
                    {
                      pattern: new RegExp(/^([a-z]+[A-Z]{0,1}[a-z]*)+$/),
                      message: $t('仅支持输入大小写字母，且首字母小写，驼峰形式，禁止出现连续大写字母')
                    },
                    { max: 128, message: $t('最多请输入128个字符') }
                  ]
                }
              ]"
            >
              <a-input>
                <set-alias
                  slot="addonAfter"
                  ref="setalias"
                  :name="parentThis.form.getFieldValue('name')"
                  @setAlias="setAlias"
                />
              </a-input>
            </a-auto-complete>
          </a-form-item>
        </a-col> -->
      </a-row>
      <a-form-item :label="$t('条件设置')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-button size="small" @click="handleCondition">
          <a-badge v-if="settingFlag" status="success" :text="$t('设置')" />
          <a-badge v-else status="default" :text="$t('设置')" />
        </a-button>
      </a-form-item>
      <a-form-item :label="$t('自定义数据源')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-row type="flex" :gutter="8">
          <a-col>
            <a-switch
              v-model="customDataSource"
              @change="
                () => {
                  form.setFieldsValue({ 'setting[dataSource]': undefined })
                }
              "
            ></a-switch>
          </a-col>
          <a-col flex="auto">
            <a-input
              v-if="customDataSource"
              v-decorator="['setting[dataSource]', { initialValue: setting.dataSource || '' }]"
              :placeholder="$t('如：/admin/api/test')"
            />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item :label="$t('帮助说明设置')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-button @click="getEditor">
          {{ $t('设置') }}
        </a-button>
        <a-modal
          :title="$t('帮助说明设置')"
          :visible="visible"
          :width="900"
          :destroyOnClose="true"
          @cancel="visible = !visible"
        >
          <a-spin :spinning="loading">
            <a-form :form="form" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
              <a-form-item :label="$t('帮助说明')">
                <a-switch
                  v-decorator="['status', { initialValue: setting.helpText, valuePropName: 'checked' }]"
                  @change="
                    (e) => {
                      setting.helpText = e
                    }
                  "
                />
              </a-form-item>
              <template v-if="setting.helpText">
                <a-form-item>
                  <span slot="label">
                    {{ $t('帮助展开形式') }}
                    <a-tooltip placement="top">
                      <template slot="title">
                        <div>点击展开：帮助说明以弹层形式展开，富文本内容展示。</div>
                        <div>鼠标停留时气泡框展开：帮助说明以气泡框形式展开，强制文本格式，并自动剔除图片。</div>
                      </template>
                      <a-icon type="question-circle" />
                    </a-tooltip>
                  </span>
                  <a-radio-group
                    v-decorator="['displayMode', { initialValue: helpText.displayMode || 'drawer' }]"
                    name="radioGroup"
                  >
                    <a-radio value="drawer">{{ $t('左侧抽屉打开') }}</a-radio>
                    <a-radio value="popover">{{ $t('气泡框打开') }}</a-radio>
                  </a-radio-group>
                </a-form-item>
                <a-form-item label="帮助内容">
                  <tiny-mce v-decorator="['content', { initialValue: helpText.content }]" />
                </a-form-item>
              </template>
            </a-form>
          </a-spin>
          <div slot="footer">
            <a-spin :spinning="loading">
              <span slot="indicator" />
              <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
              <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
            </a-spin>
          </div>
        </a-modal>
      </a-form-item>
      <a-form-item
        v-if="data.type !== 'appProcessCenterDataWindow'"
        :label="$t('流程功能')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-row type="flex" :gutter="8">
          <a-col>
            <a-switch
              v-decorator="[
                'setting[enableWorkflow]',
                { initialValue: setting.enableWorkflow, valuePropName: 'checked' }
              ]"
              @change="
                (e) => {
                  $set(setting, 'enableWorkflow', e)
                  if (!e) {
                    workflowSearcher = {}
                  }
                }
              "
            />
          </a-col>
          <a-col flex="auto">
            <a-select
              v-if="setting.enableWorkflow"
              v-decorator="[
                'setting[workflowId]',
                {
                  initialValue: setting.workflowId || undefined,
                  rules: [{ required: true, message: $t('请选择流程') }]
                }
              ]"
              :placeholder="$t('请选择一个与当前数据表关联的流程')"
              show-search
            >
              <a-select-option v-for="(value, key) in workflow" :key="key" :value="value.workflowId">
                {{ value.workflowName }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item v-show="false" v-else :label="$t('流程功能')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-switch v-decorator="['setting[enableWorkflow]', { initialValue: true, valuePropName: 'checked' }]" />
      </a-form-item>
      <a-form-item
        v-if="setting.enableWorkflow"
        :label="$t('流程筛选组')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-button type="default" @click="workflowFilterSetting">
          <a-badge v-if="Object.keys(workflowSearcher).length" status="success" />
          <a-badge v-else status="default" />
          {{ $t('设置') }}
        </a-button>
        <!-- <a @click="workflowFilterSetting">
          <a-badge v-if="setting.workflowSearcher" status="success" />
          <a-badge v-else status="default" />
          {{ $t('设置') }}
        </a> -->
      </a-form-item>
      <a-form-item :label="$t('交互模式')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-row :gutter="8">
          <a-col :span="8">
            <a-form-item>
              <a-select
                v-decorator="['setting[interactiveType]', { initialValue: setting.interactiveType || 'default' }]"
                show-search
                option-filter-prop="children"
                @change="
                  (e) => {
                    setting.interactiveType = e
                  }
                "
              >
                <a-select-option value="default">卡片</a-select-option>
                <a-select-option value="tree">时间轴</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item :label="$t('备注')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-textarea
          v-decorator="['setting[description]', { initialValue: setting.description }]"
          :auto-size="{ minRows: 1, maxRows: 5 }"
        />
      </a-form-item>
      <a-form-item v-if="userInfo.superAdmin" :label="$t('访问级别')" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-radio-group v-decorator="['info[accessLevel]', { initialValue: data.accessLevel || 0 }]">
          <a-radio :value="0" style="width: 100%">{{ $t('可见可编可删') }}</a-radio>
          <a-radio :value="1" style="width: 100%">{{ $t('可见可编不可删') }}</a-radio>
          <a-radio :value="2" style="width: 100%">{{ $t('可见不可编不可删') }}</a-radio>
          <a-radio :value="3" style="width: 100%">{{ $t('不可见不可编不可删') }}</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-card>
    <h3>
      <tag-icon />
      {{ $t('卡片设置') }}
    </h3>
    <a-card size="small">
      <a-row>
        <a-col span="8">
          <a-form-item :labelCol="{ span: 9 }" :wrapperCol="{ span: 15 }" :label="$t('默认加载数量')">
            <a-input-number
              v-decorator="[
                'setting[pageSize]',
                { initialValue: setting.pageSize || 5, rules: [{ required: true, message: $t('请输入默认加载数量') }] }
              ]"
              style="width: 100%"
              :min="5"
              :max="10"
            />
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item :labelCol="{ span: 6 }" :wrapperCol="{ span: 15 }" :label="$t('排序方式')">
            <a-row :gutter="8">
              <a-col span="18">
                <a-select
                  v-decorator="[
                    'setting[sortField]',
                    {
                      rules: [{ required: true, message: $t('请选择排序字段') }],
                      initialValue: setting.sortField || 'id'
                    }
                  ]"
                  show-search
                  option-filter-prop="children"
                >
                  <a-select-option v-for="(value, key) in fieldMappings" :key="key" :value="value.value">
                    {{ value.display }}
                  </a-select-option>
                </a-select>
              </a-col>
              <a-col span="6">
                <a-select
                  v-decorator="[
                    'setting[sortOrder]',
                    {
                      rules: [{ required: true, message: $t('请选择排序方式') }],
                      initialValue: setting.sortOrder || 'descend'
                    }
                  ]"
                >
                  <a-select-option value="descend">{{ $t('降序') }}</a-select-option>
                  <a-select-option value="ascend">{{ $t('升序') }}</a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="8">
          <a-form-item
            v-if="Object.keys(setting).length > 0"
            :labelCol="{ span: 9 }"
            :wrapperCol="{ span: 15 }"
            :label="$t('无数据时图案')"
          >
            <!-- <a-upload
              v-decorator="[
                'setting[defaultImgUrl]',
                {
                  initialValue: setting.defaultImgUrl,
                  valuePropName: 'fileList'
                }
              ]"
              v-viewer
              name="upload"
              listType="picture-card"
              :accept="'.png,.jpg,.jpeg,.gif,.bmp'"
              :action="`${$store.state.env.VUE_APP_API_BASE_URL}admin/attachment/upload/?uploadName=upload`"
              :headers="{ 'Access-Token': $store.getters.userInfo.accessToken }"
              :before-upload="
                (file, fileList) => {
                  return beforeUpload(file, fileList)
                }
              "
              @change="
                (info) => {
                  fileChange(info)
                }
              "
            > -->
            <a-upload
              :action="`${$store.state.env.VUE_APP_API_BASE_URL}admin/attachment/upload/?uploadName=upload`"
              name="upload"
              :fileList="setting.defaultImgUrl"
              listType="picture-card"
              :accept="'.png,.jpg,.jpeg,.gif,.bmp'"
              :headers="{ 'Access-Token': $store.getters.userInfo.accessToken }"
              :before-upload="
                (file, fileList) => {
                  return beforeUpload(file, fileList)
                }
              "
              @change="
                (info) => {
                  fileChange(info)
                }
              "
            >
              <div v-if="setting.defaultImgUrl && setting.defaultImgUrl.length === 0">
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item :labelCol="{ span: 6 }" :wrapperCol="{ span: 15 }" :label="$t('无数据时文案')">
            <a-input
              v-decorator="[
                'setting[defaultText]',
                {
                  rules: [{ required: true, message: $t('请输入无数据时文案') }],
                  initialValue: setting.defaultText || undefined
                }
              ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="8">
          <a-form-item :labelCol="{ span: 9 }" :wrapperCol="{ span: 15 }" :label="$t('加载前文案')">
            <a-input
              v-decorator="[
                'setting[beforeLoadText]',
                {
                  rules: [{ required: true, message: $t('请输入加载前文案') }],
                  initialValue: setting.beforeLoadText || undefined
                }
              ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="8">
          <a-form-item :labelCol="{ span: 9 }" :wrapperCol="{ span: 15 }" :label="$t('加载中文案')">
            <a-input
              v-decorator="[
                'setting[loadingText]',
                {
                  rules: [{ required: true, message: $t('请输入加载中文案') }],
                  initialValue: setting.loadingText || undefined
                }
              ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item :labelCol="{ span: 6 }" :wrapperCol="{ span: 15 }" :label="$t('加载中图标样式')">
            <a-radio-group
              v-decorator="[
                'setting[loadingIcon]',
                {
                  rules: [{ required: true, message: $t('请选择加载中图标样式') }],
                  initialValue: setting.loadingIcon || 'circle'
                }
              ]"
            >
              <a-radio :value="'circle'">circle</a-radio>
              <a-radio :value="'flower'">flower</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="8">
          <a-form-item :labelCol="{ span: 9 }" :wrapperCol="{ span: 15 }" :label="$t('加载后文案')">
            <a-input
              v-decorator="[
                'setting[afterLoadText]',
                {
                  rules: [{ required: true, message: $t('请输入加载后文案') }],
                  initialValue: setting.afterLoadText || undefined
                }
              ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="8">
          <a-form-item :labelCol="{ span: 9 }" :wrapperCol="{ span: 15 }" :label="$t('没有更多文案')">
            <a-input
              v-decorator="[
                'setting[noMoreText]',
                {
                  rules: [{ required: true, message: $t('请输入没有更多文案') }],
                  initialValue: setting.noMoreText || undefined
                }
              ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </a-card>
    <condition ref="condition" :params="condition" @ok="getCondition" />
    <tplview-data-querier-workflow-filter
      ref="tplviewDataQuerierWorkflowFilter"
      :flowgroupBtnConfig="flowgroupBtnConfig"
      :tabThis="tabThis"
      @ok="getWorkflowFilter"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  i18n: window.lang('admin'),
  components: {
    Condition: () => import('../Table/Condition'),
    TinyMce: () => import('@/components/Editor/TinyMce'),
    FastFilterPermissions: () => import('./FastFilterPermissions'),
    SetLang: () => import('@/components/SetLang'),
    SetAlias: () => import('@/components/SetAlias/SetAlias'),
    TplviewDataQuerierWorkflowFilter: () => import('./TplviewDataQuerierWorkflowFilter')
  },
  props: {
    fieldMappings: {
      type: Array,
      default () {
        return []
      },
      required: true
    },
    treeSelectList: {
      type: Array,
      default () {
        return []
      },
      required: true
    },
    workflow: {
      type: Array,
      default () {
        return []
      },
      required: true
    },
    data: {
      type: Object,
      default () {
        return {}
      },
      required: true
    },
    setting: {
      type: Object,
      default () {
        return {}
      },
      required: true,
      deep: true
    },
    pageName: {
      type: String,
      default: ''
    },
    parentThis: {
      type: Object,
      default: () => { }
    },
    workflowSearcherProp: {
      type: Object,
      default: () => { }
    },
    flowgroupBtnConfig: {
      type: Object,
      default: () => { }
    },
    tabThis: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      config: {},
      labelCol: { span: 3 },
      wrapperCol: { span: 10 },
      form: this.$form.createForm(this),
      visible: false,
      loading: false,
      timePartition: false,
      timeRangeShow: false,
      condition: {
        data: {}
      },
      helpText: {},
      settingFlag: false,
      svg: {},
      customDataSource: false,
      workflowSearcher: {} // 流程筛选
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    condition (val) {
      this.$emit('update:setting', Object.assign(this.setting, { condition: val.data }))
    },
    setting (val) {
      if (val.condition) {
        if (val.condition.value) {
          this.settingFlag = true
          return
        }
      }
      if (!val.drawerType) {
        val.drawerType = '0'
      }
      if (val.dataSource) {
        this.customDataSource = true
      } else {
        this.customDataSource = false
      }
      this.settingFlag = false
    },
    workflowSearcherProp (val) {
      this.workflowSearcher = val
    }
  },
  mounted () {
    this.svg = {
      template: `<svg t="1639648071074" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5648" width="200" height="200"><path d="M758.560512 68.191078 265.439488 68.191078c-54.490032 0-98.130971 44.134173-98.130971 98.624205l-0.493234 788.993638L512 807.872614l345.184717 147.936307L857.184717 166.815283C857.184717 112.325251 813.04952 68.191078 758.560512 68.191078z" p-id="5649" fill="#1296db"></path></svg>`
    }
  },
  methods: {
    handleCondition () {
      this.condition = { tableId: this.data.tableId, data: this.setting.condition || {} }
      this.$refs.condition.show({ title: this.$t('条件设置') })
    },
    getCondition (val) {
      this.condition = val
      this.setting.condition = val.data
      if (this.setting.condition) {
        if (this.setting.condition.value) {
          this.settingFlag = true
          return
        }
      }
      this.settingFlag = false
    },
    // 打开帮助说明编辑页面
    getEditor () {
      this.visible = true
      this.loading = true
      this.axios({
        url: '/admin/document/edit',
        data: {
          action: 'get',
          number: this.data.templateId
        }
      }).then(res => {
        this.loading = false
        if (!res.code) {
          this.helpText = res.result || {}
        } else {
          this.$message.warning(res.message)
          this.visible = false
        }
      })
    },
    // 帮助说明内容提交
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          this.loaidng = true
          this.axios({
            url: '/admin/document/edit',
            data: Object.assign({
              number: this.data.templateId,
              action: 'submit'
            }, values)
          }).then(res => {
            this.loaidng = true
            if (!res.code) {
              this.visible = false
            } else {
              this.$message.warning(res.message)
            }
          })
        }
      })
    },
    setAlias (item) {
      this.parentThis.form.setFieldsValue({
        'setting[alias]': item.pinYin
      })
      // this.$emit('setFieldValue', {
      //   key: 'setting[alias]',
      //   value: item.value
      // })
      // const { setFieldsValue } = this.form
      // setFieldsValue({ 'setting[alias]': item.value })
    },
    beforeUpload (file, fileList) {
      return new Promise((resolve, reject) => {
        const fileType = '.png,.jpg,.jpeg,.gif,.bmp'
        const suffix = file.name.substring(file.name.lastIndexOf('.'), file.name.length)
        if (!fileType.includes(suffix)) {
          this.$message.error(this.$t('上传文件格式错误'))
          return reject(file)
        }
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!isLt2M) {
          const message = this.$t('上传文件大小超过{0}', { 0: '10M' })
          this.$message.error(message)
          return reject(file)
        }
        return resolve(file)
      })
    },
    // 图片附件赋值
    fileChange (info) {
      info.fileList = info.fileList.map(item => {
        if (item.response && item.response.code !== 0) {
          this.debounceToast(item)
        }
        const obj = {
          name: item.name,
          response: item.response,
          status: item.status,
          uid: item.uid,
          url: item.response && item.response.result ? (this.$store.state.env.VUE_APP_API_BASE_URL + 'admin/api/download/?filePath=' + item.response.result.filePath) : ''
        }
        return obj
      })
      this.setting.defaultImgUrl = info.fileList
      this.$forceUpdate()
    },
    workflowFilterSetting () {
      this.$refs.tplviewDataQuerierWorkflowFilter.show({
        title: this.$t('设置：流程筛选组'),
        record: this.workflowSearcher || { showWorkflowFilters: true }
      })
    },
    getWorkflowFilter (data) {
      this.workflowSearcher = data
    }
  }
}
</script>
