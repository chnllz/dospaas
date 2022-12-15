<template>
  <div>
    <a-button @click="visible = true">open drawer</a-button>
    <a-drawer key="first" :visible="visible" width="100%" :destroyOnClose="true" @close="visible = false">
      <a-button @click="show = true">open drawer2</a-button>
      <a-drawer key="second" :visible="show" :destroyOnClose="true" width="1200" @close="show = false"></a-drawer>
    </a-drawer>
  </div>
</template>
<script>
export default {
  props: {
    myName: {
      type: String,
      default: 'lily'
    }
  },
  data () {
    return {
      obj1: {
        var1: 111,
        var2: {
          aaa: 1111,
          bbb: 2222
        }
      },
      visible: false,
      show: false,
      obj2: {
        var1: 222,
        var2: {
          bbb: 3333,
          ccc: 4444
        }
      },
      obj3: {
        var1: 333,
        var3: 444
      },
      deepmergeOutput: {},
      assignOutput: {}
    }
  },
  created () {
    Object.assign(this.assignOutput, this.obj1, this.obj2, this.obj3)
    this.deepmergeOutput = this.$deepmerge.all([this.obj1, this.obj2, this.obj3])
  },
  methods: {

  }
}
</script>
