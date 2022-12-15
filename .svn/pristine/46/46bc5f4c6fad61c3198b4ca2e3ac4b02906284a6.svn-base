<template>
  <div>
    <a-alert
      message="上下拖动即可进行排序，官方演示地址：https://sortablejs.github.io/Vue.Draggable/#/simple"
      type="info"
      show-icon
      style="margin-bottom: 16px"
    />
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="
        data.push({
          id: new Date().getTime(),
          col: 6,
          name: '单行文本-' + new Date().getTime(),
          type: 'text'
        })
      "
    >
      增加一项
    </a-button>
    <draggable
      v-model="data"
      class="list-group"
      animation="200"
      handle=".handle"
      @start="drag = true"
      @end="drag = false"
    >
      <div v-for="element in data" :key="element.id" :class="['item', 'ant-col-' + element.col]">
        <div style="display: flex; align-items: center; margin-bottom: 5px">
          <a-icon type="drag" class="handle" />
          <span style="flex: 1">{{ element.name }}:</span>
          <a-icon class="action" type="setting" @click="setting(element)" />
        </div>
        <a-input v-if="element.type == 'text'" />
        <a-textarea v-if="element.type == 'textarea'" :rows="6" />
        <a-date-picker v-if="element.type == 'datetime'" format="YYYY-MM-DD HH:mm:ss" style="width: 100%" />
        <a-select v-if="element.type == 'combobox'" style="width: 100%">
          <a-select-option value="1">选项1</a-select-option>
          <a-select-option value="2">选项2</a-select-option>
          <a-select-option value="3">选项3</a-select-option>
        </a-select>
        <a-radio-group v-if="element.type == 'radio'">
          <a-radio value="1">选项1</a-radio>
          <a-radio value="2">选项2</a-radio>
          <a-radio value="3">选项3</a-radio>
        </a-radio-group>
        <a-checkbox-group v-if="element.type == 'checkbox'">
          <a-checkbox value="1">选项1</a-checkbox>
          <a-checkbox value="2">选项2</a-checkbox>
          <a-checkbox value="3">选项3</a-checkbox>
        </a-checkbox-group>
        <tiny-mce v-if="element.type == 'editor'" :newOptions="{ height: '200px' }" />
        <a-input-number v-if="element.type == 'number'" style="width: 100%" />
        <a-upload
          v-if="element.type == 'image'"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture-card"
        >
          <a-icon type="plus" />
          <div>Upload</div>
        </a-upload>
        <a-upload v-if="element.type == 'file'" action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
          <a-button>
            <a-icon type="upload" />
            Upload
          </a-button>
        </a-upload>
        <a-cascader
          v-if="element.type == 'cascader'"
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
          placeholder="Please select"
        />
      </div>
    </draggable>
    <a-drawer :title="'设置-' + item.name" :width="600" :visible="visible" @close="visible = !visible">
      <a-spin :spinning="loading">
        <a-form :form="form">
          <a-form-item label="占用列宽" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-number
              v-decorator="['col', { rules: [{ required: true, message: '请输入菜单名称' }], initialValue: item.col }]"
              :in="1"
              :max="24"
            />
          </a-form-item>
        </a-form>
        <div class="bbar">
          <a-button @click="visible = !visible">取消</a-button>
          <a-button type="primary" @click="handleSubmit">保存</a-button>
        </div>
      </a-spin>
    </a-drawer>
    <pre>{{ data }}</pre>
  </div>
</template>
<script>
export default {
  components: {
    draggable: () => import('vuedraggable'),
    TinyMce: () => import('@/components/Editor/TinyMce')
  },
  data () {
    return {
      visible: false,
      loading: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: this.$form.createForm(this),
      item: {},
      data: [{
        'id': 1,
        'col': 6,
        'name': '单行文本',
        'type': 'text'
      }, {
        'id': 2,
        'col': 6,
        'name': '日期时间',
        'type': 'datetime'
      }, {
        'id': 3,
        'col': 6,
        'name': '下拉框',
        'type': 'combobox'
      }, {
        'id': 11,
        'col': 6,
        'name': '级联选择',
        'type': 'cascader'
      }, {
        'id': 7,
        'col': 6,
        'name': '单选框',
        'type': 'radio'
      }, {
        'id': 8,
        'col': 6,
        'name': '复选框',
        'type': 'checkbox'
      }, {
        'id': 4,
        'col': 6,
        'name': '数字',
        'type': 'number'
      }, {
        'id': 6,
        'col': 12,
        'name': '多行文本',
        'type': 'textarea'
      }, {
        'id': 9,
        'col': 6,
        'name': '图片',
        'type': 'image'
      }, {
        'id': 10,
        'col': 6,
        'name': '附件',
        'type': 'file'
      }, {
        'id': 5,
        'col': 24,
        'name': '编辑器',
        'type': 'editor'
      }],
      drag: false
    }
  },
  methods: {
    setting (item) {
      this.visible = true
      this.item = item
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          this.visible = false
          const index = this.data.findIndex((val) => {
            return val === this.item
          })
          this.data[index]['col'] = values.col
          this.form.resetFields()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.list-group {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 5px;
  padding: 10px;
  background: white;
}
.list-group .item {
  padding: 5px;
  margin-bottom: 20px;
  border: 1px dashed white;
  border-radius: 3px;
}
.list-group .item:hover {
  background: #f9fafa;
  border: 1px dashed #e5e5e5;
}
.list-group .item[draggable='true'] {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group .item .handle {
  padding-right: 8px;
  cursor: move;
}
.list-group .item .action {
  margin-right: 8px;
  cursor: pointer;
  display: none;
}
.list-group .item:hover .action {
  display: unset;
}
</style>
