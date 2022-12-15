<template>
  <div class="option-change-container">
    <a-row v-if="type === 'option' || type === 'tab'" :gutter="8">
      <a-col :span="12">
        <a @click="handleAdd">{{ $t('添加') }}</a>
      </a-col>
      <a-col :span="12" style="text-align: right">
        <a @click="handleSort">{{ $t('排序') }}</a>
      </a-col>
      <div v-for="(val, index) in value" :key="index" class="option-change-box">
        <a-col :span="16"><a-input v-model="val.label" :placeholder="$t('名称')" /></a-col>
        <a-col v-show="false" :span="8"><a-input v-model="val.value" :placeholder="$t('值')" /></a-col>
        <a-col :span="8">
          <a-row :gutter="8">
            <a-col :span="12">
              <div
                class="option-add-box"
                @click="
                  value.splice(index + 1, 0, {
                    label: $t('选项') + (value.length + 1),
                    list: [],
                    value: value.length + 1
                  })
                "
              >
                <a-icon type="plus" />
              </div>
            </a-col>
            <a-col :span="12">
              <div class="option-delete-box" @click="handleDelete(index)"><a-icon type="delete" /></div>
            </a-col>
          </a-row>
        </a-col>
      </div>
    </a-row>
    <a-row v-if="type === 'rules'" :gutter="8">
      <span v-for="(val, index) in value" :key="index">
        <div v-if="index !== 0" class="option-change-box">
          <a-col :span="16"><a-input v-model="val.message" :placeholder="$t('提示信息')" /></a-col>
          <a-col :span="16"><a-input v-model="val.pattern" :placeholder="$t('正则表达式pattern')" /></a-col>
          <a-col :span="8">
            <div class="option-delete-box" @click="handleDelete(index)">
              <a-icon type="delete" />
            </div>
          </a-col>
        </div>
      </span>
      <a-col :span="24">
        <a @click="handleAddRules">{{ $t('增加校验') }}</a>
      </a-col>
    </a-row>
    <div v-else-if="type === 'colspan'">
      <a-row>
        <a-col :span="8">
          <a @click="handleAddCol">{{ $t('首位添加') }}</a>
        </a-col>
        <a-col :span="8" style="text-align: center">
          <a @click="handleEndAddCol">{{ $t('末位添加') }}</a>
        </a-col>
        <a-col :span="8" style="text-align: center">
          <a @click="handleSetting">{{ $t('配置') }}</a>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <draggable v-model="showList" animation="200" handle=".handle" @start="drag = true" @end="drag = false">
          <div v-for="(val, index) in showList" :key="index" class="list-item option-change-box">
            <a-col :span="2" class="handle">
              <a-icon type="drag" />
            </a-col>
            <a-col :span="4" style="text-align: center">
              <a-badge :count="index + 1" :number-style="{ backgroundColor: '#1890FF' }" :overflow-count="999" />
            </a-col>
            <a-col :span="10">
              <a-input-number v-model="val.span" style="width: 100%" :max="24" :placeholder="$t('名称')" />
            </a-col>
            <a-col :span="8">
              <a-row :gutter="8">
                <a-col :span="12">
                  <div class="option-add-box" @click="value.splice(index + 1, 0, { span: 6, list: [] })">
                    <a-icon type="plus" />
                  </div>
                </a-col>
                <a-col :span="12">
                  <div class="option-delete-box" @click="handleDelete(index)"><a-icon type="delete" /></div>
                </a-col>
              </a-row>
            </a-col>
          </div>
        </draggable>
      </a-row>
    </div>
    <drag-sort ref="dragSort" @ok="getSort" />
    <col-setting ref="colSetting" @ok="getSetting" />
  </div>
</template>
<script>
/*
 * author kcz
 * date 2019-11-20
 * description 修改多选、下拉、单选等控件options的组件，添加移除校验规制的组件
 */
import draggable from 'vuedraggable'
export default {
  name: 'KChangeOption',
  i18n: window.lang('admin'),
  components: {
    DragSort: () => import('@/views/admin/Common/DragSort'),
    draggable,
    ColSetting: () => import('./ColSetting')
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'option'
    },
    nowArray: {
      type: Array,
      required: false,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      showList: this.value
    }
  },
  watch: {
    showList (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.showList = val
    }
  },
  methods: {
    handleAdd () {
      // 添加
      const addData = this.value
      addData.splice(0, 0, {
        value: `${this.value.length + 1}`,
        label: this.$t('选项') + (this.value.length + 1),
        list: this.type === 'tab' ? [] : undefined
      })
      this.$emit('input', addData)
    },
    handleAddCol () {
      // 添加栅格Col
      const addData = this.value
      addData.splice(0, 0, {
        span: 6,
        list: []
      })
      this.$emit('input', addData)
    },
    handleEndAddCol () {
      // 添加栅格Col
      const addData = this.value
      addData.splice(addData.length, 0, {
        span: 6,
        list: []
      })
      this.$emit('input', addData)
    },
    handleSort () {
      const data = []
      this.value.forEach(item => {
        let obj = {}
        obj = item
        obj.name = item.label
        data.push(obj)
      })
      this.$refs.dragSort.show({
        title: this.$t('排序'),
        sortData: data
      })
    },
    getSort (data) {
      this.$emit('input', data)
    },
    handleSetting () {
      this.$refs.colSetting.show({
        title: this.$t('栅格配置'),
        checkedList: this.showList,
        nowArray: this.nowArray
      })
    },
    getSetting (data) {
      this.showList = data
    },
    handleAddRules () {
      const addData = [
        ...this.value,
        {
          pattern: '',
          message: ''
        }
      ]
      this.$emit('input', addData)
    },
    handleDelete (deleteIndex) {
      // 删除
      this.$emit(
        'input',
        this.value.filter((val, index) => index !== deleteIndex)
      )
    }
  }
}
</script>
<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';
.option-change-container {
  width: calc(100% - 8px);
}
.option-change-box {
  height: 38px;
  padding-bottom: 6px;
  .option-delete-box {
    background: #ffe9e9;
    color: #f22;
    width: 36px;
    height: 36px;
    line-height: 36px;
    margin-left: 4px;
    text-align: center;
    border-radius: 50%;
    overflow: hidden;
    transition: all 0.3s;
    &:hover {
      background: #f22;
      color: #fff;
    }
  }
  .option-add-box {
    background: #f6ffed;
    color: #52c41a;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 50%;
    overflow: hidden;
    transition: all 0.3s;
    &:hover {
      background: #52c41a;
      color: #fff;
    }
  }
}
.list-item {
  // padding: 8px;
  margin-bottom: -1px;
  background-color: #fff;
  // border: 1px solid rgba(0, 0, 0, .125);
}
.list-item[draggable='true'] {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-item .handle {
  // margin-right: 5px;
  // padding: 0 25px 0 0;
  cursor: move;
}
.list-item .text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.list-item:first-child {
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}
.list-item:last-child {
  margin-bottom: 0;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
}
</style>
