<template>
  <a-drawer :title="config.title" :width="900" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-tabs v-model="activeKey">
          <a-tab-pane key="department" :tab="$t('组织')">
            <a-table
              size="small"
              rowKey="nodedata"
              :columns="columnsDepartment"
              :dataSource="departmentData"
              :rowSelection="rowSelectionDepartment"
              :pagination="false"
            />
          </a-tab-pane>
          <a-tab-pane key="role" :tab="$t('角色')">
            <a-table
              size="small"
              rowKey="nodedata"
              :columns="columnsRole"
              :dataSource="roleData"
              :rowSelection="rowSelectionRole"
              :pagination="false"
            />
          </a-tab-pane>
        </a-tabs>
        <a-form-item :label="$t('选择权限')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-radio-group v-decorator="['fieldpriv', { initialValue: 'inherit' }]">
            <a-radio value="inherit">{{ $t('继承') }}</a-radio>
            <a-radio value="allow">{{ $t('允许') }}</a-radio>
            <a-radio value="readonly">{{ $t('只读') }}</a-radio>
            <a-radio value="hidden">{{ $t('隐藏') }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-button @click="handleSelect">{{ $t('添加') }}</a-button>
        <a-divider orientation="left">{{ $t('访问范围') }}</a-divider>
        <a-table size="small" rowKey="id" :columns="columnsFieldPriv" :dataSource="privData">
          <span slot="priv" slot-scope="text">
            <a-badge v-if="text == 'inherit'" status="success" :text="$t('继承')" />
            <a-badge v-else-if="text == 'allow'" status="success" :text="$t('允许')" />
            <a-badge v-else-if="text == 'readonly'" status="success" :text="$t('只读')" />
            <a-badge v-else-if="text == 'hidden'" status="success" :text="$t('隐藏')" />
          </span>
          <span slot="type" slot-scope="text">
            <a-badge v-if="text == 'department'" status="success" :text="$t('部门')" />
            <a-badge v-else-if="text == 'user'" status="success" :text="$t('用户')" />
            <a-badge v-else-if="text == 'role'" status="success" :text="$t('角色')" />
          </span>
          <span slot="privData" slot-scope="text, record">
            <template v-for="(value, key) in departmentArr">
              <a-badge v-if="text == value.departmentId" :key="key" status="success" :text="value.name" />
            </template>
            <template v-for="(value, key) in roleArr">
              <a-badge v-if="text == value.roleId" :key="key" status="success" :text="value.roleName" />
            </template>
            <a-badge v-if="record.type == 'user'" status="success" :text="text" />
          </span>
          <div slot="action" slot-scope="text, record">
            <a @click="handleDelete(record)">{{ $t('删除') }}</a>
          </div>
        </a-table>
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
    params: {
      type: Object,
      default () {
        return {}
      },
      required: false
    }
  },
  data () {
    return {
      config: {},
      labelCol: { span: 2 },
      wrapperCol: { span: 20 },
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      data: {},
      privData: [],
      columnsDepartment: [{
        title: this.$t('组织'),
        dataIndex: 'text'
      }],
      columnsRole: [{
        title: this.$t('角色'),
        dataIndex: 'text'
      }],
      columnsFieldPriv: [{
        title: this.$t('排序'),
        dataIndex: 'listOrder'
      }, {
        title: this.$t('权限'),
        dataIndex: 'priv',
        scopedSlots: { customRender: 'priv' }
      }, {
        title: this.$t('类型'),
        dataIndex: 'type',
        scopedSlots: { customRender: 'type' }
      }, {
        title: this.$t('所属'),
        dataIndex: 'privData',
        scopedSlots: { customRender: 'privData' }
      }, {
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 80,
        scopedSlots: { customRender: 'action' }
      }],
      selectedRowsDepartment: [],
      rowSelectionDepartment: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowsDepartment = selectedRows
        }
      },
      selectedRowsRole: [],
      rowSelectionRole: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowsRole = selectedRows
        }
      },
      activeKey: 'department',
      departmentData: [],
      roleData: [],
      departmentArr: [],
      roleArr: []
    }
  },
  methods: {
    show (config, data) {
      this.visible = true
      this.config = config
      this.data = config.record
      this.recordIndex = config.index
      this.form.resetFields()
      this.privData = this.data.fieldPermissions ? JSON.parse(this.data.fieldPermissions) : []
      this.axios({
        url: '/admin/template/getPrivUsers'
      }).then((res) => {
        this.loading = false
        this.departmentData = res.result.departmentData
        this.departmentArr = res.result.department
        this.roleData = res.result.roleData
        this.roleArr = res.result.role
      })
    },
    handleSelect () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        for (var k in this.selectedRowsDepartment) {
          var record = {
            id: (new Date()).valueOf() + Math.random() * 1000,
            listOrder: this.privData.length * 10 + 10,
            priv: values.fieldpriv,
            type: this.selectedRowsDepartment[k].nodetype,
            privData: this.selectedRowsDepartment[k].nodedata
          }
          this.privData.push(record)
        }
        for (var rk in this.selectedRowsRole) {
          var record2 = {
            id: (new Date()).valueOf() + Math.random() * 1000,
            listOrder: this.privData.length * 10 + 10,
            priv: values.fieldpriv,
            type: this.selectedRowsRole[rk].nodetype,
            privData: this.selectedRowsRole[rk].nodedata
          }
          this.privData.push(record2)
        }
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          this.data = Object.assign(this.data, { fieldPermissions: this.privData.length > 0 ? JSON.stringify(this.privData) : '' })
          this.$set(this.params.fieldPrivData, this.recordIndex, this.data)
          this.visible = false
          this.$message.success(this.$t('操作成功'))
        }
      })
    },
    handleDelete (record) {
      const dataSource = [...this.privData]
      this.privData = dataSource.filter(item => item.id !== record.id)
    }
  }
}
</script>
