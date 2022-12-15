<template>
  <div>
    <a-drawer :visible="visible" :width="1200" :destroyOnClose="true" @close="visible = !visible">
      <template slot="title">
        <a-row>
          <a-col :span="20">{{ config.title }}</a-col>
          <a-col :span="4" style="text-align: right">
            <HelpPanel
              :number="helpNumber"
              :styleStr="'font-size: 16px;margin-right: 26px;color: rgba(0, 0, 0, 0.65);'"
            ></HelpPanel>
          </a-col>
        </a-row>
      </template>
      <a-spin :spinning="loading">
        <a-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-row>
            <a-col :span="12">
              <a-form-item :label="$t('Label名称')">
                <a-input
                  v-decorator="[
                    'info[name]',
                    { initialValue: data.name, rules: [{ required: true, message: $t('请输入Label名称') }] }
                  ]"
                >
                  <set-lang slot="addonAfter" />
                </a-input>
              </a-form-item>
              <a-form-item :label="$t('列宽')">
                <a-input-number
                  v-decorator="[
                    'info[column]',
                    { initialValue: data.column || 6, rules: [{ required: true, message: $t('请输入列宽') }] }
                  ]"
                  :min="1"
                  :max="24"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item :label="$t('展现形式')">
                <a-radio-group
                  v-decorator="[
                    'info[displayStyle]',
                    {
                      initialValue: data.displayStyle || '0',
                      rules: [{ required: true, message: $t('请选择搜索区默认状态') }]
                    }
                  ]"
                >
                  <a-radio value="0">{{ $t('下拉框') }}</a-radio>
                  <a-radio value="1">{{ $t('按钮组单选') }}</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item :label="$t('授权')">
                <a @click="handleFieldPriv(data)">
                  <a-badge :status="data.usePermissions && data.usePermissions.length ? 'success' : 'default'" />
                  {{ $t('设置') }}
                </a>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item :label="$t('帮助说明')" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
            <a-textarea
              v-decorator="['info[help]', { initialValue: data.help }]"
              :auto-size="{ minRows: 1, maxRows: 5 }"
            />
          </a-form-item>
          <a-divider orientation="left">{{ $t('条件设置') }}</a-divider>
          <a-row :gutter="16">
            <a-col :span="8">
              <a-table
                ref="table"
                rowKey="id"
                :columns="columns"
                :dataSource="searchTemplateGroups"
                size="small"
                :pagination="false"
              >
                <div slot="title">
                  <a-space>
                    <a-button type="primary" @click="handleAdd()">{{ $t('添加') }}</a-button>
                    <a-button @click="handleSort()">{{ $t('排序') }}</a-button>
                  </a-space>
                </div>
                <div slot="action" slot-scope="text, record, index">
                  <a @click="handleEdit(record, index)">{{ record.status ? $t('保存') : $t('编辑') }}</a>
                  <a-divider type="vertical" />
                  <a @click="handleDelete(index)">{{ $t('删除') }}</a>
                </div>
                <div slot="name" slot-scope="text, record">
                  <a-input v-if="record.status" v-model="record.name">
                    <set-lang slot="addonAfter" />
                  </a-input>
                  <a v-else @click="setCondition(record)">{{ record.name }}</a>
                </div>
                <div slot="badge" slot-scope="text, record">
                  <a-checkbox v-model="record.badge"></a-checkbox>
                </div>
              </a-table>
            </a-col>
            <a-col v-if="selectRecord.data" :span="16">
              <a-form-item>
                {{ $t('条件名称') }}
                <a-input :value="selectRecord.name" :disabled="true" style="width: 200px; padding-left: 10px"></a-input>
              </a-form-item>
              <a-form-item>
                {{ $t('以下条件组合方式：') }}
                <a-select v-model="selectRecord.data.logic" style="width: 100px; padding-left: 10px" size="small">
                  <a-select-option value="and">{{ $t('且(and)') }}</a-select-option>
                  <a-select-option value="or">{{ $t('或(or)') }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-row
                v-for="(item, index) in selectRecord.data.searchConditions"
                :key="index"
                type="flex"
                align="middle"
                :gutter="8"
              >
                <a-col :span="4">
                  <a-select
                    style="width: 100%"
                    show-search
                    :placeholder="$t('请选择字段')"
                    :value="item.alias"
                    option-filter-prop="children"
                    @change="
                      (value) => {
                        choiceField(value, item)
                      }
                    "
                  >
                    <a-select-option
                      v-for="(fieldItem, fieldIndex) in fieldArr"
                      :key="fieldIndex"
                      :value="fieldItem.alias"
                    >
                      {{ fieldItem.name }}
                    </a-select-option>
                  </a-select>
                </a-col>
                <a-col flex="auto">
                  <a-row
                    v-for="(conItem, conIndex) in item.searchCondition"
                    :key="conIndex"
                    type="flex"
                    align="middle"
                    :gutter="8"
                  >
                    <a-col :span="5">
                      <a-select
                        v-model="conItem.include"
                        @change="
                          (value) => {
                            choiceInclude(value, conItem)
                          }
                        "
                      >
                        <a-select-option
                          v-for="(includeItem, includeIndex) in item.condiArr"
                          :key="includeIndex"
                          :value="includeItem.enName"
                        >
                          {{ includeItem.cnName }}
                        </a-select-option>
                      </a-select>
                    </a-col>
                    <a-col flex="auto">
                      <template v-if="!conItem.type">
                        <a-input
                          v-if="
                            item.formType === 'text' ||
                            item.formType === 'textarea' ||
                            item.formType === 'associated' ||
                            item.formType === 'serialnumber'
                          "
                          v-model="conItem.value"
                        />
                        <a-input-number
                          v-else-if="item.formType === 'number' && item.optionValue.length === 0"
                          v-model="conItem.value"
                          style="width: 100%"
                        />
                        <!-- 日期 -->
                        <a-date-picker
                          v-else-if="item.formType === 'datetime' && item.fieldType === 'DATETIME'"
                          style="width: 100%"
                          :defaultValue="conItem.value ? moment(conItem.value, 'YYYY-MM-DD HH:mm:ss') : null"
                          :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
                          format="YYYY-MM-DD HH:mm:ss"
                          @change="
                            (dates, dateStrings) => {
                              conItem.value = dateStrings
                            }
                          "
                        ></a-date-picker>
                        <a-date-picker
                          v-else-if="item.formType === 'datetime' && item.fieldType === 'DATE'"
                          style="width: 100%"
                          :defaultValue="conItem.value ? moment(conItem.value, 'YYYY-MM-DD') : null"
                          format="YYYY-MM-DD"
                          @change="
                            (dates, dateStrings) => {
                              conItem.value = dateStrings
                            }
                          "
                        ></a-date-picker>
                        <a-time-picker
                          v-else-if="item.formType === 'datetime' && item.fieldType === 'TIME'"
                          style="width: 100%"
                          :defaultValue="conItem.value ? moment(conItem.value, 'HH:mm:ss') : null"
                          format="HH:mm:ss"
                          @change="
                            (dates, dateStrings) => {
                              conItem.value = dateStrings
                            }
                          "
                        ></a-time-picker>
                        <!-- 开关 -->
                        <a-select v-else-if="item.formType === 'switch'" v-model="conItem.value">
                          <a-select-option :value="1">{{ item.word[0] }}</a-select-option>
                          <a-select-option :value="0">{{ item.word[1] }}</a-select-option>
                        </a-select>
                        <!-- 树选择 -->
                        <div v-else-if="item.formType === 'treeselect'">
                          <a-tree-select
                            v-if="item.dataSource && item.dataSource === 'addressBook'"
                            v-model="conItem.value"
                            style="width: 100%"
                            :placeholder="$t('请选择')"
                            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                            :tree-data="item.option"
                            :load-data="
                              (data) => {
                                return onLoadData(data, item)
                              }
                            "
                          ></a-tree-select>
                          <a-tree-select
                            v-else
                            v-model="conItem.value"
                            style="width: 100%"
                            :placeholder="$t('请选择')"
                            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                            :tree-data="item.option"
                          ></a-tree-select>
                        </div>
                        <!-- 地址 -->
                        <div v-else-if="item.formType === 'address'">
                          <address-select
                            :defaultValue="conItem.value"
                            fieldType="search"
                            :series="item.settings && item.settings.form ? item.settings.form.showSeries : ''"
                            :display="conItem.value"
                            @send="
                              (display, val) => {
                                conItem.value = val
                              }
                            "
                          />
                        </div>
                        <div v-else-if="item.formType === 'organization'">
                          <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 1px">
                            <a-select
                              v-if="item.settings && item.settings.form.optionType === 'user'"
                              v-model="conItem.value"
                              show-search
                              allowClear
                              :default-active-first-option="false"
                              :not-found-content="null"
                              option-filter-prop="children"
                              :show-arrow="false"
                              :filter-option="false"
                              style="flex: 1"
                              :mode="item.settings ? item.settings.attribute.mode : 'default'"
                            >
                              <a-select-option
                                v-for="(item1, index1) in item.optionValue"
                                :key="index1"
                                :value="item1.label"
                              >
                                {{ item1.label }}
                              </a-select-option>
                            </a-select>
                            <a-select
                              v-else
                              v-model="conItem.value"
                              show-search
                              allowClear
                              option-filter-prop="children"
                              :show-arrow="false"
                              style="flex: 1"
                              :mode="item.settings ? item.settings.attribute.mode : 'default'"
                            >
                              <template v-if="item.settings && item.settings.form.optionType === 'department'">
                                <a-select-option
                                  v-for="(item1, index1) in item.optionValue"
                                  :key="index1"
                                  :value="item1.departmentId"
                                >
                                  {{ item1.name }}
                                </a-select-option>
                              </template>
                              <template v-else>
                                <a-select-option
                                  v-for="(item1, index1) in item.optionValue"
                                  :key="index1"
                                  :value="item1.roleId"
                                >
                                  {{ item1.roleName }}
                                </a-select-option>
                              </template>
                            </a-select>
                            <a-button
                              v-if="item.settings && item.settings.form.optionType === 'user'"
                              icon="user"
                              style="margin-left: -1px"
                              @click="handleSelectUserForm(item, index, conIndex)"
                            ></a-button>
                            <a-button
                              v-else-if="item.settings && item.settings.form.optionType === 'department'"
                              icon="apartment"
                              style="margin-left: -1px"
                              @click="handleSelect(item, index, conIndex)"
                            ></a-button>
                            <a-button
                              v-else
                              icon="user"
                              style="margin-left: -1px"
                              @click="handleSelect(item, index, conIndex)"
                            ></a-button>
                          </div>
                        </div>
                        <!-- 标签 -->
                        <a-cascader
                          v-else-if="item.formType === 'tag'"
                          v-model="conItem.value"
                          style="width: 100%"
                          :options="tagOption"
                          :placeholder="$t('请选择')"
                        />
                        <a-select
                          v-else-if="item.formType !== 'cascader' && item.optionValue && item.optionValue.length"
                          v-model="conItem.value"
                          show-search
                          option-filter-prop="children"
                        >
                          <a-select-option
                            v-for="(optionItem, optionIndex) in item.optionValue"
                            :key="optionIndex"
                            :value="optionItem.value"
                          >
                            {{ optionItem.label }}
                          </a-select-option>
                        </a-select>
                        <!-- 级联选择 -->
                        <div v-else-if="item.formType === 'cascader'">
                          <tabs-select
                            :defaultValue="conItem.value"
                            :valueKey="item.settings ? item.settings.form.src : item.src || ''"
                            action="edit"
                            :display="conItem.display"
                            :field="conItem"
                            :writeBack="item.settings ? item.settings.form.writeBack : []"
                            fieldType="search"
                            @send="
                              (val, alias, display) => {
                                conItem.value = val
                                conItem.display = display
                              }
                            "
                          />
                        </div>
                        <div v-else>
                          <a-input v-model="conItem.value" />
                        </div>
                      </template>
                      <template v-else>
                        <a-input type="text" disabled />
                      </template>
                    </a-col>
                    <a-col flex="65px" style="display: flex; align-items: center">
                      <a-icon
                        :style="{ fontSize: '24px', color: '#52c41a' }"
                        type="plus-square"
                        theme="filled"
                        @click="handlePlus(item, conIndex)"
                      />
                      <a-icon
                        :style="{
                          fontSize: '24px',
                          color: item.searchCondition.length === 1 ? '#bfbfbf' : '#ff4d4f',
                          'padding-left': '8px'
                        }"
                        type="minus-square"
                        theme="filled"
                        @click="item.searchCondition.length === 1 ? '' : handleSub(item, conIndex)"
                      />
                    </a-col>
                  </a-row>
                </a-col>
                <a-col flex="100px">
                  <a-select v-model="item.logic">
                    <a-select-option value="and">{{ $t('且(and)') }}</a-select-option>
                    <a-select-option value="or">{{ $t('或(or)') }}</a-select-option>
                  </a-select>
                </a-col>
                <a-col flex="70px" style="display: flex; align-items: center">
                  <a-icon
                    :style="{ fontSize: '24px', color: '#52c41a' }"
                    type="plus-square"
                    theme="filled"
                    @click="handleDataPlus(selectRecord.data.searchConditions, index)"
                  />
                  <a-icon
                    :style="{
                      fontSize: '24px',
                      color: selectRecord.data.searchConditions.length === 1 ? '#bfbfbf' : '#ff4d4f',
                      'padding-left': '8px'
                    }"
                    type="minus-square"
                    theme="filled"
                    @click="
                      selectRecord.data.searchConditions.length === 1
                        ? ''
                        : handleDataSub(selectRecord.data.searchConditions, index)
                    "
                  />
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-form>
        <div class="bbar">
          <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
          <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
        </div>
      </a-spin>
      <!-- 访问权限 -->
      <priv-visit-form ref="privVisitForm" :params="{ formView: data }" @func="getPriv" />
      <drag-sort ref="dragSort" @ok="getSort" />
      <select-user-form ref="selectUserForm" @ok="handleSelectUserData" />
      <select-department ref="selectDepartment" @ok="handleSelectUserData" />
    </a-drawer>
  </div>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
    DragSort: () => import('@/views/admin/Common/DragSort'),
    PrivVisitForm: () => import('./PrivVisitForm'),
    AddressSelect: () => import('@/views/admin/Field/AddressSelect'),
    TabsSelect: () => import('@/views/admin/Field/TabsSelect'),
    SelectUserForm: () => import('@/views/admin/General/SelectUserForm'),
    SelectDepartment: () => import('@/views/admin/General/SelectDepartment'),
    SetLang: () => import('@/components/SetLang'),
    HelpPanel: () => import('@/views/admin/HelpPanel')
  },
  data () {
    return {
      visible: false,
      loading: false,
      config: {},
      data: {},
      form: this.$form.createForm(this),
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 100,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: '#',
        width: 40,
        customRender: (text, record, index) => {
          return index + 1
        }
      }, {
        title: this.$t('条件名称'),
        dataIndex: 'name',
        scopedSlots: { customRender: 'name' }
      }, {
        title: this.$t('角标'),
        dataIndex: 'badge',
        scopedSlots: { customRender: 'badge' }
      }],
      searchTemplateGroups: [],
      selectRecord: {},
      // 初始化搜索条件
      initData: {
        name: '',
        logic: 'or',
        searchConditions: [{
          alias: '',
          logic: 'or',
          formType: 'text',
          optionValue: [],
          condiArr: [
            { enName: 'eq', cnName: this.$t('等于') },
            { enName: 'ne', cnName: this.$t('不等于') }],
          searchCondition: [{
            include: '',
            value: ''
          }]
        }]
      },
      // 当前表可搜索字段
      fieldArr: [],
      fields: {},
      condiObj: {},
      helpNumber: ''
    }
  },
  methods: {
    show (config) {
      this.config = config
      if (config.action === 'edit') {
        this.helpNumber = '221124112759975'
      } else {
        this.helpNumber = '221124112722200'
      }
      this.data = this.config.record || {}
      this.visible = true
      this.searchTemplateGroups = this.data.searchTemplateGroups || []
      this.selectRecord = {}
      this.condiObj.text = this.condiObj.textarea = this.condiObj.associated = [
        { enName: 'eq', cnName: this.$t('等于') },
        { enName: 'ne', cnName: this.$t('不等于') },
        { enName: 'cn', cnName: this.$t('包含') },
        { enName: 'nc', cnName: this.$t('不包含') },
        { enName: 'bw', cnName: this.$t('开始于') },
        { enName: 'ew', cnName: this.$t('结束于') },
        { enName: 'em', cnName: this.$t('为空') },
        { enName: 'nem', cnName: this.$t('不为空') }]
      this.condiObj.number = this.condiObj.datetime = this.condiObj.serialnumber = [
        { enName: 'eq', cnName: this.$t('等于') },
        { enName: 'ne', cnName: this.$t('不等于') },
        { enName: 'gt', cnName: this.$t('大于') },
        { enName: 'ge', cnName: this.$t('大于等于') },
        { enName: 'lt', cnName: this.$t('小于') },
        { enName: 'le', cnName: this.$t('小于等于') },
        { enName: 'em', cnName: this.$t('为空') },
        { enName: 'nem', cnName: this.$t('不为空') }]
      const arr = ['radio']
      arr.forEach(item => {
        this.condiObj[item] = [
          { enName: 'eq', cnName: this.$t('等于') },
          { enName: 'ne', cnName: this.$t('不等于') },
          { enName: 'em', cnName: this.$t('为空') },
          { enName: 'nem', cnName: this.$t('不为空') }]
      })
      this.condiObj.switch = [
        { enName: 'eq', cnName: this.$t('等于') },
        { enName: 'ne', cnName: this.$t('不等于') }
      ]
      const arr2 = ['cascader', 'address', 'organization', 'combobox', 'checkbox', 'treeselect', 'tag']
      arr2.forEach(item => {
        this.condiObj[item] = [
          { enName: 'cn', cnName: '包含' },
          { enName: 'nc', cnName: '不包含' },
          { enName: 'em', cnName: '为空' },
          { enName: 'nem', cnName: '不为空' }]
      })
      this.axios({
        url: '/admin/field/init',
        data: {
          pageNo: 1,
          pageSize: 1000,
          sortField: 'id',
          sortOrder: 'ascend',
          tableId: config.tableId
        }
      }).then(res => {
        res.result.data.forEach(item => {
          this.fields[item.alias] = item
        })
        this.fieldArr = res.result.data.filter(item => {
          return ['text', 'textarea', 'radio', 'switch', 'checkbox', 'combobox', 'number', 'datetime', 'cascader', 'organization', 'associated', 'switch', 'address', 'treeselect', 'serialnumber', 'tag'].indexOf(item.formType) !== -1
        })
      })
    },
    handleFieldPriv (data) {
      this.$refs.privVisitForm.show({
        action: 'edit',
        title: this.$t('授权'),
        record: data,
        key: 'usePermissions',
        selectType: 'radio',
        privArr: {
          visit: this.$t('可访问')
        },
        defaultpriv: 'visit'
      })
    },
    handleAdd () {
      this.searchTemplateGroups.push({
        status: true,
        id: new Date().valueOf()
      })
    },
    handleEdit (record) {
      if (!record.name) {
        this.$message.warning(this.$t('请输入条件名称'))
        return
      }
      this.$set(record, 'status', !record.status)
    },
    handleDelete (index) {
      this.searchTemplateGroups.splice(index, 1)
    },
    handleSort () {
      this.$refs.dragSort.show({
        title: this.$t('排序'),
        sortData: this.searchTemplateGroups
      })
    },
    getSort (data) {
      this.searchTemplateGroups = data
    },
    getPriv (permissions) {
      this.data.usePermissions = permissions
      this.$forceUpdate()
    },
    setCondition (record) {
      this.selectRecord = {}
      this.selectRecord = record
      if (!this.selectRecord.data) {
        this.$set(this.selectRecord, 'data', JSON.parse(JSON.stringify(this.initData)))
      } else {
        this.handleInit(this.selectRecord.data.searchConditions)
      }
    },
    // 初始化函数
    handleInit (searchConditions) {
      searchConditions.forEach(item1 => {
        if (item1.alias) {
          item1.formType = this.fields[item1.alias].formType
          console.log('🚀 ~ file: TplviewDataQuerierSearchTemplate.vue ~ line 625 ~ handleInit ~ this.fields[item1.alias]', this.fields[item1.alias])
          item1.settings = JSON.parse(this.fields[item1.alias].setting)
          if (['radio', 'switch', 'checkbox', 'combobox'].indexOf(item1.formType) !== -1) {
            if (item1.settings.attribute.dataSource === 'custom') {
              item1.optionValue = item1.settings.form.customDataList.map(item => {
                const obj = {
                  value: item.value,
                  label: item.value
                }
                return obj
              })
            } else {
              this.getOption(item1)
            }
          } else if (item1.formType === 'organization') {
            const option = item1.settings.form.optionCustom
            let label, value
            if (item1.settings.form.optionType === 'user') {
              label = 'text'
              value = 'username'
            } else if (item1.settings.form.optionType === 'role') {
              label = 'roleName'
              value = 'roleId'
            } else {
              label = 'name'
              value = 'departmentId'
            }
            item1.optionValue = option.map(item => {
              const obj = {}
              obj.label = item[label]
              obj.value = item[value]
              return obj
            }) || []
          }
          item1.condiArr = this.condiObj[item1.formType]
          item1.fieldType = this.fields[item1.alias].fieldType
        } else {
          item1.optionValue = []
        }
      })
    },
    // 选择字段
    choiceField (value, item) {
      const field = this.fields[value]
      item.formType = field.formType
      item.alias = field.alias
      item.fieldType = field.fieldType
      item.settings = JSON.parse(field.setting)
      const formType = field.formType
      item.condiArr = this.condiObj[formType]
      // 根据字段，给出相应条件
      if (['text', 'textarea', 'associated', 'address'].indexOf(formType) !== -1) {
        item.optionValue = ''
      } else if (item.formType === 'tag' && this.tagOption.length === 0) {
        this.getTagOption(item.settings.form.tagSetting.rnumber)
      } else if (['radio', 'switch', 'checkbox', 'combobox', 'organization'].indexOf(formType) !== -1) {
        if (formType !== 'organization') {
          if (item.settings.attribute.dataSource === 'custom') {
            item.optionValue = item.settings.form.customDataList.map(item => {
              const obj = {
                value: item.value,
                label: item.value
              }
              return obj
            })
          } else {
            if (item.settings.attribute.dataSource === 'dictionary') {
              this.getOption(item)
            }
          }
        } else {
          const option = item.settings.form.optionCustom
          let label, value
          if (item.settings.form.optionType === 'user') {
            label = 'text'
            value = 'username'
          } else if (item.settings.form.optionType === 'role') {
            label = 'roleName'
            value = 'roleId'
          } else {
            label = 'name'
            value = 'departmentId'
          }
          item.optionValue = option.map(item => {
            const obj = {}
            obj.label = item[label]
            obj.value = item[value]
            return obj
          })
        }
      } else if (['number', 'datetime'].indexOf(formType) !== -1) {
        item.optionValue = ''
      } else if (['cascader'].indexOf(formType) !== -1) {
        item.src = item.settings.form.src
      } else if (formType === 'switch') {
        item.word = []
        item.word[0] = item.settings.form.word.value[1]
        item.word[1] = item.settings.form.word.value[0]
      } else if (formType === 'treeselect') {
        this.getTreeOption(item)
      }
      item.searchCondition = [{
        include: '',
        value: undefined
      }]
    },
    getOption (item) {
      this.axios({
        url: '/admin/search/dictSearch',
        data: { dictCategoryNumber: item.settings.form.src }
      }).then(res => {
        this.$set(item, 'optionValue', res.result)
      })
    },
    // 打开选择用户界面
    handleSelectUserForm (item, index, conIndex) {
      this.$nextTick(() => {
        this.$refs.selectUserForm.show({
          selectValue: item.searchCondition[conIndex].value,
          mode: item.settings.attribute.mode,
          index: index,
          conIndex: conIndex
        })
      })
    },
    // 打开选择部门，角色窗口
    handleSelect (item, index, conIndex) {
      this.$nextTick(() => {
        this.$refs.selectDepartment.show({
          optionCustom: item.field.setting.form.optionCustom,
          optionType: item.field.setting.form.optionType,
          selectValue: item.searchCondition[conIndex].value,
          mode: item.field.setting.attribute.mode,
          index: index,
          url: item.field.setting.form.optionType === 'department' ? '/admin/department/getDepartmentData' : '/admin/role/getRoleData',
          conIndex: conIndex
        })
      })
    },
    // 选择部门，角色
    handleSelectUserData (selectValue, index, conIndex) {
      this.selectRecord.data.searchConditions[index].searchCondition[conIndex].value = selectValue
    },
    getTagOption (rnumber) {
      this.axios({
        url: '/admin/tag/tagOption',
        data: { tagCategoryNumber: rnumber }
      }).then(res => {
        this.tagOption = res.result.option.map(item => {
          const obj = item
          if (!item.children.length) {
            item.disabled = true
          }
          return obj
        })
      })
    },
    onLoadData (treeNode, item) {
      const { value } = treeNode.dataRef
      if (item.settings.attribute.dataSource === 'addressBook') {
        return new Promise((resolve) => {
          this.axios({
            url: '/admin/address/getAddressChildren',
            data: { parentNumber: value }
          }).then(res => {
            item.option.forEach(item => {
              if (item.value === value && !item.children) {
                const arr = []
                res.result.forEach(arrItem => {
                  const obj = { label: arrItem.name, value: arrItem.number }
                  arr.push(obj)
                })
                this.$set(item, 'children', arr)
              } else if (item.children) {
                item.children.forEach(childItem => {
                  if (childItem.value === value && !childItem.children) {
                    const arr = []
                    res.result.forEach(arrItem => {
                      const obj = { label: arrItem.name, value: arrItem.number }
                      arr.push(obj)
                    })
                    this.$set(childItem, 'children', arr)
                  } else if (childItem.children) {
                    childItem.children.forEach(childrenItem => {
                      if (childrenItem.value === value && !childrenItem.children) {
                        const arr = []
                        res.result.forEach(arrItem => {
                          const obj = { label: arrItem.name, value: arrItem.number, isLeaf: true }
                          arr.push(obj)
                        })
                        this.$set(childrenItem, 'children', arr)
                      }
                    })
                  }
                })
              }
            })
          })
          resolve()
        })
      } else {
        return new Promise((resolve) => {
          this.axios({
            url: '/admin/general/getFieldForm',
            data: { fieldId: this.fields[item.alias].fieldId, value: value }
          }).then(res => {
            this.$set(item, 'option', res.result.option)
          })
          resolve()
        })
      }
    },
    getTreeOption (item) {
      this.axios({
        url: '/admin/general/getFieldForm',
        data: { fieldId: this.fields[item.alias].fieldId, value: item.value }
      }).then(res => {
        this.$set(item, 'option', res.result.option)
      })
    },
    // 选择关系
    choiceInclude (value, conItem) {
      if (value === 'em' || value === 'nem') {
        conItem.type = 'empty'
      } else {
        conItem.type = undefined
      }
    },
    // 增加
    handlePlus (item, conIndex) {
      item.searchCondition.splice(conIndex + 1, 0, {
        include: '',
        value: ''
      })
    },
    handleSub (item, conIndex) {
      item.searchCondition.splice(conIndex, 1)
    },
    handleDataPlus (searchConditions, index) {
      searchConditions.splice(index + 1, 0, {
        alias: '',
        logic: 'or',
        formType: 'text',
        optionValue: [],
        condiArr: [
          { enName: 'eq', cnName: this.$t('等于') },
          { enName: 'ne', cnName: this.$t('不等于') }],
        searchCondition: [{
          include: '',
          value: ''
        }]
      })
    },
    handleDataSub (searchConditions, index) {
      searchConditions.splice(index, 1)
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          values.info.type = 'searchTemplate'
          values.info.searchTemplateGroups = this.searchTemplateGroups || []
          values.info.usePermissions = this.data.usePermissions
          values.info.id = this.config.action === 'add' ? new Date().valueOf() : this.data.id
          if (values.info.searchTemplateGroups.some(item => !item.data || item.data && !item.data.searchConditions)) {
            this.$message.warning('请点击表格中的“条件名称”，完善条件设置后再保存')
            return
          }
          values.info.searchTemplateGroups.forEach(item => {
            item.data.searchConditions.forEach(dataItem => {
              dataItem.condiArr = dataItem.settings = undefined
            })
          })
          this.$emit('ok', values.info)
          this.visible = false
        }
      })
    }
  }
}
</script>
