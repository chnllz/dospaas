<template>
  <a-drawer :destroyOnClose="true" :title="config.title" :width="1200" :visible="visible" @close="visible = !visible">
    <dict-data-list ref="dictDataList" :config="config" />
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
    DictDataList: () => import('@/views/admin/Dict/DictDataList')
  },
  data () {
    return {
      config: {},
      visible: false
    }
  },
  methods: {
    // 打开抽屉组件
    show (config) {
      this.visible = true
      this.config = config
    }
  }
}
</script>
