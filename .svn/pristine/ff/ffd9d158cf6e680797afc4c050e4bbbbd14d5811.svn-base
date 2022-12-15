<template>
  <div style="height: 100%">
    <a-layout style="height: 100%">
      <a-layout-sider
        v-if="interactiveType === 'tree'"
        v-model="collapsed"
        width="208px"
        :collapsedWidth="22"
        :collapsible="true"
        :trigger="null"
        :style="{ background: 'white', borderRight: !collapsed ? '1px solid #e5e5e5' : 'none' }"
      >
        <a-card size="small" :bordered="false" :bodyStyle="{ padding: '6px' }">
          <div style="display: flex; align-items: center">
            <a-select
              v-show="!collapsed"
              slot="title"
              showSearch
              :value="undefined"
              mode="multiple"
              style="width: 100%; margin-right: 8px"
              :placeholder="$t('请输入关键字进行搜索')"
              :filter-option="false"
              :dropdownMatchSelectWidth="false"
              :showArrow="false"
              :not-found-content="fetching ? undefined : null"
              @search="searchTabs"
              @popupScroll="popupScroll"
              @change="
                (e) => {
                  if (!e) {
                    interactiveSearchData = []
                  }
                }
              "
            >
              <a-spin v-if="fetching" slot="notFoundContent" size="small" />
              <a-select-option
                v-for="search in interactiveSearchData"
                :key="search.id"
                @click="interactiveSelect([search.dictDataNumber])"
              >
                {{ search.fullDictDataName }}
              </a-select-option>
            </a-select>
            <a-icon
              style="font-size: 16px"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="collapsed = !collapsed"
            />
          </div>
          <a-tree
            v-show="!collapsed"
            style="height: calc(100vh - 165px); overflow: hidden; overflow-y: auto"
            :replaceFields="{ title: 'dictDataName', key: 'dictDataNumber' }"
            :load-data="onLoadInteractiveData"
            :tree-data="interactiveData"
            :defaultExpandedKeys="[0]"
            @select="interactiveSelect"
          />
        </a-card>
      </a-layout-sider>
      <a-layout-content
        :style="{ background: 'white', display: 'flex', 'flex-direction': 'column' }"
        style="height: 100%"
      >
        <a-spin :spinning="spinning" style="height: 100%">
          <div class="page">
            <a-form
              v-show="cardTemplate.length === 0 && loading && template.length > 0"
              :form="form"
              :colon="false"
              class="search"
            >
              <a-card size="small" :title="$t('搜索')">
                <a-space slot="extra" style="margin-left: 8px">
                  <a-button
                    v-if="searchSection.combinationShow === '0'"
                    htmlType="submit"
                    type="primary"
                    @click="handleSearch({ tag: true })"
                  >
                    {{ $t('搜索') }}
                  </a-button>
                  <a-dropdown-button v-else htmlType="submit" class="dropdown" @click="handleSearch({ tag: true })">
                    <span>{{ $t('搜索') }}</span>
                    <a-menu slot="overlay">
                      <a-menu-item :key="2" @click="showSearch">{{ $t('组合搜索') }}</a-menu-item>
                      <template v-for="(item, index) in condiList">
                        <a-menu-item :key="index + 3" @click="handleHighSearchMenu(item)">
                          {{ item.name }}
                        </a-menu-item>
                      </template>
                    </a-menu>
                  </a-dropdown-button>
                  <a-button @click="resetAll">{{ $t('重置') }}</a-button>
                  <a-button
                    :icon="advancedSearch ? 'up' : 'down'"
                    style="font-size: 11px"
                    @click="advancedSearch = !advancedSearch"
                  />
                </a-space>
                <a-row
                  id="search-row"
                  :gutter="16"
                  class="form"
                  :class="advancedSearch ? 'advanced' : 'normal'"
                  :style="{
                    height: advancedSearch
                      ? 'auto'
                      : (() => {
                          if (initMount) {
                            $nextTick(() => {
                              return defaultRowsHeight()
                            })
                          } else {
                            return defaultRowsHeight()
                          }
                        })()
                  }"
                >
                  <!-- 下面是动态生成区域，要根据不同的组件进行相应展示 -->
                  <a-col
                    v-for="(item, index) in template.filter(
                      (item) => (item.type === 'field' && item.field) || item.type !== 'field'
                    )"
                    v-show="item.fieldRule !== 'hidden'"
                    :key="index"
                    class="search-col"
                    v-bind="{ span: item.column }"
                  >
                    <a-form-item
                      v-if="item.field"
                      :validate-status="item.formType === 'number' ? 'success' : ''"
                      :labelCol="searchSection.labelLocation !== 'top' ? labelCol : {}"
                      :wrapperCol="searchSection.labelLocation !== 'top' ? wrapperCol : {}"
                    >
                      <span slot="label">
                        <span :title="item.changeTitle ? item.changeTitle : item.name">
                          {{ item.changeTitle ? $t(item.changeTitle) : $t(item.name) }}
                        </span>
                        <a-tooltip v-if="item.help" placement="top">
                          <template slot="title">
                            <span>{{ item.help }}</span>
                          </template>
                          <a-icon style="padding-left: 4px" type="question-circle" />
                        </a-tooltip>
                      </span>
                      <!-- 单行文本 多行文本 -->
                      <a-input
                        v-if="['text', 'textarea', 'associated', 'serialnumber'].includes(item.formType)"
                        v-decorator="[
                          item.field.alias,
                          {
                            rules: [
                              {
                                required: false,
                                message: item.name + $t('不能为空')
                              }
                            ]
                          }
                        ]"
                        :disabled="item.fieldRule !== 'allow'"
                        :placeholder="item.placeholder || $t('请输入')"
                      />
                      <!-- 日期 -->
                      <a-range-picker
                        v-else-if="item.formType === 'datetime' && item.field.fieldType === 'DATETIME'"
                        v-decorator="[
                          item.field.alias,
                          {
                            rules: [
                              {
                                required: false,
                                message: item.name + $t('不能为空')
                              }
                            ]
                          }
                        ]"
                        :disabled="item.fieldRule !== 'allow'"
                        :showTime="{ defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')] }"
                        style="width: 100%"
                        format="YYYY-MM-DD HH:mm:ss"
                        @change="
                          (time, timeString) => {
                            timeObj[item.field.alias] = timeString && timeString[0] ? timeString : undefined
                          }
                        "
                      ></a-range-picker>
                      <a-range-picker
                        v-else-if="item.formType === 'datetime' && item.field.fieldType === 'DATE'"
                        v-decorator="[
                          item.field.alias,
                          {
                            rules: [
                              {
                                required: false,
                                message: item.name + $t('不能为空')
                              }
                            ]
                          }
                        ]"
                        :disabled="item.fieldRule !== 'allow'"
                        style="width: 100%"
                        format="YYYY-MM-DD"
                        @change="
                          (time, timeString) => {
                            timeObj[item.field.alias] = timeString && timeString[0] ? timeString : undefined
                          }
                        "
                      ></a-range-picker>
                      <a-row
                        v-else-if="item.formType === 'datetime' && item.field.fieldType == 'TIME'"
                        type="flex"
                        align="middle"
                      >
                        <a-col flex="1">
                          <a-time-picker
                            v-decorator="[
                              item.field.alias + '[0]',
                              {
                                rules: [
                                  {
                                    required: false,
                                    message: item.name + $t('不能为空')
                                  }
                                ]
                              }
                            ]"
                            showTime
                            style="width: 100%"
                            :disabled="item.fieldRule !== 'allow'"
                            format="HH:mm:ss"
                            @change="
                              (time, timeString) => {
                                item.timeStart = timeString
                                timeObj[item.field.alias] = [item.timeStart, item.timeEnd]
                              }
                            "
                          ></a-time-picker>
                        </a-col>
                        <a-col flex="20px" style="text-align: center">~</a-col>
                        <a-col flex="1">
                          <a-time-picker
                            v-decorator="[
                              item.field.alias + '[1]',
                              {
                                rules: [
                                  {
                                    required: false,
                                    message: item.name + $t('不能为空')
                                  }
                                ]
                              }
                            ]"
                            showTime
                            style="width: 100%"
                            :disabled="item.fieldRule !== 'allow'"
                            format="HH:mm:ss"
                            @change="
                              (time, timeString) => {
                                item.timeEnd = timeString
                                timeObj[item.field.alias] = [item.timeStart, item.timeEnd]
                              }
                            "
                          ></a-time-picker>
                        </a-col>
                      </a-row>
                      <!-- 下拉框、单选框、复选框 -->
                      <a-select
                        v-else-if="['combobox', 'radio', 'checkbox'].includes(item.field.formType)"
                        v-decorator="[
                          item.field.alias,
                          {
                            rules: [
                              {
                                required: false,
                                message: item.name + $t('不能为空')
                              }
                            ]
                          }
                        ]"
                        :disabled="item.fieldRule !== 'allow'"
                        mode="multiple"
                        :placeholder="item.placeholder || $t('请选择')"
                        :allowClear="true"
                        show-search
                        :show-arrow="
                          item.field.setting.attribute.dataSource !== 'otherTable' &&
                          item.field.setting.form.loadMode !== 'dynamic' &&
                          item.fieldRule !== 'readonly'
                        "
                        option-filter-prop="children"
                        @search="
                          (value) => {
                            getOption(item, value)
                          }
                        "
                      >
                        <a-select-option
                          v-for="(myitem, myindex) in item.field.option"
                          :key="myindex"
                          :value="myitem.value"
                        >
                          {{ $t(myitem.label) }}
                        </a-select-option>
                      </a-select>
                      <a-select
                        v-else-if="['score'].includes(item.field.formType)"
                        v-decorator="[
                          item.field.alias,
                          {
                            rules: [
                              {
                                required: false,
                                message: item.name + $t('不能为空')
                              }
                            ]
                          }
                        ]"
                        :disabled="item.fieldRule !== 'allow'"
                        mode="multiple"
                        :placeholder="item.placeholder || $t('请选择')"
                        :allowClear="true"
                        show-search
                        option-filter-prop="children"
                      >
                        <a-select-option v-for="myitem in item.field.option" :key="myitem.value">
                          {{ $t(myitem.label) }}
                        </a-select-option>
                      </a-select>
                      <!-- 数字 -->
                      <a-input-group v-else-if="item.formType === 'number'" compact style="margin-bottom: 0px">
                        <a-input-number
                          v-decorator="[item.field.alias + '.left']"
                          style="width: calc(50% - 15px)"
                          :disabled="item.fieldRule !== 'allow'"
                        />
                        <a-input
                          placeholder="~"
                          disabled
                          style="width: 32px; pointer-events: none; backgroundcolor: #fff"
                        />
                        <a-input-number
                          v-decorator="[item.field.alias + '.right']"
                          style="width: calc(50% - 15px)"
                          :disabled="item.fieldRule !== 'allow'"
                        />
                      </a-input-group>
                      <!-- 标签 -->
                      <div v-else-if="item.field.formType === 'tag'">
                        <tag-data-picker
                          ref="tagDataPicker"
                          :placeholder="item.placeholder || $t('请选择标签')"
                          :name="item.field.alias"
                          :allowClear="true"
                          :tagDeafultData="item.field.tagData"
                          :rnumber="
                            item.field.setting.form.tagSetting ? item.field.setting.form.tagSetting.rnumber : []
                          "
                          :value="item.field.value"
                          pageType="search"
                          @select="
                            (e) => {
                              objTag = {}
                              objTag[item.field.alias] = e
                              form.setFieldsValue(objTag)
                            }
                          "
                        />
                      </div>
                      <!-- 开关 -->
                      <a-select
                        v-else-if="item.field.formType === 'switch'"
                        v-decorator="[item.field.alias]"
                        :placeholder="item.placeholder || $t('请选择')"
                        :allowClear="true"
                      >
                        <a-select-option :value="1">
                          {{ $t(item.field.setting.form.word.value[1]) }}
                        </a-select-option>
                        <a-select-option :value="0">
                          {{ $t(item.field.setting.form.word.value[0]) }}
                        </a-select-option>
                      </a-select>
                      <!-- 地址组件 -->
                      <div v-else-if="item.formType === 'address'">
                        <data-picker
                          ref="dataPicker"
                          :placeholder="$t('请选择')"
                          :name="item.field.alias"
                          :allowClear="true"
                          parentId="parentNumber"
                          displayType="tree"
                          url="/admin/address/getAddressChildren"
                          searchUrl="/admin/search/addressSearch"
                          :multiple="true"
                          :scope="scope"
                          :field="item.field"
                          :optionsConversion="
                            (list, displayType, searchType) => {
                              if (searchType) {
                                return list.map((item) => {
                                  const obj = item
                                  obj.key = item.number
                                  obj.label = item.fullName
                                  return obj
                                })
                              } else {
                                return list.map((item) => {
                                  const obj = item
                                  obj.key = item.number
                                  obj.label = item.name
                                  return obj
                                })
                              }
                            }
                          "
                        />
                      </div>
                      <!-- 级联选择 -->
                      <div v-else-if="item.formType === 'cascader'">
                        <data-picker
                          ref="dataPicker"
                          :placeholder="$t('请选择')"
                          :name="item.field.alias"
                          :allowClear="true"
                          parentId="parentDictDataNumber"
                          :parameter="{ dictCategoryNumber: item.field.setting.form.src }"
                          displayType="tree"
                          url="/admin/dict/initData"
                          searchUrl="/admin/search/dictSearch"
                          :multiple="true"
                          :scope="scope"
                          :optionsConversion="
                            (list, displayType, searchType) => {
                              if (searchType) {
                                return list.map((item) => {
                                  const obj = item
                                  obj.key = item.dictDataNumber
                                  obj.label = item.fullName
                                  return obj
                                })
                              } else {
                                return list.map((item) => {
                                  const obj = item
                                  obj.key = item.dictDataNumber
                                  obj.label = item.dictDataName
                                  return obj
                                })
                              }
                            }
                          "
                        />
                      </div>
                      <!-- 树选择 -->
                      <div v-else-if="item.field.formType === 'treeselect'">
                        <data-picker
                          ref="dataPicker"
                          :placeholder="
                            item.field.setting.attribute.emptyText
                              ? $t(item.field.setting.attribute.emptyText)
                              : $t('请选择')
                          "
                          :name="item.field.alias"
                          :allowClear="true"
                          :parentId="
                            item.field.setting.attribute.dataSource === 'addressBook'
                              ? 'parentNumber'
                              : 'parentDictDataNumber'
                          "
                          :parameter="
                            item.field.setting.attribute.dataSource === 'addressBook'
                              ? {}
                              : { dictCategoryNumber: item.field.setting.form.src }
                          "
                          displayType="tree"
                          :url="
                            item.field.setting.attribute.dataSource === 'addressBook'
                              ? '/admin/address/getAddressChildren'
                              : '/admin/dict/initData'
                          "
                          :searchUrl="
                            item.field.setting.attribute.dataSource === 'addressBook'
                              ? '/admin/search/addressSearch'
                              : '/admin/search/dictSearch'
                          "
                          :selectModel="item.field.setting.attribute.selectModel === 'end' ? true : false"
                          :multiple="true"
                          :scope="scope"
                          :optionsConversion="
                            (list, displayType, searchType) =>
                              optionsConversionTreeselect(item, list, displayType, searchType)
                          "
                        />
                      </div>
                      <!-- 组织结构 -->
                      <div v-else-if="item.field.formType === 'organization'">
                        <data-picker
                          ref="dataPicker"
                          :placeholder="
                            $t(
                              `请选择${
                                item.field.setting.form.optionType === 'department'
                                  ? '部门'
                                  : item.field.setting.form.optionType === 'role'
                                  ? '角色'
                                  : '用户'
                              }`
                            )
                          "
                          :allowClear="true"
                          :name="item.field.alias"
                          :parameter="item.field.setting.form.optionType === 'user' ? { sortField: 'username' } : {}"
                          parentId="parentDepartmentId"
                          :displayType="item.field.setting.form.optionType === 'department' ? 'tree' : 'list'"
                          :url="
                            item.field.setting.form.optionType === 'department'
                              ? '/admin/department/init'
                              : item.field.setting.form.optionType === 'role'
                              ? '/admin/search/roleSearch'
                              : '/admin/search/userSearch'
                          "
                          :searchUrl="
                            item.field.setting.form.optionType === 'department'
                              ? '/admin/search/departmentSearch'
                              : item.field.setting.form.optionType === 'role'
                              ? '/admin/search/roleSearch'
                              : '/admin/search/userSearch'
                          "
                          :multiple="true"
                          :scope="scope"
                          :optionsConversion="
                            (list, displayType, searchType) => optionsConversion(item, list, displayType, searchType)
                          "
                        />
                      </div>
                    </a-form-item>
                    <a-divider v-else-if="item.type === 'divider'" :orientation="item.dividerDirection">
                      {{ item.dividerText }}
                    </a-divider>
                    <a-input v-else-if="item.type === 'place'" style="opacity: 0"></a-input>
                    <component :is="item.component" v-else-if="item.type === 'component'" />
                    <a-form-item
                      v-else-if="item.type === 'workflowFilter'"
                      :labelCol="
                        (item.changeTitle || item.name) && searchSection.labelLocation !== 'top' ? labelCol : {}
                      "
                      :wrapperCol="
                        (item.changeTitle || item.name) && searchSection.labelLocation !== 'top'
                          ? wrapperCol
                          : { style: 'width: 100%; display: inline-block' }
                      "
                    >
                      <span :slot="item.changeTitle || item.name ? 'label' : undefined">
                        <span :title="item.changeTitle ? item.changeTitle : item.name">
                          {{ item.changeTitle ? item.changeTitle : item.name }}
                        </span>
                        <a-tooltip v-if="item.help" placement="top">
                          <template slot="title">
                            <span>{{ item.help }}</span>
                          </template>
                          <a-icon style="padding-left: 4px" type="question-circle" />
                        </a-tooltip>
                      </span>
                      <a-radio-group
                        v-model="flowCondition"
                        button-style="solid"
                        style="margin-right: 8px"
                        @change="
                          (e) => {
                            handleConditionChange(e)
                          }
                        "
                      >
                        <a-tooltip
                          v-for="actionItem in item.workflowFilters"
                          v-show="actionItem.enable"
                          :key="actionItem.value"
                          :title="$t(actionItem.help)"
                        >
                          <a-badge :count="actionItem.searchCounts" :offset="[-9, 0]">
                            <a-radio-button :value="actionItem.value">
                              {{ actionItem.customName ? $t(actionItem.customName) : $t(actionItem.name) }}
                            </a-radio-button>
                          </a-badge>
                        </a-tooltip>
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item
                      v-else-if="item.type === 'searchTemplate'"
                      :labelCol="
                        (item.changeTitle || item.name) && searchSection.labelLocation !== 'top' ? labelCol : {}
                      "
                      :wrapperCol="
                        (item.changeTitle || item.name) && searchSection.labelLocation !== 'top'
                          ? wrapperCol
                          : { style: 'width: 100%; display: inline-block' }
                      "
                    >
                      <span :slot="item.changeTitle || item.name ? 'label' : undefined">
                        <span :title="item.changeTitle ? item.changeTitle : item.name">
                          {{ item.changeTitle ? item.changeTitle : item.name }}
                        </span>
                        <a-tooltip v-if="item.help" placement="top">
                          <template slot="title">
                            <span>{{ item.help }}</span>
                          </template>
                          <a-icon style="padding-left: 4px" type="question-circle" />
                        </a-tooltip>
                      </span>
                      <a-select
                        v-if="item.displayStyle === '0'"
                        v-model="item.searchValue"
                        allowClear
                        @change="
                          (e) => {
                            $set(item, 'searchValue', e)
                          }
                        "
                      >
                        <a-select-option
                          v-for="searchItem in item.searchTemplateGroups"
                          :key="searchItem.id"
                          :value="searchItem.id"
                        >
                          {{ searchItem.name }}
                        </a-select-option>
                      </a-select>
                      <a-radio-group
                        v-else
                        v-model="item.searchValue"
                        button-style="solid"
                        style="margin-right: 8px"
                        @change="
                          (e) => {
                            $set(item, 'searchValue', e.target.value)
                            handleSearch({ tag: true })
                          }
                        "
                      >
                        <a-radio-button :value="undefined">{{ $t('全部') }}</a-radio-button>
                        <a-radio-button
                          v-for="searchItem in item.searchTemplateGroups"
                          :key="searchItem.id"
                          :value="searchItem.id"
                        >
                          {{ $t(searchItem.name) }}
                        </a-radio-button>
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item
                      v-else-if="item.type === 'multiFieldSearch'"
                      :labelCol="
                        (item.changeTitle || item.name) && searchSection.labelLocation !== 'top' ? labelCol : {}
                      "
                      :wrapperCol="
                        (item.changeTitle || item.name) && searchSection.labelLocation !== 'top'
                          ? wrapperCol
                          : { style: 'width: 100%; display: inline-block' }
                      "
                    >
                      <span :slot="item.changeTitle || item.name ? 'label' : undefined">
                        <span :title="item.changeTitle ? item.changeTitle : item.name">
                          {{ item.changeTitle ? item.changeTitle : item.name }}
                        </span>
                        <a-tooltip v-if="item.help" placement="top">
                          <template slot="title">
                            <span>{{ item.help }}</span>
                          </template>
                          <a-icon style="padding-left: 4px" type="question-circle" />
                        </a-tooltip>
                      </span>
                      <a-input v-model="item.searchValue" allowClear />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-card>
            </a-form>
            <!-- 操作按钮 -->
            <div
              v-if="(cardTemplate.length === 0 && toolButtons.length && loading) || customColumn == '1' || helpText"
              style="margin: 8px 8px 0 8px"
            >
              <!-- 下面是动态生成区域 -->
              <a-row type="flex" align="middle">
                <a-col :span="20">
                  <a-space>
                    <template v-for="(item, index) in toolButtons">
                      <div :key="index">
                        <user-table-components :ref="'component' + item.id" />
                        <component :is="item.component" />
                      </div>
                    </template>
                    <!-- <a-button
                      v-if="params.type === 'webSubformDataWindow' && multiSelect"
                      :disabled="selectedRowKeys.length === 0"
                      type="primary"
                      @click="
                        () => {
                          $emit('ok', selectedRows, 'line')
                        }
                      "
                    >
                      {{ $t('确认选择') }}
                    </a-button> -->
                  </a-space>
                </a-col>
                <a-col :span="4" style="text-align: right">
                  <a-space>
                    <a-button
                      v-if="customColumn == '1' ? true : false"
                      icon="setting"
                      style="border: none; font-size: 18px; margin-right: 0px"
                      @click="customShow"
                    ></a-button>
                    <template v-if="helpText">
                      <HelpPanel :number="templateId" />
                      <!-- <a-popover
                        v-model="helpVisible"
                        trigger="click"
                        :arrowPointAtCenter="true"
                        placement="bottomRight"
                      >
                        <template slot="content">
                          <div style="width: 350px" class="helpText">
                            <div v-dompurify-html="helpNotes" v-viewer></div>
                          </div>
                        </template>
                        <a-icon
                          type="question-circle"
                          style="font-size: 16px; margin-right: 8px; color: rgba(0, 0, 0, 0.65)"
                          @click="getHelp"
                        ></a-icon>
                      </a-popover> -->
                    </template>
                  </a-space>
                </a-col>
              </a-row>
            </div>
            <!-- 数据列表 -->
            <s-table
              v-show="cardTemplate.length === 0 && loading"
              ref="table"
              class="table-fill"
              :class="[totalCount === 0 ? 'table-fill-empty' : '']"
              size="small"
              rowKey="id"
              :columns="columns"
              :data="loadDataTable"
              :rowSelection="rowSelection"
              :pageSize="pageSize"
              :pageMode="pageMode"
              :showSome="pageMode == 'simple'"
              :autoLoad="false"
              :scroll="scroll"
              :sorter="sorter"
            ></s-table>
            <div v-if="cardTemplate.length !== 0 && loading">
              <user-table-card
                ref="userTableCard"
                :cardTemplate="cardTemplate"
                :sorter="sorter"
                :templateId="templateId"
                :params="params"
                :dataSource="dataSource"
                :viewThis="viewThis"
                :columns="columns"
                :toolButtons="toolButtons"
                :actionArray="actionArray"
                :pageSize="pageSize"
              />
            </div>
          </div>
        </a-spin>
      </a-layout-content>
    </a-layout>

    <!-- 数据表单 -->
    <user-table-form ref="userTableForm" :key="indexKey" @ok="refresh('noRefresh')"></user-table-form>
    <!-- 用户自定义列 -->
    <user-table-column-custom ref="userTableColumnCustom" @ok="getData"></user-table-column-custom>
    <!-- 批量编辑 -->
    <user-table-bulk-edit ref="userTableBulkEdit" @ok="refresh('noRefresh')"></user-table-bulk-edit>
    <!-- 导入表单 -->
    <!-- <user-table-import ref="userTableImport" @ok="refresh"></user-table-import> -->
    <!-- 导出表单 -->
    <!-- <user-table-export ref="userTableExport" :key="exportKey" @ok="refresh"></user-table-export> -->
    <general-export ref="generalexport" :key="exportKey" @ok="refresh"></general-export>
    <user-table-components ref="userTableComponents" />
    <!-- 组合搜索 -->
    <user-table-search
      ref="userTableSearch"
      :key="searchKey"
      @ok="handleHighSearch"
      @change="handleChange"
      @save="saveSearch"
    />
    <workflow-handle-form ref="workflowHandleForm" @ok="refresh('noRefresh')" />
    <!-- 添加办理备注 -->
    <user-table-workflow-remarks ref="userTableWorkflowRemarks" :key="remarkKey" @ok="refresh('noRefresh')" />
    <!-- 流转 -->
    <user-table-workflow-jump ref="userTableWorkflowJump" :key="jumpKey" @ok="refresh('noRefresh')" />
    <!-- 转办 -->
    <user-table-workflow-complaint ref="userTableWorkflowComplaint" :key="complaintKey" @ok="refresh('noRefresh')" />
    <!-- 撤销 -->
    <user-table-workflow-terminate ref="userTableWorkflowTerminate" :key="terminateKey" @ok="refresh('noRefresh')" />
    <!-- 催办 -->
    <user-table-workflow-urge ref="userTableWorkflowUrge" :key="urgeKey" @ok="refresh('noRefresh')" />
    <!-- 批量搜索 -->
    <user-table-batch-search ref="userTableBatchSearch" :key="batchSearchKey" @ok="handleHighSearch" />
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Rate, TreeSelect } from 'ant-design-vue'
import UserTableComponents from './UserTableComponents'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash.clonedeep'

