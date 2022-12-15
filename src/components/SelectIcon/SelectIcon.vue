<template>
  <a-drawer :visible="visible" :width="1400" :title="config.title" @close="visible = !visible">
    <div style="padding: 0; height: 100%; overflow: auto; display: flex; flex-direction: column">
      <a-row style="margin: 0; padding: 8px 4px" :gutter="[16, 6]">
        <a-col v-for="item of fontAwesomeDataType" :key="item" :span="2">
          <a-checkable-tag
            :checked="fontAwesomeSelected == item"
            style="text-align: center; border-radius: 2px; cursor: pointer; width: 100%"
            :style="fontAwesomeSelected == item ? '' : 'border: 1px dashed #d9d9d9'"
            @change="onSelect(item)"
          >
            {{ item }}
          </a-checkable-tag>
        </a-col>
      </a-row>
      <a-input-search style="padding: 1px" :placeholder="$t('请输入图标名称搜索')" @change="onSearch" />
      <div
        style="
          flex-grow: 1;
          overflow-y: auto;
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          padding: 8px;
          align-content: flex-start;
        "
      >
        <div v-for="(item, index) in fontAwesomeRealData" :key="index" class="myIcon" @click="handleClick(item)">
          <div><font-awesome-icon :icon="item" class="font-awesome-icon" /></div>
          <div>{{ item }}</div>
        </div>
      </div>
    </div>
    <div class="bbar">
      <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
    </div>
  </a-drawer>
</template>
<script>
import fontAwesome from './fontAwesome'
export default {
  i18n: window.lang('admin'),
  data () {
    return {
      visible: false,
      fontAwesomeDataType: ['全部'],
      fontAwesomeInitData: [],
      fontAwesomeRealData: [],
      fontAwesomeSelected: '全部',
      config: {
        title: this.$t('选择图标')
      }
    }
  },
  mounted () {
    for (const item of fontAwesome) {
      this.fontAwesomeInitData.push(...item.items)
      this.fontAwesomeDataType.push(item.type)
    }
    this.fontAwesomeRealData = [...new Set(this.fontAwesomeInitData)]
  },
  methods: {
    show () {
      this.visible = true
    },
    // 分类搜索
    onSelect (value) {
      this.fontAwesomeSelected = value
      this.fontAwesomeRealData = this.search()
    },
    // 内容搜索
    onSearch (e) {
      const value = e.target.value
      this.fontAwesomeRealData = this.search(value)
    },
    // 选择图标
    handleClick (value) {
      this.visible = false
      this.$emit('ok', value)
    },
    // 执行搜索
    search (value) {
      let arr = this.fontAwesomeInitData
      if (this.fontAwesomeSelected !== '全部') {
        arr = fontAwesome.find(item => {
          return this.fontAwesomeSelected === item.type
        })
        arr = [...new Set(arr.items)]
      }
      if (value) {
        arr = arr.filter(item => {
          return item.indexOf(value) !== -1
        })
      }
      return [...new Set(arr)]
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .ant-drawer-body {
  display: flex;
  flex-direction: column;
}
.myIcon {
  display: inline-block;
  width: 68px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  :first-child {
    font-size: 30px;
    line-height: 50px;
  }
  :last-child {
    line-height: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    padding: 0 4px;
  }
  &:hover {
    background: rgb(24, 144, 255);
    color: #fff;
    :first-child {
      font-size: 40px;
    }
  }
}
</style>
