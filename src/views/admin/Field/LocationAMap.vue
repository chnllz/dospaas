<template>
  <a-spin :spinning="loading">
    <div class="content">
      <el-amap vid="amap" :plugin="plugin" :center="center" :zoom="zoom" :events="events" class="amap-demo">
        <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker"></el-amap-marker>
      </el-amap>
    </div>
  </a-spin>
</template>
<script>
import { AMapManager } from 'vue-amap'
const amapManager = new AMapManager()
export default {
  props: {
    mark: {
      type: Array,
      default: () => []
    }
  },
  data: function () {
    const _this = this
    return {
      loading: false,
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
      zoom: 17,
      placeholder: '',
      defaultValue: '',
      open: false,
      isInit: false
    }
  },
  watch: {
    mark: {
      handler (newVal) {
        if (newVal && newVal.length > 0) {
          this.center = newVal
          this.markers = [this.center]
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';
.content {
  width: 100%;
  height: 280px;
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
