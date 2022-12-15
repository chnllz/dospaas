<template>
  <a-drawer :destroyOnClose="true" :title="title" :width="600" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item :label="$t('上级部门')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <data-picker
            ref="dataPicker"
            :placeholder="$t('作为一级部门')"
            name="info[parentDepartmentId]"
            parentId="parentDepartmentId"
            displayType="tree"
            url="/admin/department/init"
            searchUrl="/admin/search/departmentSearch"
            :value="departmentData"
            :scope="scope"
            :optionsConversion="optionsConversion"
            :parameter="parameter"
            @select="
              (e) => {
                data.parentDepartmentId = e
              }
            "
          />
        </a-form-item>
        <a-form-item :label="$t('部门名称')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="[
              'info[departmentName]',
              {
                rules: [
                  { required: true, pattern: new RegExp(/^(\s*\S+\s*)+$/), message: $t('请输入部门名称') },
                  { max: 16, message: $t('部门名称不得大于16个字符') }
                ],
                initialValue: data.departmentName
              }
            ]"
          >
            <set-lang slot="addonAfter" />
          </a-input>
        </a-form-item>
        <a-form-item :label="$t('分流比例')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number
            v-decorator="[
              'info[assignPercent]',
              { rules: [{ required: true, message: $t('请输入分流比例') }], initialValue: data.assignPercent || 0 }
            ]"
            :max="100"
            :min="0"
          ></a-input-number>
        </a-form-item>
        <a-form-item v-if="userInfo.superAdmin" :labelCol="labelCol" :wrapperCol="wrapperCol">
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
        <a-form-item :label="$t('访问范围')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-button size="small" @click="handlePriv">
            <a-badge v-if="privFlag" status="success" :text="$t('设置')" />
            <a-badge v-else status="default" :text="$t('设置')" />
          </a-button>
        </a-form-item>
        <a-form-item :label="$t('备注')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['info[remarks]', { initialValue: data.remarks }]" :autoSize="{ minRows: 6 }" />
        </a-form-item>
      </a-form>
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">
          {{ $t('保存') }}
        </a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
      <priv-range ref="privRange" :key="privKey" :setting="dataPermissions" @ok="getPriv" />
    </a-spin>
  </a-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  i18n: window.lang('admin'),
  components: {
    PrivRange: () => import('../PrivRange/PrivRange'),
    SetLang: () => import('@/components/SetLang')
  },
  data () {
    return {
      config: {},
      title: '',
      url: '', // 表单提交地址
      options: [],
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      departmentData: [],
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      scope: this,
      data: {
        assignPercent: null,
        departmentId: null,
        departmentName: null,
        disabled: null,
        fullDepartmentId: null,
        fullDepartmentName: null,
        id: null,
        listOrder: null,
        parentDepartmentId: null,
        dataPermissions: null,
        queue: null,
        remarks: null,
        standardDuration: null,
        childCount: null,
        updateTime: null,
        updateUser: null
      },
      privKey: 'privKey',
      dataPermissions: {},
      privFlag: false,
      parameter: {},
      action: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    showAdd () {
      this.visible = true
      this.title = this.$t('添加')
      this.url = '/admin/department/add'
      this.action = 'add'
      this.departmentData = []
      this.form.resetFields()
      if (this.$parent.breadcrumb.length > 0) {
        this.data.parentDepartmentId = this.$parent.breadcrumb[this.$parent.breadcrumb.length - 1].departmentId
        const obj = {
          key: this.data.parentDepartmentId,
          label: this.$parent.breadcrumb[this.$parent.breadcrumb.length - 1].fullDepartmentName
        }
        this.departmentData.push(obj)
      }
    },
    showEdit (config) {
      if (config.record) {
        this.parameter = {
          excludeDepartmentId: config.record.departmentId
        }
      }
      this.visible = true
      this.title = this.$t(`${this.$t('编辑')}：${config.record.departmentName}`)
      this.url = '/admin/department/edit'
      this.action = 'edit'
      this.loading = true
      this.config = config
      this.axios({
        url: '/admin/department/get',
        params: {
          departmentId: config.record.departmentId
        }
      }).then(res => {
        this.loading = false
        this.form.resetFields()
        this.data = res.result
        this.dataPermissions = this.data.dataPermissions ? this.data.dataPermissions : {}
        if (this.dataPermissions) {
          this.privFlag = Object.keys(this.dataPermissions).length !== 0
        } else {
          this.privFlag = false
        }
        this.options = res.result.options
        if (this.data.parentDepartmentId) {
          const obj = {
            key: this.data.parentDepartmentId,
            label: this.$parent.breadcrumb[this.$parent.breadcrumb.length - 1].fullDepartmentName
          }
          this.departmentData.push(obj)
        }
      })
    },
    // 打开访问范围
    handlePriv () {
      this.privKey = this.privKey === 'privKey' ? 'privKey_1' : 'privKey'
      this.$nextTick(() => {
        this.$refs.privRange.show({
          page: 'depart'
        })
      })
    },
    // 组织结构options转换
    optionsConversion (list, displayType, searchType) {
      if (searchType) {
        return list.map(item => {
          const obj = item
          obj.key = item.departmentId
          obj.label = item.fullDepartmentName
          return obj
        })
      } else {
        return list.map(item => {
          const obj = item
          obj.key = item.departmentId
          obj.label = item.departmentName
          return obj
        })
      }
    },
    // 获取访问范围
    getPriv (val) {
      this.dataPermissions = val
      this.privFlag = Object.keys(this.dataPermissions).length !== 0
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          values.info.dataPermissions = Object.keys(this.dataPermissions).length > 0 ? this.dataPermissions : {
            departLead: ['own', 'depart'],
            departUser: ['own'],
            list: []
          }
          if (this.data.parentDepartmentId) {
            values.info.parentDepartmentId = this.data.parentDepartmentId
          } else {
            values.info.parentDepartmentId = null
          }
          const data = Object.assign({}, values.info)
          if (this.action === 'edit') {
            data.departmentId = this.data.departmentId
          }
          this.loading = true
          this.axios({
            url: this.url,
            data
          }).then((res) => {
            this.visible = false
            this.loading = false
            this.$emit('ok', values)
            if (res.code) {
              this.$message.warning(res.message)
            } else {
              this.$message.success(res.message)
              this.form.resetFields()
            }
          })
        } else {
          this.$message.warning(this.$t('表单填写不符合要求，请参考页面内具体提示修改'))
        }
      })
    }
  }
}
</script>
