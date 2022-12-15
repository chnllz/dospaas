<template>
  <a-modal
    :title="$t('JSON数据')"
    :footer="null"
    :visible="visible"
    :destroyOnClose="true"
    wrapClassName="code-modal-9136076486841527"
    style="top: 20px"
    width="850px"
    @cancel="handleCancel"
  >
    <previewCode :editorJson="editorJson" />
  </a-modal>
</template>
<script>
/*
 * author kcz
 * date 2019-11-20
 * description 生成json Modal
 */
export default {
  name: 'JsonModal',
  i18n: window.lang('admin'),
  components: {
    previewCode: () => import('../../PreviewCode/index')
  },
  data () {
    return {
      visible: false,
      editorJson: '',
      jsonData: {}
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.editorJson = JSON.stringify(this.jsonData, null, '\t')
      }
    }
  },
  methods: {
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
