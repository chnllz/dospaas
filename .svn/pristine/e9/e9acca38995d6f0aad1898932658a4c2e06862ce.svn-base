<template>
  <a-drawer :title="config.title" :width="1200" :destroyOnClose="true" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <div class="content">
        <div class="search">
          <span style="margin-right: 4px">搜索:</span>
          <div style="position: relative">
            <a-input v-model="defaultValue" style="width: 320px" placeholder="请输入关键字搜索" @change="onSearch">
              <a-icon slot="suffix" type="search" />
            </a-input>
            <div v-if="list.length > 0" class="sub-select-class">
              <div v-for="(item, index) in list" :key="index" class="sub-select-item" @click="onClick(item)">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <el-amap vid="amap" :plugin="plugin" :center="center" :events="events" class="amap-demo">
          <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker"></el-amap-marker>
        </el-amap>
      </div>
      <div class="bbar">
        <a-button v-if="config.action === 'set' && isInit" type="primary" @click="handleSubmit">保存</a-button>
        <a-button @click="visible = !visible">关闭</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
import { AMapManager } from 'vue-amap'
const amapManager = new AMapManager()
export default {
  data: function () {
    const _this = this
    return {
      loading: false,
      visible: false,
      config: {},
      autoComplete: null,
      list: [],
      center: [116.397228, 39.909604],
      amapManager,
      plugin: [{
        pName: 'ToolBar',
        events: {
          init (e) { }
        }
      }],
      events: {
        init () {
          // eslint-disable-next-line no-undef
          _this.autoComplete = new AMap.Autocomplete(this.searchOption || {})
        },
        click: () => {
          this.open = false
        }
      },
      searchOption: {
        city: '',
        citylimit: false
      },
      markers: [
        [116.397228, 39.909604]
      ],
      placeholder: '',
      defaultValue: '',
      open: false,
      isInit: false
    }
  },
  methods: {
    show (config) {
      console.log('config: ', config)
      this.config = config
      if (config.data) {
        const arr = config.data.split(',')
        const lng = arr[0]
        const lat = arr[1]
        this.center = [lng, lat]
        this.markers = [this.center]
        this.isInit = true
      }
      if (config.search) {
        this.defaultValue = config.search
        setTimeout(() => {
          const val = {
            target: { _value: this.defaultValue }
          }
          this.onSearch(val)
        }, 500)
      }
      this.visible = true
    },
    onSearch (val) {
      this.autoComplete.search(val.target._value, (status, result) => {
        if (status === 'complete') {
          this.list = result.tips
          this.defaultValue = val.target._value
          this.$nextTick(() => {
            this.open = true
          })
        }
      })
    },
    onClick (item) {
      if (!item.location) {
        this.$message.error('当前选择没有相关经纬度，请输入更精确的地址查询')
        return false
      }
      this.defaultValue = item.name
      this.isInit = true
      const { lng, lat } = item.location
      this.center = [lng, lat]
      this.markers = [[lng, lat]]
      this.open = false
    },
    handleSubmit () {
      this.visible = false
      this.$message.success('操作成功')
      if (this.center && this.center.length > 1) {
        const data = this.center[0] + ',' + this.center[1]
        this.$emit('ok', data)
      } else {
        this.$emit('ok', '')
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';
.content {
  width: 100%;
  height: 100%;
  position: relative;
}
.content .search {
  display: flex;
  align-items: center;
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 999;
}
.sub-select-class {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
  background: #fff;
  overflow-y: auto;
  max-height: 250px;
  margin-top: 4px;
  position: absolute;
  width: 100%;
  right: 0;
  padding-top: 2px;
}
.sub-select-item {
  padding: 5px 12px;
  font-size: 14px;
  margin-bottom: 2px;
}
.sub-select-item:hover {
  background-color: @primary-1;
  cursor: pointer;
}
</style>
