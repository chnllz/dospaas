<template>
  <div style="display: flex; flex-direction: column">
    <div>
      <a-alert v-show="false" :message="help" type="info" show-icon style="margin-bottom: 16px" />
      <a-button type="primary" icon="reload" style="margin: 0 0 10px 10px" @click="refresh">
        {{ $t('刷新排序') }}
      </a-button>
    </div>
    <draggable
      v-model="list"
      animation="200"
      handle=".handle"
      :style="{
        'flex-grow': 1,
        overflow: 'auto',
        display: 'flex',
        'flex-flow': 'column wrap',
        'align-content': 'flex-start'
      }"
      @start="drag = true"
      @end="drag = false"
    >
      <a-row
        v-for="(element, key) in list"
        :key="element[sortId]"
        class="list-item"
        style="margin-left: 10px; width: 300px"
      >
        <a-col :span="2" class="handle">
          <a-icon type="drag" />
        </a-col>
        <a-col :span="5" style="margin-right: 10px">
          <a-input size="small" :value="(key + 1) * 10" @blur="changesort($event, key)" />
        </a-col>
        <a-col :span="13" class="text">
          <a-tooltip placement="topLeft">
            <template slot="title">
              {{ element[sortName] }}
            </template>
            <span>{{ element[sortName] }}</span>
          </a-tooltip>
        </a-col>
      </a-row>
    </draggable>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
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
    sortName: {
      type: String,
      default: 'name'
    },
    sortId: {
      type: String,
      default: 'id'
    }
  },
  data () {
    return {
      list: [
        // 实例数据
        // {
        //   'id': 1279,
        //   'name': '元素1'
        // }, {
        //   'id': 1288,
        //   'name': '元素2'
        // }, {
        //   'id': 1278,
        //   'name': '元素3'
        // }, {
        //   'id': 1294,
        //   'name': '元素4'
        // }
      ]
    }
  },
  watch: {
    data (val) {
      this.list = this.data
    },
    list (val) {
      // 重置排序id
      this.getSortId()
      this.$emit('update:data', val)
    }
  },
  created () {
    this.list = this.data
    // 重置排序id
    this.getSortId()
  },
  methods: {
    // 重置排序id
    getSortId () {
      for (let i = 0; i < this.list.length; i++) {
        this.list[i]['sortId'] = (i + 1) * 10
      }
    },
    // 改变排序值
    changesort (e, key) {
      this.list[key].sortId = Number(e.target.value)
    },
    // 比较大小
    compare (key) {
      return function (a, b) {
        var value1 = a[key]
        var value2 = b[key]
        return value1 - value2
      }
    },
    // 刷新
    refresh () {
      // 排序方法
      this.list = this.list.sort(this.compare('sortId'))
      this.getSortId()
    }
  }
}
</script>
<style lang="less" scoped>
.list-item {
  padding: 8px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.list-item[draggable='true'] {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-item .handle {
  margin-right: 5px;
  padding: 0 25px 0 10px;
  cursor: move;
}
.list-item .text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
