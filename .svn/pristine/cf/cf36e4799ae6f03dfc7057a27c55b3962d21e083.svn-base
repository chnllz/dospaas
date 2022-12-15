<template>
  <a-drawer
    :title="config.title"
    :width="900"
    :visible="visible"
    placement="right"
    :destroyOnClose="true"
    @close="visible = !visible"
  >
    <a-spin :spinning="loading">
      <s-table
        ref="table"
        size="small"
        class="table-fill"
        rowKey="userName"
        :columns="dataColumns"
        :data="loadDataTable"
      >
        <template slot="realName" slot-scope="text, record">
          <div class="table_title">{{ `${record.userName}(${text})` }}</div>
        </template>
      </s-table>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('crm'),
  data () {
    return {
      config: {},
      visible: false,
      loading: false,
      dataColumns: [],
      type: ''
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.dataColumns = this.config.dataColumns
      this.type = this.config.type
    },
    loadDataTable (parameter) {
      const queryParam = {
        type: this.type
      }
      return this.axios({
        url: '/crm/report/getRanking',
        data: Object.assign(parameter, queryParam)
      }).then(res => {
        return res.result
      })
    }
  }
}
</script>
