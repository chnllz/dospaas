<template>
  <a-drawer :title="config.title" :destroyOnClose="true" :width="600" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-table
        ref="table"
        rowKey="exten"
        :columns="columns"
        :dataSource="data"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onChange }"
        size="small"
        :pagination="false"
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
  i18n: window.lang('admin'),
  data () {
    return {
      visible: false,
      loading: false,
      config: {},
      columns: [{
        title: this.$t('队列号码'),
        dataIndex: 'exten'
      }, {
        title: this.$t('队列名称'),
        dataIndex: 'name'
      }],
      selectedRowKeys: [],
      data: []
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.loading = true
      this.config = config
      this.selectedRowKeys = []
      this.axios({
        url: this.config.url,
        data: Object.assign({ action: 'get', roleId: config.record ? config.record.roleId : 0 })
      }).then((res) => {
        this.loading = false
        if (res.result.selectedRowKeys) {
          this.selectedRowKeys = res.result.selectedRowKeys.queuePriv
        }
        this.data = res.result.data
      })
    },
    onChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleSubmit () {
      this.loading = true
      this.axios({
        url: this.config.url,
        data: {
          action: 'submit',
          roleId: this.config.record.roleId,
          data: this.selectedRowKeys
        }
      }).then((res) => {
        this.loading = false
        if (!res.code) {
          this.$message.success(res.message)
        } else {
          const mes = res.message || this.$t('操作失败')
          this.$message.error(mes)
        }
        this.visible = false
      })
    }
  }
}
</script>
