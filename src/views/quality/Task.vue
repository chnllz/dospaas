<template>
  <div class="page">
    <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
      <a-card :title="$t('搜索')" size="small">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="$refs.table.refresh(true)" @keydown.enter="$refs.table.refresh(true)">
            {{ $t('搜索') }}
          </a-button>
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
          <a-button :icon="advanced ? 'up' : 'down'" style="font-size: 11px" @click="advanced = !advanced"></a-button>
        </a-space>
        <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
          <a-col :span="6">
            <a-form-item :label="$t('任务名称')">
              <a-input v-model.trim="queryParam.taskName" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <a-space>
      <a-button v-action:add icon="plus" type="primary" @click="addTask">{{ $t('添加') }}</a-button>
      <a-button v-action:export icon="download" @click="handleExport">{{ $t('导出') }}</a-button>
    </a-space>
    <s-table
      ref="table"
      :scroll="{ y: true }"
      size="small"
      rowKey="id"
      :columns="columns"
      class="table-fill"
      :data="loadDataTable"
      :sorter="{ field: 'id', order: 'descend' }"
    >
      <div slot="action" slot-scope="text, record">
        <a @click="editTask(record, 'edit')">{{ $t('编辑') }}</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a>
            {{ $t('更多') }}
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="showProgress(record)">{{ $t('查看进度') }}</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="showDetails(record)">{{ $t('查看明细') }}</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="editTask(record, 'distribution')">{{ $t('提取&分配') }}</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="deleteTask(record)">{{ $t('删除信息') }}</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </s-table>
    <general-export ref="generalExport" />
    <task-progress ref="taskProgress" />
    <task-details ref="taskDetails" />
    <task-form ref="taskForm" @ok="$refs.table.refresh(true)" />
  </div>
</template>
<script>
export default {
  components: {
    SelectUserForm: () => import('@/views/admin/General/SelectUserForm'),
    GeneralExport: () => import('@/views/admin/Table/GeneralExport'),
    TaskProgress: () => import('./TaskProgress'),
    TaskDetails: () => import('./TaskDetails'),
    TaskForm: () => import('./TaskForm')
  },
  data () {
    return {
      advanced: false,
      // 搜索参数
      parameter: {},
      queryParam: {},
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 120,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: this.$t('ID'),
        dataIndex: 'id',
        width: 110,
        sorter: true
      }, {
        title: this.$t('任务名称'),
        dataIndex: 'taskName'
      }, {
        title: this.$t('质检总数'),
        dataIndex: 'qualityTotal'
      }, {
        title: this.$t('已质检数'),
        dataIndex: 'qualityNumber'
      }, {
        title: this.$t('待质检数'),
        dataIndex: 'forQualityNumber'
      }, {
        title: this.$t('有效数据'),
        dataIndex: 'validNumber'
      }, {
        title: this.$t('无效数据'),
        dataIndex: 'invalidNumber'
      }, {
        title: this.$t('完成率'),
        dataIndex: 'accomplishPercent'
      }, {
        title: this.$t('质检员'),
        dataIndex: 'qualityUsers'
      }]
    }
  },
  methods: {
    // 页面数据渲染
    loadDataTable (parameter) {
      this.parameter = parameter
      return this.axios({
        url: '/quality/task/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    // 导出
    handleExport () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'ExportTaskManager',
        setMenuName: true,
        parameter: {
          condition: Object.assign(this.parameter, this.queryParam)
        }
      })
    },
    // 查看进度
    showProgress (record) {
      const id = record && record.id
      this.$refs.taskProgress.show({
        id: id,
        title: this.$t('查看进度'),
        url: '/quality/task/progress'
      })
    },
    // 查看明细
    showDetails (record) {
      const id = record && record.id
      this.$refs.taskDetails.show({
        id: id,
        title: this.$t('查看明细'),
        url: '/quality/task/details'
      })
    },
    // 打开添加页面
    addTask () {
      this.$refs.taskForm.show({
        disstatu: false,
        allocatestate: false,
        groupAllocation: [{
          agent: '',
          rate: 1
        }],
        config: {
          action: 'add',
          title: '添加',
          url: '/quality/task/init',
          data: {
            minBillsec: '1',
            maxBillsec: '300',
            callType: 'in&out',
            comment: '0',
            extractAll: '0',
            count: '1',
            distributionMode: '0',
            extractAgent: '',
            distributionAgent: ''
          }
        }
      })
    },
    // 任务删除
    deleteTask (record) {
      const id = record && record.id
      this.$confirm({
        title: this.$t('您确认要删除该记录吗？'),
        onOk: () => {
          this.axios({
            url: '/quality/task/delete',
            params: { id: id }
          }).then(res => {
            if (res.code === 0) {
              this.$message.success(this.$t('删除成功'))
              this.$refs.table.refresh()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    // 修改的抽屉以及查找对应修改的数据
    editTask (record, action) {
      this.axios({
        url: 'quality/task/getById',
        params: { id: record.id }
      }).then(res => {
        const { taskName, templateId, minBillsec, maxBillsec, callType, extractAgent, distributionMode, count, comment, extractAll, remarks, distributionAgent } = res.result
        this.$refs.taskForm.show({
          disstatu: action !== 'edit',
          allocatestate: false,
          groupAllocation: [{
            agent: '',
            rate: 1
          }],
          config: {
            id: record && record.id || '',
            action: action,
            title: action === 'edit' ? '编辑' : '提取&分配',
            url: '/quality/task/edit',
            data: {
              taskName: taskName,
              templateId: templateId,
              minBillsec: minBillsec,
              maxBillsec: maxBillsec,
              callType: callType,
              comment: JSON.parse(comment),
              extractAll: extractAll.toString(),
              count: count,
              distributionMode: distributionMode,
              extractAgent: JSON.parse(extractAgent),
              distributionAgent: distributionAgent ? JSON.parse(distributionAgent) : [],
              remarks: remarks
            }
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.input {
  background-color: #f5f5f5;
}
.margin {
  margin-left: 80px;
}
.rattio {
  margin-left: 20px;
}
.title {
  margin-top: 5px;
}
/deep/.ant-drawer-body {
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > :first-child:not(.ant-spin-nested-loading) {
    padding: 16px;
  }
  > .ant-spin-nested-loading {
    height: 100%;
    > .ant-spin-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      > :first-child {
        flex-grow: 1;
        overflow: auto;
        padding: 0px;
      }
    }
  }
  .ant-tabs-bar {
    margin-top: 2px;
  }
  .drawer-table {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: auto;
  }

  .bbar {
    padding: 10px 16px;
    text-align: right;
    border-top: 1px solid #e9e9e9;
    display: flex;
    justify-content: flex-end;
  }
}
/deep/.ant-card-body {
  height: 100%;
}
/deep/.table-fill {
  height: calc(100% - 43px);
}
</style>
