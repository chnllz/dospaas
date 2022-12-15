<template>
  <div class="page">
    <a-form :form="form" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
      <a-card size="small" :title="$t('搜索')">
        <a-space slot="extra">
          <a-button @click="naireSearch" @keyup.enter="naireSearch">{{ $t('搜索') }}</a-button>
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
            <a-form-item :label="$t('问卷名称')">
              <a-input v-model.trim="queryParam.nairename" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <a-space>
      <a-button v-action:add icon="plus" type="primary" @click="addPage">{{ $t('添加问卷') }}</a-button>
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
      <div slot="action" slot-scope="text, record">
        <a @click="editPage(record)">{{ $t('编辑') }}</a>
        <a-divider type="vertical" />
        <a @click="naireDelete(record)">{{ $t('删除') }}</a>
        <a-divider type="vertical" />
        <a @click="testsPage(record)">{{ $t('试题管理') }}</a>
        <a-divider type="vertical" />
        <a @click="previewPage(record)">{{ $t('预览') }}</a>
      </div>
    </s-table>
    <!-- 添加编辑问卷窗口 -->
    <a-drawer :title="config.title" :width="600" :destroyOnClose="true" :visible="visible" @close="visible = !visible">
      <a-spin :spinning="loading">
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }" @submit="handleSubmitnaire">
          <a-form-item v-show="false">
            <a-input v-decorator="['id', { initialValue: length + 1 }]" />
          </a-form-item>
          <a-form-item :label="$t('问卷名称')">
            <a-input
              v-decorator="[
                'nairename',
                { initialValue: nairedata.nairename, rules: [{ required: true, message: $t('请输入题目名称') }] }
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('开头语')">
            <a-textarea
              v-decorator="['openingRemarks', { initialValue: nairedata.openingRemarks }]"
              :auto-size="{ minRows: 4, maxRows: 6 }"
            />
          </a-form-item>
          <a-form-item :label="$t('结束语')">
            <a-textarea
              v-decorator="['conclusion', { initialValue: nairedata.conclusion }]"
              :auto-size="{ minRows: 4, maxRows: 6 }"
            />
          </a-form-item>
          <a-form-item :label="$t('备注')">
            <a-textarea
              v-decorator="['remark', { initialValue: nairedata.remark }]"
              :auto-size="{ minRows: 4, maxRows: 6 }"
            />
          </a-form-item>
        </a-form>
        <div class="bbar">
          <a-button type="primary" html-type="submit" @click="handleSubmitnaire">
            {{ config.action === 'edit' ? $t('修改') : $t('保存') }}
          </a-button>
          <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
        </div>
      </a-spin>
    </a-drawer>
    <!-- 试题管理 -->
    <a-drawer
      :title="configtests.title"
      :width="1600"
      :visible="visibletests"
      :destroyOnClose="true"
      @close="visibletests = !visibletests"
    >
      <div>
        <a-card size="small" class="table-search" :bordered="true">
          <a-form :layout="advanced ? 'vertical' : 'inline'" :class="advanced ? 'advanced' : 'normal'">
            <div class="head">
              <a-space style="margin-left: 8px">
                <a-button icon="search" type="primary" @click="testsSearch" @keyup.enter="testsSearch">
                  {{ $t('搜索') }}
                </a-button>
                <a-button
                  icon="sync"
                  @click="
                    () => {
                      testsSearchData = {}
                      $refs.table.refresh(true)
                    }
                  "
                >
                  {{ $t('重置') }}
                </a-button>
              </a-space>
            </div>
            <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
              <a-col v-if="advanced" span="24">
                <div class="divider"></div>
              </a-col>
              <a-col :span="6">
                <a-form-item :label="$t('题型')">
                  <a-select v-model="testsSearchData.questionstype" :allowClear="true" :showSearch="true">
                    <a-select-option v-for="(value, key) in questionTypeShow" :key="key + 1" :value="value.type">
                      {{ value.type }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item :label="$t('标题')">
                  <a-input v-model.trim="testsSearchData.title" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-card>
        <a-card size="small" :bordered="false">
          <div class="table-operator">
            <a-button v-action:add icon="plus" type="primary" @click="addtestsPage('单选题')">
              {{ $t('添加') }}
            </a-button>
            <a-button v-action:bankadd icon="select" @click="bankAddPage">{{ $t('从题库添加') }}</a-button>
            <a-button v-action:sort icon="sort-ascending" @click="sortPage">{{ $t('排序') }}</a-button>
          </div>
          <!-- ref="table" -->
          <s-table
            ref="tableBank"
            size="small"
            rowKey="id"
            :columns="columnstests"
            :data="nairedetails"
            :sorter="{ field: 'id', order: 'descend' }"
          >
            <div slot="action" slot-scope="text, record">
              <a @click="edittestsPage(record)">{{ $t('编辑') }}</a>
              <a-divider type="vertical" />
              <a @click="testsdelect(record)">{{ $t('删除') }}</a>
              <a-divider type="vertical" />
              <a :class="record.collect == 1 ? 'active' : ''" @click="addcollect(record)">{{ $t('收藏到题库') }}</a>
            </div>
            <div v-if="record.questionType === '单选题'" slot="jumpTo" slot-scope="text, record">
              <a @click="jumpToPage(record)">{{ $t('跳转选择') }}</a>
            </div>
          </s-table>
          <!-- 跳转页面 -->
          <a-drawer
            :title="configjump.title"
            :width="800"
            :visible="visibleJump"
            :destroyOnClose="true"
            @close="visibleJump = !visibleJump"
          >
            <a-spin :spinning="loading">
              <a-form :form="formjump" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-form-item v-for="(item, index) in configjump.list" :key="index" :label="item">
                  <a-input v-model="configjump.jump[index]" :placeholder="$t('请输入题目id')" />
                </a-form-item>
              </a-form>
              <div class="bbar">
                <a-button type="primary" html-type="submit" @click="jumpsubmit">{{ $t('保存') }}</a-button>
                <a-button @click="visibleJump = !visibleJump">{{ $t('关闭') }}</a-button>
              </div>
            </a-spin>
          </a-drawer>
        </a-card>
      </div>
    </a-drawer>
    <!-- 从题库中选择 -->
    <a-drawer
      :title="config.title"
      :width="1400"
      :visible="visiblebank"
      :destroyOnClose="true"
      @close="visiblebank = !visiblebank"
    >
      <div>
        <a-card size="small" class="table-search" :bordered="true">
          <a-form :layout="advanced ? 'vertical' : 'inline'" :class="advanced ? 'advanced' : 'normal'">
            <div class="head">
              <a-space style="margin-left: 8px">
                <a-button icon="search" type="primary" @click="bankSearch" @keyup.enter="bankSearch">
                  {{ $t('搜索') }}
                </a-button>
                <a-button
                  icon="sync"
                  @click="
                    () => {
                      bankSearchData = {}
                      $refs.table.refresh(true)
                    }
                  "
                >
                  {{ $t('重置') }}
                </a-button>
              </a-space>
            </div>
            <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
              <a-col v-if="advanced" span="24">
                <div class="divider"></div>
              </a-col>
              <a-col :span="6">
                <a-form-item :label="$t('题型')">
                  <a-select v-model="bankSearchData.questionstype" :allowClear="true" :showSearch="true">
                    <a-select-option :value="1">{{ $t('单选题') }}</a-select-option>
                    <a-select-option :value="2">{{ $t('多选题') }}</a-select-option>
                    <a-select-option :value="3">{{ $t('填空题') }}</a-select-option>
                    <a-select-option :value="4">{{ $t('评分题') }}</a-select-option>
                    <a-select-option :value="5">{{ $t('简答题') }}</a-select-option>
                    <a-select-option :value="6">{{ $t('文字描述') }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item :label="$t('标题')">
                  <a-input v-model.trim="bankSearchData.title" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-card>
        <a-card size="small" :bordered="false">
          <div class="table-operator">
            <a-button
              v-action:select
              icon="check"
              type="primary"
              :disabled="selectedRowKeys.length == 0"
              @click="testsbankselect"
            >
              {{ $t('选择') }}
            </a-button>
          </div>
          <s-table
            ref="tableBankSelect"
            size="small"
            :row-selection="rowSelection"
            rowKey="id"
            :columns="columnsbank"
            :data="testsData"
            :sorter="{ field: 'id', order: 'descend' }"
          ></s-table>
        </a-card>
        <div class="bbar" style="position: absolute; bottom: 0; right: 0; width: 100%; background-color: white">
          <a-button @click="visiblebank = !visiblebank">{{ $t('关闭') }}</a-button>
        </div>
      </div>
    </a-drawer>
    <!-- 添加 -->
    <a-drawer
      :title="config.title"
      :width="800"
      :destroyOnClose="true"
      :visible="visibletestsadd"
      @close="visibletestsadd = !visibletestsadd"
    >
      <a-spin :spinning="loading">
        <Questionadd
          :actions="config.action"
          :questionstype="questionstype"
          :formdata="config.data"
          :optionsList="optionsList"
          :optionsfill="optionsfill"
          :length="banklength"
          @on-show="listenChild"
        ></Questionadd>
      </a-spin>
    </a-drawer>
    <!-- 预览 -->
    <browsing ref="browsing" :showdata="send" @ok="handleOk" />
    <drag-sort ref="dragSort" @ok="sortsubmit" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('visit'),
  components: {
    Questionadd: () => import('./Questionadd'),
    DragSort: () => import('@/views/admin/Common/DragSort'),
    Browsing: () => import('./QuestionnaireBrowsing')
  },
  data () {
    return {
      advanced: false,
      // 添加编辑窗口
      visible: false,
      // 试题管理窗口
      visibletests: false,
      // 从题库添加
      visiblebank: false,
      visibletestsadd: false,
      previewstate: false,
      loading: false,
      visibleJump: false,
      nariechange: '',
      // 搜索参数
      queryParam: {
      },
      send: {},
      testsSearchData: {
        questionstype: undefined
      },
      bankSearchData: {
        questionstype: undefined
      },
      nairedata: {},
      optionsfill: [],
      naireid: '',
      questionTypeShow: [{
        type: this.$t('单选题')
      }, {
        type: this.$t('多选题')
      }, {
        type: this.$t('填空题')
      }, {
        type: this.$t('评分题')
      }, {
        type: this.$t('简答题')
      }, {
        type: this.$t('文字描述')
      }],
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      formjump: this.$form.createForm(this, { name: 'coordinated' }),
      config: {
        data: {}
      },
      configtests: {
        data: {}
      },
      configjump: {
        data: {}
      },
      optionsShow: [],
      jumpTo: [],
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 240,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: 'ID',
        dataIndex: 'id',
        width: 40
      }, {
        title: this.$t('问卷名称'),
        dataIndex: 'nairename',
        width: 400
      }, {
        title: this.$t('题目数量'),
        dataIndex: 'topicsNumber',
        width: 100
      }, {
        title: this.$t('创建人'),
        dataIndex: 'inputUser'
      }, {
        title: this.$t('创建时间'),
        dataIndex: 'inputTime'
      }, {
        title: this.$t('最后修改人'),
        dataIndex: 'lastModify'
      }, {
        title: this.$t('最后修改时间'),
        dataIndex: 'lastModifiedTime'
      }],
      // 试题管理
      columnstests: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 200,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: 'ID',
        dataIndex: 'id',
        width: 40
      }, {
        title: this.$t('标题'),
        dataIndex: 'title',
        width: 400
      }, {
        title: this.$t('题型'),
        dataIndex: 'questionType',
        width: 100
      }, {
        title: this.$t('跳转规则'),
        dataIndex: 'list',
        scopedSlots: { customRender: 'jumpTo' }
      }, {
        title: this.$t('创建人'),
        dataIndex: 'inputUser'
      }, {
        title: this.$t('创建时间'),
        dataIndex: 'inputTime'
      }, {
        title: this.$t('最后修改人'),
        dataIndex: 'lastModify'
      }, {
        title: this.$t('最后修改时间'),
        dataIndex: 'lastModifiedTime'
      }],
      // 从题库中添加
      columnsbank: [{
        title: 'ID',
        dataIndex: 'id',
        width: 40
      }, {
        title: this.$t('标题'),
        dataIndex: 'title',
        width: 400
      }, {
        title: this.$t('题型'),
        dataIndex: 'questionType',
        width: 100
      }, {
        title: this.$t('创建人'),
        dataIndex: 'inputUser'
      }, {
        title: this.$t('创建时间'),
        dataIndex: 'inputTime'
      }, {
        title: this.$t('最后修改人'),
        dataIndex: 'lastModify'
      }, {
        title: this.$t('最后修改时间'),
        dataIndex: 'lastModifiedTime'
      }],
      selectedRowKeys: [],
      selectedRows: [],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys
          this.selectedRows = selectedRows
        }
      },
      sort: [],
      colLayout: {},
      questionstype: '',
      length: '',
      banklength: '',
      optionsList: {
        list: [{
          options: ''
        }]
      },
      color: '',
      nariedetails: [],
      page: []
    }
  },
  created () {
    this.changeAdvanced(false)
  },
  methods: {
    // 页面数据渲染
    loadDataTable (parameter) {
      this.page = parameter
      return this.axios({
        url: '/visit/questionnaire/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        this.length = res.result.totalCount
        return res.result
      })
    },
    // 打开试题管理
    nairedetails (parameter) {
      return this.axios({
        url: '/visit/questionnaire/details',
        // data: Object.assign(parameter, this.queryParam) 原参数
        data: Object.assign(parameter, this.testsSearchData)
      }).then(res => {
        for (const i in res.result.data) {
          this.optionsShow[i] = res.result.data[i]
        }
        this.banklength = res.result.totalCount
        return res.result
      })
    },
    // 从题库中添加  题库数据
    testsData (parameter) {
      return this.axios({
        url: '/visit/questionbank/init',
        data: Object.assign(parameter, this.bankSearchData) // 原参数 queryParam
      }).then(res => {
        return res.result
      })
    },
    // 刷新
    handleOk () {
      this.$refs.table.refresh()
    },
    // 从题库中选择添加提交
    testsbankselect () {
      const table = this.$refs.tableBank // 原 table
      // this.axios({
      //   url: '/visit/questionnaire/testsbankadd',
      //   data: { allid: this.selectedRowKeys, naireid: this.naireid }
      // }).then(res => {
      //   table.refresh()
      //   this.visiblebank = false
      // })
      this.axios({
        url: '/visit/questionnaire/testsadd',
        data: { data: this.selectedRows }
      }).then(res => {
        table.refresh()
        this.visiblebank = false
      })
    },
    // 问卷提交
    handleSubmitnaire (key) {
      key.preventDefault()
      const table = this.$refs.table
      const id = this.config.id
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.config.action === 'edit') {
            values['id'] = id
            this.axios({
              url: '/visit/questionnaire/edit',
              data: { data: values }
            }).then(res => {
              this.visible = false
              this.loading = false
              table.refresh()
              this.$message.success(this.$t('修改成功'))
            })
          } else {
            this.axios({
              url: '/visit/questionnaire/add',
              data: { data: values }
            }).then(res => {
              this.visible = false
              this.loading = false
              table.refresh()
              this.$message.success(this.$t('添加成功'))
              return res.message
            })
          }
        }
      })
    },
    // 添加问卷
    addPage () {
      this.visible = true
      this.config = {
        action: 'add',
        title: this.$t('添加'),
        url: '/visit/questionbank/add',
        data: {}
      }
    },
    // 修改问卷
    editPage (record) {
      this.visible = true
      const id = record && record.id || this.selectedRowKeys
      this.config = {
        id: id,
        action: 'edit',
        title: this.$t('修改'),
        url: '/visit/questionnaire/edit',
        data: {}
      }
      this.nairedata = record
      this.loading = false
    },
    // 问卷搜索
    naireSearch () {
      const table = this.$refs.table
      table.refresh()
    },
    // 问卷删除
    naireDelete (record) {
      const table = this.$refs.table
      const id = record && record.id || this.selectedRowKeys
      const self = this
      this.$confirm({
        title: record ? this.$t('您确认要删除该记录吗？') : this.$t('您确认要删除选中的记录吗？'),
        onOk () {
          self.axios({
            url: '/visit/questionnaire/delete',
            data: { id: id }
          }).then(res => {
            self.$message.success(res.result)
            table.refresh()
          })
        }
      })
    },
    // 打开试题管理
    testsPage (record) {
      this.visibletests = true
      const id = record.topicsId
      this.naireid = record.id
      this.configtests = {
        action: 'tests',
        title: this.$t('试题管理'),
        url: '/visit/questionnaire/details',
        data: {}
      }
      this.axios({
        url: this.configtests.url,
        data: { id: id }
      }).then(res => {
        return res.result
      })
    },
    // 打开跳转规则页面
    jumpToPage (record) {
      this.visibleJump = true
      this.configjump = {
        list: record.list,
        jump: [],
        id: record.id,
        action: 'jump',
        title: this.$t('跳转至'),
        url: '/visit/questionnaire/jump',
        data: {}
      }
    },
    // 跳转提交
    jumpsubmit () {
      const id = this.configjump.id
      this.axios({
        url: this.configjump.url,
        data: { questionid: id, data: this.configjump.jump, narieid: this.naireid }
      }).then(res => {
      })
    },
    // 收藏
    addcollect (record) {
      if (record.collect !== 1) {
        record.collect = 1
        this.$message.success(this.$t('收藏成功'))
      } else {
        this.$message.info(this.$t('题库中已存在'))
        return false
      }
    },
    // 试题管理搜索
    testsSearch () {
      const table = this.$refs.tableBank // 原 table
      this.axios({
        url: '/visit/questionnaire/testsSearch',
        data: Object.assign(this.page, this.testsSearchData)
      }).then(res => {
        table.refresh()
        return res
      })
    },
    // 从题库中选择搜索
    bankSearch () {
      const table = this.$refs.tableBankSelect// 原 table
      this.axios({
        // url: '/visit/questionnaire/bankSearch', 原接口
        url: '/visit/questionbank/init',
        data: Object.assign(this.page, this.bankSearchData)
      }).then(res => {
        table.refresh(true)
        return res
      })
    },
    // 添加页面数据监听
    listenChild (status) {
      const table = this.$refs.tableBank
      if (status === 1) {
        this.visibletestsadd = false
        this.loading = false
        this.$message.success(this.$t('添加成功'))
        table.refresh()
      }
      if (status === 2) {
        this.visibletestsadd = false
        this.loading = false
        this.$message.success(this.$t('修改成功'))
        table.refresh()
      }
      if (status === 3) {
        this.config.data = {}
        this.refresh()
      }
      if (status === 0) {
        this.visibletestsadd = false
      }
    },
    // 从题库中添加页面
    bankAddPage () {
      this.visiblebank = true
      this.loading = false
      this.config = {
        action: 'bank',
        title: this.$t('从题库中选择'),
        url: '/visit/questionbank/add',
        data: {}
      }
    },
    // 试题管理中排序
    sortPage () {
      this.$refs.dragSort.show({
        action: 'sort',
        title: this.$t('排序'),
        sortName: 'title',
        sortData: this.optionsShow
      })
    },
    // 排序提交
    sortsubmit (data) {
      this.$message.info(this.$t('“我是试题标题一”、“我是试题标题二”因为排序调整，导致跳转逻辑冲突，跳转逻辑系统已自动删除，请检查。'))
      this.config.data = data
    },
    // 打开试题添加页面
    addtestsPage (type) {
      this.visibletestsadd = true
      this.questionstype = type
      this.config = {
        action: 'testsadd',
        title: this.$t('添加'),
        url: '/visit/questionbank/add',
        data: {
          mustselect: false,
          showform: '1',
          stars: false,
          min: 2,
          max: '',
          naireid: this.naireid
        }
      }
    },
    // 打开试题修改页面
    edittestsPage (record) {
      this.visibletestsadd = true
      const id = record && record.id || this.selectedRowKeys
      this.questionstype = record.questionType
      this.optionsfill = record & record.fill ? record.fill : []
      this.optionsList.list = record & record.list ? record.list : []
      this.config = {
        id: id,
        action: 'edit',
        title: this.$t('修改'),
        url: '/visit/questionbank/edit',
        data: {}
      }
      if (record.mustselect === 1) {
        record.mustselect = true
      } else {
        record.mustselect = false
      }
      if (record.stars === 1) {
        record.stars = true
      } else {
        record.stars = false
      }
      if (record.other === 1) {
        record.other = true
      } else {
        record.other = false
      }
      this.config.data = record
      this.loading = false
    },
    // 删除问卷中题目
    testsdelect (record) {
      const table = this.$refs.tableBank
      const id = record && record.id || this.selectedRowKeys
      const self = this
      this.$confirm({
        title: record ? this.$t('您确认要删除该记录吗？') : this.$t('您确认要删除选中的记录吗？'),
        onOk () {
          self.axios({
            url: '/visit/questionnaire/testsdelete',
            data: { id: id, naireid: self.naireid }
          }).then(res => {
            self.$message.success(self.$t('删除成功'))
            table.refresh()
          })
        }
      })
    },
    // 预览页面
    previewPage (record) {
      this.$refs.browsing.show({
        action: 'preview',
        title: this.$t('预览'),
        id: record.topicsId,
        url: '/visit/questionnaire/details',
        nairedata: record
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
      this.$refs.table.refresh(true)
    }
  }
}
</script>
<style scoped>
.active {
  color: darkgray;
}
.input_answer {
  border-color: #fcbdc0;
  border-style: solid;
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  border-left-width: 0px;
  text-align: center;
}
.remark {
  border: 1px solid #c3e9ff;
  width: 100%;
  background-color: #e6f7ff;
}
</style>
