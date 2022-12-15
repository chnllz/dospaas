<template>
  <a-drawer :title="$t('代码编辑器')" :width="1200" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="false">
      <editor ref="editor" :params="mydata" />
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
    Editor: () => import('@/views/admin/Formula/Editor')
  },
  data () {
    return {
      config: {},
      visible: false,
      action: '',
      mydata: {}
    }
  },
  methods: {
    show (config, action) {
      this.visible = true
      this.action = action
      this.mydata = config
    },
    handleSubmit () {
      var value = this.$refs.editor.getValue()
      value = value.replace(/ +/g, '')
      value = value.replace(/[\r\n]/g, '')
      if (value) {
        this.$emit('func', this.$refs.editor.getValue())
      } else {
        value = ''
        this.$emit('func', value)
      }
      this.visible = false
    }
  }
}
</script>
