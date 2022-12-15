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
          <a-col v-bind="colLayout">
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
          <a-col v-bind="colLayout">
            <a-form-item label="主叫/被叫">
              <a-input v-model="queryParam.number" placeholder="" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout">
            <a-form-item label="主叫号码">
              <a-input v-model="queryParam.source" placeholder="" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout">
            <a-form-item label="被叫号码">
              <a-input v-model="queryParam.destination" placeholder="" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout">
            <a-form-item label="呼叫状态">
              <a-select v-model="queryParam.disposition" :allowClear="true">
                <a-select-option v-for="(item, index) in disposition" :key="index" :value="item.dictDataNumber">
                  {{ item.fullDictDataName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout">
            <a-form-item label="呼叫类型">
              <a-select v-model="queryParam.callType" :allowClear="true">
                <a-select-option v-for="(item, index) in callType" :key="index" :value="item.dictDataNumber">
                  {{ item.fullDictDataName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout">
            <a-form-item label="通话时长">
              <a-input-group compact>
                <a-input v-model="queryParam.durationStart" style="width: calc(50% - 15px)" placeholder="单位: 秒" />
                <a-input
                  style="width: 30px; border-left: 0; pointer-events: none; backgroundcolor: #fff"
                  placeholder="~"
                  disabled
                />
                <a-input v-model="queryParam.durationEnd" style="width: calc(50% - 15px); border-left: 0" />
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout">
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
          <a-col v-bind="colLayout">
            <a-form-item label="呼入满意度">
              <a-select v-model="queryParam.commentIn" :allowClear="true">
                <a-select-option v-for="(item, index) in comment" :key="index" :value="item.dictDataNumber">
                  {{ item.fullDictDataName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout">
            <a-form-item label="呼出满意度">
              <a-select v-model="queryParam.commentOut" :allowClear="true">
                <a-select-option v-for="(item, index) in commentout" :key="index" :value="item.dictDataNumber">
                  {{ item.fullDictDataName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout">
            <a-form-item label="挂断方">
              <a-select v-model="queryParam.hangup" :allowClear="true">
                <a-select-option v-for="(item, index) in hangup" :key="index" :value="item.dictDataNumber">
                  {{ item.fullDictDataName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout">
            <a-form-item :label="$t('部门')">
              <data-picker
                ref="treeDepartment"
                :placeholder="$t('请选择')"
                :scope="scope"
                :multiple="true"
                name="queryParam[department]"
                displayType="tree"
                url="/admin/department/init"
                searchUrl="/admin/search/departmentSearch"
                parentId="parentDepartmentId"
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
                @select="selectDepartment"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout">
            <a-form-item label="坐席所属队列">
              <a-select v-model="queryParam.agentFromQueue" :allowClear="true">
                <a-select-option v-for="(item, index) in agentFromQueueList" :key="index" :value="item.dictDataNumber">
                  {{ item.fullDictDataName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <a-row style="margin-bottom: 6px">
      <a-col>
        <a-button v-action:export icon="download" @click="handleExport()">{{ $t('导出') }}</a-button>
      </a-col>
    </a-row>
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
        <a @click="handlePlayback(record)">录音播放</a>
        <a-divider type="vertical" />
        <a @click="handleDownload(record)">录音下载</a>
      </div>
    </s-table>
    <general-export ref="generalExport" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    GeneralExport: () => import('@/views/admin/Table/GeneralExport')
  },
  data () {
    return {
      colLayout: {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 8,
        xl: 6,
        xxl: 6
      },
      // 时间组件
      searchDate: null,
      advanced: false,
      // 搜索参数
      queryParam: {},
      disposition: [],
      callType: [],
      hangup: [],
      agentFromQueueList: [],
      comment: [],
      commentout: [],
      // 表头
      columns: [{
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'action' }
      }, {
        title: 'ID',
        dataIndex: 'id',
        width: 80,
        sorter: true
      }, {
        title: '主叫号码',
        width: 150,
        dataIndex: 'source'
      }, {
        title: '主叫名称',
        width: 150,
        dataIndex: 'sourceRealName'
      }, {
        title: '被叫号码',
        width: 150,
        dataIndex: 'destination'
      }, {
        title: '被叫名称',
        width: 150,
        dataIndex: 'destinationRealName'
      }, {
        title: '呼叫类型',
        width: 150,
        dataIndex: 'callType'
      }, {
        title: '呼叫状态',
        width: 150,
        dataIndex: 'disposition'
      }, {
        title: '振铃时长',
        width: 150,
        dataIndex: 'ringTime'
      }, {
        title: '通话时长',
        width: 150,
        dataIndex: 'duration'
      }, {
        title: '坐席所属队列',
        width: 150,
        dataIndex: 'agentFromQueue'
      }, {
        title: '挂断方',
        width: 150,
        dataIndex: 'hangup'
      }, {
        title: '呼叫时间',
        width: 150,
        dataIndex: 'callTime'
      }, {
        title: '满意度',
        width: 150,
        dataIndex: 'comment'
      }],
      sorter: { field: 'id', order: 'descend' },
      scope: this,
      form: this.$form.createForm(this)
    }
  },
  computed: {
    ...mapGetters(['setting'])
  },
  created () {
    this.changeAdvanced(false)
    this.searchDate = [this.moment().startOf('day'), this.moment().endOf('day')]
    this.queryParam.startTime = this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.queryParam.endTime = this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  },
  mounted () {
    this.getField()
  },
  methods: {
    getField () {
      // 呼叫状态、呼叫类型、挂断方、满意度
      const arr = [{
        alias: 'callcenter_disposition',
        get: 'disposition'
      }, {
        alias: 'callcenter_call_type',
        get: 'callType'
      }, {
        alias: 'callcenter_hangup',
        get: 'hangup'
      }, {
        alias: 'callcenter_comment_type',
        get: 'comment'
      }, {
        alias: 'callcenter_comment_out_type',
        get: 'commentout'
      }, {
        alias: 'callcenter_agent_from_queue',
        get: 'agentFromQueueList'
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
      return this.axios({
        url: '/callcenter/callrecord/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    selectDepartment (content, node) {
      this.queryParam.department = content
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
        className: 'ExportCallRecordTask',
        setMenuName: true,
        parameter: {
          condition: {
            req: Object.assign(this.queryParam, this.sorter),
            type: 'callRecord'
          }
        }
      })
    },
    getSearchDate (date, dateString) {
      this.searchDate = date
      this.queryParam.startTime = dateString[0]
      this.queryParam.endTime = dateString[1]
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
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.ant-spin-container {
  display: flex;
  flex-direction: column;
}
</style>
