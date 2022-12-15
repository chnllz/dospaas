<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { AppDeviceEnquire } from '@/utils/mixin'
import storage from '@/utils/storage'

export default {
  mixins: [AppDeviceEnquire],
  data () {
    return {
      locale: {}
    }
  },
  created () {
    const lang = storage.get('lang')
    this.locale = require(`ant-design-vue/es/locale-provider/${lang}`).default
    window['lang'] = (data) => {
      return {
        messages: {
          [lang]: require(`@/views/${data}/i18n/${lang}`).default
        }
      }
    }
  }
}
</script>
