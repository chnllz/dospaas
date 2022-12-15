<template>
  <a-drawer :destroyOnClose="true" :title="config.title" :width="1000" :visible="visible" @close="close">
    <a-spin :spinning="loading">
      <a-tabs v-model="activeKey">
        <a-tab-pane :key="1" :tab="config.type === 'import' ? $t('导入数据') : $t('导出数据')">
          <!-- 原配置导入模板 -->
          <a-form v-if="windowType === 'config' && config.type === 'import'" :form="form" @submit="handleSubmit">
            <a-form-item :label="$t('导入操作')" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group
                v-decorator="[
                  'parameter[action]',
                  {
                    rules: [{ required: true, message: $t('请选择导入操作') }],
                    initialValue: 'add' || 'edit' || 'addEdit' || 'editImg' || 'delete'
                  }
                ]"
                @change="actionChange"
              >
                <a-radio v-if="actionShow.indexOf('add') !== -1" value="add">{{ $t('新增') }}</a-radio>
                <a-radio v-if="actionShow.indexOf('edit') !== -1" value="edit">{{ $t('编辑') }}</a-radio>
                <a-radio v-if="actionShow.indexOf('addEdit') !== -1" value="addEdit">{{ $t('新增&编辑') }}</a-radio>
                <a-radio v-if="actionShow.indexOf('editImgs') !== -1" value="editImg">{{ $t('编辑图片') }}</a-radio>
                <a-radio v-if="actionShow.indexOf('del') !== -1" value="delete">{{ $t('删除') }}</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item v-if="action" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <span slot="label">
                {{ $t('关联字段') }}
                <a-tooltip
                  :title="
                    $t('数据导入时，系统将根据该字段对已有数据进行「编辑」或「删除」操作，建议选择具备唯一性的字段')
                  "
                >
                  <a-icon type="question-circle-o" />
                </a-tooltip>
              </span>
              <a-select
                v-decorator="['parameter[associated]', { rules: [{ required: true, message: $t('请选择关联字段') }] }]"
                showSearch
                option-filter-prop="children"
              >
                <a-select-option v-for="(value, key) in fields" :key="key" :value="key">
                  {{ value.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item v-if="action && !actionImg" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <span slot="label">
                {{ $t('图片字段') }}
                <a-tooltip
                  :title="
                    $t('数据导入时，系统将根据该字段对已有数据进行「编辑」或「删除」操作，建议选择具备唯一性的字段')
                  "
                >
                  <a-icon type="question-circle-o" />
                </a-tooltip>
              </span>
              <a-select
                v-decorator="['parameter[imgField]', { rules: [{ required: true, message: $t('请选择图片字段') }] }]"
                showSearch
                option-filter-prop="children"
              >
                <a-select-option v-for="(value, key) in fields" :key="key" :value="key">
                  {{ value.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item v-if="actionImg" :label="$t('下载模板')" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-button icon="download" size="small" @click="handleDownloadWindowConfig">{{ $t('点击下载') }}</a-button>
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
              <span slot="label">
                {{ $t('文件上传') }}
                <a-tooltip :title="$t('请确保上传的文件格式和下载的模板保持一致，否则会导致数据无法加入')">
                  <a-icon type="question-circle" />
                </a-tooltip>
              </span>
              <a-upload
                name="file"
                :showUploadList="false"
                :action="fileAction"
                :headers="{ 'Access-Token': $store.getters.userInfo.accessToken }"
                @change="handleChange"
              >
                <a-button icon="upload" size="small">{{ $t('点击上传') }}</a-button>
              </a-upload>
              <span style="margin-left: 20px">{{ fileName }}</span>
            </a-form-item>
            <a-table rowKey="alias" :columns="columns" :dataSource="checkdata" size="small" :pagination="false">
              <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
              <span slot="unique" slot-scope="text, record">
                {{ record.unique === 1 ? '√' : '×' }}
              </span>
              <span slot="required" slot-scope="text, record">
                {{ record.required === 1 ? '√' : '×' }}
              </span>
              <span slot="check" slot-scope="text, record">
                <a-icon v-if="record.check === 1" type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
                <a-icon v-if="record.check === 0" type="close-circle" theme="twoTone" two-tone-color="#f5222d" />
                <a-icon v-if="record.check === 2" type="exclamation-circle" theme="twoTone" two-tone-color="#faad14" />
              </span>
            </a-table>
          </a-form>
          <!-- 原配置导出模板 -->
          <div v-else-if="windowType === 'config' && config.type !== 'import'">
            <a-alert :message="messageExport" type="info" />
            <a-row v-if="!config.customExport" :gutter="10">
              <a-col :span="16">
                <div style="display: flex; margin: 8px 0">
                  <a-input-search
                    :placeholder="$t('请输入字段名称搜索')"
                    @search="
                      (e) => {
                        showWord = e
                      }
                    "
                    @change="
                      (e) => {
                        if (!e.target.value) {
                          showWord = e.target.value
                        }
                      }
                    "
                  />
                  <a-button style="margin: 0 8px" @click="handleField">{{ $t('选择字段') }}</a-button>
                  <a-button @click="handleSort">{{ $t('排序') }}</a-button>
                </div>
                <a-table
                  ref="table"
                  rowKey="dataIndex"
                  :columns="columnsField"
                  :dataSource="dataSource.filter((item) => item.title && item.title.includes(showWord))"
                  :sorter="{ field: 'id', order: 'descend' }"
                  size="small"
                  :pagination="false"
                ></a-table>
              </a-col>
              <a-col :span="8">
                <s-table
                  ref="tableTemp"
                  style="margin-top: 8px"
                  rowKey="id"
                  :columns="columnsTemplate"
                  :data="templateData"
                  size="small"
                  :showPagination="false"
                >
                  <div
                    slot="name"
                    slot-scope="text, record, index"
                    @mouseenter="onMouseOver(record)"
                    @mouseleave="onMouseOut(record)"
                  >
                    <div>
                      <a-col :span="1" style="margin-right: 5px">
                        <a-icon v-show="chiose[index]" type="check" style="margin-top: 4px; color: #52c41a" />
                      </a-col>
                      <a-col :span="21" style="cursor: pointer" @click="changTemplate(record, index)">
                        <span>{{ record.name }}</span>
                      </a-col>
                      <a-col :span="1">
                        <a-icon
                          v-show="record.display"
                          type="close"
                          style="float: right; margin-top: 4px; color: #ff4d4f"
                          @click="Tempdelete(record)"
                        />
                      </a-col>
                    </div>
                  </div>
                </s-table>
              </a-col>
            </a-row>
            <a-alert v-else :message="$t('定制导出功能，请直接点击“导出”按钮')" type="info" />
          </div>
          <a-form v-else :form="formfile" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
            <a-alert
              v-if="config.message"
              :message="config.message"
              size="small"
              type="info"
              style="margin-bottom: 8px"
            />
            <slot v-if="config.slotScoped"></slot>
            <a-form-item v-else-if="config.type === 'import' && !config.slotScoped" :label="$t('模板下载')">
              <a-button icon="download" @click="handleDownloadTemplate">{{ $t('模板下载') }}</a-button>
            </a-form-item>
            <a-form-item :label="config.type === 'import' ? $t('导入文件') : $t('导出文件名称')">
              <div v-if="config.type === 'import'">
                <a-upload
                  name="upload"
                  :showUploadList="false"
                  :action="config.uploadUrl"
                  :headers="{ 'Access-Token': userInfo.accessToken }"
                  @change="handleChange"
                >
                  <a-button>
                    <a-icon type="upload" />
                    {{ $t('选择文件') }}
                  </a-button>
                </a-upload>
                {{ uploadMessage }}
              </div>
              <a-input
                v-else
                v-decorator="[
                  'fileName',
                  {
                    initialValue: '',
                    rules: [
                      { required: true, message: $t('请输入导出文件名称') },
                      { max: 250, message: $t('导出文件名称不得大于250个字符') },
                      { validator: checkName }
                    ]
                  }
                ]"
              />
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane :key="2" :tab="$t('我的任务')">
          <a-alert :message="$t(message)" style="margin-bottom: 8px" />
          <div style="display: flex; margin-bottom: 8px">
            <a-input
              v-model="queryParamTask.name"
              :placeholder="$t('请输入文件名搜索')"
              @keydown.enter="$refs.tableTask.refresh()"
            />
            <a-space style="margin-left: 8px">
              <a-button type="primary" @click="$refs.tableTask.refresh()">{{ $t('搜索') }}</a-button>
              <a-button
                @click="
                  () => {
                    queryParamTask = {}
                    $refs.tableTask.refresh()
                  }
                "
              >
                {{ $t('重置') }}
              </a-button>
            </a-space>
          </div>
          <div style="height: calc(100vh - 260px)">
            <s-table
              ref="tableTask"
              size="small"
              rowKey="id"
              :columns="columnsTask"
              :data="loadDataTable"
              class="table-fill"
              :scroll="{ y: true }"
            >
              <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
              <span slot="status" slot-scope="text, record">
                <a-badge v-if="text == '0'" status="error" :text="$t('未开始')" />
                <a-tooltip
                  v-else-if="text == '1'"
                  :title="$t('总导出数: ') + record.totalCount + `', ${$t('已导出数: ')}'` + record.completeCount"
                >
                  <a-progress :percent="record.processing || 0" status="active" />
                </a-tooltip>
                <a-badge v-else-if="text == '2'" status="success" :text="$t('已完成')" />
                <a-badge v-else-if="text == '3'" status="error" :text="$t('失败')" />
              </span>
              <span slot="duration" slot-scope="text">{{ text }}</span>
              <div slot="action" slot-scope="text, record">
                <a @click="handleView(record)">{{ $t('查看') }}</a>
                <a-divider type="vertical" />
                <template v-if="config.type !== 'import'">
                  <a :disabled="record.status != 2" @click="handleDownload(record)">
                    {{ $t('下载') }}
                  </a>
                  <a-divider type="vertical" />
                </template>
                <a :disabled="record.status == 1" @click="handleDelete(record)">{{ $t('删除') }}</a>
              </div>
            </s-table>
          </div>
        </a-tab-pane>
        <a-tab-pane :key="3" :tab="$t('所有任务')">
          <div style="display: flex; margin-bottom: 8px">
            <a-input
              v-model="queryParamAll.name"
              :placeholder="$t('请输入文件名搜索')"
              @keydown.enter="$refs.tableAll.refresh()"
            />
            <a-space style="margin-left: 8px">
              <a-button type="primary" @click="$refs.tableAll.refresh()">{{ $t('搜索') }}</a-button>
              <a-button
                @click="
                  () => {
                    queryParamAll = {}
                    $refs.tableAll.refresh()
                  }
                "
              >
                {{ $t('重置') }}
              </a-button>
            </a-space>
          </div>
          <div style="height: calc(100vh - 220px)">
            <s-table
              ref="tableAll"
              size="small"
              rowKey="id"
              :columns="columnsAll"
              :data="AllDataTable"
              class="table-fill"
              :scroll="{ y: true }"
            >
              <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
              <span slot="status" slot-scope="text, record">
                <a-badge v-if="text == '0'" status="error" :text="$t('未开始')" />
                <a-tooltip
                  v-else-if="text == '1'"
                  :title="`${$t('总导出数: ')}` + record.totalCount + `, ${$t('已导出数: ')}` + record.completeCount"
                >
                  <a-progress :percent="record.processing || 0" status="active" />
                </a-tooltip>
                <a-badge v-else-if="text == '2'" status="success" :text="$t('已完成')" />
                <a-badge v-else-if="text == '3'" status="error" :text="$t('失败')" />
              </span>
              <span slot="duration" slot-scope="text">{{ text }}</span>
            </s-table>
          </div>
        </a-tab-pane>
      </a-tabs>
      <div v-if="config.type !== 'import' && windowType === 'config'" class="bbar">
        <div v-if="activeKey === 1 && !config.customExport" style="float: left">
          <a-button style="margin-left: 0" @click="reset">{{ $t('重置') }}</a-button>
          <a-button @click="check ? setFileName('update') : setFileName('template')">
            {{ check ? $t('更新导出模板') : $t('保存导出模板') }}
          </a-button>
        </div>
        <a-button v-if="activeKey === 1" type="primary" @click="setName">{{ $t('导出') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
      <div v-if="config.type === 'import' && windowType === 'config'" class="bbar">
        <a-button v-if="activeKey === 1" type="primary" :disabled="!filePath ? true : false" @click="handleSubmit">
          {{ $t('导入') }}
        </a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
      <div v-if="windowType !== 'config'" class="bbar">
        <a-button
          v-if="activeKey === 1"
          type="primary"
          :disabled="config.type === 'import' && !filePath ? true : false"
          @click="handleExportAndImport"
        >
          {{ config.type === 'import' ? $t('导入') : $t('导出') }}
        </a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
    <a-modal
      :title="exportConfig.title"
      :visible="fileVisible"
      :confirmLoading="fileLoading"
      @cancel="fileVisible = !fileVisible"
      @ok="handleOk"
    >
      <div>
        <a-form :form="formfile">
          <a-form-item :label="$t('导出文件名称')" :colon="false" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
            <a-input
              v-decorator="[
                'fileName',
                {
                  initialValue: check ? fileName : nowtime,
                  rules: [{ required: true, message: $t('请输入导出文件名称') }, { validator: checkName }]
                }
              ]"
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <a-modal
      :title="exportConfig.title"
      :visible="exportVisible"
      :confirmLoading="exportLoading"
      @cancel="exportVisible = !exportVisible"
      @ok="handleOk('template')"
    >
      <div>
        <a-form :form="form">
          <a-form-item :label="$t('导出模板名称')" :colon="false" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
            <a-input
              v-decorator="[
                'name',
                { initialValue: check ? fileName : '', rules: [{ required: true, message: $t('请输入导出模板名称') }] }
              ]"
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <drag-sort ref="dragSort" @ok="getSort" />
    <user-table-import-view ref="userTableImportView" />
    <column-check ref="columnCheck" :dataList="dataList" @ok="getList" />
  </a-drawer>
</template>
<script>
import debounce from 'lodash/debounce'
import { mapGetters } from 'vuex'
export default {
  i18n: window.lang('admin'),
  components: {
    DragSort: () => import('@/views/admin/Common/DragSort'),
    UserTableImportView: () => import('@/views/admin/General/UserTableImportView'),
    ColumnCheck: () => import('@/views/admin/Table/ColumnCheck')
  },
  data () {
    this.checkName = debounce(this.checkName, 1000)
    return {
      config: {},
      activeKey: 1,
      visible: false,
      loading: false,
      fileName: '',
      filePath: '',
      formfile: this.$form.createForm(this),
      form: this.$form.createForm(this),
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
      // 搜索参数
      queryParamTask: {},
      uploadMessage: this.$t('请选择要导入的文件'),
      queryParamAll: {},
      columnsAll: [{
        title: '#',
        width: 40,
        scopedSlots: { customRender: 'serial' }
      }, {
        title: this.$t('文件名'),
        dataIndex: 'fileName',
        width: 170
      }, {
        title: this.$t('创建时间'),
        dataIndex: 'inputTime',
        width: 150
      }, {
        title: this.$t('开始时间'),
        dataIndex: 'runTime',
        width: 150
      }, {
        title: this.$t('耗时'),
        dataIndex: 'duration',
        scopedSlots: { customRender: 'duration' },
        width: 100
      }, {
        title: this.$t('任务状态'),
        dataIndex: 'status',
        width: 130,
        scopedSlots: { customRender: 'status' }
      }, {
        title: this.$t('创建人'),
        dataIndex: 'inputUser',
        width: 90
      }],
      columnsTask: [{
        title: '#',
        width: 40,
        scopedSlots: { customRender: 'serial' }
      }, {
        title: this.$t('文件名'),
        dataIndex: 'fileName',
        width: 170
      }, {
        title: this.$t('创建时间'),
        dataIndex: 'inputTime',
        width: 150
      }, {
        title: this.$t('开始时间'),
        dataIndex: 'runTime',
        width: 150
      }, {
        title: this.$t('耗时'),
        dataIndex: 'duration',
        scopedSlots: { customRender: 'duration' },
        width: 100
      }, {
        title: this.$t('任务状态'),
        dataIndex: 'status',
        width: 130,
        scopedSlots: { customRender: 'status' }
      }, {
        title: this.$t('文件大小'),
        dataIndex: 'fileSize'
      }, {
        title: this.$t('操作'),
        dataIndex: 'action',
        align: 'center',
        width: 130,
        scopedSlots: { customRender: 'action' }
      }],
      columns: [{
        title: '#',
        width: 40,
        scopedSlots: { customRender: 'serial' }
      }, {
        title: this.$t('模板字段'),
        dataIndex: 'field'
      }, {
        title: this.$t('唯一'),
        dataIndex: 'unique',
        scopedSlots: { customRender: 'unique' }
      }, {
        title: this.$t('必填'),
        dataIndex: 'required',
        scopedSlots: { customRender: 'required' }
      }, {
        title: this.$t('导入字段'),
        dataIndex: 'fieldImport'
      }, {
        title: this.$t('校验结果'),
        dataIndex: 'check',
        scopedSlots: { customRender: 'check' }
      }],
      columnsField: [{
        title: '#',
        width: 60,
        customRender: (text, record, index) => index + 1
      }, {
        title: this.$t('字段列名称'),
        dataIndex: 'title'
      }],
      columnsTemplate: [{
        title: this.$t('导出模板'),
        dataIndex: 'name',
        scopedSlots: { customRender: 'name' }
      }],
      type: '',
      Interval: null,
      message: '',
      tableId: '',
      // windowType === 'config'为数据窗口调出的导入、导出窗口
      checkdata: [],
      windowType: '',
      action: false,
      actionImg: true,
      fields: [],
      messageExport: (<div>
        <div>{this.$t('1、初始打开时，已勾选的为表格中显示的字段，未勾选的为表格中隐藏的字段。')}</div>
        <div>{this.$t('2、点击【保存导出模板】按钮，保存当前的导出模板。点击右侧的模板，加载已保存好的模板，更改后，点击【更新导出模板】以更新当前右侧选中的模板。')}</div>
        <div>{this.$t('3、点击【重置】，恢复到初始打开导出界面时的状态，可保存更多导出模板。')}</div></div>),
      customTitle: {},
      // 全部字段
      plainOptions: [],
      selectedRowKeys: [],
      chiose: [],
      check: false,
      exportConfig: {},
      fileLoading: false,
      fileVisible: false,
      length: '',
      nowtime: null,
      exportVisible: false,
      exportLoading: false,
      dataSource: [],
      actionShow: [],
      fileAction: '',
      showWord: '',
      importTemplate: ''
    }
  },
  computed: {
    ...mapGetters(['setting', 'userInfo']),
    dataList () {
      const value = this.dataSource.map((item) => {
        const obj = {}
        obj.name = item.title
        obj.display = item.display
        obj.value = item.dataIndex
        obj.formType = item.formType
        obj.category = item.category
        return obj
      })
      return value
    }
  },
  methods: {
    show (config) {
      this.loading = true
      this.config = config
      this.tableId = this.config.tableId
      this.windowType = this.config.windowType ? this.config.windowType : ''
      this.importTemplate = this.config.barData && this.config.barData.importTemplate ? JSON.parse(this.config.barData.importTemplate) : null
      // 导入模式下，如未设置模板，不打开导入面板
      if (this.config.type === 'import' && (!this.importTemplate || !this.importTemplate.modal)) {
        this.$message.info(this.$t('未找到导入模板，请联系系统管理员'))
        return
      }
      this.visible = true
      this.activeKey = 1
      config.number = this.config.number || config.className
      this.fileName = ''
      this.filePath = ''
      if (this.config.setMenuName) {
        this.$nextTick(() => {
          this.setMenuFileName()
        })
      }
      this.uploadMessage = this.$t('请选择要导入的文件')
      if (!this.config.uploadUrl) {
        this.config.uploadUrl = `${this.$store.state.env.VUE_APP_API_BASE_URL}admin/attachment/upload/?uploadName=file`
      }
      if (this.windowType === 'config') {
        if (config.type === 'import') {
          this.fileAction = `${this.$store.state.env.VUE_APP_API_BASE_URL}${config.url}?templateId=${config.templateId}`
          this.actionShow = this.importTemplate && this.importTemplate.modal ? this.importTemplate.modal.action : ['add']
          // 刚进入的时候数据刷新数据
          this.action = false
          this.axios({
            url: `/admin/field/getAliasFieldMapping?tableId=${config.tableId}`
          }).then((res) => {
            this.loading = false
            this.fields = res.result
          })
        } else if (config.type !== 'import') {
          this.loading = false
          this.parentQueryParam = config.whereQueryParam
          this.selectedRowKeys = []
          const time = new Date()
          this.nowtime = String(time.getFullYear()) + ((time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)) + (time.getDate() < 10 ? '0' + time.getDate() : time.getDate()) + '-' + (new Date()).valueOf()
          this.dataSource = []
          for (const i in config.columns) {
            if (config.columns[i].customTitle) {
              config.columns[i].title = config.columns[i].customTitle
              const alias = config.columns[i].dataIndex
              const title = config.columns[i].customTitle
              this.customTitle[alias] = title
            }
          }
          this.plainOptions = config.columns.filter(item => item.alias !== 'action')
          for (let i = 0; i < this.plainOptions.length; i++) {
            if (this.plainOptions[i].type === 'action') {
              this.plainOptions.splice(i, 1)
            }
            if (this.plainOptions[i].display === 'd') {
              this.plainOptions.splice(i, 1)
            }
            if (this.plainOptions[i].display === 'v') {
              this.dataSource.push(this.plainOptions[i])
            }
            this.selectedRowKeys.push(this.plainOptions[i].dataIndex)
            this.plainOptions[i].id = i
          }
          const parameter = {
            pageNo: 1,
            pageSize: 1000,
            sortField: 'listOrder',
            sortOrder: 'ascend'
          }
          this.axios({
            url: '/admin/field/init',
            data: Object.assign(parameter, { tableId: this.tableId })
          }).then(res => {
            const data = res.result.data || []
            data.forEach(item => {
              this.plainOptions = this.plainOptions.map(im => {
                if (item.alias === im.dataIndex) {
                  im = Object.assign(im, item)
                }
                return im
              })
            })
          })
        }
      } else {
        this.loading = false
      }
    },
    // 设置导出文件名：菜单 + 时间 + 四位唯一编码
    setMenuFileName () {
      const menuName = this.$route.meta.title
      const randomNum = Math.floor(Math.random() * (9999 - 1000)) + 1000
      const { setFieldsValue } = this.formfile
      const date = this.moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      const name = `${menuName}-${date}-${randomNum}`
      setFieldsValue({ 'fileName': name })
    },
    // 接收传参&获取字段
    templateData () {
      return this.axios({
        url: '/admin/general/customTemplate',
        data: { action: 'get', type: 'list_export', templateId: this.config.templateId }
      }).then(res => {
        for (const i in res.result.data) {
          res.result.data[i]['display'] = false
          this.chiose.push(false)
          res.result.data[i].name = JSON.parse(res.result.data[i].setting).name
        }
        this.length = res.result.data.length
        return res.result
      })
    },
    // 验证首字符是否输入空格
    checkName (rule, value, callback) {
      if (value) {
        const string = this.$t('请输入内容，且不能为纯空格字符')
        const regLength = value.split(' ').join('').length
        if (regLength === 0) {
          callback(string)
        }
      }
      callback()
    },
    handleExportAndImport () {
      // 导入/导出按钮 提交
      this.formfile.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          const time = new Date()
          if (this.config.type === 'import') {
            this.axios({
              url: '/admin/task/add',
              data: {
                type: 'import',
                className: this.config.className, // 各模块的导入类名，根据不同模块 传入不同的模块名
                parameter: this.config.parameter,
                fileName: this.fileName,
                filePath: this.filePath,
                number: this.config.number,
                name: this.fileName
              }
            }).then(() => {
              this.loading = false
              this.activeKey = 2
              this.$emit('ok')
              // 第一次tab跳转表格未创建
              this.$nextTick(() => {
                this.$refs.tableTask.refresh()
              })
            })
          } else {
            const suffix = this.config.exportSuffix ?? '.xlsx'
            this.axios({
              url: '/admin/task/add',
              data: {
                type: 'export',
                className: this.config.className, // 各模块的导入类名，根据不同模块 传入不同的模块名
                parameter: this.config.parameter,
                fileName: values.fileName + suffix,
                filePath: 'public/upload/' + time.getFullYear() + '/' + ((time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)) + '/' + (time.getDate() < 10 ? '0' + time.getDate() : time.getDate()) + '/' + (new Date()).valueOf() + suffix,
                number: this.config.number,
                name: values.fileName + suffix
              }
            }).then(() => {
              this.loading = false
              this.activeKey = 2
              this.$emit('ok')
              // 第一次tab跳转表格未创建
              this.$nextTick(() => {
                this.$refs.tableTask.refresh()
              })
            })
          }
        }
      })
    },
    // 查看
    handleView (record) {
      this.$refs.userTableImportView.show({
        action: 'view',
        title: this.$t('查看'),
        url: '/admin/task/get',
        record: record
      })
    },
    handleChange (info) {
      this.loading = true
      if (info.file.status === 'uploading') {
        this.uploadMessage = this.$t('文件【{0}】上传中...', { 0: info.file.name })
      } else if (info.file.status === 'done') {
        this.loading = false
        this.uploadMessage = this.$t('文件【{0}】上传完成', { 0: info.file.name })
        this.checkdata = info.file.response.result.data
        this.tableId = info.file.response.result.tableId
        this.fileName = info.file.response.result.fileName
        this.filePath = info.file.response.result.filePath
      } else if (info.file.status === 'error') {
        this.loading = false
        this.uploadMessage = this.$t('文件【{0}】上传失败', { 0: info.file.name })
        this.fileName = ''
      }
    },
    // 我的任务显示
    loadDataTable (parameter) {
      return this.axios({
        url: '/admin/task/list',
        data: Object.assign(parameter, this.queryParamTask, { type: this.config.type === 'import' ? 'import' : 'export', number: this.config.number, sortField: 'inputTime', sortOrder: 'descend', access: 'myTask' })
      }).then(res => {
        res.result.data = this.changeData(res.result.data)
        this.message = this.$t('你的任务已全部处理完成')
        clearInterval(this.Interval)
        if (res.result.data.some(item => item.status !== 2)) {
          this.runtime()
        }
        return res.result
      })
    },
    // 所有任务显示
    AllDataTable (parameter) {
      return this.axios({
        url: '/admin/task/list',
        data: Object.assign(parameter, this.queryParamAll, { type: this.config.type === 'import' ? 'import' : 'export', number: this.config.number, sortField: 'inputTime', sortOrder: 'descend', access: 'allTask' })
      }).then(res => {
        res.result.data = this.changeData(res.result.data)
        clearInterval(this.Interval)
        if (res.result.data.some(item => item.status !== 2)) {
          this.runtime()
        }
        return res.result
      })
    },
    changeData (array) {
      return array.map(item => {
        const obj = item
        const setting = item.setting
        const reg = new RegExp(this.config.exportSuffix ?? '.xlsx')
        obj.fileName = setting.fileName ? setting.fileName.replace(reg, '') : ''
        obj.filePath = setting.filePath ? setting.filePath : ''
        obj.processing = item.complete_count / item.total_count
        return obj
      })
    },
    runtime () {
      this.Interval = setTimeout(() => {
        if (this.activeKey === 2) {
          this.$refs.tableTask.refresh()
        } else if (this.activeKey === 3) {
          this.$refs.tableAll.refresh()
        } else {
          clearInterval(this.Interval)
        }
      }, 5000)
    },
    close () {
      this.visible = !this.visible
      clearInterval(this.Interval)
    },
    // 导出文件下载
    handleDownload (record) {
      const filePath = encodeURIComponent(record.filePath)
      const fileName = encodeURIComponent(record.fileName)
      window.open(`${this.$store.state.env.VUE_APP_API_BASE_URL}admin/api/download/?filePath=${filePath}&fileName=${fileName}`)
    },
    // 模板下载
    handleDownloadTemplate () {
      const filePath = encodeURIComponent(this.config.filePath)
      if (this.config.fileName) {
        const fileName = encodeURIComponent(this.config.fileName)
        window.open(`${this.$store.state.env.VUE_APP_API_BASE_URL}admin/api/download/?filePath=${filePath}&fileName=${fileName}`)
      } else {
        window.open(`${this.$store.state.env.VUE_APP_API_BASE_URL}admin/api/download/?filePath=${filePath}`)
      }
    },
    // 导出任务删除
    handleDelete (record) {
      const that = this
      this.$confirm({
        title: this.$t('您确认要删除该记录吗？'),
        onOk () {
          that.axios({
            url: '/admin/task/delete',
            params: { id: record.id }
          }).then(res => {
            that.$refs.tableTask.refresh()
            return res.result
          })
        }
      })
    },
    /**
     * 原配置导入部分逻辑
     */
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          var checkField = false
          if (values.parameter.action === 'add') {
            checkField = true
          } else {
            for (var key in this.checkdata) {
              if (values.parameter.associated === this.checkdata[key].alias) {
                checkField = true
                break
              }
            }
          }
          if (checkField) {
            this.loading = true
            values.parameter = Object.assign(values.parameter, {
              templateId: this.config.templateId
            })
            values = {
              type: 'import',
              className: 'GeneralTask',
              number: this.config.templateId,
              parameter: values.parameter,
              filePath: this.filePath,
              fileName: this.fileName
            }
            this.axios({
              url: 'admin/task/add',
              data: values
            }).then((res) => {
              this.loading = false
              this.$emit('ok', values)
              if (res.code) {
                this.$message.warning(res.message)
              } else {
                this.$message.success(res.message)
                this.form.resetFields()
                this.activeKey = 2
                this.checkdata = []
                this.checkdone = true
                this.action = false
                this.fileName = null
                this.$nextTick(() => {
                  this.$refs.tableTask.refresh()
                })
              }
            })
          } else {
            this.$message.info(this.$t('导入的数据中没有关键字段，请调整后重试。'))
          }
        }
      })
    },
    actionChange (e) {
      this.action = e.target.value !== 'add'
      this.actionImg = e.target.value !== 'editImg'
    },
    /**
    * 原配置导出部分逻辑
    */
    handleOk (type) {
      // 模板数据提交
      if (type === 'template') {
        const table = this.$refs.tableTemp
        this.form.validateFields((err, values) => {
          values['fields'] = this.selectedRowKeys
          if (!err) {
            this.exportLoading = true
            this.axios({
              url: '/admin/general/customTemplate',
              data: {
                templateId: this.config.templateId,
                tableId: this.config.tableId,
                type: 'list_export',
                data: values,
                action: 'add'
              }
            }).then(res => {
              table.refresh()
              this.exportLoading = false
              this.exportVisible = false
            })
          }
        })
      } else {
        // 导出数据提交
        this.formfile.validateFields((err, values) => {
          if (!err) {
            const me = this
            me.loading = true
            me.fileLoading = true
            const time = new Date()
            const parameter = {
              exportFields: me.selectedRowKeys,
              tableId: me.config.tableId,
              columns: me.selectedRowKeys,
              customTitle: me.customTitle,
              flowStatus: me.config.flowStatus,
              condition: me.config.condition,
              templateId: me.config.flowCondition ? me.config.templateId : undefined,
              flowCondition: me.config.flowCondition
            }
            this.axios({
              url: '/admin/task/add',
              data: {
                number: me.config.templateId,
                type: 'export',
                className: me.config.className ? me.config.className : 'GeneralTask',
                parameter: parameter,
                filePath: 'public/upload/' + time.getFullYear() + '/' + ((time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)) + '/' + (time.getDate() < 10 ? '0' + time.getDate() : time.getDate()) + '/' + (new Date()).valueOf() + '.xlsx',
                fileName: values.fileName + '.xlsx',
                name: values.fileName + '.xlsx'
              }
            }).then((res) => {
              me.fileVisible = false
              me.fileLoading = false
              me.loading = false
              me.activeKey = 2
              // 第一次tab跳转表格未创建
              me.$nextTick(() => {
                me.$refs.tableTask.refresh()
              })
            })
          }
        })
      }
    },
    handleField () {
      this.plainOptions.forEach(item => {
        item.name = item.title
      })
      const data = this.plainOptions.map(item => {
        const { title, display, dataIndex, formType, category } = item
        return {
          name: title,
          display,
          value: dataIndex,
          formType,
          category
        }
      })
      this.$refs.columnCheck.show({
        action: 'edit',
        title: this.$t('选择字段'),
        data: data
      })
    },
    handleSort () {
      const data = this.dataSource.map(item => {
        const obj = item
        obj.name = item.title
        return obj
      })
      this.$refs.dragSort.show({
        title: this.$t('排序'),
        sortData: data
      })
    },
    getSort (data) {
      this.dataSource = data
      this.selectedRowKeys = data.map(item => item.dataIndex)
    },
    getList (data) {
      this.dataSource = []
      data.forEach(item => {
        const obj = this.plainOptions.find(plaItem => plaItem.dataIndex === item.value)
        this.dataSource.push(obj)
      })
      this.selectedRowKeys = data.map(item => item.value)
    },
    // 重置
    reset () {
      this.selectedRowKeys = this.plainOptions.map(item => item.dataIndex)
      this.dataSource = this.plainOptions.filter(item => item.display === 'v')
      this.check = false
      for (const i in this.chiose) {
        this.$set(this.chiose, i, false)
      }
    },
    // 删除模板
    Tempdelete (record) {
      const that = this
      this.$confirm({
        title: this.$t('您确认要删除该模板吗？'),
        onOk () {
          that.axios({
            url: '/admin/general/customTemplate',
            data: {
              action: 'delete',
              type: 'list_export',
              id: record.id
            }
          }).then(res => {
            that.check = false
            for (const i in that.chiose) {
              that.chiose[i] = false
            }
            that.$nextTick(() => {
              that.reset()
              that.$refs.tableTemp.refresh()
            })
            return res.result
          })
        }
      })
    },
    // 设置文件名称
    setFileName (type) {
      this.type = type
      if (type === 'template') {
        if (this.length >= 10) {
          this.exportConfig.action = 'template'
          this.$error({
            title: this.$t('同一数据窗口下最多只能保存10个导出模板')
          })
        } else {
          this.exportVisible = true
          this.exportConfig = {
            title: this.$t('请输入保存的导出模板名称'),
            action: 'template'
          }
        }
      } else {
        const that = this
        this.$confirm({
          title: this.$t('您确认要更新模板吗？'),
          onOk () {
            that.axios({
              url: '/admin/general/customTemplate',
              data: {
                templateId: that.config.templateId,
                tableId: that.config.tableId,
                type: 'list_export',
                data: {
                  fields: that.selectedRowKeys,
                  name: that.fileName
                },
                action: 'edit',
                id: that.templateid
              }
            }).then(res => {
              that.$refs.tableTemp.refresh()
              that.exportVisible = false
            })
          }
        })
      }
    },
    // 选择模板
    changTemplate (record, index) {
      this.fileName = record.name
      this.templateid = record.id
      for (const i in this.chiose) {
        this.$set(this.chiose, i, false)
      }
      this.chiose[index] = true
      this.selectedRowKeys = JSON.parse(record.setting).fields
      this.dataSource = []
      this.selectedRowKeys.forEach(item => {
        const obj = this.plainOptions.find(plaItem => plaItem.dataIndex === item)
        if (obj) {
          this.dataSource.push(obj)
        }
      })
      this.check = true
    },
    onMouseOver (record) {
      record.display = true
    },
    onMouseOut (record) {
      record.display = false
    },
    // 设置名字弹窗
    setName (type) {
      this.fileVisible = true
      this.exportConfig = {
        title: this.$t('请输入导出文件的名称'),
        action: 'file'
      }
    },
    // 模板下载
    handleDownloadWindowConfig () {
      if (this.importTemplate && this.importTemplate.modal) {
        window.open(`${this.$store.state.env.VUE_APP_API_BASE_URL}admin/api/downloadTemplate/?templateId=${this.config.templateId}`, '', '')
      } else {
        this.$message.info(this.$t('未找到导入模板，请联系系统管理员'))
      }
    }
  }
}
</script>
