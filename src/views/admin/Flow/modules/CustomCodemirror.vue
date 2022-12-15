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
  name: 'CustomCodemirror',
  components: {
    Codemirror: () => import('@/views/admin/Formula/Codemirror')
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
      this.mydata = Object.assign({}, config, {
        tableId: this.config.tableId || '',
        data: this.config.item.customCode || {
          html: '',
          value: ''
        }
      })
    },
    handleSubmit () {
      this.visible = false
      this.$emit('ok', this.$refs.condition.getValue())
    }
  }
}
</script>
