<template>
  <a-form>
    <div class="chatSettingTitle">{{ $t('仅限于公有云系统配置使用，不开放私有云系统配置') }}</div>
  </a-form>
</template>
<script>
export default {
  i18n: window.lang('chat'),
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';
.chatSettingTitle {
  padding-left: 10px;
  border-left: 4px solid @primary-color;
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
}
</style>
