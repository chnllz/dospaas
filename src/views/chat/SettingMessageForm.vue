<template>
  <div>
    <a-modal
      :destroyOnClose="true"
      :title="config.title"
      :width="900"
      :bodyStyle="{
        height: 'calc(100vh - 150px)',
        overflow: 'auto'
      }"
      centered
      :visible="visible"
      @ok="handleSubmit"
      @cancel="visible = !visible"
    >
      <a-spin :spinning="loading">
        <a-alert :message="$t('留言提示语由进入留言的场景决定。')" style="margin-bottom: 8px" />
        <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-form-item :label="$t('模板名称')">
            <a-input
              v-decorator="[
                'messageName',
                {
                  initialValue: data.messageName,
                  rules: [
                    { required: true, message: $t('请输入模板名称') },
                    { min: 2, message: $t('请输入至少2个字符') }
                  ]
                }
              ]"
              :placeholder="$t('请输入模板名称')"
              :disabled="data.id === 1"
              :maxLength="20"
            />
          </a-form-item>
          <a-form-item :label="$t('适用技能组')">
            <a-select
              v-decorator="[
                'group',
                {
                  initialValue: data.group || undefined,
                  rules: [{ required: data.id !== 1, message: $t('请选择适用技能组') }]
                }
              ]"
              :disabled="data.id === 1"
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
          <!-- <a-form-item :label="$t('非服务时间提示')">
            <a-textarea
              v-decorator="['messageNoWorkTime', { initialValue: data.messageNoWorkTime, rules: [{ required: true, message: $t('请输入非服务时间提示')}] }]"
              :placeholder="$t('请输入非服务时间提示')"></a-textarea>
          </a-form-item>
          <a-form-item :label="$t('服务时间提示')">
            <a-textarea
              v-decorator="['messageWorkTime', { initialValue: data.messageWorkTime, rules: [{ required: true, message: $t('请输入服务时间提示')}] }]"
              :placeholder="$t('请输入服务时间提示')"></a-textarea>
          </a-form-item> -->
          <a-form-item :label="$t('留言字段')">
            <a-row>
              <a-col :span="24">
                <a-tooltip :title="$t('可选择的字段，需要现在留言数据表中添加')">
                  <a-button type="link" icon="plus" style="border: 0; padding: 0" @click="addMessageField">
                    {{ $t('添加字段') }}
                  </a-button>
                </a-tooltip>
              </a-col>
            </a-row>
            <draggable
              v-model="messageFieldList"
              animation="200"
              handle=".mover"
              @start="drag = true"
              @end="drag = false"
            >
              <a-form-item
                v-for="(item, index) in messageFieldList"
                :key="index"
                :validateStatus="item.status"
                :help="item.help"
                :label-col="{ span: 0 }"
                :wrapper-col="{ span: 24 }"
              >
                <a-row type="flex" align="middle">
                  <a-col :span="1" class="mover" style="cursor: move; text-align: center">
                    <a-icon type="drag" />
                  </a-col>
                  <a-col :span="12">
                    <a-select
                      v-model="item.alias"
                      :placeholder="$t('请选择留言字段')"
                      allowClear
                      show-search
                      style="width: 100%"
                    >
                      <a-select-option
                        v-for="messageItem in messageField"
                        :key="messageItem.alias"
                        :disabled="messageFieldList.some((someItem) => someItem.alias == messageItem.alias)"
                        :value="messageItem.alias"
                      >
                        {{ messageItem.name }}
                      </a-select-option>
                    </a-select>
                  </a-col>
                  <a-col :span="3" style="text-align: center">
                    <a-checkbox v-model="item.check">{{ $t('必填') }}</a-checkbox>
                  </a-col>
                  <a-col
                    :span="2"
                    class="center"
                    style="display: flex; align-items: center; justify-content: space-evenly"
                  >
                    <a-icon
                      :style="{ fontSize: '26px', color: '#52c41a' }"
                      type="plus-square"
                      theme="filled"
                      @click="addMessageField(index)"
                    />
                    <a-icon
                      :style="{ fontSize: '26px', color: messageFieldList.length === 1 ? '#bfbfbf' : '#ff4d4f' }"
                      type="minus-square"
                      theme="filled"
                      @click="remove(index)"
                    />
                  </a-col>
                </a-row>
              </a-form-item>
            </draggable>
          </a-form-item>
          <a-form-item :label="$t('备注')">
            <a-textarea
              v-decorator="['remarks', { initialValue: data.remarks }]"
              :maxLength="200"
              :disabled="data.id === 1"
              :auto-size="{ minRows: 3, maxRows: 5 }"
            />
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>
<script>
export default {
  i18n: window.lang('chat'),
  components: {
    draggable: () => import('vuedraggable')
  },
  data () {
    return {
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      config: {},
      data: {},
      groupList: [],
      messageField: [],
      messageFieldList: [],
      checkMessageAppend: false,
      messageIndex: 0,
      formCheck: this.$form.createForm(this)
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.data = config.data
      this.groupList = config.groupList
      this.messageFieldList = config.data && config.data.messageFieldList ? config.data.messageFieldList : [{ alias: undefined, check: false }]
      this.getFeild()
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    getFeild () {
      this.axios({
        url: '/admin/field/getFieldInfos',
        data: {
          tableId: '579620b9850b4fb480d1064c3e9b5ecb'
        }
      }).then(res => {
        this.messageField = res.result.filter(item => item.category === '留言模板')
      })
    },
    addMessageField (index) {
      this.messageFieldList.splice(index + 1, 0, {
        check: false
      })
    },
    remove (index) {
      if (this.messageFieldList.length > 1) {
        this.messageFieldList.splice(index, 1)
      }
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          values.messageFieldList = this.messageFieldList.filter(item => item.alias)
          values.messageFieldList.forEach(item => {
            const field = this.messageField.find(findItem => findItem.alias === item.alias)
            item.name = field ? field.name : ''
          })
          values.id = this.data && this.data.id ? this.data.id : new Date().valueOf()
          this.$message.success(this.$t('操作成功'))
          this.$emit('ok', values)
          this.visible = false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.iconStyle {
  font-size: 16px;
}
</style>
