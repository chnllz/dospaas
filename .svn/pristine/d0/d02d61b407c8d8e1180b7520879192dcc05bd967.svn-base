<template>
  <a-popover
    v-model="selectshow"
    trigger="click"
    placement="bottomLeft"
    :style="{ pointerEvents: disabled ? 'none' : 'auto' }"
    @click.stop="changeStatus"
  >
    <a-form-item v-if="isHaveForm">
      <a-select
        v-decorator="[name, { initialValue: contents || undefined, rules: [{ required: required, message: message }] }]"
        :size="size"
        read-only
        :disabled="disabled"
        :class="singleRow ? 'singleRow' : ''"
        :allowClear="allowClear"
        :mode="multiple ? 'multiple' : 'default'"
        :placeholder="placeholder"
        :open="false"
        style="cursor: pointer"
        :dropdownMatchSelectWidth="true"
        @change="onChange"
      >
        <a-select-option v-for="node in nodeList" :key="node.value">{{ node.label }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-select
      v-else
      :size="size"
      read-only
      :disabled="disabled"
      :class="singleRow ? 'singleRow' : ''"
      :allowClear="allowClear"
      :mode="multiple ? 'multiple' : 'default'"
      :placeholder="placeholder"
      :open="false"
      style="cursor: pointer"
      :dropdownMatchSelectWidth="true"
      :value="contents"
      @change="onChange"
    >
      <a-select-option v-for="node in nodeList" :key="node.value">{{ node.label }}</a-select-option>
    </a-select>
    <div slot="content">
      <a-row type="flex" style="width: 520px">
        <a-col :span="12">
          <a-card size="small">
            <a-select
              slot="title"
              showSearch
              :autoFocus="true"
              :value="undefined"
              mode="multiple"
              style="width: 100%"
              placeholder="请输入关键字进行搜索"
              :filter-option="false"
              :showArrow="false"
              :not-found-content="fetching ? undefined : null"
              :dropdownMatchSelectWidth="false"
              @search="searchTabs"
              @popupScroll="popupScroll"
              @change="
                (e) => {
                  if (!e) {
                    searchdata = []
                  }
                }
              "
            >
              <a-spin v-if="fetching" slot="notFoundContent" size="small" />
              <a-select-option v-for="search in searchdata" :key="search.key" @click="setValue(search)">
                {{ search.label }}
              </a-select-option>
            </a-select>
            <a-spin :spinning="loading">
              <div style="overflow-y: auto; height: 350px">
                <template v-if="displayType === 'list'">
                  <a-list
                    :split="false"
                    item-layout="horizontal"
                    :data-source="tableData"
                    style="margin-bottom: 8px; height: 318px; overflow-y: auto"
                    size="small"
                    :pagination="false"
                  >
                    <a-list-item slot="renderItem" slot-scope="item" style="padding: 2px 8px">
                      <a-list-item-meta>
                        <template slot="title">
                          <a-checkbox
                            :checked="
                              (contents && typeof contents === 'string' && contents === item.key) ||
                              (typeof contents === 'object' && contents.includes(item.key))
                            "
                            style="display: flex; align-items: center"
                            @click="setValue(item)"
                          >
                            <span
                              style="
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                max-width: 160px;
                                display: inline-block;
                              "
                            >
                              {{ item.label }}
                            </span>
                          </a-checkbox>
                        </template>
                      </a-list-item-meta>
                    </a-list-item>
                  </a-list>
                  <a-row>
                    <a-col style="text-align: right">
                      <a-pagination
                        size="small"
                        :simple="true"
                        :total="totalCount"
                        :pageSize="page.pageSize"
                        :current="page.pageNo"
                        @change="
                          (pageObj) => {
                            page.pageNo = pageObj
                            loadDataTable()
                          }
                        "
                      />
                    </a-col>
                  </a-row>
                </template>
                <!-- displayType === tree -->
                <template v-else>
                  <a-tree
                    :checkedKeys="checkedKeys"
                    :load-data="onLoadData"
                    :tree-data="treeData"
                    :selectedKeys="selectedKeys"
                    :multiple="multiple"
                    :replaceFields="{
                      children: 'children',
                      key: 'key'
                    }"
                    :checkable="checkable"
                    :selectable="!checkable"
                    :expandedKeys="expandedKeys"
                    :blockNode="true"
                    @select="getSelect"
                    @check="getCheck"
                    @expand="
                      (keys) => {
                        expandedKeys = keys
                      }
                    "
                  >
                    <div slot="treeTitle" slot-scope="treeObj" @click="treeSelectEvent(treeObj)">
                      {{ treeObj.label }}
                    </div>
                  </a-tree>
                </template>
              </div>
            </a-spin>
          </a-card>
        </a-col>
        <a-col :span="12" style="padding-left: 8px">
          <a-card size="small">
            <div slot="title" style="line-height: 25px">
              已选
              <span>{{ multiple && contents ? contents.length : contents ? [contents].length : 0 }}</span>
            </div>
            <a
              slot="extra"
              href="#"
              :disabled="!contents || (contents && !contents.length)"
              @click="onChange(multiple ? [] : undefined, 'clear')"
            >
              清空
            </a>
            <a-list
              :split="false"
              style="overflow-y: auto; height: 350px"
              size="small"
              item-layout="horizontal"
              :data-source="contents ? (contents instanceof Array ? contents : [contents]) : []"
            >
              <a-list-item slot="renderItem" slot-scope="record" class="listStyle" style="padding: 4px 0px">
                <a-list-item-meta>
                  <a-row slot="title" type="flex">
                    <a-col :span="22" style="padding: 0 8px">
                      {{
                        nodeList.find((item) => record === item.value)
                          ? nodeList.find((item) => record === item.value).label
                          : ''
                      }}
                    </a-col>
                    <a-col flex="16px">
                      <a-icon type="close" @click="tagClose(record)" />
                    </a-col>
                  </a-row>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </a-popover>
