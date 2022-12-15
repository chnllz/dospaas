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
                searchDate = [moment().startOf('day'), moment().endOf('day')]
                queryParam.startTime = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
                queryParam.endTime = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
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
            <a-form-item label="呼叫类型">
              <a-select v-model="queryParam.callType" :allowClear="true">
                <a-select-option v-for="(item, index) in callType" :key="index" :value="item.dictDataNumber">
                  {{ item.fullDictDataName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="客户号码">
              <a-input v-model="queryParam.source" placeholder="" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="坐席号码">
              <a-input v-model="queryParam.agentNumber" placeholder="" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="呼叫状态">
              <a-select v-model="queryParam.callStatus" :allowClear="true">
                <a-select-option v-for="(item, index) in callStatus" :key="index" :value="item.dictDataNumber">
                  {{ item.dictDataName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="总呼叫时长">
              <a-input-group compact>
                <a-input
                  v-model="queryParam.callDurationStart"
                  style="width: calc(50% - 15px)"
                  placeholder="单位: 分钟"
                />
                <a-input
                  style="width: 30px; border-left: 0; pointer-events: none; backgroundcolor: #fff"
                  placeholder="~"
                  disabled
                />
                <a-input v-model="queryParam.callDurationEnd" style="width: calc(50% - 15px); border-left: 0" />
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="通话总时长">
              <a-input-group compact>
                <a-input v-model="queryParam.durationStart" style="width: calc(50% - 15px)" placeholder="单位: 分钟" />
                <a-input
                  style="width: 30px; border-left: 0; pointer-events: none; backgroundcolor: #fff"
                  placeholder="~"
                  disabled
                />
                <a-input v-model="queryParam.durationEnd" style="width: calc(50% - 15px); border-left: 0" />
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="通话挂断方">
              <a-select v-model="queryParam.hangup" :allowClear="true">
                <a-select-option v-for="(item, index) in hangup" :key="index" :value="item.dictDataNumber">
                  {{ item.fullDictDataName }}
                </a-select-option>
              </a-select>
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
      :columns="columns"
      :data="loadDataTable"
      :sorter="sorter"
    >
      <div slot="action" slot-scope="text, record">
        <a @click="handleDetail(record)">详情</a>
        <a-divider type="vertical" />
        <a @click="handlePlayback(record)">录音播放</a>
        <a-divider type="vertical" />
        <a @click="handleDownload(record)">录音下载</a>
      </div>
    </s-table>
    <general-export ref="generalExport" />
    <call-record-info ref="CallRecordInfo" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    CallRecordInfo: () => import('./CallRecordInfo'),
    GeneralExport: () => import('@/views/admin/Table/GeneralExport')
  },
  data () {
    return {
      // 时间组件
      searchDate: null,
      advanced: false,
      // 搜索参数
      parameter: { sortField: 'id', sortOrder: 'descend' },
      queryParam: {},
      callStatus: [],
      callType: [],
      hangup: [],
      comment: [],
      commentout: [],
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        align: 'center',
        width: 200,
        scopedSlots: { customRender: 'action' }
      }, {
        title: this.$t('ID'),
        dataIndex: 'id',
        width: 80,
        sorter: true
      }, {
        title: this.$t('呼叫开始时间'),
        dataIndex: 'callTime',
        sorter: true,
        width: 200
      }, {
        title: this.$t('呼叫类型'),
        dataIndex: 'callType',
        sorter: true,
        width: 200
      }, {
        title: this.$t('呼叫状态'),
        width: 200,
        dataIndex: 'callStatus'
      }, {
        title: this.$t('客户号码'),
        width: 200,
        dataIndex: 'customerNumber'
      }, {
        title: this.$t('号码归属地省份'),
        width: 200,
        dataIndex: 'customerNumberProvince'
      }, {
        title: this.$t('号码归属地城市'),
        width: 200,
        dataIndex: 'customerNumberCity'
      }, {
        title: this.$t('坐席号码'),
        width: 200,
        dataIndex: 'agentNumber'
      }, {
        title: this.$t('坐席设备号'),
        width: 200,
        dataIndex: 'agentDevice'
      }, {
        title: this.$t('坐席名称'),
        width: 200,
        dataIndex: 'agentRealName'
      }, {
        title: this.$t('坐席所属队列'),
        width: 200,
        dataIndex: 'agentFromQueue'
      }, {
        title: this.$t('接听时间'),
        width: 200,
        dataIndex: 'answerTime'
      }, {
        title: this.$t('振铃时长'),
        width: 200,
        dataIndex: 'ringTime'
      }, {
        title: this.$t('通话时长'),
        width: 200,
        dataIndex: 'billingSeconds'
      }, {
        title: this.$t('呼叫总时长'),
        width: 200,
        dataIndex: 'duration'
      }, {
        title: this.$t('计费分钟数'),
        width: 200,
        dataIndex: 'billingMinutes'
      }, {
        title: this.$t('播报分机号时长'),
        width: 200,
        dataIndex: 'playAgentTime'
      }, {
        title: this.$t('请求人工等待总时长'),
        width: 200,
        dataIndex: 'requestAgentWaitTime'
      }, {
        title: this.$t('首次进入IVR的时间'),
        width: 200,
        dataIndex: 'firstIvrEnterTime'
      }, {
        title: this.$t('首次进入IVR的名称'),
        width: 200,
        dataIndex: 'firstIvrName'
      }, {
        title: this.$t('首次进入IVR后的按键'),
        width: 200,
        dataIndex: 'firstIvrPressKey'
      }, {
        title: this.$t('首次IVR的按键时间'),
        width: 200,
        dataIndex: 'firstIvrPressKeyTime'
      }, {
        title: this.$t('首次进入队列的时间'),
        width: 200,
        dataIndex: 'firstQueueStartTime'
      }, {
        title: this.$t('首次进入队列的队列号码'),
        width: 200,
        dataIndex: 'firstQueueNumber'
      }, {
        title: this.$t('首次进入队列的队列名称'),
        width: 200,
        dataIndex: 'firstQueueName'
      }, {
        title: this.$t('首次保持开始时间'),
        width: 200,
        dataIndex: 'firstHoldStartTime'
      }, {
        title: this.$t('首次保持结束时间'),
        width: 200,
        dataIndex: 'firstHoldEndTime'
      }, {
        title: this.$t('首次保持时长'),
        width: 200,
        dataIndex: 'firstHoldTime'
      }, {
        title: this.$t('保持次数'),
        width: 200,
        dataIndex: 'holdTimes'
      }, {
        title: this.$t('转接次数'),
        width: 200,
        dataIndex: 'transferTimes'
      }, {
        title: this.$t('当前呼叫转接给(分机)'),
        width: 250,
        dataIndex: 'transferNumber'
      }, {
        title: this.$t('转接发起时间'),
        width: 200,
        dataIndex: 'transferTime'
      }, {
        title: this.$t('转接状态'),
        width: 200,
        dataIndex: 'transferStatus'
      }, {
        title: this.$t('转接应答时间'),
        width: 200,
        dataIndex: 'transferAnswerTime'
      }, {
        title: this.$t('转接结束时间'),
        width: 200,
        dataIndex: 'transferHangupTime'
      }, {
        title: this.$t('转接通话时长'),
        width: 200,
        dataIndex: 'transferBillingSeconds'
      }, {
        title: this.$t('三方通话次数'),
        width: 200,
        dataIndex: 'conferenceTimes'
      }, {
        title: this.$t('三方通话发起时间'),
        width: 200,
        dataIndex: 'conferenceTime'
      }, {
        title: this.$t('三方通话号码'),
        width: 200,
        dataIndex: 'conferenceNumber'
      }, {
        title: this.$t('中继外呼号码'),
        width: 200,
        dataIndex: 'trunkNumber'
      }, {
        title: this.$t('录音文件'),
        width: 400,
        dataIndex: 'recordFile'
      }, {
        title: this.$t('服务器IP'),
        width: 200,
        dataIndex: 'server'
      }, {
        title: this.$t('通话挂断方'),
        width: 200,
        dataIndex: 'hangup'
      }, {
        title: this.$t('挂断时间'),
        width: 200,
        dataIndex: 'hangupTime'
      }, {
        title: this.$t('挂断位置'),
        width: 200,
        dataIndex: 'hangupPosition'
      }, {
        title: this.$t('质检人'),
        width: 200,
        dataIndex: 'qualityUsername'
      }, {
        title: this.$t('质检状态'),
        width: 200,
        dataIndex: 'qualityStatus'
      }, {
        title: this.$t('回拨状态'),
        width: 200,
        dataIndex: 'callbackStatus'
      }, {
        title: this.$t('满意度'),
        width: 200,
        dataIndex: 'comment'
      }, {
        title: this.$t('备注'),
        width: 200,
        dataIndex: 'remarks'
      }, {
        title: this.$t('出局号码'),
        dataIndex: 'cid',
        sorter: true,
        width: 200
      }, {
        title: this.$t('DID'),
        dataIndex: 'did',
        sorter: true,
        width: 200
      }, {
        title: this.$t('FROM_DID'),
        dataIndex: 'fromDid',
        sorter: true,
        width: 200
      }, {
        title: this.$t('UID'),
        dataIndex: 'uid',
        sorter: true,
        width: 200
      }],
      sorter: { field: 'id', order: 'descend' }
    }
  },
  computed: {
    ...mapGetters(['setting'])
  },
  created () {
    this.searchDate = [this.moment().startOf('day'), this.moment().endOf('day')]
    this.queryParam.startTime = this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.queryParam.endTime = this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  },
  mounted () {
    this.getField()
  },
  methods: {
    getField () {
      // 呼叫类型、坐席接听状态、通话挂断方、满意度
      const arr = [{
        alias: 'callcenter_call_type',
        get: 'callType'
      }, {
        alias: 'callcenter_agent_answer_status',
        get: 'callStatus'
      }, {
        alias: 'callcenter_hangup',
        get: 'hangup'
      }, {
        alias: 'callcenter_comment_type',
        get: 'comment'
      }, {
        alias: 'callcenter_comment_out_type',
        get: 'commentout'
      }]
      arr.forEach((item, index) => {
        this.axios({
          url: 'admin/dict/initData',
          data: {
            dictCategoryNumber: item.alias
          }
        }).then(res => {
          if (res.code === 0) {
            this[item.get] = res.result || []
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
        url: '/callcenter/record/init',
        data: Object.assign(parameter, this.queryParam, this.parameter)
      }).then(res => {
        return res.result
      })
    },
    handleDetail (record) {
      this.$refs.CallRecordInfo.show({
        columns: this.columns.slice(1),
        data: record,
        queryParam: Object.assign(this.queryParam, { sortField: 'id', sortOrder: 'descend', uid: record.uid }),
        tab: 'info',
        title: this.$t('详情')
      })
    },
    handlePlayback (record) {
      if (record.recordFile) {
        const sourceUrl = `${process.env.VUE_APP_API_BASE_URL}callcenter/api/recordDownload?recordingFile=${record.recordFile}`
        this.$setSetting({ audioPlayData: { visible: true, sourceUrl: sourceUrl } })
      } else {
        this.$message.info('录音文件为空')
      }
    },
    handleDownload (record) {
      if (record.recordFile) {
        const sourceUrl = `${process.env.VUE_APP_API_BASE_URL}callcenter/api/recordDownload?recordingFile=${record.recordFile}`
        window.open(sourceUrl)
      } else {
        this.$message.info('录音文件为空')
      }
    },
    handleExport () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'ExportRecordTask',
        setMenuName: true,
        parameter: {
          condition: {
            req: Object.assign(this.parameter, this.queryParam),
            type: 'record'
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
