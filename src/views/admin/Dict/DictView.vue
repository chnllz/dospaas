<template>
  <a-drawer :destroyOnClose="true" :title="config.title" :width="1200" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="spinning">
      <div>
        <a-alert
          description="下面列出了该数据字典在系统中被引用的地方，定制开发的部分不包含在内"
          type="info"
          show-icon
          style="margin-bottom: 10px"
        />
        <a-table
          ref="table"
          size="small"
          rowKey="id"
          :columns="columns"
          :dataSource="dataSource"
          :scroll="{ y: windowHeight - 200 }"
          :pagination="false"
        ></a-table>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
  },
  data () {
    return {
      config: {},
      visible: false,
      spinning: false,
      columns: [{
        title: '#',
        dataIndex: 'sort',
        width: 40,
        customRender: (text, record, index) => index + 1
      }, {
        title: '模块',
        dataIndex: 'module',
        width: 40,
        scopedSlots: { customRender: 'sort' }
      }, {
        title: '数据表系统名称',
        dataIndex: 'tableSystemName',
        width: 40,
        scopedSlots: { customRender: 'sort' }
      }, {
        title: '数据表显示名称',
        dataIndex: 'tableDisplayName',
        width: 40,
        scopedSlots: { customRender: 'sort' }
      }, {
        title: '字段系统名称',
        dataIndex: 'fieldSystemName',
        width: 40,
        scopedSlots: { customRender: 'sort' }
      }, {
        title: '字段显示名称',
        dataIndex: 'fieldDisplayName',
        width: 40,
        scopedSlots: { customRender: 'sort' }
      }],
      dataSource: [],
      windowHeight: document.documentElement.clientHeight
    }
  },
  methods: {
    // 打开抽屉组件
    show (config) {
      this.visible = true
      this.spinning = true
      this.config = config
      console.log('conmfig', config)
      this.axios({
        url: 'admin/dict/getReferences',
        params: {
          dictCategoryNumber: this.config.dictCategoryNumber
        }
      }).then(res => {
        if (!res.code) {
          this.spinning = false
          this.dataSource = res.result
        }
      })
    }
  }
}
</script>
