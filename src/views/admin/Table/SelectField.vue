<template>
  <a-drawer :visible="visible" width="600" title="字段列表" @close="visible = false">
    <a-spin :spinning="loading">
      <div>
        <div :style="{ borderBottom: '1px solid #E9E9E9', marginBottom: '16px' }">
          <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
            {{ $t('选择所有') }}
          </a-checkbox>
          <a-tooltip :title="$t('ID、地址回写、字典回写字段禁止导入')">
            <a-icon type="question-circle" />
          </a-tooltip>
        </div>
        <a-col v-for="(checkItem, checkIndex) in checkedList" :key="checkIndex" :span="8" style="margin-bottom: 4px">
          <a-checkbox
            :value="checkItem.alias"
            :checked="checkItem.checked"
            @change="
              (e) => {
                onChange(e, checkItem, checkIndex)
              }
            "
          >
            {{ checkItem.name }}
          </a-checkbox>
        </a-col>
      </div>
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
        <a-button @click="visible = false">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>

<script>
export default {
  i18n: window.lang('admin'),
  props: {
    tableId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      visible: false,
      checkAll: false,
      indeterminate: false,
      checkedList: [],
      data: []
    }
  },
  methods: {
    show (config) {
      this.visible = true
      const fiedsAlias = config.fieldMappings.map(item => item.alias)
      this.data = config.checkedList
      this.checkedList = config.checkedList.filter(item => {
        const setting = JSON.parse(item.setting)
        return (setting.attribute.dataSource !== 'addressBookBack' && setting.attribute.dataSource !== 'dictionaryBack')
      })
      this.checkedList.forEach(item => {
        if (fiedsAlias.indexOf(item.alias) !== -1) {
          item.checked = true
        } else {
          item.checked = false
        }
      })
      this.checkedList = JSON.parse(JSON.stringify(this.checkedList))
      if (this.checkedList.every(item => item.checked)) {
        this.indeterminate = false
        this.checkAll = true
      } else {
        this.indeterminate = this.checkedList.some(item => item.checked)
        this.checkAll = false
      }
    },
    // 选择字段
    onChange (e, checkItem, index) {
      checkItem.checked = e.target.checked
      if (this.checkedList.every(item => item.checked)) {
        this.indeterminate = false
        this.checkAll = true
      } else {
        this.indeterminate = this.checkedList.some(item => item.checked)
        this.checkAll = false
      }
    },
    // 选择所有字段
    onCheckAllChange (e) {
      this.checkAll = e.target.checked
      this.indeterminate = false
      this.checkedList.forEach(item => {
        item.checked = e.target.checked
      })
    },
    handleSubmit () {
      const fieldMappings = []
      this.checkedList.forEach(item => {
        item.settings = JSON.parse(item.setting)
        if (item.checked) {
          const obj = {}
          obj.alias = item.alias
          obj.modalName = item.name
          obj.unique = item.fieldKey === 'unique_key' ? '1' : '0'
          obj.required = item.settings.attribute.required ? '1' : '0'
          obj.regexp = ''
          obj.formType = item.formType
          fieldMappings.push(obj)
        }
      })
      this.$emit('ok', fieldMappings)
      this.visible = false
    }
  }
}
</script>