Vue.use(Rate)
Vue.use(TreeSelect)
export default {
  i18n: window.lang('admin'),
  components: {
    UserTableBulkEdit: () => import('./UserTableBulkEdit'),
    // UserTableImport: () => import('./UserTableImport'),
    // UserTableExport: () => import('./UserTableExport'),
    GeneralExport: () => import('@/views/admin/Table/GeneralExport'),
    UserTableComponents,
    UserTableSearch: () => import('./UserTableSearch'),
    UserTableCard: () => import('./UserTableCard'),
    UserTableColumnCustom: () => import('./UserTableColumnCustom'),
    AddressSelect: () => import('../Field/AddressSelect'),
    TabsSelect: () => import('../Field/TabsSelect'),
    UserTableForm: () => import('./UserTableForm'),
    WorkflowHandleForm: () => import('../WorkflowHandleForm'),
    UserTableBatchSearch: () => import('./UserTableBatchSearch'),
    UserTableWorkflowRemarks: () => import('./UserTableWorkflowRemarks'),
    UserTableWorkflowJump: () => import('./UserTableWorkflowJump'),
    UserTableWorkflowComplaint: () => import('./UserTableWorkflowComplaint'),
    userTableWorkflowTerminate: () => import('./UserTableWorkflowTerminate'),
    UserTableWorkflowUrge: () => import('./UserTableWorkflowUrge'),
    TagDataPicker: () => import('../Tag/TagDataPicker'),
    HelpPanel: () => import('@/views/admin//HelpPanel')
  },
  props: {
    params: {
      type: Object,
      default () {
        return {
          templateId: ''
        }
      },
      required: true
    },
    query: {
      type: Object,
      default () {
        return {}
      }
    },
    viewThis: {
      type: Object,
      default () {
        return {}
      }
    },
    filtersData: {
      type: Array,
      default () {
        return []
      },
      required: false
    },
    // userTableFormd的vue实例对象
    formThis: {
      type: Object,
      default () { }
    },
    screenData: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    this.handleSearch = debounce(this.handleSearch, 500)
    this.searchTabs = debounce(this.searchTabs, 800)
    return {
      ENV: process.env,
      visible: false,
      loading: false,
      spinning: false,
      imgSrc: '', // 点击查看大图
      indexKey: 0, // 用于表单刷新数据
      exportKey: 2,
      searchKey: 4,
      userKey: 'user',
      departmentKey: 'department',
      remarkKey: 'remark',
      jumpKey: 'jump',
      complaintKey: 'complaint',
      terminateKey: 'terminate',
      urgeKey: 'urge',
      batchSearchKey: 'bulkSearch',
      SHOW_PARENT: TreeSelect.SHOW_PARENT,
      SHOW_CHILD: TreeSelect.SHOW_CHILD,
      endDate: this.moment().startOf('month'),
      role: '',
      username: '',
      department: '',
      tableId: '',
      templateId: '',
      flowCondition: 'all_flow',
      // 搜索参数
      queryParam: {},
      labelCol: { style: 'width: 104px; display: inline-block' },
      wrapperCol: { style: 'width: calc(100% - 104px); display: inline-block' },
      // customColumnsData: {},
      timeStart: null,
      timeEnd: null,
      timeObj: {},
      // 组合搜索展开/折叠标识
      advancedSearch: true,
      defaultRows: 1,
      // 搜索表单
      form: this.$form.createForm(this),
      // 搜索表单
      template: [],
      // 表头
      columns: [],
      columnsExport: [],
      actionArray: [],
      collapsed: false,
      // 工具栏菜单
      toolButtons: [],
      bulkSearch: {
        field: '',
        value: ''
      },
      selectedRowKeys: [],
      selectedRows: [],
      rowSelection: null,
      multiSelect: false, // table是否多选
      // colLayout: {},
      scroll: { x: 0, y: true },
      sorter: {},
      dataSource: '',
      comsShowFlag: false,
      actions: new Map([[
        '', function (value, inputValue) {
          return true
        }], [
        'contain', function (value, inputValue) {
          if (inputValue.indexOf(value) === -1) {
            return false
          } else {
            return true
          }
        }], [
        'equal', function (value, inputValue) {
          if (inputValue === value) {
            return true
          } else {
            return false
          }
        }], [
        'great', function (value, inputValue) {
          if (inputValue > value) {
            return true
          } else {
            return false
          }
        }], [
        'nc', function (value, inputValue) {
          if (inputValue.indexOf(value) === -1) {
            return true
          } else {
            return false
          }
        }], [
        'ne', function (value, inputValue) {
          if (inputValue !== value) {
            return true
          } else {
            return false
          }
        }], [
        'lt', function (value, inputValue) {
          if (inputValue < value) {
            return true
          } else {
            return false
          }
        }], [
        'ge', function (value, inputValue) {
          if (inputValue > value || inputValue === value) {
            return true
          } else {
            return false
          }
        }], [
        'le', function (value, inputValue) {
          if (inputValue < value || inputValue === value) {
            return true
          } else {
            return false
          }
        }], [
        'bw', function (value, inputValue) {
          if (inputValue.indexOf(value) === 0) {
            return true
          } else {
            return false
          }
        }], [
        'ew', function (value, inputValue) {
          const len = value.length
          if (inputValue.slice(-len) === value) {
            return true
          } else {
            return false
          }
        }]]),
      customColumn: 0,
      lockLeft: 0,
      lockRight: 0,
      totalCount: 0,
      pageSize: 20,
      publicPageSize: 20,
      pageMode: 'default', // 分页器模式
      sendData: false,
      where: '',
      data: [], // 视图规则
      settingData: {},
      customSearch: [], // 组合搜索数据
      condiList: [],
      searchFlag: true,
      searchData: {},
      timeRangeDisplay: '',
      scope: this,
      searchString: {}, // 开窗搜索
      cardTemplate: [], // 卡片数据窗口模板数据
      multiFieldSearchList: [],
      searchSection: {},
      interactiveType: '', // 交互模式
      interactiveAlias: '', // 树形DW左侧树字段内容
      interactiveNumber: '', // 当前选中的树节点
      interactiveField: {},
      interactiveData: [{ dictDataName: '全部', dictDataNumber: 0 }],
      interactiveObj: {},
      interactiveSearchData: [],
      interactiveSearchValue: '',
      lastFetchId: 0,
      fetching: false,
      scrollStats: true,
      interactivePage: {
        pageNo: 1,
        pageSize: 20,
        sortField: 'listOrder',
        sortOrder: 'ascend'
      },
      helpNotes: '',
      helpVisible: false,
      helpText: false,
      drawerType: '0',
      drawerFixedWidth: '1200',
      permittedWorkflows: [],
      templateType: '',
      publicColumns: [],
      privateColumns: [],
      badgeWorkflowFilters: [], // 需要角标的流程筛选组
      enableWorkflow: [], // 判断是否开启流程
      initMount: true
    }
  },
  computed: {
    ...mapGetters(['setting', 'userInfo'])
  },
  watch: {
    params: {
      handler (newValue) {
        if (newValue.relationSetting && Object.keys(newValue.relationSetting).length !== 0) {
          // 查看不同的数据时刷新子表
          this.refresh()
        }
      },
      deep: true
    }
  },
  // 祖先级组件数据传递，以及被子孙级组件动态修改
  provide () {
    this.theme = Vue.observable({
      data: this
    })
    return {
      theme: this.theme
    }
  },
  created () {
    this.role = this.userInfo.roleId
    this.username = this.userInfo.username
    this.department = this.userInfo.departmentId
    this.spinning = true
    const _this = this
    const { templateId } = this.params
    this.axios({
      url: '/admin/general/init',
      params: { templateId }
    }).then(async res => {
      if (res.result.templateType === 'webProcessCenterDataWindow') {
        await this.axios({
          url: 'admin/processCenter/getPermittedWorkflows'
        }).then(res => {
          if (!res.code) {
            this.permittedWorkflows = res.result
          }
        })
      }
      this.templateType = res.result.templateType
      this.enableWorkflow = res.result.enableWorkflow
      this.loading = true
      this.interactiveType = res.result.interactiveType
      this.interactiveAlias = res.result.interactiveAlias
      this.interactiveField = res.result.interactiveField
      this.helpText = res.result.helpText
      if (res.result.interactiveType === 'tree') {
        this.getTreeList()
      }
      this.tableId = res.result.tableId
      this.sorter = res.result.sorter
      this.searchSection = res.result.searchSection || {}
      if (this.searchSection.labelLocation === 'left') {
        this.labelCol = { style: `width: ${this.searchSection.labelWidth}px; display: inline-block` }
        this.wrapperCol = { style: `width: calc(100% - ${this.searchSection.labelWidth}px); display: inline-block` }
      }
      this.advancedSearch = this.searchSection.defaultStatus === '1'
      this.defaultRows = Number(this.searchSection.defaultRows) || 1
      res.result.columns.forEach(item => {
        item.title = this.$t(item.title)
        item.inlineButtons && item.inlineButtons.forEach(item => { item.name = this.$t(item.name) })
      })
      this.columns = res.result.columns.filter(item => item.display === 'v')
      this.columnsExport = res.result.columns
      this.actionArray = this.columns.filter(item => item.dataIndex === 'action')
      this.publicPageSize = this.pageSize = Number(res.result.pageSize)
      this.cardTemplate = res.result.cardTemplate
      this.lockLeft = res.result.lockLeft
      this.pageMode = res.result.pageMode
      this.lockRight = res.result.lockRight
      this.timeRangeDisplay = res.result.timeRangeDisplay
      this.drawerType = res.result.drawerType
      this.drawerFixedWidth = res.result.drawerFixedWidth
      this.spinning = false
      for (const i in this.columns) {
        if (this.columns[i].customTitle) {
          this.columns[i].title = this.$t(this.columns[i].customTitle)
        }
        if (['textarea', 'image', 'file', 'editor'].includes(this.columns[i].type)) {
          this.columns[i].sorter = false
        } else {
          if (this.columns[i].dataIndex !== 'action' && !this.columns[i].sorter) {
            this.columns[i].sorter = false
          }
        }
      }
      this.template = res.result.searchers
      this.customSearch = res.result.customSearch
      this.customColumn = res.result.customColumn
      this.customColumnSetting = res.result.customColumnSetting
      this.dataSource = res.result.dataSource
      this.condiList = this.customSearch.length > 0 ? this.customSearch.map(item => {
        const obj = JSON.parse(item.setting)
        obj.id = item.id
        return obj
      }) : []
      this.templateId = res.result.templateId
      this.data = res.result.bindingFormViews
      this.usePermissions = res.result.usePermissions
      if (res.result.workflow) {
        this.workflowId = res.result.workflow.workflowId
        this.workflowName = res.result.workflow.workflowName
      }
      this.template.forEach(item => {
        if (item.placeholder === '0') {
          item.placeholder = ''
        }
        if (item.type === 'workflowFilter') {
          // this.workflowFilters = item.workflowFilters
          this.flowCondition = item.workflowFilters.filter(item => item.enable)[0]?.value
          this.axios({
            url: '/admin/workflow/flowSetting',
            data: { action: 'get' }
          }).then(res => {
            const allWorkflowFilters = res.result.workflowFilters
            item.workflowFilters.forEach(actionItem => {
              const obj = allWorkflowFilters.find(allItem => allItem.value === actionItem.value)
              if (obj) {
                actionItem.customName = obj.customName
                actionItem.help = obj.help
              }
              if (actionItem.badge) {
                this.badgeWorkflowFilters.push(actionItem.value)
              }
            })
          })
        } else if (item.type === 'component') {
          const funcStr = `return (_this) => {  return ${item.attribute} }`
          // eslint-disable-next-line no-new-func
          const func = new Function(funcStr)
          const obj = func()(_this)
          if (obj.template) {
            obj.template = obj.template.replace(/[\r\n]/g, '')
          }
          item.component = obj
        }
      })
      res.result.toolButtons.forEach(item => {
        const funcStr = `return (_this, barData) => {  return ${item.attribute} }`
        // eslint-disable-next-line no-new-func
        const func = new Function(funcStr)
        const barData = {
          importTemplate: item.importTemplate
        }
        const obj = func()(_this, barData)
        if (obj.template) {
          obj.template = obj.template.replace(/[\r\n]/g, '')
        }
        item.component = obj
      })
      this.toolButtons = res.result.toolButtons
      // 表格是否出现行选择功能
      this.multiSelect = res.result.multiSelect
      this.rowSelection = res.result.multiSelect ? {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys
          this.selectedRows = selectedRows
        }
      } : null
      const that = this
      // 循环处理表格的列
      if ((this.params.type === 'webSubformDataWindow' || this.params.type === 'associated') && !this.columns.some(item => item.dataIndex === 'action')) {
        this.columns.unshift({
          align: 'center',
          dataIndex: 'action',
          inlineButtons: [],
          type: 'action',
          width: 120
        })
      }
      for (let i = 0; i < this.lockLeft; i++) {
        this.columns[i]['fixed'] = 'left'
        this.scroll.x -= Number(this.columns[i].width)
      }
      let keyLength = this.columns.length - 1
      for (let i = 0; i < this.lockRight; i++) {
        this.columns[keyLength]['fixed'] = 'right'
        this.scroll.x -= Number(this.columns[keyLength].width)
        keyLength--
      }
      const actionObj = JSON.parse(JSON.stringify(res.result.columns)).find(item => item.dataIndex === 'action')
      if (actionObj.width === '0') {
        this.columns = this.columns.filter(item => item.dataIndex !== 'action')
      }
      this.columns.map((item) => {
        let style = {}
        if (item.style) {
          style = {
            'background-color': item.style.bgcolor,
            'color': item.style.color,
            'font-size': item.style.fontsize
          }
        }
        // if (item.attribute && !item.attribute.includes('<')) {
        //   item.attribute = JSON.parse(item.attribute)
        // }
        item.ellipsis = true
        item.width = Number(item.width)
        if (item.width === 0) {
          delete item.width
          this.scroll.x = null
        } else {
          if (this.scroll.x !== null) {
            this.scroll.x += item.width
          }
        }
        item.customCell = (record, index) => {
          if (item.attribute && !item.attribute.includes('<')) {
            const funcStr = `return () => {  return ${item.attribute} }`
            // eslint-disable-next-line no-new-func
            const func = new Function(funcStr)
            const obj = func()()
            if (obj.styleFunc) {
              return obj.styleFunc(record, item)
            }
          }
        }
        item.customRender = (text, record, index) => {
          const showText = record[item.dataIndex + '__'] || record[item.dataIndex]
          item.func = () => { }
          // 设置单元格颜色以及点击事件
          if (item.attribute && !item.attribute.includes('<')) {
            const funcStr = `return () => {  return ${item.attribute} }`
            // eslint-disable-next-line no-new-func
            const func = new Function(funcStr)
            const obj = func()()
            if (obj.key) {
              // 获取属性key
              const key = record[obj.key]
              style = obj.value ? obj.value[key] : ''
            }
            if (obj.event) {
              const str = 'return ' + obj.event
              // eslint-disable-next-line no-new-func
              const func = new Function(str)
              item.func = func(_this, record, text)
            }
          }
          if (item.dataIndex === 'action') {
            const menuArr = []
            // 获取业务建模》流程筛选组》操作列规则 actionButtonsMappings
            const workflowFilters = this.template.filter(item => item.type === 'workflowFilter')
            let activeButtons = []
            if (workflowFilters[0]) {
              const actionButtonsMappings = workflowFilters[0].workflowFilters.filter(item => item.value === this.flowCondition)
              activeButtons = actionButtonsMappings[0] && actionButtonsMappings[0].actionButtonsMappings ? actionButtonsMappings[0].actionButtonsMappings[record.workflowId] : []// activeButtons = ['flow_process', 'flow_view']
            }
            if (this.templateType === 'webProcessCenterDataWindow') { // 流程中心
              this.permittedWorkflows.forEach(permittedWorkflow => {
                if (record.workflowId === permittedWorkflow.workflowId) { // 判断表格当前行是哪种流程
                  permittedWorkflow.workflowSetting.dataWindowButtons && permittedWorkflow.workflowSetting.dataWindowButtons.forEach(rowItem => {
                    if (['my_process', 'my_handle', 'my_create', 'my_suspend', 'my_cc', 'my_entrust', 'all_suspend', 'all_flow', 'all_process', 'my_subscribe'].includes(this.flowCondition)) { // 内置流程筛选
                      activeButtons.includes(rowItem.usage) && this.checkButtonPermissions(rowItem, record, activeButtons, menuArr)
                    } else { // 自定义流程筛选
                      activeButtons.includes(rowItem.usage) && this.checkButtonPermissions(rowItem, record, activeButtons, menuArr, 'custom')
                    }
                  })
                }
              })
            } else if (this.enableWorkflow) { // 普通流程
              item.inlineButtons.forEach(rowItem => {
                if (['my_process', 'my_handle', 'my_create', 'my_suspend', 'my_cc', 'my_entrust', 'all_suspend', 'all_flow', 'all_process', 'my_subscribe'].includes(this.flowCondition)) { // 内置流程筛选
                  activeButtons.includes(rowItem.usage) && this.checkButtonPermissions(rowItem, record, activeButtons, menuArr)
                } else { // 自定义流程筛选
                  activeButtons.includes(rowItem.usage) && this.checkButtonPermissions(rowItem, record, activeButtons, menuArr, 'custom')
                }
              })
            } else { // 普通数据窗口
              item.inlineButtons.forEach(rowItem => {
                this.checkButtonPermissions(rowItem, record, activeButtons, menuArr)
              })
            }
            if (item.actionStyle === '1') {
              return (
                <div>
                  {
                    menuArr.map((menuItem, menuIndex) => {
                      if (menuIndex === menuArr.length - 1 || menuItem.customDivider) {
                        return (
                          <span>
                            <menuItem />
                          </span>
                        )
                      } else {
                        return (
                          <span>
                            <menuItem />
                            <a-divider type="vertical" />
                          </span>
                        )
                      }
                    })
                  }
                </div>
              )
            } else if (item.actionStyle === '2') {
              const data = menuArr.length > item.maxDisplay ? <span>
                <span>
                  {
                    menuArr.map((menuItem, menuIndex) => {
                      if (menuIndex < (item.maxDisplay - 1)) {
                        if (menuItem.customDivider) {
                          return (
                            <span>
                              <menuItem />
                            </span>
                          )
                        } else {
                          return (
                            <span>
                              <menuItem />
                              <a-divider type="vertical" />
                            </span>
                          )
                        }
                      }
                    })
                  }
                </span>
                <a-dropdown>
                  <a>{this.$t('更多')}
                    <a-icon type="down" /></a>
                  <a-menu slot="overlay">
                    {
                      menuArr.map((menuItem, menuIndex) => {
                        if (menuIndex > (item.maxDisplay - 2)) {
                          return (
                            <a-menu-item>
                              <menuItem />
                            </a-menu-item>
                          )
                        }
                      })
                    }
                  </a-menu>
                </a-dropdown>
              </span> : <div>
                {
                  menuArr.map((menuItem, menuIndex) => {
                    if (menuIndex === menuArr.length - 1 || menuItem.customDivider) {
                      return (
                        <span>
                          <menuItem />
                        </span>
                      )
                    } else {
                      return (
                        <span>
                          <menuItem />
                          <a-divider type="vertical" />
                        </span>
                      )
                    }
                  })
                }
              </div>
              return data
            } else {
              return (
                <span>
                  <a-dropdown>
                    <a-button icon="more" type="link"></a-button>
                    <a-menu slot="overlay">
                      {
                        menuArr.map((menuItem, menuIndex) => {
                          return (
                            <a-menu-item>
                              <menuItem />
                            </a-menu-item>
                          )
                        })
                      }
                    </a-menu>
                  </a-dropdown>
                </span>
              )
            }
          }
          if (item.attribute && JSON.stringify(item.attribute).includes('<')) {
            let data = ''
            const funcStr = `return (_this, record, text) => {  return ${item.attribute} }`
            // eslint-disable-next-line no-new-func
            const func = new Function(funcStr)
            const obj = func()(_this, record, text)
            if (obj.template) {
              obj.template = obj.template.replace(/[\r\n]/g, '')
            }
            const MyComponent = obj
            data = (<MyComponent></MyComponent>)
            return data
          } else {
            switch (item.type) {
              case 'datetime':
              case 'number':
                return (
                  <div style={style} onClick={() => { item.func(that, record) }}>
                    {(showText === null || showText === '') ? '--' : showText}
                  </div>
                )
              case 'image':
                if (text && text.length > 0) {
                  return (
                    <viewer>
                      {showText.map((val) => {
                        return (
                          <img
                            src={this.$store.state.env.VUE_APP_API_BASE_URL + 'admin/api/download/?filePath=' + val.filePath}
                            style={style} style="width: 64px; height: 64px; cursor: pointer; margin-right: 2px;" />
                        )
                      })}
                    </viewer>
                  )
                } else {
                  return '--'
                }
              case 'file':
                if (text && text.length > 0) {
                  return (
                    <div>
                      {showText.map((val) => {
                        const filePath = encodeURIComponent(val.filePath)
                        return (
                          <a
                            href={this.$store.state.env.VUE_APP_API_BASE_URL + 'admin/api/download/?filePath=' + filePath}
                            target="_blank" style={style} style="display: block;">{val.fileName}</a>
                        )
                      })}
                    </div>
                  )
                } else {
                  return '--'
                }
              case 'score':
                return (
                  <a-rate value={Number(showText)} disabled allow-half />
                )
              case 'tag':
                if (record[item.dataIndex]) {
                  return (
                    <div class="userTableTagColor">
                      {record[item.dataIndex].split(',').map((val) => {
                        return (
                          <span
                            class={showText && showText.find(item => item.tagNumber === val) && showText.find(item => item.tagNumber === val).tagType === 0 ? 'tagBlue' : 'tagRed'}>
                            {showText && showText.find(item => item.tagNumber === val) ? showText.find(item => item.tagNumber === val).tagName : ''}
                          </span>
                        )
                      })}
                    </div>
                  )
                } else {
                  return '--'
                }
              default:
                return (
                  <div style={style} onClick={() => { item.func(that, record) }} domPropsInnerHTML={showText || '--'}>
                  </div>
                )
            }
          }
        }
      })
      // 公共视图
      this.publicColumns = cloneDeep(this.columns)
      // 个人视图 做过滤处理和排序
      const columns = this.columns.filter(item => item.dataIndex === 'action')
      this.privateColumns = cloneDeep(columns)
      if (this.customColumnSetting) {
        this.customColumnSetting.fieldColumns.forEach(item => {
          const index = this.columns.findIndex(fieldItem => item.fieldId === fieldItem.fieldId)
          if (index !== -1) {
            this.privateColumns.push(this.columns[index])
          }
        })
        this.scroll.x = 0 // 个人视图，初始化表格可滚动宽度
        for (let i = 0; i < Number(this.customColumnSetting.lockLeft); i++) {
          this.privateColumns[i]['fixed'] = 'left'
          this.scroll.x -= Number(this.privateColumns[i].width)
        }
        let keyLengthOther = this.privateColumns.length - 1
        for (let i = 0; i < Number(this.customColumnSetting.lockRight); i++) {
          this.privateColumns[keyLength]['fixed'] = 'right'
          this.scroll.x -= Number(this.privateColumns[keyLengthOther].width)
          keyLengthOther--
        }
        if (this.customColumnSetting.viewMode === 'private') {
          this.pageSize = Number(this.customColumnSetting.pageSize)
          this.columns = cloneDeep(this.privateColumns)
        }
      }
      this.refresh()
    })
  },
  methods: {
    // 加载表格数据
    loadDataTable (parameter) {
      if (this.params.type !== 'tableCardWindow') {
        const customColumn = []
        if (this.sendData) {
          for (let i = 1; i < this.columns.length; i++) {
            customColumn.push(this.columns[i].dataIndex)
          }
        }
        const multiFieldSearchList = []
        const templateSearchList = []
        this.template.forEach(item => {
          if (item.type === 'multiFieldSearch' && item.searchValue) {
            const obj = {}
            obj.comparison = item.comparison
            obj.searchFields = item.searchFields
            obj.searchValue = item.searchValue
            multiFieldSearchList.push(obj)
          } else if (item.type === 'searchTemplate' && item.searchValue) {
            const obj = item.searchTemplateGroups.find(findItem => findItem.id === item.searchValue)
            templateSearchList.push(obj.data)
          }
        })
        if (!this.queryParam.commonSearch) {
          this.queryParam.commonSearch = {}
        }
        Object.assign(this.queryParam.commonSearch, this.interactiveObj)
        return this.axios({
          url: this.dataSource || '/admin/general/list',
          data: Object.assign(this.queryParam, this.params, this.sorter, parameter,
            {
              customColumn: customColumn,
              associatedFieldFilterConditions: this.filtersData,
              flowCondition: this.flowCondition,
              multiFieldSearchList,
              templateSearchList
            })
        }).then(res => {
          this.sendData = false
          this.where = res.result?.where || ''
          this.totalCount = res.result.totalCount || (res.result.data && res.result.data.length)
          const flowConditions = this.badgeWorkflowFilters ? this.badgeWorkflowFilters.join(',') : null
          if (flowConditions) {
            this.axios({
              url: '/admin/general/getWorkflowSearcherCounts',
              params: {
                flowConditions,
                templateId: this.templateId
              }
            }).then(res => {
              let workflowFilters = []
              this.template.forEach(templateItem => {
                if (templateItem.type === 'workflowFilter') {
                  workflowFilters = templateItem.workflowFilters
                }
              })
              workflowFilters.forEach(item => {
                if (Object.keys(res.result).includes(item.value)) {
                  item.searchCounts = res.result[item.value]
                }
              })
              this.$forceUpdate()
            })
          }
          return res.result
        })
      }
    },
    getHelp () {
      this.$setLoading({ spinning: true })
      this.helpVisible = false
      this.axios({
        url: '/admin/document/edit',
        data: {
          action: 'get',
          number: this.params.templateId
        }
      }).then(res => {
        this.$setLoading({ spinning: false })
        if (!res.code) {
          const obj = res.result
          if (obj.displayMode === 'drawer') {
            this.helpVisible = false
            this.$showDocument({ visible: true, content: obj.content })
          } else {
            this.helpVisible = true
            this.helpNotes = obj.content
          }
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    getEndDateChange (date, dateString) {
      this.endDate = date
      this.sorter.end_date = date ? date.format('YYYY-MM') : dateString
    },
    // 刷新表格
    refresh (type) {
      if (this.$refs.table) {
        this.$refs.table.refresh(!type)
      }
    },
    // 打开组合搜索
    showSearch () {
      this.searchKey = this.searchKey === 4 ? 5 : 4
      this.$nextTick(() => {
        this.$refs.userTableSearch.show({
          tableId: this.tableId,
          customSearch: this.customSearch,
          templateId: this.templateId,
          newFlag: this.searchFlag,
          data: this.searchData
        })
      })
    },
    onLoadData (treeNode, item) {
      const { value } = treeNode.dataRef
      return new Promise((resolve) => {
        this.axios({
          url: '/admin/address/getAddressChildren',
          data: { parentNumber: value }
        }).then(res => {
          item.field.option.forEach(item => {
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
    },
    saveSearch (val, flag) {
      this.searchFlag = flag
      this.searchData = JSON.parse(JSON.stringify(val))
    },
    // 获取组合搜索数据
    handleHighSearch (val, flag, type) {
      if (type) {
        this.bulkSearch.value = val.text.split('\n')
        this.queryParam = Object.assign(this.queryParam, {
          bulkSearch: this.bulkSearch
        })
      } else {
        this.searchFlag = flag
        this.searchData = JSON.parse(JSON.stringify(val))
        // 不保存这些参数
        val.searchConditions.forEach(item => {
          item.fieldType = item.formType = item.optionValue = item.condiArr = undefined
        })
        this.queryParam = {
          advanceSearch: val
        }
      }
      this.refresh()
    },
    // 获取地址
    getAddress (name, number, alias) {
      const obj = {}
      obj[alias] = number
      this.form.setFieldsValue(obj)
    },
    clearAddress () {
      this.template.forEach(item => {
        if (['address'].includes(item.formType) && this.$refs[item.value]) {
          this.$refs[item.value][0].resetClear()
        }
      })
    },
    // 获取自定义列点击显示时数据
    getData (data) {
      this.sendData = true
      this.privateColumns = this.privateColumns.filter(item => item.dataIndex === 'action')
      if (this.privateColumns[0]) {
        this.privateColumns[0].fixed = false
      }
      for (const i in data.data) {
        const index = this.publicColumns.findIndex(item => item.fieldId === data.data[i].fieldId)
        if (index !== -1) {
          this.privateColumns.push(this.publicColumns[index])
        }
      }
      if (data.viewMode === 'private') {
        this.pageSize = Number(data.pageSize)
        this.columns = cloneDeep(this.privateColumns)
      } else if (data.viewMode === 'public') {
        this.pageSize = this.publicPageSize
        this.columns = this.publicColumns
      }
      this.lockLeft = data.lockLeft
      this.lockRight = data.lockRight
      this.scroll.x = 0 // 初始化表格可滚动宽度
      for (let i = 0; i < this.lockLeft; i++) {
        this.columns[i]['fixed'] = 'left'
        this.scroll.x -= Number(this.columns[i].width)
      }
      let keyLength = this.columns.length - 1
      for (let i = 0; i < this.lockRight; i++) {
        this.columns[keyLength]['fixed'] = 'right'
        this.scroll.x -= Number(this.columns[keyLength].width)
        keyLength--
      }
      this.refresh()
    },
    getTreeList () {
      const setting = JSON.parse(this.interactiveField.setting)
      this.axios({
        url: '/admin/dict/getChildren',
        data: {
          dictCategoryNumber: setting.form.src, parentDictDataNumber: null
        }
      }).then(res => {
        res.result.forEach(item => {
          if (!item.childCount) {
            item.isLeaf = true
          }
        })
        this.interactiveData[0].children = res.result
      })
    },
    onLoadInteractiveData (treeNode, item) {
      const { value } = treeNode.dataRef
      const setting = JSON.parse(this.interactiveField.setting)
      return new Promise((resolve) => {
        this.axios({
          url: '/admin/dict/getChildren',
          data: {
            dictCategoryNumber: setting.form.src, parentDictDataNumber: value
          }
        }).then(res => {
          res.result.forEach(item => {
            if (!item.childCount) {
              item.isLeaf = true
            }
          })
          treeNode.dataRef.children = res.result
          this.interactiveData = [...this.interactiveData]
          resolve()
        })
      })
    },
    interactiveSelect (selectedKeys) {
      this.interactiveObj = {
        [this.interactiveAlias]: selectedKeys.filter(item => item)
      }
      this.refresh()
    },
    searchTabs (val) {
      this.interactiveSearchValue = val
      this.interactivePage.pageNo = 1
      this.scrollStats = true
      if (val) {
        this.lastFetchId += 1
        const fetchId = this.lastFetchId
        this.fetching = true
        const setting = JSON.parse(this.interactiveField.setting)
        this.axios({
          url: '/admin/search/dictSearch',
          data: Object.assign({
            searchName: val,
            dictCategoryNumber: setting.form.src,
            filterDisabled: true
          }, this.interactivePage)
        }).then(res => {
          if (fetchId !== this.lastFetchId) {
            return
          }
          this.interactiveSearchData = res.result.data
          this.fetching = false
        })
      } else {
        this.interactiveSearchData = []
      }
    },
    getTabsScroll () {
      const setting = JSON.parse(this.interactiveField.setting)
      this.axios({
        url: '/admin/search/dictSearch',
        data: Object.assign({
          searchName: this.interactiveSearchValue,
          dictCategoryNumber: setting.form.src,
          filterDisabled: true
        }, this.interactivePage)
      }).then(res => {
        if (!res.result.data.length) {
          this.scrollStats = false
        }
        this.interactiveSearchData = [...this.interactiveSearchData, ...res.result.data]
      })
    },
    popupScroll (e) {
      const scrollTop = e.target.scrollTop
      const scrollHeight = e.target.scrollHeight
      const clientHeight = e.target.clientHeight
      const scrollBottom = scrollHeight - clientHeight - scrollTop
      if (scrollBottom < 1 && this.scrollStats && this.interactiveSearchValue) {
        this.interactivePage.pageNo++
        this.getTabsScroll()
      }
    },
    // 自定义列打开
    customShow () {
      this.$refs.userTableColumnCustom.show({
        title: this.$t('视图设置'),
        data: this.privateColumns,
        originData: this.publicColumns,
        templateId: this.templateId,
        tableId: this.tableId
      })
    },
    // 获取搜索栏级联选择数据
    getcascaderValue (val, alias) {
      const obj = {}
      obj[alias] = val
      this.form.setFieldsValue(obj)
    },
    handleConditionChange (e) {
      this.flowCondition = e.target.value
      this.refresh()
    },
    handleHighSearchMenu (val) {
      this.queryParam = {
        advanceSearch: val
      }
      this.refresh()
    },
    // 组合搜索改变列表值
    handleChange (action, data, index) {
      const obj = {}
      obj.id = data.id
      obj.setting = JSON.stringify(data)
      if (action === 'add') {
        this.customSearch.push(obj)
      } else if (action === 'edit') {
        this.customSearch.splice(index, 1, obj)
      } else {
        this.customSearch.splice(index, 1)
      }
      this.condiList = this.customSearch.length > 0 ? this.customSearch.map(item => {
        const obj = JSON.parse(item.setting)
        obj.id = item.id
        return obj
      }) : []
    },
    // 添加/编辑
    onShow (parameter) {
      parameter.jointable = this.params.jointable
      parameter.listThis = this
      parameter.width = parameter.width ? parameter.width : (parseInt(this.drawerType) === 0 ? parseInt(this.drawerFixedWidth) : `${this.drawerFixedWidth}%`)
      this.indexKey = this.indexKey ? 0 : 1
      this.$nextTick(() => {
        this.$refs.userTableForm.show(parameter)
      })
    },
    // 删除
    onDelete (parameter) {
      const that = this
      const id = parameter && parameter.record ? parameter.record.id : this.selectedRowKeys
      this.$confirm({
        title: parameter && parameter.title ? parameter.title : parameter ? this.$t('您确认要删除该记录吗？') : this.$t('您确认要删除选中的记录吗？'),
        onOk () {
          that.axios({
            url: parameter && parameter.url ? parameter.url : '/admin/general/delete',
            data: Object.assign({
              id: id,
              templateId: that.params.templateId
            }, parameter && parameter.data ? parameter.data : {})
          }).then(res => {
            that.refresh('noRefresh')
          })
        }
      })
    },
    // 批量编辑
    onBulkEdit (parameter) {
      this.$refs.userTableBulkEdit.show(Object.assign({
        title: this.$t('批量编辑'),
        url: '/admin/general/bulkEdit',
        templateId: this.params.templateId,
        tableId: this.tableId,
        totalCount: this.totalCount
      }, parameter))
    },
    // 创建流程
    handleCreate (parameter) {
      this.indexKey = this.indexKey ? 0 : 1
      this.$nextTick(() => {
        this.$refs.workflowHandleForm.show({
          config: {
            title: this.$t('创建流程') + ': ' + this.workflowName,
            width: 1200,
            tplviewUrl: parameter && parameter.tplviewUrl ? parameter.tplviewUrl : '/admin/wcase/add',
            url: parameter && parameter.url ? parameter.url : '/admin/wcase/add',
            workflowId: parameter && parameter.workflowId ? parameter.workflowId : this.workflowId,
            parameter: parameter && parameter.data ? parameter.data : {},
            viewType: 'create'
          },
          listThis: this
        })
      })
    },
    handleView (record, config) {
      this.indexKey = this.indexKey ? 0 : 1
      this.$nextTick(() => {
        this.$refs.workflowHandleForm.show({
          config: {
            title: this.$t('查看流程'),
            width: config && config.width ? config.width : 1200,
            tplviewUrl: '/admin/centerflow/viewOrder',
            caseId: record.caseId,
            viewType: 'view',
            flowCondition: this.flowCondition,
            templateId: this.templateId
          },
          record: record,
          listThis: this
        })
      })
    },
    handleProcess (record, config) {
      this.indexKey = this.indexKey ? 0 : 1
      this.$nextTick(() => {
        this.$refs.workflowHandleForm.show({
          config: {
            title: this.$t('办理流程'),
            width: config && config.width ? config.width : 1200,
            tplviewUrl: '/admin/centerflow/handleOrder',
            url: '/admin/workitem/processing',
            caseId: record.caseId,
            operation: 'process',
            viewType: 'handle',
            flowCondition: this.flowCondition
          },
          record: record,
          listThis: this
        })
      })
    },
    handleTakeProcess (record) {
      this.indexKey = this.indexKey ? 0 : 1
      this.$nextTick(() => {
        this.$refs.workflowHandleForm.show({
          config: {
            title: this.$t('办理流程'),
            width: 1200,
            tplviewUrl: '/admin/centerflow/handleOrder',
            url: '/admin/workitem/processing',
            caseId: record.caseId,
            viewType: 'handle',
            flowCondition: this.flowCondition,
            takeFlow: 1
          },
          record: record,
          listThis: this
        })
      })
    },
    handleDelete (record) {
      const me = this
      this.$confirm({
        title: this.$t('您确认要删除该流程吗？'),
        onOk () {
          me.axios({
            url: '/admin/wcase/delete',
            data: { caseId: record.caseId }
          }).then(res => {
            me.refresh()
          })
        }
      })
    },
    handleTakeFlow (record) {
      const that = this
      this.$confirm({
        title: that.$t('您确认要领取该数据吗？'),
        onOk () {
          that.axios({
            url: '/admin/workitem/processing',
            data: {
              handleWay: that.$t('领取'),
              operation: 'take',
              caseId: record.caseId
            }
          }).then(res => {
            if (res.code === 0) {
              that.$message.success(that.$t('领取成功'))
            } else {
              that.$message.error(res.message)
            }
            that.refresh()
          })
        }
      })
    },
    handleSubscribe (record) {
      const _this = this
      this.$confirm({
        title: _this.$t('提示'),
        content: _this.$t('是否关注该流程？'),
        maskClosable: true,
        onOk () {
          return new Promise((resolve, reject) => {
            _this.axios({
              url: '/admin/processEngine/subscribe',
              data: {
                caseId: record.caseId
              }
            }).then(res => {
              if (!res.code) {
                _this.$message.success(_this.$t('关注成功'))
              }
              setTimeout(() => {
                resolve()
                _this.refresh()
              }, 1000)
            })
          })
        },
        onCancel () { }
      })
    },
    handleUnsubscribe (record) {
      const _this = this
      this.$confirm({
        title: _this.$t('提示'),
        content: _this.$t('是否取消关注该流程？'),
        maskClosable: true,
        onOk () {
          return new Promise((resolve, reject) => {
            _this.axios({
              url: '/admin/processEngine/unsubscribe',
              data: {
                caseId: record.caseId
              }
            }).then(res => {
              setTimeout(() => {
                resolve()
                _this.refresh()
              }, 1000)
            })
          })
        },
        onCancel () { }
      })
    },
    // 录音播放
    onVideoPlay (file, url) {
      if (file) {
        const sourceUrl = `${this.$store.state.env.VUE_APP_API_BASE_URL}${url}${file}`
        this.$setSetting({ audioPlayData: { visible: true, sourceUrl: sourceUrl } })
      } else {
        this.$message.info('录音文件为空')
      }
    },
    // 录音下载
    onVideoDownload (file, url) {
      if (file) {
        window.open(`${this.$store.state.env.VUE_APP_API_BASE_URL}${url}${file}`)
      } else {
        this.$message.info('录音文件为空')
      }
    },
    // 导入
    onImport (parameter) {
      this.$refs.generalexport.show(Object.assign({
        title: this.$t('导入'),
        url: 'admin/api/importFile',
        templateId: this.params.templateId,
        tableId: this.tableId,
        type: 'import',
        windowType: 'config'
      }, parameter))
    },
    // 导出
    onExport (parameter) {
      this.exportKey = this.exportKey === 2 ? 3 : 2
      const data = this.queryParam.commonSearch ? this.queryParam.commonSearch : this.form.getFieldsValue()
      const condition = Object.assign({},
        this.queryParam,
        this.params,
        {
          sortField: this.sorter.sortField,
          sortOrder: this.sorter.sortOrder,
          commonSearch: !this.queryParam.advanceSearch ? data : undefined,
          associated: this.filtersData,
          flowCondition: this.flowCondition,
          pageNo: undefined,
          pageSize: undefined
        })
      Object.assign(data, this.interactiveObj)
      this.$nextTick(() => {
        this.$refs.generalexport.show(Object.assign({
          title: this.$t('导出'),
          url: '/admin/general/export',
          templateId: this.params.templateId,
          tableId: this.tableId,
          type: 'export',
          windowType: 'config',
          condition: condition,
          parameter: parameter?.windowType === '' ? { condition } : {},
          columns: this.columnsExport
        }, parameter))
      })
    },
    // 办理备注
    handleRemarks (record) {
      this.remarkKey = this.remarkKey === 'remark' ? 'remark_1' : 'remark'
      this.$nextTick(() => {
        this.$refs.userTableWorkflowRemarks.show({
          caseId: record.caseId
        })
      })
    },
    handleBatchSearch () {
      this.batchSearchKey = this.batchSearchKey === 'bulkSearch' ? 'batchSearch_1' : 'bulkSearch'
      const data = this.toolButtons.find(item => item.usage === 'sys_bulksearch')
      this.bulkSearch.field = data.searchField
      this.$nextTick(() => {
        this.$refs.userTableBatchSearch.show(this.bulkSearch)
      })
    },
    // 流转
    handleJump (record) {
      this.jumpKey = this.jumpKey === 'jump' ? 'jump_1' : 'jump'
      this.$nextTick(() => {
        this.$refs.userTableWorkflowJump.show({
          caseId: record.caseId
        })
      })
    },
    // 挂起
    handleHangUp (record) {
      const me = this
      this.$confirm({
        title: this.$t('您确认要挂起该流程吗？'),
        onOk () {
          me.axios({
            url: '/admin/workitem/processing',
            data: {
              action: 'suspend',
              handleWay: '挂起',
              operation: 'suspend',
              caseId: record.caseId
            }
          }).then(res => {
            me.refresh()
          })
        }
      })
    },
    // 激活
    handleActivate (record) {
      const me = this
      this.$confirm({
        title: this.$t('您确认要激活该流程吗？'),
        onOk () {
          me.axios({
            url: '/admin/workitem/processing',
            data: {
              action: 'activate',
              handleWay: '激活',
              operation: 'activate',
              caseId: record.caseId
            }
          }).then(res => {
            me.refresh()
          })
        }
      })
    },
    // 批量流转
    handleBatchJump () {
      this.jumpKey = this.jumpKey === 'jump' ? 'jump_1' : 'jump'
      this.$nextTick(() => {
        this.$refs.userTableWorkflowJump.show({
          workflowId: this.workflowId,
          data: this.selectedRows,
          url: '/admin/centerflow/blukJumpFlow',
          type: 'batch'
        })
      })
    },
    // 转办
    handleTransfer (record) {
      this.complaintKey = this.complaintKey === 'complaint' ? 'complaint_1' : 'complaint'
      this.$nextTick(() => {
        this.$refs.userTableWorkflowComplaint.show({
          caseId: record.caseId
        })
      })
    },
    // 取消
    handleTerminate (record, type) {
      if (record.gdbh && record.gdbh.includes('WX') && !type) {
        type = 'WX'
      }
      this.terminateKey = this.terminateKey === 'terminate' ? 'terminate_1' : 'terminate'
      this.$nextTick(() => {
        this.$refs.userTableWorkflowTerminate.show({
          caseId: record.caseId,
          record: record,
          type: type,
          templateId: this.templateId
        })
      })
    },
    handleBatchTerminate () {
      this.terminateKey = this.terminateKey === 'terminate' ? 'terminate_1' : 'terminate'
      this.$nextTick(() => {
        this.$refs.userTableWorkflowTerminate.show({
          workflowId: this.workflowId,
          data: this.selectedRows,
          url: '/admin/centerflow/bulkCancelFlow',
          type: 'batch',
          templateId: this.templateId
        })
      })
    },
    // 催办
    handleUrge (record) {
      this.urgeKey = this.urgeKey === 'urge' ? 'urge_1' : 'urge'
      this.$nextTick(() => {
        this.$refs.userTableWorkflowUrge.show({
          caseId: record.caseId,
          record
        })
      })
    },
    // 确认选择（工具栏按钮）
    handleConfirm () {
      this.$emit('ok', this.selectedRows, 'line')
    },
    // 确认选择并关闭（工具栏按钮）
    handleConfirmClose () {
      this.$emit('ok', this.selectedRows)
    },
    // 选择 （行按钮）
    handleSelect (record) {
      if (this.params.type === 'webSubformDataWindow') {
        const val = [record]
        this.$emit('ok', val, 'line')
      } else if (this.params.type === 'associated') {
        this.axios({
          url: '/admin/general/getAssociated',
          data: { tableId: this.tableId, id: record.id }
        }).then(res => {
          if (res.code === 0) {
            this.$emit('ok', res.result, 'associated', this.screenData)
          }
        })
      }
    },
    // 选择并关闭（行按钮）
    handleSelectClose (record) {
      if (this.params.type === 'webSubformDataWindow') {
        const val = [record]
        this.$emit('ok', val)
      } else if (this.params.type === 'associated') {
        this.axios({
          url: '/admin/general/getAssociated',
          data: { tableId: this.tableId, id: record.id }
        }).then(res => {
          if (res.code === 0) {
            this.$emit('ok', res.result, 'associated', this.screenData)
          }
        })
      }
    },
    // 生成唯一ID
    uuid (n) {
      n = 1 // 生成一个唯一id，包含数字和字母
      var random = function () {
        // 生成10-12位不等的字符串
        return Number(
          Math.random()
            .toString()
            .substr(2)
        ).toString(36) // 转换成十六进制
      }
      var arr = []

      function createId () {
        var num = random()
        var _bool = false
        arr.forEach(v => {
          if (v === num) _bool = true
        })
        if (_bool) {
          createId()
        } else {
          arr.push(num)
        }
      }

      var i = 0
      while (i < n) {
        createId()
        i++
      }
      return arr[0] // 将生成的转为我们需要的字符串并赋值
    },
    // 组织结构options转换
    optionsConversion (record, list, displayType, searchType) {
      if (record.field.setting.form.optionType === 'department') {
        if (searchType) {
          return list.map(item => {
            const obj = item
            obj.key = item.departmentId
            obj.label = item.fullDepartmentName
            return obj
          })
        } else {
          return list.map(item => {
            const obj = item
            obj.key = item.departmentId
            obj.label = item.departmentName
            return obj
          })
        }
      } else if (record.field.setting.form.optionType === 'role') {
        return list.map(item => {
          const obj = item
          obj.key = item.roleId
          obj.label = item.roleName
          return obj
        })
      } else {
        return list.map(item => {
          const obj = item
          obj.key = item.username
          obj.label = `${item.username}(${item.realName})`
          return obj
        })
      }
    },
    // 组织结构options转换
    optionsConversionTreeselect (record, list, displayType, searchType) {
      if (record.field.setting.attribute.dataSource === 'addressBook') {
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
    // 数据处理，主要用于发送一个请求到后面，后端进行简单的逻辑处理，如删除数据，标记数据状态等
    onRequest (parameter) {
      const me = this
      if (parameter.confirm) {
        this.$confirm({
          title: parameter.confirm.title || this.$t('您确认要处理该记录吗？'),
          okText: parameter.confirm.okText || this.$t('确定'),
          okType: parameter.confirm.okType || 'primary',
          cancelText: parameter.confirm.cancelText || this.$t('取消'),
          onOk () {
            me.axios({
              url: parameter.url,
              data: Object.assign(parameter, me.params)
            }).then(res => {
              if (res.code === 0) {
                me.$message.info(res.message)
              } else {
                me.$message.warning(res.message)
              }
              me.refresh()
            })
          }
        })
      } else {
        this.axios({
          url: parameter.url,
          data: Object.assign(parameter, me.params)
        }).then(res => {
          if (res.code === 0) {
            me.$message.info(res.message)
          } else {
            me.refresh()
          }
          me.$message.warning(res.message)
        })
      }
    },
    resetAll () {
      this.queryParam = {}
      this.template.forEach(item => {
        if (item.type === 'multiFieldSearch') {
          item.searchValue = undefined
        } else if (item.type === 'searchTemplate') {
          item.searchValue = undefined
        }
      })
      this.searchString = {}
      this.clearAddress()
      if (this.$refs.dataPicker) {
        this.$refs.dataPicker.forEach(item => {
          item.reset()
        })
      }
      this.form.resetFields()
      this.timeObj = {}
      this.handleSearch({ tag: false })
    },
    handleSearch (parameter) {
      const { form } = this
      if (parameter.tag) {
        const search = form.getFieldsValue()
        const otherSearch = this.queryParam.commonSearch || {}
        const commonSearch = Object.assign(otherSearch, search)
        this.queryParam = {
          commonSearch
        }
        if (Object.keys(this.timeObj).length) {
          Object.assign(this.queryParam.commonSearch, this.timeObj)
        }
      } else {
        this.queryParam = {}
      }
      this.refresh()
    },
    changeAdvancedSearch () {
      this.advancedSearch = !this.advancedSearch
    },
    // 下拉框数据源
    getOption (item, value) {
      if (item.field.setting.form.loadMode === 'dynamic') {
        clearTimeout(this.selectTimeout)
        this.selectTimeout = setTimeout(() => {
          const src = item.field.setting.form.src
          if (value) {
            this.axios({
              url: '/admin/search/dictSearch',
              data: {
                dictCategoryNumber: src,
                searchName: value
              }
            }).then(res => {
              item.field.option = res.result
            })
          } else {
            item.field.option = []
          }
        }, 300)
      } else if (item.field.setting.attribute.dataSource === 'otherTable') {
        clearTimeout(this.selectTimeout)
        this.selectTimeout = setTimeout(() => {
          const form = item.field.setting.form
          if (value) {
            this.axios({
              url: '/admin/general/getAnyTableData',
              data: {
                tableId: form.otherTable[1],
                fieldName: form.otherTableField,
                condition: value
              }
            }).then(res => {
              item.field.option = res.result
            })
          } else {
            item.field.option = []
          }
        }, 300)
      }
    },
    getPermittedWorkflows () { },
    handMenu (payload) {
      const workflowId = this.permittedWorkflows[payload.key].workflowId
      this.workflowName = this.permittedWorkflows[payload.key].workflowName
      this.handleCreate({
        workflowId
      })
    },
    checkButtonPermissions (rowItem, record, activeButtons, menuArr, workflowType) {
      const funcStr = `return (_this, record) => {  return ${rowItem.attribute} }`
      // eslint-disable-next-line no-new-func
      const func = new Function(funcStr)
      const obj = func()(this, record)
      if (obj && obj.template) {
        obj.template = obj.template.replace(/[\r\n]/g, '')
      }
      const Menu = obj
      if (workflowType === 'custom') {
        menuArr.push(Menu)
        return
      }
      if (rowItem.usage === 'flow_process') {
        if (['all_process', 'my_entrust'].indexOf(this.flowCondition) > -1) {
          menuArr.push(Menu)
        }
        const takeButton = activeButtons.filter(im => im.usage === 'flow_takeprocess' || im.usage === 'flow_take')
        if (['my_process', 'my_subscribe'].indexOf(this.flowCondition) > -1 && record.processCurrentUsers === this.userInfo.username) {
          menuArr.push(Menu)
        } else if (takeButton.length === 0 && this.flowCondition === 'my_process' && record.processCurrentUsers && record.processCurrentUsers.includes(this.userInfo.username)) {
          menuArr.push(Menu)
        }
      } else if (rowItem.usage === 'flow_takeprocess') {
        if (this.userInfo.username !== record.processCurrentUsers) {
          menuArr.push(Menu)
        }
      } else if (rowItem.usage === 'flow_take') {
        if (this.userInfo.username !== record.processCurrentUsers) {
          menuArr.push(Menu)
        }
      } else if (rowItem.usage === 'flow_remarks') {
        if (['op'].indexOf(record.caseStatus) > -1) {
          menuArr.push(Menu)
        }
      } else if (rowItem.usage === 'flow_subscribe') {
        if (!record.processSubscribeUsers) {
          menuArr.push(Menu)
        } else if (!record.processSubscribeUsers.split(',').includes(this.userInfo.username)) {
          menuArr.push(Menu)
        }
      } else {
        menuArr.push(Menu)
      }
    },
    // 根据展示的行数，动态计算所需行高
    defaultRowsHeight () {
      this.initMount = false // 避免页面循环渲染
      const searchRow = document.getElementById('search-row')
      const searchCols = Array.from(searchRow.getElementsByClassName('search-col'))
      const reg = /ant-col-[0-9]{1,2}/g
      const heightList = [] // 每行的高度列表
      let heightRows = [] // 每行每个筛选器的高度列表
      let rowAll = 0
      for (let i = 0; i < searchCols.length; i++) {
        const classNameCol = searchCols[i].className.match(reg) // 获取每个筛选器所占栅格数
        const colSpan = Number(classNameCol[0].split('-')[2])
        rowAll += colSpan
        const max = Math.max.apply(null, heightRows) // 取每行所有筛选器的高度的最大值
        if (i === searchCols.length - 1) {
          heightList.push(max)
        } else if (rowAll <= 24) {
          heightRows.push(searchCols[i].offsetHeight)
        } else {
          heightList.push(max)
          rowAll = colSpan
          heightRows = []
          heightRows.push(searchCols[i].offsetHeight)
        }
      }
      let resultHeight = 0
      heightList.forEach((item, index) => {
        if (index < this.defaultRows) {
          resultHeight += item
        }
      })
      return resultHeight + 'px'
    }
  }
}
</script>
<style lang="less" scoped>
// 使用scoped无法修改到css属性
.dropdown {
  /deep/ button {
    margin-right: 0;
  }
}

.tabsHeight {
  /deep/ .ant-tabs-top-content,
  /deep/ .ant-tabs-bottom-content {
    height: calc(100% - 50px);
  }
}

.userTableTagColor {
  span {
    margin: 0 4px;
    border: 1px solid #d9d9d9;
    background: #fafafa;
    color: rgba(0, 0, 0, 0.85);
    padding: 2px 8px;
    font-size: 12px;
    border-radius: 2px;
  }

  .tagRed {
    color: #f5222d !important;
    background: #fff1f0 !important;
    border-color: #ffa39e !important;
  }

  .tagBlue {
    color: #1890ee !important;
    background: #e6f7fe !important;
    border-color: #91d5fe !important;
  }
}

.form.normal {
  flex-flow: row wrap !important;
}
</style>
