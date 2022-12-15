<template>
  <a-drawer :title="config.title" :width="800" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <div>
        <a-form>
          <a-form-item :label="$t('视图设置')" :labelCol="{ span: 4 }" :wrapperCol="{ span: 10 }">
            <a-radio-group v-model="viewMode" name="radioGroup">
              <a-radio :value="'public'">{{ $t('使用公共视图') }}</a-radio>
              <a-radio :value="'private'">{{ $t('使用个人视图') }}</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-divider orientation="left">{{ $t('数据显示设置') }}</a-divider>
          <a-row>
            <a-col :span="14">
              <a-form-item :label="$t('列锁的起始列数')" :labelCol="{ span: 9 }" :wrapperCol="{ span: 10 }">
                <span style="margin-right: 10px">{{ $t('从左往右') }}</span>
                <a-input-number v-model="lockLeft" :min="0" :max="10" />
              </a-form-item>
              <a-form-item label=" " :labelCol="{ span: 9 }" :wrapperCol="{ span: 10 }" :colon="false">
                <span style="margin-right: 10px">{{ $t('从右往左') }}</span>
                <a-input-number v-model="lockRight" :min="0" :max="10" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                <span slot="label">
                  {{ $t('每页行数') }}
                  <a-tooltip placement="top">
                    <template slot="title">
                      <span>{{ $t('每页行数 最小为5，最大为50') }}</span>
                    </template>
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </span>
                <a-input-number v-model="pageSize" :min="5" :max="50" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <a-divider orientation="left">{{ $t('字段设置') }}</a-divider>
        <a-row :gutter="5">
          <a-col :span="15">
            <a-card :title="$t('选择字段')" size="small" style="margin-bottom: 20px">
              <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
                  全选
                </a-checkbox>
              </div>
              <br />
              <a-checkbox-group v-model="checkedList" style="display: flex; flex-flow: wrap" @change="onChange">
                <div v-for="(value, index) in data" :key="index" style="width: 215px">
                  <a-checkbox :value="value">
                    {{ value.title }}
                  </a-checkbox>
                </div>
              </a-checkbox-group>
            </a-card>
          </a-col>
          <a-col :span="9">
            <a-card :title="$t('当前选定字段')" size="small">
              <div style="margin-bottom: 10px">
                <a @click="refresh">{{ $t('按排序值刷新') }}</a>
              </div>
              <draggable
                v-model="checkedList"
                animation="200"
                handle=".handle"
                @start="drag = true"
                @end="drag = false"
              >
                <a-row
                  v-for="(element, key) in checkedList"
                  :key="element.id"
                  class="list-item"
                  style="margin-bottom: 5px"
                >
                  <a-col :span="2" class="handle">
                    <a-icon type="drag" />
                  </a-col>
                  <a-col :span="5" style="margin-right: 10px">
                    <a-input size="small" :value="(key + 1) * 10" @blur="changesort($event, key)" />
                  </a-col>
                  <a-col :span="13" class="text">
                    <a-tooltip placement="topLeft">
                      <template slot="title">
                        {{ element.title }}
                      </template>
                      <span>{{ element.title }}</span>
                    </a-tooltip>
                  </a-col>
                </a-row>
              </draggable>
            </a-card>
          </a-col>
        </a-row>
      </div>
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">{{ $t('应用') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
    draggable: () => import('vuedraggable')
  },
  data () {
    return {
      config: {},
      visible: false,
      loading: false,
      data: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 19 },
      fontsize: [],
      lockLeft: 0,
      lockRight: 0,
      action: {},
      customColumnsData: {},
      clearShow: false,
      pageSize: 20,
      checkedList: [],
      setting: [],
      templateId: '',
      tableId: '',
      checkAll: false,
      indeterminate: false,
      form: this.$form.createForm(this),
      viewMode: 'public', // public private
      columnTemplate: null,
      columnTemplateId: null
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.loading = true
      this.data = config.originData.filter(item => item.dataIndex !== 'action')
      this.checkedList = []
      this.templateId = config.templateId
      this.tableId = config.tableId
      for (const i in config.data) {
        for (const j in this.data) {
          if (this.data[j].dataIndex === config.data[i].dataIndex && config.data[i].dataIndex !== 'action') {
            this.checkedList.push(this.data[j])
          }
        }
      }
      if (this.checkedList.length > 0 && this.checkedList.length !== this.data.length) {
        this.checkAll = false
        this.indeterminate = true
      } else if (this.checkedList.length === this.data.length) {
        this.checkAll = true
        this.indeterminate = false
      } else {
        this.checkAll = false
        this.indeterminate = false
      }
      this.axios({
        url: '/admin/customize/getColumnTemplate',
        params: {
          templateId: this.templateId
        }
      }).then(res => {
        if (!res.code) {
          this.loading = false
          if (!res.result) {
            return
          }
          this.columnTemplateId = res.result.id
          const setting = res.result.setting
          this.columnTemplate = setting.fieldColumns
          this.lockLeft = Number(setting.lockLeft)
          this.lockRight = Number(setting.lockRight)
          this.pageSize = setting.pageSize
          this.viewMode = setting.viewMode
        }
      })
    },
    // 单选
    onChange (checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < this.data.length
      this.checkAll = checkedList.length === this.data.length
    },
    // 全选
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? this.data : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
    },
    getSortId () {
      for (let i = 0; i < this.checkedList.length; i++) {
        this.checkedList[i]['sortId'] = (i + 1) * 10
      }
    },
    // 改变排序值
    changesort (e, key) {
      this.checkedList[key].sortId = Number(e.target.value)
    },
    // 比较大小
    compare (key) {
      return function (a, b) {
        var value1 = a[key]
        var value2 = b[key]
        return value1 - value2
      }
    },
    // 刷新
    refresh () {
      // 排序方法
      this.checkedList = this.checkedList.sort(this.compare('sortId'))
      this.getSortId()
    },
    async handleSubmit () {
      const setting = {
        lockLeft: this.lockLeft,
        lockRight: this.lockRight,
        pageSize: this.pageSize,
        fieldColumns: JSON.parse(JSON.stringify(this.checkedList)),
        viewMode: this.viewMode
      }
      let url = ''
      let data = {}
      if (this.columnTemplateId) {
        url = '/admin/customize/editColumnTemplate'
        data = {
          id: this.columnTemplateId,
          setting: setting
        }
      } else {
        url = '/admin/customize/addColumnTemplate'
        data = {
          templateId: this.templateId,
          tableId: this.tableId,
          setting: setting
        }
      }
      await this.axios({
        url,
        data
      }).then(res => {
        if (!res.code) {
          const payload = {
            data: this.checkedList,
            lockLeft: this.lockLeft,
            lockRight: this.lockRight,
            pageSize: this.pageSize,
            viewMode: this.viewMode
          }
          this.$emit('ok', payload)
          this.visible = false
        }
      })
    }
  }
}
</script>
