<template>
  <a-drawer :title="config.title" width="700" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-table
        size="small"
        rowKey="roleId"
        :columns="columns"
        :dataSource="roleData"
        :pagination="false"
        :rowSelection="rowSelection"
      ></a-table>
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  data () {
    return {
      config: {},
      visible: false,
      loading: false,
      // 表头
      columns: [{
        title: this.$t('角色名称'),
        dataIndex: 'roleName'
      }],
      roleData: [],
      rowSelection: {
        selectedRowKeys: [],
        onChange: (selectedRowKeys, selectedRows) => {
          this.rowSelection.selectedRowKeys = selectedRowKeys
        }
      }
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.loading = true
      this.config = config
      this.data = config.record
      this.axios({
        url: this.config.url,
        data: { workflowId: this.data.workflowId, action: 'get' }
      }).then(res => {
        this.loading = false
        this.roleData = res.result.data
        this.rowSelection.selectedRowKeys = res.result.priv
      })
    },
    // 保存
    handleSubmit () {
      this.loading = true
      this.axios({
        url: this.config.url,
        data: { workflowId: this.data.workflowId, priv: this.rowSelection.selectedRowKeys, action: 'submit' }
      }).then((res) => {
        this.visible = false
        this.loading = false
        this.$emit('ok')
        if (res.code) {
          this.$message.warning(res.message)
        } else {
          this.$message.success(res.message)
        }
      })
    }
  }
}
</script>
