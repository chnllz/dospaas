<template>
  <div class="page">
    <a-form :form="form" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
      <a-card size="small" :title="$t('搜索')">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
          <a-button
            @click="
              () => {
                queryParam = {}
                queryParam.callTime = [
                  moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                  moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
                ]
                callTime = [moment().startOf('day'), moment().endOf('day')]
                $refs.treeDepartment.reset()
                $refs.table.refresh(true)
              }
            "
          >
            {{ $t('重置') }}
          </a-button>
        </a-space>
        <a-row class="form normal">
          <a-col :span="6">
            <a-form-item :label="$t('呼叫时间')">
              <a-range-picker
                v-model="callTime"
                :ranges="{
                  [$t('今天')]: [moment().startOf('day'), moment().endOf('day')],
                  [$t('昨天')]: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
                  [$t('本周')]: [moment().startOf('week'), moment().endOf('week')],
                  [$t('本月')]: [moment().startOf('month'), moment().endOf('month')]
                }"
                showTime
                :allowClear="false"
                format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
                @change="getSearchDate"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('客户号码')">
              <a-input v-model="queryParam.customerNumber" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('被磋商电话号码')">
              <a-input v-model="queryParam.conferenceNumber" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('部门')">
              <data-picker
                ref="treeDepartment"
                :placeholder="$t('请选择部门')"
                name="department"
                :multiple="true"
                parentId="parentDepartmentId"
                displayType="tree"
                url="/admin/department/init"
                searchUrl="/admin/search/departmentSearch"
                :scope="scope"
                :optionsConversion="
                  (list, displayType, searchType) => {
                    if (searchType) {
                      return list.map((item) => {
                        const obj = item
                        obj.key = item.departmentId
                        obj.label = item.fullDepartmentName
                        return obj
                      })
                    } else {
                      return list.map((item) => {
                        const obj = item
                        obj.key = item.departmentId
                        obj.label = item.departmentName
                        return obj
                      })
                    }
                  }
                "
                @select="(e) => (queryParam.transferDepartment = e)"
              />
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
      :scroll="{ y: true }"
      size="small"
      rowKey="username"
      :columns="columns"
      :data="loadDataTable"
      :sorter="{ field: 'id', order: 'descend' }"
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
      form: this.$form.createForm(this),
      scope: this,
      // 时间组件
      callTime: [this.moment().startOf('day'), this.moment().endOf('day')],
      // 搜索参数
      queryParam: {
        callTime: [this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')]
      },
      // 表头
      columns: [{
        title: 'ID',
        dataIndex: 'id',
        width: 80
      }, {
        title: '呼叫时间',
        dataIndex: 'callTime',
        width: 120
      }, {
        title: '部门',
        dataIndex: 'departmentName',
        width: 120
      }, {
        title: '姓名',
        dataIndex: 'username',
        width: 120
      }, {
        title: '工号',
        dataIndex: 'agentNumber',
        width: 120
      }, {
        title: '来电接起时间',
        dataIndex: 'answerTime',
        width: 120
      }, {
        title: '客户号码',
        dataIndex: 'customerNumber',
        width: 120
      }, {
        title: '磋商开始时间',
        dataIndex: 'conferenceTime',
        width: 120
      }, {
        title: '磋商结束时间',
        dataIndex: 'hangupTime',
        width: 120
      }, {
        title: '磋商通话时长/s',
        dataIndex: 'negotiateCallDuration',
        width: 120
      }, {
        title: '被磋商电话号码',
        dataIndex: 'conferenceNumber',
        width: 120
      }]
    }
  },
  methods: {
    loadDataTable (parameter) {
      return this.axios({
        url: '/callcenter/callTransfer/initNegotiationCall',
        data: Object.assign(parameter, this.queryParam)
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
        className: 'ExportNegotiationCallTask',
        setMenuName: true,
        parameter: {
          condition: this.queryParam
        }
      })
    }
  }
}
</script>
