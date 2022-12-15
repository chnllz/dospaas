<template>
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
          <a-col :span="6">
            <a-form-item :label="$t('试卷类型')">
              <a-select v-model="queryParam.type" :allowClear="true" :showSearch="true">
                <a-select-option v-for="value in paperType" :key="value.value" :value="value.value">
                  {{ value.type }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('试卷名称')">
              <a-input v-model.trim="queryParam.title" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('创建人')">
              <a-input v-model.trim="queryParam.inputUser" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('创建时间')">
              <a-range-picker
                v-model="queryParam.inputshowtime"
                :ranges="{
                  [$t('今天')]: [moment().startOf('day'), moment().endOf('day')],
                  [$t('昨天')]: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
                  [$t('本周')]: [moment().startOf('week'), moment().endOf('week')],
                  [$t('本月')]: [moment().startOf('month'), moment().endOf('month')]
                }"
                :show-time="{ format: 'HH:mm:ss' }"
                format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
                @change="getinputtime"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <a-space>
      <a-tooltip>
        <template slot="title">
          <div>{{ $t('自主选择题库中的题目来组成试卷') }}</div>
        </template>
        <a-button v-action:add icon="plus" type="primary" @click="addPage('fixed')">{{ $t('添加固定试卷') }}</a-button>
      </a-tooltip>
      <a-tooltip>
        <template slot="title">
          <div>{{ $t('设置抽题规则后，在考试发布时随机分配给每个人不一样的试卷') }}</div>
        </template>
        <a-button v-action:add icon="plus" type="primary" @click="addPage('random')">{{ $t('添加随机试卷') }}</a-button>
      </a-tooltip>
    </a-space>
    <s-table
      ref="table"
      class="table-fill"
      :scroll="{ y: true }"
      size="small"
      rowKey="id"
      :columns="columns"
      :data="loadDataTable"
      :sorter="{ field: 'id', order: 'descend' }"
    >
      <span slot="type" slot-scope="text">
        {{ text === 'fixed' ? $t('固定试卷') : $t('随机试卷') }}
      </span>
      <div slot="action" slot-scope="text, record">
        <a @click="editPage(record)">{{ $t('编辑') }}</a>
        <a-divider type="vertical" />
        <a @click="browsePage(record)">{{ $t('预览') }}</a>
        <a-divider type="vertical" />
        <a @click="Delete(record)">{{ $t('删除') }}</a>
      </div>
    </s-table>
    <testpaper-add ref="TestpaperAdd" @on-show="Search" />
    <browsing ref="Browsing" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('exam'),
  components: {
    TestpaperAdd: () => import('./TestpaperAdd'),
    Browsing: () => import('./Browsing')
  },
  data () {
    return {
      advanced: false,
      visible: false,
      loading: false,
      // 搜索参数
      queryParam: {},
      inputTime: null,
      paperType: [{
        type: this.$t('固定试卷'),
        value: 'fixed'
      }, {
        type: this.$t('随机试卷'),
        value: 'random'
      }],
      config: {
        data: {}
      },
      formdata: {},
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 180,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: 'ID',
        dataIndex: 'id',
        width: 40,
        sorter: true
      }, {
        title: this.$t('试卷名称'),
        dataIndex: 'title',
        width: 250
      }, {
        title: this.$t('试卷类型'),
        dataIndex: 'type',
        scopedSlots: { customRender: 'type' }
      }, {
        title: this.$t('试题数'),
        dataIndex: 'total'
      }, {
        title: this.$t('总分'),
        dataIndex: 'score'
      }, {
        title: this.$t('创建人'),
        dataIndex: 'inputUser'
      }, {
        title: this.$t('创建时间'),
        dataIndex: 'inputTime'
      }, {
        title: this.$t('最后修改人'),
        dataIndex: 'updateUser'
      }, {
        title: this.$t('最后修改时间'),
        dataIndex: 'updateTime'
      }],
      creator: [],
      colLayout: {},
      questionstype: '',
      optionsList: {
        list: [{
          options: ''
        }]
      }
    }
  },
  created () {
    this.changeAdvanced(false)
  },
  methods: {
    // 页面渲染
    loadDataTable (parameter) {
      return this.axios({
        url: '/exam/examination/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    getinputtime (date, dateString) {
      this.queryParam.inputshowtime = date
      this.queryParam.inputTime = dateString[0] ? dateString : null
    },
    // 打开添加页面
    addPage (type) {
      const title = type === 'random' ? this.$t('添加随机试卷') : this.$t('添加固定试卷')
      this.$refs.TestpaperAdd.show({
        action: 'add',
        title: title,
        url: '/exam/testpaper/add',
        type: type,
        data: {}
      })
    },
    // 打开修改页面
    editPage (record) {
      const title = record.type === 'random' ? `${this.$t('编辑')}:` + record.title : `${this.$t('编辑')}:` + record.title
      this.$refs.TestpaperAdd.show({
        action: 'edit',
        title: title,
        url: '/exam/testpaper/edit',
        type: record.type,
        data: record
      })
    },
    // 打开预览页面
    browsePage (record) {
      this.$refs.Browsing.show({
        title: this.$t('试卷预览'),
        action: 'browsing',
        user: '',
        url: '',
        data: record,
        answer: ''
      })
    },
    // 搜索
    Search () {
      const table = this.$refs.table
      table.refresh()
    },
    // 删除
    Delete (record) {
      const table = this.$refs.table
      const id = record.id
      const self = this
      this.$confirm({
        title: this.$t('试卷被删除后将无法恢复，确定删除吗？'),
        onOk () {
          self.axios({
            url: '/exam/examination/action',
            data: { id: id, action: 'delete' }
          }).then(res => {
            self.$message.success(res.message)
            table.refresh()
          })
        }
      })
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
    },
    refresh () {
      this.$refs.table.refresh()
    }
  }
}
</script>
