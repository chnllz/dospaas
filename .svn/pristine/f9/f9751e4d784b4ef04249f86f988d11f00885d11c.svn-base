<template>
  <div class="page" style="height: calc(100vh - 208px); border-top: #f0f2f5 8px solid">
    <a-row>
      <a-form layout="inline" style="display: flex; margin-bottom: 8px; padding: 0 8px">
        <a-col :span="20">
          <a-space>
            <a-form-item :label="$t('系统名称')">
              <a-input v-model="queryParam.alias" allowClear style="width: 200px" />
            </a-form-item>
            <a-form-item :label="$t('显示名称')">
              <a-input v-model="queryParam.name" allowClear style="width: 200px" />
            </a-form-item>
            <a-form-item :label="$t('分类名称')">
              <a-select v-model="queryParam.category" allowClear style="width: 200px">
                <a-select-option v-for="(item, index) of category" :key="index" :value="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-button
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
                  $refs.table.refresh(true)
                }
              "
            >
              {{ $t('重置') }}
            </a-button>
            <a-button type="primary" @click="handleAdd">
              {{ $t('添加') }}
            </a-button>
            <a-button @click="handleExport">
              {{ $t('导出') }}
            </a-button>
            <a-button v-action:sort icon="sort-ascending" @click="handleSort">{{ $t('排序') }}</a-button>
          </a-space>
        </a-col>
      </a-form>
    </a-row>
    <s-table
      ref="table"
      size="small"
      rowKey="id"
      class="table-fill"
      :scroll="{ y: true }"
      :sorter="{ field: 'listOrder', order: 'ascend' }"
      :columns="columns"
      :data="loadDataTable"
    >
      <div slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">{{ $t('编辑') }}</a>
        <a-divider type="vertical" />
        <a @click="handleDelete(record)">{{ $t('删除') }}</a>
      </div>
    </s-table>
    <table-form ref="tableForm" @ok="handleOk" />
    <drag-sort ref="dragSort" @ok="handleOk" />
    <general-export ref="generalExport" />
  </div>
</template>
<script>
import storage from '@/utils/storage'
export default {
  i18n: window.lang('admin'),
  components: {
    TableForm: () => import('./TableForm'),
    DragSort: () => import('@/views/admin/Common/DragSort'),
    GeneralExport: () => import('@/views/admin/Table/GeneralExport')
  },
  data () {
    return {
      queryParam: { module: '' },
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 100,
        scopedSlots: { customRender: 'action' },
        sorter: true
      }, {
        title: 'ID',
        dataIndex: 'id',
        width: 60,
        sorter: true
      }, {
        title: this.$t('排序'),
        width: 80,
        dataIndex: 'listOrder',
        sorter: true
      }, {
        title: this.$t('系统名称'),
        dataIndex: 'alias',
        width: 250,
        sorter: true
      }, {
        title: this.$t('显示名称'),
        dataIndex: 'name',
        width: 250,
        sorter: true
      }, {
        title: this.$t('分类名称'),
        dataIndex: 'category',
        width: 120,
        sorter: true
      }, {
        title: this.$t('最后修改人'),
        dataIndex: 'updateUser',
        width: 120,
        sorter: true
      }, {
        title: this.$t('最后修改时间'),
        dataIndex: 'updateTime',
        width: 150,
        sorter: true
      }, {
        title: this.$t('备注'),
        dataIndex: 'remarks',
        sorter: true
      }],
      helpNotes: '',
      category: []
    }
  },
  created () {
    this.queryParam.module = storage.get('moduleName')
    this.searchCategory()
  },
  methods: {
    loadDataTable (parameter) {
      // 传向后端的搜索只有searchString一个字段,所以要将系统名称和显示名称转换一下
      this.queryParam.searchString = this.queryParam.alias ?? this.queryParam.name ?? this.queryParam.category
      if (!this.queryParam.alias && !this.queryParam.name && !this.queryParam.category) delete this.queryParam.searchString
      delete this.queryParam.alias
      delete this.queryParam.name
      delete this.queryParam.category
      return this.axios({
        url: '/admin/table/index',
        data: Object.assign(parameter, this.queryParam, { init: String(!this.queryParam.module.length) })
      }).then(res => {
        for (let i = 0; i < res.result.data.length; i++) {
          res.result.data[i]['key'] = i + 1
        }
        return res.result
      })
    },
    // 获取所有分类
    searchCategory () {
      this.axios({
        url: 'admin/table/category',
        params: { category: '', module: this.queryParam.module }
      }).then(res => {
        this.category = res.result
      })
    },
    handleAdd () {
      this.$refs.tableForm.showAdd({
        action: 'add',
        title: this.$t('添加'),
        url: '/admin/table/add',
        module: this.queryParam.module
      })
    },
    handleEdit (record) {
      this.$refs.tableForm.showEdit({
        action: 'edit',
        title: `${this.$t('编辑')}：` + record.name,
        url: '/admin/table/edit',
        module: this.queryParam.module,
        record: record
      })
    },
    handleDelete (record) {
      const me = this
      const table = this.$refs.table
      const tableId = record && record.tableId
      this.$confirm({
        title: record ? this.$t('您确认要删除该记录吗？') : this.$t('您确认要删除选中的记录吗？'),
        onOk () {
          me.axios({
            url: '/admin/table/delete',
            data: { tableId: tableId }
          }).then(res => {
            if (res.code) {
              me.$message.error(res.message)
            } else {
              me.$message.success(res.message)
              table.refresh()
            }
          })
        }
      })
    },
    // 处理排序
    handleSort () {
      this.$refs.dragSort.show({
        tableName: 'admin_table',
        sortName: 'name',
        where: `module = '${this.queryParam.module}'`
      })
    },
    // 弹出框操作结束后刷新表格
    handleOk () {
      this.$refs.table.refresh()
    },
    handleExport (record) {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'exportTableField',
        parameter: {
          module: this.queryParam.module,
          tableId: record.tableId
        }
      })
    }
  }
}
</script>
