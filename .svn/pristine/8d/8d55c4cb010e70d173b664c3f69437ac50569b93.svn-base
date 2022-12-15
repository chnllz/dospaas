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
                    @click="$refs.table.refresh(true)"
                    @keydown.enter="$refs.table.refresh(true)"
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
                  <a-button
                    :icon="advancedSearch ? 'up' : 'down'"
                    style="font-size: 11px"
                    @click="advancedSearch = !advancedSearch"
                  />
                </a-space>
                <a-row :gutter="16" class="form" :class="advancedSearch ? 'advanced' : 'normal'">
                  <a-col :span="6">
                    <a-form-item :label="$t('显示名称')" :labelCol="labelCol" :wrapperCol="wrapperCol">
                      <a-input v-model.trim="queryParam.name" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item :label="$t('系统名称')" :labelCol="labelCol" :wrapperCol="wrapperCol">
                      <a-input v-model.trim="queryParam.alias" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item :label="$t('模块')" :labelCol="labelCol" :wrapperCol="wrapperCol">
                      <a-select v-model.trim="queryParam.module" :allowClear="true">
                        <a-select-option v-for="(moduleItem, index) in moduleList" :key="index" :value="moduleItem">
                          {{ moduleItem }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item :label="$t('分类名称')" :labelCol="labelCol" :wrapperCol="wrapperCol">
                      <a-input v-model.trim="queryParam.category" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item :label="$t('UI组件')" :labelCol="labelCol" :wrapperCol="wrapperCol">
                      <a-select v-model.trim="queryParam.formType" :allowClear="true">
                        <a-select-option v-for="(item, index) in formTypeList" :key="index" :value="item.value">
                          {{ item.znKey }}
                        </a-select-option>
                      </a-select>
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
                  <a-button type="primary" icon="plus" @click="handleAdd">{{ $t('添加') }}</a-button>
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
              </template>
            </s-table>
            <field-form
              ref="fieldForm"
              :key="refreshKey"
              :moduleList="moduleList"
              :moduleTable="moduleTable"
              @ok="$refs.table.refresh()"
            />
          </div>
        </a-spin>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
export default {
  i18n: window.lang('admin'),
  components: {
    FieldForm: () => import('./Field/FieldForm')
  },
  data () {
    return {
      formTypeList: [{
        value: 'text',
        znKey: '单行文本'
      }, {
        value: 'textarea',
        znKey: '多行文本'
      }, {
        value: 'radio',
        znKey: '单选框'
      }, {
        value: 'checkbox',
        znKey: '复选框'
      }, {
        value: 'editor',
        znKey: '编辑器'
      }, {
        value: 'image',
        znKey: '图片'
      }, {
        value: 'number',
        znKey: '数字'
      }, {
        value: 'switch',
        znKey: '开关'
      }, {
        value: 'combobox',
        znKey: '下拉框'
      }, {
        value: 'json',
        znKey: 'JSON'
      }],
      spinning: false,
      advancedSearch: false,
      pageSize: 20,
      pageMode: 'default', // 分页器模式
      refreshKey: 0,
      labelCol: { style: 'width: 104px; display: inline-block' },
      wrapperCol: { style: 'width: calc(100% - 104px); display: inline-block' },
      // 搜索参数
      queryParam: {},
      // 模块列表
      moduleList: [],
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
        title: this.$t('模块'),
        dataIndex: 'module',
        width: 60,
        sorter: true
      }, {
        title: this.$t('显示名称'),
        dataIndex: 'name',
        width: 60,
        sorter: true
      }, {
        title: this.$t('系统名称'),
        dataIndex: 'alias',
        width: 60,
        sorter: true
      }, {
        title: this.$t('UI组件'),
        dataIndex: 'formType',
        width: 60,
        sorter: true,
        customRender: (text, record) => {
          return this.formTypeList.filter(item => item.value === text)[0].znKey
        }
      }, {
        title: this.$t('分类名称'),
        dataIndex: 'category',
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
      }],
      moduleTable: []
    }
  },
  created () {
    this.axios({
      url: 'admin/table/getModules'
    }).then(res => {
      this.moduleList = res.result
    })
    this.axios({
      url: '/admin/table/getModuleTableOptions'
    }).then(res => {
      this.moduleTable = res.result
    })
  },
  methods: {
    handleEdit (record) {
      this.refreshKey = this.refreshKey ? 0 : 1
      this.$nextTick(() => {
        this.$refs.fieldForm.showEdit({
          record: record,
          action: 'edit'
        })
      })
    },
    handleDelete (record) {
      const that = this
      const id = record && record.id
      this.$confirm({
        title: this.$t('您确认要删除该记录吗？'),
        onOk () {
          that.axios({
            url: 'admin/config/deleteItem',
            params: { id: id }
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
    handleAdd () {
      this.refreshKey = this.refreshKey ? 0 : 1
      this.$nextTick(() => {
        this.$refs.fieldForm.showAdd({
          action: 'add'
        })
      })
    },
    loadDataTable (parameter) {
      console.log('parameter', parameter)
      return this.axios({
        url: 'admin/config/listItems',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    }
  }
}
</script>
