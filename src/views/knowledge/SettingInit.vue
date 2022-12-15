<template>
  <a-card size="small" :bordered="false">
    <a-tabs size="small">
      <a-tab-pane key="1" :tab="$t('基础设置')">
        <SettingInitFoundation />
      </a-tab-pane>
      <a-tab-pane key="2" :tab="$t('分类设置')">
        <SettingInitClassify />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>
<script>
export default {
  i18n: window.lang('knowledge'),
  components: {
    SettingInitFoundation: () => import('./SettingInitFoundation'),
    SettingInitClassify: () => import('./SettingInitClassify')
  },
  data () {
    return {
    }
  }
}
</script>
