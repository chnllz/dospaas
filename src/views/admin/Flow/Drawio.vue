<template>
  <a-drawer width="100%" :closable="false" :destroyOnClose="true" :visible="show" @close="show = !show">
    <iframe
      id="iframe"
      :src="pageUrl"
      width="100%"
      height="100%"
      frameborder="0"
      scrolling="no"
      allow="payment"
    ></iframe>
    <a-modal v-model="visible" :destroyOnClose="true" :title="$t('保存为历史版本')" @ok="handleSubmit">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="$t('版本号')">
          <a-input
            v-decorator="['versionName', { rules: [{ required: true, message: $t('请填写版本号') }] }]"
          ></a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="$t('备注')">
          <a-textarea v-decorator="['remark']" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal v-model="visibleHistory" :destroyOnClose="true" width="800px" :title="$t('查看历史版本')">
      <a-spin :spinning="spin">
        <s-table ref="table" size="small" rowKey="id" :columns="columns" :data="loadDataTable">
          <div slot="action" slot-scope="text, record">
            <a @click="rollback(record)">
              {{ $t('恢复至此版本') }}
            </a>
            <a-divider type="vertical" />
            <a @click="handleDelete(record)">
              {{ $t('删除') }}
            </a>
          </div>
        </s-table>
      </a-spin>
      <template slot="footer">
        <a-button @click="visibleHistory = !visibleHistory">关闭</a-button>
      </template>
    </a-modal>
    <flow-attr
      v-if="pageUrl"
      ref="FlowAttr"
      :workflowId="workflowId"
      :flowData="flowData"
      :select="currentSelect"
      @ok="handleOk"
    />
    <div v-if="pageUrl" style="position: absolute; top: 35px; right: 10px">
      <HelpPanel
        :number="'22041616481909'"
        :styleStr="'font-size: 16px;margin-right: 5px;color: rgba(0, 0, 0, 0.65);'"
      />
    </div>
  </a-drawer>
