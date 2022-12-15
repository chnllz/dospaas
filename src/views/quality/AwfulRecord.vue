<template>
  <record-details ref="RecordDetails" :url="url" :exportType="exportType" :roc="roc" />
</template>
<script>
export default {
  components: {
    RecordDetails: () => import('./RecordDetails')
  },
  data () {
    return {
      url: '/quality/zeroRecording/init',
      exportType: 'ExportZeroRecording',
      roc: false
    }
  },
  methods: {
  }
}
</script>
