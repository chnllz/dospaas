<template>
  <div style="background: white; height: calc(100vh - 120px); overflow: hidden">
    <a-tabs
      v-model="activeKey"
      hide-add
      type="editable-card"
      size="small"
      class="container"
      @edit="onEdit"
      @change="changeTab"
    >
      <!-- 导航面板 -->
      <a-tab-pane :key="0" :closable="false">
        <template v-slot:tab>
          <a-icon type="home" />
          {{ $t('导航') }}
          <a-icon v-show="activeKey === 0" type="reload" class="reload" @click="onRefresh(0)" />
        </template>
        <div class="myTab">
          <a-tabs v-model="homeActiveKey" default-active-key="guide" hide-add type="editable-card" size="small">
            <a-row style="display: flex; align-items: center">
              <a-col :span="10">
                <a-space>
                  <a-radio-group v-model="homeActiveKey" button-style="solid" style="margin: 10px 10px">
                    <a-radio-button value="guide">{{ $t('导航') }}</a-radio-button>
                    <a-radio-button value="dashboard">{{ $t('仪表盘') }}</a-radio-button>
                    <a-radio-button value="tableMaintain">{{ $t('数据表维护') }}</a-radio-button>
                  </a-radio-group>
                  <div style="display: flex">
                    <a-select
                      v-model="queryParam.module"
                      style="width: 200px; margin: 10px 0"
                      showSearch
                      option-filter-prop="children"
                      @change="
                        (e) => {
                          queryParam.searchString = ''
                          choiceModule(e)
                        }
                      "
                    >
                      <a-select-option v-for="(value, index) in modules" :key="index" :value="value.module">
                        {{ value.module + '(' + value.count + ')' }}
                      </a-select-option>
                    </a-select>
                  </div>
                </a-space>
              </a-col>
              <a-col :span="12"></a-col>
              <a-col v-if="$store.getters.userInfo.roleId === $store.getters.setting.adminRoleId" :span="3">
                <a-button @click="handleUpdateCache">{{ $t('更新缓存') }}</a-button>
                <HelpPanel :number="'22041616454402'" />
              </a-col>
            </a-row>
            <a-tab-pane key="guide" :closable="false">
              <a-layout :key="show0">
                <a-layout-sider
                  v-model="collapsed"
                  :trigger="null"
                  width="300"
                  collapsible
                  collapsedWidth="0"
                  theme="light"
                  style="height: calc(100vh - 216px); margin-top: 8px; padding-top: 8px"
                >
                  <a-row :gutter="[5, 5]" style="margin-bottom: 5px" type="flex">
                    <a-col :span="16">
                      <a-input-search
                        v-model="queryParam.searchString"
                        :placeholder="$t('输入关键字搜索')"
                        @search="$refs.table.refresh(true)"
                      />
                    </a-col>
                    <a-col :span="4">
                      <a-dropdown>
                        <a-menu slot="overlay">
                          <a-menu-item key="1" @click="handleAdd">{{ $t('添加数据表') }}</a-menu-item>
                          <a-menu-item key="2" @click="handleExportOverview">{{ $t('导出数据表概览') }}</a-menu-item>
                          <a-menu-item key="5" @click="handleExportTableField">
                            {{ $t('导出数据表字段') }}
                          </a-menu-item>
                          <a-menu-item key="3" @click="handleSync">{{ $t('数据表同步') }}</a-menu-item>
                        </a-menu>
                        <a-button><a-icon type="menu" /></a-button>
                      </a-dropdown>
                    </a-col>
                    <a-col :span="4">
                      <a-tooltip>
                        <template slot="title">{{ $t('高级搜索') }}</template>
                        <a-button @click="openSenior"><a-icon type="filter" /></a-button>
                      </a-tooltip>
                    </a-col>
                  </a-row>
                  <s-table
                    ref="table"
                    size="small"
                    rowKey="sortId"
                    :columns="columns"
                    :data="loadDataTable"
                    :expandedRowKeys="showAll"
                    :scroll="{ x: false, y: 'calc(100vh - 380px)' }"
                    childrenColumnName="tablechild"
                    :sorter="{ field: 'listOrder', order: 'ascend' }"
                    @expand="onExpand"
                  >
                    <div
                      slot="name"
                      slot-scope="text, record"
                      :style="
                        record.style === 'span'
                          ? { 'margin-top': '-20px', 'padding-left': '20px' }
                          : record.style === 'datadetails' || record.style === 'viewdetails'
                          ? { 'margin-top': '-20px', 'padding-left': '50px' }
                          : { 'margin-top': '-20px', 'padding-left': '40px' }
                      "
                    >
                      <span v-if="record.style === 'span'" style="cursor: pointer" @click="openTags(record)">
                        {{ record.name }}
                      </span>
                      <span v-else style="cursor: pointer" @click="openTags(record)">
                        <a-icon v-if="record.style === 'field'" type="database" theme="twoTone" />
                        <a-icon v-if="record.style === 'datadetails'" type="desktop" style="color: #faad14" />
                        <a-icon
                          v-if="record.style === 'viewdetails'"
                          type="layout"
                          theme="twoTone"
                          two-tone-color="#52c41a"
                        />
                        {{ record.name }}
                      </span>
                    </div>
                    <a-dropdown v-if="record.style === 'span'" slot="action" slot-scope="text, record">
                      <a><a-icon type="more" /></a>
                      <a-menu slot="overlay">
                        <a-menu-item :disabled="record.accessLevel === 2" @click="handleEdit(record)">
                          <div>
                            <a-icon type="edit" />
                            {{ $t('编辑') }}
                          </div>
                        </a-menu-item>
                        <a-menu-item @click="handleExport(record)">
                          <div>
                            <a-icon type="export" />
                            {{ $t('导出') }}
                          </div>
                        </a-menu-item>
                        <a-menu-item :disabled="!!record.accessLevel" @click="handleDelete(record)">
                          <div>
                            <a-icon type="delete" />
                            {{ $t('删除') }}
                          </div>
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </s-table>
                </a-layout-sider>
                <a-layout
                  style="
                    background: white;
                    margin-left: 8px;
                    padding-left: 8px;
                    position: relative;
                    height: calc(100vh - 216px);
                    margin-top: 8px;
                    padding-top: 8px;
                  "
                >
                  <a-layout-content>
                    <div style="position: absolute; top: 12px; display: flex; align-items: center; width: 20%">
                      <span>{{ $t('路径') }}：</span>
                      <a-input :disabled="true" :value="$t(path)" style="width: 80%" />
                    </div>
                    <div style="height: 100%; flex-grow: 1; overflow: auto">
                      <tplview-data
                        v-show="config.styleshow === 'data'"
                        ref="viewData"
                        :item="config.data"
                        @ok="getList"
                        @add="getAdd"
                        @refresh="handleOk"
                      />
                      <tplview-form
                        v-show="configview.styleshow === 'view'"
                        ref="viewForm"
                        :item="configview.data"
                        @ok="getForm"
                        @add="getViewAdd"
                        @refresh="handleOk"
                      />
                      <data-model-senior
                        v-if="senior"
                        ref="seniorTable"
                        :search="queryParam"
                        @getField="getField"
                        @showTable="showTable"
                      />
                    </div>
                  </a-layout-content>
                </a-layout>
              </a-layout>
            </a-tab-pane>
            <a-tab-pane key="dashboard" :closable="false">
              <table-dashboard-data ref="tableDashboardData" @openDashboard="openDashboard"></table-dashboard-data>
            </a-tab-pane>
            <a-tab-pane key="tableMaintain" :closable="false">
              <table-maintain ref="tableMaintain"></table-maintain>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-tab-pane>
      <!-- 其他面板 -->
      <a-tab-pane v-for="(pane, index1) in panes" :key="pane.key" :closable="pane.closable">
        <template v-slot:tab>
          <a-icon v-if="pane.content === 'field'" type="database" theme="twoTone" />
          <a-icon
            v-if="['datadetails', 'appDatadetails'].includes(pane.content)"
            type="desktop"
            style="color: #faad14"
          />
          <a-icon
            v-if="['viewdetails', 'appViewdetails'].includes(pane.content)"
            type="layout"
            theme="twoTone"
            two-tone-color="#52c41a"
          />
          <font-awesome-icon v-if="pane.content === 'dashboard'" icon="fa-tachometer-alt" style="color: #08979c" />
          {{ pane.title }}
          <a-icon v-show="activeKey === pane.key" type="reload" class="reload" @click="onRefresh(pane.key, index1)" />
        </template>
        <div :key="panesKey[index1]" style="display: flex; flex-direction: column; height: calc(100vh - 170px)">
          <a-row
            style="margin: 8px 0"
            :style="pane.content == 'dashboard' ? { background: '#f5f6fa', marginBottom: '0', paddingTop: '8px' } : ''"
          >
            <a-col :span="20">
              <div style="display: flex">
                <a-button
                  v-if="pane.content !== 'field' && pane.content !== 'dashboard'"
                  :disabled="pane.data && pane.data.record.accessLevel === 2"
                  type="primary"
                  size="small"
                  @click="handleSubmit('save')"
                >
                  {{ $t('保存') }}
                </a-button>
                <a-breadcrumb
                  v-if="pane.content !== 'datadetails' && pane.content !== 'viewdetails'"
                  style="margin-left: 8px"
                >
                  <a-breadcrumb-item>
                    {{ pane.alias ? pane.title + '(' + pane.module + '_' + pane.alias + ')' : pane.title }}
                  </a-breadcrumb-item>
                  <a-breadcrumb-item>{{ pane.name }}</a-breadcrumb-item>
                </a-breadcrumb>
                <a-breadcrumb v-else style="margin-left: 8px">
                  <a-breadcrumb-item>
                    {{ pane.alias ? pane.namefirst + '(' + pane.module + '_' + pane.alias + ')' : pane.namefirst }}
                  </a-breadcrumb-item>
                  <a-breadcrumb-item>{{ pane.nametwo }}</a-breadcrumb-item>
                  <a-breadcrumb-item>{{ pane.title }}</a-breadcrumb-item>
                </a-breadcrumb>
                <div v-if="pane.data && pane.data.record.accessLevel === 2" style="margin-left: 16px; color: #f5222d">
                  你没有编辑权限，请联系系统管理员
                </div>
              </div>
            </a-col>
            <a-col :span="4" style="text-align: right">
              <HelpPanel
                :number="
                  pane.content === 'viewdetails'
                    ? '22041616463506'
                    : pane.content === 'datadetails'
                    ? '22041616462505'
                    : '22041616460103'
                "
                :styleStr="'font-size: 16px;margin-right: 8px;color: rgba(0, 0, 0, 0.65);'"
              />
            </a-col>
          </a-row>
          <div
            :style="
              pane.content !== 'viewdetails'
                ? { 'flex-grow': 1, overflow: 'auto' }
                : { 'flex-grow': 1, overflow: 'hidden' }
            "
          >
            <!-- 字段管理 -->
            <field v-if="pane.content === 'field'" :tableId="activeKey !== 0 ? activeKey : ''" />
            <!-- PC端数据窗口 -->
            <TplviewDataFormEdit
              v-if="pane.content === 'datadetails'"
              key="tplviewDataFormEdit"
              ref="tplviewDataFormEdit"
              :tableId="tableId"
              :active="activeKey !== 0 ? String(activeKey) : ''"
              :configdata="pane.data"
              @ok="handleOk"
              @refresh="tabChange"
            />
            <!-- 移动端数据窗口 -->
            <TplviewDataAppFormEdit
              v-if="pane.content === 'appDatadetails'"
              key="tplviewDataAppFormEdit"
              ref="tplviewDataAppFormEdit"
              :tableId="tableId"
              :active="activeKey !== 0 ? String(activeKey) : ''"
              :configdata="pane.data"
              @ok="handleOk"
              @refresh="tabChange"
            />
            <!-- 表单视图 -->
            <tplview-form-form
              v-if="pane.content === 'viewdetails'"
              key="tplviewFormForm"
              ref="tplviewFormForm"
              :configdata="pane.data"
              @ok="handleOk"
              @refresh="tabViewChange"
            />
            <!-- 移动端表单视图 -->
            <app-tplview-form-form
              v-if="pane.content === 'appViewdetails'"
              key="appTplviewFormForm"
              ref="appTplviewFormForm"
              :configdata="pane.data"
              @ok="handleOk"
              @refresh="tabViewChange"
            />
            <dashboard-tab-view v-if="pane.content === 'dashboard'" ref="dashboardTableView" />
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
    <!-- 编辑数据表 -->
    <table-form ref="tableForm" @ok="handleOk" />
    <general-export ref="generalExport" />
  </div>