</template>
<script>
export default {
  components: {
    FlowAttr: () => import('./modules/FlowAttr'),
    HelpPanel: () => import('@/views/admin/HelpPanel')
  },
  data () {
    return {
      // pageUrl: process.env.VUE_APP_BASE_URL + 'webapp/index.html',
      pageUrl: 'http://localhost:8080/drawio/src/main/webapp/index.html?dev=1',
      visible: false,
      visibleHistory: false,
      graph: null,
      id: 0,
      name: '',
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      cell: {},
      flowData: { params: { tableId: '07b66955d18b4dd286d2fdacb2dc4e71' } },
      currentSelect: { type: null, id: this.id, nodeName: this.name },
      data: {},
      target: {},
      form: this.$form.createForm(this),
      show: false, // iframe的展示
      lock: false, // 是否被锁
      lockId: null,
      keepLock: null, // 保持编辑锁的函数
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 150,
        scopedSlots: { customRender: 'action' }
      }, {
        title: this.$t('版本名称'),
        dataIndex: 'versionName',
        width: 80
      }, {
        title: this.$t('发布人'),
        dataIndex: 'inputUser',
        width: 100
      }, {
        title: this.$t('发布时间'),
        dataIndex: 'inputTime',
        width: 120
      }, {
        title: this.$t('备注'),
        dataIndex: 'remarks',
        width: 150
      }],
      workflowId: null,
      spin: true,
      history: null
    }
  },

  created () {
    window.onbeforeunload = () => {
      this.axios({
        url: '/admin/workflow/unlock',
        data: {
          lockId: this.lockId,
          workflowId: this.workflowId
        }
      })
    }
    window.top['drawio'] = {}
    // 载入视图信息
    window.top['drawio']['fileInit'] = () => {
      return {
        title: this.data.workflowName,
        data: this.data.flow
      }
    }
    // 查看历史版本
    window.top['drawio']['showHistory'] = () => {
      this.visibleHistory = !this.visibleHistory
    }
    // 保存为历史版本
    window.top['drawio']['saveHistory'] = (res) => {
      this.history = res
      this.visible = !this.visible
    }
    // 保存修改
    window.top['drawio']['save'] = (res) => {
      this.onSave(res)
    }

    window.top['drawio']['publish'] = (res) => {
      this.onPublish(res)
    }

    // 退出drawio
    window.top['drawio']['exit'] = () => {
      const that = this
      this.$confirm({
        title: this.$t('您确认要退出吗？'),
        onOk () {
          that.show = false
          that.$nextTick(() => {
            that.showLoading = true
          })
          if (that.lock) {
            that.lock = false
            return
          }
          // 退出之后要清除每隔一分钟就发送一次的编辑锁
          clearInterval(that.keepLock)
          that.axios({
            url: '/admin/workflow/unlock',
            data: {
              lockId: that.lockId,
              workflowId: that.workflowId
            }
          })
        }
      })
    }

    // 提示错误信息
    window.top['drawio']['error'] = (res) => {
      res = res.slice(0, res.length - 1) + '。'
      this.$error({
        title: this.$t(res),
        onOk () {
        }
      })
    }
    window.top['drawio']['errorToast'] = (res) => {
      res = res.slice(0, res.length - 1) + '。'
      this.$message.error(this.$t(res))
    }
    window.top['drawio']['infoToast'] = (res) => {
      this.$message.info(this.$t(res))
    }
    // 删除节点信息
    window.top['drawio']['delete'] = (res) => {
      if (this.lock) {
        this.$message.warning('编辑锁已启用，您不能提交数据')
        return
      }
      this.axios({
        url: 'admin/data/delete',
        data: {
          tableName: 'admin_w_workflow_node',
          where: {
            fieldName: 'node_id',
            fieldValue: res
          }
        }
      })
    }
    // 双击打开图形编辑
    window.top['drawio']['open'] = (cell, graph) => {
      this.currentSelect = {}
      this.graph = graph
      this.cell = cell
      // 给图形分类
      const type = (item) => {
        if (item === null) return
        if (item.style.indexOf('fillColor=#d9d9d9') !== -1) {
          return 'quote_transition'
        }
        if (item.style.indexOf('user_transition') !== -1) return 'user_transition'
        if (item.style.indexOf('start') !== -1) return 'start'
        if (item.style.indexOf('end') !== -1) return 'end'
        if (item.style.indexOf('gateway_andsplit') !== -1) return 'gateway_andsplit'
        if (item.style.indexOf('gateway_andjoin') !== -1) return 'gateway_andjoin'
        if (item.style.indexOf('gateway_implicit') !== -1) return 'gateway_implicit'
        if (item.style.indexOf('gateway_orjoin') !== -1) return 'gateway_orjoin'
        if (item.style.indexOf('gateway_explicit') !== -1) return 'gateway_explicit'
        if (item.style.indexOf('edge') !== -1) {
          this.target = item.target
          return 'link'
        }
      }
      this.name = cell.value
      this.id = cell.id
      this.currentSelect.id = cell.id
      this.currentSelect.type = cell.type ?? type(cell)
      this.currentSelect.quoteId = cell.quoteId ?? null
      this.currentSelect.source = {}
      this.currentSelect.source.id = cell.source?.id ?? null
      this.currentSelect.source.type = cell.source?.type ?? type(cell.source?.id ? cell.source : null)
      this.currentSelect.target = {}
      this.currentSelect.target.id = cell.target?.id ?? null
      this.currentSelect.target.type = cell.target?.type ?? type(cell.target?.id ? cell.target : null)
      if (this.currentSelect.type === 'link') {
        this.target = cell.target
        if (this.currentSelect.source.type.indexOf('gateway') > -1) {
          graph.selectAll(null, true, cell)
          const cells = graph.getEditableCells(graph.getSelectionCells())
          this.currentSelect.all = cells
          graph.setSelectionCell(cell)
        }
      }
      // 对变迁的标签进行整理
      if (this.currentSelect.type === 'user_transition' || this.currentSelect.type === 'quote_transition') {
        const start = cell.value.indexOf(';">') + 3
        const end = cell.value.indexOf('&nbsp;')
        if (end !== -1) {
          this.currentSelect.nodeName = cell.value.slice(start, end)
        } else {
          this.currentSelect.nodeName = cell.value
        }
      } else {
        this.currentSelect.nodeName = cell.value
      }
      this.openDrawer()
    }
    window.top['drawio']['success'] = () => {
      this.$message.success(this.$t('检测成功'))
    }
  },
  methods: {
    loadDataTable (parameter) {
      this.spin = true
      return this.axios({
        url: '/admin/workflowVersion/getHistoryVersion',
        data: Object.assign(parameter, { workflowId: this.workflowId })
      }).then((res) => {
        if (res.code === 0) {
          this.spin = false
          return res.result
        }
      })
    },
    handleDelete (record) {
      this.$confirm({
        title: this.$t('您确认要删除该记录吗？'),
        onOk: () => {
          this.spin = true
          this.axios({
            url: '/admin/workflowVersion/delHistoryVersion',
            data: {
              versionId: record.versionId,
              workflowId: record.workflowId
            }
          }).then(res => {
            if (res.code === 0) {
              this.$refs.table.refresh()
              this.$message.warning(this.$t('操作成功'))
              this.spin = false
            } else {
              this.$message.warning(this.$t('操作失败'))
              this.spin = false
            }
          })
        }
      })
    },
    showDrawio (value) {
      this.flowData.params.tableId = value.tableId
      this.workflowId = value.workflowId
      this.axios({
        url: '/admin/workflow/initGraph',
        data: { workflowId: this.workflowId }
      }).then(res => {
        if (!res.code) {
          this.data = res.result || {}
          // 如果请求到有这个流程图,那就请求编辑锁
          this.lockId = Date.now() + ':' + Math.floor(Math.random() * (999 - 100 + 1) + 100)
          this.show = true
          this.axios({
            url: '/admin/workflow/lock',
            data: {
              lockId: this.lockId,
              workflowId: this.workflowId
            }
          }).then(getLockRes => {
            if (getLockRes.code === 0) {
              // 如果没有被锁住,那就开始每隔一分钟就发起请求保持编辑锁
              this.keepLock = setInterval(() => {
                this.axios({
                  url: '/admin/workflow/lock',
                  data: {
                    lockId: this.lockId,
                    workflowId: this.workflowId
                  }
                })
              }, 1000 * 60)
            } else {
              this.lock = true
            }
          })
        }
      })
    },
    // 保存整个节点视图
    onSave (res) {
      if (this.lock) {
        this.$message.warning('编辑锁已启用，您不能提交数据')
        return
      }
      this.axios({
        url: '/admin/workflow/saveGraph',
        data: {
          flow: res,
          workflowId: this.workflowId
        }
      }).then(res => {
        if (!res.code) {
          this.$message.success(this.$t('保存成功'))
        } else {
          this.$message.error(this.$t('保存失败'))
        }
      })
    },
    onPublish (res) {
      if (this.lock) {
        this.$message.warning('编辑锁已启用，您不能提交数据')
        return
      }
      this.axios({
        url: '/admin/workflow/parseGraph',
        data: {
          flow: res,
          workflowId: this.workflowId
        }
      }).then(res => {
        if (!res.code) {
          this.$message.success(this.$t('发布成功'))
          return true
        } else {
          this.$message.error(this.$t('发布失败'))
        }
      })
    },
    // 打开节点编辑时载入数据
    openDrawer () {
      if (this.lock) {
        this.$message.warning('编辑锁已启用，您不能编辑')
        return
      }
      this.axios({
        url: '/admin/workflow/getNode',
        data: {
          workflowId: this.workflowId,
          nodeId: this.currentSelect.id
        }
      }).then(res => {
        if (!res.code) {
          if (res.result?.nodeSetting && res.result.nodeSetting.type) {
            this.currentSelect = {
              ...res.result.nodeSetting,
              dbId: res.result.id,
              all: this.currentSelect.all ?? null,
              source: this.currentSelect.source ?? null,
              target: this.currentSelect.target ?? null
            }
          } else {
            this.currentSelect = { ...this.currentSelect }
          }
          this.$refs.FlowAttr.show({ val: this.currentSelect, workflowSetting: this.data.workflowSetting })
        }
      })
    },
    // 提交节点数据后刷新视图
    handleOk (val) {
      const model = this.graph.getModel()
      model.beginUpdate()
      try {
        const cells = this.graph.getEditableCells(this.graph.getSelectionCells())
        const cell = cells[0]
        let label
        // 如果是变迁,要显示更多信息
        if (val.type === 'user_transition') {
          if (cell.value === '人工变迁') {
            label = `<div id="all" style="position: relative;text-align:left;padding:10px; width: 140px;height: 100px"><div id="nodeName" style="width: 160px; overflow: hidden; position: absolute; white-space: nowrap; text-overflow: ellipsis ;">${val.nodeName ?? '--'}&nbsp;</div>
        <div style="width:160px; overflow: hidden; position: absolute; white-space: nowrap; text-overflow: ellipsis">办理人：<span id="transitionUserRemarks">${val.transitionUserRemarks ?? '--'}</span></div></div>`
          } else {
            const node = cell.value
            const arr = node.split(';">')
            label = arr[0] + `;">${val.nodeName ?? '--'}&nbsp;</div>
        <div style="width:160px; overflow: hidden; position: absolute; white-space: nowrap; text-overflow: ellipsis">办理人：<span id="transitionUserRemarks">${val.transitionUserRemarks ?? '--'}</span></div></div>`
          }
        } else if (val.type === 'link') {
          if (this.target.type === 'user_transition' || this.target.style.indexOf('user_transition') !== -1) {
            const node = this.target.value
            const start = node.indexOf(`<div id="nodeName"`)
            let newNode = node
            if (start !== -1) {
              newNode = node.slice(start)
            } else {
              newNode = '<div id="nodeName" style="width:100%; overflow: hidden; position: absolute; white-space: nowrap; text-overflow: ellipsis ;">' + newNode + '&nbsp;</div>'
            }
            label = ` <div id="all" style="position: relative;text-align:left;padding:10px; width: 140px;height: 100px"><div  style="width: 160px; position: absolute; overflow: hidden; white-space: nowrap; text-overflow: ellipsis"> 条件：<span class="text">${val.remarks1 ?? '--'}</span></div>
        <div style="width: 160px; overflow: hidden; position: absolute; white-space: nowrap; text-overflow: ellipsis">子状态：<span class="text">${val.dictDataName ?? '--'}</span></div>
        <div style="width: 160px; overflow: hidden; position: absolute; white-space: nowrap; text-overflow: ellipsis">事件：<span class="text">${val.remarks2 ?? '--'}</span></div>
        <hr style="border: 1px dashed #969696"/>` + newNode
            model.setValue(this.target, label)
          }
          return
        } else {
          label = val.nodeName
        }
        if (val.type.indexOf('gateway') !== -1 && val.type !== 'gateway_explicit') {
          model.setType(cell, val.type)
        }
        if (!model.getType()) model.setType(cell, val.type)
        model.setValue(cell, label)
        if (val.type !== 'edge') model.setName(cell, val.nodeName)
      } finally {
        model.endUpdate()
        this.graph.cellEditor.stopEditing(false)
        this.graph.refresh()
      }
      this.visible = false
    },
    handleSubmit () {
      this.$confirm({
        title: this.$t('系统需要将当前流程保存后再保存为历史版本，您确认要进行此操作吗？'),
        onOk: () => {
          this.form.validateFields((errors, values) => {
            if (!errors) {
              this.axios({
                url: '/admin/workflowVersion/saveHistoryVersion',
                data: Object.assign({ workflowId: this.workflowId }, values)
              }).then(res => {
                if (res.code === 0) {
                  // this.$message.success(res.message)
                  this.onSave(this.history)
                  this.form.resetFields()
                  this.visible = !this.visible
                } else {
                  this.$message.error(res.message)
                }
              })
            }
          })
        }
      })
    },
    rollback (record) {
      this.$confirm({
        title: '您确认恢复至此版本吗？',
        onOk: () => {
          this.axios({
            url: '/admin/workflowVersion/regainHistoryVersion',
            data: {
              versionId: record.versionId,
              workflowId: record.workflowId
            }
          }).then(res => {
            if (res.code === 0) {
              this.visibleHistory = false
              this.axios({
                url: '/admin/workflow/initGraph',
                data: { workflowId: this.workflowId }
              }).then(res => {
                this.data = res.result
              })
              document.getElementById('iframe').contentWindow.location.reload(true)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .ant-drawer-body {
  height: 100%;
  overflow: hidden;
}
iframe {
  padding: 0 !important;
}
</style>
