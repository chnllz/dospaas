<template>
  <div class="page">
    <a-row style="margin: 0 10px">
      <a-col :span="20">
        <a-space>
          <a-form layout="inline" :colon="false">
            <a-form-item :label="$t('工作流名称')">
              <a-input v-model="queryParam.workflowName" @pressEnter="$refs.table.refresh(true)" />
            </a-form-item>
          </a-form>
          <a-button htmlType="submit" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
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
          <a-button v-action:add icon="plus" type="primary" @click="handleAdd">{{ $t('添加') }}</a-button>
          <a-button @click="handleSettingPriv">{{ $t('流程筛选组设置') }}</a-button>
          <a-button @click="createESConfigFile">{{ $t('生成ES配置文件') }}</a-button>
          <a-dropdown>
            <a-button>
              <a-icon type="menu" />
              {{ $t('更多操作') }}
            </a-button>
            <a-menu slot="overlay">
              <a-sub-menu v-for="item in esHandleList" :key="item.value" :title="$t(item.label)">
                <a-menu-item @click="handMenu(item.value, 'w_case')">w_case</a-menu-item>
                <a-menu-item @click="handMenu(item.value, 'w_log')">w_log</a-menu-item>
                <a-menu-item @click="handMenu(item.value, 'w_workitem')">w_workitem</a-menu-item>
                <a-menu-item @click="handMenu(item.value, 'w_token')">w_token</a-menu-item>
              </a-sub-menu>
            </a-menu>
          </a-dropdown>
        </a-space>
      </a-col>
      <a-col :span="4" style="text-align: right; line-height: 36px">
        <a-popover v-model="helpVisible" trigger="click" :arrowPointAtCenter="true" placement="bottomRight">
          <template slot="content">
            <div style="width: 350px" class="helpText">
              <div v-dompurify-html="helpNotes" v-viewer></div>
            </div>
          </template>
          <a-icon
            type="question-circle"
            style="font-size: 16px; margin-right: 8px; color: rgba(0, 0, 0, 0.65)"
            @click="getHelp"
          ></a-icon>
        </a-popover>
      </a-col>
    </a-row>
    <s-table
      ref="table"
      :scroll="{ y: true }"
      class="table-fill"
      size="small"
      rowKey="id"
      :columns="columns"
      :data="loadDataTable"
      :sorter="{ field: 'id', order: 'descend' }"
    >
      <template slot="createType" slot-scope="text">
        <span v-if="text == 'auto'">{{ $t('自动') }}</span>
        <span v-else-if="text == 'handle'">{{ $t('手动') }}</span>
      </template>
      <template slot="status" slot-scope="text">
        <a-badge v-if="text == '1'" status="success" :text="$t('启用')" />
        <a-badge v-else status="error" :text="$t('禁用')" />
      </template>
      <template slot="action" slot-scope="text, record">
        <a :disabled="record.accessLevel === 2" @click="flowDesign(record)">{{ $t('设计') }}</a>
        <a-divider type="vertical" />
        <a :disabled="record.accessLevel === 2" @click="handleEdit(record)">{{ $t('编辑') }}</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            {{ $t('更多') }}
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="handleList(record)">{{ $t('查看') }}</a>
            </a-menu-item>
            <a-menu-item>
              <a
                @click="
                  handleSyncWorkflowTable({
                    module: record.module,
                    alias: record.alias
                  })
                "
              >
                {{ $t('同步流程历史表') }}
              </a>
            </a-menu-item>
            <a-menu-item>
              <a
                @click="
                  handleSyncES({
                    module: record.module,
                    alias: record.alias
                  })
                "
              >
                {{ $t('同步ES索引') }}
              </a>
            </a-menu-item>
            <a-menu-item>
              <a
                @click="
                  handleDeleteES({
                    module: record.module,
                    alias: record.alias
                  })
                "
              >
                {{ $t('删除ES索引') }}
              </a>
            </a-menu-item>
            <a-menu-item>
              <a
                @click="
                  handleDownloadCanal({
                    module: record.module,
                    alias: record.alias
                  })
                "
              >
                {{ $t('下载canal配置文件') }}
              </a>
            </a-menu-item>
            <a-menu-item>
              <a @click="handlePriv(record)">{{ $t('权限') }}</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="handleStatus(record)">
                <template v-if="record.status == 1">{{ $t('禁用') }}</template>
                <template v-else>{{ $t('启用') }}</template>
              </a>
            </a-menu-item>
            <a-menu-item>
              <a :disabled="!!record.accessLevel" @click="handleDelete(record)">{{ $t('删除') }}</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>
    </s-table>
    <workflow-form ref="workflowForm" :key="editKey" @ok="handleOk" />
    <workflow-design-form ref="workflowDesignForm" :key="indexKey" @ok="handleOk" />
    <workflow-priv ref="workflowPriv" @ok="handleOk" />
    <fast-filter-permissions ref="fastFilterPermissions" />
    <workflow-add-modal ref="workflowAddModal" @ok="handleOk" />
    <drawio ref="drawio" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
    WorkflowForm: () => import('./WorkflowForm'),
    WorkflowDesignForm: () => import('./WorkflowDesignForm'),
    WorkflowPriv: () => import('./WorkflowPriv'),
    FastFilterPermissions: () => import('@/views/admin/Table/FastFilterPermissions'),
    WorkflowAddModal: () => import('@/views/admin/WorkflowAddModal'),
    Drawio: () => import('@/views/admin/Flow/Drawio.vue')
  },
  data () {
    return {
      workflowData: {},
      indexKey: 0,
      editKey: 'editKey',
      // 搜索参数
      queryParam: {},
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 160,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: 'ID',
        dataIndex: 'id',
        width: 60,
        sorter: true
      }, {
        title: this.$t('工作流名称'),
        dataIndex: 'workflowName',
        width: 120
      }, {
        title: this.$t('工作流ID'),
        width: 240,
        dataIndex: 'workflowId'
      }, {
        title: this.$t('流程对应数据表'),
        dataIndex: 'tableName'
      }, {
        title: this.$t('创建模式'),
        dataIndex: 'createType',
        width: 80,
        scopedSlots: { customRender: 'createType' }
      }, {
        title: this.$t('工作流状态'),
        dataIndex: 'status',
        width: 100,
        scopedSlots: { customRender: 'status' }
      }, {
        title: this.$t('业务回调方法'),
        width: 240,
        dataIndex: 'callbackName'
      }, {
        title: this.$t('备注'),
        dataIndex: 'workflowDesc'
      }, {
        title: this.$t('最后修改人'),
        dataIndex: 'updateUser',
        width: 150
      }, {
        title: this.$t('最后修改时间'),
        dataIndex: 'updateTime',
        width: 150
      }],
      graph: null,
      helpVisible: false,
      helpNotes: '',
      esHandleList: [{
        label: '同步流程历史表',
        value: 'syncWorkflow'
      }, {
        label: '同步ES索引',
        value: 'syncES'
      }, {
        label: '删除ES索引',
        value: 'deleteES'
      }, {
        label: '下载canal配置文件',
        value: 'downloadCanal'
      }]
    }
  },
  methods: {
    loadDataTable (parameter) {
      return this.axios({
        url: '/admin/workflow/list',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        for (const i in res.result.data) {
          res.result.data[i].callbackName = res.result.data[i].workflowSetting.callbackName
        }
        return res.result
      })
    },
    flowDesign (record) {
      this.$refs.drawio.showDrawio({
        workflowId: record.workflowId,
        tableId: record.tableId
      })
    },
    getHelp () {
      this.$setLoading({ spinning: true })
      this.helpVisible = false
      this.axios({
        url: '/admin/document/edit',
        data: {
          action: 'get',
          number: '22041616465808'
        }
      }).then(res => {
        this.$setLoading({ spinning: false })
        if (!res.code) {
          const obj = res.result
          if (obj.displayMode === 'drawer') {
            this.helpVisible = false
            this.$showDocument({ visible: true, content: obj.content })
          } else {
            this.helpVisible = true
            this.helpNotes = obj.content
          }
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    handleAdd () {
      this.$refs.workflowAddModal.show({
        title: this.$t('添加'),
        parent: this
      })
    },
    handleEdit (record) {
      this.editKey = this.editKey === 'editKey' ? 'editKey_1' : 'editKey'
      this.$nextTick(() => {
        this.$refs.workflowForm.show({
          action: 'edit',
          title: `${this.$t('编辑')}: ${record.workflowName}`,
          url: '/admin/workflow/get',
          record: record
        })
      })
    },
    handlePriv (record) {
      this.$refs.workflowPriv.show({
        title: `${this.$t('权限设置')}: ${record.workflowName}`,
        url: '/admin/workflow/priv',
        record: record
      })
    },
    handleDelete (record) {
      const that = this
      this.$confirm({
        title: this.$t('您确认要删除该记录吗？'),
        onOk () {
          that.axios({
            url: '/admin/workflow/delete',
            data: { workflowId: record.workflowId }
          }).then(res => {
            that.$refs.table.refresh()
          })
        }
      })
    },
    handleList (record) {
      this.indexKey = this.indexKey ? 0 : 1
      this.$nextTick(() => {
        this.$refs.workflowDesignForm.show({
          action: 'design',
          title: `${this.$t('流程查看')}：${record.workflowName}`,
          record: record
        })
      })
    },
    handleStatus (record) {
      const that = this
      this.$confirm({
        title: record.status === 1 ? this.$t('您确定要禁用该工作流吗？') : this.$t('您确定要启用该工作流吗？'),
        onOk () {
          that.axios({
            url: '/admin/workflow/enable',
            data: { workflowId: record.workflowId, status: record.status === 1 ? 0 : 1 }
          }).then(res => {
            if (res.code) {
              that.$message.warning(res.message, 6)
            } else {
              that.$refs.table.refresh()
            }
          })
        }
      })
    },
    handleSettingPriv () {
      this.$refs.fastFilterPermissions.show({
        title: this.$t('流程筛选组设置'),
        type: 'workflow'
      })
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    handleDeleteES (data) {
      const me = this
      this.$confirm({
        title: this.$t('您确认要删除吗？'),
        onOk () {
          me.$setLoading({ spinning: true, tip: me.$t('请稍后……') })
          me.axios({
            url: '/admin/table/deleteEsIndices',
            params: data
          }).then(res => {
            me.$setLoading({ spinning: false, tip: null })
            if (!res.code) {
              me.$message.success(res.message)
            } else {
              me.$message.error(res.message)
            }
          })
        }
      })
    },
    handleSyncES (data) {
      this.$setLoading({ spinning: true, tip: this.$t('请稍后……') })
      this.axios({
        url: '/admin/table/existsEsIndices',
        params: data
      }).then(res => {
        if (!res.result) {
          this.axios({
            url: '/admin/table/generatorEsIndices',
            params: data
          }).then(res => {
            this.$setLoading({ spinning: false, tip: null })
            if (!res.code) {
              this.$message.success(res.result.message)
            }
          })
        } else if (res.result.code === 1) {
          this.$setLoading({ spinning: false, tip: null })
          const _this = this
          this.$confirm({
            title: '提示',
            content: 'ES索引已存在，是否更新？',
            okText: '确定',
            cancelText: '取消',
            onOk () {
              _this.axios({
                url: '/admin/table/generatorEsIndices',
                params: data
              }).then(res => {
                if (!res.code) {
                  _this.$message.success(res.result.message)
                }
              })
            },
            onCancel () { }
          })
        } else if (res.result.code === 2) {
          this.$setLoading({ spinning: false, tip: null })
          this.$message.info(res.result.message)
        } else {
          this.$setLoading({ spinning: false, tip: null })
        }
      })
    },
    handleDownloadCanal (data) {
      window.open(`${this.$store.state.env.VUE_APP_API_BASE_URL}admin/table/api/getYmlSettings?alias=${data.alias}&module=${data.module}`)
    },
    handleSyncWorkflowTable (data) {
      const _this = this
      this.$confirm({
        title: _this.$t('提示'),
        content: _this.$t('您确认要同步流程历史表吗？'),
        maskClosable: true,
        onOk () {
          return new Promise((resolve, reject) => {
            _this.axios({
              url: 'admin/table/syncHistoryTable',
              params: data
            }).then(res => {
              const result = res.result
              if (!res.code) {
                if (result.createTable) {
                  _this.$message.success('流程历史表创建成功')
                } else if (result.insertFields > 0 || result.updateFields > 0 || result.updateIndexs > 0) {
                  _this.$message.success('流程历史表更新成功')
                } else {
                  _this.$message.success('流程历史表已是最新状态')
                }
              }
              resolve()
            })
          })
        }
      })
    },
    createESConfigFile () {
      const _this = this
      this.$confirm({
        title: _this.$t('提示'),
        content: _this.$t('您确认要生成ES配置文件吗？'),
        maskClosable: true,
        onOk () {
          return new Promise((resolve, reject) => {
            _this.axios({
              url: '/admin/workflow/generatorCanalSettingFile'
            }).then(res => {
              if (!res.code) {
                _this.$copyText(res.result).then(function (e) {
                  _this.$message.success('配置文件生成成功，文件路径已复制至剪贴板')
                  resolve()
                }, function (e) {
                  _this.$message.success(_this.$t('配置文件生成成功，复制失败'))
                  resolve()
                })
              }
            })
          })
        }
      })
    },
    handMenu (handleType, tableAlias) {
      if (handleType === 'syncWorkflow') {
        this.handleSyncWorkflowTable({
          module: 'admin',
          alias: tableAlias
        })
      } else if (handleType === 'syncES') {
        this.handleSyncES({
          module: 'admin',
          alias: tableAlias
        })
      } else if (handleType === 'deleteES') {
        this.handleDeleteES({
          module: 'admin',
          alias: tableAlias
        })
      } else if (handleType === 'downloadCanal') {
        window.open(`${this.$store.state.env.VUE_APP_API_BASE_URL}admin/table/api/getYmlSettings?alias=${tableAlias}&module=admin`)
      }
    }
  }
}
</script>
