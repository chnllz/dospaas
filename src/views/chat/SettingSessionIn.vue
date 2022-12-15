<template>
  <div>
    <a-form :form="cardForm">
      <a-space direction="vertical" style="width: 100%">
        <a-card size="small" :title="$t('人工接入提示语')" :bodyStyle="bodyStyle">
          <div class="table-operator">
            <a-button icon="plus" @click="handleAdd('prompt')">{{ $t('添加') }}</a-button>
            <a-button icon="sort-ascending" @click="handleSort('prompt')">{{ $t('排序') }}</a-button>
          </div>
          <a-table
            ref="promptLists"
            rowKey="id"
            :columns="prompColumns"
            :dataSource="promptLists"
            size="small"
            :pagination="false"
          >
            <div slot="action" slot-scope="text, record, index">
              <a @click="handleEdit(record, 'prompt')">{{ $t('编辑') }}</a>
              <a-divider type="vertical" />
              <a-popconfirm :title="$t('您确认要删除该记录吗？')" @confirm="handleDelete(index, 'prompt')">
                <a :disabled="record.id == 1">{{ $t('删除') }}</a>
              </a-popconfirm>
            </div>
          </a-table>
        </a-card>
        <a-card size="small" :title="$t('人工接入欢迎语')" :bodyStyle="bodyStyle">
          <div class="table-operator">
            <a-button icon="plus" @click="handleAdd('welcome')">{{ $t('添加') }}</a-button>
            <a-button icon="sort-ascending" @click="handleSort('welcome')">{{ $t('排序') }}</a-button>
          </div>
          <a-table
            ref="welcomeLists"
            rowKey="id"
            :columns="welcomeColumns"
            :dataSource="welcomeLists"
            size="small"
            :pagination="false"
          >
            <div slot="action" slot-scope="text, record, index">
              <a @click="handleEdit(record, 'welcome')">{{ $t('编辑') }}</a>
              <a-divider type="vertical" />
              <a-popconfirm :title="$t('您确认要删除该记录吗？')" @confirm="handleDelete(index, 'welcome')">
                <a :disabled="record.id == 1">{{ $t('删除') }}</a>
              </a-popconfirm>
            </div>
          </a-table>
        </a-card>
        <a-card size="small" :title="$t('客服超时未回复安抚')" :bodyStyle="bodyStyle">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
            <span slot="label">
              {{ $t('是否开启') }}
              <a-tooltip :title="$t('开启后，超过{超时时长}，客服未回复访客，系统会按照设定的规则，向访客发送安抚语')">
                <a-icon type="question-circle" />
              </a-tooltip>
            </span>
            <a-switch
              v-decorator="['timeoutNoReply', { initialValue: data.timeoutNoReply, valuePropName: 'checked' }]"
              :checked-children="$t('开')"
              :un-checked-children="$t('关')"
              @change="(checked) => (data.timeoutNoReply = checked)"
            />
          </a-form-item>
          <template v-if="data.timeoutNoReply || data.timeoutNoReply === true">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
              <span slot="label">
                {{ $t('超时时长') }}
                <a-tooltip :title="$t('默认值60，设置范围10~600')">
                  <a-icon type="question-circle" />
                </a-tooltip>
              </span>
              {{ $t('客服超过') }}
              <a-input-number
                v-decorator="[
                  'timeoutExceed',
                  { initialValue: data.timeoutExceed || 30, rules: [{ required: true, message: $t('请输入超时时长') }] }
                ]"
                style="margin: 0px 8px"
                :min="10"
                :max="600"
              />
              {{ $t('(含)秒未回复') }}
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="$t('安抚频率')">
              <a-row type="flex">
                <a-col flex="90px">{{ $t('每通会话触发') }}</a-col>
                <a-col flex="auto">
                  <a-select
                    v-decorator="[
                      'reassureFrequency',
                      {
                        initialValue: data.reassureFrequency || 'once',
                        rules: [{ required: true, message: $t('请选择安抚频率') }]
                      }
                    ]"
                    style="width: 300px"
                  >
                    <a-select-option value="once">{{ $t('一次') }}</a-select-option>
                    <a-select-option value="many">{{ $t('多次') }}</a-select-option>
                  </a-select>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
              <span slot="label">
                {{ $t('发送顺序') }}
                <a-tooltip>
                  <template slot="title">
                    <div>{{ $t('顺序发送：将设置的安抚语按顺序依次发送。') }}</div>
                    <div>{{ $t('随机发送：将设置的安抚语随机发送。') }}</div>
                  </template>
                  <a-icon type="question-circle" />
                </a-tooltip>
              </span>
              <a-radio-group
                v-decorator="[
                  'sendSequenceType',
                  {
                    initialValue: data.sendSequenceType || 'sequence',
                    rules: [{ required: true, message: $t('请选择发送顺序') }]
                  }
                ]"
              >
                <a-radio value="sequence">{{ $t('顺序发送') }}</a-radio>
                <a-radio value="random">{{ $t('随机发送') }}</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :required="true">
              <span slot="label">
                {{ $t('安抚语') }}
                <a-tooltip :title="$t('安抚语可设置1~10条')">
                  <a-icon type="question-circle" />
                </a-tooltip>
              </span>
              <draggable
                v-model="comfortingLists"
                animation="200"
                handle=".mover"
                @start="drag = true"
                @end="drag = false"
              >
                <template v-for="(item, index) in comfortingLists">
                  <a-row :key="index" type="flex">
                    <a-col flex="30px" class="mover" style="cursor: move; text-align: center">
                      <a-icon type="drag" />
                    </a-col>
                    <a-col :span="12">
                      <a-form-item :validateStatus="item.status" :help="item.help">
                        <a-input
                          v-model="item.value"
                          :placeholder="$t('请输入安抚语')"
                          :maxLength="200"
                          @change="handleValidate(item, index)"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="2" class="center" style="margin-top: 5px">
                      <a-icon
                        :style="{ fontSize: '26px', color: '#52c41a', margin: '0px 8px' }"
                        type="plus-square"
                        theme="filled"
                        @click="add(index)"
                      />
                      <a-icon
                        :style="{ fontSize: '26px', color: comfortingLists.length === 1 ? '#bfbfbf' : '#ff4d4f' }"
                        type="minus-square"
                        theme="filled"
                        @click="del(index)"
                      />
                    </a-col>
                  </a-row>
                </template>
              </draggable>
            </a-form-item>
          </template>
        </a-card>
        <a-card size="small" :title="$t('会话转接')" :bodyStyle="bodyStyle">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
            <span slot="label">
              {{ $t('会话转接确认') }}
              <a-tooltip :title="$t('开启后，被转接客服将收到转接请求确认')">
                <a-icon type="question-circle" />
              </a-tooltip>
            </span>
            <a-switch
              v-decorator="[
                'conversationTransferConfirm',
                { initialValue: data.conversationTransferConfirm, valuePropName: 'checked' }
              ]"
              :checked-children="$t('开')"
              :un-checked-children="$t('关')"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="$t('转接备注是否必填')">
            <a-switch
              v-decorator="[
                'transferRemarkRequired',
                { initialValue: data.transferRemarkRequired, valuePropName: 'checked' }
              ]"
              :checked-children="$t('开')"
              :un-checked-children="$t('关')"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="$t('客服首回合未发言自动转接')">
            <a-switch
              v-decorator="['firstLeg', { initialValue: false, valuePropName: 'checked' }]"
              :disabled="true"
              :checked-children="$t('开')"
              :un-checked-children="$t('关')"
              @change="
                (e) => {
                  $set(data, 'firstLeg', e)
                }
              "
            />
            <template v-if="data.firstLeg">
              <a-form-item
                :labelCol="{ style: 'width: 100px; display: inline-block' }"
                :wrapperCol="{ style: 'width: calc(100% - 100px); display: inline-block' }"
              >
                <span slot="label">
                  {{ $t('超时时间') }}
                  <a-tooltip :title="$t('默认值120，设置范围60~1800')"><a-icon type="question-circle" /></a-tooltip>
                </span>
                <a-input-number
                  v-decorator="[
                    'firstLegTimeout',
                    {
                      initialValue: data.firstLegTimeout || 120,
                      rules: [{ required: true, message: $t('请输入超时时间') }]
                    }
                  ]"
                  :min="60"
                  :max="1800"
                />
                {{ $t('秒(含)') }}
              </a-form-item>
              <a-form-item
                :label="$t('转接至技能组')"
                :labelCol="{ style: 'width: 100px; display: inline-block' }"
                :wrapperCol="{ style: 'width: calc(100% - 100px); display: inline-block' }"
              >
                <a-select
                  v-decorator="[
                    'firstLegGroup',
                    { initialValue: data.firstLegGroup, rules: [{ required: true, message: $t('请选择转接技能组') }] }
                  ]"
                  style="width: 300px"
                  allowClear
                  show-search
                  :filter-option="filterOption"
                >
                  <a-select-option v-for="group in groupList" :key="group.id" :value="group.id">
                    {{ group.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </template>
          </a-form-item>
        </a-card>
        <a-card size="small" :title="$t('其他设置')" :bodyStyle="bodyStyle">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="$t('客服撤回消息是否启用')">
            <a-switch
              v-decorator="['serviceWithdraw', { initialValue: data.serviceWithdraw, valuePropName: 'checked' }]"
              :checked-children="$t('开')"
              :un-checked-children="$t('关')"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="$t('声音提醒')">
            <a-switch
              v-decorator="['soundReminder', { initialValue: data.soundReminder || false, valuePropName: 'checked' }]"
              :checked-children="$t('开')"
              :un-checked-children="$t('关')"
              @change="
                (value) => {
                  data.soundReminder = value
                }
              "
            />
          </a-form-item>
          <template v-if="data.soundReminder">
            <a-row style="width: 450px; margin-top: 6px" :gutter="10">
              <a-col :span="11" style="height: 28px; display: flex; justify-content: flex-end; align-items: center">
                <span>{{ $t('新访客接入时') }}</span>
                <a-checkbox v-model="data.guestAccess" style="margin-left: 4px"></a-checkbox>
              </a-col>
              <a-col :span="12">
                <a-upload
                  :action="`${$store.state.env.VUE_APP_API_BASE_URL}admin/attachment/upload/?uploadName=upload`"
                  :headers="{ 'Access-Token': $store.getters.userInfo.accessToken }"
                  name="upload"
                  listType="text"
                  accept=".mp3,.MP3"
                  :fileList="data.guestAccessFile"
                  :before-upload="beforeUpload"
                  @change="
                    (e) => {
                      fileChange(e, 'guestAccessFile')
                    }
                  "
                >
                  <a-button :disabled="data.guestAccessFile && data.guestAccessFile.length > 0">
                    <a-icon type="upload" />
                    上传
                  </a-button>
                </a-upload>
              </a-col>
            </a-row>
            <a-row style="width: 450px; margin-top: 6px" :gutter="10">
              <a-col :span="11" style="height: 28px; display: flex; justify-content: flex-end; align-items: center">
                <span>{{ $t('访客进入排队时') }}</span>
                <a-checkbox v-model="data.enterQueue" style="margin-left: 4px"></a-checkbox>
              </a-col>
              <a-col :span="12">
                <a-upload
                  :action="`${$store.state.env.VUE_APP_API_BASE_URL}admin/attachment/upload/?uploadName=upload`"
                  :headers="{ 'Access-Token': $store.getters.userInfo.accessToken }"
                  name="upload"
                  listType="text"
                  accept=".mp3,.MP3"
                  :fileList="data.enterQueueFile"
                  :before-upload="beforeUpload"
                  @change="
                    (e) => {
                      fileChange(e, 'enterQueueFile')
                    }
                  "
                >
                  <a-button :disabled="data.enterQueueFile && data.enterQueueFile.length > 0">
                    <a-icon type="upload" />
                    上传
                  </a-button>
                </a-upload>
              </a-col>
            </a-row>
            <a-row style="width: 450px; margin-top: 6px" :gutter="10">
              <a-col :span="11" style="height: 28px; display: flex; justify-content: flex-end; align-items: center">
                <span>{{ $t('访客发新消息时') }}</span>
                <a-checkbox v-model="data.receiveMessage" style="margin-left: 4px"></a-checkbox>
              </a-col>
              <a-col :span="12">
                <a-upload
                  :action="`${$store.state.env.VUE_APP_API_BASE_URL}admin/attachment/upload/?uploadName=upload`"
                  :headers="{ 'Access-Token': $store.getters.userInfo.accessToken }"
                  name="upload"
                  listType="text"
                  accept=".mp3,.MP3"
                  :fileList="data.receiveMessageFile"
                  :before-upload="beforeUpload"
                  @change="
                    (e) => {
                      fileChange(e, 'receiveMessageFile')
                    }
                  "
                >
                  <a-button :disabled="data.receiveMessageFile && data.receiveMessageFile.length > 0">
                    <a-icon type="upload" />
                    上传
                  </a-button>
                </a-upload>
              </a-col>
            </a-row>
            <a-row style="width: 450px; margin-top: 6px" :gutter="10">
              <a-col :span="11" style="height: 28px; display: flex; justify-content: flex-end; align-items: center">
                <span>{{ $t('收到转接请求时') }}</span>
                <a-checkbox v-model="data.transferRequest" style="margin-left: 4px"></a-checkbox>
              </a-col>
              <a-col :span="12">
                <a-upload
                  :action="`${$store.state.env.VUE_APP_API_BASE_URL}admin/attachment/upload/?uploadName=upload`"
                  :headers="{ 'Access-Token': $store.getters.userInfo.accessToken }"
                  name="upload"
                  listType="text"
                  accept=".mp3,.MP3"
                  :fileList="data.transferRequestFile"
                  :before-upload="beforeUpload"
                  @change="
                    (e) => {
                      fileChange(e, 'transferRequestFile')
                    }
                  "
                >
                  <a-button :disabled="data.transferRequestFile && data.transferRequestFile.length > 0">
                    <a-icon type="upload" />
                    上传
                  </a-button>
                </a-upload>
              </a-col>
            </a-row>
          </template>
        </a-card>
      </a-space>
    </a-form>
    <a-button style="margin-top: 16px" type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
    <a-modal
      :title="config.title"
      :width="600"
      :visible="visible"
      :destroyOnClose="true"
      :confirmLoading="loading"
      @ok="modalSubmit"
      @cancel="visible = !visible"
    >
      <a-spin :spinning="loading">
        <a-form :form="form" :labelCol="labelColForm" :wrapperCol="wrapperColForm">
          <a-form-item :label="$t('模板名称')">
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: config.data && config.data.name ? config.data.name : '',
                  rules: [{ transform: (value) => value.trim() }, { required: true, message: $t('请输入模板名称') }]
                }
              ]"
              :maxLength="20"
              :disabled="config.data && config.data.id === 1"
            />
          </a-form-item>
          <a-form-item :label="$t('适用技能组')">
            <a-select
              v-decorator="[
                'group',
                {
                  initialValue: config.data && config.data.group ? config.data.group : undefined,
                  rules: [{ required: !!(config.data && config.data.id !== 1), message: $t('请选择适用技能组') }]
                }
              ]"
              :disabled="config.data && config.data.id === 1"
              allowClear
              mode="multiple"
              show-search
              :filter-option="filterOption"
            >
              <a-select-option v-for="group in groupList" :key="group.id" :value="group.id">
                {{ group.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <span slot="label">
              {{ $t(config.contentTitle) }}
              <a-tooltip>
                <template slot="title">
                  <div>{{ $t('支持模板变量') }}</div>
                  <div>{{ $t('${id}：客服ID') }}</div>
                  <div>{{ $t('${serviceId}：客服账号') }}</div>
                  <div>{{ $t('${nickName}：客服昵称') }}</div>
                </template>
                <a-icon type="question-circle" />
              </a-tooltip>
            </span>
            <a-textarea
              v-decorator="[
                'content',
                {
                  initialValue: config.data && config.data.content ? config.data.content : '',
                  rules: [
                    { transform: (value) => value.trim() },
                    { required: true, message: $t(`请输入${config.contentTitle}`) }
                  ]
                }
              ]"
              :maxLength="200"
              :auto-size="{ minRows: 3, maxRows: 5 }"
            />
          </a-form-item>
          <a-form-item :label="$t('备注')">
            <a-textarea
              v-decorator="['remarks', { initialValue: config.data && config.data.remarks ? config.data.remarks : '' }]"
              :disabled="config.data && config.data.id === 1"
              :maxLength="200"
              :auto-size="{ minRows: 3, maxRows: 5 }"
            />
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
    <drag-sort ref="dragSort" @ok="getList" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('chat'),
  components: {
    DragSort: () => import('@/views/admin/Common/DragSort'),
    draggable: () => import('vuedraggable')
  },
  props: {
    baseAll: {
      type: Object,
      default () {
        return {}
      },
      required: true
    },
    groupList: {
      type: Array,
      default () {
        return []
      },
      required: true
    }
  },
  data () {
    return {
      welcomeColumns: [{
        title: this.$t('操作'),
        width: 100,
        dataIndex: 'action',
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: this.$t('模板名称'),
        width: 200,
        dataIndex: 'name'
      }, {
        title: this.$t('适用技能组'),
        dataIndex: 'group',
        width: 300,
        customRender: (text, record) => {
          let list
          if (text) {
            list = []
            text.forEach(textItem => {
              if (this.groupList.find(item => item.id === textItem)) {
                list.push(this.groupList.find(item => item.id === textItem)['name'])
              }
            })
          } else {
            list = ''
          }
          return list.length ? list.join(',') : '--'
        }
      }, {
        title: this.$t('欢迎语内容'),
        dataIndex: 'content'
      }, {
        title: this.$t('备注'),
        width: 300,
        dataIndex: 'remarks'
      }],
      prompColumns: [{
        title: this.$t('操作'),
        width: 100,
        dataIndex: 'action',
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: this.$t('模板名称'),
        width: 200,
        dataIndex: 'name'
      }, {
        title: this.$t('适用技能组'),
        width: 300,
        dataIndex: 'group',
        customRender: (text, record) => {
          let list
          if (text) {
            list = []
            text.forEach(textItem => {
              if (this.groupList.find(item => item.id === textItem)) {
                list.push(this.groupList.find(item => item.id === textItem)['name'])
              }
            })
          } else {
            list = ''
          }
          return list.length ? list.join(',') : '--'
        }
      }, {
        title: this.$t('提示语内容'),
        dataIndex: 'content'
      }, {
        title: this.$t('备注'),
        width: 300,
        dataIndex: 'remarks'
      }],
      labelCol: { style: 'width: 200px; display: inline-block' },
      wrapperCol: { style: 'width: calc(100% - 200px); display: inline-block' },
      labelColForm: { span: 6 },
      wrapperColForm: { span: 18 },
      data: {},
      welcomeLists: [{
        id: 1,
        name: '默认',
        group: [],
        content: this.$t('您好，我是${' + 'nickName}，很高兴为您服务！'),
        remarks: this.$t('系统默认文案，不可删除')
      }],
      promptLists: [{
        id: 1,
        name: '默认',
        group: [],
        content: this.$t('${' + 'id}号客服为您服务'),
        remarks: this.$t('系统默认文案，不可删除')
      }],
      comfortingLists: [{
        id: 1,
        value: this.$t('已经收到您的消息了，请耐心等待'),
        status: 'success',
        help: ''
      }],
      form: this.$form.createForm(this),
      cardForm: this.$form.createForm(this),
      visible: false,
      loading: false,
      config: {},
      cardType: '',
      sortListType: '',
      bodyStyle: { padding: '10px' }
    }
  },
  created () {
    this.data = this.baseAll
    if (this.baseAll.welcomeLists) {
      this.welcomeLists = JSON.parse(this.baseAll.welcomeLists)
    }
    if (this.baseAll.promptLists) {
      this.promptLists = JSON.parse(this.baseAll.promptLists)
    }
    if (this.baseAll.comfortingLists) {
      this.comfortingLists = JSON.parse(this.baseAll.comfortingLists)
    }
    ['guestAccessFile', 'receiveMessageFile', 'transferRequestFile', 'enterQueueFile'].forEach(alias => {
      this.fileInit(alias)
    })
  },
  methods: {
    fileInit (alias) {
      if (this.data[alias]) {
        const file = this.data[alias][0]
        this.data[alias] = [{
          uid: '-1',
          name: file.fileName,
          status: 'done',
          url: `${this.$store.state.env.VUE_APP_API_BASE_URL}admin/api/download/?filePath=${file.filePath}`,
          response: { result: file }
        }]
      } else {
        this.data[alias] = []
      }
    },
    fileResult (alias) {
      const fileList = this.data[alias] || []
      if (fileList.length > 0) {
        let file = fileList[0]
        file = file.response?.result
        return [file]
      }
      return []
    },
    handleAdd (type) {
      this.cardType = type
      let contentTitle = ''
      if (type === 'welcome') {
        contentTitle = '欢迎语内容'
      } else if (type === 'prompt') {
        contentTitle = '提示语内容'
      }
      this.config = {
        title: this.$t('添加'),
        type: type,
        contentTitle: contentTitle,
        data: {}
      }
      this.visible = true
    },
    handleEdit (record, type) {
      this.cardType = type
      let contentTitle = ''
      if (type === 'welcome') {
        contentTitle = '欢迎语内容'
      } else if (type === 'prompt') {
        contentTitle = '提示语内容'
      }
      this.config = {
        title: this.$t('编辑'),
        type: type,
        contentTitle: contentTitle,
        data: record
      }
      this.visible = true
    },
    // 页面回显图片
    normFile (e) {
      if (Array.isArray(e)) {
        return e
      }
      if (e.fileList.length > 0 && e.fileList.every(item => item.response)) {
        e.fileList = e.fileList.filter(item => item.response && item.response.code === 0)
      }
      return e && e.fileList
    },
    beforeUpload (file) {
      const suffix = file.name.substring(file.name.lastIndexOf('.'), file.name.length)
      if ('mp3,MP3'.indexOf(suffix) !== -1) {
        this.$message.error(this.$t('请上传mp3格式文件'))
        return false
      }
      return true
    },
    fileChange (e, alias) {
      this.data[alias] = e.fileList
    },
    handleDelete (index, type) {
      this[type + 'Lists'].splice(index, 1)
    },
    handleSort (type) {
      this.cardType = type
      this.$refs.dragSort.show({
        sortData: this[type + 'Lists'],
        width: 600,
        placement: 'right'
      })
    },
    getList (data) {
      this[this.cardType + 'Lists'] = data
    },
    // 增加数据源自定义选项
    add (index) {
      if (this.comfortingLists.length >= 10) {
        this.$message.warning(this.$t('安抚语总数请控制在10条以内'))
        return
      }
      const id = new Date().valueOf() + index
      this.comfortingLists.splice(index + 1, 0, { id: id, value: '', status: 'success', help: '' })
    },
    // 删除数据源选项
    del (index) {
      if (this.comfortingLists.length > 1) {
        this.comfortingLists.splice(index, 1)
      }
    },
    // 验证不重复选项
    handleValidate (item, index) {
      const value = {}
      let ids = []
      this.comfortingLists.forEach((ele, eleIndex) => {
        if (ele.value.trim()) {
          if (!value[ele.value]) {
            value[ele.value] = ele
          } else {
            const index1 = value[ele.value].id
            ids.push(index1)
            ids.push(ele.id)
          }
        }
        ele.status = 'success'
        ele.help = ''
      })
      ids = [...new Set(ids)]
      this.comfortingLists.forEach(ele => {
        if (ids.indexOf(ele.id) !== -1) {
          ele.status = 'error'
          ele.help = this.$t('选项值重复')
        } else if (!ele.value.trim()) {
          ele.status = 'error'
          ele.help = this.$t('请输入安抚语')
        }
      })
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    modalSubmit () {
      this.form.validateFields((error, values) => {
        if (!error) {
          if (this.config.data && this.config.data.id) {
            values.id = this.config.data.id
            this[this.cardType + 'Lists'].splice(this[this.cardType + 'Lists'].findIndex(item => item.id === this.config.data.id), 1, values)
          } else {
            values.id = new Date().valueOf()
            this[this.cardType + 'Lists'].push(values)
          }
          this.$message.success(this.$t('操作成功'))
          this.visible = false
        }
      })
    },
    handleSubmit () {
      this.cardForm.validateFields((error, values) => {
        if (!error) {
          this.comfortingLists.forEach(item => {
            if (!item.value) {
              item.status = 'error'
              item.help = this.$t('请输入安抚语')
            }
          })
          if (this.comfortingLists.some(item => item.status === 'error')) { return }
          this.$emit('ok', true)
          values.promptLists = JSON.stringify(this.promptLists)
          values.welcomeLists = JSON.stringify(this.welcomeLists)
          values.comfortingLists = JSON.stringify(this.comfortingLists)

          // 声音提醒设置
          if (this.data.soundReminder) {
            let arr = ['soundReminder', 'guestAccess', 'receiveMessage', 'transferRequest', 'enterQueue']
            arr.forEach(alias => {
              values[alias] = !!this.data[alias]
            })
            arr = ['guestAccessFile', 'receiveMessageFile', 'transferRequestFile', 'enterQueueFile']
            arr.forEach(alias => {
              const result = this.fileResult(alias)
              if (result.length > 0) {
                values[alias] = result
              }
            })
          }
          this.axios({
            url: '/chat/setting/save',
            data: { action: 'submit', info: values }
          }).then(res => {
            this.$emit('ok', false)
            if (res.code === 0) {
              this.$message.success(res.message)
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
