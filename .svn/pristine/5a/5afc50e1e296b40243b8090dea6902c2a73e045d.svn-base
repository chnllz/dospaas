<template>
  <a-drawer
    :title="$t(config.title)"
    :width="1200"
    :destroyOnClose="true"
    :visible="visible"
    @close="
      () => {
        visible = !visible
        form.resetFields()
      }
    "
  >
    <a-spin :spinning="loading">
      <a-form
        :colon="false"
        :form="form"
        labelAlign="right"
        v-bind="formLayout"
        layout="horizontal"
        style="padding: 16px"
      >
        <a-space class="cardTitle">
          <tag-icon class="tagIcon" />
          <h3 class="title">{{ $t('基础设置') }}</h3>
        </a-space>
        <a-card>
          <a-form-item
            :labelCol="{ style: 'width: 140px; display: inline-block' }"
            :wrapperCol="{ style: 'width: calc(100% - 178px); display: inline-block' }"
            :label="$t('任务名称')"
          >
            <a-input
              v-decorator="[
                'info[taskName]',
                {
                  initialValue: config.data.taskName,
                  rules: [{ required: true, message: '请输入任务名称' }, { validator: checknamefun }]
                }
              ]"
              :disabled="config.action === 'distribution'"
              :read-only="disabled"
              :class="disabled ? 'input' : ''"
            />
            <a-alert v-if="tip" type="error" :message="tip" />
          </a-form-item>
          <a-form-item
            :labelCol="{ style: 'width: 140px; display: inline-block' }"
            :wrapperCol="{ style: 'width: calc(100% - 178px); display: inline-block' }"
            :label="$t('质检模板')"
          >
            <a-select
              v-decorator="[
                'info[templateId]',
                {
                  initialValue: config.data.templateId,
                  rules: [{ required: true, message: '请选择质检模板' }]
                }
              ]"
              :disabled="config.action === 'distribution'"
              :allowClear="true"
            >
              <a-select-option v-for="(item, key) in temp_name" :key="key" :value="item.value">
                {{ item.display }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            v-show="disstatu === false"
            :labelCol="{ style: 'width: 140px; display: inline-block' }"
            :wrapperCol="{ style: 'width: calc(100% - 178px); display: inline-block' }"
            :label="$t('备注')"
          >
            <a-textarea
              v-decorator="['info[remarks]', { initialValue: config.data.remarks }]"
              :auto-size="{ minRows: 1, maxRows: 5 }"
            />
          </a-form-item>
        </a-card>
        <a-space>
          <tag-icon class="tagIcon" />
          <h3 class="title">{{ $t('数据提取') }}</h3>
        </a-space>
        <a-card>
          <a-form-item
            v-show="disstatu"
            :labelCol="{ style: 'width: 140px; display: inline-block' }"
            :wrapperCol="{ style: 'width: calc(100% - 178px); display: inline-block' }"
            :label="$t('呼叫时间')"
          >
            <a-range-picker
              v-decorator="[
                'info[callDate]',
                { initialValue: callDate, rules: [{ required: disstatu, message: '请输入呼叫时间区间' }] }
              ]"
              showTime
              @change="getcallDate"
            />
          </a-form-item>
          <a-form-item
            :labelCol="{ style: 'width: 140px; display: inline-block' }"
            :wrapperCol="{ style: 'width: calc(100% - 178px); display: inline-block' }"
            :label="$t('通话时长(单位为秒)')"
          >
            <a-input-group compact>
              <a-input-number
                v-decorator="[
                  'info[minBillsec]',
                  { initialValue: config.data.minBillsec, rules: [{ required: true, message: '请输入通话时长' }] }
                ]"
                style="width: 100px; text-align: center"
                :min="1"
              />
              ~
              <a-input-number v-model="config.data.maxBillsec" style="width: 100px; text-align: center" :min="1" />
            </a-input-group>
          </a-form-item>
          <!-- <a-form-item
            v-show="config.data.task_type !== '录音质检'"
            :labelCol="{ span: 3 }"
            :wrapperCol="{ span: 21 }"
            :label="$t('来源渠道')"
          >
            <a-input
              v-if="disstatu"
              v-model="config.data.channel"
              :read-only="disabled"
              :class="disabled ? 'input' : ''"
            />
            <a-select
              v-else
              v-decorator="[
                'info[channel]',
                {
                  initialValue: config.data.channel,
                  rules: [{ required: false, message: '请选择来源渠道' }]
                }
              ]"
              :allowClear="true"
            >
              <a-select-option v-for="(item, key) in temp_name" :key="key" :value="item.value">
                {{ item.display }}
              </a-select-option>
            </a-select>
          </a-form-item> -->
          <a-form-item
            v-for="(item, index) in callList"
            :key="index"
            :label="config.data.task_type == '录音质检' && index === 0 ? $t('呼叫类型') : ''"
            :labelCol="{ style: 'width: 140px; display: inline-block' }"
            :wrapperCol="{ style: 'width: calc(100% - 140px); display: inline-block' }"
            :required="true"
            style="width: 100%"
          >
            <div style="width: 100%" :style="{ marginLeft: `${index !== 0 ? '140px' : ''}` }">
              <div style="display: flex; width: 100%; align-items: center">
                <a-checkbox-group
                  v-decorator="[
                    `info[${item.options[0].value}CallValue]`,
                    {
                      initialValue: item.callValue,
                      rules: [
                        {
                          required:
                            index === 1 &&
                            !callList.some((itemCall) => itemCall.callValue && itemCall.callValue.length > 0),
                          message: '请选择呼叫类型'
                        }
                      ]
                    }
                  ]"
                  name="checkboxgroup"
                  :options="item.options"
                  @change="changeOption($event, index)"
                />
                <a-form-item
                  style="display: flex; align-items: center"
                  :label="$t(`${item.options[0].label}满意度评价`)"
                  :required="item.callValue && item.callValue.length > 0"
                  :labelCol="{ style: 'width: 140px; display: inline-block' }"
                  :wrapperCol="{ style: 'width: calc(100% - 140px); display: inline-block' }"
                >
                  <div style="display: flex; align-items: center">
                    <a-form-item>
                      <a-radio-group
                        v-decorator="[
                          `info[${item.options[0].value}CommentValue]`,
                          {
                            initialValue: item.commentValue,
                            rules: [
                              {
                                required:
                                  item.callValue &&
                                  item.callValue.length > 0 &&
                                  (!item.commentValue || item.commentValue.length === 0),
                                message: `请选择${item.options[0].label}满意度评价`
                              }
                            ]
                          }
                        ]"
                        :disabled="!item.callValue || (item.callValue && item.callValue.length === 0)"
                        style="display: flex; align-items: center"
                        @change="changeRadio($event, index)"
                      >
                        <a-radio value="0">{{ $t('不限评价结果') }}</a-radio>
                        <a-radio value="1" class="margin">{{ $t('自定义') }}</a-radio>
                      </a-radio-group>
                    </a-form-item>

                    <a-form-item>
                      <a-select
                        v-if="item.commentValue === '1'"
                        v-decorator="[
                          `info[${item.options[0].value}commentValue]`,
                          {
                            initialValue: item.customSelect || [],
                            rules: [
                              { required: item.commentValue === '1' && !item.customSelect, message: '请选择自定义内容' }
                            ]
                          }
                        ]"
                        mode="multiple"
                        :allowClear="true"
                        style="width: 200px"
                        @change="changeSelect($event, index)"
                      >
                        <a-select-option
                          v-for="(itemList, indexList) in item.list"
                          :key="indexList"
                          :value="itemList.value"
                        >
                          {{ itemList.name }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </div>
                </a-form-item>
              </div>
            </div>
          </a-form-item>
          <!-- <a-form-item
            :label="config.data.task_type == '录音质检' ? $t('呼叫类型') : $t('服务小结')"
            :labelCol="{ style: 'width: 140px; display: inline-block' }"
            :wrapperCol="{ style: 'width: calc(100% - 178px); display: inline-block' }"
            :required="true"
          >
            <a-radio-group
              v-show="config.data.task_type == '录音质检'"
              v-decorator="['info[callType]', { initialValue: config.data.callType }]"
              name="Call"
            >
              <a-radio value="in&out">{{ $t('呼入&呼出') }}</a-radio>
              <a-radio value="in" class="margin">{{ $t('呼出') }}</a-radio>
              <a-radio value="out" class="margin">{{ $t('呼入') }}</a-radio>
            </a-radio-group>
            <a-radio-group
              v-show="config.data.task_type !== '录音质检'"
              v-decorator="['info[summary]', { initialValue: config.data.summary }]"
              name="Call"
            >
              <a-radio value="1" class="margin">{{ $t('是') }}</a-radio>
              <a-radio value="0" class="margin">{{ $t('否') }}</a-radio>
            </a-radio-group>
          </a-form-item>
          <div></div>
          <a-form-item
            :label="$t('满意度评价')"
            :required="true"
            :labelCol="{ style: 'width: 140px; display: inline-block' }"
            :wrapperCol="{ style: 'width: calc(100% - 178px); display: inline-block' }"
          >
            <a-radio-group v-decorator="['info[comment]', { initialValue: config.data.comment }]" name="satisfied">
              <a-radio value="0">{{ $t('不限评价结果') }}</a-radio>
              <a-radio value="1" style="margin-left: 62px">{{ $t('仅不满意') }}</a-radio>
            </a-radio-group>
          </a-form-item> -->
          <!-- <a-row v-show="config.data.task_type !== '录音质检'">
            <a-col span="12">
              <a-form-item
                :label="$t('触发违禁词')"
                :required="true"
                :labelCol="{ span: 6 }"
                :wrapperCol="{ span: 18 }"
              >
                <a-radio-group v-decorator="['info[ban]', { initialValue: config.data.ban }]" name="Call">
                  <a-radio value="1" class="margin">{{ $t('是') }}</a-radio>
                  <a-radio value="0" class="margin">{{ $t('否') }}</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item
                :label="$t('触发敏感词')"
                :required="true"
                :labelCol="{ span: 6 }"
                :wrapperCol="{ span: 18 }"
              >
                <a-radio-group
                  v-decorator="['info[sensitive]', { initialValue: config.data.sensitive }]"
                  name="satisfied"
                >
                  <a-radio value="1">{{ $t('是') }}</a-radio>
                  <a-radio value="0" style="margin-left: 62px">{{ $t('否') }}</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row> -->
          <a-form-item
            :required="true"
            :label="$t('每人提取数量')"
            :labelCol="{ style: 'width: 140px; display: inline-block' }"
            :wrapperCol="{ style: 'width: calc(100% - 178px); display: inline-block' }"
          >
            <a-radio-group
              v-decorator="[
                'info[extractAll]',
                { initialValue: config.data.extractAll === '0' ? config.data.extractAll : '1' }
              ]"
              name="number"
              @change="
                (e) => {
                  config.data.extractAll = e.target.value
                }
              "
            >
              <a-radio value="1" @click="allocateClose">{{ $t('所有') }}</a-radio>
              <a-radio value="0" style="margin-left: 36px" @click="allocate">{{ $t('指定数量') }}</a-radio>
              <a-input-number
                v-if="config.data.extractAll === '0'"
                v-decorator="['info[count]', { initialValue: config.data.count }]"
                :min="1"
                :max="100"
              />
            </a-radio-group>
          </a-form-item>
          <a-form-item
            :label="$t('来自于')"
            :labelCol="{ style: 'width: 140px; display: inline-block' }"
            :wrapperCol="{ style: 'width: calc(100% - 178px); display: inline-block' }"
          >
            <div style="display: flex">
              <a-textarea
                v-decorator="[
                  'info[extractAgent]',
                  { initialValue: config.data.extractAgent, rules: [{ required: true, message: '请选择用户' }] }
                ]"
                :auto-size="{ minRows: 3, maxRows: 5 }"
                :read-only="true"
                class="input"
              />
              <a-button style="margin-left: 10px" @click="handleSelect">{{ $t('选择用户') }}</a-button>
            </div>
          </a-form-item>
        </a-card>
        <a-space>
          <tag-icon class="tagIcon" />
          <h3 class="title">{{ $t('数据分配') }}</h3>
        </a-space>
        <a-card>
          <a-form-item
            :labelCol="{ style: 'width: 140px; display: inline-block' }"
            :wrapperCol="{ style: 'width: calc(100% - 178px); display: inline-block' }"
            :required="true"
            :label="$t('组内分配机制')"
          >
            <a-radio-group
              v-decorator="[
                'info[distributionMode]',
                {
                  required: true,
                  initialValue: config.data.distributionMode ? config.data.distributionMode.toString() : '0'
                }
              ]"
              name="distribution"
            >
              <a-radio value="0">{{ $t('平均分配') }}</a-radio>
            </a-radio-group>
          </a-form-item>
          <div v-for="(item, index) in groupAllocation" :key="index">
            <a-form-item
              :label="$t('分配给')"
              :labelCol="{ style: 'width: 140px; display: inline-block' }"
              :wrapperCol="{ style: 'width: calc(100% - 178px); display: inline-block' }"
              :required="true"
              :validateStatus="item.agentstatus"
              :help="item.agenthelp"
            >
              <div style="display: flex; align-items: center">
                <a-textarea
                  :ref="nowtime + '_' + (random + index)"
                  v-model="item.agent"
                  :auto-size="{ minRows: 3, maxRows: 5 }"
                  :read-only="true"
                  class="input"
                  style="flex: 2"
                />
                <a-button class="rattio" style="margin-left: 10px" @click="handleSelectQc(item.agent, index)">
                  {{ $t('选择用户') }}
                </a-button>
                <a-form-item
                  style="flex: 1"
                  :labelCol="{ style: 'width: 140px; display: inline-block' }"
                  :wrapperCol="{ style: 'width: calc(100% - 140px); display: inline-block' }"
                  :required="true"
                >
                  <span slot="label">
                    {{ $t('组间分配占比') }}
                    <a-tooltip :title="$t(content)">
                      <a-icon type="question-circle" />
                    </a-tooltip>
                  </span>
                  <a-input-number
                    :ref="nowtime + '_' + (random + index)"
                    v-model="item.rate"
                    :required="true"
                    :min="1"
                    :max="100"
                  />
                </a-form-item>
                <div>
                  <a-icon
                    :style="{ fontSize: '20px', color: '#52c41a' }"
                    type="plus-circle"
                    @click="addallocation(index)"
                  />
                  <a-icon
                    :style="{ fontSize: '20px', color: 'red', marginLeft: '10px' }"
                    type="minus-circle"
                    @click="deleteallocation(index)"
                  />
                </div>
              </div>
            </a-form-item>
          </div>
        </a-card>
      </a-form>
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">
          {{ config.action === 'edit' ? $t('修改') : $t('保存') }}
        </a-button>
        <a-button
          @click="
            () => {
              visible = !visible
              form.resetFields()
            }
          "
        >
          {{ $t('关闭') }}
        </a-button>
        <!-- <a-button @click="cancal_off">{{ config.action === 'edit' ? $t('重置') : $t('取消') }}</a-button> -->
      </div>
    </a-spin>
    <field-form-user ref="fieldFormUser" :key="userKey" @ok="handleUser" />
    <!-- <select-user-form ref="selectUserFormSeat" @ok="getUser" /> -->
    <select-user-form ref="selectUserFormQc" @ok="getQc" />
  </a-drawer>
