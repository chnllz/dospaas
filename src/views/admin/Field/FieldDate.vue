<template>
  <a-form :form="form">
    <!-- <a-form-item :label="$t('输入提示')" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-input v-decorator="['setting[attribute][emptyText]', {initialValue: data.attribute.emptyText || ''}]" />
    </a-form-item> -->
    <a-form-item :label="$t('最小值')" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-radio-group :default-value="data.form.minType || ''" style="width: 100%" @change="getMinType">
        <a-form-item>
          <a-row>
            <a-radio value="">{{ $t('不设置') }}</a-radio>
          </a-row>
        </a-form-item>
        <a-form-item style="margin-top: -8px">
          <a-row>
            <a-radio value="now">{{ $t('当前时刻') }}</a-radio>
          </a-row>
        </a-form-item>
        <a-form-item style="margin-top: -8px">
          <a-row>
            <a-col :span="3">
              <a-radio value="custom">{{ $t('自定义') }}</a-radio>
            </a-col>
            <a-col :span="6">
              <a-form-item v-if="minType === 'custom'">
                <a-date-picker
                  v-if="format === 'YYYY-MM-DD'"
                  v-decorator="[
                    'setting[form][minValue]',
                    {
                      initialValue: minType === 'custom' && minValue ? moment(minValue) : null,
                      rules: [{ required: minType === 'custom', message: $t('请选择最小值') }, { validator: checkTime }]
                    }
                  ]"
                  style="width: 100%"
                  size="small"
                  :disabled="minType !== 'custom'"
                  :disabled-date="
                    (current) => {
                      if (maxType === 'custom') {
                        return current > moment(maxValue)
                      }
                    }
                  "
                  format="YYYY-MM-DD"
                  @change="
                    (val, valString) => {
                      minValue = valString
                    }
                  "
                />
                <a-date-picker
                  v-else-if="format === 'YYYY-MM-DD HH:mm:ss'"
                  v-decorator="[
                    'setting[form][minValue]',
                    {
                      initialValue: minType === 'custom' && minValue ? moment(minValue) : null,
                      rules: [{ required: minType === 'custom', message: $t('请选择最小值') }, { validator: checkTime }]
                    }
                  ]"
                  style="width: 100%"
                  format="YYYY-MM-DD HH:mm:ss"
                  :disabled="minType !== 'custom'"
                  :disabled-date="
                    (current) => {
                      if (maxType === 'custom') {
                        return current > moment(maxValue)
                      }
                    }
                  "
                  size="small"
                  :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
                  @change="
                    (val, valString) => {
                      minValue = valString || null
                    }
                  "
                />
                <a-time-picker
                  v-else
                  v-decorator="[
                    'setting[form][minValue]',
                    {
                      initialValue: minType === 'custom' && minValue ? moment(minValue, 'HH:mm:ss') : null,
                      rules: [{ required: minType === 'custom', message: $t('请选择最小值') }, { validator: checkTime }]
                    }
                  ]"
                  style="width: 100%"
                  size="small"
                  :disabled="minType !== 'custom'"
                  @change="
                    (time, timeString) => {
                      changeTime(time, timeString, 'min')
                    }
                  "
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item>
          <a-row>
            <a-col :span="3">
              <a-radio value="field">{{ $t('本表字段') }}</a-radio>
            </a-col>
            <a-col :span="6">
              <a-form-item v-if="minType === 'field'">
                <a-select
                  v-decorator="[
                    'setting[form][minValue]',
                    {
                      initialValue: minType === 'field' ? minValue : undefined,
                      rules: [{ required: minType === 'field', message: $t('请选择字段') }]
                    }
                  ]"
                  :disabled="minType !== 'field'"
                  size="small"
                  showSearch
                  option-filter-prop="children"
                  :placeholder="$t('请选择本表字段')"
                  @change="
                    (val) => {
                      minValue = val
                    }
                  "
                >
                  <a-select-option v-for="item in fieldArr" :key="item.fieldId" :value="item.alias">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form-item>
      </a-radio-group>
    </a-form-item>
    <a-form-item :label="$t('最大值')" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-radio-group :default-value="data.form.maxType || ''" style="margin-top: 8px; width: 100%" @change="getMaxType">
        <a-form-item style="margin-top: -8px">
          <a-row>
            <a-radio value="">{{ $t('不设置') }}</a-radio>
          </a-row>
        </a-form-item>
        <a-form-item style="margin-top: -8px">
          <a-row>
            <a-radio value="now">{{ $t('当前时刻') }}</a-radio>
          </a-row>
        </a-form-item>
        <a-form-item style="margin-top: -8px">
          <a-row>
            <a-col :span="3">
              <a-radio value="custom">{{ $t('自定义') }}</a-radio>
            </a-col>
            <a-col :span="6">
              <a-form-item v-if="maxType === 'custom'">
                <a-date-picker
                  v-if="format === 'YYYY-MM-DD' || format === 'YYYY-MM'"
                  v-decorator="[
                    'setting[form][maxValue]',
                    {
                      initialValue: maxType === 'custom' && maxValue ? moment(maxValue) : null,
                      rules: [{ required: maxType === 'custom', message: $t('请选择最大值') }]
                    }
                  ]"
                  style="width: 100%"
                  size="small"
                  :format="format"
                  :disabled="maxType !== 'custom'"
                  :disabled-date="
                    (current) => {
                      if (minType === 'custom') {
                        return current < moment(minValue)
                      }
                    }
                  "
                  @change="
                    (val, valString) => {
                      maxValue = valString || null
                    }
                  "
                />
                <a-date-picker
                  v-else-if="format === 'YYYY-MM-DD HH:mm:ss'"
                  v-decorator="[
                    'setting[form][maxValue]',
                    {
                      initialValue: maxType === 'custom' && maxValue ? moment(maxValue) : null,
                      rules: [{ required: maxType === 'custom', message: $t('请选择最大值') }]
                    }
                  ]"
                  style="width: 100%"
                  format="YYYY-MM-DD HH:mm:ss"
                  :disabled="maxType !== 'custom'"
                  :disabled-date="
                    (current) => {
                      if (minType === 'custom') {
                        return current < moment(minValue)
                      }
                    }
                  "
                  size="small"
                  :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
                  @change="
                    (val, valString) => {
                      maxValue = valString || null
                    }
                  "
                />
                <a-time-picker
                  v-else
                  v-decorator="[
                    'setting[form][maxValue]',
                    {
                      initialValue: maxType === 'custom' && maxValue ? moment(maxValue, 'HH:mm:ss') : null,
                      rules: [{ required: maxType === 'custom', message: $t('请选择最大值') }]
                    }
                  ]"
                  style="width: 100%"
                  size="small"
                  :format="format"
                  :disabled="maxType !== 'custom'"
                  @change="
                    (time, timeString) => {
                      changeTime(time, timeString, 'max')
                    }
                  "
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item>
          <a-row>
            <a-col :span="3">
              <a-radio value="field">{{ $t('本表字段') }}</a-radio>
            </a-col>
            <a-col :span="6">
              <a-form-item v-if="maxType === 'field'">
                <a-select
                  v-decorator="[
                    'setting[form][maxValue]',
                    {
                      initialValue: maxType === 'field' ? maxValue : undefined,
                      rules: [{ required: maxType === 'field', message: $t('请选择字段') }]
                    }
                  ]"
                  :disabled="maxType !== 'field'"
                  size="small"
                  showSearch
                  option-filter-prop="children"
                  :placeholder="$t('请选择本表字段')"
                  @change="
                    (val) => {
                      maxValue = val
                    }
                  "
                >
                  <a-select-option v-for="item in fieldArr" :key="item.fieldId" :value="item.alias">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form-item>
      </a-radio-group>
    </a-form-item>
    <DateLinkage ref="dataLinkage" :key="linkKey" @ok="getDateLinkage" />
  </a-form>
