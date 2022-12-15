<template>
  <div style="height: 100%">
    <a-tabs class="tabs-flex tabs-union">
      <a-tab-pane key="plane">
        <span slot="tab">
          <a-icon type="bars" />
          {{ $t('平面字典') }}
        </span>
        <DictPlane ref="DictPlane" />
      </a-tab-pane>
      <a-tab-pane key="tree">
        <span slot="tab">
          <a-icon type="apartment" />
          {{ $t('树形字典') }}
        </span>
        <DictTree ref="DictTree" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
    DictTree: () => import('./DictTree'),
    DictPlane: () => import('./DictPlane')
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
.tabs-union /deep/ .ant-tabs-top-content .ant-tabs-tabpane-active {
  height: calc(100vh - 160px) !important;
  overflow-y: auto;
}

.tabs-union /deep/ .ant-tabs-left-content .ant-tabs-tabpane-active {
  margin-top: 20px;
  height: calc(100vh - 150px) !important;
  overflow-y: auto;
}
</style>
