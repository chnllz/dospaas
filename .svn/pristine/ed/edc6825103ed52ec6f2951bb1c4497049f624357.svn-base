<template>
  <div>
    <a-drawer
      placement="bottom"
      height="60"
      :maskClosable="false"
      :mask="false"
      :visible="audioObj.visible"
      @close="close"
    >
      <div style="text-align: center">
        <audio
          id="winPlayer"
          controls="true"
          autoplay="true"
          style="margin-top: 10px; vertical-align: middle; width: 450px; height: 40px"
        >
          <source :src="audioObj.sourceUrl" />
        </audio>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  props: {},
  data () {
    return {}
  },
  computed: {
    audioObj () {
      return this.$store.state.app.setting.audioPlayData || {
        visible: false,
        sourceUrl: ''
      }
    }
  },
  watch: {
    audioObj (newVal) {
      if (newVal.visible) {
        this.$nextTick(() => {
          this.audio = document.getElementById('winPlayer')
          this.audio.load()
        })
      }
    }
  },
  methods: {
    close () {
      this.audio = document.getElementById('winPlayer')
      this.audio.pause()
      this.$setSetting({ audioPlayData: { visible: false, sourceUrl: '' } })
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .ant-drawer-body > :first-child:not(.ant-spin-nested-loading) {
  padding: 0px;
}
</style>
