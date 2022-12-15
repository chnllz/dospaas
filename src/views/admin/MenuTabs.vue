<template>
  <div class="menu-tabs" :class="{ 'menu-tabs-top': tabPosition === 'top', 'menu-tabs-left': tabPosition === 'left' }">
    <a-tabs
      v-model="activeKey"
      :class="{ 'tabs-flex': tabPosition === 'top', 'tabs-flex-row': tabPosition === 'left' }"
      class="tabs-union"
      :tab-position="tabPosition"
      @change="
        () => {
          if (!activeKeyList.includes(activeKey)) {
            activeKeyList.push(activeKey)
          }
        }
      "
    >
      <a-tab-pane v-for="(tabItem, tabIndex) in tabsData" :key="tabIndex" :tab="$t(tabItem.meta.title)"></a-tab-pane>
    </a-tabs>
    <div class="tab-content-component">
      <div v-for="(tabItem, tabIndex) in tabsData" v-show="tabIndex === activeKey" :key="tabIndex" style="height: 100%">
        <component
          :is="tabItem.coms"
          v-if="activeKeyList.includes(tabIndex)"
          :query="tabItem.query"
          :tabKey="tabIndex"
          :redirectUrlProps="tabItem.viewConfig.query.url"
          :recursionComposeProps="recursionCompose"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 判断是否为子级组合视图的入口
    recursionComposeProps: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      tabsData: [],
      tabPosition: 'left',
      activeKey: 0,
      activeKeyList: [0],
      recursionCompose: {}
    }
  },
  created () {
    if (this.recursionComposeProps && this.recursionComposeProps.view && this.recursionComposeProps.view.length > 0) {
      this.tabsData = this.recursionComposeProps.view
      this.tabPosition = this.recursionComposeProps.position
    } else {
      this.tabsData = this.$route.meta.view
      this.tabPosition = this.$route.meta.viewConfig.position
    }
    if (this.$route.query && this.$route.query.openPath) {
      const menuData = JSON.parse(sessionStorage.getItem('menuData'))
      const pathArr = this.$route.query.openPath.split('/')
      const path = pathArr[pathArr.length - 1]
      this.tabsData = menuData.find(item => item.name === path).view
    }
    this.tabsData.forEach(item => {
      if (item.viewConfig.params && item.viewConfig.params.includes('?')) {
        item.query = {}
        const data = item.viewConfig.params.split('?')
        const vars = data[1].split('&').filter(item => item)
        if (vars.length) {
          for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split('=')
            if (pair[0] === 'url') {
              pair[1] = decodeURIComponent(pair[1])
            }
            item.query[pair[0]] = pair[1]
          }
        }
        item.coms = () => import('@' + '/views/' + data[0])
      } else if (item.viewConfig.type === 'componentView') { // 组合视图嵌套
        this.recursionCompose = {
          view: item.view,
          position: item.viewConfig.position
        }
        item.coms = () => import('@' + '/views/' + item.dynamicComponent)
      } else {
        item.coms = () => import('@' + '/views/' + item.viewConfig.params)
      }
    })
  }
}
</script>

<style lang="less" scoped>
.menu-tabs {
  padding: 8px;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
}

.menu-tabs-top {
  display: flex;
  flex-direction: column;
}

.menu-tabs-left {
  display: flex;
  flex-direction: row;
}

.menu-tabs /deep/ .tabs-flex {
  height: auto !important;
}

.tabs-union /deep/ .ant-tabs-top-content {
  height: 0 !important;
}

.tabs-union /deep/ .ant-tabs-left-content {
  flex: 0 !important;
}

.tab-content-component {
  flex: 1;
  overflow: auto;
}
</style>
