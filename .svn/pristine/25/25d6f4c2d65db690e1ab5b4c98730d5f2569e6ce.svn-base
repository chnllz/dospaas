<template>
  <div class="knowledge_tree">
    <a-tree
      style="width: 100%"
      :expandedKeys="expandedKeys"
      :selectedKeys.sync="selectKeys"
      :treeData="menulist"
      :blockNode="true"
      @select="onSelect"
      @expand="onExpand"
    >
      <a-icon slot="icon" type="carry-out" />
    </a-tree>
  </div>
</template>
<script>
export default {
  i18n: window.lang('knowledge'),
  props: {
    type: {
      type: String,
      default: 'public'
    }
  },
  data () {
    return {
      menulist: [],
      expandedKeys: [0],
      selectKeys: [0]
    }
  },
  watch: {
    type: {
      handler (newValue) {
        this.init(newValue)
      },
      immediate: true
    }
  },
  methods: {
    init (type) {
      this.axios({
        url: '/knowledge/index/categoryTree'
      }).then(res => {
        if (res.code === 0) {
          this.menulist = [{
            title: this.$t('所有分类'),
            key: 0,
            children: res.result,
            selectable: true
          }]
          this.expandedKeys = [0]
          this.$emit('ok', 0)
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    onSelect (keys, event) {
      if (keys.length !== 0) {
        this.$emit('ok', keys[0], event.node.$options.propsData.title, event.node.$options.propsData.dataRef.valuePath)
      }
    },
    onExpand (keys) {
      this.expandedKeys = keys
    }
  }
}
</script>

<style scoped>
.components-layout-demo-custom-trigger .knowledge_tree .ant-tree li .ant-tree-node-content-wrapper:hover {
  background-color: rgba(86, 196, 26, 0.3);
}
.components-layout-demo-custom-trigger
  .knowledge_tree
  .ant-tree
  li
  .ant-tree-node-content-wrapper.ant-tree-node-selected {
  color: #fff;
}
</style>
