<template>
  <a-drawer :title="config.title" :width="1200" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="false" style="height: 100%">
      <codemirror ref="condition" :params="params" />
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  components: {
    Codemirror: () => import('@/views/admin/Formula/Codemirror')
  },
  props: {
    params: {
      type: Object,
      default () {
        return {}
      },
      required: true
    }
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
    },
    handleSubmit () {
      this.visible = false
      this.$emit('ok', { tableId: this.params.tableId, data: this.$refs.condition.getValue() })
    }
  }
}
</script>