</template>
<script>
import storage from '@/utils/storage'
export default {
  i18n: window.lang('admin'),
  components: {
    TableForm: () => import('./TableForm'),
    Field: () => import('./Field/Field'),
    TplviewData: () => import('./TplviewData'),
    TplviewForm: () => import('./TplviewForm'),
    TplviewFormForm: () => import('./TplviewFormForm'),
    TplviewDataFormEdit: () => import('./TplviewDataFormEdit'),
    DataModelSenior: () => import('./DataModelSenior'),
    GeneralExport: () => import('@/views/admin/Table/GeneralExport'),
    TableDashboardData: () => import('./TableDashboardData'),
    TableMaintain: () => import('./TableMaintain'),
    DashboardTabView: () => import('./DashboardTabView'),
    HelpPanel: () => import('./HelpPanel'),
    TplviewDataAppFormEdit: () => import('./TplviewDataAppFormEdit'),
    AppTplviewFormForm: () => import('./AppTplviewFormForm')
  },
  data () {
    return {
      panes: [],
      panesKey: [],
      activeKey: 0,
      show0: false,
      collapsed: false,
      config: {},
      configfield: {},
      tableShowData: {},
      configdata: {},
      configview: {},
      showAll: [],
      datadetails: {},
      viewdetails: {},
      tableId: [],
      tableData: [],
      modules: [],
      dataFormType: '',
      dataaddType: '',
      viewFormType: '',
      viewaddType: '',
      senior: this.$t('高级搜索'),
      typeList: [], // 自动搜索
      columns: [{
        title: this.$t('数据表名称'),
        dataIndex: 'name',
        width: 250,
        scopedSlots: {
          customRender: 'name'
        }
      }, {
        dataIndex: 'action',
        scopedSlots: {
          customRender: 'action'
        }
      }],
      queryParam: { module: 'admin', searchString: '' },
      homeActiveKey: 'guide',
      path: this.$t('导航/高级搜索'),
      tableBody: null, // 表格的实例
      tableBodyScrollTop: null
    }
  },
  watch: {
    panes (val) {
      if (this.panes.length === 0) {
        this.activeKey = 0
      }
      this.panesKey = val.map(item => {
        return !!item.key + '1'
      })
    },
    tableData (val) {
      if (this.tableShowData) {
        const record = val.find(item => item.tableId === this.tableShowData.tableId)
        if (record && this.showAll.indexOf(record.id) === -1) {
          this.showAll.push(record.id)
          for (const i in record.tablechild) {
            this.showAll.push(record.tablechild[i].id)
          }
        }
      }
    },
    activeKey (val) {
      // 重新定位滚动条
      if (val === 0) {
        this.$nextTick(() => {
          this.tableBody.scrollTop = this.tableBodyScrollTop
        })
      }
    },
    homeActiveKey (val) {
      // 重新定位滚动条
      if (val === 'guide') {
        this.$nextTick(() => {
          this.tableBody.scrollTop = this.tableBodyScrollTop
        })
      }
    }
  },
  activated () {
    this.tableBody.scrollTop = this.tableBodyScrollTop
  },
  mounted () {
    this.tableBody = document.querySelector('.ant-table-body')
    const _this = this
    this.tableBody.onscroll = function (e) {
      _this.tableBodyScrollTop = e.target.scrollTop
    }
  },
  beforeDestroy () {
    this.tableBody.onscroll = null
  },
  created () {
    if (!storage.get('moduleName')) {
      storage.set('moduleName', 'crm')
    }
    this.queryParam.module = storage.get('moduleName')
  },
  methods: {
    // 刷新面板
    onRefresh (key, index) {
      if (key === 0) {
        this.show0 = !this.show0
      } else {
        this.panesKey.splice(index, 1, !this.panesKey[index])
      }
    },
    onEdit (targetKey, action) {
      this[action](targetKey)
    },
    changeTab () {
      this.panes.forEach(item => {
        if (item.key === this.activeKey) {
          if (item.content === 'viewdetails') {
            this.viewdetails = item.data
          } else if (item.content === 'datadetails') {
            this.datadetails = item.data
          } else if (item.content === 'field') {
            this.configfield = item.data
          }
        }
      })
    },
    remove (targetKey) {
      let activeKey = this.activeKey
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.panes.filter(pane => pane.key !== targetKey)
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key
        } else {
          activeKey = panes[0].key
        }
      }
      this.panes = panes
      this.activeKey = activeKey
    },
    loadDataTable (parameter) {
      return this.axios({
        url: '/admin/table/index',
        data: Object.assign(parameter, this.queryParam, { init: !this.modules.length })
      }).then(res => {
        if (this.modules.length === 0) {
          this.modules = res.result ? res.result.modules : []
        }
        for (const i in res.result.data) {
          res.result.data[i]['style'] = 'span'
          res.result.data[i]['sortId'] = res.result.data[i].id
          res.result.data[i]['tablechild'] = [{
            name: this.$t('字段管理'), id: 100000000 + i + 1, sortId: 100000000 + i + 1, style: 'field', tableId: res.result.data[i].tableId, tbName: res.result.data[i].name, data: res.result.data[i]
          }, {
            name: this.$t('数据窗口'), id: 100000000 + i + 2, sortId: 100000000 + i + 2, style: 'data', tableId: res.result.data[i].tableId, tbName: res.result.data[i].name, data: res.result.data[i]
          }, {
            name: this.$t('表单视图'), id: 100000000 + i + 3, sortId: 100000000 + i + 3, style: 'view', tableId: res.result.data[i].tableId, tbName: res.result.data[i].name, data: res.result.data[i]
          }]
          if (res.result.data[i].data && res.result.data[i].data.window) {
            res.result.data[i].tablechild[1]['tablechild'] = res.result.data[i].data.window
            for (let j = 0; j < res.result.data[i].tablechild[1].tablechild.length; j++) {
              res.result.data[i].tablechild[1].tablechild[j]['sortId'] = res.result.data[i].tablechild[1].tablechild[j].id + 'window'
              res.result.data[i].tablechild[1].tablechild[j]['style'] = 'datadetails'
              res.result.data[i].tablechild[1].tablechild[j]['viewname'] = res.result.data[i].tablechild[1].name
              res.result.data[i].tablechild[1].tablechild[j]['tbName'] = res.result.data[i].name
              res.result.data[i].tablechild[1].tablechild[j]['alias'] = res.result.data[i].alias
              res.result.data[i].tablechild[1].tablechild[j]['modules'] = this.queryParam.modules
            }
          }
          if (res.result.data[i].data && res.result.data[i].data.form) {
            res.result.data[i].tablechild[2]['tablechild'] = res.result.data[i].data.form
            for (let j = 0; j < res.result.data[i].tablechild[2].tablechild.length; j++) {
              res.result.data[i].tablechild[2].tablechild[j]['sortId'] = res.result.data[i].tablechild[2].tablechild[j].id + 'form'
              res.result.data[i].tablechild[2].tablechild[j]['style'] = 'viewdetails'
              res.result.data[i].tablechild[2].tablechild[j]['viewname'] = res.result.data[i].tablechild[2].name
              res.result.data[i].tablechild[2].tablechild[j]['tbName'] = res.result.data[i].name
              res.result.data[i].tablechild[2].tablechild[j]['alias'] = res.result.data[i].alias
              res.result.data[i].tablechild[2].tablechild[j]['modules'] = this.queryParam.modules
            }
          }
          res.result.data[i].name = res.result.data[i].name + '(' + res.result.data[i].alias + ')'
        }
        this.tableData = res.result.data
        return res.result
      })
    },
    onExpand (expanded, record) {
      if (expanded) {
        // 设置展开窗Key，代表展开操作
        this.showAll.push(record.id)
      } else {
        // 代表折叠操作
        if (this.showAll.length) {
          this.showAll = this.showAll.filter(v => {
            return v !== record.id
          })
        }
      }
    },
    choiceModule (value) {
      this.queryParam.module = value
      this.$refs.table.refresh(true)
      if (this.$refs.tableMaintain) {
        this.$refs.tableMaintain.queryParam.module = value
        this.$refs.tableMaintain.searchCategory()
        this.$refs.tableMaintain.$refs.table.refresh(true)
      }
      if (this.$refs.tableDashboardData) {
        this.$refs.tableDashboardData.queryParam.module = value
        this.$refs.tableDashboardData.$refs.table.refresh(true)
      }
      storage.set('moduleName', value)
    },
    openSenior () {
      this.senior = this.$t('高级搜索')
      this.path = this.$t('高级搜索')
      this.configview = {}
      this.config = {}
    },
    // 更新缓存
    handleUpdateCache () {
      const that = this
      this.$confirm({
        title: this.$t('您确定要更新缓存吗？'),
        onOk: () => {
          this.$setLoading({ spinning: true, tip: this.$t('正在更新缓存，请稍候……'), size: 'large' })
          that.axios({
            url: '/admin/index/updateCache'
          }).then(() => {
            that.$setLoading(false)
            that.$message.success(this.$t('缓存更新完成'))
          })
        }
      })
    },
    handleAdd () {
      this.$refs.tableForm.showAdd({
        action: 'add',
        title: this.$t('添加'),
        url: '/admin/table/add',
        module: this.queryParam.module
      })
    },
    handleEdit (record) {
      this.$refs.tableForm.showEdit({
        action: 'edit',
        title: `${this.$t('编辑')}：` + record.name,
        url: '/admin/table/edit',
        module: this.queryParam.module,
        record: record
      })
    },
    handleExport (record) {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'exportTableField',
        parameter: {
          module: this.queryParam.module,
          tableId: record.tableId
        }
      })
    },
    handleExportOverview () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'exportTable',
        parameter: {
          module: this.queryParam.module
        }
      })
    },
    handleExportTableField () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'exportTableField',
        parameter: {
          module: this.queryParam.module,
          tableId: ''
        }
      })
    },
    handleSync () {
      const me = this
      this.$confirm({
        title: this.$t('您确认要同步数据表吗?'),
        onOk () {
          me.$setLoading({ spinning: true, tip: me.$t('数据表同步中，请稍候……'), size: 'large' })
          me.axios({
            url: '/admin/table/syncModuleTables',
            params: { module: me.queryParam.module }
          }).then(res => {
            me.$setLoading(false)
            me.$refs.table.refresh()
            me.$message.success(res.message)
          })
        }
      })
    },
    handleOk (id) {
      if (id) {
        for (const i in this.panes) {
          if (id === this.panes[i].key) {
            this.panes.splice(i, 1)
          }
        }
      }
      this.$refs.table.refresh()
    },
    handleDelete (record) {
      const me = this
      const table = this.$refs.table
      const tableId = record && record.tableId || this.selectedRowKeys
      this.$confirm({
        title: record ? this.$t('您确认要删除该记录吗？') : this.$t('您确认要删除选中的记录吗？'),
        onOk () {
          me.axios({
            url: '/admin/table/delete',
            params: { tableId: tableId }
          }).then(res => {
            if (res.code) {
              me.$message.error(res.message)
            } else {
              me.$message.success(res.message)
              table.refresh()
            }
          })
        }
      })
    },
    openTags (record) {
      if (record.style === 'span') {
        if (this.showAll.indexOf(record.id) === -1) {
          this.showAll.push(record.id)
          for (const i in record.tablechild) {
            this.showAll.push(record.tablechild[i].id)
          }
        } else {
          const index = this.showAll.indexOf(record.id)
          this.showAll.splice(index, 1)
        }
      } else {
        if (record.style === 'field' && this.panes.every(item => item.key !== record.tableId)) {
          this.configfield = {
            action: 'edit',
            title: record.name,
            url: '/admin/table/edit',
            module: record.module,
            record: record
          }
          this.panes.push({ title: record.tbName, content: 'field', key: record.tableId, name: record.name, alias: record.data.alias, data: this.configfield, module: record.data.module })
          this.activeKey = record.tableId
        } else if (record.style === 'field') {
          this.activeKey = record.tableId
        } else if (this.panes.every(item => item.key !== record.id)) {
          if (record.style === 'data') {
            this.config = {}
            this.senior = ''
            this.config = {
              action: 'edit',
              title: record.name,
              url: '/admin/table/edit',
              module: this.queryParam.module,
              data: record,
              styleshow: 'data',
              tbName: record.tbName,
              loading: true
            }
            this.configview = {}
            this.$nextTick(() => {
              this.$refs.viewData.handleOk()
            })
          }
          if (record.style === 'datadetails') {
            this.datadetails = {
              action: 'edit',
              title: record.name,
              url: '/admin/template/editDataWindow',
              record: record,
              tableId: record.tableId || record.value,
              type: record.type,
              module: this.queryParam.module,
              item: record.data
            }
            this.panes.push({ title: record.name, content: ['appDataWindow', 'appProcessCenterDataWindow'].includes(record.type) ? 'appDatadetails' : 'datadetails', key: record.id, namefirst: record.tbName, nametwo: record.viewname, alias: record.alias, module: this.queryParam.module, data: this.datadetails })
            this.activeKey = record.id
            const name = String(this.activeKey)
            this.tableId[name] = record.tableId || record.value
            this.dataFormType = 'data'
          }
          if (record.style === 'view') {
            this.configview = {}
            this.senior = ''
            this.configview = {
              action: 'edit',
              title: record.name,
              url: '/admin/table/edit',
              module: this.queryParam.module,
              data: record,
              styleshow: 'view',
              tbName: record.tbName
            }
            this.config = {}
            this.$nextTick(() => {
              this.$refs.viewForm.handleOk()
            })
          }
          if (record.style === 'viewdetails') {
            this.viewdetails = {
              action: 'edit',
              title: record.name,
              url: 'admin/template/editFormView',
              record: record,
              tableId: record.tableId || record.value
            }
            this.panes.push({
              title: record.name,
              content: record.type === 'webFormView' ? 'viewdetails' : 'appViewdetails',
              key: record.id,
              namefirst: record.tbName,
              nametwo: record.viewname,
              alias: record.alias,
              data: this.viewdetails,
              module: this.queryParam.module
            })
            this.activeKey = record.id
            const name = String(this.activeKey)
            this.tableId[name] = record.tableId || record.value
            this.viewFormType = 'view'
          }
        } else {
          this.activeKey = record.id
        }
        this.path = `${this.config.tbName ?? this.configview.tbName ?? this.$t('导航')}/${this.config.title ?? this.configview.title ?? this.senior}`
      }
    },
    getList (data) {
      if (this.panes.every(item => item.key !== data.record.id)) {
        const content = ['webDataWindow', 'webSubformDataWindow', 'webProcessCenterDataWindow'].includes(data.type) ? 'datadetails' : 'appDatadetails'
        this.panes.push({
          title: data.title,
          content: content,
          key: data.record.id,
          namefirst: data.item.tbName,
          nametwo: data.item.name,
          data: data,
          alias: data.alias,
          module: data.item.data.module
        })
        this.activeKey = data.record.id
      }
      this.activeKey = data.record.id
      this.datadetails = data
      const name = String(this.activeKey)
      this.tableId[name] = data.tableId
      this.dataFormType = 'data'
    },
    getForm (data) {
      if (this.panes.every(item => item.key !== data.record.id)) {
        const content = data.record.type === 'webFormView' ? 'viewdetails' : 'appViewdetails'
        this.panes.push({
          title: data.title,
          content: content,
          key: data.record.id,
          namefirst: data.item.tbName,
          nametwo: data.item.name,
          data: data,
          alias: data.alias,
          module: data.item.data.module
        })
        this.activeKey = data.record.id
      }
      this.activeKey = data.record.id
      this.viewdetails = data
      const name = String(this.activeKey)
      this.tableId[name] = data.tableId
      this.viewFormType = 'view'
    },
    getField (data) {
      if (data.type === '字段') {
        this.configfield = {
          action: 'edit',
          title: data.name,
          url: '/admin/table/edit',
          module: this.queryParam.module,
          record: data
        }
        if (this.panes.every(item => item.key !== data.tableId)) {
          this.panes.push({
            title: data.tableName,
            content: 'field',
            key: data.tableId,
            name: data.name,
            alias: data.alias,
            module: this.queryParam.module
          })
          this.activeKey = data.tableId
        } else {
          this.activeKey = data.tableId
        }
      } else if (['卡片数据窗口', '数据窗口', '流程数据窗口', '子表数据窗口'].includes(data.type)) {
        if (this.panes.every(item => item.key !== data.id)) {
          this.panes.push({
            title: data.name,
            content: 'datadetails',
            key: data.id,
            namefirst: data.tableName,
            nametwo: '数据窗口',
            data: data,
            alias: data.alias,
            module: this.queryParam.module
          })
          this.activeKey = data.id
        }
        this.dataFormType = ''
        this.activeKey = data.id
        data['action'] = 'edit'
        if (data.type === '数据窗口') {
          data['type'] = 'webDataWindow'
        } else if (data.type === '子表数据窗口') {
          data['type'] = 'webSubformDataWindow'
        } else if (data.type === '卡片数据窗口') {
          data['type'] = 'tableCardWindow'
        }
        data['url'] = '/admin/template/editDataWindow'
        data['record'] = {}
        data.record['id'] = data.id
        this.datadetails = data
        this.dataFormType = 'data'
        const name = String(this.activeKey)
        this.tableId[name] = data.tableId
      } else {
        if (this.panes.every(item => item.key !== data.id)) {
          this.panes.push({
            title: data.name,
            content: 'viewdetails',
            key: data.id,
            namefirst: data.tableName,
            nametwo: '表单视图',
            data: data,
            alias: data.alias,
            module: this.queryParam.module
          })
          this.activeKey = data.id
        }
        this.viewFormType = ''
        data['action'] = 'edit'
        data['url'] = '/admin/template/editFormView'
        data['record'] = {}
        data.record['id'] = data.id
        this.activeKey = data.record.id
        this.viewdetails = data
        this.viewFormType = 'view'
        const name = String(this.activeKey)
        this.tableId[name] = data.tableId
      }
    },
    showTable (data) {
      this.tableShowData = data
      this.$set(this.queryParam, 'searchString', data.tableName)
      this.$refs.table.refresh(true)
    },
    tabChange (value, id) {
      for (const i in this.panes) {
        if (this.activeKey === this.panes[i].key) {
          this.panes[i].key = id
          this.panes[i].data['record'] = {}
          this.panes[i].data.record['id'] = id
          this.panes[i].title = value.name
          this.activeKey = id
          this.datadetails = this.panes[i].data
        }
      }
      this.handleOk()
      this.$nextTick(() => {
        this.$refs.viewForm.handleOk()
      })
    },
    tabViewChange (value, id) {
      for (const i in this.panes) {
        if (this.activeKey === this.panes[i].key) {
          this.panes[i].key = id
          this.panes[i].data['record'] = {}
          this.panes[i].data.record['id'] = id
          this.panes[i].title = value.name
          this.activeKey = id
          this.viewdetails = this.panes[i].data
        }
      }
      this.handleOk()
    },
    getAdd (data) {
      this.panes.push({
        title: data.title,
        content: 'datadetails',
        key: data.Keyid,
        namefirst: data.item.tbName,
        nametwo: data.item.name,
        data: data,
        module: data.module
      })
      this.activeKey = data.Keyid
      this.datadetails = data
      this.dataaddType = 'dataadd'
      const name = String(this.activeKey)
      this.tableId[name] = data.tableId
    },
    getViewAdd (data) {
      this.panes.push({
        title: data.title,
        content: 'viewdetails',
        key: data.Keyid,
        namefirst: data.item.tbName,
        nametwo: data.item.name,
        data: data,
        module: data.module
      })
      this.activeKey = data.Keyid
      this.viewdetails = data
      this.viewaddType = 'viewadd'
      const name = String(this.activeKey)
      this.tableId[name] = data.tableId
    },
    // 数据提交
    handleSubmit () {
      // this.$refs.TplviewDataAppFormEdit[0].handleSubmit('save')
      let type = ''
      this.panes.forEach(item => {
        if (item.key === this.activeKey) {
          type = item.content
        }
      })
      if (type === 'datadetails') {
        for (const i in this.$refs.tplviewDataFormEdit) {
          if (this.$refs.tplviewDataFormEdit[i].data.id === this.activeKey) {
            this.$refs.tplviewDataFormEdit[i].handleSubmit('save')
          } else if (!this.$refs.tplviewDataFormEdit[i].data.id && this.activeKey === this.$refs.tplviewDataFormEdit[i].config.Keyid) {
            this.$refs.tplviewDataFormEdit[i].handleSubmit('save')
          }
        }
      } else if (type === 'appDatadetails') {
        for (const i in this.$refs.tplviewDataAppFormEdit) {
          if (this.$refs.tplviewDataAppFormEdit[i].data.id === this.activeKey) {
            this.$refs.tplviewDataAppFormEdit[i].handleSubmit('save')
          }
        }
      } else if (type === 'viewdetails') {
        for (const i in this.$refs.tplviewFormForm) {
          if ((this.$refs.tplviewFormForm[i].data.id && String(this.$refs.tplviewFormForm[i].data.id) === String(this.activeKey)) ||
            this.$refs.tplviewFormForm[i].config.Keyid === this.activeKey) {
            this.$refs.tplviewFormForm[i].handleSubmit('save')
          }
        }
      } else if (type === 'appViewdetails') {
        for (const i in this.$refs.appTplviewFormForm) {
          if (this.$refs.appTplviewFormForm[i].data.id === this.activeKey) {
            this.$refs.appTplviewFormForm[i].handleSubmit('save')
          }
        }
      }
    },
    // 弹出新的tab
    openDashboard (record) {
      if (this.panes.every(item => item.key !== record.id)) {
        this.panes.push({
          title: '仪表盘',
          content: 'dashboard',
          key: record.id,
          name: record.dashboardName,
          alias: record.alias,
          module: this.queryParam.module
        })
        this.activeKey = record.id
      } else {
        this.activeKey = record.id
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';
/deep/ .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
  margin-right: -1px;
}
.myTab {
  /deep/.ant-tabs-nav-scroll {
    display: none;
  }
  /deep/.ant-tabs-nav-container {
    display: none;
  }
  /deep/.ant-tabs-bar {
    display: none;
  }
}

.reload {
  margin-left: 8px;
  color: rgba(0, 0, 0, 0.65);
  transition-duration: 0.2s;
}
.reload:hover {
  color: @primary-color;
}
</style>
