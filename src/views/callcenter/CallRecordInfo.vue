<template>
  <a-drawer :title="config.title || $t('详情')" :width="1200" :visible="visible" @close="visible = !visible">
    <a-tabs v-model="currentTab" :animated="false" class="tabs-flex" @change="handleTabChange">
      <a-tab-pane v-for="parentItem in tabList" :key="parentItem.key" :tab="parentItem.title">
        <a-spin v-if="parentItem.key === 'info'" :spinning="false">
          <div style="display: flex; flex-direction: column">
            <a-form :labelCol="{ span: 10 }" :wrapperCol="{ span: 14 }">
              <a-row v-for="(item, index) in rows" :key="index" class="form">
                <a-col v-for="(col, i) in item" :key="i" :span="8">
                  <a-form-item :label="col.title" :title="callRecordInfo[col.dataIndex]">
                    {{ callRecordInfo[col.dataIndex] || '--' }}
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </div>
        </a-spin>
        <s-table
          v-else
          ref="table"
          size="small"
          class="table-fill"
          rowKey="id"
          :scroll="{ y: true }"
          :columns="columns"
          :data="loadDataTable"
        >
          <div slot="action" slot-scope="text, record">
            <a @click="handleDetail(record)">详情</a>
          </div>
          <div slot="eventData" slot-scope="text">
            <span class="ellipsis" :title="text">
              {{ text }}
            </span>
          </div>
        </s-table>
        <div class="bbar">
          <a-button @click="visible = !visible">
            {{ $t('关闭') }}
          </a-button>
        </div>
      </a-tab-pane>
    </a-tabs>
    <call-log-info ref="CallLogInfo" />
  </a-drawer>
</template>
<script>
export default {
  components: {
    CallLogInfo: () => import('./CallLogInfo')
  },
  data () {
    return {
      scope: this,
      currentTab: 'info',
      tabList: [{
        title: this.$t('通话信息'),
        key: 'info'
      }, {
        title: this.$t('日志'),
        key: 'log'
      }],
      config: {},
      visible: false,
      callRecordInfo: {},
      // 表头
      columns: [{
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        width: 80,
        scopedSlots: { customRender: 'action' }
      }, {
        title: 'UID',
        dataIndex: 'uid',
        width: 150
      }, {
        title: '事件类型',
        dataIndex: 'eventType',
        width: 150
      }, {
        title: '事件产生事件',
        dataIndex: 'eventTime',
        width: 180
      }, {
        title: '事件详细信息',
        dataIndex: 'eventData',
        width: 200,
        scopedSlots: { customRender: 'eventData' }

      }],
      queryParam: {},
      rows: []
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.currentTab = config.tab
      this.callRecordInfo = config.data
      this.queryParam = config.queryParam
      this.queryParam.sortOrder = 'ascend'
      this.rows = []
      for (var i = 0; i < config.columns.length; i += 3) {
        this.rows.push(config.columns.slice(i, i + 3))
      }
      this.$refs.table && this.$refs.table[0].refresh(true)
    },
    loadDataTable (parameter) {
      return this.axios({
        url: '/callcenter/record/log',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    handleTabChange (activeKey) {
      this.currentTab = activeKey
      this.$refs.table && this.$refs.table[0].refresh(true)
    },
    handleDetail (record) {
      this.$refs.CallLogInfo.show({
        data: record
      })
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.ant-form-item-control {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
  display: block;
}
/deep/.ant-tabs .ant-tabs-top-content > .ant-tabs-tabpane {
  display: flex;
  flex-direction: column;
}
/deep/.ant-spin-nested-loading {
  flex: auto;
}
</style>
