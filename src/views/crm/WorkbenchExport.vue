<template>
  <div>
    <general-export ref="generalExport">
      <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
        <!-- 批量建单 -->
        <a-form-item v-if="type === 'create'" label="建单模板">
          <a-row>
            <a-col :span="5">
              <a-select v-model="templateType" @change="filePathChange">
                <a-select-option value="service">{{ $t('客服→物流模板') }}</a-select-option>
                <a-select-option value="logistics">{{ $t('物流→客服模板') }}</a-select-option>
                <a-select-option value="other">{{ $t('其他协作部门批量模板') }}</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="2">
              <a style="margin-left: 8px" @click="handleDownload">{{ $t('点击下载') }}</a>
            </a-col>
          </a-row>
        </a-form-item>
        <!-- 批量处理 -->
        <a-form-item v-else label="批量处理模板" :colon="false">
          <a style="margin-left: 8px" @click="handleDownload">{{ $t('点击下载') }}</a>
        </a-form-item>
      </a-form>
    </general-export>
  </div>
</template>
<script>
export default {
  i18n: window.lang('crm'),
  components: {
    GeneralExport: () => import('@/views/admin/Table/GeneralExport')
  },
  data () {
    return {
      templateType: '',
      // 模板下载地址
      filePath: '',
      type: '',
      className: ''
    }
  },
  methods: {
    createOrder (type) {
      this.templateType = 'service'
      this.type = type
      let parameter = {}
      if (type === 'handle') {
        this.filePath = 'static/template/批量处理模板.xlsx'
      } else {
        this.filePath = 'static/template/工单-客服→物流模板.xlsx'
        parameter = {
          createType: this.templateType // logistics(物流→客服)/service(客服→物流)/other(其他)
        }
      }
      this.$refs.generalExport.show({
        slotScoped: true,
        title: this.$t('导入'),
        type: 'import',
        parameter,
        className: type === 'create' ? 'WorkOrderTask' : 'ProcessingTask'
      })
    },
    filePathChange (e) {
      this.templateType = e
      if (e === 'service') {
        this.filePath = 'static/template/工单-客服→物流模板.xlsx'
      } else if (e === 'logistics') {
        this.filePath = 'static/template/工单-物流→客服模板.xlsx'
      } else {
        this.filePath = 'static/template/工单-其他协作部门模板.xlsx'
      }
      if (this.type === 'create') {
        this.$refs.generalExport.config.parameter.createType = this.templateType
      }
    },
    handleDownload () {
      const filePath = encodeURIComponent(this.filePath)
      window.open(this.$store.state.env.VUE_APP_API_BASE_URL + 'admin/api/download/?filePath=' + filePath)
    }
  }
}
</script>
