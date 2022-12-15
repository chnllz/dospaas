<template>
  <div>
    <a-card size="small">
      <div class="table-operator">
        <a-button icon="plus" type="primary" @click="addCategroy">{{ $t('添加') }}</a-button>
        <a-button icon="sort-descending" @click="handleSort">{{ $t('排序') }}</a-button>
      </div>
      <s-table
        ref="table"
        size="small"
        rowKey="id"
        :columns="columns"
        :data="loadDataTable"
        :sorter="{ field: 'id', order: 'descend' }"
      >
        <div slot="recommended" slot-scope="text">
          <span>{{ text === '1' ? $t('是') : $t('否') }}</span>
        </div>
        <div slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">{{ $t('编辑') }}</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">{{ $t('删除') }}</a>
        </div>
      </s-table>
    </a-card>
    <forum-settings-add ref="forumSettingsAdd" @ok="handleOk" />
    <drag-sort ref="dragSort" @ok="handleOk" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('forum'),
  components: {
    ForumSettingsAdd: () => import('./ForumSettingsAdd'),
    DragSort: () => import('@/views/admin/Common/DragSort')
  },
  data () {
    return {
      data: [],
      columns: [{
        title: this.$t('操作'),
        width: 100,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: 'ID',
        dataIndex: 'id',
        width: 40
      }, {
        title: this.$t('分类编号'),
        dataIndex: 'number',
        width: 240
      }, {
        title: this.$t('分类名称'),
        dataIndex: 'name'
      }, {
        title: this.$t('分类负责人'),
        dataIndex: 'manager'
      }, {
        title: this.$t('是否推荐'),
        dataIndex: 'recommended',
        scopedSlots: { customRender: 'recommended' }
      }, {
        title: this.$t('备注'),
        dataIndex: 'remarks'
      }, {
        title: this.$t('最后修改人'),
        dataIndex: 'updateUser'
      }, {
        title: this.$t('最后修改时间'),
        dataIndex: 'updateTime'
      }]
    }
  },
  methods: {
    loadDataTable (parameter) {
      return this.axios({
        url: '/forum/setting/getCategorys',
        data: { recommended: '0' }
      }).then(res => {
        this.data = res.result.data
        return res.result
      })
    },
    addCategroy () {
      this.$refs.forumSettingsAdd.show({
        action: 'add',
        title: this.$t('添加'),
        data: {}
      })
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    handleEdit (record) {
      this.$refs.forumSettingsAdd.show({
        action: 'edit',
        title: this.$t('编辑'),
        data: record
      })
    },
    handleDelete (record) {
      const table = this.$refs.table
      const number = record.number
      const self = this
      this.$confirm({
        title: this.$t('您确认要删除该记录吗？'),
        onOk () {
          self.axios({
            url: '/forum/setting/deleteCategory',
            data: { number: number }
          }).then((res) => {
            if (res.code) {
              self.$message.error(res.message)
            } else {
              table.refresh()
              self.$message.success(res.message)
            }
          })
        }
      })
    },
    handleSort () {
      this.$refs.dragSort.show({
        tableName: 'forum_category'
      })
    }
  }
}
</script>
