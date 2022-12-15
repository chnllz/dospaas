<template>
  <div style="margin-bottom: 35px">
    <a-form :form="form">
      <div class="table-operator">
        <a-button icon="plus" type="primary" size="small" @click="addData">{{ $t('添加') }}</a-button>
        <a-button size="small" @click="handleSort">{{ $t('排序') }}</a-button>
      </div>
      <a-collapse v-model="activeKey">
        <a-collapse-panel v-for="(item, index) in data" :key="String(item.id)">
          <div slot="header" class="line">
            <span v-if="index === 0">if</span>
            <span v-else>else if</span>
            <a-input
              v-model="item.name"
              style="width: 240px"
              :maxLength="20"
              class="margin-left-12"
              size="small"
              @click.stop=""
            />
          </div>
          <div class="line">
            <span>当满足以下</span>
            <a-select v-model="item.logic" style="width: 100px; margin: 0 12px">
              <a-select-option value="all">所有</a-select-option>
              <a-select-option value="any">任一</a-select-option>
            </a-select>
            <span>条件时</span>
            <a class="margin-left-12" href="javascript: void(0)" @click="addSimpleCondition(item, index)">添加条件</a>
          </div>
          <a-form-item :wrapper-col="{ span: 24 }">
            <a-row
              v-for="(simpleItem, simpleIndex) in item.simpleCondition"
              :key="simpleItem.id"
              type="flex"
              align="middle"
              :gutter="8"
            >
              <a-col :span="1">
                <span style="font-weight: bold">{{ $t('条件') }}</span>
              </a-col>
              <a-col flex="auto">
                <a-select
                  v-model="simpleItem.fieldUser"
                  :disabled="item.conditionType === 'else'"
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
                  <a-select-option value="currentDepartment">
                    {{ $t('当前用户所属部门') }}
                  </a-select-option>
                  <a-select-option value="currentRole">
                    {{ $t('当前用户所属角色') }}
                  </a-select-option>
                  <a-select-option value="notSet">{{ $t('无条件满足') }}</a-select-option>
                </a-select>
              </a-col>
              <a-col v-if="simpleItem.fieldUser === 'notSet'" :span="18"></a-col>
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
                      simpleItem.field = value
                      simpleItem = getSimpleItem(simpleItem)
                      item.simpleCondition.splice(simpleIndex, 1, simpleItem)
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
                v-if="simpleItem.fieldUser !== 'field' && simpleItem.fieldUser !== 'notSet'"
                :span="4"
                style="text-align: center"
              >
                <a-select v-model="simpleItem.include" size="small">
                  <a-select-option value="bl">{{ $t('属于') }}</a-select-option>
                  <a-select-option value="nbl">{{ $t('不属于') }}</a-select-option>
                </a-select>
              </a-col>
              <a-col
                v-if="simpleItem.fieldUser !== 'notSet'"
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
                        <a-select v-model="includeItem.include" size="small" :dropdownMatchSelectWidth="false">
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
                            :defaultValue="includeItem.value ? moment(includeItem.value, 'YYYY-MM-DD HH:mm:ss') : null"
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
                            <data-picker
                              ref="dataPicker"
                              :name="'treeselect' + index + simpleIndex + includeIndex"
                              size="small"
                              :parentId="
                                simpleItem.dataSource === 'addressBook' ? 'parentNumber' : 'parentDictDataNumber'
                              "
                              :parameter="
                                simpleItem.dataSource === 'addressBook'
                                  ? {}
                                  : { dictCategoryNumber: simpleItem.src, filterDisabled: true }
                              "
                              displayType="tree"
                              :url="
                                simpleItem.dataSource === 'addressBook'
                                  ? '/admin/address/getAddressChildren'
                                  : '/admin/dict/initData'
                              "
                              :searchUrl="
                                simpleItem.dataSource === 'addressBook'
                                  ? '/admin/search/addressSearch'
                                  : '/admin/search/dictSearch'
                              "
                              :scope="scope"
                              :value="includeItem.option"
                              :optionsConversion="
                                (list, displayType, searchType) =>
                                  optionsConversionTreeselect(simpleItem, list, displayType, searchType)
                              "
                              @select="
                                (data, options) => {
                                  includeItem.value = data
                                  includeItem.optionCustom = options
                                }
                              "
                            />
                          </div>
                          <!-- 地址 -->
                          <div v-else-if="simpleItem.formType === 'address'">
                            <address-select
                              size="small"
                              fieldType="field"
                              :option="includeItem.option"
                              :series="simpleItem.form.showSeries"
                              @send="
                                (display, val, alias, allValue) => {
                                  includeItem.value = val
                                  includeItem.allValue = allValue
                                  includeItem.optionCustom = [
                                    {
                                      fullName: display,
                                      number: val
                                    }
                                  ]
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
                          <a-select
                            v-else-if="
                              (simpleItem.formType === 'combobox' ||
                                simpleItem.formType === 'radio' ||
                                simpleItem.formType === 'checkbox') &&
                              simpleItem.option &&
                              simpleItem.option.length
                            "
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
                          <template v-else-if="simpleItem.formType === 'organization'">
                            <template v-if="simpleItem.form.optionType === 'user'">
                              <data-picker
                                :placeholder="$t('请选择用户')"
                                :name="'user' + simpleItem.field + index + simpleIndex + includeIndex"
                                displayType="list"
                                size="small"
                                url="/admin/search/userSearch"
                                searchUrl="/admin/search/userSearch"
                                :value="includeItem.optionArr"
                                :scope="scope"
                                :parameter="{ sortField: 'username' }"
                                :optionsConversion="
                                  (list, displayType, searchType) => {
                                    return list.map((item) => {
                                      const obj = item
                                      obj.key = item.username
                                      obj.label = `${item.username}(${item.realName})`
                                      return obj
                                    })
                                  }
                                "
                                @select="
                                  (data, options) => {
                                    includeItem.value = data
                                    $set(includeItem, 'options', options)
                                  }
                                "
                              />
                            </template>
                            <template v-else-if="simpleItem.form.optionType === 'department'">
                              <data-picker
                                :placeholder="$t('请选择部门')"
                                :name="'department' + simpleItem.field + index + simpleIndex + includeIndex"
                                parentId="parentDepartmentId"
                                displayType="tree"
                                size="small"
                                url="/admin/department/init"
                                searchUrl="/admin/search/departmentSearch"
                                :value="includeItem.optionArr"
                                :scope="scope"
                                :optionsConversion="
                                  (list, displayType, searchType) => {
                                    if (searchType) {
                                      return list.map((item) => {
                                        const obj = item
                                        obj.key = item.departmentId
                                        obj.label = item.fullDepartmentName
                                        return obj
                                      })
                                    } else {
                                      return list.map((item) => {
                                        const obj = item
                                        obj.key = item.departmentId
                                        obj.label = item.departmentName
                                        return obj
                                      })
                                    }
                                  }
                                "
                                @select="
                                  (data, options) => {
                                    includeItem.value = data
                                    $set(includeItem, 'options', options)
                                  }
                                "
                              />
                            </template>
                            <template v-else-if="simpleItem.form.optionType === 'role'">
                              <data-picker
                                :placeholder="$t('请选择角色')"
                                :name="'role' + simpleItem.field + index + simpleIndex + includeIndex"
                                displayType="list"
                                size="small"
                                url="/admin/search/roleSearch"
                                searchUrl="/admin/search/roleSearch"
                                :value="includeItem.optionArr"
                                :scope="scope"
                                :optionsConversion="
                                  (list, displayType, searchType) => {
                                    return list.map((item) => {
                                      const obj = item
                                      obj.key = item.roleId
                                      obj.label = item.roleName
                                      return obj
                                    })
                                  }
                                "
                                @select="
                                  (data, options) => {
                                    includeItem.value = data
                                    $set(includeItem, 'options', options)
                                  }
                                "
                              />
                            </template>
                          </template>
                          <a-input v-else-if="!simpleItem.src" v-model="includeItem.value" size="small" />
                          <a-select
                            v-else-if="
                              simpleItem.src &&
                              (simpleItem.formType === 'combobox' ||
                                simpleItem.formType === 'radio' ||
                                simpleItem.formType === 'checkbox')
                            "
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
                              :valueKey="simpleItem.form.src || ''"
                              action="edit"
                              size="small"
                              :value="includeItem.option"
                              :field="includeItem"
                              :writeBack="simpleItem.form.writeBack"
                              fieldType="search"
                              @send="
                                (val, alias, display, status, allValue) => {
                                  includeItem.value = val
                                  includeItem.display = display
                                  includeItem.allValue = allValue
                                  includeItem.optionCustom = [
                                    {
                                      fullDictDataName: display,
                                      dictDataNumber: val
                                    }
                                  ]
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
                      <a-col v-else-if="simpleItem.fieldUser === 'currentUser'" :span="20" style="padding-right: 14px">
                        <data-picker
                          :placeholder="$t('请选择用户')"
                          :name="'user' + index + simpleIndex + includeIndex"
                          displayType="list"
                          size="small"
                          :multiple="true"
                          url="/admin/search/userSearch"
                          searchUrl="/admin/search/userSearch"
                          :value="includeItem.optionArr"
                          :scope="scope"
                          :parameter="{ sortField: 'username' }"
                          :optionsConversion="
                            (list, displayType, searchType) => {
                              return list.map((item) => {
                                const obj = item
                                obj.key = item.username
                                obj.label = `${item.username}(${item.realName})`
                                return obj
                              })
                            }
                          "
                          @select="
                            (data, options) => {
                              includeItem.value = data
                              $set(includeItem, 'options', options)
                            }
                          "
                        />
                      </a-col>
                      <a-col
                        v-else-if="simpleItem.fieldUser === 'currentDepartment'"
                        :span="20"
                        style="padding-right: 14px"
                      >
                        <data-picker
                          :placeholder="$t('请选择部门')"
                          :name="'department' + index + simpleIndex + includeIndex"
                          parentId="parentDepartmentId"
                          displayType="tree"
                          size="small"
                          :multiple="true"
                          url="/admin/department/init"
                          searchUrl="/admin/search/departmentSearch"
                          :value="includeItem.optionArr"
                          :scope="scope"
                          :optionsConversion="
                            (list, displayType, searchType) => {
                              if (searchType) {
                                return list.map((item) => {
                                  const obj = item
                                  obj.key = item.departmentId
                                  obj.label = item.fullDepartmentName
                                  return obj
                                })
                              } else {
                                return list.map((item) => {
                                  const obj = item
                                  obj.key = item.departmentId
                                  obj.label = item.departmentName
                                  return obj
                                })
                              }
                            }
                          "
                          @select="
                            (data, options) => {
                              includeItem.value = data
                              $set(includeItem, 'options', options)
                            }
                          "
                        />
                      </a-col>
                      <a-col v-else-if="simpleItem.fieldUser === 'currentRole'" :span="20" style="padding-right: 14px">
                        <data-picker
                          :placeholder="$t('请选择角色')"
                          :name="'role' + index + simpleIndex + includeIndex"
                          displayType="list"
                          size="small"
                          :multiple="true"
                          url="/admin/search/roleSearch"
                          searchUrl="/admin/search/roleSearch"
                          :value="includeItem.optionArr"
                          :scope="scope"
                          :optionsConversion="
                            (list, displayType, searchType) => {
                              return list.map((item) => {
                                const obj = item
                                obj.key = item.roleId
                                obj.label = item.roleName
                                return obj
                              })
                            }
                          "
                          @select="
                            (data, options) => {
                              includeItem.value = data
                              $set(includeItem, 'options', options)
                            }
                          "
                        />
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 24 }">
            <div class="line">
              <span>执行以下动作</span>
              <a-select v-model="item.event.remarkUpdate" style="width: 240px; margin: 0 12px">
                <a-select-option value="append">备注回写（追加）</a-select-option>
                <a-select-option value="cover">备注回写（覆盖）</a-select-option>
              </a-select>
              <a-select
                v-model="item.event.field"
                size="small"
                show-search
                :allowClear="true"
                option-filter-prop="children"
                placeholder="请选择回写的字段"
                style="width: 240px"
              >
                <a-select-option
                  v-for="(fieldItem, fieldIndex) in textareaFields"
                  :key="fieldIndex"
                  :value="fieldItem.alias"
                >
                  {{ fieldItem.name }}
                </a-select-option>
              </a-select>
            </div>
          </a-form-item>
        </a-collapse-panel>
      </a-collapse>
    </a-form>
    <drag-sort ref="dragSort" @ok="getSort" />
  </div>
</template>
<script>
export default {
  name: 'WorkflowOpreationRule',
  i18n: window.lang('admin'),
  components: {
    AddressSelect: () => import('@/views/admin/Field/AddressSelect'),
    TabsSelect: () => import('@/views/admin/Field/TabsSelect'),
    DragSort: () => import('@/views/admin/Common/DragSort')
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    tableFields: {
      type: Array,
      default: () => []
    },
    sceneRule: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 4 },
      tableId: '',
      form: this.$form.createForm(this),
      afterLoading: {},
      beforeSubmit: {},
      tagOption: [],
      activeKey: [],
      data: [],
      department: [],
      role: [],
      userArr: [],
      fieldArr: [], // 所有字段的所有信息,用来获取数据字典
      fieldObject: {},
      textareaFields: [],
      scope: this
    }
  },
  mounted () {
    this.show()
  },
  methods: {
    show () {
      this.data = JSON.parse(JSON.stringify(this.sceneRule))
      if (this.data.length === 0) {
        this.data = [{
          id: new Date().valueOf(),
          name: '备注回写场景1',
          logic: 'all', // all 所有条件， any任意一个条件
          simpleCondition: [{
            id: 'condition' + new Date().valueOf(),
            fieldUser: 'field',
            selectUser: '',
            src: '',
            condition: [{
              include: '',
              value: ''
            }]
          }],
          event: {
            remarkUpdate: 'append',
            field: '',
            mandatory: ''
          }
        }]
      }
      this.fieldArr = this.tableFields.filter(item => {
        this.fieldObject[item.alias] = item
        return ['text', 'textarea', 'radio', 'switch', 'checkbox', 'combobox', 'number',
          'datetime', 'cascader', 'associated', 'address', 'treeselect', 'serialnumber', 'tag', 'score', 'organization'].indexOf(item.formType) !== -1
      })
      this.textareaFields = this.tableFields.filter(item => {
        return item.formType === 'textarea'
      })
      console.log('textareaFields', this.textareaFields)
      this.data.forEach((item, index) => {
        if (!item.name) {
          item.name = '备注回写场景' + (index + 1)
        }
        item.id = item.id || new Date().valueOf() + index
        this.activeKey.push(item.id)
        item.simpleCondition.forEach(simpleItem => {
          if (simpleItem.fieldUser === 'tag' && this.tagOption.length === 0) {
            const rnumber = simpleItem.settings.form.tagSetting.rnumber
            this.getTagOption(rnumber)
          }
          simpleItem.condition.forEach(item2 => {
            if (item2.options) {
              item2.optionArr = item2.options
            }
          })
          simpleItem = this.getSimpleItem(simpleItem)
        })
        const eventItem = item.event
        const field = this.tableFields.find(item => item.alias === eventItem.field) || {}
        eventItem.formType = field.formType
        if (['radio', 'checkbox', 'combobox', 'cascader', 'treeselect'].includes(field.formType)) {
          eventItem.isHaveOption = true
          let fieldSetting = {}
          fieldSetting = JSON.parse(field.setting)
          eventItem.fieldSetting = fieldSetting
          if (['radio', 'checkbox', 'combobox'].includes(field.formType)) {
            eventItem.dictType = 'plane'
            this.getOptions(eventItem)
          } else {
            eventItem.dictType = 'tree'
          }
        } else {
          eventItem.isHaveOption = false
        }
      })
    },
    getSimpleItem (item) {
      const simpleItem = JSON.parse(JSON.stringify(item))
      const fieldItem = this.fieldObject[simpleItem.field]
      if (fieldItem) {
        fieldItem.settings = JSON.parse(fieldItem.setting)
        simpleItem.form = fieldItem.settings.form
        simpleItem.src = fieldItem.settings.form.src ? fieldItem.settings.form.src : ''
        simpleItem.formType = fieldItem.formType
        simpleItem.fieldId = fieldItem.fieldId
        if (fieldItem.formType === 'treeselect') {
          simpleItem.dataSource = fieldItem.settings.attribute.dataSource
          simpleItem.condition.forEach(condItem => {
            condItem.option = condItem.optionCustom || []
          })
        } else if (['address', 'cascader'].includes(fieldItem.formType)) {
          simpleItem.condition.forEach(condItem => {
            condItem.option = condItem.optionCustom || []
          })
        } else if ((fieldItem.formType === 'combobox' || fieldItem.formType === 'radio' || fieldItem.formType === 'checkbox') && fieldItem.settings.form.customDataList && fieldItem.settings.form.customDataList.length) {
          simpleItem.option = fieldItem.settings.form.customDataList.map(customItem => {
            const obj = {
              label: customItem.value,
              value: customItem.value
            }
            return obj
          })
        } else if (simpleItem.src) {
          this.getOption(simpleItem)
        } else {
          simpleItem.option = []
        }
        const conditionArr = [{ enName: 'equal', cnName: this.$t('等于') },
        { enName: 'ne', cnName: this.$t('不等于') },
        { enName: 'contain', cnName: this.$t('包含') },
        { enName: 'nc', cnName: this.$t('不包含') },
        { enName: 'bw', cnName: this.$t('开始于') },
        { enName: 'ew', cnName: this.$t('结束于') },
        { enName: 'em', cnName: this.$t('为空') },
        { enName: 'nem', cnName: this.$t('不为空') },
        { enName: 'great', cnName: this.$t('大于') },
        { enName: 'ge', cnName: this.$t('大于等于') },
        { enName: 'lt', cnName: this.$t('小于') },
        { enName: 'le', cnName: this.$t('小于等于') }]
        // 根据字段，给出相应条件
        if (['text', 'textarea', 'serialnumber'].indexOf(fieldItem.formType) !== -1) {
          simpleItem.conditionArr = conditionArr.filter(im => ['equal', 'ne', 'contain', 'nc', 'bw', 'ew', 'em', 'nem'].includes(im.enName))
        } else if (['radio', 'switch', 'combobox', 'score'].indexOf(fieldItem.formType) !== -1) {
          simpleItem.conditionArr = conditionArr.filter(im => ['equal', 'ne', 'em', 'nem'].includes(im.enName))
        } else if (['number', 'datetime'].indexOf(fieldItem.formType) !== -1) {
          simpleItem.conditionArr = conditionArr.filter(im => ['equal', 'ne', 'great', 'ge', 'lt', 'le', 'em', 'nem'].includes(im.enName))
        } else if (['address', 'treeselect', 'tag', 'organization'].indexOf(fieldItem.formType) !== -1) {
          simpleItem.conditionArr = conditionArr.filter(im => ['contain', 'nc', 'em', 'nem'].includes(im.enName))
        } else if (['cascader', 'checkbox'].indexOf(fieldItem.formType) !== -1) {
          simpleItem.conditionArr = conditionArr.filter(im => ['equal', 'ne', 'contain', 'nc', 'em', 'nem'].includes(im.enName))
        }
      }
      return simpleItem
    },
    getOptions (eventItem) {
      this.axios({
        url: '/admin/dict/initData',
        data: {
          dictCategoryNumber: eventItem.fieldSetting.form.src
        }
      }).then(res => {
        if (res.code === 0) {
          this.$set(eventItem, 'option', res.result)
        }
      })
    },
    // 添加条件
    addSimpleCondition (item, index) {
      item.simpleCondition.push({
        fieldUser: 'field',
        selectUser: '',
        src: '',
        condition: [
          {
            include: '',
            value: ''
          }
        ]
      })
      this.data.splice(index, 1, item)
    },
    // 选择字段
    choiceField (index, key, template, val) {
      if (template === 'so') {
        var arr = this.data[index]
        arr.event[key].field = val
        const field = this.tableFields.find(item => item.alias === val) || {}
        arr.event[key].formType = field.formType
        if (['radio', 'checkbox', 'combobox', 'cascader', 'treeselect'].includes(field.formType)) {
          arr.event[key].isHaveOption = true
          let fieldSetting = {}
          fieldSetting = JSON.parse(field.setting)
          arr.event[key].fieldSetting = fieldSetting
          if (['radio', 'checkbox', 'combobox'].includes(field.formType)) {
            arr.event[key].dictType = 'plane'
            this.axios({
              url: '/admin/dict/initData',
              data: {
                dictCategoryNumber: fieldSetting.form.src
              }
            }).then(res => {
              if (res.code === 0) {
                arr.event[key].option = res.result
              }
            })
          } else {
            arr.event[key].dictType = 'tree'
          }
        } else {
          arr.event[key].isHaveOption = false
        }
        this.data.splice(index, 1, arr)
        this.data.forEach((item, index) => {
          item.event.forEach(myItem => {
            this.tableFields.filter((fieldItem, fieldIndex) => {
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
    // 排序
    handleSort () {
      this.$refs.dragSort.show({
        title: this.$t('排序'),
        sortData: this.data
      })
    },
    getSort (data) {
      this.data = JSON.parse(JSON.stringify(data))
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
    deleteEvent (index, key) {
      if (this.data[index].event.length === 1) {
        return false
      } else {
        var arr = this.data[index]
        arr.event.splice(key, 1)
        this.data.splice(index, 1, arr)
      }
    },
    addData (index, type) {
      const arr = {
        id: new Date().valueOf(),
        name: '备注回写场景' + (this.data.length + 1),
        logic: 'all', // all 所有条件， any任意一个条件
        simpleCondition: [{
          id: 'condition' + new Date().valueOf(),
          fieldUser: 'field',
          selectUser: '',
          src: '',
          condition: [{
            include: '',
            value: ''
          }]
        }],
        event: {
          field: '',
          status: '',
          mandatory: ''
        }
      }
      this.data.push(arr)
      this.activeKey.push(arr.id)
    },
    handleDelete (index) {
      this.data.splice(index, 1)
    },
    // 提交数据
    handleSubmit () {
      let afterInit = this.$refs.afterLoadingEditor.getValue()
      let afterInitRemoveSpace = afterInit.replace(/ +/g, '')
      afterInitRemoveSpace = afterInitRemoveSpace.replace(/[\r\n]/g, '')
      afterInit = afterInitRemoveSpace ? afterInit : ''

      let beforeSubmit = this.$refs.beforeSubmitEditor.getValue()
      let beforeSubmitRemoveSpace = beforeSubmit.replace(/ +/g, '')
      beforeSubmitRemoveSpace = beforeSubmitRemoveSpace.replace(/[\r\n]/g, '')
      beforeSubmit = beforeSubmitRemoveSpace ? beforeSubmit : ''
      this.visible = false
    },
    // 组织结构options转换
    optionsConversionTreeselect (record, list, displayType, searchType) {
      if (record.dataSource === 'addressBook') {
        if (searchType) {
          return list.map(item => {
            const obj = item
            obj.key = item.number
            obj.label = item.fullName
            return obj
          })
        } else {
          return list.map(item => {
            const obj = item
            obj.key = item.number
            obj.label = item.name
            return obj
          })
        }
      } else {
        if (searchType) {
          return list.map(item => {
            const obj = item
            obj.key = item.dictDataNumber
            obj.label = item.fullName
            return obj
          })
        } else {
          return list.map(item => {
            const obj = item
            obj.key = item.dictDataNumber
            obj.label = item.dictDataName
            return obj
          })
        }
      }
    },
    // 显示公式编辑器
    handleCodemirror (item, index) {
      this.$refs.querierCodemirror.show({
        title: this.$t('公式编辑器'),
        item: item,
        index: index,
        tableId: this.tableId
      })
    },
    getOption (item) {
      this.axios({
        url: '/admin/search/dictSearch',
        data: { dictCategoryNumber: item.src }
      }).then(res => {
        this.$set(item, 'option', res.result)
      })
    },
    onLoadData (treeNode, item, includeItem) {
      const { value } = treeNode.dataRef
      if (item.dataSource === 'addressBook') {
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
            data: { fieldId: item.fieldId, value: includeItem.value }
          }).then(res => {
            this.$set(item, 'option', res.result.option)
          })
          resolve()
        })
      }
    },
    getTreeOption (simpleItem, item) {
      this.axios({
        url: '/admin/general/getFieldForm',
        data: { fieldId: item.fieldId, value: simpleItem.value }
      }).then(res => {
        this.$set(simpleItem, 'option', res.result.option)
      })
    },
    // 关闭抽屉
    onClose () {
      this.visible = false
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

.line {
  display: flex;
  align-items: center;
}

.margin-left-12 {
  margin-left: 12px;
}
</style>
