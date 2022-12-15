<template>
  <a-spin
    :spinning="$store.state.app.globalSpin.spinning"
    :tip="$store.state.app.globalSpin.tip"
    :size="$store.state.app.globalSpin.size"
    class="globalSpin"
  >
    <component :is="component" />
  </a-spin>
</template>
<script>
import config from '@/config/defaultSettings'
import { updateTheme, updateColorWeak } from '@/components/SettingDrawer/settingConfig'
import storage from '@/utils/storage'
import { watermark } from '@/components/_util/watermark'
export default {
  data () {
    return {
      component: null
    }
  },
  mounted () {
    if (this.$store.getters.userInfo.username && this.$store.getters.setting.watermarkEnable) {
      watermark({ watermark_txt: this.$store.getters.userInfo.username })
    }
    if (this.$route.query.view) {
      this.component = () => import('@/views/' + this.$route.query.view)
    }
    const primaryColor = storage.get('DEFAULT_COLOR')
    const colorWeak = storage.get('DEFAULT_COLOR_WEAK')
    updateTheme(primaryColor)
    if (colorWeak !== config.colorWeak) {
      updateColorWeak(colorWeak)
    }
  }
}
</script>
<style lang="less" scoped>
.globalSpin {
  height: 100%;
  /deep/ .ant-spin-container {
    height: 100%;
  }
}
</style>