</template>
<script>
import moment from 'moment'
export default {
  i18n: window.lang('admin'),
  components: {
    CodeEditor: () => import('@/views/admin/CodeEditor'),
    DateLinkage: () => import('./DataLinkage')
  },
  props: {
    setting: {
      type: Object,
      default: () => { }
    },
    dataOld: {
      type: Object,
      default: () => { }
    },
    config: {
      type: Object,
      default: () => { }
    },
    formatOld: {
      type: String,
      default: 'Y-m-d H:i:s'
    },
    tableField: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      linkKey: 'linkKey',
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      form: this.$form.createForm(this),
      data: {},
      format: 'YYYY-MM-DD',
      fieldType: '',
      fieldArr: [],
      fieldArrs: [],
      minType: '',
      minValue: '',
      maxType: '',
      maxValue: '',
      quoteTypes: [
        { value: 'insert', text: this.$t('前端页面加载-添加时') },
        { value: 'always', text: this.$t('前端页面加载-添加和编辑时') },
        { value: 'onlyinput_db', text: this.$t('后台系统加载-添加时') },
        { value: 'always_db', text: this.$t('后台系统加载-添加和编辑时') }
      ]
    }
  },
  watch: {
    formatOld: {
      handler (newVal) {
        switch (newVal) {
          case 'Y-m-d H:i:s':
            this.format = 'YYYY-MM-DD HH:mm:ss'
            this.fieldType = 'DATETIME'
            break
          case 'Y-m-d':
            this.format = 'YYYY-MM-DD'
            this.fieldType = 'DATE'
            break
          case 'H:i:s':
            this.format = 'HH:mm:ss'
            this.fieldType = 'TIME'
            break
          default:
            break
        }
        this.minValue = null
        this.maxValue = null
        this.fieldArr = this.fieldArrs.filter(item => item.formType === 'datetime' && item.fieldType === this.fieldType && this.dataOld.alias !== item.alias)
      }
    }
  },
  created () {
    this.data = JSON.parse(JSON.stringify(this.setting))
    this.data.form = this.data.form && !(this.data.form instanceof Array) ? this.data.form : {}
    this.minType = this.data.form.minType ? this.data.form.minType : ''
    this.maxType = this.data.form.maxType ? this.data.form.maxType : ''
    this.minValue = this.data.form.minValue ? this.data.form.minValue : undefined
    this.maxValue = this.data.form.maxValue ? this.data.form.maxValue : undefined
    const parameter = {
      pageNo: 1,
      pageSize: 1000,
      sortField: 'id',
      sortOrder: 'descend'
    }
    this.axios({
      url: '/admin/field/init',
      data: Object.assign(parameter, { tableId: this.config.tableId })
    }).then(res => {
      if (res.code === 0) {
        this.fieldArrs = res.result.data
        switch (this.formatOld) {
          case 'Y-m-d H:i:s':
            this.format = 'YYYY-MM-DD HH:mm:ss'
            this.fieldType = 'DATETIME'
            break
          case 'Y-m-d':
            this.format = 'YYYY-MM-DD'
            this.fieldType = 'DATE'
            break
          case 'H:i:s':
            this.format = 'HH:mm:ss'
            this.fieldType = 'TIME'
            break
          default:
            break
        }
        this.fieldArr = this.fieldArrs.filter(item => item.formType === 'datetime' && item.fieldType === this.fieldType && this.dataOld.alias !== item.alias)
      } else {
        this.$message.error(res.msg)
      }
    })
  },
  methods: {
    // 选择最小值类型
    getMinType (e) {
      this.minType = e.target.value
      this.minValue = undefined
      this.form.setFieldsValue({
        'setting[form][minValue]': undefined
      })
    },
    // 选择最大值类型
    getMaxType (e) {
      this.maxType = e.target.value
      this.maxValue = undefined
      this.form.setFieldsValue({
        'setting[form][maxValue]': undefined
      })
    },
    // 获取最小值最大值
    changeTime (time, timeString, type) {
      if (type === 'min') {
        this.minValue = timeString || null
      } else {
        this.maxValue = timeString || null
      }
    },
    // 时分秒比较大小
    handleCompare (time, timeTarget) {
      const arr = time.split(':')
      const arrT = timeTarget.split(':')
      const h = arr[0]
      const m = arr[1]
      const s = arr[2]
      const ht = arrT[0]
      const mt = arrT[1]
      const st = arrT[2]
      if (h < ht) {
        return -1
      } else if (h === ht) {
        if (m < mt) {
          return -1
        } else if (m === mt) {
          if (s < st) {
            return -1
          } else if (s === st) {
            return 0
          } else {
            return 1
          }
        } else {
          return 1
        }
      } else {
        return 1
      }
    },
    checkTime (rule, value, callback) {
      // 如果最大值和最小值都存在，最大值大于最小值
      if (this.minValue && this.maxValue) {
        const num = this.handleCompare(this.maxValue, this.minValue)
        if (num < 0) {
          const str = this.$t('最小值不能大于最大值')
          callback(str)
        } else {
          callback()
        }
      } else {
        callback()
      }
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
    handleSubmit () {
      let val = {}
      const { validateFields } = this.form
      validateFields((errors, values) => {
        if (!errors) {
          if (!values.setting) {
            values.setting = {}
          }
          values.setting.form = values.setting.form ? values.setting.form : {}
          values.setting.form.minType = this.minType
          values.setting.form.defaultValueLink = this.dataSource === 'linkData' ? this.setting.form.defaultValueLink : undefined
          if (this.format === 'HH:mm:ss') {
            values.setting.form.minValue = this.minValue
            values.setting.form.maxValue = this.maxValue
          } else {
            values.setting.form.minValue = this.minType !== 'field' && this.minValue ? moment(this.minValue).format(this.format) : this.minValue
            values.setting.form.maxValue = this.maxType !== 'field' && this.maxValue ? moment(this.maxValue).format(this.format) : this.maxValue
          }
          values.setting.form.maxType = this.maxType
          val = values
        }
      })
      return val
    }
  }
}
</script>
