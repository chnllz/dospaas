<template>
  <a-drawer :title="config.title" height="100%" placement="top" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="false">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane key="1" :tab="$t('库所管理')">
          <Place :item="config.record" />
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('变迁管理')">
          <Transition :item="config.record" />
        </a-tab-pane>
        <a-tab-pane key="3" :tab="$t('向弧管理')">
          <Arc :item="config.record" />
        </a-tab-pane>
      </a-tabs>
      <div class="bbar">
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>

export default {
  i18n: window.lang('admin'),
  components: {
    Place: () => import('./Place'),
    Transition: () => import('./Transition'),
    Arc: () => import('./Arc')
  },
  data () {
    return {
      config: {},
      visible: false
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
    }
  }
}
</script>
