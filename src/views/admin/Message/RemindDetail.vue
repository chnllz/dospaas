<template>
  <a-drawer :title="config.title" :width="1200" :visible="visible" :destroyOnClose="true" @close="onClose">
    <a-spin :spinning="loading">
      <div>
        <div style="margin: -10px 0 10px">
          <span>
            <a-icon type="user" />
            {{ record.receiveUsername }}
          </span>
          <span style="margin-left: 40px">
            {{ record.datetime }}
          </span>
        </div>
        <div v-dompurify-html="config.content">{{ config.content }}</div>
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
      loading: false,
      visible: false,
      config: {},
      record: {}
    }
  },
  methods: {
    show (config) {
      this.config = config
      this.visible = true
      this.record = config.record
    },
    onClose () {
      this.visible = false
      if (this.config.record.status === '0') {
        this.$emit('ok', this.config.record.id, this.config.record.relatedNumber)
      }
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ img {
  max-width: 1100px;
}
</style>
