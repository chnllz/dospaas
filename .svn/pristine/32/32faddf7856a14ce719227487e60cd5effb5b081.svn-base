<template>
  <div>
    <a-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-divider orientation="left">{{ $t('邮件通知默认设置') }}</a-divider>
      <a-form-item :label="$t('邮件收件人')">
        <a-input
          v-decorator="['info[emailReceiver]', { initialValue: data.emailReceiver ? data.emailReceiver : '' }]"
        />
      </a-form-item>
      <a-form-item :label="$t('邮件抄送人')">
        <a-input v-decorator="['info[emailCc]', { initialValue: data.emailCc ? data.emailCc : '' }]" />
      </a-form-item>
      <a-form-item :label="$t('邮件标题模板')">
        <a-input
          v-decorator="[
            'info[emailTitleTemplate]',
            { initialValue: data.emailTitleTemplate ? data.emailTitleTemplate : '' }
          ]"
        />
      </a-form-item>
      <a-form-item :label="$t('邮件内容模板')">
        <a-textarea
          v-decorator="[
            'info[emailContentTemplate]',
            { initialValue: data.emailContentTemplate ? data.emailContentTemplate : '' }
          ]"
          :auto-size="{ minRows: 5, maxRows: 8 }"
        />
      </a-form-item>
      <a-divider orientation="left">{{ $t('站内信默认设置') }}</a-divider>
      <a-form-item :label="$t('收件人')">
        <a-input v-decorator="['info[sysReceiver]', { initialValue: data.sysReceiver ? data.sysReceiver : '' }]" />
      </a-form-item>
      <a-form-item :label="$t('抄送人')">
        <a-input v-decorator="['info[sysCc]', { initialValue: data.sysCc ? data.sysCc : '' }]" />
      </a-form-item>
      <a-form-item :label="$t('站内信标题')">
        <a-input
          v-decorator="['info[sysTitleTemplate]', { initialValue: data.sysTitleTemplate ? data.sysTitleTemplate : '' }]"
        />
      </a-form-item>
      <a-form-item :label="$t('站内信内容')">
        <a-textarea
          v-decorator="[
            'info[sysContentTemplate]',
            { initialValue: data.sysContentTemplate ? data.sysContentTemplate : '' }
          ]"
          :auto-size="{ minRows: 5, maxRows: 8 }"
        />
      </a-form-item>
      <a-divider orientation="left">{{ $t('微信消息默认设置') }}</a-divider>
      <a-form-item :label="$t('收件人')">
        <a-input
          v-decorator="['info[wechatReceiver]', { initialValue: data.wechatReceiver ? data.wechatReceiver : '' }]"
        />
      </a-form-item>
      <a-form-item :label="$t('抄送人')">
        <a-input v-decorator="['info[wechatCc]', { initialValue: data.wechatCc ? data.wechatCc : '' }]" />
      </a-form-item>
      <a-form-item :label="$t('微信消息标题')">
        <a-input
          v-decorator="[
            'info[wechatTitleTemplate]',
            { initialValue: data.wechatTitleTemplate ? data.wechatTitleTemplate : '' }
          ]"
        />
      </a-form-item>
      <a-form-item :label="$t('微信消息内容')">
        <a-textarea
          v-decorator="[
            'info[wechatContentTemplate]',
            { initialValue: data.wechatContentTemplate ? data.wechatContentTemplate : '' }
          ]"
          :auto-size="{ minRows: 5, maxRows: 8 }"
        />
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  props: {
    notice: {
      type: Object,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      form: this.$form.createForm(this),
      data: this.notice
    }
  }
}
</script>
