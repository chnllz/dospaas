<template>
  <div style="height: 100%">
    <a-layout style="height: 100%">
      <a-layout-content
        :style="{ background: 'white', display: 'flex', 'flex-direction': 'column' }"
        style="height: 100%"
      >
        <a-spin :spinning="spinning" style="height: 100%">
          <div class="page">
            <a-form class="search" :colon="false">
              <a-card size="small" :title="$t('搜索')">
                <a-space slot="extra" style="margin-left: 8px">
                  <a-button
                    htmlType="submit"
                    type="primary"
                    @click="
                      () => {
                        $refs.table.refresh(true)
                      }
                    "
                  >
                    {{ $t('搜索') }}
                  </a-button>
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
                </a-space>
                <a-row :gutter="16" class="form normal">
                  <a-col :span="6">
                    <a-form-item :label="$t('名称')" :labelCol="labelCol" :wrapperCol="wrapperCol">
                      <a-input v-model.trim="queryParam.name" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item :label="$t('备注')" :labelCol="labelCol" :wrapperCol="wrapperCol">
                      <a-input v-model.trim="queryParam.remarks" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-card>
            </a-form>
            <div style="margin: 8px 8px 0 8px">
              <a-row type="flex" align="middle">
                <a-col :span="4">
                  <a-button type="primary" icon="plus" @click="visible = !visible">{{ $t('添加') }}</a-button>
                </a-col>
              </a-row>
            </div>
            <s-table
              ref="table"
              style="margin: 8px"
              class="table-fill"
              size="small"
              rowKey="id"
              :columns="columns"
              :data="loadDataTable"
              :pageSize="pageSize"
              :pageMode="pageMode"
              :showSome="pageMode == 'simple'"
              :scroll="{ y: true }"
            >
              <template slot="action" slot-scope="text, record">
                <a @click="handleEdit(record)">{{ $t('编辑') }}</a>
                <a-divider type="vertical" />
                <a @click="handleDelete(record)">{{ $t('删除') }}</a>
                <a-divider type="vertical" />
                <a @click="handleCreateMenu(record)">{{ $t('创建菜单') }}</a>
              </template>
            </s-table>
            <tplview-form-form :key="refreshKey" ref="tplViewFormForm" @refresh="$refs.table.refresh(true)" />
          </div>
        </a-spin>
      </a-layout-content>
    </a-layout>
    <a-modal :title="$t('添加')" :visible="visible" :destroyOnClose="true" @cancel="visible = !visible">
      <a-form :form="addform" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-form-item :label="$t('名称')">
          <a-input v-decorator="['info[name]', { rules: [{ required: true, message: $t('请输入名称') }] }]" />
        </a-form-item>
        <a-form-item :label="$t('备注')">
          <a-textarea v-decorator="['info[remarks]']" :autoSize="{ minRows: 3, maxRows: 5 }" />
        </a-form-item>
      </a-form>
      <div slot="footer">
        <a-button type="primary" :loading="addLoading" @click="submitConfigTemplate">{{ $t('保存') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-modal>
    <set-menu-drawer ref="setMenuDrawer" />
  </div>
</template>

<script>
export default {
  i18n: window.lang('admin'),
  components: {
    TplviewFormForm: () => import('./TplviewFormForm'),
    SetMenuDrawer: () => import('./SetMenuDrawer')
  },
  data () {
    return {
      spinning: false,
      addLoading: false,
      pageSize: 20,
      pageMode: 'default', // 分页器模式
      refreshKey: 0,
      // 搜索参数
      queryParam: {},
      // 模块列表
      moduleList: [],
      // 添加参数
      addModuleParam: {},
      addform: this.$form.createForm(this),
      visible: false,
      labelCol: { style: 'width: 104px; display: inline-block' },
      wrapperCol: { style: 'width: calc(100% - 104px); display: inline-block' },
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 80,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: 'ID',
        dataIndex: 'id',
        width: 60,
        sorter: true
      }, {
        title: this.$t('名称'),
        dataIndex: 'name',
        width: 60,
        sorter: true
      }, {
        title: this.$t('备注'),
        dataIndex: 'remarks',
        width: 60,
        sorter: true
      }, {
        title: this.$t('最后修改人'),
        dataIndex: 'updateUser',
        width: 60,
        sorter: true
      }, {
        title: this.$t('最后修改时间'),
        dataIndex: 'updateTime',
        width: 60,
        sorter: true
      }]
    }
  },
  created () {
    this.axios({
      url: 'admin/table/getModules'
    }).then(res => {
      this.moduleList = res.result
    })
  },
  methods: {
    loadDataTable (parameter) {
      return this.axios({
        url: 'admin/config/listTemplates',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    submitConfigTemplate () {
      const { addform: { validateFields } } = this
      validateFields((errors, values) => {
        if (errors) {
          return
        }
        this.addLoading = true
        const data = {
          accessLevel: 0,
          setting: {},
          ...values.info
        }
        this.axios({
          url: 'admin/config/addTemplate',
          data
        }).then(res => {
          this.addLoading = false
          if (res.code) {
            this.$message.warning(res.message)
          } else {
            this.$message.success(res.message)
            this.visible = false
            this.$refs.table.refresh(true)
          }
        })
      })
    },
    handleEdit (record) {
      this.$refs.tplViewFormForm.showEdit({ record })
    },
    handleDelete (record) {
      const that = this
      this.$confirm({
        title: this.$t('您确认要删除该记录吗？'),
        onOk () {
          that.axios({
            url: 'admin/config/deleteTemplate',
            params: { id: record.id }
          }).then(res => {
            if (res.code) {
              that.$message.warning(res.message)
            } else {
              that.$message.success(res.message)
              that.$refs.table.refresh()
            }
          })
        }
      })
    },
    handleCreateMenu (record) {
      this.$refs.setMenuDrawer.show({
        title: `${this.$t('创建菜单')}`,
        url: '/admin/menu/getTreeMenus',
        submitUrl: '/admin/template/addMenu',
        record: record
      })
    }
  }
}
</script>
