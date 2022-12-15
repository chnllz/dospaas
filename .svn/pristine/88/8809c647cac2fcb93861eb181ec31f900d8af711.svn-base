<template>
  <div>
    <a-card title="代码设计:" size="small">
      <a-textarea v-model="code" rows="8"></a-textarea>
    </a-card>
    <a-card title="运行结果:" size="small" style="margin-top: 10px">
      <component :is="myComponent" v-if="myComponent"></component>
    </a-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      code: '在这里输入vue模板，下面可以实时展示运行结果'
    }
  },
  computed: {
    myComponent () {
      return {
        template: `<div>${this.code}</div>`,
        data: () => {
          return {
            parent: this
          }
        }
      }
    }
  }
}
</script>
