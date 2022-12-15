<template>
  <a-modal v-model="visible" :title="config.title" :destroyOnClose="true" @cancel="visible = !visible">
    <div style="margin-bottom: 8px">{{ message }}</div>
    <a-table
      ref="table"
      size="small"
      rowKey="id"
      :columns="columns"
      :scroll="scroll"
      :dataSource="data"
      :pagination="false"
      :rowSelection="rowSelection"
    ></a-table>
    <div slot="footer" class="bbar">
      <a-button type="primary" @click="getCopy">{{ $t('保存') }}</a-button>
      <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
    </div>
  </a-modal>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  data () {
    return {
      visible: false,
      config: {},
      data: [],
      selectedRowKeys: [],
      scroll: {},
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys
        }
      },
      columns: [],
      message: null
    }
  },
  methods: {
    show (config) {
      this.config = config
      this.message = this.$t('将 {0} 的权限，复制给：', { 0: this.config.name })
      this.visible = true
      this.scroll.y = document.body.clientHeight - 400
      this.data = this.config.data || []
      this.columns = [{
        title: '#',
        width: 80,
        align: 'center',
        customRender: (text, record, index) => {
          return index + 1
        }
      }, {
        title: this.$t('名称'),
        dataIndex: this.config.dataIndex || 'name'
      }]
    },
    getCopy () {
      this.$emit('ok', this.selectedRowKeys, this.config.priv)
      this.$emit(this.$t('操作成功'))
      this.visible = false
    }
  }
}
</script>
