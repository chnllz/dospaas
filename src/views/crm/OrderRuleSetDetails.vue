<template>
  <div>
    <div>
      <a-form :form="form">
        <a-button style="margin-bottom: 8px" icon="plus" type="primary" size="small" @click="addData">
          {{ $t('添加') }}
        </a-button>
        <div v-for="(item, index) in data" v-show="data.length !== 0" :key="index" class="card-box">
          <a-card size="small" style="flex: 1; margin-bottom: 10px" :headStyle="{ height: '10px' }">
            <a-form-item :wrapper-col="{ span: 24 }">
              <a-row type="flex" align="middle" :gutter="10">
                <a-col flex="100px" style="text-align: right">
                  <span style="font-weight: bold">{{ $t('如果') }}</span>
                </a-col>
                <a-col :span="19">
                  <a-row
                    v-for="(simpleItem, simpleIndex) in item.simpleCondition"
                    :key="simpleIndex"
                    type="flex"
                    align="middle"
                    :gutter="8"
                  >
                    <a-col flex="auto">
                      <a-select
                        v-model="simpleItem.fieldUser"
                        size="small"
                        @change="
                          (value) => {
                            if (value === 'field') {
                              simpleItem.condition = [
                                {
                                  include: '',
                                  value: ''
                                }
                              ]
                            } else if (value.includes('current')) {
                              $set(simpleItem, 'include', 'bl')
                              simpleItem.condition = [
                                {
                                  include: '',
                                  value: []
                                }
                              ]
                            }
                          }
                        "
                      >
                        <a-select-option value="field">{{ $t('字段') }}</a-select-option>
                        <a-select-option value="currentUser">{{ $t('当前用户') }}</a-select-option>
                        <a-select-option value="currentDepartment">{{ $t('当前用户所属部门') }}</a-select-option>
                        <a-select-option value="currentRole">{{ $t('当前用户所属角色') }}</a-select-option>
                        <a-select-option v-if="activeKey === 'update'" value="eventGo">
                          {{ $t('发生事件') }}
                        </a-select-option>
                        <a-select-option value="custom">{{ $t('自定义') }}</a-select-option>
                      </a-select>
                    </a-col>
                    <a-col v-if="simpleItem.fieldUser === 'custom'" :span="18">
                      <a-row type="flex" align="middle">
                        <a-col :span="24">
                          <querier-codemirror-input ref="querierCodemirrorInput" :params.sync="item.condition" />
                        </a-col>
                        <div
                          style="position: absolute; right: 15px; cursor: pointer; z-index: 10"
                          size="small"
                          @click="handleCodemirror(item, index)"
                        >
                          fx
                        </div>
                      </a-row>
                    </a-col>
                    <a-col v-if="simpleItem.fieldUser === 'eventGo'" :span="18">
                      <a-select
                        v-model="simpleItem.field"
                        size="small"
                        show-search
                        :allowClear="true"
                        option-filter-prop="children"
                      >
                        <a-select-option
                          v-for="(fieldItem, fieldIndex) in eventArr"
                          :key="fieldIndex"
                          :value="fieldItem.alias"
                        >
                          {{ fieldItem.name }}
                        </a-select-option>
                      </a-select>
                    </a-col>
                    <a-col v-if="simpleItem.fieldUser === 'field'" :span="4">
                      <a-select
                        v-if="simpleItem.fieldUser === 'field'"
                        v-model="simpleItem.field"
                        size="small"
                        show-search
                        :allowClear="true"
                        option-filter-prop="children"
                        @change="
                          (value) => {
                            simpleItem.condition = [
                              {
                                include: '',
                                value: undefined
                              }
                            ]
                            // 根据字段，给出相应条件
                            simpleItem.conditionArr = [
                              { enName: 'equal', cnName: '等于' },
                              { enName: 'ne', cnName: '不等于' },
                              { enName: 'great', cnName: '大于' },
                              { enName: 'ge', cnName: '大于等于' },
                              { enName: 'lt', cnName: '小于' },
                              { enName: 'le', cnName: '小于等于' },
                              { enName: 'contain', cnName: '包含' },
                              { enName: 'nc', cnName: '不包含' },
                              { enName: 'bw', cnName: '开始于' },
                              { enName: 'ew', cnName: '结束于' },
                              { enName: 'em', cnName: '为空' },
                              { enName: 'nem', cnName: '不为空' }
                            ]
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
                    <a-col
                      v-if="
                        simpleItem.fieldUser !== 'field' &&
                        simpleItem.fieldUser !== 'custom' &&
                        simpleItem.fieldUser !== 'eventGo'
                      "
                      :span="4"
                      style="text-align: center"
                    >
                      <a-select v-model="simpleItem.include" size="small">
                        <a-select-option value="bl">{{ $t('属于') }}</a-select-option>
                        <a-select-option value="nbl">{{ $t('不属于') }}</a-select-option>
                      </a-select>
                    </a-col>
                    <a-col
                      v-if="simpleItem.fieldUser !== 'custom' && simpleItem.fieldUser !== 'eventGo'"
                      :span="14"
                      style="border: 1px solid #e8e8e8; margin-bottom: 4px"
                    >
                      <a-row type="flex" align="middle">
                        <a-col :span="20">
                          <a-row
                            v-for="(includeItem, includeIndex) in simpleItem.condition"
                            :key="includeIndex"
                            type="flex"
                            align="middle"
                            :gutter="10"
                          >
                            <a-col v-if="simpleItem.fieldUser === 'field'" :span="6">
                              <a-select
                                v-model="includeItem.include"
                                size="small"
                                :dropdownMatchSelectWidth="false"
                                @change="
                                  (value) => {
                                    choiceInclude(value, includeItem)
                                  }
                                "
                              >
                                <a-select-option
                                  v-for="(crItem, crIndex) in simpleItem.conditionArr"
                                  :key="crIndex"
                                  option-filter-prop="children"
                                  :value="crItem.enName"
                                >
                                  {{ crItem.cnName }}
                                </a-select-option>
                              </a-select>
                            </a-col>
                            <a-col v-if="simpleItem.fieldUser === 'field'" :span="14">
                              <template v-if="!includeItem.type">
                                <!-- 日期 -->
                                <a-date-picker
                                  v-if="simpleItem.formType === 'datetime' && simpleItem.fieldType === 'DATETIME'"
                                  size="small"
                                  style="width: 100%"
                                  :defaultValue="
                                    includeItem.value ? moment(includeItem.value, 'YYYY-MM-DD HH:mm:ss') : null
                                  "
                                  format="YYYY-MM-DD HH:mm:ss"
                                  @change="
                                    (dates, dateStrings) => {
                                      includeItem.value = dateStrings
                                    }
                                  "
                                ></a-date-picker>
                                <a-date-picker
                                  v-else-if="simpleItem.formType === 'datetime' && simpleItem.fieldType === 'DATE'"
                                  size="small"
                                  style="width: 100%"
                                  :defaultValue="includeItem.value ? moment(includeItem.value, 'YYYY-MM-DD') : null"
                                  format="YYYY-MM-DD"
                                  @change="
                                    (dates, dateStrings) => {
                                      includeItem.value = dateStrings
                                    }
                                  "
                                ></a-date-picker>
                                <a-time-picker
                                  v-else-if="simpleItem.formType === 'datetime' && simpleItem.fieldType === 'TIME'"
                                  size="small"
                                  style="width: 100%"
                                  :defaultValue="includeItem.value ? moment(includeItem.value, 'HH:mm:ss') : null"
                                  format="HH:mm:ss"
                                  @change="
                                    (dates, dateStrings) => {
                                      includeItem.value = dateStrings
                                    }
                                  "
                                ></a-time-picker>
                                <!-- 树选择 -->
                                <div v-else-if="simpleItem.formType === 'treeselect'">
                                  <a-tree-select
                                    v-if="simpleItem.dataSource && simpleItem.dataSource === 'addressBook'"
                                    v-model="includeItem.value"
                                    style="width: 100%"
                                    size="small"
                                    :placeholder="$t('请选择')"
                                    :treeDefaultExpandedKeys="includeItem.value ? includeItem.value.split(',') : []"
                                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                                    :tree-data="simpleItem.option"
                                    :load-data="
                                      (data) => {
                                        return onLoadData(data, simpleItem, includeItem)
                                      }
                                    "
                                  ></a-tree-select>
                                  <a-tree-select
                                    v-else
                                    v-model="includeItem.value"
                                    style="width: 100%"
                                    size="small"
                                    :placeholder="$t('请选择')"
                                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                                    :tree-data="simpleItem.option"
                                    :load-data="
                                      (data) => {
                                        return onLoadData(data, simpleItem, includeItem)
                                      }
                                    "
                                    :treeDefaultExpandedKeys="includeItem.value ? includeItem.value.split(',') : []"
                                  ></a-tree-select>
                                </div>
                                <!-- 地址 -->
                                <div v-else-if="simpleItem.formType === 'address'">
                                  <address-select
                                    size="small"
                                    :defaultValue="includeItem.value"
                                    fieldType="field"
                                    :series="simpleItem.form.showSeries"
                                    @send="
                                      (display, val, alias, allValue) => {
                                        includeItem.value = val
                                        includeItem.allValue = allValue
                                      }
                                    "
                                  />
                                </div>
                                <!-- 标签 -->
                                <a-cascader
                                  v-else-if="simpleItem.formType === 'tag'"
                                  v-model="includeItem.value"
                                  size="small"
                                  style="width: 100%"
                                  :options="tagOption"
                                  :placeholder="$t('请选择')"
                                />
                                <a-input v-else-if="!simpleItem.src" v-model="includeItem.value" size="small" />
                                <a-select
                                  v-else-if="simpleItem.src && simpleItem.formType === 'combobox'"
                                  size="small"
                                  :placeholder="$t('请选择')"
                                  :defaultValue="includeItem.value ? includeItem.value : undefined"
                                  changeOnSelect
                                  @change="
                                    (value) => {
                                      includeItem.value = value
                                    }
                                  "
                                >
                                  <a-select-option
                                    v-for="(fieldItem, fieldKey) in simpleItem.option"
                                    :key="fieldKey"
                                    :value="fieldItem.value"
                                  >
                                    {{ fieldItem.label }}
                                  </a-select-option>
                                </a-select>
                                <!-- 级联选择 -->
                                <div v-else-if="simpleItem.formType === 'cascader'">
                                  <tabs-select
                                    :defaultValue="includeItem.value"
                                    :valueKey="simpleItem.form.src || ''"
                                    action="edit"
                                    size="small"
                                    :display="includeItem.display"
                                    :field="includeItem"
                                    :writeBack="simpleItem.form.writeBack"
                                    fieldType="search"
                                    @send="
                                      (val, alias, display, status, allValue) => {
                                        includeItem.value = val
                                        includeItem.display = display
                                        includeItem.allValue = allValue
                                      }
                                    "
                                  />
                                </div>
                                <a-select
                                  v-else
                                  :placeholder="$t('请选择')"
                                  :defaultValue="includeItem.value ? includeItem.value : []"
                                  @change="
                                    (value) => {
                                      includeItem.value = value
                                    }
                                  "
                                >
                                  <a-select-option
                                    v-for="(optItem, optIndex) in simpleItem.option"
                                    :key="optIndex"
                                    :value="optItem.value"
                                  >
                                    {{ optItem.label }}
                                  </a-select-option>
                                </a-select>
                              </template>
                              <template v-else>
                                <a-input type="text" disabled size="small" />
                              </template>
                            </a-col>
                            <a-col
                              v-else-if="simpleItem.fieldUser === 'currentUser'"
                              :span="20"
                              style="padding-right: 14px"
                            >
                              <a-row type="flex" align="middle">
                                <a-col :span="23">
                                  <a-select
                                    v-model="includeItem.value"
                                    size="small"
                                    mode="multiple"
                                    allowClear
                                    :placeholder="$t('请选择')"
                                    :showSearch="false"
                                    :open="false"
                                    changeOnSelect
                                    @change="
                                      (value) => {
                                        includeItem.value = value
                                      }
                                    "
                                  >
                                    <a-select-option
                                      v-for="(userItem, userKey) in includeItem.userArr"
                                      :key="userKey"
                                      :value="userItem.username"
                                    >
                                      {{ userItem.username }}
                                    </a-select-option>
                                  </a-select>
                                </a-col>
                                <a-col :span="1">
                                  <a-button
                                    style="margin-left: -1px"
                                    size="small"
                                    icon="user"
                                    @click="
                                      () => {
                                        recordKey.index = index
                                        recordKey.simpleIndex = simpleIndex
                                        recordKey.includeIndex = includeIndex
                                        recordKey.type = 'user'
                                        $refs.selectUserForm.show({
                                          fieldId: '',
                                          selectValue: includeItem.value,
                                          mode: 'multiple'
                                        })
                                      }
                                    "
                                  />
                                </a-col>
                              </a-row>
                            </a-col>
                            <a-col
                              v-else-if="simpleItem.fieldUser === 'currentDepartment'"
                              :span="20"
                              style="padding-right: 14px"
                            >
                              <a-row type="flex" align="middle">
                                <a-col :span="23">
                                  <a-select
                                    v-model="includeItem.value"
                                    size="small"
                                    allowClear
                                    :open="false"
                                    mode="multiple"
                                    :placeholder="$t('请选择部门')"
                                    :showSearch="false"
                                    changeOnSelect
                                    @change="
                                      (value) => {
                                        includeItem.value = value
                                      }
                                    "
                                  >
                                    <a-select-option
                                      v-for="(depItem, depKey) in includeItem.department"
                                      :key="depKey"
                                      :value="depItem.departmentId"
                                    >
                                      {{ depItem.name }}
                                    </a-select-option>
                                  </a-select>
                                </a-col>
                                <a-col :span="1">
                                  <a-button
                                    style="margin-left: -1px"
                                    size="small"
                                    icon="apartment"
                                    @click="
                                      () => {
                                        recordKey.index = index
                                        recordKey.simpleIndex = simpleIndex
                                        recordKey.includeIndex = includeIndex
                                        recordKey.type = 'department'
                                        $refs.selectDepartment.show({
                                          optionCustom: [],
                                          option: includeItem.department || [],
                                          optionType: 'department',
                                          selectValue: includeItem.value,
                                          mode: 'multiple',
                                          index: index
                                        })
                                      }
                                    "
                                  />
                                </a-col>
                              </a-row>
                            </a-col>
                            <a-col
                              v-else-if="simpleItem.fieldUser === 'currentRole'"
                              :span="20"
                              style="padding-right: 14px"
                            >
                              <a-row type="flex" align="middle">
                                <a-col :span="23">
                                  <a-select
                                    v-model="includeItem.value"
                                    allowClear
                                    :open="false"
                                    size="small"
                                    :placeholder="$t('请选择角色')"
                                    mode="multiple"
                                    changeOnSelect
                                    @change="
                                      (value) => {
                                        includeItem.value = value
                                      }
                                    "
                                  >
                                    <a-select-option
                                      v-for="(value, key) in includeItem.role"
                                      :key="key"
                                      :value="value.roleId"
                                    >
                                      {{ value.name }}
                                    </a-select-option>
                                  </a-select>
                                </a-col>
                                <a-col :span="1">
                                  <a-button
                                    style="margin-left: -1px"
                                    size="small"
                                    icon="team"
                                    @click="
                                      () => {
                                        recordKey.index = index
                                        recordKey.simpleIndex = simpleIndex
                                        recordKey.includeIndex = includeIndex
                                        recordKey.type = 'role'
                                        $refs.selectDepartment.show({
                                          optionCustom: [],
                                          option: includeItem.role || [],
                                          optionType: 'role',
                                          selectValue: includeItem.value,
                                          mode: 'multiple',
                                          index: index,
                                          url: '/admin/role/getRoleData'
                                        })
                                      }
                                    "
                                  />
                                </a-col>
                              </a-row>
                            </a-col>
                            <a-col flex="70px" style="display: flex; align-items: center">
                              <a-icon
                                :style="{ fontSize: '24px', color: '#52c41a' }"
                                type="plus-square"
                                theme="filled"
                                @click="
                                  simpleItem.fieldUser === 'field'
                                    ? simpleItem.condition.splice(includeIndex + 1, 0, {
                                        include: '',
                                        value: undefined
                                      })
                                    : simpleItem.condition.splice(includeIndex + 1, 0, { include: '', value: [] })
                                "
                              />
                              <a-icon
                                :style="{
                                  fontSize: '24px',
                                  color: simpleItem.condition.length === 1 ? '#bfbfbf' : '#ff4d4f',
                                  'padding-left': '8px'
                                }"
                                type="minus-square"
                                theme="filled"
                                @click="deleteCondition(index, simpleIndex, includeIndex)"
                              />
                            </a-col>
                          </a-row>
                        </a-col>
                        <a-col :span="4">
                          <a-select v-model="simpleItem.logic" style="width: 100%" size="small">
                            <a-select-option value="and">{{ $t('且(and)') }}</a-select-option>
                            <a-select-option value="or">{{ $t('或(or)') }}</a-select-option>
                          </a-select>
                        </a-col>
                      </a-row>
                    </a-col>
                    <a-col
                      flex="80px"
                      style="display: flex; align-items: center; justify-content: center; padding-right: 0px"
                    >
                      <a-icon
                        :style="{ fontSize: '24px', color: '#52c41a' }"
                        type="plus-square"
                        theme="filled"
                        @click="
                          item.simpleCondition.splice(simpleIndex + 1, 0, {
                            fieldUser: 'field',
                            selectUser: '',
                            src: '',
                            condition: [
                              {
                                include: '',
                                value: ''
                              }
                            ],
                            logic: 'and'
                          })
                        "
                      />
                      <a-icon
                        :style="{
                          fontSize: '24px',
                          color: item.simpleCondition.length === 1 ? '#bfbfbf' : '#ff4d4f',
                          'padding-left': '8px'
                        }"
                        type="minus-square"
                        theme="filled"
                        @click="
                          item.simpleCondition.length === 1 ? '' : data[index].simpleCondition.splice(simpleIndex, 1)
                        "
                      />
                    </a-col>
                  </a-row>
                </a-col>
                <a-col flex="80px">
                  <a-select v-model="item.logic" style="width: 100%" size="small">
                    <a-select-option value="and">{{ $t('且(and)') }}</a-select-option>
                    <a-select-option value="or">{{ $t('或(or)') }}</a-select-option>
                  </a-select>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item v-for="(eventItem, key) in item.event" :key="key" :wrapper-col="{ span: 24 }">
              <a-row type="flex" align="middle" :gutter="10">
                <a-col flex="100px" style="text-align: right">
                  <span v-if="key === 0" style="font-weight: bold">{{ $t('那么, 执行动作') }}</span>
                </a-col>
                <a-col :span="4">
                  <a-select
                    v-model="eventItem.field"
                    size="small"
                    show-search
                    optionFilterProp="children"
                    :allowClear="true"
                    :placeholder="$t('请选择字段')"
                    @change="
                      (val) => {
                        choiceField(index, key, 'so', val)
                      }
                    "
                  >
                    <a-select-option
                      v-for="(fieldItem, fieldIndex) in fieldColumns"
                      :key="fieldIndex"
                      :value="fieldItem.alias"
                    >
                      {{ fieldItem.name }}
                    </a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="4">
                  <a-input v-model="eventItem.changeValue" size="small" />
                </a-col>
                <a-col flex="70px" style="display: flex; align-items: center; justify-content: center">
                  <a-icon
                    :style="{ fontSize: '24px', color: '#52c41a' }"
                    type="plus-square"
                    theme="filled"
                    @click="item.event.splice(key + 1, 0, { field: '', status: '', mandatory: '' })"
                  />
                  <a-icon
                    :style="{
                      fontSize: '24px',
                      color: item.event.length === 1 ? '#bfbfbf' : '#ff4d4f',
                      'padding-left': '8px'
                    }"
                    type="minus-square"
                    theme="filled"
                    @click="deleteEvent(index, key)"
                  />
                </a-col>
              </a-row>
            </a-form-item>
          </a-card>
          <a-icon
            :style="{ fontSize: '24px', color: '#52c41a', 'padding-left': '10px' }"
            type="plus-square"
            theme="filled"
            @click="addData(index, 'true')"
          />
          <a-icon
            :style="{ fontSize: '24px', color: '#ff4d4f', 'padding-left': '10px' }"
            type="minus-square"
            theme="filled"
            @click="handleDelete(index)"
          />
        </div>
        <div v-show="data.length === 0">
          <a-empty />
        </div>
      </a-form>
      <QuerierCodemirror ref="querierCodemirror" :params.sync="data" />
    </div>
    <select-user-form ref="selectUserForm" @ok="getUser" />
    <select-department ref="selectDepartment" @ok="getDepartment" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  i18n: window.lang('crm'),
  components: {
    Condition: () => import('@/views/admin/Table/Condition'),
    Codemirror: () => import('@/views/admin/Formula/Codemirror'),
    QuerierCodemirror: () => import('@/views/admin/Table/QuerierCodemirror'),
    QuerierCodemirrorInput: () => import('@/views/admin/Table/QuerierCodemirrorInput'),
    CustomCodemirror: () => import('@/views/admin/Flow/modules/CustomCodemirror'),
    TabsSelect: () => import('@/views/admin/Field/TabsSelect'),
    AddressSelect: () => import('@/views/admin/Field/AddressSelect'),
    SelectUserForm: () => import('@/views/admin/General/SelectUserForm'),
    SelectDepartment: () => import('@/views/admin/General/SelectDepartment')
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    fieldArr: {
      type: Array,
      default: () => []
    },
    fieldColumns: {
      type: Array,
      default: () => []
    },
    activeKey: {
      type: String,
      default: () => ''
    },
    eventArr: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    getUser (data, index, conIndex, modeCheck) {
      this.orderRule[this.recordKey.simpleIndex].condition[this.recordKey.includeIndex]['userArr'] = data.map(item => { const obj = { username: item, text: item }; return obj })
      this.orderRule[this.recordKey.simpleIndex].condition[this.recordKey.includeIndex]['value'] = data
    },
    getDepartment (data, index, conIndex, option) {
      if (this.recordKey.type === 'role') {
        this.orderRule[this.recordKey.simpleIndex].condition[this.recordKey.includeIndex]['role'] = option
        this.orderRule[this.recordKey.simpleIndex].condition[this.recordKey.includeIndex]['value'] = data
      } else {
        this.orderRule[this.recordKey.simpleIndex].condition[this.recordKey.includeIndex]['department'] = option
        this.orderRule[this.recordKey.simpleIndex].condition[this.recordKey.includeIndex]['value'] = data
      }
    },
    // 选择字段
    choiceField (index, key, template, val) {
      if (template === 'so') {
        var arr = this.data[index]
        arr.event[key].field = val
        arr.event[key].formType = this.fieldColumns.find(item => item.alias === val).formType
        this.data.splice(index, 1, arr)
        this.data.forEach((item, index) => {
          item.event.forEach(myItem => {
            this.fieldColumns.filter((fieldItem, fieldIndex) => {
              if (fieldItem.alias === myItem.field) {
                myItem.name = fieldItem.name
              }
            })
          })
        })
      } else {
        var obj = this.data[index].simpleCondition[key]
        obj.selectUser = val
      }
    },
    // 选择关系
    choiceInclude (value, includeItem) {
      includeItem.value = undefined
      if (value === 'em' || value === 'nem') {
        includeItem.type = 'empty'
      } else {
        includeItem.type = undefined
      }
    },
    addData (index, type) {
      var arr = {
        ruleModel: '0',
        logic: 'and',
        condition: {
          html: '',
          value: ''
        },
        simpleCondition: [{
          fieldUser: 'field',
          selectUser: '',
          src: '',
          condition: [{
            include: '',
            value: ''
          }],
          logic: 'and'
        }],
        event: [{
          field: '',
          status: '',
          mandatory: ''
        }]
      }
      if (type) {
        this.data.splice(index + 1, 0, arr)
      } else {
        this.data.push(arr)
      }
    },
    deleteCondition (index, simpleIndex, includeIndex) {
      if (this.data[index].simpleCondition[simpleIndex].condition.length === 1) {
        return false
      } else {
        this.data[index].simpleCondition[simpleIndex].condition.splice(includeIndex, 1)
        this.data = JSON.parse(JSON.stringify(this.data))
      }
    },
    deleteSimpleCondition (index, simpleIndex) {
      this.data[index].simpleCondition.splice(simpleIndex, 1)
      this.data = JSON.parse(JSON.stringify(this.data))
    },
    deleteEvent (index, key) {
      if (this.data[index].event.length === 1) {
        return false
      } else {
        var arr = this.data[index]
        arr.event.splice(key, 1)
        this.data.splice(index, 1, arr)
      }
    },
    handleDelete (index) {
      this.data.splice(index, 1)
    },
    // 显示公式编辑器
    handleCodemirror (item, index) {
      this.$refs.querierCodemirror.show({
        title: this.$t('公式编辑器'),
        item: item,
        index: index,
        tableId: this.tableId
      })
    }
  }
}
</script>
<style lang="less" scoped>
.card-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
