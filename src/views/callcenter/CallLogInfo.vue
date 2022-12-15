<template>
  <a-drawer :title="config.title || $t('详情')" :width="800" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="false">
      <div style="display: flex; flex-direction: column">
        <a-form :labelCol="{ span: 4 }" :wrapperCol="{ span: 18 }">
          <a-form-item label="UID">{{ info.uid }}</a-form-item>
          <a-form-item label="事件类型">{{ info.eventType }}</a-form-item>
          <a-form-item label="事件产生事件">{{ info.eventTime }}</a-form-item>
          <a-form-item label="事件详细信息"><a-textarea :value="info.eventData" :rows="6" disabled /></a-form-item>
        </a-form>
      </div>
      <div class="bbar">
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  data () {
    return {
      config: {},
      visible: false,
      info: {}
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.info = config.data
    }
  }
}
</script>
