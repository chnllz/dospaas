<template>
  <div class="page">
    <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
      <a-card size="small" :title="$t('搜索')">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
          <a-button
            @click="
              () => {
                queryParam = {}
                queryParam.callTime = [
                  moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
                  moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
                ]
                callTime = moment().startOf('month')
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
            <a-form-item :label="$t('呼叫时间')">
              <a-month-picker v-model="callTime" :allowClear="false" @change="onChange" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <a-space>
      <a-button v-action:export icon="download" @click="handleExport()">{{ $t('导出') }}</a-button>
    </a-space>
    <s-table
      ref="table"
      class="table-fill"
      size="small"
      rowKey="username"
      bordered
      :scroll="{ x: true, y: true }"
      :columns="columns"
      :showPagination="false"
      :data="loadDataTable"
    ></s-table>
    <general-export ref="generalExport" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('callcenter'),
  components: {
    GeneralExport: () => import('@/views/admin/Table/GeneralExport')
  },
  data () {
    return {
      // 时间组件
      callTime: this.moment().startOf('month'),
      advanced: false,
      // 搜索参数
      queryParam: {
        callTime: [this.moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'), this.moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')]
      },
      // 表头
      columns: [{
        title: '呼叫时间',
        dataIndex: 'recordTime',
        align: 'center',
        width: 120
      }, {
        title: 'IVR转出',
        children: [
          {
            title: '转PAPCN上海',
            dataIndex: 'transferToPapcnShanghai',
            align: 'center',
            width: 120
          }, {
            title: '转洗衣机',
            dataIndex: 'transferWashingMachine',
            align: 'center',
            width: 120
          }, {
            title: '转PAPCN杭州',
            dataIndex: 'transferToPapcnHangzhou',
            align: 'center',
            width: 120
          }, {
            title: '转成都',
            dataIndex: 'transferToChengdu',
            align: 'center',
            width: 120
          }
        ]
      }, {
        title: 'IVR转入',
        children: [
          {
            title: 'PAPCN杭州转入PAPCN上海',
            dataIndex: 'papcnHangzhouTransferredToPapcnShanghai',
            align: 'center',
            width: 120
          }, {
            title: 'PAPCN杭州转入洗衣机',
            dataIndex: 'papcnHangzhouTransferToWashingMachine',
            align: 'center',
            width: 120
          }, {
            title: '成都转入PAPCN上海',
            dataIndex: 'chengduTransferredToPapcnShanghai',
            align: 'center',
            width: 120
          }, {
            title: '成都转入洗衣机',
            dataIndex: 'chengduTransferToWashingMachine',
            align: 'center',
            width: 120
          }
        ]
      }, {
        title: '座席转出',
        children: [
          {
            title: 'PAPCN上海转洗衣机',
            dataIndex: 'papcnShanghaiTransferWashingMachine',
            align: 'center',
            width: 120
          }, {
            title: 'PAPCN上海转PAPCN杭州',
            dataIndex: 'papcnShanghaiToPapcnHangzhou',
            align: 'center',
            width: 120
          }, {
            title: 'PAPCN上海转成都',
            dataIndex: 'papcnShanghaiToChengdu',
            align: 'center',
            width: 120
          }, {
            title: '洗衣机转PAPCN上海',
            dataIndex: 'washingMachineToPapcnShanghai',
            align: 'center',
            width: 120
          }, {
            title: '洗衣机转PAPCN杭州',
            dataIndex: 'washingMachineToPapcnHangzhou',
            align: 'center',
            width: 120
          }, {
            title: '洗衣机转成都',
            dataIndex: 'washingMachineToChengdu',
            align: 'center',
            width: 120
          }
        ]
      }, {
        title: '座席转入',
        children: [
          {
            title: 'PAPCN杭州转入PAPCN上海',
            dataIndex: 'agentPapcnHangzhouTransferredToPapcnShanghai',
            align: 'center',
            width: 120
          }, {
            title: 'PAPCN杭州转入洗衣机',
            dataIndex: 'agentPapcnHangzhouTransferToWashingMachine',
            align: 'center',
            width: 120
          }, {
            title: '成都转入PAPCN上海',
            dataIndex: 'agentChengduTransferredToPapcnShanghai',
            align: 'center',
            width: 120
          }, {
            title: '成都转入洗衣机',
            dataIndex: 'agentChengduTransferToWashingMachine',
            align: 'center',
            width: 120
          }
        ]
      }]
    }
  },
  methods: {
    onChange (e) {
      this.callTime = this.moment(e).startOf('month')
      this.queryParam.callTime = [this.moment(e).startOf('month').format('YYYY-MM-DD HH:mm:ss'), this.moment(e).endOf('month').format('YYYY-MM-DD HH:mm:ss')]
    },
    loadDataTable (parameter) {
      return this.axios({
        url: '/callcenter/callTransfer/initInterconnectionCall',
        data: Object.assign(parameter, this.queryParam, { pageNo: 1, pageSize: 999 })
      }).then(res => {
        return res.result
      })
    },
    getSearchDate (date, dateString) {
      this.queryParam.callTime = dateString
    },
    handleExport () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'ExportInterconnectionCallTask',
        parameter: {
          condition: this.queryParam
        }
      })
    }
  }
}
</script>
