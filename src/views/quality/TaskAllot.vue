<template>
  <a-drawer :title="config.title" :width="500" :destroyOnClose="true" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item label="转移数据数量">
          <a-input :read-only="true" :disabled="true" class="input" :value="selectedRowKeys.length" />
        </a-form-item>
        <a-form-item :required="true" label="转移至坐席">
          <a-select
            v-decorator="['agentRealName', { rules: [{ required: true, message: '请选择坐席' }] }]"
            :allowClear="true"
            show-search
          >
            <a-select-option v-for="item in userList" :key="item.id" :value="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <div class="bbar">
        <a-button type="primary" @click="submit">{{ $t('提交') }}</a-button>
        <a-button @click="visible = false">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      loading: true,
      config: {},
      visible: false,
      userList: [],
      selectedRowKeys: ''
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.loading = false
      this.config = config
      const { selectedRowKeys, userList } = config
      this.selectedRowKeys = selectedRowKeys
      this.userList = userList
    },
    submit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          const ids = this.selectedRowKeys.join(',')
          this.$confirm({
            title: '您确认要重新分配吗？',
            onOk: () => {
              this.axios({
                url: '/quality/task/reassign',
                params: Object.assign({ ids: ids }, values)
              }).then(res => {
                if (res.code === 0) {
                  this.$message.success(this.$t(`分配成功`))
                  this.form.resetFields()
                  this.$emit('ok')
                  this.visible = !this.visible
                } else {
                  this.$message.error(res.message)
                }
              })
            }
          })
        }
      })
    }
  }
}
</script>
