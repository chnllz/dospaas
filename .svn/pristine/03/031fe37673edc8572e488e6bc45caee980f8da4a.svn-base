<template>
  <div>
    <draggable v-model="list" animation="200" @start="drag = true" @end="drag = false">
      <div v-for="(value, key) in list" :key="key" class="list-item">
        <a-form-item :wrapper-col="{ span: 24 }">
          <a-row type="flex" align="middle">
            <a-col :span="1">
              <a-icon type="drag" class="handle" />
            </a-col>
            <a-col :span="12">
              <a-input :ref="'options' + key" v-model="list[key]" :placeholder="$t('选项') + (key + 1)" />
            </a-col>
            <a-col :span="1" class="margin">
              <a-icon
                :style="{ fontSize: '26px', color: '#52c41a' }"
                type="plus-square"
                theme="filled"
                @click="add(key)"
              />
            </a-col>
            <a-col :span="1" class="margin">
              <a-icon
                :style="{ fontSize: '26px', color: color }"
                type="minus-square"
                theme="filled"
                @click="del(key)"
              />
            </a-col>
            <a-col v-if="jumpTo" :span="7" style="float: left">
              <p style="float: left" class="margin">{{ $t('跳转至') }}</p>
              <a-col :span="15" class="margin">
                <a-select default-value="按问卷试题顺序往下" :dropdownMatchSelectWidth="false">
                  <a-select-option value="按问卷试题顺序往下">{{ $t('按问卷试题顺序往下') }}</a-select-option>
                </a-select>
              </a-col>
            </a-col>
          </a-row>
        </a-form-item>
      </div>
    </draggable>
  </div>
</template>
<script>
export default {
  components: {
    draggable: () => import('vuedraggable')
  },
  props: {
    help: {
      type: String,
      default: '上下拖动即可进行排序'
    },
    data: {
      type: Array,
      default: () => []
    },
    jumpTo: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      list: [
      ],
      color: '#bfbfbf'
    }
  },
  watch: {
    data (val) {
      this.list = this.data
    },
    list (val) {
      this.$emit('update:data', val)
    }
  },
  created () {
    this.list = this.data
  },
  mounted () {
    this.colorchange()
  },
  methods: {
    // 添加
    add (index) {
      this.$emit('funadd', index)
      this.color = '#ff4d4f'
    },
    // 删除
    del (index) {
      this.$emit('fundel', index)
      if (this.list.length === 1) {
        this.color = '#bfbfbf'
      }
    },
    // 颜色转变
    colorchange () {
      if (this.list.length === 1) {
        this.color = '#bfbfbf'
      } else {
        this.color = '#ff4d4f'
      }
    }
  }
}
</script>
<style scoped>
.list-item {
  padding: 8px;
  margin-bottom: -1px;
  background-color: #fff;
  cursor: move;
}
.list-item[draggable='true'] {
  opacity: 0.5;
  background: #c8ebfb;
}
.margin {
  margin-left: 5px;
}
.list-item .handle {
  margin: 0 16px 0 8px;
}
.list-item:first-child {
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}
.list-item:last-child {
  margin-bottom: 0;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
}
</style>
