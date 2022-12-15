<template>
  <a-spin :spinning="loading">
    <a-form :form="cardForm">
      <a-space direction="vertical" style="width: 100%">
        <a-card size="small" :title="$t('留言模板')" :bodyStyle="bodyStyle">
          <div class="table-operator">
            <a-button icon="plus" @click="handleAdd">{{ $t('添加') }}</a-button>
          </div>
          <a-table
            ref="messageTemplate"
            rowKey="id"
            :columns="templateColumns"
            :dataSource="messageTemplate"
            size="small"
            :pagination="false"
          >
            <div slot="action" slot-scope="text, record, index">
              <a @click="handleEdit(record)">{{ $t('编辑') }}</a>
              <a-divider type="vertical" />
              <a-popconfirm :title="$t('您确认要删除该记录吗？')" @confirm="handleDelete(index)">
                <a :disabled="record.id == 1">{{ $t('删除') }}</a>
              </a-popconfirm>
            </div>
          </a-table>
        </a-card>
        <a-card size="small" :title="$t('留言处理规则')" :bodyStyle="bodyStyle">
          <a-divider orientation="left" style="margin-bottom: 8px">
            {{ $t('留言自动处理') }}
            <a-tooltip :title="$t('开启处理规则，满足对应场景时，对应留言将由系统处理，{处理人}为“系统”')">
              <a-icon type="question-circle" />
            </a-tooltip>
          </a-divider>
          <a-form-item>
            <a-switch
              v-decorator="['autoMessageProcess', { initialValue: false, valuePropName: 'checked' }]"
              :disabled="true"
              style="margin-right: 8px"
            />
            {{
              $t(
                '访客进线时，若该访客存在未处理的留言，将自动由系统处理。{留言状态}设置为“已处理”，{处理人}设置为“系统”'
              )
            }}
          </a-form-item>
          <a-form-item>
            <a-switch
              v-decorator="['setMessageHandler', { initialValue: false, valuePropName: 'checked' }]"
              :disabled="true"
              style="margin-right: 8px"
            />
            {{
              $t(
                '客服在留言处理入口向访客发起会话，当前留言的{处理人}设置为当前客服。该访客其他未处理的留言将自动由系统处理，{留言状态}设置为“已处理”，{处理人}设置为“系统”'
              )
            }}
          </a-form-item>
          <a-divider orientation="left" style="margin-bottom: 8px">{{ $t('无效留言处理') }}</a-divider>
          <a-form-item
            :labelCol="{ style: 'width: 160px; display: inline-block' }"
            :wrapperCol="{ style: 'width: calc(100% - 160px); display: inline-block' }"
          >
            <span slot="label">
              {{ $t('记录并统计无效留言') }}
              <a-tooltip :title="$t('访客没有留下消息的留言视为无效留言。开启后，系统将记录并统计无效留言')">
                <a-icon type="question-circle" />
              </a-tooltip>
            </span>
            <a-switch
              v-decorator="['recordMessage', { initialValue: false, valuePropName: 'checked' }]"
              :disabled="true"
            />
          </a-form-item>
        </a-card>
        <a-card size="small" :title="$t('留言分配规则')" :bodyStyle="bodyStyle">
          <a-form-item
            :label="$t('留言分配规则')"
            :labelCol="{ style: 'width: 120px; display: inline-block' }"
            :wrapperCol="{ style: 'width: calc(100% - 120px); display: inline-block' }"
          >
            <a-radio-group
              v-decorator="['distributionMode', { initialValue: 'manual' }]"
              :disabled="true"
              @change="(e) => (data.distributionMode = e.target.value)"
            >
              <a-radio value="auto">{{ $t('自动分配') }}</a-radio>
              <a-radio value="manual">{{ $t('手动分配') }}</a-radio>
            </a-radio-group>
          </a-form-item>
          <template v-if="cardForm.getFieldValue('distributionMode') === 'auto' || data.distributionMode === 'auto'">
            <a-alert
              :message="
                $t('自动分配时，系统将根据勾选的分配规则，按以下优先级进行分配：负责人 > 分配入口 > 按工作量平均分配')
              "
              type="info"
            />
            <a-form-item
              label=" "
              :colon="false"
              :labelCol="{ style: 'width: 120px; display: inline-block' }"
              :wrapperCol="{ style: 'width: calc(100% - 120px); display: inline-block' }"
            >
              <a-checkbox-group
                v-decorator="['allocationRules', { initialValue: data.allocationRules || ['workload'] }]"
              >
                <a-checkbox value="responsible" style="width: 100%">
                  {{ $t('负责人') }}
                  <a-tooltip :title="$t('需个性化开发对接')">
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </a-checkbox>
                <a-checkbox value="entrance" style="width: 100%">
                  {{ $t('分配入口优先') }}
                  <a-tooltip
                    :title="$t('访客分配到个人的，直接将留言分配给个人；访客分配到技能组的，将留言在技能组中随机分配')"
                  >
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </a-checkbox>
                <a-checkbox value="workload" :disabled="true" style="width: 100%">
                  {{ $t('按工作量平均分') }}
                  <a-tooltip
                    :title="$t('访客分配到个人的，直接将留言分配给个人；访客分配到技能组的，将留言在技能组中随机分配')"
                  >
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </a-checkbox>
              </a-checkbox-group>
            </a-form-item>
            <a-row :gutter="[0, 8]">
              <a-col :span="2"></a-col>
              <a-col :span="22">
                <a @click="messageRulesList.push({})">{{ $t('添加') }}</a>
              </a-col>
            </a-row>
            <a-row v-for="(rulesItem, rulesIndex) in messageRulesList" :key="'rule' + rulesIndex" :gutter="[8, 8]">
              <a-col :span="2"></a-col>
              <a-col :span="6">
                <a-form-item>
                  <a-select
                    v-decorator="[
                      'messageRulesList[' + rulesIndex + '][template]',
                      {
                        initialValue: rulesItem.template || undefined,
                        rules: [{ required: true, message: $t('请选择留言模板') }]
                      }
                    ]"
                    allowClear
                    mode="multiple"
                    show-search
                    :placeholder="$t('请选择留言模板')"
                    :filter-option="filterOption"
                  >
                    <a-select-option v-for="group in messageTemplate" :key="group.id" :value="group.id">
                      {{ group.messageName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item>
                  <a-select
                    v-decorator="[
                      'messageRulesList[' + rulesIndex + '][servers]',
                      {
                        initialValue: rulesItem.servers || undefined,
                        rules: [{ required: true, message: $t('请选择客服') }]
                      }
                    ]"
                    allowClear
                    mode="multiple"
                    :placeholder="$t('请选择客服')"
                    show-search
                    :filter-option="filterOption"
                  >
                    <a-select-option v-for="server in serversList" :key="server.value" :value="server.value">
                      {{ server.label }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col
                :span="1"
                class="center"
                style="display: flex; align-items: center; justify-content: space-evenly; margin-top: 4px"
              >
                <a-icon
                  :style="{ fontSize: '26px', color: '#ff4d4f' }"
                  type="minus-square"
                  theme="filled"
                  @click="messageRulesList.splice(rulesIndex, 1)"
                />
              </a-col>
            </a-row>
          </template>
        </a-card>
      </a-space>
      <a-button style="margin-top: 16px" type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
      <setting-message-form ref="settingMessageForm" @ok="getTemplate" />
    </a-form>
  </a-spin>
</template>
<script>
export default {
  i18n: window.lang('crm'),
  components: {
    SettingMessageForm: () => import('./SettingMessageForm')
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
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      data: {},
      templateColumns: [{
        title: this.$t('操作'),
        width: 100,
        dataIndex: 'action',
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: this.$t('模板名称'),
        dataIndex: 'messageName'
      }, {
        title: this.$t('适用技能组'),
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
        title: this.$t('备注'),
        dataIndex: 'remarks'
      }],
      bodyStyle: { padding: '10px' },
      queueColumns: [],
      calmColumns: [],
      askColumns: [],
      messageTemplate: [{
        id: 1,
        messageName: this.$t('默认'),
        group: [],
        messageNoWorkTime: this.$t('当前客服不在线，如需帮助请留言'),
        messageWorkTime: this.$t('为了节省您的时间，请留下您的联系方式和遇到的问题，我们将尽快联系您'),
        messageFieldList: [{
          alias: 'xm',
          name: this.$t('姓名'),
          check: false
        }, {
          alias: 'sj',
          name: this.$t('手机'),
          check: false
        }, {
          alias: 'yx',
          name: this.$t('邮箱'),
          check: false
        }],
        remarks: this.$t('系统默认模板，不可删除')
      }],
      messageRulesList: [],
      form: this.$form.createForm(this),
      cardForm: this.$form.createForm(this),
      visible: false,
      loading: false,
      config: {},
      serversList: [],
      cardType: '',
      sortListType: ''
    }
  },
  watch: {
    baseAll: {
      handler (newValue) {
        this.data = newValue
        if (newValue.messageRulesList) {
          this.messageRulesList = JSON.parse(newValue.messageRulesList)
        }
        if (newValue.messageTemplate) {
          this.messageTemplate = JSON.parse(newValue.messageTemplate)
          this.messageTemplate.forEach(item => { item.messageName = this.$t(item.messageName); item.remarks = this.$t(item.remarks) })
        }
        if (newValue.allocationRules) {
          this.data.allocationRules = JSON.parse(newValue.allocationRules)
        }
      },
      immediate: true
    }
  },
  created () {
    this.axios({
      url: '/chat/customerReport/serviceListInit'
    }).then(res => {
      this.serversList = res.result
    })
  },
  methods: {
    handleAdd () {
      this.$refs.settingMessageForm.show({
        title: this.$t('添加'),
        data: {},
        groupList: this.groupList
      })
    },
    handleEdit (record) {
      this.$refs.settingMessageForm.show({
        title: this.$t('编辑'),
        data: record,
        groupList: this.groupList
      })
    },
    handleDelete (index) {
      this.messageTemplate.splice(index, 1)
    },
    getTemplate (obj) {
      const index = this.messageTemplate.findIndex(item => item.id === obj.id)
      if (index !== -1) {
        this.messageTemplate.splice(index, 1, obj)
      } else {
        this.messageTemplate.push(obj)
      }
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    handleSubmit () {
      this.cardForm.validateFields((errors, values) => {
        if (!errors) {
          this.loading = true
          values.messageTemplate = JSON.stringify(this.messageTemplate)
          values.messageRulesList = JSON.stringify(values.messageRulesList)
          values.allocationRules = JSON.stringify(this.allocationRules)
          this.axios({
            url: '/chat/setting/save',
            data: { action: 'submit', info: values }
          }).then(res => {
            this.loading = false
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
