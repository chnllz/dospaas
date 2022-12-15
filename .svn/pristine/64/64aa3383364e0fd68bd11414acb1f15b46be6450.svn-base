<template>
  <a-spin :spinning="loading">
    <div style="min-height: calc(100vh - 130px)">
      <a-row>
        <grid-layout
          :layout.sync="layout"
          :col-num="colNum"
          :row-height="30"
          :is-draggable="false"
          :is-resizable="false"
          :vertical-compact="true"
          :use-css-transforms="true"
        >
          <grid-item
            v-for="item in layout"
            :key="item.i"
            :static="item.static"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            class="gridItem"
          >
            <a @click="clickRight(gridData[item.i].src)">
              <div
                style="display: flex; flex-direction: column; justify-content: space-between; width: 100%; height: 100%"
              >
                <div style="display: flex; justify-content: space-between">
                  <h3 class="fontColor">{{ gridData[item.i].productLine }}</h3>
                  <div
                    class="box"
                    :style="{
                      backgroundColor: hex2Rgb(gridData[item.i].iconColor)
                    }"
                  >
                    <font-awesome-icon
                      v-show="gridData[item.i].icon"
                      :icon="gridData[item.i].icon ? gridData[item.i].icon : 'fa-bell'"
                      :style="{
                        color: gridData[item.i].iconColor,
                        fontSize: '23px'
                      }"
                    ></font-awesome-icon>
                  </div>
                </div>
                <h1 class="productName fontColor">{{ gridData[item.i].productName }}</h1>
                <h3 class="fontColor">{{ gridData[item.i].productInstruction }}</h3>
              </div>
            </a>
          </grid-item>
        </grid-layout>
      </a-row>
    </div>
  </a-spin>
</template>
<script>
import VueGridLayout from 'vue-grid-layout'
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data () {
    return {
      layout: [],
      colNum: 12,
      gridIndex: 0,
      gridData: [],
      loading: false
    }
  },
  created () {
    this.loading = true
    this.loadData()
  },
  methods: {
    loadData () {
      this.axios({
        url: '/dashboard/view/mockInit'
      }).then(res => {
        this.loading = false
        this.layout = res.result.data.layout
        this.gridData = res.result.data.gridData
        this.gridData.forEach(item => {
          item.productInstruction = this.$t(item.productInstruction)
          item.productLine = this.$t(item.productLine)
          item.productName = this.$t(item.productName)
        })
      })
    },
    clickRight (src) {
      window.open(src, '_blank')
    },
    hex2Rgb (hex) {
      const str = hex.substring(1)
      let arr
      if (str.length === 3) arr = str.split('').map(d => parseInt(d.repeat(2), 16))
      else arr = [parseInt(str.slice(0, 2), 16), parseInt(str.slice(2, 4), 16), parseInt(str.slice(4, 6), 16), 0.2]
      return `rgba(${arr.join(', ')})`
    }
  }
}
</script>
<style lang="less" scoped>
.gridItem {
  touch-action: none;
  padding: 15px;
  border-radius: 8px;
  background: #fff;
}
.box {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.productName {
  font-size: 0.15rem;
  font-weight: 700;
  margin-bottom: 0;
}
.fontColor {
  color: rgba(0, 0, 0, 0.65);
}
/deep/ .ant-card-body {
  padding: 0;
}
</style>
