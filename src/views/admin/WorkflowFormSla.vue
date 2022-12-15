<template>
  <div>
    <a-card size="small" :bordered="false">
      <div class="table-operator">
        <a-button v-action:add icon="plus" @click="handleAdd">{{ $t('添加') }}</a-button>
      </div>
      <a-table
        ref="table"
        size="small"
        rowKey="id"
        :columns="columns"
        :dataSource="slaDataArr"
        :pagination="false"
        :sorter="{ field: 'id', order: 'descend' }"
      >
        <div slot="action" slot-scope="text, record, index">
          <a @click="handleEdit(record, index)">{{ $t('编辑') }}</a>
          <a-divider type="vertical" />
          <a-popconfirm
            :title="$t('您确定要删除该记录吗?')"
            :ok-text="$t('确定')"
            :cancel-text="$t('取消')"
            @confirm="handleDelete(index)"
          >
            <a>{{ $t('删除') }}</a>
          </a-popconfirm>
        </div>
        <div slot="sort" slot-scope="text, record, index">
          <span>{{ index + 1 }}</span>
        </div>
        <div slot="executionTime" slot-scope="text, record">
          <span v-if="record.execute.time.type === 'restrictTimeArrived'">
            {{ workflowtype === 'work' ? $t('流程') : '变迁' }}{{ $t('时限到达时') }}
          </span>
          <span v-else-if="record.execute.time.type === 'beforeRestrictTime'">
            {{ workflowtype === 'work' ? $t('流程') : $t('变迁') }}{{ $t('时限到达前') }}
          </span>
          <span v-else-if="record.execute.time.type === 'afterRestrictTime'">
            {{ workflowtype === 'work' ? $t('流程') : $t('变迁') }}{{ $t('时限到达后') }}
          </span>
          <span v-else-if="record.execute.time.type === 'warnTimeArrived'">
            {{ workflowtype === 'work' ? $t('流程') : $t('变迁') }}{{ $t('预警时') }}
          </span>
          <span v-else-if="record.execute.time.type === 'seriousTimeArrived'">
            {{ workflowtype === 'work' ? $t('流程') : $t('变迁') }}{{ $t('超时时') }}
          </span>
          <span v-else-if="record.execute.time.type === 'onCurrentTime'">{{ $t('sla生成时') }}</span>
          <span v-else-if="record.execute.time.type === 'afterCurrentTime'">{{ $t('sla生成后') }}</span>
          <span v-else>--</span>
        </div>
        <div slot="generate" slot-scope="text, record">
          <span v-if="record.generate && record.generate.type === 'case_create'">
            {{ $t('流程创建时') }}
          </span>
          <span v-else-if="record.generate && record.generate.type === 'case_urge'">
            {{ $t('流程催办时') }}
          </span>
          <span v-else-if="record.generate && record.generate.type === 'workitem_create'">
            {{ $t('变迁启用时') }}
          </span>
          <span v-else-if="record.generate && record.generate.type === 'workitem_urge'">
            {{ $t('变迁被催办时') }}
          </span>
          <span v-else-if="record.generate && record.generate.type === 'workitem_launch'">
            {{ $t('变迁发射时') }}
          </span>
          <span v-else>--</span>
        </div>
        <div slot="runaction" slot-scope="text, record">
          <span>
            {{ record.execute.action.customCirculate.enable ? $t('自定义跳转') : '' }}
            {{ record.execute.action.autoHandle.enable ? $t('自动办理') : '' }}
            {{ record.execute.action.sendNotice.enable ? $t('发送通知') : '' }}
            {{ record.execute.action.customHandle.enable ? $t('自定义动作') : '' }}
          </span>
        </div>
      </a-table>
    </a-card>
    <a-drawer :destroyOnClose="true" :title="config.title" :width="1200" :visible="visible" @close="visible = !visible">
      <a-spin :spinning="loading">
        <div>
          <a-form :form="form">
            <a-form-item :label="$t('SLA名称')" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="[
                  'info[name]',
                  {
                    initialValue: config.data && config.data.name ? config.data.name : '',
                    rules: [{ required: true, message: $t('请输入SLA名称') }]
                  }
                ]"
              />
            </a-form-item>
            <a-form-item :label="$t('SLA描述')" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea
                v-decorator="[
                  'info[describe]',
                  { initialValue: config.data && config.data.describe ? config.data.describe : '' }
                ]"
                :auto-size="{ minRows: 1, maxRows: 5 }"
              />
            </a-form-item>
            <a-form-item :label="$t('生成时机')" :labelCol="labelCol" :wrapperCol="{ span: 4 }">
              <a-select
                v-decorator="[
                  'info[generate][type]',
                  {
                    initialValue:
                      config.data.generate.type || (workflowtype === 'work' ? 'case_create' : 'workitem_create'),
                    rules: [{ required: true, message: $t('请选择生成时机') }]
                  }
                ]"
                @change="
                  (e) => {
                    config.data.generate.type = e
                  }
                "
              >
                <template v-if="workflowtype === 'work'">
                  <a-select-option value="case_create">{{ $t('流程创建时') }}</a-select-option>
                  <a-select-option value="case_urge">{{ $t('流程催办时') }}</a-select-option>
                </template>
                <template v-else>
                  <a-select-option value="workitem_create">{{ $t('变迁启用时') }}</a-select-option>
                  <a-select-option value="workitem_urge">{{ $t('变迁被催办时') }}</a-select-option>
                  <a-select-option value="workitem_launch">{{ $t('变迁发射时') }}</a-select-option>
                </template>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('生成条件')" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-card size="small">
                <a-row type="flex" align="middle">
                  <a-col :span="22">
                    <a-row
                      v-for="(simpleItem, simpleIndex) in config.data.generate.conditionSetting.conditionVisual"
                      :key="simpleIndex"
                      type="flex"
                      align="middle"
                      :gutter="10"
                      style="padding: 5px 0"
                    >
                      <a-col :span="4">
                        <a-select
                          v-model="simpleItem.type"
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
                              } else if (
                                value === 'currentUser' ||
                                value === 'currentDepartment' ||
                                value === 'currentRole'
                              ) {
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
                          <a-select-option value="notSet">{{ $t('无条件') }}</a-select-option>
                          <a-select-option value="field">{{ $t('字段') }}</a-select-option>
                          <a-select-option value="currentUser">{{ $t('创建人') }}</a-select-option>
                          <a-select-option value="currentDepartment">{{ $t('创建人部门') }}</a-select-option>
                          <a-select-option value="currentRole">{{ $t('创建人角色') }}</a-select-option>
                          <a-select-option value="urgeTimes">
                            {{ workflowtype === 'work' ? $t('流程') : $t('变迁') }}{{ $t('催办次数') }}
                          </a-select-option>
                          <a-select-option v-if="workflowtype === 'flow'" value="transitionFrom">
                            {{ $t('来自于变迁') }}
                          </a-select-option>
                          <a-select-option value="custom">{{ $t('自定义') }}</a-select-option>
                        </a-select>
                      </a-col>
                      <a-col v-if="simpleItem.type === 'custom'" :span="18">
                        <a-row type="flex" align="middle">
                          <a-col :span="24">
                            <querier-codemirror-input
                              ref="querierCodemirrorInput"
                              :params.sync="simpleItem.customCode"
                            />
                          </a-col>
                          <div
                            style="position: absolute; right: 15px; cursor: pointer; z-index: 10"
                            size="small"
                            @click="
                              $refs['customCodemirrors' + simpleIndex][0].show({
                                title: $t('公式编辑器'),
                                item: simpleItem,
                                tableId: condition.tableId
                              })
                            "
                          >
                            fx
                          </div>
                          <custom-codemirror
                            :ref="'customCodemirrors' + simpleIndex"
                            @ok="
                              (val) => {
                                $set(simpleItem, 'customCode', val)
                              }
                            "
                          />
                        </a-row>
                      </a-col>
                      <a-col v-if="simpleItem.type === 'notSet'" :span="18"></a-col>
                      <a-col v-if="simpleItem.type === 'urgeTimes' || simpleItem.type === 'transitionFrom'" :span="18">
                        <div v-if="simpleItem.type === 'transitionFrom'">
                          <a-row type="flex" align="middle">
                            <a-col flex="auto">
                              <a-row
                                v-for="(includeItem, includeIndex) in simpleItem.condition"
                                :key="includeIndex"
                                :gutter="[8, 8]"
                                type="flex"
                                align="middle"
                              >
                                <a-col :span="12">
                                  <a-select
                                    v-model="includeItem.transitionFromVal"
                                    style="width: 100%"
                                    :placeholder="$t('请选择变迁')"
                                    size="small"
                                    @change="
                                      (e) => {
                                        includeItem.transitionFromWay = undefined
                                        for (const i in allWayData) {
                                          if (i.includes(e)) {
                                            includeItem.showWay = allWayData[i]
                                          }
                                        }
                                      }
                                    "
                                  >
                                    <a-select-option
                                      v-for="value in transition"
                                      :key="value.cc"
                                      :value="value.transitionId"
                                    >
                                      {{ value.transitionName }}
                                    </a-select-option>
                                  </a-select>
                                </a-col>
                                <a-col flex="70px">{{ $t('办理方式 :') }}</a-col>
                                <a-col flex="auto">
                                  <a-select
                                    v-model="includeItem.transitionFromWay"
                                    style="width: 100%"
                                    allowClear
                                    :placeholder="$t('请选择办理方式')"
                                    size="small"
                                    @change="
                                      (e) => {
                                        $forceUpdate()
                                      }
                                    "
                                  >
                                    <a-select-option
                                      v-for="value in includeItem.showWay"
                                      :key="value.alias"
                                      :value="value.alias"
                                    >
                                      {{ value.way }}
                                    </a-select-option>
                                  </a-select>
                                </a-col>
                                <a-col flex="70px" style="display: flex; align-items: center">
                                  <a-icon
                                    :style="{ fontSize: '24px', color: '#52c41a' }"
                                    type="plus-square"
                                    theme="filled"
                                    @click="
                                      simpleItem.type === 'field'
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
                                    @click="
                                      simpleItem.condition.length === 1
                                        ? ''
                                        : simpleItem.condition.splice(includeIndex, 1)
                                    "
                                  />
                                </a-col>
                              </a-row>
                            </a-col>
                            <a-col flex="80px">
                              <a-select v-model="simpleItem.logic" style="width: 100%" size="small">
                                <a-select-option value="and">{{ $t('且(and)') }}</a-select-option>
                                <a-select-option value="or">{{ $t('或(or)') }}</a-select-option>
                              </a-select>
                            </a-col>
                          </a-row>
                        </div>
                        <div v-else-if="simpleItem.type === 'urgeTimes'">
                          <a-row :gutter="10">
                            <a-col :span="4">
                              <a-select v-model="simpleItem.urgeSymbol" size="small">
                                <a-select-option value="eq">{{ $t('等于') }}</a-select-option>
                                <a-select-option value="ge">{{ $t('大于等于') }}</a-select-option>
                              </a-select>
                            </a-col>
                            <a-col :span="12">
                              <a-input-number v-model="simpleItem.urgeTimes" size="small" :min="0" />
                            </a-col>
                          </a-row>
                        </div>
                      </a-col>
                      <a-col
                        v-if="
                          simpleItem.type === 'field' &&
                          simpleItem.type !== 'custom' &&
                          simpleItem.type !== 'notSet' &&
                          simpleItem.type !== 'urgeTimes' &&
                          simpleItem.type !== 'transitionFrom'
                        "
                        :span="4"
                      >
                        <a-select
                          v-if="simpleItem.type === 'field'"
                          v-model="simpleItem.alias"
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
                              fieldArr.forEach((item1) => {
                                if (item1.alias === value) {
                                  item1.settings = JSON.parse(item1.setting)
                                  // 判断是否有数据字典
                                  simpleItem.src = item1.settings.form.src ? item1.settings.form.src : ''
                                  simpleItem.formType = item1.formType
                                  simpleItem.fieldId = item1.fieldId
                                  simpleItem.fieldType = item1.fieldType
                                  if (simpleItem.src && item1.formType === 'treeselect') {
                                    getTreeOption(simpleItem, item1)
                                  } else if (item1.formType === 'tag' && !tagOption.length) {
                                    getTagOption()
                                    simpleItem.condition = [
                                      {
                                        include: '',
                                        value: []
                                      }
                                    ]
                                  } else if (item1.formType === 'tag') {
                                    simpleItem.condition = [
                                      {
                                        include: '',
                                        value: []
                                      }
                                    ]
                                  } else if (simpleItem.src) {
                                    getOption(simpleItem)
                                  } else if (item1.formType === 'treeselect') {
                                    simpleItem.dataSource = item1.settings.attribute.dataSource
                                    getTreeOption(simpleItem, item1)
                                  } else {
                                    simpleItem.option = []
                                  }
                                  simpleItem.form = item1.settings.form
                                  // 根据字段，给出相应条件
                                  if (['text', 'textarea'].indexOf(item1.formType) !== -1) {
                                    simpleItem.condiArr = [
                                      { enName: 'eq', cnName: $t('等于') },
                                      { enName: 'ne', cnName: $t('不等于') },
                                      { enName: 'cn', cnName: $t('包含') },
                                      { enName: 'nc', cnName: $t('不包含') },
                                      { enName: 'bw', cnName: $t('开始于') },
                                      { enName: 'ew', cnName: $t('结束于') },
                                      { enName: 'em', cnName: $t('为空') },
                                      { enName: 'nem', cnName: $t('不为空') }
                                    ]
                                  } else if (['radio', 'checkbox', 'combobox'].indexOf(item1.formType) !== -1) {
                                    simpleItem.condiArr = [
                                      { enName: 'eq', cnName: $t('等于') },
                                      { enName: 'ne', cnName: $t('不等于') },
                                      { enName: 'em', cnName: $t('为空') },
                                      { enName: 'nem', cnName: $t('不为空') }
                                    ]
                                  } else if (['number', 'datetime'].indexOf(item1.formType) !== -1) {
                                    simpleItem.condiArr = [
                                      { enName: 'eq', cnName: $t('等于') },
                                      { enName: 'ne', cnName: $t('不等于') },
                                      { enName: 'gt', cnName: $t('大于') },
                                      { enName: 'ge', cnName: $t('大于等于') },
                                      { enName: 'lt', cnName: $t('小于') },
                                      { enName: 'le', cnName: $t('小于等于') },
                                      { enName: 'em', cnName: $t('为空') },
                                      { enName: 'nem', cnName: $t('不为空') }
                                    ]
                                  } else if (
                                    ['cascader', 'address', 'treeselect', 'tag'].indexOf(item1.formType) !== -1
                                  ) {
                                    simpleItem.condiArr = [
                                      { enName: 'cn', cnName: $t('包含') },
                                      { enName: 'nc', cnName: $t('不包含') },
                                      { enName: 'em', cnName: $t('为空') },
                                      { enName: 'nem', cnName: $t('不为空') }
                                    ]
                                  } else if (['associated'].indexOf(item1.formType) !== -1) {
                                    simpleItem.condiArr = [
                                      { enName: 'eq', cnName: $t('等于') },
                                      { enName: 'ne', cnName: $t('不等于') },
                                      { enName: 'cn', cnName: $t('包含') },
                                      { enName: 'nc', cnName: $t('不包含') },
                                      { enName: 'bw', cnName: $t('开始于') },
                                      { enName: 'ew', cnName: $t('结束于') },
                                      { enName: 'em', cnName: $t('为空') },
                                      { enName: 'nem', cnName: $t('不为空') }
                                    ]
                                  }
                                }
                              })
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
                          simpleItem.type !== 'field' &&
                          simpleItem.type !== 'custom' &&
                          simpleItem.type !== 'notSet' &&
                          simpleItem.type !== 'urgeTimes' &&
                          simpleItem.type !== 'transitionFrom'
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
                        v-if="
                          simpleItem.type !== 'custom' &&
                          simpleItem.type !== 'notSet' &&
                          simpleItem.type !== 'urgeTimes' &&
                          simpleItem.type !== 'transitionFrom'
                        "
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
                              style="padding: 5px 0"
                            >
                              <a-col v-if="simpleItem.type === 'field'" :span="6">
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
                                    v-for="(crItem, crIndex) in simpleItem.condiArr"
                                    :key="crIndex"
                                    option-filter-prop="children"
                                    :value="crItem.enName"
                                  >
                                    {{ crItem.cnName }}
                                  </a-select-option>
                                </a-select>
                              </a-col>
                              <a-col v-if="simpleItem.type === 'field'" :span="14">
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
                                      :value="fieldItem && fieldItem.value"
                                    >
                                      {{ fieldItem && fieldItem.label }}
                                    </a-select-option>
                                  </a-select>
                                  <div v-else>
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
                                </template>
                                <template v-else>
                                  <a-input type="text" disabled size="small" />
                                </template>
                              </a-col>
                              <a-col
                                v-else-if="simpleItem.type === 'currentUser'"
                                :span="20"
                                style="padding-right: 14px"
                              >
                                <a-row type="flex" align="middle">
                                  <a-col :span="23">
                                    <a-select
                                      v-model="includeItem.value"
                                      size="small"
                                      allowClear
                                      mode="multiple"
                                      :open="false"
                                      :placeholder="$t('请选择')"
                                      :showSearch="false"
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
                                v-else-if="simpleItem.type === 'currentDepartment'"
                                :span="20"
                                style="padding-right: 14px"
                              >
                                <a-row type="flex" align="middle">
                                  <a-col :span="23">
                                    <a-select
                                      v-model="includeItem.value"
                                      size="small"
                                      allowClear
                                      mode="multiple"
                                      :open="false"
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
                                          recordKey.simpleIndex = simpleIndex
                                          recordKey.includeIndex = includeIndex
                                          recordKey.type = 'department'
                                          $refs.selectDepartment.show({
                                            optionCustom: [],
                                            option: includeItem.department || [],
                                            optionType: 'department',
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
                                v-else-if="simpleItem.type === 'currentRole'"
                                :span="20"
                                style="padding-right: 14px"
                              >
                                <a-row type="flex" align="middle">
                                  <a-col :span="23">
                                    <a-select
                                      v-model="includeItem.value"
                                      size="small"
                                      allowClear
                                      :placeholder="$t('请选择角色')"
                                      :open="false"
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
                                          recordKey.simpleIndex = simpleIndex
                                          recordKey.includeIndex = includeIndex
                                          recordKey.type = 'role'
                                          $refs.selectDepartment.show({
                                            optionCustom: [],
                                            option: includeItem.role || [],
                                            optionType: 'role',
                                            selectValue: includeItem.value,
                                            mode: 'multiple',
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
                                    simpleItem.type === 'field'
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
                                    'padding-left': '5px'
                                  }"
                                  type="minus-square"
                                  theme="filled"
                                  @click="
                                    simpleItem.condition.length === 1
                                      ? ''
                                      : simpleItem.condition.splice(includeIndex, 1)
                                  "
                                />
                              </a-col>
                            </a-row>
                          </a-col>
                          <a-col
                            v-if="
                              simpleItem.type !== 'custom' &&
                              simpleItem.type !== 'urgeTimes' &&
                              simpleItem.type !== 'transitionFrom'
                            "
                            flex="80px"
                          >
                            <a-select v-model="simpleItem.logic" style="width: 80px" size="small">
                              <a-select-option value="and">{{ $t('且(and)') }}</a-select-option>
                              <a-select-option value="or">{{ $t('或(or)') }}</a-select-option>
                            </a-select>
                          </a-col>
                        </a-row>
                      </a-col>
                      <a-col flex="70px" style="display: flex; align-items: center; justify-content: center">
                        <a-icon
                          :style="{ fontSize: '24px', color: '#52c41a' }"
                          type="plus-square"
                          theme="filled"
                          @click="
                            config.data.generate.conditionSetting.conditionVisual.push({
                              type: 'field',
                              alias: '',
                              src: '',
                              condiArr: [],
                              customCode: {
                                html: '',
                                value: ''
                              },
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
                            color:
                              config.data.generate.conditionSetting.conditionVisual.length === 1
                                ? '#bfbfbf'
                                : '#ff4d4f',
                            'padding-left': '5px'
                          }"
                          type="minus-square"
                          theme="filled"
                          @click="
                            config.data.generate.conditionSetting.conditionVisual.length === 1
                              ? ''
                              : config.data.generate.conditionSetting.conditionVisual.splice(simpleIndex, 1)
                          "
                        />
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col flex="80px">
                    <a-select
                      v-if="config.data.generate.conditionSetting.conditionVisual.length > 0"
                      v-model="config.data.generate.conditionSetting.logic"
                      style="width: 80px"
                      size="small"
                    >
                      <a-select-option value="and">{{ $t('且(and)') }}</a-select-option>
                      <a-select-option value="or">{{ $t('或(or)') }}</a-select-option>
                    </a-select>
                  </a-col>
                </a-row>
              </a-card>
            </a-form-item>
            <a-form-item :label="$t('执行时机')" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-row :gutter="10">
                <a-col :span="6">
                  <a-select
                    v-decorator="[
                      'info[execute][time][type]',
                      {
                        initialValue: config.data.execute.time.type,
                        rules: [{ required: true, message: $t('请选择执行时机') }]
                      }
                    ]"
                    @change="
                      (e) => {
                        $set(config.data.execute.time, 'type', e)
                      }
                    "
                  >
                    <a-select-option value="restrictTimeArrived">
                      {{ workflowtype === 'work' ? $t('流程') : $t('变迁') }}{{ $t('时限到达时') }}
                    </a-select-option>
                    <a-select-option value="beforeRestrictTime">
                      {{ workflowtype === 'work' ? $t('流程') : $t('变迁') }}{{ $t('时限到达前') }}
                    </a-select-option>
                    <a-select-option value="afterRestrictTime">
                      {{ workflowtype === 'work' ? $t('流程') : $t('变迁') }}{{ $t('时限到达后') }}
                    </a-select-option>
                    <a-select-option value="warnTimeArrived">
                      {{ workflowtype === 'work' ? $t('流程') : $t('变迁') }}{{ $t('预警时') }}
                    </a-select-option>
                    <a-select-option value="seriousTimeArrived">
                      {{ workflowtype === 'work' ? $t('流程') : $t('变迁') }}{{ $t('超时时') }}
                    </a-select-option>
                    <a-select-option value="onCurrentTime">
                      {{ $t('sla生成时') }}
                    </a-select-option>
                    <a-select-option value="afterCurrentTime">
                      {{ $t('sla生成后') }}
                    </a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="18">
                  <div v-if="config.data.execute.time.type === 'beforeRestrictTime'">
                    <a-input-number v-model="config.data.execute.time.beforeRestrictTime.timeDay" :min="0" />
                    <span style="padding: 0 5px 0 5px">{{ $t('天') }}</span>
                    <a-input-number v-model="config.data.execute.time.beforeRestrictTime.timeHour" :min="0" :max="23" />
                    <span style="padding: 0 5px 0 5px">{{ $t('小时') }}</span>
                    <a-input-number
                      v-model="config.data.execute.time.beforeRestrictTime.timeMinute"
                      :min="0"
                      :max="59"
                    />
                    <span style="padding-left: 5px">{{ $t('分钟') }}</span>
                  </div>
                  <div v-else-if="config.data.execute.time.type === 'afterRestrictTime'">
                    <a-input-number v-model="config.data.execute.time.afterRestrictTime.timeDay" :min="0" />
                    <span style="padding: 0 5px 0 5px">{{ $t('天') }}</span>
                    <a-input-number v-model="config.data.execute.time.afterRestrictTime.timeHour" :min="0" :max="23" />
                    <span style="padding: 0 5px 0 5px">{{ $t('小时') }}</span>
                    <a-input-number
                      v-model="config.data.execute.time.afterRestrictTime.timeMinute"
                      :min="0"
                      :max="59"
                    />
                    <span style="padding-left: 5px">{{ $t('分钟') }}</span>
                  </div>
                  <div v-else-if="config.data.execute.time.type === 'afterCurrentTime'">
                    <a-input-number v-model="config.data.execute.time.afterCurrentTime.timeDay" :min="0" />
                    <span style="padding: 0 5px 0 5px">{{ $t('天') }}</span>
                    <a-input-number v-model="config.data.execute.time.afterCurrentTime.timeHour" :min="0" :max="23" />
                    <span style="padding: 0 5px 0 5px">{{ $t('小时') }}</span>
                    <a-input-number v-model="config.data.execute.time.afterCurrentTime.timeMinute" :min="0" :max="59" />
                    <span style="padding-left: 5px">{{ $t('分钟') }}</span>
                  </div>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item :label="$t('执行动作')" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-checkbox-group
                v-decorator="[
                  'runaction',
                  { initialValue: runaction, rules: [{ required: true, message: $t('执行动作不能为空') }] }
                ]"
                style="width: 100%; padding-top: 8px"
              >
                <a-row v-if="workflowtype === 'work'" type="flex" align="middle" :gutter="5">
                  <a-col :span="config.data.execute.action.customCirculate.enable ? 3 : 19">
                    <a-checkbox
                      value="customCirculate"
                      :checked="config.data.execute.action.customCirculate.enable"
                      @change="
                        (e) => {
                          config.data.execute.action.customCirculate.enable = e.target.checked
                        }
                      "
                    >
                      {{ $t('自定义跳转') }}
                    </a-checkbox>
                  </a-col>
                  <a-col v-if="config.data.execute.action.customCirculate.enable" :span="6">
                    <a-select
                      v-model="config.data.execute.action.customCirculate.transitionId"
                      :placeholder="$t('请选择变迁')"
                    >
                      <a-select-option
                        v-for="value in transition"
                        :key="value.transitionId"
                        :value="value.transitionId"
                      >
                        {{ value.transitionName }}
                      </a-select-option>
                    </a-select>
                  </a-col>
                </a-row>
                <a-row v-else :gutter="5" type="flex" align="middle">
                  <a-col :span="config.data.execute.action.autoHandle.enable ? 3 : 19">
                    <a-checkbox
                      value="autoHandle"
                      :checked="config.data.execute.action.autoHandle.enable"
                      @change="
                        (e) => {
                          config.data.execute.action.autoHandle.enable = e.target.checked
                        }
                      "
                    >
                      {{ $t('自动办理') }}
                    </a-checkbox>
                  </a-col>
                  <a-col v-if="config.data.execute.action.autoHandle.enable" :span="6">
                    <a-select
                      v-model="config.data.execute.action.autoHandle.autoHandleWay"
                      :placeholder="$t('请选择办理方式')"
                    >
                      <a-select-option v-for="value in handleMethods" :key="value.id" :value="value.alias">
                        {{ value.way }}
                      </a-select-option>
                    </a-select>
                  </a-col>
                </a-row>
                <a-row :gutter="5" type="flex" align="middle" style="padding: 10px 0">
                  <a-col :span="config.data.execute.action.customHandle.enable ? 3 : 19">
                    <a-checkbox
                      value="customHandle"
                      :checked="config.data.execute.action.customHandle.enable"
                      @change="
                        (e) => {
                          config.data.execute.action.customHandle.enable = e.target.checked
                        }
                      "
                    >
                      {{ $t('自定义动作') }}
                    </a-checkbox>
                  </a-col>
                  <a-col v-if="config.data.execute.action.customHandle.enable" :span="6">
                    <a-button @click="handleCondition">{{ $t('自定义动作') }}</a-button>
                  </a-col>
                  <condition ref="condition" :params="condition" @ok="getCondition" />
                </a-row>
                <a-checkbox
                  value="sendNotice"
                  :checked="config.data.execute.action.sendNotice.enable"
                  @change="
                    (e) => {
                      config.data.execute.action.sendNotice.enable = e.target.checked
                      if (!sendTemplate.length) {
                        getTemplate()
                      }
                      if (!weChatOfficialAccountTemplate.length) {
                        getWeChatOfficialAccountRemindTemplate()
                      }
                      if (!weChatAppletsTemplates.length) {
                        getWeChatAppletsRemindTemplate()
                      }
                    }
                  "
                >
                  {{ $t('发送通知') }}
                </a-checkbox>
              </a-checkbox-group>
            </a-form-item>
            <div v-if="config.data.execute.action.sendNotice.enable">
              <a-form-item :label="$t('通知对象')" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
                <a-row type="flex" align="middle" style="margin-top: 3px; position: relative">
                  <a-col :span="24">
                    <querier-codemirror-input
                      ref="querierCodemirrorInput"
                      :params.sync="remindUser.data"
                      :lineStyle="{ lineHeight: '19px' }"
                      @setFormFields="setFormFields"
                    />
                  </a-col>
                  <span
                    style="position: absolute; right: 8px; cursor: pointer; z-index: 10"
                    size="small"
                    @click="
                      $refs.remindUserShow.show({
                        title: $t('公式编辑器')
                      })
                    "
                  >
                    fx
                  </span>
                </a-row>
                <condition
                  ref="remindUserShow"
                  :params="Object.assign(remindUser, { tableId: tableId })"
                  @ok="setFormula"
                />
                <a-input
                  v-show="false"
                  v-decorator="[
                    'remindUser',
                    {
                      rules: [{ required: true, message: $t('请输入通知对象') }],
                      initialValue: remindUser.data.html || undefined
                    }
                  ]"
                />
              </a-form-item>
              <a-form-item :label="$t('通知方式')" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
                <a-checkbox-group
                  v-decorator="[
                    'noticeType',
                    {
                      rules: [{ required: true, message: $t('请选择通知方式') }],
                      initialValue: noticeType || []
                    }
                  ]"
                  style="width: 100%"
                >
                  <a-tabs
                    style="width: 100%"
                    @change="
                      (e) => {
                        if (e === 'wsRemind' && $refs.wsRemindTFinyMce) {
                          $refs.wsRemindTFinyMce.tinyKey++
                        } else if (e === 'mailRemind' && $refs.mailRemindTinyMce) {
                          $refs.mailRemindTinyMce.tinyKey++
                        }
                      }
                    "
                  >
                    <a-tab-pane key="wsRemind">
                      <span slot="tab">
                        <a-checkbox value="wsRemind" @click.stop="" />
                        {{ $t('站内信') }}
                      </span>
                      <a-space>
                        <a-button>{{ $t('重新加载流程默认配置') }}</a-button>
                      </a-space>
                      <a-row>
                        <a-col span="12">
                          <a-form-item :label="$t('语音提醒')" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                            <a-switch
                              v-decorator="[
                                'info[execute][action][sendNotice][wsRemind][voice][enable]',
                                {
                                  initialValue: config.data.execute.action.sendNotice.wsRemind.voice.enable,
                                  valuePropName: 'checked'
                                }
                              ]"
                              @change="
                                (e) => {
                                  config.data.execute.action.sendNotice.wsRemind.voice.enable = e
                                }
                              "
                            />
                            <a-form-item
                              v-if="config.data.execute.action.sendNotice.wsRemind.voice.enable"
                              style="display: inline-block; width: 200px; margin-left: 8px"
                            >
                              <a-select
                                v-decorator="[
                                  'info[execute][action][sendNotice][wsRemind][voice][selection]',
                                  {
                                    rules: [{ required: noticeType.includes('wsRemind'), message: $t('请选择语音') }],
                                    initialValue:
                                      config.data.execute.action.sendNotice.wsRemind.voice.selection || undefined
                                  }
                                ]"
                              ></a-select>
                            </a-form-item>
                          </a-form-item>
                        </a-col>
                        <a-col span="12">
                          <a-form-item :label="$t('通知提醒框')" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                            <a-switch
                              v-decorator="[
                                'info[execute][action][sendNotice][wsRemind][enable]',
                                {
                                  initialValue: config.data.execute.action.sendNotice.wsRemind.enable,
                                  valuePropName: 'checked'
                                }
                              ]"
                              @change="
                                (e) => {
                                  config.data.execute.action.sendNotice.wsRemind.enable = e
                                }
                              "
                            />
                          </a-form-item>
                        </a-col>
                      </a-row>
                      <a-form-item :label="$t('存入消息中心')" :labelCol="{ span: 3 }" :wrapperCol="{ span: 19 }">
                        <a-switch
                          v-decorator="[
                            'info[execute][action][sendNotice][wsRemind][durable]',
                            {
                              initialValue: config.data.execute.action.sendNotice.wsRemind.durable,
                              valuePropName: 'checked'
                            }
                          ]"
                          @change="
                            (e) => {
                              config.data.execute.action.sendNotice.wsRemind.durable = e
                            }
                          "
                        />
                      </a-form-item>
                      <template
                        v-if="
                          config.data.execute.action.sendNotice.wsRemind.enable ||
                          config.data.execute.action.sendNotice.wsRemind.durable
                        "
                      >
                        <a-form-item :label="$t('标题')" :labelCol="{ span: 3 }" :wrapperCol="{ span: 20 }">
                          <a-input
                            v-decorator="[
                              'info[execute][action][sendNotice][wsRemind][title]',
                              {
                                rules: [{ required: noticeType.includes('wsRemind'), message: $t('请输入标题') }],
                                initialValue: config.data.execute.action.sendNotice.wsRemind.title
                              }
                            ]"
                          />
                        </a-form-item>
                        <a-form-item :label="$t('摘要')" :labelCol="{ span: 3 }" :wrapperCol="{ span: 20 }">
                          <a-textarea
                            v-decorator="[
                              'info[execute][action][sendNotice][wsRemind][summary]',
                              {
                                rules: [
                                  {
                                    required:
                                      config.data.execute.action.sendNotice.wsRemind.enable &&
                                      noticeType.includes('wsRemind'),
                                    message: $t('请输入摘要')
                                  }
                                ],
                                initialValue: config.data.execute.action.sendNotice.wsRemind.summary
                              }
                            ]"
                            :autoSize="{ minRows: 3, maxRows: 5 }"
                          />
                        </a-form-item>
                        <a-form-item :label="$t('内容')" :labelCol="{ span: 3 }" :wrapperCol="{ span: 20 }">
                          <tiny-mce
                            ref="wsRemindTFinyMce"
                            v-decorator="[
                              'info[execute][action][sendNotice][wsRemind][content]',
                              {
                                rules: [
                                  {
                                    required:
                                      config.data.execute.action.sendNotice.wsRemind.durable &&
                                      noticeType.includes('wsRemind'),
                                    message: $t('请输入内容')
                                  }
                                ],
                                initialValue: config.data.execute.action.sendNotice.wsRemind.content
                              }
                            ]"
                          />
                        </a-form-item>
                        <a-form-item
                          v-if="config.data.execute.action.sendNotice.wsRemind.enable"
                          :label="$t('按钮')"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 20 }"
                        >
                          <a-switch
                            v-decorator="[
                              'info[execute][action][sendNotice][wsRemind][button][enable]',
                              {
                                initialValue: config.data.execute.action.sendNotice.wsRemind.button.enable,
                                valuePropName: 'checked'
                              }
                            ]"
                            @change="
                              (e) => {
                                config.data.execute.action.sendNotice.wsRemind.button.enable = e
                              }
                            "
                          />
                          <template v-if="config.data.execute.action.sendNotice.wsRemind.button.enable">
                            <a-form-item style="display: inline-block; width: 80px; margin-left: 8px">
                              <a-input
                                v-decorator="[
                                  'info[execute][action][sendNotice][wsRemind][button][label]',
                                  {
                                    rules: [
                                      { required: noticeType.includes('wsRemind'), message: $t('请输入按钮显示内容') }
                                    ],
                                    initialValue: config.data.execute.action.sendNotice.wsRemind.button.label || '详情'
                                  }
                                ]"
                              />
                            </a-form-item>
                            <a-form-item style="display: inline-block; width: 120px; margin-left: 8px">
                              <a-select
                                v-decorator="[
                                  'info[execute][action][sendNotice][wsRemind][button][style]',
                                  {
                                    rules: [
                                      { required: noticeType.includes('wsRemind'), message: $t('请选择按钮样式') }
                                    ],
                                    initialValue: config.data.execute.action.sendNotice.wsRemind.button.style || ''
                                  }
                                ]"
                              >
                                <a-select-option key="" value="">{{ $t('默认样式') }}</a-select-option>
                                <a-select-option key="primary" value="primary">
                                  {{ $t('主按钮样式') }}
                                </a-select-option>
                                <a-select-option key="danger" value="danger">
                                  {{ $t('危险按钮样式') }}
                                </a-select-option>
                              </a-select>
                            </a-form-item>
                          </template>
                        </a-form-item>
                      </template>
                    </a-tab-pane>
                    <a-tab-pane key="smsRemind">
                      <span slot="tab">
                        <a-checkbox value="smsRemind" @click.stop="" />
                        {{ $t('短信') }}
                      </span>
                      <a-space>
                        <a-button>{{ $t('重新加载流程默认配置') }}</a-button>
                      </a-space>
                      <a-form-item :label="$t('短信模板')" :labelCol="{ span: 3 }" :wrapperCol="{ span: 19 }">
                        <a-select
                          v-decorator="[
                            'info[execute][action][sendNotice][smsRemind][template]',
                            {
                              rules: [{ required: noticeType.includes('smsRemind'), message: $t('请选择短信模板') }],
                              initialValue: config.data.execute.action.sendNotice.smsRemind.smsTemplate || undefined
                            }
                          ]"
                          allowClear
                          @change="handleGetSmsTemplate"
                        >
                          <a-select-option v-for="tem in sendTemplate" :key="tem.value" :value="tem.value">
                            {{ tem.display }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                      <a-form-item
                        v-if="smsTempTag"
                        :label="$t('短信内容')"
                        :labelCol="{ span: 3 }"
                        :wrapperCol="{ span: 19 }"
                      >
                        <a-textarea
                          v-decorator="[
                            'info[execute][action][sendNotice][smsRemind][smsContent]',
                            {
                              rules: [{ required: noticeType.includes('smsRemind'), message: $t('请输入内容') }],
                              initialValue: config.data.execute.action.sendNotice.smsRemind.smsContent
                            }
                          ]"
                          :disabled="smsTempTag !== 'custom'"
                          :autoSize="{ minRows: 5, maxRows: 10 }"
                        />
                      </a-form-item>
                      <a-form-item
                        v-if="smsTempTag"
                        :label="$t('变量对应关系')"
                        :labelCol="{ span: 3 }"
                        :wrapperCol="{ span: 19 }"
                      >
                        <a-form-item
                          v-for="(value, smsKey) in fieldSmsTemplate"
                          v-show="smsTempTag"
                          :key="smsKey + 'sms'"
                          :value="smsKey + 'sms'"
                          :label="value.label"
                          :labelCol="{ span: 4 }"
                          :wrapperCol="{ span: 20 }"
                        >
                          <a-row type="flex" align="middle" style="margin-top: 3px">
                            <a-col :span="24">
                              <querier-codemirror-input
                                ref="querierCodemirrorInput"
                                :params.sync="config.data.execute.action.sendNotice.smsRemind.paramMap[value.label]"
                                :lineStyle="{ lineHeight: '19px' }"
                              />
                            </a-col>
                            <span
                              style="position: absolute; right: 8px; cursor: pointer; z-index: 10"
                              size="small"
                              @click="
                                () => {
                                  $refs[value + smsKey][0].show({
                                    title: $t('公式编辑器')
                                  })
                                }
                              "
                            >
                              fx
                            </span>
                          </a-row>
                          <condition
                            :ref="value + smsKey"
                            :params="{
                              data: config.data.execute.action.sendNotice.smsRemind.paramMap[value.label],
                              tableId: tableId
                            }"
                            @ok="
                              (val) => {
                                $set(config.data.execute.action.sendNotice.smsRemind.paramMap, value.label, val.data)
                              }
                            "
                          />
                          <a-input
                            v-show="false"
                            v-decorator="[
                              `paramMap[${value.name}]`,
                              {
                                initialValue: config.data.execute.action.sendNotice.smsRemind.paramMap[value.label]
                                  ? config.data.execute.action.sendNotice.smsRemind.paramMap[value.label].value
                                  : '',
                                rules: [
                                  {
                                    required: smsTempTag && noticeType.includes('smsRemind'),
                                    message: $t('请输入参数')
                                  }
                                ]
                              }
                            ]"
                          />
                        </a-form-item>
                      </a-form-item>
                    </a-tab-pane>
                    <a-tab-pane key="mailRemind">
                      <span slot="tab">
                        <a-checkbox value="mailRemind" @click.stop="" />
                        {{ $t('邮件') }}
                      </span>
                      <a-space>
                        <a-button>{{ $t('重新加载流程默认配置') }}</a-button>
                      </a-space>
                      <a-form-item :label="$t('邮件标题')" :labelCol="{ span: 3 }" :wrapperCol="{ span: 19 }">
                        <a-input
                          v-decorator="[
                            'info[execute][action][sendNotice][mailRemind][title]',
                            {
                              rules: [{ required: noticeType.includes('mailRemind'), message: $t('请输入邮件标题') }],
                              initialValue: config.data.execute.action.sendNotice.mailRemind.title
                            }
                          ]"
                        />
                      </a-form-item>
                      <a-form-item :label="$t('邮件内容')" :labelCol="{ span: 3 }" :wrapperCol="{ span: 19 }">
                        <tiny-mce
                          ref="mailRemindTinyMce"
                          v-decorator="[
                            'info[execute][action][sendNotice][mailRemind][content]',
                            {
                              rules: [
                                {
                                  required: noticeType.includes('mailRemind'),
                                  message: $t('内容')
                                }
                              ],
                              initialValue: config.data.execute.action.sendNotice.mailRemind.content
                            }
                          ]"
                        />
                      </a-form-item>
                    </a-tab-pane>
                    <a-tab-pane key="workWeChatRemind">
                      <span slot="tab">
                        <a-checkbox value="workWeChatRemind" @click.stop="" />
                        {{ $t('企业微信') }}
                      </span>
                      <a-space>
                        <a-button>{{ $t('重新加载流程默认配置') }}</a-button>
                      </a-space>
                      <a-form-item :label="$t('标题')" :labelCol="{ span: 3 }" :wrapperCol="{ span: 19 }">
                        <a-input
                          v-decorator="[
                            'info[execute][action][sendNotice][workWeChatRemind][title]',
                            {
                              rules: [{ required: noticeType.includes('workWeChatRemind'), message: $t('请输入标题') }],
                              initialValue: config.data.execute.action.sendNotice.workWeChatRemind.title
                            }
                          ]"
                        />
                      </a-form-item>
                      <a-form-item :label="$t('内容')" :labelCol="{ span: 3 }" :wrapperCol="{ span: 19 }">
                        <a-textarea
                          v-decorator="[
                            'info[execute][action][sendNotice][workWeChatRemind][content]',
                            {
                              rules: [
                                {
                                  required: noticeType.includes('workWeChatRemind'),
                                  message: $t('内容')
                                }
                              ],
                              initialValue: config.data.execute.action.sendNotice.workWeChatRemind.content
                            }
                          ]"
                          :auto-size="{ minRows: 5, maxRows: 10 }"
                        ></a-textarea>
                        <!-- <tiny-mce
                          ref="workWeChatRemindTinyMce"
                          v-decorator="[
                            'info[execute][action][sendNotice][workWeChatRemind][content]',
                            {
                              rules: [
                                {
                                  required: noticeType.includes('workWeChatRemind'),
                                  message: $t('内容')
                                }
                              ],
                              initialValue: config.data.execute.action.sendNotice.workWeChatRemind.content
                            }
                          ]"
                        /> -->
                      </a-form-item>
                    </a-tab-pane>
                    <!-- 微信公众号 -->
                    <a-tab-pane v-if="false" key="weChatOfficialAccountRemind">
                      <span slot="tab">
                        <a-checkbox value="weChatOfficialAccountRemind" @click.stop="" />
                        {{ $t('微信公众号') }}
                      </span>
                      <a-form-item :label="$t('提醒模板')" :labelCol="{ span: 3 }" :wrapperCol="{ span: 19 }">
                        <a-select
                          v-decorator="[
                            'info[execute][action][sendNotice][weChatOfficialAccountRemind][template]',
                            {
                              rules: [
                                {
                                  required: noticeType.includes('weChatOfficialAccountRemind'),
                                  message: $t('请选择提醒模板')
                                }
                              ],
                              initialValue:
                                config.data.execute.action.sendNotice.weChatOfficialAccountRemind.template || undefined
                            }
                          ]"
                          allowClear
                          @change="handleGetWeChatOfficialAccountRemindTemplate"
                        >
                          <a-select-option
                            v-for="tem in weChatOfficialAccountTemplate"
                            :key="tem.number"
                            :value="tem.number"
                          >
                            {{ tem.name }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                      <a-form-item
                        v-if="weChatOfficalAccountTag"
                        :label="$t('模板内容')"
                        :labelCol="{ span: 3 }"
                        :wrapperCol="{ span: 19 }"
                      >
                        <a-textarea
                          v-decorator="[
                            'info[execute][action][sendNotice][weChatOfficialAccountRemind][content]',
                            {
                              rules: [
                                {
                                  required: noticeType.includes('weChatOfficialAccountRemind'),
                                  message: $t('请输入模板内容')
                                }
                              ],
                              initialValue: config.data.execute.action.sendNotice.weChatOfficialAccountRemind.content
                            }
                          ]"
                          :disabled="true"
                          :autoSize="{ minRows: 5, maxRows: 10 }"
                        />
                      </a-form-item>
                      <a-form-item
                        v-if="weChatOfficalAccountTag"
                        :label="$t('变量设置')"
                        :labelCol="{ span: 3 }"
                        :wrapperCol="{ span: 19 }"
                      >
                        <a-form-item
                          v-for="(value, officalAccountKey) in fieldWeChatOfficialAccountTemplate"
                          v-show="weChatOfficalAccountTag"
                          :key="officalAccountKey + 'sms'"
                          :value="officalAccountKey + 'sms'"
                          :label="value.label"
                          :labelCol="{ span: 4 }"
                          :wrapperCol="{ span: 20 }"
                        >
                          <a-row type="flex" align="middle" style="margin-top: 3px">
                            <a-col :span="24">
                              <querier-codemirror-input
                                ref="querierCodemirrorInput"
                                :params.sync="
                                  config.data.execute.action.sendNotice.weChatOfficialAccountRemind.paramMap[
                                    value.label
                                  ]
                                "
                                :lineStyle="{ lineHeight: '19px' }"
                              />
                            </a-col>
                            <span
                              style="position: absolute; right: 8px; cursor: pointer; z-index: 10"
                              size="small"
                              @click="
                                () => {
                                  $refs[value + officalAccountKey][0].show({
                                    title: $t('公式编辑器')
                                  })
                                }
                              "
                            >
                              fx
                            </span>
                          </a-row>
                          <condition
                            :ref="value + officalAccountKey"
                            :params="{
                              data: config.data.execute.action.sendNotice.weChatOfficialAccountRemind.paramMap[
                                value.label
                              ],
                              tableId: tableId
                            }"
                            @ok="
                              (val) => {
                                $set(
                                  config.data.execute.action.sendNotice.weChatOfficialAccountRemind.paramMap,
                                  value.label,
                                  val.data
                                )
                              }
                            "
                          />
                          <a-input
                            v-show="false"
                            v-decorator="[
                              `paramMap[${value.name}]`,
                              {
                                initialValue: config.data.execute.action.sendNotice.weChatOfficialAccountRemind
                                  .paramMap[value.label]
                                  ? config.data.execute.action.sendNotice.weChatOfficialAccountRemind.paramMap[
                                      value.label
                                    ].value
                                  : '',
                                rules: [
                                  {
                                    required:
                                      weChatOfficalAccountTag && noticeType.includes('weChatOfficialAccountRemind'),
                                    message: $t('请输入参数')
                                  }
                                ]
                              }
                            ]"
                          />
                        </a-form-item>
                      </a-form-item>
                    </a-tab-pane>
                    <!-- 微信小程序 -->
                    <a-tab-pane v-if="false" key="weChatAppletsRemind">
                      <span slot="tab">
                        <a-checkbox value="weChatAppletsRemind" @click.stop="" />
                        {{ $t('微信小程序') }}
                      </span>
                      <a-form-item :label="$t('提醒模板')" :labelCol="{ span: 3 }" :wrapperCol="{ span: 19 }">
                        <a-select
                          v-decorator="[
                            'info[execute][action][sendNotice][weChatAppletsRemind][template]',
                            {
                              rules: [
                                {
                                  required: noticeType.includes('weChatAppletsRemind'),
                                  message: $t('请选择提醒模板')
                                }
                              ],
                              initialValue:
                                config.data.execute.action.sendNotice.weChatAppletsRemind.template || undefined
                            }
                          ]"
                          allowClear
                          @change="handleGetWeChatAppletsRemindTemplate"
                        >
                          <a-select-option v-for="tem in weChatAppletsTemplates" :key="tem.number" :value="tem.number">
                            {{ tem.name }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                      <a-form-item
                        v-if="weChatAppletsTag"
                        :label="$t('模板内容')"
                        :labelCol="{ span: 3 }"
                        :wrapperCol="{ span: 19 }"
                      >
                        <a-textarea
                          v-decorator="[
                            'info[execute][action][sendNotice][weChatAppletsRemind][content]',
                            {
                              rules: [
                                {
                                  required: noticeType.includes('weChatAppletsRemind'),
                                  message: $t('请输入模板内容')
                                }
                              ],
                              initialValue: config.data.execute.action.sendNotice.weChatAppletsRemind.content
                            }
                          ]"
                          :disabled="true"
                          :autoSize="{ minRows: 5, maxRows: 10 }"
                        />
                      </a-form-item>
                      <a-form-item
                        v-if="weChatAppletsTag"
                        :label="$t('变量设置')"
                        :labelCol="{ span: 3 }"
                        :wrapperCol="{ span: 19 }"
                      >
                        <a-form-item
                          v-for="(value, weChatAppletsKey) in fieldWeChatAppletsTemplates"
                          v-show="weChatAppletsTag"
                          :key="weChatAppletsKey + 'sms'"
                          :value="weChatAppletsKey + 'sms'"
                          :label="value.label"
                          :labelCol="{ span: 4 }"
                          :wrapperCol="{ span: 20 }"
                        >
                          <a-row type="flex" align="middle" style="margin-top: 3px">
                            <a-col :span="24">
                              <querier-codemirror-input
                                ref="querierCodemirrorInput"
                                :params.sync="
                                  config.data.execute.action.sendNotice.weChatAppletsRemind.paramMap[value.label]
                                "
                                :lineStyle="{ lineHeight: '19px' }"
                              />
                            </a-col>
                            <span
                              style="position: absolute; right: 8px; cursor: pointer; z-index: 10"
                              size="small"
                              @click="
                                () => {
                                  $refs[value + weChatAppletsKey][0].show({
                                    title: $t('公式编辑器')
                                  })
                                }
                              "
                            >
                              fx
                            </span>
                          </a-row>
                          <condition
                            :ref="value + weChatAppletsKey"
                            :params="{
                              data: config.data.execute.action.sendNotice.weChatAppletsRemind.paramMap[value.label],
                              tableId: tableId
                            }"
                            @ok="
                              (val) => {
                                $set(
                                  config.data.execute.action.sendNotice.weChatAppletsRemind.paramMap,
                                  value.label,
                                  val.data
                                )
                              }
                            "
                          />
                          <a-input
                            v-show="false"
                            v-decorator="[
                              `paramMap[${value.name}]`,
                              {
                                initialValue: config.data.execute.action.sendNotice.weChatAppletsRemind.paramMap[
                                  value.label
                                ]
                                  ? config.data.execute.action.sendNotice.weChatAppletsRemind.paramMap[value.label]
                                      .value
                                  : '',
                                rules: [
                                  {
                                    required: weChatAppletsTag && noticeType.includes('weChatAppletsRemind'),
                                    message: $t('请输入参数')
                                  }
                                ]
                              }
                            ]"
                          />
                        </a-form-item>
                      </a-form-item>
                    </a-tab-pane>
                    <!-- 电话 -->
                    <a-tab-pane key="telephoneRemind">
                      <span slot="tab">
                        <a-checkbox value="telephoneRemind" @click.stop="" />
                        {{ $t('电话') }}
                      </span>
                    </a-tab-pane>
                    <!-- 机器人 -->
                    <a-tab-pane key="robotRemind">
                      <span slot="tab">
                        <a-checkbox value="robotRemind" @click.stop="" />
                        {{ $t('机器人') }}
                      </span>
                    </a-tab-pane>
                  </a-tabs>
                </a-checkbox-group>
              </a-form-item>
              <!--
              <a-form-item :label="$t('语音标识')" :labelCol="{ span: 6 }" :wrapperCol="{ span: 12 }">
                <a-input
                  v-decorator="[
                    'info[execute][action][sendNotice][smsSetting][voiceIdentify]',
                    { initialValue: config.data.execute.action.sendNotice.smsSetting.voiceIdentify }
                  ]"
                />
              </a-form-item> -->
            </div>
          </a-form>
        </div>
        <div class="bbar">
          <a-button type="primary" html-type="submit" @click="handleSubmit">{{ $t('保存') }}</a-button>
          <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
        </div>
      </a-spin>
      <select-user-form ref="selectUserForm" @ok="getUser" />
      <select-department ref="selectDepartment" @ok="getDepartment" />
    </a-drawer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  i18n: window.lang('admin'),
  components: {
    Condition: () => import('./Table/Condition'),
    Codemirror: () => import('@/views/admin/Formula/Codemirror'),
    QuerierCodemirrorInput: () => import('@/views/admin/Table/QuerierCodemirrorInput'),
    CustomCodemirror: () => import('@/views/admin/Flow/modules/CustomCodemirror'),
    TabsSelect: () => import('@/views/admin/Field/TabsSelect'),
    AddressSelect: () => import('@/views/admin/Field/AddressSelect'),
    SelectUserForm: () => import('@/views/admin/General/SelectUserForm'),
    SelectDepartment: () => import('@/views/admin/General/SelectDepartment'),
    TinyMce: () => import('@/components/Editor/TinyMce')
  },
  props: {
    workflowtype: {
      type: String,
      default () {
        return ''
      },
      require: true
    },
    slaData: {
      type: Array,
      default () {
        return []
      }
    },
    allWayData: {
      type: Object,
      default () {
        return {}
      }
    },
    handleMethods: {
      type: Array,
      default () {
        return []
      }
    },
    tableId: {
      type: String,
      default () {
        return ''
      }
    },
    workflowId: {
      type: String,
      default () {
        return ''
      }
    },
    fieldArr: {
      type: Array,
      default () {
        return []
      }
    },
    department: {
      type: Array,
      default () {
        return []
      }
    },
    role: {
      type: Object,
      default () {
        return {}
      }
    },
    userArr: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      visible: false,
      loading: false,
      slaDataArr: this.slaData,
      showWay: [],
      recordKey: {},
      condition: {
        tableId: this.tableId,
        data: {}
      },
      customHandleSetting: {
        html: '',
        value: ''
      },
      remindUser: {
        tableId: this.tableId,
        data: {
          html: '',
          value: ''
        }
      },
      sendForm: this.$form.createForm(this, { name: 'sendForm' }),
      config: {
        data: {
          execute: {
            time: {
              type: 'restrictTimeArrived',
              beforeRestrictTime: {},
              afterRestrictTime: {},
              afterCurrentTime: {}
            },
            action: {
              customCirculate: {
                enable: false,
                transitionId: ''
              },
              autoHandle: {
                enable: false,
                autoHandleWay: ''
              },
              customHandle: {
                enable: false,
                handleSetting: {
                  html: '',
                  value: ''
                }
              },
              sendNotice: {
                enable: false,
                remindUser: {
                  html: '',
                  value: ''
                },
                wsRemind: {
                  selected: false,
                  voice: {
                    enable: false,
                    selection: ''
                  },
                  enable: false,
                  durable: false,
                  title: '',
                  summary: '',
                  content: '',
                  button: {
                    enable: false,
                    label: '',
                    style: ''
                  }
                },
                smsRemind: {
                  selected: false,
                  template: '',
                  content: '',
                  paramMap: {}
                },
                mailRemind: {
                  selected: false,
                  title: '',
                  content: ''
                },
                workWeChatRemind: {
                  selected: false,
                  title: '',
                  content: ''
                },
                weChatOfficialAccountRemind: {
                  selected: false,
                  template: '',
                  content: '',
                  paramMap: {}
                },
                weChatAppletsRemind: {
                  selected: false,
                  template: '',
                  content: '',
                  paramMap: {}
                },
                robotRemind: {
                  selected: false
                },
                telephoneRemind: {
                  selected: false
                }
              }
            }
          },
          generate: {
            conditionSetting: {
              conditionVisual: [{
                type: 'notSet',
                alias: '',
                src: '',
                condiArr: [],
                customCode: {
                  html: '',
                  value: ''
                },
                condition: [{
                  include: '',
                  value: ''
                }],
                logic: 'and'
              }],
              logic: 'and'
            }
          }
        }
      },
      noticeType: [],
      queryParam: {},
      data: {},
      transition: [],
      form: this.$form.createForm(this),
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
      runaction: [],
      sendTemplate: [],
      fieldSmsTemplate: [],
      weChatOfficialAccountTemplate: [],
      fieldWeChatOfficialAccountTemplate: [],
      weChatAppletsTemplates: [],
      fieldWeChatAppletsTemplates: [],
      // fieldMsgTemplate: [],
      // msgContent: '',
      // msgTempTag: '',
      smsTempTag: '',
      weChatOfficalAccountTag: '',
      weChatAppletsTag: '',
      tagOption: [],
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        align: 'center',
        width: 140,
        scopedSlots: { customRender: 'action' }
      }, {
        title: '#',
        dataIndex: 'sort',
        width: 40,
        scopedSlots: { customRender: 'sort' }
      }, {
        title: this.$t('SLA名称'),
        dataIndex: 'name',
        width: 150
      }, {
        title: this.$t('生成时机'),
        dataIndex: 'generate',
        width: 120,
        scopedSlots: { customRender: 'generate' }
      }, {
        title: this.$t('执行时机'),
        dataIndex: 'executionTime',
        width: 120,
        scopedSlots: { customRender: 'executionTime' }
      }, {
        title: this.$t('执行动作'),
        dataIndex: 'runaction',
        width: 120,
        scopedSlots: { customRender: 'runaction' }
      }, {
        title: this.$t('最后修改人'),
        width: 120,
        dataIndex: 'updateuser'
      }, {
        title: this.$t('最后修改时间'),
        width: 140,
        dataIndex: 'updateTime'
      }, {
        title: this.$t('SLA描述'),
        dataIndex: 'describe'
      }]
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    slaData () {
      this.$emit('ok', this.slaDataArr)
    }
  },
  mounted () {
    this.getTransition()
  },
  methods: {
    // 页面渲染
    handleAdd () {
      this.loading = true
      this.config = {
        data: {
          execute: {
            time: {
              type: 'restrictTimeArrived',
              beforeRestrictTime: {},
              afterRestrictTime: {},
              afterCurrentTime: {}
            },
            action: {
              customCirculate: {
                enable: false,
                transitionId: ''
              },
              autoHandle: {
                enable: false,
                autoHandleWay: ''
              },
              customHandle: {
                enable: false,
                handleSetting: {
                  html: '',
                  value: ''
                }
              },
              sendNotice: {
                enable: false,
                remindUser: {
                  html: '',
                  value: ''
                },
                wsRemind: {
                  selected: false,
                  voice: {
                    enable: false,
                    selection: ''
                  },
                  enable: false,
                  durable: false,
                  title: '',
                  summary: '',
                  content: '',
                  button: {
                    enable: false,
                    label: '',
                    style: ''
                  }
                },
                smsRemind: {
                  selected: false,
                  template: '',
                  content: '',
                  paramMap: {}
                },
                mailRemind: {
                  selected: false,
                  title: '',
                  content: ''
                },
                workWeChatRemind: {
                  selected: false
                },
                weChatOfficialAccountRemind: {
                  selected: false,
                  template: '',
                  content: '',
                  paramMap: {}
                },
                weChatAppletsRemind: {
                  selected: false,
                  template: '',
                  content: '',
                  paramMap: {}
                },
                robotRemind: {
                  selected: false
                },
                telephoneRemind: {
                  selected: false
                }
              }
            }
          },
          generate: {
            conditionSetting: {
              conditionVisual: [{
                type: 'notSet',
                alias: '',
                src: '',
                condiArr: [],
                customCode: {
                  html: '',
                  value: ''
                },
                condition: [{
                  include: '',
                  value: ''
                }],
                logic: 'and'
              }],
              logic: 'and'
            }
          }
        }
      }
      Object.assign(this.config, {
        action: 'add',
        title: this.$t('添加SLA')
      })
      this.runaction = []
      this.remindUser = {
        tableId: this.tableId,
        data: {
          html: '',
          value: ''
        }
      }
      this.loading = false
      this.visible = true
    },
    // 选择关系
    choiceInclude (value, includeItem) {
      includeItem.value = undefined
    },
    getTemplate () {
      const enable = this.config.data.execute.action.sendNotice.wsRemind.enable
      const durable = this.config.data.execute.action.sendNotice.wsRemind.durable
      if (enable || durable) {
        this.config.data.execute.action.sendNotice.wsRemind.enable = false
        this.config.data.execute.action.sendNotice.wsRemind.durable = false
      }
      this.axios({
        url: '/sms/template/getTemplate'
      }).then((res) => {
        this.sendTemplate = res.result.data
        if (this.config.data.execute.action.sendNotice.smsRemind.selected) {
          this.handleGetSmsTemplate(this.config.data.execute.action.sendNotice.smsRemind.template)
        }
        this.config.data.execute.action.sendNotice.wsRemind.enable = enable
        this.config.data.execute.action.sendNotice.wsRemind.durable = durable
      })
    },
    handleGetSmsTemplate (value) {
      this.config.data.execute.action.sendNotice.smsRemind.template = value
      this.smsTempTag = value
      const myTemplate = this.sendTemplate
      myTemplate.forEach(item => {
        if (item.value === value) {
          const smsContent = item.text
          this.$nextTick(() => {
            this.form.setFieldsValue({
              'info[execute][action][sendNotice][smsRemind][smsContent]': smsContent
            })
          })
          const patt = /\${[a-zA-Z0-9_]+}/g
          const res = item.text.match(patt)
          this.fieldSmsTemplate = []
          for (const i in res) {
            const fname = res[i].substring(2, res[i].length - 1)
            this.fieldSmsTemplate.push({ label: fname, name: 'info[execute][action][sendNotice][smsRemind][paramMap][' + fname + ']' })
          }
        }
      })
    },
    // 获取微信公众号模板
    getWeChatOfficialAccountRemindTemplate () {
      this.axios({
        url: 'admin/wechat/template/getTemplate',
        params: {
          type: '1'
        }
      }).then(res => {
        this.weChatOfficialAccountTemplate = res.result
        if (this.config.data.execute.action.sendNotice.weChatOfficialAccountRemind.selected) {
          this.handleGetWeChatOfficialAccountRemindTemplate(this.config.data.execute.action.sendNotice.weChatOfficialAccountRemind.template)
        }
      })
    },
    handleGetWeChatOfficialAccountRemindTemplate (value) {
      const myTemplate = this.weChatOfficialAccountTemplate
      this.weChatOfficalAccountTag = value
      myTemplate.forEach(item => {
        if (item.number === value) {
          const weChatOfficialAccountContent = item.content
          this.$nextTick(() => {
            this.form.setFieldsValue({
              'info[execute][action][sendNotice][weChatOfficialAccountRemind][content]': weChatOfficialAccountContent // ??
            })
          })
          const patt = /\${[a-zA-Z0-9_]+}/g
          const res = item.content.match(patt)
          this.fieldWeChatOfficialAccountTemplate = []
          for (const i in res) {
            const fname = res[i].substring(2, res[i].length - 1)
            this.fieldWeChatOfficialAccountTemplate.push({ label: fname, name: 'info[execute][action][sendNotice][weChatOfficialAccountRemind][paramMap][' + fname + ']' })
          }
        }
      })
    },
    getWeChatAppletsRemindTemplate () {
      this.axios({
        url: 'admin/wechat/template/getTemplate',
        params: {
          type: '2'
        }
      }).then(res => {
        this.weChatAppletsTemplates = res.result
        if (this.config.data.execute.action.sendNotice.weChatAppletsRemind.selected) {
          this.handleGetWeChatAppletsRemindTemplate(this.config.data.execute.action.sendNotice.weChatAppletsRemind.template)
        }
      })
    },
    handleGetWeChatAppletsRemindTemplate (value) {
      const myTemplate = this.weChatAppletsTemplates
      this.weChatAppletsTag = value
      myTemplate.forEach(item => {
        if (item.number === value) {
          const weChatApplets = item.content
          this.$nextTick(() => {
            this.form.setFieldsValue({
              'info[execute][action][sendNotice][weChatAppletsRemind][content]': weChatApplets // ??
            })
          })
          const patt = /\${[a-zA-Z0-9_]+}/g
          const res = item.content.match(patt)
          this.fieldWeChatAppletsTemplates = []
          for (const i in res) {
            const fname = res[i].substring(2, res[i].length - 1)
            this.fieldWeChatAppletsTemplates.push({ label: fname, name: 'info[execute][action][sendNotice][weChatAppletsRemind][paramMap][' + fname + ']' })
          }
        }
      })
    },
    getTransition () {
      this.axios({
        url: '/admin/workflow/getTransition',
        data: { workflowId: this.workflowId }
      }).then(res => {
        this.transition = res.result.data
      })
    },
    getCondition (val) {
      this.customHandleSetting = val.data
      Object.assign(this.condition.data, this.customHandleSetting)
    },
    handleCondition () {
      this.$refs.condition.show({ title: this.$t('自定义动作') })
    },
    handleDelete (index) {
      this.slaDataArr.splice(index, 1)
    },
    getUser (data, index, conIndex, modeCheck) {
      this.config.data.generate.conditionSetting.conditionVisual[this.recordKey.simpleIndex].condition[this.recordKey.includeIndex]['userArr'] = data.map(item => { const obj = { username: item, text: item }; return obj })
      this.config.data.generate.conditionSetting.conditionVisual[this.recordKey.simpleIndex].condition[this.recordKey.includeIndex]['value'] = data
    },
    getDepartment (data, index, conIndex, option) {
      if (this.recordKey.type === 'role') {
        this.config.data.generate.conditionSetting.conditionVisual[this.recordKey.simpleIndex].condition[this.recordKey.includeIndex]['role'] = option
        this.config.data.generate.conditionSetting.conditionVisual[this.recordKey.simpleIndex].condition[this.recordKey.includeIndex]['value'] = data
      } else {
        this.config.data.generate.conditionSetting.conditionVisual[this.recordKey.simpleIndex].condition[this.recordKey.includeIndex]['department'] = option
        this.config.data.generate.conditionSetting.conditionVisual[this.recordKey.simpleIndex].condition[this.recordKey.includeIndex]['value'] = data
      }
    },
    handleEdit (record, index) {
      this.loading = true
      this.config = {
        action: 'edit',
        title: this.$t('编辑SLA'),
        data: record,
        index: index
      }
      this.remindUser.data = record.execute.action.sendNotice.remindUser
      this.runaction = []
      if (record.execute.action.sendNotice.enable) {
        this.getTemplate()
        this.runaction.push('sendNotice')
      }
      if (record.execute.action.customCirculate.enable) {
        this.runaction.push('customCirculate')
      }
      if (record.execute.action.customHandle.enable) {
        this.runaction.push('customHandle')
      }
      if (record.execute.action.autoHandle.enable) {
        this.runaction.push('autoHandle')
      }
      this.noticeType = []
      if (record.execute.action.sendNotice.wsRemind.selected) {
        this.noticeType.push('wsRemind')
      }
      if (record.execute.action.sendNotice.mailRemind.selected) {
        this.noticeType.push('mailRemind')
      }
      if (record.execute.action.sendNotice.smsRemind.selected) {
        this.noticeType.push('smsRemind')
      }
      if (record.execute.action.sendNotice.workWeChatRemind.selected) {
        this.noticeType.push('workWeChatRemind')
      }
      if (record.execute.action.sendNotice.weChatOfficialAccountRemind?.selected) {
        this.noticeType.push('weChatOfficialAccountRemind')
      }
      if (record.execute.action.sendNotice.weChatAppletsRemind?.selected) {
        this.noticeType.push('weChatAppletsRemind')
      }
      if (record.execute.action.sendNotice.telephoneRemind?.selected) {
        this.noticeType.push('telephoneRemind')
      }
      if (record.execute.action.sendNotice.robotRemind?.selected) {
        this.noticeType.push('robotRemind')
      }
      record.generate.conditionSetting.conditionVisual.forEach((simpleItem, simpleIndex) => {
        if (simpleItem.type === 'field') {
          this.fieldArr.forEach((fieldItem, fieldIndex) => {
            if (simpleItem.alias === fieldItem.alias) {
              fieldItem.settings = JSON.parse(fieldItem.setting)
              simpleItem.src = fieldItem.settings.form.src ? fieldItem.settings.form.src : ''
              simpleItem.formType = fieldItem.formType
              simpleItem.fieldId = fieldItem.fieldId
              simpleItem.form = fieldItem.settings.form
              if (simpleItem.src && fieldItem.formType === 'treeselect') {
                this.getTreeOption(simpleItem, fieldItem)
              } else if (fieldItem.formType === 'tag' && !this.tagOption.length) {
                this.getTagOption()
              } else if (simpleItem.src) {
                this.getOption(simpleItem)
              } else if (fieldItem.formType === 'treeselect') {
                simpleItem.dataSource = fieldItem.settings.attribute.dataSource
                this.getTreeOption(simpleItem, fieldItem)
              } else {
                simpleItem.option = []
              }
              // 根据字段，给出相应条件
              if (['text', 'textarea'].indexOf(fieldItem.formType) !== -1) {
                simpleItem.condiArr = [
                  { enName: 'eq', cnName: this.$t('等于') },
                  { enName: 'ne', cnName: this.$t('不等于') },
                  { enName: 'cn', cnName: this.$t('包含') },
                  { enName: 'nc', cnName: this.$t('不包含') },
                  { enName: 'bw', cnName: this.$t('开始于') },
                  { enName: 'ew', cnName: this.$t('结束于') },
                  { enName: 'em', cnName: this.$t('为空') },
                  { enName: 'nem', cnName: this.$t('不为空') }]
              } else if (['radio', 'checkbox', 'combobox'].indexOf(fieldItem.formType) !== -1) {
                simpleItem.condiArr = [
                  { enName: 'eq', cnName: this.$t('等于') },
                  { enName: 'ne', cnName: this.$t('不等于') },
                  { enName: 'em', cnName: this.$t('为空') },
                  { enName: 'nem', cnName: this.$t('不为空') }]
              } else if (['number', 'datetime'].indexOf(fieldItem.formType) !== -1) {
                simpleItem.condiArr = [
                  { enName: 'eq', cnName: this.$t('等于') },
                  { enName: 'ne', cnName: this.$t('不等于') },
                  { enName: 'gt', cnName: this.$t('大于') },
                  { enName: 'ge', cnName: this.$t('大于等于') },
                  { enName: 'lt', cnName: this.$t('小于') },
                  { enName: 'le', cnName: this.$t('小于等于') },
                  { enName: 'em', cnName: this.$t('为空') },
                  { enName: 'nem', cnName: this.$t('不为空') }]
              } else if (['cascader', 'address', 'treeselect', 'tag'].indexOf(fieldItem.formType) !== -1) {
                simpleItem.condiArr = [
                  { enName: 'cn', cnName: this.$t('包含') },
                  { enName: 'nc', cnName: this.$t('不包含') },
                  { enName: 'em', cnName: this.$t('为空') },
                  { enName: 'nem', cnName: this.$t('不为空') }]
              }
            }
          })
        } else if (simpleItem.condition && simpleItem.condition.some(item => item.transitionFromVal)) {
          simpleItem.condition.forEach(item => {
            for (const i in this.allWayData) { if (i.includes(item.transitionFromVal)) { item.showWay = this.allWayData[i] } }
          })
        }
      })
      this.config.data.generate.conditionSetting.conditionVisual = record.generate.conditionSetting.conditionVisual
      this.customHandleSetting = record.execute.action.customHandle.handleSetting
      Object.assign(this.condition.data, this.customHandleSetting)
      this.loading = false
      this.visible = true
    },
    getOption (item) {
      this.axios({
        url: '/admin/search/dictSearch',
        data: { dictCategoryNumber: item.src }
      }).then(res => {
        this.$set(item, 'option', res.result)
      })
    },
    getTagOption () {
      this.axios({
        url: 'admin/tag/tagOption'
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
            url: 'admin/general/getFieldForm',
            data: { fieldId: item.fieldId, value: includeItem.value }
          }).then(res => {
            this.$set(item, 'option', res.result.data.option)
          })
          resolve()
        })
      }
    },
    getTreeOption (simpleItem, item) {
      this.axios({
        url: 'admin/general/getFieldForm',
        data: { fieldId: item.fieldId, value: simpleItem.value }
      }).then(res => {
        this.$set(simpleItem, 'option', res.result.data.option)
      })
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.info.updateuser = this.userInfo.username
          const time = Date.parse(new Date())
          values.info.updateTime = this.moment(time).format('YYYY-MM-DD HH:mm:ss')
          values.info = this.$deepmerge(this.config.data, values.info)
          values.info.generate.conditionSetting.conditionVisual.forEach(condItem => {
            delete condItem.condiArr
            delete condItem.src
            if (condItem.type === 'field') {
              delete condItem.form
              delete condItem.customCode
              delete condItem.option
              delete condItem.fieldType
              delete condItem.fieldId
            } else if (condItem.type === 'custom') {
              delete condItem.alias
              delete condItem.condition
            } else if (condItem.type !== 'custom' && condItem.type !== 'field') {
              delete condItem.alias
              delete condItem.customCode
              if (condItem.type === 'transitionFrom') {
                condItem.condition.forEach(tranItem => {
                  delete tranItem.showWay
                })
              }
            }
          })
          values.info.execute.action.sendNotice.remindUser = this.remindUser.data
          values.info.execute.action.customHandle.handleSetting = this.customHandleSetting
          const noticeType = ['wsRemind', 'mailRemind', 'smsRemind', 'workWeChatRemind']
          noticeType.forEach(item => {
            values.info.execute.action.sendNotice[item].selected = values.noticeType && values.noticeType.includes(item)
          })
          values.noticeType = undefined
          if (this.config.action === 'add') {
            values.info.id = parseInt(Math.random() * (10000000 - 100000 + 1) + 100000, 10)
            this.slaDataArr.push(values.info)
          } else {
            this.slaDataArr.splice(this.config.index, 1, values.info)
          }
          this.visible = false
        }
      })
    },
    setFormula (val) {
      this.remindUser = val
      this.form.setFieldsValue({ 'remindUser': val.data.html })
      this.$forceUpdate()
    },
    setFormFields (data) {
      this.form.setFieldsValue({ 'remindUser': data.html })
      // 对表单域字段赋值后再次验证，若值为空，提醒信息保持显示
      this.form.validateFields(['remindUser'], (errors, values) => { })
    }
  }
}
</script>
