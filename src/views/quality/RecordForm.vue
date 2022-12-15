<template>
  <a-drawer
    :title="$t(config.title)"
    :width="1200"
    :visible="visible"
    :destroyOnClose="true"
    @close="
      () => {
        visible = !visible
        form.resetFields()
        sourceData = ''
      }
    "
  >
    <a-spin v-show="!loading" :spinning="loading">
      <div>
        <a-form :form="form">
          <a-space>
            <tag-icon class="tagIcon" />
            <h3 class="title">{{ $t('基本信息') }}</h3>
          </a-space>
          <div>
            <audio ref="audio" controls autoplay style="margin: 10px">
              <source :src="sourceData" type="audio/wav" />
            </audio>
          </div>
          <a-card size="small">
            <a-col :span="4">
              <p>
                {{ $t('主叫号码') }}：
                <a-input v-model="info.source" class="input" :disabled="true" />
              </p>
            </a-col>
            <a-col :span="1"></a-col>
            <a-col :span="4">
              <p>
                {{ $t('被叫号码') }}：
                <a-input v-model="info.destination" class="input" :disabled="true" />
              </p>
            </a-col>
            <a-col :span="1"></a-col>
            <a-col :span="4">
              <p>
                {{ $t('呼叫时间') }}：
                <a-input v-model="info.callTime" class="input" :disabled="true" />
              </p>
            </a-col>
            <a-col :span="1"></a-col>
            <a-col :span="4">
              <p>
                {{ $t('质检员') }}：
                <a-input v-model="info.qualityUser" class="input" :disabled="true" />
              </p>
            </a-col>
            <a-col :span="1"></a-col>
            <a-col :span="4">
              <p>
                {{ $t('质检得分') }}:
                <a-input v-model="info.qualityScore" class="input" :disabled="true" />
              </p>
            </a-col>
          </a-card>
          <!-- 复议信息 -->
          <div v-if="action === 'review'">
            <a-space>
              <tag-icon class="tagIcon" />
              <h3 style="margin-top: 10px">{{ $t('复议信息') }}</h3>
            </a-space>
            <a-card>
              <a-form-item
                :label="$t('审核结果')"
                :labelCol="{ style: 'width: 100px; display: inline-block' }"
                :wrapperCol="{ style: 'width: calc(100% - 100px); display: inline-block' }"
              >
                <a-radio-group
                  v-decorator="['handleType', { rules: [{ required: true, message: '请选择审核结果' }] }]"
                  name="handleType"
                >
                  <a-radio value="3">{{ $t('同意复议') }}</a-radio>
                  <a-radio value="2" style="margin-left: 62px">{{ $t('不同意复议') }}</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item
                :labelCol="{ style: 'width: 100px; display: inline-block' }"
                :wrapperCol="{ style: 'width: calc(100% - 100px); display: inline-block' }"
                :required="true"
                :label="$t('申请复议理由')"
                style="margin-bottom: 10px"
              >
                <a-textarea v-model="reason" :disabled="true" :auto-size="{ minRows: 3, maxRows: 5 }" />
              </a-form-item>
              <a-form-item
                :label="$t('审核说明')"
                style="margin-bottom: 10px"
                :required="true"
                :labelCol="{ style: 'width: 100px; display: inline-block' }"
                :wrapperCol="{ style: 'width: calc(100% - 100px); display: inline-block' }"
              >
                <a-textarea
                  v-decorator="['remark', { rules: [{ required: true, message: '审核说明不能为空' }] }]"
                  :auto-size="{ minRows: 3, maxRows: 5 }"
                />
              </a-form-item>
            </a-card>
          </div>
          <div v-else-if="action === 'reconside'">
            <a-space>
              <tag-icon class="tagIcon" />
              <h3 style="margin-top: 10px">{{ $t('复议信息') }}</h3>
            </a-space>
            <a-card>
              <a-form :form="form">
                <a-form-item
                  :labelCol="{ style: 'width: 100px; display: inline-block' }"
                  :wrapperCol="{ style: 'width: calc(100% - 100px); display: inline-block' }"
                  :required="true"
                  :label="$t('申请复议理由')"
                  style="margin-bottom: 10px"
                >
                  <a-textarea v-model="reason" :disabled="true" :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-item>
                <a-form-item
                  :label="$t('审核说明')"
                  style="margin-bottom: 10px"
                  :required="true"
                  :labelCol="{ style: 'width: 100px; display: inline-block' }"
                  :wrapperCol="{ style: 'width: calc(100% - 100px); display: inline-block' }"
                >
                  <a-textarea v-model="review" :disabled="true" :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-item>
                <a-form-item
                  :label="$t('审核结果')"
                  :labelCol="{ style: 'width: 100px; display: inline-block' }"
                  :wrapperCol="{ style: 'width: calc(100% - 100px); display: inline-block' }"
                >
                  <a-radio-group
                    v-decorator="['handleType', { rules: [{ required: true, message: '请选择审核结果' }] }]"
                    name="handleType"
                  >
                    <a-radio value="4">{{ $t('同意复议') }}</a-radio>
                    <a-radio value="5" style="margin-left: 62px">{{ $t('不同意复议') }}</a-radio>
                  </a-radio-group>
                </a-form-item>
                <a-form-item
                  :labelCol="{ style: 'width: 100px; display: inline-block' }"
                  :wrapperCol="{ style: 'width: calc(100% - 100px); display: inline-block' }"
                  :required="true"
                  :label="$t('质检复议说明')"
                >
                  <a-textarea
                    v-decorator="['remark', { rules: [{ required: true, message: '质检复议说明不能为空' }] }]"
                    :auto-size="{ minRows: 3, maxRows: 5 }"
                  />
                </a-form-item>
              </a-form>
            </a-card>
          </div>
          <!-- 一票否决 -->
          <div v-if="vetoCollList">
            <a-space class="cardTitle">
              <tag-icon class="tagIcon" />
              <h3 class="title">{{ $t('一票否决') }}</h3>
            </a-space>
            <a-form-item v-for="(item, index) in vetoCollList" :key="index">
              <a-col :span="14">
                <a-form-item :label="index + 1" :label-col="{ span: 2 }" :wrapper-col="{ span: 21 }">
                  <a-col :span="1">
                    <a-tooltip>
                      <template slot="title">
                        <div v-dompurify-html="item.vetoItem.vetoDetail || ''">
                          {{ item.vetoItem.vetoDetail || '' }}
                        </div>
                      </template>
                      <a-icon type="question-circle" />
                    </a-tooltip>
                  </a-col>
                  <a-col :span="23">
                    <a-input class="input" :disabled="true" :value="item.vetoItem.veto || ''" />
                  </a-col>
                </a-form-item>
              </a-col>
              <a-col :span="3">
                <a-checkbox
                  :disabled="action === 'query' || action === 'review'"
                  :checked="parseInt(item.vetoScore.selected) === 1"
                  @change="changeCheck(index, $event)"
                ></a-checkbox>
              </a-col>
              <a-col :span="7">
                <a-form-item :label="$t('备注')" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
                  <a-input
                    class="input"
                    :disabled="action === 'query' || action === 'review'"
                    :value="item.vetoScore.vetoRemark !== '备注' ? item.vetoScore.vetoRemark || '' : ''"
                    @change="changeVetoRemark(index, $event)"
                  />
                </a-form-item>
              </a-col>
            </a-form-item>
          </div>
          <!-- 服务、业务部分 -->
          <div v-for="(items, keys) in scoreCollList" :key="keys">
            <a-space class="cardTitle">
              <tag-icon class="tagIcon" />
              <h3 class="title">
                {{
                  items.majorDesc +
                  `(${$t('得')}` +
                  items.majorCurrentScore +
                  `${$t('分')}/${$t('共')}` +
                  $t(items.majorTotalScore) +
                  `${$t('分')})`
                }}
              </h3>
            </a-space>
            <a-form-item v-for="(item, index) in items.subScoreCollList" :key="index">
              <a-col :span="14">
                <a-form-item :label="index + 1" :label-col="{ span: 2 }" :wrapper-col="{ span: 21 }">
                  <a-col :span="1">
                    <a-tooltip>
                      <template slot="title">
                        <div v-dompurify-html="item.scoringSubitem.detailedRemarks || ''">
                          {{ item.scoringSubitem.detailedRemarks || '' }}
                        </div>
                      </template>
                      <a-icon type="question-circle" />
                    </a-tooltip>
                  </a-col>
                  <a-col :span="23">
                    <a-input :disabled="true" :value="item.scoringSubitem.scoringItem" class="input" />
                  </a-col>
                </a-form-item>
              </a-col>
              <a-col :span="3">
                <div class="labelchange">
                  <a-form-item :label="$t('分数')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <a-select
                      v-model.trim="item.subScoreItem.subScore"
                      :disabled="action === 'query' || action === 'review'"
                      :allowClear="false"
                      show-search
                      @change="correcting($event, keys, index)"
                    >
                      <a-select-option v-for="(i, k) in item.scoringSubitem.scoreSettings" :key="k" :value="i">
                        {{ i }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </a-col>
              <a-col :span="7">
                <a-form-item :label="$t('备注')" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
                  <a-input
                    class="input"
                    :disabled="action === 'query' || action === 'review'"
                    :value="item.subScoreItem.detailRemarks !== '备注' ? item.subScoreItem.detailRemarks : ''"
                    @change="changeDetailRemarks(keys, index, $event)"
                  />
                </a-form-item>
              </a-col>
            </a-form-item>
          </div>
          <!-- 综合评语 -->
          <a-space class="cardTitle">
            <tag-icon class="tagIcon" />
            <h3 class="title">{{ $t('综合评语') }}</h3>
          </a-space>
          <a-form-item
            :labelCol="{ style: 'width: 100px; display: inline-block' }"
            :wrapperCol="{ style: 'width: calc(100% - 130px); display: inline-block' }"
            :label="$t('综合评定')"
          >
            <a-select
              v-decorator="[
                'info[evaluate]',
                {
                  initialValue: evaluate
                }
              ]"
              :disabled="!['remark', 'reconside'].includes(action)"
              @change="changeEvaluate"
            >
              <a-select-option value="0">无</a-select-option>
              <a-select-option value="1">优秀案例</a-select-option>
              <a-select-option value="2">无效数据</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :labelCol="{ style: 'width: 100px; display: inline-block' }"
            :wrapperCol="{ style: 'width: calc(100% - 130px); display: inline-block' }"
            :label="$t('综合评语')"
          >
            <a-textarea
              v-model="info.qualityComment"
              :disabled="action === 'query' || action === 'review'"
              :auto-size="{ minRows: 3, maxRows: 5 }"
            ></a-textarea>
          </a-form-item>
        </a-form>
        <div v-if="info.tabsShow">
          <a-space>
            <tag-icon class="tagIcon" />
            <h3 style="margin-top: 10px">{{ $t('复议日志') }}</h3>
          </a-space>
          <s-table
            ref="table"
            size="small"
            rowKey="id"
            :columns="columns"
            :data="loadDataTable"
            class="table-fill"
            :sorter="{ field: 'id', order: 'descend' }"
          ></s-table>
        </div>
      </div>
      <div class="bbar">
        <a-button v-if="action !== 'query'" type="primary" @click="submit">
          {{ $t('提交') }}
        </a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      config: {},
      visible: false,
      loading: false,
      action: undefined,
      info: {},
      agent: '',
      typicalCase: false,
      qualityStatus: false,
      setting: undefined,
      isSelectedVetoOne: undefined,
      vetoCollList: [],
      scoreCollList: [],
      reason: '',
      review: '',
      qualityId: undefined,
      logList: [],
      sourceData: '',
      evaluate: '0',
      tabsValue: '1',
      columns: [{
        title: this.$t('ID'),
        dataIndex: 'id'
      }, {
        title: this.$t('质检id'),
        dataIndex: 'qualityId'
      }, {
        title: this.$t('处理时间'),
        dataIndex: 'operateTime'
      }, {
        title: this.$t('处理类型'),
        dataIndex: 'operateType'
      }, {
        title: this.$t('处理人'),
        dataIndex: 'operateUser'
      }, {
        title: this.$t('处理备注'),
        dataIndex: 'remark'
      }],
      queryParam: {}
    }
  },
  watch: {
    visible: {
      handler (newVal) {
        if (!newVal) {
          this.form.resetFields()
        }
      },
      immediate: true
    }
  },
  methods: {
    show (config) {
      this.loading = true
      this.visible = true
      this.config = config
      this.info = {}
      this.form.resetFields()
      const { data, action } = config
      this.info = JSON.parse(JSON.stringify(data))
      this.action = action
      this.$nextTick(() => {
        this.loading = false
        this.sourceData = `${process.env.VUE_APP_API_BASE_URL}callcenter/api/recordDownload?recordingFile=${data.recordFile}`
        if (this.action === 'remark') {
          this.form.setFieldsValue({ 'info[evaluate]': '0' })
          // 优秀案例
          this.info.typicalCase = 0
          // 无效数据
          this.info.qualityStatus = 1
        } else {
          const evaluate = [1, '1'].includes(this.info.typicalCase) ? '1' : [2, '2'].includes(this.info.qualityStatus) ? '2' : '0'
          this.form.setFieldsValue({ 'info[evaluate]': evaluate })
        }
        this.$forceUpdate()
      })
      this.setting = JSON.parse(this.info.setting)
      this.isSelectedVetoOne = this.setting.isSelectedVetoOne
      this.vetoCollList = this.setting.vetoCollList
      this.scoreCollList = this.setting.scoreCollList
    },
    // 页面数据渲染
    loadDataTable (parameter) {
      return this.axios({
        url: `/quality/forReconsideration/reconsiderLogger`,
        params: { id: this.info.id },
        data: parameter
      }).then(res => {
        const { data } = res.result
        if (data.length > 0) {
          this.qualityId = data[0].qualityId
          this.reason = data[0].remark
          this.review = data[1] ? data[1].remark : ''
        }
        return res.result
      })
    },
    changeCheck (i, e) {
      this.vetoCollList.forEach((item, index) => {
        if (index === i) {
          item.vetoScore.selected = e.target.checked ? 1 : 0
        }
      })
      const isCheck = this.vetoCollList.some(item => item.vetoScore.selected === 1)
      this.isSelectedVetoOne = isCheck ? 1 : 0
      if (isCheck) {
        this.info.qualityScore = 0
      } else {
        this.info.qualityScore = this.scoreCollList.map(item => {
          return parseInt(item.majorCurrentScore)
        }).reduce((x, y) => x + y)
      }
    },
    changeVetoRemark (i, e) {
      this.vetoCollList.forEach((item, index) => {
        if (index === i) {
          item.vetoScore.vetoRemark = e.target.value
        }
      })
    },
    changeSubScore (k, i, e) {
      this.scoreCollList.forEach((items, indexs) => {
        if (indexs === k) {
          items.subScoreCollList.forEach((item, index) => {
            if (index === i) {
              item.subScoreItem.subScore = e.target.value
            }
          })
        }
      })
    },
    changeDetailRemarks (k, i, e) {
      this.scoreCollList.forEach((items, indexs) => {
        if (indexs === k) {
          items.subScoreCollList.forEach((item, index) => {
            if (index === i) {
              item.subScoreItem.detailRemarks = e.target.value
            }
          })
        }
      })
    },
    // 修改分数
    correcting (e, key, index) {
      this.scoreCollList[key].majorCurrentScore = this.scoreCollList[key].subScoreCollList.map(item => {
        return parseInt(item.subScoreItem.subScore)
      }).reduce((x, y) => x + y)
      const isCheck = this.vetoCollList.every(item => item.vetoScore.selected !== 1)
      if (isCheck) {
        this.info.qualityScore = this.scoreCollList.map(item => {
          return parseInt(item.majorCurrentScore)
        }).reduce((x, y) => x + y)
      } else {
        this.info.qualityScore = 0
      }
    },
    changeEvaluate (e) {
      // 优秀案例
      this.info.typicalCase = e === '1' ? 1 : 0
      // 无效数据
      this.info.qualityStatus = e === '2' ? 2 : 1
    },
    submit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          let url = {}
          let data = {}
          if (this.action !== 'query') {
            const setting = Object.assign({ isSelectedVetoOne: this.isSelectedVetoOne, vetoCollList: this.vetoCollList, scoreCollList: this.scoreCollList })
            this.info.setting = JSON.stringify(setting)
          }
          if (this.action === 'review') {
            url = '/quality/pendingReview/audit'
            data = Object.assign(this.form.getFieldsValue(), { qualityId: this.qualityId })
          } else if (this.action === 'remark') {
            url = '/quality/toInspected/saveScore'
            data = Object.assign(this.info)
          } else if (this.action === 'reconside') {
            url = '/quality/forReconsideration/reconsider'
            const req = Object.assign(this.form.getFieldsValue(), { qualityId: this.qualityId })
            data = Object.assign({ qualityDataEntity: this.info, req: req })
          }
          this.axios({
            url: url,
            data: data
          }).then(res => {
            if (res.code === 0) {
              this.$message.success(res.message)
              this.form.resetFields()
              this.$emit('ok')
              this.visible = !this.visible
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  margin: 0;
}
.cardTitle {
  margin: 20px 0;
}
</style>
