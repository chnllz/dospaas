<template>
  <div>
    <a-drawer
      :title="config.title"
      :width="900"
      :visible="myvisible"
      :destroyOnClose="true"
      @close="myvisible = !myvisible"
    >
      <s-table
        ref="table"
        size="small"
        rowKey="id"
        :columns="detailData"
        :data="loadDataTable"
        :sorter="sorter"
      ></s-table>
    </a-drawer>
  </div>
</template>
<script>
export default {
  i18n: window.lang('chat'),
  data () {
    return {
      config: {},
      myvisible: false,
      detailData: [{
        title: this.$t('日期'),
        dataIndex: 'chatday',
        sorter: true
      }, {
        title: this.$t('接待人数'),
        dataIndex: 'visitors',
        sorter: true
      }, {
        title: this.$t('消息总数'),
        dataIndex: 'messageAll',
        sorter: true
      }, {
        title: this.$t('访客消息数'),
        dataIndex: 'messageVisitor',
        sorter: false
      }, {
        title: this.$t('客服消息数'),
        dataIndex: 'messageService',
        sorter: true
      }, {
        title: this.$t('机器人消息数'),
        dataIndex: 'messageRobot',
        sorter: true
      }, {
        title: this.$t('有效会话数'),
        dataIndex: 'conversationValid',
        sorter: true
      }, {
        title: this.$t('无效会话数'),
        dataIndex: 'conversationInvalid',
        sorter: true
      }],
      page: {
        pageNo: 1,
        pageSize: 20
      },
      sorter: { field: 'id', order: 'descend' }
    }
  },
  methods: {
    show (config) {
      this.myvisible = true
      this.config = config
      // this.loadDataTable = config.record
    },
    loadDataTable (parameter) {
      const params = Object.assign(parameter,
        {
          id: this.config.record.serviceId,
          startTime: this.config.startTime,
          endTime: this.config.endTime
        },
        this.page)
      return this.axios({
        url: this.config.url,
        data: params
      }).then(res => {
        return res.result
      })
    }
  }
}
</script>