</template>
<script>
export default {
  components: {
    SelectUserForm: () => import('@/views/admin/General/SelectUserForm'),
    FieldFormUser: () => import('@/views/admin/Field/FieldFormUser')
  },
  data () {
    return {
      userKey: 4,
      advanced: false,
      formLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 18 }
      },
      detailsadvanced: false,
      visibleRedistribution: false,
      visible: false,
      loading: false,
      disstatu: false,
      disabled: false,
      details: false,
      tip: '',
      allocatestate: false,
      length: '',
      nowtime: '',
      random: 0,
      content: '1.当有多组质检员时，组间分配占比指的是该组质检员在多组质检员中所占的比例。如：共增加3组质检员，组件分配占比分别为1、2、3，则第一组质检员分得的比例为1/(1+2+3)，第二组质检员分得比例为2/(1+2+3)。</br>' +
        '2.平均分配时，该组质检员平均分得本组所分配到的指间任务，如：本组5个质检员，分得100条指间任务，则每个质检员分得20条质检任务。全部分配时，该组质检员都分得到本组所分配到的质检任务，如：本组5个质检员，分得100条质检任务，则每个质检员均会分得100条质检任务，最终质检结果取5个质检员质检结果的平均值。',
      // 搜索参数
      parameter: {},
      queryParam: {},
      paramDetails: {
        status: undefined,
        quality_agent: undefined,
        agent: undefined,
        src_phone: '',
        dst_phone: '',
        begin_time: '',
        endTime: ''
      },
      callDate: null,
      searchDate: null,
      form: this.$form.createForm(this),
      config: {
        data: {}
      },
      configfen: {},
      quality_agent: [],
      agent: [],
      temp_name: [],
      page: [],
      taskid: '',
      startTime: '',
      endTime: '',
      selectedRowKeys: [],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys
        }
      },
      groupAllocation: [{
        agent: '',
        rate: 1
      }],
      taskName: '',
      colLayout: {},
      visibleread: false,
      userArr: [],
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 120,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: this.$t('ID'),
        dataIndex: 'id',
        width: 60,
        sorter: true
      }, {
        title: this.$t('任务名称'),
        dataIndex: 'taskName'
      }, {
        title: this.$t('质检总数'),
        dataIndex: 'qualityTotal'
      }, {
        title: this.$t('已质检数'),
        dataIndex: 'qualityNumber'
      }, {
        title: this.$t('待质检数'),
        dataIndex: 'forQualityNumber'
      }, {
        title: this.$t('有效数据'),
        dataIndex: 'validNumber'
      }, {
        title: this.$t('无效数据'),
        dataIndex: 'invalidNumber'
      }, {
        title: this.$t('完成率'),
        dataIndex: 'accomplishPercent'
      }, {
        title: this.$t('质检员'),
        dataIndex: 'qualityUsers'
      }],
      callList: []
    }
  },
  created () {
    this.changedetailsAdvanced(false)
  },
  mounted () {
    this.getTemplate()
    this.getyesterday()
    this.getUserName()
  },
  methods: {
    show (config) {
      this.form.resetFields()
      this.userArr = []
      this.visible = true
      this.config = config
      this.callList = [{
        options: [{
          label: '呼入',
          value: 'in'
        }],
        required: false,
        list: []
      }, {
        options: [{
          label: '呼出',
          value: 'out'
        }],
        required: true,
        list: []
      }]
      for (const key in config) {
        this[key] = config[key]
      }
      if (this.config.action !== 'add') {
        this.callList.forEach(item => {
          const obj = this.config.data.comment.find(itemCom => itemCom.type === item.options[0].value)
          if (obj) {
            item.callValue = [obj.type]
            item.commentValue = obj.list.length > 0 ? '1' : '0'
            item.customSelect = obj.list
          }
        })
        this.userArr = this.config.data.extractAgent.map(item => { return Object.assign(item, { text: item.username }) })
        this.config.data.extractAgent = this.config.data.extractAgent.map(item => { return item.username }).join(',')
      }

      this.getCommentDict()
      if (this.config.data.distributionAgent?.dataDistributeList && this.config.action !== 'add') {
        const groupAllocation = []
        this.config.data.distributionAgent.dataDistributeList.forEach(item => {
          groupAllocation.push({
            agent: item.agentRealNames.join(','),
            rate: item.distributionRatio
          })
        })
        this.groupAllocation = groupAllocation
      }
      this.config.data.task_type = '录音质检'
    },
    getCommentDict () {
      this.axios({
        url: '/quality/task/dictComment'
      }).then(res => {
        if (res.code === 0) {
          this.callList.forEach(item => {
            item.list = res.result[`${item.options[0].value}Data`]
          })
        }
      })
    },

    // 添加数据分配 -> 分配给 组件添加
    addallocation (index) {
      this.groupAllocation.splice(index + 1, 0, {
        agent: '',
        rate: 1
      })
    },

    // 添加数据分配 -> 分配给 组件删除
    deleteallocation (index) {
      if (this.groupAllocation.length === 1) {
        return false
      } else {
        this.groupAllocation.splice(index, 1)
      }
    },

    // 获取用户信息
    getUserName () {
      return this.axios({
        url: '/quality/data/getUserArr'
      }).then(res => {
        this.quality_agent = res.result.data
        this.agent = res.result.data
        return res.result
      })
    },
    // 核对任务名称重复
    checknamefun (rule, value, callback) {
      if (this.config.action === 'distribution' || (this.config.action === 'edit' && value === this.config.data.taskName)) {
        callback()
      } else {
        return this.axios({
          url: '/quality/task/checkName',
          params: { name: value }
        }).then(res => {
          if (res.code === 0) {
            callback()
          } else {
            callback(res.message)
          }
        })
      }
    },
    // 获取质检模板信息
    getTemplate () {
      return this.axios({
        url: '/quality/data/getTemplateArr'
      }).then(res => {
        this.temp_name = res.result.map(item => {
          return {
            display: item.templateName,
            value: item.id
          }
        })
      })
    },
    changeOption (e, index) {
      this.callList[index].callValue = e
      const isCheck = this.callList.some(item => item.callValue && item.callValue.length > 0)
      this.form.setFieldsValue({ [`info[${this.callList[index].options[0].value}CallValue]`]: e })
      if (e.length === 0) {
        this.callList[index].commentValue = ''
        this.form.setFieldsValue({ [`info[${this.callList[index].options[0].value}CommentValue]`]: '' })
        // this.form.validateFields()
      }
      this.$set(this.callList[1], 'required', !isCheck)
    },
    changeRadio (e, index) {
      const value = e.target.value
      this.callList[index].commentValue = value
      if (value === '0') {
        this.callList[index].customSelect = []
      }
    },
    changeSelect (e, index) {
      this.callList[index].customSelect = e
    },
    // 添加或修改任务时 关闭或重置
    cancal_off () {
      if (this.config.action === 'edit') {
        this.config.data = {}
        this.groupAllocation = [{
          agent: '',
          rate: 1
        }]
      } else {
        this.visible = false
      }
    },

    // 增加、编辑的数据提交
    handleSubmit (value) {
      value.preventDefault()
      this.form.validateFields((err, values) => {
        const info = values.info
        info['maxBillsec'] = this.config.data.maxBillsec
        values.info['distributionAgent'] = {}
        let name = JSON.parse(JSON.stringify(this.nowtime + '_'))
        for (const i in this.groupAllocation) {
          const index = JSON.parse(JSON.stringify(this.random + Number(i)))
          name = name + index
          values.info['distributionAgent'][name] = {}
          values.info['distributionAgent'][name]['agent'] = this.groupAllocation[i].agent
          values.info['distributionAgent'][name]['rate'] = this.groupAllocation[i].rate
          name = JSON.parse(JSON.stringify(this.nowtime + '_'))
        }
        // 表单验证是否为空
        for (const i in this.groupAllocation) {
          if (!this.groupAllocation[i].agent) {
            this.$set(this.groupAllocation[i], 'agentstatus', 'error')
            this.$set(this.groupAllocation[i], 'agenthelp', '请选择用户')
          } else {
            this.$set(this.groupAllocation[i], 'agentstatus', 'success')
            this.$set(this.groupAllocation[i], 'agenthelp', '')
          }
        }
        const test = JSON.stringify(this.groupAllocation)

        const flag1 = test.indexOf('error') === -1
        if (!flag1 || this.tip) {
          return false
        }
        if (!err) {
          let data = {}
          const { taskName, templateId, minBillsec, maxBillsec, distributionAgent, distributionMode, count, extractAll, remarks } = values.info
          const dataDistributeList = []
          for (const key in distributionAgent) {
            dataDistributeList.push({
              agentRealNames: distributionAgent[key].agent.split(','),
              distributionRatio: distributionAgent[key].rate
            })
          }
          const comment = []
          this.callList.forEach(item => {
            if (item.callValue && item.callValue.length > 0) {
              comment.push({
                type: item.callValue[0],
                list: item.customSelect
              })
            }
          })
          const callType = comment.length === 2 ? 'in&out' : comment[0].type
          data = {
            taskName: taskName,
            templateId: templateId,
            distributionAgent: JSON.stringify({ dataDistributeList: dataDistributeList }),
            minBillsec: minBillsec,
            maxBillsec: maxBillsec,
            callType: callType,
            extractAgent: JSON.stringify(this.userArr.map(item => { return { username: item.username, extension: item.extension || '' } })),
            distributionMode: distributionMode,
            count: count,
            comment: JSON.stringify(comment),
            extractAll: extractAll,
            remarks: remarks
          }
          // 修改数据提交
          if (this.config.action === 'edit') {
            for (const i in this.temp_name) {
              if (values.info['templateId'] === this.temp_name[i].display) {
                values.info['templateId'] = this.temp_name[i].value
              }
            }
            data.id = this.config.id
            this.axios({
              url: '/quality/task/edit',
              data: data
            }).then(res => {
              this.loading = false
              if (res.code === 0) {
                this.form.resetFields()
                this.visible = false
                this.$message.success(res.message || '修改成功')
                this.$emit('ok')
              } else {
                this.$message.error(res.message)
              }
            })
            // 提取分配数据提交
          } else if (this.config.action === 'distribution') {
            data['callBeginTime'] = this.startTime
            data['callEndTime'] = this.endTime
            data.id = this.config.id
            this.axios({
              url: '/quality/task/extractAndDistribute',
              data: data
            }).then((res) => {
              this.loading = false
              if (res.code === 0) {
                this.form.resetFields()
                this.visible = false
                this.$message.success(res.message)
                this.$emit('ok')
              } else {
                this.$message.error(res.message)
              }
            })
            // 添加数据提交
          } else {
            this.axios({
              url: '/quality/task/add',
              data: data
            }).then((res) => {
              this.loading = false
              if (res.code === 0) {
                this.form.resetFields()
                this.visible = false
                this.$message.success('添加成功')
                this.$emit('ok')
              } else {
                this.$message.error(res.message)
              }
            })
          }
        }
      })
    },
    // 数据提取->来自于 选择用户 返回数据
    getUser (val) {
      this.config.data.extractAgent = val.toString()
    },
    // 数据分配->分配给 选择用户 返回数据
    getQc (val) {
      const index = this.config.index
      this.groupAllocation[index].agent = val.toString()
      this.$set(this.groupAllocation[index], 'agentstatus', 'success')
      this.$set(this.groupAllocation[index], 'agenthelp', '')
    },

    // 每人提取数量
    allocate () {
      this.allocatestate = true
    },
    handleUser (val, dataType, initMode, mode) {
      this.userArr = val
      const extractAgent = val.map(item => { return item.username })
      this.config.data.extractAgent = extractAgent.toString()
    },
    // 每人提取数据框不显示
    allocateClose () {
      this.allocatestate = false
    },
    // 刷新
    refresh () {
      this.$refs.table.refresh()
    },
    refresh2 () {
      this.$refs.tableread.refresh()
    },
    refresh3 () {
      this.$refs.tabledetails.refresh()
    },
    // 获取提取分配中呼叫时间
    getcallDate (date, dateString) {
      this.startTime = dateString[0]
      this.endTime = dateString[1]
    },
    // 当前月第一天至今
    getyesterday () {
      const sTime = '00:00:00'
      const eTime = '23:59:59'
      var yestime = new Date()
      yestime.setTime(yestime.getTime() - 24 * 60 * 60 * 1000)
      var yesterday = yestime.getFullYear() + '-' + (yestime.getMonth() + 1) + '-' + yestime.getDate()
      this.startTime = yesterday + ' ' + sTime
      this.endTime = yesterday + ' ' + eTime
      this.callDate = [this.startTime ? this.moment(this.startTime, 'YYYY-MM-DD HH:mm:ss') : '', this.endTime ? this.moment(this.endTime, 'YYYY-MM-DD HH:mm:ss') : '']
    },
    // 数据提取->来自于 选择用户
    handleSelect () {
      this.$refs.fieldFormUser.show({
        optionCustom: this.userArr || [],
        defaultValue: [],
        initMode: '',
        mode: 'multiple',
        dataType: 'optionCustom',
        optionType: 'user'
      })
      // this.$refs.selectUserFormSeat.show({
      //   page: 'statistic',
      //   mode: 'multiple',
      //   selectValue: this.form.getFieldValue('info[extractAgent]') ? this.form.getFieldValue('info[extractAgent]').split(',') : []
      // })
    },
    // 数据分配->分配给 选择用户
    handleSelectQc (data, index) {
      this.config.index = index
      this.$refs.selectUserFormQc.show({
        page: 'statistic',
        mode: 'multiple',
        selectValue: data ? data.split(',') : []
      })
    },
    changedetailsAdvanced (tag) {
      if (tag) {
        this.detailsadvanced = !this.detailsadvanced
      }
      if (this.detailsadvanced) {
        this.colLayout = { xs: 24, sm: 12, md: 8, lg: 8, xl: 6, xxl: 6 }
      } else {
        this.colLayout = { xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 6 }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  margin: 0;
}
/deep/.ant-drawer-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > :first-child:not(.ant-spin-nested-loading) {
    height: calc(100% - 43px);
    padding: 16px;
  }
  > .ant-spin-nested-loading {
    height: 100%;
    > .ant-spin-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      > :first-child {
        flex-grow: 1;
        overflow: auto;
      }
    }
  }
  .ant-tabs-bar {
    margin-top: 2px;
  }
  .drawer-table {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: auto;
  }

  .bbar {
    width: 100%;
    padding: 10px 16px;
    text-align: right;
    border-top: 1px solid #e9e9e9;
    display: flex;
    justify-content: flex-end;
  }
}
/deep/.ant-card-body {
  height: 100%;
}
</style>
