<template>
  <div>
    <a-tag
      :color="color"
      style="width: 24px; height: 24px; position: relative; top: 9px; border: 1px solid gray"
      @click.stop="
        () => {
          showColor = !showColor
        }
      "
    ></a-tag>
    <div v-if="showColor" ref="colorSketchShow" style="position: absolute; left: -195px; top: 35px; z-index: 2">
      <sketch-picker v-model="curColor" :presetColors="colorArr" @input="(val) => $emit('changeColor', val.hex)" />
    </div>
  </div>
</template>

<script>
import { Sketch } from 'vue-color'
export default {
  components: {
    SketchPicker: Sketch
  },
  props: {
    color: {
      type: String,
      default: '#000000'
    },
    colorArr: {
      type: Array,
      default: () => {
        return ['#dcdfe6', '#2979ff', '#f90', '#19be6b']
      }
    }
  },
  data () {
    return {
      showColor: false,
      listenerClick: null,
      curColor: '#000000'
    }
  },
  watch: {
    color: {
      handler (val) {
        this.curColor = val
      },
      immediate: true
    }
  },
  mounted () {
    this.listenerClick = (e) => {
      if (this.$refs.colorSketchShow && !this.$refs.colorSketchShow.contains(e.target)) {
        this.showColor = false
      }
    }
    document.addEventListener('click', this.listenerClick)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.listenerClick)
  }
}
</script>
