<template>
  <a-drawer :destroyOnClose="true" :title="config.title" :width="1200" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <div class="page">
        <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
          <a-card size="small" :title="$t('搜索')">
            <a-space slot="extra">
              <a-button htmlType="submit" @click="Search" @keyup.enter="Search">{{ $t('搜索') }}</a-button>
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
            </a-space>
            <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
              <a-col :span="8">
                <a-form-item :label="$t('题型')">
                  <a-select v-model.trim="queryParam.type" :allowClear="true" show-search>
                    <a-select-option v-for="(item, key) in questionType" :key="key" :value="item.value">
                      {{ item.type }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item :label="$t('题目')">
                  <a-input v-model.trim="queryParam.title" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
        </a-form>
        <a-space>
          <a-button v-action:add icon="plus" type="primary" @click="addPage">{{ $t('添加') }}</a-button>
          <a-button
            v-action:delect
            icon="delete"
            type="danger"
            :disabled="selectedRowKeys.length == 0"
            @click="handleDelete"
          >
            {{ $t('批量删除') }}
          </a-button>
        </a-space>
        <s-table
          ref="table"
          class="table-fill"
          :scroll="{ y: true }"
          size="small"
          rowKey="id"
          :columns="columns"
          :data="loadDataTable"
          :rowSelection="rowSelection"
          :sorter="{ field: 'id', order: 'descend' }"
        >
          <div slot="type" slot-scope="text">
            <span v-for="(value, index) in questionType" v-show="text === value.value" :key="index">
              {{ value.type }}
            </span>
          </div>
          <div slot="action" slot-scope="text, record">
            <a @click="editPage(record)">{{ $t('编辑') }}</a>
            <a-divider type="vertical" />
            <a @click="handleDelete(record)">{{ $t('删除') }}</a>
          </div>
        </s-table>
      </div>
    </a-spin>
    <questionadd ref="Questionadd" @on-show="submitRefresh" />
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('exam'),
  components: {
    Questionadd: () => import('./Questionadd')
  },
  data () {
    return {
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      advanced: false,
      queryParam: {
        questiontype: undefined
      },
      visible: false,
      loading: false,
      otherstatus: false,
      must: false,
      config: {},
      nairedata: {},
      nariedetails: [],
      firstshow: [],
      TempData: {},
      selectedRowKeys: [],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys
        }
      },
      questionType: [{
        type: this.$t('单选题'),
        value: 'single'
      }, {
        type: this.$t('多选题'),
        value: 'multiple'
      }, {
        type: this.$t('填空题'),
        value: 'fills'
      }, {
        type: this.$t('判断题'),
        value: 'judge'
      }, {
        type: this.$t('简答题'),
        value: 'answer'
      }],
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 120,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: 'ID',
        dataIndex: 'id',
        width: 40,
        sorter: true
      }, {
        title: this.$t('题目'),
        dataIndex: 'title'
      }, {
        title: this.$t('题型'),
        dataIndex: 'type',
        scopedSlots: { customRender: 'type' },
        width: 100
      }, {
        title: this.$t('创建人'),
        dataIndex: 'inputUser',
        width: 100
      }, {
        title: this.$t('创建时间'),
        dataIndex: 'inputTime',
        width: 140
      }, {
        title: this.$t('最后修改人'),
        dataIndex: 'updateUser',
        width: 100
      }, {
        title: this.$t('最后修改时间'),
        dataIndex: 'updateTime',
        width: 140
      }],
      form: this.$form.createForm(this, { name: 'Setting' })
    }
  },
  methods: {
    // 页面数据渲染
    loadDataTable (parameter) {
      return this.axios({
        url: '/exam/question/init',
        data: Object.assign(parameter, this.queryParam, { subjectId: this.config.data.id })
      }).then(res => {
        return res.result
      })
    },
    // 接收传参
    show (config) {
      this.visible = true
      this.config = config
    },
    // 打开添加页面
    addPage () {
      this.$refs.Questionadd.show({
        action: 'add',
        title: this.$t('添加'),
        url: 'exam/question/action',
        type: 'single',
        data: {
          subjectId: this.config.data.id
        }
      })
    },
    // 修改页面
    editPage (record) {
      const type = record.type
      this.$refs.Questionadd.show({
        action: 'edit',
        title: this.$t('编辑'),
        url: '/exam/question/action',
        type: type,
        data: record
      })
    },
    // 刷新表格  搜索
    Search () {
      const table = this.$refs.table
      table.refresh()
    },
    // 删除
    handleDelete (record) {
      const table = this.$refs.table
      let id = record && record.id || this.selectedRowKeys
      if (id.length > 0) {
        id = id.toString()
      }
      const self = this
      this.$confirm({
        title: record ? self.$t('您确认要删除该记录吗？') : self.$t('您确认要删除选中的记录吗？'),
        onOk () {
          self.axios({
            url: '/exam/question/action',
            data: { id: id, action: 'delete' }
          }).then(res => {
            self.$message.success(self.$t('删除成功'))
            table.refresh()
          })
        }
      })
    },
    refresh () {
      this.$refs.table.refresh()
    },
    submitRefresh () {
      this.$refs.table.refresh()
      this.$emit('ok', '')
    }
  }
}
</script>
