<template>
  <div>
    <AfterpayDetails ref="AfterpayDetails" />
    <AfterpayUpdateStatus ref="AfterpayUpdateStatus" />
    <BindOrderIdRemark ref="BindOrderIdRemark" />
  </div>
</template>

<script>
export default {
  i18n: window.lang('crm'),
  components: {
    AfterpayDetails: () => import('./AfterpayDetails'),
    AfterpayUpdateStatus: () => import('./AfterpayUpdateStatus'),
    BindOrderIdRemark: () => import('./BindOrderIdRemark')
  },
  data () {
    return {
      config: ''
    }
  },
  methods: {
    show (config) {
      this.config = config
      if (config.title === this.$t('详情')) {
        this.$refs.AfterpayDetails.show(config)
      } else if (config.title === this.$t('绑定订单号')) {
        this.$refs.BindOrderIdRemark.show(config)
      } else {
        this.$refs.AfterpayUpdateStatus.show(config)
      }
    }
  }
}
</script>
