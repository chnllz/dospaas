<template>
  <a-card size="small" :bordered="false">
    <a-tabs size="small">
      <a-tab-pane key="1" :tab="$t('审核知识')">
        <IndexInitCommon type="myAudited" page="manageKnowledge" />
      </a-tab-pane>
      <a-tab-pane key="2" :tab="$t('报错处理')">
        <IndexInitCommon type="dealBug" page="manageKnowledge" />
      </a-tab-pane>
      <a-tab-pane key="4" :tab="$t('批量删除')">
        <IndexInitCommon type="questions" page="manageKnowledge" />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>
<script>
export default {
  i18n: window.lang('knowledge'),
  components: {
    IndexInitCommon: () => import('./IndexInitCommon')
  }
}
</script>
