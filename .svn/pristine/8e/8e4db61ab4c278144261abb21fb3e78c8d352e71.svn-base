<template>
  <div class="properties-centent kk-checkbox">
    <div class="head-title">
      {{ $t('控件属性设置') }} -
      <span v-if="selectItem.formType === 'text'">{{ $t('单行文本') }}</span>
      <span v-else-if="selectItem.formType === 'combobox'">{{ $t('下拉框') }}</span>
      <span v-else-if="selectItem.formType === 'associated'">{{ $t('关联数据') }}</span>
      <span v-else-if="selectItem.formType === 'datetime'">{{ $t('日期时间') }}</span>
      <span v-else-if="selectItem.formType === 'textarea'">{{ $t('多行文本') }}</span>
      <span v-else-if="selectItem.formType === 'radio'">{{ $t('单选框') }}</span>
      <span v-else-if="selectItem.formType === 'checkbox'">{{ $t('复选框') }}</span>
      <span v-else-if="selectItem.formType === 'editor'">{{ $t('编辑器') }}</span>
      <span v-else-if="selectItem.formType === 'image'">{{ $t('图片') }}</span>
      <span v-else-if="selectItem.formType === 'file'">{{ $t('附件') }}</span>
      <span v-else-if="selectItem.formType === 'cascader'">{{ $t('级联选择') }}</span>
      <span v-else-if="selectItem.formType === 'switch'">{{ $t('开关') }}</span>
      <span v-else-if="selectItem.formType === 'score'">{{ $t('评分') }}</span>
      <span v-else-if="selectItem.formType === 'serialnumber'">{{ $t('流水号') }}</span>
      <span v-else-if="selectItem.formType === 'organization'">{{ $t('组织结构') }}</span>
      <span v-else-if="selectItem.formType === 'autocomplete'">{{ $t('自动完成') }}</span>
      <span v-else-if="selectItem.formType === 'number'">{{ $t('数字') }}</span>
      <span v-else-if="selectItem.formType === 'address'">{{ $t('地址') }}</span>
      <span v-else-if="selectItem.formType === 'treeselect'">{{ $t('树选择') }}</span>
      <span v-else-if="selectItem.formType === 'tag'">{{ $t('标签') }}</span>
      <span v-else-if="selectItem.formType === 'location'">{{ $t('地图选点') }}</span>
      <span v-else-if="selectItem.type === 'grid'">{{ $t('栅格布局') }}</span>
      <span v-else-if="selectItem.type === 'web_sub_data_window'">{{ $t('关联数据窗口') }}</span>
      <span v-else-if="selectItem.type === 'web_sub_form_view'">{{ $t('子表单') }}</span>
      <span v-else-if="selectItem.type === 'flowlog'">{{ $t('流程日志') }}</span>
      <span v-else-if="selectItem.type === 'urgelog'">{{ $t('催办日志') }}</span>
      <span v-else-if="selectItem.type === 'component'">{{ $t('自定义组件') }}</span>
      <span v-else-if="selectItem.type === 'editor'">{{ $t('富文本编辑器') }}</span>
      <span v-else-if="selectItem.type === 'html'">html</span>
      <span v-else-if="selectItem.type === 'button'">{{ $t('按钮') }}</span>
      <span v-else-if="selectItem.type === 'alert'">{{ $t('警告提示') }}</span>
      <span v-else-if="selectItem.type === 'formmark'">{{ $t('表单留痕') }}</span>
      <span v-else-if="selectItem.type === 'text'">{{ $t('文字') }}</span>
      <span v-else-if="selectItem.type === 'placeholder'">{{ $t('占位符') }}</span>
      <span v-else-if="selectItem.type === 'divider'">{{ $t('分割线') }}</span>
      <span v-else-if="selectItem.type === 'card'">{{ $t('卡片布局') }}</span>
      <span v-else-if="selectItem.type === 'tabs'">{{ $t('标签页布局') }}</span>
      <span v-else-if="selectItem.type === 'table'">{{ $t('表格布局') }}</span>
      <span v-else-if="selectItem.type === 'work'">{{ $t('流程办理方式') }}</span>
      <span v-else-if="selectItem.type === 'workRemark'">{{ $t('流程办理备注') }}</span>
      <span v-else-if="selectItem.type === 'portrait'">{{ $t('客户画像') }}</span>
      <span v-else-if="selectItem.type === 'lifeCycle'">{{ $t('生命周期') }}</span>
      <span v-else-if="selectItem.type === 'dividerTag'">{{ $t('分割标签') }}</span>
      <span v-else-if="selectItem.type === 'groupSearch'">{{ $t('搜索模板组') }}</span>
      <span v-else-if="selectItem.type === 'groupBtn'">{{ $t('排序按钮组') }}</span>
      <span v-else-if="selectItem.type === 'square'">{{ $t('宫格') }}</span>
      <span v-else-if="selectItem.type === 'externalPage'">{{ $t('外部页面') }}</span>
      <span v-else-if="selectItem.type === 'floatButton'">{{ $t('悬浮按钮') }}</span>
      <span v-else-if="selectItem.type === 'swiper'">{{ $t('轮播图') }}</span>
      <span v-else-if="selectItem.type === 'gap'">{{ $t('间隔槽') }}</span>
      <span v-else-if="selectItem.type === 'indicatorbox'">{{ $t('指标框组件') }}</span>
      <span v-else-if="selectItem.type === 'lineGroupButtons'">{{ $t('按钮组') }}</span>
      <span v-else>{{ $t('未选中控件') }}</span>
    </div>
    <div class="properties-body">
      <a-form v-show="selectItem.key !== ''">
        <!-- 字段 -->
        <template v-if="selectItem.type === 'field' && Object.keys(selectItem).length > 0">
          <a-form-item :label="$t('字段样式')">
            <a-radio-group v-model="selectItem.labelStyle" buttonStyle="solid">
              <a-radio-button value="label">{{ $t('有label') }}</a-radio-button>
              <a-radio-button value="noLabel">{{ $t('无label') }}</a-radio-button>
              <a-radio-button
                v-if="
                  entranceType === 'appDataDesign' &&
                  ['text', 'textarea', 'datetime', 'number', 'serialnumber', 'combobox'].includes(selectItem.formType)
                "
                value="tag"
              >
                {{ $t('标签') }}
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
          <template v-if="selectItem.labelStyle === 'label'">
            <a-form-item :label="$t('名称')">
              <a-input v-model="selectItem.name" :disabled="true" />
            </a-form-item>
            <a-form-item :label="$t('修改字段名称')">
              <a-input v-model="selectItem.changeTitle">
                <set-lang slot="addonAfter" />
              </a-input>
            </a-form-item>
            <!-- <a-form-item :label="$t('label字号')">
              <a-select v-model="selectItem.fontSize">
                <a-select-option key="default" value="default">{{ $t('正文') }}</a-select-option>
                <a-select-option key="h1" value="h1">h1</a-select-option>
                <a-select-option key="h2" value="h2">h2</a-select-option>
                <a-select-option key="h3" value="h3">h3</a-select-option>
                <a-select-option key="h4" value="h4">h4</a-select-option>
                <a-select-option key="h5" value="h5">h5</a-select-option>
                <a-select-option key="tip" value="tip">{{ $t('提示语') }}</a-select-option>
              </a-select>
            </a-form-item> -->
            <a-row>
              <a-col span="21">
                <a-form-item :label="$t('label字体色')"></a-form-item>
              </a-col>
              <a-col span="3">
                <colorSelect
                  :color="selectItem.color"
                  @changeColor="
                    (val) => {
                      selectItem.color = val
                    }
                  "
                ></colorSelect>
              </a-col>
            </a-row>
            <a-row>
              <a-col span="21">
                <a-form-item :label="$t('label背景色')"></a-form-item>
              </a-col>
              <a-col span="3">
                <colorSelect
                  :color="selectItem.backgroundColor"
                  @changeColor="
                    (val) => {
                      selectItem.backgroundColor = val
                    }
                  "
                ></colorSelect>
              </a-col>
            </a-row>
          </template>
          <template v-if="selectItem.labelStyle === 'tag'">
            <a-form-item :label="$t('标签大小')">
              <a-radio-group v-model="selectItem.size">
                <a-radio-button :value="'default'">{{ $t('默认') }}</a-radio-button>
                <a-radio-button :value="'mini'">{{ $t('迷你') }}</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item :label="$t('标签主题类型')">
              <a-select v-model="selectItem.tagType">
                <a-select-option key="success" value="success">success</a-select-option>
                <a-select-option key="info" value="info">info</a-select-option>
                <a-select-option key="warning" value="warning">warning</a-select-option>
                <a-select-option key="error" value="error">error</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('标签形状')">
              <a-select v-model="selectItem.shape">
                <a-select-option key="square" value="success">square</a-select-option>
                <a-select-option key="circle" value="circle">circle</a-select-option>
                <a-select-option key="circleLeft" value="circleLeft">circleLeft</a-select-option>
                <a-select-option key="circleRight" value="circleRight">circleRight</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('标签形态')">
              <a-radio-group v-model="selectItem.mode">
                <a-radio-button :value="'light'">{{ $t('light') }}</a-radio-button>
                <a-radio-button :value="'dark'">{{ $t('dark') }}</a-radio-button>
                <a-radio-button :value="'plain'">{{ $t('plain') }}</a-radio-button>
              </a-radio-group>
            </a-form-item>
          </template>
          <a-form-item :label="$t('字号')">
            <a-select v-model="selectItem.fontSize">
              <a-select-option key="default" value="default">{{ $t('正文') }}</a-select-option>
              <a-select-option key="h1" value="h1">h1</a-select-option>
              <a-select-option key="h2" value="h2">h2</a-select-option>
              <a-select-option key="h3" value="h3">h3</a-select-option>
              <a-select-option key="h4" value="h4">h4</a-select-option>
              <a-select-option key="h5" value="h5">h5</a-select-option>
              <a-select-option key="tip" value="tip">{{ $t('提示语') }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('字体粗细')">
            <a-select v-model="selectItem.fontWeight">
              <a-select-option key="normal" value="normal">{{ $t('默认') }}</a-select-option>
              <a-select-option key="bold" value="bold">{{ $t('加粗') }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            v-if="selectItem.type === 'field' && selectItem.formType !== 'serialnumber'"
            :label="$t('操作属性')"
          >
            <a-radio-group v-model="selectItem.fieldRule">
              <a-radio value="allow">{{ $t('可见可编') }}</a-radio>
              <a-radio value="readonly">{{ $t('可见不可编') }}</a-radio>
              <a-radio value="hidden">{{ $t('不可见可提交') }}</a-radio>
              <a-radio value="disabled">{{ $t('不可见不可提交') }}</a-radio>
            </a-radio-group>
          </a-form-item>
        </template>
        <!-- 按钮属性面板 -->
        <template v-if="selectItem.type === 'button'">
          <a-form-item :label="$t('文字')">
            <a-input v-model="options.text"></a-input>
          </a-form-item>
          <a-form-item :label="$t('按钮类型')">
            <a-select v-model="options.type">
              <a-select-option key="default" value="default">default</a-select-option>
              <a-select-option key="info" value="info">info</a-select-option>
              <a-select-option key="primary" value="primary">primary</a-select-option>
              <a-select-option key="success" value="success">success</a-select-option>
              <a-select-option key="warning" value="warning">warning</a-select-option>
              <a-select-option key="error" value="error">error</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('尺寸大小')">
            <a-radio-group v-model="options.size" buttonStyle="solid">
              <a-radio-button value="default">{{ $t('默认') }}</a-radio-button>
              <a-radio-button value="medium">{{ $t('中等') }}</a-radio-button>
              <a-radio-button value="mini">{{ $t('迷你') }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item :label="$t('形状')">
            <a-radio-group v-model="options.shape" buttonStyle="solid">
              <a-radio-button value="square">{{ $t('直角') }}</a-radio-button>
              <a-radio-button value="circle">{{ $t('圆角') }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-row>
            <a-col span="20">
              <a-form-item :label="$t('镂空')"></a-form-item>
            </a-col>
            <a-col v-if="String(options.plain) !== 'undefined'" span="3">
              <a-switch v-model="options.plain" style="position: absolute; right: 0; top: 9px"></a-switch>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="20">
              <a-form-item :label="$t('水波纹')"></a-form-item>
            </a-col>
            <a-col v-if="String(options.ripple) !== 'undefined'" span="3">
              <a-switch v-model="options.ripple" style="position: absolute; right: 0; top: 9px"></a-switch>
            </a-col>
          </a-row>
          <!-- <a-row>
            <a-col span="20">
              <a-form-item :label="$t('细边框')"></a-form-item>
            </a-col>
            <a-col v-if="String(options.hairLine) !== 'undefined'" span="3">
              <a-switch v-model="options.hairLine" style="position: absolute; right: 0; top: 9px"></a-switch>
            </a-col>
          </a-row> -->
          <a-form-item v-if="entranceType !== 'appDataDesign'" :label="$t('按钮事件')">
            <a-radio-group
              v-model="options.buttonEvent"
              buttonStyle="solid"
              @change="
                () => {
                  options.systemFunc = undefined
                  options.specificFunc = undefined
                  options.selfDefFunc = ''
                }
              "
            >
              <a-radio-button value="specific">{{ $t('特定功能') }}</a-radio-button>
              <a-radio-button value="selfDef">{{ $t('自定义') }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            v-if="options.buttonEvent === 'system' && entranceType === 'appDataDesign'"
            :label="$t('绑定行操作按钮')"
          >
            <a-select v-model="options.systemFunc" allowClear :placeholder="$t('请选择行操作按钮')">
              <a-select-option
                v-for="item in dataWindowButtons.filter((item) => item.position === 'line')"
                :key="item.usage"
                :value="item.usage"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item v-if="options.buttonEvent === 'specific'">
            <a-select v-model="options.specificFunc" allowClear :placeholder="$t('请选择特定功能')">
              <a-select-option key="1" value="1">{{ $t('复制') }}</a-select-option>
              <a-select-option key="2" value="2">{{ $t('地理位置') }}</a-select-option>
              <a-select-option key="3" value="3">{{ $t('电话') }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-button v-if="options.buttonEvent === 'selfDef'" @click="buttoCodeEditor">{{ $t('附加属性') }}</a-button>
        </template>
        <!-- 分割线 -->
        <template v-if="selectItem.type === 'divider'">
          <a-form-item :label="$t('标题')">
            <a-input v-model="options.title" :placeholder="$t('请输入')" />
          </a-form-item>
          <a-form-item :label="$t('标题大小(px)')">
            <a-input-number v-model="options.fontSize" :placeholder="$t('请输入')" />
          </a-form-item>
          <a-form-item :label="$t('单边线宽')">
            <a-radio-group v-model="options.halfWidth" buttonStyle="solid" style="width: 100%">
              <a-radio-button :value="50">{{ $t('短') }}</a-radio-button>
              <a-radio-button :value="150">{{ $t('中') }}</a-radio-button>
              <a-radio-button :value="250">{{ $t('长') }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-row>
            <a-col span="21"><a-form-item :label="$t('标题颜色')"></a-form-item></a-col>
            <a-col span="3">
              <colorSelect
                :color="options.color"
                @changeColor="
                  (val) => {
                    options.color = val
                  }
                "
              ></colorSelect>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="21">
              <a-form-item :label="$t('分割线颜色')"></a-form-item>
            </a-col>
            <a-col span="3">
              <colorSelect
                :color="options.borderColor"
                @changeColor="
                  (val) => {
                    options.borderColor = val
                  }
                "
              ></colorSelect>
            </a-col>
          </a-row>
        </template>
        <!-- 卡片 -->
        <template v-if="selectItem.type === 'card'">
          <a-form-item :label="$t('卡片标题')">
            <a-input v-model="options.title"></a-input>
          </a-form-item>
          <a-form-item :label="$t('标题大小(px)')">
            <a-input-number v-model="options.titleSize"></a-input-number>
          </a-form-item>
          <a-row>
            <a-col span="21"><a-form-item :label="$t('标题颜色')"></a-form-item></a-col>
            <a-col span="3">
              <colorSelect
                :color="options.titleColor"
                @changeColor="
                  (val) => {
                    options.titleColor = val
                  }
                "
              ></colorSelect>
            </a-col>
          </a-row>
          <a-form-item :label="$t('边框')">
            <a-switch v-model="options.border"></a-switch>
          </a-form-item>
        </template>
        <!-- 文字 -->
        <template v-if="selectItem.type === 'text'">
          <a-form-item :label="$t('文字内容')">
            <a-textarea v-model="options.description" :auto-size="{ minRows: 5, maxRows: 10 }" />
          </a-form-item>
          <a-form-item :label="$t('文字大小')">
            <a-select v-model="options.size">
              <a-select-option key="default" value="default">{{ $t('正文') }}</a-select-option>
              <a-select-option key="h1" value="h1">h1</a-select-option>
              <a-select-option key="h2" value="h2">h2</a-select-option>
              <a-select-option key="h3" value="h3">h3</a-select-option>
              <a-select-option key="h4" value="h4">h4</a-select-option>
              <a-select-option key="h5" value="h5">h5</a-select-option>
              <a-select-option key="tip" value="tip">{{ $t('提示语') }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-row>
            <a-col span="21"><a-form-item :label="$t('文字颜色')"></a-form-item></a-col>
            <a-col span="3">
              <colorSelect
                :color="options.color"
                @changeColor="
                  (val) => {
                    options.color = val
                  }
                "
              ></colorSelect>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="21"><a-form-item :label="$t('文字背景颜色')"></a-form-item></a-col>
            <a-col span="3">
              <colorSelect
                :color="options.backgroundColor"
                @changeColor="
                  (val) => {
                    options.backgroundColor = val
                  }
                "
              ></colorSelect>
            </a-col>
          </a-row>
          <a-form-item v-if="selectItem.type === 'text'" :label="$t('文字对齐方式')">
            <a-radio-group v-model="options.textAlign" buttonStyle="solid">
              <a-radio-button value="left">{{ $t('左') }}</a-radio-button>
              <a-radio-button value="center">{{ $t('居中') }}</a-radio-button>
              <a-radio-button value="right">{{ $t('右') }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </template>
        <!-- 修改html -->
        <template v-if="selectItem.type === 'html'">
          <a-form-item :label="$t('默认值')">
            <a-textarea v-model="options.defaultValue" :autoSize="{ minRows: 4, maxRows: 8 }" />
          </a-form-item>
        </template>
        <!-- 自定义组件 -->
        <template v-if="selectItem.type === 'component'">
          <a-form-item :label="$t('自定义文件路径')">
            <a-input v-model="selectItem.filePath" />
          </a-form-item>
          <a-form-item>
            <span slot="label">{{ $t('附加属性') }}</span>
            <a-button type="primary" size="small" @click="codeEditor">{{ $t('设置') }}</a-button>
            <a-tag
              v-if="selectItem.attribute != null && selectItem.attribute != ''"
              color="green"
              style="margin-left: 8px"
            >
              {{ $t('已设置') }}
            </a-tag>
            <a-tag v-else style="margin-left: 8px">{{ $t('未设置') }}</a-tag>
          </a-form-item>
        </template>
        <!-- 间隔槽 -->
        <template v-if="selectItem.type === 'gap'">
          <a-form-item :label="$t('间隔槽高度(px)')" :labelCol="{ span: 10 }" :wrapperCol="{ span: 10, offset: 4 }">
            <a-input-number v-model="options.height"></a-input-number>
          </a-form-item>
          <a-form-item :label="$t('背景颜色')" :labelCol="{ span: 10 }" :wrapperCol="{ span: 4, offset: 10 }">
            <colorSelect
              :color="options.bgColor"
              :colorArr="['#F3F4F6', '#2979FF', '#FA3534', '#ff9900', '#19be6b']"
              @changeColor="
                (val) => {
                  options.bgColor = val
                }
              "
            ></colorSelect>
          </a-form-item>
        </template>
        <!-- 标签页 -->
        <template v-if="selectItem.type === 'tabs'">
          <a-row>
            <a-col span="4">
              <a-form-item :label="$t('标签页')"></a-form-item>
            </a-col>
            <a-col span="4" offset="14" style="line-height: 39px">
              <a-button
                type="link"
                @click="
                  () => {
                    selectItem.columns.push({
                      label: '标签标题',
                      list: []
                    })
                  }
                "
              >
                {{ $t('添加') }}
              </a-button>
            </a-col>
          </a-row>
          <draggable
            v-model="options.columns"
            animation="200"
            handle=".handle"
            :style="{
              'flex-grow': 1,
              overflow: 'auto',
              display: 'flex',
              'flex-flow': 'column wrap',
              'align-content': 'flex-start'
            }"
            @start="drag = true"
            @end="drag = false"
          >
            <a-row v-for="(item, index) in selectItem.columns" :key="index" :gutter="10" style="margin-bottom: 6px">
              <a-col span="3">
                <a-icon type="drag" class="handle" style="cursor: pointer" />
              </a-col>
              <a-col span="18">
                <a-input v-model="item.label"></a-input>
              </a-col>
              <a-col span="3">
                <a-icon
                  type="delete"
                  style="color: red; margin-left: 10px; cursor: pointer"
                  @click="
                    () => {
                      selectItem.columns.splice(index, 1)
                    }
                  "
                />
              </a-col>
            </a-row>
          </draggable>
          <a-form-item :label="$t('页签高度')" :labelCol="{ span: 7 }" :wrapperCol="{ span: 4, offset: 7 }">
            <a-input-number v-model="options.height"></a-input-number>
          </a-form-item>
        </template>
        <!-- 步骤条 -->
        <template v-if="selectItem.type === 'steps'">
          <a-form-item :label="$t('步骤条类型')">
            <a-radio-group v-model="options.mode">
              <a-radio-button value="dot">{{ $t('默认类型') }}</a-radio-button>
              <a-radio-button value="number">{{ $t('数字类型') }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item :label="$t('步骤条方向')">
            <a-radio-group v-model="options.direction">
              <a-radio-button value="row">{{ $t('水平') }}</a-radio-button>
              <a-radio-button value="column">{{ $t('竖直') }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item :label="$t('步骤条图标')" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <div>
              <a-switch
                v-if="String(options.useIcon) !== 'undefined'"
                v-model="options.useIcon"
                @change="
                  (val) => {
                    if (!val) {
                      options.icon = ''
                    }
                  }
                "
              ></a-switch>
              <set-icon
                v-if="options.useIcon"
                :currentIconProp="options.icon"
                @setUViewIcon="
                  (val) => {
                    options.icon = val
                  }
                "
              />
            </div>
          </a-form-item>

          <a-row>
            <a-col span="4">
              <a-form-item :label="$t('步骤')"></a-form-item>
            </a-col>
            <a-col span="4" offset="14" style="line-height: 39px">
              <a-button
                type="link"
                @click="
                  () => {
                    selectItem.columns.push({
                      name: '我是步骤条标题'
                    })
                  }
                "
              >
                {{ $t('添加') }}
              </a-button>
            </a-col>
          </a-row>
          <draggable
            v-model="selectItem.columns"
            animation="200"
            handle=".handle"
            :style="{
              'flex-grow': 1,
              overflow: 'auto',
              display: 'flex',
              'flex-flow': 'column wrap',
              'align-content': 'flex-start'
            }"
            @start="drag = true"
            @end="drag = false"
          >
            <a-row v-for="(item, index) in selectItem.columns" :key="index" :gutter="10" style="margin-bottom: 6px">
              <a-col span="3">
                <a-icon type="drag" class="handle" style="cursor: pointer" />
              </a-col>
              <a-col span="18">
                <a-input v-model="item.name"></a-input>
              </a-col>
              <a-col span="3">
                <a-icon
                  type="delete"
                  style="color: red; margin-left: 10px; cursor: pointer"
                  @click="
                    () => {
                      selectItem.columns.splice(index, 1)
                    }
                  "
                />
              </a-col>
            </a-row>
          </draggable>
        </template>
        <!-- 宫格 -->
        <template v-if="selectItem.type === 'square'">
          <a-form-item :label="$t('宫格列')">
            <a-input-number v-model="options.col"></a-input-number>
          </a-form-item>
          <div style="position: relative">
            <a-form-item :label="$t('宫格内容')"></a-form-item>
            <a-button
              style="position: absolute; top: 4px; right: 0"
              type="link"
              @click="
                () => {
                  selectItem.columns.push({
                    name: '',
                    icon: '',
                    pageList: [],
                    customPageUrl: '',
                    button: undefined,
                    type: '',
                    image: [],
                    usePermissions: []
                  })
                }
              "
            >
              {{ $t('添加') }}
            </a-button>
            <draggable
              v-model="selectItem.columns"
              animation="200"
              handle=".handle"
              @start="drag = true"
              @end="drag = false"
            >
              <a-row v-for="(item, index) in selectItem.columns" :key="index" style="width: 100%; margin-bottom: 6px">
                <a-col span="3">
                  <a-icon type="drag" class="handle" style="cursor: pointer" />
                </a-col>
                <a-col span="21">
                  <a-row style="margin-bottom: 6px">
                    <a-col :span="20">
                      <a-input v-model="item.name" :placeholder="$t('宫格名称')"></a-input>
                    </a-col>
                    <a-col :span="4">
                      <a-icon
                        type="delete"
                        style="color: red; margin-left: 10px; cursor: pointer"
                        @click="
                          () => {
                            selectItem.columns.splice(index, 1)
                          }
                        "
                      />
                    </a-col>
                  </a-row>
                  <a-row style="margin-bottom: 6px">
                    <a-select
                      v-model="item.type"
                      :placeholder="$t('请选择')"
                      @change="(val) => handleChangePageType(val, item)"
                    >
                      <a-select-option key="appBasicPage" value="appBasicPage">{{ $t('页面') }}</a-select-option>
                      <a-select-option key="appDataWindow" value="appDataWindow">{{ $t('数据窗口') }}</a-select-option>
                      <a-select-option key="custom" value="custom">{{ $t('自定义') }}</a-select-option>
                      <a-select-option key="button" value="button">{{ $t('按钮') }}</a-select-option>
                    </a-select>
                  </a-row>
                  <a-row>
                    <a-input v-if="'custom' === item.type" v-model="item.customPageUrl"></a-input>
                  </a-row>
                  <a-row style="margin-bottom: 6px">
                    <a-cascader
                      v-if="['appDataWindow', 'appBasicPage', 'button'].includes(item.type)"
                      v-model="item.pageList"
                      :placeholder="
                        item.type === 'appDataWindow'
                          ? $t('请选择数据窗口')
                          : item.type === 'button'
                          ? $t('请选择数据窗口')
                          : $t('请选择自定义页面')
                      "
                      :show-search="true"
                      option-filter-prop="children"
                      :options="
                        item.type === 'appDataWindow'
                          ? appDataViewList
                          : item.type === 'button'
                          ? appDataViewList
                          : appBasicPageList
                      "
                      :fieldNames="{
                        label: 'text',
                        value: 'value',
                        children: 'children'
                      }"
                    />
                  </a-row>
                  <a-row v-if="'button' === item.type" style="margin-bottom: 6px">
                    <a-select v-model="item.button" :placeholder="$t('工具栏按钮')">
                      <a-select-option
                        v-for="btnDataWinItem in dataWindowButtons.filter((btnItem) => btnItem.position === 'bar')"
                        :key="btnDataWinItem.usage"
                        :value="btnDataWinItem.usage"
                      >
                        {{ btnDataWinItem.name }}
                      </a-select-option>
                    </a-select>
                  </a-row>
                  <a-row style="margin-bottom: 6px">
                    <a @click="handleSearchPriv(item, index)">
                      <a-badge v-if="item.usePermissions && item.usePermissions.length > 0" status="success" />
                      <a-badge v-else status="default" />
                      {{ $t('权限设置') }}
                    </a>
                    <a
                      @click="
                        () => {
                          copyPermissionsVisible = true
                          copySourceTabbar = {
                            ...item,
                            id: index
                          }
                        }
                      "
                    >
                      {{ $t('权限复制') }}
                    </a>
                  </a-row>
                  <a-upload
                    :action="`${$store.state.env.VUE_APP_API_BASE_URL}admin/attachment/upload/?uploadName=upload`"
                    name="upload"
                    :fileList="item.image"
                    listType="picture-card"
                    :accept="'.png,.jpg,.jpeg,.gif,.bmp,.svg,.icon'"
                    :headers="{ 'Access-Token': $store.getters.userInfo.accessToken }"
                    :before-upload="
                      (file, fileList) => {
                        return beforeUpload(file, fileList, '.png,.jpg,.jpeg,.gif,.bmp,.icon,.svg')
                      }
                    "
                    @change="
                      (info) => {
                        fileChange(info, item)
                      }
                    "
                  >
                    <div v-if="String(item.image) === 'undefined' || item.image.length === 0">
                      <a-icon :type="loading ? 'loading' : 'plus'" />
                      <div>{{ $t('上传') }}</div>
                    </div>
                  </a-upload>
                </a-col>
              </a-row>
            </draggable>
          </div>
        </template>
        <!-- 指标框组件 -->
        <template v-if="selectItem.type === 'indicatorbox'">
          <a-form-item :label="$t('样式')">
            <a-radio-group
              v-model="options.styleType"
              @change="
                () => {
                  selectItem.columns.forEach((item) => {
                    item.color = '#ffffff'
                    item.image = []
                  })
                }
              "
            >
              <a-radio value="colorBlock">colorBlock</a-radio>
              <a-radio value="icon">icon</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item v-if="options.styleType === 'icon'" :label="$t('列')">
            <a-input-number v-model="options.col"></a-input-number>
          </a-form-item>
          <div style="position: relative">
            <a-form-item :label="$t('指标框内容')"></a-form-item>
            <a-button
              style="position: absolute; top: 4px; right: 0"
              type="link"
              @click="
                () => {
                  selectItem.columns.push({
                    name: undefined,
                    flowCondition: undefined,
                    color: '',
                    pageList: undefined,
                    flowConditionList: [],
                    image: []
                  })
                }
              "
            >
              {{ $t('添加') }}
            </a-button>
            <draggable
              v-model="selectItem.columns"
              animation="200"
              handle=".handle"
              @start="drag = true"
              @end="drag = false"
            >
              <a-row v-for="(item, index) in selectItem.columns" :key="index" style="width: 100%; margin-bottom: 6px">
                <a-col span="3">
                  <a-icon type="drag" class="handle" style="cursor: pointer" />
                </a-col>
                <a-col span="21">
                  <a-row style="margin-bottom: 6px">
                    <a-col :span="20">
                      <a-input v-model="item.name" :placeholder="$t('名称')"></a-input>
                    </a-col>
                    <a-col :span="4">
                      <a-icon
                        type="delete"
                        style="color: red; margin-left: 10px; cursor: pointer"
                        @click="
                          () => {
                            selectItem.columns.splice(index, 1)
                          }
                        "
                      />
                    </a-col>
                  </a-row>
                  <a-row style="margin-bottom: 6px">
                    <a-cascader
                      v-model="item.pageList"
                      :placeholder="$t('请选择数据窗口')"
                      :show-search="true"
                      option-filter-prop="children"
                      :options="appDataViewList"
                      :fieldNames="{
                        label: 'text',
                        value: 'value',
                        children: 'children'
                      }"
                      @change="(value, selectedOptions) => changeDataWindow(value, selectedOptions, item)"
                    />
                  </a-row>
                  <a-row>
                    <a-select v-model="item.flowCondition" allowClear :placeholder="$t('请选择流程筛选项')">
                      <!-- item.flowConditionList -->
                      <a-select-option
                        v-for="(flowConditionItem, idx) in item.flowConditionList"
                        :key="idx"
                        :value="flowConditionItem.value"
                      >
                        {{ flowConditionItem.label }}
                      </a-select-option>
                    </a-select>
                  </a-row>
                  <a-row v-if="options.styleType === 'colorBlock'">
                    <a-col span="21">
                      <a-form-item :label="$t('背景色')"></a-form-item>
                    </a-col>
                    <a-col span="3">
                      <colorSelect
                        :color="item.color"
                        @changeColor="
                          (val) => {
                            item.color = val
                          }
                        "
                      ></colorSelect>
                    </a-col>
                  </a-row>
                  <a-row style="margin-bottom: 6px">
                    <a @click="handleSearchPriv(item, index)">
                      <a-badge v-if="item.usePermissions && item.usePermissions.length > 0" status="success" />
                      <a-badge v-else status="default" />
                      {{ $t('权限设置') }}
                    </a>
                  </a-row>
                  <a-upload
                    v-if="options.styleType === 'icon'"
                    :action="`${$store.state.env.VUE_APP_API_BASE_URL}admin/attachment/upload/?uploadName=upload`"
                    name="upload"
                    :fileList="item.image"
                    listType="picture-card"
                    :accept="'.png,.jpg,.jpeg,.gif,.bmp,.svg,.icon'"
                    :headers="{ 'Access-Token': $store.getters.userInfo.accessToken }"
                    :before-upload="
                      (file, fileList) => {
                        return beforeUpload(file, fileList, '.png,.jpg,.jpeg,.gif,.bmp,.icon,.svg')
                      }
                    "
                    @change="
                      (info) => {
                        fileChange(info, item)
                      }
                    "
                  >
                    <div v-if="String(item.image) === 'undefined' || item.image.length === 0">
                      <a-icon :type="loading ? 'loading' : 'plus'" />
                      <div>{{ $t('上传') }}</div>
                    </div>
                  </a-upload>
                </a-col>
              </a-row>
            </draggable>
          </div>
        </template>
        <!-- 行操作按钮组 -->
        <template v-if="selectItem.type === 'lineGroupButtons'"></template>
        <!-- 轮播图 -->
        <template v-if="selectItem.type === 'swiper'">
          <a-form-item :label="$t('标题')" :labelCol="{ span: 5 }" :wrapperCol="{ span: 4, offset: 12 }">
            <a-switch v-model="options.title"></a-switch>
          </a-form-item>
          <a-form-item :label="$t('指示器')">
            <a-radio-group v-model="options.mode">
              <a-radio-button value="round">round</a-radio-button>
              <a-radio-button value="rect">rect</a-radio-button>
              <a-radio-button value="number">number</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item :label="$t('指示器位置')">
            <a-radio-group v-model="options.indicatorPos" style="width: 100%">
              <a-row style="margin-bottom: 6px">
                <a-col span="8">
                  <a-radio-button value="topLeft">{{ $t('上左') }}</a-radio-button>
                </a-col>
                <a-col span="8" offset="8">
                  <a-radio-button value="topRight ">{{ $t('上右') }}</a-radio-button>
                </a-col>
              </a-row>
              <a-row>
                <a-col span="8">
                  <a-radio-button value="bottomLeft">{{ $t('下左') }}</a-radio-button>
                </a-col>
                <a-col span="8">
                  <a-radio-button value="bottomCenter">{{ $t('下中') }}</a-radio-button>
                </a-col>
                <a-col span="8">
                  <a-radio-button value="bottomRight">{{ $t('下右') }}</a-radio-button>
                </a-col>
              </a-row>
            </a-radio-group>
          </a-form-item>
          <a-form-item :label="$t('3D效果')" :labelCol="{ span: 6 }" :wrapperCol="{ span: 4, offset: 12 }">
            <a-switch v-model="options.effect3d"></a-switch>
          </a-form-item>
          <a-form-item :label="$t('自动轮播')" :labelCol="{ span: 6 }" :wrapperCol="{ span: 4, offset: 12 }">
            <a-switch v-model="options.autoplay"></a-switch>
          </a-form-item>
          <a-form-item :label="$t('自动轮播时间间隔(ms)')">
            <a-input-number v-model="options.interval"></a-input-number>
          </a-form-item>
          <a-form-item :label="$t('切换一张图所需时间(ms)')">
            <a-input-number v-model="options.duration"></a-input-number>
          </a-form-item>
          <a-form-item :label="$t('轮播图组件高度(px)')">
            <a-input-number v-model="options.height"></a-input-number>
          </a-form-item>
          <div style="position: relative">
            <a-form-item :label="$t('轮播图')"></a-form-item>
            <a-button
              style="position: absolute; top: 4px; right: 0"
              type="link"
              @click="
                () => {
                  selectItem.list.push({
                    image: [],
                    title: '',
                    page: ''
                  })
                }
              "
            >
              {{ $t('添加') }}
            </a-button>
            <draggable
              v-model="selectItem.list"
              animation="200"
              handle=".handle"
              @start="drag = true"
              @end="drag = false"
            >
              <a-row v-for="(item, index) in selectItem.list" :key="index" style="width: 100%; margin-bottom: 6px">
                <a-col span="3">
                  <a-icon type="drag" class="handle" style="cursor: pointer" />
                </a-col>
                <a-col span="18">
                  <a-input v-model="item.title" :placeholder="$t('轮播图标题')" style="margin-bottom: 6px"></a-input>
                  <a-upload
                    class="swiper-uploader"
                    :action="`${$store.state.env.VUE_APP_API_BASE_URL}admin/attachment/upload/?uploadName=upload`"
                    name="upload"
                    :fileList="item.image"
                    listType="picture-card"
                    :accept="'.png,.jpg,.jpeg,.gif,.bmp'"
                    :headers="{ 'Access-Token': $store.getters.userInfo.accessToken }"
                    :before-upload="
                      (file, fileList) => {
                        return beforeUpload(file, fileList, '.png,.jpg,.jpeg,.gif,.bmp')
                      }
                    "
                    @change="
                      (info) => {
                        fileChange(info, item)
                      }
                    "
                  >
                    <div v-if="item.image.length === 0" class="swiper-upload-img">
                      <a-icon :type="loading ? 'loading' : 'plus'" />
                      <div>{{ $t('上传') }}</div>
                    </div>
                  </a-upload>
                  <a-select v-model="item.page" :placeholder="$t('点击打开页面')" style="margin-top: 12px">
                    <a-select-option key="1" value="1">1</a-select-option>
                  </a-select>
                </a-col>
                <a-col span="3">
                  <a-icon
                    type="delete"
                    style="color: red; margin-left: 10px; cursor: pointer"
                    @click="
                      () => {
                        selectItem.list.splice(index, 1)
                      }
                    "
                  />
                </a-col>
              </a-row>
            </draggable>
          </div>
        </template>
        <!-- 折叠面板 -->
        <template v-if="selectItem.type === 'collapse'">
          <a-form-item :label="$t('折叠面板样式')">
            <a-radio-group v-model="options.frame">
              <a-radio-button :value="true">{{ $t('带边框') }}</a-radio-button>
              <a-radio-button :value="false">{{ $t('简洁') }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item :label="$t('同时展开多个面板')" :labelCol="{ span: 12 }" :wrapperCol="{ span: 4, offset: 8 }">
            <a-switch
              v-model="options.notAccordion"
              @change="
                (val) => {
                  if (!val) {
                    selectItem.columns.forEach((item) => {
                      item.open = false
                    })
                  }
                }
              "
            ></a-switch>
          </a-form-item>
          <div style="position: relative">
            <a-form-item :label="$t('折叠面板')"></a-form-item>
            <a-button
              style="position: absolute; top: 4px; right: 0"
              type="link"
              @click="
                () => {
                  selectItem.columns.push({
                    open: false,
                    title: '折叠面板',
                    key: new Date().getTime(),
                    list: []
                  })
                }
              "
            >
              {{ $t('添加') }}
            </a-button>
            <draggable
              v-model="selectItem.columns"
              animation="200"
              handle=".handle"
              :style="{
                width: '100%',
                'flex-grow': 1,
                overflow: 'auto',
                display: 'flex',
                'flex-flow': 'column wrap',
                'align-content': 'flex-start'
              }"
              @start="drag = true"
              @end="drag = false"
            >
              <a-row v-for="(item, index) in selectItem.columns" :key="index" style="width: 100%; margin-bottom: 6px">
                <a-col span="3">
                  <a-icon type="drag" class="handle" style="cursor: pointer" />
                </a-col>
                <a-col span="3">
                  <a-radio
                    :checked="item.open"
                    @click="
                      () => {
                        item.open = !item.open
                        if (!options.notAccordion) {
                          selectItem.columns.forEach((collapseItem) => {
                            if (collapseItem.key === item.key) {
                              return
                            }
                            collapseItem.open = false
                          })
                        }
                      }
                    "
                  ></a-radio>
                </a-col>
                <a-col span="15">
                  <a-input v-model="item.title" :placeholder="$t('请输入面板标题')"></a-input>
                </a-col>
                <a-col span="3">
                  <a-icon
                    type="delete"
                    style="color: red; margin-left: 10px; cursor: pointer"
                    @click="
                      () => {
                        selectItem.columns.splice(index, 1)
                      }
                    "
                  />
                </a-col>
              </a-row>
            </draggable>
          </div>
        </template>
        <!-- 流程办理方式、流程办理备注 -->
        <template v-if="['work', 'workRemark'].includes(selectItem.type)">
          <a-form-item :label="$t('名称')">
            <a-input v-model="selectItem.label" :placeholder="$t('请输入')" />
          </a-form-item>
          <a-form-item v-if="selectItem.type === 'work'" :label="$t('是否使用分隔符')">
            <a-radio-group v-model="selectItem.workDivider">
              <a-radio value="1">{{ $t('是') }}</a-radio>
              <a-radio value="0">{{ $t('否') }}</a-radio>
            </a-radio-group>
          </a-form-item>
        </template>
        <!-- 警告提示 -->
        <template v-if="selectItem.type === 'alert'">
          <a-form-item :label="$t('标题')">
            <a-input v-model="options.title" />
          </a-form-item>
          <a-form-item :label="$t('描述')">
            <a-textarea v-model="options.description" :auto-size="{ minRows: 5, maxRows: 10 }" />
          </a-form-item>
          <a-form-item :label="$t('类型')">
            <a-select v-model="options.type">
              <a-select-option key="primary" value="primary">primary</a-select-option>
              <a-select-option key="success" value="success">success</a-select-option>
              <a-select-option key="error" value="error">error</a-select-option>
              <a-select-option key="warning" value="warning">warning</a-select-option>
              <a-select-option key="info" value="info">info</a-select-option>
            </a-select>
          </a-form-item>
          <a-row>
            <a-col span="20">
              <a-form-item :label="$t('关闭按钮')"></a-form-item>
            </a-col>
            <a-col span="3">
              <a-switch
                style="position: absolute; right: 0; top: 9px"
                :value="options.closeAble"
                @change="
                  (val) => {
                    options.closeAble = val
                  }
                "
              ></a-switch>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="20">
              <a-form-item :label="$t('辅助图标')"></a-form-item>
            </a-col>
            <a-col span="3">
              <a-switch
                v-model="options.showIcon"
                style="position: absolute; right: 0; top: 9px"
                @change="
                  (val) => {
                    if (val) {
                      switch (options.type) {
                        case 'primary':
                        case 'warning':
                        case 'info':
                          options.icon = 'uicon-info-circle'
                          break
                        case 'success':
                          options.icon = 'uicon-checkmark-circle'
                          break
                        case 'error':
                          options.icon = 'uicon-close-circle'
                          break
                      }
                    }
                  }
                "
              ></a-switch>
            </a-col>
          </a-row>
          <a-form-item v-if="options.showIcon" :label="$t('图标')">
            <set-icon
              :currentIconProp="options.icon"
              @setUViewIcon="
                (val) => {
                  options.icon = val
                }
              "
            />
          </a-form-item>
        </template>
        <!-- 占位符 -->
        <template v-if="selectItem.type === 'placeholder'">
          <a-form-item :label="$t('名称')">
            <a-input v-model="selectItem.label" :placeholder="$t('请输入')" :disabled="true" />
          </a-form-item>
        </template>
        <!-- 栅格 -->
        <template v-if="selectItem.type === 'grid'">
          <a-form-item :label="$t('栅格间距')">
            <a-input-number v-model="selectItem.options.gutter" :placeholder="$t('请输入')" />
          </a-form-item>
          <a-form-item>
            <span slot="label">
              {{ $t('栅格配置项') }}
              <a-tooltip :title="$t('点击【添加】在最上方添加一行，点击行添加，紧跟当前行下方添加一行')">
                <a-icon type="question-circle" />
              </a-tooltip>
            </span>
            <KChangeOption v-model="selectItem.columns" type="colspan" :nowArray="nowArray" />
          </a-form-item>
        </template>
        <!-- 搜索模板组 -->
        <template v-if="selectItem.type === 'groupSearch'">
          <a-form-item :label="$t('搜索模板组名称')">
            <a-input v-model="options.groupSearchName" :placeholder="$t('模板名称')"></a-input>
          </a-form-item>
          <div style="position: relative" class="card-properties">
            <a-button
              type="link"
              style="position: absolute; top: 3px; left: 50px; z-index: 2"
              @click="
                () => {
                  options.groupSearch.push({
                    searchTemplateName: '',
                    searchConditionSet: []
                  })
                }
              "
            >
              {{ $t('添加') }}
            </a-button>
            <a-form-item :label="$t('搜索模板')"></a-form-item>
            <draggable
              v-model="options.groupSearch"
              animation="200"
              handle=".handle"
              :style="{
                'flex-grow': 1,
                overflow: 'auto',
                display: 'flex',
                'flex-flow': 'column wrap',
                'align-content': 'flex-start'
              }"
              @start="drag = true"
              @end="drag = false"
            >
              <a-card
                v-for="(groupSearchItem, groupSearchItemIndex) in options.groupSearch"
                :key="groupSearchItemIndex"
                style="width: 100%; margin-bottom: 10px"
              >
                <a-row :gutter="2">
                  <a-col span="3"><a-icon type="drag" class="handle" style="cursor: pointer" /></a-col>
                  <a-col span="18">
                    <a-row>
                      <a-col style="margin-bottom: 10px">
                        <a-input
                          v-model="groupSearchItem.searchTemplateName"
                          :placeholder="$t('请输入模板名称')"
                        ></a-input>
                      </a-col>
                      <a-col>
                        <a-tag
                          style="width: 100%; height: 28px; text-align: center; line-height: 28px"
                          :color="groupSearchItem.setCondition ? 'green' : ''"
                          @click="showConditionModal(groupSearchItem, groupSearchItem.searchConditionSet)"
                        >
                          {{ $t('条件设置') }}
                        </a-tag>
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col span="3">
                    <a-icon
                      type="delete"
                      style="color: red; margin-left: 10px; cursor: pointer"
                      @click="
                        () => {
                          options.groupSearch.splice(i, 1)
                        }
                      "
                    />
                  </a-col>
                </a-row>
              </a-card>
            </draggable>
          </div>
        </template>
        <!-- 排序按钮组 -->
        <template v-if="selectItem.type === 'groupBtn'">
          <a-form-item :label="$t('排序按钮名称')">
            <a-input v-model="options.groupBtnName"></a-input>
          </a-form-item>
          <div style="position: relative" class="card-properties">
            <a-button
              type="link"
              style="position: absolute; top: 4px; left: 50px; z-index: 2"
              @click="
                () => {
                  options.groupBtn.push({
                    btnName: '',
                    sortFiled: '',
                    sortRule: true
                  })
                }
              "
            >
              {{ $t('添加') }}
            </a-button>
            <a-form-item :label="$t('排序方案')"></a-form-item>
            <draggable
              v-model="options.groupBtn"
              animation="200"
              handle=".handle"
              :style="{
                'flex-grow': 1,
                overflow: 'auto',
                display: 'flex',
                'flex-flow': 'column wrap',
                'align-content': 'flex-start'
              }"
              @start="drag = true"
              @end="drag = false"
            >
              <a-card
                v-for="(groupBtnItem, groupBtnItemIndex) in options.groupBtn"
                :key="groupBtnItemIndex"
                style="width: 100%; margin-bottom: 10px"
              >
                <a-row>
                  <a-col span="3">
                    <a-icon type="drag" class="handle" style="cursor: pointer" />
                  </a-col>
                  <a-col span="21">
                    <a-row :gutter="10">
                      <a-col span="21">
                        <a-input v-model="groupBtnItem.btnName" :placeholder="$t('排序方案名称')"></a-input>
                      </a-col>
                      <a-col span="3">
                        <a-icon
                          type="delete"
                          style="color: red; cursor: pointer"
                          @click="
                            () => {
                              options.groupBtn.splice(i, 1)
                            }
                          "
                        />
                      </a-col>
                      <a-col span="24" style="line-height: 48px">
                        <a-select v-model="groupBtnItem.sortFiled" :placeholder="$t('请选择排序字段')">
                          <a-select-option v-for="item in fieldColumns" :key="item.alias" :values="item.alias">
                            {{ item.name }}
                          </a-select-option>
                        </a-select>
                      </a-col>
                      <a-col span="24">
                        <a-radio-group v-model="groupBtnItem.sortRule" button-style="solid">
                          <a-radio-button :value="1">{{ $t('升序') }}</a-radio-button>
                          <a-radio-button :value="2">{{ $t('降序') }}</a-radio-button>
                        </a-radio-group>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </a-card>
            </draggable>
          </div>
        </template>
        <!-- 虚拟字段 -->
        <template v-if="selectItem.type === 'virtualField'">
          <a-form-item :label="$t('字段样式')">
            <a-radio-group v-model="options.styleType">
              <a-radio-button :value="'label'">{{ $t('有label') }}</a-radio-button>
              <a-radio-button :value="'noLabel'">{{ $t('无label') }}</a-radio-button>
              <a-radio-button :value="'tag'">{{ $t('标签') }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <template v-if="options.styleType === 'label'">
            <a-form-item :label="$t('label')">
              <a-input v-model="options.labelVal"></a-input>
            </a-form-item>
            <a-form-item :label="$t('label字号')">
              <a-select v-model="options.labelFontSize">
                <a-select-option key="default" value="default">{{ $t('正文') }}</a-select-option>
                <a-select-option key="h1" value="h1">h1</a-select-option>
                <a-select-option key="h2" value="h2">h2</a-select-option>
                <a-select-option key="h3" value="h3">h3</a-select-option>
                <a-select-option key="h4" value="h4">h4</a-select-option>
                <a-select-option key="h5" value="h5">h5</a-select-option>
                <a-select-option key="tip" value="tip">{{ $t('提示语') }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-row>
              <a-col span="21"><a-form-item :label="$t('label字体色')"></a-form-item></a-col>
              <a-col span="3">
                <colorSelect
                  :color="options.labelColor"
                  @changeColor="
                    (val) => {
                      options.labelColor = val
                    }
                  "
                ></colorSelect>
              </a-col>
            </a-row>
            <a-row>
              <a-col span="21"><a-form-item :label="$t('label背景色')"></a-form-item></a-col>
              <a-col span="3">
                <colorSelect
                  :color="options.labelBkColor"
                  @changeColor="
                    (val) => {
                      options.labelBkColor = val
                    }
                  "
                ></colorSelect>
              </a-col>
            </a-row>
          </template>
          <template v-if="options.styleType === 'tag'">
            <a-form-item :label="$t('标签大小')">
              <a-radio-group v-model="options.size">
                <a-radio-button :value="'default'">{{ $t('默认') }}</a-radio-button>
                <a-radio-button :value="'mini'">{{ $t('迷你') }}</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item :label="$t('标签主题类型')">
              <a-select v-model="options.type">
                <a-select-option key="success" value="success">success</a-select-option>
                <a-select-option key="info" value="info">info</a-select-option>
                <a-select-option key="warning" value="warning">warning</a-select-option>
                <a-select-option key="error" value="error">error</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('标签形状')">
              <a-select v-model="options.shape">
                <a-select-option key="square" value="square">square</a-select-option>
                <a-select-option key="circle" value="circle">circle</a-select-option>
                <a-select-option key="circleLeft" value="circleLeft">circleLeft</a-select-option>
                <a-select-option key="circleRight" value="circleRight">circleRight</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('label字号')">
              <a-select v-model="options.labelFontSize">
                <a-select-option key="default" value="default">{{ $t('正文') }}</a-select-option>
                <a-select-option key="h1" value="h1">h1</a-select-option>
                <a-select-option key="h2" value="h2">h2</a-select-option>
                <a-select-option key="h3" value="h3">h3</a-select-option>
                <a-select-option key="h4" value="h4">h4</a-select-option>
                <a-select-option key="h5" value="h5">h5</a-select-option>
                <a-select-option key="tip" value="tip">{{ $t('提示语') }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('标签形态')">
              <a-radio-group v-model="options.mode">
                <a-radio-button :value="'light'">{{ $t('light') }}</a-radio-button>
                <a-radio-button :value="'dark'">{{ $t('dark') }}</a-radio-button>
                <a-radio-button :value="'plain'">{{ $t('plain') }}</a-radio-button>
              </a-radio-group>
            </a-form-item>
          </template>
          <a-form-item :label="$t('字段值')">
            <div style="position: relative">
              <querier-codemirror-input
                ref="querierCodemirrorInput"
                :lineStyle="{ lineHeight: '18px', paddingRight: '12px' }"
                :params.sync="selectItem.value"
              />
              <div
                style="position: absolute; right: 4px; top: -4px; cursor: pointer; z-index: 10"
                @click="
                  () => {
                    $refs.formRuleWayCondition.show({
                      tableId: tableId,
                      data: { wayCondition: selectItem.value }
                    })
                  }
                "
              >
                fx
              </div>
            </div>
          </a-form-item>
        </template>
        <!-- 外部页面 -->
        <template v-if="selectItem.type === 'externalPage'">
          <a-form-item :label="$t('外部链接')">
            <a-input v-model="options.url"></a-input>
          </a-form-item>
        </template>
        <!-- (app)线条 -->
        <template v-if="selectItem.type === 'line'">
          <a-row>
            <a-col span="21"><a-form-item :label="$t('线条颜色')"></a-form-item></a-col>
            <a-col span="3">
              <colorSelect
                :color="options.color"
                @changeColor="
                  (val) => {
                    options.color = val
                  }
                "
              ></colorSelect>
            </a-col>
          </a-row>
          <a-form-item :label="$t('长度(px)')">
            <a-input-number v-model="options.length" :min="0" />
          </a-form-item>
          <a-form-item :label="$t('方向')">
            <a-radio-group v-model="options.direction">
              <a-radio-button :value="'row'">{{ $t('水平') }}</a-radio-button>
              <a-radio-button :value="'col'">{{ $t('垂直') }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item :label="$t('细线')">
            <a-radio-group v-model="options.hairLine">
              <a-radio-button :value="true">{{ $t('是') }}</a-radio-button>
              <a-radio-button :value="false">{{ $t('否') }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item :label="$t('线条类型')">
            <a-radio-group v-model="options.borderStyle">
              <a-radio-button :value="'solid'">{{ $t('实线') }}</a-radio-button>
              <a-radio-button :value="'dashed'">{{ $t('方形虚线') }}</a-radio-button>
              <a-radio-button :value="'dotted'">{{ $t('圆点虚线') }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </template>
        <!-- 关联数据窗口 -->
        <template v-if="selectItem.type === 'web_sub_data_window'">
          <a-form-item :label="$t('名称')">
            <a-input v-model="selectItem.label" :placeholder="$t('请输入')" />
          </a-form-item>
          <a-form-item :label="$t('关联数据窗口')">
            <a-button @click="subFormShow">
              <a-badge
                v-if="selectItem.relationSetting.subTable && selectItem.relationSetting.subTable.length !== 0"
                status="success"
              />
              <a-badge v-else status="default" />
              {{ $t('选择') }}
            </a-button>
            <SubtableSetForm
              ref="subtableSetForm"
              :params="{
                relationSetting: selectItem.relationSetting,
                fieldColumns: params.fieldColumns,
                tableList: params.tableList
              }"
              @func="
                (data) => {
                  $set(selectItem, 'relationSetting', data)
                }
              "
            />
          </a-form-item>
          <a-form-item v-if="selectItem.type === 'web_sub_data_window'" :label="$t('是否启用')">
            <a-radio-group v-model="selectItem.relationSetting.enable">
              <a-radio value="1">{{ $t('是') }}</a-radio>
              <a-radio value="0">{{ $t('否') }}</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item v-if="selectItem.type === 'web_sub_data_window'" :label="$t('访问权限')">
            <a-button @click="handleFieldPriv">
              <a-badge
                v-if="selectItem.relationSetting.usePermissions && selectItem.relationSetting.usePermissions.length > 0"
                status="success"
              />
              <a-badge v-else status="default" />
              {{ $t('访问权限') }}
            </a-button>
            <priv-visit-form
              ref="privVisitForm"
              :params="{ formView: selectItem.relationSetting }"
              @func="
                (e) => {
                  const config = JSON.parse(JSON.stringify(selectItem))
                  config.relationSetting.usePermissions = e
                  $set(selectItem, 'relationSetting', config.relationSetting)
                }
              "
            />
          </a-form-item>
        </template>
        <!-- 子表 -->
        <template v-else-if="selectItem.type === 'web_sub_form_view'">
          <a-form-item :label="$t('子表')">
            <a-button @click="subFormShow">
              <a-badge
                v-if="selectItem.relationSetting.subTable && selectItem.relationSetting.subTable.length !== 0"
                status="success"
              />
              <a-badge v-else status="default" />
              {{ $t('选择') }}
            </a-button>
            <SubtableSetForm
              ref="subtableSetForm"
              :params="{
                relationSetting: selectItem.relationSetting,
                fieldColumns: params.fieldColumns,
                tableList: params.tableList,
                type: 'web_sub_form_view'
              }"
              @func="
                (data) => {
                  $set(selectItem, 'relationSetting', data)
                }
              "
            />
          </a-form-item>
        </template>
        <template v-if="selectItem.type === 'flowlog'">
          <a-form-item :label="$t('名称')">
            <a-input v-model="selectItem.label" :placeholder="$t('请输入')" />
          </a-form-item>
          <a-form-item v-if="selectItem.type === 'flowlog'" :label="$t('展现形式')">
            <a-radio-group v-model="selectItem.showType">
              <a-radio value="table" style="display: block">{{ $t('表格') }}</a-radio>
              <a-radio value="card" style="display: block">{{ $t('卡片') }}</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item v-if="selectItem.type === 'flowlog'" :label="$t('快捷筛选')">
            <a-radio-group v-model="selectItem.screenDefault">
              <draggable
                v-model="selectItem.screenList"
                animation="200"
                handle=".handle"
                @start="drag = true"
                @end="drag = false"
              >
                <a-row
                  v-for="element in selectItem.screenList"
                  :key="element.value"
                  class="list-item"
                  :gutter="8"
                  type="flex"
                  align="middle"
                >
                  <a-col :span="4" class="handle">
                    <a-icon type="drag" />
                  </a-col>
                  <a-col :span="20" class="handle">
                    <a-radio :value="element.value" style="display: block">
                      {{ $t(element.label) }}
                    </a-radio>
                  </a-col>
                </a-row>
              </draggable>
            </a-radio-group>
          </a-form-item>
        </template>
        <a-form-item v-if="options.margin" :label="$t('外边距')">
          <a-row v-show="String(options.margin.top) !== 'undefined'">
            <a-col span="9" offset="8">
              <a-input-number v-model="options.margin.top"></a-input-number>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="9">
              <a-input-number
                v-show="String(options.margin.right) !== 'undefined'"
                v-model="options.margin.right"
              ></a-input-number>
            </a-col>
            <a-col span="6" style="text-align: center">{{ $t('外') }}</a-col>
            <a-col span="9">
              <a-input-number
                v-show="String(options.margin.left) !== 'undefined'"
                v-model="options.margin.left"
              ></a-input-number>
            </a-col>
          </a-row>
          <a-row v-show="String(options.margin.bottom) !== 'undefined'">
            <a-col span="9" offset="8"><a-input-number v-model="options.margin.bottom"></a-input-number></a-col>
          </a-row>
        </a-form-item>
        <a-form-item v-if="options.padding" :label="$t('内边距')">
          <a-row v-show="String(options.padding.top) !== 'undefined'">
            <a-col span="9" offset="8">
              <a-input-number v-model="options.padding.top"></a-input-number>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="9">
              <a-input-number
                v-show="String(options.padding.right) !== 'undefined'"
                v-model="options.padding.right"
              ></a-input-number>
            </a-col>
            <a-col span="6" style="text-align: center">{{ $t('内') }}</a-col>
            <a-col span="9">
              <a-input-number
                v-show="String(options.padding.left) !== 'undefined'"
                v-model="options.padding.left"
              ></a-input-number>
            </a-col>
          </a-row>
          <a-row v-show="String(options.padding.bottom) !== 'undefined'">
            <a-col span="9" offset="8"><a-input-number v-model="options.padding.bottom"></a-input-number></a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </div>
    <priv-visit-form ref="privVisitForm" @func="getPrivs" />
    <!-- 附加属性 -->
    <code-editor ref="codeEditor" @func="getCode" />
    <conditionModal ref="conditionModal" :key="conditionModalKey" :fieldColumns="fieldColumns" />
    <form-rule-way-condition
      ref="formRuleWayCondition"
      @func="
        (data) => {
          selectItem.value = data
        }
      "
    />
    <a-modal
      :visible="copyPermissionsVisible"
      :title="$t('权限复制')"
      :width="500"
      @cancel="cancelCopy"
      @ok="handleCopy"
    >
      <a-table
        v-if="selectItem.columns && copyPermissionsVisible"
        rowKey="index"
        :columns="columns"
        :data-source="
          selectItem.columns.map((item, index) => {
            return {
              ...item,
              index
            }
          })
        "
        :row-selection="rowSelection"
      />
    </a-modal>
  </div>
</template>
<script>
/*
 * author kcz
 * date 2019-11-20
 * description 表单控件属性设置组件,因为配置数据是引用关系，所以可以直接修改
 */
// import { Sketch } from 'vue-color'
// import { defaultButton } from '../config/defaultButton.js'
import cloneDeep from 'lodash.clonedeep'
export default {
  name: 'FormItemProperties',
  i18n: window.lang('admin'),
  components: {
    KChangeOption: () => import('../../KChangeOption/index.vue'),
    kCheckbox: () => import('../../KCheckbox/index.vue'),
    CodeEditor: () => import('@/views/admin/CodeEditor'),
    Editor: () => import('@/views/admin/Formula/Editor'),
    SubtableSetForm: () => import('@/views/admin/Table/SubtableSetForm'),
    PrivVisitForm: () => import('@/views/admin/Table/PrivVisitForm'),
    PortraitSet: () => import('./PortraitSet'),
    draggable: () => import('vuedraggable'),
    SetLang: () => import('@/components/SetLang'),
    colorSelect: () => import('./colorSelect'),
    conditionModal: () => import('./conditionModal'),
    FormulaEdit: () => import('@/views/admin/Field/FormulaEdit'),
    FormRuleWayCondition: () => import('@/views/admin/Flow/modules/FormRuleWayCondition'),
    QuerierCodemirrorInput: () => import('@/views/admin/Table/QuerierCodemirrorInput'),
    setIcon: () => import('./setIcon')
  },
  props: {
    selectItem: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      default () {
        return {}
      },
      required: false
    },
    basicsArray: {
      type: Array,
      default () {
        return []
      }
    },
    myArray: {
      type: Array,
      default () {
        return []
      }
    },
    nowArray: {
      type: Array,
      default () {
        return []
      }
    },
    tableType: {
      type: String,
      default () {
        return ''
      }
    },
    fieldColumns: {
      type: Array,
      default: () => []
    },
    dataWindowButtons: {
      type: Array,
      default: () => []
    },
    entranceType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      copyPermissionsVisible: false,
      columns: [{
        title: '#',
        customRender: (text, record, index) => index + 1,
        key: 'index'
      }, {
        title: '导航名称',
        dataIndex: 'name',
        key: 'name'
      }],
      copySourceTabbar: {},
      rowSelection: {},
      options: {},
      attrList: [
        { eventName: 'change', attribute: '' }
      ], // 附加属性列表
      listIndex: 0, // 被选中
      dataInit: ['change', 'blur', 'focus', 'click', 'pressEnter', 'search', 'select', 'popupVisibleChange', 'deselect', 'inputKeydown', 'mouseenter', 'mouseleave', 'popupScroll', 'dropdownVisibleChange'],
      dataSource: ['change', 'blur', 'focus', 'click', 'pressEnter', 'search', 'select', 'popupVisibleChange', 'deselect', 'inputKeydown', 'mouseenter', 'mouseleave', 'popupScroll', 'dropdownVisibleChange'],
      componentData: [],
      reg: [['', this.$t('--无--')],
      ['email', this.$t('Email地址')],
      ['url', this.$t('URL地址')],
      ['idcar', this.$t('身份证号')],
      ['postal', this.$t('邮政编码')],
      ['text_min', this.$t('文本最小长度')],
      ['text_max', this.$t('文本最大长度')],
      ['number_max', this.$t('数值最大值')],
      ['number_min', this.$t('数值最小值')],
      ['number_scope', this.$t('数值范围')],
      ['regular', this.$t('正则表达式')],
      ['javascript', this.$t('JavaScript脚本')]],
      regType: 0, // 0:---无--- ; 1：email、url、idcar、postal; 2：text_min text_max number_max number_min; 3：number_scope; 4： regular 5：javascript;
      regChoice: [],
      regularValue: [['/^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$/', this.$t('邮箱')],
      ['/^(1)[0-9]{10}$/', this.$t('手机')],
      ['/^[A-Za-z]+$/', this.$t('字母')],
      ['/^([+-]?)\\d*\\.?\\d+$/', this.$t('数字')]],
      regKey: [],
      number_scope_min: '',
      number_scope_max: '',
      number_scope_max_flag: false,
      number_scope_min_flag: false,
      regText: '',
      colorType: [{
        value: '',
        color: '#000',
        type: this.$t('默认')
      }, {
        value: '#8c8c8c',
        color: '#8c8c8c',
        type: this.$t('浅灰')
      }, {
        value: '#F5222D',
        color: '#F5222D',
        type: this.$t('薄暮')
      }, {
        value: '#FA541C',
        color: '#FA541C',
        type: this.$t('火山')
      }, {
        value: '#FAAD14',
        color: '#FAAD14',
        type: this.$t('日暮')
      }, {
        value: '#13C2C2',
        color: '#13C2C2',
        type: this.$t('明青')
      }, {
        value: '#52C41A',
        color: '#52C41A',
        type: this.$t('极光')
      }, {
        value: '#1890FF',
        color: '#1890FF',
        type: this.$t('拂晓')
      }, {
        value: '#2F54EB',
        color: '#2F54EB',
        type: this.$t('极客')
      }, {
        value: '#722ED1',
        color: '#722ED1',
        type: this.$t('酱紫')
      }],
      loading: false, // 轮播图上传loading
      conditionModalKey: 'conditionModal_1',
      formulaData: [],
      tableId: '',
      appFormViewList: [],
      appBasicPageList: [],
      appDataViewList: []
      // formPropertyButton: defaultButton
    }
  },
  watch: {
    selectItem: {
      handler (val) {
        this.options = val.options || {}
        // 编辑数据窗口,按钮类型默认为系统内置
        if (this.entranceType === 'appDataDesign') {
          this.options.buttonEvent = 'system'
        }
        let attriObj = {}
        if (val.attribute) {
          if (val.attribute[0] === '{' && val.attribute.substring(0, 9) !== '{template') {
            attriObj = JSON.parse(val.attribute)
            const attriList = []
            for (const key in attriObj) {
              attriList.push({
                eventName: key,
                attribute: attriObj[key]
              })
            }
            this.attrList = attriList
          } else {
            attriObj = val.attribute
          }
        } else {
          this.attrList = [{ eventName: 'change', attribute: '' }]
        }
        if (val.validity) {
          for (var key in val.validity) {
            if (key !== 'error_msg') {
              if (key === 'number_scope_min') {
                this.regType = 3
                this.number_scope_min = val.validity.number_scope_min
              }
              if (key === 'number_scope_max') {
                this.number_scope_max = val.validity.number_scope_max
              }
              this.getReg(key)
            }
          }
        } else {
          this.regType = 0
          val.validity = {}
        }
        this.componentData = this.basicsArray.filter(item => !item.getType && item.type !== 'component')
      },
      immediate: true
    }
  },
  created () {
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log('selectedRows', selectedRows)
        this.selectTabbarIdList = selectedRows.map(item => item.index)
      }
    }
    this.axios({
      url: '/admin/modeling/initAppBasePageTrees'
    }).then(res => {
      const loop = (list) => {
        list.forEach(item => {
          item.text = item.name
          item.value = item.templateId
          if (item.children && item.children.length > 0) {
            loop(item.children)
          } else {
            delete item.children
          }
        })
      }
      const list = res.result || []
      loop(list)
      this.appBasicPageList = list
    })
    this.axios({
      url: '/admin/modeling/getTemplateCascadeOptions',
      params: {
        templateTypes: ['appDataWindow', 'appProcessCenterDataWindow'].join(',')
      }
    }).then(res => {
      if (!res.code) {
        this.appDataViewList = res.result
      }
    })
  },
  methods: {
    // 触发事件的可选值
    onDropdownVisibleChange () {
      this.dataSource = JSON.parse(JSON.stringify(this.dataInit))
      this.attrList.forEach(item => {
        const index = this.dataSource.indexOf(item.eventName)
        this.dataSource.splice(index, 1)
      })
    },
    // 打开代码编辑器
    codeEditor (list, index) {
      if (this.selectItem.type === 'field') {
        this.listIndex = index
        this.$refs.codeEditor.show({
          value: list.attribute
        })
      } else {
        this.$refs.codeEditor.show({
          value: this.selectItem.attribute || ''
        })
      }
    },
    buttoCodeEditor (list, index) {
      this.$refs.codeEditor.show({
        value: this.options.dynamicFun || ''
      })
    },
    // 有效性判断
    getReg (e) {
      if (!e) {
        this.regType = 0
      } else if (['email', 'url', 'idcar', 'postal'].indexOf(e) > -1) {
        this.regType = 1
      } else if (['text_min', 'text_max', 'number_max', 'number_min'].indexOf(e) > -1) {
        this.regType = 2
        this.regKey = [e]
      } else if (['number_scope'].indexOf(e) > -1) {
        this.regType = 3
        this.regKey = ['number_scope_min', 'number_scope_min']
      } else if (['regular'].indexOf(e) > -1) {
        this.regType = 4
        this.regKey = ['regular', 'combo-1623-inputEl']
      } else if (['javascript'].indexOf(e) > -1) {
        this.regType = 5
        this.regKey = [e]
      }
      var arr = this.reg.filter((item) => {
        return e === item[0]
      })
      this.regChoice = arr[0]
    },
    getRegText (e) {
      this.regText = e
    },
    subFormShow () {
      // if (!this.selectItem.subDataWindow.tableidSon) {
      const subTable = this.selectItem.relationSetting.subTable
      if (subTable && subTable.length === 0) {
        this.$refs.subtableSetForm.show({
          action: 'add',
          title: this.$t('选择'),
          record: {
            id: (new Date()).valueOf(),
            listOrder: 1,
            name: '',
            buttonType: 0,
            priv: '',
            enable: '1',
            pattern: '1'
          }
        })
      } else {
        this.$refs.subtableSetForm.show({
          action: 'edit',
          title: `${this.$t('选择')}`,
          record: this.selectItem.relationSetting
        })
      }
    },
    portraitSet () {
      this.$refs.portraitSet.show({
        title: this.$t('客户画像设置'),
        data: this.selectItem.portraitData
      })
    },
    handleFieldPriv () {
      const subTable = this.selectItem.relationSetting.subTable
      if (subTable && subTable.length !== 0) {
        this.$refs.privVisitForm.show({
          action: 'edit',
          title: `${this.$t('访问权限')}`,
          record: this.selectItem.relationSetting,
          key: 'usePermissions',
          selectType: 'radio',
          privArr: {
            visit: this.$t('可访问')
          },
          defaultpriv: 'visit'
        })
      } else {
        this.$message.info(this.$t('请设置子表菜单'))
      }
    },
    // 获取代码编辑器数据
    getCode (value) {
      if (this.selectItem.type === 'field') {
        const list = this.attrList[this.listIndex]
        list.attribute = value
        this.attrList.splice(this.listIndex, 1, list)
        const attriObj = {}
        this.attrList.forEach(item => {
          attriObj[item.eventName] = item.attribute
        })
        this.$set(this.selectItem, 'attribute', JSON.stringify(attriObj))
      } else if (this.selectItem.type === 'button') {
        this.selectItem.options.dynamicFun = value
      } else {
        this.selectItem.attribute = value
        this.$set(this.selectItem, 'attribute', value)
      }
    },
    preinstchange (e) {
      if (e === 'divider') {
        this.selectItem.formType = ''
        this.selectItem.options = {
          orientation: 'left'
        }
      } else if (e === 'card') {
        this.selectItem.formType = ''
        this.selectItem.topMargin = 0
        this.selectItem.downMargin = 10
        this.selectItem.leftMargin = 0
        this.selectItem.rightMargin = 0
        this.selectItem.bordered = '1'
        this.selectItem.list = []
        this.selectItem.options = undefined
      } else if (e === 'tabs') {
        this.selectItem.options = {
          tabBarGutter: null,
          type: 'line',
          tabPosition: 'top',
          size: 'default',
          animated: true
        }
        this.selectItem.columns = [
          {
            value: '1',
            label: this.$t('选项1'),
            list: []
          },
          {
            value: '2',
            label: this.$t('选项2'),
            list: []
          }
        ]
      } else if (e === 'grid') {
        this.selectItem.columns = [
          {
            span: 6,
            list: []
          },
          {
            span: 6,
            list: []
          },
          {
            span: 6,
            list: []
          },
          {
            span: 6,
            list: []
          }
        ]
        this.selectItem.options = {
          gutter: 0
        }
      }
    },
    componentChange (e) {
      this.selectItem.formType = ''
      if (e === 'button') {
        this.selectItem.options = {
          type: 'primary',
          handle: 'submit',
          dynamicFun: '',
          hidden: false,
          disabled: false
        }
      } else if (e === 'alert') {
        this.selectItem.options = {
          type: 'success',
          description: '',
          showIcon: false,
          banner: false,
          hidden: false,
          closable: false
        }
      } else if (e === 'text') {
        this.selectItem.options = {
          textAlign: 'left',
          hidden: false, // 是否隐藏，false显示，true隐藏
          showRequiredMark: false
        }
      } else if (e === 'subform') {
        this.selectItem.relationSetting = {
          enable: '1'
        }
      } else if (e === 'html') {
        this.selectItem.options = {
          hidden: false,
          defaultValue: '<strong>HTML</strong>'
        }
      } else if (e === 'work') {
        this.selectItem.column = '24'
        this.selectItem.fieldRule = ''
        this.selectItem.formType = ''
        // this.selectItem.key = ''
        // this.selectItem.model=''
        // this.selectItem.name = '流程办理方式'
        // this.selectItem.typename = '流程办理方式'
        this.selectItem.value = ''
        this.selectItem.workDivider = '1'
      }
    },
    fieldChange (val) {
      this.selectItem.attribute = val.attribute
      this.selectItem.changeTitle = val.changeTitle
      this.selectItem.componentName = val.componentName
      this.selectItem.fieldId = val.fieldId
      this.selectItem.fieldRule = val.fieldRule
      this.selectItem.formType = val.formType
      this.selectItem.labelShow = val.labelShow
      this.selectItem.name = val.name
      this.selectItem.placeholder = val.placeholder
      this.selectItem.type = val.type
      this.selectItem.validationType = val.validationType
    },
    styleChange (type) {
      if (type === '0') {
        this.$set(this.selectItem, 'labelShow', '1')
        this.$set(this.selectItem, 'labelColor', '')
        this.$set(this.selectItem, 'fontSize', '0')
        this.$set(this.selectItem, 'color', '')
        this.$set(this.selectItem, 'backGroundColor', '')
        this.$set(this.selectItem, 'topPadding', 0)
        this.$set(this.selectItem, 'bottomPadding', 0)
        this.$set(this.selectItem, 'leftPadding', 0)
        this.$set(this.selectItem, 'rightPadding', 0)
        this.$set(this.selectItem, 'topMargin', 0)
        this.$set(this.selectItem, 'bottomMargin', 0)
        this.$set(this.selectItem, 'leftMargin', 0)
        this.$set(this.selectItem, 'rightMargin', 0)
      } else {
        this.$set(this.selectItem, 'labelShow', '0')
        this.$set(this.selectItem, 'labelColor', '')
        this.$set(this.selectItem, 'fontSize', '0')
        this.$set(this.selectItem, 'color', '#fafafa')
        this.$set(this.selectItem, 'backGroundColor', '#2F54EB')
        this.$set(this.selectItem, 'topPadding', 0)
        this.$set(this.selectItem, 'bottomPadding', 0)
        this.$set(this.selectItem, 'leftPadding', 5)
        this.$set(this.selectItem, 'rightPadding', 5)
        this.$set(this.selectItem, 'topMargin', 0)
        this.$set(this.selectItem, 'bottomMargin', 0)
        this.$set(this.selectItem, 'leftMargin', 0)
        this.$set(this.selectItem, 'rightMargin', 0)
      }
    },
    add () {
      this.attrList.push({
        eventName: undefined,
        attribute: ''
      })
    },
    del (index) {
      if (this.attrList.length !== 1) {
        this.attrList.splice(index, 1)
      }
    },
    showConditionModal (groupSearchItem, condition) {
      this.conditionModalKey = this.conditionModalKey === 'conditionModal_1' ? 'conditionModal_0' : 'conditionModal_1'
      this.$nextTick(() => {
        this.$refs.conditionModal.show({
          data: condition,
          groupSearchItem: groupSearchItem
        })
      })
    },
    changefloatBtnPos (e) {
      const val = e.target.value
      if (val === 'lt') {
        this.selectItem.options.horizontal = 'left'
        this.selectItem.options.vertical = 'top'
      } else if (val === 'rt') {
        this.selectItem.options.horizontal = 'right'
        this.selectItem.options.vertical = 'top'
      } else if (val === 'lb') {
        this.selectItem.options.horizontal = 'left'
        this.selectItem.options.vertical = 'bottom'
      } else if (val === 'rb') {
        this.selectItem.options.horizontal = 'right'
        this.selectItem.options.vertical = 'bottom'
      }
    },
    handleFormulate () { },
    beforeUpload (file, fileList, type) {
      return new Promise((resolve, reject) => {
        const fileType = type
        const suffix = file.name.substring(file.name.lastIndexOf('.'), file.name.length)
        if (!fileType.includes(suffix)) {
          this.$message.error(this.$t('上传文件格式错误'))
          return reject(file)
        }
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!isLt2M) {
          const message = this.$t('上传文件大小超过{0}', { 0: '10M' })
          this.$message.error(message)
          return reject(file)
        }
        return resolve(file)
      })
    },
    // 图片附件赋值
    fileChange (info, obj) {
      info.fileList = info.fileList.map(item => {
        if (item.response && item.response.code !== 0) {
          this.debounceToast(item)
        }
        const obj = {
          name: item.name,
          response: item.response,
          status: item.status,
          uid: item.uid,
          url: item.response && item.response.result ? (this.$store.state.env.VUE_APP_API_BASE_URL + 'admin/api/download/?filePath=' + item.response.result.filePath) : ''
        }
        return obj
      })
      // if (info.file.status === 'done' || info.file.status === 'removed') {
      // this.$set(this.record.field, 'initValue', info.fileList)
      obj.image = info.fileList
      // }
    },
    handleChangePageType (val, item) {
      item.pageList = []
      item.customPageUrl = ''
      item.button = undefined
    },
    handleSearchPriv (record, index) {
      this.$refs.privVisitForm.show({
        action: 'edit',
        title: this.$t('授权'),
        record: record,
        index: index,
        key: 'usePermissions',
        selectType: 'radio',
        privArr: {
          visit: this.$t('可访问')
        },
        defaultpriv: 'visit'
      })
    },
    getPrivs (usePermissions, index) {
      const columns = cloneDeep(this.selectItem.columns)
      columns[index].usePermissions = usePermissions
      this.selectItem.columns = columns
      this.$forceUpdate()
    },
    cancelCopy () {
      this.copyPermissionsVisible = !this.copyPermissionsVisible
      this.copySourceTabbar = {}
      this.selectTabbarIdList = []
    },
    handleCopy () {
      this.copyPermissionsVisible = !this.copyPermissionsVisible
      this.selectItem.columns.forEach((item, index) => {
        if (this.selectTabbarIdList.includes(index)) {
          this.getPrivs(this.copySourceTabbar.usePermissions, index)
        }
      })
    },
    changeDataWindow (value, selectedOptions, item) {
      item.flowCondition = undefined
      this.axios({
        url: 'admin/template/get',
        params: {
          templateId: value[value.length - 1]
        }
      }).then(res => {
        if (!res.code) {
          const setting = res.result.setting
          const workflowSearcher = setting.workflowSearcher ? setting.workflowSearcher : null
          if (workflowSearcher) {
            item.flowConditionList = workflowSearcher.workflowFilters.map(item => {
              return {
                label: item.name,
                value: item.value
              }
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.groupButton {
  margin-top: 4px;
  /deep/ .ant-card-body {
    padding: 30px 2px 2px 4px;
  }
}

.properties-centent /deep/ .ant-radio-button-wrapper {
  width: 80px;
  text-align: center;
  padding: 0;
}

.swiper-uploader /deep/ .ant-upload {
  width: 100%;
  height: 100px;
  background: #fafafa;
  border: 1px dashed #d9d9d9;
  cursor: pointer;

  .swiper-upload-img {
    margin-top: 25px;
    text-align: center;
  }
}

.swiper-uploader /deep/ .ant-upload-list-picture-card-container {
  width: 100% !important;
  .ant-upload-list-item {
    width: 100% !important;
  }
}

.swiper-uploader /deep/ .ant-upload:hover {
  border: 1px dashed #1890ff;
}

.card-properties /deep/ .ant-card-body {
  padding: 6px;
}
</style>
