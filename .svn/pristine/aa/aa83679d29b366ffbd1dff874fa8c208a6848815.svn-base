<template>
  <a-drawer
    :title="$t(config.title)"
    :width="1200"
    :visible="visible"
    :destroyOnClose="true"
    @close="visible = !visible"
  >
    <s-table
      ref="table"
      size="small"
      rowKey="id"
      :columns="columns"
      class="table-fill"
      :data="loadDataTable"
      :sorter="{ field: 'id', order: 'descend' }"
    ></s-table>
    <div class="bbar">
      <a-button @click="visible = false">{{ $t('关闭') }}</a-button>
    </div>
  </a-drawer>
</template>
<script>
export default {
  data () {
    return {
      config: {},
      visible: false,
      columns: [{
        title: this.$t('质检员'),
        dataIndex: 'qualityUser',
        sorter: true
      }, {
        title: this.$t('质检总数'),
        dataIndex: 'qualityTotal',
        sorter: true
      }, {
        title: this.$t('已质检数'),
        dataIndex: 'qualityNumber',
        sorter: true
      }, {
        title: this.$t('待质检数'),
        dataIndex: 'forQualityNumber',
        sorter: true
      }, {
        title: this.$t('有效数据'),
        dataIndex: 'validNumber',
        sorter: true
      }, {
        title: this.$t('无效数据'),
        dataIndex: 'invalidNumber',
        sorter: true
      }, {
        title: this.$t('完成率'),
        dataIndex: 'accomplishPercent'
      }]
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
    },
    loadDataTable (parameter) {
      const { url, id } = this.config
      return this.axios({
        url: url,
        data: Object.assign(parameter, { id: id })
      }).then(res => {
        return res.result
      })
    }
  }
}
</script>
