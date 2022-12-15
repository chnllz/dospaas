<template>
  <div style="height: 100%">
    <processed ref="Processed" :showdata="data" />
  </div>
</template>
<script>
export default {
  components: {
    Processed: () => import('./Processed')
  },
  data () {
    return {
      data: {
        url: '/visit/details/browsing',
        action: 'ProcessedTask',
        show: 'detailed',
        operation: 'handle'
      }
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
