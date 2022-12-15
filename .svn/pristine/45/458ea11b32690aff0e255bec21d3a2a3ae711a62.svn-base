export const listButton = [
  {
    attribute: `{
      template: '<a-button icon="plus" type= "primary" @click="parent.handleCreate()">{{parent.$t("创建流程")}}</a-button>',
      data: () => {
       return {
        parent: _this
       }
      }
    }`,
    usage: 'flow_create',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '10',
    listOrder: '10',
    position: 'bar',
    name: '创建流程',
    style: 'primary'
  }, {
    attribute: `{
      template: '<a-dropdown><a-button icon="plus" type= "primary" @click="parent.getPermittedWorkflows()">{{parent.$t("创建流程")}}</a-button><a-menu slot="overlay" @click="(payload) => parent.handMenu(payload)"><a-menu-item :key="index" v-for="(item,index) in parent.permittedWorkflows">{{ item.workflowName }}</a-menu-item></a-menu></a-dropdown>',
      data: () => {
       return {
        parent: _this
       }
      }
    }`,
    usage: 'flow_create_center',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '220',
    listOrder: '220',
    position: 'bar',
    name: '创建流程(流程中心)',
    style: 'primary'
  }, {
    attribute: `{
      template: '<a-button @click="parent.handleBatchJump()" :disabled="!parent.selectedRowKeys.length">{{parent.$t("批量流转")}}</a-button>',
      data: () => {
        return {
         parent: _this
        }
      }
    }`,
    usage: 'flow_batchjump',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '20',
    listOrder: '20',
    position: 'bar',
    name: '批量流转',
    style: 'default'
  }, {
    attribute: `{
      template: '<a-button @click="parent.handleBatchTerminate()" :disabled="!parent.selectedRowKeys.length">{{parent.$t("批量取消")}}</a-button>',
      data: () => {
        return {
         parent: _this
        }
      }
    }`,
    usage: 'flow_batch_terminate',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '30',
    listOrder: '30',
    position: 'bar',
    name: '批量取消',
    style: 'default'
  }, {
    attribute: `{
      template: '<a-button @click="parent.handleBatchSearch()">{{parent.$t("批量搜索")}}</a-button>',
      data: () => {
        return {
         parent: _this
        }
      }
    }`,
    usage: 'sys_bulksearch',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '40',
    listOrder: '40',
    position: 'bar',
    name: '批量搜索',
    style: 'default'
  }, {
    attribute: `{
      template: '<a-button :disabled="parent.selectedRowKeys && parent.selectedRowKeys.length === 0" type="primary" @click="parent.handleConfirm()">{{parent.$t("确认选择")}}</a-button>',
      data: () => {
       return {
        parent: _this
       }
      }
    }`,
    usage: 'sys_confirm',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '300',
    listOrder: '300',
    position: 'bar',
    name: '确认选择',
    style: 'primary'
  }, {
    attribute: `{
      template: '<a-button :disabled="parent.selectedRowKeys && parent.selectedRowKeys.length === 0" type="primary" @click="parent.handleConfirmClose()">{{parent.$t("确认选择并关闭")}}</a-button>',
      data: () => {
       return {
        parent: _this
       }
      }
    }`,
    usage: 'sys_confirm_close',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '310',
    listOrder: '310',
    position: 'bar',
    name: '确认选择并关闭',
    style: 'primary'
  }, {
    attribute: `{
      template: '<a-button icon="plus" type="primary" @click="handleAdd()">{{parent.$t("添加")}}</a-button>',
      data: () => {
       return {
        parent: _this
       }
      },
      methods: {
        handleAdd () {
          this.parent.onShow({ title: this.parent.$t('添加'), url: '/admin/general/process', action: 'add' })
        }
      }
    }`,
    usage: 'sys_add',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '50',
    listOrder: '50',
    position: 'bar',
    name: '添加',
    style: 'primary'
  }, {
    attribute: `{
      template: '<a-button icon="delete" @click="parent.onDelete()" type="danger" :disabled="parent.selectedRowKeys.length==0">{{parent.$t("批量删除")}}</a-button>',
      data: () => {
        return {
         parent: _this
        }
      }
    }`,
    usage: 'sys_bulkdelete',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '60',
    listOrder: '60',
    position: 'bar',
    name: '批量删除',
    style: 'default'
  }, {
    attribute: `{
      template: '<a-button icon="edit" @click="parent.onBulkEdit()">{{parent.$t("批量编辑")}}</a-button>',
      data: () => {
        return {
         parent: _this
        }
      }
    }`,
    usage: 'sys_bulkedit',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '70',
    listOrder: '70',
    position: 'bar',
    name: '批量编辑',
    style: 'default'
  }, {
    attribute: `{
      template: '<a-button icon="upload" @click="parent.onImport({barData: barData})">{{parent.$t("导入")}}</a-button>',
      data: () => {
        return {
          parent: _this,
          barData: barData
        }
      }
    }`,
    usage: 'bar_import',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '80',
    listOrder: '80',
    position: 'bar',
    name: '导入',
    style: 'default'
  }, {
    attribute: `{
      template: '<a-button icon="download" @click="parent.onExport()">{{parent.$t("导出")}}</a-button>',
      data: () => {
        return {
          parent: _this
        }
      }
    }`,
    usage: 'bar_export',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '90',
    listOrder: '90',
    position: 'bar',
    name: '导出',
    style: 'default'
  }, {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleView(record)">{{parent.$t("查看")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_view',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '100',
    listOrder: '100',
    position: 'line',
    name: '查看',
    style: 'default'
  }, {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleProcess(record)">{{parent.$t("办理")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_process',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '110',
    listOrder: '110',
    position: 'line',
    name: '办理',
    style: 'default'
  }, {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleTakeFlow(record)">{{parent.$t("领取")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_take',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '120',
    listOrder: '120',
    position: 'line',
    name: '领取',
    style: 'default'
  }, {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleRemarks(record)">{{parent.$t("备注")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_remarks',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '130',
    listOrder: '130',
    position: 'line',
    name: '备注',
    style: 'default'
  }, {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleUrge(record)">{{parent.$t("催办")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_urge',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '140',
    listOrder: '140',
    position: 'line',
    name: '催办',
    style: 'default'
  }, {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleTerminate(record)">{{parent.$t("取消")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_terminate',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '150',
    listOrder: '150',
    position: 'line',
    name: '取消',
    style: 'default'
  },
  {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleJump(record)">{{parent.$t("流转")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_jump',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '170',
    listOrder: '170',
    position: 'line',
    name: '流转',
    style: 'default'
  }, {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleTransfer(record)">{{parent.$t("转办")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_transfer',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '180',
    listOrder: '180',
    position: 'line',
    name: '转办',
    style: 'default'
  }, {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleTakeProcess(record)">{{parent.$t("领办")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_takeprocess',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '190',
    listOrder: '190',
    position: 'line',
    name: '领办',
    style: 'default'
  }, {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleHangUp(record)">{{parent.$t("挂起")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_hangup',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '230',
    listOrder: '230',
    position: 'line',
    name: '挂起',
    style: 'default'
  }, {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleActivate(record)">{{parent.$t("激活")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_activate',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '240',
    listOrder: '240',
    position: 'line',
    name: '激活',
    style: 'default'
  }, {
    attribute: `{
      template: '<a href= "javascript:;" @click="handleEdit()">{{parent.$t("详情")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      },
      methods: {
        handleEdit () {
          this.parent.onShow({ title: this.parent.$t('详情'), url: '/admin/general/process', record: this.record, action: 'edit' })
        }
      }
    }`,
    usage: 'bar_detail',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '160',
    listOrder: '160',
    position: 'line',
    name: '详情',
    style: 'default'
  }, {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.onDelete({ record: record })">{{parent.$t("删除")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'sys_delete',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '210',
    listOrder: '210',
    position: 'line',
    name: '删除',
    style: 'default',
    remarks: '默认为删除数据表数据。开启了“流程功能”时，删除数据表数据及对应的流程。'
  }, {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleSubscribe(record)">{{parent.$t("关注")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_subscribe',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '260',
    listOrder: '260',
    position: 'line',
    name: '关注',
    style: 'default',
    remarks: ''
  }, {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleUnsubscribe(record)">{{parent.$t("取消关注")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_unsubscribe',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '270',
    listOrder: '270',
    position: 'line',
    name: '取消关注',
    style: 'default',
    remarks: ''
  }, {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleSelect(record)">{{parent.$t("选择")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_choose',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '330',
    listOrder: '330',
    position: 'line',
    name: '选择',
    style: 'default'
  }, {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleSelectClose(record)">{{parent.$t("选择并关闭")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_choose_close',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '340',
    listOrder: '340',
    position: 'line',
    name: '选择并关闭',
    style: 'default'
  }
]
export const cardButton = [
  {
    attribute: `{
      template: '<a-button icon="plus" type= "primary" @click="handleAdd()">{{parent.$t("添加")}}</a-button>',
      data: () => {
        return {
          parent: _this
        }
      },
      methods: {
        handleAdd () {
          this.parent.onShow({ title: this.parent.$t('添加'), url: '/admin/general/process', action: 'add' })
        }
      }
    }`,
    usage: 'sys_add',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '10',
    listOrder: '10',
    position: 'bar',
    name: '添加',
    style: 'primary'
  },
  {
    attribute: `{
      template: '<a-button icon="delete" @click="parent.onDelete()" type="danger" :disabled="parent.selectedRowKeys.length==0">{{parent.$t("批量删除")}}</a-button>',
      data: () => {
        return {
          parent: _this
        }
      }
    }`,
    usage: 'sys_bulkdelete',
    buttonType: '1',
    usePermissions: null,
    visible: false,
    id: '20',
    listOrder: '20',
    position: 'bar',
    name: '批量删除',
    style: 'default'
  },
  {
    attribute: `{
      template: '<a-button icon="edit" @click="parent.onBulkEdit()">{{parent.$t("批量编辑")}}</a-button>',
      data: () => {
        return {
          parent: _this
        }
      }
    }`,
    usage: 'sys_bulkedit',
    buttonType: '1',
    usePermissions: null,
    visible: false,
    id: '30',
    listOrder: '30',
    position: 'bar',
    name: '批量编辑',
    style: 'default'
  },
  {
    attribute: `{
      template: '<a-button icon="upload" @click="parent.onImport({barData: barData})">{{parent.$t("导入")}}</a-button>',
      data: () => {
        return {
          parent: _this,
          barData: barData
        }
      }
    }`,
    usage: 'bar_import',
    buttonType: '1',
    usePermissions: null,
    visible: false,
    id: '40',
    listOrder: '40',
    position: 'bar',
    name: '导入',
    style: 'default'
  },
  {
    attribute: `{
      template: '<a-button icon="download" @click="parent.onExport()">{{parent.$t("导出")}}</a-button>',
      data: () => {
        return {
          parent: _this
        }
      }
    }`,
    usage: 'bar_export',
    buttonType: '1',
    usePermissions: null,
    visible: false,
    id: '50',
    listOrder: '50',
    position: 'bar',
    name: '导出',
    style: 'default'
  },
  {
    attribute: `{
      template: '<a href= "javascript:;" @click="handleEdit()">{{parent.$t("详情")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      },
      methods: {
        handleEdit () {
          this.parent.onShow({ title: this.parent.$t('详情'), url: '/admin/general/process', record: this.record, action: 'edit' })
        }
      }
    }`,
    usage: 'bar_detail',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '60',
    listOrder: '60',
    position: 'line',
    name: '选中',
    style: 'default'
  },
  {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.onDelete({ record: record })">{{parent.$t("删除")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'sys_delete',
    buttonType: '1',
    usePermissions: null,
    visible: false,
    id: '70',
    listOrder: '70',
    position: 'line',
    name: '删除',
    style: 'default'
  },
  {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.onDelete({ record: record })">{{parent.$t("一键复制")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'sys_copy',
    buttonType: '1',
    usePermissions: null,
    visible: false,
    id: '80',
    listOrder: '80',
    position: 'line',
    name: '一键复制',
    style: 'default'
  }
]
export const menuAllData = [
  {
    id: 10,
    listOrder: 10,
    name: '办理',
    usage: 'bar_handle',
    buttonType: 1,
    visible: true,
    style: 'primary',
    attribute: `{
      template: '<a-button type="primary" :loading="parent.loading" @click="parent.handleSubmit()">{{parent.$t("办理")}}</a-button>',
      data: () => {
        return {
          parent: _this
        }
      }
    }`,
    usePermissions: null
  },
  {
    id: 20,
    listOrder: 20,
    name: '关闭',
    usage: 'bar_cancel',
    buttonType: 1,
    visible: true,
    style: 'default',
    attribute: `{
      template: '<a-button type="default" :loading="parent.loading" @click="parent.handleCancel()">{{parent.$t("关闭")}}</a-button>',
      data: () => {
        return {
          parent: _this
        }
      }
    }`,
    usePermissions: null
  },
  {
    id: 30,
    listOrder: 30,
    name: '转办',
    usage: 'bar_complaint',
    buttonType: 1,
    visible: false,
    style: 'default',
    attribute: `{
      template: '<a-button type="default" :loading="parent.loading" @click="parent.handleTransfer()">{{parent.$t("转办")}}</a-button>',
      data: () => {
        return {
          parent: _this
        }
      }
    }`,
    usePermissions: null
  },
  {
    id: 40,
    listOrder: 40,
    name: '传阅',
    usage: 'bar_bcirculated',
    buttonType: 1,
    visible: false,
    style: 'default',
    attribute: `{
      template: '<a-button type="default" :loading="parent.loading" @click="parent.handleSubmit()">{{parent.$t("传阅")}}</a-button>',
      data: () => {
        return {
          parent: _this
        }
      }
    }`,
    usePermissions: null
  },
  {
    id: 50,
    listOrder: 50,
    name: '特批',
    usage: 'bar_special',
    buttonType: 1,
    visible: false,
    style: 'default',
    attribute: `{
      template: '<a-button type="default" :loading="parent.loading" @click="parent.handleSubmit()">{{parent.$t("特批")}}</a-button>',
      data: () => {
        return {
          parent: _this
        }
      }
    }`,
    usePermissions: null
  },
  {
    id: 60,
    listOrder: 60,
    name: '取消',
    usage: 'bar_terminate',
    buttonType: 1,
    visible: false,
    style: 'default',
    attribute: `{
      template: '<a-button type="default" :loading="parent.loading" @click="parent.handleTerminate()">{{parent.$t("取消")}}</a-button>',
      data: () => {
        return {
          parent: _this
        }
      }
    }`,
    usePermissions: null
  },
  {
    id: 70,
    listOrder: 70,
    name: '退回发起人',
    usage: 'bar_return',
    buttonType: 1,
    visible: false,
    style: 'default',
    attribute: `{
      template: '<a-button type="default" :loading="parent.loading" @click="parent.handleSubmit()">{{parent.$t("退回发起人")}}</a-button>',
      data: () => {
        return {
          parent: _this
        }
      }
    }`,
    usePermissions: null
  },
  {
    id: 80,
    listOrder: 80,
    name: '备注',
    usage: 'bar_remarks',
    buttonType: 1,
    visible: false,
    style: 'default',
    attribute: `{
      template: '<a-button type="default" :loading="parent.loading" @click="parent.handleRemarks()">{{parent.$t("备注")}}</a-button>',
      data: () => {
        return {
          parent: _this
        }
      }
    }`,
    usePermissions: null
  },
  {
    id: 90,
    listOrder: 90,
    name: '仅保存',
    usage: 'bar_save',
    buttonType: 1,
    visible: false,
    style: 'primary',
    attribute: `{
      template: '<a-button type="default" :loading="parent.loading" @click="parent.handleOnlySave()">{{parent.$t("仅保存")}}</a-button>',
      data: () => {
        return {
          parent: _this
        }
      }
    }`,
    usePermissions: null
  },
  {
    id: 100,
    listOrder: 100,
    name: '仅保存并关闭',
    usage: 'bar_save_close',
    buttonType: 1,
    visible: false,
    style: 'primary',
    attribute: `{
      template: '<a-button type="default" :loading="parent.loading" @click="parent.handleOnlySaveClose()">{{parent.$t("仅保存并关闭")}}</a-button>',
      data: () => {
        return {
          parent: _this
        }
      }
    }`,
    usePermissions: null
  }
]
export const extendButton = [
  {
    attribute: `{
      template: '<a-button type="primary" :loading="parent.loading" @click="parent.handleSubmit">{{parent.$t("保存")}}</a-button>',
      data: () => {
        return {
          parent: _this
        }
      }
    }`,
    usage: 'sys_save',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '10',
    listOrder: '10',
    name: '保存',
    style: 'primary'
  },
  {
    attribute: `{
      template: '<a-button @click="parent.visible=!parent.visible">{{parent.$t("关闭")}}</a-button>',
      data: () => {
        return {
          parent: _this
        }
      }
    }`,
    usage: 'sys_cancel',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '20',
    listOrder: '20',
    name: '关闭',
    style: 'default'
  }
]
export const workflowButton = [
  {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleView(record)">{{parent.$t("查看")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_view',
    disabled: '1',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '30',
    listOrder: '30',
    position: 'line',
    name: '查看',
    style: 'default'
  },
  {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleProcess(record)">{{parent.$t("办理")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_process',
    disabled: '1',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '40',
    listOrder: '40',
    position: 'line',
    name: '办理',
    style: 'default'
  },
  {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleTakeFlow(record)">{{parent.$t("领取")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_take',
    disabled: '1',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '50',
    listOrder: '50',
    position: 'line',
    name: '领取',
    style: 'default'
  },
  {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleTakeProcess(record)">{{parent.$t("领办")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_takeprocess',
    disabled: '1',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '60',
    listOrder: '60',
    position: 'line',
    name: '领办',
    style: 'default'
  },
  {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleRemarks(record)">{{parent.$t("备注")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_remarks',
    buttonType: '1',
    usePermissions: null,
    visible: true,
    id: '70',
    listOrder: '70',
    position: 'line',
    name: '备注',
    style: 'default'
  },
  {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleUrge(record)">{{parent.$t("催办")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_urge',
    buttonType: '1',
    usePermissions: null,
    visible: false,
    id: '80',
    listOrder: '80',
    position: 'line',
    name: '催办',
    style: 'default'
  },
  {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleTerminate(record)">{{parent.$t("取消")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_terminate',
    buttonType: '1',
    usePermissions: null,
    visible: false,
    id: '90',
    listOrder: '90',
    position: 'line',
    name: '取消',
    style: 'default'
  },
  {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleJump(record)">{{parent.$t("流转")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_jump',
    buttonType: '1',
    usePermissions: null,
    visible: false,
    id: '100',
    listOrder: '100',
    position: 'line',
    name: '流转',
    style: 'default'
  },
  {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleTransfer(record)">{{parent.$t("转办")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_transfer',
    buttonType: '1',
    usePermissions: null,
    visible: false,
    id: '110',
    listOrder: '110',
    position: 'line',
    name: '转办',
    style: 'default'
  },
  {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleHangUp(record)">{{parent.$t("挂起")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_hangup',
    buttonType: '1',
    usePermissions: null,
    visible: false,
    id: '230',
    listOrder: '230',
    position: 'line',
    name: '挂起',
    style: 'default'
  }, {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleActivate(record)">{{parent.$t("激活")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_activate',
    buttonType: '1',
    usePermissions: null,
    visible: false,
    id: '240',
    listOrder: '240',
    position: 'line',
    name: '激活',
    style: 'default'
  }, {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleSubscribe(record)">{{parent.$t("关注")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_subscribe',
    buttonType: '1',
    usePermissions: null,
    visible: false,
    id: '260',
    listOrder: '260',
    position: 'line',
    name: '关注',
    style: 'default',
    remarks: ''
  }, {
    attribute: `{
      template: '<a href="javascript:;" @click="parent.handleUnsubscribe(record)">{{parent.$t("取消关注")}}</a>',
      data: () => {
        return {
          parent: _this,
          record: record
        }
      }
    }`,
    usage: 'flow_unsubscribe',
    buttonType: '1',
    usePermissions: null,
    visible: false,
    id: '270',
    listOrder: '270',
    position: 'line',
    name: '取消关注',
    style: 'default',
    remarks: ''
  }
]
export const subformWebButton = [{
  id: '10',
  listOrder: '10',
  name: '添加',
  usage: 'sys_add',
  buttonType: '1',
  position: 'bar',
  visible: true,
  style: 'primary',
  attribute: `{
      template: '<a-button icon="plus" type="primary" @click="handleAdd()">{{parent.$t("添加")}}</a-button>',
      data: () => {
        return {
          parent: _this
        }
      },
      methods: {
        handleAdd () {
          this.parent.addData()
        }
      }
    }`,
  usePermissions: null
}, {
  id: '20',
  listOrder: '20',
  name: '批量删除',
  usage: 'sys_bulkdelete',
  buttonType: '1',
  position: 'bar',
  visible: true,
  style: 'default',
  attribute: `{
      template: '<a-button icon="delete" @click="parent.onDelete()" type="danger" :disabled="parent.selectedRowKeys.length==0">{{parent.$t("批量删除")}}</a-button>',
      data: () => {
        return {
          parent: _this
        }
      }
    }`,
  usePermissions: null
}, {
  id: '61',
  listOrder: '61',
  name: '开窗选择',
  usage: 'sys_subform',
  buttonType: '1',
  position: 'bar',
  visible: false,
  style: 'default',
  // attribute: '<a-button icon="select" @click="parent.onSubform({barData: {$barData}})">{{parent.$t("开窗选择")}}</a-button>',
  attribute: `{
      template: '<a-button icon="select" @click="parent.onOpen(toolButton)">{{parent.$t("开窗选择")}}</a-button>',
      data: () => {
        return {
          parent: _this,
          toolButton: item
        }
      }
    }`,
  usePermissions: null
}]
