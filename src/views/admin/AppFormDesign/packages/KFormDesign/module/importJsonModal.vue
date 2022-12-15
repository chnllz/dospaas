<template>
  <a-modal
    :title="$t('JSON数据')"
    :visible="visible"
    :cancelText="$t('关闭')"
    :destroyOnClose="true"
    wrapClassName="code-modal-9136076486841527"
    style="top: 20px"
    width="850px"
    @ok="handleImportJson"
    @cancel="handleCancel"
  >
    <p class="hint-box">{{ $t('导入格式如下:') }}</p>
    <div class="json-box-9136076486841527">
      <codemirror ref="myEditor" v-model="jsonFormat" style="height: 100%"></codemirror>
    </div>
    <a-upload action="/abc" :beforeUpload="beforeUpload" :showUploadList="false" accept="application/json">
      <a-button type="primary">{{ $t('导入json文件') }}</a-button>
    </a-upload>
  </a-modal>
</template>
<script>
/*
 * author kcz
 * date 2019-11-20
 * description 导入json Modal
 */
import { codemirror } from 'vue-codemirror-lite'
import jsonFormat from '../config/jsonFormat'
export default {
  name: 'ImportJsonModal',
  i18n: window.lang('admin'),
  components: {
    codemirror
  },
  data () {
    return {
      visible: false,
      jsonFormat,
      jsonData: {},
      handleSetSelectItem: null
    }
  },
  computed: {
    editor () {
      // get current editor object
      return this.$refs.myEditor.editor
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.jsonFormat = jsonFormat
      }
    }
  },
  methods: {
    handleCancel () {
      this.visible = false
    },
    beforeUpload (e) {
      // 通过json文件导入
      const _this = this
      const reader = new FileReader()
      reader.readAsText(e)
      reader.onload = function () {
        _this.jsonFormat = this.result
        _this.handleImportJson()
      }
      return false
    },
    handleImportJson () {
      // 导入JSON
      try {
        const editorJsonData = JSON.parse(this.jsonFormat)
        this.jsonData.list = editorJsonData.list
        this.jsonData.config = editorJsonData.config
        this.jsonData.config.layout = editorJsonData.config.layout
        this.handleCancel()
        // 导入之后，需要清除已选择key
        this.handleSetSelectItem({ key: '' })

        this.$message.success(this.$t('导入成功'))
      } catch (error) {
        this.$message.error(this.$t('导入失败，数据格式不对'))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.hint-box {
  background: #e9e9e9;
  margin: 0;
  border-bottom: 2px solid #fff;
}
</style>
