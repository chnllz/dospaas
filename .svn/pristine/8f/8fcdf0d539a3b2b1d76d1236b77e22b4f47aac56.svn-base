<template>
  <a-drawer :title="$t('预览')" :width="1000" :destroyOnClose="true" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <div style="height: 100%; display: flex; flex-direction: column">
        <div style="padding: 8px; font-size: 16px">{{ previewData.title || '--' }}</div>
        <div
          v-dompurify-html="previewData.content || '--'"
          style="flex: 1; background: #f7f7f7; border-radius: 4px; padding: 8px"
        ></div>
      </div>
      <div class="bbar">
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('crm'),
  components: {

  },
  data () {
    return {
      loading: true,
      config: {},
      visible: false,
      previewData: {}
    }
  },
  methods: {
    show (config) {
      this.loading = true
      this.config = config
      if (!config.formValue.ddh) {
        this.$message.warning(this.$t('请输入订单号'))
        return
      }
      if (!config.formValue.yjbtmb) {
        this.$message.warning(this.$t('请输入邮件标题模板'))
        return
      }
      if (!config.formValue.yjnrmb) {
        this.$message.warning(this.$t('请输入邮件内容模板'))
        return
      }
      let data = null
      data = {
        mbid: config.formValue.mbid,
        mbnr: config.formValue.yjnrmb
      }
      if (config.record) {
        data = { ...data, ...{ id: config.record.id } }
      }
      this.visible = true
      this.preview(data)
    },
    preview (data) {
      this.axios({
        url: '/mail/data/previewTemplate',
        data: { orderNo: this.config.formValue.ddh, templateId: this.config.formValue.mbid, templateContent: data.mbnr, templateTitle: this.config.formValue.yjbtmb }
      }).then(res => {
        if (res) {
          this.loading = false
        }
        if (res.code !== 0) {
          this.$message.error(res.message)
        } else {
          this.previewData = res.result ? res.result : {}
        }
      })
    }
  }
}
</script>
