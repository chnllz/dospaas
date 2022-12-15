<template>
  <a-drawer :title="config.title" :width="1200" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="false">
      <codemirror ref="condition" :params="mydata" />
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
      visible: false,
      mydata: {}
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.mydata = {
        tableId: this.config.flowData.params.tableId,
        data: this.params.arcCondition ? this.params.arcCondition : {},
        currentSelect: this.config.currentSelect,
        flowData: this.config.flowData
      }
    },
    handleSubmit () {
      this.visible = false
      this.params.arcCondition = this.$refs.condition.getValue()
    }
  }
}
</script>
