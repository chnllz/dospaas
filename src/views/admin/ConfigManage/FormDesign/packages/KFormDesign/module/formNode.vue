<!--
 * @Author: kcz
 * @Date: 2019-12-30 00:37:05
 * @LastEditTime: 2020-06-08 20:27:55
 * @LastEditors: kcz
 * @Description: 将数据通过k-form-item组件解析，生成控件
 * @FilePath: \k-form-design\packages\CFormDesign\module\formNode.vue
 -->
<template>
  <div
    class="drag-move-box"
    :class="{ active: record.key === selectItem.key }"
    @click.stop="$emit('handleSelectItem', record)"
  >
    <div class="form-item-box">
      <kFormItem :formConfig="config" :record="record" />
    </div>
    <div class="allSelectNode" :style="{ zIndex: record.key === selectItem.key ? 1000 : 989 }">
      <a-dropdown>
        <a-menu slot="overlay" @click="handleCopy">
          <a-menu-item key="0">{{ $t('复制整体') }}</a-menu-item>
        </a-menu>
        <div class="copy" :class="record.key === selectItem.key ? 'active' : 'unactivated'">
          <a-icon type="copy" />
        </div>
      </a-dropdown>
      <a-dropdown>
        <a-menu slot="overlay" @click="handlePaste">
          <a-menu-item key="0">{{ $t('粘贴到上方') }}</a-menu-item>
          <a-menu-item key="2">{{ $t('粘贴到下方') }}</a-menu-item>
        </a-menu>
        <div class="paste" :class="record.key === selectItem.key ? 'active' : 'unactivated'">
          <a-icon type="snippets" />
        </div>
      </a-dropdown>
      <div
        class="delete"
        :class="record.key === selectItem.key ? 'active' : 'unactivated'"
        @click.stop="$emit('handleDelete')"
      >
        <a-icon type="delete" />
      </div>
    </div>
  </div>
</template>
<script>
/*
 * author kcz
 * date 2019-11-20
 * description 通过json生成的单个表单节点
 */

export default {
  i18n: window.lang('admin'),
  components: {
    kFormItem: () => import('../../KFormItem/indexBuild')
  },
  props: {
    record: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  inject: ['getSelectItem'],
  computed: {
    selectItem () {
      return this.getSelectItem()
    }
  },
  methods: {
    handleCopy (e) {
      this.$emit('handleCopy', Number(e.key))
    },
    handlePaste (e) {
      this.$emit('handlePaste', Number(e.key))
    }
  }
}
</script>
