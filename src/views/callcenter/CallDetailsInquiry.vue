<template>
  <div class="page">
    <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false" :form="form">
      <a-card size="small" :title="$t('搜索')">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
          <a-button
            @click="
              () => {
                queryParam = {}
                searchDate = [moment().startOf('day'), moment().endOf('day')]
                queryParam.startTime = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
                queryParam.endTime = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
                $refs.treeDepartment.reset()
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
            <a-form-item label="呼叫时间">
              <a-range-picker
                v-model="searchDate"
                :ranges="{
                  今天: [moment().startOf('day'), moment().endOf('day')],
                  昨天: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
                  本周: [moment().startOf('week'), moment().endOf('week')],
                  本月: [moment().startOf('month'), moment().endOf('month')]
                }"
                showTime
                :allowClear="false"
                style="width: 100%"
                @change="getSearchDate"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="客户号码">
              <a-input v-model="queryParam.customerNumber" placeholder="" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="工号">
              <a-input v-model="queryParam.agentNumber" placeholder="" />
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
                @select="(e) => (queryParam.department = e)"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="呼叫状态">
              <a-select v-model="queryParam.callStatus" :allowClear="true">
                <a-select-option v-for="(item, index) in agentAnswerStatus" :key="index" :value="item.dictDataNumber">
                  {{ item.dictDataName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="呼叫类型">
              <a-select v-model="queryParam.callType" :allowClear="true">
                <a-select-option v-for="(item, index) in callType" :key="index" :value="item.dictDataNumber">
                  {{ item.fullDictDataName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="通话时长">
              <a-input-group compact>
                <a-input
                  v-model="queryParam.billingSecondsStart"
                  style="width: calc(50% - 15px)"
                  placeholder="单位: 秒"
                />
                <a-input
                  style="width: 30px; border-left: 0; pointer-events: none; backgroundcolor: #fff"
                  placeholder="~"
                  disabled
                />
                <a-input v-model="queryParam.billingSecondsEnd" style="width: calc(50% - 15px); border-left: 0" />
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="振铃时长">
              <a-input-group compact>
                <a-input v-model="queryParam.ringTimeStart" style="width: calc(50% - 15px)" placeholder="单位: 秒" />
                <a-input
                  style="width: 30px; border-left: 0; pointer-events: none; backgroundcolor: #fff"
                  placeholder="~"
                  disabled
                />
                <a-input v-model="queryParam.ringTimeEnd" style="width: calc(50% - 15px); border-left: 0" />
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="呼入满意度">
              <a-select v-model="queryParam.commentIn" :allowClear="true">
                <a-select-option v-for="(item, index) in comment" :key="index" :value="item.dictDataNumber">
                  {{ item.fullDictDataName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="呼出满意度">
              <a-select v-model="queryParam.commentOut" :allowClear="true">
                <a-select-option v-for="(item, index) in commentout" :key="index" :value="item.dictDataNumber">
                  {{ item.fullDictDataName }}
                </a-select-option>
              </a-select>
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
      size="small"
      class="table-fill"
      rowKey="id"
      :scroll="{ x: true, y: true }"
      :sorter="sorter"
      :columns="columns"
      :data="loadDataTable"
    ></s-table>
    <general-export ref="generalExport" />
  </div>
</template>
<script>
export default {

  components: {
    GeneralExport: () => import('@/views/admin/Table/GeneralExport')
  },
  data () {
    return {
      form: this.$form.createForm(this),
      scope: this,
      advanced: false,
      // 时间组件
      searchDate: [this.moment().startOf('day'), this.moment().endOf('day')],
      // 搜索参数
      queryParam: {
        startTime: this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      },
      agentAnswerStatus: [],
      callType: [],
      comment: [],
      commentout: [],
      sorter: { field: 'id', order: 'descend' },
      parameter: { sortField: 'id', sortOrder: 'descend' },
      // 表头
      columns: [{
        title: 'ID',
        dataIndex: 'id',
        width: 80,
        sorter: true
      }, {
        title: '呼叫时间',
        dataIndex: 'callTime',
        width: 180
      }, {
        title: '部门',
        dataIndex: 'department',
        width: 180
      }, {
        title: '姓名',
        dataIndex: 'agentRealName',
        width: 180
      }, {
        title: '工号',
        dataIndex: 'agentNumber',
        width: 180
      }, {
        title: '客户号码',
        dataIndex: 'customerNumber',
        width: 180
      }, {
        title: '呼叫类型',
        dataIndex: 'callType',
        width: 180
      }, {
        title: '呼叫状态',
        dataIndex: 'callStatus',
        width: 180
      }, {
        title: '等待时长(呼入)/s',
        dataIndex: 'waitDuration',
        width: 180
      }, {
        title: 'IVR开始时间',
        dataIndex: 'firstIvrEnterTime',
        width: 180
      }, {
        title: 'ACD开始时间',
        dataIndex: 'firstQueueStartTime',
        width: 180
      }, {
        title: 'IVR持续时长/s',
        dataIndex: 'ivrDuration',
        width: 180
      }, {
        title: 'ACD应答时长/s',
        dataIndex: 'requestAgentWaitTime',
        width: 180
      }, {
        title: '分配坐席时间',
        dataIndex: 'callAgentTime',
        width: 180
      }, {
        title: '振铃时长/s',
        dataIndex: 'ringTime',
        width: 180
      }, {
        title: '放弃时间',
        dataIndex: 'queueAbandonTime',
        width: 180
      }, {
        title: '通话开始时间',
        dataIndex: 'answerTime',
        width: 180
      }, {
        title: '坐席挂断时间',
        dataIndex: 'hangupTime',
        width: 180
      }, {
        title: '通话时长/s',
        dataIndex: 'billingSeconds',
        width: 180
      }, {
        title: '保持开始时间',
        dataIndex: 'firstHoldStartTime',
        width: 180
      }, {
        title: '保持结束时间',
        dataIndex: 'firstHoldEndTime',
        width: 180
      }, {
        title: '保持时长/s',
        dataIndex: 'firstHoldTime',
        width: 180
      }, {
        title: '保持次数',
        dataIndex: 'holdTimes',
        width: 180
      }, {
        title: '是否转接满意度',
        dataIndex: 'transferComment',
        width: 180
      }, {
        title: '用户评价结果',
        dataIndex: 'comment',
        width: 180
      }]
    }
  },
  mounted () {
    this.getField()
  },
  methods: {
    getField () {
      // 呼叫状态、呼叫类型、呼入满意度、呼出满意度
      const arr = [{
        alias: 'callcenter_disposition',
        get: 'agentAnswerStatus'
      }, {
        alias: 'callcenter_call_type',
        get: 'callType'
      }, {
        alias: 'callcenter_comment_type',
        get: 'comment'
      }, {
        alias: 'callcenter_comment_out_type',
        get: 'commentout'
      }]
      arr.forEach((item) => {
        this.axios({
          url: 'admin/dict/initData',
          data: {
            dictCategoryNumber: item.alias
          }
        }).then(res => {
          if (res.code === 0) {
            this[item.get] = res.result
            if (['comment', 'commentout'].includes(item.get)) {
              this[item.get].push({
                dictDataNumber: '0',
                fullDictDataName: '未转满意度'
              })
            }
          }
        })
      })
    },
    loadDataTable (parameter) {
      this.parameter.sortField = parameter.sortField
      this.parameter.sortOrder = parameter.sortOrder
      return this.axios({
        url: '/callcenter/agentTraffic/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    handleExport () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'ExportAgentTrafficDetailsTask',
        parameter: {
          condition: {
            req: Object.assign(this.parameter, this.queryParam),
            type: 'agentTraffic'
          }
        }
      })
    },
    getSearchDate (date, dateString) {
      this.searchDate = date
      this.queryParam.startTime = dateString[0]
      this.queryParam.endTime = dateString[1]
    }
  }
}
</script>
