<template>
  <div class="page">
    <a-space>
      <a-button v-action:add type="primary" icon="plus" @click="handleAdd">{{ $t('添加') }}</a-button>
      <a-button v-action:import icon="upload" @click="handleImport">{{ $t('导入') }}</a-button>
      <a-button v-action:export icon="download" @click="handleExport">{{ $t('导出') }}</a-button>
      <a-button icon="sort-descending" @click="handleSort">{{ $t('排序') }}</a-button>
      <a-breadcrumb>
        <a-breadcrumb-item>
          <a
            href="javascript:;"
            @click="
              () => {
                queryParam = {}
                $refs.table.refresh(true)
              }
            "
          >
            {{ $t('所有部门') }}
          </a>
        </a-breadcrumb-item>
        <a-breadcrumb-item v-for="(item, key) in breadcrumb" :key="key">
          <a
            href="javascript:;"
            @click="
              () => {
                queryParam = { parentDepartmentId: item.departmentId }
                $refs.table.refresh(true)
              }
            "
          >
            {{ item.departmentName }}
          </a>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </a-space>
    <s-table
      ref="table"
      :scroll="{ y: true }"
      class="table-fill"
      size="small"
      rowKey="id"
      :columns="columns"
      :data="loadDataTable"
      :showPagination="false"
      :sorter="{ field: 'listOrder', order: 'ascend' }"
    >
      <span slot="departmentName" slot-scope="text, record" :title="text">
        <a
          href="javascript:;"
          @click="
            () => {
              queryParam = { parentDepartmentId: record.departmentId }
              $refs.table.refresh(true)
            }
          "
        >
          {{ record.childCount > 0 ? text + `(${record.childCount})` : text }}
        </a>
      </span>
      <div slot="action" slot-scope="text, record">
        <a v-action:edit :disabled="record.accessLevel === 2" @click="handleEdit(record)">{{ $t('编辑') }}</a>
        <a-divider type="vertical" />
        <a v-action:edit :disabled="!$auth('delete') || !!record.accessLevel" @click="handleDelete(record)">
          {{ $t('删除') }}
        </a>
      </div>
    </s-table>
    <department-form ref="departmentForm" :key="departmentKey" @ok="handleOk" />
    <drag-sort ref="dragSort" @ok="handleOk" />
    <general-export ref="generalExport" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
    DepartmentForm: () => import('./DepartmentForm'),
    DragSort: () => import('@/views/admin/Common/DragSort'),
    GeneralExport: () => import('@/views/admin/Table/GeneralExport')
  },
  data () {
    return {
      departmentKey: 'departmentKey_1',
      // 当前部门路径
      breadcrumb: [],
      // 搜索参数
      queryParam: {},
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 120,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: '#',
        width: 60,
        customRender: (text, record, index) => index + 1
      }, {
        title: 'ID',
        dataIndex: 'id',
        width: 80
      }, {
        title: this.$t('编号'),
        dataIndex: 'departmentId',
        width: 300
      }, {
        title: this.$t('名称'),
        dataIndex: 'departmentName',
        scopedSlots: { customRender: 'departmentName' }
      }, {
        title: this.$t('最后修改人'),
        dataIndex: 'updateUser'
      }, {
        title: this.$t('最后修改时间'),
        dataIndex: 'updateTime'
      }, {
        title: this.$t('备注'),
        dataIndex: 'remarks'
      }]
    }
  },
  methods: {
    loadDataTable (parameter) {
      return this.axios({
        url: '/admin/department/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        this.breadcrumb = res.result.path
        return res.result
      })
    },
    handleAdd () {
      this.departmentKey = this.departmentKey === 'departmentKey_1' ? 'departmentKey_2' : 'departmentKey_1'
      this.$nextTick(() => {
        this.$refs.departmentForm.showAdd()
      })
    },
    handleEdit (record) {
      this.departmentKey = this.departmentKey === 'departmentKey_1' ? 'departmentKey_2' : 'departmentKey_1'
      this.$nextTick(() => {
        this.$refs.departmentForm.showEdit({
          record: record
        })
      })
    },
    handleDelete (record) {
      const table = this.$refs.table
      const that = this
      this.$confirm({
        title: this.$t('您确认要删除该部门吗？'),
        onOk () {
          that.$setLoading(true)
          that.axios({
            url: '/admin/department/delete',
            params: { departmentId: record.departmentId }
          }).then(res => {
            that.$setLoading(false)
            if (res.code) {
              that.$message.error(res.message)
            } else {
              table.refresh()
              that.$message.success(res.message)
            }
          })
        }
      })
    },
    handleSort () {
      this.$refs.dragSort.show({
        tableName: 'admin_department',
        sortName: 'department_name',
        where: (this.queryParam.parentDepartmentId != null
          ? `parent_department_id = '${this.queryParam.parentDepartmentId}'`
          : 'parent_department_id is null')
      })
    },
    handleImport () {
      this.$refs.generalExport.show({
        slotScoped: false, // 是否启用插槽
        title: this.$t('导入'),
        type: 'import',
        className: 'DepartmentTask',
        filePath: 'static/template/admin/部门导入模板.xlsx'
      })
    },
    handleExport () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'DepartmentTask',
        parameter: {
          condition: this.queryParam,
          parentDepartmentId: this.queryParam.parentDepartmentId || ''
        }
      })
    },
    handleOk () {
      this.$refs.table.refresh()
    }
  }
}
</script>
