<template>
  <a-drawer
    class="drawer"
    :title="title"
    :width="600"
    :visible="visible"
    :destroyOnClose="true"
    @close="visible = !visible"
  >
    <a-form :form="form" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
      <a-form-item :label="$t('姓名')">
        <a-input
          v-decorator="['name', { initialValue: data.name, rules: [{ required: true, message: $t('请输入姓名') }] }]"
        />
      </a-form-item>
      <a-form-item :label="$t('电话')">
        <a-input v-decorator="['number', { initialValue: data.number }]" />
      </a-form-item>
      <a-form-item :label="$t('备注')">
        <a-textarea v-decorator="['remarks', { initialValue: data.remarks }]" :autoSize="{ minRows: 5 }" />
      </a-form-item>
    </a-form>
    <div class="bbar">
      <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
      <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
    </div>
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('test'),
  data () {
    return {
      // 表单提交地址
      url: '',
      // 表单界面标题
      title: '',
      // 是否显示表单界面
      visible: false,
      // 表单界面上下文传递参数
      context: {
        id: 0
      },
      // 单条用户信息
      data: {},
      // 表单
      form: this.$form.createForm(this)
    }
  },
  methods: {
    // 弹出添加表单界面
    showAdd () {
      this.url = '/test/user/add'
      this.title = this.$t('添加')
      this.visible = true
    },
    // 弹出编辑表单界面
    showEdit (context) {
      this.url = '/test/user/edit'
      this.title = this.$t('编辑')
      this.visible = true
      this.context = Object.assign(this.context, context)
      // 获取单条用户信息
      this.axios({
        url: '/test/user/get',
        params: { id: context.id },
        loading: true
      }).then((res) => {
        this.data = res.result
      })
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (errors) {
          return
        }
        this.axios({
          url: this.url,
          data: Object.assign(values, { id: this.data.id }),
          loading: true
        }).then((res) => {
          this.$emit('ok', values)
          this.visible = false
          this.$message.success(res.message)
        })
      })
    }
  }
}
</script>
