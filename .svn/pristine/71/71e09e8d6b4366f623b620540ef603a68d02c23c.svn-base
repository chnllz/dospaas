<template>
  <a-drawer
    :destroyOnClose="true"
    :title="$t('数据联动设置')"
    :width="600"
    :visible="visible"
    @close="visible = !visible"
  >
    <a-spin :spinning="loading">
      <div>
        <a-form :form="form">
          <a-form-item :label="$t('联动数据表')">
            <a-cascader
              v-decorator="[
                'dataSource',
                { initialValue: dataSource, rules: [{ required: true, message: $t('请选择联动数据表') }] }
              ]"
              :show-search="true"
              :placeholder="$t('请选择联动数据表')"
              :options="tableField"
              @change="changeTable"
            />
          </a-form-item>
          <a-row>
            <a-col :span="9">
              <a-form-item :label="$t('数据联动')" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                <a-select
                  v-decorator="['currentFieldCause', { initialValue: currentFieldCause || undefined }]"
                  :placeholder="$t('请选择当前表字段')"
                  show-search
                  option-filter-prop="children"
                  :allowClear="true"
                >
                  <a-select-option v-for="item in currentFieldsCause" :key="item.fieldId" :value="item.alias">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="3">
              <div style="width: 100%; text-align: center; height: 36px; line-height: 36px">{{ $t('值等于') }}</div>
            </a-col>
            <a-col :span="9">
              <a-form-item :wrapperCol="{ span: 24 }">
                <a-select
                  v-decorator="[
                    'sourceFieldCause',
                    {
                      initialValue: sourceFieldCause || undefined,
                      rules: [
                        {
                          validator: (rule, value, callback) => {
                            if (!form.getFieldValue('currentFieldCause')) {
                              callback()
                            } else if (!value) {
                              callback($t('请选择联动数据表字段'))
                            } else {
                              callback()
                            }
                          }
                        }
                      ]
                    }
                  ]"
                  :placeholder="$t('请选择联动数据表字段')"
                  show-search
                  option-filter-prop="children"
                  :allowClear="true"
                >
                  <a-select-option v-for="item in sourceFields" :key="item.fieldId" :value="item.alias">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="3">
              <div style="width: 100%; text-align: center; height: 36px; line-height: 36px">{{ $t('的值时') }}</div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="9">
              <a-form-item>
                <a-input :placeholder="$t('当前前端名称')" :value="data.name" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="3">
              <div style="width: 100%; text-align: center; height: 36px; line-height: 36px">{{ $t('联动显示') }}</div>
            </a-col>
            <a-col :span="9">
              <a-form-item :wrapperCol="{ span: 24 }">
                <a-select
                  v-decorator="[
                    'sourceFieldEffect',
                    {
                      initialValue: sourceFieldEffect || undefined,
                      rules: [{ required: true, message: $t('请选择联动数据表字段') }]
                    }
                  ]"
                  :placeholder="$t('请选择联动数据表字段')"
                  show-search
                  option-filter-prop="children"
                >
                  <a-select-option v-for="item in sourceFields" :key="item.fieldId" :value="item.alias">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">{{ $t('确定') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  data () {
    return {
      loading: false,
      visible: false,
      form: this.$form.createForm(this),
      data: [],
      title: '',
      config: {},
      tableField: [],
      dataSource: [],
      currentFields: [],
      currentFieldsCause: [],
      updown: [],
      currentFieldsObj: {},
      sourceFields: [],
      sourceFieldsObj: {},
      currentFieldCause: undefined,
      sourceFieldCause: undefined,
      sourceFieldEffect: undefined
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.data = config.data || {}
      this.tableField = config.tableField
      const currentTableField = config.tableId
      this.loading = true
      const param = {
        pageNo: 1,
        pageSize: 1000,
        sortField: 'id',
        sortOrder: 'descend'
      }
      this.axios({
        url: '/admin/field/init',
        data: Object.assign(param, { tableId: currentTableField })
      }).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.currentFields = JSON.parse(JSON.stringify(res.result.data))
          res.result.data.forEach(item => {
            this.currentFieldsObj[item.alias] = item
          })
          this.currentFieldsCause = this.currentFields
          this.updown = this.currentFieldsCause.filter(item => item.formType === 'combobox' && item.name !== this.data.name)
        } else {
          this.$message.error(res.message)
        }
      })
      const setting = config.setting
      if (setting.form && setting.form.defaultValueLink) {
        this.currentFieldCause = setting.form.defaultValueLink.currentFieldCause
        this.dataSource = setting.form.defaultValueLink.dataSource
        this.sourceFieldCause = setting.form.defaultValueLink.sourceFieldCause
        this.sourceFieldEffect = setting.form.defaultValueLink.sourceFieldEffect
        this.changeTable(this.dataSource)
      }
    },
    // 选择数据表
    changeTable (val) {
      if (!val || val.length === 0) {
        this.sourceFields = []
      } else {
        const tableField = val[val.length - 1]
        const param = {
          pageNo: 1,
          pageSize: 1000,
          sortField: 'id',
          sortOrder: 'descend'
        }
        this.axios({
          url: '/admin/field/init',
          data: Object.assign(param, { tableId: tableField })
        }).then(res => {
          if (res.code === 0) {
            this.sourceFields = JSON.parse(JSON.stringify(res.result.data))
            res.result.data.forEach(item => {
              this.sourceFieldsObj[item.alias] = item
            })
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          this.$emit('ok', values)
          this.visible = false
        }
      })
    }
  }
}
</script>
