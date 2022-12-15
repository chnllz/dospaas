<template>
  <div class="page">
    <a-form class="search" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
      <a-row class="form normal">
        <a-col :span="6">
          <a-form-item :label="$t('技能组名称')">
            <a-input v-model="queryParam.chatGroupName" />
          </a-form-item>
        </a-col>
        <a-space style="margin-left: 8px; margin-top: -2px">
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
          <a-button icon="plus" type="primary" @click="handleAdd">{{ $t('添加') }}</a-button>
        </a-space>
      </a-row>
    </a-form>
    <s-table
      ref="table"
      class="table-fill"
      :scroll="{ y: true }"
      size="small"
      rowKey="id"
      :columns="columns"
      :data="loadDataTable"
      :sorter="sorter"
    >
      <div slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">{{ $t('编辑') }}</a>
        <a-divider type="vertical" />
        <a @click="handleDelete(record)">{{ $t('删除') }}</a>
      </div>
    </s-table>
    <group-form ref="groupForm" @ok="handleOk" />
    <group-chat ref="groupChat"></group-chat>
  </div>
</template>
<script>
export default {
  i18n: window.lang('chat'),
  components: {
    groupForm: () => import('./GroupForm'),
    groupChat: () => import('./GroupChat')
  },
  data () {
    return {
      // 搜索参数
      queryParam: {},
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'action' }
      }, {
        title: 'ID',
        dataIndex: 'id',
        width: 80,
        sorter: true
      }, {
        title: this.$t('技能组名称'),
        width: 200,
        dataIndex: 'name'
      }, {
        title: this.$t('客服数'),
        dataIndex: 'service',
        width: 80,
        sorter: true
      }, {
        title: this.$t('创建人'),
        dataIndex: 'inputUser',
        width: 120
      }, {
        title: this.$t('创建时间'),
        dataIndex: 'inputTime',
        width: 150,
        sorter: true
      }, {
        title: this.$t('最后修改人'),
        dataIndex: 'updateUser',
        width: 150
      }, {
        title: this.$t('最后修改时间'),
        dataIndex: 'updateTime',
        sorter: true
      }],
      sorter: { field: 'id', order: 'descend' }
    }
  },
  methods: {
    loadDataTable (parameter) {
      return this.axios({
        url: '/chat/group/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    handleAdd () {
      this.$refs.groupForm.show({
        title: this.$t('添加'),
        url: '/chat/group/add'
      })
    },
    handleEdit (record) {
      this.$nextTick(() => {
        this.$refs.groupForm.show({
          title: this.$t('编辑'),
          url: '/chat/group/edit',
          record: record
        })
      })
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    handleDelete (record) {
      const that = this
      const id = record && record.id || this.selectedRowKeys
      that.$confirm({
        title: record ? this.$t('您确认要删除该记录吗？') : this.$t('您确认要删除选中的记录吗？'),
        onOk () {
          that.axios({
            url: '/chat/group/delete',
            data: { id: id }
          }).then(res => {
            if (res.code === 0) {
              that.$message.success(res.message)
            } else {
              that.$message.error(res.message)
            }
            that.$refs.table.refresh()
          })
        }
      })
    }
  }
}
</script>
