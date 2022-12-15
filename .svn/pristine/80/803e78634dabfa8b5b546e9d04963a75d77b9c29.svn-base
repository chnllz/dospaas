<template>
  <a-drawer :title="config.title" height="100%" :visible="visible" placement="top" @close="visible = !visible">
    <a-spin :spinning="false">
      <a-row>
        <a-col :span="12">
          <drag-list :data.sync="barButton" />
        </a-col>
        <a-col :span="12">
          <drag-list :data.sync="lineButton" />
        </a-col>
      </a-row>
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
import DragList from '@/components/Drag/DragList'
export default {
  components: {
    DragList
  },
  props: {
    tableId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      config: {},
      visible: false,
      data: [],
      state: '',
      barButton: [],
      lineButton: []
    }
  },
  methods: {
    show (config) {
      this.config = config
      this.visible = true
      this.state = config.state
      this.barButton = this.config.barButton
      this.lineButton = this.config.lineButton
      this.barButton.forEach(item => { item.name = item.name ? item.name : item.way })
      this.barButton.sort(this.compare('listOrder'))
      this.lineButton.forEach(item => { item.name = item.name ? item.name : item.way })
      this.lineButton.sort(this.compare('listOrder'))
    },
    compare (listOrder) {
      return function (a, b) {
        const value1 = a[listOrder]
        const value2 = b[listOrder]
        return value1 - value2
      }
    },
    handleSubmit () {
      this.barButton.forEach((item, index) => {
        item.listOrder = index + 1
        if (item.way) {
          delete item.name
        }
        delete item.sortId
      })
      this.lineButton.forEach((item, index) => {
        item.listOrder = this.barButton.length + index + 1
        if (item.way) {
          delete item.name
        }
        delete item.sortId
      })
      const data = [...this.barButton, ...this.lineButton]
      this.$emit('ok', data, this.state)
      this.visible = false
    }
  }
}
</script>
