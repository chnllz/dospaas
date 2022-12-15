<template>
  <!-- 个人库/公共库的快捷内容抽屉 -->
  <a-modal :width="600" :title="config.title" :visible="visible" :destroyOnClose="true" @cancel="visible = !visible">
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item :label="$t('所属分类')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[
              'info[rid]',
              { rules: [{ required: true, message: $t('请选择所属技能组') }], initialValue: config.categoryId }
            ]"
            :disabled="true"
            :placeholder="$t('请选择所属技能组')"
          >
            <a-select-option v-for="(value, key) in group" :key="key" :value="value.id">
              {{ value.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span slot="label" :title="$t('快捷词')">
            {{ $t('快捷词') }}
            <a-tooltip :title="$t('范围：2-20个字符。')">
              <a-icon type="question-circle" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
              'info[title]',
              {
                initialValue: data.title,
                rules: [
                  { required: true, message: $t('请输入快捷词') },
                  { min: 2, max: 20, message: $t('请输入2-20个字符') }
                ]
              }
            ]"
            :placeholder="$t('请输入快捷词')"
          />
        </a-form-item>
        <a-form-item :label="$t('回复内容')" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea
            v-decorator="[
              'info[content]',
              { initialValue: data.content, rules: [{ required: true, message: $t('请输入回复内容') }] }
            ]"
            :placeholder="$t('请输入回复内容')"
            :auto-size="{ minRows: 6 }"
          />
        </a-form-item>
      </a-form>
    </a-spin>
    <div slot="footer" :loading="loading">
      <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
      <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
    </div>
  </a-modal>
</template>
<script>
export default {
  i18n: window.lang('chat'),
  data () {
    return {
      visible: false,
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      form: this.$form.createForm(this),
      config: {},
      data: {},
      group: []
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.loading = true
      this.config = config || {}
      this.axios({
        url: this.config.url,
        data: Object.assign({ action: 'get', id: config.record ? config.record.id : 0 })
      }).then((res) => {
        this.loading = false
        this.data = res.result.info
        this.group = [{
          id: config.categoryId,
          name: config.categoryName
        }]
      })
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          this.loading = true
          this.axios({
            url: this.config.url,
            data: Object.assign(values, { id: this.data.id, type: this.config.type })
          }).then((res) => {
            this.loading = false
            if (res.code === 0) {
              this.$emit('ok')
              this.visible = false
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    }
  }
}
</script>
