<template>
  <div class="page">
    <a-form class="search" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
      <a-row class="form normal">
        <a-col :span="6">
          <a-form-item :label="$t('机器人名称')">
            <a-input v-model="queryParam.name" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item :label="$t('机器人昵称')">
            <a-input v-model="queryParam.nickName" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item :label="$t('机器人备注')">
            <a-input v-model="queryParam.remarks" />
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
        <a @click="handleSet(record)">{{ $t('编辑') }}</a>
        <a-divider type="vertical" />
        <a @click="handleDelete(record)">{{ $t('删除') }}</a>
      </div>
    </s-table>
    <setting-robot-form ref="settingRobotForm" @ok="handleOk" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('chat'),
  components: {
    settingRobotForm: () => import('./SettingRobotForm')
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
        title: this.$t('ID'),
        dataIndex: 'id',
        sorter: true
      }, {
        title: this.$t('机器人名称'),
        dataIndex: 'name',
        sorter: true
      }, {
        title: this.$t('机器人昵称'),
        dataIndex: 'nickName',
        sorter: true
      }, {
        title: this.$t('机器人备注'),
        dataIndex: 'remarks'
      }, {
        title: this.$t('创建人'),
        dataIndex: 'inputUser',
        sorter: true
      }, {
        title: this.$t('创建时间'),
        dataIndex: 'inputTime',
        sorter: true
      }],
      sorter: { field: 'id', order: 'descend' }
    }
  },
  methods: {
    loadDataTable (parameter) {
      return this.axios({
        url: '/chat/robot/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    handleAdd () {
      this.$refs.settingRobotForm.show({
        title: this.$t('添加'),
        url: '/chat/robot/add',
        record: {},
        action: 'add'
      })
    },
    handleSet (record) {
      this.$refs.settingRobotForm.show({
        title: this.$t('编辑'),
        url: '/chat/robot/edit',
        record: record,
        action: 'edit'
      })
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    handleDelete (record) {
      const that = this
      that.$confirm({
        title: record ? this.$t('您确认要删除该记录吗？') : this.$t('您确认要删除选中的记录吗？'),
        onOk () {
          that.axios({
            url: '/chat/robot/delete',
            data: { id: record.id }
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
