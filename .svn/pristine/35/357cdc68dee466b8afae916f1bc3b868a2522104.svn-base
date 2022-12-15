<template>
  <div style="height: calc(100% - 8px); display: flex; flex-direction: column">
    <a-form layout="inline" style="display: flex; align-item: center">
      <a-row style="width: 100%; display: flex; align-items: center">
        <a-col :span="5"></a-col>
        <a-col :span="6">
          <a-form-item :label="$t('名称')">
            <a-input v-model="queryParam.name" allowClear />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-space>
            <a-button htmlType="submit" type="primary" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
            <a-button
              @click="
                () => {
                  queryParam = {}
                  $refs.table.refresh(true)
                }
              "
            >
              {{ $t('重置') }}
            </a-button>
            <a-button v-action:add icon="plus" type="primary" @click="handleAddData()">
              {{ $t('添加') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form>
    <div style="flex: 1" class="page">
      <s-table
        ref="table"
        size="small"
        rowKey="id"
        :columns="columns"
        :data="loadDataTable"
        class="table-fill"
        :scroll="{ y: true }"
        :sorter="{ field: 'id', order: 'descend' }"
      >
        <div slot="action" slot-scope="text, record">
          <a :disabled="record.accessLevel === 2" @click="handleEdit(record)">{{ $t('编辑') }}</a>
          <a-divider type="vertical" />
          <a @click="handleCopy(record)">{{ $t('复制') }}</a>
          <a-divider type="vertical" />
          <a :disabled="!!record.accessLevel" @click="handleDelete(record)">{{ $t('删除') }}</a>
          <a-divider type="vertical" />
          <a @click="handleCreateMenu(record)">{{ $t('创建菜单') }}</a>
        </div>
        <template slot="UID" slot-scope="text">
          <span :title="text">{{ text }}</span>
        </template>
        <template slot="type" slot-scope="text">
          <span>{{ tableType[text] }}</span>
        </template>
      </s-table>
    </div>
    <tplView-data-menu ref="tplviewDataMenu" @ok="handleOk" />
    <a-modal :title="config.title" :visible="visible" :destroyOnClose="true" @cancel="visible = !visible">
      <a-spin :spinning="loading">
        <a-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-form-item :label="$t('名称')">
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: '',
                  rules: [
                    { required: true, message: $t('请输入名称') },
                    { min: 2, max: 20, message: $t('请输入2-20个字符') }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('类型')">
            <a-select
              v-decorator="[
                'type',
                {
                  initialValue: config.action === 'copy' ? config.type : undefined,
                  rules: [{ required: true, message: $t('请选择数据窗口类型') }]
                }
              ]"
              :disabled="config.action === 'copy'"
              @change="
                (val) => {
                  config.type = val
                }
              "
            >
              <a-select-option key="webDataWindow" value="webDataWindow">{{ $t('普通数据窗口') }}</a-select-option>
              <a-select-option key="webSubformDataWindow" value="webSubformDataWindow">
                {{ $t('子表数据窗口') }}
              </a-select-option>
              <a-select-option key="appDataWindow" value="appDataWindow">{{ $t('移动端数据窗口') }}</a-select-option>
              <a-select-option
                v-if="item.data && item.data.alias === 'w_case'"
                key="webProcessCenterDataWindow"
                value="webProcessCenterDataWindow"
              >
                {{ $t('流程中心') }}
              </a-select-option>
              <a-select-option
                v-if="item.data && item.data.alias === 'w_case'"
                key="appProcessCenterDataWindow"
                value="appProcessCenterDataWindow"
              >
                {{ $t('流程中心(移动端)') }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('备注')">
            <a-textarea v-decorator="['remarks']" :autoSize="{ minRows: 3, maxRows: 5 }" />
          </a-form-item>
        </a-form>
      </a-spin>
      <div slot="footer">
        <a-button type="primary" :loading="loading" @click="handleSubmit">{{ $t('保存') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { listButton, extendButton, subformWebButton } from '@/views/admin/Table/DefaultButton'
export default {
  i18n: window.lang('admin'),
  components: {
    TplViewDataMenu: () => import('./TplViewDataMenu')
  },
  props: {
    item: {
      type: Object,
      default () {
        return {}
      },
      required: false
    }
  },
  data () {
    return {
      visible: false,
      loading: false,
      // 搜索参数
      queryParam: {},
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 210,
        scopedSlots: { customRender: 'action' },
        align: 'center'
      }, {
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
        width: 60
      }, {
        title: 'UID',
        dataIndex: 'templateId',
        sorter: true,
        width: 150,
        scopedSlots: { customRender: 'templateId' }
      }, {
        title: this.$t('类型'),
        dataIndex: 'type',
        scopedSlots: { customRender: 'type' },
        sorter: true
      }, {
        title: this.$t('名称'),
        dataIndex: 'name',
        sorter: true
      }, {
        title: this.$t('备注'),
        dataIndex: 'remarks',
        sorter: true
      }, {
        title: this.$t('最后修改人'),
        dataIndex: 'updateUser',
        sorter: true
      }, {
        title: this.$t('最后修改时间'),
        dataIndex: 'updateTime',
        sorter: true
      }],
      form: this.$form.createForm(this),
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      config: {},
      settingData: {},
      tableType: {
        webDataWindow: '普通数据窗口',
        webSubformDataWindow: '子表数据窗口',
        appDataWindow: '移动端数据窗口',
        webProcessCenterDataWindow: '流程中心',
        appProcessCenterDataWindow: '流程中心(移动端)'
      }
    }
  },
  methods: {
    loadDataTable (parameter) {
      if (this.item.tableId) {
        return this.axios({
          url: '/admin/template/data',
          data: Object.assign(parameter, this.queryParam, { tableId: this.item.tableId, type: ['webDataWindow', 'tableCardWindow', 'webSubformDataWindow', 'appDataWindow', 'webProcessCenterDataWindow', 'appProcessCenterDataWindow'] })
        }).then(res => {
          return res.result
        })
      }
    },
    handleAddData () {
      this.config = {
        Keyid: String(Math.floor(Math.random() * (100000 - 1000 + 1) + 1000)),
        action: 'add',
        title: '添加',
        submitUrl: '/admin/template/addDataWindow',
        url: '/admin/template/editDataWindow',
        tableId: this.item.tableId,
        type: '',
        module: this.item.data.module,
        item: this.item
      }
      this.axios({
        url: '/admin/template/getDataWindow',
        data: {
          id: 0,
          tableId: this.item.tableId
        }
      }).then(res => {
        if (!res.code) {
          this.visible = true
          this.settingData = res.result
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    handleEdit (record) {
      const data = {
        action: 'edit',
        title: record.name,
        url: '/admin/template/editDataWindow',
        record: record,
        tableId: this.item.tableId || record.value,
        type: record.type,
        module: this.item.module,
        alias: this.item.data ? this.item.data.alias : '',
        item: this.item
      }
      this.$emit('ok', data)
    },
    handleCopy (record) {
      this.config = {
        action: 'copy',
        title: `${this.$t('复制')}: ` + record.name,
        url: '/admin/template/editDataWindow',
        submitUrl: '/admin/template/addDataWindow',
        record: record,
        tableId: this.item.tableId || record.value,
        type: record.type,
        module: this.item.data.module,
        alias: this.item.data ? this.item.data.alias : '',
        item: this.item
      }
      this.axios({
        url: '/admin/template/getDataWindow',
        data: {
          id: record.id,
          tableId: this.item.tableId
        }
      }).then(res => {
        if (!res.code) {
          this.visible = true
          this.settingData = res.result
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          values.module = this.config.module
          values.tableId = this.config.tableId
          values.accessLevel = 0
          let actionColumn = null
          let dataWindowButtons = null
          if (values.type === 'webSubformDataWindow') {
            dataWindowButtons = subformWebButton.filter(item => ['sys_add', 'sys_bulkdelete'].includes(item.usage))
          } else {
            actionColumn = {
              alias: 'action',
              align: 'center',
              display: 'v',
              dataIndex: 'action',
              inlineButtons: [],
              fieldId: 'action',
              maxDisplay: 3,
              actionStyle: '2',
              attribute: '',
              title: '操作',
              sorter: '0',
              sortId: '10',
              listOrder: '10',
              type: 'action',
              id: 'action',
              value: 'action',
              width: '160'
            }
            dataWindowButtons = listButton.filter(item => ['sys_add', 'bar_detail', 'sys_delete'].includes(item.usage))
          }
          values.setting = this.config.action === 'add' ? {
            pageSize: '20',
            sortField: 'id',
            sortOrder: 'descend',
            multiSelect: false,
            drawerPercentWidth: 80,
            drawerType: '0',
            labelWidth: 100,
            lockLeft: 0,
            lockRight: 0,
            pageMode: 'default',
            customColumn: false,
            helpText: false,
            dataSource: '',
            remarks: '',
            actionColumn,
            dataWindowButtons,
            formViewButtons: this.settingData.formViewButtons || extendButton,
            myTemplate: [],
            searchSection: {
              combinationShow: '1',
              labelWidth: 100,
              defaultStatus: '0',
              labelLocation: 'left'
            }
          } : this.settingData.setting
          this.loading = true
          this.axios({
            url: '/admin/template/checkRepeat',
            data: { id: 0, name: values.name, type: this.config.type, tableId: this.config.tableId }
          }).then((res) => {
            if (res.code) {
              this.$message.error(res.message)
              this.loading = false
            } else {
              this.axios({
                url: this.config.submitUrl,
                data: Object.assign(values)
              }).then((res) => {
                this.loading = false
                if (!res.code) {
                  const data = {
                    action: 'edit',
                    title: values.name,
                    url: '/admin/template/editDataWindow',
                    record: this.config.action === 'add' ? {
                      id: res.result.id,
                      module: this.item.module,
                      name: values.name,
                      templateId: res.result.templateId,
                      value: this.item.tableId,
                      type: this.config.type
                    } : Object.assign(this.settingData.data, { id: res.result.id, templateId: res.result.templateId }),
                    tableId: this.item.tableId,
                    type: values.type,
                    module: this.item.module,
                    alias: this.item.data ? this.item.data.alias : '',
                    item: this.item
                  }
                  this.$emit('refresh', values, res.result.id)
                  this.$emit('ok', data)
                  this.handleOk()
                  this.visible = false
                }
              })
            }
          })
        }
      })
    },
    handleCreateMenu (record) {
      this.$refs.tplviewDataMenu.show({
        title: `${this.$t('创建菜单')}`,
        url: '/admin/menu/getTreeMenus',
        submitUrl: '/admin/template/addMenu',
        record: record
      })
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    handleDelete (record) {
      const that = this
      this.$confirm({
        title: record ? this.$t('您确认要删除该记录吗？') : this.$t('您确认要删除选中的记录吗？'),
        onOk () {
          that.axios({
            url: '/admin/template/delete',
            data: { id: record.id }
          }).then(res => {
            that.$refs.table.refresh()
            that.$emit('refresh', record.id)
          })
        }
      })
    }
  }
}
</script>