</template>
<script>
import debounce from 'lodash/debounce'
export default {
  props: {
    allowClear: {
      type: Boolean,
      default: false
    },
    displayType: {
      type: String,
      default: () => 'list'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: '请选择'
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: () => 'contents'
    },
    optionsConversion: {
      type: Function,
      default: null
    },
    // 请求接口格外参数
    parameter: {
      type: Object,
      default: () => {
        return {}
      }
    },
    parentId: {
      type: String,
      default: 'parentId'
    },
    placeholder: {
      type: String,
      default: () => ''
    },
    required: {
      type: Boolean,
      default: false
    },
    scope: {
      type: Object,
      default: () => { }
    },
    searchUrl: {
      type: String,
      require: true,
      default: ''
    },
    // 是否选择至叶子节点
    selectModel: {
      type: Boolean,
      default: false
    },
    // 是否只显示一行
    singleRow: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: null
    },
    url: {
      type: String,
      require: true,
      default: ''
    },
    value: {
      type: Array,
      default: () => []
    },
    // 筛选器所对应的字段信息
    field: {
      type: Object,
      default: () => { }
    },
    // 可选范围
    optionalRange: {
      type: Array || null,
      default: () => []
    },
    // 不可选范围
    notOptionalRange: {
      type: Array || null,
      default: () => []
    },
    checkable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    this.searchTabs = debounce(this.searchTabs, 800)
    return {
      selectshow: false,
      loading: false,
      searchValue: '',
      searchdata: [],
      contents: undefined,
      lastFetchId: 0,
      fetching: false,
      selectedKeys: [],
      checkedKeys: [],
      scrollStats: true,
      page: {
        pageNo: 1,
        pageSize: 20,
        sortField: 'listOrder',
        sortOrder: 'ascend'
      },
      treeData: [],
      nodeList: [],
      tableData: [],
      expandedKeys: [],
      totalCount: 0,
      isHaveForm: true
    }
  },
  watch: {
    name (newVal) {
      this.contents = undefined
      this.nodeList = []
      this.treeData = []
      this.tableData = []
    },
    value: {
      handler (newVal) {
        if (newVal && newVal.length) {
          this.nodeList = newVal.map(item => {
            const obj = {}
            obj.value = item.key || item.value
            obj.label = item.label || item.name
            return obj
          })
          if (this.multiple) {
            this.contents = this.nodeList.map(item => item.value)
            this.selectedKeys = this.contents
          } else {
            this.contents = this.nodeList[0].value
            this.selectedKeys = [this.contents]
          }
        } else {
          this.contents = undefined
        }
      },
      immediate: true
    },
    optionalRange: {
      handler () {
        this.getTreeData(this.treeData)
      },
      immediate: true
    },
    notOptionalRange: {
      handler () {
        this.getTreeData(this.treeData)
      },
      immediate: true
    }
  },
  mounted () {
    this.selectedKeys = []
    this.isHaveForm = !!(this.scope && this.scope.form)
  },
  methods: {
    onLoadData (treeNode) {
      const parentId = treeNode.dataRef.key
      const rank = treeNode.dataRef.fullNumber ? treeNode.dataRef.fullNumber.split('/').length : 0
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          treeNode.dataRef.children = this.optionsConversion ? this.optionsConversion(treeNode.dataRef.children) : treeNode.dataRef.children
          resolve()
        } else if (!treeNode.dataRef.childCount) {
          resolve()
        } else {
          this.axios({
            url: this.url,
            data: Object.assign({
              pageNo: 1,
              pageSize: 1000,
              [this.parentId]: parentId,
              sortField: 'listOrder',
              sortOrder: 'ascend'
            }, this.parameter)
          }).then(res => {
            let showSeries = false // 默认不限制级数（DataPicker中的tree组件在组织结构中引用到，组织结构不做级数限制）
            if (this.field && this.field.setting) {
              showSeries = Number(this.field.setting.form.showSeries)
            }
            let data = res.result.data ?? res.result
            // --- 树组件/复选框值回显做特殊处理 ---
            if (this.contents) {
              data.forEach(treeItem => {
                if (this.contents.includes(treeItem.number) && !this.checkedKeys.includes(treeItem.number)) {
                  this.checkedKeys.push(treeItem.number)
                }
              })
            }
            // --- 树组件/复选框值回显做特殊处理 ---
            data = this.optionsConversion ? this.optionsConversion(data) : data
            data.forEach(item => {
              item.title = item.label
              item.scopedSlots = { title: 'treeTitle' }
              if (typeof showSeries === 'boolean' && !showSeries) {
                item.isLeaf = !item.childCount
              } else {
                item.isLeaf = !!((rank + 1) >= showSeries) || !item.childCount
              }
              item.disabled = this.getOption(item)
              if (!item.isLeaf && this.selectModel) {
                item.selectable = false
              }
            })
            treeNode.dataRef.children = data
            this.treeData = [...this.treeData]
            resolve()
          })
        }
      })
    },
    loadDataTable () {
      this.axios({
        url: this.url,
        data: Object.assign(this.page, this.parameter)
      }).then(res => {
        if (res.result instanceof Array) {
          this.tableData = this.optionsConversion ? this.optionsConversion(res.result) : res.result
        } else {
          this.tableData = this.optionsConversion ? this.optionsConversion(res.result.data) : res.result.data
        }
        this.totalCount = res.result.totalCount || res.result.data.length
      })
    },
    changeStatus () {
      if (this.contents) {
        this.selectedKeys = this.multiple ? this.contents : [this.contents]
      }
      if (this.displayType === 'tree' && !this.treeData.length) {
        this.loading = true
        this.axios({
          url: this.url,
          data: Object.assign({ pageNo: 1, pageSize: 1000, sortField: 'listOrder', sortOrder: 'ascend' }, this.parameter)
        }).then(res => {
          this.loading = false
          const data = res.result.data ?? res.result
          // --- 树组件/复选框值回显做特殊处理 ---
          if (this.contents) {
            data.forEach(treeItem => {
              if (this.contents.includes(treeItem.number) && !this.checkedKeys.includes(treeItem.number)) {
                this.checkedKeys.push(treeItem.number)
              }
            })
          }
          // --- 树组件/复选框值回显做特殊处理 ---
          this.getTreeData(data)
        })
      } else if (this.displayType === 'list' && !this.tableData.length) {
        this.loadDataTable()
      }
      if (this.disabled) {
        this.selectshow = false
      } else {
        this.selectshow = !this.selectshow
      }
    },
    getTreeData (data) {
      let showSeries = false // 默认不限制级数（DataPicker中的tree组件在组织结构中引用到，组织结构不做级数限制）
      if (this.field && this.field.setting) {
        showSeries = Number(this.field.setting.form.showSeries)
      }
      const getData = (array, rank) => {
        array = this.optionsConversion ? this.optionsConversion(array) : array
        let loopRank
        array.forEach(item => {
          loopRank = rank
          item.title = item.label
          item.scopedSlots = { title: 'treeTitle' }
          if (typeof showSeries === 'boolean' && !showSeries) {
            item.isLeaf = !item.childCount
          } else {
            item.isLeaf = !!(loopRank >= showSeries) || !item.childCount
          }
          item.disabled = this.getOption(item)
          if (!item.isLeaf && this.selectModel) {
            item.selectable = false
          }
          if (item.children) {
            getData(item.children, loopRank++)
          }
        })
      }
      getData(data, 1)
      this.treeData = data
    },
    // 使用可选范围和不可选范围 筛选范围
    getOption (item) {
      const value = item.number || item.value || item.dictDataNumber || item.departmentId || item.roleId
      if (this.optionalRange && this.optionalRange.length > 0) {
        const optionalRange = this.optionalRange.map(im => im.value)
        return !optionalRange.includes(value)
      } else if (this.notOptionalRange && this.notOptionalRange.length > 0) {
        const notOptionalRange = this.notOptionalRange.map(im => im.value)
        return notOptionalRange.includes(value)
      }
      return item.disabled
    },
    getSelect (selectedKeys, e) {
      this.contents = this.multiple ? selectedKeys : selectedKeys[0]
      this.selectedKeys = selectedKeys
      if (this.multiple) {
        if (this.nodeList.every(item => item.value !== e.node.dataRef.key)) {
          this.nodeList.splice(0, 0, {
            value: e.node.dataRef.key,
            label: e.node.dataRef.label
          })
        }
      } else if (selectedKeys[0]) {
        this.nodeList = [{
          value: e.node.dataRef.key,
          label: e.node.dataRef.label
        }]
      }
      if (this.scope && this.scope.form) {
        const obj = {}
        obj[this.name] = this.contents
        this.scope.form.setFieldsValue(obj)
      }
      this.$emit('select', this.contents, this.nodeList)
    },
    // 继承状态下触发
    getCheck (checkedKeys, e) {
      this.checkedKeys = checkedKeys
      const filterCheckedKeys = []
      const filterCheckNodeList = []
      const halfCheckedKeys = e.halfCheckedKeys // 半选状态的父级节点
      e.checkedNodes.forEach(checkNodeItem => {
        // 获取当前节点的所有父节点key值
        const fullNumberList = checkNodeItem.data.props.fullNumber.split('/')
        const parentNumberList = fullNumberList.length === 1 ? [] : JSON.parse(JSON.stringify(fullNumberList)).splice(0, fullNumberList.length - 1)
        // 无父节点
        if (parentNumberList.length === 0 && !filterCheckedKeys.includes(fullNumberList[0])) {
          filterCheckedKeys.push(fullNumberList[0])
        }
        // 当父节点下所有子节点都选中时，只显示父节点；否则显示当前子节点
        for (let i = 0; i < parentNumberList.length; i++) {
          if (filterCheckedKeys.includes(parentNumberList[i])) {
            break
          } else if (!halfCheckedKeys.includes(parentNumberList[i])) { // 当前父节点不在{halfCheckedKeys}中，该父节点下的所有子节点已被选中
            filterCheckedKeys.push(parentNumberList[i])
            break
          } else if ((i === parentNumberList.length - 1) && !filterCheckedKeys.includes(checkNodeItem.data.key)) { // 选中当前子节点
            filterCheckedKeys.push(checkNodeItem.data.key)
          }
        }
      })
      // 对过滤出的节点设置对应的属性
      e.checkedNodes.forEach(checkNodeItem => {
        if (filterCheckedKeys.includes(checkNodeItem.data.key)) {
          filterCheckNodeList.push({
            value: checkNodeItem.data.props.number,
            label: checkNodeItem.data.props.label
          })
        }
      })
      this.contents = filterCheckedKeys
      this.nodeList = filterCheckNodeList
      if (this.scope && this.scope.form) {
        const obj = {}
        obj[this.name] = this.contents
        this.scope.form.setFieldsValue(obj)
      }
      this.$emit('select', this.contents, this.nodeList)
    },
    searchTabs (val) {
      this.searchValue = val
      this.page.pageNo = 1
      this.scrollStats = true
      if (val) {
        this.lastFetchId += 1
        const fetchId = this.lastFetchId
        this.fetching = true
        this.axios({
          url: this.searchUrl,
          data: Object.assign({ searchName: val }, this.page, this.parameter)
        }).then(res => {
          if (fetchId !== this.lastFetchId || res.code !== 0) {
            return
          }
          if (res.result.data.length < this.page.pageSize) {
            this.scrollStats = false
          }
          this.searchdata = this.optionsConversion ? this.optionsConversion(res.result.data, '', 'search') : res.result.data
          if (this.selectModel) {
            const filterSuperNodeName = function (list) {
              let concat = []
              list.forEach(item => {
                if (item.children) {
                  concat = concat.concat([item.dictDataName, ...filterSuperNodeName(item.children)])
                }
              })
              return concat
            }
            const superNodeNameList = filterSuperNodeName(this.treeData)
            this.searchdata = this.searchdata.filter(item => !superNodeNameList.includes(item.dictDataName))
          }
          this.searchdata = this.searchdata.filter(item => {
            return !this.getOption(item)
          })
          this.fetching = false
        })
      } else {
        this.searchdata = []
      }
    },
    getTabsScroll () {
      this.axios({
        url: this.searchUrl,
        data: Object.assign({ searchName: this.searchValue }, this.page, this.parameter)
      }).then(res => {
        if (res.code === 0) {
          if (res.result.data.length < this.page.pageSize) {
            this.scrollStats = false
          }
          this.searchdata = [...this.searchdata, ...this.optionsConversion ? this.optionsConversion(res.result.data, '', 'search') : res.result.data]
          this.searchdata = this.searchdata.filter(item => {
            return !this.getOption(item)
          })
        }
      })
    },
    popupScroll (e) {
      const scrollTop = e.target.scrollTop
      const scrollHeight = e.target.scrollHeight
      const clientHeight = e.target.clientHeight
      const scrollBottom = scrollHeight - clientHeight - scrollTop
      if (scrollBottom < 1 && this.scrollStats && this.searchValue) {
        this.page.pageNo++
        this.getTabsScroll()
      }
    },
    treeSelectEvent (treeObj) {
      if (this.selectModel && treeObj.children && treeObj.children.length) {
        if (this.expandedKeys.includes(treeObj.key)) {
          this.expandedKeys = this.expandedKeys.filter(item => item !== treeObj.key)
        } else {
          this.expandedKeys.splice(0, 0, treeObj.key)
        }
      } else if (this.selectModel && treeObj.childCount) {
        treeObj.children = [{}]
        this.expandedKeys.splice(0, 0, treeObj.key)
      }
    },
    // 参数重置
    reset () {
      this.contents = undefined
      this.scope.form.setFieldsValue({
        [this.name]: undefined
      })
      this.selectedKeys = []
      this.selectshow = false
      this.$forceUpdate()
    },
    setValue (search) {
      if (this.multiple) {
        if (!this.contents) {
          this.contents = []
        }
        if (this.contents && this.contents.every(item => item !== search.key)) {
          this.contents.splice(this.contents.length, 0, search.key)
        } else if (this.contents && this.contents.some(item => item === search.key)) {
          this.contents = this.contents.filter(item => item !== search.key)
        }
        if (this.nodeList.every(item => item.value !== search.key)) {
          this.nodeList.splice(0, 0, {
            value: search.key,
            label: search.label
          })
        }
      } else {
        this.contents = search.key
        this.nodeList = [{
          value: search.key,
          label: search.label
        }]
      }
      if (this.scope && this.scope.form) {
        const obj = {}
        obj[this.name] = this.contents
        this.scope.form.setFieldsValue(obj)
      }
      this.$emit('select', this.contents, this.nodeList)
    },
    onChange (e, type) {
      this.contents = e
      this.selectedKeys = this.multiple ? this.contents : [this.contents].filter(item => item)
      if (type === 'clear') {
        this.nodeList = []
      }
      this.nodeList = this.nodeList.filter(item => this.contents && this.contents.indexOf(item.value) !== -1)
      if (this.scope && this.scope.form) {
        const obj = {}
        obj[this.name] = this.contents
        this.scope.form.setFieldsValue(obj)
      }
      this.$emit('select', this.contents, this.nodeList)
    },
    tagClose (value) {
      if (this.multiple) {
        this.contents = this.contents.filter(item => item !== value)
        this.nodeList = this.nodeList.filter(item => item.value !== value)
        this.selectedKeys = this.contents.filter(item => item !== value)
        this.checkedKeys = this.checkedKeys.filter(item => item !== value)
      } else {
        this.contents = undefined
        this.nodeList = []
        this.selectedKeys = []
      }
      if (this.scope && this.scope.form) {
        const obj = {}
        obj[this.name] = this.contents
        this.scope.form.setFieldsValue(obj)
      }
      this.$emit('select', this.contents, this.nodeList)
    }
  }
}
</script>
<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';
/deep/ .singleRow {
  .ant-select-selection--multiple .ant-select-selection__rendered {
    overflow: hidden;
  }
  .ant-select-selection--multiple .ant-select-selection__rendered ul {
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    float: left;
  }
  .ant-select-selection--multiple .ant-select-selection__choice {
    float: none;
    overflow: visible;
  }
  .ant-select-selection--multiple .ant-select-search--inline {
    float: none;
    position: absolute;
  }
  .ant-select-selection--multiple {
    // min-height: 32px;
    overflow: hidden;
  }
}
/deep/ .ant-pagination-simple {
  .ant-pagination-simple-pager {
    margin: 0px;
  }
  .ant-pagination-simple-pager input {
    margin: 0px;
    padding: 0px;
    height: 80%;
  }
  .ant-pagination-slash {
    margin: 0px;
  }
}
.listStyle:hover {
  background: @primary-1;
}
div::-webkit-scrollbar {
  text-align: right;
  width: 8px;
  height: 8px;
}
div::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}
div::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 10px;
}
div::-webkit-scrollbar-thumb:hover {
  background: #333;
}
div::-webkit-scrollbar-corner {
  background: #179a16;
}
</style>
