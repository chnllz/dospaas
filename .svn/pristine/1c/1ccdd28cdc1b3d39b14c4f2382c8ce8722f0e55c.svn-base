<template>
  <a-drawer :title="config.title" :width="400" :visible="visible" :destroyOnClose="true" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-tree
        v-model="checkedKeys"
        checkable
        show-line
        :replaceFields="replaceFields"
        :tree-data="treeData"
        :selectable="false"
        :defaultExpandAll="true"
        @check="onCheck"
      />
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('sms'),
  data () {
    return {
      visible: false,
      config: {},
      loading: false,
      replaceFields: {
        key: 'key'
      },
      checkedKeys: [],
      expandedKeys: [],
      treeData: [],
      checkPhone: []
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.checkedKeys = []
      this.axios({
        url: '/base/directories/getTreeUsers'
      }).then(res => {
        this.treeData = res.result.data
        const getPhone = (array) => {
          array.forEach(item => {
            if (item.children && item.children.length > 0) {
              getPhone(item.children)
            } else {
              if (config.number.includes(item.phone)) {
                this.checkedKeys.push(item.key)
              }
            }
          })
        }
        getPhone(this.treeData)
      })
    },
    onCheck (checkedKeys, e) {
      this.checkedKeys = checkedKeys
    },
    handleSubmit () {
      const allPhone = []
      const getPhone = (array) => {
        array.forEach(item => {
          if (item.children && item.children.length > 0) {
            getPhone(item.children)
          } else {
            if (this.checkedKeys.includes(item.key)) {
              allPhone.push(item.phone)
            }
          }
        })
      }
      getPhone(this.treeData)
      let string = ''
      let phone = []
      phone = allPhone.filter((item) => {
        return /^[1][3,4,5,7,8][0-9]{9}$/.test(item)
      })
      phone = Array.from(new Set(phone))
      string = phone.toString()
      this.$emit('ok', string)
      this.visible = false
    }
  }
}
</script>
