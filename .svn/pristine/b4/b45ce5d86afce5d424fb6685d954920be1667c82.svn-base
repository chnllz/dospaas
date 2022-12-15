<template>
  <a-form :form="form">
    <a-form-item :label="$t('允许输入数值范围')" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row :gutter="8">
        <a-col :span="4">
          <a-form-item>
            <a-input-number
              v-decorator="[
                'setting[attribute][minValue]',
                { initialValue: String(data.attribute.minValue) === '0' ? 0 : data.attribute.minValue || '' }
              ]"
              :max="max"
              style="width: 100%"
              :precision="numPrecision"
              @blur="onBlur"
            />
          </a-form-item>
        </a-col>
        <a-col :span="1" style="text-align: center">{{ $t('至') }}</a-col>
        <a-col :span="4">
          <a-form-item>
            <a-input-number
              v-decorator="[
                'setting[attribute][maxValue]',
                { initialValue: String(data.attribute.maxValue) === '0' ? 0 : data.attribute.maxValue || '' }
              ]"
              :precision="numPrecision"
              style="width: 100%"
              :min="min"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item :label="$t('步进值')" :labelCol="labelCol" :wrapperCol="{ span: 3 }">
      <a-input-number
        v-decorator="['setting[attribute][step]', { initialValue: data.attribute.step }]"
        :precision="numPrecision"
        style="width: 100%"
      />
    </a-form-item>
    <a-form-item :label="$t('输入提示')" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-input v-decorator="['setting[attribute][emptyText]', { initialValue: data.attribute.emptyText || '' }]" />
    </a-form-item>
    <a-form-item :label="$t('前缀')" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <div class="center">
        <a-radio-group
          name="radioGroup"
          :default-value="data.form.prefixType ? data.form.prefixType : ''"
          @change="getPrefixType"
        >
          <a-radio value="">{{ $t('无') }}</a-radio>
          <a-radio value="￥">￥</a-radio>
          <a-radio value="$">$</a-radio>
          <a-radio value="word">{{ $t('文字') }}</a-radio>
        </a-radio-group>
        <a-input
          v-if="iconFlag === 'word'"
          v-model="prefixVal"
          size="small"
          style="width: 50px"
          @input="getPrefixVal"
        ></a-input>
      </div>
    </a-form-item>
    <a-form-item :label="$t('后置图标')" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-radio-group :defaultValue="setting.form.suffixIcon || ''" @change="handleLatter">
        <a-radio value="">{{ $t('无') }}</a-radio>
        <a-radio value="%">%</a-radio>
        <a-radio value="custom">{{ $t('自定义') }}</a-radio>
      </a-radio-group>
      <a-button v-if="suffixIcon === 'custom'" size="small" @click="codeEditor">
        <a-badge v-if="attributeFlag" status="success" :text="$t('设置')" />
        <a-badge v-else status="default" :text="$t('设置')" />
      </a-button>
    </a-form-item>
    <menu-icon ref="menuIcon" @ok="getIcon"></menu-icon>
    <code-editor ref="codeEditor" @func="getCode" />
  </a-form>
</template>

<script>
export default {
  i18n: window.lang('admin'),
  components: {
    MenuIcon: () => import('@/components/SelectIcon'),
    CodeEditor: () => import('@/views/admin/CodeEditor')
  },
  props: {
    setting: {
      type: Object,
      default: () => { }
    },
    precision: {
      type: Number,
      default: 0
    },
    fieldType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      refreshKey: 0,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      form: this.$form.createForm(this),
      data: {},
      numPrecision: 0, // 小数位数
      min: -Infinity,
      max: Infinity,
      regexs: [
        { value: '', text: this.$t('自定义') },
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
      iconFlag: '',
      prefixVal: '',
      prefixIcon: '',
      attributeFlag: false,
      suffixIcon: ''
    }
  },
  watch: {
    setting: {
      handler (newVal) {
        this.data = JSON.parse(JSON.stringify(newVal))
        this.data.form = this.data.form && !(this.data.form instanceof Array) ? this.data.form : {}
        this.iconFlag = this.data.form.prefixType
        this.prefixVal = this.data.form.prefixVal
        this.prefixIcon = this.data.form.prefixIcon
        this.suffixIcon = this.data.form.suffixIcon
        this.attributeFlag = !!this.data.form.suffixVal
      },
      immediate: true
    },
    fieldType: {
      handler (newVal) {
        if (newVal === 'INT') {
          this.numPrecision = 0
        } else {
          this.numPrecision = this.precision
        }
      },
      immediate: true
    },
    precision: {
      handler (newVal) {
        if (this.fieldType === 'INT') {
          this.numPrecision = 0
        } else {
          this.numPrecision = newVal
        }
      },
      immediate: true
    }
  },
  methods: {
    onBlur (e) {
      this.min = Number(e.target.value)
    },
    // 获取前缀
    getPrefixType (e) {
      const val = e.target.value
      this.data.form.prefixType = val
      this.iconFlag = val
      this.prefixVal = ''
      this.prefixIcon = ''
    },
    // 前缀
    getPrefixVal (e) {
      const val = e.target.value
      this.prefixVal = val.slice(0, 1)
      this.data.form.prefixType = this.prefixVal
    },
    // 显示图标库
    handleMenuIcon () {
      this.$refs.menuIcon.show()
    },
    // 获取图标
    getIcon (value) {
      this.prefixIcon = value
      this.data.form.prefixIcon = this.prefixIcon
    },
    // 后置图标
    handleLatter (e) {
      const val = e.target.value
      this.data.form.suffixIcon = val
      this.suffixIcon = val
    },
    // 打开设置附加属性
    codeEditor () {
      this.$refs.codeEditor.show({
        value: this.data.form.suffixVal || ''
      })
    },
    // 获取附加属性
    getCode (value) {
      this.data.form.suffixVal = value
      this.attributeFlag = true
    },
    handleSubmit () {
      let val = {}
      const { validateFields } = this.form
      validateFields((errors, values) => {
        values.setting.form = values.setting.form || {}
        values.setting.form.prefixType = this.iconFlag
        if (values.setting.form.prefixType === 'word') {
          values.setting.form.prefixVal = this.prefixVal
        } else if (values.setting.form.prefixType === 'icon') {
          values.setting.form.prefixVal = this.prefixIcon
        } else {
          values.setting.form.prefixVal = this.data.form.prefixType
        }
        values.setting.form.suffixIcon = this.data.form.suffixIcon
        if (this.data.form.suffixIcon === 'custom') {
          values.setting.form.suffixVal = this.data.form.suffixVal
        } else {
          values.setting.form.suffixVal = this.data.form.suffixIcon
        }
        val = values
      })
      return val
    }
  }
}
</script>
<style lang="less" scoped>
.center {
  height: 41px;
  padding: 0 0 2px;
  display: flex;
  align-items: center;
}
</style>
