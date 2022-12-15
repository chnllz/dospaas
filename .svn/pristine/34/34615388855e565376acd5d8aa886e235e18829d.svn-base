<template>
  <a-layout class="components-layout-demo-custom-trigger" style="background: #ffffff">
    <a-layout-sider
      v-model="collapsed"
      class="knowledge"
      :trigger="null"
      :inline-collapsed="collapsed"
      :collapsedWidth="0"
      :width="300"
      style="padding-right: 10px; border-right: 1px solid rgb(240, 242, 245)"
    >
      <IndexInitCommonTree :type="typeCopy" @ok="changeType" />
    </a-layout-sider>
    <a-layout>
      <a-layout-content :style="{ margin: 0, padding: 0, background: '#fff', minHeight: '657px' }">
        <IndexInitCommonSelect
          ref="indexInitCommonSelect"
          :params="params"
          :page="page"
          :treeId="treeId"
          :delIdArr="delIdArr"
          @ok="handleSearch"
        />
        <IndexInitCommonList
          :params="params"
          :page="page"
          :type="type"
          :categoryId="categoryId"
          style="padding: 0px 10px"
          @ok="getDelId"
          @read="handleRead"
        />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  i18n: window.lang('knowledge'),
  components: {
    IndexInitCommonSelect: () => import('./IndexInitCommonSelect'),
    IndexInitCommonTree: () => import('./IndexInitCommonTree'),
    IndexInitCommonList: () => import('./IndexInitCommonList')
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    page: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      collapsed: false,
      categoryId: 0,
      category: this.$t('所有分类'),
      typeCopy: '',
      params: {},
      delIdArr: [],
      treeId: []
    }
  },
  methods: {
    // 搜索栏
    handleSearch (sortField, words, theme, status, auditStatus, dateStatus) {
      let data = {}
      if (status || status === '') {
        data = { sortField, words, theme, status }
      } else if (auditStatus) {
        data = { sortField, words, theme, auditStatus, dateStatus }
      } else {
        data = { sortField, words, theme }
      }
      this.params = Object.assign(this.params, data)
      this.params = JSON.parse(JSON.stringify(this.params))
    },
    // 选择导航栏标签
    changeType (categoryId, category, treeId) {
      this.categoryId = categoryId
      this.category = category
      this.params.categoryId = categoryId
      this.params.type = this.type
      // 原本是this.params.theme =null 但是如果在搜索的时候如果切换分类,就会发送theme=0,后台会崩溃
      // theme是全文搜索和标签搜索的意思,和分类无关
      this.params = JSON.parse(JSON.stringify(this.params))
      this.treeId = treeId
    },
    getDelId (arr) {
      this.delIdArr = arr
    },
    // 已读知识
    handleRead () {
      this.$refs.indexInitCommonSelect.reset()
      this.$emit('read')
    }
  }
}
</script>
<style scoped lang="less">
@import '~ant-design-vue/es/style/themes/default.less';
.knowledge {
  height: calc(100vh - 175px);
  overflow-y: auto;
}
.componets-layout-demo-custom-trigger {
  width: 100%;
}
/* 自定义触发器样式 */
.components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.components-layout-demo-custom-trigger .trigger:hover {
  color: @primary-color;
}
/* 侧边栏样式 */
.components-layout-demo-custom-trigger aside {
  max-height: 100%;
  overflow: auto;
}
/* 侧边栏中树选择器样式 */
.components-layout-demo-custom-trigger aside .ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
  background: #52c41a;
}
.knowledge.ant-layout-sider.ant-layout-sider-dark {
  background: #fff;
}
.knowledge.ant-tree-node-content-wrapper.ant-tree-node-content-wrapper-open.ant-tree-node-selected {
  color: #fff;
}
.knowledge.ant-tree li .ant-tree-node-content-wrapper {
  height: 32px;
  line-height: 32px;
}
.knowledge.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border: none;
}
</style>
