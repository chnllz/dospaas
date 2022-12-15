<template>
  <a-drawer :destroyOnClose="true" :title="config.title" :width="1200" :visible="visible" @close="onClose">
    <a-spin :spinning="false">
      <a-tabs v-model="defaultTab" style="height: 100%; overflow-x: hidden" @change="callbackTab">
        <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.tab" style="height: 100%">
          <user-table-list
            ref="userTableList"
            :key="userKey"
            :viewThis="viewThis"
            :params="
              Object.assign({ templateId: item.templateId, type: config.type }, openWindowOption, data, item.params)
            "
            :screenData="screenData"
            :filtersData="filtersData"
          />
        </a-tab-pane>
      </a-tabs>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  components: {
    UserTableList: () => import('@/views/admin/General/UserTableList')
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
      openWindowOption: {},
      defaultTab: '',
      tabList: []
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.defaultTab = this.config.defaultTab
      this.tabList = this.config.tabList
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
    callbackTab (e) {
      this.defaultTab = e
    },
    onClose () {
      this.search = {}
      this.visible = false
    }
  }
}
</script>
