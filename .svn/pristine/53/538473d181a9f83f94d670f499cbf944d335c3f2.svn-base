<template>
  <a-drawer :title="config.title" :width="1200" :visible="visible" :destroyOnClose="true" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-tabs @change="handleTabChange">
        <a-tab-pane key="1" :tab="$t('基础设置')">
          <a-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-divider orientation="left">{{ $t('基本信息') }}</a-divider>
            <a-form-item :label="$t('机器人头像')" :help="$t('图片尺寸为 100 X 100')">
              <a-upload
                :action="`${$store.state.env.VUE_APP_API_BASE_URL}admin/attachment/upload/?uploadName=upload`"
                :headers="{ 'Access-Token': $store.getters.userInfo.accessToken }"
                name="upload"
                listType="picture-card"
                :fileList="imageFileList"
                @preview="handleImagePreview"
                @change="handleImageChange"
              >
                <div v-if="imageFileList.length < 1">
                  <a-icon type="plus" />
                  <div>Upload</div>
                </div>
              </a-upload>
              <a-modal
                :visible="imagePreviewVisible"
                :footer="null"
                @cancel="imagePreviewVisible = !imagePreviewVisible"
              >
                <img alt="example" style="width: 100%" :src="imagePreviewUrl" />
              </a-modal>
            </a-form-item>
            <a-form-item :label="$t('机器人名称')">
              <a-input
                v-decorator="[
                  'info[name]',
                  { initialValue: data.name, rules: [{ required: true, message: $t('请输入机器人名称') }] }
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('机器人昵称')">
              <a-input
                v-decorator="[
                  'info[nickName]',
                  { initialValue: data.nickName, rules: [{ required: true, message: $t('请输入机器人昵称') }] }
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('机器人备注')">
              <a-input
                v-decorator="[
                  'info[remarks]',
                  { initialValue: data.remarks, rules: [{ message: $t('请输入机器人备注') }] }
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('机器人欢迎语消息')">
              <a-textarea
                v-decorator="[
                  'info[setting][welcomeMessage]',
                  { initialValue: data.setting ? data.setting.welcomeMessage : '' }
                ]"
                :autoSize="{ minRows: 2 }"
              />
            </a-form-item>
            <a-divider orientation="left">{{ $t('相似问题引导') }}</a-divider>
            <a-form-item :label="$t('Web/APP端')">
              <a-input
                v-decorator="[
                  'info[setting][similarProblem][appOrWebPort]',
                  { initialValue: data.setting ? data.setting.similarProblem.appOrWebPort : '' }
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('微信')">
              <a-input
                v-decorator="[
                  'info[setting][similarProblem][wxPort]',
                  { initialValue: data.setting ? data.setting.similarProblem.wxPort : '' }
                ]"
              />
            </a-form-item>
            <a-divider orientation="left">{{ $t('未知问题回答') }}</a-divider>
            <a-form-item :label="$t('Web/APP端')">
              <a-input
                v-decorator="[
                  'info[setting][unknownProblem][appOrWebPort]',
                  { initialValue: data.setting ? data.setting.unknownProblem.appOrWebPort : '' }
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('微信')">
              <a-input
                v-decorator="[
                  'info[setting][unknownProblem][wxPort]]',
                  { initialValue: data.setting ? data.setting.unknownProblem.wxPort : '' }
                ]"
              />
            </a-form-item>
            <a-divider orientation="left">
              {{
                $t(
                  '用户进入机器人时，会推送设置好的常见问题。失效的问题不会显示，若所有问题均失效，则无法正常推送常见问题'
                )
              }}
            </a-divider>
            <a-form-item :label="$t('Web/APP入口')">
              <a-switch
                v-decorator="[
                  'info[setting][push][appOrWebEntrance]',
                  { initialValue: data.setting ? data.setting.push.appOrWebEntrance : false, valuePropName: 'checked' }
                ]"
                :un-checked-children="$t('关')"
                :checked-children="$t('开')"
              />
            </a-form-item>
            <a-form-item :label="$t('微信')">
              <a-switch
                v-decorator="[
                  'info[setting][push][wxEntrance]',
                  { initialValue: data.setting ? data.setting.push.wxEntrance : false, valuePropName: 'checked' }
                ]"
                :un-checked-children="$t('关')"
                :checked-children="$t('开')"
              />
              <span style="margin-left: 16px">{{ $t('微信端会为常见问题自动添加数字编号') }}</span>
            </a-form-item>
            <a-form-item :label="$t('引导语')">
              <a-row>
                <a-col :span="16">
                  <a-input
                    v-decorator="[
                      'info[setting][push][guide]',
                      { initialValue: data.setting ? data.setting.push.guide : '' }
                    ]"
                  />
                </a-col>
                <a-col :span="8">
                  <span style="padding-left: 16px">{{ $t('微信端自动添加“您可以回复对应序号提问”') }}</span>
                </a-col>
              </a-row>
            </a-form-item>
            <a-divider orientation="left">{{ $t('其他设置') }}</a-divider>
            <a-form-item :label="$t('常驻人工客服入口')">
              <a-switch
                v-decorator="[
                  'info[setting][residentManualCustomerServiceEntrance]',
                  {
                    initialValue: data.setting ? data.setting.residentManualCustomerServiceEntrance : false,
                    valuePropName: 'checked'
                  }
                ]"
                :un-checked-children="$t('关')"
                :checked-children="$t('开')"
              />
              <span style="margin-left: 16px">
                {{ $t('开启后，访客可直接点击聊天窗口的人工服务按钮联系人工客服，仅Web/App端有效') }}
              </span>
            </a-form-item>
            <a-form-item :label="$t('机器人寒暄开关')">
              <a-switch
                v-decorator="[
                  'info[setting][greeting]',
                  { initialValue: data.setting ? data.setting.greeting : false, valuePropName: 'checked' }
                ]"
                :un-checked-children="$t('关')"
                :checked-children="$t('开')"
              />
              <span style="margin-left: 16px">{{ $t('开启后，机器人将会对用户发来的寒暄做出回应') }}</span>
            </a-form-item>
            <a-form-item :label="$t('机器人解答率')">
              <a-row>
                <a-col :span="6">
                  <a-input-number
                    v-decorator="[
                      'info[setting][answerRate]',
                      { initialValue: data.setting ? data.setting.answerRate : '' }
                    ]"
                  />
                </a-col>
                <a-col :span="16">
                  <span style="margin-left: 8px">{{ $t('小时') }}</span>
                  <span style="margin-left: 16px">
                    {{ $t('访客咨询机器人后，在设定时间内未咨询人工视为解决，该统计数据有一定延时') }}
                  </span>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item :label="$t('机器人答案评价')">
              <a-switch
                v-decorator="[
                  'info[setting][evaluation]',
                  { initialValue: data.setting ? data.setting.evaluation : false, valuePropName: 'checked' }
                ]"
                :un-checked-children="$t('关')"
                :checked-children="$t('开')"
              />
              <span style="margin-left: 16px">
                {{ $t('开启后，机器人回答的内容会出现“有用”、“无用”，供访客选择') }}
              </span>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('转人工关键词')" :disabled="config.action === 'add'">
          <a-card size="small" :bordered="true" style="margin-bottom: 8px">
            <a-form layout="inline" style="display: flex">
              <a-form-item :label="$t('关键词')">
                <a-input v-model="queryParam.keyword"></a-input>
              </a-form-item>
              <a-space>
                <a-button
                  htmlType="submit"
                  type="primary"
                  @click="
                    queryParam.robotId = config.record.id
                    $refs.table.refresh(true)
                  "
                >
                  {{ $t('搜索') }}
                </a-button>
                <a-button
                  @click="
                    () => {
                      queryParam = {}
                      $refs.table.refresh(true)
                    }
                  "
                >
                  {{ $t('重置') }}
                </a-button>
                <a-button type="primary" icon="plus" @click="handleAdd">{{ $t('添加') }}</a-button>
              </a-space>
            </a-form>
          </a-card>
          <s-table
            ref="table"
            size="small"
            rowKey="id"
            :columns="columns"
            :data="loadDataTable"
            :sorter="{ field: 'id', order: 'descend' }"
          >
            <span slot="mode" slot-scope="text">
              {{ text === 'cn' ? $t('包含匹配') : $t('完全匹配') }}
            </span>
            <span slot="status" slot-scope="text">
              {{ text === 1 ? $t('启用') : $t('禁用') }}
            </span>
            <div slot="action" slot-scope="text, record">
              <a @click="handleEdit(record)">{{ $t('编辑') }}</a>
              <a-divider type="vertical" />
              <a @click="handleDelete(record)">{{ $t('删除') }}</a>
            </div>
          </s-table>
        </a-tab-pane>
        <a-tab-pane key="3" :tab="$t('常见问题')" :disabled="config.action === 'add'">
          <SettingRobotQuestion v-if="currentTab == 3" :robotId="config.record.id" />
        </a-tab-pane>
        <a-tab-pane key="4" :tab="$t('机器人知识库')" :disabled="config.action === 'add'">
          <SettingRobotClassify v-if="currentTab == 4" :robotId="config.record.id || 0" />
        </a-tab-pane>
      </a-tabs>
      <div class="bbar">
        <a-button v-if="currentTab == 1" type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
    <transform-customer ref="TransformCustomer" @ok="refreshSure" />
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('chat'),
  components: {
    TransformCustomer: () => import('./TransformCustomer'),
    SettingRobotClassify: () => import('./SettingRobotClassify'),
    SettingRobotQuestion: () => import('./SettingRobotQuestion')
  },
  data () {
    return {
      currentTab: 1,
      imageFileList: [],
      imagePreviewVisible: false,
      imagePreviewUrl: '',
      // 搜索参数
      queryParam: {},
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        align: 'center',
        width: 120,
        scopedSlots: { customRender: 'action' }
      }, {
        title: this.$t('关键词'),
        dataIndex: 'keyword',
        width: 200,
        sorter: true
      }, {
        title: this.$t('匹配模式'),
        dataIndex: 'mode',
        scopedSlots: { customRender: 'mode' }
      }, {
        title: this.$t('启用状态'),
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' }
      }, {
        title: this.$t('更新时间'),
        dataIndex: 'updateTime'
      }],
      config: {},
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
      visible: false,
      loading: false,
      data: {},
      form: this.$form.createForm(this)
    }
  },
  methods: {
    show (config) {
      this.currentTab = 1
      this.visible = true
      this.config = JSON.parse(JSON.stringify(config))
      if (config.action === 'add') {
        this.data = {}
        this.imageFileList = []
      } else {
        this.loading = true
        this.axios({
          url: this.config.url,
          data: Object.assign({
            action: 'get',
            id: config.record ? config.record.id : ''
          })
        }).then((res) => {
          this.loading = false
          this.data = res.result.data
          this.data.setting = JSON.parse(this.data.setting)
          if (this.data.avatar) {
            this.imageFileList = [{
              uid: '-1',
              name: this.data.avatar,
              status: 'done',
              url: this.$store.state.env.VUE_APP_API_BASE_URL + 'admin/api/download/?filePath=' + this.data.avatar,
              response: { result: { filePath: this.data.avatar } }
            }]
          } else {
            this.imageFileList = []
          }
        })
      }
    },
    // 页面渲染
    loadDataTable (parameter) {
      return this.axios({
        url: '/chat/keyword/init',
        data: Object.assign(parameter, this.queryParam, { robotId: this.config.record ? this.config.record.id : '' })
      }).then(res => {
        return res.result
      })
    },
    handleDelete (record) {
      const self = this
      this.$confirm({
        title: this.$t('您确认要删除该记录吗？'),
        onOk () {
          self.axios({
            url: '/chat/keyword/delete',
            data: { id: record.id }
          }).then(res => {
            self.$message.success(res.message)
            self.$refs.table.refresh()
          })
        }
      })
    },
    handleEdit (record) {
      this.$refs.TransformCustomer.show({
        action: 'edit',
        title: this.$t('编辑'),
        url: '/chat/keyword/edit',
        data: Object.assign(record, { robotId: this.config.record.id })
      })
    },
    handleAdd (record) {
      this.$refs.TransformCustomer.show({
        action: 'add',
        title: this.$t('添加'),
        url: '/chat/keyword/add',
        data: Object.assign(record, { robotId: this.config.record.id })
      })
    },
    refreshSure () {
      this.$refs.table.refresh(true)
    },
    handleTabChange (e) {
      this.currentTab = e
    },
    handleImageChange ({ fileList }) {
      this.imageFileList = fileList
    },
    handleImagePreview (file) {
      this.imagePreviewUrl = file.url || file.thumbUrl
      this.imagePreviewVisible = true
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (this.imageFileList.length > 0) {
          values.info = Object.assign(values.info, {
            avatar: this.imageFileList[0].response.result.filePath
          })
        }
        values.info.setting = JSON.stringify(values.info.setting)
        if (!errors) {
          this.loading = true
          this.axios({
            url: this.config.url,
            data: {
              id: this.data.id,
              info: values.info
            }
          }).then((res) => {
            this.visible = false
            this.loading = false
            this.$emit('ok', values)
            if (res.code === 0) {
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
            this.form.resetFields()
          })
        }
      })
    }
  }
}
</script>
