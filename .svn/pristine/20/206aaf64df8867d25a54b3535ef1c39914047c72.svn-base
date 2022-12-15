<template>
  <a-drawer :title="config.title" :width="1200" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="false" style="height: 100%">
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
  name: 'QuerierCodemirror',
  components: {
    Codemirror: () => import('@/views/admin/Formula/Codemirror')
  },
  props: {
    params: {
      type: Array,
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
      this.recordIndex = this.config.index
      this.mydata = {
        tableId: config.tableId,
        data: config.page !== 'ConditionRules' ? config.item.condition : this.config.item
      }
    },
    handleSubmit () {
      this.visible = false
      const value = this.$refs.condition.getValue()
      if (this.config.page !== 'ConditionRules') {
        this.params[this.recordIndex].condition = value
      } else {
        this.params[this.recordIndex].condition = value
        this.$emit('ok', value, this.recordIndex)
      }
    }
  }
}
</script>
