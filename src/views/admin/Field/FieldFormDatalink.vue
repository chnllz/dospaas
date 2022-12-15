<template>
  <a-drawer
    :destroyOnClose="true"
    :title="$t('数据联动设置')"
    :width="600"
    :visible="visible"
    @close="visible = !visible"
  >
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item :label="$t('联动数据表')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-cascader
            v-decorator="['linkList', { initialValue: linkList }]"
            :placeholder="$t('请选择源数据表')"
            :options="tableField"
            @change="virtualSourceChange"
          />
        </a-form-item>
        <a-form-item validate-status="success" :label="$t('数据联动')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[
              'link[currentValue]',
              { initialValue: link.currentValue || undefined, rules: [{ required: true, message: $t('请选择当前表字段') }] }
            ]"
            :placeholder="$t('请选择当前表字段')"
            show-search
            option-filter-prop="children"
            style="width: 150px; margin-right: 10px"
          >
            <a-select-option v-for="(value, key) in currentFields" :key="key" :value="value.alias">
              {{ value.name }}
            </a-select-option>
          </a-select>
          {{ $t('值等于') }}
          <a-select
            v-decorator="[
              'link[relativeValue]',
              {
                initialValue: link.relativeValue || undefined,
                rules: [{ required: true, message: $t('请选择源数据表关联字段') }]
              }
            ]"
            :placeholder="$t('请选择源数据表关联字段')"
            show-search
            option-filter-prop="children"
            style="width: 150px; margin: 0 10px 0 24px"
          >
            <a-select-option
              v-for="sourceField in sourceFields"
              :key="sourceField.fieldId"
              :value="sourceField.fieldId"
            >
              {{ sourceField.name }}
            </a-select-option>
          </a-select>
          {{ $t('的值时') }}
          <a-select
            v-decorator="['link[currentField]', { initialValue: config.name || undefined }]"
            show-search
            option-filter-prop="children"
            :disabled="true"
            style="width: 150px; margin-right: 10px"
          >
            <a-select-option :value="config.alias">{{ config.name }}</a-select-option>
          </a-select>
          {{ $t('联动显示') }}
          <a-select
            v-decorator="[
              'link[relativeText]',
              {
                initialValue: link.relativeText || undefined,
                rules: [{ required: true, message: $t('请选择源数据表关联字段') }]
              }
            ]"
            :placeholder="$t('请选择源数据表关联字段')"
            show-search
            option-filter-prop="children"
            style="width: 150px; margin: 0 10px"
          >
            <a-select-option
              v-for="sourceField in sourceFields"
              :key="sourceField.fieldId"
              :value="sourceField.fieldId"
            >
              {{ sourceField.name }}
            </a-select-option>
          </a-select>
          {{ $t('的值') }}
        </a-form-item>
      </a-form>
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  props: {
    tableField: {
      type: Array,
      default: () => { }
    }
  },
  data () {
    return {
      config: {},
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      data: {},
      sourceFields: [],
      currentFields: [],
      link: [],
      linkList: []
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      if (this.config.data && this.config.data.linkList) {
        this.link = this.config.data.link
        this.linkList = this.config.data.linkList
        this.dataLink = this.config.data
        if (this.linkList.length !== 0) {
          this.virtualSourceChange(this.linkList)
        }
      }
      this.form.resetFields()
    },
    virtualSourceChange (value) {
      this.axios({
        url: '/admin/field/getSourceOptions',
        data: Object.assign({ sourceTableId: value[1], currentTableId: this.config.tableId, virtualField: 0 })
      }).then(res => {
        this.sourceFields = res.result.sourceFields
        this.currentFields = res.result.currentFields
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          this.visible = false
          this.$message.success(this.$t('操作成功'))
          this.$emit('ok', { dataType: this.config.dataType, data: values })
        }
      })
    }
  }
}
</script>
