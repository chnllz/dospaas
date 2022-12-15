<template>
  <div class="page">
    <iframe :src="redirectUrl" height="100%" width="100%" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  props: {
    redirectUrlProps: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      redirectUrl: null
    }
  },
  created () {
    this.redirectUrl = this.redirectUrlProps ? this.redirectUrlProps : this.$route.meta.viewConfig.redirectUrl
  }
}
</script>
