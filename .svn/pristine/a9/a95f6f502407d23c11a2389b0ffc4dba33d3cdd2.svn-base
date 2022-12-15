<!--
 * @Description: 传入record数据，通过判断record.type，来渲染对应的组件
 * @Author: kcz
 * @Date: 2020-01-02 22:41:48
 * @LastEditors: kcz
 * @LastEditTime: 2020-10-28 22:44:09
 -->
<template>
  <div>
    <div v-if="!formConfig.tableType">
      <a-form-item
        v-if="
          [
            'text',
            'textarea',
            'datetime',
            'combobox',
            'organization',
            'time',
            'number',
            'radio',
            'checkbox',
            'select',
            'rate',
            'switch',
            'autocomplete',
            'image',
            'score',
            'file',
            'associated',
            'address',
            'cascader',
            'subform',
            'slider',
            'uploadImg',
            'uploadFile',
            'editor',
            'treeselect',
            'component',
            'serialnumber',
            'tag',
            'location'
          ].includes(record.formType) || ['work', 'workRemark', 'formmark'].includes(record.type)
        "
        :label="record.labelShow === '0' ? '' : record.name || record.label"
        :label-col="record.labelLocal === '1' ? {} : labelCol"
        :wrapper-col="record.labelLocal === '1' ? {} : wrapperCol"
      >
        <a-input
          v-if="record.formType === 'text' && record.type !== 'place'"
          :disabled="record.fieldRule === 'readonly'"
          :placeholder="record.placeholder"
        />
        <a-input
          v-else-if="record.type === 'component'"
          :disabled="record.fieldRule === 'readonly'"
          :placeholder="$t('组件')"
        />
        <a-input v-else-if="record.formType === 'serialnumber'" :disabled="true" :placeholder="$t('流水号')" />
        <a-input v-else-if="record.type === 'work'" disabled :placeholder="$t('流程办理方式')" />
        <a-textarea v-else-if="record.type === 'workRemark'" :placeholder="$t('流程办理备注')"></a-textarea>
        <a-divider v-else-if="record.type === 'divider'" :orientation="record.dividerDirection">
          {{ record.dividerText ? record.dividerText : $t('分隔符') }}
        </a-divider>
        <a-textarea v-else-if="record.formType === 'textarea'" :rows="2" :disabled="record.fieldRule === 'readonly'" />
        <a-date-picker
          v-else-if="record.formType === 'datetime'"
          format="YYYY-MM-DD HH:mm:ss"
          style="width: 100%"
          :disabled="record.fieldRule === 'readonly'"
        />
        <a-select
          v-else-if="record.formType === 'combobox' || record.formType === 'organization'"
          style="width: 100%"
          :disabled="record.fieldRule === 'readonly'"
        >
          <a-select-option value="1">{{ $t('选项1') }}</a-select-option>
          <a-select-option value="2">{{ $t('选项2') }}</a-select-option>
        </a-select>
        <div v-else-if="record.formType === 'tag'">
          <a-tag>{{ $t('500元以下') }}</a-tag>
          <a-tag>{{ $t('500元~1000元') }}</a-tag>
          <a-tag>{{ $t('1000元以上') }}</a-tag>
          <a-icon type="tags" />
        </div>
        <a-radio-group v-else-if="record.formType == 'radio'" :disabled="record.fieldRule === 'readonly'">
          <a-radio value="1">{{ $t('选项1') }}</a-radio>
          <a-radio value="2">{{ $t('选项2') }}</a-radio>
        </a-radio-group>
        <a-checkbox-group v-else-if="record.formType == 'checkbox'" :disabled="record.fieldRule === 'readonly'">
          <a-checkbox value="1">{{ $t('选项1') }}</a-checkbox>
          <a-checkbox value="2">{{ $t('选项2') }}</a-checkbox>
        </a-checkbox-group>
        <a-button v-else-if="record.formType === 'location'">
          <a-badge status="default" />
          {{ $t('设置') }}
        </a-button>
        <a-tree-select
          v-else-if="record.formType === 'treeselect'"
          style="width: 100%"
          :placeholder="$t('请选择')"
          allow-clear
          tree-default-expand-all
        >
          <a-tree-select-node key="0-1" value="parent 1" :title="$t('根节点1')">
            <a-tree-select-node key="random" value="leaf1" :title="$t('叶子1')" />
            <a-tree-select-node key="random1" value="leaf2" :title="$t('叶子2')" />
          </a-tree-select-node>
          <a-tree-select-node key="0-2" value="parent 2" :title="$t('根节点2')">
            <a-tree-select-node key="random2" value="leaf3" :title="$t('叶子3')" />
            <a-tree-select-node key="random3" value="leaf4" :title="$t('叶子4')" />
          </a-tree-select-node>
        </a-tree-select>
        <a-switch
          v-else-if="record.formType === 'switch'"
          :checked="true"
          :disabled="record.fieldRule === 'readonly'"
        ></a-switch>
        <tiny-mce
          v-else-if="record.formType == 'editor'"
          :newOptions="{ height: '200px' }"
          :disabled="record.fieldRule === 'readonly'"
        />
        <a-input-number
          v-else-if="record.formType == 'number'"
          style="width: 100%"
          :disabled="record.fieldRule === 'readonly'"
        />
        <a-auto-complete
          v-else-if="record.formType === 'autocomplete'"
          style="width: 100%"
          :disabled="record.fieldRule === 'readonly'"
        />
        <a-rate
          v-else-if="record.formType === 'score'"
          style="width: 100%"
          :disabled="record.fieldRule === 'readonly'"
        />
        <a-upload
          v-else-if="record.formType === 'image'"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture-card"
          :disabled="record.fieldRule === 'readonly'"
        >
          <div
            :style="[
              record.fieldRule === 'readonly'
                ? {
                    margin: '-8px',
                    width: '118%',
                    height: '118%',
                    background: '#f5f5f5',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }
                : {}
            ]"
          >
            <a-icon type="plus" />
            <div>Upload</div>
          </div>
        </a-upload>
        <a-upload
          v-else-if="record.formType === 'file'"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :disabled="record.fieldRule === 'readonly'"
        >
          <a-button :disabled="record.fieldRule === 'readonly'">
            <a-icon type="upload" />
            Upload
          </a-button>
        </a-upload>
        <a-cascader
          v-if="record.formType == 'cascader'"
          :disabled="record.fieldRule === 'readonly'"
          style="width: 100%"
          :options="[
            {
              value: 'zhejiang',
              label: 'Zhejiang',
              children: [
                {
                  value: 'hangzhou',
                  label: 'Hangzhou',
                  children: [
                    {
                      value: 'xihu',
                      label: 'West Lake'
                    }
                  ]
                }
              ]
            },
            {
              value: 'jiangsu',
              label: 'Jiangsu',
              children: [
                {
                  value: 'nanjing',
                  label: 'Nanjing',
                  children: [
                    {
                      value: 'zhonghuamen',
                      label: 'Zhong Hua Men'
                    }
                  ]
                }
              ]
            }
          ]"
          :placeholder="$t('请选择')"
        />
        <!-- 子表 -->
        <a-table
          v-else-if="record.formType === 'subform'"
          size="small"
          :pagination="false"
          rowKey="id"
          :columns="columns"
          :dataSource="[{ id: 1, name: $t('子表'), formType: 'subform' }]"
        ></a-table>
        <!-- 关联数据 -->
        <a-input-search v-else-if="record.formType === 'associated'" :disabled="record.fieldRule === 'readonly'" />
        <!-- 地址选择 -->
        <address-select
          v-else-if="record.formType === 'address'"
          style="margin-top: -1px"
          :fieldRule="record.fieldRule"
        />
        <div v-else-if="record.type === 'formmark'">
          <a-timeline>
            <a-timeline-item>
              <h3>{{ moment(new Date()).format('YYYY-MM-DD hh:mm:ss') }} {{ $t('账号(真实姓名)') }}</h3>
              <a-table
                size="small"
                :pagination="false"
                rowKey="id"
                :columns="columnsMark"
                :dataSource="[{ id: 1, name: $t('项目负责人'), before: $t('李四'), after: $t('张三') }]"
              ></a-table>
            </a-timeline-item>
            <a-timeline-item>
              <h3>{{ moment(new Date()).format('YYYY-MM-DD hh:mm:ss') }} {{ $t('账号(真实姓名)') }}</h3>
              <a-table
                size="small"
                :pagination="false"
                rowKey="id"
                :columns="columnsMark"
                :dataSource="[{ id: 1, name: $t('项目负责人'), before: $t('王五'), after: $t('李四') }]"
              ></a-table>
            </a-timeline-item>
          </a-timeline>
        </div>
        <span v-if="!record.formType"></span>
      </a-form-item>
      <!-- 分割线 -->
      <div v-else-if="record.type === 'divider'">
        <!-- 分割线 -->
        <a-divider
          v-if="record.label !== '' && record.options && record.options.orientation"
          :orientation="record.options.orientation"
        >
          {{ record.label }}
        </a-divider>
        <a-divider v-else-if="record.dividerText" :orientation="record.dividerDirection">
          {{ record.dividerText ? record.dividerText : $t('分隔符') }}
        </a-divider>
        <a-divider v-else-if="record.label !== ''">{{ record.label }}</a-divider>
        <a-divider v-else-if="record.label === ''" />
      </div>
      <h3 v-else-if="record.type === 'dividerTag'" style="display: flex; align-items: center">
        <tag-icon />
        <span style="padding-left: 5px">{{ record.label }}</span>
      </h3>
      <!-- 客户画像 -->
      <a-form-item v-else-if="record.type === 'portrait'" style="padding-right: 20px">
        <a-row type="flex" align="middle">
          <a-col :span="24" style="text-align: center">
            <img src="./men.png" alt="" style="width: 75px; height: auto" />
          </a-col>
          <a-col :span="24">
            <a-row type="flex" justify="center">
              <a-col :span="2"><a-icon type="man" style="color: #722ed1" /></a-col>
              <a-col :span="4">{{ $t('36岁') }}</a-col>
              <a-col :span="2"><a-icon type="environment" style="color: #1890ff" /></a-col>
              <a-col :span="6">{{ $t('广东深圳') }}</a-col>
              <a-col :span="2"><a-icon type="star" /></a-col>
              <a-col :span="4">128</a-col>
            </a-row>
          </a-col>
          <a-col :span="24">
            <a-row type="flex" justify="center">
              <a-col :span="4" style="text-align: center"></a-col>
              <a-col :span="4" style="text-align: center"><a-button icon="edit" shape="circle" /></a-col>
              <a-col :span="4" style="text-align: center"><a-button icon="phone" shape="circle" /></a-col>
              <a-col :span="4" style="text-align: center"><a-button icon="mail" shape="circle" /></a-col>
              <a-col :span="4" style="text-align: center"><a-button icon="more" shape="circle" /></a-col>
              <a-col :span="4" style="text-align: center"></a-col>
            </a-row>
          </a-col>
          <a-divider :dashed="true" style="margin: 12px 0 6px 0" />
          <a-col :span="24">
            <a-row>
              <a-col :span="23">
                <a-icon type="tag" />
                {{ $t('客户画像') }}
              </a-col>
              <a-col :span="1"><a-icon type="edit" /></a-col>
            </a-row>
          </a-col>
          <a-col>
            <a-tag color="orange">{{ $t('男') }}</a-tag>
            <a-tag color="orange">{{ $t('线下门店') }}</a-tag>
            <a-tag color="orange">{{ $t('双子座') }}</a-tag>
            <a-tag color="orange">{{ $t('企业高管') }}</a-tag>
            <a-tag color="purple">{{ $t('月签到22天') }}</a-tag>
          </a-col>
          <a-divider :dashed="true" style="margin: 12px 0 6px 0" />
          <a-col :span="24">
            <a-row>
              <a-col :span="24">
                <a-icon type="deployment-unit" />
                {{ $t('交互数据') }}
              </a-col>
              <a-col>
                <a-tag color="purple">{{ $t('咨询 18') }}</a-tag>
                <a-tag color="purple">{{ $t('产品 6') }}</a-tag>
                <a-tag color="purple">{{ $t('投诉 1') }}</a-tag>
                <a-tag color="purple">{{ $t('订单 10') }}</a-tag>
                <a-tag color="purple">{{ $t('安装 8') }}</a-tag>
                <a-tag color="purple">{{ $t('来电 35') }}</a-tag>
                <a-tag color="purple">{{ $t('维修 1') }}</a-tag>
                <a-tag color="purple">{{ $t('不满意 0') }}</a-tag>
              </a-col>
            </a-row>
          </a-col>
          <a-col></a-col>
          <a-divider :dashed="true" style="margin: 12px 0 6px 0" />
          <a-col :span="24">
            <a-icon type="user" />
            {{ $t('联系信息') }}
          </a-col>
          <a-row type="flex" align="middle" :gutter="16">
            <a-col :span="8" style="text-align: right; font-size: 13px; color: #8c8c8c">{{ $t('电话1') }}</a-col>
            <a-col :span="16" style="font-size: 13px">13800138000</a-col>
            <a-col :span="8" style="text-align: right; font-size: 13px; color: #8c8c8c">{{ $t('电话2') }}</a-col>
            <a-col :span="16" style="font-size: 13px">13800138001</a-col>
            <a-col :span="8" style="text-align: right; font-size: 13px; color: #8c8c8c">{{ $t('邮箱') }}</a-col>
            <a-col :span="16" style="font-size: 13px">XXX@XXXXX.com</a-col>
            <a-col :span="8" style="text-align: right; font-size: 13px; color: #8c8c8c">{{ $t('客户类别') }}</a-col>
            <a-col :span="16" style="font-size: 13px">{{ $t('普通客户') }}</a-col>
            <a-col :span="8" style="text-align: right; font-size: 13px; color: #8c8c8c">{{ $t('详细地址') }}</a-col>
            <a-col :span="16" style="font-size: 13px">{{ $t('客户的详细地址信息') }}</a-col>
          </a-row>
        </a-row>
      </a-form-item>
      <a-form-item v-else-if="record.type === 'lifeCycle'">
        <a-timeline>
          <a-timeline-item>
            <div>{{ $t('时间：2016年2月11日') }}</div>
            <div>{{ $t('事件：首次购买净水器订单，完成') }}</div>
          </a-timeline-item>
          <a-timeline-item>
            <div>{{ $t('时间：2016年2月14日') }}</div>
            <div>{{ $t('事件：上门安装，完成') }}</div>
          </a-timeline-item>
          <a-timeline-item>
            <div>{{ $t('时间：2016年5月13日') }}</div>
            <div>{{ $t('事件：新产品使用三个月体验回访，满意') }}</div>
          </a-timeline-item>
          <a-timeline-item>
            <div>{{ $t('时间：2018年12月13日') }}</div>
            <div>{{ $t('事件：上门维修，完成') }}</div>
          </a-timeline-item>
          <a-timeline-item>
            <div>{{ $t('时间：2018年12月15日') }}</div>
            <div>{{ $t('事件：维修服务回访，满意') }}</div>
          </a-timeline-item>
          <a-timeline-item>
            <div>{{ $t('时间：2019年2月13日') }}</div>
            <div>{{ $t('事件：3年老客户NPS调研回访，9分(愿意推荐)') }}</div>
          </a-timeline-item>
          <a-timeline-item>
            <div>{{ $t('时间：2020年2月13日') }}</div>
            <div>{{ $t('事件：产品到期提醒-以旧换新推荐，完成') }}</div>
          </a-timeline-item>
          <a-timeline-item>
            <div>{{ $t('时间：2020年3月8日') }}</div>
            <div>{{ $t('事件：二次购买净水器订单，完成') }}</div>
          </a-timeline-item>
        </a-timeline>
      </a-form-item>
      <!-- 子表DW -->
      <a-form-item v-else-if="record.type === 'subform' || record.type === 'flowlog' || record.type === 'urgelog'">
        <label v-text="record.label"></label>
      </a-form-item>
      <!-- 可隐藏label -->
      <!-- button按钮 -->
      <a-form-item v-else-if="!(record.options.hidden === true) && record.type === 'button'">
        <a-button
          :disabled="disabled || record.options.disabled"
          :type="record.options.type"
          :html-type="record.options.handle === 'submit' ? 'submit' : undefined"
          @click="
            record.options.handle === 'submit'
              ? false
              : record.options.handle === 'reset'
              ? $emit('handleReset')
              : dynamicData[record.options.dynamicFun]
              ? dynamicData[record.options.dynamicFun]()
              : false
          "
          v-text="record.label"
        ></a-button>
      </a-form-item>
      <!-- alert提示 -->
      <a-form-item v-else-if="!(record.options.hidden === true) && record.type === 'alert'">
        <a-alert
          :message="record.label"
          :description="record.options.description"
          :type="record.options.type"
          :showIcon="record.options.showIcon === '1'"
          :closable="record.options.closable === '1'"
          :banner="record.options.banner === '1'"
        />
      </a-form-item>
      <!-- 文本 -->
      <a-form-item v-else-if="!(record.options.hidden === true) && record.type === 'text'">
        <div :style="{ textAlign: record.options.textAlign }">
          <label :class="{ 'ant-form-item-required': record.options.showRequiredMark }" v-text="record.label"></label>
        </div>
      </a-form-item>
      <!-- 占位符 -->
      <a-form-item v-else-if="!(record.options.hidden === true) && record.type === 'placeholder'">
        <div :style="{ textAlign: record.options.textAlign }">
          <label :class="{ 'ant-form-item-required': record.options.showRequiredMark }" v-text="record.label"></label>
        </div>
      </a-form-item>
      <!-- html -->
      <div
        v-else-if="!(record.options.hidden === true) && record.type === 'html'"
        v-dompurify-html="record.options.defaultValue"
      ></div>
      <!-- 自定义组件 -->
      <customComponent
        v-else-if="customList.includes(record.type)"
        :record="record"
        :disabled="disabled"
        :dynamicData="dynamicData"
        :formConfig="formConfig"
      />
    </div>
    <div v-else>
      <a-form-item
        v-if="record.formType === 'image'"
        :label-col="record.labelLocal === '1' ? {} : labelCol"
        :wrapper-col="record.labelLocal === '1' ? {} : wrapperCol"
        :label="!record.labelShow || record.labelShow === '1' ? record.name : false"
      >
        <div
          :style="{
            width: '75px',
            height: '75px',
            border: '1px solid #000',
            'border-radius': record.borderRadius === '1' ? '50%' : '5px'
          }"
        ></div>
      </a-form-item>
      <div v-else-if="record.type === 'divider'">
        <a-divider style="margin: 0px" />
      </div>
      <div v-else>
        <div v-if="record.fontSize === '1'" :style="{ 'font-weight': 'bold', 'font-size': '2em' }">
          <span v-if="!record.labelShow || record.labelShow === '1'" :style="{ color: record.labelColor }">
            {{ record.name }}{{ record.labelColor }} :
          </span>
          <span
            :style="{
              borderRadius: '2px',
              color: record.color,
              background: record.backGroundColor,
              paddingTop: record.topPadding + 'px',
              paddingBottom: record.bottomPadding + 'px',
              paddingLeft: record.leftPadding + 'px',
              paddingRight: record.rightPadding + 'px',
              marginTop: record.topMargin + 'px',
              marginBottom: record.bottomMargin + 'px',
              marginLeft: record.leftMargin + 'px',
              marginRight: record.rightMargin + 'px',
              display: 'inline-block'
            }"
          >
            {{ record.name }}
          </span>
        </div>
        <h2 v-else-if="record.fontSize === '2'">
          <span v-if="!record.labelShow || record.labelShow === '1'" :style="{ color: record.labelColor }">
            {{ record.name }} :
          </span>
          <span
            :style="{
              borderRadius: '2px',
              color: record.color,
              background: record.backGroundColor,
              paddingTop: record.topPadding + 'px',
              paddingBottom: record.bottomPadding + 'px',
              paddingLeft: record.leftPadding + 'px',
              paddingRight: record.rightPadding + 'px',
              marginTop: record.topMargin + 'px',
              marginBottom: record.bottomMargin + 'px',
              marginLeft: record.leftMargin + 'px',
              marginRight: record.rightMargin + 'px',
              display: 'inline-block'
            }"
          >
            {{ record.name }}
          </span>
        </h2>
        <h3 v-else-if="record.fontSize === '3'">
          <span v-if="!record.labelShow || record.labelShow === '1'" :style="{ color: record.labelColor }">
            {{ record.name }} :
          </span>
          <span
            :style="{
              borderRadius: '2px',
              color: record.color,
              background: record.backGroundColor,
              paddingTop: record.topPadding + 'px',
              paddingBottom: record.bottomPadding + 'px',
              paddingLeft: record.leftPadding + 'px',
              paddingRight: record.rightPadding + 'px',
              marginTop: record.topMargin + 'px',
              marginBottom: record.bottomMargin + 'px',
              marginLeft: record.leftMargin + 'px',
              marginRight: record.rightMargin + 'px',
              display: 'inline-block'
            }"
          >
            {{ record.name }}
          </span>
        </h3>
        <h4 v-else-if="record.fontSize === '4'">
          <span v-if="!record.labelShow || record.labelShow === '1'" :style="{ color: record.labelColor }">
            {{ record.name }} :
          </span>
          <span
            :style="{
              borderRadius: '2px',
              color: record.color,
              background: record.backGroundColor,
              paddingTop: record.topPadding + 'px',
              paddingBottom: record.bottomPadding + 'px',
              paddingLeft: record.leftPadding + 'px',
              paddingRight: record.rightPadding + 'px',
              marginTop: record.topMargin + 'px',
              marginBottom: record.bottomMargin + 'px',
              marginLeft: record.leftMargin + 'px',
              marginRight: record.rightMargin + 'px',
              display: 'inline-block'
            }"
          >
            {{ record.name }}
          </span>
        </h4>
        <h5 v-else-if="record.fontSize === '5'">
          <span v-if="!record.labelShow || record.labelShow === '1'" :style="{ color: record.labelColor }">
            {{ record.name }} :
          </span>
          <span
            :style="{
              borderRadius: '2px',
              color: record.color,
              background: record.backGroundColor,
              paddingTop: record.topPadding + 'px',
              paddingBottom: record.bottomPadding + 'px',
              paddingLeft: record.leftPadding + 'px',
              paddingRight: record.rightPadding + 'px',
              marginTop: record.topMargin + 'px',
              marginBottom: record.bottomMargin + 'px',
              marginLeft: record.leftMargin + 'px',
              marginRight: record.rightMargin + 'px',
              display: 'inline-block'
            }"
          >
            {{ record.name }}
          </span>
        </h5>
        <h6 v-else-if="record.fontSize === '6'">
          <span v-if="!record.labelShow || record.labelShow === '1'" :style="{ color: record.labelColor }">
            {{ record.name }} :
          </span>
          <span
            :style="{
              borderRadius: '2px',
              color: record.color,
              background: record.backGroundColor,
              paddingTop: record.topPadding + 'px',
              paddingBottom: record.bottomPadding + 'px',
              paddingLeft: record.leftPadding + 'px',
              paddingRight: record.rightPadding + 'px',
              marginTop: record.topMargin + 'px',
              marginBottom: record.bottomMargin + 'px',
              marginLeft: record.leftMargin + 'px',
              marginRight: record.rightMargin + 'px',
              display: 'inline-block'
            }"
          >
            {{ record.name }}
          </span>
        </h6>
        <div v-else>
          <span v-if="!record.labelShow || record.labelShow === '1'" :style="{ color: record.labelColor }">
            {{ record.name }} :
          </span>
          <span
            :style="{
              borderRadius: '2px',
              color: record.color,
              background: record.backGroundColor,
              paddingTop: record.topPadding + 'px',
              paddingBottom: record.bottomPadding + 'px',
              paddingLeft: record.leftPadding + 'px',
              paddingRight: record.rightPadding + 'px',
              marginTop: record.topMargin + 'px',
              marginBottom: record.bottomMargin + 'px',
              marginLeft: record.leftMargin + 'px',
              marginRight: record.rightMargin + 'px',
              display: 'inline-block'
            }"
          >
            {{ record.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/*
 * author kcz
 * date 2019-11-20
 */
import Vue from 'vue'
import { Rate, Timeline } from 'ant-design-vue'
Vue.use(Rate)
Vue.use(Timeline)
export default {
  name: 'KFormItem',
  i18n: window.lang('admin'),
  components: {
    customComponent: () => import('./customComponent'),
    AddressSelect: () => import('@/views/admin/Field/AddressSelect'),
    TabsSelect: () => import('@/views/admin/Field/TabsSelect'),
    TinyMce: () => import('@/components/Editor/TinyMce')
  },
  props: {
    // 表单数组
    record: {
      type: Object,
      required: true
    },
    // form-item 宽度配置
    formConfig: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      default: () => ({})
    },
    dynamicData: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      labelCol: { style: 'width: 100px; display: inline-block' },
      wrapperCol: { style: 'width: calc(100% - 100px); display: inline-block' },
      columns: [{
        title: this.$t('字段名称'),
        dataIndex: 'name'
      }, {
        title: this.$t('UI组件'),
        dataIndex: 'formType'
      }],
      columnsMark: [{
        title: this.$t('变更字段'),
        dataIndex: 'name'
      }, {
        title: this.$t('变更前'),
        dataIndex: 'before'
      }, {
        title: this.$t('变更后'),
        dataIndex: 'after'
      }]
    }
  },
  computed: {
    customList () {
      if (window.$customComponentList) {
        return window.$customComponentList.map(item => item.type)
      } else {
        return []
      }
    }
  }
}
</script>
<style lang="less" scoped>
.slider-box {
  display: flex;
  > .slider {
    flex: 1;
    margin-right: 16px;
  }
  > .number {
    width: 70px;
  }
}
.anticon.anticon-question-circle-o {
  margin-left: 5px;
}
</style>
