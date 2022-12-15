<template>
  <a-modal
    :title="$t('预览')"
    :visible="visible"
    :okText="$t('确认')"
    :cancelText="$t('关闭')"
    style="top: 20px"
    :destroyOnClose="true"
    :width="`${previewWidth}px`"
    @ok="handleCancel"
    @cancel="handleCancel"
  >
    <k-form-build ref="KFormBuild" :value="jsonData" @submit="handleSubmit" />
    <jsonModel ref="jsonModel" />
  </a-modal>
</template>
<script>
/*
 * author kcz
 * date 2019-11-20
 */
export default {
  name: 'KFormPreview',
  i18n: window.lang('admin'),
  components: {
    jsonModel: () => import('../KFormDesign/module/jsonModal')
  },
  data () {
    return {
      visible: false,
      previewWidth: 1200,
      jsonData: {}
    }
  },
  methods: {
    handleSubmit (p) {
      p.then(res => {
        console.log(res, '获取数据成功')
        this.$refs.jsonModel.jsonData = res
        this.$refs.jsonModel.visible = true
      }).catch(err => {
        console.log(err, '获取数据失败')
      })
    },
    handleGetData () {
      this.$refs.KFormBuild.getData()
        .then(res => {
          console.log(res, '获取数据成功')
          this.$refs.jsonModel.jsonData = res
          this.$refs.jsonModel.visible = true
        })
        .catch(err => {
          console.log(err, '获取数据失败')
        })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
