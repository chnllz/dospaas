<template>
  <a-drawer :destroyOnClose="true" :title="config.title" :width="1200" :visible="visible" @close="onClose">
    <a-spin :spinning="false">
      <user-table-list
        ref="userTableList"
        :key="userKey"
        :viewThis="viewThis"
        :params="Object.assign({ templateId, type: config.type }, openWindowOption, data)"
        :screenData="screenData"
        :filtersData="filtersData"
        @ok="getValue"
      />
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  components: {
    UserTableList: () => import('./UserTableList')
  },
  props: {
    viewThis: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      visible: false,
      config: {},
      templateId: '',
      search: {},
      filtersData: [],
      userKey: 'userKey',
      data: {},
      screenData: {},
      openWindowOption: {}
    }
  },
  methods: {
    show (config) {
      console.log('config', config)
      this.visible = true
      this.config = config
      this.search = {}
      this.filtersData = config.filtersData
      if (config.data) {
        this.data = config.data
      }
      if (config.screenData) {
        this.screenData = config.screenData
      }
      // 子表开窗
      if (config.action === 'web_sub_data_window') {
        let importTemplate = this.config.barData.importTemplate
        importTemplate = JSON.parse(importTemplate)
        this.templateId = importTemplate.dateView
        this.search.val = this.config.searchValue || ''
        this.search.key = importTemplate.winField
        if (!this.search.key) {
          this.search = undefined
        }
        this.openWindowOption = { subformDataWindowOpenCondition: this.search } // 子表关联开窗条件
      } else { // 关联字段开窗
        this.templateId = config.templateId
      }
    },
    getValue (val, type, screenData) {
      if (val) {
        if (this.config.action === 'web_sub_data_window') {
          this.axios({
            url: '/admin/general/getSubformFieldColumns',
            data: {
              templateId: this.templateId,
              dataList: val
            }
          }).then(res => {
            if (res.code === 0) {
              const fieldColumns = res.result
              this.$emit('ok', val, fieldColumns.filter(item => item.alias !== 'action'))
              if (type !== 'line') {
                this.visible = false
              }
            }
          })
        } else {
          let result = []
          if (val.fields && val.fields.length > 0 && val.data && Object.keys(val.data).length > 0) {
            result = val.fields.map(item => {
              item.value = val.data[item.alias] || ''
              // 图片，附件做特殊处理
              if (item.formType === 'file' || item.formType === 'image') {
                item.value = item.value ? JSON.parse(item.value) : []
              }
              return item
            })
          }
          this.$emit('ok', result, this.config.alias, this.config.info, this.config.record, screenData)
          this.visible = false
        }
      }
    },
    onClose () {
      this.search = {}
      this.visible = false
    }
  }
}
</script>
