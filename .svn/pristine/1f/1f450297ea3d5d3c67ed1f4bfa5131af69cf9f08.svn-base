<template>
  <div>
    <a-card size="small" class="table-search" :bordered="false">
      <a-form :layout="advanced ? 'vertical' : 'inline'" :class="advanced ? 'advanced' : 'normal'">
        <div class="head">
          <a-space style="margin-left: 8px">
            <a-button icon="search" type="primary" @click="waitSearch" @keyup.enter="waitSearch">搜索</a-button>
            <a-button
              icon="sync"
              @click="
                () => {
                  queryParam = {}
                  $refs.table.refresh(true)
                }
              "
            >
              重置
            </a-button>
          </a-space>
        </div>
        <a-row :gutter="16">
          <a-col v-if="advanced" span="24">
            <div class="divider"></div>
          </a-col>
          <a-col v-bind="colLayout">
            <a-form-item label="任务名称">
              <a-input v-model.trim="queryParam.taskname" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout">
            <a-form-item label="问卷名称">
              <a-select v-model="queryParam.nairename" :allowClear="true" :showSearch="true">
                <a-select-option v-for="(value, keys) in nairename" :key="keys + 1" :value="value">
                  {{ value }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card size="small" :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus">添加</a-button>
      </div>
      <s-table
        ref="table"
        size="small"
        rowKey="id"
        :columns="showdata.action === 'waitTask' ? columns : columns2"
        :data="loadDataTable"
        :sorter="{ field: 'id', order: 'descend' }"
      >
        <div slot="action" slot-scope="text, record">
          <a @click="showPage(record)">回访</a>
          <a-divider type="vertical" />
          <a @click="assignPage(record)">转移</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">删除</a>
        </div>
      </s-table>
    </a-card>
    <task-assign ref="TaskAssign" @ok="handleOk" />
    <browsing ref="browsing" @ok="handleOk" />
  </div>
</template>
<script>
export default {
  components: {
    TaskAssign: () => import('./TaskAssign'),
    Browsing: () => import('./QuestionnaireBrowsing')
  },
  props: {
    showdata: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      advanced: false,
      visible: false,
      loading: false,
      config: {},
      queryParam: {
        nairename: undefined
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      data: {},
      form: this.$form.createForm(this),
      nairename: [],
      columns: [{
        title: '操作',
        dataIndex: 'action',
        width: 140,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: 'ID',
        dataIndex: 'id',
        width: 40,
        align: 'center'
      }, {
        title: '任务名称',
        dataIndex: 'taskname',
        width: 200,
        align: 'center'
      }, {
        title: '问卷名称',
        dataIndex: 'nairename',
        width: 200,
        align: 'center'
      }, {
        title: '回访人',
        dataIndex: 'revisiter',
        align: 'center'
      }, {
        title: '回访时间',
        dataIndex: 'revisitdays',
        width: 140,
        align: 'center'
      }, {
        title: '分配人',
        dataIndex: 'distributor',
        align: 'center'
      }, {
        title: '分配时间',
        dataIndex: 'allocatetime',
        width: 140,
        align: 'center'
      }, {
        title: '客户名称',
        dataIndex: 'customer',
        align: 'center'
      }, {
        title: '客户电话1',
        dataIndex: 'phone1',
        align: 'center'
      }, {
        title: '客户电话2',
        dataIndex: 'phone2',
        align: 'center'
      }],
      columns2: [{
        title: '操作',
        dataIndex: 'action',
        width: 140,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: 'ID',
        dataIndex: 'id',
        width: 40,
        align: 'center'
      }, {
        title: '任务名称',
        dataIndex: 'taskname',
        width: 200,
        align: 'center'
      }, {
        title: '问卷名称',
        dataIndex: 'nairename',
        width: 200,
        align: 'center'
      }, {
        title: '分配人',
        dataIndex: 'distributor',
        align: 'center'
      }, {
        title: '分配时间',
        dataIndex: 'allocatetime',
        width: 140,
        align: 'center'
      }, {
        title: '客户名称',
        dataIndex: 'customer',
        align: 'center'
      }, {
        title: '客户电话1',
        dataIndex: 'phone1',
        align: 'center'
      }, {
        title: '客户电话2',
        dataIndex: 'phone2',
        align: 'center'
      }]
    }
  },
  created () {
    this.changeAdvanced(false)
  },
  methods: {
    loadDataTable (parameter) {
      return this.axios({
        url: '/visit/details/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    waitSearch () {
      const table = this.$refs.table
      table.refresh(true)
    },
    showPage (record) {
      this.$refs.browsing.show2({
        action: 'browsing',
        title: '问卷信息',
        id: record.id,
        url: this.showdata.url,
        selectValue: [],
        nairedata: record
      })
    },
    assignPage (record) {
      this.$refs.TaskAssign.show({
        action: 'assign',
        title: '转移',
        id: record && record.id || this.selectedRowKeys,
        selectValue: [],
        url: '/visit/task/taskdetails'
      })
    },
    handleOk () {
      this.$refs.table.refresh(true)
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          this.loading = true
          const headImage = this.imageFileList.length ? this.imageFileList[0].response.result.filePath : ''
          values.info.setting = { headImage: headImage }
          values.info.priv = this.priv
          this.axios({
            url: this.config.url,
            data: Object.assign(values, { id: this.data.id })
          }).then((res) => {
            this.loading = false
            this.$emit('ok', values)
            if (res.code) {
              this.$message.warning(res.message)
            } else {
              this.visible = false
              this.$message.success(res.message)
            }
          })
        }
      })
    },
    handleDelete (record) {
      const table = this.$refs.table
      const id = record.id
      const self = this
      this.$confirm({
        title: record ? '您确认要删除该记录吗？' : '您确认要删除选中的记录吗？',
        onOk () {
          self.axios({
            url: '/visit/details/delete',
            data: { id: id }
          }).then(res => {
            self.$message.success('删除成功')
            table.refresh(true)
          })
        }
      })
    },
    changeAdvanced (tag) {
      if (tag) {
        this.advanced = !this.advanced
      }
      if (this.advanced) {
        this.colLayout = { xs: 24, sm: 12, md: 8, lg: 8, xl: 6, xxl: 6 }
      } else {
        this.colLayout = { xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 6 }
      }
    },
    refresh () {
      this.$refs.table.refresh(true)
    }
  }
}
</script>
