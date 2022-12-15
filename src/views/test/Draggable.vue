<template>
  <div>
    <drag-list
      :data.sync="data"
      help="上下拖动即可进行排序，官方演示地址：https://sortablejs.github.io/Vue.Draggable/#/simple"
      style="margin-bottom: 16px"
    />
    <pre>{{ data }}</pre>
  </div>
</template>
<script>
export default {
  components: {
    DragList: () => import('@/components/Drag/DragList')
  },
  data () {
    return {
      data: [{
        name: '广东',
        order: 1
      }, {
        name: '湖北',
        order: 2
      }, {
        name: '江西',
        order: 3
      }, {
        name: '湖南',
        order: 4
      }, {
        name: '河北',
        order: 5
      }, {
        name: '陕西',
        order: 6
      }, {
        name: '江苏',
        order: 7
      }, {
        name: '浙江',
        order: 8
      }]
    }
  }
}
</script>
