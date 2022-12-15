
<template>
  <a-drawer :destroyOnClose="true" :title="config.title" :width="1200" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="false">
      <div v-if="config.action === 'exam'" class="page">
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
                <a-form-item :label="$t('参考状态')">
                  <a-select v-model.trim="queryParam.status" :allowClear="true" show-search>
                    <a-select-option v-for="(item, key) in teststatus" :key="key" :value="key">
                      {{ item.type }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item :label="$t('考生姓名')">
                  <a-input v-model.trim="queryParam.username" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item :label="$t('成绩')">
                  <a-input v-model.trim="queryParam.grade" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item :label="$t('考试次数')">
                  <a-input v-model.trim="queryParam.examNum" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
        </a-form>
        <a-alert
          style="margin-bottom: 8px"
          :message="$t('共{0}人， {1}人已考， {2}人已通过', { 0: all, 1: tested, 2: pass })"
          type="info"
          show-icon
        />
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
          <div slot="action" slot-scope="text, record">
            <a @click="lookResult(record)">{{ $t('查看结果') }}</a>
          </div>
          <div slot="duration" slot-scope="text">
            {{ text + $t('分钟') }}
          </div>
        </s-table>
        <a-drawer
          :destroyOnClose="true"
          :title="configresult.title"
          :width="600"
          :visible="resultvisible"
          @close="resultvisible = !resultvisible"
        >
          <a-spin :spinning="loading">
            <s-table
              ref="table2"
              class="table-fill"
              :scroll="{ y: true }"
              size="small"
              rowKey="id"
              :columns="columns2"
              :data="loadDataTable2"
              :showPagination="false"
              :sorter="{ field: 'id', order: 'descend' }"
            >
              <div slot="action" slot-scope="text, record">
                <a @click="browsePage(record)">{{ $t('查看') }}</a>
              </div>
              <div slot="duration" slot-scope="text">
                {{ text + '分钟' }}
              </div>
            </s-table>
          </a-spin>
        </a-drawer>
      </div>
      <div v-else class="page">
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
                <a-form-item :label="$t('所属题库')">
                  <a-select v-model.trim="queryParam.subjectId" :allowClear="true" show-search>
                    <a-select-option v-for="item in bankname" :key="item.id" :value="item.id">
                      {{ item.subject }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="7">
                <a-form-item :label="$t('题型')">
                  <a-select v-model.trim="queryParam.type" :allowClear="true" show-search>
                    <a-select-option v-for="item in questionType" :key="item.value" :value="item.value">
                      {{ item.type }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="7">
                <a-form-item :label="$t('题目')">
                  <a-input v-model.trim="queryParam.title" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
        </a-form>
        <s-table
          ref="table"
          class="table-fill"
          :scroll="{ y: true }"
          size="small"
          rowKey="id"
          :columns="columns3"
          :data="loadDataTable3"
          :showPagination="false"
          :sorter="{ field: 'id', order: 'descend' }"
        >
          <span slot="sort" slot-scope="text, record, index">{{ index + 1 }}</span>
          <div slot="type" slot-scope="text">
            <span v-for="value in questionType" v-show="value.value === text" :key="value.value">{{ value.type }}</span>
          </div>
        </s-table>
      </div>
      <browsing ref="Browsing" @ok="tablerefresh" />
    </a-spin>
  </a-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  i18n: window.lang('exam'),
  components: {
    Browsing: () => import('./Browsing')
  },
  data () {
    return {
      advanced: false,
      visible: false,
      resultvisible: false,
      loading: false,
      queryParam: {},
      config: {},
      configresult: {},
      detailsdata: {},
      formdata: {},
      action: '',
      colLayout: {},
      bankname: [],
      all: 0,
      tesded: 0,
      pass: 0,
      qualified: 0,
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
      teststatus: [{
        type: this.$t('未开始'),
        value: '0'
      }, {
        type: this.$t('进行中'),
        value: '1'
      }, {
        type: this.$t('已结束'),
        value: '2'
      }],
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: 'ID',
        dataIndex: 'id',
        sorter: true
      }, {
        title: this.$t('考生姓名'),
        dataIndex: 'username'
      }, {
        title: this.$t('考生所属部门'),
        dataIndex: 'department'
      }, {
        title: this.$t('完成时间'),
        dataIndex: 'finishTime'
      }, {
        title: this.$t('总分'),
        dataIndex: 'score'
      }, {
        title: this.$t('成绩'),
        dataIndex: 'grade'
      }, {
        title: this.$t('考试次数'),
        dataIndex: 'examNum'
      }, {
        title: this.$t('平均用时'),
        dataIndex: 'duration',
        scopedSlots: { customRender: 'duration' }
      }
        // , {
        //   title: '状态',
        //   dataIndex: 'state'
        // }
      ],
      columns2: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: this.$t('完成时间'),
        dataIndex: 'finishTime',
        width: 140
      }, {
        title: this.$t('成绩'),
        dataIndex: 'grade'
      }, {
        title: this.$t('用时'),
        dataIndex: 'duration',
        scopedSlots: { customRender: 'duration' }
      }],
      columns3: [{
        title: '#',
        dataIndex: 'sort',
        align: 'center',
        scopedSlots: { customRender: 'sort' },
        width: 40
      }, {
        title: this.$t('题目'),
        dataIndex: 'title'
      }, {
        title: this.$t('题型'),
        dataIndex: 'type',
        scopedSlots: { customRender: 'type' },
        width: 100
      }, {
        title: this.$t('所属题库'),
        dataIndex: 'subject',
        width: 200
      }, {
        title: this.$t('答题次数'),
        dataIndex: 'total',
        width: 120
      }, {
        title: this.$t('正确次数'),
        dataIndex: 'correct',
        width: 120
      }, {
        title: this.$t('正确率'),
        dataIndex: 'correctRate',
        width: 100
      }]
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    this.changeAdvanced(false)
  },
  mounted () {
    this.getBankname()
  },
  methods: {
    // 数据渲染
    loadDataTable (parameter) {
      return this.axios({
        url: '/exam/achievement/examAnalyze',
        data: Object.assign(parameter, this.queryParam, { paperId: this.config.data.id })
      }).then(res => {
        this.pass = 0
        res.result.data.forEach(item => {
          if (Number(item.grade) > Number(this.qualified)) {
            this.pass++
          }
        })
        return res.result
      })
    },
    getBankname () {
      const parameter = {
        pageNo: 1,
        pageSize: 20,
        sortField: 'id',
        sortOrder: 'descend'
      }
      this.axios({
        url: '/exam/subject/init',
        data: parameter
      }).then(res => {
        this.bankname = res.result.data
      })
    },
    loadDataTable2 (parameter) {
      return this.axios({
        url: '/exam/achievement/userGrades',
        data: { paperId: this.config.data.id, username: this.formdata.username }
      }).then(res => {
        return res.result
      })
    },
    loadDataTable3 (parameter) {
      return this.axios({
        url: '/exam/achievement/questionAnalyze',
        data: Object.assign(parameter, this.queryParam, { paperId: this.config.data.id })
      }).then(res => {
        return res.result
      })
    },
    // 接收数据
    show (config) {
      this.config = config
      this.config.settings = JSON.parse(config.data.setting)
      this.qualified = this.config.settings.qualified
      this.visible = true
      const number = config.data.userNum.split('/')
      this.all = number[1]
      this.tested = number[0]
      this.action = config.action
    },
    // 查看考卷详情
    lookResult (record) {
      this.resultvisible = true
      this.configresult.title = this.$t('考卷详情')
      this.detailsdata = record.tested
      this.formdata = record
      this.loading = false
    },
    // 审阅试卷页面
    browsePage (record) {
      this.$refs.Browsing.detailshow({
        action: 'check',
        title: this.$t('审阅试卷'),
        url: '',
        data: record
      })
    },
    // 搜索
    Search () {
      const table = this.$refs.table
      table.refresh()
    },
    tablerefresh () {
      const table = this.$refs.table2
      table.refresh()
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
    // 刷新
    refresh () {
      this.$refs.table.refresh()
    }
  }
}
</script>
