<template>
  <a-drawer title="适配产品选择" :width="600" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="false">
      <div>
        <a-input-search style="margin-bottom: 8px" placeholder="请输入型号搜索" @search="onSearch" />
        <div class="product_box">
          已选择产品型号：
          <span v-for="(item, index) in selectProductCpxh" :key="index">
            {{ item }}
            <span v-if="index !== selectProductCpxh.length - 1">，</span>
          </span>
        </div>
        <a-tree
          :checkedKeys="selectProduct"
          :expanded-keys="expandedKeys"
          checkable
          :blockNode="true"
          :multiple="true"
          :checkStrictly="true"
          :tree-data="treeData"
          :defaultExpandAll="false"
          :auto-expand-parent="autoExpandParent"
          :slots="{ title: 'key' }"
          @check="onCheck"
          @expand="onExpand"
        >
          <template slot="title" slot-scope="{ title }">
            <span v-if="title && title.indexOf(searchValue) > -1">
              {{ title.substr(0, title.indexOf(searchValue)) }}
              <span style="color: #f50">{{ searchValue }}</span>
              {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
            </span>
            <span v-else-if="!title">--</span>
            <span v-else>{{ title }}</span>
          </template>
        </a-tree>
      </div>
      <div class="bbar">
        <a-button type="primary" @click="getProduct">保存</a-button>
        <a-button @click="visible = !visible">关闭</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  name: 'SelectProduct',
  props: {
    product: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      visible: false,
      treeData: [],
      treeExpand: false,
      selectProduct: [],
      expandedKeys: [],
      autoExpandParent: false,
      searchValue: ''
    }
  },
  computed: {
    selectProductCpxh () {
      return this.selectProduct.filter(item => {
        return item && item.includes('cpxh')
      }).map(item => {
        return item.slice(7, item.length)
      })
    }
  },
  watch: {
    product: {
      handler (val) {
        this.treeData = this.getTree(val)
      },
      immediate: true
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.selectProduct = config.adaptiveProduct
    },
    getTree (data) {
      const tree = data.map(item => {
        const obj = {
          title: item.key,
          key: item.value,
          scopedSlots: { title: 'title' }
        }
        if (item.children) {
          obj.children = this.getTree(item.children)
        }
        return obj
      })
      return tree
    },
    onSearch (value) {
      const expandedKeys = []
      this.getParentKey(this.treeData, value, expandedKeys)
      if (expandedKeys.length === 0) {
        this.$message.info('暂无搜索数据')
      }
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      })
    },
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    getParentKey (tree, value, expandedKeys = []) {
      tree.forEach(item => {
        if (item.children) {
          this.getParentKey(item.children, value, expandedKeys)
        } else if (value && item.title.indexOf(value) !== -1) {
          expandedKeys.push(item.key)
        }
      })
    },
    onCheck (checkedKeys, e) {
      const currentKey = e.node.eventKey
      let checked = this.selectProduct
      const childChecked = []
      this.treeData.forEach(item => {
        if (currentKey.includes('cppl') && item.key === currentKey) {
          item.children && item.children.forEach(im => {
            childChecked.push(im.key)
            im.children && im.children.forEach(ele => {
              childChecked.push(ele.key)
            })
          })
        } else if (currentKey.includes('cplb')) {
          item.children && item.children.forEach(im => {
            if (currentKey === im.key) {
              im.children && im.children.forEach(ele => {
                childChecked.push(ele.key)
              })
            }
          })
        }
      })
      if (e.checked) {
        checked = [...checked, ...childChecked]
        checked = [...new Set(checked)]
        checked.push(currentKey)
      } else {
        childChecked.push(currentKey)
        childChecked.forEach(key => {
          const index = checked.indexOf(key)
          if (index >= 0) {
            checked.splice(index, 1)
          }
        })
      }
      this.selectProduct = checked
    },
    getProduct () {
      this.$emit('ok', this.selectProduct)
      this.visible = false
    }
  }
}
</script>
<style scoped>
.product_box {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /*超出3行部分显示省略号，去掉该属性 显示全部*/
  -webkit-box-orient: vertical;
  margin: 8px 0;
}
</style>
