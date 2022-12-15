<template>
  <div class="container">
    <a-tabs v-model="currentKey" tabPosition="left" @change="changeKey">
      <a-tab-pane v-show="currentKey === 'unread'" key="unread" style="height: 100%">
        <span slot="tab">
          <a-badge :count="unreadAll" :number-style="{ margin: '0 -8px', fontSize: '12px' }">
            <span>{{ $t('未读消息') }}</span>
          </a-badge>
        </span>
        <div class="page">
          <a-button-group style="margin-bottom: 8px">
            <a-button
              v-for="(value, key) in typeList"
              :key="key"
              :type="currentIndex === key ? 'primary' : ''"
              @click="refresh(value, key)"
            >
              <a-badge
                v-if="noticeMsg > 0 || workflowMsg > 0"
                :count="value.type === 'notice' ? noticeMsg : value.type === 'workflow' ? workflowMsg : '0'"
                :number-style="{ margin: '2px -8px', fontSize: '12px' }"
              >
                {{ value.name }}
              </a-badge>
              <template v-else>{{ value.name }}</template>
            </a-button>
          </a-button-group>
          <!-- 操作按钮 -->
          <a-space>
            <a-button @click="handleRead('all')">{{ $t('全部标记已读') }}</a-button>
            <a-button :disabled="selectedRowKeys.length === 0" @click="handleRead">{{ $t('标记已读') }}</a-button>
            <a-button v-action:delete type="danger" :disabled="selectedRowKeys.length === 0" @click="handleDelAll">
              {{ $t('批量删除') }}
            </a-button>
          </a-space>
          <!-- 数据列表 -->
          <s-table
            v-if="currentKey === 'unread'"
            ref="table"
            class="table-fill"
            :scroll="{ y: true }"
            size="small"
            rowKey="id"
            :columns="columns"
            :data="loadDataTable"
            :rowSelection="rowSelection"
            :sorter="sorter"
          >
            <span slot="action" slot-scope="text, record">
              <a href="#" @click="handleDetail(record)">{{ $t('详情') }}</a>
              <a-divider v-action:delete type="vertical"></a-divider>
              <a v-action:delete @click="handleDel(record, 'unread')">{{ $t('删除') }}</a>
            </span>
          </s-table>
        </div>
      </a-tab-pane>
      <a-tab-pane v-show="currentKey === 'read'" key="read" :tab="$t('已读消息')" style="height: 100%">
        <div class="page">
          <a-button-group style="margin-bottom: 8px">
            <a-button
              v-for="(value, key) in typeList"
              :key="key"
              :type="currentIndex === key ? 'primary' : ''"
              @click="refresh(value, key)"
            >
              {{ value.name }}
            </a-button>
          </a-button-group>
          <!-- 操作按钮 -->
          <a-space>
            <a-button v-action:delete type="danger" :disabled="selectedRowKeys.length === 0" @click="handleDelAll">
              {{ $t('批量删除') }}
            </a-button>
          </a-space>
          <!-- 数据列表 -->
          <s-table
            v-if="currentKey === 'read'"
            ref="table"
            class="table-fill"
            :scroll="{ y: true }"
            size="small"
            rowKey="id"
            :columns="columns"
            :data="loadDataTable"
            :rowSelection="rowSelection"
            :sorter="sorter"
          >
            <span slot="action" slot-scope="text, record">
              <a href="#" @click="handleDetail(record)">{{ $t('详情') }}</a>
              <a-divider v-action:delete type="vertical"></a-divider>
              <a v-action:delete href="#" @click="handleDel(record)">{{ $t('删除') }}</a>
            </span>
          </s-table>
        </div>
      </a-tab-pane>
      <a-tab-pane v-show="currentKey === 'all'" key="all" :tab="$t('全部消息')" style="height: 100%">
        <div class="page">
          <a-button-group style="margin-bottom: 8px">
            <a-button
              v-for="(value, key) in typeList"
              :key="key"
              :type="currentIndex === key ? 'primary' : ''"
              @click="refresh(value, key)"
            >
              {{ value.name }}
            </a-button>
          </a-button-group>
          <!-- 操作按钮 -->
          <div class="table-operator">
            <a-button @click="handleRead('all')">{{ $t('全部标记已读') }}</a-button>
            <a-button :disabled="selectedRowKeys.length === 0" @click="handleRead">{{ $t('标记已读') }}</a-button>
            <a-button v-action:delete type="danger" :disabled="selectedRowKeys.length === 0" @click="handleDelAll">
              {{ $t('批量删除') }}
            </a-button>
          </div>
          <!-- 数据列表 -->
          <s-table
            v-if="currentKey === 'all'"
            ref="table"
            class="table-fill"
            :scroll="{ y: true }"
            size="small"
            rowKey="id"
            :columns="columns"
            :data="loadDataTable"
            :rowSelection="rowSelection"
            :sorter="sorter"
          >
            <span slot="action" slot-scope="text, record">
              <a href="#" @click="handleDetail(record)">{{ $t('详情') }}</a>
              <a-divider v-action:delete type="vertical"></a-divider>
              <a v-action:delete href="#" @click="handleDel(record)">{{ $t('删除') }}</a>
            </span>
          </s-table>
        </div>
      </a-tab-pane>
    </a-tabs>
    <RemindDetail ref="remindDetail" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
    RemindDetail: () => import('./RemindDetail')
  },
  data () {
    return {
      currentIndex: 0,
      typeList: [],
      config: {},
      currentKey: 'unread',
      status: 0,
      unreadAll: 0,
      sum: 0,
      noticeMsg: 0,
      noticeSum: 0,
      workflowMsg: 0,
      workflowSum: 0,
      queryParam: {
        type: ''
      },
      sorter: { field: 'id', order: 'descend' },
      columns: [{
        title: this.$t('操作'),
        key: 'action',
        scopedSlots: { customRender: 'action' },
        width: 100,
        align: 'center'
      }, {
        title: this.$t('标题'),
        width: 300,
        dataIndex: 'title',
        customRender: (text, record) => {
          let style = {}
          if (record.status === '0') {
            style = { fontWeight: '900' }
          }
          return (<div style={style}>{text}</div>)
        }
      }, {
        title: this.$t('内容'),
        dataIndex: 'content',
        customRender: (text, record) => {
          text = text.replace(/(<[^<>]+>)/g, '')
          return (<div domPropsInnerHTML={text || '--'}></div>)
        }
      }, {
        title: this.$t('接收时间'),
        dataIndex: 'inputTime',
        width: 150
      }, {
        title: this.$t('消息类型'),
        dataIndex: 'type',
        width: 150,
        customRender: (text) => {
          if (text === 'notice') {
            return this.$t('公告')
          } else if (text) {
            return this.$t('流程')
          } else {
            return this.$t('全部')
          }
        }
      }],
      selectedRowKeys: [],
      selectedRows: [],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys
        }
      }
    }
  },
  mounted () {
    this.getTypeList()
  },
  methods: {
    getTypeList () {
      this.axios({
        url: '/admin/general/list',
        data: {
          sortField: 'listOrder',
          sortOrder: 'ascend',
          pageNo: 1,
          pageSize: 30,
          associated: [],
          customColumn: [],
          templateId: '135b4806e8ae9e2ad0820f54f371fe9d'
        }
      }).then(res => {
        const object = [{
          type: '',
          name: this.$t('全部')
        }]
        res.result.data.forEach(item => {
          item.name = this.$t(item.name)
        })
        const arr = [...object, ...res.result.data]
        this.typeList = arr
      })
    },
    show (config) {
      this.config = config
      this.currentKey = 'unread'
    },
    changeKey (key) {
      this.currentIndex = 0
      switch (key) {
        case 'unread':
          this.status = 0
          this.queryParam.type = ''
          break
        case 'read':
          this.status = 1
          this.queryParam.type = ''
          break
        case 'all':
          this.status = undefined
          this.queryParam.type = ''
          break
        default:
          break
      }
    },
    // 加载数据
    loadDataTable (parameter) {
      return this.axios({
        url: '/admin/message/remind',
        data: Object.assign(parameter, this.queryParam, { status: this.status })
      }).then(res => {
        if (this.status !== 1) {
          const sum = (res.result.countlist.notice || 0) + (res.result.countlist.workflow || 0) + (res.result.countlist.workitem || 0)
          this.sum = res.result.countlist.notice > 99 ? '99+' : res.result.countlist.notice
          this.unreadAll = sum > 99 ? '99+' : sum
          this.noticeMsg = res.result.countlist.notice > 99 ? '99+' : res.result.countlist.notice
          this.workflowMsg = res.result.countlist.workflow > 99 ? '99+' : res.result.countlist.workflow
        }
        return res.result
      })
    },
    // 刷新数据
    refresh (value, key) {
      this.currentIndex = key
      this.queryParam.type = value.type
      this.$refs.table.refresh()
    },
    // 详情
    handleDetail (record) {
      if (String(record.status) === '0') {
        record.status = '1'
        const id = record.id
        const relatedNumber = record.relatedNumber
        this.getRead(id, relatedNumber)
        if (this.sum > 0) {
          this.sum--
          if (this.sum > 99) {
            this.unreadAll = '99+'
          } else {
            this.unreadAll = this.sum
          }
        }
      }
      this.$refs.remindDetail.show({
        title: record.title,
        content: record.content,
        record: record
      })
    },
    // 标记已读
    getRead (id, relatedNumber) {
      this.axios({
        url: '/admin/message/setRemindRead',
        data: { id }
      }).then(res => {
        this.$refs.table.refresh()
        if (res.code === 0) {
          this.$emit('ok')
        }
      })
    },
    // 删除数据
    handleDel (record, type) {
      const id = [record.id]
      if (type) {
        const that = this
        this.$confirm({
          title: this.$t('您确认要删除选中的记录吗？'),
          onOk () {
            that.axios({
              url: '/admin/message/delRemind',
              data: { id }
            }).then(res => {
              if (res.code === 0) {
                const value = {
                  type: that.queryParam.type
                }
                const key = that.currentIndex
                that.refresh(value, key)
                that.$message.success(res.message)
              }
            })
          }
        })
      } else {
        this.axios({
          url: '/admin/message/delRemind',
          data: { id }
        }).then(res => {
          if (res.code === 0) {
            const value = {
              type: this.queryParam.type
            }
            const key = this.currentIndex
            this.refresh(value, key)
            this.$message.success(res.message)
          }
        })
      }
    },
    // 删除所有
    handleDelAll () {
      const id = this.selectedRowKeys
      const that = this
      this.$confirm({
        title: this.$t('您确认要删除选中的记录吗？'),
        onOk () {
          that.axios({
            url: '/admin/message/delRemind',
            data: { id }
          }).then(res => {
            if (res.code === 0) {
              const value = {
                type: that.queryParam.type
              }
              const key = that.currentIndex
              that.refresh(value, key)
              // that.refresh()
              that.$message.success(res.message)
            }
          })
        }
      })
    },
    // 已读
    handleRead (type = '') {
      let idAll = ''
      let id = []
      if (type === 'all') {
        idAll = 'all'
      } else {
        id = this.selectedRowKeys
      }
      this.axios({
        url: '/admin/message/setRemindRead',
        data: { id: id.length !== 0 ? id : idAll }
      }).then(res => {
        if (res.code === 0) {
          const value = {
            type: this.queryParam.type
          }
          const key = this.currentIndex
          this.refresh(value, key)
          this.$emit('ok')
          this.$message.success(res.message)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  /deep/ .ant-tabs {
    padding: 8px;
    display: flex;
    height: 100%;
    background: #fff;
    overflow: auto;
    .ant-tabs-content.ant-tabs-content-animated.ant-tabs-left-content {
      height: 100%;
    }
    .ant-tabs-left-bar .ant-tabs-nav-wrap {
      margin-top: 8px;
    }
  }
}
</style>
