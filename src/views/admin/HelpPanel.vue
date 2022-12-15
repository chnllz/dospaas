<template>
  <div style="display: inline-block; position: relative">
    <a-icon type="question-circle" :style="styleStr" @click="getHelp"></a-icon>
    <a-popover v-model="visible" trigger="click" :arrowPointAtCenter="true" placement="bottomRight">
      <template slot="content">
        <div style="width: 350px" class="helpText">
          <div v-dompurify-html="helpNotes" v-viewer></div>
        </div>
      </template>
      <a-icon type="question-circle" class="help-icon-hidden" :style="styleStr"></a-icon>
    </a-popover>
  </div>
</template>

<script>
export default {
  props: {
    number: {
      type: String,
      default: '22041616460103'
    },
    styleStr: {
      type: String,
      default: 'font-size: 16px;margin-left: 8px;color: rgba(0, 0, 0, 0.65);'
    }
  },
  data () {
    return {
      visible: false,
      copyVisible: false,
      helpNotes: null
    }
  },
  methods: {
    getHelp () {
      if (this.copyVisible) {
        this.copyVisible = false
        this.visible = false
      } else {
        this.$setLoading({ spinning: true })
        this.axios({
          url: '/admin/document/get',
          data: {
            action: 'get',
            number: this.number ? this.number : '22041616460103'
          }
        }).then(res => {
          this.$setLoading({ spinning: false })
          if (!res.code) {
            const obj = res.result
            if (obj.displayMode === 'drawer') {
              this.$showDocument({ visible: true, content: obj.content, number: obj.number, name: obj.name })
            } else {
              this.copyVisible = true
              this.visible = true
              this.helpNotes = obj.content
            }
          } else {
            this.$message.warning(res.message)
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
&.help-icon-hidden {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
